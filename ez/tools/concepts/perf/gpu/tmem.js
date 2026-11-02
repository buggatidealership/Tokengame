// node tmem.js <page> <scrollY> [mb] [css]: per composited layer, the GPU memory its tiles use (cc's own count, from a cc.debug trace snapshot), with its DOM node; phone 390x844 @2.75.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const [pg,y,mb,css]=process.argv.slice(2);const args=['--enable-gpu-rasterization','--ignore-gpu-blocklist'];if(+mb)args.push('--force-gpu-mem-available-mb='+mb);
const b=await chromium.launch({args});const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2.75,isMobile:true,hasTouch:true});const p=await ctx.newPage();await FONTS(p);
if(css){const t=fs.readFileSync(css,'utf8');await p.addInitScript(t=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=t;document.head.appendChild(s)})},t)}
await p.goto('http://127.0.0.1:8971/'+pg,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(2000);
await p.evaluate(async y=>{const s=scrollY,n=8;for(let i=1;i<=n;i++){scrollTo(0,s+(y-s)*i/n);await new Promise(r=>setTimeout(r,60))}},+y);await p.waitForTimeout(2500);
const c=await ctx.newCDPSession(p);const ev=[];c.on('Tracing.dataCollected',e=>ev.push(...e.value));const done=new Promise(r=>c.on('Tracing.tracingComplete',r));
await c.send('Tracing.start',{traceConfig:{includedCategories:['disabled-by-default-cc.debug','disabled-by-default-cc.debug.picture','disabled-by-default-devtools.timeline.layers','disabled-by-default-viz.quads','cc']},transferMode:'ReportEvents'});
await p.evaluate(()=>scrollBy(0,1));await p.waitForTimeout(1200);await p.evaluate(()=>scrollBy(0,-1));await p.waitForTimeout(1200);
await c.send('Tracing.end');await done;
const snaps=ev.filter(e=>e.name=='cc::LayerTreeHostImpl'&&e.args&&e.args.snapshot);
if(!snaps.length){console.log('no snapshot; names:',[...new Set(ev.map(e=>e.name))].filter(n=>/cc::|Snap|Layer/.test(n)).join(' '));await b.close();return}
const s=snaps[snaps.length-1].args.snapshot;const tree=s.active_tree;
if(process.env.DUMP)fs.writeFileSync(process.env.DUMP,JSON.stringify(s));
const L=[];(function walk(ls){for(const l of ls||[]){L.push(l);}})(tree.layers);
let tot=0;const rows=L.map(l=>{const m=l.gpu_memory_usage||0;tot+=m;return {id:l.layer_id,m,b:l.bounds,dbg:(l.layer_name||l.debug_name||''),ts:(l.tilings||[]).map(t=>t.content_scale||t.raster_scale).join('/')}}).filter(r=>r.m>0).sort((a,b)=>b.m-a.m);
console.log('scrollY',y,'layers',L.length,'GPU tile memory MB',(tot/1048576).toFixed(1));
rows.slice(0,+(process.env.N||25)).forEach(r=>console.log((r.m/1048576).toFixed(2)+'MB',JSON.stringify(r.b),r.dbg.slice(0,90),r.ts));
await b.close()})();
