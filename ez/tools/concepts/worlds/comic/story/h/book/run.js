// Round H6 · book. node run.js shots <outdir> <takes now,base,p,i,k> <widths 390,1280>
// Lays ground3 A (the fight-night ground) + flow's beat arrival + book.css/js + the take over the built X3+ Overview. Serve ez/ on :8951 first.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const H='tools/concepts/worlds/comic/story/h/';const BASE=H+'book/',G3=H+'ground3/',FL=H+'flow/';
const rd=(d,f)=>{const p=__dirname+'/'+d+f;return fs.existsSync(p)?fs.readFileSync(p,'utf8'):''};
const sub=s=>s.replace(/@B@/g,G3).replace(/@GR@/g,H+'ground/img/web/').replace(/@BK@/g,BASE).replace(/@G3@/g,G3+'img/web/');
const inject=async(p,t)=>{if(t==='now')return;
 await p.addStyleTag({content:sub(rd('../ground3/','common.css')+rd('../ground3/','g3.css')+rd('../ground3/','a.css')+rd('../flow/','flow.css')+rd('','book.css')+(t==='base'?'':rd('','cuts.css')+rd('',t+'.css')))});
 await p.evaluate(([t,G,B])=>{document.documentElement.classList.add('g3-on','g3-a','fl-on','bk-on','bk-'+t);window.__G2={take:'a',base:G};window.__FL={take:t,base:B};window.__BK={take:t,base:B}},[t,G3,BASE]);
 for(const [d,f] of [['../ground3/','common.js'],['../ground3/','a.js'],['../ground3/','g3.js'],['../flow/','flow.js'],['','book.js']])await p.addScriptTag({content:sub(rd(d,f))});
 if(t!=='base'){await p.addScriptTag({content:sub(rd('','cuts.js'))});await p.addScriptTag({content:sub(rd('',t+'.js'))})}else await p.evaluate(()=>{window.__FL.beats();window.__FL.ready()});await p.waitForTimeout(500)};
const open=async(b,W,Hh,dpr,opt)=>{opt=opt||{};const ctx=await b.newContext({viewport:{width:W,height:Hh},deviceScaleFactor:dpr,reducedMotion:opt.rm?'reduce':'no-preference'});const p=await ctx.newPage();await FONTS(p);const er=[];
 p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|ERR_/.test(m.text()))er.push('console:'+m.text())});
 if(opt.noSDA)await p.addInitScript(()=>{window.__flNoSDA=1});
 await p.goto('http://localhost:8951/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForTimeout(2500);await p.evaluate(()=>document.fonts.ready);return {ctx,p,er}};
// y of each cut (top of the next section, sticky switched off while measuring)
const cuts=p=>p.evaluate(()=>['.wc-chars','.wc-season','.wc-splash','.wc-bet'].map(s=>{const e=document.querySelector('#wc-book > '+s);const st=getComputedStyle(e).position==='sticky';if(st)e.style.position='static';const y=e.getBoundingClientRect().top+scrollY;if(st)e.style.position='';return Math.round(y)}));
const quiet=p=>p.addStyleTag({content:'.x2p-cw{display:none!important}'}).then(()=>p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&!x.closest('header')&&!/(fl|bk)/.test(x.className)&&x.getBoundingClientRect().top>innerHeight-140)x.style.visibility='hidden'})}));
// approach y in steps, like a reader
const go=async(p,y,step)=>{const y0=await p.evaluate(()=>scrollY);const n=Math.max(2,Math.ceil(Math.abs(y-y0)/(step||300)));for(let s=1;s<=n;s++){await p.evaluate(v=>scrollTo(0,v),Math.round(y0+(y-y0)*s/n));await p.waitForTimeout(60)}};
module.exports={inject,open,cuts,quiet,go,BASE};
if(require.main===module&&process.argv[2]==='shots')(async()=>{const OUT=process.argv[3],TS=process.argv[4].split(','),WS=(process.argv[5]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
 const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const Hh=W<600?844:800,dpr=W<600?2:1;const {ctx,p,er}=await open(b,W,Hh,dpr);await inject(p,t);await quiet(p);
  // read down once so the lazy parts (the rack) are built before measuring
  {const Ht=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<Ht;y+=500){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(90)}await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(800)}
  let C=await cuts(p);const sw=await p.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);
  const fr=[-.42,-.12,.18];
  for(let k=0;k<4;k++)for(let j=0;j<3;j++){C=await cuts(p);const y=Math.max(0,Math.round(C[k]-Hh*(.5-fr[j])));await go(p,y);await p.waitForTimeout(1400);await p.screenshot({path:`${OUT}/${t}-${W}-c${k+1}-${j}.png`})}
  // the two fixed heads, at rest
  for(const [n,s] of [['mm','.wc-chars'],['er','.wc-season']]){const y=await p.evaluate(s=>{const e=document.querySelector('#wc-book > '+s);const st=getComputedStyle(e).position==='sticky';if(st)e.style.position='static';const y=e.getBoundingClientRect().top+scrollY;if(st)e.style.position='';return y},s);
   await go(p,Math.max(0,Math.round(y-70)));await p.waitForTimeout(1600);await p.screenshot({path:`${OUT}/${t}-${W}-${n}.png`})}
  const sw2=await p.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);
  console.log(W,t,'cuts',C.join(','),'sw',sw.join('/'),sw2.join('/'),er.join('|')||'ok');await ctx.close()}
 await b.close()})();
