// node run.js [390x844|1536x864] OUTDIR : screens of the combined mockup (Overview top to bottom, then the Leaderboard tab)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const [VW,VH]=(process.argv[2]||'390x844').split('x').map(Number),OUT=process.argv[3]||'.';
const css=fs.readFileSync(path.join(__dirname,'../comic/comic.css'),'utf8')+fs.readFileSync(path.join(__dirname,'combined.css'),'utf8'),js=fs.readFileSync(path.join(__dirname,'combined.js'),'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:VW<600?2:1});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
 await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=c;document.head.appendChild(s);try{(new Function(j))()}catch(e){console.error(e)}})},[css,js]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(800);
 const Hh=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<Hh;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(50)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1200);
 // screens start at each section's top (under the sticky header)
 const marks=await p.evaluate(()=>{const hd=document.querySelector('header.top').getBoundingClientRect().height;return ['.wk-cover','.wk-strip','.wk-stand','.wk-tonight','.wk-results','.wc-beat','.wk-next'].map(s=>{const e=document.querySelector(s);return e?Math.max(0,e.getBoundingClientRect().top+scrollY-hd-14):null})});
 const ys=process.env.YS?process.env.YS.split(',').map(Number):marks;let i=0;
 for(const y of ys){if(y==null)continue;await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(1300);await p.screenshot({path:`${OUT}/wk-${VW}-${i++}.png`})}
 const chk=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:innerWidth,h:document.documentElement.scrollHeight}));
 await p.evaluate(()=>{location.hash='#/lb';scrollTo(0,0)});await p.waitForTimeout(1500);await p.screenshot({path:`${OUT}/wk-${VW}-lb.png`});
 if(VW<600){await p.evaluate(()=>scrollTo(0,700));await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/wk-${VW}-lb2.png`})}
 chk.lbsw=await p.evaluate(()=>document.documentElement.scrollWidth);
 console.log(VW,JSON.stringify(chk),'marks',marks.join(','),'\nerrors:',er.join('\n')||'none');await b.close()})();
