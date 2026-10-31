// node run.js [now|arcade] [390x844|1536x864] [screens]  -> OUT/arc-<take>-<w>-<i>.png, plus checks (errors, sideways scroll, contrast, film play)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const T=process.argv[2]||'arcade',[VW,VH]=(process.argv[3]||'390x844').split('x').map(Number),N=+(process.argv[4]||(VW<600?5:3)),OUT=process.env.OUT||'.';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:VW<600?2:1});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console: '+m.text())});
 const css=T==='now'?'':fs.readFileSync(path.join(__dirname,'arcade.css'),'utf8'),js=T==='now'?'':fs.readFileSync(path.join(__dirname,'arcade.js'),'utf8');
 await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.id='wa-css';s.textContent=c;document.head.appendChild(s);if(j)try{(new Function(j))()}catch(e){console.error(e)}})},[css,js]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.evaluate(()=>document.fonts.ready);
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(90)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);
 const hdr=await p.evaluate(()=>{const h=document.querySelector('header.top');return h&&getComputedStyle(h).position==='sticky'?h.getBoundingClientRect().height:0});
 const step=VH-hdr-24;
 const ids=VW>=1000?[null,'waSelect','waTrain']:null;
 for(let i=0;i<N;i++){if(ids)await p.evaluate(id=>{if(!id)return scrollTo(0,0);const e=document.getElementById(id);scrollTo(0,e.getBoundingClientRect().top+scrollY-64)},ids[i]);else await p.evaluate(y=>scrollTo(0,y),i*step);await p.waitForTimeout(i?1400:600);await p.screenshot({path:`${OUT}/arc-${T}-${VW}-${i}.png`})}
 const chk=await p.evaluate(()=>{
   const lum=c=>{const m=c.match(/[\d.]+/g);if(!m)return null;const [r,g,b,a]=m.map(Number);if(a===0)return null;return [r,g,b].map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0)};
   const bgOf=e=>{for(let x=e;x;x=x.parentElement){const s=getComputedStyle(x);const m=s.backgroundColor.match(/[\d.]+/g);if(m&&(m[3]===undefined||+m[3]>.5))return s.backgroundColor}return 'rgb(8,7,14)'};
   const bad=[];document.querySelectorAll('[class^="wa-"],[class*=" wa-"]').forEach(e=>{if(!e.offsetParent)return;const t=[...e.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).map(n=>n.textContent.trim()).join(' ');if(!t)return;
     const s=getComputedStyle(e);const L1=lum(s.color),L2=lum(bgOf(e));if(L1==null||L2==null)return;const r=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05)*(+s.opacity||1);if(r<4.5)bad.push(e.className+' "'+t.slice(0,24)+'" '+r.toFixed(2)+' '+s.color+' on '+bgOf(e))});
   return {sw:document.documentElement.scrollWidth,w:innerWidth,err:window.__waErr&&String(window.__waErr),bad:bad.slice(0,25)}});
 // the explainer film
 const film=await p.evaluate(async()=>{const v=document.querySelector('.x2p-vt video');if(!v)return 'no film';v.scrollIntoView({block:'center'});const btn=document.querySelector('.x2p-vt .vt-play');if(btn)btn.click();await new Promise(r=>setTimeout(r,3500));return 'explainer t='+v.currentTime.toFixed(2)+' paused='+v.paused+' src='+(v.currentSrc||'').split('/').pop()});
 const rf=await p.evaluate(async()=>{const ex=document.querySelector('.x2p-vt video');if(ex)ex.pause();const rr=document.getElementById('record');rr.scrollIntoView({block:'start'});await new Promise(r=>setTimeout(r,1500));const c=[...document.querySelectorAll('#car video')].find(v=>{const r=v.getBoundingClientRect();return r.width>0&&r.top<innerHeight&&r.bottom>0});if(!c)return 'no round film';c.scrollIntoView({block:'center'});c.muted=true;try{c.play()}catch(e){}await new Promise(r=>setTimeout(r,2500));return 'round t='+c.currentTime.toFixed(2)+' '+(c.currentSrc||'').split('/').pop()});
 console.log(T,VW,'errors:',er.join(' | ')||'none',JSON.stringify(chk),film,rf);
 await b.close()})();
