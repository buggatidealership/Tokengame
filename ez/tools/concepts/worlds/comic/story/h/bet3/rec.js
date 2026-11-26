// node rec.js <take> <out.mp4> : a 390px scroll through the bet chapter with the take laid over the live page, shot frame by frame at 2x:
// each frame steps the scroll (an even ease from the vault to the last panel, then a hold) and the fees' SVG clock by 1/30 s, so the loop
// plays at its real speed in the film. The chip's seconds follow the real clock while shooting (shooting is slower than real time).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process');
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';const T=process.argv[2],OUT=process.argv[3],TMP=fs.mkdtempSync(require('os').tmpdir()+'/b3rec');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://localhost:8943/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.querySelector('.wc-bet.hb-on .hbc-fr')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 await p.addStyleTag({content:rd('_k.css')+rd(T+'.css')});await p.addScriptTag({content:rd('_k.js')+rd(T+'.js')});
 await p.waitForFunction(()=>document.documentElement.classList.contains('b3-ready'));await p.waitForFunction(()=>document.fonts.status==='loaded');
 const [y0,y1]=await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'});
   const s=document.querySelector('.wc-bet'),r=s.getBoundingClientRect();document.documentElement.style.scrollBehavior='auto';return [r.top+scrollY-10,r.bottom+scrollY-innerHeight+30]});
 await p.evaluate(()=>document.querySelectorAll('svg.b3s').forEach(s=>s.pauseAnimations()));await p.waitForTimeout(800);
 const F=30,N=Math.round(F*15),hold=Math.round(F*1.2);let i=0;
 for(;i<N;i++){const k=Math.max(0,Math.min(1,(i-hold)/(N-2*hold))),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,y=y0+(y1-y0)*e;
  await p.evaluate(([e,t])=>{const s=document.querySelector('.wc-bet'),h=s.getBoundingClientRect().height,off=10+(innerHeight-h-40-10)*e;window.scrollTo({top:scrollY+s.getBoundingClientRect().top-off,behavior:'instant'});document.querySelectorAll('svg.b3s').forEach(s=>s.setCurrentTime(t))},[e,i/F]);
  await p.screenshot({path:`${TMP}/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:90})}
 cp.execSync(`ffmpeg -y -loglevel error -framerate ${F} -i ${TMP}/f%04d.jpg -c:v libx264 -pix_fmt yuv420p -crf 21 -movflags +faststart ${OUT}`);
 fs.rmSync(TMP,{recursive:true});await b.close();console.log('ok',OUT,N,'frames')})();
