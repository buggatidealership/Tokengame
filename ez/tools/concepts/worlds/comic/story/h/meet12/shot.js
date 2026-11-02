// node shot.js <width> <take now|a|b|c|d> <out.png|-> [dpr] [rm] : the built X2+ page (D2 live) with the meet12 take laid over (m12.js + m12.css).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const path=require('path');
const PORT=process.env.PORT||8961;
(async()=>{const [Wd,T,out,dpr,rm]=process.argv.slice(2);const w=+Wd;
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:w<760?844:900},deviceScaleFactor:+(dpr||2),reducedMotion:rm?'reduce':'no-preference'});
 const p=await ctx.newPage();await FONTS(p);const er=[],bad=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 p.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://127.0.0.1'))bad.push(r.status()+' '+r.url().replace(/^.*:\d+\//,''))});
 await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.documentElement.classList.contains('m11-ready'),null,{timeout:120000});await p.waitForTimeout(500);
 if(T!=='now'){await p.evaluate(t=>{window.__M12T=t;window.__M10T=0},T);await p.addStyleTag({content:fs.readFileSync(path.join(__dirname,'m12.css'),'utf8')});
  await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'m12.js'),'utf8')});await p.waitForFunction(()=>document.documentElement.classList.contains('m12-ready')||window.__m12Err,null,{timeout:20000})}
 else await p.evaluate(()=>{window.__M10T=0});
 await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>{const s=document.querySelector('section.c8');s.scrollIntoView();document.querySelectorAll('section.c8 video').forEach(v=>{v.pause();try{v.currentTime=1.2}catch(e){}})});await p.waitForTimeout(2200);
 await p.evaluate(()=>{window.__m12?window.__m12.apply():window.__m11.layout()});await p.waitForTimeout(800);
 const chk=await p.evaluate(()=>{const vw=document.documentElement.clientWidth,s=document.querySelector('section.c8');
  const over=[...s.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);return r.width&&(r.right>vw+.5||r.left<-.5)&&cs.position!=='fixed'&&!e.closest('.ch-sr,.m10-l,svg')&&cs.visibility!=='hidden'&&cs.display!=='none'}).slice(0,6).map(e=>(e.tagName+'.'+(e.getAttribute('class')||'')).slice(0,40)+'@'+Math.round(e.getBoundingClientRect().left)+'..'+Math.round(e.getBoundingClientRect().right));
  return {scrollW:document.documentElement.scrollWidth,vw,over,err:window.__m12Err?String(window.__m12Err):null,m:window.__m12?window.__m12.measure():window.__m11.measure()}});
 if(out!=='-'){await p.addStyleTag({content:'.x2p-cw,[class^="x2p-cw"],body>div:has(.x2p-cw-bug){display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if((ps==='fixed'||ps==='sticky')&&!x.closest('section.c8'))x.style.setProperty('opacity','0','important')})});
  await (await p.$('section.c8')).screenshot({path:out})}
 console.log(JSON.stringify({w,T,...chk,er,bad}));await b.close()})();
