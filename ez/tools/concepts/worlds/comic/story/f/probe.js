// node probe.js [seenJSON]: prints the story facts SF computes on the built page
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const C=__dirname+'/../c/',rd=f=>fs.readFileSync(f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8897/v47-live-x3plus.html#/leaderboard',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 if(process.argv[2])await p.evaluate(s=>window.__sfSeen=JSON.parse(s),process.argv[2]);
 for(const f of [C+'_c.js',__dirname+'/../../brand/_pal.js',__dirname+'/_sf.js'])await p.addScriptTag({content:rd(f)});
 console.log(await p.evaluate(()=>{const S=SF;return JSON.stringify({mode:S.mode,since:S.since,short:S.sinceShort,hand:S.handLine,win:S.win.map(r=>r.n+':'+r.ticker+':'+r.a+':'+r.win),
  hands:S.hand.map(h=>h.r.n+' '+h.r.co+' '+h.from+'->'+h.m),before:S.before,now:S.now,gap:S.gap,delta:S.delta,wl:S.wl,cur:S.cur,
  locked:S.locked.map(p=>p.ticker+' '+S.tally(p).u+'u'+S.tally(p).dn+'d'),bell:new Date(S.bellAt).toISOString(),left:S.left(S.bellAt),due:S.due.map(u=>u.ticker+' '+u.called),dueK:S.dueK,stale:S.stale.map(u=>u.n+' '+u.ticker+' '+u.called),
  bw:Object.fromEntries(Object.entries(S.bw).map(([m,x])=>[m,[x.b.r.ticker,Math.round(x.b.v),x.w.r.ticker,Math.round(x.w.v)]])),days:S.days.map(g=>g.s+':'+g.rs.length),seq:Object.fromEntries(S.ORDER.map(m=>[m,S.P[m].seq.slice(-5).join('')]))},null,1)}));
 console.log(er.join('|')||'ok');await b.close()})();
