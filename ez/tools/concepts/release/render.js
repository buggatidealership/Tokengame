// node render.js <outdir> [query] : renders vid.html at 30 fps, 0 to 26 s, into <outdir>/f%04d.jpg (ez/ served on :8996).
// FMT=png writes lossless frames; A and B (frame numbers) limit the range.
// A fresh browser every 150 frames (one long session ran out of memory), and frames already on disk are skipped.
const {chromium}=require('playwright');const fs=require('fs');const out=process.argv[2],q=process.argv[3]||'',fps=30,D=26,N=D*fps,CH=+(process.env.CH||150),EXT=process.env.FMT==='png'?'png':'jpg',A0=+(process.env.A||0),B0=Math.min(N,+(process.env.B||N));
(async()=>{fs.mkdirSync(out,{recursive:true});const errs=[];
 for(let a=A0;a<B0;a+=CH){const todo=[];for(let f=a;f<Math.min(B0,a+CH);f++)if(!fs.existsSync(`${out}/f${String(f).padStart(4,'0')}.${EXT}`))todo.push(f);if(!todo.length)continue;
  for(let tries=0;tries<3;tries++){const b=await chromium.launch();try{const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:+(process.env.DSF||2)});p.on('pageerror',e=>errs.push(e.message));
   await p.goto('http://localhost:8996/tools/concepts/release/vid.html'+q);await p.waitForFunction(()=>window.READY===1,null,{timeout:20000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);
   for(const f of todo){const fn=`${out}/f${String(f).padStart(4,'0')}.${EXT}`;if(fs.existsSync(fn))continue;await p.evaluate(t=>window.R(t),f/fps);await p.screenshot(EXT==='png'?{path:fn+'.tmp.png',type:'png'}:{path:fn+'.tmp',type:'jpeg',quality:92});fs.renameSync(EXT==='png'?fn+'.tmp.png':fn+'.tmp',fn)}
   await b.close();break}catch(e){errs.push('retry '+a+': '+e.message.split('\n')[0]);try{await b.close()}catch(_){}}}}
 const n=fs.readdirSync(out).filter(x=>new RegExp('^f\\d{4}\\.'+EXT+'$').test(x)).length;console.log('frames',n,'of',N,'errs',errs.join('|')||'none')})();
