// node rs.js <outdir> <t list|all> : proof.html frames
const {chromium}=require('playwright');const fs=require('fs');const out=process.argv[2],arg=process.argv[3];
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1080,height:1350}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:8998/'+(process.env.PAGE||'proof.html')+'');await p.waitForFunction(()=>window.READY===1,null,{timeout:60000});await p.waitForTimeout(800);
const ts=arg==='all'?Array.from({length:Math.round(+(process.env.DUR||8.4)*30)},(_,i)=>i/30):arg.split(',').map(Number);fs.mkdirSync(out,{recursive:true});
let n=0;for(const t of ts){await p.evaluate(t=>window.R(t),t);await p.screenshot({path:out+'/'+(arg==='all'?String(n++).padStart(4,'0'):t.toFixed(2))+'.jpg',type:'jpeg',quality:92})}
console.log('errs',errs.join('|')||'none');await b.close()})();
