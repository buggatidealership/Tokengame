const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();
for(const h of ['','#/leaderboard']){const p=await b.newPage({viewport:{width:390,height:844}});await fonts(p);
await p.goto('http://localhost:8897/v47-live-x3plus.html'+h,{waitUntil:'load'});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:60000});
await p.waitForTimeout(4000);
const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(500);
 const a=await p.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').map(a=>{const t=a.effect&&a.effect.target;return (a.animationName||'waapi')+'@'+(t?(t.tagName+'.'+(t.className&&t.className.baseVal!==undefined?t.className.baseVal:t.className)).slice(0,60):'')}));
 console.log(h,y,[...new Set(a)].join('  '))}
await p.close()}
await b.close()})();
