/* helper u, shared by every take: a round whose calls are not in yet. Its mark painted as on "Every round so far" and the four characters thinking
   it over, with the day the calls are due as the comic's narration caption. An ordinary one keeps them small on its stub; the main event stands
   them in its picture, under the mark (they fill what would be empty newsprint). */
window.UUwait=(x,c)=>{const H=UH,T=TT,S=T.S;
  if(c.main)return c.art('','data-k=".42" data-cy=".32"',`<span class="uu-wcast">${T.ORDER.map((m,i)=>`<span class="uu-tc uu-tcb">${S.face(m)}<i class="uu-tq" aria-hidden="true">?</i><small class="uu-mn">${T.NM[m]}</small></span>`).join('')}</span>`)+
    `<span class="uu-bs">${H.notch}${H.no(x)}<b class="uu-co">${T.esc(x.co)}</b></span>${H.srw(x)}`;
  return c.art('uu-ws','','')+`<span class="uu-bs">${H.notch}${H.no(x)}${H.think(x)}</span>${H.srw(x)}`};
/* shared: a line-up that would run past its room is set a size smaller as a whole (zoom), never clipped and never wrapped onto a second line.
   z = the element zoomed; each group inside it (or z itself) needs the sum of its children's widths and gaps, against its own room */
window.UUfit=(root,sel,grp)=>{const need=g=>{const k=[...g.children],cs=getComputedStyle(g),gap=parseFloat(cs.columnGap)||0;return k.reduce((a,e)=>a+e.getBoundingClientRect().width,0)+gap*Math.max(0,k.length-1)};
  const go=()=>root.querySelectorAll(sel).forEach(z=>{z.style.zoom='';const gs=grp?[...z.querySelectorAll(grp)]:[z];let q=1;
    gs.forEach(g=>{const box=grp?g:z.parentElement,cs=getComputedStyle(box),av=box.clientWidth-(grp?0:parseFloat(cs.paddingLeft)+parseFloat(cs.paddingRight));q=Math.min(q,av/need(g))});
    if(q<1)z.style.zoom=(Math.floor(q*100)/100).toFixed(2)});go();document.fonts&&document.fonts.ready.then(go)};
