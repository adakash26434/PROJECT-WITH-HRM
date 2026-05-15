# Git Merge Error Fix - requireMemberLogin() undefined

## समस्या (Problem)

```
Exception: Call to undefined function requireMemberLogin()
```

यह error आया है क्योंकि `_bootstrap.php` सही files को load नहीं कर रहा था git merge के बाद।

## कारण (Root Cause)

Project structure को reorganize किया गया था:
- `includes/auth.php` → नहीं मिला
- `includes/member-auth.php` में `requireMemberLogin()` है
- `includes/config.php` में `requireAdminLogin()` है

Bootstrap file को इन files को खोजना और load करना चाहिए।

## समाधान (Solution)

Updated `_bootstrap.php` file अब सही locations से loads करती है:

1. **Helper functions** - `core/helpers.php` या `includes/helpers.php` से
2. **Auth functions** - `core/auth.php` या `includes/auth.php` से  
3. **Validation** - `core/validation.php` या `includes/validation.php` से
4. **Config** - `includes/config.php` से (contains getDB() और requireAdminLogin())
5. **Member Auth** - `includes/member-auth.php` से (contains requireMemberLogin())

### कदम (Steps to Fix)

#### Option 1 - Direct Update (Recommended)

1. Download: `/vercel/share/v0-project/_bootstrap.php`
2. या copy करें: `/tmp/_bootstrap_fixed.php`
3. अपने server पर replace करें: `YOUR_ROOT/_bootstrap.php`

```bash
# अगर SSH access है:
cp /tmp/_bootstrap_fixed.php /home/bandanas/dev.bandanasigdel.com.np/_bootstrap.php
```

#### Option 2 - cPanel File Manager से

1. cPanel लॉगिन करें
2. File Manager खोलें
3. public_html folder में जाएं
4. `_bootstrap.php` को edit करें
5. नीचे का code लगभग line 128 के बाद add करें:

```php
// Config (contains requireAdminLogin and other auth functions)
$configFiles = [
    BASEDIR . '/includes/config.php',
    BASEDIR . '/config/config.php',
];

foreach ($configFiles as $configFile) {
    if (file_exists($configFile)) {
        require_once $configFile;
        break;
    }
}

// Member auth (contains requireMemberLogin)
$memberAuthFiles = [
    BASEDIR . '/includes/member-auth.php',
];

foreach ($memberAuthFiles as $memberAuthFile) {
    if (file_exists($memberAuthFile)) {
        require_once $memberAuthFile;
        break;
    }
}
```

### परीक्षण (Testing)

After update:

1. Site refresh करें: https://dev.bandanasigdel.com.np/
2. Error gone?
3. अगर नहीं, error log check करें

### अगर अभी भी error आए

तो error log message share करें। शायद कोई और file missing है।

---

## Phase 2 - UI/UX Improvements

अब जब bootstrap error fixed है, Phase 2 शुरू कर सकते हैं:

Modern UI/UX CSS improvements ready हैं!

Let me know when ready. 🚀
