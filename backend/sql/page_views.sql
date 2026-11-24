-- Run this once in your MySQL database (phpMyAdmin > SQL tab)
CREATE TABLE IF NOT EXISTS page_views (
  id               BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  visitor_id       VARCHAR(64)  NOT NULL,
  session_id       VARCHAR(64)  NOT NULL,
  page             VARCHAR(255) NOT NULL,
  referrer_host    VARCHAR(255) NULL,
  device           VARCHAR(30)  NULL,
  browser          VARCHAR(60)  NULL,
  operating_system VARCHAR(60)  NULL,
  country          VARCHAR(10)  NULL,
  city             VARCHAR(100) NULL,
  language         VARCHAR(20)  NULL,
  screen_width     INT NULL,
  screen_height    INT NULL,
  duration_seconds INT UNSIGNED NOT NULL DEFAULT 0,
  created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created (created_at),
  INDEX idx_page (page),
  INDEX idx_visitor (visitor_id),
  INDEX idx_session (session_id)
);
