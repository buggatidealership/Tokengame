// node rec.js <take> <out.mp4> [W] : records the take at phone width: the screen draws, then the painted keys are pressed one by one
// (F2 P&L, F6 7 days, F7 24h, F5 season, F1 hit rate). Playwright's own screen recording, to H.264 mp4.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const {prep}=require('./run.js');const T=process.argv[2]||'a',OUT=process.argv[3],W=+(process.argv[4]||390),H=W<600?700:820;
(async()=>{const vd=fs.mkdtempSync(path.join(require('os').tmpdir(),'hdrec-'));const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,recordVideo:{dir:vd,size:{width:W,height:H}}});const p=await ctx.newPage();await FONTS(p);
 await p.goto(`http://localhost:${process.env.PORT||8961}/v47-live-x3plus.html#/`,{waitUntil:'load',timeout:150000});
 await p.addStyleTag({content:'header.top,.wc-crawl,[class*=crawl]{display:none!important}'});
 await prep(p,T,false);
 await p.evaluate(()=>{document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}});const e=document.querySelector('.hd');scrollTo(0,e.getBoundingClientRect().top+scrollY-30)});
 await p.waitForTimeout(1800);
 const sel=s=>T==='a'?`.hd .hd-k[data-set="${s}"]`:T==='b'?`.hd .hdb-stop[data-set="${s}"]`:`.hd [data-set="${s}"]`;
 for(const s of ['mode:pnl','win:d7','win:d1','win:season','mode:hit']){await p.click(sel(s));await p.waitForTimeout(2300)}
 const v=p.video();await ctx.close();const src=await v.path();await b.close();
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-i',src,'-ss','1.2','-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=30','-c:v','libx264','-pix_fmt','yuv420p','-crf','22','-movflags','+faststart',OUT]);
 console.log(OUT,fs.statSync(OUT).size)})();
