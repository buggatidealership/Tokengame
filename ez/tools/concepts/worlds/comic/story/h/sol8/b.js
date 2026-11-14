/* B · THE COIN HILL. Beat 1 answers the question with luck itself: 1,000 coin flippers make 80 trades each, and where they land
   piles up as stacks of gold coins (each coin drawn = 5 flippers; the exact binomial counts for 80 trades). The stacks inside the
   coin's 95 in 100 range are bright gold, the rare tails bronze. Then the four AIs stand on the same ground as pins, at their own
   hit rate, ranked by height (#1 tallest, largest). Whoever stands past the gold did what fewer than 1 coin in 40 does.
   The x axis is hit rate, so Grok (72 trades) and the others (80) share it; Grok's own range for 72 is 28 to 44 (61.1%), the
   hill's for 80 is 31 to 49 (61.25%): the same verdict either way. Everything is drawn in code, no new painting. */
(function(){const P5=window.P5,S=window.S7,S8=window.S8,t=S.t;
const LG=[0];for(let i=1;i<=400;i++)LG[i]=LG[i-1]+Math.log(i);const pmf=(n,k)=>Math.exp(LG[n]-LG[k]-LG[n-k]-n*Math.LN2);
const halo=(s,c)=>`<tspan fill="${c}" stroke="#050807" stroke-width="7" paint-order="stroke" stroke-linejoin="round">${s}</tspan>`;
const b1={id:'b',kick:'Where luck lands',
 html(X){const n=Math.max(...X.MS.map(m=>X.A[m].t)),r=S.range(n);let inn=0;for(let k=r.lo;k<=r.hi;k++)inn+=pmf(n,k);
  return `<p class="s8-ln">Give <b>1,000 coins</b> ${n} trades each. <b>${Math.round(inn*1000)} of them</b> land in the gold. Then the four AIs.</p><div class="s8b-st"></div>`},
 draw(el,X){const n=Math.max(...X.MS.map(m=>X.A[m].t)),R=S.range(n),K0=Math.round(n*.27),K1=Math.round(n*.73),xa=50,xb=950,base=520,step=9.2,per=5;
  const Xk=k=>xa+(k-K0)/(K1-K0)*(xb-xa),cw=(xb-xa)/(K1-K0);let coins='',stems='',heads='';
  const top={};
  for(let k=K0;k<=K1;k++){const c=Math.round(1000*pmf(n,k)/per),inz=k>=R.lo&&k<=R.hi;top[k]=base-c*step;
    for(let j=0;j<c;j++){const y=base-j*step;coins+=`<ellipse cx="${Xk(k).toFixed(1)}" cy="${(y+3).toFixed(1)}" rx="${(cw*.46).toFixed(1)}" ry="4.6" fill="${inz?'#8a5a06':'#4a3412'}"/><ellipse cx="${Xk(k).toFixed(1)}" cy="${y.toFixed(1)}" rx="${(cw*.46).toFixed(1)}" ry="4.6" fill="url(#${inz?'s8bg':'s8bz'})" stroke="${inz?'#fff0a8':'#a07a3c'}" stroke-opacity=".55" stroke-width=".8"/>`}}
  /* the four, at their own hit rate on the coins' scale (k = rate x n), ranked by height: #1 tallest and largest */
  const L=S8.lead(X),ord=S.rows(X),H=[96,160,250,320],sideL={};
  ord.forEach((r,i)=>{const x=Xk(r.hr*n),col=S8.col(X,r.m),rad=i?25:33,hy=H[i]||240,k=Math.round(r.hr*n),sy=Math.min(base,top[k]!=null?top[k]-6:base);
    stems+=`<line x1="${x.toFixed(1)}" y1="${hy+rad}" x2="${x.toFixed(1)}" y2="${base+18}" stroke="${col}" stroke-width="${i?2.4:3.4}" stroke-opacity=".9"/><path d="M${(x-9).toFixed(1)} ${base+30} L${(x+9).toFixed(1)} ${base+30} L${x.toFixed(1)} ${base+16}Z" fill="${col}"/>`;
    const right=i===0, lx=right?x+rad+12:x-rad-12,a=right?'start':'end',v=S8.verdict(r);
    heads+=`<circle cx="${x.toFixed(1)}" cy="${hy}" r="${rad}" fill="#06080a" stroke="${col}" stroke-width="${i?3:4.5}"/>${P5.mark(r.m,x,hy,rad*1.15,col)}`+
     t(lx,hy-2,i?33:42,'',{a,raw:halo(S.NM[r.m].toUpperCase(),col)})+t(lx,hy+(i?32:42),i?30:34,'',{a,raw:halo(r.W+' OF '+r.t,v==='past'?'#ffd21f':'#f8f0d9')})});
  let ax='';[.3,.4,.5,.6,.7].forEach(v=>{const x=Xk(v*n);ax+=`<line x1="${x.toFixed(1)}" y1="${base+8}" x2="${x.toFixed(1)}" y2="${base+14}" stroke="#9fd8b4" stroke-opacity=".6" stroke-width="2"/>`+t(x,base+66,30,Math.round(v*100)+'%',{a:'middle',c:v===.5?'#ffb21a':'#9fd8b4',op:.9})});
  const gx0=Xk(R.lo)-cw/2,gx1=Xk(R.hi)+cw/2;
  el.querySelector('.s8b-st').innerHTML=`<svg class="s8b-svg" viewBox="0 0 1000 650" role="img" aria-label="1,000 coins, ${n} trades each, piled as stacks by how many they got right; the gold stacks hold the coin's 95 in 100 range, ${R.lo} to ${R.hi} of ${n}. The four AIs stand as pins at their own hit rate: ${ord.map(r=>S.NM[r.m]+' '+r.W+' of '+r.t).join(', ')}.">
   <defs><linearGradient id="s8bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2a0"/><stop offset=".45" stop-color="#ffcc2a"/><stop offset="1" stop-color="#c88a0a"/></linearGradient>
    <linearGradient id="s8bz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c79a52"/><stop offset="1" stop-color="#6e4a1c"/></linearGradient>
    <radialGradient id="s8bk" cx="50%" cy="78%" r="70%"><stop offset="0" stop-color="#2a1f05"/><stop offset=".5" stop-color="#0a120c"/><stop offset="1" stop-color="#020403"/></radialGradient>
    <filter id="s8bbl" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
   <rect width="1000" height="650" fill="url(#s8bk)"/>
   <rect x="${gx0.toFixed(1)}" y="${base+8}" width="${(gx1-gx0).toFixed(1)}" height="8" fill="#ffd21f" opacity=".85"/>
   <line x1="${xa-20}" y1="${base+12}" x2="${xb+20}" y2="${base+12}" stroke="#9fd8b4" stroke-opacity=".3" stroke-width="2"/>
   ${stems}<g>${coins}</g>${ax}
   <g filter="url(#s8bbl)">${heads}
    ${t(xa-10,46,30,'1,000 COINS · '+n+' TRADES EACH',{c:'#ffd21f'})}
    ${t((gx0+gx1)/2,base+106,30,'THE GOLD: '+R.lo+'–'+R.hi+' RIGHT OF '+n,{a:'middle',c:'#ffd21f'})}
   </g></svg>`}};
S8.mount(b1)})();
