const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
await p.goto('http://localhost:8963/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForFunction(()=>window.P5&&P5.cur,null,{timeout:60000});
await p.addStyleTag({content:rd('_s7.css')+rd('b.css')});await p.addScriptTag({content:rd('_s7.js')+rd('b.js')});await p.evaluate(()=>S7.mount(P5.take));
console.log(await p.evaluate(()=>{let e=document.querySelector('#learn .s7-st'),o=[];while(e){const c=getComputedStyle(e);if(c.overflow!=='visible'||c.overflowX!=='visible'||c.overflowY!=='visible'||c.contain!=='none'||c.position==='sticky')o.push((e.id||e.className||e.tagName)+' ov:'+c.overflowX+'/'+c.overflowY+' contain:'+c.contain+' pos:'+c.position+' top:'+c.top);e=e.parentElement}return o.join('\n')}));await b.close()})();
