-- ─────────────────────────────────────────────────────────────────
--  setup.sql  ·  Run once in cPanel → phpMyAdmin
--  Select your database first, then paste and execute this.
-- ─────────────────────────────────────────────────────────────────

-- 1.  Site content (key/value JSON store — one row per section)
CREATE TABLE IF NOT EXISTS `site_content` (
    `key`        VARCHAR(50)  NOT NULL,
    `data`       LONGTEXT     NOT NULL,
    `updated_at` TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 2.  Products catalogue
CREATE TABLE IF NOT EXISTS `products` (
    `id`          VARCHAR(36)  NOT NULL,
    `name`        TEXT,
    `description` TEXT,
    `creator`     VARCHAR(255),
    `image_id`    VARCHAR(255),
    `created_at`  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 3.  Admin users (dashboard login)
CREATE TABLE IF NOT EXISTS `admin_users` (
    `id`            INT          NOT NULL AUTO_INCREMENT,
    `email`         VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `created_at`    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────────
--  After running this SQL, visit:
--    https://yourdomain.com/api/setup-admin.php?email=you@example.com&password=YourPassword
--  to create your admin account, then DELETE setup-admin.php.
-- ─────────────────────────────────────────────────────────────────
