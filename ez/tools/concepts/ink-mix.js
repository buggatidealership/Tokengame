// Mockup runner: today's live standings and proof, the lighter-ink build, and "today + tweaks" (ink-mix/mix.css) side by side.
// node ink-mix.js <scratch dir>; needs the live build on :8898 (site/) and the X2+ build on :8897 (ez/); fontroute.js routes Google Fonts.
const {chromium}=require('/opt/node22/lib/node_modules/playwright'),fs=require('fs');const S=process.argv[2]+'/';
const MIX=fs.readFileSync(__dirname+'/ink-mix/mix.css','utf8');
(async()=>{const b=await chromium.launch();
for(const [n,u,css] of [['today','http://127.0.0.1:8898/index.html',''],['lighter','http://127.0.0.1:8897/v46-live-x2plus.html',''],['mix','http://127.0.0.1:8898/index.html',MIX]])for(const w of [390,1280]){
 const p=await b.newPage({viewport:{width:w,height:900},deviceScaleFactor:2});await require(S+'fontroute.js')(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(u,{waitUntil:'load'});await p.waitForTimeout(5000);if(css)await p.addStyleTag({content:css});await p.waitForTimeout(400);
 for(const id of ['standings','learn']){const el=await p.$('#'+id+(id==='standings'?' .x2p-flip':' .x2p-pt'));await el.scrollIntoViewIfNeeded();await p.waitForTimeout(1500);await el.screenshot({path:S+'mx-'+n+'-'+w+'-'+id+'.png'})}
 const m=await p.evaluate(()=>{const r=e=>e.getBoundingClientRect();const row=document.querySelector('#learn .lp.pt-3 .pt-r');const hd=document.querySelector('#learn .lp.pt-3 .pt-hd');
  const cells=['.pt-st','.pt-c','.pt-v.pt-u'].map(s=>{const e=row.querySelector(s);const x=r(e);return [s,Math.round(x.left),Math.round(x.right),getComputedStyle(e).fontSize]});
  const heads=[...hd.querySelectorAll('span')].map(s=>[s.textContent,Math.round((r(s).left+r(s).right)/2)]);
  const ov=[...document.querySelectorAll('#learn .lp.pt-3 .pt-r>*')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.className);return {cells,heads,ov}});
 console.log(n,w,JSON.stringify(m),errs.length?errs:'');await p.close()}
await b.close()})();
