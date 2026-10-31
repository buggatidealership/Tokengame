const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const mode=process.argv[2]||'full';const W=+(process.argv[3]||390);const {p,er}=await open(b,W,mode,{dpr:1});
 const r=await p.evaluate(new Function(process.argv[4]||'return 1'));console.log(JSON.stringify(r,null,1));console.log(er);await b.close()})();
