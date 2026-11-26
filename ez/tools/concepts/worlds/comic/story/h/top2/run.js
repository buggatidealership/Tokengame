// node run.js <outdir> <takes now,c,d> [widths 390,1280,320]: shoots the top of X2+ (to the start of the standings) with a top2 take laid over it.
// Serve ez/ on :8951 first. Prints per shot: sideways scroll, errors, live text that overflows its surface.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  if(t!=='now'){await p.addStyleTag({content:rd('_t2.css')});await p.evaluate(k=>window.__t2Take=k,t);await p.addScriptTag({content:rd('_t2.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('t2-ready'),null,{timeout:30000})}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1800);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==="fixed")x.style.visibility="hidden"});const st=document.createElement("style");st.textContent='body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug){visibility:hidden!important}';document.head.append(st)});
  const bot=await p.evaluate(()=>{const s=document.querySelector('#standings');return s.getBoundingClientRect().top+scrollY+60});
  await p.screenshot({path:`${OUT}/top-${W}-${t}.png`,clip:{x:0,y:0,width:W,height:Math.ceil(bot)},fullPage:true});
  if(t!=='now'){const fs_=await p.$$('.t2-f');for(let i=0;i<fs_.length;i++)await fs_[i].screenshot({path:`${OUT}/fr-${W}-${t}-${i}.png`});await (await p.$('.t2-b1')).screenshot({path:`${OUT}/hero-${W}-${t}.png`})}
  const m=await p.evaluate(()=>{const ov=[...document.querySelectorAll('.t2-s')].flatMap(s=>[...s.querySelectorAll('*')].filter(e=>{const a=e.getBoundingClientRect(),q=s.getBoundingClientRect();return a.width&&(a.left<q.left-1.5||a.right>q.right+1.5)}).map(e=>s.className.split(' ')[1]+':'+e.tagName+':'+e.textContent.slice(0,18)));
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,ov:[...new Set(ov)].slice(0,8),topH:Math.round(document.querySelector('#standings').getBoundingClientRect().top+scrollY)}});
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
