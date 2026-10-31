/* Take B, "Who's flying high?": the P&L as flight. Break-even is the cloud deck of the painting (aligned at every width): money made
   flies in the clear sky above it, money lost is down in the storm under it. Each line is a contrail ending at a plane in its AI's
   colour, nose along its last move. The windows are three cockpit toggles; the rows are flight strips in a strip bay (callsign,
   then 24h, 7 days and the season, the open window underlined in grease pencil). Numbers: PN. */
window.PNT={id:'b',title:"Who's flying high?",beat:'Meanwhile, at thirty thousand feet…',zoom:'.pn-b .b-ch',
 html(N){const tg=(id,lab)=>`<button type="button" data-win="${id}" class="b-tg" aria-pressed="false"><svg viewBox="0 0 30 44" aria-hidden="true"><circle class="b-tg-n" cx="15" cy="30" r="9"/><circle class="b-tg-h" cx="15" cy="30" r="4.6"/>
    <path class="b-tg-s" d="M13 30 L11.6 6 C 11.6 2.5 18.4 2.5 18.4 6 L17 30Z"/><circle class="b-tg-l" cx="15" cy="41" r="2.4"/></svg><span>${lab}</span></button>`;
  return `<div class="b-sc"><header class="b-top"><div role="heading" aria-level="2" class="pn-hd b-hd" aria-label="Who's flying high?">${N.letter("Who's flying",12)}<br>${N.letter('high?',6)}</div>
   <p class="b-lede">If you&rsquo;d bet $100K on every call.<br><span data-lead></span></p>
   <div class="b-win" role="group" aria-label="Which window"><svg class="b-plate" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${N.wob(41,2.2)}"/><circle cx="5" cy="14" r="2.2"/><circle cx="95" cy="14" r="2.2"/><circle cx="5" cy="86" r="2.2"/><circle cx="95" cy="86" r="2.2"/></svg>${tg('season','Season')}${tg('d7','7 days')}${tg('d1','24h')}</div></header>
   <figure class="b-ch"><div class="b-pl"><svg class="b-sv" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"></svg><div class="b-alt" aria-hidden="true"></div><div class="b-ends"></div></div>
    <figcaption class="b-x"><span class="b-x0"></span><span>Every graded round</span><span class="b-x1"></span></figcaption></figure></div>
   <div class="b-bay"><div class="b-lh" aria-hidden="true"><span></span><span></span><span data-c="d1">24h</span><span data-c="d7">7 days</span><span data-c="season">Season</span></div><ol data-rows></ol>
   <p class="b-fine">Each call is its own bet. Buy on up, short on down. No leverage. Before fees.</p></div>`},
 leadLine:w=>PN.leadTxt(w),
 row(m,i,w,v,wid){const k=(id,val)=>`<span class="b-v${id===wid?' b-on':''} ${val>0?'pn-u':val<0?'pn-d':''}">${val?PN.$k(val):'·'}${id===wid?`<svg class="b-ul" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path d="M3 6 C 30 3 60 8 97 4"/></svg>`:''}</span>`;
   return `<li class="b-r${i===0?' b-1':''}${w.tot[m]<0?' b-low':''}" style="--mc:${PN.col(m)}"><svg class="b-sp" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${PN.wob(i*5+11,1.1)}"/></svg>
     <span class="b-cs"><b class="b-rk">${i+1}</b></span><span class="b-nm">${PN.mark(m,'b-mk')}<b>${PN.NM[m]}</b></span>${k('d1',v.d1)}${k('d7',v.d7)}${k('season',v.s)}</li>`},
 draw(root,wid){const pl=root.querySelector('.b-pl'),H=pl.clientHeight||300,Wd=pl.clientWidth,G=PN.geom(wid,H,.12),sv=root.querySelector('.b-sv');sv.setAttribute('viewBox',`0 0 1000 ${H}`);
   const tk=PN.ticks(G.lo,G.hi,4);
   sv.innerHTML=`<defs><filter id="bBlur" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="3"/></filter></defs>`+tk.map(v=>v?`<path class="b-gl" d="M0 ${G.Y(v).toFixed(1)} L1000 ${G.Y(v).toFixed(1)}"/>`:'').join('')+
     G.lines.slice().reverse().map(l=>`<path class="b-trail" d="${l.d}" pathLength="1"/>`).join('')+PN.svgLines(G);
   root.querySelector('.b-alt').innerHTML=tk.map(v=>`<span class="b-tk${v===0?' b-t0':''}" style="top:${(G.Y(v)/H*100).toFixed(2)}%">${v===0?'$0':PN.$k(v).replace('.0K','K')}</span>`).join('');
   const sx=Wd/1000,ends=PN.spread(G.lines.map(l=>{const p=l.pts,a=p[p.length-1],b=p[Math.max(0,p.length-3)];return {m:l.m,y:a[1],py:a[1],v:l.v,ang:Math.atan2(a[1]-b[1],(a[0]-b[0])*sx)*180/Math.PI}}),28,12,H-8);
   root.querySelector('.b-ends').innerHTML=ends.map((e,i)=>`<span class="pn-end b-end${e.v<0?' b-dn':''}" style="top:${e.y.toFixed(1)}px;--mc:${PN.col(e.m)};--a:${Math.max(-50,Math.min(50,e.ang)).toFixed(0)}deg;--d:${(i*.7).toFixed(1)}s;--dy:${(e.py-e.y).toFixed(1)}px">
     <svg class="b-jet" viewBox="0 0 40 24" aria-hidden="true"><path class="b-jb" d="M2 12 C 2 10 6 9.4 12 9.4 L30 9.6 C 35 9.8 38.6 11 38.6 12 C 38.6 13 35 14.2 30 14.4 L12 14.6 C 6 14.6 2 14 2 12Z"/>
     <path class="b-jw" d="M17 10 L22 1.5 L26 1.5 L24 10Z M17 14 L22 22.5 L26 22.5 L24 14Z M3.5 10.5 L1.5 5 L4.5 5 L8 10Z"/><path class="b-jc" d="M31 10.6 C 33.5 10.8 35.6 11.4 36 12"/></svg><b>${PN.NM[e.m]}</b><em>${PN.$k(e.v)}</em></span>`).join('');
   const w=PN.W[wid];root.querySelector('.b-x0').textContent=w.n?'R'+w.first.n:'';root.querySelector('.b-x1').textContent=w.n?'R'+w.last.n:'';
   root.querySelectorAll('.b-lh [data-c]').forEach(s=>s.classList.toggle('b-on',s.dataset.c===wid));
   const sc=root.querySelector('.b-sc'),y=pl.getBoundingClientRect().top-sc.getBoundingClientRect().top+G.base;PN.bgAlign(sc,PN.IMG+'b-sky.jpg',1280,720,.529,y,.62)},
 after(root){let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;this.draw(root,root.dataset.win)}})}};
