// node tmem.js <page> <scrollY[,scrollY...]> [mb] [css|-]  env: RMAX, N (rows), ORDER=1 (all layers in draw order), DUMP: per composited layer, the GPU memory its tiles use (cc's own count, from a cc.debug trace snapshot), with its DOM node; phone 390x844 @2.75.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const [pg,Y,mb,css]=process.argv.slice(2);const args=['--enable-gpu-rasterization','--ignore-gpu-blocklist','--force-device-scale-factor=2.75'];if(+mb)args.push('--force-gpu-mem-available-mb='+mb);
const b=await chromium.launch({args});const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2.75,isMobile:true,hasTouch:true});const p=await ctx.newPage();await FONTS(p);if(process.env.RMAX)await p.addInitScript(r=>{window.__t4Rmax=+r},process.env.RMAX);
if(css&&css!='-'){const t=fs.readFileSync(css,'utf8');await p.addInitScript(t=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=t;document.head.appendChild(s)})},t)}
await p.goto('http://127.0.0.1:8971/'+pg,{waitUntil:'load',timeout:180000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(2000);
for(const y of String(Y).split(',').map(Number)){
await p.evaluate(async y=>{const s=scrollY,n=8;for(let i=1;i<=n;i++){scrollTo(0,s+(y-s)*i/n);await new Promise(r=>setTimeout(r,60))}},+y);await p.waitForTimeout(2500);
const c=await ctx.newCDPSession(p);let LT=[];c.on('LayerTree.layerTreeDidChange',e=>{if(e.layers)LT=e.layers});await c.send('DOM.enable');await c.send('DOM.getDocument',{depth:-1});await c.send('LayerTree.enable');const ev=[];c.on('Tracing.dataCollected',e=>ev.push(...e.value));const done=new Promise(r=>c.on('Tracing.tracingComplete',r));
await c.send('Tracing.start',{traceConfig:{includedCategories:['disabled-by-default-cc.debug','disabled-by-default-cc.debug.picture','disabled-by-default-devtools.timeline.layers','disabled-by-default-viz.quads','cc']},transferMode:'ReportEvents'});
await p.evaluate(()=>scrollBy(0,1));await p.waitForTimeout(1200);await p.evaluate(()=>scrollBy(0,-1));await p.waitForTimeout(1200);
await c.send('Tracing.end');await done;
const snaps=ev.filter(e=>(e.name=='cc::LayerTreeHostImpl'||e.name=='LayerTreeHostImpl:snapshot'||/LayerTreeHostImpl/.test(e.name))&&e.args&&e.args.snapshot);
if(!snaps.length){console.log('scrollY',y,'no snapshot');continue}
const NM={};snaps.forEach(e=>(e.args.snapshot.active_tree.layers||[]).forEach(l=>{if(l.layer_name)NM[l.layer_id]=l.layer_name+(l.compositing_reason_ids?' ['+l.compositing_reason_ids.join(',')+']':'')}));
const s=snaps.filter(e=>(e.args.snapshot.active_tree.layers||[]).some(l=>l.tilings)).pop().args.snapshot;const tree=s.active_tree;
if(process.env.DUMP)fs.writeFileSync(process.env.DUMP,JSON.stringify(s));
const L=[];(function walk(ls){for(const l of ls||[]){L.push(l);}})(tree.layers);
const ND={},RS={};for(const l of LT){try{RS[l.layerId]=(await c.send('LayerTree.compositingReasons',{layerId:l.layerId})).compositingReasonIds.join(',')}catch(e){}if(!l.backendNodeId)continue;try{const d=await c.send('DOM.describeNode',{backendNodeId:l.backendNodeId});const a=d.node.attributes||[];const at=k=>{const i=a.indexOf(k);return i>=0?a[i+1]:''};ND[l.layerId]=d.node.localName+(at('id')?'#'+at('id'):'')+(at('class')?'.'+at('class').trim().split(/\s+/).slice(0,4).join('.'):'')+(d.node.pseudoType?'::'+d.node.pseudoType:'')}catch(e){}}
let tot=0;const rows=L.map(l=>{const m=l.gpu_memory_usage||0;tot+=m;return {id:l.layer_id,m,b:l.bounds,dbg:(l.layer_name||NM[l.layer_id]||ND[String(l.layer_id)]||''),ts:(l.tilings||[]).map(t=>t.content_scale||t.raster_scale).join('/')}}).filter(r=>r.m>0).sort((a,b)=>b.m-a.m);
const AT=s.active_tiles||[];const nowM=AT.filter(t=>t.combined_priority&&t.combined_priority.priority_bin=='NOW').reduce((a,t)=>a+(t.gpu_memory_usage||0),0);const nowN=AT.filter(t=>t.combined_priority&&t.combined_priority.priority_bin=='NOW').length;
console.log('scrollY',y,'layers',L.length,'GPU tile memory MB',(tot/1048576).toFixed(1),'| NOW tiles',nowN,(nowM/1048576).toFixed(1),'MB','| oom',s.tile_manager_basic_state.did_oom_on_last_assign);
if(process.env.ORDER){L.forEach(l=>console.log('  ',l.layer_id,l.bounds.width+'x'+l.bounds.height,((l.gpu_memory_usage||0)/1048576).toFixed(2),(l.layer_name||NM[l.layer_id]||ND[String(l.layer_id)]||'').slice(0,70),'['+(RS[String(l.layer_id)]||'')+']',l.draws_content?'':'(no content)'))}
rows.slice(0,+(process.env.N||25)).forEach(r=>console.log((r.m/1048576).toFixed(2)+'MB',r.b.width+'x'+r.b.height,r.dbg.slice(0,110),'scale',r.ts));
await c.detach()}
await b.close()})();
