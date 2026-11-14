// NOW=<ms> node data.js : prints every number the takes show (from _sn.js on the built page)
const {open}=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const {p,er}=await open(b,390,'now');
 if(process.env.NOW)await p.evaluate(n=>window.__snNow=+n,process.env.NOW);
 await p.addScriptTag({content:fs.readFileSync(__dirname+'/../i/_si.js','utf8')});await p.addScriptTag({content:fs.readFileSync(__dirname+'/_sn.js','utf8')});
 const o=await p.evaluate(()=>({now:new Date(SN.NOW).toISOString(),graded:SN.R.length,rank:SN.rank,next:SN.nextBell&&{t:new Date(SN.nextBell.t).toISOString(),rs:SN.nextBell.rs.map(r=>r.n+' '+r.ticker),when:SN.bellWhen(SN.nextBell)},
  wins:SN.all.map(x=>({k:x.w.k,when:x.w.when,rounds:x.w.rs.map(r=>r.n).join(','),fight:[x.F.a,x.F.b],amts:Object.fromEntries(Object.entries(x.amts).map(([m,v])=>[m,Math.round(v)])),gap:x.gap,wa:x.wa,wb:x.wb,order:x.F.o,line:x.line.replace(/<[^>]+>/g,'')})),empty:SN.emptyLine().replace(/<[^>]+>/g,'')}));
 console.log(JSON.stringify(o,null,1));console.log(er.join('|')||'ok');await b.close()})();
