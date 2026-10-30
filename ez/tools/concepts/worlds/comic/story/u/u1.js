/* U1 · Stamped in: each Upcoming round is the "Every round so far" tile before its result. The company's mark is the picture; each AI's call is
   struck on it as a worn ink stamp: the bulls' stamps high on the left in green ink, the bears' low on the right in red ink (height and ink both say
   the direction, the arrow says it a third time for anyone who can't tell green from red). The stub keeps an empty dashed slot where the winner's
   stamp lands at the close, the same stamp "Every round so far" shows. */
window.UU={cls:'u1',spanP:1,spanD:1,wait:(x,c)=>UUwait(x,c),
lock(x,c){const H=UH,T=TT,S=T.S,R=[-8,5,-4,7,-6,3];
  const st=(cl,i,up)=>`<span class="u1-st ${up?'u1-su':'u1-sd'}" style="--r:${(up?-1:1)*Math.abs(R[(x.n+i)%6])}deg">${SA.logo(cl.m,'u1-sl')}<b>${H.ar(cl)}${cl.mag}%</b><small>${T.NM[cl.m]}</small></span>`;
  const bu=T.side(x,true),be=T.side(x,false);
  return c.art('',c.main?'data-k=".56" data-cy=".46"':'data-k=".5" data-cy=".46"',
      `<span class="u1-col u1-bu">${bu.map((cl,i)=>st(cl,i,1)).join('')}</span><span class="u1-col u1-be">${be.map((cl,i)=>st(cl,i,0)).join('')}</span>${H.bull.replace('uu-em','uu-em u1-mb')}${H.bear.replace('uu-em','uu-em u1-mr')}`)+
    `<span class="uu-bs">${H.notch}${H.no(x)}${c.main?`<b class="uu-co">${T.esc(x.co)}</b>`:''}<span class="u1-slot" aria-hidden="true"><b>?</b><small>won</small></span></span>${H.sr(x)}`}};
