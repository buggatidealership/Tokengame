const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('http://localhost:8923/v47-live-x3plus.html',{waitUntil:'load'});
await p.waitForFunction(()=>window.__x2pPnl&&window.ROUNDS&&document.documentElement.classList.contains('x2p-world'),null,{timeout:90000});
const o=await p.evaluate(()=>{const P=__x2pPnl().A,R=ROUNDS.slice().sort((a,b)=>a.n-b.n);const out={N:R.length,last:R[R.length-1].n,first:R[0].called,lastd:R[R.length-1].resolves};
 for(const m of ['GPT','KIMI','CLAUDE','GROK']){const seq=[];let k=0,n=0,best={h:0},runs=[];let cur=0,bestW=0,bestL=0,cw=0,cl=0;
  R.forEach(r=>{const c=r.calls.find(x=>x[0]===m&&x[1]);if(!c)return;const up=/^UP/i.test(c[1]),ok=up===(r.a>0);n++;if(ok)k++;seq.push(ok?'W':'L');
   if(ok){cw++;cl=0}else{cl++;cw=0}bestW=Math.max(bestW,cw);bestL=Math.max(bestL,cl);
   if(n>=20&&k/n>best.h)best={h:k/n,n:r.n,k,c:n}});
  out[m]={W:P[m].W,L:P[m].L,pnl:Math.round(P[m].pnl),n,k,hr:k/n,seq:seq.join(''),best,bestW,bestL,first30:seq.slice(0,Math.floor(seq.length/2)).filter(x=>x==='W').length+'/'+Math.floor(seq.length/2),last:seq.slice(Math.floor(seq.length/2)).filter(x=>x==='W').length+'/'+(seq.length-Math.floor(seq.length/2))}}
 // Grok's running rate by round n
 const g=[];let k=0,n=0;R.forEach(r=>{const c=r.calls.find(x=>x[0]==='GROK'&&x[1]);if(c){n++;if(/^UP/i.test(c[1])===(r.a>0))k++}g.push(r.n+':'+(n?Math.round(k/n*100):'-')+'('+k+'/'+n+')')});out.grokRun=g.join(' ');
 out.rounds=R.map(r=>r.n+' '+r.ticker+' '+r.a+' '+r.resolves+' '+r.calls.map(c=>c[0][0]+(c[1]?(/^UP/i.test(c[1])?'+':'-'):'.')).join('')).join('\n');
 return out});
console.log(JSON.stringify(o,null,1));await b.close()})();
