// node rmcheck.js <take>: with reduced motion, switch windows and list any running animation or transition on the take
process.env.RM='1';const {open}=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const {p,er}=await open(b,390,process.argv[2]);
 for(const k of ['d1','d7','season']){await p.evaluate(k=>window.__snShow(k,true),k);await p.waitForTimeout(400);
  const a=await p.evaluate(()=>document.getAnimations().filter(x=>{const t=x.effect&&x.effect.target;return t&&t.closest&&t.closest('.sn-cv,.sn-sk,.wc-sb')&&x.playState==='running'}).map(x=>(x.animationName||'waapi')+':'+String(x.effect.target.className.baseVal||x.effect.target.className).slice(0,30)));
  const tr=await p.evaluate(()=>[...document.querySelectorAll('.sn-cv *')].filter(e=>getComputedStyle(e).transitionDuration.split(',').some(d=>parseFloat(d)>0)).length);
  const txt=await p.evaluate(()=>[...document.querySelectorAll('.sn-bout [data-to]')].map(e=>e.textContent).join(' '));
  console.log(process.argv[2],k,'running:',a.length,a.slice(0,4).join(' '),'transitions:',tr,'|',txt)}
 console.log(er.join('|')||'no errors');await b.close()})();
