<?php
/**
 * ═══════════════════════════════════════════════════════════════
 * 🎨 GLOBAL THEME — Dynamic CSS Variable Injector
 * ═══════════════════════════════════════════════════════════════
 * फाइल: assets/css/global-theme.php
 *
 * यो एउटै फाइलले Public Website, Admin Portal, Member Portal र
 * Verify Portal — सबैको color theme handle गर्छ।
 *
 * 📌 प्रयोग गर्ने तरिका (सबै portal को <head> मा):
 * ───────────────────────────────────────────────────────────────
 *   <link rel="stylesheet" href="<?= SITE_URL ?>assets/css/unified-portal.css?v=<?= THEME_VERSION ?>">
 *   <?php require ROOT_PATH . 'assets/css/global-theme.php'; ?>
 *
 * ✅ यसले admin/Settings बाट बदलिएको color तुरुन्त सबैतिर reflect गर्छ।
 * ✅ कतै पनि color hardcode नगर्नुस् — सधैं CSS variable प्रयोग गर्नुस्।
 * ═══════════════════════════════════════════════════════════════
 */

if (!function_exists('getSetting')) {
    return; // config.php include नभई यो file load नगर्नुस्
}

define('THEME_VERSION', '2.0');

/* ─── Hex normalizer ─── */
$__hex = function (string $raw, string $fallback = '#1a5f2a'): string {
    $v = trim($raw);
    if ($v === '') return strtolower($fallback);
    if (preg_match('/^#([0-9a-fA-F]{3})$/', $v, $m)) {
        $h = strtolower($m[1]);
        return '#' . $h[0].$h[0] . $h[1].$h[1] . $h[2].$h[2];
    }
    if (preg_match('/^#([0-9a-fA-F]{6})$/', $v)) {
        return strtolower($v);
    }
    return strtolower($fallback);
};

/* ─── Darken/Lighten helper ─── */
$__shift = function (string $hex, int $amt): string {
    $hex = ltrim($hex, '#');
    if (strlen($hex) !== 6) return '#' . $hex;
    $clamp = fn($v) => max(0, min(255, (int)$v));
    $r = $clamp(hexdec(substr($hex, 0, 2)) - $amt);
    $g = $clamp(hexdec(substr($hex, 2, 2)) - $amt);
    $b = $clamp(hexdec(substr($hex, 4, 2)) - $amt);
    return sprintf('#%02x%02x%02x', $r, $g, $b);
};

/* ─── rgba() helper ─── */
$__rgba = function (string $hex, float $alpha): string {
    $hex = ltrim($hex, '#');
    if (strlen($hex) !== 6) return "rgba(26,95,42,{$alpha})";
    $r = hexdec(substr($hex, 0, 2));
    $g = hexdec(substr($hex, 2, 2));
    $b = hexdec(substr($hex, 4, 2));
    return "rgba({$r},{$g},{$b},{$alpha})";
};

/* ─── Best foreground text for a background ─── */
/* WCAG 2.1 relative luminance threshold: 0.179 (midpoint between white=1 and black=0) */
$__textOn = function (string $hex) use ($__rgba): string {
    $hex = ltrim($hex, '#');
    if (strlen($hex) !== 6) return '#ffffff';
    $toLinear = fn($c) => ($c <= 0.03928) ? ($c / 12.92) : pow(($c + 0.055) / 1.055, 2.4);
    $r = $toLinear(hexdec(substr($hex, 0, 2)) / 255);
    $g = $toLinear(hexdec(substr($hex, 2, 2)) / 255);
    $b = $toLinear(hexdec(substr($hex, 4, 2)) / 255);
    $lum = 0.2126 * $r + 0.7152 * $g + 0.0722 * $b;
    // WCAG: contrast ratio white vs bg vs black vs bg — pick higher contrast
    $contrastWhite = (1.05) / ($lum + 0.05);
    $contrastBlack = ($lum + 0.05) / (0.05);
    return ($contrastBlack > $contrastWhite) ? '#111827' : '#ffffff';
};

/* ─── RGB components ─── */
$__rgb = function (string $hex): string {
    $hex = ltrim($hex, '#');
    if (strlen($hex) !== 6) return '26, 95, 42';
    return hexdec(substr($hex, 0, 2)) . ', '
         . hexdec(substr($hex, 2, 2)) . ', '
         . hexdec(substr($hex, 4, 2));
};

/* ═══════════════════════════════════════════════════════════
   DB बाट colors पढ्ने
   ═══════════════════════════════════════════════════════════ */
$_p  = $__hex((string) getSetting('primary_color',   '#1a5f2a'), '#1a5f2a'); // Primary brand
$_s  = $__hex((string) getSetting('secondary_color', '#c0392b'), '#c0392b'); // Accent/secondary
$_h  = $__hex((string) getSetting('header_color',    $_s),       $_s);       // Header/topbar
$_f  = $__hex((string) getSetting('footer_color',    $_p),       $_p);       // Footer

/* Shades */
$_pDark   = $__shift($_p, 36);
$_pLight  = $__shift($_p, -28);
$_pXLight = $__shift($_p, -48);
$_sDark   = $__shift($_s, 30);
$_hDark   = $__shift($_h, 30);
$_fDark   = $__shift($_f, 24);

/* Foreground text colors */
$_onP = $__textOn($_p);
$_onS = $__textOn($_s);
$_onH = $__textOn($_h);
$_onF = $__textOn($_f);

/* RGB for rgba() usage */
$_pRgb = $__rgb($_p);
$_sRgb = $__rgb($_s);

/* Shadows */
$_shadowP  = "0 4px 20px " . $__rgba($_p, 0.20);
$_shadowS  = "0 4px 16px " . $__rgba($_s, 0.20);
$_shadowFocus = "0 0 0 3px " . $__rgba($_p, 0.18);

/* ─── Current panel detection ─── */
$_panel = 'public';
if (defined('IS_ADMIN_PAGE') && IS_ADMIN_PAGE) {
    $_panel = 'admin';
} elseif (!empty($_SERVER['PHP_SELF']) && str_contains((string)$_SERVER['PHP_SELF'], '/member/')) {
    $_panel = 'member';
} elseif (!empty($_SERVER['PHP_SELF']) && str_contains((string)$_SERVER['PHP_SELF'], '/verify')) {
    $_panel = 'verify';
}
?>
<style id="coop-global-theme" data-panel="<?= htmlspecialchars($_panel, ENT_QUOTES) ?>">
/* ═══════════════════════════════════════════════════════════
   🎨 GLOBAL THEME — Admin बाट DB मा save गरिएका रङहरू
   Portal: <?= $_panel ?> | Version: <?= THEME_VERSION ?>
   ═══════════════════════════════════════════════════════════ */
:root {
    /* ── Brand Colors ── */
    --primary-color:    <?= $_p ?>;
    --primary-dark:     <?= $_pDark ?>;
    --primary-light:    <?= $_pLight ?>;
    --primary-xlight:   <?= $_pXLight ?>;
    --primary-rgb:      <?= $_pRgb ?>;

    --secondary-color:  <?= $_s ?>;
    --secondary-dark:   <?= $_sDark ?>;
    --secondary-rgb:    <?= $_sRgb ?>;

    --header-color:     <?= $_h ?>;
    --header-dark:      <?= $_hDark ?>;
    --topbar-bg:        <?= $_h ?>;

    --footer-color:     <?= $_f ?>;
    --footer-dark:      <?= $_fDark ?>;

    /* ── Text on brand backgrounds ── */
    --text-on-primary:   <?= $_onP ?>;
    --text-on-secondary: <?= $_onS ?>;
    --text-on-header:    <?= $_onH ?>;
    --text-on-footer:    <?= $_onF ?>;

    /* ── Shadows derived from brand ── */
    --shadow-primary:  <?= $_shadowP ?>;
    --shadow-secondary:<?= $_shadowS ?>;
    --shadow-focus:    <?= $_shadowFocus ?>;

    /* ── Semantic surface colors (light mode defaults) ── */
    --bg-page:         #f8faf9;
    --bg-card:         #ffffff;
    --bg-soft:         #f5faf6;
    --bg-muted:        #e8f5e9;
    --bg-hover:        rgba(<?= $_pRgb ?>, 0.04);

    /* ── Text scale ── */
    --text-primary:    #1a2e1f;
    --text-secondary:  #4a5a4f;
    --text-muted:      #6b7280;
    --text-light:      #9ca3af;

    /* ── Borders ── */
    --border-color:    #e5e7eb;
    --border-soft:     #f0f0f0;
    --border-focus:    <?= $_p ?>;

    /* ── Status Colors (fixed, not brand-dependent) ── */
    --color-success:   #16a34a;
    --color-warning:   #d97706;
    --color-danger:    #dc2626;
    --color-info:      #0891b2;

    --color-success-bg: #f0fdf4;
    --color-warning-bg: #fffbeb;
    --color-danger-bg:  #fef2f2;
    --color-info-bg:    #ecfeff;

    --color-success-border: #bbf7d0;
    --color-warning-border: #fde68a;
    --color-danger-border:  #fecaca;
    --color-info-border:    #a5f3fc;

    /* ── Typography ── */
    --font-primary:    'Mukta', 'Noto Sans Devanagari', 'Inter', 'Segoe UI', sans-serif;
    --font-nepali:     'Noto Sans Devanagari', 'Mukta', sans-serif;
    --font-english:    'Inter', 'Poppins', 'Segoe UI', sans-serif;
    --font-mono:       'JetBrains Mono', 'Fira Code', monospace;

    --font-size-xs:    0.75rem;
    --font-size-sm:    0.8125rem;
    --font-size-base:  0.9375rem;
    --font-size-md:    1rem;
    --font-size-lg:    1.125rem;
    --font-size-xl:    1.25rem;
    --font-size-2xl:   1.5rem;
    --font-size-3xl:   1.875rem;

    /* ── Spacing scale ── */
    --space-xs:  4px;
    --space-sm:  8px;
    --space-md:  16px;
    --space-lg:  24px;
    --space-xl:  40px;
    --space-2xl: 64px;

    /* ── Border radius scale ── */
    --radius-sm:  6px;
    --radius-md:  10px;
    --radius-lg:  16px;
    --radius-xl:  24px;
    --radius-full: 9999px;

    /* ── Shadow scale ── */
    --shadow-xs:  0 1px 2px rgba(0,0,0,0.06);
    --shadow-sm:  0 1px 4px rgba(0,0,0,0.08);
    --shadow-md:  0 4px 16px rgba(0,0,0,0.10);
    --shadow-lg:  0 8px 32px rgba(0,0,0,0.12);
    --shadow-xl:  0 16px 48px rgba(0,0,0,0.14);

    /* ── Layout ── */
    --container-max:   1280px;
    --container-pad:   20px;

    /* ── Animation ── */
    --transition-fast:   0.15s ease;
    --transition-base:   0.25s ease;
    --transition-slow:   0.4s ease;

    /* ── Z-index scale ── */
    --z-dropdown:  100;
    --z-sticky:    200;
    --z-overlay:   300;
    --z-modal:     400;
    --z-toast:     500;
    --z-tooltip:   600;
}

/* ─── Bootstrap overrides: सबै panel मा consistent ─── */
.btn-primary, .bg-primary                    { background-color: var(--primary-color) !important; border-color: var(--primary-color) !important; color: var(--text-on-primary) !important; }
.btn-primary:hover, .btn-primary:focus       { background-color: var(--primary-dark) !important; border-color: var(--primary-dark) !important; color: var(--text-on-primary) !important; }
.btn-outline-primary                         { color: var(--primary-color) !important; border-color: var(--primary-color) !important; }
.btn-outline-primary:hover                   { background-color: var(--primary-color) !important; color: var(--text-on-primary) !important; }
.text-primary                                { color: var(--primary-color) !important; }
.border-primary                              { border-color: var(--primary-color) !important; }

.form-control:focus, .form-select:focus      { border-color: var(--primary-color) !important; box-shadow: var(--shadow-focus) !important; }
.form-check-input:checked                    { background-color: var(--primary-color) !important; border-color: var(--primary-color) !important; }
.form-check-input:focus                      { box-shadow: var(--shadow-focus) !important; }

.nav-pills .nav-link.active,
.nav-tabs .nav-link.active                   { background-color: var(--primary-color) !important; border-color: var(--primary-color) !important; color: var(--text-on-primary) !important; }
.page-item.active .page-link                 { background-color: var(--primary-color) !important; border-color: var(--primary-color) !important; color: var(--text-on-primary) !important; }
.list-group-item.active                      { background-color: var(--primary-color) !important; border-color: var(--primary-color) !important; }
.progress-bar                                { background-color: var(--primary-color) !important; }

/* Header / Topbar */
.top-bar, .topbar, .site-topbar, .header-top, .navbar-top { background-color: var(--header-color) !important; color: var(--text-on-header) !important; }
.top-bar a, .topbar a, .site-topbar a       { color: var(--text-on-header) !important; }

/* Footer */
footer, .site-footer, .footer-main          { background-color: var(--footer-color) !important; color: var(--text-on-footer) !important; }
footer a, .site-footer a                    { color: rgba(255,255,255,0.85); }
footer a:hover, .site-footer a:hover        { color: #ffffff; }

/* Sidebar active state (admin/member) */
.sidebar-nav li.active > a,
.sidebar-nav a.active,
.mem-sidebar .active > a,
.admin-sidebar .active                      { color: var(--text-on-primary) !important; background: var(--primary-color) !important; }

/* ─── Auto text-contrast on brand-coloured backgrounds ─────────────────
   Rule: जुनसुकै element मा primary/secondary/header/footer रङ्को background
   आउँदा text colour automatically readable हुनुपर्छ।
   NOTE: global-theme.php ले --text-on-* variables WCAG luminance बाट
   compute गर्छ (light bg → dark text, dark bg → white text).
   ─────────────────────────────────────────────────────────────────────── */

/* Admin table headers using primary brand colour */
.admin-table thead th,
table.table-primary thead th,
.table > thead.bg-primary > tr > th,
.table > thead > tr.bg-primary > th        { background: var(--primary-color) !important;
                                             color: var(--text-on-primary) !important; }

/* Page banners & hero sections */
.page-banner, .page-banner-modern,
.page-banner h1, .page-banner h2, .page-banner h3,
.page-banner-modern h1, .page-banner-modern h2,
.page-banner .breadcrumb-item,
.page-banner .breadcrumb-item a,
.page-banner-modern .breadcrumb-item,
.page-banner-modern .breadcrumb-item a     { color: var(--text-on-primary) !important; }

/* Admin topbar / header bar */
.admin-header, .admin-topbar,
.admin-header a, .admin-topbar a,
.admin-header .topbar-user-name,
.admin-header .page-title                  { color: var(--text-on-header) !important; }

/* Sidebar header brand area */
.sidebar .sidebar-header,
.sidebar .sidebar-brand-text               { color: var(--text-on-primary) !important; }

/* Coop-style buttons */
.btn-coop                                  { background: var(--primary-color) !important;
                                             border-color: var(--primary-color) !important;
                                             color: var(--text-on-primary) !important; }
.btn-coop:hover, .btn-coop:focus           { background: var(--primary-dark) !important;
                                             border-color: var(--primary-dark) !important;
                                             color: var(--text-on-primary) !important; }

/* Card headers that use primary/secondary backgrounds */
.card-header.bg-primary,
.card-header.bg-secondary                  { color: var(--text-on-primary) !important; }
.card-header.bg-secondary                  { background: var(--secondary-color) !important;
                                             color: var(--text-on-secondary) !important; }

/* Badges & pills */
.badge.bg-primary, .badge-primary          { color: var(--text-on-primary) !important; }
.badge.bg-secondary, .badge-secondary      { color: var(--text-on-secondary) !important; }

/* stat-card — white background, so use dark text (not --text-on-primary which is for brand-bg) */
/* Only stat-card variants with explicit brand background get light text */
.stat-card { color: var(--text-primary) !important; }
.stat-card h3, .stat-card .stat-number { color: var(--text-primary) !important; }
.stat-card p, .stat-card .stat-label    { color: var(--text-muted) !important; }
/* Brand-background variant: add class .stat-card-brand for colored cards */
.stat-card.stat-card-brand,
.stat-card.stat-card-brand h3,
.stat-card.stat-card-brand p,
.stat-card.stat-card-brand .stat-number,
.stat-card.stat-card-brand .stat-label  { color: var(--text-on-primary) !important; }
</style>
