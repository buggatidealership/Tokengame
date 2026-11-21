// node check3.js: the smaller stamp's share of each tile (largest), at 320, 390 and 1280
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();for(const W of [320,390,1280]){const p=await b.newPage({viewport:{width:W,height:900}});
 await p.goto('http://localhost:8897/v47-live-x3plus.html');await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:90000});
 await p.addStyleTag({content:rd('_sa.css')+rd('s1.css')+rd('s1s.css')+rd('c1.css')});await p.evaluate(()=>['s1','s1s','c1'].forEach(x=>document.documentElement.classList.add('sa-t-'+x)));
 await p.addScriptTag({content:rd('_sa.js')+rd('s1.js')+rd('c1.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('sa-ready'));await p.click('.wc-more');await p.evaluate(()=>document.fonts.ready);
 console.log(W,await p.evaluate(()=>{let mx=0,ti=0,tie=0;document.querySelectorAll('.wc-season .wc-bi').forEach(a=>{const t=a.getBoundingClientRect(),art=a.querySelector('.wc-bi-art').getBoundingClientRect();const ss=[...a.querySelectorAll('.sa-st')];
   const area=ss.reduce((s,e)=>s+e.offsetWidth*e.offsetHeight,0)/(art.width*art.height);if(ss.length>1)tie=Math.max(tie,area);else mx=Math.max(mx,area)});
   return 'single stamp max '+(mx*100).toFixed(1)+'% of the picture (unrotated box), tie pair max '+(tie*100).toFixed(1)+'%'}));await p.close()}await b.close()})();
