/* S2 · The race: four lanes from one start line (the $100,000 each began with). Each AI runs as far as its P&L, its flag
   trailing behind it; who is ahead and by how much reads before any digit. The pit board on the right holds the rest in
   aligned columns: the record as a split bar (W green, L red, the coin flip at the middle), the last five, top and worst round.
   In Season a dashed ghost marks where each stood 7 days ago (the week's move without a column of its own).
   Switching the window re-runs the race: the lanes swap places and the runners slide to the window's P&L. */
(function(){const S=window.SS,D=document;
const nice=v=>{const p=Math.pow(10,Math.floor(Math.log10(v))),k=v/p;return (k>=5?5:k>=2.5?2.5:k>=2?2:1)*p};
window.SST={id:'s2',build(h){
  h.innerHTML=`<div class="ss2-tk"><i class="ss2-nt" aria-hidden="true"></i><i class="ss2-nb" aria-hidden="true"></i>
    <div class="ss2-band"><div class="ss2-ti"><b>Season 1 · The race</b><span>Ranked by <em data-lab>Season P&amp;L</em></span></div>${S.sw('ss2-sw')}</div>
    <div class="ss2-hd" aria-hidden="true"><span class="ss2-h0"></span><span class="ss2-ax"><b class="ss2-axl" data-lab>Season P&amp;L</b><i class="ss2-ax0" data-ax0>Start</i><span data-ticks></span></span>
      <span class="ss2-pit"><b>W-L · hit rate</b><b>Last 5</b><b>Top round</b><b>Worst round</b></span></div>
    <ol class="ss2-lanes" role="list">${S.ORDER.map(m=>`<li class="ss2-ln" data-m="${m}" style="--mc:${S.col(m)}">
      <span class="ss2-st"><b data-rk></b></span>
      <span class="ss2-trk"><span class="ss2-gl" aria-hidden="true"></span><i class="ss2-z" aria-hidden="true"></i><i class="ss2-tr" aria-hidden="true"></i><i class="ss2-gh" aria-hidden="true"></i>
        <span class="ss2-run">${S.flag(m,'ss2-flg')}${S.face(m,'ss2-face')}<span class="ss2-lab"><b class="ss2-nm">${S.NM[m]}${m===S.gold?'<em class="ss2-gt" title="Golden ticket">Golden ticket</em>':''}</b><b class="ss2-v" data-pl></b></span></span></span>
      <span class="ss2-pit"><span class="ss2-rec"><span class="ss2-wl"><b data-w class="ss-u"></b>-<b data-l class="ss-d"></b><small data-hr></small></span><span class="ss2-sb" aria-hidden="true"><i class="ss2-sw2"></i><i class="ss2-mid"></i></span></span>
        <span class="ss-f5" data-f5></span><span class="ss2-tw" data-tp></span><span class="ss2-tw" data-wr></span></span>
      <span class="ss-sr" data-sr></span></li>`).join('')}</ol>
    <p class="ss2-ft"><span data-ft></span><span class="ss2-key" data-key><i class="ss2-ghk"></i> 7 days ago</span></p></div>`},
 draw(x,prev,anim){const h=D.querySelector('.ss-host.ss-s2'),ol=h.querySelector('.ss2-lanes'),els=[...ol.children],by={};els.forEach(e=>by[e.dataset.m]=e);
  h.querySelectorAll('[data-lab]').forEach(e=>e.textContent=x.w.lab);h.dataset.k=x.w.k;
  /* one axis for the four lanes: from the lowest to the highest figure (the ghosts too in Season), the start line at $0 */
  const vals=S.ORDER.map(m=>x.row[m].amt).concat(x.w.k==='season'?S.ORDER.map(m=>x.row[m].ago):[]);
  let lo=Math.min(0,...vals),hi=Math.max(0,...vals);if(hi-lo<1){hi=1}h.classList.toggle('ss2-hasneg',lo<0);const span=hi-lo,F=v=>(v-lo)/span;
  h.style.setProperty('--z',F(0).toFixed(4));h.classList.toggle('ss2-hasneg',lo<0);
  /* as many ticks as the lane's width holds (one per ~80px), none crowding the start label */
  const ax=h.querySelector('.ss2-ax'),cs=getComputedStyle(h),px=Math.max(60,ax.getBoundingClientRect().width-parseFloat(cs.getPropertyValue('--pl'))-parseFloat(cs.getPropertyValue('--pr')));
  const st=nice(span/Math.max(2,Math.floor(px/80))),tk=[];for(let v=Math.ceil(lo/st)*st;v<=hi+1e-6;v+=st)if(Math.abs(v)/span*px>(innerWidth<900?44:62))tk.push(v);
  h.querySelector('[data-ticks]').innerHTML=tk.map(v=>`<i style="--f:${F(v).toFixed(4)}">${S.k$(v).replace('.0K','K')}</i>`).join('');
  const gl=tk.map(v=>`<i style="--f:${F(v).toFixed(4)}"></i>`).join('');h.querySelectorAll('.ss2-gl').forEach(g=>g.innerHTML=gl);
  h.querySelector('[data-ax0]').textContent=x.w.k==='season'?(innerWidth<900?'$100K':'Start · $100K'):'$0';
  S.flip(els,()=>x.o.forEach(m=>ol.appendChild(by[m])),anim);
  x.o.forEach((m,i)=>{const e=by[m],a=x.row[m],pa=prev?prev.row[m]:null;
    e.querySelector('[data-rk]').textContent='#'+(i+1);e.classList.toggle('ss2-gold',x.w.k==='season'&&i===0);e.classList.toggle('ss2-neg',a.amt<0);
    e.style.setProperty('--f',F(a.amt).toFixed(4));if(x.w.k==='season')e.style.setProperty('--g',F(a.ago).toFixed(4));
    const v=e.querySelector('[data-pl]');v.className='ss2-v '+(a.amt>=0?'ss-u':'ss-d');S.count(v,pa?pa.amt:a.amt,a.amt,anim?700:0,S.k$);
    e.querySelector('[data-w]').textContent=a.W;e.querySelector('[data-l]').textContent=a.L;const hv=S.hrv(a);e.querySelector('[data-hr]').textContent=hv==null?'':Math.round(hv*100)+'%';
    e.querySelector('.ss2-sw2').style.width=a.W+a.L?(a.W/(a.W+a.L)*100).toFixed(1)+'%':'0';e.querySelector('.ss2-sb').classList.toggle('ss2-sb0',!(a.W+a.L));
    e.querySelector('[data-f5]').innerHTML=S.f5(a);
    const tw=t=>t?`${S.logo(t.r)}<b class="${t.v>=0?'ss-u':'ss-d'}">${S.k$(t.v)}</b>`:'<b class="ss2-na">–</b>';
    e.querySelector('[data-tp]').innerHTML=tw(a.top);e.querySelector('[data-wr]').innerHTML=tw(a.low);
    e.querySelector('[data-sr]').textContent=`#${i+1} ${S.NM[m]}, ${x.w.lab} ${S.$f(a.amt)}, ${a.W} right, ${a.L} wrong${a.top?', top round '+a.top.r.co+' '+S.k$(a.top.v):''}${a.low?', worst round '+a.low.r.co+' '+S.k$(a.low.v):''}.`});
  h.querySelector('[data-key]').hidden=x.w.k!=='season';
  h.querySelector('[data-ft]').textContent=x.empty?`No close in the ${x.w.t.toLowerCase()}. Everyone stands on the start line.`:`${x.w.t} · ${x.w.when} · ${x.rs.length} round${x.rs.length===1?'':'s'} graded.`}};
SSmount()})();
