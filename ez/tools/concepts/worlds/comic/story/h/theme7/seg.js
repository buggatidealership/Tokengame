// node seg.js <url-page> <out-prefix> <W> [inject.js] : full-page in 4000px slices
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const [PG,OUT,W0,INJ]=process.argv.slice(2);const W=+W0||390;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:1,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('http://localhost:8960/'+PG,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
if(INJ)await p.addScriptTag({content:fs.readFileSync(INJ,'utf8')});
await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
await p.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,70))}scrollTo(0,0)});
await p.waitForTimeout(1500);await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed')x.style.visibility='hidden'})});
const H=await p.evaluate(()=>document.documentElement.scrollHeight);
for(let y=0,i=0;y<H;y+=4000,i++){await p.screenshot({path:`${OUT}-${i}.png`,clip:{x:0,y,width:W,height:Math.min(4000,H-y)},fullPage:true,timeout:120000})}
console.log(H,er);await b.close()})();
