// node anim.js : with motion allowed, counts the running animations on the four frames and checks a tap replay (q4-go) and that nothing runs under reduced motion.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();for(const rm of ['no-preference','reduce']){const p=await (await b.newContext({viewport:{width:390,height:844},reducedMotion:rm})).newPage();
 await p.route('**/media/top-h23-*',r=>r.fulfill({path:__dirname+'/out/'+r.request().url().split('/').pop(),contentType:'image/jpeg'}));
 await p.goto('http://localhost:8954/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 await p.addStyleTag({content:rd('_q4.css')});await p.addScriptTag({content:rd('_q4.js')});await p.waitForSelector('.q4-fr');
 await p.evaluate(()=>document.querySelector('.t4-frs').scrollIntoView());await p.waitForTimeout(1500);
 const r=await p.evaluate(async()=>{const c=s=>document.querySelector(s).getAnimations({subtree:true}).map(a=>a.animationName).join(',');const o={vis:document.querySelector('.t4-frs').classList.contains('q4-vis')};
   ['call','close','ledger','board'].forEach(k=>o[k]=c('.q4-'+k));document.querySelector('.q4-close').click();await new Promise(r=>setTimeout(r,200));o.tapClose=c('.q4-close');return o});
 console.log(rm,JSON.stringify(r))}await b.close()})();
