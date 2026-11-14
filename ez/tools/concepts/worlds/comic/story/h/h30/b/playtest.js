const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:390,height:664}});
await p.goto('http://127.0.0.1:8982/tools/concepts/worlds/comic/story/h/h30/b/index.html',{waitUntil:'load'});
const bb=await p.$('.play');const r=await bb.boundingBox();console.log('play target',Math.round(r.width),'x',Math.round(r.height),'top',Math.round(r.y));
await bb.click();await p.waitForTimeout(3500);console.log(await p.evaluate(()=>{const v=document.querySelector('.win video');return v&&{t:v.currentTime.toFixed(2),paused:v.paused,src:v.currentSrc.slice(-24)}}));
await p.evaluate(()=>document.querySelector('#rounds').scrollIntoView());await p.waitForTimeout(2500);
console.log('lift film',await p.evaluate(()=>{const v=document.querySelector('.lift video');return v&&{t:v.currentTime.toFixed(2),paused:v.paused}}));
await p.click('.dz[data-n="72"]');await p.waitForTimeout(500);console.log(await p.evaluate(()=>document.querySelector('.lift .co').textContent));
await b.close()})();
