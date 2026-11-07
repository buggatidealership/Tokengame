// node tiles.js <out> : at 390 (dpr 3), each take's block for one winner, a tie and nobody (R78 Intel, R79 AstraZeneca, the newest no-winner round), plus D's open block.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2];const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const t of ['A','B','C','D']){const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,reducedMotion:'reduce'})).newPage();await FONTS(p);
  await p.goto('http://127.0.0.1:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.addStyleTag({content:rd('_ch.css')});await p.evaluate(t=>{window.__CH=t},t);await p.addScriptTag({content:rd('_ch.js')});
  const nob=await p.evaluate(()=>{const r=ROUNDS.filter(r=>r.a!=null&&r.out&&!r.win).pop();__ch.set(200);return r.n});
  await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>{document.querySelectorAll('.cz img').forEach(i=>i.loading='eager')});await p.waitForTimeout(2500);await p.evaluate(()=>__ch.render());await p.waitForTimeout(1500);
  for(const n of [78,79,nob]){const el=await p.$(`.cz a[href="#/round/${n}"]`);await el.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await el.screenshot({path:`${OUT}/tile-${t}-${n===nob?'none':n}.png`})}
  if(t==='D'){const o=await p.$('.czd-open');await o.scrollIntoViewIfNeeded();await o.screenshot({path:`${OUT}/open-D.png`})}
  console.log(t,'nobody round',nob);await p.close()}
 await b.close()})();
