const cacheName = "reavers-shell-v1";
const shellFiles = ["./", "./index.html", "./styles.css", "./app.js", "./manifest.webmanifest", "./assets/reavers-mark.svg"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(shellFiles)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(cacheName).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => event.request.mode === "navigate" ? caches.match("./index.html") : Response.error());
    })
  );
});