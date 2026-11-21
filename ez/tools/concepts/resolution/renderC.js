// node render.js <outdir> [fps] [from] [to] : renders vid.html frame by frame (served from ez/ on :8996) into <outdir>/f%04d.jpg
const {chromium}=require('playwright');const fs=require('fs');const out=process.argv[2],fps=+(process.argv[3]||30),from=+(process.argv[4]||0),to=+(process.argv[5]||22);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://localhost:8996/tools/concepts/resolution/'+(process.env.PAGE||'animC.html')+'');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 fs.mkdirSync(out,{recursive:true});let k=0;
 for(let f=Math.round(from*fps);f<=Math.round(to*fps);f++){await p.evaluate(t=>window.R(t),f/fps);await p.screenshot({path:`${out}/f${String(k++).padStart(4,'0')}.jpg`,type:'jpeg',quality:92})}
 console.log('frames',k,'errs',errs.join('|')||'none');await b.close()})();
