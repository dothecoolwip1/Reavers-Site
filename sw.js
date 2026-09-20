const CACHE="reavers-team-hub-v10";
const STATIC=["./assets/reavers-logo.jpg"];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)));
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;

  const req=event.request;
  const alwaysFresh=req.mode==="navigate" || req.destination==="style" || req.destination==="script";

  if(alwaysFresh){
    event.respondWith(
      fetch(req,{cache:"no-store"})
        .then(response=>{
          if(response.ok && req.url.startsWith(self.location.origin)){
            const copy=response.clone();
            caches.open(CACHE).then(cache=>cache.put(req,copy));
          }
          return response;
        })
        .catch(()=>caches.match(req).then(cached=>cached || Response.error()))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached=>{
      if(cached) return cached;
      return fetch(req).then(response=>{
        if(response.ok && req.url.startsWith(self.location.origin)){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(req,copy));
        }
        return response;
      });
    })
  );
});
