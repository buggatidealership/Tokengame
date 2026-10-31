// node rec.js <out.mp4> <take> [width 390]: scrolls the page through the take's range (window.__h7Range) in 84 steps,
// stepping the take's own animations 1/30 s per frame, shoots each frame and joins them with ffmpeg (30 fps, then a 1 s hold).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process');
const OUT=process.argv[2],t=process.argv[3],W=+(process.argv[4]||390),rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
const TMP=require('path').dirname(OUT)+'/fr-'+t+'-'+W;fs.rmSync(TMP,{recursive:true,force:true});fs.mkdirSync(TMP,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:W<600?2:1});const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://localhost:8977/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('hb-ready'),null,{timeout:90000});
 await p.evaluate(async()=>{const s=document.querySelector('#wc-book .wc-splash');const y1=document.querySelector('.wc-bet').getBoundingClientRect().bottom+scrollY;for(let y=s.getBoundingClientRect().top+scrollY-900;y<y1;y+=260){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,90))}});
 await p.waitForTimeout(900);await p.addStyleTag({content:'header.top{visibility:hidden!important}'});
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed')x.style.visibility='hidden'})});
 await p.addStyleTag({content:rd('_h7.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_h7.js')+';'+rd(t+'.js')});
 await p.waitForTimeout(1500);await p.evaluate(()=>document.fonts.ready);
 const [a,z]=await p.evaluate(()=>window.__h7Range());const N=84,ease=u=>u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
 for(let f=0;f<N+30;f++){const u=Math.min(1,f/N),y=Math.round(a+(z-a)*ease(u));
  await p.evaluate(([y,f])=>new Promise(r=>{scrollTo({top:y,behavior:'instant'});document.getAnimations().forEach(an=>{const e=an.effect&&an.effect.target;if(e&&e.closest&&e.closest('.h7-ov,.h7-sc')){an.pause();an.currentTime=f*1000/30}});requestAnimationFrame(()=>requestAnimationFrame(r))}),[y,f]);
  await p.screenshot({path:`${TMP}/f${String(f).padStart(4,'0')}.png`})}
 await b.close();
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-framerate','30','-i',`${TMP}/f%04d.png`,'-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p','-c:v','libx264','-crf','23','-preset','medium','-movflags','+faststart',OUT]);
 fs.rmSync(TMP,{recursive:true,force:true});console.log(OUT,fs.statSync(OUT).size)})();
