/* Snapshot of y/cv/c2.js for round FULL (only change: build() waits for a real width, so no negative svg sizes).
   C2 · The page of panels. A comic page leads (ink page, diagonal cuts, narration captions, read 1 to 4); manga ink adds the speed lines
   and the hand-lettered sound effects; risograph adds the grain and the off-register second ink on each sound effect; holo trading card
   adds the golden-ticket panel. Pop's extruded lettering for the masthead. Panels 1 and 2 follow one real round (the newest graded). */
(function(){const X=CV,S=X.S,P=X.P,m=X.mount('c2');if(!m)return;const {root,film,h1}=m;const L=X.last;
  root.innerHTML=`<div class="c2-pg"><div class="c2-mh"></div><div class="c2-rows" role="list" aria-label="How every round goes"></div><p class="c2-again" aria-hidden="true"><i></i>Then the next round</p><div class="c2-fm"><span class="c2-fl">Inside: how it works · 1:20</span></div></div><p class="c2-gd">${X.next()}</p>`;
  const mh=root.querySelector('.c2-mh'),rows=root.querySelector('.c2-rows');root.querySelector('.c2-fm').append(film);X.wire(root);
  const sfx=(t,size,fill,cls)=>`<span class="c2-sfx ${cls||''}">${X.ext(t,{size,fill,depth:Math.round(size*.1)})}</span>`;
  function build(){if(root.clientWidth<120)return;const W=root.clientWidth,desk=W>=900,pw=desk?(W-40)*.5:W-12;
    const hs=desk?64:Math.min(46,pw*.13);
    mh.innerHTML=`<span class="c2-iss"><b>Season 1</b><small>No. ${X.R.length}</small><small>${S.esc(X.shortDay)}</small></span><span class="c2-t"></span><span class="c2-cast" aria-hidden="true">${S.STAR.map(mm=>X.coin(mm,desk?38:28,{dp:2,holo:false})).join('')}</span><i class="c2-sp"></i>`;
    mh.querySelector('.c2-t').append(h1);
    X.head(h1,`<span class="c2-l1">${X.aisWord({size:hs*.62,fill:'white'})}${X.ext('TRADE',{size:hs,fill:'gold'})}</span>${X.ext('EARNINGS',{size:hs*1.18,fill:'gold',max:desk?pw-40:pw-20})}`);mh.querySelector('.c2-t').insertAdjacentHTML('beforeend','<span class="c2-bal" aria-hidden="true">Who calls it best?</span>');
    const cs=desk?30:22;
    const p1=`<div class="c2-co">${X.logo(L.ticker,'c2-lg')}<b>${S.esc(X.co(L))}</b></div>${['GPT','KIMI','CLAUDE','GROK'].map((mm,i)=>{const c=X.calls.find(x=>x.m===mm);return `<span class="c2-say c2-say${i}">${X.coin(mm,cs,{dp:2,holo:false})}<i class="c2-b ${c.up?'c2-bu':'c2-bd'}"><span class="c2-bw">${c.up?'Up':'Down'} </span><span class="c2-ba">${c.up?'▲':'▼'}</span>${S.esc(c.sz)}</i></span>`}).join('')}`;
    const p2=`<span class="c2-bell">${X.bell(desk?62:50)}${sfx('DING!',desk?30:24,'gold','c2-ding')}</span><span class="c2-mv">${X.ext((L.a<0?'▼':'▲')+Math.abs(L.a).toFixed(2)+'%',{size:desk?24:19,fill:L.a<0?'red':'green'})}</span><span class="c2-pfs">${X.calls.map(c=>`<span>${X.coin(c.m,desk?20:17,{dp:1,holo:false})}${X.pf(c)}</span>`).join('')}</span>`;
    const p3=`${X.ticket(desk?190:Math.round(pw*.42))}${sfx('MINE!',desk?28:21,'pink','c2-mine')}`;
    const p4=`${X.slabs(desk?110:Math.round(pw*.25))}<span class="c2-file">${sfx('FILED!',desk?28:21,'white','c2-filed')}<b>No. ${X.R.length}</b></span>`;
    const cap=(i)=>`<p class="c2-cap"><b>${i+1}</b><span>${X.STEP[i]}</span></p>`;
    rows.innerHTML=`<div class="c2-row c2-ra"><div class="c2-p c2-p1" role="listitem">${cap(0)}<div class="c2-in">${p1}</div><i class="c2-gr"></i></div><div class="c2-p c2-p2" role="listitem">${cap(1)}<div class="c2-in">${p2}</div><i class="c2-gr"></i></div></div>
      <div class="c2-row c2-rb"><div class="c2-p c2-p3" role="listitem">${cap(2)}<div class="c2-in">${p3}</div><i class="c2-gr"></i></div><div class="c2-p c2-p4" role="listitem">${cap(3)}<div class="c2-in">${p4}</div><i class="c2-gr"></i></div></div>`;
  }
  build();let lw=root.clientWidth;new ResizeObserver(()=>{const w=root.clientWidth;if(Math.abs(w-lw)>2){lw=w;build()}}).observe(root);
  X.ready('c2')})();
