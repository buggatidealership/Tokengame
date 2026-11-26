/* P&L round (owner, 2026-10-26): one account per AI, exactly the proof's ROI tab (x2pProof): $100,000 to start, the whole balance on
   every call, buy on up, short on down, no leverage, before fees. P&L = balance - $100,000. Per call: what the account made or lost on
   that round. Record: right calls - wrong calls (a "W" is a call that got the direction right). Streak: the current run. */
window.PNL=(function(){var NM={GPT:"GPT",KIMI:"Kimi",CLAUDE:"Claude",GROK:"Grok"},A={};
  ROUNDS.forEach(function(r){r.calls.forEach(function(x){var m=x[0],dn=/^DOWN/.test(x[1]),s=(dn?-1:1)*r.a/100,t=A[m]||(A[m]={m:m,nm:NM[m]||m,ver:(MODELS[m]&&MODELS[m].ver)||m,bal:100000,W:0,L:0,seq:[],per:{},bw:null,bl:null});
    var d=t.bal*s;t.per[r.n]={v:d,dn:dn,mg:parseFloat(x[1].replace(/^(UP|DOWN)\s*/,"")),before:t.bal};t.bal+=d;if(s>0)t.W++;else t.L++;t.seq.push(s>0?"W":"L");
    var tk=/^\d/.test(r.ticker)||String(r.ticker).indexOf(".")>-1?r.co.split(" ")[0]:r.ticker;
    if(!t.bw||d>t.bw.v)t.bw={v:d,t:tk,n:r.n};if(!t.bl||d<t.bl.v)t.bl={v:d,t:tk,n:r.n}})});
  Object.keys(A).forEach(function(m){var t=A[m],k=t.seq[t.seq.length-1],n=0;for(var i=t.seq.length-1;i>=0&&t.seq[i]===k;i--)n++;t.streak=k+n;t.pnl=t.bal-100000;t.pct=t.pnl/1000});
  var usd=function(v,k){var a=Math.abs(v),s=k&&a>=1000?(a/1000).toFixed(a>=100000?0:1)+"K":Math.round(a).toLocaleString("en-US");return (v>=0?"+$":"−$")+s};
  var byVer={},byTitle={ChatGPT:"GPT",GPT:"GPT",Claude:"CLAUDE",Grok:"GROK",Kimi:"KIMI"};Object.keys(A).forEach(function(m){byVer[A[m].ver]=m});
  return {A:A,usd:usd,byVer:byVer,byTitle:byTitle,pc:function(v){return (v>=0?"+":"−")+Math.abs(v).toFixed(1)+"%"}}})();
