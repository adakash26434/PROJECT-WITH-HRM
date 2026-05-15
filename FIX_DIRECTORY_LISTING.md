## FIX: Directory Listing Instead of PHP Site

**Problem:**
When you visit `hrm.bandanasigdel.com.np`, you see a folder listing instead of the website.

**Root Cause:**
- PHP files are in `/hrm-project/` subdirectory
- Web server doesn't know to route requests to them
- No index.php in the root directory

**Solution:**

Two files need to be added to your server root (/public_html/):

### File 1: index.php

**Location:** `/public_html/index.php`

This file acts as a router - it intercepts all requests and forwards them to the actual HRM project.

Copy from: `/vercel/share/v0-project/index.php`

### File 2: .htaccess

**Location:** `/public_html/.htaccess`

This file configures Apache to:
- Route all requests through index.php
- Hide .php extensions from URLs
- Set security headers
- Disable directory listing

Copy from: `/vercel/share/v0-project/.htaccess`

---

## Deploy Instructions

### Using cPanel File Manager:

1. Login to cPanel
2. Go to File Manager → public_html
3. **Create new file:** `index.php`
   - Copy content from `/vercel/share/v0-project/index.php`
   - Paste all content
4. **Create new file:** `.htaccess`
   - Copy content from `/vercel/share/v0-project/.htaccess`
   - Paste all content
5. Refresh your browser

### Using SSH/Terminal:

```bash
# Navigate to public_html
cd /home/bandanas/dev.bandanasigdel.com.np

# Copy the router files
cp /vercel/share/v0-project/index.php .
cp /vercel/share/v0-project/.htaccess .

# Verify
ls -la index.php .htaccess
```

---

## After Deploying:

1. Clear browser cache (Ctrl+Shift+Delete)
2. Visit: `https://hrm.bandanasigdel.com.np/`
3. Should now see login page instead of folder listing
4. If still seeing folder listing:
   - Check that .htaccess was created correctly
   - Verify mod_rewrite is enabled on server
   - Contact hosting support if needed

---

## File Structure After Fix:

```
/public_html/
├── index.php          ← NEW - Router file
├── .htaccess          ← NEW - Apache config
├── _bootstrap.php     ← Already exists
├── hrm-project/       ← Your actual PHP project
│   ├── index.php
│   ├── login.php
│   ├── admin/
│   ├── employee/
│   └── ...
├── assets/
├── components/
└── ...
```

---

## Testing:

After deploying, test these URLs:

- `https://hrm.bandanasigdel.com.np/` → Should show login page
- `https://hrm.bandanasigdel.com.np/login` → Should work
- `https://hrm.bandanasigdel.com.np/admin/` → Should work

If any give errors, check server error logs.

---

## Troubleshooting:

**Still showing folder listing?**
- Verify .htaccess was created (not just .htaccess.txt)
- Check that mod_rewrite is enabled on server
- Ask hosting provider to enable mod_rewrite

**Getting 404 errors?**
- index.php might not be loading correctly
- Check file permissions (should be 644)
- Verify hrm-project directory exists

**Getting blank page?**
- There might be a PHP error
- Check error logs in cPanel
- Verify _bootstrap.php is still in place

---

## Next Steps:

Once site is loading:
1. Test login
2. Check if all pages work
3. If errors appear, share error log content
4. Then we can move to Phase 2 (UI improvements)
