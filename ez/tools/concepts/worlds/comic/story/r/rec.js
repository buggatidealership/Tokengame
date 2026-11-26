// node rec.js <take r1|r2|r3> <out.mp4> [width 390]: records the race replaying once as it comes into view: every race
// animation is paused and stepped together (20 frames a second), frames joined by ffmpeg at 20 fps.
const {open}=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs'),cp=require('child_process'),os=require('os'),path=require('path');
const T=process.argv[2],OUT=process.argv[3],W=+(process.argv[4]||390);
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const {p,er}=await open(b,W,T);
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden'});
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'srrec-'));
  /* bring the race in view (its replay starts on view) */
  await p.evaluate(()=>{const r=document.querySelector('#wc-lb .wc-race');scrollTo(0,r.getBoundingClientRect().top+scrollY-40)});
  /* step the replay's own clock: pause every animation in the race and seek them together, 20 frames a second */
  await p.waitForFunction(()=>document.getAnimations().some(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#wc-lb .wc-race')),null,{timeout:5000});await p.evaluate(()=>{window.__ra=document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#wc-lb .wc-race'));window.__ra.forEach(a=>a.pause())});
  const fr=[];let k=0;
  for(let t=0;t<=7400;t+=50){await p.evaluate(t=>{window.__ra.forEach(a=>{a.currentTime=t});return new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))},t);
    const f=`${dir}/f${String(k++).padStart(4,'0')}.png`;await p.screenshot({path:f});fr.push([f,t])}
  cp.execFileSync('ffmpeg',['-y','-loglevel','error','-framerate','20','-i',dir+'/f%04d.png','-vf','tpad=stop_mode=clone:stop_duration=1.5,scale=trunc(iw/2)*2:trunc(ih/2)*2','-r','20','-pix_fmt','yuv420p','-c:v','libx264','-crf','23',OUT]);
  fs.rmSync(dir,{recursive:true,force:true});console.log(OUT,fr.length,'frames',er.join('|')||'ok');await b.close()})();
