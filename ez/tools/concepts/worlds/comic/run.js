// node run.js [390x844|1536x864] [OUT dir] : screens of the comic world from the top, plus checks
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const [VW,VH]=(process.argv[2]||'390x844').split('x').map(Number),OUT=process.argv[3]||'.',N=+(process.env.N||(VW<600?5:3));
const css=fs.readFileSync(path.join(__dirname,'comic.css'),'utf8'),js=fs.readFileSync(path.join(__dirname,'comic.js'),'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:VW<600?2:1});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
 if(process.env.NOW!=='1')await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.id='wc-css';s.textContent=c;document.head.appendChild(s);try{(new Function(j))()}catch(e){console.error(e)}})},[css,js]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(800);
 const Hh=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<Hh;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);
 const hdr=await p.evaluate(()=>{const h=document.querySelector('header.top');return getComputedStyle(h).position==='sticky'||getComputedStyle(h).position==='fixed'?h.getBoundingClientRect().height:0});
 const step=VH-hdr;
 for(let i=0;i<N;i++){await p.evaluate(y=>scrollTo(0,y),i*step);await p.waitForTimeout(1400);await p.screenshot({path:`${OUT}/wc-${VW}-${i}.png`})}
 const chk=await p.evaluate(async()=>{const o={};o.sw=document.documentElement.scrollWidth;o.iw=innerWidth;
  const v=document.querySelector('.wc-big video');if(v){v.scrollIntoView({block:'center'});await new Promise(r=>setTimeout(r,2500));o.panelFilm=v.currentTime.toFixed(2)+' paused='+v.paused+' ready='+v.readyState}
  const e=document.querySelector('.x2p-vt video');o.explainerIn=!!e.closest('#wc-book');
  // luminance contrast of every text node in the book against its nearest painted background colour
  const L=c=>{const m=c.match(/[\d.]+/g).map(Number);const f=x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4)};return [.2126*f(m[0])+.7152*f(m[1])+.0722*f(m[2]),m[3]==null?1:m[3]]};
  const bad=[];const w=document.createTreeWalker(document.getElementById('wc-book'),NodeFilter.SHOW_TEXT);let t;
  while(t=w.nextNode()){if(!t.textContent.trim())continue;const el=t.parentElement;const cs=getComputedStyle(el);if(cs.visibility==='hidden'||el.offsetParent===null&&cs.position!=='fixed')continue;if(el.closest('.wc-sr,.x2p-vt'))continue;
   let col=cs.webkitTextFillColor&&cs.webkitTextFillColor!==cs.color&&!/rgba\(0, 0, 0, 0\)/.test(cs.webkitTextFillColor)?cs.webkitTextFillColor:cs.color;let bg=null,n=el;
   while(n&&n.nodeType===1){const b=getComputedStyle(n).backgroundColor;const a=b.match(/[\d.]+/g).map(Number);if(a.length<4||a[3]>.6){bg=b;break}n=n.parentElement}
   if(!bg)bg=getComputedStyle(document.body).backgroundColor;const [l1]=L(col),[l2]=L(bg);const r=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);
   if(r<4.5)bad.push(r.toFixed(2)+' "'+t.textContent.trim().slice(0,30)+'" '+col+' on '+bg)}
  o.lowContrast=bad.slice(0,30);o.lowN=bad.length;return o});
 console.log(VW,JSON.stringify(chk,null,1),'\nerrors:',er.join('\n')||'none');
 if(process.env.PLAY==='1'){await p.evaluate(()=>scrollTo(0,0));await p.click('.x2p-vt .vt-play');await p.waitForTimeout(3000);console.log('explainer t=',await p.evaluate(()=>document.querySelector('.x2p-vt video').currentTime))}
 if(process.env.POP==='1'){await p.evaluate(()=>document.querySelector('.wc-bi').scrollIntoView({block:'center'}));await p.click('.wc-bi');await p.waitForTimeout(2500);await p.screenshot({path:`${OUT}/wc-${VW}-pop.png`});console.log('pop',await p.evaluate(()=>{const r=document.querySelector('#x2pRm');return r?getComputedStyle(r).display+' '+r.getBoundingClientRect().width:'none'}))}
 await b.close()})();
