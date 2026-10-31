/* V2 · One ring, redrawn. A single comic panel that keeps its cast: a boxing ring split into the bulls' corner (green) and the
   bears' corner (red), the round printed on the apron, a big screen over the ring. Each tap redraws the same panel: the AIs
   shout their calls from their corners; the screen plays the round's film to the market's answer; the bell rings, the wrong
   corner is knocked down and the closest call crowned; the purse lands over each head; the ring turns into the season podium,
   where the round has moved the order. Same characters, one stage, five moments. */
(function(){const V=VV,{esc,face,pct,$f,k$,R,n,up,cs,G,TT,LINE,FINE,before,after,ticket}=V;const mt=V.mount('vv2');if(!mt)return V.ready();const {root}=mt;
  const NMx=V.NM,bulls=cs.filter(x=>x.up),bears=cs.filter(x=>!x.up).sort((a,b)=>a.v-b.v);
  const after$=m=>V.cum(m,n),mv=m=>before.indexOf(m)-after.indexOf(m);
  const pass=V.passes.filter(p=>p.over.length).map(p=>`${NMx[p.m]} passes ${p.over.map(o=>NMx[o]).join(' and ')}.`).join(' ');
  const LN=[LINE[1],LINE[2],LINE[3],LINE[4],`${pass?pass+' ':''}${NMx[ticket.m]} ${ticket.w} the golden ticket.`];
  const SR=[cs.map(x=>`${NMx[x.m]} says ${x.up?'up':'down'} ${pct(x.v)}.`).join(' '),
    `${esc(R.co)} closed ${up?'up':'down'} ${pct(R.a)}.`,
    V.graded.map(x=>`${NMx[x.m]} ${x.ok?'passes':'fails'}${x.win?', closest, '+pct(x.off)+' off':''}.`).join(' '),
    cs.map(x=>`${NMx[x.m]} ${x.pnl>=0?'made':'lost'} ${$f(Math.abs(x.pnl)).slice(1)}.`).join(' ')+' '+FINE,
    after.map((m,i)=>`Number ${i+1}, ${NMx[m]}, season P&L ${k$(after$(m))}.`).join(' ')];
  const lockStamp=`<b class="vv2-lock vv-stamp">Locked ${V.md(R.called)}</b>`;
  const ch=x=>`<div class="vv2-ch ${x.up?'vv2-bull':'vv2-bear'}${x.ok?' vv2-ok':' vv2-no'}${x.win?' vv2-win':''}${x.m===after[0]?' vv2-gold':''}" data-m="${x.m}" style="--i:${cs.indexOf(x)};--g:${V.graded.indexOf(x)}">
      <p class="vv2-say ${x.up?'vv-u':'vv-d'}">${x.up?'Up':'Down'} ${pct(x.v)}!</p>
      <p class="vv2-cash ${x.pnl>=0?'vv2-c-u':'vv2-c-d'}"><b>${$f(x.pnl)}</b></p>
      <p class="vv2-ssn"><b class="vv2-rk">#${after.indexOf(x.m)+1}</b>${mv(x.m)?`<i class="${mv(x.m)>0?'vv-u':'vv-d'}">${mv(x.m)>0?'▲':'▼'}${Math.abs(mv(x.m))}</i>`:''}<b class="${after$(x.m)>=0?'vv-u':'vv-d'}">${k$(after$(x.m))}</b></p>
      ${x.win?'<em class="vv2-cr" aria-hidden="true">♛</em>':''}<span class="vv2-wham vv-sfx">Wham!</span>
      <span class="vv2-tk" aria-hidden="true">Golden ticket</span>
      ${face(x.m,'vv2-f')}<small class="vv2-nm">${NMx[x.m]}</small>
      <b class="vv2-st vv-stamp ${x.ok?'vv-pass':'vv-fail'}">${x.ok?'Pass':'Fail'}</b>${x.win?`<i class="vv2-off">${pct(x.off)} off</i>`:''}</div>`;
  const bell=`<svg class="vv2-bell" viewBox="-26 -6 52 54" aria-hidden="true"><path d="M-22 -2h44" stroke="#15121a" stroke-width="4"/><g class="vv2-bg"><path d="M0 -2v7" stroke="#15121a" stroke-width="3"/><path d="M0 5c-11 0-14 9-14 17v8l-5 6h38l-5-6v-8c0-8-3-17-14-17z" fill="#fdbc2a" stroke="#15121a" stroke-width="3" stroke-linejoin="round"/><circle cy="40" r="4" fill="#15121a"/></g></svg>`;
  root.innerHTML=`<div class="vv2-panel" data-b="0"><div class="vv2-pq" aria-hidden="true">
      <i class="vv2-gl"></i><i class="vv2-gr"></i><i class="vv2-gs"></i>
      <p class="vv2-sign vv2-sl"><span>🐂</span><b>Bulls</b><small>${bulls.length}</small></p><p class="vv2-sign vv2-sr"><span>🐻</span><b>Bears</b><small>${bears.length}</small></p>
      <div class="vv2-jt"><div class="vv2-j vv2-j0">${V.coImg('vv2-lg')}<b>${esc(R.co)}</b>${lockStamp}</div>
        <div class="vv2-j vv2-j1">${V.video('vv2-v')}<span class="vv2-thud"><em class="vv-sfx">${V.sfx(R.a)}</em><b class="${up?'vv2-tu':'vv2-td'}">${up?'+':'−'}${pct(R.a)}</b></span></div>
        <div class="vv2-j vv2-j2"><small>The close · ${V.md(R.resolves)}</small><b class="${up?'vv-u':'vv-d'}">${up?'+':'−'}${pct(R.a)}</b></div>
        <div class="vv2-j vv2-j3"><small>${esc(R.co)} closed</small><b class="${up?'vv-u':'vv-d'}">${up?'+':'−'}${pct(R.a)}</b><em>P&amp;L on this call</em><i>${FINE}</i></div>
        <div class="vv2-j vv2-j4"><small>Season 1 · after round ${n}</small><b>Season P&amp;L</b></div></div>
      ${bell}<em class="vv2-ding vv-sfx">Ding ding!</em>
      <div class="vv2-floor"><span>${V.coImg('vv2-al')} Round ${n} · ${esc(R.co)}</span></div>
      ${cs.map(ch).join('')}</div></div>
    <div class="vv2-caps">${LN.map((l,i)=>`<p class="vv2-cap" data-vb="${i}"><i class="vv2-n" aria-hidden="true">${i+1}</i><span>${l}</span><span class="wc-sr"> ${SR[i]}</span></p>`).join('')}</div>
    <div class="vv2-ctlw"></div>`;
  const pnl=root.querySelector('.vv2-panel'),pq=root.querySelector('.vv2-pq'),C={};root.querySelectorAll('.vv2-ch').forEach(e=>C[e.dataset.m]=e);
  const v=root.querySelector('.vv2-v');let stop=()=>{};
  /* where each character stands in each beat (x, y of the face's centre, in % of the panel), for a tall phone panel and a wide one */
  const B=bears.map(x=>x.m),bu=bulls.map(x=>x.m);
  const place=(i,wide)=>{const P={};const k=i===3?0:i;
    if(k===0||k===2){/* in their corners: the bears from the middle outward by the size of their call */
      bu.forEach((m,j)=>P[m]=wide?[14+j*12,66]:[18+j*16,62]);
      B.forEach((m,j)=>P[m]=wide?[62+j*13,66]:([[57,50],[85,58],[71,76]][j]||[60+j*10,66]));
      if(k===2)cs.filter(x=>!x.ok).forEach(x=>{P[x.m]=[P[x.m][0]-2,P[x.m][1]+(wide?6:8)]})}
    else if(k===1){bu.forEach((m,j)=>P[m]=wide?[14+j*12,62]:[18+j*16,80]);B.forEach((m,j)=>P[m]=wide?([[81,40],[92,60],[81,80]][j]||[86,60]):[52+j*17,80])}
    else{const spot=wide?[[50,46],[30,56],[70,58],[88,66]]:[[50,45],[22,58],[78,60],[50,80]];after.forEach((m,j)=>P[m]=spot[j])}
    return P};
  const lay=i=>{const wide=pq.clientWidth/pq.clientHeight>1.25,P=place(i,wide);pnl.classList.toggle('vv2-wide',wide);
    for(const m in C){const p=P[m]||[50,50];C[m].style.setProperty('--x',p[0]+'%');C[m].style.setProperty('--y',p[1]+'%')}};
  addEventListener('resize',()=>lay(+pnl.dataset.b));
  V.stepper({root,ctl:root.querySelector('.vv2-ctlw'),tap:pnl,say:i=>LN[i].replace(/<[^>]+>/g,'')+' '+SR[i],
    go:(i,from,dir,inst)=>{stop();pnl.dataset.b=i;pnl.classList.toggle('vv2-inst',!!inst);pnl.classList.remove('vv2-go','vv2-rev');void pnl.offsetWidth;pnl.classList.add('vv2-go');lay(i);
      if(i===1)stop=V.clip(v,()=>pnl.classList.add('vv2-rev'),inst);
      if(i===3)root.querySelectorAll('.vv2-cash b').forEach((b,k)=>{const x=cs.find(c=>c.m===b.closest('.vv2-ch').dataset.m);if(inst)b.textContent=$f(x.pnl);else{b.textContent=$f(0);setTimeout(()=>V.count(b,x.pnl,900),300+k*110)}})}});
  V.ready()})();
