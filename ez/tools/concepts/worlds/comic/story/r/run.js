// node run.js <out dir> <takes now,r1,r2,r3> [widths 390,320,1280]
// Helper r: "Smarter or just lucky?" (all four tabs) and "The race so far" on the Leaderboard tab of the built X3+ (port 8933).
// A take = _sr.css + _sr.js (shared data, from the page's own ROUNDS / __x2pPnl / MODELS) + rN.css + rN.js.
// Shoots each tab of the proof and the race, and prints the checks: page width, sideways scroll inside the sections,
// text that pokes out of its box, text boxes that overlap, page errors, and (RM=1) anything still animating.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,320,1280').split(',').map(Number);
const D=__dirname+'/',rd=f=>fs.readFileSync(f,'utf8'),ex=fs.existsSync,PORT=process.env.PORT||8933;
async function open(b,W,t){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('console:'+m.text().slice(0,140))});
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html#/leaderboard`,{waitUntil:'load',timeout:120000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#wc-lb .wc-pf'),null,{timeout:90000});
  if(t!=='now'){await p.addStyleTag({content:rd(D+'_sr.css')});if(ex(D+t+'.css'))await p.addStyleTag({content:rd(D+t+'.css')});
    await p.addScriptTag({content:rd(D+'_sr.js')});await p.addScriptTag({content:rd(D+t+'.js')});
    try{await p.waitForFunction(t=>document.documentElement.classList.contains('sr-ready-'+t),t,{timeout:10000})}catch(e){console.log('NOT READY',t,er.join('|'))}}
  return {p,er}}
module.exports={open};
const CHK=()=>{const iw=innerWidth,secs=[...document.querySelectorAll('#wc-lb .wc-pfs,#wc-lb .wc-race')],out={sw:document.documentElement.scrollWidth,iw,scroll:[],poke:[],clip:[],hit:[],anim:0};
  const vis=e=>{const c=getComputedStyle(e);if(c.visibility==='hidden'||c.display==='none'||+c.opacity===0)return false;const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&!e.closest('[hidden],.wc-sr,.sr-sr')};
  const nm=e=>String(e.className&&e.className.baseVal!=null?e.className.baseVal:e.className||e.tagName).slice(0,34);
  secs.forEach(s=>{const sr=s.getBoundingClientRect();
    s.querySelectorAll('*').forEach(e=>{if(!vis(e))return;const c=getComputedStyle(e),r=e.getBoundingClientRect();
      if(/auto|scroll/.test(c.overflowX)&&e.scrollWidth>e.clientWidth+1)out.scroll.push(nm(e));
      if(!e.closest('svg')&&(r.right>iw+.5||r.left<-.5))out.poke.push(nm(e));
      if(!e.closest('svg')&&e.children.length===0&&e.textContent.trim()&&e.scrollWidth>e.clientWidth+1&&!/^(IMG|I|svg)$/i.test(e.tagName)&&c.overflow!=='visible')out.clip.push(nm(e)+':'+e.textContent.trim().slice(0,12))});
    /* overlapping text: every visible text leaf (svg text too), pairwise, ignoring one inside another */
    const L=[...s.querySelectorAll('*')].filter(e=>vis(e)&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())).map(e=>{const rg=document.createRange();rg.selectNodeContents(e);const r=rg.getBoundingClientRect();return {e,r}}).filter(x=>x.r.width>1&&x.r.height>1);
    for(let i=0;i<L.length;i++)for(let j=i+1;j<L.length;j++){const a=L[i],b=L[j];if(a.e.contains(b.e)||b.e.contains(a.e))continue;
      const ox=Math.min(a.r.right,b.r.right)-Math.max(a.r.left,b.r.left),oy=Math.min(a.r.bottom,b.r.bottom)-Math.max(a.r.top,b.r.top);
      if(ox>1.5&&oy>2)out.hit.push(a.e.textContent.trim().slice(0,10)+'×'+b.e.textContent.trim().slice(0,10))}});
  out.anim=document.getAnimations().filter(a=>a.playState==='running'&&a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#wc-lb .wc-pfs,#wc-lb .wc-race')).length;
  ['scroll','poke','clip','hit'].forEach(k=>out[k]=[...new Set(out[k])].slice(0,8));return out};
if(require.main===module)(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch({args:['--disable-dev-shm-usage']});
 for(const W of WS)for(const t of TS){const {p,er}=await open(b,W,t);
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=450){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30)}
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.setProperty('display','none','important')})});
  await p.addStyleTag({content:'body > .x2p-cw{display:none!important}'});
  const tabs=await p.$$eval('#wc-lb .wc-pfs [role=tab]',x=>x.length);
  for(let i=0;i<tabs;i++){
   await p.evaluate(i=>{const s=document.querySelector('#wc-lb .wc-pfs');s.scrollIntoView({block:'start'});},i);await p.waitForTimeout(300);
   await p.evaluate(i=>document.querySelectorAll('#wc-lb .wc-pfs [role=tab]')[i].click(),i);await p.waitForTimeout(+(process.env.WAIT||2600));
   const bb=await p.evaluate(()=>{const r=document.querySelector('#wc-lb .wc-pfs').getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
   const k=['pnl','acc','tgt','sec'][i];
   await p.screenshot({path:`${OUT}/pf-${W}-${t}-${k}.png`,clip:{x:0,y:Math.max(0,bb.y-10),width:W,height:Math.min(bb.h+24,9000)},fullPage:true});
   console.log(W,t,k,JSON.stringify(await p.evaluate(CHK)),er.join('|')||'ok')}
  await p.evaluate(()=>document.querySelector('#wc-lb .wc-race').scrollIntoView({block:'start'}));await p.waitForTimeout(+(process.env.WAIT||2600));
  const rb=await p.evaluate(()=>{const r=document.querySelector('#wc-lb .wc-race').getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
  await p.screenshot({path:`${OUT}/pf-${W}-${t}-race.png`,clip:{x:0,y:Math.max(0,rb.y-10),width:W,height:Math.min(rb.h+24,9000)},fullPage:true});
  console.log(W,t,'race',JSON.stringify(await p.evaluate(CHK)),er.join('|')||'ok');
  await p.close()}
 await b.close()})();
