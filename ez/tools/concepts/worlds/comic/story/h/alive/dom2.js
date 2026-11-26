const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const SEL=JSON.parse(process.argv[3]);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await fonts(p);
await p.goto('http://localhost:8897/v47-live-x3plus.html'+process.argv[2],{waitUntil:'load'});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:60000});
await p.waitForTimeout(4000);const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=700){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(300)}
for(const s of SEL){const r=await p.evaluate(s=>{const e=document.querySelector(s);if(!e)return 'NONE';
 const strip=n=>{const c=n.cloneNode(true);c.querySelectorAll('svg path').forEach(x=>x.removeAttribute('d'));c.querySelectorAll('[style]').forEach(x=>{if(x.getAttribute('style').length>120)x.setAttribute('style',x.getAttribute('style').slice(0,120))});return c.outerHTML.replace(/data:[^"')]{40,}/g,'data:…')};
 return strip(e)},s);console.log('### '+s+'\n'+r.slice(0,+process.argv[4]||3000))}
await b.close()})();
