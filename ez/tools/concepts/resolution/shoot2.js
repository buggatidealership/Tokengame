const {chromium}=require('playwright');const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/fo';require('fs').mkdirSync(S,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const e=[];p.on('pageerror',x=>e.push(x.message));
for(const d of [1,2,3,4])for(const beat of ['calls','verdict']){await p.goto(`http://localhost:8996/tools/concepts/resolution/faceoff.html?d=${d}&beat=${beat}`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);await p.screenshot({path:`${S}/d${d}-${beat}.jpg`,type:'jpeg',quality:88})}
await p.goto('http://localhost:8996/tools/concepts/resolution/faceoff.html?d=1&beat=end');await p.waitForTimeout(400);await p.screenshot({path:`${S}/end.jpg`,type:'jpeg',quality:88});
console.log('errs',e.join('|')||'none');await b.close()})();
