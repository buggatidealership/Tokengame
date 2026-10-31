// node run.js <out dir> <takes e.g. now,h1,h2,h3> [widths 390,320,1280]  (env SHOT_AT ms, RM=1 reduced motion)
// Lays ../e/_se.js + _sh + take over the built X3+ page and shoots the first screen: from the page top to the cover's foot.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,320,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2,reducedMotion:process.env.RM?'reduce':'no-preference'});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8922/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.waitForTimeout(500);
  if(t!=='now'){await p.addStyleTag({content:rd('_sh.css')+rd(t+'.css')});await p.evaluate(t=>document.documentElement.classList.add('sh-on','sh-t-'+t),t);
    await p.addScriptTag({content:rd('../e/_se.js')+rd('_sh.js')+rd(t+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('se-ready'),null,{timeout:20000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(+process.env.SHOT_AT||2500);await p.evaluate(()=>window.__shStop&&window.__shStop());await p.waitForTimeout(900);
  await p.waitForFunction(()=>{const l=document.querySelector('.sh-lens');return !l||l.getAnimations({subtree:true}).every(a=>!/sh-lin|sh-shn/.test(a.animationName||'')||a.playState!=='running')},null,{timeout:8000}).catch(()=>{});
  await p.addStyleTag({content:'.x2p-cw{display:none!important}'});
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.getBoundingClientRect().top>innerHeight-130&&!x.closest('header'))x.style.visibility='hidden'})});
  const bb=await p.evaluate(()=>{const n=document.querySelector('#wc-book .wc-cover');const r=n.getBoundingClientRect();return {bot:r.bottom+scrollY,h:r.height}});
  await p.screenshot({path:`${OUT}/cover-${W}-${t}.png`,clip:{x:0,y:0,width:W,height:Math.ceil(bb.bot+18)},fullPage:true});
  const m=await p.evaluate(()=>{const n=document.querySelector('#wc-book .wc-cover'),r=n.getBoundingClientRect(),VW=innerWidth;
    const out=[...n.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();if(!q.width||!e.getClientRects().length)return false;return (q.right>r.right+1||q.left<r.left-1)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('svg')}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,30)).slice(0,6);
    const clip=[...n.querySelectorAll('.sh-c,.sh-gd span,.sh-iss span,.sh-cap,.sh-bb,.sh-lnt')].filter(e=>e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1).map(e=>String(e.className).slice(0,24)).slice(0,6);
    return {sw:document.documentElement.scrollWidth,vw:VW,coverBottom:Math.round(r.bottom+scrollY),fold:innerHeight,out,clip}});
  console.log(W,t,JSON.stringify(m),er.join('|')||'ok');await ctx.close()}
 await b.close()})();
