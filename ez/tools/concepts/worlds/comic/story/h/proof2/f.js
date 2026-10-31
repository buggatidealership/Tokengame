/* Take F, "How far to the flag?": a drag strip with one lane per AI. The flag is the number of calls after which a coin could
   match its hit rate only 1 time in 20, if it keeps its season pace (one-sided normal approximation); the hollow flag is the
   same at its pace over the last half of its calls. The car is where it is now (calls made). Past the flag, luck is a stretch
   as an excuse. An AI under 50% has no flag: it is driving the wrong way. Numbers: P2.M (ROUNDS, __x2pPnl). */
window.P2T={id:'f',zoom:'.p2-f .f-ln:nth-child(3)',html(P){const MS=P.byH,need=h=>h>.5?Math.ceil(Math.pow(1.645*.5/(h-.5),2)):null,
  top=Math.max(150,...MS.map(m=>Math.max(P.M[m].t,need(P.M[m].h)||0,need(P.M[m].B.h)||0)));const tp=Math.ceil(top/50)*50,X=v=>Math.min(100,v/tp*100);
  const flag=(cls,x,l)=>`<span class="f-fl ${cls}" style="left:${X(x)}%" aria-hidden="true"><svg viewBox="0 0 22 30"><path d="M3 29 L3 2" stroke="#0d0b10" stroke-width="2.6"/><path d="M3.4 2.6 Q9 .4 13 3 T21 3.4 L21 13 Q16 11 12 13.4 T3.4 12.8Z" class="f-cl" stroke="#0d0b10" stroke-width="1.8"/></svg><small>${l}</small></span>`;
  const lane=(m,i)=>{const x=P.M[m],n=need(x.h),nb=need(x.B.h),past=n&&x.t>=n;return `<li class="f-ln${past?' f-past':''}" style="--mc:${x.col}">
    <div class="f-who">${P.face(m,'f-fc')}<b>${x.nm}</b><span>${P.fmt(x.h)}</span></div>
    <div class="f-rd">${n?flag('f-f1',n,n):''}${nb&&nb!==n?flag('f-f2',nb,nb):''}
     <span class="f-car${n?'':' f-rev'}" style="left:${X(x.t)}%">${PQ.mark(m,'f-mk')}</span><span class="f-tr" style="width:${X(x.t)}%"></span></div>
    <p class="f-say">${!n?`Under 50%: <b>no flag</b>, driving the wrong way.`:past?`<b>Past the flag</b> at ${x.t} calls. A coin does this 1 time in ${x.odds}.`:`<b>${n-x.t} calls</b> to the flag at this pace (1 time in ${x.odds} so far).`}
     ${nb?` Recent pace puts it at ${nb}${nb>(n||0)?', further away':', closer'}.`:n?' Recent pace: under 50%.':''}</p></li>`};
  return `<div class="f-sky"><div role="heading" aria-level="2" class="p2-hd f-hd" aria-label="Smart or lucky?">${P.letter('Smart or',21)}<br>${P.letter('lucky?',22)}</div>
    <p class="f-k"><span class="p2-cap">The flag: where luck stops being a good excuse.</span></p></div>
   <ol class="f-strip" style="--tp:${tp}">${MS.map(lane).join('')}</ol>
   <div class="f-ax">${[0,1,2,3,4,5,6].map(k=>k*50).filter(v=>v<=tp).map(v=>`<span style="left:${X(v)}%">${v}</span>`).join('')}<em>calls made</em></div>
   <p class="f-key">${flag('f-f1 f-kf',0,'')} at its season pace ${flag('f-f2 f-kf',0,'')} at its pace over its last half</p>`}};
