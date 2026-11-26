// node shot.js take[+take] WxH "selector" out.png [pad] [js-after] : the built X2+ page with ideas/<take>.css/.js laid over it, one element shot
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const [take,wh,sel,out,pad='16',after='']=process.argv.slice(2);const [w,h]=wh.split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:+(process.env.DPR||2)});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 const ks=take==='now'?[]:take.split('+');const css=ks.map(k=>{const f=path.join(__dirname,k+'.css');return fs.existsSync(f)?fs.readFileSync(f,'utf8'):''}).join('\n');const js=ks.map(k=>{const f=path.join(__dirname,k+'.js');return fs.existsSync(f)?fs.readFileSync(f,'utf8'):''}).join('\n');
 await p.addInitScript(([c,j])=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.id='idea';s.textContent=c;document.head.appendChild(s)});window.addEventListener('load',()=>setTimeout(()=>{if(j)try{(new Function(j))()}catch(e){console.error(e);window.__ideaErr=String(e)}},300))},[css,js]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html'+(process.env.HASH||''),{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForTimeout(2500);
 if(sel==='PAGE'){await p.screenshot({path:out});console.log(out,er.join('|')||'ok');await b.close();return}
 await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),sel);await p.waitForTimeout(1500);
 if(after)await p.evaluate(after);await p.waitForTimeout(+(process.env.WAIT||800));
 const r=await p.evaluate(s=>{const q=document.querySelector(s).getBoundingClientRect();return {x:q.left,y:q.top,w:q.width,h:q.height}},sel);const P=+pad;
 const clip={x:Math.max(0,r.x-P),y:Math.max(0,r.y-P),width:Math.min(w,r.w+2*P),height:r.h+2*P};
 await p.screenshot({path:out,clip});const ie=await p.evaluate(()=>window.__ideaErr||'');console.log(out,er.join('|')||'ok',ie);await b.close()})();
