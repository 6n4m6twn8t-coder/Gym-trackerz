const CACHE="gym-tracker-v10";
const ASSETS=[
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/bootstrap-v7.js",
  "./js/app.js",
  "./js/storage.js",
  "./data/exercises.js",
  "./data/programs.js",
  "./data/animation-assets/incline-stable-v9-c1.js",
  "./data/animation-assets/incline-stable-v9-c2.js",
  "./data/animation-assets/incline-stable-v9-c3a.js",
  "./data/animation-assets/incline-stable-v9-c3b.js",
  "./data/animation-assets/incline-stable-v9-c4a.js",
  "./data/animation-assets/incline-stable-v9-c4b.js",
  "./data/animation-assets/incline-db-press-stable-v9.js",
  "./data/animation-assets/flat-db-press-demo-v10.js",
  "./data/animation-assets/cable-fly-demo-v10.js",
  "./data/animation-assets/lateral-raise-demo-v10.js",
  "./data/animation-assets/rope-pushdown-demo-v10.js",
  "./data/animation-assets/cable-crunch-demo-v10.js",
  "./manifest.webmanifest",
  "./animations/incline-db-press.svg",
  "./animations/flat-db-press.svg",
  "./animations/cable-fly.svg",
  "./animations/db-lateral-raise.svg",
  "./animations/rope-pushdown.svg",
  "./animations/cable-crunch.svg",
  "./animations/chest-supported-row.svg",
  "./animations/single-arm-cable-row.svg",
  "./animations/reverse-fly.svg",
  "./animations/incline-db-curl.svg",
  "./animations/hammer-curl.svg",
  "./animations/leg-press.svg",
  "./animations/romanian-deadlift.svg",
  "./animations/bulgarian-split-squat.svg",
  "./animations/seated-leg-curl.svg",
  "./animations/standing-calf-raise.svg",
  "./animations/hanging-knee-raise.svg"
];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;
  const url=new URL(event.request.url);
  const freshFirst=event.request.mode==="navigate" || event.request.destination==="script" || event.request.destination==="style" || url.pathname.includes("/data/");

  if(freshFirst){
    event.respondWith(
      fetch(event.request,{cache:"no-store"})
        .then(response=>{
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request,copy));
          return response;
        })
        .catch(()=>caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached=>cached || fetch(event.request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      return response;
    }))
  );
});
