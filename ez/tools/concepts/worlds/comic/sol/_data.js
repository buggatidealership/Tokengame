/* shared data for the Smart-or-lucky directions: every number from the page's own P&L accounts (__x2pPnl) and ROUNDS */
(function(){
  const A=window.__x2pPnl().A,R=ROUNDS.slice().sort((a,b)=>a.n-b.n),N=R.length;
  const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
  // P(a fair coin gets k or more right in n), one-sided binomial, as the page's coin()
  const coin=(k,n)=>{let lp=[0];for(let i=1;i<=n;i++)lp[i]=lp[i-1]+Math.log(i);let s=0;for(let i=k;i<=n;i++)s+=Math.exp(lp[n]-lp[i]-lp[n-i]-n*Math.LN2);return s};
  const face=(m,cls)=>{const M=MODELS[m];return `<i class="wc-face ${cls||''}" style="--mc:${M.c}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d}"/></svg></i>`};
  const run=s=>{let bw=0,bl=0,c=0,p='';for(const x of s){c=x===p?c+1:1;p=x;if(x==='W')bw=Math.max(bw,c);else bl=Math.max(bl,c)}return{bw,bl}};
  const ms=Object.keys(A).map(m=>{const a=A[m],t=a.W+a.L,h=a.W/t,p=coin(a.W,t);
    // the AI's own calls in round order, right = the call made money (direction right)
    const calls=R.filter(r=>a.per[r.n]).map(r=>({n:r.n,w:a.per[r.n].v>0}));
    const half=Math.floor(calls.length/2),h1=calls.slice(0,half),h2=calls.slice(half);
    const hr=c=>c.filter(x=>x.w).length/c.length;
    // checkpoints every 10 rounds: hit rate on calls made up to that round
    const ck=[];for(let k=10;k<=N;k+=10)ck.push({n:k,h:hr(calls.filter(x=>x.n<=k))});if(N%10)ck.push({n:N,h:hr(calls)});
    return {m,name:NM[m],c:MODELS[m].c,W:a.W,L:a.L,t,h,p,oneIn:Math.max(2,Math.round(1/p)),h1:hr(h1),h2:hr(h2),n1:h1.length,n2:h2.length,
      w1:h1.filter(x=>x.w).length,w2:h2.filter(x=>x.w).length,seq:a.seq,streak:run(a.seq),ck,exp:t/2}});
  ms.sort((x,y)=>y.h-x.h);
  window.__sl={ms,N,face,coin,pct:x=>Math.round(x*100)+'%'};
})();
