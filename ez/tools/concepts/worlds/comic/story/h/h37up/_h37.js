/* H37 Upcoming mockups, shared layer. Waits for the live tab (x2p_up.js: .u3-root and its model window.__u3, logos already measured and
   trimmed), hides the chip take, and mounts one take in .h37-root. The follow panel (.u3-fol) is moved under the take unchanged.
   Structure (owner, 2026-11-02, night): 1 the next bell (its close, the countdown, "8 of 16 trades in"), 2 tomorrow's tickers (each company
   graded at that close with its four trades; those not in say "due before the open"), 3 Upcoming predictions: the big names first
   (Mag 7, then market cap from CAPS), then every other round, day by day. Nothing typed: everything from ez-data.js through the model. */
(function(){
const D=document;window.H37=window.H37||{};
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MO=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],SD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],WD=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MCOL=()=>window.X2P_MCOL||{GROK:'#e4e0d6',CLAUDE:'#ef8a55',GPT:'#b18cff',KIMI:'#58b7ff'};
const nm=m=>{const n=(window.MODELS[m]&&window.MODELS[m].name)||m;return n.length<=3?n:n.charAt(0)+n.slice(1).toLowerCase()};
const md=p=>p?MO[p.mo-1]+' '+p.d:'';
const dow=p=>new Date(Date.UTC(p.y,p.mo-1,p.d)).getUTCDay();
const key=p=>p?p.y+'-'+String(p.mo).padStart(2,'0')+'-'+String(p.d).padStart(2,'0'):'9999';
const tick=t=>String(t||'').split('.')[0];
/* a short ticker for the boards: a number ticker (6758.T) reads as its company's first word */
const sym=u=>/^\d/.test(u.ticker)?String(u.co).split(' ')[0].toUpperCase():tick(u.ticker);
/* the model's mark as inline svg in its colour */
const mk=(m,s,col)=>{const M=(window.MODELS||{})[m];if(!M||!M.d)return '';return `<svg class="h37-mk" viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><path d="${M.d}"${M.fr?` fill-rule="${M.fr}"`:''} fill="${col||MCOL()[m]}"/></svg>`};
/* a company mark in its own colours (the live tab's measured mode: tile, plate, bare) */
const logo=(u,cls)=>String(u.ticker).toUpperCase()==='NVDA'&&window.NVIDIA_D?`<svg class="h37-lg h37-nv ${cls||''}" viewBox="0 0 24 24" aria-hidden="true"><path fill="#76B900" d="${window.NVIDIA_D}"/></svg>`:
  u.logo?`<img class="h37-lg h37-lg-${u.lm||'bare'} ${cls||''}" src="${u.logo}" alt="" decoding="async">`:`<b class="h37-lg h37-tkx ${cls||''}">${esc(sym(u))}</b>`;
const trade=c=>{const dn=c.dir==='DOWN';return {dn,word:dn?'Short':'Long',sign:dn?'−':'+',mag:c.mag,txt:(dn?'−':'+')+c.mag+'%',sr:`${nm(c.m)} ${dn?'short':'long'} ${c.mag}%`}};
const left=ms=>{if(ms<=0)return {d:0,h:0,m:0,s:0};const S=Math.floor(ms/1000);return {d:Math.floor(S/86400),h:Math.floor(S%86400/3600),m:Math.floor(S%3600/60),s:S%60}};
/* the shape every take reads */
function shape(M){
  const b=M.bell;const bell=b?Object.assign({},b,{rounds:b.rounds.slice().sort((x,y)=>(y.nIn-x.nIn)||(y.mag7-x.mag7)||(y.cap-x.cap))}):null;
  if(bell){bell.rounds.forEach(u=>{u.open=!!(u.cp&&u.rp&&key(u.cp)===key(u.rp));u.due=u.state==='in'?'':u.open?'due before the open':'due '+md(u.cp)});
    bell.plate=`${bell.day} · ${bell.date} · ${bell.mixed?'each exchange’s close':'4pm '+bell.ex}`}
  const rest=[];M.DAYS.forEach(d=>d.rounds.forEach(u=>rest.push(Object.assign(u,{dk:d.k,dp:d.p,dday:d.day,ddate:d.date,dueOnly:!u.dated}))));
  /* the big names: Mag 7 first (NVIDIA is also Bet #1), then market cap; four of them */
  const big=rest.slice().filter(u=>u.mag7||u.cap>0).sort((x,y)=>(y.mag7-x.mag7)||(y.cap-x.cap)||(x.n-y.n)).slice(0,4);
  const bs=new Set(big.map(u=>u.n));
  const days=M.DAYS.map(d=>({k:d.k,p:d.p,day:d.day,date:d.date,wd:d.day==='Today'||d.day==='Tomorrow'?d.day:WD[dow(d.p)],sd:SD[dow(d.p)],past:d.past,
    rounds:d.rounds.filter(u=>!bs.has(u.n)),dueOnly:d.dueOnly})).filter(d=>d.rounds.length);
  big.forEach(u=>{u.when=u.dated?`graded ${u.dday==='Today'||u.dday==='Tomorrow'?u.dday.toLowerCase():SD[dow(u.rp)]} ${md(u.rp)}`:`trades due ${md(u.cp)}`;
    u.whenS=u.dated?`${SD[dow(u.rp)]} ${md(u.rp)}`:`${SD[dow(u.cp)]} ${md(u.cp)}`;u.label=u.bet?'Mag 7 · Bet #1':u.mag7?'Mag 7':'$'+(u.cap>=1000?(u.cap/1000).toFixed(1).replace(/\.0$/,'')+'T':u.cap+'B')});
  return {M,bell,big,days,ORDER:M.ORDER,nRest:rest.length}
}
/* the state of a round in a few words */
const st=u=>u.state==='in'?'All 4 trades in':u.state==='coming'?`${u.nIn} of 4 trades in`:u.dated?(u.cp&&u.rp&&key(u.cp)===key(u.rp)?'trades due before the open':'trades due '+md(u.cp)):'trades due '+md(u.cp);
/* countdown: every [data-h37cd] holds [data-u] d/h/m/s cells */
function ticker(root){root.querySelectorAll('[data-h37cd]').forEach(el=>{const t=+el.dataset.h37cd;let iv=0;const f=()=>{if(!el.isConnected){clearInterval(iv);return}const L=left(t-Date.now());
  el.querySelectorAll('[data-u]').forEach(x=>{const s=String(L[x.dataset.u]).padStart(2,'0');if(x.textContent!==s)x.textContent=s})};f();iv=setInterval(f,1000)})}
const cdCells=(cls,lab)=>['d','h','m','s'].map((u,i)=>`<span class="${cls}"><b data-u="${u}">00</b>${lab?`<i>${['days','hrs','min','sec'][i]}</i>`:''}</span>`).join('');
/* steps a line down until it fits */
function fit(e){e.style.fontSize='';let f=parseFloat(getComputedStyle(e).fontSize),g=0;const lo=+(e.dataset.min||8);while(e.scrollWidth>e.clientWidth+.5&&f>lo&&g++<60){f-=.5;e.style.fontSize=f+'px'}}
const fitAll=r=>r.querySelectorAll('[data-fit]').forEach(fit);
/* mount */
function mount(name,build){let done=false;const go=()=>{if(done)return;const R=D.querySelector('#view .u3-root'),M=window.__u3;if(!R||!M)return setTimeout(go,120);
  done=true;try{const S=shape(M);const root=D.createElement('div');root.className='h37-root h37-'+name;root.innerHTML=build(S,H37);
    R.parentNode.insertBefore(root,R.nextSibling);R.style.display='none';const fol=R.querySelector('.u3-fol');if(fol){const w=D.createElement('div');w.className='h37-fol u3-root';w.appendChild(fol);root.appendChild(w)}
    ticker(root);fitAll(root);if(D.fonts&&D.fonts.ready)D.fonts.ready.then(()=>fitAll(root));(H37.after||(()=>{}))(root,S);window.__h37=S}catch(e){window.__h37Err=e;console.error('h37',e)}};go()}
Object.assign(H37,{esc,nm,md,mk,logo,trade,sym,st,cdCells,mount,fit,fitAll,MCOL,SD,WD,dow,key});
})();
