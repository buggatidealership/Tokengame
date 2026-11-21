/* Round H26 · rounds8: "Every round so far" as a hero, six, then "Show 8 more".
   window.__R8  = 'A' the die (wafer world, today's look)  'B' the filing cabinet  'C' the binder (folders on a ledger)
   window.__R8H = 'L' the latest graded round  'T' the top round (the season's biggest W, see topRound())
   window.__R8IMG = folder of this round's paintings (default: this concepts folder).
   Data live: ROUNDS (graded), FILMS, CO_LOGOS, MODELS, __x2pPnl (flat $100K per call). Nothing typed.
   Mounts over the built v46-live-x2plus.html: today's .r6 stays in the DOM, hidden; the new root goes in #record. */
(function(){
const D=document,TK=window.__R8||'A',HK=window.__R8H||'L',IM=window.__R8IMG||'tools/concepts/worlds/comic/story/h/rounds8/img/web/';
const sec=D.getElementById('record');if(!sec)return;sec.querySelector('.r8')?.remove();
const G=(window.ROUNDS||[]).filter(r=>r.a!=null&&r.out),NEW=G.slice().reverse(),FUT=[...(window.PENDING||[]),...(window.UPCOMING||[])];
const MD=window.MODELS||{},ORDER=['GPT','KIMI','CLAUDE','GROK'],P=window.__x2pPnl().A;
const CHIP={GPT:'#10a37f',CLAUDE:'#d97757',KIMI:'#1e80ff',GROK:'#6f7e8c'};/* the chips' own colours (Meet the models introduces them) */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cap1=m=>m[0]+m.slice(1).toLowerCase();
const NM=m=>m==='GPT'?'GPT':cap1(m);
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>MD[m]);
const callOf=(r,m)=>(r.calls||[]).find(c=>c[0]===m);
const right=(c,a)=>/^UP/i.test(c)===(a>0);
const film=n=>!!(window.FILMS||{})[n];
const tile=n=>`media/tile-r${n}-${film(n)?'f1':'t2'}.jpg`;
const big=r=>r.poster?`media/${r.poster}.jpg`:tile(r.n);/* the film's own last frame (1080 square) for the hero; else the round's world tile */
const mv=r=>String(r.out).replace(/^-/,'−');
const md=s=>{if(!s)return '';const[m,d]=String(s).split('/');return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m-1]+' '+(+d)};
const logoF=t=>{const L=(window.CO_LOGOS||{})[t];return L?'media/'+(L.f||L):''};
const usd=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const winTxt=r=>{const W=wins(r);return W.length===1?NM(W[0])+' wins':W.length?W.map(NM).join(' & ')+' tie':'Nobody wins'};
const rightOf=r=>ORDER.filter(m=>{const c=callOf(r,m);return c&&right(c[1],r.a)});
const called=r=>ORDER.filter(m=>callOf(r,m));
/* one line, the domain's verbs: who went long or short and got it (lesson 124) */
function story(r){const R=rightOf(r),C=called(r),side=r.a>0?'long':'short';
  if(!R.length)return `Nobody went ${side}.`;if(R.length===C.length)return `All ${C.length} went ${side}.`;
  if(R.length===1)return `Only ${NM(R[0])} went ${side}.`;return `${R.slice(0,-1).map(NM).join(', ')} and ${NM(R[R.length-1])} went ${side}.`}
/* THE TOP ROUND, proposed rule: the round holding the season's biggest single W.
   Flat $100K on every call (the page's P&L), so a W is $100K x the move for every call that went the right way.
   Ties: the round where fewer AIs got it (the harder call), then the newer round. Changes only when a bigger W lands. */
function topRound(){let best=null;G.forEach(r=>{let v=0,k=0,who=[];ORDER.forEach(m=>{const x=P[m]&&P[m].per[r.n];if(x&&x.v>0){k++;if(x.v>v+.5){v=x.v;who=[m]}else if(Math.abs(x.v-v)<=.5)who.push(m)}});
  if(v>0&&(!best||v>best.v+.5||(Math.abs(v-best.v)<=.5&&(k<best.k||(k===best.k&&r.n>best.r.n)))))best={r,v,k,who}});return best}
const TOP=topRound(),HERO=HK==='T'&&TOP?TOP.r:NEW[0];
const REST=NEW.filter(r=>r!==HERO);
const heroTag=HK==='T'&&TOP?{k:'Biggest W of the season',v:`${TOP.who.map(NM).join(' & ')} ${usd(TOP.v)}`}:{k:'Latest round',v:md(HERO.resolves)};
const aria=r=>`Round ${r.n}, ${r.co} (${r.ticker}), moved ${r.out}. ${winTxt(r)}. `+ORDER.map(m=>{const c=callOf(r,m);return c?`${NM(m)} ${right(c[1],r.a)?'right':'wrong'} way`:''}).filter(Boolean).join(', ')+'. Open the graded card.';
/* the four AIs as marks: green right way, red wrong way, ringed if the round's winner, dim if no call */
const mk=(r,cls)=>`<span class="r8-mks ${cls||''}" aria-hidden="true">`+ORDER.map(m=>{const c=callOf(r,m),M=MD[m]||{},W=wins(r).includes(m);
  const st=!c?'off':right(c[1],r.a)?'up':'dn';return `<i class="r8-mk r8-${st}${W?' r8-w':''}" style="--cc:${CHIP[m]}"><svg viewBox="0 0 24 24"><path d="${M.d||''}"${M.fr?` fill-rule="${M.fr}"`:''}/>${M.dot?`<path d="${M.dot}"/>`:''}</svg></i>`}).join('')+'</span>';
const logo=(t,cls)=>{const f=logoF(t);return f?`<img class="r8-lg ${cls||''}" src="${f}" alt="" decoding="async">`:''};
const name=r=>`<b class="r8-nm"><span class="r8-co">${esc(r.co)}</span> <span class="r8-tk">(${esc(r.ticker)})</span></b>`;
const move=r=>`<b class="r8-mv r8-${r.a>0?'pu':'pd'}">${esc(mv(r))}</b>`;
const stamp=r=>{const W=wins(r);const c=W.length===1?CHIP[W[0]]:W.length?CHIP[W[0]]:'#2a2522';return `<b class="r8-st${W.length>1?' r8-st2':''}" style="--sc:${c};--sc2:${W.length>1?CHIP[W[1]]:c}">${esc(winTxt(r))}</b>`};
const A=(r,inner,cls)=>`<a class="${cls}" href="#/round/${r.n}" aria-label="${esc(aria(r))}">${inner}</a>`;
/* drawn objects (hand-tuned shapes, no stock effect) */
const CLIP=`<svg class="r8-clip" viewBox="0 0 40 120" aria-hidden="true"><path d="M14 112V22a8 8 0 0 1 16 0v74a5 5 0 0 1-10 0V34" fill="none" stroke="#1b1712" stroke-width="7.2" stroke-linecap="round"/><path d="M14 112V22a8 8 0 0 1 16 0v74a5 5 0 0 1-10 0V34" fill="none" stroke="url(#r8steel)" stroke-width="4.4" stroke-linecap="round"/><path d="M15.6 30V22a6.4 6.4 0 0 1 6.4-6.4" fill="none" stroke="#fffbe8" stroke-width="1.3" stroke-linecap="round" opacity=".8"/></svg>`;
const CORN=`<i class="r8-cn r8-c1"></i><i class="r8-cn r8-c2"></i><i class="r8-cn r8-c3"></i><i class="r8-cn r8-c4"></i>`;
const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
 <linearGradient id="r8steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6d665a"/><stop offset=".45" stop-color="#e9e3d2"/><stop offset=".6" stop-color="#b8b0a0"/><stop offset="1" stop-color="#4f483e"/></linearGradient>
 <filter id="r8ink" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.1"/></filter>
 <filter id="r8stamp" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="9" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 1.55" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in" result="s"/><feDisplacementMap in="s" in2="n" scale="1.4"/></filter>
</defs></svg>`;

/* ---------- A: the die (the wafer world, today's look) ---------- */
function heroA(r){return A(r,`<div class="r8a-die"><img class="r8a-dimg" src="${IM}rounds8-die-hero.jpg" alt="" decoding="async"><span class="r8a-win"><img src="${big(r)}" alt="" decoding="async"></span>
   <span class="r8a-tag"><em>${esc(heroTag.k)}</em> · ${esc(heroTag.v)}</span></div>
  <div class="r8a-ro r8-glass"><span class="r8a-l1">${logo(r.ticker)}${name(r)}${move(r)}</span><span class="r8a-l2">${esc(story(r))}</span><span class="r8a-l3">${mk(r)}<b class="r8a-wt">${esc(winTxt(r))}</b><b class="r8a-rn">R${r.n}</b></span></div>`,'r8-hero r8a-hero')}
function itemA(r){return `<li>`+A(r,`<div class="r8a-sd"><img class="r8a-simg" src="media/rounds-h24-die.jpg" alt="" decoding="async"><span class="r8a-sw"><img src="${tile(r.n)}" alt="" decoding="async"></span>
  <span class="r8a-sro"><span class="r8a-s1">${logo(r.ticker)}${name(r)}</span><span class="r8a-s2">${move(r)}${mk(r,'r8-sm')}</span></span></div>`,'r8-it')+`</li>`}

/* ---------- B: the filing cabinet (each round a filed folder; the hero is the folder pulled out) ---------- */
function folder(r,hero){const W=wins(r);return `<div class="r8b-f${hero?' r8b-fh':''}"><img class="r8b-fimg" src="${IM}rounds8-folder.webp" alt="" decoding="async">
  <span class="r8b-tab r8-ink">R${r.n}</span>
  <span class="r8b-ph"><img src="${hero?big(r):tile(r.n)}" alt="" decoding="async">${CLIP}${hero?stamp(r).replace('r8-st','r8-st r8b-st'):''}</span>
  <span class="r8b-tx">${hero?`<span class="r8b-k r8-ink">${esc(heroTag.k)} · ${esc(heroTag.v)}</span>`:''}<span class="r8b-l1 r8-ink">${logo(r.ticker,'r8-pr')}${name(r)}</span>
   <span class="r8b-l2">${move(r)}${mk(r,hero?'':'r8-sm')}</span>${hero?`<span class="r8b-l3 r8-ink">${esc(story(r))}</span>`:stamp(r)}</span></div>`}
const heroB=r=>A(r,folder(r,true),'r8-hero r8b-hero');
const itemB=r=>`<li>${A(r,folder(r,false),'r8-it')}</li>`;

/* ---------- C: the binder (each round a ledger entry, its photo mounted in corners; the hero is the page's headline entry) ---------- */
function heroC(r){return A(r,`<span class="r8c-k r8-ink">${esc(heroTag.k)} · ${esc(heroTag.v)}</span><span class="r8c-ph r8c-phh"><img src="${big(r)}" alt="" decoding="async">${CORN}${stamp(r)}</span>
  <span class="r8c-hx"><span class="r8c-no r8-ink">No. ${r.n} · ${esc(md(r.resolves))}</span><span class="r8c-l1 r8-ink">${logo(r.ticker,'r8-pr')}${name(r)}</span><span class="r8c-l2">${move(r)}${mk(r)}</span><span class="r8c-l3 r8-ink">${esc(story(r))}</span></span>`,'r8-hero r8c-hero')}
function itemC(r){return `<li>`+A(r,`<span class="r8c-ph"><img src="${tile(r.n)}" alt="" decoding="async">${CORN}</span>
  <span class="r8c-rx"><span class="r8c-no r8-ink">No. ${r.n} · ${esc(md(r.resolves))}</span><span class="r8c-l1 r8-ink">${logo(r.ticker,'r8-pr')}${name(r)}</span><span class="r8c-l2">${move(r)}${mk(r,'r8-sm')}</span>${stamp(r)}</span>`,'r8-it')+`</li>`}

/* ---------- the section ---------- */
const FIRST=6,PAGE=8;let shown=FIRST;
const root=D.createElement('div');root.className='r6 r8 r8-'+TK+' r8h-'+HK;
const HEAD='Every round so far',CAP=`${G.length} rounds graded · ${FUT.length} to come`;
function more(){const left=REST.length-shown;if(left<=0)return `<p class="r8-all">All ${G.length} rounds</p>`;const k=Math.min(PAGE,left),filed=G.length-1-shown;
  if(TK==='B')return `<button class="r8-more r8b-more" type="button" aria-label="Show ${k} more rounds"><img src="${IM}rounds8-front.webp" alt="" decoding="async"><span class="r8b-card r8-ink"><b>Show ${k} more</b><i>${filed} more filed</i></span></button>`;
  if(TK==='C')return `<button class="r8-more r8c-more" type="button" aria-label="Show ${k} more rounds"><span class="r8-ink"><b>Show ${k} more</b><i>${filed} more on earlier pages</i></span><i class="r8c-ear"></i></button>`;
  return `<button class="r6-more r8-more" type="button"><span>Show ${k} more</span><i>${shown+1} of ${G.length}</i></button>`}
function render(){const it=TK==='B'?itemB:TK==='C'?itemC:itemA,hero=TK==='B'?heroB:TK==='C'?heroC:heroA;
  root.innerHTML=DEFS+`<header class="r6-hd"><h2 class="r6-h2"><span class="r6-hw">${HEAD}</span></h2><p class="r6-cap">${esc(CAP)}</p></header>
  <div class="r8-bd">${TK==='C'?'<i class="r8c-pg" aria-hidden="true"></i>':''}<div class="r8-hw">${hero(HERO)}</div><ol class="r8-list">${REST.slice(0,shown).map(it).join('')}</ol>${TK==='B'?'':more()}</div>${TK==='B'?more():''}`;
  root.querySelector('.r8-more')?.addEventListener('click',()=>{shown+=PAGE;render()});fit();
  /* refit once the paintings and fonts have settled (a name measured on a fallback face trims too early) */
  let t;root.querySelectorAll('img').forEach(i=>{if(!i.complete)i.addEventListener('load',()=>{clearTimeout(t);t=setTimeout(fit,120)},{once:true})});setTimeout(fit,400)}
/* fit: a company name steps down to its floor (cap height 9 CSS px), then trims before the ticker, which always stays */
function fit(){const bd=root.querySelector('.r8-bd');if(bd){root.style.setProperty('--pw',bd.clientWidth+'px');const h=root.querySelector('.r8-hw');if(h)root.style.setProperty('--pw2',h.getBoundingClientRect().width+'px')}
root.querySelectorAll('.r8-nm').forEach(b=>{const box=b.parentElement;b.style.fontSize='';const co=b.querySelector('.r8-co');co.textContent=co.dataset.full||co.textContent;co.dataset.full=co.textContent;
  const room=()=>box.clientWidth-[...box.children].filter(c=>c!==b).reduce((s,c)=>s+c.getBoundingClientRect().width,0)-6;
  let f=parseFloat(getComputedStyle(b).fontSize);const fl=parseFloat(getComputedStyle(b).getPropertyValue('--fl'))||13;
  while(b.scrollWidth>room()&&f>fl){f-=.5;b.style.fontSize=f+'px'}
  let t=co.dataset.full;while(b.scrollWidth>room()&&t.length>3){t=t.slice(0,-1).trimEnd();co.textContent=t+'…'}})}
[...sec.children].forEach(c=>{if(c!==root){c.classList.add('r8-old');c.setAttribute('aria-hidden','true');c.inert=true}});
sec.appendChild(root);render();
let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;render()}});
D.fonts&&D.fonts.ready.then(fit);
window.__r8={render,top:TOP,hero:HERO.n,set:n=>{shown=n;render()}};
})();
