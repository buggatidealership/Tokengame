/* helper l: shared data for the Leaderboard-top takes (title fight x window filter). Built on helper i's SI (../i/_si.js),
   which reads the page's own ROUNDS, MODELS, CO_LOGOS and __x2pPnl. Nothing typed. */
(function(){if(window.SL)return;const S=SI,D=document;
const amt=(m,w)=>w.k==='season'?S.P[m].pnl:S.sum(m,w.f);
const rs=w=>S.R.filter(w.f);
const wl=(m,w)=>{const s=S.seq[m].filter(x=>w.f(x.r));const W=s.filter(x=>x.ok).length;return {W,L:s.length-W}};
const md=S.md,MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const ny=(()=>{const [m,d,y]=S.nyT.split('/').map(Number);return Date.UTC(2000+y,m-1,d)})();
const dstr=t=>{const x=new Date(t);return MON[x.getUTCMonth()]+' '+x.getUTCDate()};
const W=[
 {k:'close',t:'Last close',f:S.inLast,when:md(S.lastD)+' close'},
 {k:'week',t:'This week',f:S.in7,when:(a=>{const z=dstr(ny);return a.split(' ')[0]===z.split(' ')[0]?a+' to '+z.split(' ')[1]:a+' to '+z})(dstr(ny-6*864e5))},
 {k:'season',t:'Season',f:()=>true,when:'Since '+md(S.R[0].called||S.R[0].resolves)}];
/* the fight in each window: season = golden ticket holder vs challenger (the board's own rank);
   this week = #1 vs #2 by money made in the last 7 days; last close = best vs worst of that close. */
const fight=w=>{const o=S.ORDER.slice().sort((a,b)=>amt(b,w)-amt(a,w));
  if(w.k==='season')return {a:S.rank[0],b:S.rank[1],la:'Golden ticket',lb:'Challenger',o:S.rank};
  if(w.k==='week')return {a:o[0],b:o[1],la:'#1 this week',lb:'#2 this week',o};
  return {a:o[0],b:o[o.length-1],la:'Best',lb:'Worst',o}};
/* the round that decided the fight in that window: the biggest money swing between the two */
const swing=(w,a,b)=>{let best=null;rs(w).forEach(r=>{const va=(S.P[a].per[r.n]||{}).v||0,vb=(S.P[b].per[r.n]||{}).v||0,d=Math.abs(va-vb);if(!best||d>best.d)best={r,va,vb,d}});return best};
const logo=(r,cls)=>{const l=S.coLogo(r.ticker),dk=((window.CO_LOGOS||{})[r.ticker]||{}).dark;return l?`<img class="sl-lg${dk?' sl-dk':''} ${cls||''}" src="${l}" alt="">`:''};
const line=(w,F)=>{const h=F.a;
  if(w.k==='season'){const g=S.reigns[S.reigns.length-1],l5=S.last5(h);
    return `${S.NM[h]} took the ticket on ${logo(g.r0)}<b>${S.esc(g.r0.co)}</b>, round ${g.n0}.${l5<=1?` Only ${l5} of its last 5 calls ${l5===1?'was':'were'} right.`:''}`}
  const s=swing(w,F.a,F.b);if(!s)return '';
  /* "Decided on" only when that one round flips the fight; otherwise it is only the biggest swing */
  const flips=(amt(F.a,w)-s.va)<(amt(F.b,w)-s.vb);
  return `${flips?'Decided on':'Biggest swing:'} ${logo(s.r)}<b>${S.esc(s.r.co)}</b>. ${S.NM[F.a]} ${S.k$(s.va)}, ${S.NM[F.b]} ${S.k$(s.vb)}.`};
const all=()=>W.map(w=>{const F=fight(w);return {w,F,va:amt(F.a,w),vb:amt(F.b,w),gap:Math.abs(Math.round(amt(F.a,w))-Math.round(amt(F.b,w))),wa:wl(F.a,w),wb:wl(F.b,w),n:rs(w).length,line:line(w,F),
  amts:Object.fromEntries(S.ORDER.map(m=>[m,amt(m,w)]))}});
/* money counter: counts from where it stands to the new value (money accruing); instant with reduced motion */
const count=(el,to,dur)=>{const from=+el.dataset.v||0;el.dataset.v=to;const fmt=v=>S.$f(v);const cl=v=>{el.classList.toggle('wc-tu',v>=0);el.classList.toggle('wc-td',v<0)};
  if(S.RM()||!dur||from===to){el.textContent=fmt(to);cl(to);return}const t0=performance.now();
  const step=t=>{const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3),v=from+(to-from)*e;el.textContent=fmt(v);cl(v);if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)};
const wlh=x=>`<span class="sl-wl"><b class="wc-tu">${x.W}</b>-<b class="wc-td">${x.L}</b></span>`;
/* the scoreboard re-ordered to a window (a traditional filter's reach), with a sticker of each AI's money in it */
const board=(w,anim)=>{const lb=D.getElementById('wc-lb'),list=lb&&lb.querySelector('.wc-sb');if(!list)return;
  const tk=[...list.querySelectorAll('.wc-sb-r')],byM={};tk.forEach(t=>{byM[(t.querySelector('h3')||{}).textContent.trim().toUpperCase()]=t});
  const o=w.k==='season'?S.rank:S.ORDER.slice().sort((a,b)=>amt(b,w)-amt(a,w));const r0=new Map(tk.map(t=>[t,t.getBoundingClientRect()]));
  o.forEach((m,i)=>{const t=byM[m]||byM[S.NM[m].toUpperCase()];if(!t)return;t.style.order=i;let sk=t.querySelector('.sl-sk');if(!sk){t.insertAdjacentHTML('beforeend','<span class="sl-sk" aria-hidden="true"></span>');sk=t.querySelector('.sl-sk')}
    sk.innerHTML=w.k==='season'?'':`<small>${w.t}</small><b class="${amt(m,w)>=0?'wc-tu':'wc-td'}">${S.k$(amt(m,w))}</b><i>#${i+1}</i>`;sk.classList.toggle('sl-on',w.k!=='season')});
  list.style.display='grid';
  if(anim&&!S.RM())tk.forEach(t=>{const a=r0.get(t),z=t.getBoundingClientRect(),dy=a.top-z.top;if(dy)t.animate([{transform:`translateY(${dy}px)`},{transform:'none'}],{duration:620,easing:'cubic-bezier(.3,1.2,.4,1)'})})};
const best=(m,w)=>{let b=null;rs(w).forEach(r=>{const v=(S.P[m].per[r.n]||{}).v;if(v!=null&&(!b||v>b.v))b={r,v}});return b};
window.SL={best,W,amt,rs,wl,fight,swing,line,all,count,wlh,logo,board,
  base:()=>{const lb=D.getElementById('wc-lb');if(!lb)return null;const cv=lb.querySelector('.wc-tab-cv');return {lb,cv}}};
})();
