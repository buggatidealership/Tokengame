const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();
for(const h of ['','#/leaderboard']){const p=await b.newPage({viewport:{width:390,height:844}});await fonts(p);const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('http://localhost:8897/v47-live-x3plus.html'+h,{waitUntil:'load'});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:60000}).catch(()=>console.log('cover timeout'));
await p.waitForTimeout(4000);
const r=await p.evaluate(()=>{const out=[];document.querySelectorAll('main section, main > *').forEach(s=>{if(!s.offsetParent&&getComputedStyle(s).position!=='fixed')return;const R=s.getBoundingClientRect();if(R.height<40)return;out.push([s.tagName,s.id,(s.className+'').slice(0,80),Math.round(R.top+scrollY),Math.round(R.height),(s.querySelector('h2,h1')||{}).textContent?.trim().slice(0,50)])});return out});
console.log('==',h);r.forEach(x=>console.log(x.join(' | ')));console.log(er.slice(0,3));await p.close()}
await b.close()})();
