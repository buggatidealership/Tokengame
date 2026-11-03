const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const W=+(process.argv[2]||390),SNAP='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/b44/v46-snap.html';
(async()=>{const b=await chromium.launch();const ph=W<600;const ctx=await b.newContext({viewport:{width:W,height:844},isMobile:ph,hasTouch:ph,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
await p.route(/v46-live-x2plus\.html/,r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(SNAP)}));
await p.goto('http://127.0.0.1:8961/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
const o=await p.evaluate(()=>{const out={};document.querySelectorAll('main > section').forEach(s=>{const k=s.id||s.className.split(' ')[0];const L=[];
 const vis=e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden';
 [s,...s.querySelectorAll('*')].forEach(e=>{if(!vis(e))return;const r=e.getBoundingClientRect();if(r.width*r.height<3000)return;const cs=getComputedStyle(e);const bi=cs.backgroundImage,bc=cs.backgroundColor;
  if((bi!=='none')||(bc!=='rgba(0, 0, 0, 0)'))L.push([e.tagName+'.'+(e.className||'').toString().split(' ').slice(0,3).join('.'),Math.round(r.width)+'x'+Math.round(r.height),bc,bi.slice(0,110)]);
  if(e.tagName==='IMG'&&r.width*r.height>8000)L.push(['IMG '+e.src.split('/').pop(),Math.round(r.width)+'x'+Math.round(r.height)])});out[k]=L.slice(0,40)});
 // also pseudo of sections
 document.querySelectorAll('main > section').forEach(s=>{['::before','::after'].forEach(ps=>{const cs=getComputedStyle(s,ps);if(cs.content!=='none'&&cs.content!=='normal')(out[s.id||s.className.split(' ')[0]]||[]).push(['SEC'+ps,cs.width+'x'+cs.height,cs.backgroundColor,cs.backgroundImage.slice(0,100)])})});return out});
for(const k in o){console.log('== '+k);o[k].forEach(l=>console.log('  ',l.join(' | ')))}await b.close()})();
