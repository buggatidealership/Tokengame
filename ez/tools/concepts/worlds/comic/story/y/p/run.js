// node run.js <out dir> <takes now,p1,p2> [widths 390,1280] [dpr 2] [sections chars,season]: Meet the models / Every round so far on the built X3+ with a pop take. Port 8925.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,p1,p2').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2),SECS=(process.argv[6]||'chars,season').split(',');
if(OUT)fs.mkdirSync(OUT,{recursive:true});const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
const SEL={chars:'.wc-chars',season:'.wc-season'};
async function open(b,W,t,o={}){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:o.dpr||DPR,reducedMotion:o.rm?'reduce':'no-preference'});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto('http://localhost:8925/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  // let the page's late patches (M3 stamps, R11 stamps) land first
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=700){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
  await p.waitForTimeout(800);
  if(t!=='now'){if(!o.live)await p.evaluate(()=>window.__ppShot=1);await p.addStyleTag({content:rd('_pop.css')});await p.addStyleTag({content:rd(t+'.css')});await p.addScriptTag({content:rd('_pop.js')});await p.addScriptTag({content:rd(t+'.js')});
    await p.waitForFunction(t=>document.documentElement.classList.contains(t+'-ready'),t,{timeout:30000})}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);return {p,er}}
module.exports={open,SEL};
if(require.main===module)(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const R=[];
 for(const W of WS)for(const t of TS){const {p,er}=await open(b,W,t);
  for(const s of SECS){const sel=SEL[s];
   await p.evaluate(sel=>{const n=document.querySelector(sel);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},sel);
   const sh=await p.evaluate(sel=>document.querySelector(sel).offsetHeight,sel);
   for(let y=0;y<sh;y+=300){await p.evaluate(([sel,y])=>{const n=document.querySelector(sel);scrollTo(0,n.getBoundingClientRect().top+scrollY-20+y)},[sel,y]);await p.waitForTimeout(250)}
   await p.evaluate(sel=>{const n=document.querySelector(sel);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},sel);await p.waitForTimeout(2600);
   await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0)x.style.visibility='hidden'})});
   const bb=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}},sel);
   const pad=12;
   await p.screenshot({path:`${OUT}/${s}-${W}-${t}.png`,clip:{x:Math.max(0,bb.x-pad),y:bb.y-pad,width:Math.min(W-Math.max(0,bb.x-pad),bb.width+2*pad),height:Math.min(bb.height+2*pad,7000)},fullPage:true});
   const m=t==='now'?{}:await p.evaluate(s=>window.Pcheck?Pcheck(s):{},s);
   const sw=await p.evaluate(()=>document.documentElement.scrollWidth);
   R.push({s,W,t,sw,h:Math.round(bb.height),err:er.slice(),...m});console.log(JSON.stringify(R[R.length-1]))}
  await p.close()}
 fs.writeFileSync(OUT+'/checks-'+TS.join('_')+'-'+WS.join('_')+'.json',JSON.stringify(R,null,1));await b.close()})();
