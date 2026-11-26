// node check.js: (1) v46 with no drop-in: which 404s are X2+'s own; (2) v46 + drop-in with motion on and the real clock, beside v47 open at the
// same time: digits read in the same second, animations running on screen, held off screen; errors and scrollWidth at 320/390/1280.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
async function open(b,W,pg,drop,rm){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},reducedMotion:rm?'reduce':'no-preference'});const p=await ctx.newPage();await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push('E '+e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c '+m.text().slice(0,120))});p.on('response',r=>{if(r.status()>=400)er.push(r.status()+' '+r.url().slice(-40))});
 await p.goto('http://localhost:8954/'+pg,{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 if(drop){await p.addStyleTag({content:rd('x2p_bet.css')});await p.addScriptTag({content:rd('x2p_bet.js')})}
 const sel=pg.includes('v47')?'.wc-bet':'#x2pSt';
 if(drop||pg.includes('v47'))await p.waitForFunction(()=>document.documentElement.classList.contains('bd-ready'),null,{timeout:60000});
 await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),sel);await p.waitForTimeout(2500);return {p,er,sel,ctx}}
const dig=(p,s)=>p.evaluate(s=>[...document.querySelectorAll(s+' .hbc-num')].map(n=>[...n.querySelectorAll('.hbc-sl')].map(x=>x.lastElementChild.textContent).join('')).join(':'),s);
(async()=>{const b=await chromium.launch();const out={};
 const a=await open(b,390,'v46-live-x2plus.html',false,false);out.plain404=a.er;await a.ctx.close();
 for(const W of [320,390,1280]){const x3=await open(b,W,'v47-live-x3plus.html',false,false),x2=await open(b,W,'v46-live-x2plus.html',true,false);
  const pairs=[];for(let i=0;i<4;i++){await x2.p.waitForTimeout(1000-(Date.now()%1000)+300);pairs.push([await dig(x3.p,x3.sel),await dig(x2.p,x2.sel)])}
  const on=await x2.p.evaluate(()=>({sw:document.documentElement.scrollWidth,vw:innerWidth,lv:document.querySelectorAll('#x2pSt .hb-lv').length,smilPaused:document.querySelector('#x2pSt svg.bd-s').animationsPaused()}));
  await x2.p.evaluate(()=>scrollTo(0,0));await x2.p.waitForTimeout(1500);
  const off=await x2.p.evaluate(()=>({lv:document.querySelectorAll('#x2pSt .hb-lv').length,smilPaused:document.querySelector('#x2pSt svg.bd-s').animationsPaused()}));
  const d0=await dig(x2.p,'#x2pSt');await x2.p.waitForTimeout(2200);const d1=await dig(x2.p,'#x2pSt');
  out[W]={pairs,equal:pairs.every(q=>q[0]===q[1]),onScreen:on,offScreen:off,offTicks:d0!==d1,errX2:x2.er,errX3:x3.er};await x3.ctx.close();await x2.ctx.close()}
 console.log(JSON.stringify(out,null,1));fs.writeFileSync(process.argv[2]||'/dev/null',JSON.stringify(out,null,1));await b.close()})();
