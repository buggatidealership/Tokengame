// node shoot.js <outdir> : serve ez/ on port 8961 first. Shoots X2+'s Meet the models at 390 (and 1280) with today's founder loops and with
// the anim2 loops routed in place of founder-grok/gpt-anim (take "new": the rocket portrait; take "couch": the couch panel for Grok).
// Videos are paused at the same time t (default 1.6 s) so the boards compare like with like. Also records a 6 s video at 390 of the new take.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const OUT=process.argv[2];fs.mkdirSync(OUT,{recursive:true});const T=+(process.env.T||1.6);
const MAP={now:{},new:{grok:'founder-grok-anim2',gpt:'founder-gpt-anim2'},couch:{grok:'founder-grok-couch-anim2',gpt:'founder-gpt-anim2'}};
async function page(b,W,take,rec){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:3,...(rec?{recordVideo:{dir:OUT+'/rec',size:{width:W,height:W<600?844:900}}}:{})});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.route(/founder-(grok|gpt)-anim\.(mp4|webm|jpg)/,async r=>{const m=r.request().url().match(/founder-(grok|gpt)-anim\.(mp4|webm|jpg)/);const nm=MAP[take][m[1]];
  if(!nm)return r.continue();await r.fulfill({path:path.join(__dirname,nm+'.'+m[2]),headers:{'content-type':{mp4:'video/mp4',webm:'video/webm',jpg:'image/jpeg'}[m[2]]}})});
 await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 await p.evaluate(()=>{const st=document.createElement('style');st.textContent='header.top,body>[class^="x2p-cw"]{visibility:hidden!important}';document.head.append(st);document.querySelector('section.c8').scrollIntoView()});
 await p.evaluate(()=>Promise.all([...document.querySelectorAll('section.c8 video')].map(v=>new Promise(r=>{v.preload='auto';if(v.readyState>=3)return r();v.load();v.addEventListener('canplaythrough',r,{once:true});setTimeout(r,15000)}))));
 return {ctx,p,er}}
(async()=>{const b=await chromium.launch();
 for(const W of [390,1280])for(const take of ['now','new','couch']){const {ctx,p,er}=await page(b,W,take);
  await p.evaluate(t=>Promise.all([...document.querySelectorAll('section.c8 video')].map(v=>{v.pause();v.currentTime=t;return new Promise(r=>{v.addEventListener('seeked',r,{once:true});setTimeout(r,3000)})})),T);
  await p.waitForTimeout(500);const r=await p.evaluate(()=>{const b=document.querySelector('section.c8').getBoundingClientRect();return {y:b.top+scrollY,h:b.height}});
  await p.screenshot({path:`${OUT}/ch-${W}-${take}.png`,clip:{x:0,y:r.y,width:W,height:Math.min(r.h,4000)},fullPage:true});
  const ones=await p.$$('section.c8 .c8-one');for(const i of [0,1,2,3]){if(ones[i])await ones[i].screenshot({path:`${OUT}/one-${W}-${take}-${i}.png`})}
  const info=await p.evaluate(()=>[...document.querySelectorAll('section.c8 video')].map(v=>v.currentSrc.split('/').pop()+' '+v.videoWidth+' '+Math.round(v.getBoundingClientRect().width)));
  console.log(W,take,info.join(' | '),'sw',await p.evaluate(()=>document.documentElement.scrollWidth),er.join('|')||'ok');await ctx.close()}
 const {ctx,p}=await page(b,390,'new',true);await p.evaluate(()=>document.querySelectorAll('section.c8 video').forEach(v=>{v.currentTime=0;v.play()}));await p.waitForTimeout(6500);
 const vp=await p.video().path();await ctx.close();fs.renameSync(vp,OUT+'/rec-390-new.webm');
 await b.close()})();
