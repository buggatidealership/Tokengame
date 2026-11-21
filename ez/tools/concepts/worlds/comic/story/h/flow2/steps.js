// node steps.js <width> <take> <order> <outprefix> [dpr] : viewport shots at each of the take's stops (window.__f2stops())
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const PORT=process.env.PORT||8995;
(async()=>{const [W,T,O,out,dpr]=process.argv.slice(2);const w=+W;const rd=f=>{const p=path.join(__dirname,f);return fs.existsSync(p)?fs.readFileSync(p,'utf8'):''};
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:w<760?(w<360?640:844):900},deviceScaleFactor:+(dpr||2),reducedMotion:process.env.RM?'reduce':'no-preference'});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
 await p.evaluate(([t,o])=>{window.__F2T=t;window.__F2O=o},[T,O]);
 await p.addStyleTag({content:rd('_f2.css')+rd(T+'.css')+'\n'});await p.addScriptTag({content:rd('_f2.js')+rd(T+'.js')});
 await p.waitForFunction(()=>window.__f2done,null,{timeout:20000}).catch(()=>er.push('no __f2done'));
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);await p.evaluate(()=>window.__f2place());await p.waitForTimeout(600);
 const stops=await p.evaluate(()=>window.__f2stops?window.__f2stops():[]);const res=[];
 for(let i=0;i<stops.length;i++){await p.evaluate(y=>scrollTo(0,y),stops[i]);await p.waitForTimeout(+(process.env.WAIT||900));
  if(process.env.SEQ){await p.evaluate(i=>window.__f2seq&&window.__f2seq(i),i);await p.waitForTimeout(+(process.env.SEQ))}
  const chk=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,vw:document.documentElement.clientWidth,clip:[...document.querySelectorAll('.f2 .f2-say,.f2 .f2-fact')].filter(e=>e.offsetParent&&e.scrollWidth>e.clientWidth+1).length,f2err:window.__f2err||null}));
  const f=`${out}-${i+1}.png`;await p.screenshot({path:f});res.push({f,y:stops[i],...chk})}
 console.log(JSON.stringify({w,T,O,res,er}));await b.close()})();
