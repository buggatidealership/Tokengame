// node check.js <width> <out.png|-> [dpr] [rm]  : the BUILT X2+ page as is (D2 ported into x2p_meet10.*), served from ez/ on PORT.
// Prints: page errors, every 4xx/5xx request, sideways scroll, the section's own measure (equal chips, joins, numerals) and the reduced-motion state.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const path=require('path');
const PORT=process.env.PORT||8961;
(async()=>{const [Wd,out,dpr,rm]=process.argv.slice(2);const w=+Wd;
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:w<760?844:900},deviceScaleFactor:+(dpr||2),reducedMotion:rm?'reduce':'no-preference'});
 const p=await ctx.newPage();await FONTS(p);const er=[],bad=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 p.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://127.0.0.1'))bad.push(r.status()+' '+r.url().replace(/^.*:\d+\//,''))});
 await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&(document.documentElement.classList.contains('m11-ready')||window.__m11Err),null,{timeout:120000});
 await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>{document.querySelector('section.c8').scrollIntoView()});await p.waitForTimeout(2500);
 const chk=await p.evaluate(()=>{const vw=document.documentElement.clientWidth,s=document.querySelector('section.c8');
  const over=[...s.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);return r.width&&(r.right>vw+.5||r.left<-.5)&&cs.position!=='fixed'&&!e.closest('.ch-sr,.m10-l,svg')&&cs.visibility!=='hidden'&&cs.display!=='none'}).slice(0,6).map(e=>(e.tagName+'.'+(e.getAttribute('class')||'')).slice(0,40)+'@'+Math.round(e.getBoundingClientRect().left)+'..'+Math.round(e.getBoundingClientRect().right));
  const imgs=[...s.querySelectorAll('.c8-four img.c7-base')].map(i=>i.currentSrc.replace(/^.*\//,''));
  const vids=[...s.querySelectorAll('video')].map(v=>v.paused);
  const glass=[...s.querySelectorAll('.c8-four img.c7-glass,.c8-four .c7-gl')].filter(e=>getComputedStyle(e).display!=='none').length;
  return {scrollW:document.documentElement.scrollWidth,vw,over,err:window.__m11Err?String(window.__m11Err):null,m:window.__m11.measure(),imgs,videosPaused:vids,glassShown:glass}});
 if(out!=='-'){await p.addStyleTag({content:'.x2p-cw,[class^="x2p-cw"],body>div:has(.x2p-cw-bug){display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if((ps==='fixed'||ps==='sticky')&&!x.closest('section.c8'))x.style.setProperty('opacity','0','important')})});
  await (await p.$('section.c8')).screenshot({path:out})}
 console.log(JSON.stringify({w,rm:!!rm,...chk,er,bad}));await b.close()})();
