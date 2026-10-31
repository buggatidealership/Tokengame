// node verify.js <out dir> [widths]: the built X3+ (no injection): both pop modules, errors, sideways scroll, Show all, a tile tap, tabs; shots.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],WS=(process.argv[3]||'320,390,1280,1920').split(',').map(Number);
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});
 for(const W of WS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto('http://localhost:8925/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('p1-ready'),null,{timeout:60000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(80)}
  await p.evaluate(()=>document.querySelector('.wc-season').scrollIntoView());await p.waitForTimeout(1500);
  const r={W};
  Object.assign(r,await p.evaluate(()=>{const vis=[...document.querySelectorAll('.wc-season .wc-bi')].filter(a=>a.offsetParent);
    return {cards:document.querySelectorAll('.pp1-grid .pp1-c').length,plSvg:document.querySelectorAll('.pp1-plv svg').length,tiles:vis.length,filled:vis.filter(a=>a.querySelector('.pp1-stb .pp1-mv svg')).length,
     stampsShown:[...document.querySelectorAll('.wc-season .wc-bi .sa-sts')].filter(s=>getComputedStyle(s).display!=='none').length,
     flagPop:getComputedStyle(document.querySelector('.pp1-fl .wc-flg-fd'),'::before').content!=='none',sw:document.documentElement.scrollWidth}}));
  await p.click('.wc-season .wc-more');await p.waitForTimeout(1500);
  await p.evaluate(()=>{const v=[...document.querySelectorAll('.wc-season .wc-bi')].filter(a=>a.offsetParent);v[v.length-1].scrollIntoView()});await p.waitForTimeout(1200);
  Object.assign(r,await p.evaluate(()=>{const vis=[...document.querySelectorAll('.wc-season .wc-bi')].filter(a=>a.offsetParent);return {afterShowAll:vis.length,filledAll:vis.filter(a=>a.querySelector('.pp1-stb .pp1-mv svg')).length,swAll:document.documentElement.scrollWidth}}));
  await p.click('.wc-season .wc-more');await p.waitForTimeout(800);
  await p.evaluate(()=>document.querySelector('.wc-season .wc-bi').scrollIntoView({block:'center'}));await p.waitForTimeout(400);
  await p.click('.wc-season .wc-bi');await p.waitForTimeout(2500);
  r.tap=await p.evaluate(()=>({hash:location.hash,pop:!!(document.getElementById('x2pRm')&&document.getElementById('x2pRm').offsetParent)}));
  await p.evaluate(()=>{location.hash='#/'});await p.waitForTimeout(1500);
  for(const t of ['leaderboard','upcoming']){await p.evaluate(t=>{location.hash='#/'+t},t);await p.waitForTimeout(2500);r[t]=await p.evaluate(()=>({sec:document.documentElement.getAttribute('data-sec'),sw:document.documentElement.scrollWidth}))}
  await p.evaluate(()=>{location.hash='#/'});await p.waitForTimeout(2500);
  r.back=await p.evaluate(()=>({sec:document.documentElement.getAttribute('data-sec'),grid:!!(document.querySelector('.pp1-grid')&&document.querySelector('.pp1-grid').offsetParent),cards:document.querySelectorAll('.pp1-grid .pp1-c').length,stubs:document.querySelectorAll('.wc-season .pp1-stb').length}));
  r.err=er;console.log(JSON.stringify(r));
  if(OUT&&(W===390||W===1280))for(const s of ['.wc-chars','.wc-season']){const bb=await p.evaluate(s=>document.querySelector(s).getBoundingClientRect().height,s);
    await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0)x.style.visibility='hidden'})});
    await p.setViewportSize({width:W,height:Math.ceil(bb+28)});await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-12)},s);await p.waitForTimeout(2500);
    const q=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.left,y:r.top,width:r.width,height:r.height}},s);
    await p.screenshot({path:`${OUT}/${s.slice(4)}-${W}.png`,clip:{x:Math.max(0,q.x-12),y:Math.max(0,q.y-12),width:Math.min(W,q.width+24),height:q.height+24}})}
  await p.close()}
 await b.close()})();
