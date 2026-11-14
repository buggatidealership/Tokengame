/* Take B, "Give 1,000 coins the same test": the coin pile. 1,000 coins each flip once per call; the pile shows where they land
   (the exact binomial for the same number of calls, one drawn coin per 2 coins). Each AI is pinned where its hit rate lands:
   far out on the right edge of the pile = hard to call luck. Under it, the same axis: first half of its calls against the last half,
   with the band a coin lands in on that many flips. Numbers: P2.M (ROUNDS, __x2pPnl), P2.pmf. */
window.P2T={id:'b',zoom:'.p2-b .b-pile',html(P){const MS=P.byH,n=Math.max(...MS.map(m=>P.M[m].t)),pm=P.pmf(n),lo=.28,hi=.76,X=v=>(v-lo)/(hi-lo)*1000,H=330,base=300;
  const coin=(x,y,s)=>{const r=PQ.rnd(s),t=(r-.5)*1.6;return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${t.toFixed(1)})"><ellipse rx="11.5" ry="5" cy="1.8" fill="#0d0b10"/><ellipse rx="11" ry="4.6" fill="${r<.12?'#e2a52b':'#f5c542'}" stroke="#0d0b10" stroke-width="1.3"/><ellipse rx="7" ry="2.6" fill="none" stroke="#b47a12" stroke-width="1"/><path d="M-7 -2 Q-2 -4.4 4 -3.6" stroke="#fff4c4" stroke-width="1.3" fill="none" stroke-linecap="round"/></g>`};
  let pile='';for(let k=0;k<=n;k++){const v=k/n;if(v<lo||v>hi)continue;const c=Math.round(pm[k]*1000/2);for(let j=0;j<c;j++)pile+=coin(X(v)+(PQ.rnd(k*31+j)-.5)*2.2,base-5-j*6.1,k*97+j)}
  /* pins: four heights, the label on the side with room */
  const pins=MS.map((m,i)=>{const x=P.M[m],cx=X(x.h)/10,lab=cx>58?'l':'r';return `<div class="b-pin b-${lab}" style="--x:${cx}%;--row:${i};--mc:${x.col}">
     <i class="b-stick"></i><span class="b-tag">${P.face(m,'b-fc')}<span><b>${x.nm} ${P.fmt(x.h)}</b><small>${x.h>.5?`beats ${x.beat} of 1,000 coins`:`${1000-x.beat} of 1,000 coins beat it`}</small></span></span></div>`}).join('');
  const band=1.96*.5/Math.sqrt(40);
  const tr=MS.map(m=>{const x=P.M[m],a=X(x.A.h)/10,b=X(x.B.h)/10,up=x.B.h>x.A.h;return `<li style="--mc:${x.col}">${P.face(m,'b-fs')}<span class="b-tk">
     <i class="b-cb" style="left:${X(.5-band)/10}%;right:${100-X(.5+band)/10}%"></i><i class="b-mid" style="left:${X(.5)/10}%"></i>
     <i class="b-ar ${up?'b-up':'b-dn'}" style="left:${Math.min(a,b)}%;width:${Math.abs(b-a)}%"></i>
     <i class="b-c0" style="left:${a}%" title="first ${x.A.t} calls ${P.fmt(x.A.h)}"></i><i class="b-c1 ${up?'b-up':'b-dn'}" style="left:${b}%"></i></span>
     <em class="${up?'p2-up':'p2-dn'}">${P.fmt(x.A.h)} → ${P.fmt(x.B.h)}</em></li>`}).join('');
  return `<div class="b-st"><div role="heading" aria-level="2" class="p2-hd b-hd" aria-label="Smart or lucky?">${P.letter('Smart or lucky?',8)}</div>
    <p class="b-kick"><span class="p2-cap">Give 1,000 coins the same test.</span></p></div>
   <figure class="b-pile" aria-label="Where 1,000 coins land after ${n} flips, and where each AI lands">
    <div class="b-pl"><svg viewBox="0 0 1000 ${H}" aria-hidden="true">${pile}<path d="M0 ${base+4} Q500 ${base+1} 1000 ${base+5}" stroke="#0d0b10" stroke-width="3" fill="none"/></svg>${pins}</div>
    <div class="b-ax">${[.3,.4,.5,.6,.7].map(v=>`<span style="left:${X(v)/10}%"${v===.5?' class="b-ax5"':''}>${v===.5?'Coin 50%':P.fmt(v)}</span>`).join('')}</div>
    <figcaption>Each coin flipped once per call, ${n} times. One drawn coin is 2 coins.${MS.some(m=>P.M[m].t!==n)?` ${MS.filter(m=>P.M[m].t!==n).map(m=>P.NM[m]+' made '+P.M[m].t).join(', ')} calls, scored against its own count.`:''}</figcaption></figure>
   <section class="b-tr" aria-label="Getting better?"><div role="heading" aria-level="3" class="b-h3">${P.letter('Getting better?',4,{j:.6})}</div>
    <p class="b-lg"><i class="b-c0"></i> first half of its calls <i class="b-c1 b-up"></i> last half <i class="b-cbk"></i> where a coin lands on 40 flips</p><ol>${tr}</ol></section>`}};
