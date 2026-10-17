// Tasliya service worker: only makes the app installable. No caching, so updates always show immediately.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.mode!=='navigate') return;   // let the browser handle everything else (Firebase, scripts, images)
  e.respondWith(fetch(e.request).catch(()=>new Response('لا يوجد اتصال بالإنترنت',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})));
});
