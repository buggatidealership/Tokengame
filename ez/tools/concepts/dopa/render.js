// node render.js <page.html> <outdir> <t1,t2,...|all> : renders a page served from :8993 (this folder). Env: DUR (s), MB (motion blur
// samples across a 180 degree shutter; mux with tmix=frames=MB then keep every MB-th), F0/F1 (frame range). Writes <outdir>/cues.json from window.CUES.
const {chromium}=require('playwright');const fs=require('fs');const [page,out,arg]=process.argv.slice(2);const MB=+(process.env.MB||1);
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1080,height:1350}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:8993/'+page);await p.waitForFunction(()=>window.READY===1,null,{timeout:120000});await p.waitForTimeout(500);fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(out+'/cues.json',JSON.stringify(await p.evaluate(()=>({cues:window.CUES||[],music:window.MUSIC||null}))));
const all=arg==='all',F0=+(process.env.F0||0),F1=process.env.F1?+process.env.F1:1e9,ts=all?Array.from({length:Math.round(+(process.env.DUR||12)*30)},(_,i)=>i/30).filter((_,i)=>i>=F0&&i<F1):arg.split(',').map(Number);
let n=all?F0*MB:0;for(const t of ts){for(let j=0;j<(all?MB:1);j++){await p.evaluate(t=>window.R(t),t+j*.5/MB/30);await p.screenshot({path:out+'/'+(all?String(n++).padStart(5,'0'):t.toFixed(2))+'.jpg',type:'jpeg',quality:93})}}
console.log('errs',errs.join('|')||'none');await b.close()})();
