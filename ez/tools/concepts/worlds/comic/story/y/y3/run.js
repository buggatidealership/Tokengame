// node run.js <out dir> <takes now,y3> <modes card,s390,s1280>: Meet the models on the built X3+ with the y3 door take. Port 8923.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,y3').split(','),MS=(process.argv[4]||'card,s390,s1280').split(',');fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
const MODE={card:{W:390,H:844,dpr:3},s390:{W:390,H:844,dpr:2},s320:{W:320,H:700,dpr:2},s1280:{W:1280,H:1000,dpr:2}};
(async()=>{const b=await chromium.launch();const R=[];
 for(const md of MS)for(const t of TS){if(md==='card'&&t==='now')continue;const M=MODE[md];
  const p=await b.newPage({viewport:{width:M.W,height:M.H},deviceScaleFactor:M.dpr});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto('http://localhost:8923/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  if(t!=='now'){await p.addStyleTag({content:rd('y3.css')});await p.addScriptTag({content:rd('y3.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('y3-ready'),null,{timeout:20000})}
  await p.evaluate(()=>document.fonts.ready);
  const sel='.wc-chars';const sh=await p.evaluate(s=>document.querySelector(s).offsetHeight,sel);
  for(let y=0;y<sh;y+=200){await p.evaluate(([s,y])=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20+y)},[sel,y]);await p.waitForTimeout(300)}
  await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},sel);await p.waitForTimeout(2600);
  // freeze motion for a deterministic shot
  await p.addStyleTag({content:'.y3-walk{animation:none!important;transform:translateX(-110%)!important}'});
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const s2=md==='card'?'.y3-d':sel;
  const bb=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}},s2);
  const pad=md==='card'?4:12;
  await p.screenshot({path:`${OUT}/${md}-${t}.png`,clip:{x:Math.max(0,bb.x-pad),y:bb.y-pad,width:Math.min(M.W-Math.max(0,bb.x-pad),bb.width+2*pad),height:Math.min(bb.height+2*pad,6000)},fullPage:true});
  const m=t==='now'?{}:await p.evaluate(()=>window.Y3check?Y3check():{});
  const sw=await p.evaluate(()=>document.documentElement.scrollWidth);
  R.push({md,t,sw,h:Math.round(bb.height),err:er,...m});console.log(JSON.stringify(R[R.length-1]));await p.close()}
 fs.writeFileSync(OUT+'/checks.json',JSON.stringify(R,null,1));await b.close()})();
