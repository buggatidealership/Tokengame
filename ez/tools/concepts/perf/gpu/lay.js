// node lay.js <page> <scrollY> [mb]: the composited layers (that draw content) at that scroll on a phone, with their DOM node, size, raster scale hint and reasons; sorted by area.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
(async()=>{const [pg,y,mb]=process.argv.slice(2);const args=['--enable-gpu-rasterization','--ignore-gpu-blocklist'];if(+mb)args.push('--force-gpu-mem-available-mb='+mb);
const b=await chromium.launch({args});const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2.75,isMobile:true,hasTouch:true});const p=await ctx.newPage();await FONTS(p);
await p.goto('http://127.0.0.1:8971/'+pg,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(2000);
await p.evaluate(y=>scrollTo(0,+y),y);await p.waitForTimeout(2500);
const c=await ctx.newCDPSession(p);let layers=[];c.on('LayerTree.layerTreeDidChange',e=>{if(e.layers)layers=e.layers});await c.send('DOM.enable');await c.send('DOM.getDocument',{depth:-1});await c.send('LayerTree.enable');
await p.evaluate(()=>scrollBy(0,1));await p.waitForTimeout(1500);
const byId={};layers.forEach(l=>byId[l.layerId]=l);
const out=[];for(const l of layers){if(!l.drawsContent)continue;let node='';if(l.backendNodeId){try{const d=await c.send('DOM.describeNode',{backendNodeId:l.backendNodeId});const a=d.node.attributes||[];const at=k=>{const i=a.indexOf(k);return i>=0?a[i+1]:''};node=d.node.localName+(at('id')?'#'+at('id'):'')+(at('class')?'.'+at('class').trim().split(/\s+/).slice(0,4).join('.'):'')}catch(e){node='?'}}
 let r=[];try{r=(await c.send('LayerTree.compositingReasons',{layerId:l.layerId})).compositingReasonIds}catch(e){}
 const t=l.transform?l.transform.map(v=>+v.toFixed(3)):null;out.push({id:l.layerId,w:Math.round(l.width),h:Math.round(l.height),x:Math.round(l.offsetX),y:Math.round(l.offsetY),node,r:r.join(','),t:t&&(t[0]!=1||t[5]!=1||t[11]!=0)?[t[0],t[5],t[11]]:'',paints:l.paintCount})}
out.sort((a,b)=>b.w*b.h-a.w*a.h);out.forEach(o=>console.log(o.w+'x'+o.h,'@'+o.x+','+o.y,o.node,'|',o.r,o.t?JSON.stringify(o.t):'','p'+o.paints));console.log('layers',out.length);await b.close()})();
