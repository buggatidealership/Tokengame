// node run.js shots <outdir> <takes now,a,b,c,d> <widths 390,1280>  — frames at every cut (before / mid / after) for the boards
// Lays a take (flow.css + <t>.css, flow.js + <t>.js) over the built X3+ Overview. Serve ez/ on :8951 first.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const BASE='tools/concepts/worlds/comic/story/h/flow/',G3='tools/concepts/worlds/comic/story/h/ground3/img/web/';
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
const sub=s=>s.replace(/@B@/g,BASE).replace(/@G3@/g,G3);
const inject=async(p,t)=>{if(t==='now')return;await p.addStyleTag({content:sub(rd('flow.css')+rd(t+'.css'))});
 await p.evaluate(([t,B])=>{document.documentElement.classList.add('fl-on','fl-'+t);window.__FL={take:t,base:B}},[t,BASE]);
 await p.addScriptTag({content:rd('flow.js')});await p.addScriptTag({content:sub(rd(t+'.js'))});await p.waitForTimeout(400)};
const open=async(b,W,H,dpr,opt)=>{opt=opt||{};const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:dpr,reducedMotion:opt.rm?'reduce':'no-preference'});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|ERR_/.test(m.text()))er.push('console:'+m.text())});
 await p.goto('http://localhost:8951/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForTimeout(2500);await p.evaluate(()=>document.fonts.ready);return {ctx,p,er}};
// the cuts: y of each boundary (top of the next section, or of the beat caption before it)
const cuts=p=>p.evaluate(()=>['.wc-chars','.wc-season','.wc-splash','.wc-bet'].map(s=>{const e=document.querySelector('#wc-book > '+s);const st=getComputedStyle(e).position==='sticky';if(st)e.style.position='static';const y=e.getBoundingClientRect().top+scrollY;if(st)e.style.position='';return Math.round(y)}));
const quiet=p=>p.addStyleTag({content:'.x2p-cw{display:none!important}'}).then(()=>p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&!x.closest('header')&&!/fl/.test(x.className)&&x.getBoundingClientRect().top>innerHeight-140)x.style.visibility='hidden'})}));
module.exports={inject,open,cuts,quiet,BASE};
if(require.main===module&&process.argv[2]==='shots')(async()=>{const OUT=process.argv[3],TS=process.argv[4].split(','),WS=(process.argv[5]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
 const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const H=W<600?844:800,dpr=W<600?2:1;const {ctx,p,er}=await open(b,W,H,dpr);await inject(p,t);await quiet(p);
  // read the page top to bottom once so every beat has arrived as it would for a reader
  const C=await cuts(p);const sw=await p.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);
  const fr=[-.42,-.12,.18];// boundary at 92%, 62%, 32% of the screen height (before, at, after the cut)
  for(let k=0;k<4;k++)for(let j=0;j<3;j++){const y=Math.max(0,Math.round(C[k]-H*(.5-fr[j])));
   // approach in steps so scroll-driven and observer-driven states settle as for a reader
   const y0=await p.evaluate(()=>scrollY);const n=Math.max(2,Math.ceil(Math.abs(y-y0)/300));for(let s=1;s<=n;s++){await p.evaluate(v=>scrollTo(0,v),Math.round(y0+(y-y0)*s/n));await p.waitForTimeout(60)}
   await p.waitForTimeout(1500);await p.screenshot({path:`${OUT}/${t}-${W}-c${k+1}-${j}.png`})}
  console.log(W,t,'cuts',C.join(','),'sw',sw.join('/'),er.join('|')||'ok');await ctx.close()}
 await b.close()})();
