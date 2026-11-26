/* Take E, "Who's in the green?": the P&L etched on the NVIDIA chip's own world, the green circuit board of the die count. Break-even
   is the board's gold bus bar (the painting's bar, aligned at every width); below it the board is tinted red (the loss zone).
   Each AI's P&L runs as a copper trace with its colour inlaid, from a via at the start to an LED at its end: green LED in profit,
   red in loss. A slow current runs along the leader's trace. The windows are a DIP switch; the rows are four chips, figures in
   silkscreen. Numbers: PN. */
window.PNT={id:'e',title:"Who's in the green?",beat:'Meanwhile, deep inside the chip…',zoom:'.pn-e .e-ch',
 html(N){return `<div class="e-sc"><header class="e-top"><div role="heading" aria-level="2" class="pn-hd e-hd" aria-label="Who's in the green?">${N.letter("Who's in the",27)}<br>${N.letter('green?',16)}</div>
   <p class="e-lede">If you&rsquo;d bet $100K on every call.<br><span data-lead></span></p>
   <div class="e-dip" role="group" aria-label="Which window"><span class="e-dipb" aria-hidden="true"></span>${[['season','Season'],['d7','7 days'],['d1','24h']].map(([id,l])=>`<button type="button" data-win="${id}" class="e-sw" aria-pressed="false"><i aria-hidden="true"><s></s></i><span>${l}</span></button>`).join('')}</div></header>
   <figure class="e-ch"><div class="e-pl"><i class="e-loss" aria-hidden="true"></i><svg class="e-sv" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"></svg><div class="e-ax" aria-hidden="true"></div><div class="e-vias"></div><div class="e-ends"></div></div>
    <figcaption class="e-x"><span class="e-x0"></span><span>Every graded round</span><span class="e-x1"></span></figcaption></figure></div>
   <div class="e-bd"><div class="e-lh" aria-hidden="true"><span></span><span data-c="d1">24h</span><span data-c="d7">7 days</span><span data-c="season">Season</span></div><ol data-rows></ol>
   <p class="e-fine">Each call is its own bet. Buy on up, short on down. No leverage. Before fees.</p></div>`},
 leadLine:w=>PN.leadTxt(w),
 row(m,i,w,v,wid){const k=(id,val)=>`<span class="e-v${id===wid?' e-on':''} ${val>0?'pn-u':val<0?'pn-d':''}">${val?PN.$k(val):'·'}</span>`;
   return `<li class="e-r${i===0?' e-1':''}" style="--mc:${PN.col(m)}"><span class="e-nm"><i class="e-u">U${i+1}</i>${PN.mark(m,'e-mk')}<b>${PN.NM[m]}</b></span>${k('d1',v.d1)}${k('d7',v.d7)}${k('season',v.s)}<i class="e-led${w.tot[m]<0?' e-red':''}" aria-hidden="true"></i></li>`},
 draw(root,wid){const pl=root.querySelector('.e-pl'),H=pl.clientHeight||300,Wd=pl.clientWidth,G=PN.geom(wid,H,.1),sv=root.querySelector('.e-sv');sv.setAttribute('viewBox',`0 0 1000 ${H}`);
   const tk=PN.ticks(G.lo,G.hi,4),ld=G.lines[0];
   sv.innerHTML=tk.map(v=>v?`<path class="e-gl" d="M0 ${G.Y(v).toFixed(1)} L1000 ${G.Y(v).toFixed(1)}"/>`:'').join('')+
     G.lines.slice().reverse().map(l=>`<path class="e-cu${l===ld?' e-cu1':''}" d="${l.d}" pathLength="1"/>`).join('')+PN.svgLines(G)+`<path class="e-cur" d="${ld.d}" pathLength="1"/>`;
   root.querySelector('.e-loss').style.top=G.base+'px';
   root.querySelector('.e-ax').innerHTML=tk.map(v=>`<span class="e-tk${v===0?' e-t0':''}" style="top:${(G.Y(v)/H*100).toFixed(2)}%">${v===0?'$0':PN.$k(v).replace('.0K','K')}</span>`).join('');
   const sp=PN.spread(G.lines.map(l=>({m:l.m,v:l.v,y:l.end[1],py:l.end[1]})),innerWidth>=900?36:27,10,H-8);
   root.querySelector('.e-vias').innerHTML=G.lines.map(l=>`<i class="e-via" style="left:${(l.end[0]/10).toFixed(2)}%;top:${l.end[1].toFixed(1)}px"></i><i class="e-via" style="left:0;top:${G.base.toFixed(1)}px"></i>`).join('');
   root.querySelector('.e-ends').innerHTML=sp.map(e=>`<span class="pn-end e-end${e.v<0?' e-dn':''}" style="top:${e.y.toFixed(1)}px;--mc:${PN.col(e.m)}"><i class="e-led${e.v<0?' e-red':''}"></i><b>${PN.NM[e.m]}</b><em>${PN.$k(e.v)}</em></span>`).join('');
   const w=PN.W[wid];root.querySelector('.e-x0').textContent=w.n?'R'+w.first.n:'';root.querySelector('.e-x1').textContent=w.n?'R'+w.last.n:'';
   root.querySelectorAll('.e-lh [data-c]').forEach(s=>s.classList.toggle('e-on',s.dataset.c===wid));
   const sc=root.querySelector('.e-sc'),y=pl.getBoundingClientRect().top-sc.getBoundingClientRect().top+G.base;PN.bgAlign(sc,PN.IMG+'e-pcb.jpg',1280,720,.684,y,.5)},
 after(root){let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;this.draw(root,root.dataset.win)}})}};
