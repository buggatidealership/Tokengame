const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
 await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:60000});await p.waitForTimeout(2000);
 console.log(await p.evaluate(()=>document.getAnimations().map(a=>{const t=a.effect.target;let path=[];let n=t;for(let i=0;i<4&&n;i++){path.push(n.tagName+'.'+n.className.toString().slice(0,25));n=n.parentElement}return (a.animationName||'')+' :: '+path.join(' < ')}).join('\n')));await b.close()})();
