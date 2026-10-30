const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await FONTS(p);
await p.goto('http://localhost:8919/v47-live-x3plus.html',{waitUntil:'load'});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
console.log(await p.evaluate(()=>{const c=document.querySelector('.wc-cover');const v=c.querySelector('video');let a=v,ch=[];while(a&&a!==c){ch.push(a.tagName+'.'+a.className+' '+a.offsetWidth+'x'+a.offsetHeight);a=a.parentElement}
return ch.join('\n')+'\n\n'+c.innerHTML.replace(/<path[^>]*>/g,'').slice(0,3000)+'\nSIM:'+JSON.stringify(SIM)+'\nX:'+CONFIG.x}));await b.close()})();
