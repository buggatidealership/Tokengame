// node stills.js <outdir> t1,t2,... [query] : frames of vid.html at given times
const {chromium}=require('playwright');const fs=require('fs');const out=process.argv[2],ts=process.argv[3].split(',').map(Number),q=process.argv[4]||'';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('http://localhost:8996/tools/concepts/release/vid.html'+q);await p.waitForFunction(()=>window.READY===1,null,{timeout:20000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);
 fs.mkdirSync(out,{recursive:true});for(const t of ts){await p.evaluate(t=>window.R(t),t);await p.waitForTimeout(120);await p.screenshot({path:`${out}/t${String(ts.indexOf(t)).padStart(2,"0")}.jpg`,type:'jpeg',quality:85})}
 console.log('errs',errs.join('|')||'none');await b.close()})();
