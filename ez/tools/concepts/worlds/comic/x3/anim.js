const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
 for(const h of ['','#/leaderboard','#/upcoming']){await p.goto('http://localhost:8897/v47-live-x3plus.html'+h,{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:60000});await p.waitForTimeout(3000);
 for(const y of [0,1500,3000]){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(1500);
 console.log(h||'#/',y,await p.evaluate(()=>{const an=document.getAnimations().filter(a=>a.playState==='running');const off=an.filter(a=>{const t=a.effect&&a.effect.target;if(!t||!t.getBoundingClientRect)return false;const r=t.getBoundingClientRect();return r.bottom<0||r.top>innerHeight||!t.getClientRects().length});
  return 'running '+an.length+' offscreen '+off.length+' '+off.slice(0,5).map(a=>{const t=a.effect.target;return (t.id||t.className.toString().slice(0,28))+':'+(a.animationName||a.transitionProperty)}).join(' | ')}))}}
 await b.close()})();
