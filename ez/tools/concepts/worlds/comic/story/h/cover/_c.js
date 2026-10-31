/* Round H · cover: shared parts for takes C1 to C5, laid over the built X3+ page (after helper h's SH and helper e's SE, which the page carries).
   Every number, name, logo and time comes from the page's own data: ROUNDS, PENDING (through SE.toCome), __x2pPnl (SE.lead), MODELS, the New York clock. */
window.CV=(function(){
  const S=window.SE,X=window.SH,D=document,H=D.documentElement,esc=S.esc;
  const IMG='tools/concepts/worlds/comic/story/h/cover/img/';
  const lead=S.lead();
  const face=(m,cls)=>S.face(m,(cls||'')+(m===lead?' wc9-holo':''));
  /* ---- the clock: New York now, and the next close that grades rounds with calls in ---- */
  const ny=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hourCycle:'h23',weekday:'short',hour:'numeric',minute:'numeric',second:'numeric'}).formatToParts(new Date());const g=k=>p.find(z=>z.type===k).value;return {h:+g('hour')%24,m:+g('minute'),s:+g('second'),wd:g('weekday')}};
  const nc=()=>{const c=S.nextClose();if(c)return {...c,locked:1};
    /* no calls locked yet (a weekend): the next report day on the card; its close is still the bell */
    const L=S.toCome().filter(x=>x.day).sort((a,b)=>S.pd(a.day).t-S.pd(b.day).t);if(!L.length)return null;const d=L[0].day,g=L.filter(x=>x.day===d);
    const q=S.pd(d),want=Date.UTC(q.y,q.m-1,q.d,16,0);const loc=x=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}).formatToParts(new Date(x));const G=k=>+p.find(z=>z.type===k).value;return Date.UTC(G('year'),G('month')-1,G('day'),G('hour')%24,G('minute'))};
    let at=want;for(let i=0;i<3;i++)at+=want-loc(at);return {day:d,items:g.sort((a,b)=>S.cap(b.ticker)-S.cap(a.ticker)),at,rel:S.rel(d),locked:0}};
  const left=()=>{const c=nc();if(!c)return null;let t=Math.max(0,c.at-Date.now());const d=Math.floor(t/864e5);t-=d*864e5;const h=Math.floor(t/36e5);t-=h*36e5;const m=Math.floor(t/6e4);t-=m*6e4;return {d,h,m,s:Math.floor(t/1e3),ms:c.at-Date.now(),rel:c.rel,day:c.day,n:c.items.length,locked:c.locked,top:c.items[0]}};
  const leftTxt=()=>{const L=left();if(!L)return 'Next close soon';return (L.d?L.d+'d ':'')+L.h+'h '+String(L.m).padStart(2,'0')+'m'};
  const closeDay=()=>{const L=left();if(!L)return '';return L.rel==='Today'?'today':L.rel==='Tomorrow'?'tomorrow':S.wd(L.day,1)};
  /* live state: on air while a close that grades locked calls is under 24 hours away on a weekday; otherwise the season is live but the floor is shut */
  const onAir=()=>{const L=left(),n=ny();return !!L&&L.ms<864e5&&!/Sat|Sun/.test(n.wd)};
  const tot=S.totals();
  /* the next fight: the biggest locked round at the next close; with none in, the newest graded round's calls (panel 1 never empty) */
  const fight=()=>{const L=left();if(L&&!L.locked&&L.top)return {t:L.top.ticker,co:L.top.co,calls:S.STAR.map(m=>({m,q:1})),live:0,next:1};const f=X&&X.fight&&X.fight();if(f)return {t:f.r.ticker,co:f.r.co,calls:f.r.calls.map(c=>({m:c.m,up:c.dir==='UP'})),live:1};
    const g=ROUNDS[ROUNDS.length-1];return g?{t:g.ticker,co:g.co,calls:(g.calls||[]).map(c=>({m:c[0],up:/^UP/.test(String(c[1]))})),live:0}:null};
  /* ---- step words: reading (a) keeps the record; reading (b) brings the pool back, softly and honestly ---- */
  const STEPS={a:['They call the move <b>before</b> earnings','The market close grades every call','Top P&amp;L gets the golden ticket','Every call stays on the public record'],
               b:['They call the move <b>before</b> earnings','The market close grades every call','Top P&amp;L gets the golden ticket','We follow its call on NVIDIA with our pool. It can be lost.']};
  /* ---- the headline: the page's own h1, re-lettered one glyph at a time (each letter its own size, angle and baseline, lesson 70) ---- */
  const hash=(s,i)=>{let h=2166136261;for(const c of s+i)h=Math.imul(h^c.charCodeAt(0),16777619);return ((h>>>0)%1000)/1000};
  const letter=(w,cls)=>`<span class="cvw ${cls||''}" aria-hidden="true">${[...w].map((c,i)=>c===' '?'<i class="cvsp"> </i>':`<i class="cvl" style="--r:${((hash(w,i)-.5)*7).toFixed(1)}deg;--y:${((hash(w,i+9)-.5)*.09).toFixed(3)}em;--k:${(.94+hash(w,i+3)*.12).toFixed(2)}">${esc(c)}</i>`).join('')}</span>`;
  const mount=id=>{const cv=D.querySelector('#wc-book .wc-cover');if(!cv)return null;
    const h1=cv.querySelector('.wc-h1'),film=cv.querySelector('.wc-film-slot'),star=cv.querySelector('.wc-starring');
    cv.className='wc-cover cvx cvx-'+id;H.classList.remove('sh-on');H.classList.add('cv-on');
    [...cv.children].forEach(n=>{if(n!==h1&&n!==film&&n!==star)n.remove()});
    h1.className='wc-h1 cvh';h1.setAttribute('aria-label','4 AIs trade earnings. Who calls it best?');
    const cap=film.querySelector('.wc-film-cap');if(cap)cap.remove();
    return {cv,h1,film,star}};
  /* the cast as faces only (Starring keeps names, never numbers; the leader in holo) */
  const cast=cls=>`<span class="cv-cast ${cls||''}">${S.STAR.map(m=>`<span class="cv-cm">${face(m)}<b>${esc(S.NM[m])}</b></span>`).join('')}</span>`;
  /* live badge: a hand-cut tag with a breathing lamp */
  const live=()=>{const on=onAir(),L=left();return `<span class="cv-live ${on?'is-on':'is-off'}" role="status"><i class="cv-lamp"></i><b>${on?'Live':'Season 1 · live'}</b><small>${!L?'Next calls soon':L.locked?`${L.n} round${L.n>1?'s':''} locked · graded ${esc(closeDay())} at the close`:`${L.n} report${L.n>1?'s':''} ${esc(closeDay())} · calls go in before`}</small></span>`};
  /* the next close as a live countdown that ticks */
  const tick=[];const every=f=>{tick.push(f);f()};setInterval(()=>tick.forEach(f=>f()),1000);
  const cdown=cls=>{const id='cvcd'+Math.random().toString(36).slice(2,7);every(()=>{const e=D.getElementById(id);if(e)e.textContent=leftTxt()});return `<b class="cv-cd ${cls||''}" id="${id}">${esc(leftTxt())}</b>`};
  /* the four props (painted cut-outs from Hedra for the objects, page elements for data) */
  const P={
    calls:(cls)=>{const f=fight();if(!f)return '';return `<span class="cvp cvp-calls ${cls||''}"><span class="cvp-co">${S.coImg(f.t,'cvp-lg')}</span>${f.calls.map((c,i)=>`<span class="cvp-c cvp-c${i}">${face(c.m)}${c.q?'<i class="cvp-a cvp-q" aria-label="call not in yet">?</i>':`<i class="cvp-a ${c.up?'up':'dn'}" aria-label="${c.up?'up':'down'}"><svg viewBox="0 0 20 20"><path d="${c.up?'M10 3 18 15H2z':'M10 17 2 5h16z'}"/></svg></i>`}</span>`).join('')}</span>`},
    bell:(cls)=>`<span class="cvp cvp-bell ${cls||''}"><img class="cvb-c" src="${IMG}cut/clapper.webp" alt=""><img class="cvb-b" src="${IMG}cut/bell2.webp" alt=""><svg class="cvb-r" viewBox="0 0 100 60" aria-hidden="true"><path d="M8 40c-3-8-2-17 3-24M18 44c-4-9-3-20 2-28M92 40c3-8 2-17-3-24M82 44c4-9 3-20-2-28"/></svg></span>`,
    clock:(cls)=>{const id='cvck'+Math.random().toString(36).slice(2,7);every(()=>{const e=D.getElementById(id);if(!e)return;const n=ny(),hA=((n.h%12)+n.m/60)*30,mA=(n.m+n.s/60)*6,sA=n.s*6;e.style.setProperty('--ha',hA+'deg');e.style.setProperty('--ma',mA+'deg');e.style.setProperty('--sa',sA+'deg');
        const L=left(),wedge=e.querySelector('.cvk-w');if(wedge){const today=L&&L.rel==='Today'&&L.ms>0;const a0=hA,a1=120;wedge.style.opacity=today?1:0;if(today){const r=26,p=a=>[50+r*Math.sin(a*Math.PI/180),50-r*Math.cos(a*Math.PI/180)];const [x0,y0]=p(a0),[x1,y1]=p(a1+(a1<a0?360:0));wedge.setAttribute('d',`M50 50L${x0} ${y0}A${r} ${r} 0 ${((a1-a0+360)%360)>180?1:0} 1 ${x1} ${y1}z`)}}});
      return `<span class="cvp cvp-clock ${cls||''}" id="${id}" role="img" aria-label="New York time now; the red mark is the 4 PM close"><img src="${IMG}cut/clock2.webp" alt=""><svg viewBox="0 0 100 100"><path class="cvk-w" d=""/><g class="cvk-4" transform="rotate(120 50 50)"><path d="M50 23v5"/></g>
        <g class="cvk-h"><path d="M50 54V34"/></g><g class="cvk-m"><path d="M50 56V24.5"/></g><g class="cvk-s"><path d="M50 57V23.5"/></g><circle cx="50" cy="50" r="2.2"/></svg></span>`},
    ticket:(cls)=>`<span class="cvp cvp-tk ${cls||''}" style="--tkm:url(${IMG}cut/ticket.webp)"><img src="${IMG}cut/ticket.webp" alt=""><i class="cvp-tkg"></i><span class="cvp-tkf">${face(lead,'cvp-tkface')}</span><span class="cvp-tkn">${esc(S.NM[lead])}</span></span>`,
    stack:(cls)=>`<span class="cvp cvp-st ${cls||''}"><img src="${IMG}cut/stack.webp" alt=""><i class="cvp-stn">${tot.g}</i></span>`,
    pool:(cls)=>`<span class="cvp cvp-pool ${cls||''}"><img src="${IMG}cut/pool.webp" alt=""></span>`,
  };
  /* a data check kept for the report: the countdown against the page's own next close */
  const check=()=>{const c=nc();window.__cvCheck={next:c&&c.day,locked:c&&c.locked,items:c&&c.items.map(r=>r.ticker).join(','),left:leftTxt(),lead,graded:ROUNDS.length,onAir:onAir()}};
  const ready=()=>{check();H.classList.add('cv-ready')};
  return {S,X,D,H,esc,IMG,lead,face,ny,left,leftTxt,closeDay,onAir,tot,fight,STEPS,letter,mount,cast,live,cdown,every,P,ready}})();
