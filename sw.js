// Service Worker per PWA Android & Multi-PC
const CACHE_NAME = 'modelkit-pwa-v22';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Pass-through fetch with network fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
