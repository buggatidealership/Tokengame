// node run.js [390x844|1536x864] [now] : the exhibition laid over the built X2+ page. Writes screens to OUT (default scratchpad-free ./shots)
// screens: s0..s4 = the first five screens of the scroll; r1..r5 = each room's wall (and the gift shop). Also prints checks.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const [VW,VH]=(process.argv[2]||'390x844').split('x').map(Number),NOW=process.argv[3]==='now',OUT=process.env.OUT||path.join(__dirname,'shots');
fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:VW<600?2:1});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
 const css=fs.readFileSync(path.join(__dirname,'gallery.css'),'utf8'),js=fs.readFileSync(path.join(__dirname,'gallery.js'),'utf8');
 if(!NOW)await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.id='we-css';s.textContent=c;document.head.appendChild(s);try{(new Function(j))()}catch(e){console.error(e)}})},[css,js]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 if(!NOW)await p.waitForFunction(()=>window.__weReady,null,{timeout:30000});
 await p.evaluate(()=>document.fonts.ready);
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(90)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);
 const tag=NOW?'now':'we';
 for(let i=0;i<5;i++){await p.evaluate(y=>scrollTo(0,y),i*(VH-60));await p.waitForTimeout(900);await p.screenshot({path:`${OUT}/${tag}-${VW}-s${i}.png`})}
 if(!NOW)for(const id of ['we-r0','we-r1','we-r2','we-r3','we-r4','we-r5']){await p.evaluate(id=>{const e=document.getElementById(id);scrollTo(0,e.getBoundingClientRect().top+scrollY-(id==='we-r0'?200:56))},id);await p.waitForTimeout(1100);await p.screenshot({path:`${OUT}/${tag}-${VW}-${id}.png`})}
 // checks
 const chk=await p.evaluate(()=>{const sw=document.documentElement.scrollWidth,vw=innerWidth;
  function lum(c){const m=c.match(/[\d.]+/g).map(Number);const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return [.2126*f(m[0])+.7152*f(m[1])+.0722*f(m[2]),m[3]==null?1:m[3]]}
  function bg(e){while(e){const s=getComputedStyle(e),c=s.backgroundColor;const m=c.match(/[\d.]+/g);if(m&&(m[3]==null||+m[3]>.5)&&s.backgroundImage==='none')return c;if(s.backgroundImage!=='none'&&e.classList.contains('we-room')){return s.backgroundColor}e=e.parentElement}return 'rgb(0,0,0)'}
  const bad=[];document.querySelectorAll('.we-show *, .we-wf *').forEach(e=>{if(e.closest('#record,.x2o-bet'))return;const t=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!t||!e.offsetParent)return;
   const s=getComputedStyle(e);const [l1]=lum(s.color),[l2]=lum(bg(e));const r=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);if(r<4.5)bad.push(e.className+'|'+e.textContent.trim().slice(0,30)+'|'+r.toFixed(2))});
  return {sw,vw,bad:bad.slice(0,12),H:document.documentElement.scrollHeight}});
 // films: the orientation film and the case in front
 const film=await p.evaluate(async()=>{const o={};const v=document.querySelector('.x2p-vt video');if(v){v.muted=true;try{await v.play()}catch(e){o.e1=e.message}await new Promise(r=>setTimeout(r,1500));o.orient=v.currentTime>0.3}
  const c=document.querySelector('#car .card.cur video');if(c){c.muted=true;try{await c.play()}catch(e){o.e2=e.message}await new Promise(r=>setTimeout(r,1500));o.round=c.currentTime>0.3}return o});
 console.log(tag,VW,er.join(' | ')||'no errors',JSON.stringify(chk),JSON.stringify(film));await b.close()})();
