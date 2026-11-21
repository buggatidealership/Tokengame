/* Take D, "Follow the money": the operations room. The chart is plotted in grease pencil on the room's big glass board (the
   painting's glass, mapped to the plot at every width): each AI's line in its own pencil, break-even a strip of tape, the leader's
   line traced over in gold. The plotters' names are written at the end of each line. The windows are three lit switches on the
   desk; the rows are the tote board: every figure set in slotted tiles. Numbers: PN. */
window.PNT={id:'d',title:'Follow the money',beat:'Meanwhile, in the ops room…',zoom:'.pn-d .d-room',
 html(N){const sw=(id,lab)=>`<button type="button" data-win="${id}" class="d-sw" aria-pressed="false"><i class="d-lamp" aria-hidden="true"></i><svg viewBox="0 0 24 34" aria-hidden="true"><path class="d-sb" d="M3 4 C 3 2 21 2 21 4 L21 30 C 21 32 3 32 3 30Z"/><path class="d-sl" d="M8 17 L8.6 6 C 8.6 4.6 15.4 4.6 15.4 6 L16 17Z"/></svg><span>${lab}</span></button>`;
  return `<header class="d-top"><div role="heading" aria-level="2" class="pn-hd d-hd" aria-label="Follow the money">${N.letter('Follow the',31)}<br>${N.letter('money',14)}</div>
   <p class="d-lede">If you&rsquo;d bet $100K on every call.<br><span data-lead></span></p></header>
   <div class="d-room"><div class="d-pl"><svg class="d-sv" aria-hidden="true"></svg><div class="d-ax" aria-hidden="true"></div><div class="d-ends"></div></div>
    <div class="d-desk" role="group" aria-label="Which window">${sw('season','Season')}${sw('d7','7 days')}${sw('d1','24h')}</div></div>
   <div class="d-tote"><div class="d-lh" aria-hidden="true"><span></span><span data-c="d1">24h</span><span data-c="d7">7 days</span><span data-c="season">Season</span></div><ol data-rows></ol>
   <p class="d-fine">Each call is its own bet. Buy on up, short on down. No leverage. Before fees.</p></div>`},
 leadLine:w=>PN.leadTxt(w),
 row(m,i,w,v,wid){const tl=(id,val)=>{const t=val?PN.$k(val):'·';return `<span class="d-tl${id===wid?' d-on':''} ${val>0?'pn-u':val<0?'pn-d':''}" aria-label="${t}">${t.split('').map(ch=>`<i>${ch}</i>`).join('')}</span>`};
   return `<li class="d-r${i===0?' d-1':''}" style="--mc:${PN.col(m)}"><span class="d-nm"><i class="d-rk">${i+1}</i><i class="d-chip">${PN.mark(m,'d-mk')}</i><b>${PN.NM[m]}</b></span>${tl('d1',v.d1)}${tl('d7',v.d7)}${tl('season',v.s)}</li>`},
 draw(root,wid){const room=root.querySelector('.d-room'),pl=root.querySelector('.d-pl'),sv=root.querySelector('.d-sv'),rw=room.clientWidth,wide=innerWidth>=900,w=PN.W[wid];
   const pw=wide?Math.min(rw*.66,860):rw-12,box={x:(rw-pw)/2,y:wide?40:16,w:pw},R=[.205,.075,.83,.72],ph=PN.bgRegion(room,PN.IMG+'d-ops2.jpg',1280,720,R,box);
   pl.style.cssText=`left:${box.x}px;top:${box.y}px;width:${pw}px;height:${ph}px`;room.style.height=(box.y+ph+(wide?150:118))+'px';
   const ins={l:wide?60:44,r:wide?130:82,t:14,b:18},iw=pw-ins.l-ins.r,ih=ph-ins.t-ins.b,G=PN.geom(wid,ih,.06),X=x=>ins.l+x/1000*iw,Y=y=>ins.t+y;
   const tk=PN.ticks(G.lo,G.hi,wide?4:3);sv.setAttribute('viewBox',`0 0 ${pw} ${ph}`);
   const ln=G.lines.slice().reverse().map(l=>{const d=l.pts.map((p,i)=>(i?'L':'M')+X(p[0]).toFixed(1)+' '+Y(p[1]).toFixed(1)).join(' ');const ld=l.m===G.w.rank[0];
     return `<path class="d-ln${ld?' d-ld':''}" style="--mc:${PN.col(l.m)}" d="${d}" pathLength="1"/>`}).join('');
   sv.innerHTML=`<defs><filter id="dWax" x="-2%" y="-5%" width="104%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" result="d"/><feComposite in="d" in2="n" operator="arithmetic" k1="0" k2="1" k3="-.35" k4=".1"/></filter></defs>`+
     tk.map(v=>v?`<path class="d-gl" d="M${ins.l} ${Y(G.Y(v)).toFixed(1)} L${pw-ins.r} ${Y(G.Y(v)).toFixed(1)}"/>`:'').join('')+
     `<path class="d-tape" d="M${ins.l-6} ${(Y(G.base)-3).toFixed(1)} L${pw-ins.r+8} ${(Y(G.base)-2.2).toFixed(1)} L${pw-ins.r+7} ${(Y(G.base)+3.4).toFixed(1)} L${ins.l-5} ${(Y(G.base)+2.6).toFixed(1)}Z"/><g filter="url(#dWax)">${ln}</g>`;
   root.querySelector('.d-ax').innerHTML=tk.map(v=>`<span class="d-tk${v===0?' d-t0':''}" style="left:${ins.l-6}px;top:${Y(G.Y(v)).toFixed(1)}px">${v===0?'$0':PN.$k(v).replace('.0K','K')}</span>`).join('')+
     (w.n?`<span class="d-rd" style="left:${ins.l}px;top:${ph-ins.b+2}px">R${w.first.n}</span><span class="d-rd d-rd1" style="left:${pw-ins.r}px;top:${ph-ins.b+2}px">R${w.last.n}</span>`:'');
   const sp=PN.spread(G.lines.map(l=>({m:l.m,v:l.v,y:Y(l.end[1]),py:Y(l.end[1])})),wide?34:27,12,ph-ins.b-14);
   root.querySelector('.d-ends').innerHTML=sp.map(e=>`<span class="pn-end d-end${e.v<0?' d-dn':''}${e.m===G.w.rank[0]?' d-e1':''}" style="left:${pw-ins.r+8}px;top:${e.y.toFixed(1)}px;--mc:${PN.col(e.m)}"><b>${PN.NM[e.m]}</b><em>${PN.$k(e.v)}</em></span>`).join('');
   root.querySelectorAll('.d-lh [data-c]').forEach(s=>s.classList.toggle('d-on',s.dataset.c===wid))},
 after(root){let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;this.draw(root,root.dataset.win)}})}};
