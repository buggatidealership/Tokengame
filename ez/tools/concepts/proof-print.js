// Mockup runner: the proof ticket's four views printed like the standings (owner, 2026-10-26). node proof-print.js <scratch dir>
// today = the live page (lighter ink); A = printed (proof-print/A.css); B = A + the standings' type (B.css). Needs X2+ on :8897.
const {chromium}=require('/opt/node22/lib/node_modules/playwright'),fs=require('fs');const S=process.argv[2]+'/';
const A=fs.readFileSync(__dirname+'/proof-print/A.css','utf8'),B=A+fs.readFileSync(__dirname+'/proof-print/B.css','utf8');
(async()=>{const b=await chromium.launch();const W=+(process.argv[3]||390);
for(const [n,css] of [['today',''],['A',A],['B',B]]){
 const p=await b.newPage({viewport:{width:W,height:1000},deviceScaleFactor:2,reducedMotion:'reduce'});await require(S+'fontroute.js')(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForTimeout(5000);
 if(css){await p.evaluate(css=>{document.querySelectorAll('style').forEach(s=>{if(s.textContent.includes('/*PROOFLI{*/'))s.textContent=s.textContent.replace(/\/\*PROOFLI\{\*\/[\s\S]*?\/\*\}PROOFLI\*\//,'')});
   const bg=getComputedStyle(document.querySelector('#standings li.lbr.lead>.rk')).backgroundImage;const paper=bg.match(/url\("[^"]*"\)/)[0];
   const st=document.createElement('style');st.textContent=css.split('__PAPER__').join(paper);document.head.appendChild(st)},css)}
 for(const v of ['roi','hit','miss','sector']){await p.evaluate(v=>{const t=document.querySelector('#learn .x2p-pt button[data-pt="'+v+'"]');t.click()},v);await p.waitForTimeout(900);
  const el=await p.$('#learn .x2p-pt');await el.scrollIntoViewIfNeeded();await p.waitForTimeout(700);await el.screenshot({path:S+'pp-'+n+'-'+v+'-'+W+'.png'});
  const ov=await p.evaluate(()=>[...document.querySelectorAll('#learn .x2p-pt .pt-body *')].filter(e=>e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible').length);
  console.log(n,v,W,'overflow',ov,errs.length?errs:'')}
 await p.close()}
await b.close()})();
