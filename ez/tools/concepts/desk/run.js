// node run.js A,B [1536x730,1280x720,1920x940] : full-page and first-screen shots of each take on the built X2+ page
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const T=(process.argv[2]||'A').split(','),V=(process.argv[3]||'1536x730').split(',').map(s=>s.split('x').map(Number)),OUT=process.env.OUT||'.';
(async()=>{const b=await chromium.launch();for(const t of T)for(const [w,h] of V){const p=await b.newPage({viewport:{width:w,height:h}});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 const css=t==='now'?'':t.split('+').map(k=>fs.readFileSync(path.join(__dirname,k+'.css'),'utf8')).join('\n');const js=t==='now'?'':t.split('+').map(k=>{const f=path.join(__dirname,k+'.js');return fs.existsSync(f)?fs.readFileSync(f,'utf8'):''}).join('\n');
 const BASE=t.split('+')[0]==='A'||t==='now'?'':fs.readFileSync(path.join(__dirname,'A.css'),'utf8');
 await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.id='desk-mock';s.textContent=c;document.head.appendChild(s);if(j)try{(new Function(j))()}catch(e){console.error(e)}})},[BASE+css,js]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(150)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);
 const m=await p.evaluate(()=>({H:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth,secs:['standings','record','learn','highlights','x2pSt','get'].map(i=>{const e=document.getElementById(i),r=e.getBoundingClientRect();return i+':'+Math.round(r.left)+','+Math.round(r.top+scrollY)+' '+Math.round(r.width)+'x'+Math.round(r.height)}),
   over:[...document.querySelectorAll('main.wrap section *')].filter(e=>{if(!e.offsetParent)return false;const s=e.closest('main.wrap>section'),r=e.getBoundingClientRect(),q=s.getBoundingClientRect();return r.width>4&&(r.right>q.right+2||r.left<q.left-2)&&!e.closest('.x2p-hlt,.car,.ls-tr,.bs-clip,.x2p-hlc')}).slice(0,6).map(e=>e.tagName+'.'+e.className.toString().slice(0,30))}));
 console.log(t,w+'x'+h,er.join('|')||'ok',JSON.stringify(m));
 await p.screenshot({path:`${OUT}/desk-${t}-${w}-top.png`});
 // full page: the screenshot tool's own resize re-centres the record on the wrong card, so keep each carousel where it was
 const keep=await p.evaluate(()=>[...document.querySelectorAll('#car,.x2p-hlt')].map(e=>e.scrollLeft));
 await p.setViewportSize({width:w,height:m.H});await p.waitForTimeout(900);
 await p.evaluate(k=>{[...document.querySelectorAll('#car,.x2p-hlt')].forEach((e,i)=>{e.style.scrollBehavior='auto';e.scrollLeft=k[i]})},keep);await p.waitForTimeout(900);
 await p.screenshot({path:`${OUT}/desk-${t}-${w}-full.png`});await p.close()}await b.close()})();
