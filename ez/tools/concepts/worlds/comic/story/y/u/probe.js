const {open}=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();for(const W of [390,1280]){const {p}=await open(b,W,'now',{dpr:1});
console.log(W,await p.evaluate(()=>JSON.stringify({w:document.querySelector('#wc-up').getBoundingClientRect().width,cs:getComputedStyle(document.querySelector('#wc-up')).padding,
 res:ROUNDS.filter(r=>r.resolves==='10/30/26').map(r=>r.n+r.ticker),days:SE.byDay(SE.toCome()).map(d=>d.k+':'+d.items.length).join(' '),lead:SE.lead(),
 cover:document.querySelector('#wc-up .wc-tab-cv').getBoundingClientRect().height, flt:!!document.querySelector('#wc-up .wc-flt'),
 back:document.querySelector('#wc-up .wc-back').outerHTML.slice(0,300), wide:SE.toCome().map(x=>x.co+' ('+x.ticker+')').sort((a,b)=>b.length-a.length).slice(0,4)})));await p.close()}
await b.close()})();
