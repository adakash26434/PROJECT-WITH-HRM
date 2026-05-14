<?php
/**
 * ════════════════════════════════════════════════════════════
 * STAT CARD — Dashboard KPI Card Component
 * Public, Admin, Member तीनैमा एउटै stat card
 * ════════════════════════════════════════════════════════════
 *
 * Use गर्ने तरिका:
 *   <?php
 *   $statCards = [
 *     [
 *       'label'  => 'कुल सदस्य',
 *       'value'  => $stats['members'],
 *       'icon'   => 'fa-users',
 *       'color'  => 'primary',   // primary | success | warning | danger | info | secondary
 *       'link'   => 'members.php',  // optional
 *       'badge'  => 'नयाँ',         // optional small badge text
 *       'trend'  => '+12%',          // optional trend text
 *     ],
 *     ...
 *   ];
 *   $statColClass = 'col-6 col-md-3';  // Bootstrap grid class (default: col-6 col-md-3)
 *   include __DIR__ . '/../includes/components/stat-card.php';
 *   ?>
 *
 * Constraint: PHP backend logic नछुने।
 * ════════════════════════════════════════════════════════════
 */
if (!isset($statCards) || !is_array($statCards)) $statCards = [];
if (!isset($statColClass)) $statColClass = 'col-6 col-md-3';

/* v11.2 — flat single-box stat card; pure CSS-token based (no hardcoded hex). */
$_colorMap = [
    'primary'   => ['bg' => 'var(--primary-color)',           'text' => '#fff'],
    'success'   => ['bg' => 'var(--color-success, #16a34a)',  'text' => '#fff'],
    'danger'    => ['bg' => 'var(--color-danger,  #dc2626)',  'text' => '#fff'],
    'warning'   => ['bg' => 'var(--color-warning, #f59e0b)',  'text' => '#fff'],
    'info'      => ['bg' => 'var(--color-info,    #0ea5e9)',  'text' => '#fff'],
    'secondary' => ['bg' => 'var(--secondary-color)',         'text' => '#fff'],
];
?>
<div class="row g-3 mb-4 stat-card-row">
<?php foreach ($statCards as $_card):
    $_color  = $_card['color'] ?? 'primary';
    $_cm     = $_colorMap[$_color] ?? $_colorMap['primary'];
    $_link   = htmlspecialchars($_card['link'] ?? '', ENT_QUOTES, 'UTF-8');
    $_label  = htmlspecialchars($_card['label'] ?? '', ENT_QUOTES, 'UTF-8');
    $_value  = htmlspecialchars((string)($_card['value'] ?? '0'), ENT_QUOTES, 'UTF-8');
    $_icon   = htmlspecialchars($_card['icon']  ?? 'fa-chart-bar', ENT_QUOTES, 'UTF-8');
    $_badge  = !empty($_card['badge']) ? htmlspecialchars($_card['badge'], ENT_QUOTES, 'UTF-8') : '';
    $_trend  = !empty($_card['trend']) ? htmlspecialchars($_card['trend'], ENT_QUOTES, 'UTF-8') : '';
    $_tag    = $_link ? 'a' : 'div';
    $_href   = $_link ? " href=\"{$_link}\"" : '';
?>
<div class="<?php echo $statColClass; ?>">
    <<?php echo $_tag; ?><?php echo $_href; ?> class="stat-card stat-card-flat d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none h-100"
        style="--sc-accent:<?php echo $_cm['bg']; ?>;">
        <div class="stat-card-icon d-flex align-items-center justify-content-center flex-shrink-0"
             style="background:var(--sc-accent);color:<?php echo $_cm['text']; ?>;">
            <i class="fas <?php echo $_icon; ?>"></i>
        </div>
        <div class="stat-card-body min-w-0">
            <div class="stat-card-value"><?php echo $_value; ?></div>
            <div class="stat-card-label">
                <?php echo $_label; ?>
                <?php if ($_badge): ?>
                    <span class="badge stat-card-badge ms-1"><?php echo $_badge; ?></span>
                <?php endif; ?>
            </div>
            <?php if ($_trend): ?>
            <div class="stat-card-trend"><?php echo $_trend; ?></div>
            <?php endif; ?>
        </div>
        <?php if ($_link): ?>
        <i class="fas fa-chevron-right stat-card-chev ms-auto flex-shrink-0"></i>
        <?php endif; ?>
    </<?php echo $_tag; ?>>
</div>
<?php endforeach; ?>
</div>
<?php
unset($statCards, $statColClass, $_colorMap, $_card, $_color, $_cm, $_link, $_label, $_value, $_icon, $_badge, $_trend, $_tag, $_href);
?>
