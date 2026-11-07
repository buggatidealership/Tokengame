const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
await p.goto('http://localhost:8987/v46-live-x2plus.html',{waitUntil:'domcontentloaded',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.getElementById('learn'),null,{timeout:120000});await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>{const L=document.getElementById('learn'),P=L.parentElement;const o=[];let e=L;for(let i=0;i<4&&e;i++){const c=getComputedStyle(e);o.push(e.tagName+'#'+e.id+'.'+e.className.slice(0,40)+' d='+c.display+' gtc='+c.gridTemplateColumns+' gc='+c.gridColumn+' w='+e.offsetWidth);e=e.parentElement}
 return o.join('\n')+'\nsiblings: '+[...P.children].map(c=>c.id+':'+getComputedStyle(c).gridColumn+':'+c.offsetWidth+':'+getComputedStyle(c).order).join(' | ')}));await b.close()})();
