const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});await FONTS(p);
await p.goto('http://localhost:8919/v47-live-x3plus.html',{waitUntil:'load'});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30)}
const o=await p.evaluate(()=>{const bk=document.getElementById('wc-book');
return {kids:[...bk.children].map(x=>x.tagName+'#'+x.id+'.'+x.className.toString().slice(0,60)+' h'+x.offsetHeight+' :: '+x.innerText.slice(0,120).replace(/\n/g,' | ')),
video:[...document.querySelectorAll('video')].slice(0,4).map(v=>v.outerHTML.slice(0,300)+' parent:'+v.parentElement.className),
html:document.documentElement.className}});
console.log(JSON.stringify(o,null,1));
await p.screenshot({path:'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/z4-now.png',fullPage:true});
await b.close()})();
