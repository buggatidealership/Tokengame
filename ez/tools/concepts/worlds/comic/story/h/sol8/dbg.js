const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:+(process.argv[4]||390),height:844}});
await p.goto('http://localhost:8987/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>window.P5&&P5.cur,null,{timeout:120000});
await p.addStyleTag({content:rd('../sol7/_s7.css')+rd('_s8.css')+rd(process.argv[2]+'.css')});await p.addScriptTag({content:rd('../sol7/_s7.js')+rd('_s8.js')+rd(process.argv[2]+'.js')});
console.log(await p.evaluate((sel)=>[...document.querySelectorAll(sel)].map(e=>{const cs=getComputedStyle(e),r=e.getBoundingClientRect();return e.className+' '+cs.display+' '+cs.visibility+' '+cs.opacity+' h'+r.height+' y'+r.top+' pos'+cs.position}).join('\n'),process.argv[3]));
await b.close()})();
