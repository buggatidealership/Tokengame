// node run.js A,B,C [390,1280] [roi,hit,miss,sector] [sim|real]   (OUT=dir; DPR=2)
// Shots of the proof card for each take and view on the built X2+ page, plus checks (sideways scroll, errors, overflow).
// sim = "now" is Wed 28 Oct 2026 17:00 New York (after R54 to R57 graded at that day's close); real = the clock.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const T=(process.argv[2]||'A').split(','),WS=(process.argv[3]||'390').split(',').map(Number),VS=(process.argv[4]||'roi,hit,miss,sector').split(','),MODE=process.argv[5]||'sim';
const OUT=process.env.OUT||'.',DPR=+(process.env.DPR||2);const SIM=Date.UTC(2026,9,28,21,0);
const rd=f=>fs.readFileSync(path.join(__dirname,f),'utf8');
(async()=>{const b=await chromium.launch();for(const t of T)for(const w of WS){const p=await b.newPage({viewport:{width:w,height:w<600?844:900},deviceScaleFactor:DPR});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/favicon|Failed to load resource/.test(m.text()))er.push(m.text())});
 const css=t==='now'?'':rd('_base.css')+(fs.existsSync(path.join(__dirname,t+'.css'))?rd(t+'.css'):''),js=t==='now'?'':rd('_base.js');
 await p.addInitScript(([c,j,tk,now])=>{window.__pr2Take=tk;if(now)window.__pr2Now=now;if(!j)return;try{(new Function(j))()}catch(e){console.error(e)}
  document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.id='pr2-mock';s.textContent=c;document.head.appendChild(s)})},[css,js,t,MODE==='sim'?SIM:0]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.evaluate(()=>document.getElementById('learn').scrollIntoView());await p.waitForTimeout(2500);
 for(const v of VS){await p.evaluate(v=>{const b=document.querySelector('#learn .pt-tb [data-pt="'+v+'"]');if(b&&b.getAttribute('aria-pressed')!=='true')b.click()},v);await p.waitForTimeout(1600);
  const m=await p.evaluate(()=>{const pt=document.querySelector('#learn .x2p-pt'),cd=pt.querySelector('.pt-cd'),C=cd.getBoundingClientRect(),out=[];
   pt.querySelectorAll('.pt-in *').forEach(e=>{if(!e.getClientRects().length||e.closest('.sr,svg'))return;const r=e.getBoundingClientRect();if(r.width<1)return;
    if(r.right>C.right-2||r.left<C.left+2)out.push('x:'+e.className.toString().slice(0,24)+' '+Math.round(r.left-C.left)+'-'+Math.round(r.right-C.left));
    if(/pt-v|pt-c|pt-nm|pr2-q|pt-lb/.test(e.className)&&(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible'))out.push('clip:'+e.className)});
   const q=cd.querySelector('.pr2-q');if(q&&q.scrollHeight>q.clientHeight+1)out.push('q overflows '+q.scrollHeight+'>'+q.clientHeight);
   const rows=[...cd.querySelectorAll('.pt-r')].map(r=>[...r.children].map(c=>c.textContent.trim()).join(' | '));
   return {sw:document.documentElement.scrollWidth,iw:innerWidth,h:Math.round(C.height),q:q&&q.textContent,out:out.slice(0,8),rows,err:window.__pr2Err||window.__x2pPtErr||window.__x2pTixErr||''}});
  console.log(t,w,v,er.join('|')||'ok',JSON.stringify(m));if(process.env.DBG)console.log('vis',await p.evaluate(()=>getComputedStyle(document.documentElement).visibility+' '+[...document.styleSheets].length));
  await p.evaluate(()=>{const s=document.createElement('style');s.id='pr2-hide';s.textContent='header.top,.x2p-vmini{visibility:hidden!important}';document.head.appendChild(s)});
  const r=await p.evaluate(()=>{const e=document.querySelector('#learn .x2p-pt');e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return {x:r.left,y:r.top,w:r.width,h:r.height}});await p.waitForTimeout(1800);
  const r2=await p.evaluate(()=>{const r=document.querySelector('#learn .x2p-pt').getBoundingClientRect();const e=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return {x:r.left,y:r.top,w:r.width,h:r.height,hit:e&&e.tagName+'.'+String(e.className).slice(0,40),sy:scrollY,st:document.documentElement.getAttribute('style'),anc:(()=>{let a=document.querySelector('#learn .x2p-pt'),o=[];while(a){const c=getComputedStyle(a);if(c.visibility!=='visible'||c.opacity!=='1')o.push(a.tagName+'.'+String(a.className).slice(0,30)+':'+c.visibility+c.opacity);a=a.parentElement}return o.join(' | ')})()}});
  if(process.env.DBG)console.log(JSON.stringify(r2));await p.screenshot({path:`${OUT}/pr2-${t}-${w}-${v}-${MODE}.png`,clip:{x:Math.max(0,r2.x-10),y:Math.max(0,r2.y-12),width:Math.min(w-Math.max(0,r2.x-10),r2.w+22),height:r2.h+26}});
  await p.evaluate(()=>{const s=document.getElementById('pr2-hide');if(s)s.remove()})}
 await p.close()}await b.close()})();
