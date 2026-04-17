<?php
header('Content-Type: application/json');
require_once 'config.php';
cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['error' => 'Method not allowed'], 405);
requireAuth();

if (empty($_FILES['file'])) respond(['error' => 'No file uploaded'], 400);

$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    respond(['error' => 'Upload error code: ' . $file['error']], 400);
}

// Validate actual MIME type — never trust the client-supplied type
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime  = $finfo->file($file['tmp_name']);
if (!in_array($mime, ALLOWED_TYPES, true)) {
    respond(['error' => 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'], 400);
}

// Map MIME → extension
$extMap = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
    'image/gif'  => 'gif',
];
$ext      = $extMap[$mime] ?? 'jpg';
$filename = bin2hex(random_bytes(16)) . '.' . $ext;  // e.g. a3f9...2c.jpg
$dest     = UPLOAD_DIR . $filename;

// Create uploads directory if missing (first deploy)
if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    respond(['error' => 'Failed to save uploaded file'], 500);
}

respond(['id' => $filename]);
