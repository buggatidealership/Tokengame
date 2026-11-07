// Helper j ("I didn't know that existed"): one runner for every take, laid over the built X3+.
//   node sj.js shot <take|now:take> <width> <out.png>     the take's section (or "now:<take>" = today's same section)
//   node sj.js rec  <take> <out.mp4> [width]               the take's motion, frames stepped (or real time where the take says so)
//   node sj.js perf <take> <out.json> [runs]               4x slower CPU at 390x844: the section today, then with the take, same page
// Takes live in takes.js; their CSS and JS in j<k>.css / j<k>.js. Server: localhost:8924 (cwd ez).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
const fs=require('fs'),os=require('os'),{execSync}=require('child_process');const T=require('./takes.js');
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
const URL='http://localhost:8924/v47-live-x3plus.html';
const [mode,tk0,a3,a4,a5]=process.argv.slice(2);
const today=tk0.startsWith('now:'),tk=today?tk0.slice(4):tk0,K=T[tk];if(!K)throw new Error('no take '+tk);

async function open(b,W,opt={}){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:opt.dpr||2,
    reducedMotion:opt.rm?'reduce':'no-preference',hasTouch:W<600,isMobile:false});
  await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))er.push('console: '+m.text())});
  if(opt.cpu){const c=await p.context().newCDPSession(p);await c.send('Emulation.setCPUThrottlingRate',{rate:opt.cpu});p.__cdp=c}
  if(K.pre)await p.addInitScript(K.pre);
  const t0=Date.now();await p.goto(URL+(K.hash||''),{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:240000,polling:250});
  p.__lift=(Date.now()-t0)/1000;p.__er=er;return p}
async function prime(p){const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30)}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(200)}
async function inject(p){await p.addStyleTag({content:rd('_sj.css')+rd(tk+'.css')});await p.addScriptTag({content:rd('_sj.js')+rd(tk+'.js')});
  await p.waitForFunction(k=>document.documentElement.classList.contains('sj-ready-'+k),tk,{timeout:60000})}
async function settle(p){await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(500)}
const hideFixed=p=>p.evaluate(()=>{const h=document.querySelector('header.top');if(h&&!window.__sjKeepHead)h.style.visibility='hidden';
  [...document.body.querySelectorAll('*')].forEach(x=>{if(x.closest('.sj-keep'))return;const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<130&&x.offsetHeight>0&&!x.classList.contains('sj-fixed'))x.style.visibility='hidden'})});
async function clip(p,sel,pad=[12,8]){return p.evaluate(([s,pad])=>{const n=document.querySelector(s);const r=n.getBoundingClientRect();
  const c={x:Math.max(0,r.left+scrollX-pad[0]),y:Math.max(0,r.top+scrollY-pad[1]),width:Math.min(document.documentElement.clientWidth,r.width+2*pad[0]),height:r.height+2*pad[1]};
  c.width=Math.floor(c.width/2)*2;c.height=Math.floor(Math.min(c.height,4800)/2)*2;return c},[sel,pad])}
const checks=p=>p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,err:window.__sjErr||null}));

(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
 try{
 if(mode==='shot'){const W=+a3,OUT=a4;const p=await open(b,W);await prime(p);
   if(K.stageNow&&today)await p.evaluate(K.stageNow);
   if(!today)await inject(p);
   await settle(p);await p.evaluate(K.stage||(()=>{}),{today,W});await p.waitForTimeout(K.wait||900);
   if(K.shotHook&&!today)await p.evaluate(K.shotHook,{W});
   await hideFixed(p);
   const sel=(W>=1000&&K.selD)||K.sel;await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-30)},sel);await p.waitForTimeout(K.wait2||500);
   if(K.afterScroll&&!today)await p.evaluate(K.afterScroll,{W});
   const c=K.clipFn?await p.evaluate(K.clipFn,{W}):await clip(p,sel,K.pad);
   if(K.noFull&&!today){const sy=await p.evaluate(()=>scrollY);c.y-=sy;await p.screenshot({path:OUT,clip:c})}else await p.screenshot({path:OUT,clip:c,fullPage:true});
   console.log(W,tk0,JSON.stringify(await checks(p)),p.__er.join(' | ')||'no errors')}
 else if(mode==='rec'){const OUT=a3,W=+(a4||390),R=K.rec;const p=await open(b,W,{dpr:R.dpr||2});await prime(p);await inject(p);await settle(p);
   await p.evaluate(K.stage||(()=>{}),{today:false,W});await p.waitForTimeout(800);await hideFixed(p);
   const TMP=fs.mkdtempSync(os.tmpdir()+'/sjrec-');let N=0;const fr=async c=>{await p.screenshot({path:`${TMP}/f${String(N++).padStart(4,'0')}.png`,clip:c})};
   await p.evaluate(R.setup,{W});await p.waitForTimeout(300);
   const sel=(W>=1000&&R.selD)||R.sel||K.sel;
   const c=R.fixed?await p.evaluate(()=>({x:0,y:0,width:innerWidth,height:innerHeight})):(R.clipFn||K.clipFn)?await p.evaluate(R.clipFn||K.clipFn,{W}):await clip(p,sel,R.pad||K.pad);
   if(R.fixed){c.y=0}
   if(R.screencast){const cdp=await p.context().newCDPSession(p);const fr=[];cdp.on('Page.screencastFrame',async e=>{fr.push({d:e.data,t:e.metadata.timestamp});try{await cdp.send('Page.screencastFrameAck',{sessionId:e.sessionId})}catch(_){}});
     await cdp.send('Page.startScreencast',{format:'jpeg',quality:92,everyNthFrame:1,maxWidth:W*2,maxHeight:(W<600?844:1000)*2});const t0=Date.now();
     while(Date.now()-t0<R.sec*1000){if(R.tick)await p.evaluate(R.tick,{t:Date.now()-t0});await p.waitForTimeout(R.tickMs||200)}
     await cdp.send('Page.stopScreencast');let L='';fr.forEach((f,i)=>{const fn=`${TMP}/s${String(i).padStart(5,'0')}.jpg`;fs.writeFileSync(fn,Buffer.from(f.d,'base64'));
       const du=i<fr.length-1?Math.max(.001,fr[i+1].t-f.t):.1;L+=`file '${fn}'\nduration ${du.toFixed(4)}\n`});fs.writeFileSync(TMP+'/l.txt',L);
     execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${TMP}/l.txt -vf "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart ${OUT}`);
     fs.rmSync(TMP,{recursive:true});console.log(OUT,fr.length,'screencast frames',p.__er.join(' | ')||'no errors');return}
   const FPS=R.fps||30,n=Math.round(R.sec*FPS);
   for(let i=0;i<n;i++){const t=i*1000/FPS;await p.evaluate(R.frame,{t,i,FPS,W});
     if(R.raf)await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
     const cc=R.fixed?{x:0,y:0,width:c.width,height:c.height}:c;await p.screenshot({path:`${TMP}/f${String(N++).padStart(4,'0')}.png`,clip:cc,fullPage:!R.fixed})}
   const hold=R.hold==null?FPS:R.hold;for(let i=0;i<hold;i++)fs.copyFileSync(`${TMP}/f${String(N-1).padStart(4,'0')}.png`,`${TMP}/f${String(N+i).padStart(4,'0')}.png`);
   const aud=R.audio?await p.evaluate(R.audio):null;let ain='';
   if(aud){const wav=TMP+'/a.wav';fs.writeFileSync(wav,Buffer.from(aud,'base64'));ain=`-i ${wav} -af apad -c:a aac -b:a 128k -shortest`}
   execSync(`ffmpeg -y -loglevel error -framerate ${FPS} -i ${TMP}/f%04d.png ${ain} -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart ${OUT}`);
   fs.rmSync(TMP,{recursive:true});console.log(OUT,N+hold,'frames',p.__er.join(' | ')||'no errors')}
 else if(mode==='perf'){const OUT=a3,RUNS=+(a4||3),res=[];
   for(let r=0;r<RUNS;r++){const p=await open(b,390,{cpu:4,dpr:2});const c=p.__cdp;await c.send('Performance.enable');
     await p.evaluate(()=>{window.__sjF=[];let l=performance.now();(function f(t){window.__sjF.push(t-l);l=t;requestAnimationFrame(f)})(l)});
     const td=async()=>{const m=(await c.send('Performance.getMetrics')).metrics;return m.find(x=>x.name==='TaskDuration').value};
     const sec=async()=>{await p.evaluate(K.perfStage||K.stage||(()=>{}),{today:false,W:390,perf:true});
       await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-(window.__sjPerfOff||200))},K.perfSel||K.sel);await p.waitForTimeout(1500)};
     if(K.perfInput)await p.evaluate(K.perfInput);
     const measure=async()=>{const o={};
       if(K.perfSwitch){const sw=async h=>{await p.evaluate(()=>window.__sjF=[]);const a=await td();await p.evaluate(h=>document.querySelector(`header .nav a[href="${h}"]`).click(),h);await p.waitForTimeout(2500);
           const fr=await p.evaluate(()=>window.__sjF.slice(1));return {task:+((await td())-a).toFixed(2),long:fr.filter(x=>x>50).length,maxFrame:Math.round(Math.max(...fr))}};
         o.toLB=await sw('#/leaderboard');o.toUp=await sw('#/upcoming');o.toOv=await sw('#/');return o}
       await p.evaluate(()=>window.__sjF=[]);let a=await td();await p.waitForTimeout(6000);o.idle=+((await td())-a).toFixed(2);
       o.idleFrames=await p.evaluate(()=>window.__sjF.length);
       await p.evaluate(()=>window.__sjF=[]);a=await td();
       await c.send('Input.synthesizeScrollGesture',{x:195,y:600,yDistance:-(K.perfDist||1400),speed:500,gestureSourceType:'touch'});
       await c.send('Input.synthesizeScrollGesture',{x:195,y:300,yDistance:(K.perfDist||1400),speed:500,gestureSourceType:'touch'});
       o.scroll=+((await td())-a).toFixed(2);const fr=await p.evaluate(()=>window.__sjF.slice(1));
       const dur=fr.reduce((s,x)=>s+x,0)/1000;o.scrollSec=+dur.toFixed(2);o.fps=+(fr.length/dur).toFixed(1);o.long=fr.filter(x=>x>50).length;return o};
     if(K.hash&&K.hash!=='')await p.waitForTimeout(500);
     await sec();const base=await measure();
     let a=await td();if(!K.base)await inject(p);const setup=+((await td())-a).toFixed(2);await p.waitForTimeout(300);
     await sec();const take=await measure();
     const ck=await checks(p);res.push({run:r,lift:p.__lift,setup,base,take,ck,err:p.__er});console.log(tk,'run',r,'lift',p.__lift,'setup',setup,JSON.stringify(base),'->',JSON.stringify(take),p.__er.join('|')||'ok');await p.close()}
   fs.writeFileSync(OUT,JSON.stringify(res,null,1))}
 else if(mode==='check'){const W=+a3;const p=await open(b,W,{rm:!!process.env.RM});await prime(p);await inject(p);await settle(p);await p.evaluate(K.stage||(()=>{}),{today:false,W});
   if(K.afterScroll)await p.evaluate(K.afterScroll,{W});await p.waitForTimeout(600);const mv=await p.evaluate(()=>({sjAnims:document.getAnimations().filter(a=>a.playState==='running'&&(/^sj/.test(a.animationName||'')||(a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('[class*=sj-]')))).length,webp:document.querySelectorAll('img[src*="/cg/"]').length,turn:!!document.documentElement.dataset.sjTurn}));
   console.log(W,tk,process.env.RM?'reduced-motion':'',JSON.stringify(await checks(p)),JSON.stringify(mv),p.__er.join(' | ')||'no errors')}
 else if(mode==='ab'){const OUT=a3,RUNS=+(a4||2),WIN=+(a5||6),res=[];
   for(let r=0;r<RUNS;r++){const p=await open(b,390,{cpu:4,dpr:2});const c=p.__cdp;await c.send('Performance.enable');
     await p.evaluate(()=>{window.__sjF=[];let l=performance.now();(function f(t){window.__sjF.push(t-l);l=t;requestAnimationFrame(f)})(l)});
     const td=async()=>{const m=(await c.send('Performance.getMetrics')).metrics;return m.find(x=>x.name==='TaskDuration').value};
     let a=await td();await inject(p);const setup=+((await td())-a).toFixed(3);
     if(K.perfInput)await p.evaluate(K.perfInput);
     await p.evaluate(K.perfStage||K.stage||(()=>{}),{today:false,W:390,perf:true});
     await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-(window.__sjPerfOff||200))},K.perfSel||K.sel);await p.waitForTimeout(1500);
     for(let i=0;i<8;i++){const on=i%2===1;await p.evaluate(on=>window.__sjToggle(on),on);await p.waitForTimeout(400);
       const o={on};
       if(K.perfSwitch){await p.evaluate(()=>window.__sjF=[]);const a0=await td();
         for(const h of ['#/leaderboard','#/upcoming','#/']){await p.evaluate(h=>document.querySelector(`header .nav a[href="${h}"]`).click(),h);await p.waitForTimeout(1600)}
         o.task=+((await td())-a0).toFixed(3);const fr=await p.evaluate(()=>window.__sjF.slice(1));o.long=fr.filter(x=>x>50).length;o.maxFrame=Math.round(Math.max(...fr));o.frames=fr.length;
         await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-200)},K.perfSel||K.sel);await p.waitForTimeout(600)}
       else{await p.evaluate(()=>window.__sjF=[]);let a0=await td();await p.waitForTimeout(WIN*1000);o.idleTask=+((await td())-a0).toFixed(3);o.idleFps=+((await p.evaluate(()=>window.__sjF.length))/WIN).toFixed(1);
         if(!K.noScroll){await p.evaluate(()=>window.__sjF=[]);a0=await td();
           await c.send('Input.synthesizeScrollGesture',{x:195,y:600,yDistance:-(K.perfDist||1000),speed:500,gestureSourceType:'touch'});
           await c.send('Input.synthesizeScrollGesture',{x:195,y:300,yDistance:(K.perfDist||1000),speed:500,gestureSourceType:'touch'});
           o.scrollTask=+((await td())-a0).toFixed(3);const fr=await p.evaluate(()=>window.__sjF.slice(1));const du=fr.reduce((s,x)=>s+x,0)/1000;o.scrollSec=+du.toFixed(2);o.scrollFps=+(fr.length/du).toFixed(1);o.long=fr.filter(x=>x>50).length}}
       res.push({run:r,i,...o,setup});console.log(tk,r,i,JSON.stringify(o))}
     console.log(tk,'run',r,'lift',p.__lift,'errors',p.__er.join('|')||'none');await p.close()}
   fs.writeFileSync(OUT,JSON.stringify(res,null,1))}
 }finally{await b.close()}})();
