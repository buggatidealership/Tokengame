/* D3 · Where they landed: one ruler runs through the round. Each AI plants its pin before the earnings, the close lands the
   stock on the same ruler, the side of zero decides pass or fail, the gap is how far off, the money follows the side.
   Parts (separable): head · P1 company + pins · P2 film + the stock sliding along the ruler · P3 the graded ruler · P4 the bill with P&L bars. */
(function(){const S=SD,d=S.data();if(!d){S.ready();return}
  const {r,up,cs}=d,A=r.a;
  /* the ruler's reach: the biggest number on it, plus room, rounded up to an even percent */
  const mx=Math.max(Math.abs(A),...cs.map(x=>Math.abs(x.sv))),M=Math.ceil(mx*1.12/2)*2,step=M>12?5:M>6?2:1,lab=M>12?10:M>6?5:2;
  const X=v=>((v+M)/(2*M)*100).toFixed(3)+'%';
  /* pins on levels so faces never overlap: sort by value, put each on the lowest level with room (54px at 390, scaled by the ruler's width) */
  const lv={};{const xs=cs.slice().sort((a,b)=>a.sv-b.sv),last=[];xs.forEach(x=>{let L=0;while(last[L]!=null&&(x.sv-last[L])/(2*M)<.17)L++;last[L]=x.sv;lv[x.m]=L})}
  const nL=Math.max(...Object.values(lv))+1;
  const ticks=[];for(let v=-M;v<=M+1e-9;v+=step)ticks.push(`<i class="sd3-tk${Math.abs(v%lab)<1e-9?' sd3-tkl':''}" style="left:${X(v)}">${Math.abs(v%lab)<1e-9?`<span>${v===0?'0':(v>0?'+':'−')+Math.abs(v)+'%'}</span>`:''}</i>`);
  const axis=`<div class="sd3-ax" aria-hidden="true"><i class="sd3-hd sd3-hdn"></i><i class="sd3-hd sd3-hup"></i>${ticks.join('')}<i class="sd3-z"></i></div>
    <p class="sd3-ends" aria-hidden="true"><span class="sd3-edn">◀ Down</span><span class="sd3-eup">Up ▶</span></p>`;
  const pin=(x,mode)=>{const g=mode===3,cls=g?(x.win?' sd3-win sd3-ok':x.ok?' sd3-ok':' sd3-no'):'';
    return `<span class="sd3-pin${cls}" style="left:${X(x.sv)};--lv:${lv[x.m]}">
      ${g&&x.win?'<em class="sd3-crown" aria-hidden="true">♛</em>':''}${S.face(x.m,'sd3-f')}
      <span class="sd3-tag"><small>${S.NM[x.m]}</small><b class="${x.c.up?'sd-tu':'sd-td'}">${x.c.up?'+':'−'}${x.c.v}%</b></span>
      ${g?`<b class="sd3-pf ${x.ok?'sd3-pass':'sd3-fail'}">${x.ok?'Pass!':'Fail!'}</b>`:''}<i class="sd3-stem"></i></span>`};
  const ruler=(mode,extra)=>`<div class="sd3-nl sd3-m${mode}" style="--nL:${nL}">
      <div class="sd3-pins">${mode===2?cs.map(x=>`<span class="sd3-ghost" style="left:${X(x.sv)}">${S.face(x.m,'sd3-f')}</span>`).join(''):cs.map(x=>pin(x,mode)).join('')}${extra||''}</div>${axis}</div>`;
  /* the stock's marker: the company's logo on a post, at the move */
  const mk=(cls)=>`<span class="sd3-mk ${up?'sd3-mku':'sd3-mkd'} ${cls||''}" style="--x:${X(A)}"><span class="sd3-mkf">${d.logo?`<img src="${d.logo}" alt="">`:S.esc(d.tk)}</span><b>${up?'+':'−'}${S.pct(A)}</b><i class="sd3-post"></i></span>`;
  /* P3: a dimension line from each right-way pin to the close, labelled with how far off it was */
  const dims=d.right.sort((a,b)=>a.off-b.off).map((x,i)=>{const a=Math.min(x.sv,A),b=Math.max(x.sv,A);
    return `<span class="sd3-dim${x.win?' sd3-dimw':''}" style="left:${X(a)};right:calc(100% - ${X(b)});--i:${i}"><b>${S.pct(x.off)} off</b></span>`}).join('');
  const p1=`<section class="sd-pn sd3-p sd3-p1" aria-label="Step 1"><b class="sd-n" aria-hidden="true">1</b><p class="sd-c">Before the earnings, the AIs submit their predictions</p>
      <header class="sd3-co">${d.logo?`<span class="sd3-lg"><img src="${d.logo}" alt=""></span>`:''}<h3>${S.esc(r.co)}<small>Round ${r.n} · ${S.esc(r.ticker)}</small></h3><span class="sd3-lock">Locked ${d.called}</span></header>
      ${ruler(1)}
      <p class="sd-sr">${cs.map(x=>S.NM[x.m]+' said '+(x.c.up?'up ':'down ')+x.c.v+'%').join('. ')}.</p></section>`;
  const p2=`<section class="sd-pn sd3-p sd3-p2" aria-label="Step 2"><b class="sd-n" aria-hidden="true">2</b><p class="sd-c">${S.esc(r.co)} reports. Then the close</p>
      <div class="sd-film"></div>
      <div class="sd3-run">${ruler(2,mk('sd3-slide')+`<b class="sd3-ding" aria-hidden="true">Ding!</b>`)}<p class="sd3-at">The close · ${d.graded_on}</p></div>
      <p class="sd-sr">${S.esc(r.co)} ${up?'rose':'fell'} ${S.pct(A)} at the close on ${d.graded_on}.</p></section>`;
  const p3=`<section class="sd-pn sd3-p sd3-p3" aria-label="Step 3"><b class="sd-n" aria-hidden="true">3</b><p class="sd-c">The market grades every call</p>
      ${ruler(3,mk('sd3-fix')+dims)}
      <p class="sd3-rule">Right side of zero: <b class="sd-tu">pass</b>. Closest pass wins.</p>
      <a class="sd3-open" href="#/round/${r.n}">Open its graded card →</a>
      <p class="sd-sr">${S.and(d.right.map(x=>S.NM[x.m]))||'Nobody'} called ${up?'up':'down'} and passed. ${d.W.length?S.and(d.W.map(m=>S.NM[m]))+' wins the round.':'Nobody wins.'}</p></section>`;
  const mxv=Math.max(...cs.map(x=>Math.abs(x.v)))||1;
  const p4=`<section class="sd-pn sd3-p sd3-p4" aria-label="Step 4"><b class="sd-n" aria-hidden="true">4</b><p class="sd-c">The money follows the side</p>
      <div class="sd3-bill"><div class="sd3-bars">${cs.map(x=>`<div class="sd3-bc ${x.v>=0?'sd3-bu':'sd3-bd'}${x.win?' sd3-bw':''}" style="--h:${(Math.abs(x.v)/mxv).toFixed(3)}">
          ${S.face(x.m,'sd3-bf')}${S.money(x.v,'sd3-bv '+(x.v>=0?'sd-tu':'sd-td'))}<i class="sd3-bar"></i></div>`).join('')}<i class="sd3-base"></i></div>
        <p class="sd3-fine">P&amp;L on this call. Pretend $100,000 accounts, the whole balance on every call.</p></div>
      <p class="sd-sr">${cs.map(x=>S.NM[x.m]+(x.v>=0?' made ':' lost ')+S.$(x.v)).join('. ')}.</p></section>`;
  const w=S.mount(`<div class="sd3-pg">${p1}${p2}${p3}${p4}</div>`,'sd-d3');if(!w){S.ready();return}w.classList.add(up?'sd3-U':'sd3-D');
  S.once(w.querySelector('.sd3-p1'),.45);S.once(w.querySelector('.sd3-run'),.6);S.once(w.querySelector('.sd3-p3'),.45);
  S.once(w.querySelector('.sd3-p4'),.45,still=>{if(!still)w.querySelectorAll('.sd3-bv').forEach((n,i)=>S.count(n,300+i*90))});
  S.ready()})();
