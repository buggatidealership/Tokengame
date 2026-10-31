// node run.js <out> <takes now,a,b,c,d,e> [widths 390,1280,320] : lays a cover4 take over the built X3+ page and shoots the cover (fold + whole cover)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=process.env.PORT||8961;
async function open(b,t,W,dpr){const H=W<600?844:(W<1300?800:900);const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:dpr});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/404|Failed to load/.test(m.text()))er.push('c:'+m.text().slice(0,140))});
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#wc-book .wc-cover'),null,{timeout:90000});
  await p.waitForTimeout(800);
  if(process.env.PEND)await p.evaluate(()=>{window.SH.fight=()=>({r:{n:99,ticker:'TEST',co:'Test Co',calls:[['GPT','UP 3%',''],['KIMI','DOWN 1%',''],['CLAUDE','UP 2%',''],['GROK','DOWN 1.5%','']]}})});
  if(t!=='now'){await p.addStyleTag({content:rd('_c.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_c.js')+';'+rd(t+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('t3-ready'),null,{timeout:20000})}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>Promise.race([new Promise(r=>setTimeout(r,8000)),Promise.all([...document.querySelectorAll('#wc-book .wc-cover img')].filter(i=>!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r})))]));
  await p.waitForTimeout(+process.env.SHOT_AT||1800);await p.evaluate(()=>dispatchEvent(new Event('resize')));await p.waitForTimeout(400);
  return {ctx,p,er}}
module.exports={open};
if(require.main===module)(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const {ctx,p,er}=await open(b,t,W,+(process.env.DPR||2));
  const m=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-cover');const r=s.getBoundingClientRect();
    const out=[...s.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&(q.right>innerWidth+.5||q.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.hcf')}).map(e=>String(e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,24)).slice(0,6);
    const film=document.querySelector('#wc-book .wc-cover .sh-film');
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,top:Math.round(r.top+scrollY),h:Math.round(r.height),filmTop:film?Math.round(film.getBoundingClientRect().top+scrollY):0,out,chk:window.__c4}});
  await p.screenshot({path:`${OUT}/cv-${W}-${t}-fold.png`});
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==="fixed"&&!x.closest("header"))x.style.visibility='hidden'})});
  await p.screenshot({path:`${OUT}/cv-${W}-${t}.png`,clip:{x:0,y:0,width:W,height:m.top+m.h+30},fullPage:true});
  if(process.env.CU&&t!=='now'){const l=p.locator('#wc-book .wc-cover .c4').first();await l.screenshot({path:`${OUT}/cu-${W}-${t}.png`})}
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
