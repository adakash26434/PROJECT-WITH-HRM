# Live Readiness Issue List

## Completed Cleanup

- Centralized shared CSS into `assets/css/unified-portal.css`.
- Consolidated final theme overrides into `assets/css/theme-overrides-v4.css`.
- Removed unused old CSS and separate merged CSS files.
- Removed Next/v0 mockup prototype layer from the PHP/cPanel package.
- Kept PHP business logic, database config strategy, uploads, and runtime folders untouched.

## Main Global Theme Stack

1. `assets/css/design-tokens.css`
2. `assets/css/global-theme.php`
3. Portal/page CSS as needed
4. `assets/css/unified-portal.css`
5. `assets/css/theme-overrides-v4.css`

## Remaining Items To Check Manually Before Live

1. Verify homepage header/menu on mobile and desktop.
2. Verify public pages: loan apply, online KYC, career, notices, contact.
3. Verify admin login, dashboard, member management, settings/theme color.
4. Verify member login, dashboard, profile/KYC, service request.
5. Verify public `verify.php` and tracker pages.
6. Confirm cPanel PHP version is 8.0+.
7. Confirm `includes/database.local.php` has live DB credentials.
8. Confirm `assets/uploads/`, `cache/`, and `logs/` are writable on hosting.
9. Clear browser/cache after upload because CSS files were consolidated.
10. Send any visual or functional issue one by one for targeted fixes.

## Do Not Delete

- `includes/database.local.php`
- `includes/database.dist.php`
- `database/`
- `assets/uploads/`
- `cache/`
- `logs/`
- `.cred-master.key` if present
