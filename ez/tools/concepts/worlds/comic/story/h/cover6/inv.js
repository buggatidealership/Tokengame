// node inv.js : every word and number on each take (phone layout) and the surface it lives on
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./shot.js');
(async()=>{const b=await chromium.launch();for(const t of 'abcde'){const {ctx,p}=await open(b,t,390);
 const it=await p.evaluate(()=>window.__c6.items());console.log('## '+t);for(const x of it)if(x.text)console.log(`${x.scene}\t${x.text.replace(/\s+/g,' ')}\t${x.on}`);await ctx.close()}await b.close()})();
