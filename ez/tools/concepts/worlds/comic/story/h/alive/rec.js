// Records one alive effect as frames on the real built X3+ page, stepping every animation and video by hand
// (25 fps, so the clip shows true timing however slow the screenshots are), then encodes an H.264 mp4.
// node rec.js <id> <outdir> [--still]   (serve ez/ on :8897 first)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const fs=require('fs'),cp=require('child_process'),path=require('path');
const DIR=__dirname;const CFG=require('./cfg.js');
const [,,ID,OUT]=process.argv;const STILL=process.argv.includes('--still');const RM=process.argv.includes('--rm');
const c=CFG[ID];const FPS=25;
(async()=>{const b=await chromium.launch();
 const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:c.dsf||2,reducedMotion:RM?'reduce':'no-preference'});await fonts(p);
 const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='warning'&&/alive/.test(m.text()))er.push(m.text())});
 await p.goto('http://localhost:8897/v47-live-x3plus.html'+(c.hash||''),{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForTimeout(3000);
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=700){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(220)}
 await p.addStyleTag({path:DIR+'/alive.css'});await p.addScriptTag({path:DIR+'/alive.js'});
 // where the target sits: its centre goes to the middle of the recorded strip
 const ch=c.h||480,top=c.top??Math.round((844-ch)/2);
 const ty=await p.evaluate(s=>{const e=s[0]==='='?eval(s.slice(1)):document.querySelector(s);const r=e.getBoundingClientRect();return r.top+scrollY+r.height/2+0},c.center);
 const endY=Math.round(ty-(top+ch/2)+(c.dy||0));const startY=endY+(c.from||0);
 await p.evaluate(y=>scrollTo(0,y),startY);await p.waitForTimeout(1500);
 if(c.pre)await p.evaluate(c.pre);
 await p.evaluate(id=>{if(!location.search.includes('auto'))window.__alManual=true;window.__alInit([id])},ID);
 const FR=path.join(OUT,ID+'-fr');fs.rmSync(FR,{recursive:true,force:true});fs.mkdirSync(FR,{recursive:true});
 let tp=0;const N=STILL?1:Math.round((c.dur||4)*FPS);const clipX=c.cx||0,clipW=c.cw||390;
 await p.evaluate(()=>{window.__st=new Map();window.__sv=new Map()});
 for(let f=0;f<N;f++){const t=STILL?(c.still||2):f/FPS;
  // scroll-in: ease from startY to endY over the first 0.9 s
  if(c.from){const k=Math.min(1,t/.9),e=1-Math.pow(1-k,3);await p.evaluate(y=>scrollTo(0,y),Math.round(startY+(endY-startY)*e))}
  if(c.act)for(const a of c.act)if(!STILL&&f===Math.round(a.t*FPS))await p.evaluate(a.js);
  if((!STILL&&f===Math.round((c.go??1.1)*FPS))||(STILL&&(c.go??1.1)<t))console.log('go@',t,await p.evaluate(()=>{window.__alGo();return document.querySelectorAll('.al-go').length+' v:'+document.querySelectorAll('.al-v').length}));
  if(STILL&&c.act)for(const a of c.act)if(a.t<t)await p.evaluate(a.js);
  if(STILL){for(let w=0;w<t*1000;w+=250)await p.waitForTimeout(250)}
  await p.evaluate(async ([t,tp])=>{const st=window.__st,sv=window.__sv;
   // animations already running at frame 0 keep their phase; anything new was born after the previous frame
   for(const a of document.getAnimations()){if(!st.has(a))st.set(a,t>0?{ct:0,t0:tp}:{ct:a.currentTime||0,t0:t});const m=st.get(a);try{a.pause();a.currentTime=m.ct+(t-m.t0)*1000}catch(e){}}
   const ps=[];for(const v of document.querySelectorAll('video')){if(!v.classList.contains('al-cine')&&!v.getBoundingClientRect().height)continue;
    if(!sv.has(v))sv.set(v,{ct:v.currentTime,t0:t});const m=sv.get(v);v.pause();let x=m.ct+(t-m.t0);
    if(v.classList.contains('al-cine')){const a=+v.dataset.a,b=+v.dataset.b;
     // headless Chromium does not repaint a paused, seeked video: stand the film's own frames in for it (recording only)
     let im=v.parentNode.querySelector('img.al-cine');if(!im){im=document.createElement('img');im.className='al-cine al-play';v.after(im);v.style.display='none'}
     const k=Math.floor(((t-m.t0)%(b-a))*25)+1;const src='tools/concepts/worlds/comic/story/h/alive/tmp-cine/f'+String(Math.min(k,60)).padStart(3,'0')+'.jpg';
     if(!im.src.endsWith(src)){im.src=src;ps.push(im.decode().catch(()=>{}))}continue}
    else if(v.duration)x=x%v.duration;
    if(Math.abs(v.currentTime-x)>.01)ps.push(new Promise(r=>{const to=setTimeout(r,400);v.addEventListener('seeked',()=>{clearTimeout(to);r()},{once:true});v.currentTime=x}))}
   await Promise.all(ps);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))},[t,tp]);tp=t;
  await p.screenshot({path:`${FR}/${String(f).padStart(4,'0')}.png`,clip:{x:clipX,y:top,width:clipW,height:ch}})}
 const sw=await p.evaluate(()=>document.documentElement.scrollWidth);
 console.log(ID,'frames',N,'scrollWidth',sw,'errors',JSON.stringify(er.slice(0,3)));
 await b.close();
 if(STILL){fs.copyFileSync(`${FR}/0000.png`,path.join(OUT,ID+(RM?'-rm':'')+'-still.png'));return}
 const mp4=path.join(OUT,'x2p-x3p-h5-alive-'+ID.slice(1)+'.mp4');
 cp.execFileSync('ffmpeg',['-y','-v','error','-framerate',String(FPS),'-i',`${FR}/%04d.png`,'-vf','scale=780:-2:flags=lanczos,format=yuv420p','-c:v','libx264','-crf','20','-preset','slow','-movflags','+faststart',mp4]);
 console.log(mp4,(fs.statSync(mp4).size/1e6).toFixed(2)+' MB');
})();
