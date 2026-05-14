-- HRM internal messenger tables (auto-created)
CREATE TABLE IF NOT EXISTS hrm_internal_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_admin_id INT DEFAULT NULL,
    sender_employee_id INT DEFAULT NULL,
    receiver_employee_id INT NOT NULL,
    subject VARCHAR(200) DEFAULT NULL,
    body TEXT NOT NULL,
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    read_at DATETIME DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_receiver (receiver_employee_id, is_read),
    INDEX idx_sender (sender_admin_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
