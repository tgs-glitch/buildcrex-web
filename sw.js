// BuildCrex Minimal Service Worker
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activated');
});

// This blank fetch listener tricks the browser into recognizing the site as an installable PWA
self.addEventListener('fetch', (event) => {
    // Pass through normal network requests
});
