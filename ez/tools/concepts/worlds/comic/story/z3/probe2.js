const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:8918/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
console.log(await p.evaluate(()=>{const v=document.querySelector('.x2p-vt');const walk=(e,d)=>d>3?'':[...e.children].map(c=>' '.repeat(d)+c.tagName+'.'+String(c.className.baseVal??c.className).slice(0,50)+' '+c.offsetWidth+'x'+c.offsetHeight+'\n'+walk(c,d+1)).join('');return walk(v,0)+'\nback:'+document.querySelector('.wc-back').innerHTML.slice(0,1500)+'\nNEXT:'+JSON.stringify(window.NEXT).slice(0,300)+'\nCOc:'+JSON.stringify(CO_LOGOS['HOOD'])+JSON.stringify(CO_LOGOS['AMZN'])}));await b.close()})();
