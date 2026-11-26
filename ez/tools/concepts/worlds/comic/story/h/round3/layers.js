// node layers.js <page.html> [selector] : composited layers (CDP LayerTree) at 390 x 844 DPR 2.75 with the target centred; biggest first, device px.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const [pg,tg]=process.argv.slice(2);const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2.75});const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://127.0.0.1:8938/'+pg,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center'}),tg||'.q4-ledger');await p.waitForTimeout(1500);
 const c=await ctx.newCDPSession(p);let L=null;c.on('LayerTree.layerTreeDidChange',e=>{if(e.layers)L=e.layers});await c.send('DOM.enable');await c.send('LayerTree.enable');await p.waitForTimeout(800);
 await p.evaluate(()=>window.scrollBy(0,1));await p.waitForTimeout(800);
 const out=[];for(const l of L||[]){if(!l.drawsContent)continue;let name='';if(l.backendNodeId){try{const d=await c.send('DOM.describeNode',{backendNodeId:l.backendNodeId});const n=d.node;name=(n.nodeName+'.'+((n.attributes||[]).reduce((a,v,i,arr)=>arr[i-1]==='class'?v:a,''))).slice(0,60)}catch(e){}}
  let reasons=[];try{const r=await c.send('LayerTree.compositingReasons',{layerId:l.layerId});reasons=r.compositingReasonIds||r.compositingReasons||[]}catch(e){}
  out.push({w:Math.round(l.width),h:Math.round(l.height),mb:+(l.width*l.height*4*2.75*2.75/1e6).toFixed(1),t:!!l.transform,name,r:reasons.slice(0,3).join(',')})}
 out.sort((a,b)=>b.mb-a.mb);console.log('layers',out.length,'sum MB (DSF^2, upper bound)',out.reduce((s,o)=>s+o.mb,0).toFixed(1));out.slice(0,14).forEach(o=>console.log(JSON.stringify(o)));await b.close()})();
