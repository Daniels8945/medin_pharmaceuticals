<?php
header('Content-Type: application/json');
require_once 'config.php';
cors();

$method = $_SERVER['REQUEST_METHOD'];

// ── GET /api/auth.php ── verify token, return current user ────────
if ($method === 'GET') {
    $payload = requireAuth();
    respond(['id' => $payload['id'], 'email' => $payload['email']]);
}

// ── POST /api/auth.php ── login ───────────────────────────────────
if ($method === 'POST') {
    $body     = body();
    $email    = trim($body['email']    ?? '');
    $password = trim($body['password'] ?? '');

    if (!$email || !$password) {
        respond(['error' => 'Email and password are required'], 400);
    }

    $pdo  = getDB();
    $stmt = $pdo->prepare('SELECT id, email, password_hash FROM admin_users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        respond(['error' => 'Invalid email or password'], 401);
    }

    $token = createJWT([
        'id'    => $user['id'],
        'email' => $user['email'],
        'exp'   => time() + JWT_TTL,
    ]);

    respond([
        'token' => $token,
        'user'  => ['id' => $user['id'], 'email' => $user['email']],
    ]);
}

respond(['error' => 'Method not allowed'], 405);
