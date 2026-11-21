// node scrolltest.js : take B's page turn on a real scroll at 390 (no forced state): the kicker before and after
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1})).newPage();await FONTS(p);
await p.route('**/media/s7-*',r=>r.fulfill({path:__dirname+'/img/'+r.request().url().split('/').pop(),contentType:'image/jpeg'}));
await p.goto('http://localhost:8963/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForFunction(()=>window.P5&&P5.cur,null,{timeout:60000});
await p.addStyleTag({content:rd('_s7.css')+rd('b.css')});await p.addScriptTag({content:rd('_s7.js')+rd('b.js')});await p.evaluate(()=>S7.mount(P5.take));
const st=async()=>p.evaluate(()=>{const s=document.querySelector('#learn .s7-st').getBoundingClientRect();return {k:document.querySelector('#learn .s7-k').textContent,kTop:Math.round(document.querySelector('#learn .s7-k').getBoundingClientRect().top),stageTop:Math.round(s.top),lnBot:Math.round(document.querySelector('#learn .s7-ln').getBoundingClientRect().bottom),lines:document.querySelectorAll('#learn .s7-tr').length}});
await p.evaluate(()=>document.querySelector('#learn').scrollIntoView());await p.mouse.wheel(0,1);await p.waitForTimeout(300);console.log('arrive',JSON.stringify(await st()));
for(let i=0;i<12;i++){await p.mouse.wheel(0,90);await p.waitForTimeout(250);console.log('scroll',(i+1)*90,JSON.stringify(await st()))}
await b.close()})();
