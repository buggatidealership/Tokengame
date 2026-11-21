// node cmp.js <outdir> [widths] [rm 1|0]: serve ez/ on 8954 first. Shoots X3+'s live bet (v47) and the drop-in laid over v46 at a fixed clock,
// prints geometry, countdown digits, errors and sideways scroll per page; writes sec-<W>-<x3|x2>.png for diff.py.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],WS=(process.argv[3]||'320,390,1280').split(',').map(Number),RM=(process.argv[4]||'1')==='1';fs.mkdirSync(OUT,{recursive:true});
const T=+(process.env.T||Date.parse('2026-11-02T09:41:07Z'));const DPR=+(process.env.DPR||1);
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const res={},frac={};
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const pg of ['x3','x2']){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:RM?'reduce':'no-preference'});const p=await ctx.newPage();await FONTS(p);
  if(process.env.FIX!=='0')await p.clock.setFixedTime(T);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('response',r=>{if(r.status()>=400)er.push(r.status()+' '+r.url().slice(-80))});
  await p.goto('http://localhost:8954/'+(pg==='x3'?'v47-live-x3plus.html':'v46-live-x2plus.html'),{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  if(pg==='x2'){if(process.env.BLEED)await p.evaluate(()=>document.documentElement.classList.add('x2b-bleed'));await p.addStyleTag({content:rd('x2p_bet.css')});await p.addScriptTag({content:rd('x2p_bet.js')})}
  await p.waitForFunction(()=>document.documentElement.classList.contains('bd-ready'),null,{timeout:60000});
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  const sel=pg==='x3'?'.wc-bet.hb-on':'#x2pSt.hb-on';
  await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'start'}),sel);await p.waitForTimeout(600);
  await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'end'}),sel);await p.waitForTimeout(600);
  // the paintings are CSS backgrounds: wait until every one has decoded
  await p.evaluate(async s=>{const urls=new Set();document.querySelectorAll(s+' *').forEach(e=>{const m=getComputedStyle(e).backgroundImage.match(/url\("?([^")]+)"?\)/g);m&&m.forEach(u=>urls.add(u.replace(/url\("?|"?\)/g,'')))});
    await Promise.all([...urls].filter(u=>/^(https?:|media\/|\/)/.test(u)).map(u=>{const i=new Image();i.src=u;return i.decode().catch(()=>0)}))},sel);
  await p.evaluate(()=>window.dispatchEvent(new Event('load')));await p.waitForTimeout(1500);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'})});
  const m=await p.evaluate(s=>{const e=document.querySelector(s),r=e.querySelector('.hb-wrap').getBoundingClientRect();
    const dig=[...e.querySelectorAll('.hbc-num')].map(n=>[...n.querySelectorAll('.hbc-sl')].map(sl=>sl.lastElementChild.textContent).join(''));
    const ba=e.querySelector('.bd-a'),ca=e.querySelector('.hbc-art'),pa=e.querySelector('.hb-part');return {ml:getComputedStyle(e).marginLeft,bd:[ba.clientWidth,ba.clientHeight,ba.style.backgroundSize],chip:[ca.clientWidth,ca.clientHeight],open:e.querySelector('.hb-open').offsetHeight,x:r.left,y:r.top+scrollY,w:r.width,h:r.height,dig,sr:e.querySelector('[data-sr]')?.textContent,sw:document.documentElement.scrollWidth,vw:innerWidth,
      lead:e.querySelector('.bd-c2 b')?.textContent,share:e.querySelector('.bd-c1 b')?.textContent,sub:e.querySelector('.hb-sub')?.textContent,
      anims:document.getAnimations().filter(a=>a.playState==='running'&&e.contains(a.effect&&a.effect.target)).length,
      smil:[...e.querySelectorAll('svg.bd-s')].map(s=>s.animationsPaused()),errs:[window.__x2pHbetErr,window.__x2pBdErr].filter(Boolean).map(String)}},sel);
  m.errors=er;res[W+'-'+pg]=m;console.log(W,pg,JSON.stringify(m));
  // a window taller than the section, the section's top scrolled to the window's top: one clip in window coordinates, no full-page resize
  await p.setViewportSize({width:W,height:Math.ceil(m.h)+40});await p.waitForTimeout(700);
  // the same sub-pixel y as X3+'s wrap (text and images rasterise by their fractional offset); a measuring aid only, not part of the drop-in
  if(pg==='x2'&&frac[W]!=null)await p.evaluate(([s,f])=>{const e=document.querySelector(s),y=e.querySelector('.hb-wrap').getBoundingClientRect().top+scrollY;let d=f-(y-Math.floor(y));e.style.position='relative';e.style.top=d+'px'},[sel,frac[W]]);
  const y=await p.evaluate(s=>{const w=document.querySelector(s).querySelector('.hb-wrap');window.scrollTo(0,Math.floor(w.getBoundingClientRect().top+scrollY));return w.getBoundingClientRect().top},sel);
  await p.waitForTimeout(500);
  if(pg==='x3')frac[W]=await p.evaluate(s=>{const y=document.querySelector(s).querySelector('.hb-wrap').getBoundingClientRect().top+scrollY;return y-Math.floor(y)},sel);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.setProperty('visibility','hidden','important')})});
  const gb=()=>p.evaluate(s=>{const r=document.querySelector(s).querySelector('.hb-wrap').getBoundingClientRect();return [r.top,r.height]},sel);
  let bb=await gb();for(let i=0;i<20;i++){await p.waitForTimeout(400);const b2=await gb();if(b2[0]===bb[0]&&b2[1]===bb[1])break;bb=b2}
  if(bb[0]<0||bb[0]>2){await p.evaluate(s=>{const w=document.querySelector(s).querySelector('.hb-wrap');scrollBy(0,Math.floor(w.getBoundingClientRect().top))},sel);await p.waitForTimeout(600);bb=await gb()}
  m.shotTop=bb[0];m.kids=await p.evaluate(s=>{const w=document.querySelector(s).querySelector('.hb-wrap'),t=w.getBoundingClientRect().top;return [...w.children].map(k=>+(k.getBoundingClientRect().top-t).toFixed(1)).join(' ')},sel);fs.writeFileSync(OUT+'/kids-'+W+'-'+pg+'.txt',m.kids);
  await p.screenshot({path:`${OUT}/sec-${W}-${pg}.png`,clip:{x:0,y:Math.max(0,bb[0]),width:W,height:bb[1]}});
  await ctx.close()}
 fs.writeFileSync(OUT+'/cmp.json',JSON.stringify(res,null,1));await b.close()})();
