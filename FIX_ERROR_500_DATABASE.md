# ERROR 500 FIX - Missing Database Tables

## Problem
```
Table 'bandanas_dev.hrm_internal_messages' doesn't exist
```

Your database को केही tables missing छन्। यो नयाँ features को लागि required छ।

## Solution

### Option 1: Using cPanel (EASIEST)

**Step 1: Open phpMyAdmin**
- cPanel मा login गर
- "Database" section खोज
- "phpMyAdmin" click गर

**Step 2: Select Your Database**
- Left side मा `bandanas_dev` database select गर

**Step 3: Run SQL Script**
- Top मा "SQL" tab click गर
- यो कोड paste गर:

```sql
-- HRM internal messenger tables
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
```

- "Go" button click गर
- Success message आनुपर्छ

**Step 4: Test Your Site**
- Browser मा https://dev.bandanasigdel.com.np खोल
- Error gone हुनुपर्छ

---

### Option 2: Using SSH (If you have SSH access)

```bash
# SSH मा login गरेर:
mysql -u bandanas_dev -p bandanas_dev < /path/to/hrm_messages.sql
```

---

### Option 3: Upload और Run Migration File

तपाईको project मा migration file छ:
- File: `admin/run-migration.php`

यो file run गर्न:
1. Browser मा खोल: `https://dev.bandanasigdel.com.np/admin/run-migration.php`
2. सबै migrations run हुनेछन्

---

## If still getting errors:

Check कहाँ मा error आइरहेको छ:

1. **Still in error log?**
   - cPanel मा error log check गर
   - नयाँ error message share गर

2. **Different table missing?**
   - Sample: "Table 'xyz_table' doesn't exist"
   - मलाई भन - सब tables create गर्छु

3. **Connection error?**
   - Database credentials check गर
   - `config/config.php` मा:
     - DB_HOST
     - DB_USER
     - DB_PASS
     - DB_NAME

---

## Complete Database Setup (सबै tables)

यदि सबै tables setup गर्न चाहनु भए:

**File:** `/hrm-project/database/hrm_install.sql`

यो file मा सबै tables छन्। phpMyAdmin मा यो पूरो file run गर सकिन्छ।

---

## After Fix:

1. Try accessing the site again
2. Check error log for new errors
3. Share any remaining errors with me

Good luck! 🚀
