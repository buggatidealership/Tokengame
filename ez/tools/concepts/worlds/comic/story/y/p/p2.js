/* P2 · "Four covers" (level 5, all in, on Meet the models) and "Issue covers" (level 3, calm, on Every round so far).
   Meet the models: each model is its own comic cover on its flag: the name as the masthead, the Season 1 spine with its rank in a burst,
   the face and the P&L inside the big action burst, right way on a tilted slab, the best call in a corner burst, the last five along the foot.
   Every round so far: each round an issue cover: the move is the masthead on a green or red band, the art whole under it, the round number
   on the band's left, the company and the winner along the foot. No burst per tile, so the grid keeps its hierarchy. */
(function(){const H=document.documentElement,P=POP,INK=P.INK,TAKE='p2';
function el(h){const t=document.createElement('template');t.innerHTML=h.trim();return t.content.firstChild}
const ROLES=['WE BET ON ITS CALL','IN THE HUNT','IN THE HUNT','LAST PLACE'];
const tick=s=>`<i class="pp2-t ${s==='W'?'pp2-tw':'pp2-tl'}"><svg viewBox="0 0 20 20" aria-hidden="true">${s==='W'?'<path d="M4.5 10.5l3.8 3.8L15.8 6" fill="none" stroke="#0d0b10" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 10.5l3.8 3.8L15.8 6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M5.5 5.5l9 9M14.5 5.5l-9 9" fill="none" stroke="#0d0b10" stroke-width="5.4" stroke-linecap="round"/><path d="M5.5 5.5l9 9M14.5 5.5l-9 9" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>'}</svg></i>`;

/* ---------------- Meet the models, level 5 ---------------- */
function chars(D){const sec=document.querySelector('.wc-chars');if(!sec)return;const old=sec.querySelector('.wc-ch-grid'),h2=sec.querySelector('h2');
  sec.querySelectorAll('.pp2-ttl,.pp2-grid').forEach(n=>n.remove());const st=(old.getAttribute('style')||'').replace(/display:\s*none;?/,'');
  sec.classList.add('pp-mod','pp2-mm');h2.classList.add('pp-sr');old.style.display='none';
  const W=sec.clientWidth-24,ttl=el(`<div class="pp-ttl pp2-ttl" aria-hidden="true"></div>`);
  ttl.insertAdjacentHTML('beforeend',`<span class="pp2-stars">${'<svg viewBox="0 0 40 40">'+P.star(20,20,17)+'</svg>'}${'<svg viewBox="0 0 40 40">'+P.star(20,20,17,'#3a8bff')+'</svg>'}</span>`);
  ttl.insertAdjacentHTML('beforeend',P.ext('MEET THE',{size:46,fill:'gold',shade:'#6b0626',max:W*.72,rot:-4,depth:6}));
  ttl.insertAdjacentHTML('beforeend',P.ext('MODELS',{size:80,fill:['#bff4ff','#3ad0ff','#0a7bd6'],shade:'#0b2366',max:W*.9,rot:-4,depth:9}));
  ttl.insertAdjacentHTML('beforeend',`<p class="pp-tag pp2-tag">Not the Instagram kind. Ranked by pretend $100,000 accounts.</p>`);
  sec.insertBefore(ttl,old);
  const grid=el(`<div class="pp2-grid" style="${st}"></div>`);sec.insertBefore(grid,old);
  D.models.forEach((x,i)=>{const fl=old.querySelector(`article[data-m="${x.m}"] .wc-flg`);
    const c=el(`<article class="pp2-c pp2-r${i+1}" data-m="${x.m}"><div class="pp2-fl"></div><div class="pp2-spine"><span class="pp2-rkb"></span><span class="pp2-adm"></span></div>
      <div class="pp2-body" aria-hidden="true"><div class="pp2-mast"><span class="pp2-name"></span><span class="pp2-ver">${P.esc(x.ver)}</span></div>
      <div class="pp2-hero"><span class="pp2-hb"></span><span class="pp2-role"></span><span class="pp2-coin"></span><span class="pp2-lab">Current P&amp;L</span><span class="pp2-plv"></span></div>
      <div class="pp2-facts"><div class="pp2-rw"><span class="pp2-l">Right way</span><span class="pp2-rwv"></span></div><div class="pp2-best"><span class="pp2-bb"></span><span class="pp2-btx"><span class="pp2-l">Best call</span><span class="pp2-bv"></span><span class="pp2-bc"></span></span></div></div>
      <div class="pp2-foot"><span class="pp2-tiles">${x.last5.map(tick).join('')}</span><span class="pp2-l5">Last 5</span></div></div></article>`);
    if(fl)c.querySelector('.pp2-fl').appendChild(fl.cloneNode(true));grid.appendChild(c)});
  [...grid.children].forEach((c,i)=>{const x=D.models[i],bw=c.querySelector('.pp2-body').clientWidth,sm=bw<250;const mc=P.mcol(x.m);
    c.querySelector('.pp2-rkb').innerHTML=P.burstSvg(sm?62:68,sm?62:68,{c1:i===0?'#ffd21f':'#ff3a6e',c2:i===0?'#fff3a0':'#ff8fb0',n:10,seed:11+i,dp:3})+P.ext('#'+(i+1),{size:sm?26:30,fill:i===0?'red':'gold',shade:i===0?'#5e0703':'#6b0626',depth:3,cls:'pp2-rk'});
    c.querySelector('.pp2-adm').innerHTML=P.ext(i===0?'GOLDEN TICKET':'SEASON 1',{font:'Bangers',size:sm?14:16,fill:i===0?'gold':'cream',shade:'#3d0a07',depth:2,sw:2.4,hl:false});
    const nf=x.m==='GROK'?['#a49eae','#3a3540','#15121a']:[P.lighten(mc,.6),mc,P.shade(mc,.7)];
    c.querySelector('.pp2-name').innerHTML=P.ext(x.name.toUpperCase(),{size:sm?60:84,fill:nf,shade:x.m==='GROK'?'#000':P.shade(mc,.38),max:bw-8,depth:8,rot:-4});
    c.querySelector('.pp2-role').innerHTML=P.ext(ROLES[i],{font:'Bangers',size:sm?15:17,fill:i===0?'gold':i===3?'red':'white',shade:'#3d0a07',depth:2,sw:2.6,hl:false,max:bw*.8});
    const hb=c.querySelector('.pp2-hero'),hw=hb.clientWidth,hh=hb.clientHeight;
    c.querySelector('.pp2-hb').innerHTML=P.burstSvg(hw,hh,{c1:i===0?'#ffd21f':'#fff8e6',c2:i===0?'#ffe25a':'#fff8e6',c3:i===0?'#fff3a0':null,n:13,k:.8,seed:7+i*5,dp:7});
    c.querySelector('.pp2-coin').innerHTML=P.coin(x.m,sm?64:74,{holo:i===0,dp:5});
    const up=x.pnl>=0;c.querySelector('.pp2-plv').innerHTML=P.ext(P.pm(x.pnl),{size:sm?36:42,fill:up?'green':'red',shade:up?'#053b20':'#5e0703',max:hw*.86,depth:6});
    P.countUp(c.querySelector('.pp2-plv svg'),Math.abs(x.pnl),up?'+':'−');
    c.querySelector('.pp2-rwv').innerHTML=P.ext(`${x.W} OF ${x.tot}`,{size:sm?22:26,fill:'gold',shade:'#0b2366',depth:4});
    const b=x.best,bu=b.v>=0,bb=c.querySelector('.pp2-best');
    c.querySelector('.pp2-bb').innerHTML=P.burstSvg(bb.clientWidth,bb.clientHeight,{c1:'#ff3a31',c2:'#ffd21f',n:11,k:.8,seed:3+i,dp:5});
    c.querySelector('.pp2-bv').innerHTML=P.ext(P.pm(b.v),{size:sm?17:20,fill:bu?'green':'red',shade:bu?'#053b20':'#5e0703',depth:3,max:bb.clientWidth*.66});
    c.querySelector('.pp2-bc').textContent=`${b.r.co} (${b.r.ticker})`;
    c.insertAdjacentHTML('afterbegin',`<p class="pp-sr">#${i+1} ${x.name}, ${P.esc(x.ver)}. ${ROLES[i].toLowerCase()}. Current P&amp;L ${P.pm(x.pnl)}. Right way on ${x.W} of ${x.tot} calls. Highest P&amp;L ${P.pm(b.v)} on ${P.esc(b.r.co)}. Last five: ${x.last5.map(s=>s==='W'?'right':'wrong').join(', ')}.</p>`)})}

/* ---------------- Every round so far, level 3 ---------------- */
function season(D){const sec=document.querySelector('.wc-season');if(!sec)return;const h2=sec.querySelector('h2'),bis=sec.querySelector('.wc-bis'),more=sec.querySelector('.wc-more');
  sec.querySelectorAll('.pp2-ttl').forEach(n=>n.remove());sec.classList.add('pp-mod','pp2-ms');h2.classList.add('pp-sr');
  const W=sec.clientWidth-24,ttl=el(`<div class="pp-ttl pp2-ttl pp2-ttls" aria-hidden="true"></div>`);
  ttl.insertAdjacentHTML('beforeend',P.ext('EVERY ROUND SO FAR',{size:46,fill:'red',shade:'#5e0703',max:W*.98,rot:-2,depth:6}));
  ttl.insertAdjacentHTML('beforeend',`<p class="pp-tag pp2-tags">Newest first. Tap one to open its graded card.</p>`);sec.insertBefore(ttl,bis);
  bis.classList.add('pp2-bis');const RR={};D.rounds.forEach(r=>RR[r.n]=r);
  bis.querySelectorAll('.wc-bi').forEach(a=>{a.querySelectorAll('.pp2-band,.pp2-ft').forEach(n=>n.remove());const r=RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r)return;a.classList.add('pp2-bi');
    const up=r.a>0;a.classList.toggle('pp2-up',up);a.classList.toggle('pp2-dn',!up);
    a.insertAdjacentHTML('afterbegin',`<span class="pp2-band" data-n="${r.n}"><span class="pp2-no"></span><span class="pp2-mv"></span></span>`);
    a.insertAdjacentHTML('beforeend',`<span class="pp2-ft" data-n="${r.n}"><span class="pp2-co">${P.esc(r.co)} <small>(${P.esc(r.ticker)})</small></span><span class="pp2-won"></span></span>`)});
  if(more&&!more.dataset.pp2){more.dataset.pp2=1;more.classList.add('pp2-more');more.addEventListener('click',()=>requestAnimationFrame(()=>{fillTiles(RR);depth()}))}
  fillTiles(RR)}
function fillTiles(RR){document.querySelectorAll('.pp2-bis .pp2-band').forEach(s=>{if(s.dataset.ok||!s.offsetParent)return;const r=RR[s.dataset.n],a=s.parentElement,w=a.clientWidth,sm=w<150;s.dataset.ok=1;
  const up=r.a>0,Wn=P.winners(r);
  s.querySelector('.pp2-no').innerHTML='<span class="pp2-noh">#</span>'+r.n;
  s.querySelector('.pp2-mv').innerHTML=P.ext((up?'+':'−')+P.pct(r.a),{size:sm?24:30,fill:'white',shade:up?'#053b20':'#5e0703',depth:4,max:w-(sm?44:54)});
  a.querySelector('.pp2-won').innerHTML=Wn.length?Wn.map(m=>P.coin(m,Wn.length>1?(sm?22:26):(sm?26:30),{dp:2})).join('')+`<b class="pp2-wl">${Wn.length>1?'Tie':'Won'}</b>`
    :`<i class="pp2-nob"><svg viewBox="0 0 20 20"><path d="M5 5l10 10M15 5L5 15" stroke="#0d0b10" stroke-width="6" stroke-linecap="round"/><path d="M5 5l10 10M15 5L5 15" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg></i><b class="pp2-wl">Nobody</b>`})}
function depth(){const X=(sel,dp,sh,o)=>document.querySelectorAll(sel).forEach(n=>n.style.boxShadow=P.xbox(dp,sh,o));
  X('.pp2-mm',8,'#5a0424',{bw:3,cast:5,hl:3});X('.pp2-ms',7,'#8a5200',{bw:3,cast:4,hl:3});
  X('.pp2-c',7,'#2a0616',{bw:2.5,cast:5});X('.pp2-rw',4,'#0b2366',{bw:2,hl:2,lo:2});X('.pp2-t',3,'#3d0a07',{bw:1.5,hl:1.5,lo:2});X('.pp2-foot',3,'#2a0616',{bw:2,hl:1.5,lo:2});
  X('.pp2-bi',4,'#6e3a00',{bw:2.5,cast:3,hl:0,ha:0,la:0})}
function go(){H.classList.add(TAKE+'-on');const D=P.data();chars(D);season(D);depth();
  document.querySelectorAll('.wc-season canvas.sa-gc5').forEach(c=>c.remove());if(window.SA&&SA.paintG)SA.paintG('m3');
  H.classList.add('p2-on','p2-ready')}
let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth===w0)return;w0=innerWidth;clearTimeout(go.t);go.t=setTimeout(()=>{document.querySelectorAll('.pp2-band').forEach(s=>delete s.dataset.ok);go()},250)});
window.Pcheck=s=>s==='chars'?P.check('.wc-chars','.pp2-c'):P.check('.wc-season','.pp2-bi');
P.fonts().then(go).catch(e=>{console.error(e);go()});
})();
