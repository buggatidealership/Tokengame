// node run.js <out> <takes now,O1,...> [widths 390,1280] : serve ez/ on port 8952 first. Shoots the top (header to the end of the
// hand-over + the start of the standings) with an exch take laid over the built page; prints sideways scroll, errors, surfaces outside their frame.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8952/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  if(t!=='now'){await p.addStyleTag({content:rd('_x.css')});await p.evaluate(k=>window.__X=k,t);await p.addScriptTag({content:rd('_x.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('x-ready'));}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(400);await p.evaluate(()=>window.__x&&__x.place());
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed')x.style.visibility='hidden'});const st=document.createElement('style');st.textContent='body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug){visibility:hidden!important}';document.head.append(st)});
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForFunction(()=>[...document.querySelectorAll('.x img')].every(i=>i.complete));await p.waitForTimeout(700);await p.evaluate(()=>[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed')x.style.visibility='hidden'}));
  const bot=await p.evaluate(()=>{const s=document.querySelector('.x');if(!s){const b=document.querySelector('section.x2o-bet');return Math.ceil(b.getBoundingClientRect().bottom+scrollY)+24}
    const st=document.querySelector('#standings');const sb=st?st.getBoundingClientRect().top+scrollY+Math.min(260,st.offsetHeight):s.getBoundingClientRect().bottom+scrollY;return Math.ceil(sb)});
  await p.screenshot({path:`${OUT}/top-${W}-${t}.png`,clip:{x:0,y:0,width:W,height:bot},fullPage:true});
  if(t!=='now'){await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden'});const h=await p.$('.x-b4');if(h)await h.screenshot({path:`${OUT}/hand-${W}-${t}.png`});const b1=await p.$('.x-b1 .x-ink');if(b1)await b1.screenshot({path:`${OUT}/b1-${W}-${t}.png`})}
  const m=await p.evaluate(()=>{const s=document.querySelector('.x');if(!s)return {sw:document.documentElement.scrollWidth};
    const out=[...s.querySelectorAll('.x-sf')].filter(e=>{const r=e.getBoundingClientRect(),a=e.closest('.x-pic').getBoundingClientRect();return r.left<a.left-1||r.right>a.right+1||r.top<a.top-1||r.bottom>a.bottom+1}).length;
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,h:Math.round(s.getBoundingClientRect().height),outSurf:out}});
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
