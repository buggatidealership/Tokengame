// node run.js <out dir> <takes now,u1,u2,u3> [widths 390,1280] [dpr 2]: the Upcoming tab (#/upcoming) of the built X3+ with a pop take laid over it. Port 8926.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2);
if(OUT)fs.mkdirSync(OUT,{recursive:true});const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
async function open(b,W,t,o={}){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:o.dpr||DPR,reducedMotion:o.rm?'reduce':'no-preference'});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto('http://localhost:8926/v47-live-x3plus.html#/upcoming',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#wc-up'),null,{timeout:120000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=700){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);
  if(t!=='now'){if(!o.live)await p.evaluate(()=>window.__ppShot=1);
    for(const f of ['../p/_pop.css','_u.css',t+'.css'])if(fs.existsSync(__dirname+'/'+f))await p.addStyleTag({content:rd(f)});
    for(const f of ['../p/_pop.js','_u.js',t+'.js'])if(fs.existsSync(__dirname+'/'+f))await p.addScriptTag({content:rd(f)});
    await p.waitForFunction(t=>document.documentElement.classList.contains(t+'-ready'),t,{timeout:40000})}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);return {p,er}}
module.exports={open};
if(require.main===module)(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const R=[];
 for(const W of WS)for(const t of TS){const {p,er}=await open(b,W,t);const sel='#wc-up';
   const sh=await p.evaluate(sel=>document.querySelector(sel).offsetHeight,sel);
   for(let y=0;y<sh;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(200)}
   await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(2000);
   await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0)x.style.visibility='hidden'})});
   const VH=W<600?844:1000;
   const bb=await p.evaluate(s=>{const n=document.querySelector(s),h=document.querySelector('header.top');const r=n.getBoundingClientRect();return {y:(h?h.getBoundingClientRect().top:r.top)+scrollY,b:r.bottom+scrollY}},sel);
   const full=Math.ceil(bb.b-bb.y);await p.setViewportSize({width:W,height:Math.min(full,16000)});await p.evaluate(y=>scrollTo(0,y),bb.y);await p.waitForTimeout(1200);
   await p.screenshot({path:`${OUT}/up-${W}-${t}.png`,clip:{x:0,y:0,width:W,height:Math.min(full,16000)}});
   await p.setViewportSize({width:W,height:VH});
   const m=t==='now'?{}:await p.evaluate(()=>window.Ucheck?Ucheck():{});
   const sw=await p.evaluate(()=>document.documentElement.scrollWidth);
   R.push({W,t,sw,h:full,err:er.slice(),...m});console.log(JSON.stringify(R[R.length-1]));await p.close()}
 fs.writeFileSync(OUT+'/checks-'+TS.join('_')+'-'+WS.join('_')+'.json',JSON.stringify(R,null,1));await b.close()})();
