/* slab2: shared layer for the card back takes. Builds on slabback's mount (SB) and round's data (RH): every word and number from ROUNDS / __x2pPnl.
   A pose set = one painted image per founder per state; the state comes from the round's data:
   win (the sheet's winner, crowned), pass (right way, not closest), fail (wrong way, hit by the stamp), predict (pending).
   Every pose image carries a blank balloon painted into the art; balloons.json (window.S2B) holds its box, and the call is lettered into it. */
(function(){const I='tools/concepts/worlds/comic/story/h/slab2/img/',FD={GPT:'gpt',CLAUDE:'claude',GROK:'grok',KIMI:'kimi'};
const state=(r,g)=>g.pend?'predict':r.win?'win':r.ok?'pass':'fail';
const key=(fin,r,g)=>{const s=state(r,g);const f=typeof fin==='function'?fin(s):fin;return `${f}-${FD[r.m]}-${s}`};
/* a hand-tuned box: wobbly fill (two tones: a lit top, a darker foot), a thick outer ink and a thin inner ink, each corner its own */
function wob(s,c1,c2,{w=3,w2=1}={}){RH.seed(s);const r=()=>(RH.rnd()-.5);
  const P=[[1.5+r()*2,2+r()*3],[50+r()*6,.8+r()*2],[98.5+r()*1.5,2+r()*3],[99+r()*1,52+r()*6],[98+r()*2,98+r()*2],[48+r()*6,99.2+r()*.8],[1.2+r()*2,98+r()*2],[.8+r()*1.5,48+r()*6]];
  const d='M'+P.map(p=>p.map(v=>v.toFixed(1)).join(' ')).join('L')+'Z';const id='w'+s+Math.floor(RH.rnd()*1e6);
  return `<svg class="s2-wob" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
  <path d="${d}" fill="url(#${id})" stroke="#0d0b10" stroke-width="${w}" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
  <path d="${d}" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="${w2}" vector-effect="non-scaling-stroke" transform="translate(1.6 2.2) scale(.968 .956)"/></svg>`}
/* the call lettered into the painted balloon: the word small, the number big; green up, red down */
function balloon(k,r){const b=(window.S2B||{})[k]||[22,15,36,20];const [cx,cy,w,h]=b;
  return `<span class="s2-bt ${r.up?'up':'dn'}" style="left:${(cx-w/2).toFixed(1)}%;top:${(cy-h/2).toFixed(1)}%;width:${w}%;height:${(h*.86).toFixed(1)}%"><small>${r.up?'Up':'Down'}</small><b>${r.v}%</b></span>`}
function verdict(r,g,i){if(g.pend)return `<em class="s2-q">? at the close</em>`;
  return `<span class="s2-vd ${r.ok?'ok':'no'}"><b>${r.ok?'Pass':'Fail'}</b><small>${r.ok?SB.off(r.off):'wrong way'}</small></span>`}
function panel(r,i,g,o){const k=key(o.fin,r,g),s=state(r,g);
  return `<li class="s2-p s2-${s}" style="--mc:${RH.MC[r.m]}"><img class="s2-art" src="${I}${k}.jpg" alt="${RH.NM[r.m]}: ${s}">
    ${RH.ink(g.n*9+i,{w:o.w||3.2,w2:o.w2||1})}${balloon(k,r)}
    <span class="s2-cap">${wob(g.n*31+i,o.cap1||'#fff3c4',o.cap2||'#f1d98a')}<b>${g.pend?'':`<i class="s2-rk">${i+1}</i>`}${RH.NM[r.m]}</b>${verdict(r,g,i)}</span></li>`}
function who(g){const W=g.W.map(m=>RH.NM[m]);return g.pend?['Graded at the close',g.res]:!W.length?['All four went','the wrong way']:W.length>1?['Shared crown',W.join(' & ')]:['Winner',W[0]]}
window.S2={I,state,key,wob,balloon,verdict,panel,who,rows:g=>g.pend?g.filed:g.rows};
})();
