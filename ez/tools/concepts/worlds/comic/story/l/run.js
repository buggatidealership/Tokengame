// node run.js <out dir> <takes e.g. now,i4,l1,l2,l3> [widths 390,320,1280] [windows close,week,season]
// Lays take <t>.css/<t>.js (helper i's _si.* plus this folder's _sl.*) over the built X3+ (port 8912) on #/leaderboard and
// shoots the top of the tab: the cover and the first two scoreboard tickets. Every window of a take is shot.
// RM=1 for reduced motion. Prints the checks: page width, anything poking out, clipped text, page errors.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,320,1280').split(',').map(Number),WINS=(process.argv[5]||'close,week,season').split(',');
const D=__dirname+'/',I=D+'../i/',rd=f=>fs.readFileSync(f,'utf8'),ex=fs.existsSync;
async function open(b,W,t,opt={}){const p=await b.newPage({viewport:{width:W,height:opt.h||(W<600?844:1000)},deviceScaleFactor:opt.dpr||2,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('console:'+m.text().slice(0,140))});
  await p.goto('http://localhost:8912/v47-live-x3plus.html#/leaderboard',{waitUntil:'load',timeout:120000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  if(t!=='now'){await p.addStyleTag({content:rd(I+'_si.css')});await p.addScriptTag({content:rd(I+'_si.js')});
    const dir=t.startsWith('i')?I:D;if(!t.startsWith('i')){await p.addStyleTag({content:rd(D+'_sl.css')});await p.addScriptTag({content:rd(D+'_sl.js')})}
    if(ex(dir+t+'.css'))await p.addStyleTag({content:rd(dir+t+'.css')});await p.addScriptTag({content:rd(dir+t+'.js')});
    try{await p.waitForFunction(t=>document.documentElement.classList.contains('si-ready-'+t),t,{timeout:10000})}catch(e){console.log('NOT READY',t,er.join('|'))}}
  return {p,er}}
module.exports={open};
if(require.main===module)(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch({args:['--disable-dev-shm-usage']});
 for(const W of WS)for(const t of TS){const {p,er}=await open(b,W,t);
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=450){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1500);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.setProperty('display','none','important')})});
  await p.addStyleTag({content:'body > .x2p-cw{display:none!important}'});
  for(const v of (t==='now'||t==='i4'?['']:WINS)){
   if(v)await p.evaluate(v=>window.__slShow(v,false),v);await p.waitForTimeout(+(process.env.WAIT||1200));
   const bb=await p.evaluate(()=>{const lb=document.getElementById('wc-lb'),cv=lb.querySelector('.wc-tab-cv'),tk=[...lb.querySelectorAll('.wc-sb-r')].sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top);
     const a=cv.getBoundingClientRect(),z=(tk[1]||tk[0]||cv).getBoundingClientRect();return {y:a.top+scrollY,h:z.bottom-a.top}});
   await p.screenshot({path:`${OUT}/lb-${W}-${t}${v?'-'+v:''}.png`,clip:{x:0,y:Math.max(0,bb.y-14),width:W,height:Math.min(bb.h+30,9000)},fullPage:true});
   const chk=await p.evaluate(()=>{const iw=innerWidth,q=[...document.querySelectorAll('#wc-lb [class*="sl"],#wc-lb [class*="sl"] *')];return {sw:document.documentElement.scrollWidth,iw,
    ov:q.filter(e=>{const r=e.getBoundingClientRect();return r.width&&getComputedStyle(e).visibility!=='hidden'&&(r.right>iw+.5||r.left<-.5)&&!e.closest('svg')}).map(e=>String(e.className.baseVal||e.className).slice(0,40)).slice(0,6),
    clip:q.filter(e=>!e.closest('svg')&&e.children.length===0&&e.scrollWidth>e.clientWidth+1&&!/IMG|I$/i.test(e.tagName)).map(e=>String(e.className.baseVal||e.className||e.tagName).slice(0,40)).slice(0,6)}});
   console.log(W,t,v||'-',JSON.stringify(chk),er.join('|')||'ok')}
  await p.close()}
 await b.close()})();
