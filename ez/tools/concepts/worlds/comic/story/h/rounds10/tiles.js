// node tiles.js <out> : at 390 (dpr 3), each take's item for one winner, a tie and nobody (R78 Intel, R79 AstraZeneca, the newest no-winner round), for the close-up board.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],PORT=process.env.PORT||9611;const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const t of ['A','B','C','D']){const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,reducedMotion:'reduce'})).newPage();await FONTS(p);
  await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.addStyleTag({content:rd('_r10.css')});await p.evaluate(t=>{window.__R10=t},t);await p.addScriptTag({content:rd('_r10.js')});
  const nob=await p.evaluate(()=>{const r=ROUNDS.filter(r=>r.a!=null&&r.out&&!r.win).pop();__r10.set(200);return r.n});
  await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>{document.querySelectorAll('.r10 img').forEach(i=>i.loading='eager')});await p.waitForTimeout(1500);await p.evaluate(()=>__r10.render());await p.waitForTimeout(2000);
  await p.addStyleTag({content:'header.top,.x2p-cw-bug{display:none!important}'});
  for(const n of [78,79,nob]){const el=await p.$(`.r10 a[href="#/round/${n}"]`);await el.scrollIntoViewIfNeeded();await p.waitForTimeout(400);const bb=await el.boundingBox();
    await p.screenshot({path:`${OUT}/tile-${t}-${n===nob?'none':n}.png`,clip:{x:Math.max(0,bb.x-10),y:bb.y-24,width:Math.min(390-Math.max(0,bb.x-10),bb.width+20),height:bb.height+34}})}
  console.log(t,'nobody round',nob);await p.close()}
 await b.close()})();
