/* K4 · The loop, refined (H1 with the owner's words): four panels round a hub, clockwise, lit one after another, round and
   round. Changes from H1: the site's own cream ground and Ben-Day dots (no sunburst); one real round runs through panels 1
   and 2 (the same four predictions, then the same four graded by the same close, as in "One round, start to finish" below);
   panel 3 shows the ticket holder against the three chasing it; panel 4 shows the pool riding on the holder's next
   prediction. On desktop the ring opens into a row with a return arrow under it. */
(function(){const K=KC,S=K.S,m=K.mount('kc-k4');if(!m)return S.ready();const {stage}=m;const R=K.R,C=K.calls,esc=S.esc;
  const ar=u=>u?'▲':'▼',pc=v=>(Math.round(v*100)/100)+'%';
  const k=v=>(v<0?'−':'+')+'$'+(Math.abs(v)/1000).toFixed(1)+'K';
  const q1=()=>`<div class="kc4 kc4-1" aria-hidden="true"><span class="kc4-co" style="${S.bvars(S.brand(R.ticker))}"><span>${S.coImg(R.ticker,'')}</span><b>${esc(R.co)}</b></span>
    <ul>${C.map((x,i)=>`<li style="--i:${i}"><i class="kc4-b ${x.up?'kc-up':'kc-dn'}">${ar(x.up)}${pc(x.v)}</i>${K.face(x.m,'kc4-f')}</li>`).join('')}</ul></div>`;
  const q2=()=>`<div class="kc4 kc4-2" aria-hidden="true"><span class="kc4-cl ${K.up?'kc-cl-u':'kc-cl-d'}"><svg viewBox="-22 -4 44 48"><g class="kc-bellg"><path d="M0 5c-11 0-14 9-14 17v8l-5 6h38l-5-6v-8c0-8-3-17-14-17z" fill="#fdbc2a" stroke="#15121a" stroke-width="3.5" stroke-linejoin="round"/><circle cy="40" r="4.5" fill="#15121a"/></g></svg><b>${K.up?'+':'−'}${pc(Math.abs(R.a))}</b></span>
    <ul>${C.map((x,i)=>`<li class="${x.ok?'kc-ok':'kc-no'}" style="--i:${i}">${K.face(x.m,'kc4-f')}<i class="kc-stp">${x.ok?'Pass':'Fail'}</i></li>`).join('')}</ul></div>`;
  const q3=()=>{const A=K.A,Ld=K.lead;return `<div class="kc4 kc4-3" aria-hidden="true">${K.tick(Ld,0,1)}
    <ul>${K.RANK.slice(1,2).map(m=>`<li>${K.face(m,'kc4-f')}<b class="${A[m].pnl>=0?'kc-tu':'kc-td'}">${k(A[m].pnl)}</b><small>chasing</small></li>`).join('')}</ul></div>`};
  const q4=()=>`<div class="kc4 kc4-4" aria-hidden="true"><span class="kc4-jar"><svg viewBox="0 0 100 110"><g class="kc-drip"><circle cx="50" cy="8" r="7" fill="#fdbc2a" stroke="#15121a" stroke-width="2.5"/></g>
      <path d="M24 30h52v5c7 4 9 11 9 19v34c0 9-6 15-15 15H30c-9 0-15-6-15-15V54c0-8 2-15 9-19z" fill="rgba(255,255,255,.6)" stroke="#15121a" stroke-width="4" stroke-linejoin="round"/>
      <path d="M18 68h64v20c0 8-5 12-12 12H30c-7 0-12-4-12-12z" fill="#fdbc2a"/><path d="M24 30h52" stroke="#15121a" stroke-width="4"/>
      <text x="50" y="90" text-anchor="middle" font-family="Bangers,Impact,sans-serif" font-size="17" letter-spacing="1" fill="#15121a">POOL</text></svg></span>
      <svg class="kc4-arw" viewBox="0 0 40 20"><path d="M2 10h26" stroke="#15121a" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="6 5"/><path d="M26 2l12 8-12 8z" fill="#15121a"/></svg>
      <span class="kc4-who">${K.face(K.lead,'kc4-f kc4-fl')}<i class="kc-ask">▲▼?</i></span></div>`;
  const Q=[q1,q2,q3,q4];
  const P=[0,1,2,3].map(i=>`<div class="kc-f kc-f${i+1} kc4-p" role="listitem" style="--i:${i};--fc:${S.brand(R.ticker)};--mv:${K.up?'#13a35a':'#e0352d'}">${K.cap(i)}<div class="kc-pw kc4-pw">${Q[i]()}</div></div>`).join('');
  const AR=['r','d','l','u'].map((d,i)=>`<i class="kc4-ar kc4-ar-${d}" style="--i:${i}" aria-hidden="true"></i>`).join('');
  stage.innerHTML=`<div class="kc4-ring" role="list" aria-label="How every round goes, round after round">${P}${AR}
    <span class="kc4-hub" aria-hidden="true"><svg viewBox="0 0 60 60"><g class="kc4-hubr"><path d="M30 6a24 24 0 0 1 23 17" fill="none" stroke="#15121a" stroke-width="4"/><path d="M48 18l6 7 3-9z" fill="#15121a"/>
      <path d="M30 54A24 24 0 0 1 7 37" fill="none" stroke="#15121a" stroke-width="4"/><path d="M12 42l-6-7-3 9z" fill="#15121a"/></g></svg><b>Every<br>round</b></span>
    <svg class="kc4-back" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true"><path d="M875 4V36H125V8" fill="none" stroke="#15121a" stroke-width="5" stroke-dasharray="14 9" vector-effect="non-scaling-stroke"/></svg><i class="kc4-backh" aria-hidden="true"></i><b class="kc4-backl" aria-hidden="true">Every round</b></div>`;
  S.ready()})();
