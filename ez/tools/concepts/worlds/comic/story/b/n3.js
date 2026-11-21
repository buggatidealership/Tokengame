/* N3 · The circuit: the bet drawn as the chip's wiring. Two wires feed the NVIDIA chip: the pool (69% of $EZ creator fees) and the call
   (the golden ticket, with the leader's holo face). Two wires leave it: right call to a $EZ buyback, wrong call to a pool that can be
   wiped out. Pulses run along the input wires only: the pool and the call flow in now; the outcomes wait for the close.
   Replaces all three caption boxes; every word in them is now a label on a node. */
(function(){const {D,NM,lead,gt,seen,RM}=SB;
  const S=window.SIM||{},share=S.poolShare!=null?Math.round(S.poolShare*100):69;
  function build(){const sec=D.querySelector('.wc-bet'),m=lead(),w=sec.querySelector('.wc-chipw'),chip=sec.querySelector('.wc-chip');
    sec.querySelector('.sb-n3')?.remove();
    w.insertAdjacentHTML('beforeend',`<div class="sb-n3" data-sb-box>
      <svg class="sb-n3-sv" aria-hidden="true"></svg>
      <div class="sb-n3-n sb-n3-f" role="group" aria-label="The pool: ${share}% of $EZ creator fees"><span class="sb-n3-l">The pool</span>
        <span class="sb-n3-coin" aria-hidden="true"><i></i><i></i><i></i></span><b>${share}%</b><small>of $EZ creator fees</small></div>
      <div class="sb-n3-n sb-n3-t" role="group" aria-label="The call: the golden ticket, held by the top AI by P&L. Today that's ${NM[m]}."><span class="sb-n3-l">The call</span>${gt(m,'sb-n3-gt')}</div>
      <div class="sb-n3-c"></div>
      <div class="sb-n3-n sb-n3-o sb-n3-r"><span class="sb-n3-l">Right call</span><b>▲ $EZ buyback</b></div>
      <div class="sb-n3-n sb-n3-o sb-n3-w"><span class="sb-n3-l">Wrong call</span><b>▼ Pool can be wiped out</b></div></div>`);
    const box=w.querySelector('.sb-n3');box.querySelector('.sb-n3-c').appendChild(chip);
    sec.classList.add('sb-n3-on');seen(box);draw();}
  /* wires: orthogonal traces from each node to the chip's pins, redrawn on every width change */
  function draw(){const box=D.querySelector('.sb-n3');if(!box)return;const B=box.getBoundingClientRect(),q=s=>box.querySelector(s).getBoundingClientRect();
    const r=x=>({l:x.left-B.left,r:x.right-B.left,t:x.top-B.top,b:x.bottom-B.top,cx:(x.left+x.right)/2-B.left,cy:(x.top+x.bottom)/2-B.top});
    const C=r(q('.wc-chip')),K=r(q('.wc-chip-pkg')),f=r(q('.sb-n3-f')),t=r(q('.sb-n3-t')),g=r(q('.sb-n3-r')),wr=r(q('.sb-n3-w')),wide=B.width>=700;let P=[];
    const kx=k=>K.l+(K.r-K.l)*k,ky=k=>K.t+(K.b-K.t)*k;
    if(!wide){const a=(f.b+C.t)/2,b2=(C.b+g.t)/2;
      P=[['in',`M${f.cx} ${f.b} V${a} H${kx(.3)} V${C.t+6}`],['in',`M${t.cx} ${t.b} V${a+8} H${kx(.7)} V${C.t+6}`],
         ['ok',`M${kx(.3)} ${C.b-6} V${b2} H${g.cx} V${g.t}`],['no',`M${kx(.7)} ${C.b-6} V${b2} H${wr.cx} V${wr.t}`]]}
    else{const a=(f.r+C.l)/2,b2=(C.r+g.l)/2;
      P=[['in',`M${f.r} ${f.cy} H${a} V${ky(.32)} H${C.l+6}`],['in',`M${t.r} ${t.cy} H${a+10} V${ky(.68)} H${C.l+6}`],
         ['ok',`M${C.r-6} ${ky(.32)} H${b2} V${g.cy} H${g.l}`],['no',`M${C.r-6} ${ky(.68)} H${b2+10} V${wr.cy} H${wr.l}`]]}
    const sv=box.querySelector('.sb-n3-sv');sv.setAttribute('viewBox',`0 0 ${B.width} ${B.height}`);
    sv.innerHTML=P.map(([k,d])=>`<path class="sb-n3-w0" d="${d}"/><path class="sb-n3-w1 sb-n3-${k}" d="${d}"/>`).join('')+P.map(([k,d])=>{const e=d.trim().split(/[ A-Z]+/);return ''}).join('')}
  build();let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;draw()}});D.fonts.ready.then(draw);setTimeout(draw,600);
  window.__sbRebuild=build;D.documentElement.classList.add('sb-ok-n3')})();
