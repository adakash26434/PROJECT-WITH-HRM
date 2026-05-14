<?php
/**
 * 💳 HRM — कर्मचारी Digital ID Card (Bank-style)
 * Standalone printable page; opens in new tab.
 * Uses HRM employee data + site_settings for branding.
 */
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/auth-roles.php';
require_once __DIR__ . '/includes/hrm-tables.php';
require_role('admin');

$db = getDB();
ensureHrmTables($db);

$id = (int)($_GET['id'] ?? 0);
if ($id <= 0) { http_response_code(404); exit('Employee not found'); }

$stmt = $db->prepare("SELECT e.*, d.name_np AS dept_name, d.name_en AS dept_name_en
                      FROM hrm_employees e
                      LEFT JOIN hrm_departments d ON d.id = e.department_id
                      WHERE e.id = ? LIMIT 1");
$stmt->execute([$id]);
$emp = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$emp) { http_response_code(404); exit('Employee not found'); }

/* Branding from site_settings */
$siteName    = function_exists('getSetting') ? getSetting('site_name', 'सहकारी संस्था') : 'सहकारी संस्था';
$siteNameEn  = function_exists('getSetting') ? getSetting('site_name_en', '') : '';
$sitePhone   = function_exists('getSetting') ? getSetting('phone', '') : '';
$siteEmail   = function_exists('getSetting') ? getSetting('email', '') : '';
$siteAddr    = function_exists('getSetting') ? getSetting('address', '') : '';
$siteUrl     = function_exists('getSetting') ? getSetting('site_url', '') : '';
$logoPath    = function_exists('getLocalizedLogoPath') ? getLocalizedLogoPath('assets/images/logo.png') : 'assets/images/logo.png';
$logoSrc     = '../' . ltrim($logoPath, '/');

/* Photo */
$photoSrc = !empty($emp['photo']) ? '../' . ltrim($emp['photo'], '/') : '../assets/images/default-avatar.png';

/* Validity: join_date + 5 years (or contract end if exists in future) */
$joinAd = $emp['join_date_ad'] ?: date('Y-m-d');
$expiry = date('Y-m-d', strtotime($joinAd . ' +5 years'));

/* Card number: EMP code with org prefix */
$cardNo = strtoupper(str_replace(['-',' '], '', $emp['employee_code']));
$cardNoFmt = trim(chunk_split($cardNo, 4, ' '));

/* QR text — verification info */
$qrText = "EMPLOYEE ID CARD\n"
        . "Org: $siteName\n"
        . "Code: " . $emp['employee_code'] . "\n"
        . "Name: " . $emp['full_name_np'] . "\n"
        . "Designation: " . ($emp['designation'] ?? '') . "\n"
        . "Joined: $joinAd\n"
        . "Valid Till: $expiry";
$qrSrc = 'https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=' . urlencode($qrText);
?>
<!DOCTYPE html>
<html lang="ne">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ID Card — <?= htmlspecialchars($emp['full_name_np']) ?></title>
<link rel="stylesheet" href="../assets/css/design-tokens.css">
<style>
  :root {
    --card-w: 540px;
    --card-h: 340px;
    --primary: var(--primary-color, #0a7d3e);
    --primary-dark: var(--primary-dark, #075e2e);
    --gold: #d4af37;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 32px 16px;
    font-family: 'Mukta','Noto Sans Devanagari', system-ui, -apple-system, Segoe UI, sans-serif;
    background: linear-gradient(135deg, #f3f6fb 0%, #e6ebf3 100%);
    min-height: 100vh;
  }
  .toolbar {
    max-width: var(--card-w); margin: 0 auto 18px;
    display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;
  }
  .toolbar button, .toolbar a {
    background: #fff; border: 1px solid #d8dde6; color: #1f2937;
    padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer;
    text-decoration: none; font-size: 14px;
  }
  .toolbar .primary { background: var(--primary); color: #fff; border-color: var(--primary); }

  .id-stack { display: flex; flex-direction: column; align-items: center; gap: 24px; }

  .id-card {
    width: var(--card-w); height: var(--card-h);
    border-radius: 18px; overflow: hidden; position: relative;
    box-shadow: 0 24px 48px rgba(8, 23, 53, 0.18), 0 4px 12px rgba(8,23,53,0.10);
    color: #fff;
    background:
      radial-gradient(circle at 85% 10%, rgba(255,255,255,0.15), transparent 45%),
      radial-gradient(circle at 10% 90%, rgba(255,255,255,0.10), transparent 50%),
      linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 55%, #0e9b53 100%);
  }
  .id-card.back {
    color: #1f2937;
    background: linear-gradient(180deg, #ffffff 0%, #eef2f7 100%);
  }
  /* subtle pattern */
  .id-card::before {
    content: ''; position: absolute; inset: 0;
    background:
      repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 12px, transparent 12px 24px);
    pointer-events: none;
  }

  /* Top bar with logo + org */
  .card-top {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 18px; background: rgba(0,0,0,0.18);
    border-bottom: 2px solid var(--gold);
    position: relative; z-index: 1;
  }
  .card-top img.logo { width: 38px; height: 38px; border-radius: 6px; background: #fff; padding: 2px; object-fit: contain; }
  .card-top .org-name { font-size: 15px; font-weight: 800; line-height: 1.15; letter-spacing: 0.2px; }
  .card-top .org-sub { font-size: 10.5px; opacity: .85; margin-top: 1px; }
  .card-top .badge-emp {
    margin-left: auto; font-size: 10px; font-weight: 700;
    background: var(--gold); color: #2a1b00; padding: 4px 10px; border-radius: 999px;
    letter-spacing: 1px; text-transform: uppercase;
  }

  /* Body */
  .card-body {
    display: flex; gap: 16px; padding: 16px 18px; position: relative; z-index: 1;
  }
  .photo-frame {
    width: 110px; height: 130px; border-radius: 10px; overflow: hidden;
    border: 3px solid var(--gold); background: #fff; flex: 0 0 auto;
    box-shadow: 0 6px 14px rgba(0,0,0,0.25);
  }
  .photo-frame img { width: 100%; height: 100%; object-fit: cover; }
  .info { flex: 1; min-width: 0; }
  .info .name { font-size: 18px; font-weight: 800; line-height: 1.15; margin: 2px 0 2px; }
  .info .name-en { font-size: 11.5px; opacity: .85; margin-bottom: 8px; }
  .info .row {
    display: grid; grid-template-columns: 86px 1fr; gap: 2px 8px;
    font-size: 11.5px; line-height: 1.5;
  }
  .info .row .lbl { opacity: .75; }
  .info .row .val { font-weight: 600; word-break: break-word; }

  /* Card number footer */
  .card-foot {
    position: absolute; left: 0; right: 0; bottom: 0;
    padding: 10px 18px;
    display: flex; justify-content: space-between; align-items: flex-end;
    background: linear-gradient(0deg, rgba(0,0,0,0.30), transparent);
    z-index: 1;
  }
  .card-no {
    font-family: 'Courier New', monospace; font-weight: 700; font-size: 15px;
    letter-spacing: 2px; text-shadow: 0 1px 2px rgba(0,0,0,0.4);
  }
  .validity { font-size: 10.5px; text-align: right; opacity: .9; }
  .validity strong { font-size: 12px; display: block; }

  /* Chip */
  .chip {
    position: absolute; top: 78px; right: 22px; width: 42px; height: 30px;
    background: linear-gradient(135deg, #e9c97a, #b6892a);
    border-radius: 5px; box-shadow: inset 0 0 4px rgba(0,0,0,0.3);
    z-index: 1;
  }
  .chip::before, .chip::after {
    content: ''; position: absolute; left: 4px; right: 4px;
    height: 1px; background: rgba(0,0,0,0.35);
  }
  .chip::before { top: 9px; } .chip::after { bottom: 9px; }

  /* BACK side */
  .back .back-top {
    height: 42px; background: var(--primary);
    margin: 18px 0;
  }
  .back-grid {
    padding: 0 22px; display: grid; grid-template-columns: 1fr 150px; gap: 18px;
    align-items: center;
  }
  .back-info { font-size: 11.5px; line-height: 1.65; color: #1f2937; }
  .back-info b { color: var(--primary-dark); }
  .back-info .terms {
    margin-top: 10px; font-size: 10px; color: #4b5563; line-height: 1.55;
    border-top: 1px dashed #cbd5e1; padding-top: 8px;
  }
  .back-info .sig {
    margin-top: 14px; display: flex; justify-content: space-between; gap: 12px;
    font-size: 10.5px; color: #4b5563;
  }
  .back-info .sig div { text-align: center; flex: 1; }
  .back-info .sig .line {
    border-top: 1px solid #94a3b8; margin-bottom: 4px; padding-top: 18px;
  }
  .qr { background: #fff; padding: 8px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
  .qr img { display: block; width: 130px; height: 130px; }
  .back-foot {
    position: absolute; bottom: 10px; left: 0; right: 0; text-align: center;
    font-size: 10px; color: #6b7280;
  }

  @media print {
    body { background: #fff; padding: 0; }
    .toolbar { display: none; }
    .id-stack { gap: 18px; }
    .id-card { box-shadow: none; border: 1px solid #d1d5db; }
    @page { size: auto; margin: 12mm; }
  }
  @media (max-width: 580px) {
    :root { --card-w: 92vw; --card-h: calc(92vw * 0.63); }
    .info .name { font-size: 16px; }
    .photo-frame { width: 90px; height: 110px; }
    .chip { display: none; }
  }
</style>
</head>
<body>

<div class="toolbar">
  <button class="primary" onclick="window.print()"><i class="fas fa-print"></i> 🖨 Print / PDF</button>
  <a href="hrm-employee-view.php?id=<?= (int)$emp['id'] ?>">← View Profile</a>
</div>

<div class="id-stack">

  <!-- ============ FRONT ============ -->
  <div class="id-card front">
    <div class="card-top">
      <img class="logo" src="<?= htmlspecialchars($logoSrc) ?>" alt="logo" onerror="this.style.display='none'">
      <div>
        <div class="org-name"><?= htmlspecialchars($siteName) ?></div>
        <?php if ($siteAddr): ?><div class="org-sub"><?= htmlspecialchars($siteAddr) ?></div><?php endif; ?>
      </div>
      <span class="badge-emp">Employee</span>
    </div>

    <div class="chip"></div>

    <div class="card-body">
      <div class="photo-frame">
        <img src="<?= htmlspecialchars($photoSrc) ?>" alt="photo"
             onerror="this.src='../assets/images/default-avatar.png'">
      </div>
      <div class="info">
        <div class="name"><?= htmlspecialchars($emp['full_name_np']) ?></div>
        <?php if (!empty($emp['full_name_en'])): ?>
          <div class="name-en"><?= htmlspecialchars($emp['full_name_en']) ?></div>
        <?php endif; ?>
        <div class="row">
          <div class="lbl">पद / Designation</div><div class="val"><?= htmlspecialchars($emp['designation'] ?? '—') ?></div>
          <?php if (!empty($emp['dept_name'])): ?>
          <div class="lbl">विभाग</div><div class="val"><?= htmlspecialchars($emp['dept_name']) ?></div>
          <?php endif; ?>
          <?php if (!empty($emp['blood_group'])): ?>
          <div class="lbl">रक्त समूह</div><div class="val"><?= htmlspecialchars($emp['blood_group']) ?></div>
          <?php endif; ?>
          <?php if (!empty($emp['mobile'])): ?>
          <div class="lbl">सम्पर्क</div><div class="val"><?= htmlspecialchars($emp['mobile']) ?></div>
          <?php endif; ?>
        </div>
      </div>
    </div>

    <div class="card-foot">
      <div class="card-no"><?= htmlspecialchars($cardNoFmt) ?></div>
      <div class="validity">
        <span>Valid Thru</span>
        <strong><?= htmlspecialchars(date('m/Y', strtotime($expiry))) ?></strong>
      </div>
    </div>
  </div>

  <!-- ============ BACK ============ -->
  <div class="id-card back">
    <div class="back-top"></div>
    <div class="back-grid">
      <div class="back-info">
        <div><b>Employee Code:</b> <?= htmlspecialchars($emp['employee_code']) ?></div>
        <?php if (!empty($emp['email'])): ?><div><b>Email:</b> <?= htmlspecialchars($emp['email']) ?></div><?php endif; ?>
        <?php if (!empty($emp['citizenship_no'])): ?><div><b>Citizenship No:</b> <?= htmlspecialchars($emp['citizenship_no']) ?></div><?php endif; ?>
        <div><b>Joined:</b> <?= htmlspecialchars($joinAd) ?>  &nbsp; <b>Valid Till:</b> <?= htmlspecialchars($expiry) ?></div>

        <div class="terms">
          यो परिचय पत्र <strong><?= htmlspecialchars($siteName) ?></strong> को सम्पत्ति हो।
          भेटिएमा कृपया <?= htmlspecialchars($sitePhone ?: 'कार्यालय') ?> मा फिर्ता गराइदिनुहोस्।
          सेवा अवधि समाप्त भएपछि यो कार्ड अमान्य हुनेछ।
        </div>

        <div class="sig">
          <div><div class="line"></div>कर्मचारी हस्ताक्षर</div>
          <div><div class="line"></div>अधिकृत हस्ताक्षर</div>
        </div>
      </div>
      <div class="qr">
        <img src="<?= htmlspecialchars($qrSrc) ?>" alt="QR">
      </div>
    </div>
    <div class="back-foot">
      <?php if ($sitePhone): ?>📞 <?= htmlspecialchars($sitePhone) ?> &nbsp;<?php endif; ?>
      <?php if ($siteUrl): ?>🌐 <?= htmlspecialchars(preg_replace('~^https?://~','',$siteUrl)) ?><?php endif; ?>
    </div>
  </div>

</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</body>
</html>
