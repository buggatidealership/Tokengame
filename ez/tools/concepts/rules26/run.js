// node run.js now,R1,R2,R3,R4,R5 [390,1280] : the standings head, rules and board on the built X2+ page with each take
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const T=(process.argv[2]||'now').split(','),W=(process.argv[3]||'390').split(',').map(Number),OUT=process.env.OUT||'.';
(async()=>{const b=await chromium.launch();for(const t of T)for(const w of W){const p=await b.newPage({viewport:{width:w,height:900},deviceScaleFactor:2});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 const e=await p.$('#standings');await e.scrollIntoViewIfNeeded();await p.waitForTimeout(1200);
 if(t!=='now'){await p.evaluate(fs.readFileSync(path.join(__dirname,'_common.js'),'utf8'));await p.evaluate(fs.readFileSync(path.join(__dirname,t+'.js'),'utf8'));await p.waitForTimeout(900)}
 const y=await p.evaluate(()=>{const s=document.getElementById('standings');return s.getBoundingClientRect().top+scrollY});
 await p.evaluate(y=>scrollTo(0,y-118),y);await p.waitForTimeout(900);
 const m=await p.evaluate(()=>{const s=document.getElementById('standings'),f=s.querySelector('.x2p-flip'),h=s.querySelector('h2');return {sw:document.documentElement.scrollWidth,headToBoard:Math.round(f.getBoundingClientRect().top-h.getBoundingClientRect().bottom),boardEnd:Math.round(f.getBoundingClientRect().bottom-s.getBoundingClientRect().top),over:[...s.querySelectorAll('[class^=r26] *')].filter(x=>x.scrollWidth>x.clientWidth+1).length}});
 console.log(t,w,er.join('|')||'ok',JSON.stringify(m));
 await p.screenshot({path:`${OUT}/r26-${t}-${w}.png`});await p.close()}await b.close()})();
