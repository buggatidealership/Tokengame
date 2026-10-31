/* story mockups, helper "h" (2026-10-30): the cover as the front of a comic book, built around the loop.
   Laid over the built X3+ page after helper e's shared SE (../e/_se.js). Every name, call, date and logo comes from the page's data. */
window.SH=window.SH||(function(){
  const S=SE,D=document,H=D.documentElement,esc=S.esc;
  /* the loop's four lines (wording research: see report) */
  const STEP=['They call the move <b>before</b> earnings','The market close grades every call','Top P&amp;L gets the golden ticket','Every call stays on the public record'];
  const STEP_T=['They call the move before earnings','The market close grades every call','Top P&L gets the golden ticket','Every call stays on the public record'];
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
  /* no calls in for the next close (e.g. a weekend): show the newest graded round's calls, so panel 1 is never empty */
  const lastCalls=()=>{const R=window.ROUNDS||[];const g=R[R.length-1];return g?{ticker:g.ticker,calls:(g.calls||[]).map(c=>({m:c[0],dir:String(c[1]).split(' ')[0]}))}:null};
  const v1=()=>{const f=fight(),r=f?f.r:lastCalls();if(!r)return '<div class="sh-v sh-v1"></div>';const pos=[['p-tl'],['p-tr'],['p-bl'],['p-br']];
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
  /* owner, 2026-10-30, late: the cover says what we do; the pool and buybacks come later on the page. Step 4 is the record: graded cards filed in a stack */
  const v4=()=>`<div class="sh-v sh-v4" aria-hidden="true"><svg viewBox="0 0 150 95">
      ${[[-12,30,8],[-4,44,4],[5,58,0]].map(([r,x,y])=>`<g transform="translate(${x} ${12+y}) rotate(${r})"><rect x="0" y="0" width="46" height="62" rx="4" fill="#fffaf0" stroke="${K}" stroke-width="3"/><rect x="5" y="5" width="36" height="22" rx="2" fill="#ffd24a" stroke="${K}" stroke-width="2"/><path d="M8 34h30M8 41h24M8 48h28" stroke="${K}" stroke-width="2" stroke-linecap="round" opacity=".55"/></g>`).join('')}
      <g transform="translate(116 30) rotate(-8)"><g class="sh-st1"><rect x="-13" y="-10" width="26" height="20" rx="3" fill="#13a35a" stroke="${K}" stroke-width="2.5"/><path d="M-6 0l4 4 8-9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g></g>
      <g transform="translate(124 64) rotate(7)"><g class="sh-st2"><rect x="-13" y="-10" width="26" height="20" rx="3" fill="#e0352d" stroke="${K}" stroke-width="2.5"/><path d="M-5 -5l10 10M5 -5l-10 10" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g></g>
    </svg></div>`;
  const V=[v1,v2,v3,v4];
  /* the cover's parts, kept as live nodes (the h1, Starring and the film keep working) */
  const mount=(cls)=>{const cv=D.querySelector('#wc-book .wc-cover');if(!cv)return null;cv.classList.add('sh-cv',cls);
    const h1=cv.querySelector('.wc-h1'),film=cv.querySelector('.wc-film-slot'),star=cv.querySelector('.wc-starring'),top=cv.querySelector('.wc-cv-top'),tag=cv.querySelector('.wc-tag');
    [top,tag].forEach(x=>x&&x.classList.add('se-hide'));
    /* the headline re-set as the masthead; same words in the same order */
    h1.innerHTML=`<span class="sh-k">4 AI<span class="wc-lc">s</span></span> <span class="sh-m">trade earnings</span> <span class="sh-sub">Who calls it best?</span>`;
    return {cv,h1,film,star}};
  /* issue strip: season, issue = reports graded so far, today's date in New York, and the price box carries the next close */
  const issue=()=>{const n=ROUNDS.length,c=closeWords();return `<div class="sh-iss"><span class="sh-is1"><b>Season 1</b><small><i class="sh-lgv">${esc(today())}</i><i class="sh-smv">${esc(new Date().toLocaleDateString('en-US',{timeZone:'America/New_York',month:'short',day:'numeric'}))}</i></small></span><span class="sh-is2"><b>No. ${n}</b><small><i class="sh-lgv">reports </i>graded</small></span>
    <span class="sh-pr" aria-label="${esc(c.a+': '+c.b)}"><small>${esc(c.a)}</small><b>${esc(c.b)}</b></span></div>`};
  /* the cover's last beat opens the next section (skill lesson 63); the pool and its risk are told in the bet section */
  const guard=()=>`<p class="sh-gd sh-nx"><button type="button" class="sh-nxb">Meet the four models ↓</button></p>`;
  const rm=S.rm;
  return {S,D,H,esc,STEP,STEP_T,V,fight,lead,face,mount,issue,guard,rm,closeWords,today}})();
