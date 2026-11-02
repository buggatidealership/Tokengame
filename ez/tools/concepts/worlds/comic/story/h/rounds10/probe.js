const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await FONTS(p);
const pend=new Map();p.on('request',r=>pend.set(r,Date.now()));p.on('requestfinished',r=>pend.delete(r));p.on('requestfailed',r=>pend.delete(r));
p.goto('http://127.0.0.1:9611/v46-live-x2plus.html',{timeout:60000}).catch(e=>{});
await p.waitForTimeout(25000);console.log([...pend.keys()].map(r=>r.url().slice(0,120)));
console.log(await p.evaluate(()=>[document.readyState,document.documentElement.className.slice(0,200)]));await b.close()})();
