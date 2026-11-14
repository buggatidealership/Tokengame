const {chromium}=require('playwright');const [,,out,...specs]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const e=[];p.on('pageerror',x=>e.push(x.message));const fs=[];
for(const s of specs){const [bg,beat,r]=s.split(':');await p.goto(`http://localhost:8996/tools/concepts/resolution/frame.html?bg=${bg}&beat=${beat}&r=${r||72}`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);const f=`/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/sf-${bg}-${beat}-${r||72}.jpg`;await p.screenshot({path:f,type:'jpeg',quality:90});fs.push(f)}
console.log(fs.join(' '));console.log('errs',e.join('|')||'none');await b.close()})();
