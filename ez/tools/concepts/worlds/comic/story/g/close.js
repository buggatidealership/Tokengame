// node close.js <out dir> [takes g1,g2,g3] [width 390]: four main-event cards per take, live (motion on), from the test gallery:
// Amazon (1 vs 3, the brand's own part), Intel (2 vs 2, a wordmark), a made-up 4 vs 0 (Coinbase, every call down), NVIDIA (Bet #1, calls not in yet)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'g1,g2,g3').split(','),W=+(process.argv[4]||390);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);await p.addInitScript(()=>{window.__sgAll=1});
  await p.goto('http://localhost:8921/v47-live-x3plus.html#/upcoming',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.addStyleTag({content:rd('../e/_se.css')+rd('_sg.css')+rd(t+'.css')});await p.addScriptTag({content:rd('../e/_se.js')+rd('_sg.js')+rd(t+'.js')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('sg-ready'),null,{timeout:90000});await p.waitForFunction(()=>document.fonts.status==='loaded');
  const sel=['.sg-gi:first-child','.sg-gi:has(.sg-m[data-t="AMZN"])','.sg-gi:has(.sg-m[data-t="INTC"])','.sg-gi:has(.sg-m[data-t="NVDA"])'];
  for(const [i,s] of sel.entries()){await p.evaluate(s=>{const n=document.querySelector(s);n.scrollIntoView({block:'center'})},s);await p.waitForTimeout(1800);
    await p.locator(s).screenshot({path:`${OUT}/close-${t}-${i}.png`})}
  console.log('close',t);await p.close()}
 await b.close()})();
