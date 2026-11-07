// node probe.js: for every company still to come, what the familiar-part rule picks (part or whole), the mark's shape, wordmark mode, the brand colour
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('http://localhost:8921/v47-live-x3plus.html#/upcoming',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addScriptTag({content:rd('../e/_se.js')+rd('_sg.js')});
 const r=await p.evaluate(async()=>{const o=[];for(const x of SE.toCome()){const M=await SG.get(x.ticker);o.push(M?[x.n,x.ticker,M.how,(M.m.width/M.m.height).toFixed(2),M.m.width/M.m.height>=2.2&&x.ticker!=='RKLB'?'wordmark':'',M.hx]:[x.n,x.ticker,'NO LOGO'])}return o});
 r.forEach(a=>console.log(a.join('\t')));await b.close()})();
