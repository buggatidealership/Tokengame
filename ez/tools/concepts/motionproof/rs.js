// node rs.js <outdir> <t1,t2,...|all> : renders PAGE (default proof.html) from :8998. Env: PAGE, DUR (s), DSF (device pixel ratio, 1 or 2),
// MB (motion blur samples per frame across a 180 degree shutter; mux with tmix=frames=MB,select every MB-th).
const {chromium}=require('playwright');const fs=require('fs');const out=process.argv[2],arg=process.argv[3],PAGE=process.env.PAGE||'proof.html',DSF=+(process.env.DSF||1),MB=+(process.env.MB||1);
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:DSF});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:8998/'+PAGE+'?pr='+DSF);await p.waitForFunction(()=>window.READY===1,null,{timeout:120000});await p.waitForTimeout(800);
const all=arg==='all',F0=+(process.env.F0||0),F1=process.env.F1?+process.env.F1:1e9,ts=all?Array.from({length:Math.round(+(process.env.DUR||8.4)*30)},(_,i)=>i/30).filter((_,i)=>i>=F0&&i<F1):arg.split(',').map(Number);fs.mkdirSync(out,{recursive:true});
let n=all?F0*MB:0;for(const t of ts){for(let j=0;j<(all?MB:1);j++){const tt=t+j*.5/MB/30;await p.evaluate(t=>window.R(t),tt);await p.screenshot({path:out+'/'+(all?String(n++).padStart(5,'0'):t.toFixed(2))+'.jpg',type:'jpeg',quality:95})}}
console.log('errs',errs.join('|')||'none');await b.close()})();
