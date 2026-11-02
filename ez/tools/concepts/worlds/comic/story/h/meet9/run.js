// meet9: node run.js <out> <takes now,A,B,C,D,E> [widths 320,390,1280] [dpr 3] : serve ez/ on port 8961 first.
// Shoots X2+'s live Meet the models (now = chips8 take c) and each meet9 take laid over it; prints: sideways scroll, errors, the cap height of each line, its fit scale.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'320,390,1280').split(',').map(Number),DPR=+(process.argv[5]||3);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const MOT=process.env.MOTION==='1';const IM='tools/concepts/worlds/comic/story/h/meet9/out/';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:MOT?'no-preference':'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.documentElement.classList.contains('c8-ready'),null,{timeout:120000});await p.waitForTimeout(800);
  if(t!=='now'){await p.addStyleTag({content:rd('_m9.css').replace(/IMG\//g,IM)});await p.evaluate(t=>{window.__M9T=t},t);await p.addScriptTag({content:rd('_m9.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('m9-ready'));}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>window.__m9&&__m9.fit());
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'})});
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
  await p.evaluate(()=>document.querySelector('section.c8').scrollIntoView());
  await p.waitForFunction(()=>[...document.querySelectorAll('section.c8 img')].every(i=>i.complete&&i.naturalWidth),null,{timeout:60000}).catch(()=>{});
  await p.evaluate(()=>Promise.all([...document.querySelectorAll('section.c8 video')].map(v=>new Promise(r=>{if(v.readyState>=2)return r();v.preload='auto';v.load();v.addEventListener('loadeddata',r,{once:true});setTimeout(r,8000)}))));
  await p.waitForTimeout(MOT?3200:1500);await p.evaluate(()=>window.__m9&&__m9.fit());await p.waitForTimeout(300);
  const r=await p.evaluate(()=>{const e=document.querySelector('section.c8');const b=e.getBoundingClientRect();return {y:Math.max(0,b.top+scrollY-8),h:Math.ceil(b.height+16)}});
  await p.screenshot({path:`${OUT}/ch-${W}-${t}.png`,clip:{x:0,y:r.y,width:W,height:r.h},fullPage:true});
  const m=await p.evaluate(()=>{const cv=document.createElement('canvas').getContext('2d');cv.font='100px Anton';const capR=cv.measureText('H').actualBoundingBoxAscent/100;
    const L=[...document.querySelectorAll('.m9-tx b,.m9-cht b,.m9-hot b')].map(b=>{const fs=parseFloat(getComputedStyle(b).fontSize),k=+(b.dataset.k||1);const r=b.getBoundingClientRect(),box=b.parentElement.getBoundingClientRect();
      return {cap:+(fs*k*capR).toFixed(2),k,over:+(r.right-box.right).toFixed(1),inX:r.left>=-0.5&&r.right<=innerWidth+.5}});
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,h:Math.round(document.querySelector('section.c8').getBoundingClientRect().height),lines:L}});
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
