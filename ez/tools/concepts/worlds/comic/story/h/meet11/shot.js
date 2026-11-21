// node shot.js <width> <take now|a|b|c|d> <layout col|grid> <out.png|-> [dpr] [rm]
// The built X2+ page (served from ez/ on PORT) with the meet11 take laid over Meet the models (m11.js + m11.css).
// Prints checks: page errors, sideways scroll, elements past the window's edge, and m11's own measure (sizes, overlaps, cap heights).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const path=require('path');
const PORT=process.env.PORT||8961;
(async()=>{const [Wd,T,LY,out,dpr,rm]=process.argv.slice(2);const w=+Wd;
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:w<760?844:900},deviceScaleFactor:+(dpr||2),reducedMotion:rm?'reduce':'no-preference'});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 const miss=[];p.on('response',r=>{if(r.status()>=400&&/meet11|chip12/.test(r.url()))miss.push(r.status()+' '+r.url())});
 await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.documentElement.classList.contains('m10-ready'),null,{timeout:120000});await p.waitForTimeout(600);
 if(T!=='now'){await p.evaluate(([t,l])=>{window.__M11T=t;window.__M11L=l;window.__M10T=0},[T,LY]);await p.addStyleTag({content:fs.readFileSync(path.join(__dirname,'m11.css'),'utf8')});
  await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'m11.js'),'utf8')});await p.waitForFunction(()=>document.documentElement.classList.contains('m11-ready')||window.__m11Err,null,{timeout:20000})}
 else await p.evaluate(()=>{window.__M10T=0;window.__m10&&window.__m10.render(0)});
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 await p.evaluate(()=>{const s=document.querySelector('section.c8');s.scrollIntoView();document.querySelectorAll('section.c8 video').forEach(v=>{v.pause();try{v.currentTime=1.2}catch(e){}})});await p.waitForTimeout(1500);
 await p.evaluate(()=>window.__m11&&window.__m11.layout&&window.__m11.layout());await p.waitForTimeout(700);
 const chk=await p.evaluate(()=>{const vw=document.documentElement.clientWidth,s=document.querySelector('section.c8');
  const over=[...s.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);return r.width&&(r.right>vw+.5||r.left<-.5)&&cs.position!=='fixed'&&!e.closest('.ch-sr,.m10-l,svg')&&cs.visibility!=='hidden'&&cs.display!=='none'}).slice(0,6).map(e=>(e.tagName+'.'+(e.getAttribute('class')||'')).slice(0,40)+'@'+Math.round(e.getBoundingClientRect().left)+'..'+Math.round(e.getBoundingClientRect().right));
  return {scrollW:document.documentElement.scrollWidth,vw,over,err:window.__m11Err?String(window.__m11Err):null,m:window.__m11&&window.__m11.measure?window.__m11.measure():null}});
 if(out!=='-'){await p.addStyleTag({content:'.x2p-cw,[class^="x2p-cw"],body>div:has(.x2p-cw-bug){display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if((ps==='fixed'||ps==='sticky')&&!x.closest('section.c8'))x.style.setProperty('opacity','0','important')})});
  const s=await p.$('section.c8');await s.screenshot({path:out});}
 console.log(JSON.stringify({w,T,LY,out:out&&path.basename(out),...chk,er,miss}));await b.close()})();
