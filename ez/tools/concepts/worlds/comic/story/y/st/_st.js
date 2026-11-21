/* Round ST (2026-10-31): C2 "the page of panels" rebuilt as plain parts, so a style sheet alone can render every element in one style
   (lettering, panel frames, gutters, grounds, bursts, numbers, coins, the golden ticket, the record slabs).
   Same content and order as C2: masthead (Season 1 · No. · date, the four models, "4 AIs trade earnings", "Who calls it best?"),
   1 they call the move before earnings (the newest graded round's four calls round the company), 2 the close grades every call
   (the bell, the move, pass or fail), 3 top P&L holds the golden ticket, 4 every call stays on the record, then the film.
   Every number comes from the page: CV (../cv/_cv.js) reads ROUNDS, __x2pPnl and MODELS. window.STT={name, cls} picks the take. */
(function(){const X=CV,S=X.S,P=X.P,T=window.STT||{name:'st',cls:''};const m=X.mount('st '+T.cls);if(!m)return;const {root,film,h1}=m;
  const L=X.last,esc=S.esc,ORD=['GPT','KIMI','CLAUDE','GROK'];
  const mc=k=>k==='GROK'?'#15121a':MODELS[k].c;
  const w=(t,cls,tag,inner)=>`<${tag||'span'} class="st-w ${cls||''}" data-t="${esc(t)}">${inner||esc(t)}</${tag||'span'}>`;
  const coin=(k,cls)=>`<i class="st-coin st-c-${k}${k===X.lead?' st-lead':''} ${cls||''}" style="--mc:${mc(k)}" data-m="${k}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${MODELS[k].d}" fill-rule="${MODELS[k].fr||'nonzero'}"/></svg></i>`;
  /* one shared defs sheet: the gradients a style may point its bell, ticket or coin at */
  if(!document.getElementById('st-defs'))document.body.insertAdjacentHTML('beforeend',`<svg id="st-defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <linearGradient id="stg-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff7c0"/><stop offset=".35" stop-color="#ffd21f"/><stop offset="1" stop-color="#c77400"/></linearGradient>
    <linearGradient id="stg-chrome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".38" stop-color="#c9d4e6"/><stop offset=".5" stop-color="#3a4256"/><stop offset=".62" stop-color="#e9eef7"/><stop offset="1" stop-color="#7d88a0"/></linearGradient>
    <linearGradient id="stg-deco" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c0"/><stop offset=".5" stop-color="#d9a93a"/><stop offset="1" stop-color="#7a520e"/></linearGradient>
    <radialGradient id="stg-clay" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".55" stop-color="#ffc44d"/><stop offset="1" stop-color="#e08a2a"/></radialGradient>
    <linearGradient id="stg-holo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff9ad5"/><stop offset=".25" stop-color="#ffd36a"/><stop offset=".5" stop-color="#9dffd8"/><stop offset=".75" stop-color="#8cc9ff"/><stop offset="1" stop-color="#d9a3ff"/></linearGradient>
    <linearGradient id="stg-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient>
    <linearGradient id="stg-brass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0c879"/><stop offset=".5" stop-color="#a8702a"/><stop offset="1" stop-color="#5a3510"/></linearGradient>
  </defs></svg>`);
  const bell=()=>`<svg class="st-bell" viewBox="-4 0 68 60" aria-hidden="true"><g class="st-bg"><path class="st-bt" d="M30 6v6"/><path class="st-bs" transform="translate(3 3)" d="M30 12c-13 0-17 11-17 21v9l-6 7h46l-6-7v-9c0-10-4-21-17-21z"/><path class="st-bb" d="M30 12c-13 0-17 11-17 21v9l-6 7h46l-6-7v-9c0-10-4-21-17-21z"/><path class="st-bh" d="M20 22c2-4 5-6 8-6.5"/><circle class="st-bc" cx="30" cy="53" r="4.6"/></g><g class="st-br"><path d="M6 20l-5-3M54 20l5-3M4 31H-2M56 31h6"/></g></svg>`;
  const arrow=up=>up?'▲':'▼';
  const mv=arrow(L.a>=0)+Math.abs(L.a).toFixed(2)+'%';
  const N=X.R.length,lead=X.lead,ld=X.nm(lead).toUpperCase(),pnl=P.pm(X.L.pnl);
  const say=(c,i)=>`<span class="st-say st-say${i}">${coin(c.m)}<i class="st-b ${c.up?'st-bu':'st-bd'}"><span class="st-bw">${c.up?'Up':'Down'} </span><span class="st-ba">${arrow(c.up)}</span>${esc(c.sz)}</i></span>`;
  const calls=ORD.map(k=>X.calls.find(x=>x.m===k));
  const cap=i=>`<p class="st-cap"><b class="st-n">${i+1}</b><span>${X.STEP[i]}</span></p>`;
  const slabs=[2,1,0].map(i=>{const r=X.R[X.R.length-1-i];return `<span class="st-slab st-s${i}"><i class="st-sl">#${r.n}</i><i class="st-sw">${S.coImg(r.ticker,'st-swl')}</i></span>`}).join('');
  root.innerHTML=`<div class="st-pg">
    <div class="st-mh st-pn"><i class="st-gr" aria-hidden="true"></i>
      <span class="st-iss" aria-hidden="true">${w('Season 1','st-iss1','b')}<small>No. ${N}</small><small>${esc(X.shortDay)}</small></span>
      <span class="st-cast" aria-hidden="true">${S.STAR.map(k=>coin(k)).join('')}</span>
      <span class="st-t"></span>
      <span class="st-bal" aria-hidden="true"><span>Who calls it best?</span></span>
    </div>
    <div class="st-rows" role="list" aria-label="How every round goes">
      <div class="st-row st-ra">
        <div class="st-p st-pn st-p1" role="listitem"><i class="st-gr" aria-hidden="true"></i>${cap(0)}<div class="st-in">
          ${say(calls[0],0)}${say(calls[1],1)}
          <span class="st-co">${X.logo(L.ticker,'st-lg')}<b class="st-con">${esc(X.co(L))}</b></span>
          ${say(calls[2],2)}${say(calls[3],3)}</div></div>
        <div class="st-p st-pn st-p2" role="listitem"><i class="st-gr" aria-hidden="true"></i>${cap(1)}<div class="st-in">
          <span class="st-bellw">${bell()}${w('DING!','st-sfx st-ding')}</span>
          ${w(mv,'st-num st-mv '+(L.a<0?'st-dn':'st-up'))}
          <span class="st-pfs">${X.calls.map(c=>`<span class="st-pfr">${coin(c.m,'st-sm')}<b class="st-pf ${c.pass?'st-pass':'st-fail'}">${c.pass?'Pass':'Fail'}</b></span>`).join('')}</span></div></div>
      </div>
      <div class="st-row st-rb">
        <div class="st-p st-pn st-p3" role="listitem"><i class="st-gr" aria-hidden="true"></i>${cap(2)}<div class="st-in">
          <span class="st-tk"><span class="st-tks">${coin(lead,'st-tkc')}</span><span class="st-tkt"><small>Golden ticket</small>${w(ld,'st-tkn','b')}${w(pnl,'st-num st-tkp','em')}</span></span>
          ${w('MINE!','st-sfx st-mine')}</div></div>
        <div class="st-p st-pn st-p4" role="listitem"><i class="st-gr" aria-hidden="true"></i>${cap(3)}<div class="st-in">
          <span class="st-stack">${slabs}</span>
          <span class="st-file">${w('FILED!','st-sfx st-filed')}${w('No. '+N,'st-num st-no','b')}</span></div></div>
      </div>
    </div>
    <p class="st-again" aria-hidden="true"><i></i><span>Then the next round</span></p>
    <div class="st-fm st-pn"><i class="st-gr" aria-hidden="true"></i><span class="st-fl">Inside: how it works · 1:20</span></div>
  </div><p class="st-gd">${X.next('st-nx')}</p>`;
  root.querySelector('.st-fm').append(film);X.wire(root);
  root.querySelector('.st-t').append(h1);
  X.head(h1,`<div class="st-hd"><div class="st-l1">${w('4 AIs','st-ais','span','4 AI<span class="st-s">s</span>')} ${w('TRADE','st-trade')}</div> ${w('EARNINGS','st-earn')}</div>`);
  /* fit: the big words fill their line, never more */
  function fit(){root.querySelectorAll('[data-fit]').forEach(e=>{e.style.fontSize='';});
    const mh=root.querySelector('.st-mh'),avail=mh.clientWidth-parseFloat(getComputedStyle(mh).paddingLeft)-parseFloat(getComputedStyle(mh).paddingRight)-6;
    const ea=root.querySelector('.st-earn');const base=parseFloat(getComputedStyle(ea).fontSize);const k=Math.min(1,avail/ea.scrollWidth);ea.style.fontSize=(base*k).toFixed(1)+'px';
    root.querySelectorAll('.st-b').forEach(b=>{b.style.fontSize=''});
    /* the balloons in panel 1 keep two per row, apart and inside the panel */
    const p1=root.querySelector('.st-p1 .st-in');if(p1){const bad=()=>{const q=p1.getBoundingClientRect(),s=[...p1.querySelectorAll('.st-say')].map(e=>e.getBoundingClientRect());
        return s.some(r=>r.right>q.right+1||r.left<q.left-1)||s[0].right>s[1].left-3||s[2].right>s[3].left-3};
      let guard=0;while(guard++<10&&bad()){p1.querySelectorAll('.st-b').forEach(b=>{b.style.fontSize=(parseFloat(getComputedStyle(b).fontSize)*.94).toFixed(1)+'px'})}}
  }
  document.fonts.ready.then(()=>{fit();let lw=root.clientWidth;new ResizeObserver(()=>{const ww=root.clientWidth;if(Math.abs(ww-lw)>2){lw=ww;fit()}}).observe(root);
    setTimeout(()=>X.ready(T.name),60)});
})();
