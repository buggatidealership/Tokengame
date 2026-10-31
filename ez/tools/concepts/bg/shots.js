// node shots.js now,V,W,L [390x844|1536x864] : screens at the same scroll stops for every take (OUT=dir)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const T=process.argv[2].split(','),[VW,VH]=(process.argv[3]||'390x844').split('x').map(Number),OUT=process.env.OUT||'.';
(async()=>{const b=await chromium.launch();for(const t of T){const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:VW<600?2:1});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 const rd=k=>{const f=path.join(__dirname,k);return fs.existsSync(f)?fs.readFileSync(f,'utf8'):''};const css=t==='now'?'':rd(t+'.css'),js=t==='now'?'':rd(t+'.js');
 await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=c;document.head.appendChild(s);if(j)try{(new Function(j))()}catch(e){console.error(e)}})},[css,js]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(100)}await p.waitForTimeout(4500);
 const stops=VW<600?[['a',null],['b','standings'],['c','record'],['d','learn']]:[['a',null],['b','learn'],['c','x2pSt']];
 for(const [k,id] of stops){await p.evaluate(id=>{if(!id)return scrollTo(0,0);const e=document.getElementById(id);scrollTo(0,e.getBoundingClientRect().top+scrollY-70)},id);await p.waitForTimeout(1300);await p.screenshot({path:`${OUT}/bg-${t}-${VW}-${k}.png`})}
 console.log(t,VW,er.join('|')||'ok',await p.evaluate(()=>document.documentElement.scrollWidth));await p.close()}await b.close()})();
