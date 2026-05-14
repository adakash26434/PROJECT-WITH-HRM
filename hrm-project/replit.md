# Dev Bandana Cooperative Website (देव बन्धना सहकारी)

A full-stack PHP + MySQL cooperative society (सहकारी) website with three portals — Public, Admin, and Member — featuring a unified design system and centralized UI components.

## Run & Operate

- Static PHP files — no build step required.
- To preview PHP pages, open files in a PHP-capable environment or deploy to a server with PHP 8.0+ and MySQL.
- No Node.js/pnpm runtime needed.

## Stack

- **Backend**: PHP 8.0+, MySQL (PDO)
- **Frontend**: Bootstrap 5, FontAwesome 6, Mukta + Noto Sans Devanagari
- **Languages**: Nepali (default) + English (toggle)
- **No build tools** — plain PHP + CSS + vanilla JS

## Where things live

```
dev-bandana/
├── index.php                      Public homepage
├── includes/
│   ├── config.php                 DB + site settings
│   ├── header.php                 Public portal HTML head + header
│   ├── footer.php                 Public footer
│   ├── panel-uniform.php          Cross-portal PHP helper functions
│   └── components/                ← Centralized UI components (NEW v6.5)
│       ├── page-banner.php        Inner page hero banner
│       ├── section-header.php     Section heading with divider
│       ├── flash-message.php      Flash alert display
│       ├── stat-card.php          Dashboard KPI stat cards
│       ├── data-table.php         Responsive table opener
│       ├── data-table-close.php   Closes data-table
│       ├── empty-state.php        "No records" empty state
│       ├── form-section.php       Form card section opener
│       ├── form-section-close.php Closes form-section
│       ├── breadcrumb.php         Navigation trail
│       └── _registry.php          Component usage docs/registry
├── assets/
│   ├── css/
│   │   ├── design-tokens.css      Master CSS variables (v6.5 expanded)
│   │   ├── coop-core.css          Unified design system (replaces 6 patch files)
│   │   ├── admin-mobile.css       Admin mobile improvements (NEW v6.5)
│   │   └── _color-vars.php        Dynamic admin-overridable color tokens
│   └── js/
│       └── coop-mobile.js         Unified mobile UX JS (NEW v6.5)
├── admin/
│   ├── includes/admin-header.php  Admin portal header
│   └── assets/admin-modern.css    Admin design overlay
└── member/
    ├── includes/chrome.php         Member portal header/chrome
    └── assets/member-portal-v2.css Member design system
```

## CSS Load Order (all 3 portals)

```
Bootstrap 5 → Fonts → FontAwesome 6
→ design-tokens.css      (master variables + v6.5 expansions)
→ _color-vars.php        (admin Settings dynamic overrides)
→ coop-core.css          (unified design system)
→ portal-specific CSS    (admin-modern.css / member-portal-v2.css / public header.css)
→ admin-mobile.css       (admin mobile improvements)
```

## Architecture Decisions

- **Single Source of Truth**: All CSS variables in `design-tokens.css`, overridable via `_color-vars.php` (admin Settings panel integration).
- **No `!important` bloat**: Reduced from 1,182 to ~123 instances (90% reduction) via `coop-core.css` refactor.
- **Centralized components**: `includes/components/` folder provides 10 reusable PHP UI components — no duplication across 3 portals.
- **Mobile-first**: Bottom nav (member), sticky sidebar (admin), touch targets ≥44px, card-view tables at ≤640px.
- **Constraint**: PHP backend logic, SQL queries, sessions, and security code are never touched — pure frontend/CSS/UI changes only.
- **CSS replaced files** (still exist as backup, no longer loaded): `universal.css`, `global-unify-v2.css`, `ui-uniformity-fix.css`, `v9-mobile-fix.css`, `v10.6-mobile-audit.css`, `site-banner-logo.css`.

## Product

Three portals:
1. **Public** (`/`) — Homepage, services, notices, news, interest rates, KYC apply
2. **Admin** (`/admin/`) — Dashboard, member/KYC/loan management, settings, reports
3. **Member** (`/member/`) — Member dashboard, applications, profile, ID card, welfare claims

## User Preferences

- **Constraint**: Do NOT touch PHP backend logic, SQL, sessions, or security code — frontend only.
- CSS variables preferred over hardcoded colors.
- Nepali first, English toggle support everywhere.
- PHP 8.0+ syntax (arrow functions, match, named args OK).
- Bootstrap 5 + FontAwesome 6 (CDN) — no npm/webpack.

## Component Usage (Quick Reference)

```php
// Page Banner
$pageTitle = 'सदस्यहरू'; $bannerIcon = 'fa-users';
$breadcrumbs = [['label'=>'गृहपृष्ठ','url'=>SITE_URL],['label'=>'सदस्यहरू']];
include __DIR__ . '/../includes/components/page-banner.php';

// Flash Message (reads session + query-string automatically)
include __DIR__ . '/../includes/components/flash-message.php';

// Stat Cards
$statCards = [['label'=>'कुल सदस्य','value'=>150,'icon'=>'fa-users','color'=>'primary','link'=>'members.php']];
include __DIR__ . '/../includes/components/stat-card.php';

// Data Table
$tableHeaders = ['सि.नं.','नाम','मिति','कार्य']; $tableSearch = true;
include __DIR__ . '/../includes/components/data-table.php';
// ... rows with data-label="नाम" on each td ...
$tableRowCount = count($rows);
include __DIR__ . '/../includes/components/data-table-close.php';

// Empty State
$emptyTitle = 'कुनै रेकर्ड छैन'; $emptyAction = ['label'=>'नयाँ','url'=>'add.php','icon'=>'fa-plus'];
include __DIR__ . '/../includes/components/empty-state.php';
```

## PHP Helper Functions (panel-uniform.php)

| Function | Description |
|---|---|
| `coopAlert($type, $msg)` | Returns alert HTML |
| `coopFlash()` | Echoes session flash |
| `coopBreadcrumb($items)` | Returns breadcrumb nav HTML |
| `coopTableOpen($headers)` | Opens responsive table |
| `coopTableClose()` | Closes table |
| `coopTableCell($label, $content)` | `<td data-label>` for card-view |
| `coopEmptyRow($cols, $msg)` | Empty state table row |
| `coopStatusBadge($status)` | Consistent status badge |
| `coopPageHeader($title, $icon, ...)` | Page heading + action btn |
| `coopInfoCard($title, $icon, $rows)` | Key-value info card |
| `coopPaginationLinks($cur, $total, $url)` | Bootstrap 5 pagination |

## Gotchas

- Always include `design-tokens.css` BEFORE `_color-vars.php` — token defaults must exist before overrides.
- `coop-mobile.js` uses `defer` — safe to add to `<head>`.
- `data-table.php` + `data-table-close.php` must be paired (they use `$GLOBALS['__dt_*']`).
- `form-section.php` + `form-section-close.php` must be paired.
- Component variables auto-unset after include — no bleed-through.
- `admin-mobile.css` is NOT yet in admin-header.php load list — add it when ready.
