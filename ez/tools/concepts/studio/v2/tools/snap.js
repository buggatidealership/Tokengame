// node snap.js <outdir> <t1,t2,...> [page] : stills of window.R(t) at 1080x1350, plus window.__info
const {chromium}=require('playwright');const fs=require('fs');
const out=process.argv[2],ts=process.argv[3].split(',').map(Number),page=process.argv[4]||'index.html';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('http://localhost:8996/tools/concepts/studio/v2/'+page);await p.evaluate(()=>window.READY);await p.waitForTimeout(800);
 fs.mkdirSync(out,{recursive:true});
 for(const t of ts){await p.evaluate(t=>window.R(t),t);await p.waitForTimeout(60);await p.screenshot({path:`${out}/s${t.toFixed(2)}.jpg`,type:'jpeg',quality:88})}
 console.log(JSON.stringify(await p.evaluate(()=>window.__info)));console.log('errs',errs.join('|')||'none');await b.close()})();
