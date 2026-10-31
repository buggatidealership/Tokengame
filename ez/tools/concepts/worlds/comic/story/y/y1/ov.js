// how far the tucked ticket's box reaches into each mark's drawn box (px), at 390 and 1280
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
(async()=>{const b=await chromium.launch();for(const W of [390,1280]){const {p}=await open(b,W,'y1');
 console.log(W,JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('.y1-st')].map(c=>{const t=c.querySelector('.y1-tk').getBoundingClientRect(),m=c.querySelector('.y1-mk-s path').getBoundingClientRect();return [c.dataset.m,Math.round(t.right-m.left),Math.round(t.bottom-m.top)]}))));await p.close()}await b.close()})();
