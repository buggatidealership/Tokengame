// node run.js <out> <takes now,A,B,B2,C> [widths 390,1280] : serve ez/ on port 8951 first. Shoots X2+'s standings (today) or the
// chips section that replaces it, laid over the built page; prints sideways scroll, errors, and any live text outside its painting.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  if(t!=='now'){await p.addStyleTag({content:rd('_c.css')});await p.evaluate(([k,q])=>{window.__CH=k;window.__CHQ=q},[t,JSON.parse(rd('quads.json'))]);await p.addScriptTag({content:rd('_c.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('ch-ready'));}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>window.__ch&&__ch.place());
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'});const st=document.createElement('style');st.textContent='body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug),header.top{visibility:hidden!important}';document.head.append(st)});
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForFunction(()=>[...document.querySelectorAll('.ch img,#standings img')].every(i=>i.complete));
  // the posters stand for the loops in a still (the run uses reduced motion); wait for each video's poster frame
  await p.waitForTimeout(1500);
  const sel=t==='now'?'#standings':'section.ch';
  const r=await p.evaluate(s=>{const e=document.querySelector(s);e.scrollIntoView();const b=e.getBoundingClientRect();return {y:Math.max(0,b.top+scrollY-8),h:Math.ceil(b.height+16)}},sel);
  await p.waitForTimeout(400);
  await p.screenshot({path:`${OUT}/ch-${W}-${t}.png`,clip:{x:0,y:r.y,width:W,height:r.h},fullPage:true});
  if(t!=='now'){const bt=await p.$$('.ch-beat,.ch-c .ch-ink');for(let i=0;i<Math.min(bt.length,4);i++)await bt[i].screenshot({path:`${OUT}/bt-${W}-${t}-${i}.png`})}
  const m=await p.evaluate(()=>{const s=document.querySelector('section.ch');if(!s)return {sw:document.documentElement.scrollWidth};
    const out=[...s.querySelectorAll('.ch-sf')].filter(e=>{const r=e.getBoundingClientRect(),a=e.closest('.ch-pic').getBoundingClientRect();return r.left<a.left-1||r.right>a.right+1||r.top<a.top-1||r.bottom>a.bottom+1}).length;
    const tiny=[...s.querySelectorAll('.ch-sf text')].map(e=>e.getBoundingClientRect().height).sort((a,b)=>a-b);
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,h:Math.round(s.getBoundingClientRect().height),outSurf:out,smallestTextPx:+(tiny[0]||0).toFixed(1),data:window.__ch.data}});
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
