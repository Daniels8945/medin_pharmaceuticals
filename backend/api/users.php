<?php
header('Content-Type: application/json');
require_once 'config.php';
cors();

$method  = $_SERVER['REQUEST_METHOD'];
$pdo     = getDB();
$payload = requireAuth();   // all user-management endpoints require a valid login

// ── GET /api/users.php  — list all admin users ────────────────────
if ($method === 'GET') {
    $rows = $pdo->query('SELECT id, email, name, role, created_at FROM admin_users ORDER BY id')->fetchAll();
    respond($rows);
}

// ── POST /api/users.php — create or update ────────────────────────
// Body: { id?, email, name?, password?, role? }
//   • Omit `id` (or id=0) to create a new user.
//   • Include `id` to update (password optional on update).
if ($method === 'POST') {
    $b        = body();
    $id       = intval($b['id'] ?? 0);
    $email    = strtolower(trim($b['email']    ?? ''));
    $name     = trim($b['name']     ?? '');
    $password = trim($b['password'] ?? '');
    $role     = trim($b['role']     ?? 'admin');

    if (!$email) respond(['error' => 'email is required'], 400);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respond(['error' => 'Invalid email address'], 400);
    if ($id === 0 && strlen($password) < 8) respond(['error' => 'Password must be at least 8 characters'], 400);

    if ($id) {
        // Update — password only changed when explicitly provided
        if ($password) {
            if (strlen($password) < 8) respond(['error' => 'Password must be at least 8 characters'], 400);
            $hash = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare('UPDATE admin_users SET email=?, name=?, role=?, password=? WHERE id=?');
            $stmt->execute([$email, $name, $role, $hash, $id]);
        } else {
            $stmt = $pdo->prepare('UPDATE admin_users SET email=?, name=?, role=? WHERE id=?');
            $stmt->execute([$email, $name, $role, $id]);
        }
        respond(['ok' => true, 'id' => $id]);
    } else {
        // Create
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare(
            'INSERT INTO admin_users (email, name, password, role) VALUES (?, ?, ?, ?)'
        );
        $stmt->execute([$email, $name, $hash, $role]);
        respond(['ok' => true, 'id' => $pdo->lastInsertId()]);
    }
}

// ── DELETE /api/users.php?id=X — delete a user ───────────────────
if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if (!$id) respond(['error' => 'id is required'], 400);
    // Prevent deleting yourself
    if ($id === intval($payload['id'])) respond(['error' => 'You cannot delete your own account'], 403);
    $pdo->prepare('DELETE FROM admin_users WHERE id = ?')->execute([$id]);
    respond(['ok' => true]);
}

respond(['error' => 'Method not allowed'], 405);
