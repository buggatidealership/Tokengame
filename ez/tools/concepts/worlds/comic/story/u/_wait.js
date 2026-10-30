/* helper u, shared by every take: a round whose calls are not in yet. Its mark painted as on "Every round so far" and the four characters thinking
   it over, with the day the calls are due as the comic's narration caption. An ordinary one keeps them small on its stub; the main event stands
   them in its picture, under the mark (they fill what would be empty newsprint). */
window.UUwait=(x,c)=>{const H=UH,T=TT,S=T.S;
  if(c.main)return c.art('','data-k=".5" data-cy=".34"',`<span class="uu-wcast">${T.ORDER.map((m,i)=>`<span class="uu-tc uu-tcb">${S.face(m)}<i class="uu-tq" aria-hidden="true">?</i><small class="uu-mn">${T.NM[m]}</small></span>`).join('')}</span><span class="uu-wc">${H.dueCap(x)}</span>`)+
    `<span class="uu-bs">${H.notch}${H.no(x)}<b class="uu-co">${T.esc(x.co)}</b></span>${H.srw(x)}`;
  return c.art('','',`<span class="uu-wc">${H.dueCap(x)}</span>`)+`<span class="uu-bs">${H.notch}${H.no(x)}${H.think(x)}</span>${H.srw(x)}`};
