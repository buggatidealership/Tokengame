// node run.js <out dir> <takes e.g. now,l1,n1,n2> [widths 390,320,1280] [windows season,d1,d7]
// Lays a take over the built X3+ (port 8914) on #/leaderboard and shoots the top of the tab (the cover and the first two
// scoreboard tickets) in every window. NOW=<ms> moves the clock (the empty-24h shot); RM=1 reduced motion.
// Prints the checks: page width, anything poking out, clipped text, page errors.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,320,1280').split(',').map(Number),WINS=(process.argv[5]||'season,d1,d7').split(',');
const D=__dirname+'/',I=D+'../i/',L=D+'../l/',rd=f=>fs.readFileSync(f,'utf8'),ex=fs.existsSync;
async function open(b,W,t,opt={}){const p=await b.newPage({viewport:{width:W,height:opt.h||(W<600?844:1000)},deviceScaleFactor:opt.dpr||2,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('console:'+m.text().slice(0,140))});
  await p.goto('http://localhost:8914/v47-live-x3plus.html#/leaderboard',{waitUntil:'load',timeout:120000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  if(t!=='now'){await p.addStyleTag({content:rd(I+'_si.css')});await p.addScriptTag({content:rd(I+'_si.js')});
    if(t.startsWith('l')){await p.addStyleTag({content:rd(L+'_sl.css')});await p.addScriptTag({content:rd(L+'_sl.js')});await p.addStyleTag({content:rd(L+t+'.css')});await p.addScriptTag({content:rd(L+t+'.js')})}
    else{if(process.env.NOW)await p.evaluate(n=>window.__snNow=+n,process.env.NOW);
      await p.addStyleTag({content:rd(D+'_sn.css')});await p.addScriptTag({content:rd(D+'_sn.js')});await p.addScriptTag({content:rd(D+'_sn2.js')});
      if(ex(D+t+'.css'))await p.addStyleTag({content:rd(D+t+'.css')});await p.addScriptTag({content:rd(D+t+'.js')})}
    try{await p.waitForFunction(t=>document.documentElement.classList.contains('si-ready-'+t),t,{timeout:10000})}catch(e){console.log('NOT READY',t,er.join('|'))}}
  return {p,er}}
module.exports={open};
const SHOW={season:'season',d1:'close',d7:'week'};
if(require.main===module)(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch({args:['--disable-dev-shm-usage']});
 for(const W of WS)for(const t of TS){const {p,er}=await open(b,W,t);
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=450){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1500);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.setProperty('display','none','important')})});
  await p.addStyleTag({content:'body > .x2p-cw{display:none!important}'});
  for(const v of (t==='now'?['']:WINS)){
   if(v){if(t.startsWith('l'))await p.evaluate(v=>window.__slShow(v,false),SHOW[v]);else await p.evaluate(v=>window.__snShow(v,false),v)}
   await p.waitForTimeout(+(process.env.WAIT||1300));
   const bb=await p.evaluate(e=>{const lb=document.getElementById('wc-lb'),cv=lb.querySelector('.wc-tab-cv'),tk=[...lb.querySelectorAll('.wc-sb-r')].sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top);
     const a=cv.getBoundingClientRect(),z=(e?cv:(tk[1]||tk[0]||cv)).getBoundingClientRect();return {y:a.top+scrollY,h:z.bottom-a.top}},!!process.env.NOW);
   const tag=process.env.TAG||'';
   await p.screenshot({path:`${OUT}/lb-${W}-${t}${v?'-'+v:''}${tag}.png`,clip:{x:0,y:Math.max(0,bb.y-14),width:W,height:Math.min(bb.h+30,9000)},fullPage:true});
   const chk=await p.evaluate(()=>{const iw=innerWidth,q=[...document.querySelectorAll('#wc-lb .sn-cv *,#wc-lb .sn-sk')];return {sw:document.documentElement.scrollWidth,iw,
    ov:q.filter(e=>{const r=e.getBoundingClientRect();return r.width&&getComputedStyle(e).visibility!=='hidden'&&(r.right>iw+.5||r.left<-.5)&&!e.closest('svg')}).map(e=>String(e.className.baseVal||e.className).slice(0,40)).slice(0,6),
    clip:q.filter(e=>!e.closest('svg')&&e.children.length===0&&e.scrollWidth>e.clientWidth+1&&!/IMG|^I$/i.test(e.tagName)).map(e=>String(e.className.baseVal||e.className||e.tagName).slice(0,40)).slice(0,6)}});
   console.log(W,t,v||'-',JSON.stringify(chk),er.join('|')||'ok')}
  await p.close()}
 await b.close()})();
