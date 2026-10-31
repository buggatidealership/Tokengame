// node run.js <out dir> <takes e.g. now,A,B> [widths 390,1280,320] [state pending|calls] -> <out>/<take>-<w>[-calls].png, close-<take>-<w>[-calls].png
// Lays ../upcoming/_hu + _h2 + _hb + a take over the built X3+ page at #/upcoming (serve ez/ on :8931). "calls" puts the newest graded round's calls in.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),ST=process.argv[5]||'pending';fs.mkdirSync(OUT,{recursive:true});
const D=__dirname,rd=f=>fs.existsSync(D+'/'+f)?fs.readFileSync(D+'/'+f,'utf8'):'';const IMG='tools/concepts/worlds/comic/story/h/upcoming2/img/';
const css=s=>s.replace(/url\(img\//g,'url('+IMG);
const GF='https://fonts.googleapis.com/css2?family=Rye&family=Bungee&family=Bungee+Shade&family=Bangers&family=Luckiest+Guy&family=Shantell+Sans:wght@500;700;800&family=Anton&family=Oswald:wght@500;700&family=Special+Elite&family=Permanent+Marker&family=Alfa+Slab+One&display=block';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:W<600?2:1,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/favicon|404|Failed to load/.test(m.text()))er.push('console:'+m.text().slice(0,140))});
  await p.goto('http://localhost:8931/v47-live-x3plus.html#/upcoming',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.getElementById('wc-up'),null,{timeout:90000});
  await p.waitForTimeout(2500);
  if(t!=='now'){await p.addStyleTag({url:GF});await p.evaluate(()=>document.fonts.ready);
    await p.addStyleTag({content:css(rd('../upcoming/_hu.css')+rd('_h2.css')+rd(t.toLowerCase()+'.css'))});
    if(ST==='calls')await p.evaluate(()=>{window.__h2Calls=true});
    await p.addScriptTag({content:rd('../upcoming/_hu.js')+rd('_h2.js')+rd('_hb.js')+rd(t.toLowerCase()+'.js')});
    await p.waitForFunction(()=>document.documentElement.classList.contains('hu-ready'),null,{timeout:40000})}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);await p.evaluate(()=>scrollTo(0,0));
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&!x.closest('header'))x.style.visibility='hidden'})});
  const r=await p.evaluate(t=>{const root=t==='now'?document.getElementById('wc-up'):document.querySelector('#wc-up > .hu');const q=root.getBoundingClientRect();
    const days=[...root.querySelectorAll(t==='now'?'.sg-d':'.hu-day')].filter(d=>d.offsetHeight);const d2=days[1]||days[0];
    const end=d2?d2.getBoundingClientRect().bottom+scrollY:q.bottom+scrollY;
    const over=[...root.querySelectorAll('*')].filter(e=>{const z=e.getBoundingClientRect();return z.width&&(z.right>innerWidth+.5||z.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('svg')}).map(e=>String(e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,30)).slice(0,5);
    const clip=[...root.querySelectorAll('.hu-t')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent.slice(0,20));
    const bulbs=[...root.querySelectorAll('.h2-panel .h2-bulbs')].map(s=>s.querySelectorAll('g:last-child circle').length/3);
    return {end:Math.round(end),sw:document.documentElement.scrollWidth,vw:innerWidth,over,clip,bulbs}},t);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if((c.position==='fixed'||c.position==='sticky')&&!x.closest('header'))x.style.visibility='hidden'})});
  const H=Math.min(Math.ceil(r.end+20),W<600?3600:2800);const sfx=ST==='calls'?'-calls':'';
  await p.screenshot({path:`${OUT}/${t}-${W}${sfx}.png`,clip:{x:0,y:0,width:W,height:H},fullPage:true});
  if(t!=='now'){const el=await p.$('#wc-up > .hu .h2-main');if(el){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(400);await el.screenshot({path:`${OUT}/close-${t}-${W}${sfx}.png`})}}
  console.log(W,t,ST,JSON.stringify(r),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
