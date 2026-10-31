const {open}=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const {p}=await open(b,390,'now',{dpr:1});
console.log(await p.evaluate(()=>JSON.stringify({pen:PENDING.slice(0,3),up:UPCOMING.slice(0,3),nup:UPCOMING.length,npen:PENDING.length,r:ROUNDS.slice(-2),logo:Object.entries(CO_LOGOS).slice(0,3),rm:(window.RMETA||{})[82],caps:typeof CAPS,models:Object.keys(MODELS),mv:MODELS.GPT.ver,
 sg:[...document.querySelectorAll('#wc-up [class*=sg-]')].slice(0,30).map(n=>n.tagName+'.'+n.className).join(' | '),
 se:typeof SE, seK:window.SE?Object.keys(SE):null, sgK:window.SG?Object.keys(SG):null})));
await b.close()})();
