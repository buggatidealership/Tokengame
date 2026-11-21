// node render.js KEY=path ... : render each logo (svg or png) to raw/KEY.png at up to 1400px on its long side, transparent
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1600}});
for(const a of process.argv.slice(2)){const [k,f]=a.split('=');const ext=path.extname(f).slice(1).toLowerCase();
 const mime=ext==='svg'?'image/svg+xml':'image/png';const u='data:'+mime+';base64,'+fs.readFileSync(f).toString('base64');
 await p.setContent(`<style>html,body{margin:0;background:transparent}img{display:block}</style><img id=i src="${u}">`);
 await p.waitForFunction(()=>document.getElementById('i').complete);
 const [nw,nh]=await p.evaluate(()=>{const i=document.getElementById('i');return [i.naturalWidth||300,i.naturalHeight||150]});
 const s=ext==='svg'?1400/Math.max(nw,nh):Math.min(1,1400/Math.max(nw,nh));
 await p.evaluate(([w,h])=>{const i=document.getElementById('i');i.style.width=w+'px';i.style.height=h+'px'},[Math.round(nw*s),Math.round(nh*s)]);
 await p.locator('#i').screenshot({path:'raw/'+k+'.png',omitBackground:true});console.log(k,nw,nh,'->',Math.round(nw*s),Math.round(nh*s))}
await b.close()})();
