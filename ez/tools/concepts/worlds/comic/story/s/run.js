// node run.js <out dir> <takes e.g. now,s1,s2,s3> [widths 390,320,1280] [windows season,d1]
// Helper s: the Leaderboard's scoreboard (#wc-lb .wc-sbd) on the built X3+ (port 8911), with a take laid over it.
// Shoots the scoreboard section in each window (the page's own __wc11Show switches the fight bill and, through it, the take).
// Prints checks: page width, anything poking out, clipped text, page errors.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,320,1280').split(',').map(Number),WINS=(process.argv[5]||'season,d1').split(',');
const D=__dirname+'/',rd=f=>fs.readFileSync(D+f,'utf8'),ex=f=>fs.existsSync(D+f);
async function open(b,W,t,opt={}){const p=await b.newPage({viewport:{width:W,height:opt.h||(W<600?844:1000)},deviceScaleFactor:opt.dpr||2,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('console:'+m.text().slice(0,160))});
  await p.goto('http://localhost:8911/v47-live-x3plus.html#/leaderboard',{waitUntil:'load',timeout:120000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.waitForFunction(()=>!!window.__wc11Show,null,{timeout:20000});
  if(t!=='now'){await p.addStyleTag({content:rd('_ss.css')});if(ex(t+'.css'))await p.addStyleTag({content:rd(t+'.css')});
    await p.addScriptTag({content:rd('_ss.js')});await p.addScriptTag({content:rd(t+'.js')});
    try{await p.waitForFunction(t=>document.documentElement.classList.contains('ss-ready-'+t),t,{timeout:10000})}catch(e){console.log('NOT READY',t,er.join('|'))}}
  return {p,er}}
module.exports={open};
if(require.main===module)(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch({args:['--disable-dev-shm-usage']});
 for(const W of WS)for(const t of TS){const {p,er}=await open(b,W,t);
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=450){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30)}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1200);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.setProperty('display','none','important')})});
  await p.addStyleTag({content:'body > .x2p-cw{display:none!important}'});
  for(const v of WINS){
   await p.evaluate(v=>window.__wc11Show(v,false),v);
   await p.waitForTimeout(+(process.env.WAIT||1400));
   const bb=await p.evaluate(()=>{const s=document.querySelector('#wc-lb .wc-sbd');const r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
   await p.screenshot({path:`${OUT}/sb-${W}-${t}-${v}.png`,clip:{x:0,y:Math.max(0,bb.y-14),width:W,height:Math.min(bb.h+28,9000)},fullPage:true});
   const chk=await p.evaluate(()=>{const iw=innerWidth,q=[...document.querySelectorAll('#wc-lb .wc-sbd *')].filter(e=>e.offsetParent!==null||e.closest('svg'));return {sw:document.documentElement.scrollWidth,iw,
    ov:q.filter(e=>{const r=e.getBoundingClientRect();return r.width&&getComputedStyle(e).visibility!=='hidden'&&(r.right>iw+.5||r.left<-.5)&&!e.closest('svg')}).map(e=>String(e.className.baseVal||e.className).slice(0,40)).slice(0,6),
    clip:q.filter(e=>!e.closest('svg')&&e.children.length===0&&e.scrollWidth>e.clientWidth+1&&!/IMG|^I$/i.test(e.tagName)&&getComputedStyle(e).overflow!=='visible').map(e=>String(e.className.baseVal||e.className||e.tagName).slice(0,40)+':'+e.textContent.slice(0,20)).slice(0,6)}});
   console.log(W,t,v,JSON.stringify(chk),er.join('|')||'ok')}
  if(process.env.PROBE)console.log(await p.evaluate(()=>({closeAt:typeof closeAt,per:typeof per,nyToday:typeof nyToday,rankPnl:typeof rankPnl,MODELS:Object.keys(MODELS),R:ROUNDS.length})));
  await p.close()}
 await b.close()})();
