/* O2 · The glance. A picture notices you: it is still until it passes the middle of your screen (or your pointer rests on
   it), then its one thing moves once (the blades turn, the birds cross, the beam flickers, about 2.7 s) and it settles
   back to the still. It will not move again for 20 s. Like a portrait whose eyes follow you down the corridor: the life
   is caused by you, so it never competes with what you are reading. */
(function(){const S=SO,ps=S.pics();if(S.rm()){S.ready('o2');return}
  ps.forEach(p=>{p.lay=S.layer(p,'mv');S.blob(p.key);p.last=-1e9});
  const go=p=>{if(p.busy||S.now()-p.last<20000)return;S.once(p,p.lay)};
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const p=ps.find(x=>x.art===e.target);p&&go(p)}),{rootMargin:'-40% 0px -40% 0px'});
  ps.forEach(p=>{io.observe(p.art);p.art.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')go(p)})});
  window.__soGo=k=>{const p=ps.find(x=>x.key===String(k));if(p){p.last=-1e9;go(p)}};window.__soPics=ps;S.H.classList.add('so-o2');S.ready('o2')})();
