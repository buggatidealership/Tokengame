/* Round H3b, area lb2: the Leaderboard tab's top ("Who's winning?") and its scoreboard, six takes.
   Shared data and the mount. Every number comes from the page: window.SS.X[k] (the live scoreboard's own windows, ranks and
   rows: P&L in the window, W-L, hit rate, last 5, top and worst round), SS.gold (the golden ticket), __x2pPnl() per round
   (for the lead history), ROUNDS, MODELS, CO_LOGOS, and the live bill's line under the fight ("Grok took the ticket on ...").
   Nothing is typed. The window switch calls the page's own __wc11Show(k), so the hidden live bill, the scoreboard, the dock and
   this mockup always show the same window. A take sets window.LQT={id, build(D), draw(root,k,prev,anim,D)}. Classes lq-. */
(function(){if(window.LQ)return;const Dd=document,S=window.SS,Q=window.PQ;
const MS=S.ORDER,NM=S.NM,col=m=>MODELS[m].c==='#111'?'#15121a':MODELS[m].c;
const IMG='tools/concepts/worlds/comic/story/h/lb2/img/';
const esc=S.esc,$f=S.$f,k$=S.k$;
const $abs=v=>'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pct=x=>S.hr(x);
const ver=m=>(MODELS[m].ver||'').replace(/^GPT-/,'GPT-');
/* the lead after every graded round (season P&L), for the "since round n" line and lead changes */
function lead(){const P=window.__x2pPnl().A,RS=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)).slice().sort((a,b)=>a.n-b.n);
  const run={};MS.forEach(m=>run[m]=0);let cur=null,since=null,ch=0;const hist=[];
  RS.forEach(r=>{MS.forEach(m=>{const x=P[m]&&P[m].per[r.n];if(x)run[m]+=x.v});const top=MS.slice().sort((a,b)=>run[b]-run[a])[0];
    if(top!==cur){if(cur)ch++;cur=top;since=r}hist.push({n:r.n,top,v:{...run}})});return {cur,since,ch,hist,N:RS.length}}
function line(){const l=Dd.querySelector('#wc-lb .wc11c-line');return l?l.innerHTML:''}
function bell(){const b=Dd.querySelector('#wc-lb .wc11n-bell');return b?{t:b.querySelector('[data-bell]').textContent,n:b.querySelectorAll('small')[1].textContent}:null}
function graded(){const s=Dd.querySelector('#wc-lb .wc11n-std small');return s?s.textContent:''}
function data(){return {S,X:S.X,WS:S.WS,gold:S.gold,L:lead(),line:line(),bell:bell(),graded:graded(),MS,NM,col,IMG}}
/* company mark for a round (the site's own logo file), name for screen readers */
const logo=(r,cls)=>{if(!r)return '';const c=(window.CO_LOGOS||{})[r.ticker];return c?`<img class="${cls||'lq-lg'}${c.dark?' lq-lgdk':''}" src="media/${c.f}" alt="${esc(r.co)}" title="${esc(r.co)} (${esc(r.ticker)})">`:`<b class="${cls||'lq-lg'} lq-lgt" title="${esc(r.co)}">${esc(r.ticker.replace(/\..*$/,''))}</b>`};
const mark=(m,cls)=>`<i class="lq-mk ${cls||''}" style="--mc:${col(m)}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${MODELS[m].d}"${MODELS[m].fr?' fill-rule="evenodd"':''}/></svg></i>`;
const face=(m,cls)=>`<img class="lq-fd ${cls||''}" src="media/founder-${m.toLowerCase()}-anim.jpg" alt="" aria-hidden="true">`;
const faceV=(m,cls)=>`<video class="lq-fd ${cls||''}" muted loop playsinline autoplay preload="metadata" poster="media/founder-${m.toLowerCase()}-anim.jpg" aria-hidden="true"><source src="media/founder-${m.toLowerCase()}-anim.mp4" type="video/mp4"></video>`;
const f5=(x,o)=>x.l5.map((ok,i)=>`<i class="lq-f ${ok?'lq-fw':'lq-fl'}" title="${ok?'Right way':'Wrong way'}">${o&&o.dot?'':ok?Q.tick():Q.cross()}</i>`).join('');
/* the mount: hides the live bill and scoreboard (kept in the page, so the switch logic stays the page's own) and puts the take before them */
function mount(){const T=window.LQT;if(!T)return;const D=data();window.LQD=D;Dd.documentElement.classList.add('lq-on','lq-'+T.id);
  const st=Dd.createElement('style');st.textContent=`.lq-hide{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip-path:inset(50%)!important;pointer-events:none!important}
   .lq-on .sb-dock{display:none!important}.lq-on #wc-lb .wc-pfs,.lq-on #wc-lb .wc-race{display:none!important}`;Dd.head.appendChild(st);
  const lb=Dd.querySelector('#wc-lb'),bv=lb.querySelector('.wc11n-cv'),sb=lb.querySelector('.wc-sbd');[bv,sb].forEach(s=>s&&s.classList.add('lq-hide'));
  bv.insertAdjacentHTML('beforebegin',`<section class="lq lq-${T.id}" aria-label="Who's winning">${T.build(D)}</section>`);const root=lb.querySelector('section.lq');
  let k='season';const go=(nk,anim)=>{const prev=k;k=nk;root.dataset.k=k;root.querySelectorAll('[data-k]').forEach(b=>{const on=b.dataset.k===k;b.setAttribute('aria-selected',on);if(b.getAttribute('role')==='tab')b.tabIndex=on?0:-1});
    window.__wc11Show&&window.__wc11Show(k,false);T.draw(root,k,prev,anim,D)};
  root.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b&&b.dataset.k!==k)go(b.dataset.k,!S.RM())});
  root.addEventListener('keydown',e=>{const b=e.target.closest('[role=tab][data-k]');if(!b)return;const bs=[...b.parentElement.querySelectorAll('[role=tab][data-k]')],i=bs.indexOf(b),n=bs.length;
    const j={ArrowRight:(i+1)%n,ArrowDown:(i+1)%n,ArrowLeft:(i+n-1)%n,ArrowUp:(i+n-1)%n,Home:0,End:n-1}[e.key];if(j==null)return;e.preventDefault();bs[j].focus();go(bs[j].dataset.k,!S.RM())});
  go('season',false);window.LQgo=go}
window.LQ={S,data,mount,logo,mark,face,faceV,f5,esc,$f,k$,$abs,pct,col,ver,MS,NM,IMG};
})();
