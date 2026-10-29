// node run.js [390x844,1536x864] : the hub Overview mockup laid over the built X2+ page (hub.css + hub.js injected before the page's own
// scripts run), screens of the scroll at 2x, a full page on desktop, and the checks (errors, sideways scroll, boxes running out of their box).
// OUT=<dir> (default: the scratchpad). Boards: python3 board.py <OUT>.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const V=(process.argv[2]||'390x844,1536x864').split(',').map(s=>s.split('x').map(Number));
const OUT=process.env.OUT||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/hub/out';fs.mkdirSync(OUT,{recursive:true});
const CSS=fs.readFileSync(path.join(__dirname,'hub.css'),'utf8'),JS=fs.readFileSync(path.join(__dirname,'hub.js'),'utf8'),NOW=process.env.NOW==='0';
(async()=>{const b=await chromium.launch();for(const [w,h] of V){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:Number(process.env.DPR||2)});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
 if(!NOW)await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.id='hub-mock';s.textContent=c;document.head.appendChild(s);try{(new Function(j))()}catch(e){console.error(e)}})},[CSS,JS]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForFunction(()=>window.__hubModel&&window.__hubModel(),null,{timeout:30000}).catch(()=>er.push('hub not built'));
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(110)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1800);
 const m=await p.evaluate(()=>{const de=document.documentElement,over=[];
  document.querySelectorAll('.hub-bug *,#hubTn *,.hub-resw *,.hub-gow *').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||getComputedStyle(e).visibility==='hidden')return;
   if(e.classList&&e.classList.contains('bt-rake'))return;const box=e.closest('.hub-cn,.hub-f,.hub-ur,.hub-uh,.hub-al,.hub-bb,.hub-bs,.hub-bn,.bt-p,.hub-gp');if(!box||box===e)return;const q=box.getBoundingClientRect();
   if(r.right>q.right+1||r.left<q.left-1)over.push((e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className)+'|'+e.tagName+' in '+box.className.split(' ')[0]+' '+Math.round(r.right-q.right))});
  const clip=[...document.querySelectorAll('.hub-nm,.hub-uco b,.hub-al b,.hub-an,.hub-bg,.hub-gt small')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent);
  const M=window.__hubModel(),secs=[...document.querySelectorAll('main.wrap>section')].filter(s=>s.offsetHeight).map(s=>(s.id||s.className.split(' ')[0])+'@'+Math.round(s.getBoundingClientRect().top+scrollY));
  return {sw:de.scrollWidth,cw:de.clientWidth,H:de.scrollHeight,over:over.slice(0,12),clip,secs,tn:M&&M.TN.map(u=>u.n+' '+u.co),lb:M&&M.LB.map(u=>u.n+' '+u.co)}});
 console.log(w+'x'+h,er.join(' | ')||'no errors',JSON.stringify(m));
 const tag=NOW?'now-':'';
 if(w<1200){let y=0;const hh=await p.evaluate(()=>document.querySelector('header.top').getBoundingClientRect().height);
  for(let i=0;i<6;i++){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(900);await p.screenshot({path:`${OUT}/${tag}p${w}-${i}.png`});y+=h-hh-24}}
 else{await p.screenshot({path:`${OUT}/${tag}d${w}-top.png`});
  for(const [k,sel] of [['b','#hubTn .hub-card'],['c','#record']]){await p.evaluate(s=>{const e=document.querySelector(s);scrollTo(0,e.getBoundingClientRect().top+scrollY-90)},sel);await p.waitForTimeout(1200);await p.screenshot({path:`${OUT}/${tag}d${w}-${k}.png`})}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(600);
  const keep=await p.evaluate(()=>[...document.querySelectorAll('#car,.x2p-hlt')].map(e=>e.scrollLeft));
  await p.setViewportSize({width:w,height:m.H});await p.waitForTimeout(900);
  await p.evaluate(k=>{[...document.querySelectorAll('#car,.x2p-hlt')].forEach((e,i)=>{e.style.scrollBehavior='auto';e.scrollLeft=k[i]})},keep);await p.waitForTimeout(900);
  await p.screenshot({path:`${OUT}/${tag}d${w}-full.png`})}
 await p.close()}await b.close()})();
