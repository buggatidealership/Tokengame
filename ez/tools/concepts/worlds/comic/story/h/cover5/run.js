// node run.js <out> <takes now,marquee,...> [widths 390,1280] : lays a cover5 take over the built X3+ page and shoots the cover
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=process.env.PORT||8961;
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const H=W<600?844:800;const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||2)});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#wc-book .wc-cover'),null,{timeout:90000});
  await p.waitForTimeout(800);
  if(t!=='now'){await p.addStyleTag({content:rd('_c5.css')+rd('takes.css')});await p.addScriptTag({content:rd('_c5.js')+';'+rd('takes.js')+`;C5.mount(${JSON.stringify(t)},C5T[${JSON.stringify(t)}])`});await p.waitForFunction(()=>document.documentElement.classList.contains('t3-ready'),null,{timeout:20000})}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>Promise.race([new Promise(r=>setTimeout(r,8000)),Promise.all([...document.querySelectorAll('#wc-book .wc-cover img')].filter(i=>!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r})))]));
  await p.waitForTimeout(+process.env.SHOT_AT||1500);
  const m=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-cover');const r=s.getBoundingClientRect();
    const over=[...s.querySelectorAll('.c5-s')].filter(e=>e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+2).map(e=>e.className.replace('c5-s ','')+':'+(e.scrollWidth-e.clientWidth)+'x'+(e.scrollHeight-e.clientHeight)).slice(0,10);
    const film=s.querySelector('video');const fr=film&&film.getBoundingClientRect();
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,top:Math.round(r.top+scrollY),h:Math.round(r.height),film:fr?Math.round(fr.top+scrollY)+'..'+Math.round(fr.bottom+scrollY):0,over,c5:window.__c5}});
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==="fixed"&&!x.closest("header"))x.style.visibility='hidden'})});
  await p.screenshot({path:`${OUT}/cv-${W}-${t}.png`,clip:{x:0,y:0,width:W,height:Math.min(m.top+m.h+20,W<600?1600:1500)},fullPage:true});
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
