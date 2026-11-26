// node run.js <out> <takes e1i1,e2i1,..|now> [widths 390,1280] [win hit|season|d7|d1]   (serve ez/ on PORT, default 8974)
// Shoots the "Smart or lucky?" chapter per take (s4-<t>-<win>-<W>.png): est id + instrument id. Reports overflow, checks, errors.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),WIN=process.argv[5]||'hit';if(OUT)fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=process.env.PORT||8974;
const FL='https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Bangers&family=Shantell+Sans:wght@400;700&display=block';
const S3='../sol3/';
const LIB=()=>`window.S3IMG='/tools/concepts/worlds/comic/story/h/sol3/img/';window.S4IMG='/tools/concepts/worlds/comic/story/h/sol4/img/';`+rd('../pnl/_lib.js')+rd(S3+'_s3.js')+rd(S3+'arcade.js')+rd(S3+'poly.js')+rd('_s4.js');
module.exports.inject=async(p,t)=>{const est=t.slice(0,2),inst=t.slice(2,4);await p.evaluate(()=>{window.PN_STILL=true});await p.addStyleTag({url:FL});
  await p.addStyleTag({content:rd('../pnl/_c.css')+rd(S3+'_s3.css')+rd(S3+'styles.css')+rd('_s4.css')});
  await p.addScriptTag({content:LIB()+`;S4mount('${est}','${inst}')`});await p.evaluate(()=>document.fonts.ready);
  await p.evaluate(()=>S3set(document.querySelector('.s3-root').dataset.win,false));
  await p.waitForFunction(()=>[...document.images].filter(i=>i.closest('.s4')).every(i=>i.complete&&i.naturalWidth),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(700)};
module.exports.open=async(b,W,H)=>{const ctx=await b.newContext({viewport:{width:W,height:H||(W<600?844:800)},deviceScaleFactor:W>1000?1:2});const p=await ctx.newPage();await FONTS(p);const er=[];
 p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if((m.type()==='error'||m.type()==='warning')&&!/Failed to load resource|willReadFrequently/.test(m.text()))er.push(m.text())});
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.querySelector('.wc-splash')&&window.__x2pPnl&&document.querySelector('#wc-pfv-pnl .wc-pf-r'),null,{timeout:120000});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1200);
 await p.evaluate(()=>{const s=document.querySelector('.wc-splash');s.classList.remove('wc-offs');s.scrollIntoView()});await p.waitForTimeout(1500);
 return {ctx,p,er}};
module.exports.prep=async p=>{await p.evaluate(()=>{document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}});document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed')e.style.setProperty('visibility','hidden','important');if(c.position==='sticky')e.style.setProperty('position','static','important')})});await p.waitForTimeout(700)};
module.exports.measure=p=>p.evaluate(()=>{const a=document.querySelector('.wc-splash');a.style.setProperty('content-visibility','visible','important');const hr=a.querySelector('.s4')||a,k0=hr.getBoundingClientRect();
   const ov=[...a.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&(q.right>innerWidth+.5||q.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.s3-bg')}).map(e=>String(e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,24)).slice(0,5);
   const sf=document.querySelector('.s3-sf');let out=[];if(sf){const R=sf.getBoundingClientRect();out=[...sf.querySelectorAll('text,.s3-c')].filter(e=>{const q=e.getBoundingClientRect();return q.right>R.right+1||q.left<R.left-1||q.bottom>R.bottom+1||q.top<R.top-1}).map(e=>e.textContent).slice(0,6)}
   /* text inside its painted blank: balloon and caption box contents must not overflow their box */
   const bx=[...document.querySelectorAll('.s4-bal,.s4-capb')].filter(b=>b.scrollWidth>b.clientWidth+1||b.scrollHeight>b.clientHeight+1).map(b=>b.className);
   return {y:k0.top+scrollY,h:k0.height,sw:document.documentElement.scrollWidth,ov,out,bx,check:(window.S3||{}).check,pn:(window.PN||{}).check,pair:window.S4&&S4.P&&[S4.P.m,S4.P.right.r.n,S4.P.wrong.r.n]}});
if(require.main===module)(async()=>{const b=await chromium.launch();
for(const W of WS)for(const t of TS){const {ctx,p,er}=await module.exports.open(b,W);
 if(t!=='now'){await module.exports.inject(p,t);if(WIN!=='hit'){await p.evaluate(w=>S3set(w,false),WIN);await p.waitForTimeout(400)}}
 await module.exports.prep(p);const r=await module.exports.measure(p);
 await p.screenshot({path:`${OUT}/s4-${t}-${WIN}-${W}.png`,fullPage:true,clip:{x:0,y:Math.max(0,r.y),width:W,height:Math.min(r.h+20,4000)}});
 console.log(t,W,WIN,JSON.stringify({h:Math.round(r.h),sw:r.sw,ov:r.ov,out:r.out,bx:r.bx,check:r.check,pn:r.pn,pair:r.pair}),er.slice(0,3).join('|')||'ok');await ctx.close()}
await b.close()})();
