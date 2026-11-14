// node rec.js <take> <out.mp4> [W]  : records the take on the real page at phone width: the lines drawing in as the section
// comes into view, then the window switch to 7 days, 24h and back to Season (each redraws its lines). Frames come from Playwright's
// own screen recording (real timing), converted to H.264 mp4 (yuv420p, faststart).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const T=process.argv[2]||'a',OUT=process.argv[3],W=+(process.argv[4]||390),H=W<600?844:900,rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const vd=fs.mkdtempSync(path.join(require('os').tmpdir(),'pnrec-'));const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,recordVideo:{dir:vd,size:{width:W,height:H}}});const p=await ctx.newPage();await FONTS(p);
 await p.goto(`http://localhost:${process.env.PORT||8961}/v47-live-x3plus.html#/`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.querySelector('.wc-splash .wc10-ch')&&document.querySelector('#wc-pfv-pnl .wc-pf-r'),null,{timeout:120000});await p.waitForTimeout(1500);
 await p.addStyleTag({content:rd('_c.css')+rd(T+'.css')+'header.top,.wc-crawl,[class*=crawl]{display:none!important}'});
 /* mount while the section is off screen, so the drawing starts as it scrolls in */
 await p.evaluate(()=>{const s=document.querySelector('.wc-splash');s.classList.remove('wc-offs');(s.previousElementSibling||s).scrollIntoView();scrollBy(0,-1400)});
 await p.addScriptTag({content:rd('_lib.js')+rd(T+'.js')+';PNmount()'});await p.waitForTimeout(1200);
 const t0=Date.now();
 await p.evaluate(()=>{const s=document.querySelector('.pn');const y=s.getBoundingClientRect().top+scrollY+150;scrollTo({top:y,behavior:'smooth'})});
 await p.waitForTimeout(5200);
 for(const w of ['d7','d1','season']){await p.click(`.pn [data-win="${w}"]`);await p.waitForTimeout(3600)}
 await p.evaluate(()=>{const r=document.querySelector('.pn [data-rows]');window.scrollBy({top:r.getBoundingClientRect().top-300,behavior:'smooth'})});await p.waitForTimeout(2200);
 const v=p.video();await ctx.close();const src=await v.path();await b.close();
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss','2.2','-i',src,'-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=30','-c:v','libx264','-pix_fmt','yuv420p','-crf','23','-movflags','+faststart',OUT]);
 console.log(OUT,fs.statSync(OUT).size)})();
