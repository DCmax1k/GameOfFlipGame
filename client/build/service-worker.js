const CACHE_NAME = "v1";
const urlsToCache = ['index.html', 'offline.html', 'images/gardenTramp.png', 'images/superTramp.png', 'images/ground.png', 'images/airTrack.png', 'images/logo.png', 'images/flipping.svg'];

// Install SW
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Listen for requests
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            // return fetch(e.request)
            // .catch(() => caches.match('offline.html'));
            return res || fetch(e.request)
            .catch(() => caches.match('offline.html'));
        })
    );
});

// Activate SW
self.addEventListener('activate', (e) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    e.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});