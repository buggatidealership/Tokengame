const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({proxy:{server:'http://127.0.0.1:46741'},args:['--ignore-certificate-errors']});
const p=await b.newPage({viewport:{width:390,height:844},ignoreHTTPSErrors:true});
await p.goto('https://earningszn.xyz/',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(1500);
const snap=await p.locator("main#top").ariaSnapshot();console.log(snap.split("\n").filter(l=>/heading|button|link/.test(l)).slice(0,60).join("\n"));
const r=await p.evaluate(()=>[...document.querySelectorAll('main#top h1,main#top h2')].map(h=>{const cs=getComputedStyle(h);const r=h.getBoundingClientRect();let hidden='';for(let e=h;e;e=e.parentElement){const c=getComputedStyle(e);if(c.display==='none'){hidden='display';break}if(c.visibility==='hidden'){hidden='vis';break}if(+c.opacity<.05){hidden='opacity';break}if(/rect\(0/.test(c.clip)||(c.overflow==='hidden'&&e.getBoundingClientRect().width<=2)){hidden='sr-only';break}}return h.textContent.trim().replace(/\s+/g,' ').slice(0,40)+' => '+(hidden||'shown')+' '+Math.round(r.width)+'x'+Math.round(r.height)}));
console.log(r.join('\n'));await b.close()})();
