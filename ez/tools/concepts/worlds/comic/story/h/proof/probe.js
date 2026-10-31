// node probe.js <out> : shoots today's live sections (Overview Smart or lucky, Leaderboard parts) at 390 and 1280 and lists their selectors/sizes
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const OUT=process.argv[2],PORT=process.env.PORT||8941;
(async()=>{const b=await chromium.launch();
for(const W of [390,1280]){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:1});await FONTS(p);
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('p1-ready'),null,{timeout:120000}).catch(()=>console.log('noready'));await p.waitForTimeout(3000);
 const sp=await p.evaluate(()=>{const s=document.querySelector('.wc-splash');if(!s)return null;s.scrollIntoView();const r=s.getBoundingClientRect();return {h:r.height,html:s.outerHTML.slice(0,1500),cls:[...s.parentElement.children].map(c=>c.className).slice(0,30)}});console.log(W,'splash',JSON.stringify(sp).slice(0,2500));
 await p.evaluate(()=>location.hash='#/leaderboard');await p.waitForTimeout(6000);
 const lb=await p.evaluate(()=>{const l=document.querySelector('#wc-lb');if(!l)return null;return {h:l.getBoundingClientRect().height,kids:[...l.querySelectorAll(':scope > *, :scope > * > *')].map(c=>c.tagName+'.'+String(c.className).slice(0,50)+' '+Math.round(c.getBoundingClientRect().height))}});console.log(W,'lb',JSON.stringify(lb));
 await p.screenshot({path:`${OUT}/lb-${W}.png`,fullPage:true});await p.close()}
await b.close()})();
