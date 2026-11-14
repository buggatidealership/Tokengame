// node run.js <out> <takes now,A,B,B2> [widths 390,1280] : serve ez/ on port 8951 first. Shoots the top of X2+ (header to the end of
// the new top) with a top1 take laid over the built page; prints sideways scroll, errors, and any live text outside its frame.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  if(t!=='now'){await p.addStyleTag({content:rd('_t.css')});await p.evaluate(k=>window.__T1=k,t);await p.addScriptTag({content:rd('_t.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('t1-ready'));}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>window.__t1&&__t1.place());
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed')x.style.visibility='hidden'});const st=document.createElement('style');st.textContent='body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug){visibility:hidden!important}';document.head.append(st)});
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForFunction(()=>[...document.querySelectorAll('.t1 img')].every(i=>i.complete));await p.waitForTimeout(700);
  const bot=await p.evaluate(()=>{const s=document.querySelector('.t1')||document.querySelector('section.x2o-bet');return Math.ceil(s.getBoundingClientRect().bottom+scrollY)+24});
  await p.screenshot({path:`${OUT}/top-${W}-${t}.png`,clip:{x:0,y:0,width:W,height:bot},fullPage:true});
  if(t!=='now'){const fr=await p.$$('.t1-fr');for(let i=0;i<fr.length;i++)await fr[i].screenshot({path:`${OUT}/fr-${W}-${t}-${i}.png`})}
  const m=await p.evaluate(()=>{const s=document.querySelector('.t1');if(!s)return {sw:document.documentElement.scrollWidth};
    const out=[...s.querySelectorAll('.t1-sf')].filter(e=>{const r=e.getBoundingClientRect(),a=e.closest('.t1-art').getBoundingClientRect();return r.left<a.left-1||r.right>a.right+1||r.top<a.top-1||r.bottom>a.bottom+1}).length;
    const h1=s.querySelector('.t1-h1').getBoundingClientRect();
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,h:Math.round(s.getBoundingClientRect().height),outSurf:out,h1w:Math.round(h1.width),h1Right:Math.round(h1.right),film:Math.round(s.querySelector('.t1-b3').getBoundingClientRect().top+scrollY)}});
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
