const {chromium}=require('playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await FONTS(p);
await p.goto('http://127.0.0.1:8947/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__t4,null,{timeout:120000});
// find which stylesheet rule sets font-family on .t4-h1
console.log(await p.evaluate(()=>{const h=document.querySelector('.t4-h1');const out=[];for(const s of document.styleSheets){let rs;try{rs=s.cssRules}catch(e){continue}
 const walk=rs=>{for(const r of rs){if(r.cssRules&&!r.selectorText)walk(r.cssRules);else if(r.selectorText&&r.style&&(r.style.fontFamily||r.style.font)){try{if(h.matches(r.selectorText))out.push(r.selectorText.slice(0,160)+' => '+(r.style.fontFamily||r.style.font)+(r.style.getPropertyPriority('font-family')||r.style.getPropertyPriority('font')))}catch(e){}}}};walk(rs)}return out.join('\n')}));await b.close()})();
