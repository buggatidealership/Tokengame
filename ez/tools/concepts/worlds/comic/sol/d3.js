/* D3 · The climb: the season in checkpoint panels (every 10 rounds). Each panel a cliff: the AIs' faces at their running
   hit rate, the coin-flip line the waterline. Swipe along the season. */
(function(){const {ms,N,face,pct}=__sl;const K=ms[0].ck.map(c=>c.n),lo=.25,hi=.8,y=h=>8+Math.max(0,Math.min(1,(h-lo)/(hi-lo)))*84;
__slTake('d3',`<h2 class="sl-h sl3-h">Climbing above the coin</h2><p class="sl-lede">Every ten rounds, a checkpoint. Above the waterline: better than a coin flip.</p>
<div class="sl3-strip" tabindex="0" aria-label="Checkpoints">${K.map((k,j)=>{const at=ms.map(x=>({x,h:x.ck[j].h})).sort((a,b)=>b.h-a.h),top=at[0];
 return `<figure class="sl3-p sl-pop" style="transition-delay:${j*.07}s"><figcaption><b>R${k}</b>${j===K.length-1?' · now':''}</figcaption>
 <div class="sl3-cliff"><i class="sl3-sea" style="height:${y(.5)}%"><span>coin flip</span></i>${at.map((o,q)=>`<span class="sl3-f" style="bottom:${y(o.h)}%;left:${10+q*21}%">${face(o.x.m)}<small>${pct(o.h)}</small></span>`).join('')}</div>
 <p class="sl3-l"><b style="color:${top.x.c==='#111'?'#15121a':top.x.c}">${top.x.name}</b> on top</p></figure>`}).join('')}</div>
<p class="sl-cap">Who is still above the waterline at the last checkpoint? ${ms.filter(x=>x.h>.5).map(x=>x.name).join(', ')}.</p>`)})();
