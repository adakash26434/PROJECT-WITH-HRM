# Theme Audit v3 — Phase 3 Findings + Fixes

## तपाईंले देखाएका screenshots को विश्लेषण

| # | Screenshot | समस्या | Fix |
|---|---|---|---|
| 1 | सूचनाहरू list (homepage) | Header gradient, date pill orange/yellow — brand सँग match नभएको | `theme-overrides-v3.css` § 4 — gradient/date-pill लाई primary-color मा अनुवाद |
| 2 | छिटो लिंक dropdown (red) | Bootstrap default red bg, theme नदेखिने | § 3 — white bg + theme hover |
| 3 / 4 | career.php (green vs blue hero) | दुई different deployments — theme color admin Settings बाट बेग्लै set भएको हो (working as designed) | कुनै bug छैन; admin > Settings > Brand Color बाट unify गर्नुस् |
| 5 | KYC भाग 2/10 stepper | Step buttons square देखिएको, label squished | § 2 — pill shape + horizontal scroll + label width fix |
| 6 | member-welfare claim sidebar | प्रत्येक sidebar item को left bar random color (orange, blue, green, pink) | § 1 — semantic theme palette (success/warning/info/primary) |

## के-के unify भयो (sitewide)

1. **Claim type icons** (`member-welfare.php`) — random hex हटाइ semantic theme tokens (`--primary-color`, `--color-success`, `--color-warning`, `--color-info`)
2. **KYC wizard steps** — pill shape, horizontal scroll, larger label space
3. **Quick-link dropdown** — white surface + theme hover (no more red)
4. **Notice cards** — header gradient + date pills अब brand color बाट
5. **Mobile fonts** — base font 0.9375rem, `h1/h2/h3` clamp() ले proportional scale
6. **Tables** — header tinted, row hover, brand-aware
7. **Tabs / Pills** — active state मा primary
8. **Forms** — radius/font-family unified
9. **Card icons** — feature/service/stat icons primary color
10. **Buttons** — `.btn-brand-override` utility added for stray red/yellow bootstrap buttons

## Wired into

- `includes/header.php` (public)
- `admin/_partials/header.php` (admin)
- `member/_partials/header.php` (member portal)

## File added

- `assets/css/theme-overrides-v3.css` (185 lines, all `var(--*)`-based, zero hardcoded brand color)

## अब बाँकी (recommended next pass)

- `assets/css/style.css` मा अझै 30+ ठाउँमा hardcoded gradients (#1976d2, #f6d155, etc.) — utility tokens मा migrate (separate refactor)
- Admin > Settings > Brand Color बाट production deployment uniform गर्नुस् (दुई screenshots blue vs green देखाइएको कारण यही हो)
