// node texts.js <width> <selector> : visible text runs inside the selector with family, rendered px size, colour
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');
const PORT=process.env.PORT||9741;
(async()=>{const w=+(process.argv[2]||390),sel=process.argv[3]||'section.c8';const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:w,height:844},deviceScaleFactor:1})).newPage();await FONTS(p);
await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.evaluate(s=>document.querySelector(s).scrollIntoView(),sel);await p.waitForTimeout(3000);
const r=await p.evaluate(sel=>{const S=document.querySelector(sel);const out=[];const tw=document.createTreeWalker(S,NodeFilter.SHOW_TEXT);let n;while(n=tw.nextNode()){const t=n.textContent.trim();if(!t)continue;const e=n.parentElement;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')continue;
 const rg=document.createRange();rg.selectNodeContents(n);const R=rg.getBoundingClientRect();if(!R.width)continue;let px=parseFloat(cs.fontSize);const svg=e.closest('svg');if(svg&&e.getScreenCTM){const m=e.getScreenCTM();px*=Math.hypot(m.a,m.b)}
 let hid=false;for(let a=e;a&&a!==S;a=a.parentElement){const c=getComputedStyle(a);if(c.display==='none'||c.visibility==='hidden'||+c.opacity===0)hid=true}if(hid)continue;
 out.push([t.slice(0,40),e.tagName+'.'+(e.getAttribute('class')||'').toString().slice(0,24),cs.fontFamily.split(',')[0],+px.toFixed(1),cs.fill&&svg?cs.fill:cs.color])}return out},sel);
r.forEach(x=>console.log(x.join(' | ')));await b.close()})();
