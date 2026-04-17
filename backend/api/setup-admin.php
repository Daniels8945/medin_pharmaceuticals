<?php
// ─────────────────────────────────────────────────────────────────
//  setup-admin.php
//
//  Run this ONCE via your browser to create the admin account:
//    https://yourdomain.com/api/setup-admin.php?email=you@example.com&password=YourPassword
//
//  ⚠  DELETE THIS FILE immediately after use.
// ─────────────────────────────────────────────────────────────────
require_once 'config.php';

header('Content-Type: text/plain');

$email    = trim($_GET['email']    ?? '');
$password = trim($_GET['password'] ?? '');

if (!$email || !$password) {
    die("Usage: ?email=admin@example.com&password=YourStrongPassword\n\n⚠ DELETE THIS FILE after use.");
}
if (strlen($password) < 8) {
    die("Password must be at least 8 characters.");
}

$hash = password_hash($password, PASSWORD_BCRYPT);
$pdo  = getDB();

$stmt = $pdo->prepare(
    'INSERT INTO admin_users (email, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)'
);
$stmt->execute([$email, $hash]);

echo "✅ Admin user '$email' created/updated successfully.\n\n";
echo "⚠  DELETE THIS FILE (setup-admin.php) from your server now!\n";
