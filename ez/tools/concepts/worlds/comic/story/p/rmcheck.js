// RM=1 node rmcheck.js: with reduced motion, switch the window through each take's own control and count running animations
// and CSS transitions on the scoreboard and docks (0 expected); also prints the window numbers next to the live bill's stickers.
process.env.RM='1';const {open}=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();for(const t of ['p1','p2','p3','p4']){const {p,er}=await open(b,390,t);
  await p.evaluate(()=>{const s=document.querySelector('#wc-lb .wc-sbd');scrollTo(0,s.getBoundingClientRect().top+scrollY)});await p.waitForTimeout(500);
  const sel={p1:'.sp-c1 [data-spk="d1"]',p2:'.sp-c2 [data-spk="d1"]',p3:'.sp-c3 [data-spk="d1"]',p4:'.wc-sb-r .sp-pb[data-spk="d1"]'}[t];
  await p.click(sel);await p.waitForTimeout(60);
  const r=await p.evaluate(()=>{const a=document.getAnimations().filter(x=>{const e=x.effect&&x.effect.target;return e&&e.closest&&e.closest('#wc-lb .wc-sbd,.sp-dock,.wc11n-bill')&&x.playState==='running'});
    return {anims:a.length,names:a.slice(0,4).map(x=>(x.animationName||x.transitionProperty||'waapi')+':'+String(x.effect.target.className).slice(0,30)),
     bill:document.querySelector('.wc11n-stub[aria-selected="true"]').dataset.k,mine:[...document.querySelectorAll('[data-spk][aria-pressed="true"]')].map(b=>b.dataset.spk).join(','),
     figs:[...document.querySelectorAll('#wc-lb .wc-sb-r')].sort((a,b)=>a.style.order-b.style.order).map(t=>t.dataset.spm+' '+t.querySelector('.sp-fig').textContent+' '+t.querySelector('.sp-pc').textContent).join(' | ')}});
  console.log(t,JSON.stringify(r),er.join('|')||'ok');await p.close()}await b.close()})();
