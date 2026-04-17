<?php
// ─────────────────────────────────────────────────────────────────
//  config.php  ·  Shared configuration & helpers
//  Edit the four constants below, then upload the whole /api folder.
// ─────────────────────────────────────────────────────────────────

define('DB_HOST',     'localhost');
define('DB_NAME',     'medin_db');
define('DB_USER',     'root');
define('DB_PASS',     '');

// Generate a long random string here: https://randomkeygen.com/
define('JWT_SECRET',  'REPLACE_WITH_A_LONG_RANDOM_SECRET_STRING');
define('JWT_TTL',     60 * 60 * 8);   // 8-hour sessions

// Absolute path to uploads folder (one level above /api/)
define('UPLOAD_DIR', __DIR__ . '/../uploads/');

// Allowed image MIME types for upload
define('ALLOWED_TYPES', ['image/jpeg', 'image/png', 'image/webp', 'image/gif']);


// ─── Database connection (singleton) ─────────────────────────────
function getDB(): PDO {
    static $pdo = null;
    if ($pdo) return $pdo;
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_NAME);
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    return $pdo;
}


// ─── JWT helpers ──────────────────────────────────────────────────
function b64url(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}
function b64decode(string $data): string {
    return base64_decode(strtr($data, '-_', '+/') . str_repeat('=', 4 - strlen($data) % 4));
}
function createJWT(array $payload): string {
    $h = b64url(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $p = b64url(json_encode($payload));
    $s = b64url(hash_hmac('sha256', "$h.$p", JWT_SECRET, true));
    return "$h.$p.$s";
}
function verifyJWT(string $token): ?array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$h, $p, $s] = $parts;
    $expected = b64url(hash_hmac('sha256', "$h.$p", JWT_SECRET, true));
    if (!hash_equals($expected, $s)) return null;
    $data = json_decode(b64decode($p), true);
    if (!$data || ($data['exp'] ?? 0) < time()) return null;
    return $data;
}


// ─── Request helpers ──────────────────────────────────────────────
function cors(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function respond(mixed $data, int $code = 200): never {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function requireAuth(): array {
    // Apache often strips Authorization from $_SERVER — check multiple sources
    $header = $_SERVER['HTTP_AUTHORIZATION']
           ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
           ?? (function_exists('getallheaders') ? (getallheaders()['Authorization'] ?? '') : '');

    $token   = trim(preg_replace('/^Bearer\s+/i', '', trim($header)));
    $payload = verifyJWT($token);
    if (!$payload) respond(['error' => 'Unauthorized'], 401);
    return $payload;
}

function body(): array {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}
