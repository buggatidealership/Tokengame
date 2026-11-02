const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const {load}=require('./_load.js');
(async()=>{const W=+(process.argv[2]||390);const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:844}});const p=await ctx.newPage();await FONTS(p);
 await load(p,{dir:false});
 const ph=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<ph;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
 const r=await p.evaluate(new Function(require('fs').readFileSync(process.argv[3],'utf8')));console.log(typeof r==='string'?r:JSON.stringify(r,null,1));await b.close()})();
