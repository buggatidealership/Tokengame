const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});await FONTS(p);
await p.goto('http://localhost:8920/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.evaluate(()=>{window.__z5Still=true});await p.addStyleTag({content:fs.readFileSync('z5.css','utf8')});await p.addScriptTag({content:fs.readFileSync('z5.js','utf8')});
await p.waitForFunction(()=>document.documentElement.classList.contains('z5-ready'));
for(let i=0;i<6;i++){await p.waitForTimeout(1000);console.log(await p.evaluate(()=>{const v=document.querySelector('.z5-reel video');return [v.readyState,v.currentTime,v.duration,v.networkState,v.error&&v.error.code,v.canPlayType('video/mp4; codecs="avc1.42E01E"')].join(' ')}))}
await b.close()})();
