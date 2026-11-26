/* Round H25 · rounds7: "Every round so far" on X2+, four new two-beat takes, each its own world (the section need not stay on the chip).
   Beat 1 = the whole season at a glance; beat 2 = the newest rounds with each film's own frame, readable.
   window.__R7 = 'A' the darkroom   (beat 1 a contact sheet of every round's frame, the winner circled in its colour; beat 2 the newest prints pegged on the line)
                 'B' the tile wall  (beat 1 a mosaic, one glazed tile per round in the winner's colour, the rounds to come unglazed, NVIDIA gold; beat 2 picture tiles with enamel plaques)
                 'C' the trophy case(beat 1 one shelf per model, a cup per round it won, the nobody shelf of knocked-over cups; beat 2 the newest rounds framed with their engraved plates)
                 'D' the desk diary (beat 1 the season as a planner, week by week, each round stamped on the day it closed, NVIDIA circled; beat 2 the newest day pages torn off)
   window.__R7IMG = folder of the paintings (default this concepts folder's img/web/; the drop-in uses media/ with the same flat names).
   Data live: ROUNDS, PENDING, UPCOMING, FILMS, CO_LOGOS, MODELS. Nothing typed. Colours: each model's chip colour (lesson 129). */
(function(){try{
const D=document,TK=window.__R7||'A',IM=window.__R7IMG||'tools/concepts/worlds/comic/story/h/rounds7/img/web/';
const sec=D.getElementById('record');if(!sec)return;const old=sec.querySelector('.r7');if(old)old.remove();
/* what was there (the live take B, or the old carousel) stays built for the round view, out of sight and out of reach */
[...sec.children].forEach(c=>{if(c.classList.contains('r7'))return;if(c.classList.contains('r6')){c.style.display='none';return}
  c.setAttribute('aria-hidden','true');c.inert=true;c.style.cssText+=';position:absolute!important;left:-30000px!important;top:0;width:390px;pointer-events:none'});
sec.style.position='relative';
const G=(window.ROUNDS||[]).filter(r=>r.a!=null&&r.out),NEW=G.slice().reverse();
const FUT=[...(window.PENDING||[]),...(window.UPCOMING||[])],NEXT=FUT[0]||null,LAST=FUT[FUT.length-1]||null;
const MD=window.MODELS||{},ORDER=['GPT','KIMI','CLAUDE','GROK'];
/* the models' chip colours, as Meet the models introduced them (Grok slate, Claude orange, GPT green, Kimi blue) */
const COL={GPT:'#2fa35a',CLAUDE:'#e07a2f',GROK:'#8d9aae',KIMI:'#3f74d8'},DK={GPT:'#14522b',CLAUDE:'#7a3510',GROK:'#3c4452',KIMI:'#173a7e'};
/* the same colours as ink on paper (dark enough to read on cream) */const INKC={GPT:'#16743a',CLAUDE:'#b0501a',GROK:'#475266',KIMI:'#2350a6'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>MD[m]);
const callOf=(r,m)=>(r.calls||[]).find(c=>c[0]===m);
const right=(c,a)=>/^UP/i.test(c)===(a>0);
const tile=n=>`media/tile-r${n}-${(window.FILMS||{})[n]?'f1':'t2'}.jpg`;
const mv=r=>String(r.out).replace(/^-/,'−');
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const dt=s=>{const[m,d,y]=String(s).split('/').map(Number);return new Date(Date.UTC(2000+(y%100),m-1,d))};
const md=s=>{const d=dt(s);return MON[d.getUTCMonth()]+' '+d.getUTCDate()};
const logoF=t=>{const L=(window.CO_LOGOS||{})[t];return L?'media/'+(L.f||L):''};
const cap1=m=>m[0]+m.slice(1).toLowerCase();
const winTxt=r=>{const W=wins(r);return W.length===1?cap1(W[0])+' wins':W.length?W.map(cap1).join(' & ')+' tie':'Nobody wins'};
const nm=r=>`${r.co} (${r.ticker})`;
const aria=r=>`Round ${r.n}, ${r.co} (${r.ticker}), closed ${md(r.resolves)}, moved ${r.out}. ${winTxt(r)}. `+ORDER.map(m=>{const c=callOf(r,m);return c?`${cap1(m)} ${right(c[1],r.a)?'right':'wrong'} way`:''}).filter(Boolean).join(', ')+'. Open the graded card.';
const MK=(m,cls,st)=>`<svg class="r7-mk ${cls||''}" viewBox="0 0 24 24" aria-hidden="true"${st?` style="${st}"`:''}><path d="${(MD[m]||{}).d||''}"/></svg>`;
/* the four AIs in the same order: right way green, wrong way red, no call dim; the winner's mark circled */
const marks=r=>{const W=wins(r);return `<span class="r7-ms">`+ORDER.map(m=>{const c=callOf(r,m);if(!c)return MK(m,'r7-off');const ok=right(c[1],r.a);return `<i class="${W.includes(m)?'r7-w':''}">${MK(m,ok?'r7-up':'r7-dn')}</i>`}).join('')+`</span>`};
const LG=(t,cls,ink)=>{const f=logoF(t);return f?`<img class="${cls||'r7-lg'}" src="${f}" data-ink="${ink||''}" data-t="${esc(t)}" alt="" draggable="false" decoding="async">`:''};
/* a logo printed in one ink, the way the world would carry it (a rubber stamp, a fired decal, an engraving): the file's tile keyed out, white holes kept as holes */
const INK={};function inkSrc(src,col){const k=src+'|'+col;if(INK[k])return INK[k];return INK[k]=new Promise(res=>{const im=new Image();im.onload=()=>{try{const S=160,c=D.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d');const k2=Math.min(S/im.width,S/im.height),w=im.width*k2,h=im.height*k2;x.drawImage(im,(S-w)/2,(S-h)/2,w,h);
  const d=x.getImageData(0,0,S,S),p=d.data,px=i=>[p[i],p[i+1],p[i+2],p[i+3]];const cs=[0,(S-1)*4,(S*(S-1))*4,(S*S-1)*4].map(px);
  /* the tile: the corners of the drawn box opaque and alike */const bx=Math.round((S-w)/2),by=Math.round((S-h)/2),cc=[[bx+1,by+1],[bx+w-2,by+1],[bx+1,by+h-2],[bx+w-2,by+h-2]].map(([u,v])=>px((Math.round(v)*S+Math.round(u))*4));
  const tileC=cc.every(q=>q[3]>200&&Math.abs(q[0]-cc[0][0])+Math.abs(q[1]-cc[0][1])+Math.abs(q[2]-cc[0][2])<40)?cc[0]:null;
  let n=0,wh=0;for(let i=0;i<p.length;i+=4){if(p[i+3]<40)continue;if(tileC&&Math.abs(p[i]-tileC[0])+Math.abs(p[i+1]-tileC[1])+Math.abs(p[i+2]-tileC[2])<70)continue;n++;if(Math.min(p[i],p[i+1],p[i+2])>215)wh++}
  const holes=n&&wh/n<.6;const[R,G2,B]=[1,3,5].map(o=>parseInt(col.slice(o,o+2),16));
  for(let i=0;i<p.length;i+=4){let a=p[i+3];if(tileC&&Math.abs(p[i]-tileC[0])+Math.abs(p[i+1]-tileC[1])+Math.abs(p[i+2]-tileC[2])<70)a=0;if(holes&&Math.min(p[i],p[i+1],p[i+2])>215)a=0;p[i]=R;p[i+1]=G2;p[i+2]=B;p[i+3]=a}
  x.putImageData(d,0,0);res(c.toDataURL())}catch(e){res(src)}};im.onerror=()=>res(src);im.src=src})}
function inkAll(){root.querySelectorAll('img[data-ink]').forEach(i=>{let col=i.dataset.ink;if(!col)return;if(col==='brand'){const L=(window.CO_LOGOS||{})[i.dataset.t];col=L&&L.c&&L.c!=='#12131a'?L.c:'#2a221a'}inkSrc(i.getAttribute('src'),col).then(u=>{i.src=u})})}
const PAGE=8;let shown=PAGE,wide=false;const root=D.createElement('div');root.className='r7 r7-'+TK;sec.prepend(root);
['room.jpg','boards.jpg','wall.jpg','desk.jpg','paper.jpg','tile.png','frame1.png'].forEach(f=>root.style.setProperty('--i-'+f.split('.')[0],`url(${IM}rounds7-${f})`));
/* a hand-drawn loop (grease pencil, ring, or ink circle): a wobbly ellipse that overshoots its start */
const loop=(seed,col,w)=>{let s='';const R=(i)=>{const x=Math.sin(seed*12.9898+i*78.233)*43758.5453;return x-Math.floor(x)};const n=26,pts=[];
  for(let i=0;i<=n+3;i++){const t=i/n*Math.PI*2-1.9+R(1)*.4,rx=46+R(i)*3.5,ry=44+R(i+7)*3.5;pts.push([50+Math.cos(t)*rx+(i>n?2:0),50+Math.sin(t)*ry+(i>n?-2.4:0)])}
  s=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  return `<svg class="r7-loop" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${s}" stroke="${col}" stroke-width="${w||4.6}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`};
const head=(h,c)=>`<header class="r7-hd"><h2 class="r7-h2">${esc(h)}</h2>${c?`<p class="r7-cap">${esc(c)}</p>`:''}</header>`;
const beat=(t)=>`<p class="r7-bt">${esc(t)}</p>`;
const more=()=>shown<NEW.length?`<button class="r7-more" type="button"><span>Show ${Math.min(PAGE,NEW.length-shown)} more</span><i>${shown} of ${NEW.length}</i></button>`:`<p class="r7-all">All ${NEW.length} rounds</p>`;
const link=(r,inner,cls)=>`<a class="${cls||''}" href="#/round/${r.n}" aria-label="${esc(aria(r))}">${inner}</a>`;
const wcls=r=>{const W=wins(r);return W.length?'':'r7-none'};

/* ================= A · the darkroom ================= */
function takeA(){
  /* beat 1: the contact sheet. Every graded round's frame in shooting order, R1 at the top left; the winner circled in grease pencil in its colour */
  const cols=wide?20:10;let cells='';G.forEach((r,i)=>{const W=wins(r);const lp=W.map((m,j)=>loop(r.n*3+j,COL[m],j?3:3.8)).join('')||`<svg class="r7-x" viewBox="0 0 100 100" aria-hidden="true"><path d="M18 22 L82 80 M80 20 L22 84" stroke="#f3e9cf" stroke-width="7" stroke-linecap="round" fill="none"/></svg>`;
    cells+=link(r,`<span class="r7-cf"><img src="${tile(r.n)}" alt="" loading="lazy" decoding="async"></span>${lp}`,'r7-cc'+(W.length?'':' r7-none'))});
  if(NEXT)cells+=`<span class="r7-cc r7-cnext" aria-label="Next frame: round ${NEXT.n}, ${esc(NEXT.co)}"><span class="r7-cf"></span></span>`;
  const left=FUT.length;
  const sheet=`<div class="r7-sheet" style="--cols:${cols}"><div class="r7-sgrid">${cells}</div><p class="r7-roll"><span>${G.length} exposed</span><span>${left} left on the roll</span><span class="r7-nv">Last frame: ${esc(LAST?LAST.co:'')}</span></p></div>`;
  const key=`<p class="r7-key">${ORDER.map(m=>`<span><svg viewBox="0 0 40 24" aria-hidden="true"><path d="M5 12c0-6 9-9 15-9s16 3 16 9-9 9-15 9S4 18 6 10" stroke="${COL[m]}" stroke-width="3.2" fill="none" stroke-linecap="round"/></svg>${cap1(m)} won</span>`).join('')}<span><svg viewBox="0 0 40 24" aria-hidden="true"><path d="M12 4 L28 20 M28 4 L12 20" stroke="#f3e9cf" stroke-width="3.2" stroke-linecap="round"/></svg>Nobody</span></p>`;
  /* beat 2: the newest prints pegged on the drying line, the tape under each written in marker */
  const per=wide?4:2,items=NEW.slice(0,shown);let lines='';
  for(let i=0;i<items.length;i+=per){const row=items.slice(i,i+per);
    lines+=`<div class="r7-line" style="--n:${per}"><svg class="r7-wire" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path d="M-2 2 Q50 ${6+i%3} 102 2.6" stroke="#b9b2a2" stroke-width=".5" fill="none"/></svg>`+
    row.map((r,j)=>{const W=wins(r);return `<div class="r7-pr" style="--tilt:${((r.n*37)%7-3)*.55}deg">`+link(r,`<img class="r7-peg" src="${IM}rounds7-peg.png" alt="" aria-hidden="true"><span class="r7-paper"><img class="r7-pp" src="${IM}rounds7-print.webp" alt="" aria-hidden="true"><img class="r7-ph" src="${tile(r.n)}" alt="" loading="lazy" decoding="async"></span>
      <span class="r7-tape"><img src="${IM}rounds7-tape.png" alt="" aria-hidden="true"><b class="r7-tn">${LG(r.ticker,'r7-tl','#1b1714')}${esc(nm(r))}</b><b class="r7-tm ${r.a>0?'r7-pu':'r7-pd'}">${esc(mv(r))}</b>${marks(r)}<b class="r7-tw" style="color:${W.length?INKC[W[0]]:'#4a3a2e'}">${esc(winTxt(r))}</b></span>`)+`</div>`}).join('')+`</div>`}
  return head('Every round so far','Every round is filmed. Here is the whole roll so far.')+beat('1 · The contact sheet: circled, who won')+`<div class="r7-b1">`+sheet+key+`</div>`+beat('2 · The newest prints, still drying')+`<div class="r7-b2">${lines}</div>`+more()}

/* ================= B · the tile wall ================= */
function takeB(){
  /* beat 1: one glazed tile per round, laid in order; the glaze is the winner's colour, a tie splits the tile, nobody is black; the rounds to come are bare clay, NVIDIA gold */
  const all=[...G,...FUT],cols=wide?19:10;let t='';
  all.forEach((r,i)=>{const g=r.a!=null&&r.out,isN=NEXT&&r.n===NEXT.n,last=LAST&&r.n===LAST.n;
    if(g){const W=wins(r),bg=W.length===0?'#141217':W.length===1?COL[W[0]]:`linear-gradient(135deg,${COL[W[0]]} 49.5%,${COL[W[1]]} 50.5%)`;
      t+=link(r,`<span class="r7-gl" style="background:${bg}"></span><img class="r7-tt" src="${IM}rounds7-tile.png" alt="">${LG(r.ticker,'r7-tlg','#f6eed6')}`,'r7-ti'+(W.length?'':' r7-none'))}
    else t+=`<span class="r7-ti r7-bare${isN?' r7-tnext':''}${last?' r7-tgold':''}"${isN?` aria-label="Next: round ${r.n}, ${esc(r.co)}"`:last?` aria-label="Last: round ${r.n}, ${esc(r.co)}, the NVIDIA bet"`:' aria-hidden="true"'}><span class="r7-gl"></span><img class="r7-tt" src="${IM}rounds7-tile.png" alt="">${isN||last?LG(r.ticker,'r7-tlg','#1a120a'):''}</span>`});
  const key=`<p class="r7-key r7-tkey">${ORDER.map(m=>`<span><i style="background:${COL[m]}">${MK(m)}</i>${cap1(m)}</span>`).join('')}<span><i style="background:#141217"></i>Nobody</span><span><i class="r7-kb"></i>To come</span></p>`;
  const wall=`<div class="r7-wall" style="--cols:${cols}">${t}</div>`;
  /* beat 2: the newest rounds set into the wall as picture tiles, a border of small tiles in the winner's glaze, an enamel plaque under each */
  const per=wide?4:2,items=NEW.slice(0,shown);
  const pics=`<div class="r7-pics" style="--n:${per}">`+items.map(r=>{const W=wins(r),bc=W.length?COL[W[0]]:'#141217',bc2=W.length>1?COL[W[1]]:bc;
    return link(r,`<span class="r7-pf" style="--g1:${bc};--g2:${bc2}"><img src="${tile(r.n)}" alt="" loading="lazy" decoding="async"></span>
      <span class="r7-pl"><img src="${IM}rounds7-plaque.png" alt="" aria-hidden="true"><b class="r7-pn">${LG(r.ticker,'r7-plg','#f3ead0')}<span>${esc(r.co)}</span> <small>${esc(r.ticker)}</small></b><b class="r7-pm ${r.a>0?'r7-pu':'r7-pd'}">${esc(mv(r))}</b>${marks(r)}</span>`,'r7-pic')}).join('')+`</div>`;
  return head('Every round so far','One tile per round, glazed in the winner\'s colour.')+beat('1 · Season 1, tile by tile')+`<div class="r7-b1">${wall}${key}</div>`+beat('2 · The newest rounds, set in the wall')+`<div class="r7-b2">${pics}</div>`+more()}

/* ================= C · the trophy case ================= */
function takeC(){
  /* beat 1: a shelf per model, one cup for every round it won (closest call; a tie puts a cup on both shelves), most cups on top; the last shelf holds the rounds nobody won */
  const S={};ORDER.forEach(m=>S[m]=[]);const none=[];G.forEach(r=>{const W=wins(r);if(!W.length)none.push(r);W.forEach(m=>S[m].push(r))});
  const rk=ORDER.slice().sort((a,b)=>S[b].length-S[a].length);
  const shelf=(m,list,broken)=>`<div class="r7-sh" style="--mc:${m?COL[m]:'#3a2f2a'};--md:${m?DK[m]:'#120e0c'}"><img class="r7-shb" src="${IM}rounds7-shelf.jpg" alt="" aria-hidden="true">
     <div class="r7-cups">${list.map(r=>link(r,`<img class="r7-cup" src="${IM}rounds7-${broken?'broken':'cup'}.png" alt="">${LG(r.ticker,'r7-clg','#3a2408')}`,'r7-cu'+(wins(r).length>1?' r7-tie':''))).join('')}</div>
     <span class="r7-plt">${m?MK(m):''}<b>${m?esc(MD[m].name||cap1(m)):'Nobody'}</b><i>${list.length}</i></span></div>`;
  const mx=Math.max(...ORDER.map(m=>S[m].length));const cab=`<div class="r7-cab" style="--per:${wide?mx:Math.ceil(mx/2)}">${rk.map(m=>shelf(m,S[m])).join('')}${shelf(null,none,true)}</div>`;
  /* beat 2: the newest rounds, each frame in a gilt frame with its engraved plate */
  const per=wide?4:2,items=NEW.slice(0,shown);
  const fr=`<div class="r7-frs" style="--n:${per}">`+items.map(r=>{const W=wins(r);return link(r,`<span class="r7-gf"><img class="r7-gfi" src="${tile(r.n)}" alt="" loading="lazy" decoding="async"><img class="r7-gff" src="${IM}rounds7-gilt.webp" alt="" aria-hidden="true"></span>
     <span class="r7-en"><b class="r7-en1">${LG(r.ticker,'r7-elg','#2a1806')}${esc(nm(r))}</b><b class="r7-en2"><i class="${r.a>0?'r7-pu':'r7-pd'}">${esc(mv(r))}</i></b><b class="r7-en4">${marks(r)}</b><b class="r7-en3">${esc(winTxt(r))}</b></span>`,'r7-fr')}).join('')+`</div>`;
  return head('Every round so far','The closest call wins the round. One cup per win.')+beat('1 · The trophy case, by model')+`<div class="r7-b1">${cab}</div>`+beat('2 · The newest cups, with their pictures')+`<div class="r7-b2">${fr}</div>`+more()}

/* ================= D · the desk diary ================= */
function takeD(){
  /* beat 1: the season as a planner, Monday to Friday, week by week from the first close to the NVIDIA bet; each round stamped on the day it closed, ringed in the winner's colour */
  const byDay={};G.forEach(r=>{(byDay[r.resolves]=byDay[r.resolves]||[]).push(r)});
  const fut={};FUT.forEach(r=>{const k=r.resolves||r.called;if(k)(fut[k]=fut[k]||[]).push(r)});
  const key=d=>`${String(d.getUTCMonth()+1).padStart(2,'0')}/${String(d.getUTCDate()).padStart(2,'0')}/${String(d.getUTCFullYear()).slice(2)}`;
  const first=dt(G[0].resolves),end=LAST?dt(LAST.resolves||LAST.called):dt(G[G.length-1].resolves);
  const mon=new Date(first);mon.setUTCDate(mon.getUTCDate()-((mon.getUTCDay()+6)%7));
  const ny=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'2-digit',month:'2-digit',day:'2-digit'}).format(new Date());
  let rows='',w=0;for(let d=new Date(mon);d<=end;d.setUTCDate(d.getUTCDate()+7)){w++;let cells='';
    for(let i=0;i<5;i++){const c=new Date(d);c.setUTCDate(c.getUTCDate()+i);const k=key(c),list=byDay[k]||[],fl=fut[k]||[],isT=k===ny,isNV=LAST&&fl.some(r=>r===LAST);
      cells+=`<div class="r7-day${isT?' r7-today':''}${isNV?' r7-nvd':''}${c.getUTCDate()===1?' r7-m1':''}"><b class="r7-dnum">${c.getUTCDate()===1||(w===1&&i===0)?MON[c.getUTCMonth()]+' ':''}${c.getUTCDate()}</b>`+
        list.map(r=>{const W=wins(r);return link(r,`${LG(r.ticker,'r7-slg','brand')||`<em>${esc(r.ticker)}</em>`}<span class="r7-ring" style="--a:${W[0]?COL[W[0]]:'#2a2420'};--b:${W[1]?COL[W[1]]:W[0]?COL[W[0]]:'#2a2420'}"></span>`,'r7-st'+(W.length?'':' r7-none'))}).join('')+
        (fl.length?(isNV?`<span class="r7-nvs">${LG(LAST.ticker,'r7-slg','brand')}<i>Bet #1</i></span>`:`<span class="r7-pen">${fl.length} due</span>`):'')+
        (isNV&&fl.length>1?`<span class="r7-pen">+${fl.length-1}</span>`:'')+`</div>`}
    rows+=`<div class="r7-wk"><b class="r7-wn">W${w}</b>${cells}</div>`}
  const plan=`<div class="r7-plan"><div class="r7-wd"><b></b>${['Mon','Tue','Wed','Thu','Fri'].map(x=>`<b>${x}</b>`).join('')}</div>${rows}</div>`;
  const keyD=`<p class="r7-key r7-dkey">${ORDER.map(m=>`<span><i style="--a:${COL[m]};--b:${COL[m]}"></i>${cap1(m)} won</span>`).join('')}<span><i style="--a:#2a2420;--b:#2a2420"></i>Nobody</span></p>`;
  /* beat 2: the newest day pages torn off, each with its rounds and their frames */
  const items=NEW.slice(0,shown),days=[];items.forEach(r=>{let d=days.find(x=>x.k===r.resolves);if(!d)days.push(d={k:r.resolves,l:[]});d.l.push(r)});
  const pages=`<div class="r7-pgs">`+days.map(d=>{const x=dt(d.k);return `<div class="r7-pg" style="background-image:url(${IM}rounds7-page.webp),url(${IM}rounds7-pagemid.webp)"><p class="r7-pgh"><b>${x.getUTCDate()}</b><span>${WD[x.getUTCDay()]}<br>${MON[x.getUTCMonth()]}</span><i>${(byDay[d.k]||d.l).length} round${(byDay[d.k]||d.l).length>1?'s':''} closed</i></p><div class="r7-pgl">`+
    d.l.map(r=>{const W=wins(r);return link(r,`<span class="r7-pgf"><img src="${tile(r.n)}" alt="" loading="lazy" decoding="async"></span><span class="r7-pgt"><b class="r7-pgn">${LG(r.ticker,'r7-plg','brand')}${esc(nm(r))}</b><b class="r7-pgm ${r.a>0?'r7-pu':'r7-pd'}">${esc(mv(r))}</b>${marks(r)}<b class="r7-pgw" style="--a:${W[0]?INKC[W[0]]:'#2a2420'}">${esc(winTxt(r))}</b></span>`,'r7-pgr')}).join('')+`</div></div>`}).join('')+`</div>`;
  return head('Every round so far','Every round, on the day the market closed it.')+beat('1 · Season 1, day by day')+`<div class="r7-b1">${plan}${keyD}</div>`+beat('2 · The newest days, torn off')+`<div class="r7-b2">${pages}</div>`+more()}

function render(){wide=matchMedia('(min-width:900px)').matches;root.innerHTML=({A:takeA,B:takeB,C:takeC,D:takeD})[TK]();
  const b=root.querySelector('.r7-more');if(b)b.addEventListener('click',()=>{shown+=PAGE;const y=scrollY;render();inkAll();scrollTo(0,y)})}
render();inkAll();let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;render();inkAll()}});
window.__r7={render};
}catch(e){window.__x2pR7Err=e;console.error(e)}})();
