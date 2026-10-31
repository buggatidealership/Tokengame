/* Round CV (2026-10-31): the X3+ cover redone as a MIX of styles, never flat. Shared helpers for the four takes.
   Laid over the built page after SE (story/_se.js), SH (cv_sh.js) and POP (pop_lib.js). Every number comes from the page's data. */
window.CV=window.CV||(function(){
  const S=SE,P=POP,D=document,H=D.documentElement,INK=P.INK,esc=S.esc;
  const A=()=>window.__x2pPnl().A;
  const R=ROUNDS,last=R[R.length-1];
  const sgn=v=>v<0?-1:1;
  /* the newest graded round: each AI's call, and whether the close passed it (right way) */
  const calls=last.calls.map(([m,c,off])=>{const up=/^UP/.test(c),sz=String(c).split(' ')[1]||'';return {m,up,sz,off:+off,pass:(up?1:-1)===sgn(last.a)}});
  const wins=P.winners(last);
  const lead=S.lead();
  const a=A(),L=a[lead];
  const nm=m=>S.NM[m];
  const co=r=>`${r.co} (${S.tk(r.ticker)})`;
  /* the next calls day: biggest company first */
  const nextDay=(()=>{const g=S.byDay(S.toCome()).filter(x=>x.k!=='wait');if(!g.length)return null;const d=g[0];return {k:d.k,lab:S.dayLab(d.k).a,items:d.items}})();
  const today=SH.today();
  const shortDay=new Date().toLocaleDateString('en-US',{timeZone:'America/New_York',month:'short',day:'numeric'});
  /* mount: the cover keeps its live h1, Starring and film nodes; everything H1 built is hidden; the take gets one root */
  function mount(cls){const cv=D.querySelector('#wc-book .wc-cover');if(!cv)return null;
    cv.querySelectorAll(':scope > .sh-iss, :scope > .sh-mast, :scope > .sh-art, :scope > .sh-nxf').forEach(e=>e.classList.add('se-hide'));
    const film=cv.querySelector('.wc-film-slot'),star=cv.querySelector('.wc-starring'),h1=cv.querySelector('.wc-h1');
    const root=D.createElement('div');root.className='cvx '+cls;cv.prepend(root);cv.classList.add('cvx-cv');H.classList.add('cvx-on');
    return {cv,root,film,star,h1}}
  /* the headline: the page's own h1 node, its words kept for screen readers, the letters drawn */
  function head(h1,parts){h1.setAttribute('aria-label','4 AIs trade earnings. Who calls it best?');h1.innerHTML=parts;h1.classList.add('cvx-h1')}
  /* lettering shorthands */
  const ext=(t,o)=>P.ext(t,o);
  const aisWord=(o)=>`<span class="cvx-ais" style="--sm:${(-o.size*.34).toFixed(1)}px">${ext('4 AI',o)}${ext('s',Object.assign({},o,{size:o.size*.72,max:null}))}</span>`;
  /* a model's coin (extruded disc), the leader's in holo */
  const coin=(m,sz,o={})=>P.coin(m,sz,Object.assign({holo:m===lead&&o.holo!==false},o));
  /* a call as an extruded arrow and size */
  const callTxt=c=>(c.up?'▲':'▼')+c.sz;
  const callExt=(c,size,o={})=>ext(callTxt(c),Object.assign({size,font:'Luckiest Guy',fill:c.up?'green':'red',depth:Math.max(2,Math.round(size*.14))},o));
  /* PASS / FAIL as a small extruded slab */
  const pf=(c,cls)=>`<b class="cvx-pf ${c.pass?'cvx-pass':'cvx-fail'} ${cls||''}">${c.pass?'Pass':'Fail'}</b>`;
  /* the bell, drawn with a lit gradient, an ink outline and a solid shade (the cover's extrusion, on an object) */
  let bid=0;
  const bell=(sz,cls)=>{const id='cvxb'+(++bid);return `<svg class="cvx-bell ${cls||''}" width="${sz}" height="${sz}" viewBox="0 0 60 60" aria-hidden="true"><defs><radialGradient id="${id}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff7c0"/><stop offset=".35" stop-color="#ffd21f"/><stop offset="1" stop-color="#c77400"/></radialGradient></defs>
    <g class="cvx-bellg"><path d="M30 6v6" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <path transform="translate(3 3)" d="M30 12c-13 0-17 11-17 21v9l-6 7h46l-6-7v-9c0-10-4-21-17-21z" fill="${INK}"/>
    <path d="M30 12c-13 0-17 11-17 21v9l-6 7h46l-6-7v-9c0-10-4-21-17-21z" fill="url(#${id})" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M20 22c2-4 5-6 8-6.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>
    <circle cx="30" cy="53" r="4.6" fill="${INK}"/></g>
    <g class="cvx-ring" stroke="${INK}" stroke-width="3" stroke-linecap="round"><path d="M6 20l-5-3M54 20l5-3M4 31H-2M56 31h6"/></g></svg>`};
  /* the golden ticket: holo foil, scalloped, the leader's coin on its stub, its season P&L extruded */
  const ticket=(w,o={})=>`<span class="cvx-tk ${o.cls||''}" style="--tw:${w}px"><span class="cvx-tks">${coin(lead,Math.round(w*.25),{dp:3})}</span><span class="cvx-tkt"><small>Golden ticket</small>${ext(nm(lead).toUpperCase(),{size:w*.15,fill:'white',shade:'#3b2f5c',max:w*.6})}${o.pnl!==false?`<span class="cvx-tkp">${ext(P.pm(L.pnl),{size:w*.105,fill:'green',max:w*.6})}</span>`:''}</span><i class="cvx-tkf"></i></span>`;
  /* the record: graded slabs stacked in depth, the newest on top with its number */
  const slabs=(w)=>`<span class="cvx-stack" style="--sw:${w}px">${[2,1,0].map(i=>`<span class="cvx-slab cvx-s${i}"><i class="cvx-sl"><em>#${R[R.length-1-i].n}</em></i><i class="cvx-sw">${S.coImg(R[R.length-1-i].ticker,'cvx-swl')}</i></span>`).join('')}</span>`;
  const logo=(t,cls)=>S.coImg(t,cls||'');
  /* "Meet the four models": the cover's last beat hands the reader to the next section */
  const next=(cls)=>`<button type="button" class="cvx-nx ${cls||''}">Meet the four models</button>`;
  function wire(root){root.querySelectorAll('.cvx-nx').forEach(b=>b.addEventListener('click',()=>{const c=D.querySelector('.wc-chars');if(c)c.scrollIntoView({behavior:S.rm()?'auto':'smooth',block:'start'})}))}
  const STEP=['They call the move <b>before</b> earnings','The close grades every call','Top P&amp;L holds the golden ticket','Every call stays on the record'];
  const ready=t=>H.classList.add(t+'-ready');
  return {S,P,D,H,INK,esc,R,last,calls,wins,lead,L,a,nm,co,nextDay,today,shortDay,mount,head,ext,aisWord,coin,callExt,callTxt,pf,bell,ticket,slabs,logo,next,wire,STEP,ready}})();
