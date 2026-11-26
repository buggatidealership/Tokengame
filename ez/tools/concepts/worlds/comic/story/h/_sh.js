/* story mockups, helper "h" (2026-10-30): the cover as the front of a comic book, built around the loop.
   Laid over the built X3+ page after helper e's shared SE (../e/_se.js). Every name, call, date and logo comes from the page's data. */
window.SH=window.SH||(function(){
  const S=SE,D=document,H=D.documentElement,esc=S.esc;
  /* the loop's four lines (wording research: see report) */
  const STEP=['They call the move <b>before</b> earnings','The market close grades every call','Top P&amp;L gets the golden ticket','We bet the pool on its call'];
  const STEP_T=['They call the move before earnings','The market close grades every call','Top P&L gets the golden ticket','We bet the pool on its call'];
  /* the next fight: the biggest round graded at the next close that already has its calls in */
  const fight=()=>{const nc=S.nextClose();if(!nc)return null;const r=nc.items[0];return {r,nc}};
  const lead=S.lead();
  const face=(m,cls)=>S.face(m,(cls||'')+(m===lead?' wc9-holo':''));
  /* the next close, in words for the price box */
  const closeWords=()=>{const f=fight();if(!f)return {a:'Next close',b:'4 PM ET'};const r=f.nc.rel;return {a:'Next close',b:(r==='Today'||r==='Tomorrow'?r:S.wd(f.nc.day))+' · 4 PM ET'}};
  const today=()=>new Date().toLocaleDateString('en-US',{timeZone:'America/New_York',weekday:'short',month:'short',day:'numeric',year:'numeric'});
  const tot=()=>S.totals();
  /* ---- the four living vignettes, sized in em (font-size sets the scale): 15em x 9.5em ---- */
  const K='#15121a';
  const v1=()=>{const f=fight();if(!f)return '<div class="sh-v sh-v1"></div>';const r=f.r,pos=[['p-tl'],['p-tr'],['p-bl'],['p-br']];
    return `<div class="sh-v sh-v1" aria-hidden="true"><span class="sh-v1co">${S.coImg(r.ticker,'sh-v1lg')}</span>
      ${S.STAR.map((m,i)=>{const c=r.calls.find(x=>x.m===m),up=c&&c.dir==='UP';return `<span class="sh-v1f sh-${pos[i][0]}" style="--i:${i}">${face(m)}${c?`<i class="sh-bal ${up?'sh-up':'sh-dn'}">${up?'▲':'▼'}</i>`:''}</span>`}).join('')}</div>`};
  const v2=()=>`<div class="sh-v sh-v2" aria-hidden="true"><svg viewBox="0 0 150 95">
      <g transform="translate(52 48)"><circle r="37" fill="#fffaf0" stroke="${K}" stroke-width="3.5"/>
      ${Array.from({length:12},(_,i)=>`<path d="M0 -31V${i%3?-27:-24}" stroke="${K}" stroke-width="${i%3?2:3}" transform="rotate(${i*30})"/>`).join('')}
      <path d="M0 4V-17" stroke="${K}" stroke-width="4.5" stroke-linecap="round" transform="rotate(120)"/>
      <g class="sh-mh"><path d="M0 6V-28" stroke="#e0352d" stroke-width="3" stroke-linecap="round"/></g><circle r="3.6" fill="${K}"/></g>
      <g class="sh-bell" transform="translate(116 16)"><g class="sh-bellg"><path d="M0 0v5" stroke="${K}" stroke-width="3"/><path d="M0 5c-11 0-14 9-14 17v8l-5 6h38l-5-6v-8c0-8-3-17-14-17z" fill="#fdbc2a" stroke="${K}" stroke-width="3" stroke-linejoin="round"/><circle cy="40" r="4" fill="${K}"/></g>
        <g class="sh-ring" stroke="${K}" stroke-width="2.5" stroke-linecap="round"><path d="M-24 14l-6-3M24 14l6-3M-25 24h-7M25 24h7"/></g></g>
      <g transform="translate(103 78) rotate(-8)"><g class="sh-st1"><rect x="-11" y="-9" width="22" height="18" rx="3" fill="#13a35a" stroke="${K}" stroke-width="2.5"/><path d="M-5 0l4 4 7-8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g></g>
      <g transform="translate(130 80) rotate(7)"><g class="sh-st2"><rect x="-11" y="-9" width="22" height="18" rx="3" fill="#e0352d" stroke="${K}" stroke-width="2.5"/><path d="M-5 -5l10 10M5 -5l-10 10" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g></g>
    </svg></div>`;
  const v3=()=>`<div class="sh-v sh-v3" aria-hidden="true"><span class="sh-tk"><span class="sh-tks">${face(lead)}</span><span class="sh-tkt"><small>Golden ticket</small><b>${esc(S.NM[lead])}</b></span><i class="sh-tkf"></i></span>
      <i class="sh-sp sh-sp1"></i><i class="sh-sp sh-sp2"></i><i class="sh-sp sh-sp3"></i></div>`;
  const v4=()=>`<div class="sh-v sh-v4" aria-hidden="true"><svg viewBox="0 0 150 95">
      <g class="sh-coinf"><circle cx="46" cy="6" r="6" fill="#fdbc2a" stroke="${K}" stroke-width="2"/></g>
      <path d="M22 26h48v4c6 4 8 10 8 18v30c0 8-5 13-13 13H27c-8 0-13-5-13-13V48c0-8 2-14 8-18z" fill="rgba(255,255,255,.55)" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M17 62h58v16c0 7-4 10-11 10H28c-7 0-11-3-11-10z" fill="#fdbc2a"/>
      ${[[26,60],[40,58],[54,60],[66,61],[33,52],[48,51],[61,53]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="7" ry="3" fill="#ffd96b" stroke="${K}" stroke-width="1.6"/>`).join('')}
      <rect x="28" y="66" width="36" height="13" rx="2" fill="#fffaf0" stroke="${K}" stroke-width="2"/><text x="46" y="76" text-anchor="middle" font-family="Bangers,Impact,sans-serif" font-size="11" letter-spacing=".5" fill="${K}">POOL</text>
      <path d="M22 26h48" stroke="${K}" stroke-width="3"/>
      <g class="sh-ezup" transform="translate(116 30)"><path d="M-4 30V4h-8L0-10 12 4H4v26z" fill="#13a35a" stroke="${K}" stroke-width="2.5" stroke-linejoin="round"/>
        <g class="sh-ezc"><circle cx="17" cy="-8" r="10" fill="#fdbc2a" stroke="${K}" stroke-width="2.5"/><text x="17" y="-4.5" text-anchor="middle" font-family="Bangers,Impact,sans-serif" font-size="10" fill="${K}">$EZ</text></g></g>
      <g transform="translate(126 90)"><g class="sh-fire"><path d="M0 0c-10 0-14-7-13-13 1-6 6-8 6-15 5 4 6 7 6 10 3-2 4-5 4-8 6 5 9 10 9 15 0 7-5 11-12 11z" fill="#e0352d" stroke="${K}" stroke-width="2.5" stroke-linejoin="round"/><path d="M0 0c-4 0-6-3-5-6 1-2 3-3 3-6 3 3 6 5 6 8s-2 4-4 4z" fill="#fdbc2a"/></g></g>
    </svg></div>`;
  const V=[v1,v2,v3,v4];
  /* the cover's parts, kept as live nodes (the h1, Starring and the film keep working) */
  const mount=(cls)=>{const cv=D.querySelector('#wc-book .wc-cover');if(!cv)return null;cv.classList.add('sh-cv',cls);
    const h1=cv.querySelector('.wc-h1'),film=cv.querySelector('.wc-film-slot'),star=cv.querySelector('.wc-starring'),top=cv.querySelector('.wc-cv-top'),tag=cv.querySelector('.wc-tag');
    [top,tag].forEach(x=>x&&x.classList.add('se-hide'));
    /* the headline re-set as the masthead; same words in the same order */
    h1.innerHTML=`<span class="sh-k">4 AI<span class="wc-lc">s</span></span> <span class="sh-m">trade earnings</span> <span class="sh-sub">to run our buybacks.</span>`;
    return {cv,h1,film,star}};
  /* issue strip: season, issue = reports graded so far, today's date in New York, and the price box carries the next close */
  const issue=()=>{const n=ROUNDS.length,c=closeWords();return `<div class="sh-iss"><span class="sh-is1"><b>Season 1</b><small><i class="sh-lgv">${esc(today())}</i><i class="sh-smv">${esc(new Date().toLocaleDateString('en-US',{timeZone:'America/New_York',month:'short',day:'numeric'}))}</i></small></span><span class="sh-is2"><b>No. ${n}</b><small><i class="sh-lgv">reports </i>graded</small></span>
    <span class="sh-pr" aria-label="${esc(c.a+': '+c.b)}"><small>${esc(c.a)}</small><b>${esc(c.b)}</b></span></div>`};
  const guard=()=>`<p class="sh-gd"><span class="sh-gr">Right: $EZ buyback.</span> <span class="sh-gw">Wrong: the pool can be wiped out.</span></p>`;
  const rm=S.rm;
  return {S,D,H,esc,STEP,STEP_T,V,fight,lead,face,mount,issue,guard,rm,closeWords,today}})();
