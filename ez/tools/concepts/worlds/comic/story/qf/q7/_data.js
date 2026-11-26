/* shared data reader for q7/q8: everything from the page's globals, nothing typed */
window.__qfData=function(N){
  const r=ROUNDS.find(x=>x.n===N);const P=window.__x2pPnl();
  const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
  const up=r.a>0;
  const calls=r.calls.map(c=>{const m=c[0],dir=/UP/.test(c[1])?'UP':'DOWN',mag=c[1].replace(/^(UP|DOWN)\s*/,'');
    const ok=(dir==='UP')===up;const q=P.A[m].per[N];
    return {m,nm:NM[m],dir,mag,off:c[2],ok,win:new RegExp('\\b'+m+'\\b').test(r.win||''),v:q?q.v:0,col:m==='GROK'?'#15121a':MODELS[m].c,d:MODELS[m].d,dot:MODELS[m].dot,dotc:MODELS[m].dotc,fr:MODELS[m].fr}});
  const md=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?new Date(Date.UTC(2000+(+m[3]%100),+m[1]-1,+m[2],12)):null};
  const day=s=>{const d=md(s);return d?d.toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'UTC'}):''};
  const usd=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
  const move=(r.a>0?'+':'−')+Math.abs(r.a).toFixed(2)+'%';
  const prev=ROUNDS.filter(x=>x.n<N).slice(-9).reverse();
  return {r,N,co:r.co,tk:r.ticker,name:r.co+' ('+r.ticker+')',calls,up,move,called:day(r.called),graded:day(r.resolves),usd,logo:CO_LOGOS[r.ticker]?'media/'+CO_LOGOS[r.ticker].f:'',
    nUp:calls.filter(c=>c.dir==='UP').length,nDn:calls.filter(c=>c.dir==='DOWN').length,winner:calls.find(c=>c.win),prev,NM,
    face:(c,cls)=>`<svg class="${cls||''}" viewBox="0 0 24 24" aria-hidden="true"><path d="${c.d}" ${c.fr?'fill-rule="evenodd"':''}/>${c.dot?`<path d="${c.dot}" style="fill:${c.dotc}"/>`:''}</svg>`,
    logoOf:t=>CO_LOGOS[t]?'media/'+CO_LOGOS[t].f:'',colOf:t=>CO_LOGOS[t]?CO_LOGOS[t].c:'#333'};
};
