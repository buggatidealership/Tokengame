// node tiles.js <out> : at 390 (dpr 3), each take's tiles for one winner, a tie and nobody (R78 Intel, R79 AstraZeneca, R51 UPS), for the close-up board.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2];const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const t of ['A','B','C']){const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,reducedMotion:'reduce'})).newPage();await FONTS(p);
  await p.goto('http://127.0.0.1:8983/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.addStyleTag({content:rd('_r9.css')});await p.evaluate(t=>{window.__R9=t},t);await p.addScriptTag({content:rd('_r9.js')});
  const nob=await p.evaluate(()=>{const r=ROUNDS.filter(r=>r.a!=null&&r.out&&!r.win).pop();__r9.set(200);return r.n});
  await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>{document.querySelectorAll('.r9 img').forEach(i=>i.loading='eager')});await p.waitForTimeout(1500);await p.evaluate(()=>__r9.render());await p.waitForTimeout(1500);
  for(const n of [78,79,nob]){const el=await p.$(`.r9 a[href="#/round/${n}"]`);await el.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await el.screenshot({path:`${OUT}/tile-${t}-${n===nob?'none':n}.png`})}
  console.log(t,'nobody round',nob);await p.close()}
 await b.close()})();
