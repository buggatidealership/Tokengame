/* story mockups, helper "k" (2026-10-30): the cover, the loop told one step at a time.
   Laid over the built X3+ page after helper e's shared SE (../e/_se.js). Every name, prediction, move, P&L and logo comes
   from the page's data: steps 1 and 2 follow the same round as "One round, start to finish" below the cover
   (the page's own lastRound(), read from .wc-lr-pg[data-n]); step 3's ticket holder is the P&L leader from __x2pPnl(). */
window.KC=window.KC||(function(){
  const S=SE,D=document,H=D.documentElement,esc=S.esc;
  /* the owner's words (2026-10-30) */
  const STEP=['They predict the move <b>before</b> earnings.','The market close grades every prediction.','The model with the highest P&amp;L holds the <b>golden ticket</b>.','We bet the pool on the <b>golden ticket</b> holder.'];
  const STEP_T=STEP.map(s=>s.replace(/<[^>]+>/g,'').replace('&amp;','&'));
  const VERB=['Predict','Grade','Rank','Bet'];
  const A=S.P(),RANK=Object.keys(A).sort((a,b)=>A[b].pnl-A[a].pnl),lead=RANK[0];
  const pg=D.querySelector('.wc-lr-pg'),rn=pg?+pg.dataset.n:ROUNDS[ROUNDS.length-1].n,R=ROUNDS.find(x=>x.n===rn);
  const up=R.a>0;
  const parse=s=>{const m=/^(UP|DOWN)\s+([\d.]+)%?/i.exec(s||'');return m?{up:/up/i.test(m[1]),v:+m[2]}:null};
  const calls=S.ORDER.map(m=>{const row=R.calls.find(c=>c[0]===m);const c=row&&parse(row[1]);return c?{m,up:c.up,v:c.v,ok:c.up===up,off:+row[2]}:null}).filter(Boolean);
  const pct=v=>(Math.round(v*100)/100).toString()+'%';
  const money=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
  const face=(m,cls)=>S.face(m,(cls||'')+(m===lead?' wc9-holo':''));
  const ar=u=>u?'▲':'▼';
  /* ---- the four pictures. Sizes in cqw of the frame (.kc-f is an inline-size container). ---- */
  const p1=()=>{const L=calls.slice(0,2),Rr=calls.slice(2);
    const sp=(x,i,side)=>`<div class="kc-spk kc-spk-${side}" style="--i:${i}">${face(x.m,'kc-fc')}<p class="kc-bal ${x.up?'kc-up':'kc-dn'}"><small>${S.NM[x.m]}</small><b>${ar(x.up)} ${pct(x.v)}</b></p></div>`;
    return `<div class="kc-pic kc-p1" aria-hidden="true">
      <div class="kc-col">${L.map((x,i)=>sp(x,i,'l')).join('')}</div>
      <div class="kc-co" style="${S.bvars(S.brand(R.ticker))}"><span class="kc-co-lg">${S.coImg(R.ticker,'kc-lg')}</span><b>${esc(R.co)}</b><i class="kc-lock">Locked ${S.md(R.called)}</i></div>
      <div class="kc-col">${Rr.map((x,i)=>sp(x,i+2,'r')).join('')}</div></div>`};
  const bell=`<svg class="kc-bell" viewBox="-22 -4 44 48" aria-hidden="true"><g class="kc-bellg"><path d="M0 0v5" stroke="#15121a" stroke-width="3"/><path d="M0 5c-11 0-14 9-14 17v8l-5 6h38l-5-6v-8c0-8-3-17-14-17z" fill="#fdbc2a" stroke="#15121a" stroke-width="3" stroke-linejoin="round"/><circle cy="40" r="4" fill="#15121a"/></g><g class="kc-ring" stroke="#15121a" stroke-width="2.5" stroke-linecap="round"><path d="M-17 12l-4-3M17 12l4-3M-18 22h-4M18 22h4"/></g></svg>`;
  const p2=()=>`<div class="kc-pic kc-p2" aria-hidden="true">
      <div class="kc-cl ${up?'kc-cl-u':'kc-cl-d'}">${bell}<span class="kc-cl-t"><small>${esc(R.co)} · at the close</small><b>${up?'+':'−'}${pct(Math.abs(R.a))}</b></span><em class="kc-sfx">${S.sfx(R.a)}</em></div>
      <ul class="kc-gr">${calls.map((x,i)=>`<li class="${x.ok?'kc-ok':'kc-no'}" style="--i:${i}">${face(x.m,'kc-fc')}<span class="kc-pr ${x.up?'kc-up':'kc-dn'}">${ar(x.up)} ${pct(x.v)}</span><i class="kc-stp">${x.ok?'Pass':'Fail'}</i></li>`).join('')}</ul></div>`;
  const tick=(m,i,big)=>{const a=A[m];return `<div class="kc-tk ${big?'kc-tk-g':'kc-tk-s'}" style="--i:${i}"><span class="kc-tk-st">${face(m,'kc-fc')}<small>No. ${i+1}</small></span>
      <span class="kc-tk-b">${big?'<small>Golden ticket</small>':''}<b>${S.NM[m]}</b><em class="${a.pnl>=0?'kc-tu':'kc-td'}">${money(a.pnl)}</em></span>${big?'<i class="kc-foil"></i>':''}</div>`};
  const p3=()=>`<div class="kc-pic kc-p3" aria-hidden="true">${tick(lead,0,1)}<div class="kc-tks">${RANK.slice(1).map((m,i)=>tick(m,i+1,0)).join('')}</div></div>`;
  const p4=()=>`<div class="kc-pic kc-p4" aria-hidden="true">
      <div class="kc-jar"><svg viewBox="0 0 100 110"><g class="kc-drip"><circle cx="50" cy="8" r="6.5" fill="#fdbc2a" stroke="#15121a" stroke-width="2.2"/></g>
        <path d="M24 30h52v5c7 4 9 11 9 19v34c0 9-6 15-15 15H30c-9 0-15-6-15-15V54c0-8 2-15 9-19z" fill="rgba(255,255,255,.6)" stroke="#15121a" stroke-width="3.2" stroke-linejoin="round"/>
        <path d="M18 68h64v20c0 8-5 12-12 12H30c-7 0-12-4-12-12z" fill="#fdbc2a"/>
        ${[[29,66],[44,64],[59,66],[71,67],[36,58],[52,57],[66,59]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="8" ry="3.4" fill="#ffd96b" stroke="#15121a" stroke-width="1.7"/>`).join('')}
        <path d="M24 30h52" stroke="#15121a" stroke-width="3.2"/></svg><b class="kc-jar-l">Pool</b><small>$EZ creator fees</small></div>
      <svg class="kc-arw" viewBox="0 0 60 30" aria-hidden="true"><path d="M2 15h44" stroke="#15121a" stroke-width="5" stroke-linecap="round" stroke-dasharray="8 6"/><path d="M42 4l15 11-15 11z" fill="#15121a"/></svg>
      <div class="kc-bet">${tick(lead,0,1)}<p class="kc-ask"><b>NVDA</b> ▲ or ▼ ?</p></div></div>`;
  const PIC=[p1,p2,p3,p4];
  /* the cover: keep the live nodes (headline, Starring, the film), drop the tagline the steps now say, add the stage and the outcomes */
  const mount=(cls)=>{const cv=D.querySelector('#wc-book .wc-cover');if(!cv)return null;cv.classList.add('kc-cv',cls);
    const tag=cv.querySelector('.wc-tag');if(tag)tag.classList.add('se-hide');
    const film=cv.querySelector('.wc-film-slot'),h1=cv.querySelector('.wc-h1'),star=cv.querySelector('.wc-starring'),top=cv.querySelector('.wc-cv-top');
    const stage=D.createElement('div');stage.className='kc-stage';film.before(stage);
    film.insertAdjacentHTML('beforebegin',`<p class="kc-out"><span class="kc-o-r">Right: $EZ buyback.</span> <span class="kc-o-w">Wrong: the pool can be wiped out.</span></p>`);
    return {cv,h1,film,star,top,stage}};
  /* one frame: caption + picture; its ground carries the subject (company colour, market direction) */
  const frame=(i,extra)=>`<div class="kc-f kc-f${i+1} ${extra||''}" data-i="${i}" style="--fc:${S.brand(R.ticker)};--mv:${up?'#13a35a':'#e0352d'}">${cap(i)}<div class="kc-pw">${PIC[i]()}</div></div>`;
  /* a caption box for step i */
  const cap=(i)=>`<p class="kc-cap"><i class="kc-n">${i+1}</i><span><em class="kc-vb" aria-hidden="true">${VERB[i]}</em>${STEP[i]}</span></p>`;
  const dots=(cls)=>`<div class="kc-dots ${cls||''}" role="tablist" aria-label="Steps">${[0,1,2,3].map(i=>`<button type="button" role="tab" class="kc-dot${i?'':' kc-on'}" data-i="${i}" aria-label="Step ${i+1}: ${esc(STEP_T[i])}" aria-selected="${i?'false':'true'}"><b>${i+1}</b><small>${VERB[i]}</small><i class="kc-pg"></i></button>`).join('')}</div>`;
  /* one engine for the three one-at-a-time takes: slow autoplay, tap = next, swipe, arrow keys, dots; nothing moves with reduced motion */
  const deck=o=>{const {root,go}=o,N=4,per=o.period||5200,Dt=[...o.dotsEl.querySelectorAll('.kc-dot')];let cur=0,tm=null,vis=true,x0=null,y0=0,moved=false;
    const rm=S.rm();if(rm)H.classList.add('kc-rm');
    const mark=()=>{Dt.forEach((d,i)=>{d.classList.toggle('kc-on',i===cur);d.setAttribute('aria-selected',i===cur?'true':'false');d.classList.remove('kc-run')});
      if(!rm&&vis){const d=Dt[cur];void d.offsetWidth;d.classList.add('kc-run')}};
    const arm=()=>{clearTimeout(tm);if(rm||!vis)return mark();mark();tm=setTimeout(()=>{if(D.hidden)return arm();show((cur+1)%N,1)},per)};
    const cur_=i=>root.querySelectorAll('.kc-f').forEach(f=>f.classList.toggle('kc-cur',+f.dataset.i===i));root.classList.add('kc-deck');
    const show=(i,dir,inst)=>{if(i===cur&&!inst)return arm();const from=cur;cur=i;go(i,from,dir,inst||rm);cur_(i);root.setAttribute('aria-label','How every round goes. Step '+(i+1)+' of 4: '+STEP_T[i]);arm()};
    root.addEventListener('pointerdown',e=>{x0=e.clientX;y0=e.clientY;moved=false});
    root.addEventListener('pointerup',e=>{if(x0==null)return;const dx=e.clientX-x0,dy=e.clientY-y0;x0=null;if(Math.abs(dx)>34&&Math.abs(dx)>Math.abs(dy)){moved=true;show(dx<0?(cur+1)%N:(cur+N-1)%N,dx<0?1:-1)}});
    root.addEventListener('click',()=>{if(moved){moved=false;return}show((cur+1)%N,1)});
    root.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='Enter'||e.key===' '){e.preventDefault();show((cur+1)%N,1)}else if(e.key==='ArrowLeft'){e.preventDefault();show((cur+N-1)%N,-1)}});
    Dt.forEach((d,i)=>d.addEventListener('click',()=>show(i,i>cur?1:-1)));
    new IntersectionObserver(es=>{vis=es[0].isIntersecting;arm()},{threshold:.25}).observe(root);
    window.__kcGo=(i)=>{clearTimeout(tm);vis=false;show(i,i>cur?1:-1,true);clearTimeout(tm);mark()};
    window.__kcStop=()=>{clearTimeout(tm);vis=false;mark()};
    root.tabIndex=0;root.setAttribute('role','group');root.setAttribute('aria-roledescription','carousel');root.setAttribute('aria-label','How every round goes. Step 1 of 4: '+STEP_T[0]);
    go(0,0,1,true);cur_(0);arm();return {show,get cur(){return cur}}};
  return {frame,S,D,H,esc,STEP,STEP_T,PIC,cap,dots,deck,mount,lead,A,RANK,R,calls,up,money,face,tick}})();
