// Tasliya service worker: installable + caches the big gift/effect asset files so they load once.
const AC='tasliya-assets-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request, u=new URL(r.url);
  if(r.method==='GET'&&u.origin===location.origin&&/\/(gifts|fx)\.js$/.test(u.pathname)){
    e.respondWith(caches.open(AC).then(c=>c.match(r).then(m=>m||fetch(r).then(x=>{ if(x&&x.ok) c.put(r,x.clone()); return x; }))));
    return;
  }
  if(r.mode!=='navigate') return;   // let the browser handle everything else (Firebase, scripts, images)
  e.respondWith(fetch(r).catch(()=>new Response('لا يوجد اتصال بالإنترنت',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})));
});
