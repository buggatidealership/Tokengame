// node run.js <out dir> <takes e.g. now,k1,k2,k3,k4> [widths 390,320,1280]  (env RM=1 reduced motion, STEPS=1 also shoots each step's stage)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,320,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2,reducedMotion:process.env.RM?'reduce':'no-preference'});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8911/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.waitForTimeout(500);
  if(t!=='now'){await p.addStyleTag({content:rd('_k.css')+rd(t+'.css')});await p.evaluate(t=>document.documentElement.classList.add('kc-on','kc-t-'+t),t);
    await p.addScriptTag({content:rd('../e/_se.js')+rd('_k.js')+rd(t+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('se-ready'),null,{timeout:20000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1800);
  await p.evaluate(()=>{window.__kcStop&&window.__kcStop();document.documentElement.classList.add('kc-frz')});await p.waitForTimeout(500);
  await p.addStyleTag({content:'.x2p-cw{display:none!important}'});
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.getBoundingClientRect().top>innerHeight-130&&!x.closest('header'))x.style.visibility='hidden'})});
  const bb=await p.evaluate(()=>{const n=document.querySelector('#wc-book .wc-cover');const r=n.getBoundingClientRect();return {bot:r.bottom+scrollY}});
  await p.screenshot({path:`${OUT}/cover-${W}-${t}.png`,clip:{x:0,y:0,width:W,height:Math.ceil(bb.bot+18)},fullPage:true});
  const meas=()=>p.evaluate(()=>{const n=document.querySelector('#wc-book .wc-cover'),r=n.getBoundingClientRect();
    const out=[...n.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();if(!q.width||!e.getClientRects().length||e.closest('.kc-track,.kc-stack,.kc-lens'))return false;return (q.right>r.right+1||q.left<r.left-1)&&getComputedStyle(e).visibility!=='hidden'}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,30)).slice(0,6);
    /* nothing may spill out of its picture or panel: every element inside a shown frame's picture stays inside the picture box */
    const spill=[];document.querySelectorAll('.kc-f').forEach(f=>{const fr=f.getBoundingClientRect();if(!fr.width)return;const pw=f.querySelector('.kc-pw');if(!pw)return;const pr=pw.getBoundingClientRect();
      pw.querySelectorAll('*').forEach(e=>{if(e.closest('svg')&&e.tagName!=='svg')return;const q=e.getBoundingClientRect();if(!q.width||getComputedStyle(e).visibility==='hidden')return;if(q.left<pr.left-1||q.right>pr.right+1||q.top<pr.top-1||q.bottom>pr.bottom+1)spill.push((f.dataset.i)+':'+String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,20)+' '+Math.round(Math.max(pr.left-q.left,q.right-pr.right,pr.top-q.top,q.bottom-pr.bottom)))})});
    const clip=[...n.querySelectorAll('.kc-cap span,.kc-dot,.kc-out span,.kc-bal b,.kc-tk-b b,.kc-tk-b em,.kc-pr,.kc-co b')].filter(e=>e.getClientRects().length&&(e.scrollWidth>e.clientWidth+1)).map(e=>String(e.className||e.tagName).slice(0,24)).slice(0,6);
    const film=document.querySelector('.wc-film-slot').getBoundingClientRect();
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,filmTop:Math.round(film.top+scrollY),coverBottom:Math.round(r.bottom+scrollY),out,spill:[...new Set(spill)].slice(0,8),clip}});
  console.log(W,t,JSON.stringify(await meas()),er.join('|')||'ok');
  if(process.env.STEPS&&t!=='now'&&t!=='k4'){for(let i=0;i<4;i++){await p.evaluate(i=>window.__kcGo(i),i);await p.waitForTimeout(1300);
      const st=await p.evaluate(()=>{const s=document.querySelector('.kc-stage').getBoundingClientRect();return {x:s.left,y:s.top+scrollY,w:s.width,h:s.height}});
      await p.screenshot({path:`${OUT}/step-${W}-${t}-${i+1}.png`,clip:{x:Math.max(0,st.x-4),y:st.y-4,width:Math.min(W-Math.max(0,st.x-4),st.w+14),height:st.h+12},fullPage:true});
      const mm=await meas();if(mm.spill.length||mm.clip.length||mm.sw>mm.vw)console.log('  step',i+1,JSON.stringify(mm))}}
  await ctx.close()}
 await b.close()})();
