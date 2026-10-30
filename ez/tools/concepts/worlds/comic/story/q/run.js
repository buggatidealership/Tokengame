// helper q (2026-10-30): "One round, start to finish" takes over the live R11 walkthrough (D2, round 56).
//   node run.js shot <now|q1,..> <widths 390,320,1280> <outdir>     whole strip (panels 1 to 4) + panel 3 at its beats
//   node run.js rec  <take> <out.mp4> [width]                         panel 2 (film from its start time) then panel 3, stepped frames
//   node run.js data                                                   prints round 56's numbers from the page
// Server localhost:8932 (cwd ez). Takes: q/<t>.css + q/<t>.js over q/_sq.css + q/_sq.js; a take's JS adds html.sq-ready.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
const fs=require('fs'),os=require('os'),{execSync}=require('child_process');
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
const URL='http://localhost:8932/v47-live-x3plus.html';
const [mode,tk,a3,a4]=process.argv.slice(2);
async function open(b,W){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2,reducedMotion:process.env.RM?'reduce':'no-preference',hasTouch:W<600});
  await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))er.push('console: '+m.text().slice(0,160))});
  await p.goto(URL,{waitUntil:'load',timeout:240000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:300000,polling:250});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=700){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(25)}
  await p.evaluate(()=>scrollTo(0,0));p.__er=er;return p}
async function take(p,t){if(t==='now')return;await p.addStyleTag({content:rd('_sq.css')+rd(t+'.css')});await p.evaluate(t=>document.documentElement.classList.add('sq-t-'+t),t);
  await p.addScriptTag({content:rd('_sq.js')+'\n'+rd(t+'.js')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('sq-ready')||window.__sqErr,null,{timeout:30000});
  const e=await p.evaluate(()=>window.__sqErr&&String(window.__sqErr.stack||window.__sqErr));if(e)throw new Error(e)}
const settle=async p=>{await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>Promise.all([...document.querySelectorAll('.wc-lr img')].filter(i=>i.src&&!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));await p.waitForTimeout(300)};
const hide=p=>p.evaluate(()=>{const st=document.createElement('style');st.textContent='body > div:has(> .x2p-cw-run){display:none!important}';document.head.appendChild(st);const cw=document.querySelector('.x2p-cw-run');if(cw&&cw.parentElement)cw.parentElement.style.setProperty('display','none','important');const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0)x.style.setProperty('visibility','hidden','important')})});
/* every animation in the walkthrough paused at time t (ms; Infinity = finished) */
const at=(p,t)=>p.evaluate(t=>{if(t===null&&window.__sqFin)window.__sqFin();const pg=document.querySelector('.wc11d-pg');pg.querySelectorAll('.wc11d-p,.sq-p').forEach(x=>x.classList.add('wc11-go','sq-go'));pg.querySelectorAll('.wc11d-p').forEach(x=>x.classList.remove('wc11-wait'));
  document.getAnimations().forEach(a=>{const el=a.effect&&a.effect.target;if(!el||!el.closest||!el.closest('.wc11d-pg'))return;if(el.closest('.sq-alive'))return;a.pause();const T=a.effect.getComputedTiming();a.currentTime=t===null?T.endTime:Math.min(t,T.endTime)})},t);
const checks=p=>p.evaluate(()=>{const n=document.querySelector('.wc-lr'),iw=document.documentElement.clientWidth;
  const out=[...n.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();if(!q.width||getComputedStyle(e).visibility==='hidden')return false;if(e.closest('svg')&&e.tagName!=='svg')return false;return q.right>iw+.5||q.left<-.5}).map(e=>(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className)||e.tagName).slice(0,6);
  const clip=[...n.querySelectorAll('b,span,small,p,em,strong,i')].filter(e=>e.offsetParent&&e.children.length===0&&e.textContent.trim()&&(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+2)&&getComputedStyle(e).overflow!=='visible'&&getComputedStyle(e).display!=='inline').map(e=>e.className+':'+e.textContent.trim().slice(0,20)).slice(0,6);
  /* text boxes that overlap another text box in the same panel */
  const leaves=[...n.querySelectorAll('.sq-p b,.sq-p span,.sq-p small,.sq-p em,.sq-p strong,.sq-p p,.sq-p i')].filter(e=>e.offsetParent&&e.children.length===0&&e.textContent.trim()&&getComputedStyle(e).visibility!=='hidden'&&(()=>{let o=1;for(let x=e;x&&x!==document.body;x=x.parentElement)o*=+getComputedStyle(x).opacity;return o>.05})()&&!e.closest('[data-sq-ov],.wc-sr'));
  const R=leaves.map(e=>{const r=document.createRange();r.selectNodeContents(e);return {e,q:r.getBoundingClientRect()}}),ov=[];
  for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i].q,b=R[j].q;const x=Math.min(a.right,b.right)-Math.max(a.left,b.left),y=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);if(x>3&&y>3&&!R[i].e.contains(R[j].e)&&!R[j].e.contains(R[i].e))ov.push(R[i].e.textContent.trim().slice(0,14)+' / '+R[j].e.textContent.trim().slice(0,14))}
  return {sw:document.documentElement.scrollWidth,iw,out,clip,ov:ov.slice(0,8)}});
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
 try{
 if(mode==='data'){const p=await open(b,390);console.log(JSON.stringify(await p.evaluate(()=>{const P=__x2pPnl().A,r=ROUNDS.find(x=>x.n===56);return {r,per:Object.fromEntries(Object.keys(P).map(m=>[m,P[m].per[56]])),pnl:Object.fromEntries(Object.keys(P).map(m=>[m,P[m].pnl])),f:FILMS[56]}}),null,1))}
 else if(mode==='shot'){const WS=a3.split(',').map(Number),OUT=a4;fs.mkdirSync(OUT,{recursive:true});
  for(const W of WS)for(const t of tk.split(',')){const p=await open(b,W);await take(p,t);await settle(p);
    const top=await p.evaluate(()=>document.querySelector('.wc-lr').getBoundingClientRect().top+scrollY);await p.evaluate(y=>scrollTo(0,y-60),top);await p.waitForTimeout(400);
    await at(p,null);await p.evaluate(async()=>{const v=document.querySelector('.sq-v');if(v&&window.__sqSeek){v.pause();await window.__sqSeek(13.8)}}).catch(()=>{});await p.waitForTimeout(400);await hide(p);
    const c=await p.evaluate(()=>{const s=document.querySelector('.wc-lr .wc-h2').getBoundingClientRect(),e=document.querySelector('.sq-p4,.wc11d-p4').getBoundingClientRect();return {x:0,y:Math.round(s.top+scrollY-14),width:document.documentElement.clientWidth,height:Math.round(e.bottom-s.top+30)}});
    await p.screenshot({path:`${OUT}/strip-${W}-${t}.png`,clip:c,fullPage:true});
    const ck=await checks(p);
    /* panel 3 at its beats (takes name them in window.__sqBeats; the live page: 0, .5 s, 1.2 s, end) */
    const beats=await p.evaluate(()=>window.__sqBeats||[[0,'start'],[500,'needle'],[1200,'hit'],[null,'end']]);
    const c3=await p.evaluate(()=>{const r=document.querySelector('.sq-p3,.wc11d-p3').getBoundingClientRect();return {x:Math.max(0,Math.round(r.left-10)),y:Math.round(r.top+scrollY-10),width:Math.min(document.documentElement.clientWidth,Math.round(r.width+20)),height:Math.round(r.height+20)}});
    for(const [ms,nm] of beats){await at(p,ms);await p.waitForTimeout(120);await p.screenshot({path:`${OUT}/p3-${W}-${t}-${nm}.png`,clip:c3,fullPage:true})}
    const p2=await p.evaluate(()=>{const v=document.querySelector('.wc11d-p2 .wc11d-tv,.sq-tv');const r=v&&v.getBoundingClientRect();return r?[Math.round(r.width),Math.round(r.height)]:null});
    console.log(W,t,JSON.stringify(ck),'p2box',JSON.stringify(p2),p.__er.join(' | ')||'no errors');await p.close()}}
 else if(mode==='rec'){const OUT=a3,W=+(a4||390);const p=await open(b,W);await take(p,tk);await settle(p);await hide(p);
   const TMP=fs.mkdtempSync(os.tmpdir()+'/sqrec-');let N=0;const FPS=15;
   const clip=sel=>p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();const h=Math.round(r.height+20);return {x:0,y:Math.round(r.top+scrollY-10),width:document.documentElement.clientWidth,height:h-h%2}},sel);
   const shot=async c=>{await p.screenshot({path:`${TMP}/f${String(N++).padStart(4,'0')}.png`,clip:c,fullPage:true})};
   // panel 2: play the film from the take's start (stepped by seeking), title card frames first
   await p.evaluate(()=>{const n=document.querySelector('.sq-p2,.wc11d-p2');scrollTo(0,n.getBoundingClientRect().top+scrollY-40)});await p.waitForTimeout(300);
   const c2=await clip('.sq-p2,.wc11d-p2');const H2=c2.height;
   for(let i=0;i<FPS;i++)await shot(c2);
   const info=await p.evaluate(()=>window.__sqPlay?window.__sqPlay():null);
   if(info){for(let t=info.t0;t<=info.t1;t+=1/FPS){await p.evaluate(t=>window.__sqSeek(t),t);await shot(c2)}for(let i=0;i<FPS;i++)await shot(c2)}
   // panel 3: the grading, stepped from the start of its timeline
   await p.evaluate(()=>{const n=document.querySelector('.sq-p3,.wc11d-p3');scrollTo(0,n.getBoundingClientRect().top+scrollY-40)});await p.waitForTimeout(300);
   const c3=await clip('.sq-p3,.wc11d-p3');const DUR=await p.evaluate(()=>window.__sqDur||2200);
   for(let t=-400;t<=DUR+900;t+=1000/FPS){await at(p,Math.max(0,t));await shot(c3)}
   // pad every frame to one size
   const HH=Math.max(c2.height,c3.height);execSync(`ffmpeg -y -loglevel error -framerate ${FPS} -i ${TMP}/f%04d.png -vf "pad=${W*2}:${HH*2}:0:0:color=0x1c1a20,scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -crf 22 -movflags +faststart ${OUT}`);
   fs.rmSync(TMP,{recursive:true});console.log(OUT,N,'frames',p.__er.join(' | ')||'no errors')}
 else if(mode==='check'){const W=+(a3||390);const p=await open(b,W);await take(p,tk);await settle(p);
   const top=await p.evaluate(()=>document.querySelector('.sq-p3,.wc11d-p3').getBoundingClientRect().top+scrollY);
   const st=[];for(let y=top-900;y<=top+200;y+=100){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(250);st.push([y-top,await p.evaluate(()=>document.querySelector('.sq-p3,.wc11d-p3').className.includes('go'))])}
   console.log(W,tk,process.env.RM?'RM':'',JSON.stringify(st),JSON.stringify(await p.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running'&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('.wc-lr')).map(a=>a.animationName||'waapi').slice(0,8))),p.__er.join('|')||'no errors')}
 }finally{await b.close()}})();
