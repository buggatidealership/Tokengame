// node run.js <out> <takes now,k1..k5> [widths 390,1280] : lays a cover2 take over the built X3+ page (after round H's CV and the chrome F3 frame) and shoots the cover
// env: CU=1 also writes 3x close-ups of every element (needs DPR=3); SHOT_AT ms before the shot
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=process.env.PORT||8951;
async function open(b,t,W,dpr,extra){const H=W<600?844:(W<1300?800:900);const ctx=await b.newContext(Object.assign({viewport:{width:W,height:H},deviceScaleFactor:dpr},extra||{}));const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load/.test(m.text()))er.push('c:'+m.text().slice(0,140))});
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#wc-book .wc-cover'),null,{timeout:90000});
  await p.waitForTimeout(800);
  if(t!=='now'){await p.addStyleTag({content:rd('../cover/_c.css')+rd('../chrome/_ch.css')+rd('../chrome/f3.css')+rd('_k.css')+rd(t+'.css')});
    await p.addScriptTag({content:rd('../cover/_c.js')+';'+rd('_k.js')+';'+rd(t+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('cv-ready'),null,{timeout:20000});
    await p.addScriptTag({content:rd('../chrome/_ch.js')+';'+rd('../chrome/f3.js')})}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>Promise.race([new Promise(r=>setTimeout(r,5000)),Promise.all([...document.querySelectorAll('#wc-book .wc-cover img')].filter(i=>!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r})))]));
  await p.waitForTimeout(+process.env.SHOT_AT||2200);dispatchResize:{await p.evaluate(()=>dispatchEvent(new Event('resize')));await p.waitForTimeout(300)}
  return {ctx,p,er}}
module.exports={open};
if(require.main===module)(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const {ctx,p,er}=await open(b,t,W,+(process.env.DPR||2));
  const m=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-cover');const r=s.getBoundingClientRect();
    const out=[...s.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&(q.right>innerWidth+.5||q.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.kbg,.chf')}).map(e=>String(e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,24)).slice(0,6);
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,top:Math.round(r.top+scrollY),h:Math.round(r.height),out,chk:window.__kCheck,ch:window.__chChk}});
  await p.screenshot({path:`${OUT}/cv-${W}-${t}-fold.png`});
  await p.addStyleTag({content:'.x2p-cw{visibility:hidden!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==="fixed"&&!x.closest("header"))x.style.visibility='hidden'})});
  await p.screenshot({path:`${OUT}/cv-${W}-${t}.png`,clip:{x:0,y:0,width:W,height:m.top+m.h+40},fullPage:true});
  if(process.env.CU&&t!=='now'){const sels=['.kis','.khd','.kst','.ks0','.ks1','.ks2','.ks3','.kloop','.kfm','.kbt'];let k=0;for(const s of sels){const l=p.locator('#wc-book .wc-cover '+s).first();if(await l.count()){await l.scrollIntoViewIfNeeded();await p.waitForTimeout(150);await l.screenshot({path:`${OUT}/cu-${t}-${String(k++).padStart(2,'0')}${s.replace(/\W/g,'')}.png`})}}}
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
