// node measure.js <page> <mb|0> <outdir> [stops csv] [css file to inject]
// Phone (390x844, DPR 2.75, mobile, touch), GPU memory capped (0 = no cap). Scrolls to each stop, waits, shoots the viewport (PNG in outdir/s<y>.png),
// and dumps the composited layers (LayerTree) at that stop to outdir/s<y>.json.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const [pg,mb,out,st,css]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});
const args=['--enable-gpu-rasterization','--ignore-gpu-blocklist','--force-device-scale-factor=2.75'];if(+mb)args.push('--force-gpu-mem-available-mb='+mb);
const b=await chromium.launch({args});const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2.75,isMobile:true,hasTouch:true});
const p=await ctx.newPage();await FONTS(p);if(process.env.RMAX)await p.addInitScript(r=>{window.__t4Rmax=+r},process.env.RMAX);
if(css){const t=fs.readFileSync(css,'utf8');await p.addInitScript(t=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.id='gpuprobe';s.textContent=t;document.head.appendChild(s)})},t)}
await p.goto('http://127.0.0.1:8971/'+pg,{waitUntil:'load',timeout:180000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2000);
const c=await ctx.newCDPSession(p);let layers=[];c.on('LayerTree.layerTreeDidChange',e=>{if(e.layers)layers=e.layers});await c.send('DOM.enable');await c.send('LayerTree.enable');
const stops=(st||'0,700,1400,2100,2800,3500,4200,4900,5600').split(',').map(Number);
for(const y of stops){
 // scroll like a visitor: in steps
 await p.evaluate(async y=>{const s=scrollY,n=8;for(let i=1;i<=n;i++){scrollTo(0,s+(y-s)*i/n);await new Promise(r=>setTimeout(r,60))}},y);
 await p.waitForTimeout(2500);
 await p.screenshot({path:`${out}/s${y}.png`});
 const L=[];for(const l of layers){if(!l.drawsContent)continue;let reasons=[];try{reasons=(await c.send('LayerTree.compositingReasons',{layerId:l.layerId})).compositingReasonIds||[]}catch(e){}
  let node=null;if(l.backendNodeId){try{const d=await c.send('DOM.describeNode',{backendNodeId:l.backendNodeId});node=d.node.localName+(d.node.attributes?'.'+(()=>{const a=d.node.attributes;const i=a.indexOf('class');const j=a.indexOf('id');return (j>=0?'#'+a[j+1]:'')+(i>=0?'.'+a[i+1].split(' ').slice(0,3).join('.'):'')})():'')}catch(e){}}
  L.push({w:Math.round(l.width),h:Math.round(l.height),x:Math.round(l.offsetX||0),y:Math.round(l.offsetY||0),node,reasons,paint:l.paintCount})}
 L.sort((a,b)=>b.w*b.h-a.w*a.h);fs.writeFileSync(`${out}/s${y}.json`,JSON.stringify({y,n:L.length,area:L.reduce((s,l)=>s+l.w*l.h,0),layers:L}));
}
await b.close()})().catch(e=>{console.error(e);process.exit(1)});
