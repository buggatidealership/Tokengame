// node rec.js <take> <out.webm> [W] : 10 s screen recording of a take at phone width (second hands, the turning tubes, the bell, the striker)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');const fs=require('fs');
(async()=>{const b=await chromium.launch();const W=+(process.argv[4]||390);const dir=require('path').dirname(process.argv[3])+'/recv';
 const {ctx,p}=await open(b,process.argv[2],W,1,{recordVideo:{dir,size:{width:W,height:844}}});
 await p.evaluate(()=>{const e=document.querySelector('#wc-book .kloop');scrollTo(0,e.getBoundingClientRect().top+scrollY-120)});await p.waitForTimeout(10000);
 const v=p.video();await ctx.close();fs.renameSync(await v.path(),process.argv[3]);await b.close()})();
