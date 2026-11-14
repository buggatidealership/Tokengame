// node run.js <out dir> <takes e.g. now,d1,d2,d3> [widths 390,320,1280]
// Lays take <t>.css/<t>.js (plus the shared _sd.*, and helper a's P3 for panel 5) over the built X3+ page and shoots the whole
// "One round, start to finish" section. A take's JS adds html.sd-ready when done. SHOT_AT=ms waits for arrival motion.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
const A=f=>fs.readFileSync(__dirname+'/../a/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('console:'+m.text().slice(0,140))});
  await p.goto('http://localhost:8897/'+(process.env.PAGE||'v47-live-x3plus.html'),{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  if(t!=='now'){
    // panel 5: helper a's P3 "Punched" (the pick), laid first so every take ends on it
    await p.addStyleTag({content:A('_sa.css')+A('p3.css')});await p.addScriptTag({content:A('_sa.js')+A('p3.js')});
    await p.waitForFunction(()=>document.documentElement.classList.contains('sa-ready'),null,{timeout:20000});
    await p.addStyleTag({content:rd('_sd.css')+rd(t+'.css')});await p.evaluate(t=>document.documentElement.classList.add('sd-t-'+t),t);
    await p.addScriptTag({content:rd('_sd.js')+rd(t+'.js')});
    try{await p.waitForFunction(()=>document.documentElement.classList.contains('sd-ready'),null,{timeout:20000})}catch(e){console.log('NOT READY',t,er.join('|'));await p.close();continue}}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(600);
  // scroll through the section so every panel's arrival plays, then sit at its top
  const top=await p.evaluate(()=>document.querySelector('.wc-lr').getBoundingClientRect().top+scrollY);const sh=await p.evaluate(()=>document.querySelector('.wc-lr').offsetHeight);
  for(let y=top-200;y<top+sh;y+=250){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(220)}
  await p.evaluate(y=>scrollTo(0,y-60),top);await p.waitForTimeout(+process.env.SHOT_AT||2600);
  await p.addStyleTag({content:'body > div:has(> .x2p-cw-run){display:none!important}'});await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0)x.style.setProperty('display','none','important')});document.querySelectorAll('video').forEach(v=>{v.pause();})});
  const bb=await p.evaluate(()=>{const r=document.querySelector('.wc-lr').getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
  await p.screenshot({path:`${OUT}/lr-${W}-${t}.png`,clip:{x:0,y:bb.y-24,width:W,height:Math.min(bb.h+48,9000)},fullPage:true});
  const m=await p.evaluate(()=>{const n=document.querySelector('.wc-lr'),iw=innerWidth;
    const out=[...n.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();if(!q.width||!e.offsetParent&&getComputedStyle(e).position!=='fixed')return false;const cs=getComputedStyle(e);if(cs.visibility==='hidden')return false;return q.right>iw+.5||q.left<-.5}).map(e=>(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className)||e.tagName).slice(0,6);
    // text that overflows its own box (clipped words)
    const clip=[...n.querySelectorAll('[class*="sd-"]')].filter(e=>e.offsetParent&&e.children.length===0&&e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible').map(e=>e.className).slice(0,6);
    return {sw:document.documentElement.scrollWidth,iw,h:Math.round(n.offsetHeight),out,clip}});
  console.log(W,t,JSON.stringify(m),er.join('|')||'ok');await p.close()}
 await b.close()})();
