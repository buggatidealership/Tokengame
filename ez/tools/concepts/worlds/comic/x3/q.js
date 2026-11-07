const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
 await p.goto('http://localhost:8897/v47-live-x3plus.html#/round/64',{waitUntil:'load'});await p.waitForTimeout(12000);
 console.log(await p.evaluate(()=>JSON.stringify({sec:document.documentElement.getAttribute('data-sec'),rm:!!document.querySelector('#x2pRm'),rmParent:(document.querySelector('#x2pRm')||{}).parentElement&&document.querySelector('#x2pRm').parentElement.tagName,
  get:document.querySelector('#get').textContent.replace(/\s+/g," ").slice(0,700),st:document.querySelector('#x2pSt').textContent.replace(/\s+/g," ").slice(0,500),topDisp:getComputedStyle(document.querySelector('#top')).display,viewDisp:getComputedStyle(document.querySelector('#view')).display})));
 await p.evaluate(()=>location.hash='#/leaderboard');await p.waitForTimeout(1500);
 console.log(await p.evaluate(()=>JSON.stringify({sec:document.documentElement.getAttribute('data-sec'),topDisp:getComputedStyle(document.querySelector('#top')).display,viewDisp:getComputedStyle(document.querySelector('#view')).display,tick:getComputedStyle(document.querySelector('#tick')).display,sy:scrollY})));
 await b.close()})();
