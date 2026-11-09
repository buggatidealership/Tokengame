// node render.js <outdir> [query] : renders vid.html at 30 fps, 0 to 25 s, into <outdir>/f%04d.jpg (ez/ served on :8996)
const {chromium}=require('playwright');const fs=require('fs');const out=process.argv[2],q=process.argv[3]||'',fps=30,D=26;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://localhost:8996/tools/concepts/release/vid.html'+q);await p.waitForFunction(()=>window.READY===1,null,{timeout:20000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 fs.mkdirSync(out,{recursive:true});for(let f=0;f<D*fps;f++){await p.evaluate(t=>window.R(t),f/fps);await p.screenshot({path:`${out}/f${String(f).padStart(4,'0')}.jpg`,type:'jpeg',quality:92})}
 console.log('frames',D*fps,'errs',errs.join('|')||'none');await b.close()})();
