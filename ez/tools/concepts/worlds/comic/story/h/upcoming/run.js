// node run.js <out dir> <takes e.g. now,u1,u2> [widths 390,1280,320]  -> <out>/<take>-<w>.png (+ close-<take>-<w>.png) and a metrics line
// Lays _hu + a take over the built X3+ page at #/upcoming (serve ez/ on :8931) and shoots the tab from the page top.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
const GF='https://fonts.googleapis.com/css2?family=Rye&family=Bungee&family=Bungee+Shade&family=Bangers&family=Luckiest+Guy&family=Shantell+Sans:wght@500;700;800&family=Anton&family=Oswald:wght@500;700&family=Special+Elite&display=block';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:W<600?2:1,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/favicon|404|Failed to load/.test(m.text()))er.push('console:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8931/v47-live-x3plus.html#/upcoming',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.getElementById('wc-up'),null,{timeout:90000});
  await p.waitForTimeout(2500);
  if(t!=='now'){await p.addStyleTag({url:GF});const base=t==='u6'?'u1':null;await p.addStyleTag({content:rd('_hu.css')+(base?rd(base+'.css'):'')+rd(t+'.css')});
    await p.addScriptTag({content:rd('_hu.js')+rd(t+'.js')+(base?rd(base+'.js'):'')});await p.waitForFunction(()=>document.documentElement.classList.contains('hu-ready'),null,{timeout:30000})}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);await p.evaluate(()=>scrollTo(0,0));
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&!x.closest('header'))x.style.visibility='hidden'})});
  const r=await p.evaluate(t=>{const root=t==='now'?document.getElementById('wc-up'):document.querySelector('#wc-up > .hu');const q=root.getBoundingClientRect();
    const days=[...root.querySelectorAll(t==='now'?'.sg-d':'.hu-day')].filter(d=>d.offsetHeight);const d2=days[1]||days[0];
    const end=d2?d2.getBoundingClientRect().bottom+scrollY:q.bottom+scrollY;
    const over=[...root.querySelectorAll('*')].filter(e=>{const z=e.getBoundingClientRect();return z.width&&(z.right>innerWidth+.5||z.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.hu-bleed')}).map(e=>String(e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,30)).slice(0,5);
    const clip=[...root.querySelectorAll('.hu-t')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent.slice(0,20));
    return {end,sw:document.documentElement.scrollWidth,vw:innerWidth,over,clip}},t);
  const H=Math.min(Math.ceil(r.end+20),W<600?3400:2600);
  await p.screenshot({path:`${OUT}/${t}-${W}.png`,clip:{x:0,y:0,width:W,height:H},fullPage:true});
  if(W<600){const el=await p.$(t==='now'?'#wc-up .sg-m':'#wc-up > .hu .hu-it');if(el){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(400);await el.screenshot({path:`${OUT}/close-${t}-${W}.png`})}}
  console.log(W,t,JSON.stringify(r),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
