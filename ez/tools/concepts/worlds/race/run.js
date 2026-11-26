// node run.js [now|race] [390x844|1536x864] : the first screens of the Overview with the race-day world injected, plus checks.
// OUT=dir (default: the scratchpad), CLOCK=ISO time for Date (default 2026-10-29T17:09:00Z, 1:09 pm in New York; CLOCK=real for the real time).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const T=(process.argv[2]||'race'),[VW,VH]=(process.argv[3]||'390x844').split('x').map(Number);
const OUT=process.env.OUT||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/race';fs.mkdirSync(OUT,{recursive:true});
const CLOCK=process.env.CLOCK||'2026-10-29T17:09:00Z',N=+(process.env.N||(VW<600?5:3));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:VW<600?2:1});await FONTS(p);
 if(CLOCK!=='real')await p.clock.setFixedTime(new Date(CLOCK));
 const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console: '+m.text())});
 const css=T==='now'?'':fs.readFileSync(path.join(__dirname,'race.css'),'utf8'),js=T==='now'?'':fs.readFileSync(path.join(__dirname,'race.js'),'utf8');
 await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.id='wr-css';s.textContent=c;document.head.appendChild(s);if(j)try{(new Function(j))()}catch(e){console.error(e)}})},[css,js]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(120)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(2500);
 const hdr=await p.evaluate(()=>document.querySelector('header.top').getBoundingClientRect().height);const step=Math.round(VH-hdr);
 for(let i=0;i<N;i++){await p.evaluate(y=>scrollTo(0,y),i*step);await p.waitForTimeout(1400);await p.screenshot({path:`${OUT}/${T}-${VW}-${i+1}.png`})}
 // checks: sideways scroll, contrast of this world's text, films
 const chk=await p.evaluate(()=>{const L=c=>{const m=c.match(/[\d.]+/g).map(Number);const f=x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4)};return [.2126*f(m[0])+.7152*f(m[1])+.0722*f(m[2]),m[3]==null?1:m[3]]};
  const bgOf=e=>{for(let n=e;n;n=n.parentElement){const s=getComputedStyle(n);const c=s.backgroundColor;if(c&&!/rgba\(0, 0, 0, 0\)|transparent/.test(c)){const a=L(c);if(a[1]>.6)return [a[0],n]}if(s.backgroundImage!=='none'&&/wr-races|wr-paper|wr-lane/.test(n.className))return [n.className.includes('wr-lane')?L('rgb(20,62,38)')[0]:L('rgb(244,236,214)')[0],n]}return [L('rgb(11,36,22)')[0],null]};
  const bad=[];document.querySelectorAll('[id^=wr-] *, .wr-bs *, .wr-rh *').forEach(e=>{if(!e.childNodes.length||![...e.childNodes].some(n=>n.nodeType==3&&n.textContent.trim()))return;if(e.closest('svg')&&!e.closest('foreignObject'))return;if(!e.offsetParent&&getComputedStyle(e).position!=='fixed')return;if(e.closest('.wr-sr'))return;
   const fg=L(getComputedStyle(e).color)[0],bg=bgOf(e)[0],r=(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05);if(r<4.5)bad.push(e.tagName+'.'+e.className+' "'+e.textContent.trim().slice(0,24)+'" '+r.toFixed(2))});
  const vt=document.querySelector('.x2p-vt video');return {sw:document.documentElement.scrollWidth,iw:innerWidth,H:document.documentElement.scrollHeight,bad:bad.slice(0,20),nbad:bad.length,err:window.__wrErr&&String(window.__wrErr),vt:!!vt}});
 // the explainer film: tap play and see it roll; the record's front film: scroll to it and see it roll
 const film=await p.evaluate(async()=>{const v=document.querySelector('.x2p-vt video'),b=document.querySelector('.x2p-vt .vt-play');v.scrollIntoView({block:'center'});await new Promise(r=>setTimeout(r,600));
  (b||v).click();await new Promise(r=>setTimeout(r,3500));const a=v.currentTime;v.pause();
  document.getElementById('car').scrollIntoView({block:'center'});await new Promise(r=>setTimeout(r,4000));
  const cv=[...document.querySelectorAll('#car .card.cur video, #car video')].find(x=>!x.paused)||document.querySelector('#car .card.cur video');const c1=cv?cv.currentTime:-1;await new Promise(r=>setTimeout(r,1500));
  return {explainer:a.toFixed(2),explainerSrc:(v.currentSrc||'').split('/').pop(),record:cv?[c1.toFixed(2),cv.currentTime.toFixed(2),(cv.currentSrc||'').split('/').pop()]:null}});
 console.log(T,VW+'x'+VH,'errors:',er.join(' | ')||'none',JSON.stringify(chk),JSON.stringify(film));await b.close()})();
