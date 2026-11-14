/* V1 · The tear-off pad. The round is a pad of five Season 1 tickets bound to one stub. Each tap tears the top ticket off
   along its perforation and the next beat is the ticket underneath; the tickets still on the pad peek out below, so you see how
   many beats are left. The stub keeps the step number. The last ticket gets punched: the round goes on the season's record. */
(function(){const V=VV,{esc,face,pct,$f,R,n,up,cs,graded,G,TT,LINE,FINE,VERB}=V;const m=V.mount('vv1');if(!m)return V.ready();const {root}=m;
  const call=x=>`${x.up?'🐂':'🐻'} ${x.up?'Up':'Down'} ${pct(x.v)}`;
  /* 1 · the four AIs say their call around the company, sealed with the date */
  const corner=['k0','k1','k2','k3'];
  const b1=`<div class="vv1-p vv1-p1" style="--bc:${V.brand}">
      <div class="vv1-co">${V.coImg('vv1-lg')}<b class="vv1-lock vv-stamp">Locked ${V.md(R.called)}</b></div>
      ${cs.map((x,i)=>`<div class="vv1-sp vv1-${corner[i]}" style="--i:${i}">${face(x.m,'vv1-f')}<p class="vv1-bal"><small>${V.NM[x.m]}</small><b class="${x.up?'vv-u':'vv-d'}">${call(x)}</b></p></div>`).join('')}</div>`;
  /* 2 · the round's own film, from the moment the calls are up to the market's answer */
  const b2=`<div class="vv1-p vv1-p2">${V.video('vv1-v')}<span class="vv1-thud" aria-hidden="true"><em class="vv-sfx">${V.sfx(R.a)}</em><b class="${up?'vv1-tu':'vv1-td'}">${up?'+':'−'}${pct(R.a)}</b></span>
      <span class="vv1-when">The close · ${V.md(R.resolves)}</span></div>`;
  /* 3 · the bell rings; each call is stamped; the wrong way is hit; the closest right call is crowned */
  const bell=`<svg class="vv1-bell" viewBox="-24 -4 48 50" aria-hidden="true"><g class="vv1-bg"><path d="M0 0v5" stroke="#15121a" stroke-width="3"/><path d="M0 5c-11 0-14 9-14 17v8l-5 6h38l-5-6v-8c0-8-3-17-14-17z" fill="#fdbc2a" stroke="#15121a" stroke-width="3" stroke-linejoin="round"/><circle cy="40" r="4" fill="#15121a"/></g><g class="vv1-rg" stroke="#15121a" stroke-width="2.6" stroke-linecap="round"><path d="M-18 12l-5-4M18 12l5-4M-20 23h-5M20 23h5"/></g></svg>`;
  const b3=`<div class="vv1-p vv1-p3 ${up?'vv1-gu':'vv1-gd'}">
      <div class="vv1-top">${bell}<em class="vv-sfx vv1-ding">Ding!</em><span class="vv1-cl">The close <b>${up?'+':'−'}${pct(R.a)}</b></span></div>
      <ol class="vv1-row">${graded.map((x,i)=>`<li class="${x.ok?'vv1-ok':'vv1-no'}${x.win?' vv1-win':''}" style="--i:${i}">
        ${x.win?'<em class="vv1-cr" aria-hidden="true">♛</em>':''}${!x.ok?'<span class="vv1-wham vv-sfx" aria-hidden="true">Wham!</span>':''}${face(x.m,'vv1-f')}
        <small>${V.NM[x.m]} ${x.up?'+':'−'}${pct(x.v)}</small><b class="vv-stamp ${x.ok?'vv-pass':'vv-fail'}">${x.ok?'Pass':'Fail'}</b>${x.win?`<i class="vv1-off">${pct(x.off)} off</i>`:''}</li>`).join('')}</ol></div>`;
  /* 4 · the money: a bill for each AI, as big as what it made on this call; the wrong one is torn */
  const by=cs.slice().sort((a,b)=>b.pnl-a.pnl),top=by[0];
  const bill=(x,big)=>`<div class="vv1-bill ${big?'vv1-bb':''} ${x.pnl<0?'vv1-torn':''}">${face(x.m,'vv1-f')}<span><small>${V.NM[x.m]}</small><b data-v="${x.pnl}">${$f(x.pnl)}</b></span></div>`;
  const b4=`<div class="vv1-p vv1-p4">${bill(top,1)}<div class="vv1-bills">${by.slice(1).map(x=>bill(x,0)).join('')}</div><p class="vv1-fine">${FINE}</p></div>`;
  /* 5 · the season ticket: a hole for every round; this one gets punched */
  const hs=[].concat(ROUNDS.map(x=>({n:x.n,k:'g',a:x.a})),(window.PENDING||[]).map(x=>({n:x.n,k:'p'})),(window.UPCOMING||[]).map(x=>({n:x.n,k:'u'}))).sort((a,b)=>a.n-b.n);
  const b5=`<div class="vv1-p vv1-p5"><div class="vv1-st"><p class="vv1-sh"><b>Season 1</b><span><b class="vv1-pc">${G-1}</b> of ${TT} rounds punched</span></p>
      <div class="vv1-hs">${hs.map(x=>`<i class="${x.k==='g'?(x.a>0?'vv1-hu':'vv1-hd'):'vv1-h0'}${x.n===n?' vv1-me':''}">${x.n===n?'<b class="vv-sfx vv1-chunk">Chunk!</b>':''}</i>`).join('')}</div>
      <p class="vv1-sf"><button type="button" class="vv1-see">See every round ↓</button></p></div></div>`;
  const PIC=[b1,b2,b3,b4,b5];
  const LN=[LINE[1],LINE[2],LINE[3],LINE[4],`Round ${n} goes on the record, punched for good.`];
  const tk=i=>`<article class="vv1-tk" data-vb="${i}" style="--k:${i}"><p class="vv1-band">${V.coImg('vv1-blg')}<b>${esc(R.co)}</b><span>Round ${n}</span><em>${VERB[i]}</em></p>
      <div class="vv1-pic"><div class="vv1-pq">${PIC[i]}</div></div><div class="vv1-tx"><p class="vv1-cap">${LN[i]}</p><ol class="vv1-tl" aria-hidden="true">${VERB.map((w,j)=>`<li class="${j<i?'vv1-tld':j===i?'vv1-tlc':''}"><b>${j+1}</b>${w}</li>`).join('')}</ol></div></article>`;
  root.innerHTML=`<div class="vv1-pad"><div class="vv1-stub" aria-hidden="true"><i class="vv1-s1">Season 1</i><b class="vv1-no">1</b><small>of 5</small></div>
      <div class="vv1-stack">${[0,1,2,3,4].map(tk).join('')}</div><span class="vv1-rip vv-sfx" aria-hidden="true">Rrrip!</span></div><div class="vv1-ctlw"></div>`;
  const T=[...root.querySelectorAll('.vv1-tk')],no=root.querySelector('.vv1-no'),rip=root.querySelector('.vv1-rip'),v=root.querySelector('.vv1-v');let stop=()=>{};
  const lay=c=>T.forEach((t,j)=>{const d=j-c;t.classList.toggle('vv1-gone',d<0);t.classList.toggle('vv1-top',d===0);t.style.setProperty('--d',Math.max(0,Math.min(d,4)))});
  const enter=(i,inst)=>{const t=T[i];t.classList.remove('vv1-go');if(!inst){void t.offsetWidth;t.classList.add('vv1-go')}else t.classList.add('vv1-go','vv1-inst');
    if(i===1){const p=t.querySelector('.vv1-p2');p.classList.remove('vv1-rev');stop=V.clip(v,()=>p.classList.add('vv1-rev'),inst)}
    if(i===4){const pc=t.querySelector('.vv1-pc');pc.textContent=inst?G:G-1;if(!inst)setTimeout(()=>{pc.textContent=G},1150)}
    if(i===3)t.querySelectorAll('[data-v]').forEach((b,k)=>{if(inst)b.textContent=$f(+b.dataset.v);else{b.textContent=$f(0);setTimeout(()=>V.count(b,+b.dataset.v,900),250+k*120)}})};
  root.querySelector('.vv1-see').addEventListener('click',()=>{const s=document.querySelector('#wc-book .wc-season');if(s)s.scrollIntoView({behavior:V.RM()?'auto':'smooth'})});
  V.stepper({root,ctl:root.querySelector('.vv1-ctlw'),tap:root.querySelector('.vv1-stack'),say:i=>LN[i].replace(/<[^>]+>/g,''),
    go:(i,from,dir,inst)=>{stop();T.forEach(t=>t.classList.remove('vv1-tear','vv1-back','vv1-drop','vv1-inst'));no.textContent=i+1;
      if(inst||i===from){lay(i);enter(i,true);return}
      no.animate&&no.animate([{transform:'rotateX(90deg)'},{transform:'none'}],{duration:260,easing:'ease-out'});
      if(dir>0&&i>from){const old=T[from];lay(i);old.classList.remove('vv1-gone');old.classList.add('vv1-tear');rip.classList.remove('vv1-r');void rip.offsetWidth;rip.classList.add('vv1-r');
        setTimeout(()=>{old.classList.remove('vv1-tear');old.classList.add('vv1-gone')},700);enter(i,false)}
      else if(dir>0){lay(i);T.forEach((t,j)=>{t.style.setProperty('--j',j);t.classList.add('vv1-drop')});enter(i,false)}
      else{lay(i);T[i].classList.add('vv1-back');enter(i,false)}}});
  V.ready()})();
