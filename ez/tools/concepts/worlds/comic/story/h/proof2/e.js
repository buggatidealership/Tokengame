/* Take E, "Pulse check": the patient monitor. Each AI is a channel on a 1970s monitor; its trace is the share of right calls in
   its last 20 calls, after every call from the 20th on. The dashed line is a coin's 50%; the faint band is where a coin's own
   pulse usually swings on 20 flips. A trace riding above the band, and climbing, would be skill showing. Numbers: P2.M[m].roll. */
window.P2T={id:'e',zoom:'.p2-e .e-ch:first-child',html(P){const MS=P.byH,maxT=Math.max(...MS.map(m=>P.M[m].t)),lo=.2,hi=.85,Wd=1000,Hc=100,
  Y=v=>Hc-(v-lo)/(hi-lo)*Hc,cb=1.96*.5/Math.sqrt(20);
  const ch=m=>{const x=P.M[m],r=x.roll,X=i=>(i+20)/maxT*Wd,d=r.map((v,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(1)).join(' '),last=r[r.length-1];
    return `<div class="e-ch" style="--mc:${x.col==="#15121a"?"#e8f5e8":x.col}"><div class="e-lb"><b>${x.nm}</b><small>last 20</small></div>
     <svg viewBox="0 0 ${Wd} ${Hc}" preserveAspectRatio="none" aria-hidden="true"><rect x="0" y="${Y(.5+cb)}" width="${Wd}" height="${Y(.5-cb)-Y(.5+cb)}" class="e-cb"/>
      <path d="M0 ${Y(.5)} L${Wd} ${Y(.5)}" class="e-50"/><path d="${d}" class="e-gl"/><path d="${d}" class="e-tr"/><circle cx="${X(r.length-1)}" cy="${Y(last)}" r="3.5" class="e-dot"/></svg>
     <div class="e-rd"><b>${Math.round(last*20)}<small>/20</small></b><span>season ${P.fmt(x.h)}</span></div></div>`};
  return `<div class="e-wr"><div role="heading" aria-level="2" class="p2-hd e-hd" aria-label="Smart or lucky?">${P.letter('Smart or lucky?',15)}</div>
   <p class="e-k"><span class="p2-cap">Pulse check: right calls out of the last 20.</span></p>
   <figure class="e-mon" aria-label="Right calls in the last 20: ${MS.map(m=>P.NM[m]+' '+Math.round(P.M[m].roll.at(-1)*20)).join(', ')} out of 20."><div class="e-scr">${MS.map(ch).join('')}
    <p class="e-ax"><span>call 20</span><span class="e-key"><i></i>coin 50% <i class="e-kb"></i>a coin's own pulse</span><span>call ${maxT}</span></p></div></figure>
   <ol class="e-ch2">${MS.map(m=>{const x=P.M[m],f=x.roll[0],l=x.roll.at(-1);return `<li style="--mc:${x.col}">${P.face(m,'e-fc')}<span><b>${x.nm}</b> first 20 calls ${Math.round(f*20)}/20 → last 20 <em class="${l>f?'p2-up':l<f?'p2-dn':''}">${Math.round(l*20)}/20</em>. ${x.odds?`Over the season a coin does this 1 time in ${x.odds}.`:'Over the season, worse than a coin.'}</span></li>`}).join('')}</ol></div>`}};
