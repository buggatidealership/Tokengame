// node dstrip.js <out> : D's strip at 390, each panel scrolled into place
const {open}=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const {ctx,p}=await open(b,'d',390,2);
for(let i=0;i<4;i++){await p.evaluate(i=>{const s=document.querySelector('.d-strip');s.style.scrollBehavior='auto';s.scrollLeft=i*(s.querySelector('.d-p').offsetWidth+8)},i);await p.waitForTimeout(400);
 await p.locator('.d-strip').screenshot({path:`${process.argv[2]}/dstrip-${i+1}.png`})}
await b.close()})();
