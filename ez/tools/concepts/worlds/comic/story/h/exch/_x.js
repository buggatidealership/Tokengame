/* Round H17 · exch: the exchange building, old school (marble and brass) vs new school (glass and LED).
   Two panels per school: beat 1 (the top's headline panel) and the hand-over into Meet the models carrying the motto
   "They used to call it stock picking. We call it model picking." Three break treatments:
     1 = classic gutter (two keylined panels, an even black gap; the motto as the last frame's two narration captions),
     2 = pasted beats (the panels butt with one shared ink border; the motto in the world: engraved on the lintel / lit on the LED band),
     3 = designed break (no second panel: the ticker itself is the gutter, edge to edge; the motto crawls on it).
   window.__X = 'O1'|'O2'|'O3'|'N1'|'N2'|'N3'. Laid over the built v46-live-x2plus.html: its hero and film-bill section are hidden
   (beats 2 and 3 are top1/top2's job); the new top is placed before the hero, so the standings (Meet the models) follow.
   Every live word sits on a surface the painting left blank (an svg mapped onto the painted quad with one matrix3d), or in a caption box.
   Data: ROUNDS (newest graded round), MODELS, __x2pPnl (rank by P&L). */
(function(){
const D=document,TK=window.__X||'O1',S=TK[0],K=TK[1],IMG='tools/concepts/worlds/comic/story/h/exch/img/';
if(!D.getElementById('x-fonts')){const l=D.createElement('link');l.id='x-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bangers&family=Shantell+Sans:wght@600;700&family=Cinzel:wght@700;900&family=DotGothic16&display=block';D.head.appendChild(l)}
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---------- live data ---------- */
const R=window.ROUNDS||[],G=R.filter(r=>r.a!=null&&r.out),last=G[G.length-1];
const A=window.__x2pPnl().A,rank=Object.keys(A).sort((a,b)=>A[b].bal-A[a].bal),lead=rank[0],MD=window.MODELS||{};
const calls=last.calls.map(([m,c])=>{const up=/^UP/i.test(c),v=(c.match(/[\d.]+/)||[''])[0];return {m,up,v,ok:up===(last.a>0)}});
const mv=last.out,mvUp=last.a>0,co=last.co,tick=last.ticker;
const UPC='#3ee07f',DNC='#ff5148',CR='#f8f0d9',GD='#ffd21f';
const LED=S==='N';
/* a model's mark; on dark glass/slate the black marks (GPT, Grok) print in the surface's light ink */
const mark=(m,x,y,s,col)=>{const M=MD[m]||{},c=col||(/^#(0|1)/.test(M.c||'')||m==='GPT'?CR:M.c);return `<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 24 24"><path d="${M.d||''}" fill="${c}"/></svg>`};
const T=(x,y,s,t,o={})=>`<text x="${x}" y="${y}" font-size="${s}" ${o.a?`text-anchor="${o.a}"`:''} fill="${o.c||CR}" class="${o.cls||''}" ${o.ls?`letter-spacing="${o.ls}"`:''}>${esc(t)}</text>`;
const F=LED?'x-led':'x-chalk';
/* ---------- homography rect -> quad (from top1) ---------- */
function m3d(w,h,q){const s=[[0,0],[w,0],[w,h],[0,h]],M=[],B=[];
  for(let i=0;i<4;i++){const[x,y]=s[i],[u,v]=q[i];M.push([x,y,1,0,0,0,-u*x,-u*y]);B.push(u);M.push([0,0,0,x,y,1,-v*x,-v*y]);B.push(v)}
  const n=8;for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(M[r][c])>Math.abs(M[p][c]))p=r;[M[c],M[p]]=[M[p],M[c]];[B[c],B[p]]=[B[p],B[c]];
    for(let r=0;r<n;r++)if(r!==c){const f=M[r][c]/M[c][c];for(let k=c;k<n;k++)M[r][k]-=f*M[c][k];B[r]-=f*B[c]}}
  const X=B.map((b,i)=>b/M[i][i]);const[a,b,c,d,e,f,g,hh]=X;return `matrix3d(${a},${d},0,${g},${b},${e},0,${hh},0,0,1,0,${c},${f},0,1)`}
const rq=(x1,y1,x2,y2)=>[[x1,y1],[x2,y1],[x2,y2],[x1,y2]];
function surf(q,draw,cls){const L=(p,r)=>Math.hypot(p[0]-r[0],p[1]-r[1]),bw=(L(q[0],q[1])+L(q[3],q[2]))/2,bh=(L(q[0],q[3])+L(q[1],q[2]))/2;
  return `<div class="x-sf ${cls||''}" data-q='${JSON.stringify(q)}' data-bw="${bw}" data-bh="${bh}"><svg viewBox="0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}" width="${bw}" height="${bh}" aria-hidden="true">${draw(bw,bh)}</svg></div>`}
function pic(src,iw,ih,surfs,cls,cr){cr=cr||[0,0,iw,ih];const[cx,cy,cw,ch]=cr;
  return `<div class="x-pic ${cls||''}" data-iw="${cw}" data-cx="${cx}" data-cy="${cy}" style="aspect-ratio:${cw}/${ch}"><img src="${IMG+src}" alt="" draggable="false" style="width:${(iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%">${surfs.join('')}</div>`}
function place(root){root.querySelectorAll('.x-pic').forEach(p=>{const k=p.clientWidth/+p.dataset.iw,cx=+p.dataset.cx,cy=+p.dataset.cy;
  p.querySelectorAll('.x-sf').forEach(s=>{const q=JSON.parse(s.dataset.q).map(([x,y])=>[(x-cx)*k,(y-cy)*k]);s.style.transform=m3d(+s.dataset.bw,+s.dataset.bh,q)})})}
const fit=(t,w,max,k)=>Math.min(max,w/(String(t).length*(k||.5)));
/* ---------- beat 1: the board (slate rows / LED rows) ---------- */
const head=(w,h)=>{const t1=`${tick} · ${co}`,t2=(mvUp?'▲':'▼')+mv.replace(/^[+-]/,'');const fs=Math.min(h*.42,w*.06,fit(t1,w*.56,99,LED?.62:.47));
  return T(w*.04,h*.36+fs*.36,fs*.62,'LAST CLOSE',{c:LED?'#ffb21a':'#d8c9a0',cls:F})+T(w*.04,h*.72+fs*.36,fs,t1.toUpperCase().slice(0,26),{cls:F})+T(w*.96,h*.5+fs*.5,fs*1.35,t2,{a:'end',c:mvUp?UPC:DNC,cls:F+' x-glow'})};
const row=c=>(w,h)=>{const fs=Math.min(h*.52,w*.075),y=h*.5+fs*.36;
  return mark(c.m,w*.035,h*.5-fs*.6,fs*1.2)+T(w*.035+fs*1.5,y,fs,NM[c.m].toUpperCase(),{cls:F})
   +T(w*.6,y,fs,(c.up?'▲':'▼')+c.v+'%',{a:'end',c:c.up?UPC:DNC,cls:F+' x-glow'})
   +T(w*.965,y,fs*.86,c.ok?'✓ RIGHT':'✗ WRONG',{a:'end',c:c.ok?UPC:DNC,cls:F})};
/* quads, painting px */
const Q={
 'O-t':{img:'o-hero-t-2k.jpg',iw:768,ih:1024,hd:rq(194,197,568,287),rows:[rq(156,324,608,379),rq(157,403,604,460),rq(158,485,608,541),rq(156,568,611,623)]},
 'O-w':{img:'o-hero-w-2k.jpg',iw:1280,ih:720,rows:[rq(406,168,874,240),rq(406,264,874,319),rq(406,331,874,383),rq(406,394,874,447)]},
 'N-t':{img:'n-hero-t-2k.jpg',iw:768,ih:1024,hd:rq(142,238,630,318),rows:[rq(142,326,630,399),rq(142,407,630,484),rq(142,492,630,569),rq(142,577,630,640)]},
 'N-w':{img:'n-hero-w-2k.jpg',iw:1280,ih:720,rows:[rq(368,122,905,198),rq(375,224,898,280),rq(375,300,898,355),rq(375,375,898,432)]}};
function beat1(wide){const P=Q[S+'-'+(wide?'w':'t')],cls=LED?'x-ledg':'x-slate';
  const ss=[...(P.hd?[surf(P.hd,head,cls)]:[]),...calls.map((c,i)=>surf(P.rows[i],row(c),cls))];
  const capt=wide?`<div class="x-cap x-cap-tl">R${last.n} · ${esc(co)} · closed <b style="color:${mvUp?UPC:DNC}">${esc(mv)}</b></div>`:'';
  return `<div class="x-ink"><div class="x-art">${capt}${pic(P.img,P.iw,P.ih,ss,'x-hero')}</div></div>`}
/* ---------- the hand-over ---------- */
const MOT=['They used to call it stock picking.','We call it model picking.'];
/* the four chips' lids carry the four marks in P&L order; the leader's lid lit gold (like the bet's chip) */
const lid=(m,i)=>(w,h)=>{const s=Math.min(w,h);return (i===0?`<rect x="1" y="1" width="${w-2}" height="${h-2}" rx="${s*.06}" fill="none" stroke="${GD}" stroke-width="${s*.05}" class="x-lead"/><rect x="${w*.08}" y="${h*.08}" width="${w*.84}" height="${h*.84}" fill="rgba(255,200,60,.28)"/>`:'')+mark(m,w/2-s*.3,h/2-s*.3,s*.6)};
const LIDS={'o-arch':[rq(196,628,257,680),rq(302,628,364,680),rq(406,628,467,680),rq(512,628,572,680)],
 'o-arch-w':[rq(413,404,476,454),rq(540,406,604,454),rq(671,405,734,454),rq(800,405,864,454)],
 'n-aisle':[rq(281,583,315,613),rq(340,584,372,613),rq(399,583,431,613),rq(457,584,491,613)],
 'n-aisle-w':[rq(513,467,555,501),rq(582,467,623,501),rq(651,467,692,501),rq(721,467,762,502)]};
const SIGN={'o-arch':rq(78,116,694,210),'o-arch-w':rq(322,47,957,134),'n-aisle':rq(88,132,686,241),'n-aisle-w':rq(318,95,955,152)};
const signDraw=(w,h)=>{if(LED){const f1=fit(MOT[0].toUpperCase(),w*.92,h*.36,.62);return T(w/2,h*.43,f1,MOT[0].toUpperCase(),{a:'middle',c:'#ffb21a',cls:'x-led x-ledglow'})+T(w/2,h*.43+f1*1.25,f1,MOT[1].toUpperCase(),{a:'middle',c:CR,cls:'x-led x-ledglow'})}
  const f1=fit(MOT[0].toUpperCase(),w*.92,h*.32,.66);return T(w/2,h*.42,f1,MOT[0].toUpperCase(),{a:'middle',c:'#e8c56a',cls:'x-eng'})+T(w/2,h*.42+f1*1.35,f1*1.12,MOT[1].toUpperCase(),{a:'middle',c:GD,cls:'x-eng'})};
function hand(wide){
  if(K==='1'){const im=S==='O'?'o-still.jpg':'n-still.jpg';
    const lq=S==='O'?[[660,385],[848,378],[858,570],[670,575]]:[[671,358],[755,376],[734,499],[650,477]];
    const four=(w,h)=>{const s=Math.min(w,h)*.38;return rank.map((m,i)=>mark(m,w*(i%2?.72:.28)-s/2,h*(i<2?.28:.72)-s/2,s)).join('')};
    const cr=wide?[0,230,1024,576]:null;
    return `<div class="x-ink x-hand"><div class="x-art"><div class="x-cap x-cap-tl">${MOT[0]}</div>${pic(im,1024,1024,[surf(lq,four,'x-ledg')],'',cr)}<div class="x-cap x-cap-br">${MOT[1]}</div></div></div>`}
  if(K==='2'){const k=(S==='O'?'o-arch':'n-aisle')+(wide?'-w':''),iw=wide?1280:768,ih=wide?720:1024;
    const ss=[surf(SIGN[k],signDraw,LED?'x-ledg':'x-stone'),...rank.map((m,i)=>surf(LIDS[k][i],lid(m,i),'x-ledg'))];
    return `<div class="x-ink x-hand x-paste"><div class="x-art">${pic(k+(wide?'-2k':'')+'.jpg',iw,ih,ss)}</div></div>`}
  /* 3: the ticker is the gutter */
  const im=S==='O'?'o-tape.jpg':'n-band.jpg',txt=(MOT.join('  ·  ')+'  ·  ').toUpperCase();
  return `<div class="x-strip x-strip-${S}" aria-label="${esc(MOT.join(' '))}"><img src="${IMG+im}" alt=""><div class="x-crawl"><span>${esc(txt.repeat(3))}</span></div></div>`}
/* ---------- mount ---------- */
const H1=['Four AIs call earnings.','The market keeps score.'];
const lt=s=>esc(s).replace(/AIs/g,'AI<span class="x-lc">s</span>');
const main=D.querySelector('main'),hero0=D.querySelector('section.hero'),bet0=D.querySelector('section.x2o-bet');
const sec=D.createElement('section');sec.className=`x x-${S} x-k${K}`;sec.setAttribute('aria-label','What EZ does');
function build(){const wide=innerWidth>=900;
  sec.innerHTML=`<div class="x-b1">${beat1(wide)}<h1 class="x-h1">${H1.map((l,i)=>`<span class="x-hw x-hw${i}">${lt(l)}</span>`).join('')}</h1></div>
   <div class="x-note" aria-hidden="true">beats 2 and 3 (how a round works, the film) sit here on the real page</div>
   <div class="x-b4">${hand(wide)}</div>`;
  requestAnimationFrame(()=>place(sec))}
if(!D.getElementById('xChalk')){const d=D.createElement('div');d.innerHTML='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="xChalk" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" result="d"/><feComponentTransfer in="n" result="m"><feFuncA type="linear" slope="-1.6" intercept="1.45"/></feComponentTransfer><feComposite in="d" in2="m" operator="in"/></filter></svg>';D.body.appendChild(d.firstChild)}
if(hero0)hero0.before(sec);else main.prepend(sec);
[hero0,bet0].forEach(s=>s&&(s.style.display='none'));
build();let lw=innerWidth;addEventListener('resize',()=>{if((innerWidth>=900)!==(lw>=900)){lw=innerWidth;build()}else place(sec)});
D.fonts&&D.fonts.ready.then(()=>place(sec));
/* the crawl runs once the strip is on screen (a ticker reading out); still with reduced motion */
const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('x-run',e.isIntersecting)),{threshold:.3});
setTimeout(()=>sec.querySelectorAll('.x-strip').forEach(s=>io.observe(s)),50);
window.__x={place:()=>place(sec),data:{last:last.n,lead}};
D.documentElement.classList.add('x-ready');
})();
