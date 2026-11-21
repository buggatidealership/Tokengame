const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
(async()=>{process.env.RM='1';const b=await chromium.launch();for(const t of ['x1','x2','x3']){const {p,er}=await open(b,390,t);
 const r=await p.evaluate(()=>({wait:document.querySelectorAll('.ss-host .xx-wait,.ss-host .xx3-wt').length,marks:document.querySelectorAll('.xx1-cr,.xx2-lf,.xx3-up').length,anims:document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('.ss-host')).length}));
 await p.evaluate(()=>document.querySelector('.ss-host .ss-swb[data-k="d7"]').click());await p.waitForTimeout(300);
 const r2=await p.evaluate(()=>({marks:document.querySelectorAll('.xx1-cr,.xx2-lf,.xx3-up').length,anims:document.getAnimations().filter(a=>a.playState==='running'&&a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('.ss-host')).length}));
 console.log(t,'reduced motion, on load',JSON.stringify(r),'after a switch',JSON.stringify(r2),er.join('|')||'ok');await p.close()}await b.close()})();
