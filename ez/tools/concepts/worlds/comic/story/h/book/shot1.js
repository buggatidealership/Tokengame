// node shot1.js <take> <W> <out.png> <which: mm|er|y:<n>>
const R=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const [t,W,out,wh]=process.argv.slice(2);const b=await chromium.launch();const w=+W;const {ctx,p,er}=await R.open(b,w,w<600?844:800,1);await R.inject(p,t);
const y=wh.startsWith('y:')?+wh.slice(2):await p.evaluate(s=>{const e=document.querySelector('#wc-book > '+s);return e.getBoundingClientRect().top+scrollY-70},wh==='mm'?'.wc-chars':'.wc-season');
await R.go(p,Math.max(0,Math.round(y)));await p.waitForTimeout(1800);await p.screenshot({path:out});console.log(er.join('|')||'ok');await b.close()})();
