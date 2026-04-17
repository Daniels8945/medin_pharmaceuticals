<?php
header('Content-Type: application/json');
require_once 'config.php';
cors();

$method = $_SERVER['REQUEST_METHOD'];

// ── GET /api/content.php?key=hero ── public read ──────────────────
if ($method === 'GET') {
    $key = trim($_GET['key'] ?? '');
    if (!$key) respond(['error' => 'key parameter is required'], 400);

    $stmt = getDB()->prepare('SELECT `data` FROM site_content WHERE `key` = ? LIMIT 1');
    $stmt->execute([$key]);
    $row = $stmt->fetch();

    if (!$row) respond(null, 404);
    respond(['key' => $key, 'data' => $row['data']]);
}

// ── POST /api/content.php ── authenticated upsert ─────────────────
// Body: { "key": "hero", "data": "{...json string...}" }
if ($method === 'POST') {
    requireAuth();
    $body = body();
    $key  = trim($body['key']  ?? '');
    $data = $body['data'] ?? null;

    if (!$key || $data === null) {
        respond(['error' => 'key and data are required'], 400);
    }

    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'INSERT INTO site_content (`key`, `data`) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE `data` = VALUES(`data`), updated_at = CURRENT_TIMESTAMP'
    );
    $stmt->execute([$key, $data]);
    respond(['ok' => true]);
}

respond(['error' => 'Method not allowed'], 405);
