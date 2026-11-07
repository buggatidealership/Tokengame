// Shared by q3 and q4: everything read from the page's globals (ROUNDS, __x2pPnl, MODELS, CO_LOGOS). No typed numbers.
window.__qD=function(N){
  const r=ROUNDS.find(x=>x.n===N),P=__x2pPnl().A,mon=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const day=s=>{const m=String(s).match(/(\d+)\/(\d+)/);return mon[m[1]-1]+' '+(+m[2])};
  const sfx=(r.ticker.match(/\.([A-Z]+)$/)||[])[1];
  // exchange closes as x2plus.js xcloseAt() has them (London 16:30, euro 17:30, Seoul/Tokyo 15:30, Taipei 13:30, HK 16:00, else New York 16:00)
  const EX={L:['London','16:30'],AS:['Amsterdam','17:30'],DE:['Frankfurt','17:30'],SW:['Zurich','17:30'],KS:['Seoul','15:30'],T:['Tokyo','15:30'],TW:['Taipei','13:30'],HK:['Hong Kong','16:00']}[sfx]||['New York','16:00'];
  const calls=r.calls.map(([m,c,off])=>{const up=/^UP/.test(c),sz=parseFloat(c.replace(/^(UP|DOWN)\s*/,''));const pr=P[m].per[N];
    return {m,name:MODELS[m].name==='KIMI'?'Kimi':MODELS[m].name==='CLAUDE'?'Claude':MODELS[m].name==='GROK'?'Grok':MODELS[m].name,c:MODELS[m].c==='#111'?'#15121a':MODELS[m].c,d:MODELS[m].d,up,sz,signed:(up?'+':'−')+sz,off:parseFloat(off),pass:up===(r.a>0),v:pr?pr.v:0}});
  const lead=Object.keys(P).sort((a,b)=>P[b].pnl-P[a].pnl)[0];
  const money=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
  const all=ROUNDS.slice().sort((a,b)=>a.n-b.n);
  return {r,N,co:r.co,tk:r.ticker,coTk:r.co+' ('+r.ticker+')',called:day(r.called),graded:day(r.resolves),move:r.a,moveS:(r.a>0?'+':'−')+Math.abs(r.a).toFixed(2)+'%',
    up:r.a>0,ex:EX[0],exT:EX[1],calls,win:r.win,lead,money,logo:'media/'+CO_LOGOS[r.ticker].f,logoC:CO_LOGOS[r.ticker].c,
    nUp:calls.filter(c=>c.up).length,nDn:calls.filter(c=>!c.up).length,nRounds:all.length,
    near:all.filter(x=>Math.abs(x.n-N)<=(window.__qNear||3)&&x.n!==N).map(x=>({n:x.n,co:x.co,tk:x.ticker,a:x.a,win:x.win,logo:CO_LOGOS[x.ticker]?'media/'+CO_LOGOS[x.ticker].f:null}))};
};
window.__qFace=(c,cls)=>`<svg class="${cls||''}" viewBox="0 0 24 24" aria-hidden="true"><path fill="${c.c}" d="${c.d}"/></svg>`;
