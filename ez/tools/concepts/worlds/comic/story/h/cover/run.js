// node run.js <out> <takes now,c1..> [widths 390,1280]: shoots X3+'s cover (today or a take laid over it): the first screen and just below
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const H=W<600?844:(W<1300?800:900);const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||2)});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load/.test(m.text()))er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8943/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#wc-book .wc-cover'),null,{timeout:90000});
  await p.waitForTimeout(800);
  if(t!=='now'){const base=/b$/.test(t)?t.slice(0,-1):t;await p.addStyleTag({content:rd('_c.css')+rd(base+'.css')});await p.addScriptTag({content:rd('_c.js')+(base!==t?"window.__cvRead='b';":'')+rd(base+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('cv-ready'),null,{timeout:20000})}
  await p.evaluate(()=>scrollTo(0,0));
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(+process.env.SHOT_AT||2600);
  const m=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-cover');const r=s.getBoundingClientRect();
    const out=[...s.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&(q.right>innerWidth+.5||q.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.cv-bleed')}).map(e=>String(e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,24)).slice(0,5);
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,top:Math.round(r.top+scrollY),h:Math.round(r.height),out,chk:window.__cvCheck}});
  await p.screenshot({path:`${OUT}/cv-${W}-${t}-fold.png`});
  await p.addStyleTag({content:'.x2p-cw{visibility:hidden!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==="fixed"&&!x.closest("header"))x.style.visibility='hidden'})});
  await p.screenshot({path:`${OUT}/cv-${W}-${t}.png`,clip:{x:0,y:0,width:W,height:m.top+m.h+60},fullPage:true});
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
