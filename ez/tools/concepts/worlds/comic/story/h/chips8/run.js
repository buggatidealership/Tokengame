// chips8: node run.js <out> <takes now,a,b,c,a~grid> [widths 320,390,1280] [dpr 2] : serve ez/ on port 8951 first.
// Shoots X2+'s live Meet the models (now = chips7) or a chips8 take laid over the built page (chips7's section removed first); prints H23's tests:
// 1 resolution, 2 cap height of every live figure, 3 the treatment on each live box, sideways scroll, errors, the boxes, the data.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'320,390,1280').split(',').map(Number),DPR=+(process.argv[5]||2);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const MOT=process.env.MOTION==='1';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:MOT?'no-preference':'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  const [tk,o]=t.split('~');
  if(tk!=='now'){await p.evaluate(()=>{document.querySelectorAll('section.c7,section.c6').forEach(s=>s.remove())});
   await p.addStyleTag({content:rd('_c8.css')});await p.evaluate(([o,tk])=>{window.__C8GRID=o==='grid';window.__C8T=tk},[o,tk]);await p.addScriptTag({content:rd('_c8.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('c8-ready'));}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>window.__c8&&__c8.fit());
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'});const st=document.createElement('style');st.textContent='body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug),header.top{visibility:hidden!important}';document.head.append(st)});
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
  const sel=tk==='now'?'section.c7':'section.c8';
  await p.evaluate(s=>document.querySelector(s).scrollIntoView(),sel);
  await p.waitForFunction(s=>[...document.querySelectorAll(s+' img')].every(i=>i.complete&&i.naturalWidth),sel,{timeout:60000}).catch(()=>{});
  await p.evaluate(s=>Promise.all([...document.querySelectorAll(s+' video')].map(v=>new Promise(r=>{if(v.readyState>=2)return r();v.preload='auto';v.load();v.addEventListener('loadeddata',r,{once:true});setTimeout(r,8000)}))),sel);
  await p.waitForTimeout(1500);await p.evaluate(()=>window.__c8&&__c8.fit());
  const r=await p.evaluate(s=>{const e=document.querySelector(s);const b=e.getBoundingClientRect();return {y:Math.max(0,b.top+scrollY-8),h:Math.ceil(b.height+16)}},sel);
  await p.waitForTimeout(400);const nm=t.replace(/~/g,'-');
  await p.screenshot({path:`${OUT}/ch-${W}-${nm}.png`,clip:{x:0,y:r.y,width:W,height:r.h},fullPage:true});
  const ones=await p.$$(sel+(tk==='now'?' .c7-one':' .c8-one'));for(let i=0;i<ones.length;i++)await ones[i].screenshot({path:`${OUT}/one-${W}-${nm}-${i}.png`});
  const tr=await p.$(sel+' .c7-t');tr&&await tr.screenshot({path:`${OUT}/try-${W}-${nm}.png`});
  const m=await p.evaluate(()=>{const s=document.querySelector('section.c8');if(!s)return {sw:document.documentElement.scrollWidth};
    const cv=document.createElement('canvas').getContext('2d');cv.font='100px Anton';const capR=cv.measureText('H').actualBoundingBoxAscent/100;
    const pics=[...s.querySelectorAll('.c8-one .c7-pic')];const pic=pics[0],pw=pic.getBoundingClientRect().width,k=pw/__c8.G.size[0];
    const im=pic.querySelector('img.c7-base');
    const caps=[...s.querySelectorAll('.c7-win text')].map(t=>{const g=t.closest('.c7-fit'),fs=+t.getAttribute('font-size')*(+g.dataset.k||1);return {t:t.textContent,cap:+(fs*k*capR).toFixed(2)}});
    const marks=[...s.querySelectorAll('.c8-lr svg path')].map(p=>+(p.getBBox().height*k).toFixed(2));
    const lg=[...s.querySelectorAll('.c8-lg')].map(i=>{const r=i.getBoundingClientRect();return i.className.replace('c8-lg ','')+' '+r.width.toFixed(1)+'x'+r.height.toFixed(1)});
    const treat=[...s.querySelectorAll('.c7-win')].map(w=>{const gl=w.nextElementSibling;const f=getComputedStyle(w.querySelector('text')||w.querySelector('svg')).filter;
      return (f&&f!=='none'||w.classList.contains('c8-dim')?1:0)+(gl&&gl.classList.contains('c7-glass')&&getComputedStyle(gl).mixBlendMode==='screen'?1:0)});
    const bal=[...s.querySelectorAll('.c8-bal span')].map(b=>{const r=b.getBoundingClientRect();return [+r.width.toFixed(1),+r.height.toFixed(1),getComputedStyle(b).fontSize]});
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,h:Math.round(s.getBoundingClientRect().height),chipCSS:+pw.toFixed(1),need3x:Math.round(pw*3),file:im.currentSrc.split('/').pop(),fileW:im.naturalWidth,
      minCap:Math.min(...caps.map(c=>c.cap)),caps:caps.slice(0,4),minMark:Math.min(...marks),logos:lg,treatOK:treat.every(v=>v===2)+'/'+treat.length,bal:bal[0],
      fits:[...s.querySelectorAll('.c7-fit')].map(g=>g.textContent+':'+g.dataset.k).join(' | '),data:__c8.data,boxes:__c8.boxes()}});
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
