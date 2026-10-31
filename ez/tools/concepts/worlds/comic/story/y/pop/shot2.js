const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
(async()=>{const b=await chromium.launch();const q=await b.newPage();await q.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});await q.waitForFunction(()=>window.__x2pPnl&&window.ROUNDS,null,{timeout:60000});
 const D=await q.evaluate(()=>{const A=window.__x2pPnl().A,ms=Object.keys(A).sort((a,b)=>A[b].pnl-A[a].pnl),f=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
  const R=ROUNDS,L=R[R.length-1],day=R.filter(r=>r.resolves===L.resolves),big=day.slice().sort((a,b)=>Math.abs(b.a)-Math.abs(a.a))[0];
  const nm={GPT:'GPT',KIMI:'KIMI',CLAUDE:'CLAUDE',GROK:'GROK'};const fl=R.filter(r=>window.FILMS&&FILMS[r.n]).pop();
  const md=s=>{const [m,d]=s.split('/');return ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][m-1]+' '+(+d)};
  return {models:MODELS,names:nm,top:ms,leadPnl:f(A[ms[0]].pnl),last4:ms[3],lastpnl:f(A[ms[3]].pnl),graded:R.length,
   last:{n:L.n,ticker:L.ticker,date:md(L.resolves)},win:(L.win||'').split(/[ ,&]+/)[0]||ms[0],
   big:{move:big.ticker+' '+(big.a>0?'+':'−')+Math.abs(big.a)+'%'},worst:{txt:'LAST: '+nm[ms[3]]},
   film:{n:fl.n,co:fl.co,ticker:fl.ticker,win:(fl.win||'').split(/[ ,&]+/)[0],p:FILMS[fl.n].p}}});
 D.poster='data:image/jpeg;base64,'+fs.readFileSync('/home/user/Tokengame/ez/media/'+D.film.p+'.jpg').toString('base64');
 const p=await b.newPage({viewport:{width:1300,height:640},deviceScaleFactor:2});await fonts(p);await p.goto('file://'+__dirname+'/pop2.html');
 await p.evaluate(D=>{window.MODELS=D.models},D);await p.evaluate(()=>document.fonts.ready);await p.evaluate(D=>draw(D),D);await p.waitForTimeout(800);
 await p.screenshot({path:process.argv[2],clip:{x:0,y:0,width:1290,height:640}});console.log(JSON.stringify({top:D.top,win:D.win,big:D.big,film:D.film.n,last:D.last}));await b.close()})();
