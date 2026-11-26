/* Take D, "The coin jars": every call is a coin dropped in the AI's jar, green if it got the direction right, red if not.
   Calls go in rows of ten from the bottom (the first ten calls) up (the latest), greens sorted to the left of each row, so each
   row reads as a little bar against the gold line down the middle (a coin's half). Rows above that are greener than the ones
   below = getting better. Numbers: the calls in order from ROUNDS (P2.M[m].seq). */
window.P2T={id:'d',zoom:'.p2-d .d-j',html(P){const MS=P.byH,maxT=Math.max(...MS.map(m=>P.M[m].t)),R=Math.ceil(maxT/10);
  const jar=(m,i)=>{const x=P.M[m],s=x.seq,cw=20,gap=1.6,W=10*cw+2*14,rows=[];for(let r=0;r<R;r++){const g=s.slice(r*10,r*10+10);rows.push({ok:g.filter(c=>c.ok).length,n:g.length})}
    const top=46,H=top+R*(cw+gap)+16;let coins='';
    rows.forEach((rw,r)=>{const y=H-16-(r+.5)*(cw+gap);for(let k=0;k<rw.n;k++){const ok=k<rw.ok,cx=14+cw*(k+.5)+(PQ.rnd(i*400+r*13+k)-.5)*1.6,cy=y+(PQ.rnd(i*500+r*17+k)-.5)*2;
      coins+=`<g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${((PQ.rnd(i*9+r*3+k)-.5)*30).toFixed(0)})"><circle r="${cw/2-.6}" fill="#0d0b10"/><circle r="${cw/2-2}" fill="${ok?'#1fbf5f':'#e8392b'}"/><circle r="${cw/2-5}" fill="none" stroke="${ok?'#0b7a3a':'#8f1a14'}" stroke-width="1.3"/><path d="M-5 -3.5 Q-1 -6.6 4 -5.6" stroke="#fff8" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`}});
    const jx=(n)=>(n+(PQ.rnd(i*77+n)-.5)*1.4).toFixed(1);
    const glass=`M${jx(10)} ${top-6} Q4 ${top} ${jx(4)} ${top+18} L${jx(3)} ${H-12} Q4 ${H-1} 20 ${H} L${W-20} ${H} Q${W-4} ${H-1} ${W-3} ${H-12} L${W-4} ${top+18} Q${W-4} ${top} ${W-10} ${top-6}Z`;
    return `<figure class="d-j" style="--mc:${x.col}" aria-label="${x.nm}: ${x.W} right of ${x.t} calls. First ${x.A.t} calls ${P.fmt(x.A.h)}, last ${x.B.t} ${P.fmt(x.B.h)}.">
      <svg viewBox="-4 -4 ${W+8} ${H+8}" aria-hidden="true"><path d="${glass}" fill="#d6ecef22" stroke="#0d0b10" stroke-width="4"/>${coins}
       <path d="M${W/2} ${top+8} L${W/2} ${H-8}" stroke="#ffd23f" stroke-width="3" stroke-dasharray="7 5"/><path d="M${W/2} ${top+8} L${W/2} ${H-8}" stroke="#0d0b10" stroke-width="1" stroke-dasharray="7 5" transform="translate(1.5 0)"/>
       <path d="M14 ${top+14} Q11 ${(top+H)/2} 15 ${H-22}" stroke="#ffffffb0" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M24 ${top+12} L24 ${top+40}" stroke="#ffffff80" stroke-width="3" stroke-linecap="round"/>
       <path d="${glass}" fill="none" stroke="#9fd0d6" stroke-width="1.4" transform="translate(${W*.012} 1) scale(.976 .99)"/>
       <rect x="${jx(6)}" y="${top-22}" width="${W-12}" height="20" rx="4" fill="#b8b2a3" stroke="#0d0b10" stroke-width="3.5"/>${[...Array(12)].map((_,k)=>`<path d="M${14+k*(W-28)/11} ${top-19} L${14+k*(W-28)/11} ${top-5}" stroke="#6b665c" stroke-width="2"/>`).join('')}
       <path d="M10 ${top-20} L${W-10} ${top-20}" stroke="#eee8d8" stroke-width="2.4"/></svg>
      <figcaption class="d-tag" style="--t:${(i%2?1:-1)*2.2}deg">${P.face(m,'d-fc')}<b>${x.nm}</b><span><em>${x.W}</em> right of ${x.t}</span>
       <small>${x.odds?`A coin does this 1 time in ${x.odds}`:'Worse than a coin'}</small></figcaption></figure>`};
  return `<div class="d-wall"><div role="heading" aria-level="2" class="p2-hd d-hd" aria-label="Smart or lucky?">${P.letter('Smart or lucky?',12)}</div>
   <p class="d-k"><span class="p2-cap">Every call is a coin in the jar.</span></p>
   <p class="d-key"><i class="d-g"></i> right <i class="d-r"></i> wrong <i class="d-l"></i> a coin's half · first calls at the bottom, latest on top</p>
   <div class="d-sh">${MS.map(jar).join('')}</div>
   <p class="d-ft">Greener rows on top would mean getting better. ${MS.map(m=>`${P.NM[m]} ${P.fmt(P.M[m].A.h)} → ${P.fmt(P.M[m].B.h)}`).join(' · ')}</p></div>`}};
