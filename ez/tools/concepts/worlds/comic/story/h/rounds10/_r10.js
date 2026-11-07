/* Round H28 round 2 · rounds10: "Every round so far" as the latest print / the latest issue, in the chip page's colours (black, gold, green, red).
   window.__R10 = 'A' hot off the press  (the print shop's drying line: the newest print big on the first wire, the next round pencilled beside it, the rest pegged below)
                  'B' the newsstand      (a kiosk at night: the latest issue in the big pocket on top, the recent issues racked under it, a brass plate under each)
                  'C' the latest issue   (every round an issue of the same cover trade dress; the latest big on the collector's velvet with its back issues fanned behind it)
                  'D' the press run      (the giant press: the newest print coming off the rollers, the run below it, cut print by print)
   Structure (rounds8/9, H27): the latest graded round as the hero, six recent rounds, "Show more" adds a page (8 on phones, 12 on the six-column desktop grid).
   Each item (owner's sketch): the company without the ticker and its move on one line; under it "Winner" with the winning model's mark and name
   (both on a tie, "Nobody" when no AI got the direction). A tap opens the round's graded card (#/round/n, the page's own router).
   Data live: ROUNDS (graded), FILMS, CO_LOGOS, MODELS, UPCOMING. Nothing typed. Paintings: img/*.jpg in this folder (Hedra, 2026-11-02), plus media/ tiles.
   Mounts over the built v46-live-x2plus.html: today's .r6 stays in the DOM, hidden and inert; the new root goes in #record. */
(function(){
const D=document,TK=window.__R10||'A',IMG=window.__R10IMG||'tools/concepts/worlds/comic/story/h/rounds10/img/';
const sec=D.getElementById('record');if(!sec)return;sec.querySelector('.r10')?.remove();
const G=(window.ROUNDS||[]).filter(r=>r.a!=null&&r.out),NEW=G.slice().reverse();
const MD=window.MODELS||{},ORDER=['GPT','KIMI','CLAUDE','GROK'];
const CHIP={GPT:'#10a37f',CLAUDE:'#d97757',KIMI:'#1e80ff',GROK:'#6f7e8c'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NM=m=>m==='GPT'?'GPT':m[0]+m.slice(1).toLowerCase();
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>MD[m]);
const film=n=>!!(window.FILMS||{})[n];
/* the round's own picture: its film at the reveal (f1, every number on it is the film's, which follows the sheet), or its world tile (t2) */
const tile=n=>`media/tile-r${n}-${film(n)?'f1':'t2'}.jpg`;
const big=r=>film(r.n)&&(window.FILMS[r.n].p)?`media/${window.FILMS[r.n].p}.jpg`:tile(r.n);
const mv=r=>String(r.out).replace(/^-/,'−');
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const md=s=>{if(!s)return '';const[m,d]=String(s).split('/');return MON[m-1]+' '+(+d)};
const dkey=s=>{const[m,d,y]=String(s||'').split('/');return (+y||0)*1e4+(+m||0)*100+(+d||0)};
const winTxt=r=>{const W=wins(r);return W.length?W.map(NM).join(' & '):'Nobody'};
const HERO=NEW[0],REST=NEW.slice(1);
/* the next round(s) to be called: the soonest call day in UPCOMING (pencilled, not printed yet) */
const UP=(window.UPCOMING||[]).filter(u=>u&&u.called).slice().sort((a,b)=>dkey(a.called)-dkey(b.called)||a.n-b.n);
const NEXTS=UP.filter(u=>u.called===(UP[0]||{}).called).slice(0,2);
const aria=r=>`Round ${r.n}, ${r.co}, moved ${r.out}. Winner: ${winTxt(r)}. Open the graded card.`;
const mark=m=>{const M=MD[m]||{};return `<i class="r10-mk" style="--mc:${CHIP[m]}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d||''}"${M.fr?` fill-rule="${M.fr}"`:''}/>${M.dot?`<path d="${M.dot}"/>`:''}</svg></i>`};
const winner=r=>{const W=wins(r);return `<span class="r10-w${W.length?'':' r10-w0'}${W.length>1?' r10-w2':''}"><em>Winner${W.length>1?'s':''}</em>`+
  (W.length?W.map(m=>`<b class="r10-wm">${mark(m)}<span class="r10-wn">${NM(m)}</span></b>`).join(''):`<b class="r10-wm"><span class="r10-wn">Nobody</span></b>`)+`</span>`};
const L=t=>(window.CO_LOGOS||{})[t]||null;
const logo=(t,cls)=>{const l=L(t);return l?`<i class="r10-lg${l.dark?' r10-lgd':''} ${cls||''}" aria-hidden="true"><img src="media/${l.f||l}" alt="" decoding="async"></i>`:''};
const line1=(r,withLogo)=>`<span class="r10-l1">${withLogo?logo(r.ticker):''}<b class="r10-nm">${esc(r.co)}</b><b class="r10-mv r10-${r.a>0?'pu':'pd'}">${esc(mv(r))}</b></span>`;
const pic=(src,cls)=>`<span class="r10-pic ${cls||''}"><img src="${src}" alt="" decoding="async" loading="lazy"></span>`;
const cap=(r,hero)=>`<span class="r10-tx">${hero?`<span class="r10-tag">Latest ${TK==='C'||TK==='B'?'issue':'print'} · ${esc(md(r.resolves))}</span>`:''}${line1(r,true)}${winner(r)}</span>`;
const WIDE=()=>innerWidth>=1000;

/* ---------- A · hot off the press: prints pegged on brass wires; the next round pencilled on a blank sheet ---------- */
const clip=k=>`<i class="r10a-clip r10a-c${k}" aria-hidden="true"></i>`;
function A_it(r,hero){return `<span class="r10-ob r10a-print">${clip(1)}${hero?clip(2):''}${pic(hero?big(r):tile(r.n))}${cap(r,hero)}</span>`}
function A_next(u){return `<span class="r10-ob r10a-print r10a-pencil" role="img" aria-label="Next on the line: round ${u.n}, ${esc(u.co)}, calls due ${esc(md(u.called))}">${clip(1)}
  <span class="r10a-sk" aria-hidden="true"><span class="r10a-skart">${logo(u.ticker,'r10a-sklg')}</span>
  <span class="r10a-skt"><b>Round ${u.n}</b><b class="r10a-skco">${esc(u.co)}</b><i>Calls due ${esc(md(u.called))}</i><i>Printed at the close</i></span></span></span>`}
/* ---------- B · the newsstand: each issue in a gold-rimmed pocket, a brass plate under it ---------- */
function B_it(r,hero){return `<span class="r10-ob r10b-slot">${hero?`<span class="r10b-flag">Latest issue · No. ${r.n}</span>`:''}<span class="r10b-pocket">${pic(hero?big(r):tile(r.n))}<i class="r10b-rim" aria-hidden="true"></i></span><span class="r10b-plate">${cap(r,false).replace(/<i class="r10-lg[^]*?<\/i>/,"")}</span></span>`}
/* ---------- C · the latest issue: one cover trade dress for every round; masthead, issue seal and banner carry the words ---------- */
function C_cover(r,hero,cls){const W=wins(r);return `<span class="r10c-cv ${cls||''}"><span class="r10c-art">${pic(hero?big(r):tile(r.n))}</span><i class="r10c-dress" aria-hidden="true"></i>
  <span class="r10c-mast"><b class="r10c-co">${esc(r.co)}</b><b class="r10c-mv r10-${r.a>0?'pu':'pd'}">${esc(mv(r))}</b></span><span class="r10c-seal"><i>No.</i><b>${r.n}</b></span>
  <span class="r10c-ban">${W.length?`<em>${W.length>1?'Tie':'Winner'}</em>`+W.map(m=>`<b class="r10-wm">${mark(m)}<span class="r10-wn">${NM(m)}</span></b>`).join(''):`<em>Winner</em><b class="r10-wm"><span class="r10-wn">Nobody</span></b>`}</span></span>`}
function C_it(r,hero){if(!hero)return `<span class="r10-ob r10c-one">${C_cover(r,false)}</span>`;
  const back=REST.slice(0,3);/* the three issues before it, fanned behind (their art only: the stack says "an issue every round") */
  return `<span class="r10-ob r10c-hero"><span class="r10c-fan" aria-hidden="true">${back.map((b,i)=>`<span class="r10c-bk r10c-bk${i}">${C_cover(b,false,'r10c-mini')}</span>`).join('')}</span>
  <span class="r10c-top">${C_cover(r,true,'r10c-big')}</span><span class="r10c-note"><span class="r10-tag">Latest issue · ${esc(md(r.resolves))}</span></span></span>`}
/* ---------- D · the press run: the newest print on the web under the rollers, the run below ---------- */
function D_it(r,hero){return `<span class="r10-ob r10d-print">${pic(hero?big(r):tile(r.n))}${cap(r,hero)}<i class="r10d-crop" aria-hidden="true"></i></span>`}

const IT={A:A_it,B:B_it,C:C_it,D:D_it}[TK]||A_it;
const link=(r,hero)=>`<a class="${hero?'r10-hero':'r10-it'}" href="#/round/${r.n}" aria-label="${esc(aria(r))}">${IT(r,hero)}</a>`;
const FIRST=6;let shown=FIRST;
const PAGE=()=>WIDE()?12:8;
const root=D.createElement('div');root.className='r10 r10-'+TK;
const HEAD={A:['Hot off the press','Printed at every close. Newest first.'],B:['Every round so far','A new issue at every close. Latest on top.'],
  C:['Every round so far','Every round is an issue. Here is the latest.'],D:['Hot off the press','The press runs at every close. Newest first.']}[TK];
const MORE={A:'in the flat file',B:'in the back rack',C:'back issues',D:'further down the run'}[TK];
function more(){const left=REST.length-shown;if(left<=0)return `<p class="r10-all">All ${G.length} rounds</p>`;const k=Math.min(PAGE(),left);
  return `<button class="r10-more" type="button" aria-label="Show ${k} more rounds"><b>Show ${k} more</b><i>${left} ${MORE}</i></button>`}
const HDR=()=>`<header class="r10-hd"><h2 class="r10-h2"><span class="r10-hw">${esc(HEAD[0])}</span></h2><p class="r10-cap">${esc(HEAD[1])}</p></header>`;
function render(){const nx=TK==='A'?NEXTS.slice(0,WIDE()?2:1):[];
  const grid=`<div class="r10-g">${link(HERO,true)}${(TK==='A'&&WIDE()?REST.slice(0,3):[]).map(r=>link(r,false)).join('')}${nx[0]?`<span class="r10-nx">${A_next(nx[0])}</span>`:''}${REST.slice(TK==='A'&&WIDE()?3:0,TK==='A'&&WIDE()?6:shown).map(r=>link(r,false)).join('')}${nx[1]?`<span class="r10-nx r10-nx2">${A_next(nx[1])}</span>`:''}${TK==='A'&&WIDE()?REST.slice(6,shown).map(r=>link(r,false)).join(''):''}${more()}</div>`;
  root.innerHTML=TK==='A'?`<div class="r10-stage"><div class="r10-bg" aria-hidden="true"></div><div class="r10-in">${HDR()}${grid}</div></div>`
    :`<div class="r10-in">${HDR()}</div><div class="r10-stage"><div class="r10-bg" aria-hidden="true"></div><div class="r10-in">${grid}</div></div>`;
  layout();
  root.querySelector('.r10-more')?.addEventListener('click',()=>{shown+=PAGE();render()});
  fit();post();
  let t;root.querySelectorAll('img').forEach(i=>{if(!i.complete)i.addEventListener('load',()=>{clearTimeout(t);t=setTimeout(()=>{fit();post()},120)},{once:true})});setTimeout(()=>{fit();post()},400)}
/* the painted world: a 9-slice of the take's painting (the frame kept at scale, the middle stretched or tiled to hold every round) */
const ART={A:{p:['wireP.jpg',1728,[1300,0,740,0]],d:['wireD.jpg',3072,[600,0,450,0]],kp:0,kd:0},
  B:{p:['standP.jpg',1728,[830,199,722,216]],d:['standD.jpg',3072,[380,490,500,476]],kp:.13,kd:.3},
  C:{p:['velvet.jpg',2560,[140,330,300,330]],d:['velvet.jpg',2560,[140,330,300,330]],kp:.1,kd:.22},
  D:{p:['pressP.jpg',1728,[740,345,0,345]],d:['pressD.jpg',3072,[620,860,0,860]],kp:.12,kd:.2}}[TK];
function layout(){const w=root.getBoundingClientRect().width||innerWidth,a=WIDE()?ART.d:ART.p,k=(WIDE()?ART.kd:ART.kp)||w/a[1];
  root.style.setProperty('--img-x',`url(${IMG}${a[0]})`);root.style.setProperty('--bs',a[2].join(' ')+' fill');
  ['--bt','--br','--bb','--bl'].forEach((v,i)=>root.style.setProperty(v,(a[2][i]*k).toFixed(1)+'px'))}
/* fit: a name steps down to its floor, then trims; the move never trims. A tie too wide shows "Tie", then the marks only. */
function fit(){root.querySelectorAll('.r10-l1,.r10c-mast').forEach(l=>{const b=l.querySelector('.r10-nm,.r10c-co');b.style.fontSize='';let f=parseFloat(getComputedStyle(b).fontSize);const fl=parseFloat(getComputedStyle(b).getPropertyValue('--fl'))||11;
  while(b.scrollWidth>b.clientWidth+.5&&f>fl){f-=.5;b.style.fontSize=f+'px'}});
  root.querySelectorAll('.r10-w2,.r10c-ban').forEach(w=>{const e=w.querySelector('em');if(!e)return;w.classList.remove('r10-wc');
    if(w.classList.contains('r10-w2')){e.textContent='Winners';if(w.scrollWidth>w.clientWidth+.5)e.textContent='Tie'}
    if(w.scrollWidth>w.clientWidth+.5)w.classList.add('r10-wc')})}
/* after layout: A draws a brass wire across the section at the top of each row of prints (behind the prints) */
function post(){if(TK!=='A')return;const g=root.querySelector('.r10-g');if(!g)return;root.querySelectorAll('.r10a-wire').forEach(w=>w.remove());
  const gr=g.getBoundingClientRect(),tops=[...new Set([...g.querySelectorAll(':scope>a,:scope>.r10-nx')].map(a=>Math.round(a.getBoundingClientRect().top-gr.top)))].sort((a,b)=>a-b);
  const W=root.getBoundingClientRect().width,ox=gr.left-root.getBoundingClientRect().left;
  tops.forEach((y,i)=>{const s=D.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('class','r10a-wire');s.setAttribute('aria-hidden','true');s.setAttribute('viewBox',`0 0 ${W} 14`);s.setAttribute('preserveAspectRatio','none');
    s.style.cssText=`left:${-ox}px;top:${y-(WIDE()?13:11)}px;width:${W}px`;const sag=1.5+i%2;
    s.innerHTML=`<defs><linearGradient id="r10br${i}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b4a12"/><stop offset=".3" stop-color="#e2b955"/><stop offset=".55" stop-color="#9a7020"/><stop offset=".8" stop-color="#f0cd6a"/><stop offset="1" stop-color="#6b4a12"/></linearGradient></defs><path d="M0 2 Q${W/2} ${2+sag*2} ${W} 2" fill="none" stroke="#000" stroke-opacity=".55" stroke-width="3.2" transform="translate(0 3)"/><path d="M0 2 Q${W/2} ${2+sag*2} ${W} 2" fill="none" stroke="url(#r10br${i})" stroke-width="2.6"/><path d="M0 1.4 Q${W/2} ${1.4+sag*2} ${W} 1.4" fill="none" stroke="#fff3c4" stroke-opacity=".55" stroke-width=".7"/>`;
    g.prepend(s)})}
[...sec.children].forEach(c=>{if(c!==root){c.classList.add('r10-old');c.setAttribute('aria-hidden','true');c.inert=true}});
sec.classList.add('r10-sec');sec.appendChild(root);
if(!D.getElementById('r10defs')){const d=D.createElement('div');d.id='r10defs';d.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
  d.innerHTML='<svg width="0" height="0"><defs><linearGradient id="r10brass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b4a12"/><stop offset=".3" stop-color="#e2b955"/><stop offset=".55" stop-color="#9a7020"/><stop offset=".8" stop-color="#f0cd6a"/><stop offset="1" stop-color="#6b4a12"/></linearGradient></defs></svg>';D.body.appendChild(d)}
['clip','pocket','plate'].forEach(n=>root.style.setProperty('--img-'+n,`url(${IMG}spr-${n}.webp)`));root.style.setProperty('--img-dress',`url(${IMG}dress.webp)`);render();
let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;render()}});
D.fonts&&(D.fonts.ready.then(()=>{fit();post()}),D.fonts.addEventListener('loadingdone',()=>setTimeout(()=>{fit();post()},30)));
if(TK==='D'&&'IntersectionObserver' in window){const io=new IntersectionObserver(e=>{if(e.some(x=>x.isIntersecting)){root.classList.add('r10d-go');io.disconnect()}},{threshold:.35});io.observe(root)}
window.__r10={render,hero:HERO.n,next:NEXTS.map(u=>u.n),set:n=>{shown=n;render()}};
})();
