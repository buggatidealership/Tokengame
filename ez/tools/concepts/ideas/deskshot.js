// node deskshot.js take out.png [W] : a full-page shot of the built page with ideas/<take> laid over desktop A
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const [take,out,W]=process.argv.slice(2);const w=+(W||1536);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:w,height:900}});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 const ks=take==='now'?[]:take.split('+');const css=ks.map(k=>fs.existsSync(path.join(__dirname,k+'.css'))?fs.readFileSync(path.join(__dirname,k+'.css'),'utf8'):'').join('\n');const js=ks.map(k=>fs.existsSync(path.join(__dirname,k+'.js'))?fs.readFileSync(path.join(__dirname,k+'.js'),'utf8'):'').join('\n');
 await p.addInitScript(([c])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=c;document.head.appendChild(s)})},[css]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(2500);
 if(js)await p.evaluate(j=>{try{new Function(j)()}catch(e){window.__ideaErr=String(e)}},js);
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(120)}await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1200);
 const H2=await p.evaluate(()=>document.documentElement.scrollHeight);await p.setViewportSize({width:w,height:H2});await p.waitForTimeout(1500);
 await p.screenshot({path:out});console.log(out,H2,er.join('|')||'ok',await p.evaluate(()=>window.__ideaErr||''));await b.close()})();
