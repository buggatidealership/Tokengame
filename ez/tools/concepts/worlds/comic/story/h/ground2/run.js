// node run.js <outdir> <takes now,a,b,c,d,e> <widths 390,1280>   (serves nothing: start `python3 -m http.server 8941` in ez/ first)
// Lays a take (common.css + <t>.css + common.js + <t>.js) over the built X3+ Overview and shoots: the whole Overview, and a close-up of every cut.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=process.argv[3].split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);
const BASE='tools/concepts/worlds/comic/story/h/ground2/',GR='tools/concepts/worlds/comic/story/h/ground/img/web/';
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
const sub=s=>s.replace(/@B@/g,BASE).replace(/@GR@/g,GR);
module.exports.inject=async(p,t)=>{if(t==='now')return;await p.addStyleTag({content:sub(rd('common.css')+rd(t+'.css'))});
 await p.evaluate(([t,B])=>{document.documentElement.classList.add('g2-on','g2-'+t);window.__G2={take:t,base:B}},[t,BASE]);
 await p.addScriptTag({content:rd('common.js')});await p.addScriptTag({content:rd(t+'.js')})};
module.exports.open=async(b,W,dpr)=>{const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:dpr});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 const bytes={n:0,f:{}};p.on('response',async r=>{if(/\/h\/ground2?\/img\/|hedra\/openers/.test(r.url())){try{const n=(await r.body()).length;bytes.n+=n;bytes.f[r.url().split('/').pop()]=n}catch(e){}}});
 await p.goto('http://localhost:8941/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForTimeout(3500);return {ctx,p,er,bytes}};
if(require.main===module)(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch();
for(const W of WS)for(const t of TS){const dpr=W<600?2:1;const {ctx,p,er,bytes}=await module.exports.open(b,W,dpr);
 await module.exports.inject(p,t);await p.waitForTimeout(800);if(process.env.STILL!=='0')await p.addStyleTag({content:'html.g2-on *{animation-timeline:auto!important}html.g2-on .gA-curl,html.g2-on .gE-img{animation:none!important}'});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=420){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(220)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(2000);
 await p.addStyleTag({content:'.x2p-cw{display:none!important}'});
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&!x.closest('header')&&x.getBoundingClientRect().top>innerHeight-140)x.style.visibility='hidden'})});
 const g=await p.evaluate(()=>{const bk=document.querySelector('.wc-back');const bot=Math.round(bk.getBoundingClientRect().bottom+scrollY+16);
  const cuts=['.wc-chars','.wc-season','.wc-splash','.wc-bet'].map(s=>{const e=document.querySelector('#wc-book > '+s);let a=e;let q=e.previousElementSibling;while(q&&!q.matches('section')){if(q.offsetHeight>0)a=q;q=q.previousElementSibling}
   return Math.round(a.getBoundingClientRect().top+scrollY)});return {bot,cuts,sw:document.documentElement.scrollWidth,vw:innerWidth}});
 // full Overview at 1x for the board (phone shot at dpr 2, so scale later)
 await p.screenshot({path:`${OUT}/full-${W}-${t}.png`,fullPage:true,clip:{x:0,y:0,width:W,height:g.bot}});
 const CH=W<600?640:760;await p.addStyleTag({content:'header.top{visibility:hidden!important}'});
 for(let k=0;k<4;k++){const cy=await p.evaluate(k=>{const e=document.querySelector('#wc-book > '+['.wc-chars','.wc-season','.wc-splash','.wc-bet'][k]);let a=e,q=e.previousElementSibling;while(q&&!q.matches('section')){if(q.offsetHeight>0)a=q;q=q.previousElementSibling}return a.getBoundingClientRect().top+scrollY},k);
  const y0=Math.max(0,Math.round(cy-(W<600?300:330)));await p.evaluate(y=>scrollTo(0,y),y0);await p.waitForTimeout(700);const sy=await p.evaluate(()=>scrollY);
  await p.screenshot({path:`${OUT}/cut${k+1}-${W}-${t}.png`,clip:{x:0,y:y0-sy,width:W,height:CH}})}
 console.log(W,t,JSON.stringify({sw:g.sw,vw:g.vw,H:g.bot}),'imgKB',Math.round(bytes.n/1024),JSON.stringify(bytes.f),er.join('|')||'ok');await ctx.close()}
await b.close()})();
