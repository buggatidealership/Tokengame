// node renderA.js <page> <outdir> <seconds> : frames of a resolution animation (pure window.R) at 30 fps, 1080x1350
const {chromium}=require('playwright');const fs=require('fs');const [,,page,out,dur]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('http://localhost:8996/tools/concepts/resolution/'+page);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);fs.mkdirSync(out,{recursive:true});let k=0;
for(let f=0;f<=Math.round(+dur*30);f++){await p.evaluate(t=>window.R(t),f/30);await p.screenshot({path:`${out}/f${String(k++).padStart(4,'0')}.jpg`,type:'jpeg',quality:92})}
console.log('frames',k,'errs',e.join('|')||'none');await b.close()})();
