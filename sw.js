const CACHE="reavers-team-hub-v5";
const SHELL=["./","./index.html","./team.html","./training.html","./events.html","./media.html","./styles.css","./dynamic.css","./team-data.js","./app.js","./manifest.webmanifest","./assets/reavers-mark.svg"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response.ok&&event.request.url.startsWith(self.location.origin)){
      const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    }
    return response;
  }).catch(()=>event.request.mode==="navigate"?caches.match("./index.html"):Response.error())));
});