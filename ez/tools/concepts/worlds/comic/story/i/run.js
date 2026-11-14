// node run.js <out dir> <sol|lb> <takes e.g. now,i1,i2,i3> [widths 390,320,1280]
// Lays take <t>.css/<t>.js (plus the shared _si.*) over the built X3+ (port 8923) and shoots the Smart or lucky section
// (sol) or the whole Leaderboard tab (lb). WAIT=ms after scrolling to the section. RM=1 for reduced motion.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],SEC=process.argv[3]||'sol',TS=(process.argv[4]||'now').split(','),WS=(process.argv[5]||'390,320,1280').split(',').map(Number);
const D=__dirname+'/',rd=f=>fs.readFileSync(D+f,'utf8'),ex=f=>fs.existsSync(D+f);
async function open(b,W,t,opt={}){const p=await b.newPage({viewport:{width:W,height:opt.h||(W<600?844:1000)},deviceScaleFactor:opt.dpr||2,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('console:'+m.text().slice(0,140))});
  await p.goto('http://localhost:8923/v47-live-x3plus.html'+(SEC==='lb'?'#/leaderboard':''),{waitUntil:'load',timeout:120000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  if(t!=='now'){if(ex('_si.css'))await p.addStyleTag({content:rd('_si.css')});await p.addScriptTag({content:rd('_si.js')});if(ex(t+'.css'))await p.addStyleTag({content:rd(t+'.css')});await p.addScriptTag({content:rd(t+'.js')});
    try{await p.waitForFunction(t=>document.documentElement.classList.contains('si-ready-'+t),t,{timeout:10000})}catch(e){console.log('NOT READY',t,er.join('|'))}}
  return {p,er}}
module.exports={open,SEC};
if(require.main===module)(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch({args:['--disable-dev-shm-usage']});
 for(const W of WS)for(const t of TS){const {p,er}=await open(b,W,t);
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=450){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(50)}
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  const sel=SEC==='lb'?'#wc-lb':(t==='now'?'.wc-splash':'.si-sol');
  await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-30)},sel);
  await p.evaluate(async v=>{if(window.__siShot)await window.__siShot(v)},process.env.V||'');await p.waitForTimeout(+(process.env.WAIT||3500));
  if(SEC==='lb'){await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(400)}
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.setProperty('display','none','important')})});
  await p.addStyleTag({content:'body > .x2p-cw{display:none!important}'});await p.waitForTimeout(200);
  const bb=await p.evaluate(s=>{const n=document.querySelector(s),pre=n.previousElementSibling&&n.previousElementSibling.classList.contains('wc-beat')?n.previousElementSibling:n;const a=pre.getBoundingClientRect(),z=n.getBoundingClientRect();return {y:a.top+scrollY,h:z.bottom-a.top}},sel);
  await p.screenshot({path:`${OUT}/${SEC}-${W}-${t}${process.env.V||''}${process.env.TAG||''}.png`,clip:{x:0,y:Math.max(0,bb.y-10),width:W,height:Math.min(bb.h+20,12000)},fullPage:true});
  const chk=await p.evaluate(()=>{const iw=innerWidth;return {sw:document.documentElement.scrollWidth,iw,
    ov:[...document.querySelectorAll('[class*="si-"]')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&getComputedStyle(e).visibility!=='hidden'&&(r.right>iw+.5||r.left<-.5)&&!e.closest('svg')}).map(e=>String(e.className.baseVal||e.className).slice(0,40)).slice(0,6),
    clip:[...document.querySelectorAll('[class*="si-"]')].filter(e=>e.children.length===0&&e.scrollWidth>e.clientWidth+1&&!/svg|path|i$/i.test(e.tagName)).map(e=>String(e.className.baseVal||e.className).slice(0,40)).slice(0,6)}});
  console.log(SEC,W,t,JSON.stringify(chk),er.join('|')||'ok');await p.close()}
 await b.close()})();
