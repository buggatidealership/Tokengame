// node run.js W strip(now|s1|s2) pnl(a|b) out.png [t ms frozen] : Meet the models with a meet10 take laid over the built X2+ (serve ez/ on 8963)
// SEEK=1 picks a moment with the most pulses landing, green and red both. Prints scrollWidth, the line fit per model and console errors.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const [W,ST,PN,OUT,TT]=[+process.argv[2],process.argv[3],process.argv[4],process.argv[5],process.argv[6]];const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:+(process.env.DPR||2)});await FONTS(p);
 const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('http://localhost:8963/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('section.c8 .c8-one'),null,{timeout:120000});
 await p.addStyleTag({content:'header.top,body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug){visibility:hidden!important}'});
 if(ST!=='now'){await p.evaluate(([s,pn,tt])=>{window.__M10S=s;window.__M10P=pn;if(tt)window.__M10T=+tt},[ST,PN,TT]);await p.addStyleTag({content:rd('_m10.css')});await p.addScriptTag({content:rd('_m10.js')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('m10-ready'),null,{timeout:20000})}
 await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>{const s=document.querySelector('section.c8');scrollTo(0,s.getBoundingClientRect().top+scrollY-20)});
 await p.waitForTimeout(1800);
 if(ST!=='now'){await p.evaluate(()=>window.__m10.layout());await p.waitForTimeout(300);
  if(process.env.SEEK){const t=await p.evaluate(()=>{let best=-1,bt=0;for(let t=0;t<60000;t+=100){const s=window.__m10.state(t);const land=s.filter(x=>x.land>.55).length,mov=s.filter(x=>x.i>.5&&x.u<1&&x.u>.25).length,ok=s.some(x=>x.v==='ok'&&(x.land>.5||x.i>.5)),no=s.some(x=>x.v==='no'&&(x.land>.5||x.i>.5));const sc=land*1.4+mov+(ok&&no?2:0);if(sc>best){best=sc;bt=t}}window.__M10T=bt;return bt});console.log('t',t)}
  await p.evaluate(()=>window.__m10.render(+window.__M10T));await p.waitForTimeout(250)}
 const m=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,fit:window.__m10&&window.__m10.fit,
   st:window.__m10&&window.__M10T!=null?window.__m10.state(+window.__M10T):null,
   chip:[...document.querySelectorAll('section.c8 .c8-one .c7-pic')].map(e=>Math.round(e.getBoundingClientRect().width)),
   over:[...document.querySelectorAll('section.c8 *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+1&&getComputedStyle(e).position!=='fixed'}).length}));
 const s=await p.$('section.c8');await s.screenshot({path:OUT});console.log(OUT,JSON.stringify(m),errs.slice(0,3));await b.close()})();
