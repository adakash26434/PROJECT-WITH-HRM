<?php
/**
 * HRM Project Router
 * Routes requests to the actual HRM project
 */

// Get the request path
$requestPath = $_SERVER['REQUEST_URI'] ?? '/';
$scriptName = $_SERVER['SCRIPT_NAME'] ?? '/index.php';

// Remove the script name from the path if present
if (strpos($requestPath, $scriptName) === 0) {
    $requestPath = substr($requestPath, strlen($scriptName));
}

// Remove leading slash for file path
$requestPath = ltrim($requestPath, '/');

// Determine if this is a static file or PHP request
$filePath = __DIR__ . '/hrm-project/' . $requestPath;

// If requesting a directory or root, serve the HRM index
if (empty($requestPath) || is_dir($filePath)) {
    $filePath = __DIR__ . '/hrm-project/index.php';
}

// Check if the file exists in hrm-project
if (file_exists($filePath) && strpos(realpath($filePath), realpath(__DIR__ . '/hrm-project')) === 0) {
    // It's a valid file in hrm-project directory
    
    // Set working directory to hrm-project for includes to work
    chdir(__DIR__ . '/hrm-project');
    
    // Include the file
    include $filePath;
} else {
    // Try to handle as a request to index.php (for routing)
    chdir(__DIR__ . '/hrm-project');
    include __DIR__ . '/hrm-project/index.php';
}
