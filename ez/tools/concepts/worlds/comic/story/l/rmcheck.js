// RM=1 node rmcheck.js <take>: with reduced motion, switch windows and list any running animation on the take's own elements
process.env.RM='1';const {open}=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const {p,er}=await open(b,390,process.argv[2]);
 for(const k of ['close','week','season']){await p.evaluate(k=>window.__slShow(k,true),k);await p.waitForTimeout(150);
  const a=await p.evaluate(()=>document.getAnimations().filter(x=>{const t=x.effect&&x.effect.target;return t&&t.closest&&t.closest('.sl-cv,.sl-sk')&&x.playState==='running'}).map(x=>(x.animationName||'waapi')+':'+String(x.effect.target.className.baseVal||x.effect.target.className).slice(0,30)));
  const tr=await p.evaluate(()=>[...document.querySelectorAll('.sl-cv *')].filter(e=>getComputedStyle(e).transitionDuration.split(',').some(d=>parseFloat(d)>0)).length);
  console.log(process.argv[2],k,'running:',a.length,a.slice(0,4).join(' '),'transitions:',tr)}
 console.log(er.join('|')||'no errors');await b.close()})();
