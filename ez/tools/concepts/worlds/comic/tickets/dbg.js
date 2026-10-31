const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
const t=process.argv[2];
if(t!=='now'){await p.addStyleTag({content:fs.readFileSync(__dirname+'/base.css','utf8')+fs.readFileSync(__dirname+'/'+t+'.css','utf8')});await p.evaluate(s=>{window.__take=s},t);await p.addScriptTag({content:fs.readFileSync(__dirname+'/mk.js','utf8')})}
await p.waitForTimeout(800);
console.log(await p.evaluate(()=>['#wc-book','.wc-cliff','.wc-cliff .wc-h2','.wc-tn','.wc-tnp','.wc-season','.wc-bis','.wc-chars'].map(s=>{const e=document.querySelector(s);if(!e)return s+' -';const r=e.getBoundingClientRect();return s+' '+Math.round(r.left)+'..'+Math.round(r.right)}).join('\n')));
await b.close()})();
