// node shot.js <width> <take now|A|B|C|...> <order today|friend> <out.png> [dpr]
// The built X2+ page (served on PORT, default 8995) with a flow2 take laid over it: _f2.css + <take>.css, _f2.js + <take>.js.
// Shoots from the page top to the foot of Meet the models (or the frames section, whichever ends later) as one tall png.
// Prints checks: page errors, sideways scroll, elements past the right edge, text overflowing its box inside the take.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const path=require('path');
const PORT=process.env.PORT||8995;
(async()=>{const [W,T,O,out,dpr]=process.argv.slice(2);const w=+W;const rd=f=>{const p=path.join(__dirname,f);return fs.existsSync(p)?fs.readFileSync(p,'utf8'):''};
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:w<760?844:900},deviceScaleFactor:+(dpr||2),reducedMotion:process.env.RM?'reduce':'no-preference'});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
 await p.evaluate(([t,o])=>{window.__F2T=t;window.__F2O=o},[T,O]);
 await p.addStyleTag({content:rd('_f2.css')+rd(T+'.css')+'\n'});await p.addScriptTag({content:rd('_f2.js')+rd(T+'.js')});
 await p.waitForFunction(()=>window.__f2done,null,{timeout:20000}).catch(()=>er.push('no __f2done'));
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 await p.evaluate(()=>window.__f2place&&window.__f2place());await p.waitForTimeout(900);
 // reveal everything that reveals on scroll
 if(!process.env.NOREVEAL)await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});
 await p.waitForTimeout(1600);
 const chk=await p.evaluate(()=>{const vw=document.documentElement.clientWidth;const root=document.querySelector('.f2');
  const over=[...document.querySelectorAll('.f2, .f2 *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>vw+1&&getComputedStyle(e).position!=='fixed'&&!e.closest('svg')}).slice(0,5).map(e=>(e.tagName+'.'+(e.getAttribute('class')||'')).slice(0,40)+'@'+Math.round(e.getBoundingClientRect().right));
  const clip=[...document.querySelectorAll('.f2 .f2-t, .f2 .f2-l, .f2 .f2-k, .f2 h2, .f2 h3, .f2 p')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>(e.getAttribute('class')||e.tagName).slice(0,30)).slice(0,5);
  return {scrollW:document.documentElement.scrollWidth,vw,over,clip,err:window.__x2pTopErr?String(window.__x2pTopErr):null,f2err:window.__f2err||null}});
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.visibility='hidden'})});
 const y=await p.evaluate(()=>{const e=Math.max(...[...document.querySelectorAll('section.ch,section.t4')].map(s=>s.getBoundingClientRect().bottom))+scrollY;return Math.round(e+10)});
 if(process.env.FROM==='b2'){const m=()=>p.evaluate(()=>{const a=document.querySelector('.t4-b2').getBoundingClientRect(),c=document.querySelector('.t4-b3').getBoundingClientRect();return [Math.round(a.top+scrollY-40),Math.round(c.bottom+scrollY+16)]});
  let [y0,y1]=await m();await p.setViewportSize({width:w,height:y1-y0});await p.waitForTimeout(700);await p.evaluate(()=>window.__f2place());await p.waitForTimeout(500);
  [y0,y1]=await m();await p.evaluate(v=>scrollTo(0,v),y0);await p.waitForTimeout(600);[y0,y1]=await m();
  const sy=await p.evaluate(()=>scrollY);await p.screenshot({path:out,timeout:120000,clip:{x:0,y:y0-sy,width:w,height:Math.min(y1-y0,(await p.viewportSize()).height-(y0-sy))}})}
 else await p.screenshot({path:out,fullPage:true,timeout:120000,clip:{x:0,y:0,width:w,height:y}});
 console.log(JSON.stringify({out,w,T,O,...chk,h:y,er}));await b.close()})();
