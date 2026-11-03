// node gpu.js <mb|0> <outdir> [overlay files...] : phone 390x844 at a real 2.75 ratio, GPU memory capped (0 = none); scrolls the Upcoming
// tab in 700px stops and shoots each (same as tools/concepts/perf/gpu/measure.js), then blk.py compares a capped run with the uncapped one.
const {chromium}=require('/opt/node-tools/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const [mb,out,...ov]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});
const args=['--enable-gpu-rasterization','--ignore-gpu-blocklist','--force-device-scale-factor=2.75'];if(+mb)args.push('--force-gpu-mem-available-mb='+mb);
const b=await chromium.launch({args});const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2.75,isMobile:true,hasTouch:true,reducedMotion:'reduce'});
const p=await ctx.newPage();await FONTS(p);
const CSS=ov.filter(f=>f.endsWith('.css')).map(f=>fs.readFileSync(f,'utf8')).join('\n'),JS=ov.filter(f=>f.endsWith('.js')).map(f=>fs.readFileSync(f,'utf8')).join('\n;\n');
await p.addInitScript(()=>{const D=Date,t=1793739600000-(20*3600+30*60)*1000,off=t-D.now();class F extends D{constructor(...a){if(!a.length)super(D.now()+off);else super(...a)}static now(){return D.now()+off}};window.Date=F});
if(CSS||JS)await p.addInitScript(([c,j])=>{const add=()=>{if(c){const s=document.createElement('style');s.textContent=c;document.head.appendChild(s)}if(j){try{(0,eval)(j)}catch(e){console.error(e)}}};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add);else add()},[CSS,JS]);
await p.goto('http://127.0.0.1:8991/v46-live-x2plus.html#/upcoming',{waitUntil:'load',timeout:180000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
await p.waitForFunction(w=>w?document.querySelector('.h37-root'):document.querySelector('.u3-root'),!!(CSS||JS),{timeout:30000}).catch(()=>console.error('not mounted'));
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2500);
const H=await p.evaluate(()=>document.documentElement.scrollHeight);
for(let y=0;y<H-844;y+=700){await p.evaluate(async y=>{const s=scrollY,n=8;for(let i=1;i<=n;i++){scrollTo(0,s+(y-s)*i/n);await new Promise(r=>setTimeout(r,60))}},y);await p.waitForTimeout(2200);await p.screenshot({path:`${out}/s${y}.png`})}
await b.close()})().catch(e=>{console.error(e);process.exit(1)});
