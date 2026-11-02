/* Round H28 · chain: "Every round so far" as a blockchain (mockups over the built v46-live-x2plus.html).
   The story chain of the page: the models live in chips (Meet the models) -> the record is a ledger -> a chain of blocks, one block per round.
   window.__CH = 'A' the hash chain (blocks on a board, joined by gold links, the chain snakes so every link is a short one)
                 'B' the block explorer (newest first, the way crypto people already read a chain: height, contents, hash)
                 'C' the bus (one gold line down the page; every block hangs on it, the hash it hands to the next is printed on the line)
                 'D' the open block (the stack grows: block 81 is already open on top and already points at block 80; sealed blocks below)
   Tile content and structure from rounds9: company without ticker, the move beside it, Winner + mark + name (both on a tie, Nobody);
   the latest block first, six recent, "Show 8 more" (10 on the five-column desktop grid).
   THE HASHES ARE REAL: block n's hash = SHA-256( prev hash | record of round n ), record = "R<n>|<ticker>|<called>|<resolves>|<m:call,...>|<close %>",
   genesis prev = 64 zeros. Computed here from ROUNDS (the sheet's data), so editing any round changes its hash and every hash after it.
   Nothing typed: ROUNDS, UPCOMING, FILMS, CO_LOGOS, MODELS. No new paintings: tile-r<n>-f1/t2.jpg and the film posters already in media/. */
(function(){
const D=document,TK=window.__CH||'A';
const sec=D.getElementById('record');if(!sec)return;sec.querySelector('.cz')?.remove();
/* ---------- SHA-256 (sync, small; checked against node's crypto in run.js) ---------- */
const sha256=(()=>{const K=[],H0=[];let p=0;for(let c=2;p<64;c++){let pr=true;for(let d=2;d*d<=c;d++)if(c%d===0){pr=false;break}if(pr){if(p<8)H0[p]=(Math.pow(c,1/2)%1)*4294967296|0;K[p++]=(Math.pow(c,1/3)%1)*4294967296|0}}
  const R=(x,n)=>(x>>>n)|(x<<(32-n));
  return s=>{const b=unescape(encodeURIComponent(s)),l=b.length,w=[];for(let i=0;i<l;i++)w[i>>2]|=b.charCodeAt(i)<<(24-(i%4)*8);w[l>>2]|=0x80<<(24-(l%4)*8);
    const n=((l+8)>>6<<4)+16;for(let i=0;i<n;i++)w[i]|=0;w[n-1]=l*8;const h=H0.slice(),W=new Array(64);
    for(let j=0;j<n;j+=16){let[a,b2,c,d,e,f,g,hh]=h;for(let i=0;i<64;i++){W[i]=i<16?w[j+i]:(R(W[i-2],17)^R(W[i-2],19)^(W[i-2]>>>10))+W[i-7]+(R(W[i-15],7)^R(W[i-15],18)^(W[i-15]>>>3))+W[i-16]|0;
      const t1=hh+(R(e,6)^R(e,11)^R(e,25))+((e&f)^(~e&g))+K[i]+W[i]|0,t2=(R(a,2)^R(a,13)^R(a,22))+((a&b2)^(a&c)^(b2&c))|0;hh=g;g=f;f=e;e=d+t1|0;d=c;c=b2;b2=a;a=t1+t2|0}
      h[0]=h[0]+a|0;h[1]=h[1]+b2|0;h[2]=h[2]+c|0;h[3]=h[3]+d|0;h[4]=h[4]+e|0;h[5]=h[5]+f|0;h[6]=h[6]+g|0;h[7]=h[7]+hh|0}
    return h.map(x=>(x>>>0).toString(16).padStart(8,'0')).join('')}})();
const G=(window.ROUNDS||[]).filter(r=>r.a!=null&&r.out),FUT=[...(window.PENDING||[]),...(window.UPCOMING||[])];
const record=r=>`R${r.n}|${r.ticker}|${r.called}|${r.resolves}|${(r.calls||[]).map(c=>c[0]+':'+c[1]).join(',')}|${r.a}`;
const HASH={},PREV={};let prev='0'.repeat(64);G.forEach(r=>{PREV[r.n]=prev;prev=HASH[r.n]=sha256(prev+'|'+record(r))});
const HEAD=prev;/* the hash of the newest block: the one number that pins the whole record */
window.__chHash={HASH,PREV,record,sha256,head:HEAD};
const NEW=G.slice().reverse(),HERO=NEW[0],REST=NEW.slice(1),OPEN=FUT[0]||null;
const MD=window.MODELS||{},ORDER=['GPT','KIMI','CLAUDE','GROK'];
const CHIP={GPT:'#10a37f',CLAUDE:'#d97757',KIMI:'#1e80ff',GROK:'#6f7e8c'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NM=m=>m==='GPT'?'GPT':m[0]+m.slice(1).toLowerCase();
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>MD[m]);
const callOf=(r,m)=>(r.calls||[]).find(c=>c[0]===m);
const film=n=>!!(window.FILMS||{})[n];
const tile=n=>`media/tile-r${n}-${film(n)?'f1':'t2'}.jpg`;
const big=r=>r.poster?`media/${r.poster}.jpg`:tile(r.n);
const mv=r=>String(r.out).replace(/^-/,'−');
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const md=s=>{if(!s)return '';const[m,d]=String(s).split('/');return MON[m-1]+' '+(+d)};
const winTxt=r=>{const W=wins(r);return W.length?W.map(NM).join(' & '):'Nobody'};
const sh=(h,a=4,b=4)=>'0x'+h.slice(0,a)+'…'+h.slice(-b);/* the short form crypto people know */
const aria=r=>`Block ${r.n}: round ${r.n}, ${r.co}, moved ${r.out}. Winner: ${winTxt(r)}. Hash ${HASH[r.n].slice(0,8)}. Open the graded card.`;
const mark=m=>{const M=MD[m]||{};return `<i class="cz-mk" style="--mc:${CHIP[m]}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d||''}"${M.fr?` fill-rule="${M.fr}"`:''}/>${M.dot?`<path d="${M.dot}"/>`:''}</svg></i>`};
const winner=r=>{const W=wins(r);return `<span class="cz-w${W.length?'':' cz-w0'}${W.length>1?' cz-w2':''}"><em>Winner${W.length>1?'s':''}</em>`+
  (W.length?W.map(m=>`<b class="cz-wm">${mark(m)}<span class="cz-wn">${NM(m)}</span></b>`).join(''):`<b class="cz-wm"><span class="cz-wn">Nobody</span></b>`)+`</span>`};
const L=t=>(window.CO_LOGOS||{})[t]||null;
const logo=(t,cls)=>{const l=L(t);return l?`<i class="cz-lg${l.dark?' cz-lgd':''} ${cls||''}" aria-hidden="true"><img src="media/${l.f||l}" alt="" decoding="async"></i>`:''};
const line1=(r,lg)=>`<span class="cz-l1">${lg?logo(r.ticker):''}<b class="cz-nm">${esc(r.co)}</b><b class="cz-mv cz-${r.a>0?'pu':'pd'}">${esc(mv(r))}</b></span>`;
const pic=(src,cls)=>`<span class="cz-pic ${cls||''}"><img src="${src}" alt="" decoding="async"></span>`;
const hx=(h,cls)=>`<code class="cz-hx ${cls||''}">${sh(h)}</code>`;
const ht=n=>`<span class="cz-ht"><i>Block</i><b>${n}</b></span>`;

/* ================= A · the hash chain ================= */
function A_it(r,hero){return `<span class="cz-blk cza-blk"><span class="cza-bar">${ht(r.n)}${hx(HASH[r.n])}</span>${pic(hero?big(r):tile(r.n))}
  <span class="cz-tx">${line1(r,true)}${winner(r)}${hero?`<span class="cza-prev"><i>Prev</i>${hx(PREV[r.n],'cz-hx-p')}<i class="cza-pt">= block ${r.n-1}</i></span>`:''}</span></span>`}
/* ================= B · the block explorer ================= */
function B_hero(r){return `<span class="cz-blk czb-hero"><span class="czb-hd"><span class="czb-lab"><i class="czb-dot"></i>Latest block</span><span class="czb-when">Sealed<span class="czb-atc"> at the close</span> · ${esc(md(r.resolves))}</span></span>
  <span class="czb-body">${pic(big(r),'czb-pic')}<span class="cz-tx"><span class="czb-big">${ht(r.n)}</span>${line1(r,true)}${winner(r)}
  <span class="czb-kv"><i>Hash</i><code class="cz-hx czb-full"><span>0x${HASH[r.n].slice(0,32)}</span><span>${HASH[r.n].slice(32)}</span></code></span>
  <span class="czb-kv"><i>Prev</i>${hx(PREV[r.n],'cz-hx-p')}<em class="czb-to">block ${r.n-1} ↓</em></span></span></span></span>`}
function B_it(r){return `<span class="cz-blk czb-row"><span class="czb-n">${r.n}</span>${pic(tile(r.n),'czb-th')}<span class="cz-tx">${line1(r,false)}${winner(r)}</span>${hx(HASH[r.n],'czb-rh')}</span>`}
/* ================= C · the bus ================= */
function C_it(r,hero){return `<span class="cz-blk czc-blk">${pic(hero?big(r):tile(r.n),'czc-pic')}<span class="cz-tx"><span class="czc-top">${ht(r.n)}<span class="czc-d">${esc(md(r.resolves))}</span></span>${line1(r,true)}${winner(r)}${hero?`<span class="czc-hh"><i>Hash</i>${hx(HASH[r.n])}</span>`:''}</span></span>`}
/* ================= D · the open block on top of the stack ================= */
function D_open(){if(!OPEN)return '';const lg=logo(OPEN.ticker);
  return `<div class="czd-open" aria-label="Block ${OPEN.n} is open: round ${esc(OPEN.n)}, ${esc(OPEN.co)}. Calls due ${esc(md(OPEN.called))}, sealed at the close${OPEN.resolves?' on '+esc(md(OPEN.resolves)):''}. It already points at block ${HERO.n}."><span class="czd-ob">
  <span class="czd-obar">${ht(OPEN.n)}<span class="czd-state"><i class="czd-led"></i>Open</span></span>
  <span class="czd-obody">${lg}<span class="czd-oco"><b>${esc(OPEN.co)}</b><span>Calls due ${esc(md(OPEN.called))} · sealed at the close${OPEN.resolves?' '+esc(md(OPEN.resolves)):''}</span></span>
  <span class="czd-slots">${ORDER.map(m=>`<span class="czd-slot">${mark(m)}<b>?</b></span>`).join('')}</span></span>
  <span class="czd-oprev"><i>Prev</i>${hx(HASH[HERO.n],'cz-hx-p')}<em>already points at block ${HERO.n}</em></span></span></div>`}
function D_it(r,hero){return `<span class="cz-blk czd-blk${hero?' czd-hero':''}">${pic(hero?big(r):tile(r.n),'czd-pic')}<span class="cz-tx">${line1(r,true)}${winner(r)}</span>
  <span class="czd-edge">${ht(r.n)}<code class="cz-hx">${HASH[r.n].slice(0,16)}<span class="czd-xx">${HASH[r.n].slice(16,40)}</span>…</code></span></span>`}

const link=(r,hero,body)=>`<a class="${hero?'cz-hero':'cz-it'}" href="#/round/${r.n}" data-n="${r.n}" aria-label="${esc(aria(r))}">${body}</a>`;
const ITEM={A:(r,h)=>A_it(r,h),B:(r,h)=>h?B_hero(r):B_it(r),C:(r,h)=>C_it(r,h),D:(r,h)=>D_it(r,h)}[TK];
const FIRST=6;let shown=FIRST;
const wide=()=>innerWidth>=1000;
const PAGE=()=>!wide()?8:({A:10,B:8,C:8,D:10}[TK]);
const root=D.createElement('div');root.className='cz cz-'+TK;
const CAP={A:'Every round is a block. Each block carries the hash of the one before.',B:'Newest first. Each block carries the hash of the one before.',
  C:'One chain, newest on top. The hash on the line is what each block hands to the next.',D:'Each block carries the hash of the one before. The next one is already open.'}[TK];
function more(){const left=REST.length-shown;if(left<=0)return `<p class="cz-all">Back to the genesis block · round 1</p>`;const k=Math.min(PAGE(),left);
  return `<button class="cz-more" type="button" aria-label="Show ${k} more blocks"><b>Show ${k} more</b><i>${left} older blocks · down to block 1</i></button>`}
function grid(){const items=[link(HERO,true,ITEM(HERO,true)),...REST.slice(0,shown).map(r=>link(r,false,ITEM(r,false)))];
  const LH=`<p class="czb-lh"><span>Block</span><span>Round</span><span>Hash</span></p>`;
  if(TK==='B'){if(!wide())return `<div class="czb-g">${items[0]}<div class="czb-list">${LH}${items.slice(1).join('')}</div>${more()}</div>`;
    const x=items.slice(7);return `<div class="czb-g">${items[0]}<div class="czb-list">${LH}${items.slice(1,7).join('')}</div>${x.length?`<div class="czb-list czb-l2">${x.join('')}</div>`:''}${more()}</div>`}
  if(TK==='C'){if(!wide())return `<div class="czc-g"><i class="czc-bus" aria-hidden="true"></i>${items.join('')}${more()}</div>`;
    /* desktop: bands, each on its own bus: the hero and six, then eight per band (four above the line, four below) */
    const bands=[items.slice(0,7)];for(let i=7;i<items.length;i+=8)bands.push(items.slice(i,i+8));
    return bands.map((b,k)=>`<div class="czc-g czc-band${k?' czc-b8':''}"><i class="czc-bus" aria-hidden="true"></i>${b.join('')}</div>`).join('')+more()}
  if(TK==='D'){const x=items.slice(7);return `${D_open()}<div class="czd-g czd-top">${items[0]}</div><div class="czd-g czd-rest">${items.slice(1,7).join('')}</div>${x.length?`<div class="czd-g czd-x">${x.join('')}</div>`:''}${more()}`}
  return `<div class="cza-g">${items.join('')}${more()}<svg class="cza-links" aria-hidden="true"></svg></div>`}
function render(){root.innerHTML=`<div class="cz-in"><header class="cz-hd"><h2 class="cz-h2"><span class="cz-hw">Every round so far</span></h2>
  <p class="cz-cap">${esc(CAP)}</p><p class="cz-meta"><span><b>${G.length}</b> blocks sealed</span><span><b>${FUT.length}</b> to come</span></p></header>${grid()}</div>`;
  root.querySelector('.cz-more')?.addEventListener('click',()=>{shown+=PAGE();render()});
  place();fit();links();bus();
  let t;root.querySelectorAll('img').forEach(i=>{if(!i.complete)i.addEventListener('load',()=>{clearTimeout(t);t=setTimeout(()=>{fit();links();bus()},120)},{once:true})});setTimeout(()=>{fit();links();bus()},400)}
/* A: the chain snakes, so every block sits next to the one before it and every link is short.
   Phone (2 columns): the hero across, then rows of two, alternating direction. Desktop (5): the hero 2x2 on the left, the six run down and up
   columns 3, 4, 5 (ending bottom right), then full rows of five alternate direction. */
function place(){if(TK!=='A')return;const g=root.querySelector('.cza-g'),its=[...g.querySelectorAll('.cz-it')],more=g.querySelector('.cz-more,.cz-all');
  const cols=getComputedStyle(g).gridTemplateColumns.split(' ').length;let last=[1,1];
  its.forEach((a,i)=>{let r,c;
    if(cols>=5){if(i<6){const col=3+Math.floor(i/2),down=Math.floor(i/2)%2===0;r=1+((i%2)===(down?0:1)?0:1);c=col}
      else{const k=i-6,row=Math.floor(k/5),j=k%5;r=3+row;c=row%2===0?5-j:1+j}}
    else if(cols===3){/* tablet: hero 2x2 left, six snake: col 3 down, then rows of three alternating */
      if(i<2){r=1+i;c=3}else{const k=i-2,row=Math.floor(k/3),j=k%3;r=3+row;c=row%2===0?3-j:1+j}}
    else{const row=Math.floor(i/2),j=i%2;r=2+row;c=row%2===0?1+j:2-j}
    a.style.gridRow=r;a.style.gridColumn=c;last=[r,c]});
  if(more){const r=last[0]+1;more.style.gridRow=r;more.style.gridColumn='1/-1'}}
/* the links: one gold chain link in every gap between a block and the one before it, oriented along the gap */
function links(){if(TK!=='A')return;const g=root.querySelector('.cza-g'),sv=g&&g.querySelector('.cza-links');if(!sv)return;const gr=g.getBoundingClientRect();
  const seq=[g.querySelector('.cz-hero'),...g.querySelectorAll('.cz-it')];let s='';
  for(let i=0;i<seq.length-1;i++){const a=seq[i].getBoundingClientRect(),b=seq[i+1].getBoundingClientRect();let x,y,rot;
    const ov=(p,q,r,t)=>Math.max(0,Math.min(q,t)-Math.max(p,r));
    if(ov(a.top,a.bottom,b.top,b.bottom)>20){/* side by side */const l=a.right<b.left?a:b,rr=a.right<b.left?b:a;x=(l.right+rr.left)/2;
      const top=Math.max(a.top,b.top),bot=Math.min(a.bottom,b.bottom);y=top+Math.min(64,(bot-top)*.18);rot=0}
    else{const t=a.bottom<b.top?a:b,bb=a.bottom<b.top?b:a;y=(t.bottom+bb.top)/2;const l=Math.max(a.left,b.left),r=Math.min(a.right,b.right);x=(l+r)/2;rot=90}
    s+=`<g transform="translate(${(x-gr.left).toFixed(1)} ${(y-gr.top).toFixed(1)}) rotate(${rot})"><use href="#chaLink"/></g>`}
  sv.setAttribute('viewBox',`0 0 ${gr.width.toFixed(1)} ${gr.height.toFixed(1)}`);sv.style.width=gr.width+'px';sv.style.height=gr.height+'px';
  sv.innerHTML=`<defs><linearGradient id="chaGd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".35" stop-color="#e2a92c"/><stop offset=".7" stop-color="#8a5a12"/><stop offset="1" stop-color="#f6cd62"/></linearGradient>
  <g id="chaLink"><rect x="-17" y="-6.5" width="20" height="13" rx="6.5" fill="none" stroke="#120d06" stroke-width="5.2"/><rect x="-17" y="-6.5" width="20" height="13" rx="6.5" fill="none" stroke="url(#chaGd)" stroke-width="3"/>
  <rect x="-3" y="-6.5" width="20" height="13" rx="6.5" fill="none" stroke="#120d06" stroke-width="5.2"/><rect x="-3" y="-6.5" width="20" height="13" rx="6.5" fill="none" stroke="url(#chaGd)" stroke-width="3"/>
  <path d="M-3 -4.2 v8.4" stroke="#120d06" stroke-width="5"/><path d="M-3 -3.4 v6.8" stroke="url(#chaGd)" stroke-width="3"/></g></defs>${s}`}
/* C: the bus between two hanging blocks carries the hash the older block hands up to the newer one */
function bus(){if(TK!=='C')return;root.querySelectorAll('.czc-seg').forEach(e=>e.remove());const W=wide();
  const all=[...root.querySelectorAll('.czc-g>a')];
  for(let i=0;i<all.length-1;i++){const A=all[i],B=all[i+1],g=B.parentElement,gr=g.getBoundingClientRect(),a=A.getBoundingClientRect(),b=B.getBoundingClientRect(),n=+B.dataset.n;
    const e=D.createElement('i');e.className='czc-seg';e.setAttribute('aria-hidden','true');e.textContent=HASH[n].slice(0,4);
    if(!W){e.style.top=((a.top+a.height/2+b.top+b.height/2)/2-gr.top)+'px'}
    else if(A.parentElement!==g){e.style.left='0px';e.classList.add('czc-seg0')}/* the first block of a band: its hash goes up the joint to the band above */
    else{const xa=A.classList.contains('cz-hero')?a.right:a.left+a.width/2;e.style.left=((xa+b.left+b.width/2)/2-gr.left)+'px'}
    g.appendChild(e)}}
function fit(){root.querySelectorAll('.cz-l1').forEach(l=>{const b=l.querySelector('.cz-nm');b.style.fontSize='';let f=parseFloat(getComputedStyle(b).fontSize);const fl=parseFloat(getComputedStyle(b).getPropertyValue('--fl'))||13;
  while(b.scrollWidth>b.clientWidth+.5&&f>fl){f-=.5;b.style.fontSize=f+'px'}});
  root.querySelectorAll('.cz-w2').forEach(w=>{const e=w.querySelector('em');w.classList.remove('cz-wc','cz-wt');e.textContent='Winners';
    if(w.scrollWidth>w.clientWidth+.5){w.classList.add('cz-wt');e.textContent='Tie';if(w.scrollWidth>w.clientWidth+.5){w.classList.remove('cz-wt');e.textContent='Winners';w.classList.add('cz-wc')}}})}
[...sec.children].forEach(c=>{if(c!==root){c.classList.add('cz-old');c.setAttribute('aria-hidden','true');c.inert=true}});
sec.appendChild(root);render();
let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;render()}});
D.fonts&&(D.fonts.ready.then(()=>{fit();links();bus()}),D.fonts.addEventListener('loadingdone',()=>setTimeout(()=>{fit();links();bus()},30)));
window.__ch={render,hero:HERO.n,open:OPEN&&OPEN.n,set:n=>{shown=n;render()}};
})();
