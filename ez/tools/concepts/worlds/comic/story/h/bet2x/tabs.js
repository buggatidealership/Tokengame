// node tabs.js: the drop-in survives X2+'s tab changes (Overview -> Upcoming -> Overview) and its ticker keeps one timer per chip
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8954/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 await p.addStyleTag({content:fs.readFileSync('x2p_bet.css','utf8')});await p.addScriptTag({content:fs.readFileSync('x2p_bet.js','utf8')});await p.waitForFunction(()=>document.documentElement.classList.contains('bd-ready'),null,{timeout:60000});
 const st=()=>p.evaluate(()=>{const s=document.querySelector('#x2pSt');return {wraps:document.querySelectorAll('.hb-wrap').length,boards:document.querySelectorAll('.bd-p').length,vis:s&&s.getBoundingClientRect().height>0,label:s&&s.getAttribute('aria-labelledby'),name:document.getElementById('x2bH')?.textContent}});
 const a=await st();await p.evaluate(()=>location.hash='#/upcoming');await p.waitForTimeout(1500);const u=await st();await p.evaluate(()=>location.hash='#/');await p.waitForTimeout(1500);const c=await st();
 console.log(JSON.stringify({overview:a,upcoming:u,back:c,errors:er}));await b.close()})();
