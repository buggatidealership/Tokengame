const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await FONTS(p);
await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.evaluate(()=>document.getElementById('learn').scrollIntoView());await p.waitForTimeout(3000);
console.log(await p.evaluate(()=>{const cd=document.querySelector('#learn .pt-cd'),pp=cd.querySelector('.bt-pp');const cs=getComputedStyle(pp);
const lst=function(v){var o=[],dp=0,st=0;for(var i=0;i<v.length;i++){var c=v[i];if(c==="(")dp++;else if(c===")")dp--;else if(c===","&&!dp){o.push(v.slice(st,i).trim());st=i+1}}o.push(v.slice(st).trim());return o};
const L=lst(cs.backgroundImage),S=lst(cs.backgroundSize),P=lst(cs.backgroundPosition);
return L.map((l,i)=>i+': '+l.slice(0,140).replace(/\s+/g,' ')+' | '+S[i%S.length]+' | '+P[i%P.length]).join('\n')+'\nmask n='+lst(cs.maskImage).length+'\nhd:'+JSON.stringify(cd.querySelector('.bt-hd').getBoundingClientRect())+'\nft:'+JSON.stringify(cd.querySelector('.bt-ft').getBoundingClientRect())+'\ncdcls:'+cd.className+' style:'+cd.getAttribute('style')+'\ntb:'+JSON.stringify(cd.querySelector('.pt-tb').getBoundingClientRect())+'\n'+cd.querySelector('.pt-tb').outerHTML.slice(0,600)+'\nppkids:'+[...pp.children].map(e=>e.className).join(',')+'\ninn:'+getComputedStyle(cd.querySelector('.pt-in')).padding+' tin '+getComputedStyle(cd.closest('.x2p-pt')).getPropertyValue('--tin')}));
await b.close()})();
