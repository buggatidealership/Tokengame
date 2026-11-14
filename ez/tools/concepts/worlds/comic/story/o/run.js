// helper o: one runner for every take, laid over the built X3+ with D2 (fight night) as the walkthrough, as the owner picked it.
//   node run.js shot  <take|now> <width> <out.png> <view>   views: grid, panel, map, mapp, p3, wet, wetx
//   node run.js rec   <take> <out.mp4> <width> <view> <sec>  real-time screencast of a view (living pictures run on the real clock)
//   node run.js step  <take> <out.mp4> <width>              O4/O5: panel 3's timeline stepped frame by frame (smooth on any machine)
//   node run.js check <take> <width>                        scrollWidth, errors, what moves (RM=1: reduced motion)
//   node run.js perf  <takes,..> <out.json> [runs]          4x slower CPU at 390x844: 6 s idle over the grid, page with D2 vs D2 + each take (order rotated per run)
// Server: localhost:8915 (cwd ez).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
const fs=require('fs'),os=require('os'),{execSync}=require('child_process');
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
const A=f=>fs.readFileSync(__dirname+'/../a/'+f,'utf8'),Dd=f=>fs.readFileSync(__dirname+'/../d/'+f,'utf8');
const URL='http://localhost:8915/v47-live-x3plus.html';
const [mode,tk,a3,a4,a5,a6]=process.argv.slice(2);
async function open(b,W,o={}){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:o.dpr||2,reducedMotion:process.env.RM?'reduce':'no-preference',hasTouch:W<600});
  await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))er.push('console: '+m.text().slice(0,160))});
  if(o.cpu){const c=await p.context().newCDPSession(p);await c.send('Emulation.setCPUThrottlingRate',{rate:o.cpu});p.__cdp=c}
  if(o.pre)await p.addInitScript(o.pre);
  await p.goto(URL,{waitUntil:'load',timeout:240000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:300000,polling:250});
  p.__er=er;return p}
async function prime(p){const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30)}await p.evaluate(()=>scrollTo(0,0))}
async function base(p,o={}){ // D2 (with helper a's panel 5), as helper d's runner lays it; everything still for stills when o.still
  if(o.still)await p.evaluate(()=>window.__sdStill=1);
  await p.addStyleTag({content:A('_sa.css')+A('p3.css')});await p.addScriptTag({content:A('_sa.js')+A('p3.js')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('sa-ready'),null,{timeout:30000});
  await p.addStyleTag({content:Dd('_sd.css')+Dd('d2.css')});await p.evaluate(()=>document.documentElement.classList.add('sd-t-d2'));
  await p.addScriptTag({content:Dd('_sd.js')+Dd('d2.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('sd-ready'),null,{timeout:30000});
  await p.evaluate(()=>{const g=document.querySelector('.wc-bis');if(g&&g.dataset.all!=='1')document.querySelector('.wc-season .wc-more').click()})}
async function take(p,t){if(t==='now')return;await p.addStyleTag({content:rd('_so.css')+rd(t+'.css')});
  await p.addScriptTag({content:'window.__oCG='+rd('cg/meta.json')+';\n'+rd('_so.js')+'\n'+rd(t+'.js')});
  await p.waitForFunction(t=>document.documentElement.classList.contains('so-ready-'+t),t,{timeout:60000})}
const settle=async p=>{await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>Promise.all([...document.images].filter(i=>i.closest('.wc-season,.wc-lr')&&i.src&&!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));await p.waitForTimeout(400)};
const hide=p=>p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0)x.style.setProperty('visibility','hidden','important')})});
const SEL={grid:'.wc-season',map:'.wc-season',wet:'.wc-season',panel:'.sd2-p2',mapp:'.sd2-p2',p3:'.sd2-p3'};
async function clipOf(p,view,W){return p.evaluate(([view,W])=>{const cw=document.documentElement.clientWidth;
  if(['grid','map','wet'].includes(view)){const s=document.querySelector('.wc-season h2').getBoundingClientRect(),t=[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent);
    const e=t[Math.min(t.length-1,W<600?20:(W<1000?20:23))].getBoundingClientRect();const c={x:0,y:Math.round(s.top+scrollY-10),width:cw};c.height=Math.round(e.bottom+scrollY+14-c.y);return c}
  const sel={panel:'.sd2-p2',mapp:'.sd2-p2',p3:'.sd2-p3'}[view];const r=document.querySelector(sel).getBoundingClientRect();
  return {x:Math.max(0,Math.round(r.left-16)),y:Math.round(r.top+scrollY-24),width:Math.min(cw,Math.round(r.width+32)),height:Math.round(r.height+40)}},[view,W]).then(c=>{c.width-=c.width%2;c.height-=c.height%2;return c})}
const checks=p=>p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,soErr:window.__soErr||null}));
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
 try{
 if(mode==='shot'){const W=+a3,OUT=a4,view=a5||'grid';const p=await open(b,W,{pre:process.env.PRE||''});await prime(p);await base(p,{still:true});await take(p,tk);await settle(p);
   const sel=SEL[view]||view;await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-(innerHeight*.3))},sel);await p.waitForTimeout(600);
   if(process.env.STAGE)await p.evaluate(process.env.STAGE);
   await p.waitForTimeout(+process.env.WAIT||300);await hide(p);
   const c=await clipOf(p,view,W);await p.screenshot({path:OUT,clip:c,fullPage:true});console.log(W,tk,view,JSON.stringify(await checks(p)),p.__er.join(' | ')||'no errors')}
 else if(mode==='rec'){const OUT=a3,W=+(a4||390),view=a5||'grid',SEC=+(a6||8);const p=await open(b,W,{pre:process.env.PRE||''});await prime(p);await base(p,{still:true});await take(p,tk);await settle(p);
   const sel=SEL[view]||view;await p.evaluate(([s,v])=>{const n=document.querySelector(s);const t=[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent);
     const y=v==='grid'?t[Math.min(t.length-1,6)].getBoundingClientRect().top+scrollY-12:n.getBoundingClientRect().top+scrollY-30;scrollTo({top:y,behavior:'instant'})},[sel,view]);
   await hide(p);await p.waitForTimeout(300);if(process.env.STAGE)await p.evaluate(process.env.STAGE);await p.waitForTimeout(1200);
   const TMP=fs.mkdtempSync(os.tmpdir()+'/sorec-'),cdp=await p.context().newCDPSession(p),fr=[];
   cdp.on('Page.screencastFrame',async e=>{fr.push({d:e.data,t:e.metadata.timestamp});try{await cdp.send('Page.screencastFrameAck',{sessionId:e.sessionId})}catch(_){}});
   await cdp.send('Page.startScreencast',{format:'jpeg',quality:90,everyNthFrame:1,maxWidth:W*2,maxHeight:(W<600?844:1000)*2});const t0=Date.now();
   const TICK=process.env.TICK;while(Date.now()-t0<SEC*1000){if(TICK)await p.evaluate(TICK+'('+(Date.now()-t0)+')');await p.waitForTimeout(200)}
   await cdp.send('Page.stopScreencast');let L='';fr.forEach((f,i)=>{const fn=`${TMP}/s${String(i).padStart(5,'0')}.jpg`;fs.writeFileSync(fn,Buffer.from(f.d,'base64'));const du=i<fr.length-1?Math.max(.001,fr[i+1].t-f.t):.1;L+=`file '${fn}'\nduration ${du.toFixed(4)}\n`});
   fs.writeFileSync(TMP+'/l.txt',L);const crop=process.env.CROP||'';
   execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${TMP}/l.txt -vf "fps=30,${crop?crop+',':''}scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -crf 21 -movflags +faststart ${OUT}`);
   fs.rmSync(TMP,{recursive:true});console.log(OUT,fr.length,'frames',p.__er.join(' | ')||'no errors')}
 else if(mode==='step'){const OUT=a3,W=+(a4||390);const p=await open(b,W,{pre:'window.__oHold=1'});await prime(p);await base(p,{still:true});await take(p,tk);await settle(p);
   await p.evaluate(()=>{const n=document.querySelector('.sd2-p3');scrollTo(0,n.getBoundingClientRect().top+scrollY-30)});await hide(p);await p.waitForTimeout(400);
   const c=await clipOf(p,'p3',W);const TMP=fs.mkdtempSync(os.tmpdir()+'/sostep-');const FPS=30,DUR=+(a5||4.2);let N=0;
   for(let i=0;i<Math.round(DUR*FPS);i++){await p.evaluate(t=>window.__oDraw(t),i/FPS-0.5);await p.screenshot({path:`${TMP}/f${String(N++).padStart(4,'0')}.png`,clip:c,fullPage:true})}
   for(let i=0;i<24;i++)fs.copyFileSync(`${TMP}/f${String(N-1).padStart(4,'0')}.png`,`${TMP}/f${String(N+i).padStart(4,'0')}.png`);
   execSync(`ffmpeg -y -loglevel error -framerate ${FPS} -i ${TMP}/f%04d.png -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart ${OUT}`);
   fs.rmSync(TMP,{recursive:true});console.log(OUT,N,'frames',p.__er.join(' | ')||'no errors')}
 else if(mode==='check'){const W=+a3;const p=await open(b,W);await prime(p);await base(p);await take(p,tk);await settle(p);
   for(const s of ['.wc-season','.sd2-p2','.sd2-p3']){await p.evaluate(s=>{const n=document.querySelector(s);n&&scrollTo(0,n.getBoundingClientRect().top+scrollY-200)},s);await p.waitForTimeout(1800)}
   const mv=await p.evaluate(()=>({anims:document.getAnimations().filter(a=>a.playState==='running'&&a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('[class*=so]')).length,
     layers:[...document.querySelectorAll('.so-pt')].filter(x=>getComputedStyle(x).display!=='none'&&+getComputedStyle(x).opacity>0).length,living:document.querySelectorAll('.so-pic').length}));
   console.log(W,tk,process.env.RM?'reduced-motion':'',JSON.stringify(await checks(p)),JSON.stringify(mv),p.__er.join(' | ')||'no errors')}
 else if(mode==='perf'){const OUT=a3,RUNS=+(a4||3),res=[];
   const AR=['base',...tk.split(',')];for(let r=0;r<RUNS;r++)for(let q=0;q<AR.length;q++){const arm=AR[(q+r)%AR.length];const p=await open(b,390,{cpu:4,dpr:2});const c=p.__cdp;await c.send('Performance.enable');
     await prime(p);await base(p);if(arm!=='base')await take(p,arm);await settle(p);
     await p.evaluate(()=>{const t=[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent);scrollTo(0,t[9].getBoundingClientRect().top+scrollY-120)});await p.waitForTimeout(2500);
     await p.evaluate(()=>{window.__soF=[];let l=performance.now();(function f(t){window.__soF.push(t-l);l=t;requestAnimationFrame(f)})(l)});
     const td=async()=>(await c.send('Performance.getMetrics')).metrics.find(x=>x.name==='TaskDuration').value;
     const a=await td();await p.waitForTimeout(6000);const task=+((await td())-a).toFixed(3);const fr=await p.evaluate(()=>window.__soF.slice(1));
     const o={run:r,arm,idleTask:task,frames:fr.length,long:fr.filter(x=>x>50).length,err:p.__er};res.push(o);console.log(tk,JSON.stringify(o));await p.close()}
   fs.writeFileSync(OUT,JSON.stringify(res,null,1))}
 }finally{await b.close()}})();
