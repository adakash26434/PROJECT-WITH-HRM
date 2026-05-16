<?php
/**
 * 🔧 QUICK-FIX IMPLEMENTATION SCRIPT
 * ════════════════════════════════════════════════════════
 * यो script ले सबै hardcoded colors replace गर्छ।
 * 
 * Usage:
 *   1. Run locally: php fix-colors.php
 *   2. Review changes
 *   3. Commit to git
 * ════════════════════════════════════════════════════════
 */

$startTime = microtime(true);

// ─────────────────────────────────────────────────
// COLOR MAPPING — Hardcoded to Tokens
// ─────────────────────────────────────────────────

$colorMapping = [
    // Green Palette (Brand colors)
    '#1a5f2a' => 'var(--primary-color)',
    '#144a21' => 'var(--primary-dark)',
    '#2e8b4a' => 'var(--primary-light)',
    '#4caf6a' => 'var(--primary-glow)',
    '#4caf50' => 'var(--color-success)',
    
    // Red Palette (Secondary/Header)
    '#c0392b' => 'var(--secondary-color)',
    '#922b21' => 'var(--secondary-dark)',
    '#dc3545' => 'var(--color-danger)',
    '#f44336' => 'var(--color-danger)',
    
    // Blue Palette (Info)
    '#1976d2' => 'var(--color-info)',
    '#00bcd4' => 'var(--color-info)',
    '#2196F3' => 'var(--color-info)',
    
    // Yellow/Amber (Warning)
    '#f6d155' => 'var(--color-warning)',
    '#ff9800' => 'var(--color-warning)',
    '#ffc107' => 'var(--color-warning)',
    '#f39c12' => 'var(--color-warning)',
    
    // Gray Palette
    '#757575' => 'var(--text-muted)',
    '#e0e0e0' => 'var(--border-color)',
    '#f5f5f5' => 'var(--bg-soft)',
    '#e8f5e9' => 'var(--bg-muted)',
    '#f8faf9' => 'var(--bg-page)',
    '#ffffff' => 'var(--bg-card)', // Only if isolated, not in 'white'
    '#1a2e1f' => 'var(--text-primary)',
    '#4a5a4f' => 'var(--text-secondary)',
];

// RGB Colors (need conversion)
$rgbMapping = [
    'rgba(26,95,42,' => 'rgba(var(--primary-rgb),',
    'rgba(26, 95, 42,' => 'rgba(var(--primary-rgb),',
    'rgb(26,95,42)' => 'rgb(var(--primary-rgb))',
    'rgb(26, 95, 42)' => 'rgb(var(--primary-rgb))',
];

// ─────────────────────────────────────────────────
// FILES TO PROCESS
// ─────────────────────────────────────────────────

$filesToProcess = [
    'assets/css/style.css',
    'assets/css/coop-core.css',
    'assets/css/public-modern.css',
    'assets/css/unified-portal.css',
    'assets/css/design-tokens.css', // Check only, don't modify
    'admin/assets/admin.css',
    'member/assets/member.css',
];

// ─────────────────────────────────────────────────
// FUNCTION: Safe Color Replacement
// ─────────────────────────────────────────────────

function replaceColors($content, $mapping) {
    $original = $content;
    $replacements = 0;
    
    foreach ($mapping as $old => $new) {
        // Case-insensitive word-boundary match
        $pattern = '/(?<![#\w])' . preg_quote($old, '/') . '(?![\w])/i';
        
        // Count matches before replacement
        if (preg_match_all($pattern, $content)) {
            $matches = preg_match_all($pattern, $content);
            $replacements += $matches;
            
            // Perform replacement
            $content = preg_replace($pattern, $new, $content);
        }
    }
    
    return [
        'content' => $content,
        'changed' => ($content !== $original),
        'count' => $replacements
    ];
}

// ─────────────────────────────────────────────────
// MAIN PROCESSING
// ─────────────────────────────────────────────────

echo "🔧 COLOR MAPPING FIX-COLORS.PHP\n";
echo "═════════════════════════════════════════════════════════\n\n";

$totalFiles = count($filesToProcess);
$processedFiles = 0;
$totalReplacements = 0;
$errors = [];

foreach ($filesToProcess as $file) {
    // Check if file exists
    if (!file_exists($file)) {
        echo "⏭️  SKIP (not found): $file\n";
        continue;
    }
    
    $processedFiles++;
    
    // Read file
    $content = file_get_contents($file);
    if ($content === false) {
        echo "❌ ERROR reading: $file\n";
        $errors[] = "Failed to read $file";
        continue;
    }
    
    // Skip if design-tokens.css (just audit)
    if (basename($file) === 'design-tokens.css') {
        $result = replaceColors($content, $colorMapping);
        echo "📊 AUDIT: $file ({$result['count']} potential matches)\n";
        if ($result['count'] > 0) {
            echo "   ⚠️  NOTE: This file DEFINES tokens, do not modify\n";
        }
        continue;
    }
    
    // Apply color replacement
    $result = replaceColors($content, $colorMapping);
    
    if (!$result['changed']) {
        echo "⏭️  NO CHANGES: $file\n";
        continue;
    }
    
    // Write back to file
    if (file_put_contents($file, $result['content']) === false) {
        echo "❌ ERROR writing: $file\n";
        $errors[] = "Failed to write $file";
        continue;
    }
    
    $totalReplacements += $result['count'];
    echo "✅ UPDATED: $file ({$result['count']} replacements)\n";
}

// ─────────────────────────────────────────────────
// SUMMARY
// ─────────────────────────────────────────────────

echo "\n═════════════════════════════════════════════════════════\n";
echo "📊 SUMMARY\n";
echo "─────────────────────────────────────────────────────────\n";
echo "Files processed : $processedFiles / $totalFiles\n";
echo "Total replacements : $totalReplacements\n";

if (!empty($errors)) {
    echo "\n❌ ERRORS:\n";
    foreach ($errors as $error) {
        echo "   - $error\n";
    }
} else {
    echo "\n✨ No errors!\n";
}

$endTime = microtime(true);
$duration = round($endTime - $startTime, 2);
echo "\n⏱️  Time: {$duration}s\n";

// ─────────────────────────────────────────────────
// POST-PROCESSING NOTES
// ─────────────────────────────────────────────────

echo "\n═════════════════════════════════════════════════════════\n";
echo "📝 NEXT STEPS\n";
echo "─────────────────────────────────────────────────────────\n";
echo "1. ✅ Review git diff:\n";
echo "   git diff assets/css/ admin/assets/ member/assets/\n\n";
echo "2. ✅ Manual checks needed for:\n";
echo "   - Gradients (linear-gradient with hardcoded colors)\n";
echo "   - Box-shadows (might need consolidation)\n";
echo "   - Opacity values (rgba with hardcoded colors)\n\n";
echo "3. ✅ Test on all portals:\n";
echo "   - Public homepage\n";
echo "   - Admin dashboard\n";
echo "   - Member portal\n\n";
echo "4. ✅ Verify theme override:\n";
echo "   - Admin > Settings > Change Primary Color\n";
echo "   - Check if changes apply globally\n\n";
echo "5. ✅ Run Lighthouse:\n";
echo "   - Check CSS coverage\n";
echo "   - Verify performance improved\n\n";
echo "6. ✅ Commit changes:\n";
echo "   git add assets/css/ admin/assets/ member/assets/\n";
echo "   git commit -m 'feat: consolidate colors to design tokens'\n";

echo "\n═════════════════════════════════════════════════════════\n";
echo "✨ DONE!\n";
?>
