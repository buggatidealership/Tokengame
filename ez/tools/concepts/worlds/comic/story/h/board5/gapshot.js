// node gapshot.js <out> <take> <gaps now,1,2,3> [widths]: the top from "How a round works" through the film into Meet the models, per gap treatment.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TK=process.argv[3]||'c',GS=(process.argv[4]||'now,1,2,3').split(','),WS=(process.argv[5]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const g of GS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  await p.addStyleTag({content:rd('_b5.css')});await p.evaluate(t=>window.__B5=t,TK);await p.addScriptTag({content:rd('_b5.js')});await p.waitForFunction(()=>window.__b5||window.__b5Err);
  if(g!=='now'){await p.evaluate(x=>window.__B5G=x,g);await p.addStyleTag({content:rd('_gap.css')});await p.addScriptTag({content:rd('_gap.js')});await p.waitForFunction(()=>window.__b5g||window.__b5gErr)}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForTimeout(1200);await p.evaluate(()=>window.__t5.place());await p.waitForTimeout(600);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed')x.style.visibility='hidden'})});
  const r=await p.evaluate(()=>{const a=document.querySelector('.t4-b2').getBoundingClientRect(),c=document.querySelector('section.ch').getBoundingClientRect();return {y:a.top+scrollY-30,h:c.top-a.top+330,sw:document.documentElement.scrollWidth}});
  await p.screenshot({path:`${OUT}/gap-${W}-${g}.png`,clip:{x:0,y:r.y,width:W,height:r.h},fullPage:true});console.log(W,g,r.sw,er);await ctx.close()}
 await b.close()})();
