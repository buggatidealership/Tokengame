// node shot.js <out-prefix> <t1,t2,...> [query] : stills of index.html at the given seconds (1080x1350, dsf 1)
const {chromium}=require('playwright');
(async()=>{const [out,ts,q]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('http://localhost:8996/tools/concepts/studio/v3/index.html'+(q||''));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);
 for(const t of ts.split(',')){await p.evaluate(t=>window.R(t),+t);await p.waitForTimeout(80);await p.screenshot({path:`${out}-${t}.jpg`,type:'jpeg',quality:90})}
 console.log('errs',errs.join('|')||'none');await b.close()})();
