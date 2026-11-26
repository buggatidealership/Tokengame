// Vocabulary board: six ways to mark a figure, on the real site's own text (P&L +21,130 and "3 PM today").
// node vocab.js <outdir>  -> frames <outdir>/<id>-<pl|ut>-NNN.png
const {chromium}=require('playwright');const fs=require('fs');const out=process.argv[2];fs.mkdirSync(out,{recursive:true});
const T=[
 ['pop','@keyframes vk{0%{transform:scale(1)}100%{transform:scale(1.18)}} .vk{display:inline-block;animation:vk .35s ease-out forwards;transform-origin:center}'],
 ['glow','@keyframes vk{0%{text-shadow:none}100%{text-shadow:0 0 6px rgba(253,188,42,.95),0 0 14px rgba(253,188,42,.7)}} .vk{animation:vk .5s ease-out forwards}'],
 ['shimmer','@keyframes vk{0%{background-position:150% 0}100%{background-position:-50% 0}} .vk{background:linear-gradient(100deg,#c98a0e 0%,#fdbc2a 35%,#fff6d0 50%,#fdbc2a 65%,#c98a0e 100%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent!important;-webkit-text-fill-color:transparent;animation:vk 1.4s linear infinite}'],
 ['marker','@keyframes vk{0%{background-size:0% 100%}100%{background-size:100% 100%}} .vk{background:linear-gradient(rgba(253,188,42,.9),rgba(253,188,42,.9)) no-repeat left center;background-size:0% 100%;color:#141414!important;-webkit-text-fill-color:#141414;padding:0 3px;border-radius:2px;animation:vk .45s ease-out forwards}'],
 ['underline','@keyframes vk{0%{background-size:0% 2px}100%{background-size:100% 2px}} .vk{background:linear-gradient(#fdbc2a,#fdbc2a) no-repeat left bottom;background-size:0% 2px;padding-bottom:2px;animation:vk .45s ease-out forwards}'],
 ['popshine','@keyframes vk{0%{transform:scale(1);background-position:150% 0}30%{transform:scale(1.12)}100%{transform:scale(1.12);background-position:-50% 0}} .vk{display:inline-block;transform-origin:center;background:linear-gradient(100deg,#c98a0e 0%,#fdbc2a 35%,#fff6d0 50%,#fdbc2a 65%,#c98a0e 100%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent!important;-webkit-text-fill-color:transparent;animation:vk 1.4s linear forwards}']];
(async()=>{const b=await chromium.launch();
 for(const [id,css] of T){const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,timezoneId:'America/New_York'});const p=await c.newPage();await p.clock.setFixedTime(new Date('2026-11-09T18:52:00Z'));
  await p.goto('http://localhost:8997/#next');await p.waitForTimeout(2000);
  await p.evaluate(()=>{const o=document.querySelector('.lv-it.on [data-lvx]');if(o)o.click()});await p.waitForTimeout(300);
  await p.evaluate(()=>{const b=[...document.querySelectorAll('[data-lvx]')].find(e=>/DraftKings/.test(e.textContent));b&&b.click()});await p.waitForTimeout(500);
  await p.evaluate(()=>{const l=document.querySelector('.lv-ls');if(l)l.style.maxHeight='none';document.querySelector('nav.nav').style.display='none';const h=document.querySelector('header.top');if(h)h.style.position='static'});
  const R=await p.evaluate(css=>{const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);
   const w=document.querySelector('.lv-it.on .lv-xr.w');const pl=w.lastElementChild;pl.innerHTML='<span class="vk">'+pl.innerHTML+'</span>';
   const u=document.querySelector('.ur .ut');u.querySelector('.ut-t').classList.add('vk');u.querySelector('.ut-d').classList.add('vk');
   const r=e=>{const b=e.getBoundingClientRect();return {x:Math.max(0,b.left-8),y:b.top+scrollY-10,width:Math.min(390-Math.max(0,b.left-8),b.width+16),height:b.height+20}};
   document.getAnimations().forEach(a=>a.pause());return {pl:r(w),ut:r(document.querySelector('.ur'))}},css);
  for(let f=0;f<30;f++){await p.evaluate(t=>document.getAnimations().forEach(a=>{a.currentTime=t}),f*1000/15);
   for(const k of ['pl','ut'])await p.screenshot({path:`${out}/${id}-${k}-${String(f).padStart(3,'0')}.png`,fullPage:true,clip:R[k]})}
  await c.close();console.log(id)}
 await b.close()})();
