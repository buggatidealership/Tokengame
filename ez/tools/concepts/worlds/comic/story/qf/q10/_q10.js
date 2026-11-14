/* q10 "The issue, page by page": one round is one issue of EZ Comics. Round 66 = No. 66.
   Page 1 the cover (Locked: the four calls are the cover lines), page 2 the splash (The close: the bell, then the move),
   page 3 the interior grid (Graded: one panel per AI cut from the film's own art, a stamp each, the money on the call),
   page 4 into the long box (Round 66 joins the record; every round stays here). One tap turns one page.
   Every number comes from the page's globals: ROUNDS, MODELS, CO_LOGOS, __x2pPnl(). */
(function(){'use strict';
const D=document,H=D.documentElement,ID='q10',RN=66;
try{
if(D.getElementById(ID))return;
const fl=D.createElement('link');fl.rel='stylesheet';
fl.href='https://fonts.googleapis.com/css2?family=Bangers&family=Shantell+Sans:wght@600;800&family=Oswald:wght@500;700&display=swap';D.head.appendChild(fl);
const ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const md=s=>{const [m,d]=String(s).split('/').map(Number);return MON[m-1]+' '+d};
const $k=v=>'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pm=v=>(v>=0?'+':'−')+$k(v);
const pc=v=>Math.abs(v).toFixed(2).replace(/\.?0+$/,'')+'%';
const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
const sfx=a=>{const x=Math.abs(a),up=a>0;if(x<1.5)return up?'Blip!':'Tick!';if(x<4)return up?'Pop!':'Thud!';if(x<8)return up?'Zoom!':'Crash!';return up?'Ka-pow!':'Ka-boom!'};
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const A=window.__qArt||{};
const r=ROUNDS.find(x=>+x.n===RN),P=window.__x2pPnl().A;
const co=(window.TICKERS||{})[r.ticker]||r.co||r.ticker,CO=co+' ('+r.ticker+')';
const L=(window.CO_LOGOS||{})[r.ticker];
const C={};(r.calls||[]).forEach(c=>{C[c[0]]={...call(c[1]),off:+c[2]}});
const up=r.a>0,right=m=>C[m]&&C[m].up===up,win=String(r.win||'').split(' & ').filter(m=>MODELS[m]);
const per=m=>((P[m].per||{})[RN]||{}).v;
const lead=ORDER.slice().sort((a,b)=>P[b].pnl-P[a].pnl)[0];
const nUp=ORDER.filter(m=>C[m]&&C[m].up).length,nDn=ORDER.filter(m=>C[m]&&!C[m].up).length;
const nGr=ROUNDS.length;

function face(m,cls){const M=MODELS[m];return `<i class="q10-fc ${cls||''}" style="--fb:${M.bg}" aria-hidden="true"><svg viewBox="-3 -3 30 30"><path d="${M.d}" fill="${M.fg}"${M.fr?` fill-rule="${M.fr}"`:''}/>${M.dot?`<path d="${M.dot}" fill="${M.dotc||M.fg}"/>`:''}</svg></i>`}
const arrow=u=>`<svg class="q10-ar ${u?'q10-up':'q10-dn'}" viewBox="0 0 12 12" aria-hidden="true"><path d="${u?'M6 1 11 10H1Z':'M6 11 1 2h10Z'}" stroke="#15121a" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
const logo=cls=>L?`<img class="q10-lg ${cls||''}" src="media/${L.f}" alt="" decoding="async">`:'';
function upc(n){let s='',x=2,seed=n*7919+13;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
  while(x<58){const w=rnd()<.5?.8:1.6;if(rnd()<.62)s+=`<rect x="${x.toFixed(1)}" y="2" width="${w}" height="${x<5||x>55||(x>28&&x<31)?24:21}" fill="#15121a"/>`;x+=w+.6}return s}
const bell=`<svg class="q10-bell" viewBox="0 0 64 64" aria-hidden="true"><g stroke="#15121a" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M14 8 6 2M50 8l8-6M8 22H1M56 22h7" fill="none"/><path class="q10-bell-b" d="M32 6c-12 0-17 10-17 22v10l-6 9h46l-6-9V28C49 16 44 6 32 6Z" fill="#ffd23f"/><circle cx="32" cy="52" r="5" fill="#e0322a"/><path d="M22 20c2-5 5-7 9-8" fill="none" stroke="#fff7d0"/></g></svg>`;

/* cover lines: each AI says its call above or below the art, on the side its plaque sits (GPT top left, Claude top right, Kimi and Grok below) */
const say=(m,side)=>{const c=C[m];return `<li class="q10-say q10-s-${side}" data-ai="${m}">${face(m,'q10-f-s')}<span class="q10-bal"><b>${NM[m]}</b> ${c.up?'Up':'Down'} ${pc(c.v)} ${arrow(c.up)}</span></li>`};

const cover=`<article class="q10-pg q10-p1" data-pg="1" aria-label="Page 1, the cover: the calls are locked">
  <div class="q10-td" data-panel="trade dress">
    <div class="q10-cbox"><span class="q10-cb-pub">EZ<small>comics</small></span><span class="q10-cb-heads">${ORDER.map(m=>face(m,'q10-f-xs')).join('')}</span><span class="q10-cb-no">No.<b>${RN}</b></span><span class="q10-cb-pr">Free</span></div>
    <div class="q10-mast"><span class="q10-mast-s">Season 1 · Round ${RN}</span><span class="q10-mast-a">Earnings</span><span class="q10-mast-b"><i>Z</i>eason</span></div>
    <div class="q10-seal q10-seal-lock" aria-label="Calls locked ${md(r.called)}, before the report"><small>Locked</small><b>${md(r.called)}</b><small>before the report</small></div>
  </div>
  <div class="q10-cv-co"><span class="q10-cv-ttl">${CO}</span>${logo('q10-lg-cv')}</div>
  <div class="q10-cv" data-panel="cover art">
    <ul class="q10-lines q10-lines-t">${say('GPT','l')}${say('CLAUDE','r')}</ul>
    <img class="q10-art" src="${A.lock||''}" alt="Round 66 film, the four calls on the board, the market slot empty" data-subject=".16,.08,.86,.74">
    <ul class="q10-lines q10-lines-b">${say('KIMI','l')}${say('GROK','r')}</ul>
  </div>
  <div class="q10-cv-ft" data-panel="cover foot">
    <p class="q10-cvl"><span>${nUp} say up.</span> <span class="q10-cvl-b">${nDn} say down.</span></p>
    <div class="q10-upc" aria-hidden="true"><svg viewBox="0 0 60 30">${upc(RN)}</svg><small>0 ${String(RN).padStart(3,'0')} 1</small></div>
  </div>
</article>`;

const splash=`<article class="q10-pg q10-p2" data-pg="2" aria-label="Page 2: the close">
  <div class="q10-bh" data-panel="bell">${bell}<p class="q10-bh-t"><span class="q10-cap">${md(r.resolves)}. The London close.</span><span class="q10-ring">Brrring!</span></p></div>
  <div class="q10-sp" data-panel="splash art"><img class="q10-art q10-art-sp" src="${A.close||''}" alt="Round 66 film, the market slot lit with plus 2.06 percent" data-subject=".16,.08,.86,.74"></div>
  <div class="q10-mv ${up?'q10-mv-up':'q10-mv-dn'}" data-panel="the move"><span class="q10-pop">${sfx(r.a)}</span><span class="q10-mv-t">${arrow(up)}<span>${CO} ${up?'rose':'fell'} <b>${pc(r.a)}</b></span></span></div>
</article>`;

const grade=m=>{const c=C[m],ok=right(m),w=win.includes(m),v=per(m);
  return `<li class="q10-gp ${ok?'q10-ok':'q10-no'}${w?' q10-win':''}" data-panel="${NM[m]}">
    <div class="q10-gp-a"><img class="q10-art" src="${A['p_'+m]||''}" alt="${NM[m]}'s plaque in the film, ${c.up?'up':'down'} ${pc(c.v)}" data-subject=".3,.12,.7,.88"></div>
    <div class="q10-gp-s"><span class="q10-stamp">${ok?'Pass':'Fail'}</span>${w?`<span class="q10-wn">Winner \u00b7 ${pc(c.off)} off</span>`:''}${face(m,'q10-f-s')}<span class="q10-gp-n">${NM[m]}</span>
      <span class="q10-gp-v ${v>=0?'q10-pv':'q10-nv'}">${pm(v)}<small>on the call</small></span></div>
  </li>`};
const inside=`<article class="q10-pg q10-p3" data-pg="3" aria-label="Page 3: graded">
  <div class="q10-ih" data-panel="caption"><span class="q10-cap">The close grades every call. ${up?'Up':'Down'} was right.</span>
    <div class="q10-seal q10-seal-ok" aria-label="Approved by the close"><small>Approved</small><b>by the</b><small>close</small></div></div>
  <ol class="q10-grid">${ORDER.map(grade).join('')}</ol>
</article>`;

/* page 4: the bagged issue drops into its slot in the long box, between its neighbours */
const byN=ROUNDS.slice().sort((a,b)=>a.n-b.n),ix=byN.findIndex(x=>+x.n===RN);
const nb=byN.slice(Math.max(0,ix-4),ix+5);
const spine=x=>{const l=(window.CO_LOGOS||{})[x.ticker],nm=(window.TICKERS||{})[x.ticker]||x.co||x.ticker;
  return `<li class="q10-sn ${x.a>0?'q10-sn-u':'q10-sn-d'}"><b>No.${x.n}</b>${l?`<img class="q10-lg q10-lg-sn${l.dark?' q10-lg-dk':''}" src="media/${l.f}" alt="">`:''}<span class="q10-sn-t">${nm} (${x.ticker})</span><em>${x.a>0?'+':'−'}${pc(x.a)}</em></li>`};
const box=`<article class="q10-pg q10-p4" data-pg="4" aria-label="Page 4: round 66 joins the record">
  <div class="q10-bx-h" data-panel="caption"><span class="q10-cap">Round ${RN} joins the record. Every round stays here.</span></div>
  <div class="q10-box" data-panel="long box">
    <div class="q10-bag" aria-hidden="true"><img src="${A.crown||''}" alt=""><i class="q10-bag-tape"></i><span class="q10-bag-no">No.${RN}</span></div>
    <ol class="q10-spines">${nb.map(x=>+x.n===RN?'<li class="q10-slot" aria-label="Round 66 slides in here"></li>':spine(x)).join('')}</ol>
    <p class="q10-box-lb"><span>EZ Comics · Season 1</span><b>${nGr} rounds graded</b></p>
  </div>
  <p class="q10-gt">${face(lead,'q10-f-m')}<span><b>${NM[lead]}</b> holds the golden ticket</span><small>Top P&amp;L after ${nGr} rounds</small></p>
  <button class="q10-open" type="button" data-panel="next section"><span>Every round so far</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v11M3 8l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
</article>`;

const tabs=['Cover','The close','Graded','The record'];
const root=D.createElement('div');root.setAttribute('role','region');root.id=ID;root.setAttribute('aria-label','One round, start to finish: round 66, '+CO);
root.innerHTML=`<div class="q10-book">${cover}${splash}${inside}${box}</div>
  <nav class="q10-nav" aria-label="Pages"><ol>${tabs.map((t,i)=>`<li><button type="button" data-go="${i+1}"><b>${i+1}</b>${t}</button></li>`).join('')}</ol>
  <button class="q10-ear" type="button" data-next><span>Turn the page</span></button></nav>`;
const book=D.getElementById('wc-book');book.parentNode.insertBefore(root,book);H.classList.add('q10-on');
root.querySelectorAll('img.q10-lg').forEach(im=>{const f=()=>{if(im.naturalHeight){const cs=getComputedStyle(im);im.style.maxHeight=Math.min(parseFloat(cs.maxHeight)||999,im.naturalHeight/2)+'px';im.style.maxWidth=Math.min(parseFloat(cs.maxWidth)||999,im.naturalWidth/2)+'px'}};im.complete?f():im.addEventListener('load',f,{once:true})});

let beat=1;
const desk=()=>innerWidth>=1000;
function go(n,instant){beat=Math.max(1,Math.min(4,n));root.dataset.beat=beat;
  const pg=[...root.querySelectorAll('.q10-pg')];
  pg.forEach(p=>{const k=+p.dataset.pg;const shown=k===beat||(desk()&&k===beat-1)||(desk()&&beat===1&&k===2);p.dataset.shown=shown?'1':'0';
    p.classList.toggle('q10-cur',k===beat);p.classList.toggle('q10-prev',desk()&&k===beat-1);p.classList.toggle('q10-peek',desk()&&beat===1&&k===2)});
  root.querySelectorAll('[data-go]').forEach(b=>b.setAttribute('aria-current',+b.dataset.go===beat?'page':'false'));
  const ear=root.querySelector('.q10-ear span');ear.textContent=beat<4?'Turn the page':'Back to the cover';
  root.classList.toggle('q10-anim',!instant&&!RM());
  const cur=pg[beat-1];cur.classList.remove('q10-play');if(!instant&&!RM()){void cur.offsetWidth;cur.classList.add('q10-play')}else cur.classList.add('q10-done')}
root.addEventListener('click',e=>{const g=e.target.closest('[data-go]'),n=e.target.closest('[data-next]');if(g)go(+g.dataset.go);else if(n)go(beat<4?beat+1:1)});
addEventListener('resize',()=>go(beat,true));
window.__qGo=go;go(1,true);H.classList.add(ID+'-ready');
}catch(e){window.__qErr=e;H.classList.add(ID+'-ready')}
})();
