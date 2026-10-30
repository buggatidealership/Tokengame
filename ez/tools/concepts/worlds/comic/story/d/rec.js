// node rec.js <take> <out.mp4> [width 390]: records the whole section, panel by panel, at 30 fps on a virtual clock: every CSS
// transition and animation in the section is paused and stepped frame by frame (so the motion is smooth however slow the machine),
// the count-ups read the same clock. The page scrolls from panel to panel and holds while each panel's motion plays.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),{execSync}=require('child_process');
const [t,OUT,W0]=process.argv.slice(2),W=+(W0||390),H=W<600?844:900,FPS=30;const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8'),A=f=>fs.readFileSync(__dirname+'/../a/'+f,'utf8');
const TMP=fs.mkdtempSync('/dev/shm/sdrec-');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});await FONTS(p);
 await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load',timeout:120000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 await p.evaluate(()=>{window.__sdV=0;window.__sdNow=()=>window.__sdV});
 await p.addStyleTag({content:A('_sa.css')+A('p3.css')});await p.addScriptTag({content:A('_sa.js')+A('p3.js')});
 await p.addStyleTag({content:rd('_sd.css')+rd(t+'.css')+'header.top{visibility:hidden}body > div:has(> .x2p-cw-run){display:none!important}'});await p.addScriptTag({content:rd('_sd.js')+rd(t+'.js')});
 await p.waitForFunction(()=>document.documentElement.classList.contains('sd-ready'));await p.waitForFunction(()=>document.fonts.status==='loaded');
 const top=await p.evaluate(()=>document.querySelector('.wc-lr').getBoundingClientRect().top+scrollY-30);await p.evaluate(y=>scrollTo(0,y),top);await p.waitForTimeout(600);
 const stops=await p.evaluate(()=>[...document.querySelectorAll('.sd-st [aria-label^="Step"], .wc-lr-5')].map(e=>Math.max(0,e.getBoundingClientRect().top+scrollY-70)));
 let f=0,y=top;
 const shot=async()=>{await p.evaluate(fr=>{const ms=fr*1000/30;window.__sdV=ms;window.__sdA=window.__sdA||new Map();
     document.getAnimations().forEach(a=>{const el=a.effect&&a.effect.target;if(!el||!el.closest||!el.closest('.wc-lr'))return;if(!window.__sdA.has(a)){window.__sdA.set(a,ms);a.pause()}a.currentTime=ms-window.__sdA.get(a)})},f);
   await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
   await p.evaluate(fr=>{const ms=fr*1000/30;document.getAnimations().forEach(a=>{const el=a.effect&&a.effect.target;if(!el||!el.closest||!el.closest('.wc-lr'))return;if(!window.__sdA.has(a)){window.__sdA.set(a,ms);a.pause()}a.currentTime=ms-window.__sdA.get(a)})},f);
   await p.screenshot({path:`${TMP}/f${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:92});if(f%50===0)console.log('frame',f,await p.evaluate(()=>[document.getAnimations().length,window.__sdA.size,(performance.memory||{}).usedJSHeapSize]));f++};
 for(let i=0;i<20;i++)await shot();
 for(const s of stops){const n=Math.max(8,Math.round(Math.abs(s-y)/40));for(let i=1;i<=n;i++){const k=i/n,e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;await p.evaluate(v=>scrollTo(0,v),y+(s-y)*e);await shot()}y=s;for(let i=0;i<Math.round(2.4*FPS);i++)await shot()}
 for(let i=0;i<20;i++)await shot();
 execSync(`ffmpeg -y -loglevel error -framerate ${FPS} -i ${TMP}/f%05d.jpg -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart ${OUT}`);
 fs.rmSync(TMP,{recursive:true});console.log(OUT,f,'frames',(f/FPS).toFixed(1)+'s');await b.close()})();
