// node firstshot.js <outdir> : shoots first.html takes A..F at 1080x1350
const {chromium}=require('playwright');const O=process.argv[2];require('fs').mkdirSync(O,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const e=[];p.on('pageerror',x=>e.push(x.message));
for(const v of 'ABCDEF'){await p.goto('http://localhost:8996/tools/concepts/resolution/first.html?v='+v);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);await p.screenshot({path:`${O}/${v}.jpg`,type:'jpeg',quality:90})}
console.log('errs',e.join('|')||'none');await b.close()})();
