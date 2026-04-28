<?php
// TEMPORARY DIAGNOSTIC — DELETE AFTER USE
header('Content-Type: text/html; charset=utf-8');

// ── PHP environment ────────────────────────────────────────────────
echo "<h2>PHP Environment</h2>";
echo "<p><b>PHP Version:</b> " . PHP_VERSION . "</p>";

// Test loading config.php and catch any parse/runtime errors
echo "<h3>config.php load test</h3>";
try {
    ob_start();
    require_once __DIR__ . '/api/config.php';
    ob_end_clean();
    echo "<p style='color:green'>config.php loaded OK ✓</p>";

    // Test DB connection via config functions
    try {
        $testPdo = getDB();
        echo "<p style='color:green'>getDB() works ✓</p>";
    } catch (Throwable $e) {
        echo "<p style='color:red'>getDB() FAILED: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
} catch (ParseError $e) {
    ob_end_clean();
    echo "<p style='color:red'><b>PARSE ERROR in config.php:</b> " . htmlspecialchars($e->getMessage()) . " on line " . $e->getLine() . "</p>";
    die();
} catch (Throwable $e) {
    ob_end_clean();
    echo "<p style='color:red'><b>ERROR in config.php:</b> " . htmlspecialchars($e->getMessage()) . "</p>";
    die();
}

// ── Direct login test ─────────────────────────────────────────────
echo "<h3>Login logic test</h3>";
if (isset($_POST['test_email'], $_POST['test_password'])) {
    $te = trim($_POST['test_email']);
    $tp = $_POST['test_password'];
    try {
        $pdo2 = getDB();
        $st   = $pdo2->prepare('SELECT id, email, password FROM admin_users WHERE email = ? LIMIT 1');
        $st->execute([$te]);
        $u = $st->fetch();
        if (!$u) {
            echo "<p style='color:red'>No user found with email: $te</p>";
        } else {
            echo "<p>User found. Password column value starts with: <b>" . htmlspecialchars(substr($u['password'], 0, 7)) . "...</b></p>";
            $ok = password_verify($tp, $u['password']);
            if ($ok) {
                echo "<p style='color:green'><b>password_verify() = TRUE ✓ — login SHOULD work</b></p>";
                $tok = createJWT(['id' => $u['id'], 'email' => $u['email'], 'exp' => time() + 28800]);
                echo "<p style='color:green'>JWT created OK ✓</p>";
            } else {
                echo "<p style='color:red'><b>password_verify() = FALSE — password mismatch</b></p>";
            }
        }
    } catch (Throwable $e) {
        echo "<p style='color:red'>Error: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
}
?>
<form method="POST" style="font-family:sans-serif">
    <p><b>Test email:</b> <input type="email" name="test_email" value="admin@medin.com" style="width:250px;padding:4px"></p>
    <p><b>Test password:</b> <input type="text" name="test_password" style="width:250px;padding:4px" placeholder="enter your password"></p>
    <button type="submit" style="padding:8px 18px;background:#555;color:white;border:none;cursor:pointer">Run Login Test</button>
</form>
<?php

// ── Also show auth.php file on server ─────────────────────────────
$auth_file = __DIR__ . '/api/auth.php';
if (file_exists($auth_file)) {
    $auth_mtime = date('Y-m-d H:i:s', filemtime($auth_file));
    $auth_size  = filesize($auth_file);
    echo "<p style='color:gray'>auth.php on server — last modified: <b>$auth_mtime</b>, size: <b>$auth_size bytes</b></p>";
    // Check if old column name is still in the file
    $auth_src = file_get_contents($auth_file);
    if (strpos($auth_src, 'password_hash') !== false) {
        echo "<p style='color:red'><b>WARNING: auth.php still references 'password_hash' — you uploaded the OLD version!</b></p>";
    } else {
        echo "<p style='color:green'>auth.php uses correct 'password' column ✓</p>";
    }
} else {
    echo "<p style='color:red'>auth.php not found at expected path!</p>";
}

echo "<hr>";

$cfg_file = __DIR__ . '/api/config.php';
if (!file_exists($cfg_file)) {
    die('<b style="color:red">FAIL:</b> api/config.php not found.');
}

$cfg = file_get_contents($cfg_file);
preg_match("/define\('DB_HOST',\s*'([^']*)'\)/",    $cfg, $m); $host = $m[1] ?? '?';
preg_match("/define\('DB_NAME',\s*'([^']*)'\)/",    $cfg, $m); $name = $m[1] ?? '?';
preg_match("/define\('DB_USER',\s*'([^']*)'\)/",    $cfg, $m); $user = $m[1] ?? '?';
preg_match("/define\('DB_PASS',\s*'([^']*)'\)/",    $cfg, $m); $pass = $m[1] ?? '?';
preg_match("/define\('JWT_SECRET',\s*'([^']*)'\)/", $cfg, $m); $jwt  = $m[1] ?? '?';

echo "<h2>Medin — DB Diagnostics</h2>";
echo "<p><b>DB_HOST:</b> $host &nbsp; <b>DB_NAME:</b> $name &nbsp; <b>DB_USER:</b> $user</p>";

// ── DB connection ──────────────────────────────────────────────────
$pdo = null;
try {
    $pdo = new PDO("mysql:host=$host;dbname=$name;charset=utf8mb4", $user, $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    echo "<p style='color:green'><b>DB connected ✓</b></p>";
} catch (PDOException $e) {
    echo "<p style='color:red'><b>DB FAILED:</b> " . htmlspecialchars($e->getMessage()) . "</p>";
}

// ── Auto-fix: rename/add columns if missing ────────────────────────
if ($pdo) {
    try {
        $cols = $pdo->query("SHOW COLUMNS FROM admin_users")->fetchAll(PDO::FETCH_COLUMN);

        // Rename password_hash → password if needed
        if (in_array('password_hash', $cols) && !in_array('password', $cols)) {
            $pdo->exec("ALTER TABLE admin_users CHANGE password_hash password VARCHAR(255) NOT NULL");
            echo "<p style='color:orange'>Renamed <b>password_hash</b> → <b>password</b> ✓</p>";
            $cols[] = 'password';
        }
        if (!in_array('name', $cols)) {
            $pdo->exec("ALTER TABLE admin_users ADD COLUMN name VARCHAR(200) DEFAULT ''");
            echo "<p style='color:orange'>Added missing <b>name</b> column ✓</p>";
        }
        if (!in_array('role', $cols)) {
            $pdo->exec("ALTER TABLE admin_users ADD COLUMN role VARCHAR(50) DEFAULT 'admin'");
            echo "<p style='color:orange'>Added missing <b>role</b> column ✓</p>";
        }
    } catch (PDOException $e) {
        echo "<p style='color:red'>Schema fix error: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
}

// ── Tables ─────────────────────────────────────────────────────────
if ($pdo) {
    echo "<hr><h3>Tables</h3>";
    $existing = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    foreach (['admin_users','site_content','products','dynamic_pages'] as $t) {
        $ok = in_array($t, $existing);
        echo "<p style='color:" . ($ok ? 'green' : 'red') . "'>$t " . ($ok ? '✓' : '— MISSING ✗') . "</p>";
    }

    // ── Show users ─────────────────────────────────────────────────
    echo "<hr><h3>Admin Users</h3>";
    try {
        $rows = $pdo->query("SELECT id, email, name, role, created_at FROM admin_users")->fetchAll();
        if (empty($rows)) {
            echo "<p style='color:red'><b>No users — table is empty. Use the form below.</b></p>";
        } else {
            echo "<table border='1' cellpadding='6'>";
            echo "<tr><th>ID</th><th>Email</th><th>Name</th><th>Role</th><th>Created</th><th>Hash OK?</th></tr>";
            $hashes = $pdo->query("SELECT email, password FROM admin_users")->fetchAll(PDO::FETCH_KEY_PAIR);
            foreach ($rows as $r) {
                $h = $hashes[$r['email']] ?? '';
                $ok = str_starts_with($h, '$2y$') || str_starts_with($h, '$2a$');
                $hashCell = $ok ? "<span style='color:green'>bcrypt ✓</span>" : "<span style='color:red'>BAD ✗</span>";
                echo "<tr><td>{$r['id']}</td><td>{$r['email']}</td><td>{$r['name']}</td><td>{$r['role']}</td><td>{$r['created_at']}</td><td>$hashCell</td></tr>";
            }
            echo "</table>";
        }
    } catch (PDOException $e) {
        echo "<p style='color:red'>Error reading users: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
}

// ── Create / reset admin ───────────────────────────────────────────
echo "<hr><h3>Create / Reset Admin User</h3>";
if ($pdo && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'], $_POST['password'])) {
    $em = trim($_POST['email']);
    $pw = $_POST['password'];
    if (strlen($pw) < 8) {
        echo "<p style='color:red'>Password must be at least 8 characters.</p>";
    } else {
        try {
            $hash = password_hash($pw, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare("
                INSERT INTO admin_users (email, password, name, role)
                VALUES (:e, :p, 'Admin', 'admin')
                ON DUPLICATE KEY UPDATE password = :p2, role = 'admin'
            ");
            $stmt->execute([':e' => $em, ':p' => $hash, ':p2' => $hash]);
            echo "<p style='color:green'><b>✓ User '$em' created/updated. Try logging in now.</b></p>";
        } catch (PDOException $e) {
            echo "<p style='color:red'>Error: " . htmlspecialchars($e->getMessage()) . "</p>";
        }
    }
}
?>
<form method="POST" style="font-family:sans-serif;margin-top:10px">
    <p><b>Email:</b><br><input type="email" name="email" value="admin@medin.com" style="width:280px;padding:6px"></p>
    <p><b>Password (min 8 chars):</b><br><input type="password" name="password" style="width:280px;padding:6px"></p>
    <p><button type="submit" style="padding:10px 24px;background:green;color:white;border:none;cursor:pointer;font-size:15px">
        Create / Reset Admin User
    </button></p>
</form>
<hr>
<p style="color:red"><b>DELETE this file from your server after use!</b></p>
