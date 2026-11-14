/* cover7 (Round H12): today's live cover, its four loop panels repainted as the box helper's objects, open, facts at first glance.
   Laid over the built X3+ page. window.__c7={t:'s'|'p'|'o'|'l', o:'a'|'b'|'c'}. Every word and number comes from the page's data. */
(function(){
const C=window.__c7||{t:'s',o:'a'},T=C.t,O=C.o||'a',D=document,IMG='/tools/concepts/worlds/comic/story/h/cover7/img/';
const R=ROUNDS[ROUNDS.length-1],lead=SE.lead(),A=__x2pPnl().A,LA=A[lead],NM=SE.NM,esc=SE.esc;
const usd=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const calls=SE.STAR.map(m=>{const c=R.calls.find(x=>x[0]===m);if(!c)return null;const[d,s]=String(c[1]).split(' ');return {m,up:d==='UP',s:s.replace('%','')}}).filter(Boolean);
const right=calls.filter(c=>c.up===(R.a>0)).length,mv=(R.a>0?'▲':'▼')+Math.abs(R.a)+'%';
const win=String(R.win||'').split(/\s*(?:&|,|and)\s*/).filter(Boolean).map(w=>NM[w.toUpperCase()]||w).join(' & ');
/* surfaces measured on each painting, in % of the painting: [x,y,w,h,rot]; z = zoom of the painting inside its square, [ox,oy] = the point kept in the middle */
const SF={
 letter:{s:{z:1.55,c:[50,47],hd:[50,33.8,48,5,0],rows:[50,47.5,46,20,0]},
         p:{z:1.3,c:[49,42],hd:[49,27,66,5,0],rows:[49,44.4,64,25,0]},
         o:{z:1.55,c:[50,46],hd:[50,34.6,50,5,0],rows:[50,48,44,18,0]},
         l:{f:'letter-l-2',z:1.12,c:[50,34],hd:[50,22,66,7,0],rows:[50,39.5,66,24,0]}},
 bell:{s:{slate:[51,78,80,30,0]},p:{slate:[49,74,74,27,0]},o:{slate:[50,76,64,26,0]},l:{z:1.25,c:[55,64],slate:[56,76,48,24,0]}},
 ticket:{s:{nm:[40,38,58,12,-5],a:[26,62,26,13,-5],b:[58,58.5,25,13,-5],st:[87,44,14,15,-5]},
         p:{nm:[41,44,60,13,-7],a:[24.5,71,24,12,-7],b:[55,67.5,27,12,-7],st:[88,62,11,12,-7]},
         o:{z:1.15,c:[50,60],nm:[42,46,60,12,-6],a:[25,68,27,11,-6],b:[59,64.5,27,11,-6],st:[90,52,12,13,-6]},
         l:{f:'ticket-l-2',nm:[27,57,34,10,-13],a:[29,70,34,13,-13],b:[61.5,55,22,20,-13],st:[90,47,9,10,-13]}},
 billboard:{s:{f:'billboard-s-2',lit:[20.5,51.5,17,50,0],d1:[50.5,51.5,17,50,0],d2:[79.5,51.5,17,50,0]},p:{f:'billboard-p-2',lit:[17,61,20,54,0],d1:[51,61,22,54,0],d2:[84,61,22,54,0]},
            o:{f:'billboard-o-2',lit:[20,56,15,46,0],d1:[50,56,16,46,0],d2:[76.5,56,14,46,0]},l:{f:'billboard-l-2',lit:[16.5,55.5,21,46,0],d1:[49.5,55,19,42,0],d2:[82,55,20,42,0]}},
 vault:{s:{pl:[46.5,43.5,25,12,0]},p:{pl:[47,44.5,31,14,0]},o:{pl:[49,44.5,27,12,0]},l:{pl:[49,25,24,10,0]}},
 slip:{s:{z:2,c:[47,80],sl:[41,85,17,9,-3],rg:[56,86,9,7,0]},p:{z:1.9,c:[46,77],sl:[36,78,20,10,0],rg:[58,83,9,7,0]},o:{z:2.1,c:[49,80],sl:[45,82,12,9,0],rg:[52,87,7,5,0]},l:{z:1.9,c:[47,72],sl:[43,69,13,4.5,-6],rg:[37,74,7,5,0]}},
};
const box=(r,cls,html,fit)=>`<span class="c7-t ${cls}" data-fit="${fit||''}" style="left:${r[0]-r[2]/2}%;top:${r[1]-r[3]/2}%;width:${r[2]}%;height:${r[3]}%;transform:rotate(${r[4]||0}deg)">${html}</span>`;
const art=(obj,inner)=>{const s=SF[obj][T]||{},z=s.z||1,c=s.c||[50,50];
  /* the painting is a square; zoom z keeps point c in the middle (clamped to the edges) */
  const off=k=>Math.max(-(z-1)*100,Math.min(0,50-c[k]*z));
  return `<div class="c7-art c7-${obj}" aria-hidden="true"><div class="c7-in" style="width:${z*100}%;height:${z*100}%;left:${off(0)}%;top:${off(1)}%"><img src="${IMG}${s.f||obj+'-'+T+'-r'}.jpg" alt="">${inner(s)}</div></div>`};
const P1=()=>art('letter',s=>box(s.hd,'c7-hd',`${esc(R.co)} <i>(${esc(R.ticker)})</i>`,'1')+
  `<span class="c7-rows${s.two?' c7-two':''}" style="left:${s.rows[0]-s.rows[2]/2}%;top:${s.rows[1]-s.rows[3]/2}%;width:${s.rows[2]}%;height:${s.rows[3]}%;transform:rotate(${s.rows[4]}deg)">${calls.map(c=>`<span class="c7-row" data-fit="1"><b>${esc(NM[c.m])}</b><i class="${c.up?'c7-up':'c7-dn'}">${c.up?'▲':'▼'}${esc(c.s)}%</i></span>`).join('')}</span>`);
const P2=()=>art('bell',s=>box(s.slate,'c7-slate',`<span class="c7-s1" data-fit="1">${esc(R.ticker)} closed <i class="${R.a>0?'c7-up':'c7-dn'}">${mv}</i></span><span class="c7-s2" data-fit="1">${right} of ${calls.length} right · ${esc(win||'Nobody')} closest</span>`));
const P3=()=>art('ticket',s=>box(s.nm,'c7-nm',esc(NM[lead]).toUpperCase(),'1')+box(s.a,'c7-pn',`<small>P&amp;L</small><b class="${LA.pnl>=0?'c7-up':'c7-dn'}">${usd(LA.pnl)}</b>`,'1')+box(s.b,'c7-pn',`<small>W-L</small><b>${LA.W}-${LA.L}</b>`,'1')+box(s.st,'c7-st','#1','1'));
const P4={a:()=>art('billboard',s=>box(s.lit,'c7-po c7-lit',`<small>Bet</small><b>#1</b><img src="/media/logos/NVDA.png" alt="NVIDIA">`,'')+box(s.d1,'c7-po c7-dk',`<small>Bet</small><b>#2</b>`,'')+box(s.d2,'c7-po c7-dk',`<small>Bet</small><b>#3</b>`,'')),
 b:()=>art('vault',s=>box(s.pl,'c7-pl',`<small>Bet #1</small><b>NVIDIA</b>`,'1')),
 c:()=>art('slip',s=>box(s.sl,'c7-sl',`<b>Bet #1</b> NVIDIA`,'1')+box(s.rg,'c7-rg',esc(NM[lead]).toUpperCase(),'1'))};
const STEP=['They predict the move <b>before</b> earnings','The market close grades every prediction','#1 on the leaderboard holds the golden ticket','We follow its call on the bet'];
const cv=D.querySelector('.wc-cover.sh-h1');if(!cv)return;cv.classList.add('c7','c7-'+T,'c7o-'+O);
const V=[P1,P2,P3,P4[O]];
/* a hand-tuned caption plate: an irregular quad with a thick outer and a thin inner ink line (seeded so it never changes between loads) */
const seed=n=>{let x=Math.sin(n*99.1)*1e4;return x-Math.floor(x)};
const plate=i=>{const j=k=>(seed(i*7+k)-.5)*2.2;const p=`M${1+j(1)} ${1.5+j(2)} L${99+j(3)} ${1+j(4)} L${98.5+j(5)} ${98+j(6)} L${1.5+j(7)} ${99+j(8)} Z`;
  return `<svg class="c7-cap" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="c7-cap1" d="${p}"/><path class="c7-cap2" d="${p}" transform="translate(4.5 7) scale(.91 .86)"/></svg>`};
cv.querySelectorAll('.sh-p').forEach((p,i)=>{const sp=p.querySelector('.sh-c span');if(sp)sp.innerHTML=STEP[i];const c=p.querySelector('.sh-c');c.insertAdjacentHTML('afterbegin',plate(i+1));p.querySelector('.sh-vw').innerHTML=V[i]()});
/* fit each live text to its painted surface: largest size that fits, never below 7.5px (reported by the shot script) */
const fit=()=>{cv.querySelectorAll('[data-fit="1"]').forEach(e=>{const L=e.classList.contains('c7-pn')?1.75:e.classList.contains('c7-pl')?1.7:1;
    /* largest size whose ink fits the surface: the height sets the cap (ink, not the font's line box), the width is checked */
    let f=Math.min(40,e.clientHeight/L*.92);e.style.fontSize=f+'px';
    while(f>6&&e.scrollWidth>e.clientWidth+.5){f-=.25;e.style.fontSize=f+'px'}e.dataset.fs=f});
  cv.querySelectorAll('.c7-po').forEach(e=>{const w=e.clientWidth;e.style.fontSize=Math.max(6,w*.4)+'px'});
  /* every caption in the ring the same height, so every painting is the same square */
  const cs=[...cv.querySelectorAll('.sh-c')];cs.forEach(c=>c.style.minHeight='');const mh=Math.max(...cs.map(c=>c.offsetHeight));cs.forEach(c=>c.style.minHeight=mh+'px')};
const go=()=>{fit();D.documentElement.classList.add('c7-ok')};
(D.fonts?D.fonts.ready:Promise.resolve()).then(()=>{go();setTimeout(fit,400)});addEventListener('resize',()=>requestAnimationFrame(fit));
window.__c7fit=fit;
})();
