// node rec.js <out.mp4> : 390px, takes c then d; each frame of "How a round works" plays its micro-interaction (as a tap does), stepped frame by frame
// through the Web Animations clock (40 ms a frame), so the film shows the real timing. Serve ez/ on :8951 first.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process');
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const OUT=process.argv[2],TMP=fs.mkdtempSync(require('os').tmpdir()+'/t2rec');let n=0;
(async()=>{const b=await chromium.launch();
 for(const t of ['c','d']){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);
  await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.addStyleTag({content:rd('_t2.css')});await p.evaluate(k=>window.__t2Take=k,t);await p.addScriptTag({content:rd('_t2.js')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('t2-ready'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed')x.style.visibility='hidden'});const g=document.querySelector('.t2-b2');scrollTo(0,g.getBoundingClientRect().top+scrollY-70)});
  const shot=async()=>{await p.screenshot({path:`${TMP}/f${String(n++).padStart(4,'0')}.jpg`,type:'jpeg',quality:88,clip:{x:0,y:0,width:390,height:844}})};
  for(let i=0;i<10;i++)await shot();
  for(let i=0;i<4;i++){
   await p.evaluate(i=>{const f=document.querySelectorAll('.t2-f')[i];f.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))},i);
   await p.waitForTimeout(30);
   for(let ms=0;ms<=1300;ms+=40){await p.evaluate(ms=>document.getAnimations().forEach(a=>{const tg=a.effect&&a.effect.target;if(tg&&tg.closest&&tg.closest('.t2-f')){a.pause();a.currentTime=ms}}),ms);await shot()}
   await p.evaluate(()=>document.getAnimations().forEach(a=>{const tg=a.effect&&a.effect.target;if(tg&&tg.closest&&tg.closest('.t2-f'))a.finish()}));
   await p.evaluate(i=>document.querySelectorAll('.t2-f')[i].classList.remove('t2-go'),i);await p.waitForTimeout(1200);for(let k=0;k<6;k++)await shot()}
  await ctx.close()}
 cp.execSync(`ffmpeg -y -loglevel error -framerate 25 -i ${TMP}/f%04d.jpg -vf scale=780:-2 -c:v libx264 -pix_fmt yuv420p -crf 22 -movflags +faststart ${OUT}`);
 fs.rmSync(TMP,{recursive:true});await b.close();console.log('ok',OUT,n)})();
