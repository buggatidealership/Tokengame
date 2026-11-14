// chips7: node run.js <out> <takes now,C7,C7~grid> [widths 320,390,1280] [dpr 2] : serve ez/ on port 8951 first.
// Shoots X2+'s live Meet the models (now = chips6) or chips7 laid over the built page (chips6's section removed first); prints the H23 tests:
// 1 resolution (painting px vs CSS width x 3), 2 cap height of every live figure, 3 the treatment on each live box, sideways scroll, errors, boxes.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'320,390,1280').split(',').map(Number),DPR=+(process.argv[5]||2);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  const [tk,o]=t.split('~');
  if(t!=='now'){await p.evaluate(()=>{document.querySelectorAll('section.c6').forEach(s=>s.remove())});
   await p.addStyleTag({content:rd('_c7.css')});await p.evaluate(o=>{window.__C7GRID=o==='grid'},o);await p.addScriptTag({content:rd('_c7.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('c7-ready'));}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>window.__c7&&__c7.fit());
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'});const st=document.createElement('style');st.textContent='body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug),header.top{visibility:hidden!important}';document.head.append(st)});
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForFunction(()=>[...document.querySelectorAll('.c7 img,.c6 img')].every(i=>i.complete));
  await p.waitForTimeout(1500);await p.evaluate(()=>window.__c7&&__c7.fit());
  const sel=t==='now'?'section.c6':'section.c7';
  const r=await p.evaluate(s=>{const e=document.querySelector(s);e.scrollIntoView();const b=e.getBoundingClientRect();return {y:Math.max(0,b.top+scrollY-8),h:Math.ceil(b.height+16)}},sel);
  await p.waitForTimeout(400);const nm=t.replace(/~/g,'-');
  await p.screenshot({path:`${OUT}/ch-${W}-${nm}.png`,clip:{x:0,y:r.y,width:W,height:r.h},fullPage:true});
  const ones=await p.$$(t==='now'?'section.c6 .c6-one':'section.c7 .c7-one');for(let i=0;i<ones.length;i++)await ones[i].screenshot({path:`${OUT}/one-${W}-${nm}-${i}.png`});
  const tr=await p.$(t==='now'?'section.c6 .c6-t':'section.c7 .c7-t');tr&&await tr.screenshot({path:`${OUT}/try-${W}-${nm}.png`});
  const m=await p.evaluate(()=>{const s=document.querySelector('section.c7');if(!s)return {sw:document.documentElement.scrollWidth};
    // Anton's cap height per em, measured on a canvas
    const cv=document.createElement('canvas').getContext('2d');cv.font='100px Anton';const capR=cv.measureText('H').actualBoundingBoxAscent/100;
    const pics=[...s.querySelectorAll('.c7-one .c7-pic')];const pic=pics[0],pw=pic.getBoundingClientRect().width,k=pw/3760;
    const im=pic.querySelector('img.c7-base');
    const caps=[...s.querySelectorAll('.c7-win:not(.c7-cell) text')].map(t=>{const g=t.closest('.c7-fit'),fs=+t.getAttribute('font-size')*(+g.dataset.k||1);return {t:t.textContent,cap:+(fs*k*capR).toFixed(2)}});
    const cells=[...s.querySelectorAll('.c7-cell svg path')].map(p=>+(p.getBBox().height*k).toFixed(2));
    const treat=[...s.querySelectorAll('.c7-win')].map(w=>{const tx=w.querySelector('text,path'),gl=w.nextElementSibling;const f=getComputedStyle(w.querySelector('text')||w.querySelector('svg')).filter;
      return (f&&f!=='none'?1:0)+(gl&&gl.classList.contains('c7-glass')&&getComputedStyle(gl).mixBlendMode==='screen'?1:0)});
    const vids=[...s.querySelectorAll('.c7-die')].map(d=>{const r=d.getBoundingClientRect();return [+r.width.toFixed(1),+r.height.toFixed(1)]});
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,h:Math.round(s.getBoundingClientRect().height),chipCSS:+pw.toFixed(1),need3x:Math.round(pw*3),file:im.currentSrc.split('/').pop(),fileW:im.naturalWidth,
      capR:+capR.toFixed(3),caps:caps.slice(0,3).concat(caps.slice(-3)),minCap:Math.min(...caps.map(c=>c.cap)),minCellGlyph:Math.min(...cells),treatOK:treat.every(v=>v===2)+'/'+treat.length,die:vids[0],
      fits:[...s.querySelectorAll('.c7-fit')].map(g=>g.textContent+':'+g.dataset.k).join(' '),data:window.__c7.data,boxes:window.__c7.boxes()}});
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
