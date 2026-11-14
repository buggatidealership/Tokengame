const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});const er=[];p.on('pageerror',e=>er.push(e.message));
 for(const h of ['','#/leaderboard','#/upcoming']){await p.goto('http://localhost:8897/v47-live-x3plus.html'+h,{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:60000});
 console.log(h||'#/',await p.evaluate(()=>{const els=[...document.querySelectorAll('.wc-pn,.wc-ch,.wc-sb-r,.wc-cn')].filter(e=>e.offsetParent);const hid=els.filter(e=>getComputedStyle(e).opacity<1).length;
   const anims=document.getAnimations().filter(a=>a.playState==='running').map(a=>(a.effect&&a.effect.target&&a.effect.target.className||'').toString().slice(0,30)+':'+(a.animationName||a.transitionProperty||''));return 'panels '+els.length+' faded '+hid+' running anims '+anims.length+' '+anims.slice(0,6).join(' | ')}))}
 console.log('errors',er.join('|')||'none');await b.close()})();
