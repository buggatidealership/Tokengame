// node gpu.js <out dir> <id> <mb|0> : phone 390x844 at a real 2.75 ratio (forced, as ez/tools/concepts/perf/gpu/measure.js), GPU memory capped
// (0 = no cap); lays the take over the page, scrolls through the section in 600px steps like a visitor and shoots the viewport at each stop
// (out/<id>-<mb>/s<k>.png). Compare a capped run against the uncapped one with ../../../../../perf/gpu/blk.py (dropped tiles = black 32px blocks).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const [OUT,id,mb]=process.argv.slice(2);const SNAP='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/h37rounds/v46-snap.html';
const dir=`${OUT}/${id}-${mb}`;fs.mkdirSync(dir,{recursive:true});
(async()=>{const args=['--enable-gpu-rasterization','--ignore-gpu-blocklist','--force-device-scale-factor=2.75'];if(+mb)args.push('--force-gpu-mem-available-mb='+mb);
 const b=await chromium.launch({args});const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2.75,isMobile:true,hasTouch:true});const p=await ctx.newPage();await FONTS(p);
 await p.route(/v46-live-x2plus\.html/,r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(SNAP)}));
 await p.goto('http://127.0.0.1:8937/v46-live-x2plus.html',{waitUntil:'load',timeout:180000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pMagApi,null,{timeout:120000});
 if(id!=='now'){await p.addStyleTag({content:fs.readFileSync(__dirname+'/_h37.css','utf8')});await p.evaluate(t=>{window.__H37=t},id);await p.addScriptTag({content:fs.readFileSync(__dirname+'/_h37.js','utf8')});await p.waitForFunction(()=>window.__h37)}
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 const {y0,h}=await p.evaluate(s=>{const e=document.querySelector(s),r=e.getBoundingClientRect();return {y0:r.top+scrollY-120,h:r.height}},id==='now'?'#x2pMag':'#h37');
 let k=0;for(let y=y0;y<y0+h;y+=600){await p.evaluate(async y=>{const s=scrollY,n=8;for(let i=1;i<=n;i++){scrollTo(0,s+(y-s)*i/n);await new Promise(r=>setTimeout(r,60))}},y);
  await p.waitForFunction(()=>[...document.querySelectorAll('img')].filter(i=>{const r=i.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight&&r.width>0}).every(i=>i.complete),null,{timeout:20000}).catch(()=>{});await p.waitForTimeout(2200);await p.screenshot({path:`${dir}/s${k++}.png`})}
 console.log(id,mb,'stops',k);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
