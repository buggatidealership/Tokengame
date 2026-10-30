/* U2 · Corners: the company is the ring. The tile's newsprint is printed in two dot screens split by a leaning seam: the bulls' corner in green,
   the bears' in red, each as wide as the crowd standing in it. The company's mark hangs over the seam; each AI stands in its corner and says its
   call in a balloon; the bull and the bear are the corners' mascots. */
window.UU={cls:'u2',spanP:2,spanD:1,wait:(x,c)=>UUwait(x,c),
lock(x,c){const H=UH,T=TT,S=T.S,bu=T.side(x,true),be=T.side(x,false),n=bu.length+be.length;
  const P=Math.min(.8,Math.max(.2,(bu.length+.0001)/n)),a=(P+.07).toFixed(3),b=(P-.07).toFixed(3);
  const ch=cl=>`<span class="u2-ch ${cl.dir==='UP'?'u2-u':'u2-d'}"><span class="u2-bb"><i aria-hidden="true">${H.ar(cl)}</i>${H.sg(cl)}</span>${S.face(cl.m)}<small class="uu-mn">${T.NM[cl.m]}</small></span>`;
  const g=(L)=>L.length?L.map(ch).join(''):'<span class="u2-no">nobody</span>';
  return c.art('',`data-sp="${a},${b}" data-k="${c.main?.5:.46}" data-cy="${c.main?.34:.3}" data-cx="${P.toFixed(3)}"`,
      `${H.bull.replace('uu-em','uu-em u2-mb')}${H.bear.replace('uu-em','uu-em u2-mr')}<span class="u2-cast" style="grid-template-columns:${Math.max(bu.length,.6)}fr ${Math.max(be.length,.6)}fr"><span class="u2-g">${g(bu)}</span><span class="u2-g">${g(be)}</span></span>`)+
    `<span class="uu-bs">${H.notch}${H.no(x)}${c.main?`<b class="uu-co">${T.esc(x.co)}</b>`:''}<em class="u2-lk">Locked</em></span>${H.sr(x)}`}};
