const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:8996/v46-live-x2plus.html#/',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:200000});
const r=await p.evaluate(()=>{const o=[];[51,57,64,80,81,82,83].forEach(n=>{const g=ROUNDS.find(x=>x.n===n);if(g)o.push([n,g.co,g.a,g.win,JSON.stringify(g.calls),g.called,g.resolves].join(' | '))});
 o.push('PENDING '+(window.PENDING||[]).map(q=>q.n+':'+q.co+':'+JSON.stringify(q.calls)+':'+q.resolves).join(' || '));return o.join('\n')});console.log(r);await b.close()})();
