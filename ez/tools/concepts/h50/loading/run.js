/* H50 loading cover runner. Serves the built X6+ page with a take's cover swapped in (Playwright route, nothing on disk changes),
   holds the cover, shoots it, slows the browser's animations 10x to shoot the lift frame by frame, then the first screen after it.
   node run.js <outdir> [takes=today,A,B,C] [sizes=390x844,1280x800] [video=1]
   Needs the local server on 127.0.0.1:8997 serving ez/. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const T=require('./takes.js');
const OUT=process.argv[2]||path.join(__dirname,'shots');fs.mkdirSync(OUT,{recursive:true});
const TAKES=(process.argv[3]||'today,A,B,C').split(',');
const SIZES=(process.argv[4]||'390x844,1280x800').split(',').map(s=>s.split('x').map(Number));
const VIDEO=process.argv[5]==='1';
const URL='http://127.0.0.1:8997/v50-live-x6plus.html';
const BASE=fs.readFileSync(path.join(__dirname,'../../../../v50-live-x6plus.html'),'utf8');
const rep=(s,a,b)=>{const n=s.split(a).length-1;if(n!==1)throw new Error('patch '+n+'x: '+a.slice(0,80));return s.replace(a,b)};
function page(take){let s=BASE;
  // hold the cover until the runner lets go; the lift's 400 ms window can be stretched for frame-by-frame shots
  s=rep(s,'function lift(){if(!H.classList.contains("x2p-cur"))return;','function lift(){if(window.__ldHold)return setTimeout(lift,50);if(!H.classList.contains("x2p-cur"))return;');
  s=rep(s,'setTimeout(function(){H.classList.remove("x2p-rv")},400)','setTimeout(function(){H.classList.remove("x2p-rv")},window.__rvMs||400)');
  s=rep(s,'setTimeout(function(){d.documentElement.classList.remove("x2p-cur")},20000)','setTimeout(function(){if(!window.__ldHold)d.documentElement.classList.remove("x2p-cur")},20000)');
  if(take.html){const m=s.match(/<div id="x2pLoad" aria-hidden="true">[\s\S]*?<\/svg><\/div>/);if(!m)throw new Error('no cover');
    s=s.replace(m[0],take.html);s=rep(s,'</head>','<style id="ld-take">'+take.css+'</style>\n</head>');s=s.replace('<head>','<head>\n'+take.head)}
  return s}
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const rep2={};
 for(const k of TAKES){const take=T[k]();const html=page(take);rep2[k]={htmlAdded:take.html?take.html.length+take.css.length+take.head.length:0};
  for(const [w,h] of SIZES){const mob=w<700&&h>w||h<=430;const dpr=w<700||h<=430?2:1;
   const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dpr,isMobile:mob,hasTouch:mob,
     ...(VIDEO&&(w===390||w===1280)?{recordVideo:{dir:path.join(OUT,'vid'),size:{width:w,height:h}}}:{})});
   await ctx.addInitScript(()=>{window.__ldHold=1});
   await ctx.route(URL,r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
   const p=await ctx.newPage();const t0=Date.now();
   await p.goto(URL,{waitUntil:'domcontentloaded'});
   // the first paint: what the cover looks like before any image or font is in (screenshot as soon as the DOM is there)
   if(w===390||w===1280)await p.screenshot({path:path.join(OUT,`${k}-${w}-0first.png`)}).catch(()=>{});
   await p.waitForTimeout(2600);
   const tag=`${k}-${w}x${h}`;
   await p.screenshot({path:path.join(OUT,tag+'-cover.png')});
   const chk=await p.evaluate(()=>{const L=document.getElementById('x2pLoad');const vw=innerWidth,vh=innerHeight,out=[];
     if(L)L.querySelectorAll('svg,div,span').forEach(e=>{const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')return;const r=e.getBoundingClientRect();
       if(!r.width||!r.height)return;const key=/ld[ABC]-(t|title|card|plate|set|cap|pres|h1|pt|pr|lg|plg)$|ldl/.test(e.getAttribute('class')||'');
       if(key&&(r.left<-0.5||r.right>vw+0.5||r.top<-0.5||r.bottom>vh+0.5))out.push((e.getAttribute('class')||e.tagName)+' '+[r.left,r.top,r.right,r.bottom].map(Math.round).join(','))});
     return {sw:document.documentElement.scrollWidth,vw,cut:out.slice(0,6),fonts:[...document.fonts].filter(f=>f.status==='loaded').length}});
   rep2[k][tag]=chk;
   const isV=!!(VIDEO&&(w===390||w===1280));
   if(!isV&&(w===390||w===1280)){
     // the lift, frame by frame at its true timing: let go, catch the moment the page adds x2p-rv, pause every animation and
     // transition on the page and step them together (0 to 400 ms), the 400 ms window held open meanwhile
     await p.evaluate(()=>{window.__rvMs=60000;window.__ldHold=0});
     await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-rv'),null,{polling:'raf'});
     await p.evaluate(()=>{const A=document.getAnimations();window.__ldA=A.map(a=>{a.pause();return [a,a.currentTime||0]})});
     const steps=[0,50,100,150,200,250,300,350,400];
     for(let i=0;i<steps.length;i++){await p.evaluate(dt=>{window.__ldA.forEach(([a,c])=>{try{a.currentTime=c+dt}catch(e){}});
         document.getAnimations().forEach(a=>{if(!window.__ldA.some(x=>x[0]===a)){a.pause();window.__ldA.push([a,0]);try{a.currentTime=dt}catch(e){}}})},steps[i]);
       await p.waitForTimeout(60);await p.screenshot({path:path.join(OUT,`${tag}-lift${i}.png`)})}
     await p.evaluate(()=>{window.__ldA.forEach(([a])=>{try{a.play()}catch(e){}});document.documentElement.classList.remove('x2p-rv')});
   } else await p.evaluate(()=>{window.__ldHold=0});
   await p.waitForTimeout(isV?2000:1800);
   await p.screenshot({path:path.join(OUT,tag+'-after.png')});
   rep2[k][tag].after=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cover:!!document.querySelector('html.x2p-cur,html.x2p-rv')}));
   const vid=p.video();await ctx.close();
   if(vid){const vp=await vid.path();fs.renameSync(vp,path.join(OUT,`vid-${k}-${w}.webm`))}
  }}
 fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(rep2,null,1));console.log(JSON.stringify(rep2,null,1));await b.close()})();
