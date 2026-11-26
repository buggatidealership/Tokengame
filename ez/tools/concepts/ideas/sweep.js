// frames of the raking light while the season ticket scrolls through the screen -> mp4
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path');const OUT=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await FONTS(p);
 const css=fs.readFileSync(path.join(__dirname,'paper.css'),'utf8'),js=fs.readFileSync(path.join(__dirname,'paper.js'),'utf8');
 await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=c;document.head.appendChild(s)});window.addEventListener('load',()=>setTimeout(()=>new Function(j)(),300))},[css,js]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(2500);
 const top=await p.evaluate(()=>document.querySelector('#standings .stx-roll').getBoundingClientRect().top+scrollY);
 fs.mkdirSync(OUT,{recursive:true});let i=0;
 for(let y=top-700;y<=top-50;y+=8){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30);await p.screenshot({path:`${OUT}/f${String(i++).padStart(4,'0')}.png`})}
 await b.close();console.log(i)})();
