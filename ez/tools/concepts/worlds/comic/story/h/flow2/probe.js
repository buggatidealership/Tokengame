// node probe.js <width>  : dumps the Overview's section order and heights on the built X2+ page
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const w=+process.argv[2]||390;const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:844},deviceScaleFactor:1});const p=await ctx.newPage();await FONTS(p);
const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('http://localhost:8995/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const m=document.querySelector('main');return [...m.children].map(e=>{const r=e.getBoundingClientRect();return e.tagName+'#'+e.id+'.'+String(e.className).slice(0,60)+' y='+Math.round(r.top+scrollY)+' h='+Math.round(r.height)+' disp='+getComputedStyle(e).display})});
console.log(r.join('\n'));
const t=await p.evaluate(()=>{const s=document.querySelector('section.t4');return s?[...s.children].map(e=>e.tagName+'.'+String(e.className).slice(0,50)+' h='+Math.round(e.getBoundingClientRect().height)).join('\n'):'no t4'});console.log('--t4--\n'+t);
console.log(er.join('|')||'ok');await b.close()})();
