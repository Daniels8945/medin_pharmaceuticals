<?php
header('Content-Type: application/json');
require_once 'config.php';
cors();

$method = $_SERVER['REQUEST_METHOD'];
$pdo    = getDB();

// ── GET /api/products.php ── public list ──────────────────────────
if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM products ORDER BY created_at DESC');
    $rows = $stmt->fetchAll();

    // Return shape matching what the React app expects (same as Appwrite docs)
    $out = array_map(fn($r) => [
        '$id'         => $r['id'],
        'name'        => $r['name'],
        'description' => $r['description'],
        'creator'     => $r['creator'],
        'imageId'     => $r['image_id'],
    ], $rows);

    respond($out);
}

// ── POST /api/products.php ── create product ──────────────────────
// Body: { "name": "...", "description": "...", "creator": "...", "imageId": "..." }
if ($method === 'POST') {
    requireAuth();
    $body = body();
    $id   = bin2hex(random_bytes(18)); // 36-char unique ID

    $stmt = $pdo->prepare(
        'INSERT INTO products (id, name, description, creator, image_id) VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $id,
        $body['name']        ?? '',
        $body['description'] ?? '',
        $body['creator']     ?? '',
        $body['imageId']     ?? null,
    ]);

    respond(['$id' => $id], 201);
}

// ── DELETE /api/products.php?id=...&imageId=... ── remove product ─
if ($method === 'DELETE') {
    requireAuth();
    $id      = $_GET['id']      ?? '';
    $imageId = $_GET['imageId'] ?? '';

    if (!$id) respond(['error' => 'id parameter is required'], 400);

    // Remove from database
    $stmt = $pdo->prepare('DELETE FROM products WHERE id = ?');
    $stmt->execute([$id]);

    // Remove image file (basename prevents any path traversal)
    if ($imageId) {
        $path = UPLOAD_DIR . basename($imageId);
        if (file_exists($path)) {
            unlink($path);
        }
    }

    respond(['ok' => true]);
}

respond(['error' => 'Method not allowed'], 405);
