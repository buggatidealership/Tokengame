// node run.js <out dir> <takes e.g. now,r1,t1> [widths 390,1280,320]
// Lays <take>.css/.js over the built X3+ page (served from ez/ on :8931) and shoots the "Every round so far" section (with any opener the take inserts above it).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8931/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('p1-ready')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.waitForTimeout(800);
  if(t!=='now'){await p.addStyleTag({content:rd('_r.css')+rd(t+'.css')});
    await p.addScriptTag({content:rd('_r.js')+rd(t+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('hr-ready'),null,{timeout:30000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(async()=>{const g=document.querySelector('#wc-book .wc-season .wc-bis');g.scrollIntoView();await new Promise(r=>setTimeout(r,1200));const s=document.querySelector('#wc-book .wc-season');const top=(document.querySelector('.hr-rack')||s).getBoundingClientRect().top+scrollY;scrollTo(0,top-90)});
  await p.waitForTimeout(+process.env.SHOT_AT||3500);
  await p.addStyleTag({content:'.x2p-cw{display:none!important}'});
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if((c.position==='fixed'||c.position==='sticky')&&!x.closest('#wc-book'))x.style.visibility='hidden'})});
  const bb=await p.evaluate(t=>{const s=document.querySelector('#wc-book .wc-season');const a=(document.querySelector('.hr-rack')||s).getBoundingClientRect();let z=s.getBoundingClientRect();if(/^r/.test(t)){const g=s.querySelector('.wc-bis');z={bottom:g.getBoundingClientRect().top+(innerWidth<600?40:30)}}return {y:a.top+scrollY,b:z.bottom+scrollY}},t);
  const H=Math.min(bb.b-bb.y+16,+process.env.MAXH||(W<600?2600:2000));
  await p.screenshot({path:`${OUT}/${t}-${W}.png`,clip:{x:0,y:Math.max(0,bb.y-10),width:W,height:Math.ceil(H)},fullPage:true});
  const m=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,vw:innerWidth}));
  console.log(W,t,JSON.stringify(m),er.join('|')||'ok');await ctx.close()}
 await b.close()})();
