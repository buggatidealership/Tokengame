const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
(async()=>{const b=await chromium.launch();const {p}=await open(b,process.argv[2],+(process.argv[3]||390),1);
console.log(await p.evaluate(sel=>sel.split(',').map(s=>{const e=document.querySelector('#wc-book .wc-cover '+s);if(!e)return s+' none';const r=e.getBoundingClientRect(),c=getComputedStyle(e);return s+' '+[r.left,r.top,r.width,r.height].map(Math.round).join(' ')+' pos:'+c.position+' mt:'+c.marginTop}).join('\n'),process.argv[4]));await b.close()})();
