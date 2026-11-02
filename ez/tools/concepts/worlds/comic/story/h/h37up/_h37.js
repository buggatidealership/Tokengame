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
  u.logo?`<img class="h37-lg h37-lg-${u.lm||'bare'}${u.dark?' h37-dk':''} ${cls||''}" src="${u.logo}" alt="" decoding="async">`:`<b class="h37-lg h37-tkx ${cls||''}">${esc(sym(u))}</b>`;
const trade=c=>{const dn=c.dir==='DOWN';return {dn,word:dn?'Short':'Long',sign:dn?'−':'+',mag:c.mag,txt:(dn?'−':'+')+c.mag+'%',sr:`${nm(c.m)} ${dn?'short':'long'} ${c.mag}%`}};
const left=ms=>{if(ms<=0)return {d:0,h:0,H:0,m:0,s:0};const S=Math.floor(ms/1000);return {d:Math.floor(S/86400),h:Math.floor(S%86400/3600),H:Math.floor(S/3600),m:Math.floor(S%3600/60),s:S%60}};
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
/* ---------- the generic board: one painted head (the next bell), a body grown from the painting's own band, a painted foot; then the
   upcoming board. Each take gives its paintings, the places on its head, and its own CSS. ---------- */
(function(){const H=window.H37,esc=H.esc;
const IMG='tools/concepts/worlds/comic/story/h/h37up/img/';H.IMG=IMG;
const pos=b=>`left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%`;
const chars=(s,on)=>on?[...String(s)].map(c=>c===' '?'<i class="c sp"> </i>':`<i class="c">${esc(c)}</i>`).join(''):esc(s);
H.chars=chars;
function trades(u,S,cf){return `<span class="hb-trs">${S.ORDER.map(m=>{const c=u.trades.find(x=>x.m===m);
  if(!c)return `<span class="hb-tr no"><span class="hb-mk">${H.mk(m,cf.mk||14,'currentColor')}</span><span class="hb-w">${esc(H.nm(m))}</span><b class="hb-v">–</b></span>`;
  const t=H.trade(c);return `<span class="hb-tr ${t.dn?'dn':'up'}"><span class="hb-mk">${H.mk(m,cf.mk||14)}</span><span class="hb-w">${t.word}</span><b class="hb-v">${t.sign}${esc(c.mag)}%</b></span>`}).join('')}</span>`}
H.trades=trades;
function bellHead(S,cf){const b=S.bell,h=cf.head,cd=b?b.close:0;
  const cells=['d','h','m','s'],lab=['days','hrs','min','sec'];
  let inner='';
  if(h.plate)inner+=`<div class="hb-plate" style="${pos(h.plate)}"><span data-fit data-min="7">${chars(b?b.plate:'No close on the card',cf.chars)}</span></div>`;
  if(h.cd4)inner+=`<div class="hb-cd" data-h37cd="${cd}" role="timer" aria-label="Time to the close">${h.cd4.map((q,i)=>`<div class="hb-u" style="${pos(q)}"><b data-u="${cells[i]}">00</b><i>${lab[i]}</i></div>`).join('')}</div>`;
  if(h.cd1)inner+=`<div class="hb-cd hb-cd1" data-h37cd="${cd}" role="timer" aria-label="Time to the close" style="${pos(h.cd1)}"><span><b data-u="H">00</b>:<b data-u="m">00</b>:<b data-u="s">00</b></span><i>to the close</i></div>`;
  if(h.inner)inner+=`<div class="hb-in" style="${pos(h.inner)}">${(cf.innerHTML||(()=>''))(S,cf,cd)}</div>`;
  return `<div class="hb-head" style="aspect-ratio:${h.ar}"><img class="hb-hi" src="${IMG+h.img}" alt="">${inner}</div>`}
function row(u,S,cf){return `<li class="hb-row hb-s-${u.state}${u.mag7?' hb-m7':''}"><a href="#/round/${u.n}" aria-label="${esc(u.co+' ('+u.ticker+'), round '+u.n+'. '+H.st(u)+'. '+u.trades.map(c=>H.trade(c).sr).join(', '))}">
  <span class="hb-co">${H.logo(u,'hb-lg')}<span class="hb-nm" data-fit data-min="9"><b>${esc(u.co)}</b> <small>${chars(H.sym(u),cf.chars)}</small>${u.mag7?'<em>Mag 7</em>':''}</span></span>
  <span class="hb-st">${u.state==='in'?'All 4 in':u.state==='coming'?u.nIn+' of 4 in':esc(u.due)}</span>${trades(u,S,cf)}</a></li>`}
function big(u,S,cf){return `<li class="hb-big${u.mag7?' hb-m7':''}"><a href="#/round/${u.n}" aria-label="${esc(u.co+' ('+u.ticker+'), round '+u.n+(u.mag7?', Mag 7':'')+(u.bet?', Bet #1':'')+'. '+u.when)}">
  <span class="hb-bl">${H.logo(u,'hb-blg')}</span><span class="hb-bt"><span class="hb-bn" data-fit data-min="11">${esc(u.co)}</span>
  <span class="hb-bk">${chars(H.sym(u),cf.chars)}${u.mag7?'<em>Mag 7</em>':''}${u.bet?'<em class="hb-bet">Bet #1</em>':''}</span>
  <span class="hb-bw">${esc(u.when)}</span></span>${trades(u,S,cf)}</a></li>`}
function li(u,S,cf){return `<li class="hb-li"><a href="#/round/${u.n}" aria-label="${esc(u.co+' ('+u.ticker+'), round '+u.n+'. '+H.st(u))}">${H.logo(u,'hb-slg')}<span class="hb-ln" data-fit data-min="9">${esc(u.co)}</span><small class="hb-lk">${esc(H.sym(u))}${!u.dated&&!cf.dueDay?' · close tbc':''}</small>${u.nIn?`<span class="hb-ls">${esc(u.nIn+'/4 in')}</span>`:''}</a></li>`}
function day(d,S,cf){return `<section class="hb-day${d.past?' hb-past':''}"><h3 class="hb-dh"><b>${chars((d.sd||'').toUpperCase(),cf.chars)}</b> <span>${chars(H.md(d.p).toUpperCase(),cf.chars)}</span><small>${d.dueOnly?'trades due · no close set':'graded at the close'}</small></h3><ul class="hb-lis">${d.rounds.map(u=>li(u,S,Object.assign({},cf,{dueDay:d.dueOnly}))).join('')}</ul></section>`}
H.generic=function(S,cf){const b=S.bell;
  const t1=`<h2 class="t4-h2 hb-t"><span class="t4-hw">The next bell</span></h2>`,t2=`<h2 class="t4-h2 hb-t hb-t2"><span class="t4-hw">Upcoming predictions</span></h2>`;
  const cap=b?`<p class="hb-cap">${cf.capHTML?cf.capHTML(b):`The close grades every trade. <b>${b.nIn}</b> of <b>${b.nAll}</b> are in.`}</p>`:'';
  const tomorrow=b?`${cf.tomLab?`<h3 class="hb-th">${cf.tomLab(b)}</h3>`:''}<ol class="hb-rows">${b.rounds.map(u=>row(u,S,cf)).join('')}</ol>`:'';
  const b1=`<div class="hb hb1">${bellHead(S,cf)}<div class="hb-body">${cf.capInHead?'':cap}${tomorrow}</div><div class="hb-foot"></div></div>`;
  const b2=`<div class="hb hb2"><div class="hb-top"></div><div class="hb-body">${cf.bigLab?`<h3 class="hb-th">${cf.bigLab}</h3>`:''}<ul class="hb-bigs">${S.big.map(u=>big(u,S,cf)).join('')}</ul>
    ${cf.restLab?`<h3 class="hb-th hb-th2">${cf.restLab}</h3>`:''}<div class="hb-days">${S.days.map(d=>day(d,S,cf)).join('')}</div></div><div class="hb-foot"></div></div>`;
  return `<div class="hb-wrap"><div class="hb-c1">${t1}${b1}</div><div class="hb-c2">${t2}${b2}</div></div>`};
H.pos=pos;H.row=row;H.big=big;H.li=li;H.bellHead=bellHead;})();
