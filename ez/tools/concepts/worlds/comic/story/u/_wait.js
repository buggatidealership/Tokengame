/* helper u, shared by every take: a round whose calls are not in yet. Its mark painted as on "Every round so far", the four characters on the stub
   thinking it over, and the day the calls are due as the comic's narration caption hung on the tear */
window.UUwait=(x,c)=>{const H=UH;
  return c.art('',c.main?'data-k=".62"':'',`<span class="uu-wc">${H.dueCap(x)}</span>`)+
    `<span class="uu-bs">${H.notch}${H.no(x)}${c.main?`<b class="uu-co">${TT.esc(x.co)}</b>`:''}${H.think(x)}</span>${H.srw(x)}`};
