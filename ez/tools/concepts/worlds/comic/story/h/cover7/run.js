// node run.js <out> <takes s-a,p-a,...> <widths> : shoot the cover with each take laid over the built X3+ page; checks text fit, overflow, errors
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TK=process.argv[3].split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const PORT=process.env.PORT||8973,DIR=__dirname,LINK='https://fonts.googleapis.com/css2?family=Bangers&family=Alfa+Slab+One&family=Kanit:ital,wght@1,900&display=block';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const tk of TK){const [t,o]=tk.split('-');const H=W<600?844:1900;const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||2)});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/favicon|Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html`,{waitUntil:'load',timeout:90000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('.sh-h1 .sh-p'),null,{timeout:60000});
  if(t!=='now'){await p.addStyleTag({url:LINK});await p.addStyleTag({content:fs.readFileSync(DIR+'/c7.css','utf8')});await p.evaluate(c=>window.__c7=c,{t,o});await p.addScriptTag({content:fs.readFileSync(DIR+'/c7.js','utf8')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('c7-ok'),null,{timeout:20000});await p.evaluate(()=>Promise.all([...document.querySelectorAll('.c7-art img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r}))))}
  await p.evaluate(()=>{document.querySelectorAll('.sh-p').forEach(e=>e.style.animation='none')});await p.waitForTimeout(1200);if(t!=='now')await p.evaluate(()=>window.__c7fit());
  const m=await p.evaluate(()=>{const cv=document.querySelector('.wc-cover.sh-h1');const r=cv.getBoundingClientRect();const g=document.querySelector('.sh-grid').getBoundingClientRect();
    const inv=[...document.querySelectorAll('.c7-t,.c7-row')].map(e=>`${e.className.replace('c7-t ','')}: "${e.textContent.trim()}" ${parseFloat(getComputedStyle(e).fontSize).toFixed(1)}px${(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1)?' OVERFLOW':''}`);
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,cvTop:r.top+scrollY,cvH:r.height,gTop:g.top+scrollY,gH:g.height,inv}});
  fs.writeFileSync(`${OUT}/${tk}-${W}-inv.txt`,m.inv.join('\n'));
  await p.evaluate(y=>scrollTo(0,y),m.cvTop-(W<600?110:96));await p.waitForTimeout(300);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.querySelectorAll('body *')].filter(e=>{const c=getComputedStyle(e),r=e.getBoundingClientRect();return /fixed|sticky/.test(c.position)&&r.bottom>=innerHeight-4&&r.height<140&&r.width>innerWidth*.5}).forEach(e=>e.style.visibility='hidden')});
  const bb=async sel=>p.evaluate(sel=>{const r=document.querySelector(sel).getBoundingClientRect();return {x:Math.max(0,r.left),y:r.top+scrollY,width:Math.min(r.width,innerWidth),height:r.height}},sel);
  await p.screenshot({path:`${OUT}/${tk}-${W}.png`,fullPage:true,clip:await bb('.wc-cover.sh-h1')});await p.screenshot({path:`${OUT}/${tk}-${W}-grid.png`,fullPage:true,clip:await bb('.sh-grid')});
  console.log(W,tk,'sideways',m.sw>m.vw,'cover h',Math.round(m.cvH),'grid h',Math.round(m.gH),'small',m.inv.filter(s=>/ ([0-8]\.\d)px/.test(s)).length,'overflow',m.inv.filter(s=>/OVERFLOW/.test(s)).length,er.join('|')||'ok');await ctx.close()}
 await b.close()})();
