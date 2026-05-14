# HRM Module — सहकारी मानव संशाधन व्यवस्थापन

तपाईंको Bandana/Aakash सहकारी project को सबै theme, helpers (`getDB()`, `e()`, `csrfField()`, `setFlash`, `card-coop`/`btn-coop`/`field-coop`, `admin-header.php` / `admin-footer.php`), र bilingual UI सँग 1:1 unify गरिएको drop-in HRM module।

समावेश: कर्मचारी मास्टर · विभाग/शाखा · करार पत्र (नविकरण/म्याद alert) · कागजात भण्डार (नागरिकता/PAN/प्रमाण-पत्र, expiry tracking) · शैक्षिक योग्यता · पूर्व अनुभव · परिवार/Nominee · बैंक/PF/CIT/SSF · सेवा-इतिहास (नियुक्ति/बढुवा/सरुवा/निलम्बन/अवकाश) · HRM Dashboard (KPI + alerts)।

> Attendance र Payroll छुट्ट्याइएको छ — पछि छुट्टै module को रूपमा थप्न सजिलो होस् भनेर `hrm_employees.id` लाई FK ले reference गर्न मिल्ने structure राखिएको छ।

---

## 1) Files copy गर्नुहोस्

zip लाई project root मा extract गर्दा यी path मा बस्छन्:

```
admin/hrm-dashboard.php
admin/hrm-employees.php
admin/hrm-employee-view.php
admin/hrm-contracts.php
admin/hrm-documents.php
admin/hrm-departments.php
admin/includes/hrm-tables.php
database/hrm_install.sql
assets/uploads/hrm/             ← writable folder (chmod 775)
```

`assets/uploads/hrm/` writable छ कि भनेर पक्का गर्नुस् (photos / contracts / docs / history subfolder auto बन्छन्)।

## 2) Database tables बनाउनुहोस्

दुईमध्ये कुनै एक तरिका:

- **Auto** — `hrm-dashboard.php` पहिलो पटक खोल्दा `ensureHrmTables()` ले अटोमेटिक तालिका बनाउँछ।
- **Manual** — phpMyAdmin बाट `database/hrm_install.sql` लाई आफ्नै DB मा import गर्नुस् (वा admin → `db-setup.php` / `run-migration.php` मार्फत)।

## 3) Sidebar मा नयाँ "मानव संशाधन (HRM)" group थप्नुहोस्

`admin/includes/admin-header.php` मा:

**(क)** `$pageGroups` array (लगभग line 186 तिर) मा एउटा row थप्नुहोस्:

```php
'hrm' => ['hrm-dashboard','hrm-employees','hrm-employee-view','hrm-contracts','hrm-documents','hrm-departments'],
```

**(ख)** "टोली" (Team) group को ठीक तल यो nav block paste गर्नुहोस्:

```php
<!-- ── मानव संशाधन (HRM) ── -->
<li class="nav-group-wrap">
  <div class="nav-group-header <?php echo $activeGroup=='hrm' ? 'open' : ''; ?>" data-group="hrm">
    <span class="nav-group-icon"><i class="fas fa-id-card-clip"></i></span>
    <span class="nav-group-label"><?php echo $adminT('मानव संशाधन (HRM)', 'HRM'); ?></span>
    <i class="fas fa-chevron-right nav-arrow"></i>
  </div>
  <ul class="nav-submenu <?php echo $activeGroup=='hrm' ? 'open' : ''; ?>" id="group-hrm">
    <li class="<?php echo $currentPage=='hrm-dashboard' ? 'active' : ''; ?>">
      <a href="hrm-dashboard.php"><span class="nav-icon-wrap"><i class="fas fa-gauge-high"></i></span><span><?php echo $adminT('HRM ड्यासबोर्ड', 'HRM Dashboard'); ?></span></a>
    </li>
    <li class="<?php echo in_array($currentPage,['hrm-employees','hrm-employee-view']) ? 'active' : ''; ?>">
      <a href="hrm-employees.php"><span class="nav-icon-wrap"><i class="fas fa-users"></i></span><span><?php echo $adminT('कर्मचारी सूची', 'Employees'); ?></span></a>
    </li>
    <li class="<?php echo $currentPage=='hrm-contracts' ? 'active' : ''; ?>">
      <a href="hrm-contracts.php"><span class="nav-icon-wrap"><i class="fas fa-file-signature"></i></span><span><?php echo $adminT('करार पत्र', 'Contracts'); ?></span></a>
    </li>
    <li class="<?php echo $currentPage=='hrm-documents' ? 'active' : ''; ?>">
      <a href="hrm-documents.php"><span class="nav-icon-wrap"><i class="fas fa-folder-tree"></i></span><span><?php echo $adminT('कागजात भण्डार', 'Documents'); ?></span></a>
    </li>
    <li class="<?php echo $currentPage=='hrm-departments' ? 'active' : ''; ?>">
      <a href="hrm-departments.php"><span class="nav-icon-wrap"><i class="fas fa-sitemap"></i></span><span><?php echo $adminT('विभाग मास्टर', 'Departments'); ?></span></a>
    </li>
  </ul>
</li>
```

बस्। Sidebar मा "मानव संशाधन (HRM)" group देखिन्छ।

## 4) Permissions

- सबै HRM page मा `require_role('admin')` छ — superadmin र admin पुग्छन्। Staff (limited role) ले पुग्न पाउँदैन।
- `hrm-employees.php` मा delete बटन **superadmin only** हो (तपाईंकै `is_superadmin()` check follow गरेको)।

## 5) Designation मास्टर सँग integration

कर्मचारी थप्दा "पद" dropdown तपाईंकै `designations` table बाट आउँछ (existing `fetchDesignations($db, ['staff','admin'])` helper)। नयाँ पद `admin/designations.php` बाटै थप्नुस्।

## 6) Branch (शाखा) सँग integration

Branch dropdown तपाईंकै `service_centers` table बाट आउँछ। केन्द्रीय कार्यालयलाई `0` राखे पुग्छ।

## 7) Future-proof: Attendance / Payroll plugin point

`hrm_employees.id` लाई FK बनाएर पछि:

- `hrm_attendance(employee_id, date, in_time, out_time, status)`
- `hrm_payroll_runs(month, ...)` + `hrm_payroll_items(employee_id, run_id, basic, allowance, deductions, net)`

जस्ता तालिका थप्दा यो module लाई touch गर्नै पर्दैन।

---

बनाउने: यो module तपाईंकै existing pattern (PDO + helpers + theme tokens + bilingual `$adminT`) मा 100% match छ। कुनै नयाँ JS framework वा library थपिएको छैन — Bootstrap 5 + FontAwesome जुन तपाईं पहिल्यै load गर्नुहुन्छ, त्यही मात्र use भएको छ।
