// node tshot.js <page> <outdir> <t,t,...>  : stills of a window.R(t) page
const {chromium}=require('playwright');const [,,PG,O,ts]=process.argv;require('fs').mkdirSync(O,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('http://localhost:8996/tools/concepts/resolution/'+PG);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
for(const t of ts.split(',')){await p.evaluate(t=>window.R(+t),t);await p.waitForTimeout(120);await p.screenshot({path:`${O}/t${t}.jpg`,type:'jpeg',quality:88})}
console.log('errs',e.join('|')||'none');await b.close()})();
