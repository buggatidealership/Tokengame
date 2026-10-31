// node layers.js: composited layers and paint-chunk-heavy hints at a few scroll positions (MODE, CBNO)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const {p}=await open(b,390,process.env.MODE||'full',{dpr:2,wait:600});const cdp=await p.context().newCDPSession(p);
 await cdp.send('LayerTree.enable');let last=null;cdp.on('LayerTree.layerTreeDidChange',e=>{if(e.layers)last=e.layers});const out=[];
 for(const y of [0,1500,3500,5000]){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(1200);out.push(y+':'+(last?last.length:'?'))}
 const anim=await p.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').map(a=>{const t=a.effect&&a.effect.target;return (t?(t.className&&t.className.baseVal!==undefined?t.className.baseVal:t.className):'?')+'|'+(a.animationName||a.constructor.name)}).reduce((m,k)=>(m[k]=(m[k]||0)+1,m),{}));
 console.log(process.env.MODE||'full',process.env.CBNO||'-','layers',out.join(' '),'running animations',JSON.stringify(anim).slice(0,900));await b.close()})();
