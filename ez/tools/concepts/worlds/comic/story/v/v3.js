/* V3 · The fold-out strip. The round is a strip of five comic panels folded like a paper accordion: you always see all five
   (the shape says "five steps, in order"), but only one is open; the rest are folded to their spines, each with its big
   number. Next folds the open panel shut and unfolds the next one. Panels 1 and 3 share one picture, a price scale: first the
   AIs pin their targets on it, then the close drops down it and the bell grades every pin. */
(function(){const V=VV,{esc,face,pct,$f,R,n,up,cs,graded,right,G,LINE,FINE,VERB}=V;const mt=V.mount('vv3');if(!mt)return V.ready();const {root}=mt;
  const NMx=V.NM;
  /* the price scale: from the round's widest call or move, rounded up to an even number */
  const MX=Math.max(2,Math.ceil(Math.max(Math.abs(R.a),...cs.map(x=>x.v))/2)*2);
  const Y=v=>(50-v/MX*42).toFixed(2);/* % from the top: +MX at 8%, -MX at 92% */
  const pins=cs.slice().sort((a,b)=>b.sv-a.sv).map((x,i)=>({...x,side:i%2?'r':'l'}));
  const ticks=[...Array(MX+1)].map((_,i)=>-MX+i*2).filter(v=>v>=-MX&&v<=MX&&v%2===0);
  const scale=(grade)=>`<div class="vv3-sc ${grade?'vv3-g':''}" style="--cl:${Y(R.a)}%">
      <div class="vv3-col"><i class="vv3-up"></i><i class="vv3-dn"></i>${ticks.map(v=>`<span class="vv3-tk${v===0?' vv3-t0':''}" style="top:${Y(v)}%"><b>${v>0?'+':v<0?'−':''}${Math.abs(v)}%</b></span>`).join('')}
        <span class="vv3-zero" style="top:${Y(0)}%">${V.coImg('vv3-lg')}</span></div>
      ${pins.map((x,i)=>`<div class="vv3-pin vv3-${x.side}${x.ok?' vv3-ok':' vv3-no'}${x.win?' vv3-win':''}" style="top:${Y(x.sv)}%;--g:${graded.indexOf(x)}">
        <i class="vv3-ln"></i><span class="vv3-fw">${face(x.m,'vv3-f')}${grade?`<b class="vv-stamp vv3-st ${x.ok?'vv-pass':'vv-fail'}">${x.ok?'Pass':'Fail'}</b>${x.win?'<em class="vv3-cr">♛</em>':''}${!x.ok?'<span class="vv3-wham vv-sfx">Wham!</span>':''}`:''}</span>
        <span class="vv3-sw"><b class="vv3-say ${x.up?'vv-u':'vv-d'}"><small>${NMx[x.m]}</small>${x.up?'+':'−'}${pct(x.v)}</b>${grade&&x.win?`<i class="vv3-off">${pct(x.off)} off</i>`:''}</span></div>`).join('')}
      ${grade?`<div class="vv3-close"><span><small>The close</small><b>${up?'+':'−'}${pct(R.a)}</b></span></div>
        <svg class="vv3-bell" viewBox="-24 -4 48 50" aria-hidden="true"><g class="vv3-bg"><path d="M0 0v5" stroke="#15121a" stroke-width="3"/><path d="M0 5c-11 0-14 9-14 17v8l-5 6h38l-5-6v-8c0-8-3-17-14-17z" fill="#fdbc2a" stroke="#15121a" stroke-width="3" stroke-linejoin="round"/><circle cy="40" r="4" fill="#15121a"/></g></svg><em class="vv3-ding vv-sfx">Ding!</em>
`:`<b class="vv3-lock vv-stamp">Locked ${V.md(R.called)}</b>`}</div>`;
  const b1=`<div class="vv3-p vv3-p1">${scale(0)}</div>`;
  const b2=`<div class="vv3-p vv3-p2">${V.video('vv3-v')}<span class="vv3-thud"><em class="vv-sfx">${V.sfx(R.a)}</em><b class="${up?'vv3-tu':'vv3-td'}">${up?'+':'−'}${pct(R.a)}</b></span><span class="vv3-when">${esc(R.co)} · the close, ${V.md(R.resolves)}</span></div>`;
  const b3=`<div class="vv3-p vv3-p3">${scale(1)}</div>`;
  /* the money: a stack of bills per AI, as tall as what it made; a loss sinks below the line */
  const by=cs.slice().sort((a,b)=>b.pnl-a.pnl),MXP=Math.max(...cs.map(x=>Math.abs(x.pnl)));
  const b4=`<div class="vv3-p vv3-p4"><div class="vv3-cash">${by.map((x,i)=>`<div class="vv3-stk ${x.pnl>=0?'vv3-s-u':'vv3-s-d'}" style="--h:${(Math.abs(x.pnl)/MXP).toFixed(3)};--i:${i}">
        <i class="vv3-bills"></i>${face(x.m,'vv3-f')}<b class="vv3-amt" data-v="${x.pnl}">${$f(x.pnl)}</b><small>${NMx[x.m]}</small></div>`).join('')}<i class="vv3-floor"></i></div><p class="vv3-fine">${FINE}</p></div>`;
  /* the record: this round's card lands on the pile of the rounds before it, the same tiles as "Every round so far" below */
  const prev=ROUNDS.filter(x=>x.n<n&&V.film(x.n)).sort((a,b)=>b.n-a.n).slice(0,3);
  const card=(x,me)=>{const f=V.film(x.n),w=x.win?x.win.split(' & ').map(m=>NMx[m]||m).join(' & '):'Nobody';
    return `<div class="vv3-card${me?' vv3-me':''}"><img src="${f.p}" alt="" loading="lazy"><p><b>R${x.n} ${esc(x.co)}</b><span class="${x.a>0?'vv-u':'vv-d'}">${x.a>0?'+':'−'}${pct(x.a)}</span></p>${me?`<b class="vv-stamp vv3-won">${w} won</b>`:''}</div>`};
  const b5=`<div class="vv3-p vv3-p5"><div class="vv3-pile">${prev.map((x,i)=>`<div class="vv3-under" style="--k:${i}">${card(x,0)}</div>`).join('')}${card(R,1)}</div>
      <p class="vv3-count"><b>${G}</b><span>rounds on the record</span></p><button type="button" class="vv3-see">See every round ↓</button></div>`;
  const PIC=[b1,b2,b3,b4,b5];
  const LN=[LINE[1],LINE[2],LINE[3],LINE[4],`Round ${n} joins the record. Every round stays there.`];
  root.innerHTML=`<div class="vv3-strip">${PIC.map((p,i)=>`<section class="vv3-pn" data-i="${i}">
      <button type="button" class="vv3-spine" tabindex="-1" aria-hidden="true"><b>${i+1}</b><span>${VERB[i]}</span></button>
      <div class="vv3-in" data-vb="${i}"><p class="vv3-cap"><i class="vv3-n" aria-hidden="true">${i+1}</i>${LN[i]}</p><div class="vv3-pic" data-pic><div class="vv3-pq">${p}</div></div></div></section>`).join('')}</div><div class="vv3-ctlw"></div>`;
  const S=root.querySelector('.vv3-strip'),P=[...S.querySelectorAll('.vv3-pn')],v=root.querySelector('.vv3-v');let stop=()=>{};
  const rows=c=>P.map((_,j)=>j===c?'1fr':'var(--sp)').join(' ');
  const st=V.stepper({root,ctl:root.querySelector('.vv3-ctlw'),tap:S,say:i=>LN[i].replace(/<[^>]+>/g,''),
    go:(i,from,dir,inst)=>{stop();S.style.setProperty('--tr',rows(i));S.classList.toggle('vv3-inst',!!inst);
      P.forEach((p,j)=>{p.classList.toggle('vv3-open',j===i);p.classList.toggle('vv3-done',j<i);p.classList.remove('vv3-go')});
      const p=P[i];void p.offsetWidth;p.classList.add('vv3-go');
      if(i===1){const q=p.querySelector('.vv3-p2');q.classList.remove('vv3-rev');stop=V.clip(v,()=>q.classList.add('vv3-rev'),inst)}
      if(i===3)p.querySelectorAll('[data-v]').forEach((b,k)=>{if(inst)b.textContent=$f(+b.dataset.v);else{b.textContent=$f(0);setTimeout(()=>V.count(b,+b.dataset.v,900),350+k*120)}})}});
  P.forEach((p,j)=>p.querySelector('.vv3-spine').addEventListener('click',e=>{e.stopPropagation();st.show(j,j>st.cur?1:-1)}));
  root.querySelector('.vv3-see').addEventListener('click',()=>{const s=document.querySelector('#wc-book .wc-season');if(s)s.scrollIntoView({behavior:V.RM()?'auto':'smooth'})});
  V.ready()})();
