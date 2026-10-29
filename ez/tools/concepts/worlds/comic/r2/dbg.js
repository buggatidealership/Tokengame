const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
 await p.goto('http://localhost:8897/v47-live-x3plus.html#/round/'+(process.argv[2]||64),{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(2500);
 console.log(await p.evaluate(()=>{const o=[];const c=document.querySelector('#x2pRm .card');['.face.back','.face.back .fin','.face.back .fin > .xc','.face.back .fin > .wc-cert'].forEach(s=>{const e=c.querySelector(s);if(!e){o.push(s+' none');return}const r=e.getBoundingClientRect(),cs=getComputedStyle(e);o.push(s+' '+[r.x,r.y,r.width,r.height].map(Math.round)+' pos='+cs.position+' vis='+cs.visibility+' disp='+cs.display+' op='+cs.opacity+' zoom='+cs.zoom)});return o.join('\n')}));await b.close()})();
