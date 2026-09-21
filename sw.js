const CACHE="reavers-team-hub-v12";
const STATIC=[
  "./",
  "./index.html",
  "./team.html",
  "./training.html",
  "./events.html",
  "./community.html",
  "./media.html",
  "./styles.css?v=12",
  "./dynamic.css?v=12",
  "./app.js?v=12",
  "./team-data.js?v=12",
  "./gallery.js?v=12",
  "./assets/reavers-logo.jpg",
  "./vendor/photoswipe/photoswipe.css?v=12",
  "./vendor/photoswipe/photoswipe-lightbox.esm.js",
  "./vendor/photoswipe/photoswipe.esm.js"
];

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
  if(event.request.method!=="GET")return;
  const req=event.request;
  const sameOrigin=req.url.startsWith(self.location.origin);
  const alwaysFresh=req.mode==="navigate"||req.destination==="style"||req.destination==="script";

  if(alwaysFresh){
    event.respondWith(
      fetch(req,{cache:"no-store"})
        .then(response=>{
          if(response.ok&&sameOrigin)caches.open(CACHE).then(cache=>cache.put(req,response.clone()));
          return response;
        })
        .catch(async()=>{
          const cached=await caches.match(req);
          if(cached)return cached;
          if(req.mode==="navigate")return caches.match("./index.html");
          return Response.error();
        })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached=>cached||fetch(req).then(response=>{
      if(response.ok&&sameOrigin)caches.open(CACHE).then(cache=>cache.put(req,response.clone()));
      return response;
    }))
  );
});
