/* Take A, "Who's still afloat?": Out of the Fog turned into the P&L. The break-even line is the surface of the sea in the painting
   (aligned to the painted waterline at every width): money made sails above it in the moonlight, money lost sinks below.
   The axis is a tide pole, each line ends at a buoy in its AI's colour, the windows are three ship's lanterns, the rows are the
   harbour log on planks (a plank in the red rides low in the water). Numbers: PN (ROUNDS, __x2pPnl, the page's windows). */
window.PNT={id:'a',title:"Who's still afloat?",beat:'Meanwhile, down at the harbour…',zoom:'.pn-a .a-ch',
 html(N){const lant=(id,lab,i)=>`<button type="button" data-win="${id}" class="a-lt" aria-pressed="false"><svg viewBox="0 0 40 64" aria-hidden="true">
   <path class="a-lt-r" d="M20 1 C 15 1 14 7 20 8 C 26 7 25 1 20 1Z"/><path class="a-lt-c" d="M9 16 L13 9 L27 9.5 L31 16.5 Z"/>
   <path class="a-lt-g" d="M11 17 C 9 28 9.5 38 12 47 L28.5 47.5 C 31 38 31.2 28 29 16.6 Z"/><path class="a-lt-f" d="M20 25 C 16 31 16.5 37 20 40 C 23.5 37 24 31 20 25Z"/>
   <path class="a-lt-x" d="M15 18 L14 46 M25.5 17.5 L26.3 47"/><path class="a-lt-b" d="M8.5 47 L31.8 47.6 L30 53 L10.2 53 Z"/></svg><span>${lab}</span></button>`;
  return `<div class="a-sc"><header class="a-top"><div role="heading" aria-level="2" class="pn-hd a-hd" aria-label="Who's still afloat?">${N.letter("Who's still",4)}<br>${N.letter('afloat?',9)}</div>
   <p class="a-lede">If you&rsquo;d bet $100K on every call.<br><span data-lead></span></p></header>
   <div class="a-win" role="group" aria-label="Which window">${lant('season','Season',0)}${lant('d7','7 days',1)}${lant('d1','24h',2)}</div>
   <figure class="a-ch"><div class="a-pl"><svg class="a-sv" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"></svg><i class="a-wave" aria-hidden="true"></i><div class="a-pole" aria-hidden="true"></div><div class="a-ends"></div></div>
    <figcaption class="a-x"><span class="a-x0"></span><span>Every graded round</span><span class="a-x1"></span></figcaption></figure></div>
   <div class="a-log"><div class="a-lh" aria-hidden="true"><span></span><span data-c="d1">24h</span><span data-c="d7">7 days</span><span data-c="season">Season</span></div><ol data-rows></ol>
   <p class="a-fine">Each call is its own bet. Buy on up, short on down. No leverage. Before fees.</p></div>`},
 leadLine:w=>PN.leadTxt(w),
 row(m,i,w,v,wid){const k=(id,val)=>`<span class="a-v${id===wid?' a-on':''} ${val>0?'pn-u':val<0?'pn-d':''}">${val?PN.$k(val):'·'}${id===wid?`<svg class="a-ring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="M6 22 C 4 6 40 3 62 4 C 90 5 98 14 95 25 C 92 37 48 39 22 36 C 8 34 3 27 9 15"/></svg>`:''}</span>`;
   const sunk=w.tot[m]<0;return `<li class="a-r${sunk?' a-sunk':''}${i===0?' a-1':''}" style="--mc:${PN.col(m)}"><svg class="a-pk" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${PN.wob(i*7+3,1.6)}"/>
     <path class="a-gr" d="M3 30 C 30 27 60 34 97 29 M2 62 C 25 66 70 58 98 64 M40 8 C 44 20 41 28 47 34"/></svg>${sunk?'<i class="a-lap" aria-hidden="true"></i>':''}
     <span class="a-nm"><b class="a-rk">${i+1}</b>${PN.mark(m,'a-mk')}<b>${PN.NM[m]}</b></span>${k('d1',v.d1)}${k('d7',v.d7)}${k('season',v.s)}</li>`},
 draw(root,wid){const pl=root.querySelector('.a-pl'),H=pl.clientHeight||300,G=PN.geom(wid,H,.1),sv=root.querySelector('.a-sv');sv.setAttribute('viewBox',`0 0 1000 ${H}`);
   const tk=PN.ticks(G.lo,G.hi,4);
   sv.innerHTML=tk.map(v=>`<path class="a-gl${v===0?' a-g0':''}" d="M0 ${G.Y(v).toFixed(1)} L1000 ${G.Y(v).toFixed(1)}"/>`).join('')+PN.svgLines(G);
   root.querySelector('.a-pole').innerHTML=`<svg viewBox="0 0 14 100" preserveAspectRatio="none"><path class="a-po" d="M3 -2 C 2 30 4 70 2.6 103 L11.4 103 C 12 70 10.6 30 11.6 -2Z"/><path class="a-pw" d="M2.8 ${(G.base/H*100).toFixed(1)} L11.6 ${(G.base/H*100).toFixed(1)} L11.4 103 L2.6 103Z"/></svg>`+
     tk.map(v=>`<span class="a-tk${v===0?' a-t0':''}" style="top:${(G.Y(v)/H*100).toFixed(2)}%">${v===0?'$0':PN.$k(v).replace('.0K','K')}</span>`).join('');
   const wv=root.querySelector('.a-wave');wv.style.top=G.base+'px';
   const ends=PN.spread(G.lines.map(l=>({m:l.m,y:l.end[1],v:l.v})),innerWidth>=900?38:26,10,H-6);
   root.querySelector('.a-ends').innerHTML=ends.map(e=>`<span class="pn-end a-end${e.v<0?' a-dn':''}" style="top:${e.y.toFixed(1)}px;--mc:${PN.col(e.m)}"><svg class="a-buoy" viewBox="0 0 30 30" aria-hidden="true"><path class="a-by-m" d="M15 2 L15 11"/><path class="a-by-f" d="M15 2.5 L23 5 L15 8Z"/><path class="a-by-b" d="M4 14 C 4 9 26 9 26 14 C 26 22 21 26 15 26 C 9 26 4 22 4 14Z"/><path class="a-by-s" d="M5 17 C 12 19 18 19 25 17"/></svg><b>${PN.NM[e.m]}</b><em>${PN.$k(e.v)}</em></span>`).join('');
   const w=PN.W[wid];root.querySelector('.a-x0').textContent=w.n?'R'+w.first.n:'';root.querySelector('.a-x1').textContent=w.n?'R'+w.last.n:'';
   root.querySelectorAll('.a-lh [data-c]').forEach(s=>s.classList.toggle('a-on',s.dataset.c===wid));
   /* the painting's waterline (53.1% of its height) sits on the break-even line */
   const sc=root.querySelector('.a-sc'),y=pl.getBoundingClientRect().top-sc.getBoundingClientRect().top+G.base;
   PN.bgAlign(sc,PN.IMG+'a-sea-2k.jpg',2048,1152,.468,y,.92)},
 after(root){let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;this.draw(root,root.dataset.win)}})}};
