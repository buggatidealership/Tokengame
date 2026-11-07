// node check.js: show-all still works under each section-2 take; reduced motion leaves panel 5's takes still and finished
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const t of ['s1','s2','s3']){const p=await b.newPage({viewport:{width:390,height:844}});const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8897/v47-live-x3plus.html');await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:90000});
  await p.addStyleTag({content:rd('_sa.css')+rd(t+'.css')});await p.evaluate(t=>document.documentElement.classList.add('sa-t-'+t),t);await p.addScriptTag({content:rd('_sa.js')+rd(t+'.js')});
  const a=await p.evaluate(()=>[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent).length);
  await p.click('.wc-more');const c=await p.evaluate(()=>[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent).length);
  const k=await p.evaluate(()=>({stamps:document.querySelectorAll('.sa-st').length,banners:document.querySelectorAll('.sa-bn').length,lanes:document.querySelectorAll('.sa-ln').length,keyShown:!!document.querySelector('.wc-key').offsetParent}));
  console.log(t,'shown before',a,'after show all',c,JSON.stringify(k),er.join('|')||'no errors');await p.close()}
 for(const t of ['p1','p2','p3']){const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const p=await c.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8897/v47-live-x3plus.html');await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:90000});
  await p.addStyleTag({content:rd('_sa.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_sa.js')+rd(t+'.js')});await p.waitForTimeout(300);
  const r=await p.evaluate(()=>{const P=document.querySelector('.wc-lr-5');return {done:!!P.querySelector('.sa-done'),running:document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('.sa-p5')).length,btn:!!P.querySelector('.sa-btn .wc-lr-meet')}});
  console.log(t,'reduced motion',JSON.stringify(r),er.join('|')||'no errors');await c.close()}
 await b.close()})();
