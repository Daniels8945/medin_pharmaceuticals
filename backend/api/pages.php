<?php
header('Content-Type: application/json');
require_once 'config.php';
cors();

$method = $_SERVER['REQUEST_METHOD'];
$pdo    = getDB();

// ── GET ────────────────────────────────────────────────────────────
if ($method === 'GET') {
    $slug = trim($_GET['slug'] ?? '');
    $all  = isset($_GET['all']);   // admin: all pages including unpublished

    if ($slug) {
        // Public: single page by slug (published or admin)
        $stmt = $pdo->prepare('SELECT * FROM dynamic_pages WHERE slug = ? LIMIT 1');
        $stmt->execute([$slug]);
        $page = $stmt->fetch();
        if (!$page) respond(['error' => 'Page not found'], 404);
        respond($page);
    } elseif ($all) {
        // Admin: all pages including unpublished
        requireAuth();
        $stmt = $pdo->query('SELECT * FROM dynamic_pages ORDER BY sort_order ASC, id ASC');
        respond($stmt->fetchAll());
    } else {
        // Public: only published pages (minimal fields for card listing)
        $stmt = $pdo->query(
            'SELECT id, slug, title, subtitle, image_id, card_color, icon, sort_order
             FROM dynamic_pages WHERE published = 1 ORDER BY sort_order ASC, id ASC'
        );
        respond($stmt->fetchAll());
    }
}

// ── POST (create / update) ──────────────────────────────────────────
if ($method === 'POST') {
    requireAuth();
    $b = body();

    $id         = intval($b['id'] ?? 0);
    $raw_slug   = trim($b['slug'] ?? '');
    $slug       = preg_replace('/[^a-z0-9]+/', '-', strtolower($raw_slug));
    $slug       = trim($slug, '-');
    $title      = trim($b['title'] ?? '');
    $subtitle   = trim($b['subtitle'] ?? '');
    $body_text  = $b['body'] ?? '';
    $image_id   = trim($b['image_id'] ?? '');
    $video_url  = trim($b['video_url'] ?? '');
    $icon       = trim($b['icon'] ?? '');
    $card_color = trim($b['card_color'] ?? 'green');
    $published  = isset($b['published']) ? (int)(bool)$b['published'] : 1;
    $sort_order = intval($b['sort_order'] ?? 0);

    if (!$slug || !$title) respond(['error' => 'slug and title are required'], 400);

    if ($id) {
        $stmt = $pdo->prepare(
            'UPDATE dynamic_pages
             SET slug=?, title=?, subtitle=?, body=?, image_id=?,
                 video_url=?, icon=?, card_color=?, published=?, sort_order=?
             WHERE id=?'
        );
        $stmt->execute([$slug, $title, $subtitle, $body_text, $image_id,
                        $video_url, $icon, $card_color, $published, $sort_order, $id]);
        respond(['ok' => true, 'id' => $id]);
    } else {
        $stmt = $pdo->prepare(
            'INSERT INTO dynamic_pages
             (slug, title, subtitle, body, image_id, video_url, icon, card_color, published, sort_order)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$slug, $title, $subtitle, $body_text, $image_id,
                        $video_url, $icon, $card_color, $published, $sort_order]);
        respond(['ok' => true, 'id' => $pdo->lastInsertId()]);
    }
}

// ── DELETE ──────────────────────────────────────────────────────────
if ($method === 'DELETE') {
    requireAuth();
    $id = intval($_GET['id'] ?? 0);
    if (!$id) respond(['error' => 'id is required'], 400);
    $pdo->prepare('DELETE FROM dynamic_pages WHERE id = ?')->execute([$id]);
    respond(['ok' => true]);
}

respond(['error' => 'Method not allowed'], 405);
