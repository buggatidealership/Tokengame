// node run.js [390x844|1536x864] [now] : screens of the forecast world (OUT=dir). Checks console errors, sideways scroll, the films.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const [VW,VH]=(process.argv[2]||'390x844').split('x').map(Number),NOW=process.argv[3]==='now',OUT=process.env.OUT||'.',N=+(process.env.N||(VW<600?5:3));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:2});await FONTS(p);const er=[];
 p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console: '+m.text())});
 const css=NOW?'':fs.readFileSync(path.join(__dirname,'forecast.css'),'utf8'),js=NOW?'':fs.readFileSync(path.join(__dirname,'forecast.js'),'utf8');
 await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.id='wf-css';s.textContent=c;document.head.appendChild(s);if(j)try{(new Function(j))()}catch(e){console.error(e)}})},[css,js]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(120)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(2500);
 const hh=await p.evaluate(()=>document.querySelector('header.top').getBoundingClientRect().height);const step=VH-Math.round(hh)-24;
 for(let k=0;k<N;k++){await p.evaluate(y=>scrollTo(0,y),k*step);await p.waitForTimeout(1200);await p.screenshot({path:`${OUT}/wf-${VW}-${k+1}.png`})}
 const sw=await p.evaluate(()=>[document.documentElement.scrollWidth,innerWidth,document.documentElement.scrollHeight]);
 console.log(VW,'scrollWidth/innerWidth/height',sw.join('/'),'errors:',er.join(' | ')||'none');
 if(process.env.CHECK){ // contrast of every text node in the world against the lightest sky behind it, and the films
  const c=await p.evaluate(()=>{function rgb(s){const m=s.match(/[\d.]+/g).map(Number);return{r:m[0],g:m[1],b:m[2],a:m[3]==null?1:m[3]}}
   function L(c){const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b)}
   function over(a,b){return{r:a.r*a.a+b.r*(1-a.a),g:a.g*a.a+b.g*(1-a.a),b:a.b*a.a+b.b*(1-a.a),a:1}}
   const SKY={r:0x3a,g:0x25,b:0x50,a:1}; // the lightest point of the sky (dusk floor); the glow adds a little more
   const bad=[];document.querySelectorAll('.wf-sec *,.wf-hero *,.wf-own>.wf-h *,.wf-fh *').forEach(e=>{if(!e.offsetParent)return;const t=[...e.childNodes].some(n=>n.nodeType==3&&n.textContent.trim());if(!t)return;
    let bg=SKY,chain=[];for(let x=e;x&&x!==document.body;x=x.parentElement){const b=rgb(getComputedStyle(x).backgroundColor);if(b.a>0)chain.push(b)}chain.reverse().forEach(b=>bg=over(b,bg));
    const fg=over(rgb(getComputedStyle(e).color),bg),l1=L(fg),l2=L(bg),cr=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);if(cr<4.5)bad.push(cr.toFixed(2)+' '+e.className+' '+e.textContent.trim().slice(0,30))});return bad});
  console.log('contrast under 4.5:',c.length?c.join('\n'):'none');
  // the explainer: tap play, see time move
  const v=await p.evaluate(async()=>{const vt=document.querySelector('.x2p-vt video');const btn=document.querySelector('.x2p-vt .vt-play');vt.scrollIntoView({block:'center'});btn.click();await new Promise(r=>setTimeout(r,2500));const t1=vt.currentTime;return {t1,paused:vt.paused}});
  console.log('explainer:',JSON.stringify(v));
  const r=await p.evaluate(async()=>{document.querySelector('.x2p-vt .vt-play').click();await new Promise(r=>setTimeout(r,400));document.querySelector('.wf-rep').click();await new Promise(r=>setTimeout(r,3500));const v=[...document.querySelectorAll('#x2pRm video')];return v.map(x=>[x.currentSrc.split('/').pop(),x.currentTime.toFixed(2),x.paused])});
  console.log('replay pop-up:',JSON.stringify(r));await p.screenshot({path:`${OUT}/wf-${VW}-replay.png`});
 }
 await b.close()})();
