// node rec.js <take> <out.mp4> [width 390] [seconds 2.2]: records panel 5 as it plays (the take's CSS animations paused and stepped frame by frame, 30 fps)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),{execSync}=require('child_process');
const [t,OUT,W0,S0]=process.argv.slice(2),W=+(W0||390),SEC=+(S0||2.2),FPS=30;const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
const TMP=fs.mkdtempSync(require('os').tmpdir()+'/sarec-');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);
 await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addStyleTag({content:rd('_sa.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_sa.js')+rd(t+'.js')});
 await p.waitForFunction(()=>document.fonts.status==='loaded');
 await p.evaluate(()=>{const n=document.querySelector('.wc-lr-5');scrollTo(0,n.getBoundingClientRect().top+scrollY-120);const h=document.querySelector('header.top');if(h)h.style.visibility='hidden'});
 await p.waitForTimeout(800);
 await p.evaluate(()=>{const el=document.querySelector('.wc-lr-5 .sa-go');el.classList.remove('sa-go');void el.offsetWidth;el.classList.add('sa-go');
   window.__A=document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('.wc-lr-5'));window.__A.forEach(a=>a.pause())});
 const bb=await p.evaluate(()=>{const r=document.querySelector('.wc-lr-5').getBoundingClientRect();return {x:Math.max(0,r.left-14),y:r.top-36,width:Math.min(innerWidth,r.width+28),height:r.height+50}});
 bb.width=Math.floor(bb.width/2)*2;bb.height=Math.floor(bb.height/2)*2;
 const N=Math.round(SEC*FPS);for(let i=0;i<N;i++){await p.evaluate(ms=>window.__A.forEach(a=>{a.currentTime=ms}),i*1000/FPS);
   await p.screenshot({path:`${TMP}/f${String(i).padStart(4,'0')}.png`,clip:bb})}
 for(let i=0;i<FPS;i++)fs.copyFileSync(`${TMP}/f${String(N-1).padStart(4,'0')}.png`,`${TMP}/f${String(N+i).padStart(4,'0')}.png`);
 execSync(`ffmpeg -y -loglevel error -framerate ${FPS} -i ${TMP}/f%04d.png -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart ${OUT}`);
 fs.rmSync(TMP,{recursive:true});console.log(OUT,N+FPS,'frames');await b.close()})();
