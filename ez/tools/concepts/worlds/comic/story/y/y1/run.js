// node run.js <out dir> <takes now,y1> [widths 390,1280] [dpr 2] [card]: Meet the models on the built X3+ with take y1 (the mirror). Port 8921.
// "card" as 5th arg shoots only the first card. Checks: scrollWidth, errors, dead space (Y1check).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,y1').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2),CARD=process.argv[6]==='card';
if(OUT)fs.mkdirSync(OUT,{recursive:true});const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
async function open(b,W,t,o={}){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:o.dpr||DPR,reducedMotion:o.rm?'reduce':'no-preference'});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto('http://localhost:8921/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  if(t!=='now'){await p.addStyleTag({content:rd(t+'.css')});await p.addScriptTag({content:rd(t+'.js')});
    await p.waitForFunction(()=>document.documentElement.classList.contains('y1-ready'),null,{timeout:30000})}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);return {p,er}}
module.exports={open};
if(require.main===module)(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const R=[];
 for(const W of WS)for(const t of TS){const {p,er}=await open(b,W,t);
  const sel=CARD?'.wc-chars article.wc-ch':'.wc-chars';
  await p.evaluate(()=>{const n=document.querySelector('.wc-chars');scrollTo(0,n.getBoundingClientRect().top+scrollY-20)});
  const sh=await p.evaluate(()=>document.querySelector('.wc-chars').offsetHeight);
  for(let y=0;y<sh;y+=300){await p.evaluate(y=>{const n=document.querySelector('.wc-chars');scrollTo(0,n.getBoundingClientRect().top+scrollY-20+y)},y);await p.waitForTimeout(350)}
  await p.evaluate(()=>{const n=document.querySelector('.wc-chars');scrollTo(0,n.getBoundingClientRect().top+scrollY-20)});await p.waitForTimeout(2600);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const bb=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}},sel);
  const pad=CARD?16:12;
  await p.screenshot({path:`${OUT}/${W}-${t}${CARD?'-card':''}.png`,clip:{x:Math.max(0,bb.x-pad),y:bb.y-pad,width:Math.min(W-Math.max(0,bb.x-pad),bb.width+2*pad),height:Math.min(bb.height+2*pad,7000)},fullPage:true});
  const m=t==='now'?{}:await p.evaluate(()=>window.Y1check?Y1check():{});
  const sw=await p.evaluate(()=>document.documentElement.scrollWidth);
  R.push({W,t,sw,h:Math.round(bb.height),err:er,...m});console.log(JSON.stringify(R[R.length-1]));await p.close()}
 fs.writeFileSync(OUT+'/checks-'+WS.join('_')+'.json',JSON.stringify(R,null,1));await b.close()})();
