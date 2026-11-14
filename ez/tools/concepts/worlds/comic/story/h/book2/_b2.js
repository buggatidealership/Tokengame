/* Round H7 · book2: the whole site as one comic book. Shared builder (mockups only, laid over the built v47-live-x3plus.html).
   B2.mount(id): puts the take's painted cover in front of the live first screen, letters the cover with live text,
   wraps every Overview section as a chapter (data-ch, folio), and leaves the opening, the chapter turns,
   the header and the tabs to the take's own script (B2T[id]). Every number from ROUNDS, __x2pPnl, SE. */
window.B2=(function(){
  const D=document,H=D.documentElement,S=window.SE,esc=S.esc,NM=S.NM;
  const IMG='tools/concepts/worlds/comic/story/h/book2/img/';
  const lead=S.lead(),A=(window.__x2pPnl&&__x2pPnl().A)||{};
  const money=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
  const graded=ROUNDS.length,g=ROUNDS[ROUNDS.length-1];
  const ex={n:g.n,t:S.tk(g.ticker),co:g.co,a:+g.a,win:String(g.win||'').toUpperCase().split(/[^A-Z]+/)[0]};
  const mv=v=>(v>0?'+':v<0?'−':'')+Math.abs(v).toFixed(2)+'%';
  const nextBell=()=>{const u=(window.UPCOMING||[]).find(r=>r.calls&&r.calls.length);return u?S.tk(u.ticker):''};
  /* the chapters of the Overview, in the book's order; each take may reorder */
  const CH=[
    {sel:'.wc-chars',  t:'Meet the models',      k:'The cast'},
    {sel:'.wc-season', t:'Every round so far',   k:'The record'},
    {sel:'.wc-splash', t:'Smart or just lucky?', k:'The question'},
    {sel:'.wc-bet',    t:'Bet #1: NVIDIA',       k:'The vault'},
    {sel:'.wc-back',   t:'Next issue',           k:'Back cover'}];
  const STEPS=['They predict the move <u>before</u> earnings','The market close grades every prediction','#1 on the leaderboard holds the golden ticket','We follow its call on every bet'];
  const FACE={gpt:'founder-gpt-anim.jpg',claude:'founder-claude-anim.jpg',kimi:'founder-kimi-anim.jpg',grok:'founder-grok-anim.jpg'};
  /* lettering pieces, each take places them in % of its plate */
  const T={
    mast:()=>`<span class="b2-mast" aria-hidden="true"><span>Earnings</span><span>Zeason</span></span>`,
    box:()=>`<span class="b2-box"><img src="tools/v22/x2p-logo.svg" alt="" onerror="this.remove()"><b>No. ${graded}</b><i>Season 1</i><s>Free</s></span>`,
    face:m=>`<span class="b2-face"><img src="media/${FACE[m]}" alt=""><b>${esc(NM[m.toUpperCase()]||m)}</b></span>`,
    h1:()=>`<h1 class="b2-h1"><span>4 AI<span class="wc-lc">s</span> trade earnings</span><span>Who calls it best?</span></h1>`,
    step:i=>`<span class="b2-st"><b>${i+1}</b><span>${STEPS[i]}</span></span>`,
    tk:()=>`<span class="b2-tk"><em>Golden ticket</em><b>${esc(NM[lead])}</b><small>${money(A[lead]?A[lead].pnl:0)}</small></span>`,
    bet:()=>`<span class="b2-bet"><em>Inside!</em><b>Bet #1: NVIDIA</b></span>`,
    seal:()=>`<span class="b2-seal"><em>Graded at</em><b>the close</b><small>${graded} rounds</small></span>`,
    last:()=>`<span class="b2-last"><em>Last round · ${esc(ex.co)} (${esc(ex.t)})</em><b class="${ex.a>=0?'up':'dn'}">${mv(ex.a)}</b><small>${esc(NM[ex.win]||'Nobody')} wins it</small></span>`,
    open:()=>`<span class="b2-open">Open the book</span>`,
  };
  function cover(id,cfg){
    const cv=D.querySelector('#wc-book .wc-cover'),L=innerWidth>=900?'l':'p',sl=cfg[L];
    const el=D.createElement('div');el.className='b2-cv b2-'+L;el.setAttribute('role','img');el.setAttribute('aria-label',`Earnings Zeason, Season 1, No. ${graded}. The cover of the comic: four AIs trade earnings. Who calls it best?`);
    el.innerHTML=`<div class="b2-pl" style="--ar:${sl.ar}"><img class="b2-img" src="${IMG}${id}-${L}.jpg" alt="">${sl.slots.map(s=>`<div class="b2-s b2s-${s.t.split(':')[0]} ${s.cls||''}" style="left:${s.x}%;top:${s.y}%;width:${s.w}%;${s.h!=null?`height:${s.h}%;`:''}--r:${s.r||0}deg;--fs:${s.fs||4};${s.css||''}">${s.html!=null?s.html:render(s.t)}</div>`).join('')}</div>`;
    return el}
  const render=t=>{const [k,a]=t.split(':');if(k==='step')return T.step(+a);if(k==='face')return T.face(a);return T[k]?T[k]():''};
  function chapters(order){
    const bk=D.querySelector('#wc-book');let pg=2;
    return (order||CH).map((c,i)=>{const s=bk.querySelector(c.sel);if(!s)return null;s.classList.add('b2-ch');s.dataset.ch=i+1;s.dataset.cht=c.t;s.dataset.pg=pg;pg+=Math.max(2,Math.round(s.offsetHeight/innerHeight));return {s,...c,i:i+1}}).filter(Boolean)}
  function mount(id){const cfg=window.B2T[id];H.classList.add('b2-on','b2-'+id);const bk=D.querySelector('#wc-book');if(cfg.order)cfg.order.forEach(c=>{const s=bk.querySelector(c.sel);if(s)bk.append(s)});const c=cover(id,cfg);const ch=chapters(cfg.order);
    window.__b2={take:id,graded,lead,last:ex.t+'#'+ex.n+' '+mv(ex.a)+' '+ex.win,ch:ch.map(x=>x.i+':'+x.t)};
    (cfg.run||(()=>{}))({cover:c,ch,B2:api});H.classList.add('b2-ready')}
  const film=()=>D.querySelector('#wc-book .wc-cover .sh-film .vt-f')||D.querySelector('#wc-book .vt-f');
  const prog=(el,a,b)=>{const r=el.getBoundingClientRect();const run=el.offsetHeight-innerHeight;return Math.max(0,Math.min(1,(-r.top/Math.max(1,run)-a)/(b-a)))};
  const api={mount,film,prog,STEPS,T,CH,ex,lead,graded,NM,esc,money,IMG,FACE,nextBell};return api})();
window.B2T=window.B2T||{};
