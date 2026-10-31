/* Take C, "The money trail": a chart recorder that has been running all season. On a phone the paper unrolls downward out of a
   tall recorder (round 1 at the top, the newest round at the bottom, P&L left to right with break-even printed as a red line);
   from 900px it is the horizontal drum (rounds left to right). Each AI's pen leaves its own ink; the pens' tags sit where the paper
   comes out, joined to where each line ends now. The windows are a rotary selector knob; the rows are brass plates with
   odometer counters. Numbers: PN. */
window.PNT={id:'c',title:'The money trail',beat:'Meanwhile, in the lab, the pens never stop…',zoom:'.pn-c .c-rec',
 html(N){return `<div class="c-sc"><header class="c-top"><div role="heading" aria-level="2" class="pn-hd c-hd" aria-label="The money trail">${N.letter('The money',21)}<br>${N.letter('trail',8)}</div>
   <p class="c-lede">If you&rsquo;d bet $100K on every call.<br><span data-lead></span></p>
   <div class="c-knob" role="group" aria-label="Which window"><svg class="c-kn" viewBox="0 0 60 60" aria-hidden="true"><circle class="c-k0" cx="30" cy="31.5" r="25"/><circle class="c-k1" cx="30" cy="30" r="24"/>
     ${Array.from({length:18},(_,i)=>{const a=i/18*Math.PI*2;return `<path class="c-kg" d="M${(30+Math.cos(a)*24).toFixed(1)} ${(30+Math.sin(a)*24).toFixed(1)} L${(30+Math.cos(a)*20.5).toFixed(1)} ${(30+Math.sin(a)*20.5).toFixed(1)}"/>`}).join('')}
     <circle class="c-k2" cx="30" cy="30" r="15"/><g class="c-kp"><path d="M30 30 L30 8.5"/><circle cx="30" cy="12.5" r="2.4"/></g><path class="c-ks" d="M19 21 C 22 17 27 15.5 31 15.6"/></svg>
     <button type="button" data-win="season" class="c-kl c-kl0" aria-pressed="false">Season</button><button type="button" data-win="d7" class="c-kl c-kl1" aria-pressed="false">7 days</button><button type="button" data-win="d1" class="c-kl c-kl2" aria-pressed="false">24h</button></div></header>
   <div class="c-rec"><div class="c-pl"><svg class="c-sv" aria-hidden="true"></svg><div class="c-ax" aria-hidden="true"></div></div><div class="c-tray"><svg class="c-arms" aria-hidden="true"></svg><div class="c-tags"></div></div></div></div>
   <div class="c-bd"><div class="c-lh" aria-hidden="true"><span></span><span data-c="d1">24h</span><span data-c="d7">7 days</span><span data-c="season">Season</span></div><ol data-rows></ol>
   <p class="c-fine">Each call is its own bet. Buy on up, short on down. No leverage. Before fees.</p></div>`},
 leadLine:w=>PN.leadTxt(w),
 row(m,i,w,v,wid){const ctr=(id,val)=>{const t=val?PN.$k(val):'·';return `<span class="c-ct${id===wid?' c-on':''} ${val>0?'pn-u':val<0?'pn-d':''}" aria-label="${t}">${t.split('').map(ch=>`<i${/[−+]/.test(ch)?' class="c-sg"':''}>${ch}</i>`).join('')}</span>`};
   return `<li class="c-r${i===0?' c-1':''}" style="--mc:${PN.col(m)}"><svg class="c-pt" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${PN.wob(i*9+5,1.3)}"/><circle cx="2.6" cy="50" r="1.6"/><circle cx="97.4" cy="50" r="1.6"/></svg>
     <span class="c-nm"><b class="c-rk">${i+1}</b>${PN.mark(m,'c-mk')}<b>${PN.NM[m]}</b></span>${ctr('d1',v.d1)}${ctr('d7',v.d7)}${ctr('season',v.s)}</li>`},
 draw(root,wid){const wide=innerWidth>=900,rec=root.querySelector('.c-rec'),pl=root.querySelector('.c-pl'),sv=root.querySelector('.c-sv'),w=PN.W[wid];
   const rw=rec.clientWidth;let pw,ph,box;
   if(!wide){pw=Math.min(rw*.62,262);box={x:(rw-pw)/2,y:0,w:pw};ph=PN.bgRegion(rec,PN.IMG+'c-tall.jpg',720,1280,[.295,.205,.755,.70],box);box.y=Math.round(rw*.2);PN.bgRegion(rec,PN.IMG+'c-tall.jpg',720,1280,[.295,.205,.755,.70],box)}
   else{pw=Math.min(rw*.74,900);box={x:(rw-pw)/2,y:70,w:pw};ph=PN.bgRegion(rec,PN.IMG+'c-drum2.jpg',1280,720,[.135,.255,.865,.62],box)}
   pl.style.cssText=`left:${box.x}px;top:${box.y}px;width:${pw}px;height:${ph}px`;rec.style.height=(wide?box.y+ph+150:box.y+ph+92)+'px';
   const all=[].concat(...PN.MS.map(m=>w.ser[m])),lo0=Math.min(0,...all),hi0=Math.max(0,...all),pd=(hi0-lo0||1)*.08,lo=lo0-pd,hi=hi0+pd,n=w.n||1;
   const inset=wide?{a:.02,b:.86}:{a:.04,b:.9};/* time runs inside the paper, room left for the newest end */
   const T=i=>(inset.a+(inset.b-inset.a)*i/n),V=v=>(v-lo)/(hi-lo);
   const P=wide?((i,v)=>[T(i)*pw,(1-V(v))*ph]):((i,v)=>[V(v)*pw,T(i)*ph]);
   const tk=PN.ticks(lo,hi,wide?4:3);
   const line=(a,b)=>`M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
   sv.setAttribute('viewBox',`0 0 ${pw} ${ph}`);
   const grid=tk.map(v=>`<path class="c-gl${v===0?' c-g0':''}" d="${line(P(0,v),P(n,v))}"/>`).join('')+Array.from({length:Math.floor(n/10)+1},(_,k)=>k*10).filter(k=>k&&k<n).map(k=>`<path class="c-gt" d="${line(P(k,lo),P(k,hi))}"/>`).join('');
   const ls=w.rank.slice().reverse().map(m=>{const d=w.ser[m].map((v,i)=>(i?'L':'M')+P(i,v).map(x=>x.toFixed(1)).join(' ')).join(' ');return `<path class="c-ln${m===w.rank[0]?' c-ld':''}" style="--mc:${PN.col(m)}" d="${d}" pathLength="1"/>`}).join('');
   sv.innerHTML=`<defs><filter id="cBleed" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="3"/><feDisplacementMap in="SourceGraphic" scale="1.4"/></filter></defs>${grid}<g filter="url(#cBleed)">${ls}</g>`;
   const ax=root.querySelector('.c-ax');ax.innerHTML=tk.map(v=>{const p=P(wide?0:0,v);return `<span class="c-tk${v===0?' c-t0':''}" style="${wide?`top:${p[1].toFixed(1)}px`:`left:${p[0].toFixed(1)}px`}">${v===0?'$0':PN.$k(v).replace('.0K','K')}</span>`}).join('')+
     (w.n?`<span class="c-rd c-rd0" style="${wide?`left:${P(0,0)[0]}px`:`top:${P(0,0)[1]}px`}">R${w.first.n}</span><span class="c-rd c-rd1" style="${wide?`left:${P(n,0)[0]}px`:`top:${P(n,0)[1]}px`}">R${w.last.n}</span>`:'');
   /* pen tags where the paper comes out: under the paper on a phone, right of the drum on desktop; an arm to each line's end */
   const tray=root.querySelector('.c-tray'),tags=root.querySelector('.c-tags'),arms=root.querySelector('.c-arms');
   const ends=w.rank.map(m=>({m,v:w.tot[m],p:P(n,w.ser[m][n])}));
   if(!wide){const o=ends.slice().sort((a,b)=>a.p[0]-b.p[0]),tw=rw-20,slot=tw/4;
     tray.style.cssText=`top:${box.y+ph+6}px`;tags.innerHTML=o.map((e,i)=>`<span class="pn-end c-tag${e.v<0?' c-dn':''}" style="left:${(10+slot*i).toFixed(1)}px;width:${slot.toFixed(1)}px;--mc:${PN.col(e.m)}"><b>${PN.NM[e.m]}</b><em>${PN.$k(e.v)}</em></span>`).join('');
     arms.setAttribute('viewBox',`0 0 ${rw} 30`);arms.innerHTML=o.map((e,i)=>{const x0=box.x+e.p[0],y0=e.p[1]-ph-6,x1=10+slot*(i+.5);return `<path class="c-arm" style="--mc:${PN.col(e.m)}" d="M${x0.toFixed(1)} ${y0.toFixed(1)} C ${x0.toFixed(1)} ${(y0+16).toFixed(1)}, ${x1.toFixed(1)} 8, ${x1.toFixed(1)} 24"/><circle class="c-tip" cx="${x0.toFixed(1)}" cy="${y0.toFixed(1)}" r="3"/>`}).join('')}
   else{const sp=PN.spread(ends.map(e=>({...e,y:box.y+e.p[1]})),34,box.y+6,box.y+ph-6);tray.style.cssText='';
     tags.innerHTML=sp.map(e=>`<span class="pn-end c-tag c-tw${e.v<0?' c-dn':''}" style="left:${(box.x+pw*inset.b+34).toFixed(1)}px;top:${e.y.toFixed(1)}px;--mc:${PN.col(e.m)}"><b>${PN.NM[e.m]}</b><em>${PN.$k(e.v)}</em></span>`).join('');
     arms.setAttribute('viewBox',`0 0 ${rw} ${rec.clientHeight}`);arms.innerHTML=sp.map(e=>{const x0=box.x+e.p[0],y0=box.y+e.p[1],x1=box.x+pw*inset.b+30;return `<path class="c-arm" style="--mc:${PN.col(e.m)}" d="M${x0.toFixed(1)} ${y0.toFixed(1)} C ${(x0+18).toFixed(1)} ${y0.toFixed(1)}, ${(x1-14).toFixed(1)} ${e.y.toFixed(1)}, ${x1.toFixed(1)} ${e.y.toFixed(1)}"/><circle class="c-tip" cx="${x0.toFixed(1)}" cy="${y0.toFixed(1)}" r="3.4"/>`}).join('')}
   root.querySelector('.c-kp').style.transform=`rotate(${{season:-50,d7:0,d1:50}[wid]}deg)`;
   root.querySelectorAll('.c-lh [data-c]').forEach(s=>s.classList.toggle('c-on',s.dataset.c===wid))},
 after(root){let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;this.draw(root,root.dataset.win)}})}};
