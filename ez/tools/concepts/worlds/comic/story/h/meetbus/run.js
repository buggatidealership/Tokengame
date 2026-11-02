// node run.js W take(now|a|b|c) out.png [t ms frozen] : Meet the models with a meetbus take laid over the built X2+ (serve ez/ on 8951)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const [W,TK,OUT,TT]=[+process.argv[2],process.argv[3],process.argv[4],process.argv[5]];const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:+(process.env.DPR||2)});await FONTS(p);
 const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('section.c8 .c8-one'),null,{timeout:120000});
 await p.addStyleTag({content:'header.top,body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug){visibility:hidden!important}'});
 if(TK!=='now'){await p.evaluate(([t,tt])=>{window.__MB=t;if(tt)window.__MBT=+tt},[TK,TT]);await p.addStyleTag({content:rd('_mb.css')});await p.addScriptTag({content:rd('_mb.js')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('mb-ready'),null,{timeout:20000})}
 await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>{const s=document.querySelector('section.c8');scrollTo(0,s.getBoundingClientRect().top+scrollY-20)});
 await p.waitForTimeout(1800);if(TK!=='now'&&process.env.SEEK){const t=await p.evaluate(()=>{let best=0,bt=0;for(let t=0;t<60000;t+=100){const s=window.__mb.state(t);const lit=s.filter(x=>x.i>.5).length,mov=s.filter(x=>x.i>.5&&x.u<1&&x.u>.2).length,ok=s.some(x=>x.v==='ok'&&x.i>.5),no=s.some(x=>x.v==='no'&&x.i>.5);const sc=lit+mov*1.5+(ok&&no?2:0);if(sc>best){best=sc;bt=t}}window.__MBT=bt;return bt});console.log('t',t)}
 if(TK!=='now')await p.evaluate(()=>{window.__mb.layout();window.__mb.render(+window.__MBT)});await p.waitForTimeout(300);
 const m=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,geo:window.__mb&&JSON.stringify(window.__mb.geo().R)}));
 const s=await p.$('section.c8');await s.screenshot({path:OUT});console.log(OUT,JSON.stringify(m),errs.slice(0,3));await b.close()})();
