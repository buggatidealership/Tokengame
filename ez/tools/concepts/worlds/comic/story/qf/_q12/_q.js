/* shared helpers for q1/q2: reads only the page's globals */
window.__qShared=(function(){
 const KEYS=['GPT','KIMI','CLAUDE','GROK'];
 const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
 const r=ROUNDS.find(x=>x.n===66);
 const A=__x2pPnl().A;
 const calls=r.calls.map(c=>{const m=String(c[1]).match(/(UP|DOWN)\s*([\d.]+)/i);return {m:c[0],up:/UP/i.test(m[1]),mag:+m[2],off:+c[2],txt:(/UP/i.test(m[1])?'Up ':'Down ')+m[2]+'%',ok:(/UP/i.test(m[1]))===(r.a>0),v:A[c[0]].per[66].v}});
 const win=KEYS.filter(m=>new RegExp('\\b'+m+'\\b','i').test(r.win||''));
 const lead=KEYS.slice().sort((a,b)=>A[b].pnl-A[a].pnl)[0];
 const money=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
 const pct=v=>(v>0?'+':v<0?'−':'')+Math.abs(v).toFixed(2)+'%';
 const sfx=(r.ticker.match(/\.([A-Z]+)$/)||[])[1];
 const EX={L:['London','4:30'],AS:['Amsterdam','5:30'],DE:['Frankfurt','5:30'],SW:['Zurich','5:30'],PA:['Paris','5:30'],KS:['Seoul','3:30'],T:['Tokyo','3:30'],TW:['Taipei','1:30'],HK:['Hong Kong','4:00']}[sfx]||['New York','4:00'];
 const day=s=>{const m=String(s).match(/(\d+)\/(\d+)\/(\d+)/);return new Date(Date.UTC(2000+ +m[3],m[1]-1,+m[2],12)).toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'UTC'})};
 const face=(m,cls)=>{const M=MODELS[m];return `<svg class="${cls||''}" viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d}" style="fill:${m==='GROK'?'#15121a':M.c}"/></svg>`};
 const prev=ROUNDS.filter(x=>x.n<66).sort((a,b)=>b.n-a.n);
 const wn=x=>{const w=KEYS.filter(m=>new RegExp('\\b'+m+'\\b','i').test(x.win||''));return w.length?w.map(m=>NM[m]).join(' & '):'Nobody'};
 return {KEYS,NM,r,A,calls,win,lead,money,pct,EX,day,face,prev,wn,logo:CO_LOGOS[r.ticker],graded:ROUNDS.length};
})();
