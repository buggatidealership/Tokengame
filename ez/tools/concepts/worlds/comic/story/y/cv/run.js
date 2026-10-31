// node run.js <out dir> <takes now,c1,..> [widths 390,1280] [full 0|1]: the X3+ cover (first screen) with a cover-mix take laid over it. Port 8927.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),FULL=+(process.argv[5]||0);
if(OUT)fs.mkdirSync(OUT,{recursive:true});const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
async function open(b,W,t,o={}){const H=o.h||(W<600?844:1000);const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:o.dpr||2,reducedMotion:o.rm?'reduce':'no-preference'});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto('http://localhost:8927/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.waitForTimeout(600);
  if(t!=='now'){await p.addStyleTag({content:rd('_cv.css')});await p.addStyleTag({content:rd(t+'.css')});await p.addScriptTag({content:rd('_cv.js')});await p.addScriptTag({content:rd(t+'.js')});
    await p.waitForFunction(t=>document.documentElement.classList.contains(t+'-ready'),t,{timeout:30000})}
  await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(o.wait||2200);return {p,er}}
module.exports={open};
if(require.main===module)(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const R=[];
 for(const W of WS)for(const t of TS){const {p,er}=await open(b,W,t);
  await p.screenshot({path:`${OUT}/${t}-${W}.png`});
  const m=await p.evaluate(()=>{const cv=document.querySelector('#wc-book .wc-cover'),r=cv.getBoundingClientRect(),q=s=>{const n=cv.querySelector(s);if(!n)return null;const b=n.getBoundingClientRect();return {top:Math.round(b.top+scrollY),bot:Math.round(b.bottom+scrollY)}};
    return {sw:document.documentElement.scrollWidth,cvTop:Math.round(r.top+scrollY),cvH:Math.round(r.height),h1:q('.wc-h1'),film:q('.wc-film-slot'),loop:q('[data-cvloop]')||q('.sh-grid')}});
  if(FULL){const hh=m.cvTop+m.cvH+20;await p.setViewportSize({width:W,height:Math.min(hh,4000)});await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/${t}-${W}-full.png`});}
  R.push({t,W,...m,err:er.slice()});console.log(JSON.stringify(R[R.length-1]));await p.close()}
 fs.writeFileSync(OUT+'/checks-'+TS.join('_')+'-'+WS.join('_')+'.json',JSON.stringify(R,null,1));await b.close()})();
