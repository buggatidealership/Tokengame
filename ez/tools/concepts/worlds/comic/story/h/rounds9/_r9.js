/* Round H27 · rounds9: "Every round so far", simple, in its own world (not the chip, not the comic).
   window.__R9 = 'A' the reel (cinema: every round is a film; oxblood velvet, black film, gold)
                 'B' the stamp album (every round an issued stamp; the stamp's ink = the move's direction, the move = its denomination)
                 'C' the 45s (every round a record sleeve; the company's logo on the label through the die-cut hole; a gold wall)
   Structure (rounds8, H27): the latest graded round as the hero, six recent rounds, "Show 8 more" adds eight.
   Each tile (owner's sketch): the company's name without the ticker and the move on the same line; under it "Winner" with the
   winning model's mark and name (both on a tie, "Nobody" when no AI got it). No row of four marks.
   Data live: ROUNDS (graded), FILMS, CO_LOGOS, MODELS, PENDING/UPCOMING. Nothing typed. No new paintings: the round tiles and posters already in media/.
   Mounts over the built v46-live-x2plus.html: today's .r6 stays in the DOM, hidden and inert; the new root goes in #record. */
(function(){
const D=document,TK=window.__R9||'A';
const sec=D.getElementById('record');if(!sec)return;sec.querySelector('.r9')?.remove();
const G=(window.ROUNDS||[]).filter(r=>r.a!=null&&r.out),NEW=G.slice().reverse(),FUT=[...(window.PENDING||[]),...(window.UPCOMING||[])];
const MD=window.MODELS||{},ORDER=['GPT','KIMI','CLAUDE','GROK'];
const CHIP={GPT:'#10a37f',CLAUDE:'#d97757',KIMI:'#1e80ff',GROK:'#6f7e8c'};/* each model's own colour, as Meet the models introduces it */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NM=m=>m==='GPT'?'GPT':m[0]+m.slice(1).toLowerCase();
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>MD[m]);
const callOf=(r,m)=>(r.calls||[]).find(c=>c[0]===m);
const right=(c,a)=>/^UP/i.test(c)===(a>0);
const film=n=>!!(window.FILMS||{})[n];
const tile=n=>`media/tile-r${n}-${film(n)?'f1':'t2'}.jpg`;
const big=r=>r.poster?`media/${r.poster}.jpg`:tile(r.n);
const mv=r=>String(r.out).replace(/^-/,'−');
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const md=s=>{if(!s)return '';const[m,d]=String(s).split('/');return MON[m-1]+' '+(+d)};
const winTxt=r=>{const W=wins(r);return W.length?W.map(NM).join(' & '):'Nobody'};
const rightOf=r=>ORDER.filter(m=>{const c=callOf(r,m);return c&&right(c[1],r.a)});
const called=r=>ORDER.filter(m=>callOf(r,m));
/* the hero's one line, in the trade's verbs (lesson 124) */
function story(r){const R=rightOf(r),C=called(r),side=r.a>0?'long':'short';
  if(!R.length)return `Nobody went ${side}.`;if(R.length===C.length)return `All ${C.length} went ${side}.`;
  if(R.length===1)return `Only ${NM(R[0])} went ${side}.`;return `${R.slice(0,-1).map(NM).join(', ')} and ${NM(R[R.length-1])} went ${side}.`}
const HERO=NEW[0],REST=NEW.slice(1);
const aria=r=>`Round ${r.n}, ${r.co}, moved ${r.out}. Winner: ${winTxt(r)}. Open the graded card.`;
/* a model's mark: its glyph in cream on a disc of its own colour (readable on velvet, on a red or green stamp, on a black band) */
const mark=m=>{const M=MD[m]||{};return `<i class="r9-mk" style="--mc:${CHIP[m]}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d||''}"${M.fr?` fill-rule="${M.fr}"`:''}/>${M.dot?`<path d="${M.dot}"/>`:''}</svg></i>`};
const winner=r=>{const W=wins(r);return `<span class="r9-w${W.length?'':' r9-w0'}${W.length>1?' r9-w2':''}"><em>Winner${W.length>1?'s':''}</em>`+
  (W.length?W.map(m=>`<b class="r9-wm">${mark(m)}<span class="r9-wn">${NM(m)}</span></b>`).join(''):`<b class="r9-wm"><span class="r9-wn">Nobody</span></b>`)+`</span>`};
const L=t=>(window.CO_LOGOS||{})[t]||null;
const logo=(t,cls)=>{const l=L(t);return l?`<i class="r9-lg${l.dark?' r9-lgd':''} ${cls||''}" style="--bc:${l.c||'#12131a'}" aria-hidden="true"><img src="media/${l.f||l}" alt="" decoding="async"></i>`:''};
const line1=(r,withLogo)=>`<span class="r9-l1">${withLogo?logo(r.ticker):''}<b class="r9-nm">${esc(r.co)}</b><b class="r9-mv r9-${r.a>0?'pu':'pd'}">${esc(mv(r))}</b></span>`;
const pic=(src,cls)=>`<span class="r9-pic ${cls||''}"><img src="${src}" alt="" decoding="async"></span>`;
const dir=r=>r.a>0?'up':'dn';

/* ---------- A · the reel: each round a piece of film cut from the season's reel; a round without a film is a still print ---------- */
function A_it(r,hero){const f=film(r.n);return `<span class="r9-ob r9a-film${f?'':' r9a-still'}">${pic(hero?big(r):tile(r.n))}
  <span class="r9-tx">${hero?`<span class="r9-tag">Now showing · Latest round · ${esc(md(r.resolves))}</span>`:''}${line1(r,true)}${hero?`<span class="r9-st">${esc(story(r))}</span>`:''}${winner(r)}</span></span>`}
/* ---------- B · the stamp album: the stamp's ink is the move's direction (green up, red down), the move is its denomination ---------- */
function B_it(r,hero){const s=`<span class="r9-ob r9b-stamp r9b-${dir(r)}">${pic(hero?big(r):tile(r.n))}
  <span class="r9-tx">${line1(r,true)}${hero?`<span class="r9-st">${esc(story(r))}</span>`:''}${winner(r)}</span></span>`;
  return hero?`<span class="r9b-sheet r9b-${dir(r)}"><span class="r9-tag">Latest issue · ${esc(md(r.resolves))}<i>No. ${r.n}</i></span>${s}</span>`:s}
/* ---------- C · the 45s: each round a record in its sleeve; the die-cut hole shows the label, and the label is the company's ---------- */
function C_it(r,hero){return `<span class="r9-ob r9c-sleeve">${pic(hero?big(r):tile(r.n))}
  <span class="r9-tx">${hero?`<span class="r9-tag">Now playing · Latest round · ${esc(md(r.resolves))}</span>`:''}<span class="r9c-row"><span class="r9c-hole" aria-hidden="true">${logo(r.ticker,'r9c-lab')}</span><span class="r9c-col">${line1(r,false).replace('<span class="r9-l1">','<span class="r9-l1"><span class="r9c-ring" aria-hidden="true">'+logo(r.ticker)+'</span>')}${hero?`<span class="r9-st">${esc(story(r))}</span>`:''}${winner(r)}</span></span></span></span>`}

const IT={A:A_it,B:B_it,C:C_it}[TK]||A_it;
const link=(r,hero)=>`<a class="${hero?'r9-hero':'r9-it'}" href="#/round/${r.n}" aria-label="${esc(aria(r))}">${IT(r,hero)}</a>`;
const FIRST=6;let shown=FIRST;
/* eight at a time; ten on the five-column desktop grid so every row closes and no cell stays empty (owner: no dead space at 1280) */
const PAGE=()=>innerWidth>=1000?10:8;
const root=D.createElement('div');root.className='r9 r9-'+TK;
const CAP=`${G.length} rounds graded · ${FUT.length} to come`;
const MORE={A:(k,left)=>`<b>Show ${k} more</b><i>${left} more on the reel</i>`,B:(k,left)=>`<b>Show ${k} more</b><i>${left} more in the album</i>`,C:(k,left)=>`<b>Show ${k} more</b><i>${left} more in the crate</i>`}[TK];
function more(){const left=REST.length-shown;if(left<=0)return `<p class="r9-all">All ${G.length} rounds</p>`;const k=Math.min(PAGE(),left);
  const nx=REST.slice(shown,shown+k);
  return `<button class="r9-more" type="button" aria-label="Show ${k} more rounds"><span class="r9-peek" aria-hidden="true">${nx.map(r=>`<img src="${tile(r.n)}" alt="" decoding="async">`).join('')}</span>${TK==='B'?'<i class="r9b-curl" aria-hidden="true"></i>':''}${MORE(k,left)}</button>`}
function render(){root.innerHTML=`<div class="r9-in"><header class="r9-hd"><h2 class="r9-h2">Every round so far</h2><p class="r9-cap">${esc(CAP)}</p></header>
  <div class="r9-g">${link(HERO,true)}${REST.slice(0,shown).map(r=>link(r,false)).join('')}${more()}</div></div>`;
  root.querySelector('.r9-more')?.addEventListener('click',()=>{shown+=PAGE();render()});span();fit();
  let t;root.querySelectorAll('img').forEach(i=>{if(!i.complete)i.addEventListener('load',()=>{clearTimeout(t);t=setTimeout(fit,120)},{once:true})});setTimeout(fit,400)}
/* the button fills what is left of the last row (a full row when the row is complete), so no cell stays empty */
function span(){const g=root.querySelector('.r9-g'),b=g&&g.querySelector('.r9-more,.r9-all');if(!b)return;const cols=getComputedStyle(g).gridTemplateColumns.split(' ').length;
  const used=(cols>=3?4:cols)+Math.min(shown,REST.length),rem=(cols-used%cols)%cols;b.style.setProperty('--sp',rem||cols)}
/* fit: the name steps down to its floor, then trims (CSS ellipsis); the move never trims. A tie line too wide drops the names and keeps the marks. */
function fit(){root.querySelectorAll('.r9-l1').forEach(l=>{const b=l.querySelector('.r9-nm');b.style.fontSize='';let f=parseFloat(getComputedStyle(b).fontSize);const fl=parseFloat(getComputedStyle(b).getPropertyValue('--fl'))||13;
  while(b.scrollWidth>b.clientWidth+.5&&f>fl){f-=.5;b.style.fontSize=f+'px'}});
  root.querySelectorAll('.r9-w2').forEach(w=>{const e=w.querySelector('em');w.classList.remove('r9-wc','r9-wt');e.textContent='Winners';
    if(w.scrollWidth>w.clientWidth+.5){w.classList.add('r9-wt');e.textContent='Tie';if(w.scrollWidth>w.clientWidth+.5){w.classList.remove('r9-wt');e.textContent='Winners';w.classList.add('r9-wc')}}})}
[...sec.children].forEach(c=>{if(c!==root){c.classList.add('r9-old');c.setAttribute('aria-hidden','true');c.inert=true}});
sec.appendChild(root);render();
let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;render()}});
D.fonts&&(D.fonts.ready.then(fit),D.fonts.addEventListener('loadingdone',()=>setTimeout(fit,30)));/* a face asked for late (Archivo at 75% width) refits */
window.__r9={render,hero:HERO.n,set:n=>{shown=n;render()}};
})();
