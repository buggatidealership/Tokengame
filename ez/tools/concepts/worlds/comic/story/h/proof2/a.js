/* Take A, "Out of the fog": the lighthouse. Each AI's hit rate after every call it made, sailing through the fog of luck:
   the fog is where a coin flipper usually ends up after that many calls (50% +- 1.96 x 0.5 / sqrt(n)); it thins as calls pile up.
   A line above the fog is hard to put down to luck. Numbers: ROUNDS via P2.M, the page's own (W+1)/(n+2) running rate. */
window.P2T={id:'a',zoom:'.p2-a .a-ch',html(P){const MS=P.byH,maxT=Math.max(...MS.map(m=>P.M[m].t)),H=620,lo=.3,hi=.8,
  X=i=>i/maxT*1000,Y=v=>H-(v-lo)/(hi-lo)*H;
  /* the fog: three scalloped layers between the coin's usual range, from call 4 to the last */
  const fog=k=>{const up=[],dn=[];const cl=v=>Math.max(-6,Math.min(H+6,v));for(let n=12;n<=maxT;n+=4){const b=1.96*.5/Math.sqrt(n)*(1+k*.12);up.push([X(n),cl(Y(.5+b))]);dn.push([X(n),cl(Y(.5-b))])}
    return `M${up[0][0]} ${up[0][1]}`+P.scallop(up,-1,11+k*7,1.1-k*.2)+` L${dn[dn.length-1][0]} ${dn[dn.length-1][1]}`+P.scallop(dn.slice().reverse(),1,21+k*5,1.1-k*.2)+'Z'};
  const ln=MS.map(m=>{const r=P.rate(m),d=r.map((v,i)=>(i?'L':'M')+X(i+1).toFixed(1)+' '+Y(v).toFixed(1)).join(' ');
    return `<path d="${d}" class="a-lo"/><path d="${d}" class="a-ln" style="--mc:${P.M[m].col}"/>`}).join('');
  const ends=PQ.spread(MS.map(m=>{const r=P.rate(m);return {m,y:Y(r[r.length-1])/H*100,x:X(P.M[m].t)/10}}),13);
  const bL=1.96*.5/Math.sqrt(maxT);
  const out=m=>P.M[m].h-.5>P.M[m].band;
  return `<div class="a-pn"><div role="heading" aria-level="2" class="p2-hd a-hd" aria-label="Smart or lucky?">${P.letter('Smart or',3)}<br>${P.letter('lucky?',5)}</div>
   <p class="a-sub"><span class="p2-cap">Inside the fog, a coin could have done it.</span></p>
   <figure class="a-ch" aria-label="Hit rate after every call. Above the fog: ${MS.filter(out).map(m=>P.NM[m]).join(', ')||'nobody'}.">
    <div class="a-pl"><svg viewBox="0 0 1000 ${H}" preserveAspectRatio="none" aria-hidden="true"><defs>${P.rough}<linearGradient id="a-beam" x1="1" x2="0"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".95"/><stop offset=".7" stop-color="#f5c542" stop-opacity=".35"/><stop offset="1" stop-color="#f5c542" stop-opacity="0"/></linearGradient></defs>
     ${[.4,.6,.7].map(v=>`<path class="a-gr" d="M0 ${Y(v)} L1000 ${Y(v)}"/>`).join('')}
     <path class="a-beam" d="M1000 ${Y(.5)-16} L0 ${Y(.5)-4} L0 ${Y(.5)+4} L1000 ${Y(.5)+16}Z"/><path class="a-bc" d="M0 ${Y(.5)} L1000 ${Y(.5)}"/>
     <g filter="url(#p2rough)">${ln}</g>
     <path class="a-fg a-fg2" d="${fog(2)}"/><path class="a-fg a-fg1" d="${fog(1)}"/><path class="a-fg a-fg0" d="${fog(0)}"/></svg>
     ${[.4,.6,.7].map(v=>`<span class="a-ax" style="top:${Y(v)/H*100}%">${Math.round(v*100)}%</span>`).join('')}
     <span class="a-ax a-bl" style="top:${Y(.5)/H*100}%">Coin<br>50%</span>
     ${ends.map(e=>`<span class="a-end${out(e.m)?' a-out':''}" style="top:${e.y}%;--mc:${P.M[e.m].col}">${P.face(e.m,'a-fc')}<b>${P.fmt(P.M[e.m].h)}</b></span>`).join('')}
    </div><figcaption class="a-x"><span>Call 1</span><span>Calls made</span><span>${maxT}</span></figcaption></figure>
   <ol class="a-log">${MS.map((m,i)=>{const x=P.M[m];return `<li style="--mc:${x.col};--t:${(i%2?1:-1)*.7}deg">
     <b class="a-nm">${x.nm}</b> <em class="${out(m)?'a-o1':'a-o0'}">${out(m)?'out of the fog':x.h>.5?'in the fog':'under the fog line'}</em>
     <span class="a-od">${x.odds?`A coin does this well about 1 time in ${x.odds}.`:'Doing worse than a coin.'}</span>
     <span class="a-tr">First ${x.A.t} calls <b>${P.fmt(x.A.h)}</b> → last ${x.B.t} <b class="${x.B.h>x.A.h?'p2-up':'p2-dn'}">${P.fmt(x.B.h)}</b></span></li>`}).join('')}</ol>
   <p class="a-foot">The fog thins with every call. Now it runs from ${P.fmt(.5-bL)} to ${P.fmt(.5+bL)}.</p></div>`}};
