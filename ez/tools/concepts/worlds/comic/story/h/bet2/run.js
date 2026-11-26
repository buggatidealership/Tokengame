// node run.js <out> <takes s1,..> [widths]: shoots X3+'s bet section with a bet2 take laid over it (now = today)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8942/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('.wc-bet'),null,{timeout:90000});
  await p.waitForTimeout(800);
  if(t!=='now'){await p.addStyleTag({content:rd('_b.css')+rd('chip.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_b.js')+rd('chip.js')+rd(t+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('bt-ready'),null,{timeout:20000})}
  await p.evaluate(()=>{const s=document.querySelector('.wc-bet');scrollTo(0,s.getBoundingClientRect().top+scrollY-120)});
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(+process.env.SHOT_AT||2500);await p.waitForFunction(()=>{const t=Date.now()%1000;return t>550&&t<800},null,{polling:20});await p.evaluate(()=>{window.__freeze=true;document.getAnimations().forEach(a=>{try{if(a.effect&&a.effect.getTiming().iterations!==Infinity)a.finish()}catch(e){}})});await p.waitForTimeout(100);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'})});
  const bb=await p.evaluate(()=>{const s=document.querySelector('.wc-bet'),pr=s.previousElementSibling,a=(pr&&pr.classList.contains('wc-beat')?pr:s).getBoundingClientRect(),r=s.getBoundingClientRect();return {top:a.top+scrollY,bot:r.bottom+scrollY}});
  await p.screenshot({path:`${OUT}/bet-${W}-${t}.png`,clip:{x:0,y:Math.max(0,bb.top-14),width:W,height:Math.ceil(bb.bot-bb.top+28)},fullPage:true});
  const m=await p.evaluate(()=>{const s=document.querySelector('.wc-bet'),r=s.getBoundingClientRect();
    const out=[...s.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&(q.right>innerWidth+.5||q.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.c2-die,.c2-lab,[data-q]')}).map(e=>String(e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,24)).slice(0,5);
    const die=document.querySelector('.c2-die');const dr=die&&die.getBoundingClientRect();
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,h:Math.round(r.height),out,die:dr&&Math.round(dr.width),chk:window.__btCheck,dig:[...document.querySelectorAll('.c2-num')].map(n=>n.textContent).join(':')}});
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
