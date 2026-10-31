/* helper x (2026-10-30): the S3 scoreboard's "best in the row" told by motion, not by gold circles. Shared part.
   Laid over the built X3+. It wraps the live take's own draw (window.SST.draw) and adds nothing to its numbers.
   Who leads what, using sb_ss.js's own window figures (S.X[k].row):
     the board's leader = the window's #1 (x.o[0], the order the board already ranks by: P&L);
     W-L = most wins; Hit rate = highest (S.hrv: no rate under 5 calls, as the page); Last 5 = most right;
     Top round = highest; Worst round = the least bad (highest); Top and Worst round need 3 rounds in the window, as S3.
     Ties share; a row where every value is equal (or fewer than two values) has no leader.
   The P&L row carries no row mark: its leader is the board's #1, marked once, on the name (one rank per view).
   A take sets window.XXT={id, still(state), arrive(state,keys), swap(state,prev)} and calls XXmount(). Classes xx-. */
(function(){if(window.XX)return;const S=window.SS,D=document,H=D.documentElement;
const ROWS=['wl','hr','l5','tp','wr'];
const FIG={wl:'.ss3-big',hr:'.ss3-big',l5:'.ss-f5',tp:'.ss3-tw',wr:'.ss3-tw'};
function lead(x){const out={},few=x.rs.length<3;
  const pick=(k,f)=>{const v=S.ORDER.map(m=>[m,f(x.row[m])]).filter(a=>a[1]!=null);if(v.length<2){out[k]=[];return}
    const hi=Math.max(...v.map(a=>a[1]));out[k]=v.every(a=>a[1]===hi)?[]:v.filter(a=>a[1]===hi).map(a=>a[0])};
  pick('wl',a=>x.empty?null:a.W);pick('hr',a=>S.hrv(a));pick('l5',a=>a.l5.filter(Boolean).length);
  pick('tp',a=>few||!a.top?null:a.top.v);pick('wr',a=>few||!a.low?null:a.low.v);
  out.top=x.empty?[]:[x.o[0]];
  const won={};S.ORDER.forEach(m=>won[m]=ROWS.filter(k=>out[k].includes(m)).length);out.won=won;return out}
/* layout position of an element inside the grid, ignoring transforms (the columns slide by FLIP transforms) */
function pos(el,g){let x=0,y=0,e=el;while(e&&e!==g){x+=e.offsetLeft;y+=e.offsetTop;e=e.offsetParent}return {x,y,w:el.offsetWidth,h:el.offsetHeight}}
const grid=()=>D.querySelector('.ss-host.ss-s3 .ss3-g');
const cell=(k,m)=>grid().querySelector(`.ss3-c.ss3-r-${k}[data-m="${m}"]`);
const fig=(k,m)=>{const c=cell(k,m);return c&&c.querySelector(FIG[k])};
const head=m=>cell('hd',m);
const col=m=>+getComputedStyle(cell('hd',m)).getPropertyValue('--c')||0;
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
window.XX={ROWS,FIG,lead,pos,grid,cell,fig,head,col,RM,last:null};
window.XXmount=function(){const T=window.XXT,S2=window.SST,h=D.querySelector('.ss-host.ss-s3');if(!T||!S2||!h)return;
  h.classList.add('xx-on','xx-'+T.id);
  let seen=false,cur=null;const orig=S2.draw.bind(S2);
  const st=x=>{const L=lead(x);window.XX.last={k:x.w.k,lead:L};return {x,L}};
  /* the take's marks follow the board: a window switch (prev given, anim) plays the swap; a redraw without anim is still */
  S2.draw=function(x,prev,anim){orig(x,prev,anim);const s=st(x);const p=cur;cur=s;
    if(!seen){T.still(s,true);return}
    /* the take's own work waits one frame, so the click's frame only carries the board's own redraw */
    if(anim&&p&&!RM())requestAnimationFrame(()=>{if(cur===s)T.swap(s,p)});else T.still(s,false)};
  /* first paint: the marks wait (hidden) until their row comes into view, then arrive row by row (lesson 55) */
  const k=S.cur();cur=st(S.X[k]);T.still(cur,!RM());
  if(RM()){seen=true}else{
    const keys=['top',...ROWS],done=new Set();let next=0;
    /* rows that come into view together arrive one after another, top to bottom, 90 ms apart */
    const io=new IntersectionObserver(es=>{es.filter(e=>e.isIntersecting).map(e=>e.target.dataset.xxk).filter(kk=>!done.has(kk)).sort((a,b)=>keys.indexOf(a)-keys.indexOf(b)).forEach(kk=>{
        done.add(kk);io.unobserve(cell(kk==='top'?'hd':kk,S.ORDER[0]));const t=Math.max(performance.now()+240,next+90);next=t;setTimeout(()=>T.arrive(cur,[kk]),t-performance.now())});
      if(done.size===keys.length){seen=true;io.disconnect()}},{rootMargin:'0px 0px -8% 0px',threshold:.6});
    keys.forEach(kk=>{const el=cell(kk==='top'?'hd':kk,S.ORDER[0]);if(el){el.dataset.xxk=kk;io.observe(el)}});
    /* a switch before every row was seen counts as seen */
    D.querySelectorAll('#wc-lb .wc11n-stub').forEach(b=>b.addEventListener('click',()=>{seen=true;io.disconnect()},{capture:true}));
    h.querySelectorAll('.ss-swb').forEach(b=>b.addEventListener('click',()=>{seen=true;io.disconnect()},{capture:true}))}
  /* width changes: marks follow their figures without motion */
  let rw=0;new ResizeObserver(()=>{const w=grid().offsetWidth;if(w===rw)return;rw=w;if(T.relayout)T.relayout(cur)}).observe(grid());
  H.classList.add('xx-ready-'+T.id)};
})();
