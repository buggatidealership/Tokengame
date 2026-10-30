const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('http://localhost:8923/v47-live-x3plus.html',{waitUntil:'load'});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:90000});await p.addScriptTag({content:fs.readFileSync(__dirname+'/_si.js','utf8')});
console.log(JSON.stringify(await p.evaluate(()=>{const S=SI;return {rank:S.rank,rank7:S.rank7,lastD:S.lastD,reigns:S.reigns.map(g=>g.m+':'+g.n0+'-'+g.n1),
 last:S.ORDER.map(m=>m+' '+Math.round(S.sum(m,S.inLast))),w7:S.ORDER.map(m=>m+' '+Math.round(S.sum(m,S.in7))),runs:S.ORDER.map(m=>m+' '+JSON.stringify(S.runs(m))),
 line120:S.leadLine(120),line100:S.leadLine(100),line150:S.leadLine(150),line62:S.leadLine(62),line70:S.leadLine(70),lead:S.ORDER.map(m=>m+' '+(S.W(m)-(S.C(m)-S.W(m)))+'/'+S.C(m))}})));await b.close()})();
