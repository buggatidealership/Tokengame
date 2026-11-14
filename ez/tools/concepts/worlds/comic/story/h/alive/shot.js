const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const OUT=process.argv[2];
(async()=>{const b=await chromium.launch();
for(const [n,h] of [['ov',''],['lb','#/leaderboard']]){const p=await b.newPage({viewport:{width:390,height:844}});await fonts(p);
await p.goto('http://localhost:8897/v47-live-x3plus.html'+h,{waitUntil:'load'});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:60000}).catch(()=>console.log('cover timeout'));
await p.waitForTimeout(5000);
// scroll through to trigger lazy stuff
const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=700){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(400)}
await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out=[];document.querySelectorAll('section').forEach(s=>{if(!s.offsetParent)return;const R=s.getBoundingClientRect();if(R.height<40)return;out.push([s.id,(s.className+'').slice(0,60),Math.round(R.top+scrollY),Math.round(R.height)].join(' | '))});return out});
console.log(n,H,r);
await p.screenshot({path:`${OUT}/${n}.png`,fullPage:true});await p.close()}
await b.close()})();
