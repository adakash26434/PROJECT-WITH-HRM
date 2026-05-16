-- =====================================================
-- HRM MODULE — सहकारी मानव संशाधन व्यवस्थापन
-- Drop-in for Aakash/Bandana cooperative project
-- Compatible: MySQL 5.7+ / MariaDB 10.3+
-- Run via: admin/run-migration.php OR phpMyAdmin import
-- =====================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1) DEPARTMENTS / BRANCHES (विभाग/शाखा)
CREATE TABLE IF NOT EXISTS hrm_departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_np VARCHAR(160) NOT NULL,
    name_en VARCHAR(160) DEFAULT NULL,
    code VARCHAR(40) DEFAULT NULL,
    parent_id INT DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_parent (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2) EMPLOYEE MASTER (कर्मचारी मास्टर)
CREATE TABLE IF NOT EXISTS hrm_employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_code VARCHAR(40) NOT NULL UNIQUE,
    admin_user_id INT DEFAULT NULL,                 -- link to admin_users (optional login)

    -- Personal
    full_name_np VARCHAR(160) NOT NULL,
    full_name_en VARCHAR(160) DEFAULT NULL,
    photo VARCHAR(255) DEFAULT NULL,
    gender ENUM('male','female','other') DEFAULT 'male',
    dob_bs VARCHAR(20) DEFAULT NULL,
    dob_ad DATE DEFAULT NULL,
    blood_group VARCHAR(10) DEFAULT NULL,
    marital_status ENUM('single','married','widow','divorced') DEFAULT 'single',
    nationality VARCHAR(60) DEFAULT 'Nepali',
    religion VARCHAR(60) DEFAULT NULL,
    ethnicity VARCHAR(60) DEFAULT NULL,

    -- Identity
    citizenship_no VARCHAR(60) DEFAULT NULL,
    citizenship_issued_district VARCHAR(80) DEFAULT NULL,
    citizenship_issued_date_bs VARCHAR(20) DEFAULT NULL,
    pan_no VARCHAR(40) DEFAULT NULL,
    nid_no VARCHAR(40) DEFAULT NULL,
    passport_no VARCHAR(40) DEFAULT NULL,
    driving_license_no VARCHAR(40) DEFAULT NULL,

    -- Contact
    mobile VARCHAR(20) DEFAULT NULL,
    alt_mobile VARCHAR(20) DEFAULT NULL,
    email VARCHAR(120) DEFAULT NULL,

    -- Address
    perm_province VARCHAR(60) DEFAULT NULL,
    perm_district VARCHAR(60) DEFAULT NULL,
    perm_municipality VARCHAR(120) DEFAULT NULL,
    perm_ward VARCHAR(10) DEFAULT NULL,
    perm_tole VARCHAR(160) DEFAULT NULL,
    temp_province VARCHAR(60) DEFAULT NULL,
    temp_district VARCHAR(60) DEFAULT NULL,
    temp_municipality VARCHAR(120) DEFAULT NULL,
    temp_ward VARCHAR(10) DEFAULT NULL,
    temp_tole VARCHAR(160) DEFAULT NULL,

    -- Employment
    designation VARCHAR(160) DEFAULT NULL,        -- joins designations master (title_np)
    department_id INT DEFAULT NULL,
    branch_id INT DEFAULT NULL,                   -- service_centers.id (optional)
    employment_type ENUM('permanent','contract','probation','temporary','intern','consultant') DEFAULT 'permanent',
    grade VARCHAR(40) DEFAULT NULL,
    level VARCHAR(40) DEFAULT NULL,
    reporting_to INT DEFAULT NULL,                -- another employee id
    join_date_bs VARCHAR(20) DEFAULT NULL,
    join_date_ad DATE DEFAULT NULL,
    confirm_date_bs VARCHAR(20) DEFAULT NULL,
    confirm_date_ad DATE DEFAULT NULL,
    probation_months INT DEFAULT 0,
    status ENUM('active','probation','suspended','on_leave','resigned','terminated','retired') DEFAULT 'active',
    exit_date_ad DATE DEFAULT NULL,
    exit_reason TEXT DEFAULT NULL,

    -- Misc
    remarks TEXT DEFAULT NULL,
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_status (status),
    INDEX idx_dept (department_id),
    INDEX idx_branch (branch_id),
    INDEX idx_designation (designation),
    INDEX idx_admin_user (admin_user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3) CONTRACTS (नियुक्ति/करार पत्र)
CREATE TABLE IF NOT EXISTS hrm_employee_contracts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    contract_no VARCHAR(80) DEFAULT NULL,
    contract_type ENUM('appointment','contract','renewal','promotion','transfer','amendment') DEFAULT 'appointment',
    designation VARCHAR(160) DEFAULT NULL,
    department_id INT DEFAULT NULL,
    branch_id INT DEFAULT NULL,
    start_date_bs VARCHAR(20) DEFAULT NULL,
    start_date_ad DATE DEFAULT NULL,
    end_date_bs VARCHAR(20) DEFAULT NULL,
    end_date_ad DATE DEFAULT NULL,                -- NULL = permanent
    basic_salary DECIMAL(12,2) DEFAULT 0,
    allowance DECIMAL(12,2) DEFAULT 0,
    notes TEXT DEFAULT NULL,
    file_path VARCHAR(255) DEFAULT NULL,          -- scanned PDF
    is_active TINYINT(1) DEFAULT 1,
    created_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_emp (employee_id),
    INDEX idx_active (is_active),
    INDEX idx_end (end_date_ad),
    CONSTRAINT fk_contract_emp FOREIGN KEY (employee_id) REFERENCES hrm_employees(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4) DOCUMENTS (नागरिकता, PAN, प्रमाण-पत्र)
CREATE TABLE IF NOT EXISTS hrm_employee_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    doc_type VARCHAR(80) NOT NULL,                -- citizenship, pan, license, passport, certificate, training, other
    title VARCHAR(200) NOT NULL,
    doc_number VARCHAR(120) DEFAULT NULL,
    issued_by VARCHAR(160) DEFAULT NULL,
    issued_date_bs VARCHAR(20) DEFAULT NULL,
    issued_date_ad DATE DEFAULT NULL,
    expiry_date_ad DATE DEFAULT NULL,
    file_path VARCHAR(255) DEFAULT NULL,
    notes TEXT DEFAULT NULL,
    uploaded_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_emp (employee_id),
    INDEX idx_type (doc_type),
    INDEX idx_expiry (expiry_date_ad),
    CONSTRAINT fk_doc_emp FOREIGN KEY (employee_id) REFERENCES hrm_employees(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5) EDUCATION (शैक्षिक योग्यता)
CREATE TABLE IF NOT EXISTS hrm_employee_education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    level VARCHAR(80) NOT NULL,
    board_university VARCHAR(160) DEFAULT NULL,
    institution VARCHAR(200) DEFAULT NULL,
    major VARCHAR(160) DEFAULT NULL,
    passed_year VARCHAR(10) DEFAULT NULL,
    division_grade VARCHAR(40) DEFAULT NULL,
    percentage VARCHAR(20) DEFAULT NULL,
    file_path VARCHAR(255) DEFAULT NULL,
    sort_order INT DEFAULT 0,
    INDEX idx_emp (employee_id),
    CONSTRAINT fk_edu_emp FOREIGN KEY (employee_id) REFERENCES hrm_employees(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6) EXPERIENCE (पूर्व अनुभव)
CREATE TABLE IF NOT EXISTS hrm_employee_experience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    organization VARCHAR(200) NOT NULL,
    designation VARCHAR(160) DEFAULT NULL,
    from_date_ad DATE DEFAULT NULL,
    to_date_ad DATE DEFAULT NULL,
    responsibilities TEXT DEFAULT NULL,
    sort_order INT DEFAULT 0,
    INDEX idx_emp (employee_id),
    CONSTRAINT fk_exp_emp FOREIGN KEY (employee_id) REFERENCES hrm_employees(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7) FAMILY / NOMINEE (परिवार/इच्छाएको व्यक्ति)
CREATE TABLE IF NOT EXISTS hrm_employee_family (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    relation VARCHAR(60) NOT NULL,                 -- बुबा/आमा/श्रीमान्/श्रीमती/छोरा/छोरी
    full_name VARCHAR(160) NOT NULL,
    contact VARCHAR(40) DEFAULT NULL,
    occupation VARCHAR(120) DEFAULT NULL,
    is_nominee TINYINT(1) DEFAULT 0,
    nominee_share DECIMAL(5,2) DEFAULT 0,
    notes VARCHAR(255) DEFAULT NULL,
    INDEX idx_emp (employee_id),
    CONSTRAINT fk_fam_emp FOREIGN KEY (employee_id) REFERENCES hrm_employees(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8) BANK / PF / CIT
CREATE TABLE IF NOT EXISTS hrm_employee_bank (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL UNIQUE,
    bank_name VARCHAR(160) DEFAULT NULL,
    branch VARCHAR(120) DEFAULT NULL,
    account_no VARCHAR(60) DEFAULT NULL,
    account_name VARCHAR(160) DEFAULT NULL,
    pf_no VARCHAR(60) DEFAULT NULL,
    cit_no VARCHAR(60) DEFAULT NULL,
    ssf_no VARCHAR(60) DEFAULT NULL,
    insurance_no VARCHAR(60) DEFAULT NULL,
    notes VARCHAR(255) DEFAULT NULL,
    CONSTRAINT fk_bank_emp FOREIGN KEY (employee_id) REFERENCES hrm_employees(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9) SERVICE HISTORY (बढुवा/सरुवा/निलम्बन/अवकाश)
CREATE TABLE IF NOT EXISTS hrm_employee_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    event_type ENUM('appointment','confirmation','promotion','transfer','suspension','reinstatement','warning','award','leave','resignation','termination','retirement','other') NOT NULL,
    event_date_bs VARCHAR(20) DEFAULT NULL,
    event_date_ad DATE DEFAULT NULL,
    from_designation VARCHAR(160) DEFAULT NULL,
    to_designation VARCHAR(160) DEFAULT NULL,
    from_department_id INT DEFAULT NULL,
    to_department_id INT DEFAULT NULL,
    from_branch_id INT DEFAULT NULL,
    to_branch_id INT DEFAULT NULL,
    reference_no VARCHAR(80) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    file_path VARCHAR(255) DEFAULT NULL,
    created_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_emp (employee_id),
    INDEX idx_type (event_type),
    INDEX idx_date (event_date_ad),
    CONSTRAINT fk_hist_emp FOREIGN KEY (employee_id) REFERENCES hrm_employees(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed: default departments
INSERT IGNORE INTO hrm_departments (id, name_np, name_en, code, sort_order) VALUES
 (1,'व्यवस्थापन','Management','MGMT',1),
 (2,'खाता तथा वित्त','Accounts & Finance','ACC',2),
 (3,'ऋण विभाग','Loan Department','LOAN',3),
 (4,'बचत तथा सदस्यता','Savings & Membership','SAV',4),
 (5,'मानव संशाधन','Human Resource','HR',5),
 (6,'सूचना प्रविधि','Information Technology','IT',6),
 (7,'आन्तरिक लेखापरीक्षण','Internal Audit','AUDIT',7);

SET FOREIGN_KEY_CHECKS = 1;
