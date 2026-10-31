/* U3 · The fight card: the company's mark is the poster, untouched, as on "Every round so far"; the torn stub is the ticket to tonight's fight.
   On it the cast lines up: the bull at one end with the AIs that say up, the bear at the other with those that say down, a VS between them,
   each call shouted as lettering over its face, louder the bigger the move it predicts. */
window.UU={cls:'u3',after:r=>UUfit(r,'.u3-row'),spanP:2,spanD:1,wait:(x,c)=>UUwait(x,c),
lock(x,c){const H=UH,T=TT,S=T.S,bu=T.side(x,true),be=T.side(x,false);
  const ch=cl=>`<span class="u3-ch ${cl.dir==='UP'?'u3-u':'u3-d'}" style="--z:${Math.min(8,+cl.mag).toFixed(1)}"><b class="u3-fx"><i aria-hidden="true">${H.ar(cl)}</i>${H.sg(cl)}</b>${S.face(cl.m)}<small class="uu-mn">${T.NM[cl.m]}</small></span>`;
  const g=(L,k)=>`<span class="u3-g u3-${k}">${L.length?L.map(ch).join(''):'<span class="u3-no">nobody</span>'}</span>`;
  return c.art('',c.main?'data-k=".66"':'',`<span class="u3-no-t">${H.no(x)}</span>`)+
    `<span class="uu-bs u3-bs">${H.notch}${c.main?`<b class="uu-co u3-co">${T.esc(x.co)}</b>`:''}<span class="u3-row">${H.bull.replace('uu-em','uu-em u3-mb')}${g(bu,'bu')}<b class="u3-vs" aria-hidden="true">vs</b>${g(be,'be')}${H.bear.replace('uu-em','uu-em u3-mr')}</span></span>${H.sr(x)}`}};
