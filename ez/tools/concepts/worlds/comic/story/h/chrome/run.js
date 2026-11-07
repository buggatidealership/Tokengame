// node run.js <out> <takes now-h,h1..|now-f,f1..|now-b|now-c|now-l> [widths 390,1280]
// lays a chrome take over the built X3+ page and shoots its part; prints measurements
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=process.argv[3].split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const part=t.replace('now-','')[0];if(part==='c'&&W<1200)continue;
  const ctx=await b.newContext({viewport:{width:W,height:W<600?844:800},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8941/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.waitForTimeout(1500);
  if(!t.startsWith('now')){await p.addStyleTag({content:rd('_ch.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_ch.js')+rd(t+'.js')+`;document.documentElement.classList.add('chx','ch-${t}');CH.go&&CH.go();`})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>Promise.race([new Promise(r=>setTimeout(r,4000)),Promise.all([...document.querySelectorAll('.chf-p')].filter(i=>!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r})))]));await p.waitForTimeout(1800);
  let clip,m={};const f=`${OUT}/${part}-${W}-${t}.png`;
  if(part==='h'){m=await p.evaluate(()=>{const h=document.querySelector('header.top').getBoundingClientRect();return {hh:Math.round(h.height)}});clip={x:0,y:0,width:W,height:Math.min(W<600?844:800,m.hh+(W<600?150:110))}}
  if(part==='f'){await p.evaluate(()=>{const s=document.querySelector('.sh-film');scrollTo(0,s.getBoundingClientRect().top+scrollY-(innerWidth<600?140:100))});await p.waitForTimeout(600);
    await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'})});
    const r=await p.evaluate(()=>{const s=document.querySelector('.sh-film').getBoundingClientRect(),v=document.querySelector('.sh-film .vt-f').getBoundingClientRect();return {y:s.top+scrollY,h:s.height,vw:Math.round(v.width),vh:Math.round(v.height)}});m=r;clip={x:0,y:Math.max(0,r.y-30),width:W,height:Math.ceil(r.h+90)}}
  if(part==='b'){await p.evaluate(()=>{document.querySelector('.wc-back').scrollIntoView({block:'center'});[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'})});await p.waitForTimeout(800);
    const r=await p.evaluate(()=>{const s=document.querySelector('.wc-back').getBoundingClientRect();return {y:s.top+scrollY,h:s.height}});m={h:Math.round(r.h)};clip={x:0,y:Math.max(0,r.y-30),width:W,height:Math.ceil(r.h+60)}}
  if(part==='c'){await p.evaluate(()=>scrollTo(0,900));await p.waitForTimeout(900);const r=await p.evaluate(()=>{const c=document.querySelector('.x2p-cw').getBoundingClientRect();return {y:c.top,h:c.height}});m={h:Math.round(r.h)};clip={x:0,y:r.y-60,width:W,height:r.h+60}}
  if(part==='l'){await p.evaluate(()=>{document.documentElement.classList.remove('x2p-rv');document.documentElement.classList.add('x2p-cur');scrollTo(0,0)});await p.waitForTimeout(900);clip={x:0,y:0,width:W,height:W<600?844:800}}
  const fx=part==='h'||part==='l'||part==='c';
  await p.screenshot({path:f,clip:fx?clip:clip,fullPage:!fx});
  Object.assign(m,await p.evaluate(()=>({sw:document.documentElement.scrollWidth,vw:innerWidth,chk:window.__chChk||null})));
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
