const {chromium}=require('playwright');const S=process.argv[2];const T=process.argv[3].split(',').map(Number);require('fs').mkdirSync(S,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('http://localhost:8996/tools/concepts/resolution/animC.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);
for(let i=0;i<T.length;i++){await p.evaluate(t=>window.R(t),T[i]);await p.waitForTimeout(60);await p.screenshot({path:`${S}/s${String(i).padStart(2,'0')}.jpg`,type:'jpeg',quality:85})}
console.log('errs',e.join('|')||'none');await b.close()})();
