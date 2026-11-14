// The live numbers for take A, read from the page's globals (as pop/shot2.js does), plus company names.
module.exports=async function(q){return q.evaluate(()=>{const A=window.__x2pPnl().A,ms=Object.keys(A).sort((a,b)=>A[b].pnl-A[a].pnl),f=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
  const R=ROUNDS,L=R[R.length-1],day=R.filter(r=>r.resolves===L.resolves),big=day.slice().sort((a,b)=>Math.abs(b.a)-Math.abs(a.a))[0];
  const nm={GPT:'GPT',KIMI:'KIMI',CLAUDE:'CLAUDE',GROK:'GROK'};
  const md=s=>{const [m,d]=s.split('/');return ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][m-1]+' '+(+d)};
  const win=(L.win||'').split(/[ ,&]+/).filter(w=>nm[w.toUpperCase()]).map(w=>w.toUpperCase());
  return {models:Object.fromEntries(Object.entries(MODELS).map(([k,v])=>[k,{c:v.c,d:v.d,fr:v.fr}])),names:nm,top:ms,pnl:Object.fromEntries(ms.map(m=>[m,f(A[m].pnl)])),
   graded:R.length,last:{n:L.n,co:L.co,ticker:L.ticker,date:md(L.resolves),a:L.a},win,day:md(L.resolves),
   big:{co:big.co,ticker:big.ticker,a:big.a},lastm:ms[3]}})};
