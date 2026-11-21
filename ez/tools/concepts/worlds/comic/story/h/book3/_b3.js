/* Round H12 · book3: the whole Overview as one scrolled comic book. Shared builder (mockups only, laid over the built v47-live-x3plus.html).
   B3.mount(id): tags every Overview section as a chapter (data-ch, a page folio), turns the header into a running head
   (logo, issue No. = graded rounds, the chapter you are in), writes the narration that bridges each pair of chapters,
   and hands the rhythm and the hand-overs to the take's own script (B3T[id]). Every number from ROUNDS, __x2pPnl and the page itself. */
window.B3=(function(){
  const D=document,H=D.documentElement;
  const IMG='tools/concepts/worlds/comic/story/h/book3/img/';
  const book=()=>D.getElementById('wc-book');
  const graded=ROUNDS.length;
  const A=(window.__x2pPnl&&__x2pPnl().A)||{};
  const NM=(window.SE&&SE.NM)||{GPT:'GPT',CLAUDE:'Claude',KIMI:'Kimi',GROK:'Grok'};
  const lead=Object.keys(A).sort((a,b)=>(A[b].pnl||0)-(A[a].pnl||0))[0]||'GROK';
  const txt=s=>{const e=D.querySelector(s);return e?e.textContent.replace(/\s+/g,' ').trim():''};
  /* the live date of the bet, read from the bet chapter's own line ("It goes on at the close, Wednesday, November 18.") */
  const betWhen=()=>{const m=txt('.wc-bet .hb-sub').match(/close,?\s*(.*?)\.?$/i);return m?m[1]:''};
  const nextCard=()=>{const s=txt('.wc-cliff h2 > span');return s.replace(/^Next on the card,?\s*/i,'')};
  const nRounds=()=>{const m=txt('.wc-cliff h2 small').match(/^(\d+) rounds?/i);return m?+m[1]:0};
  const CH=[
    {sel:'.wc-cover', t:'Cover',              k:'Season 1'},
    {sel:'.wc-chars', t:'Meet the models',    k:'The cast'},
    {sel:'.wc-season',t:'Every round so far', k:'The record'},
    {sel:'.wc-splash',t:'Smart or lucky?',    k:'The test'},
    {sel:'.wc-bet',   t:'Bet #1: NVIDIA',     k:'The stakes'},
    {sel:'.wc-cliff', t:'Next on the card',   k:'To be continued'},
    {sel:'.wc-back',  t:'Back cover',         k:''}];
  /* the narration that hands each chapter to the next (index = the chapter it opens). A voice, so it is lettered, never body text. */
  const NAR=()=>({
    1:['Four AIs. One golden ticket.',txt('.wc-chars .pp-tag').replace(/\.(?=\S)/g,'. ')],
    2:[`${graded} rounds. Every one stays on the record.`,txt('.wc-season .pp-tag')],
    3:['Meanwhile, the big question…',''],
    4:['Down in the vault…',betWhen()?`The bet goes on at the close, ${betWhen()}.`:''],
    5:['And it’s not over.',nextCard()?`Next on the card, ${nextCard()}${nRounds()?` · ${nRounds()} round${nRounds()>1?'s':''}`:''}.`:''],
    6:['To be continued at the close.','']});
  let chs=[];
  function chapters(){const bk=book();chs=CH.map((c,i)=>{const s=bk.querySelector(':scope > '+c.sel);if(!s)return null;s.classList.add('b3-ch');s.dataset.ch=i;s.dataset.cht=c.t;s.dataset.chk=c.k;return {s,...c,i}}).filter(Boolean);return chs}
  /* running head: the header becomes the book's running head once the cover has scrolled away */
  function runHead(){
    const ti=D.querySelector('header.top .top-in');if(!ti||ti.querySelector('.b3-rh'))return;
    const rh=D.createElement('div');rh.className='b3-rh';rh.setAttribute('aria-hidden','true');
    rh.innerHTML=`<b class="b3-no">No. ${graded}</b><span class="b3-ct"></span><i class="b3-pg"></i>`;
    ti.append(rh);
    const upd=()=>{const y=innerHeight*.28;let cur=chs[0];for(const c of chs){if(c.s.getBoundingClientRect().top<y)cur=c}
      H.classList.toggle('b3-run',cur&&cur.i>0);rh.querySelector('.b3-ct').textContent=cur?cur.t:'';rh.querySelector('.b3-pg').textContent=cur?`Ch. ${cur.i} / ${chs.length-2}`:'';
      if(cur&&cur.i>chs.length-2)rh.querySelector('.b3-pg').textContent='The end';};
    addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();}
  /* word audit: how much plain body text sits outside the world (no drawn surface under it) */
  const PLAIN=['.wc-chars .pp-tag','.wc-season .pp-tag','.wc-bet .hb-sub','.wc-bet .hbc-cl > span','.wc-bet .hb4-bom li > span','.wc-cliff h2 small','.wc-back .wc-fine'];
  function audit(){const vis=e=>e.checkVisibility({opacityProperty:true,visibilityProperty:true})&&e.getBoundingClientRect().width>2;
    const wc=e=>e.textContent.trim().split(/\s+/).filter(Boolean).length;
    const sum=sel=>[...D.querySelectorAll(sel)].filter(vis).reduce((a,e)=>a+wc(e),0);
    const plain={};PLAIN.forEach(s=>{const n=sum(s);if(n)plain[s]=n});
    return {plain,plainWords:Object.values(plain).reduce((a,b)=>a+b,0),fine:sum('.wc-back .wc-fine'),caption:sum('.wc-beat')+sum('.b3-cap'),world:sum('.b3-sign'),sw:D.documentElement.scrollWidth,vw:innerWidth,H:D.documentElement.scrollHeight}}
  function mount(id){const cfg=window.B3T[id];H.classList.add('b3-on','b3-'+id);chapters();runHead();
    (cfg.run||(()=>{}))({chs,api});H.classList.add('b3-ready');
    window.__b3={take:id,graded,lead,nar:NAR(),ch:chs.map(c=>c.i+':'+c.t)};
    setTimeout(()=>dispatchEvent(new Event('scroll')),50)}
  const api={mount,IMG,NAR,graded,lead,NM,chs:()=>chs,audit,txt,book};return api})();
window.B3T=window.B3T||{};
