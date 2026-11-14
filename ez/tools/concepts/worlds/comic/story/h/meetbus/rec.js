// node rec.js take out.mp4 [W=390] [secs=8] [t0 ms]: frame-by-frame (the take's clock __MBT stepped at 30 fps, the founder loops seeked to the same time), DPR 2 -> H.264
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process');
const TK=process.argv[2],OUT=process.argv[3],W=+(process.argv[4]||390),SEC=+(process.argv[5]||8),T0=+(process.argv[6]||0),H=W<600?844:800,FPS=30,TMP=fs.mkdtempSync('/tmp/claude-0/mbrec-');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});await FONTS(p);
 await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('section.c8 .c8-one'),null,{timeout:120000});
 await p.addStyleTag({content:rd('_mb.css')+'header.top,body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug){visibility:hidden!important}'});
 await p.evaluate(t=>{window.__MB=t;window.__MBT=0},TK);await p.addScriptTag({content:rd('_mb.js')});await p.evaluate(()=>document.fonts.ready);
 await p.evaluate(()=>{const s=document.querySelector('.c8-four');scrollTo(0,s.getBoundingClientRect().top+scrollY-(innerWidth<600?150:60))});
 await p.waitForFunction(()=>[...document.querySelectorAll('section.c8 video')].every(v=>v.readyState>=2),null,{timeout:90000}).catch(()=>{});
 await p.evaluate(()=>document.querySelectorAll('section.c8 video').forEach(v=>v.pause()));await p.waitForTimeout(800);await p.evaluate(()=>window.__mb.layout());
 for(let f=0;f<SEC*FPS;f++){const t=T0+f*1000/FPS;await p.evaluate(async t=>{window.__MBT=t;window.__mb.render(t);const vs=[...document.querySelectorAll('section.c8 video')];
   await Promise.all(vs.map(v=>new Promise(r=>{const d=v.duration||5;const tt=(t/1000)%d;if(Math.abs(v.currentTime-tt)<.001)return r();v.addEventListener('seeked',r,{once:true});v.currentTime=tt;setTimeout(r,400)})))},t);
   await p.screenshot({path:`${TMP}/f${String(f).padStart(4,'0')}.png`})}
 await b.close();cp.execFileSync('ffmpeg',['-y','-v','error','-framerate',String(FPS),'-i',`${TMP}/f%04d.png`,'-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','slow','-movflags','+faststart',OUT]);
 fs.rmSync(TMP,{recursive:true});console.log(OUT,fs.statSync(OUT).size)})();
