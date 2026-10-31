const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const SEL=JSON.parse(process.argv[3]);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await fonts(p);
await p.goto('http://localhost:8897/v47-live-x3plus.html'+process.argv[2],{waitUntil:'load'});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:60000});
await p.waitForTimeout(4000);const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=700){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(300)}
for(const s of SEL){const r=await p.evaluate(([s,D])=>{const e=document.querySelector(s);if(!e)return 'NONE';const out=[];
 (function w(n,d){if(d>D)return;const cl=(n.className&&n.className.baseVal!==undefined)?n.className.baseVal:n.className;
  if(n.tagName==='text'||n.tagName==='path'||n.tagName==='stop')return;
  const R=n.getBoundingClientRect();const t=[...n.childNodes].filter(c=>c.nodeType===3).map(c=>c.textContent.trim()).join('').slice(0,30);
  out.push('  '.repeat(d)+n.tagName.toLowerCase()+(cl?'.'+String(cl).trim().replace(/\s+/g,'.'):'')+` [${Math.round(R.left)},${Math.round(R.top+scrollY)} ${Math.round(R.width)}x${Math.round(R.height)}] `+t);
  [...n.children].forEach(c=>w(c,d+1))})(e,0);return out.join('\n')},[s,+process.argv[4]||8]);console.log('### '+s+'\n'+r.slice(0,9000))}
await b.close()})();
