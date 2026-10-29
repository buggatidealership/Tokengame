// node run.js <out dir> <takes e.g. now,t1,t2,t3> [widths e.g. 390,1440]: the built X3+ with mk.js + base.css + <take>.css,
// shot per section: tomorrow at the close, every round so far, meet the models, smart or lucky
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,t1,t2,t3').split(','),WS=(process.argv[4]||'390,1440').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const SECS=[['tn','.wc-cliff'],['bi','.wc-season'],['ch','.wc-chars'],['cn','.wc-splash']];
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){
  const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  if(t!=='now'){await p.addStyleTag({content:fs.readFileSync(__dirname+'/base.css','utf8')+fs.readFileSync(__dirname+'/'+t+'.css','utf8')});
   await p.evaluate(s=>{window.__take=s},t);await p.addScriptTag({content:fs.readFileSync(__dirname+'/mk.js','utf8')})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1200);
  for(const [k,s] of SECS){const e=await p.$(s);if(!e)continue;await e.scrollIntoViewIfNeeded();await p.waitForTimeout(500);
   await p.evaluate(()=>{document.querySelector('header.top')&&(document.querySelector('header.top').style.visibility='hidden');document.querySelectorAll('.x2p-crawl,[class*=crawl]').forEach(x=>x.style.visibility='hidden')});
   if(W>=1000){await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},s);await p.waitForTimeout(500);
     const bb=await e.boundingBox();await p.screenshot({path:`${OUT}/${W}-${k}-${t}.png`,clip:{x:Math.max(0,bb.x-12),y:Math.max(0,bb.y-8),width:Math.min(W,bb.width+24),height:Math.min(bb.height+16,(W<600?844:900)-Math.max(0,bb.y-8))}})}
   else{const bb=await e.evaluate(n=>{const r=n.getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}});await p.screenshot({path:`${OUT}/${W}-${k}-${t}.png`,clip:{x:Math.max(0,bb.x-12),y:bb.y-8,width:Math.min(W,bb.width+24),height:Math.min(bb.height+16,6000)},fullPage:true})}}
  const sw=await p.evaluate(()=>document.documentElement.scrollWidth);console.log(W,t,'scrollWidth',sw,er.join('|')||'ok');await p.close()}
 await b.close()})();
