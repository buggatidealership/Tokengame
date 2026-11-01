// node run.js <out> <ids> [widths 390,1280] : serve ez/ on port 8953 first. Each id = now | <W><C><O><state>, e.g. bc1off, bc1on, bg1on, ac1on, bc2on.
// W = word set (a: #1, b: BOARD), C = ink (c cream, g green, o gold), O = order (1 ledger then board, 2 board then ledger), state = off|on. Shoots the top (header to the end of the film) as top-<W>-<id>.png,
// the four frames' strip as fr-<W>-<id>.png and the film head as fh-<W>-<id>.png; prints sideways scroll, errors, clipped words, data.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const id of IDS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8953/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  if(id!=='now'){await p.addStyleTag({content:rd('_t4.css')});await p.evaluate(([w,c,o])=>{window.__T4W=w;window.__T4C={c:'cream',g:'green',o:'gold'}[c];window.__T4O=+o;window.__T4auto=false},[id[0],id[1],id[2]]);await p.addScriptTag({content:rd('_t4.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('t4-ready'));await p.evaluate(s=>__t4.all(s),id.slice(3));}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>window.__t4&&__t4.place());
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed')x.style.visibility='hidden'});const st=document.createElement('style');st.textContent='body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug){visibility:hidden!important}';document.head.append(st)});
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForFunction(()=>[...document.querySelectorAll('.t4 img')].every(i=>i.complete));
  await p.evaluate(()=>{const v=document.querySelector('.t4-v');if(v)v.load()});await p.waitForTimeout(900);await p.evaluate(()=>window.__t4&&__t4.place());await p.waitForTimeout(200);
  const bot=await p.evaluate(()=>{const s=document.querySelector('.t4')||document.querySelector('section.x2o-bet');return Math.ceil(s.getBoundingClientRect().bottom+scrollY)+24});
  await p.screenshot({path:`${OUT}/top-${W}-${id}.png`,clip:{x:0,y:0,width:W,height:bot},fullPage:true});
  if(id!=='now'){const e2=await p.evaluate(()=>{const r=document.querySelector('.t4-b2').getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});await p.screenshot({path:`${OUT}/fr-${W}-${id}.png`,clip:{x:0,y:e2.y,width:W,height:e2.h},fullPage:true});const h=await p.$('.t4-b3');const bb=await h.boundingBox();
   await p.screenshot({path:`${OUT}/fh-${W}-${id}.png`,clip:{x:0,y:bb.y+await p.evaluate(()=>scrollY),width:W,height:Math.min(bb.height,W<600?120:150)},fullPage:true}).catch(()=>{})}
  const vd=await p.evaluate(()=>{const v=document.querySelector('.t4-veil');return v?[getComputedStyle(v).opacity,v.style.cssText.slice(0,80),v.closest('.t4-fr').className]:null});console.log('veil',JSON.stringify(vd));const m=await p.evaluate(()=>{const s=document.querySelector('.t4');if(!s)return {sw:document.documentElement.scrollWidth};
    const vw=innerWidth,clip=[];
    s.querySelectorAll('.t4-hw,.t4-ln,.t4-cap').forEach(e=>{const r=e.getBoundingClientRect();if(r.left<-.5||r.right>vw+.5)clip.push(e.textContent.slice(0,20)+':'+Math.round(r.left)+'/'+Math.round(r.right));if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow==='hidden')clip.push('ovf:'+e.textContent.slice(0,24))});
    const out=[...s.querySelectorAll('.t4-sf')].filter(e=>{const r=e.getBoundingClientRect(),a=e.closest('.t4-pic').getBoundingClientRect();return r.left<a.left-1||r.right>a.right+1||r.top<a.top-1||r.bottom>a.bottom+1}).map(e=>e.className);
    return {sw:document.documentElement.scrollWidth,vw,h:Math.round(s.getBoundingClientRect().height),outSurf:out,clip,sz:{h1a:getComputedStyle(s.querySelector('.t4-hw0')).fontSize,h1b:getComputedStyle(s.querySelector('.t4-hw1')).fontSize,h2:getComputedStyle(s.querySelector('.t4-b2 .t4-h2')).fontSize,sw:s.dataset.swpx,ln:getComputedStyle(s.querySelector('.t4-ln')).fontSize,swr:[...s.querySelectorAll('.t4-sw')].map(t=>Math.round(t.getBoundingClientRect().height)),ov:getComputedStyle(s).getPropertyValue('--t4ov')},film:Math.round(s.querySelector('.t4-b3').getBoundingClientRect().top+scrollY),data:window.__t4&&__t4.data}});
  console.log(W,id,'errors:',er.length,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
function scrollYfix(x){return x}
