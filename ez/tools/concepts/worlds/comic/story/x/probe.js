const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
(async()=>{const b=await chromium.launch();const {p,er}=await open(b,1280,'now');
 console.log(JSON.stringify(await p.evaluate(()=>{const S=window.SS;return Object.fromEntries(Object.entries(S.X).map(([k,x])=>[k,{when:x.w.when,n:x.rs.length,o:x.o,rows:Object.fromEntries(S.ORDER.map(m=>{const a=x.row[m];return [m,{amt:Math.round(a.amt),W:a.W,L:a.L,hr:S.hr(a),l5:a.l5.filter(Boolean).length,top:a.top&&Math.round(a.top.v),low:a.low&&Math.round(a.low.v)}]}))}]))})));
 console.log(er.join('|')||'ok');await b.close()})();
