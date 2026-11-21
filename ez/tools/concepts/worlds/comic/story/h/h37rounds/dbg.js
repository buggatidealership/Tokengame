const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/h37rounds';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});const p=await ctx.newPage();await FONTS(p);
 await p.route(/v46-live-x2plus\.html/,r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(S+'/v46-snap.html')}));
 await p.goto('http://127.0.0.1:8937/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pMagApi);
 const id=process.argv[2]||'A';
 if(id!=='now'){await p.addStyleTag({content:fs.readFileSync('_h37.css','utf8')});await p.evaluate(t=>{window.__H37=t},id);await p.addScriptTag({content:fs.readFileSync('_h37.js','utf8')});await p.waitForFunction(()=>window.__h37)}
 const sel=id==='now'?'.m7-flip li.m7-front a':'#h37 .h7-salon .h7-it a, #h37 .h7-tin .h7-it a';
 const a=await p.$(sel);await a.scrollIntoViewIfNeeded();await p.evaluate(()=>{addEventListener('hashchange',()=>console.log('hash',location.hash))});p.on('console',m=>console.log('>',m.text()));
 await a.tap();await p.waitForTimeout(500);console.log('after1',await p.evaluate(()=>[location.hash,!!document.querySelector('.h7-lift,.m7-lift')]));
 await a.tap();await p.waitForTimeout(1500);console.log('after2',await p.evaluate(()=>[location.hash,!!document.querySelector('.h7-lift,.m7-lift'),(document.getElementById('x2pRm')||{}).className,getComputedStyle(document.getElementById('x2pRm')).display,document.getElementById('x2pRm').getBoundingClientRect().height,(document.getElementById('x2pRm').textContent||'').slice(0,60)]));await b.close()})();
