// node rm.js: under prefers-reduced-motion, every take must leave its loops paused and G3's doors open with no transition
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();for(const t of ['g1','g2','g3']){const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await p.goto('http://localhost:8917/v47-live-x3plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addStyleTag({content:rd('_gr.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_gr.js')});await p.addScriptTag({content:rd(t+'.js')});
 await p.evaluate(()=>document.querySelector('.wc-chars').scrollIntoView());await p.waitForTimeout(1500);
 console.log(t,JSON.stringify(await p.evaluate(()=>({playing:[...document.querySelectorAll('.wc-chars video')].filter(v=>!v.paused).length,
  times:[...document.querySelectorAll('.wc-chars video')].map(v=>v.currentTime),
  doorsOpen:[...document.querySelectorAll('.g3d')].filter(d=>d.classList.contains('g3-open')).length,
  leafTransition:[...document.querySelectorAll('.g3d-leaf')].map(l=>getComputedStyle(l).transitionDuration)[0]||null}))));await p.close()}await b.close()})();
