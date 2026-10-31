const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const [,,mode,W,sel,out,js]=process.argv;const {p,er}=await open(b,+W,mode,{dpr:2});
 await p.evaluate(s=>{const e=document.querySelector(s);scrollTo(0,e.getBoundingClientRect().top+scrollY-80)},sel);await p.waitForTimeout(900);
 if(js)console.log(JSON.stringify(await p.evaluate(new Function(js))));
 const bb=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:Math.max(0,r.left-10),y:Math.max(0,r.top-10),width:Math.min(innerWidth,r.width+20),height:Math.min(innerHeight-r.top+10,r.height+20)}},sel);
 await p.screenshot({path:out,clip:bb});console.log(er);await b.close()})();
