const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const w=+process.argv[2]||390;const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:844}});const p=await ctx.newPage();await FONTS(p);
await p.goto('http://localhost:8995/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const out=[];const walk=(e,d)=>{if(d>5)return;const r=e.getBoundingClientRect();out.push(' '.repeat(d*2)+e.tagName+'.'+String(e.getAttribute('class')||'').slice(0,50)+' '+Math.round(r.left)+','+Math.round(r.top+scrollY)+' '+Math.round(r.width)+'x'+Math.round(r.height)+(e.children.length?'':' "'+(e.textContent||'').trim().slice(0,40)+'"'));if(e.tagName!=='svg')[...e.children].forEach(c=>walk(c,d+1))};walk(document.querySelector('.t4-b2'),0);return out.join('\n')});
console.log(r);await b.close()})();
