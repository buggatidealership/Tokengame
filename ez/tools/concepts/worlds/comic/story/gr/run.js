// node run.js <out dir> <takes now,g1,g2,g3> [widths 390,1280]: Meet the models on the built X3+ with a green room take. Port 8917.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,g1,g2,g3').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const R=[];
 for(const W of WS)for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto('http://localhost:8917/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  if(t!=='now'){await p.addStyleTag({content:rd('_gr.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_gr.js')});await p.addScriptTag({content:rd(t+'.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('gr-ready'),null,{timeout:20000})}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
  const sel='.wc-chars';await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},sel);
  // walk the section so every door opens / every loop starts
  const sh=await p.evaluate(s=>document.querySelector(s).offsetHeight,sel);for(let y=0;y<sh;y+=250){await p.evaluate(([s,y])=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20+y)},[sel,y]);await p.waitForTimeout(450)}
  await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},sel);await p.waitForTimeout(2200);
  // posters for every video so the shot is deterministic: pause on the first frame
  await p.evaluate(()=>document.querySelectorAll('.wc-chars video').forEach(v=>{try{v.pause();v.currentTime=0}catch(e){}}));await p.waitForTimeout(500);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const bb=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}},sel);
  await p.screenshot({path:`${OUT}/${W}-${t}.png`,clip:{x:Math.max(0,bb.x-12),y:bb.y-8,width:Math.min(W-Math.max(0,bb.x-12),bb.width+24),height:Math.min(bb.height+20,6000)},fullPage:true});
  const m=t==='now'?{}:await p.evaluate(()=>window.GRcheck?GRcheck():{});
  const sw=await p.evaluate(()=>document.documentElement.scrollWidth);
  R.push({W,t,sw,h:Math.round(bb.height),err:er,...m});console.log(JSON.stringify(R[R.length-1]));await p.close()}
 fs.writeFileSync(OUT+'/checks.json',JSON.stringify(R,null,1));await b.close()})();
