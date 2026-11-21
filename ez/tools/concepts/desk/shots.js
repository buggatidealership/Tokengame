// node shots.js U3,U3+U2 : the first screen and two screens further down at 1536x864, same scroll positions for every take
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const T=process.argv[2].split(','),OUT=process.env.OUT||'.';
(async()=>{const b=await chromium.launch();for(const t of T){const p=await b.newPage({viewport:{width:1536,height:864}});await FONTS(p);
 const css=t==='now'?'':t.split('+').map(k=>fs.readFileSync(path.join(__dirname,k+'.css'),'utf8')).join('\n');const js=t==='now'?'':t.split('+').map(k=>{const f=path.join(__dirname,k+'.js');return fs.existsSync(f)?fs.readFileSync(f,'utf8'):''}).join('\n');
 await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=c;document.head.appendChild(s);if(j)try{(new Function(j))()}catch(e){console.error(e)}})},[css,js]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(120)}
 for(const [k,sel] of [['a',null],['b','#learn'],['c','#x2pSt']]){await p.evaluate(s=>{if(!s)return scrollTo(0,0);const e=document.getElementById(s.slice(1));scrollTo(0,e.getBoundingClientRect().top+scrollY-20)},sel);await p.waitForTimeout(1200);await p.screenshot({path:`${OUT}/sh-${t}-${k}.png`})}
 await p.close()}await b.close()})();
