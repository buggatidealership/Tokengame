/* N2 · Bill posting: each window is a fight poster pasted on the kraft hoarding. The poster's stock is the headliner's
   colour (who tops this window's bill); a gold strip pasted across its corner carries the gap. Switching slaps a new
   poster over the old one, which stays on the wall underneath, a corner peeking out: the bills you've looked at. */
(function(){const N=SN;
const tag=x=>x.w.k==='season'?'Title fight · the season':x.w.t+' · '+x.w.when;
const fx=(x,s)=>{const m=x.F[s],v=s==='a'?x.va:x.vb,w=s==='a'?x.wa:x.wb;
  return `<div class="n2-fx n2-${s}">${N.role(x,s)}${N.face(m,'wc-f-xl n2-f',N.held(m))}<span class="n2-pl">${N.money(m,v)}</span>${N.wlh(w)}</div>`};
const poster=x=>`<article class="n2-po" style="--c:${N.col(x.F.a)};--d:${N.dots(x.F.a)}"><p class="n2-tg">${tag(x)}</p>
  <div class="n2-bd">${fx(x,'a')}<div class="n2-nm"><b class="n2-na">${N.NM[x.F.a]}</b><i>vs</i><b class="n2-nb" style="--cb:${N.col(x.F.b)}">${N.NM[x.F.b]}</b></div>${fx(x,'b')}</div>
  <span class="n2-strip"><small>Gap</small>${N.gapEl(x)}</span>
  <p class="n2-ub"><small>Also on the bill</small>${x.under.map(m=>`<span>${N.face(m,'n2-uf')}${N.NM[m]} ${N.money(m,x.amts[m])}</span>`).join('')}</p>
  <p class="n2-line">${x.line}</p></article>`;
const quiet=x=>`<article class="n2-po n2-pq"><p class="n2-tg">Last 24 hours</p><div class="n2-qh"><b>No bell</b><i>in the last</i><b>24 hours</b></div>
  <p class="n2-ub n2-qf">${['GPT','KIMI','CLAUDE','GROK'].map(m=>`<span>${N.face(m,'n2-uf')}$0</span>`).join('')}</p><p class="n2-line">${N.quiet()}</p></article>`;
window.SNT={render:poster,empty:quiet,
 show:(bout,html,x,prev,anim,after)=>{let wall=bout.querySelector('.n2-wall');if(!wall){bout.innerHTML='<div class="n2-wall"></div>';wall=bout.firstChild}
  const old=[...wall.querySelectorAll('.n2-po')];wall.insertAdjacentHTML('beforeend',html);const nw=wall.lastElementChild;
  /* the old bill stays pasted underneath: shifted, turned, only its corner showing */
  old.forEach((o,i)=>{const k=old.length-i;o.classList.add('n2-old');o.style.setProperty('--k',k);if(k>2)o.remove()});
  after();
  if(anim){nw.animate([{transform:'translate(18px,-46px) rotate(6deg) scale(1.12)',opacity:0,offset:0},{transform:'translate(0,4px) rotate(-1.2deg) scale(.985,1.02)',opacity:1,offset:.62},{transform:'rotate(-.6deg) scale(1.006,.994)',offset:.82},{transform:'rotate(-.8deg)'}],{duration:420,easing:'cubic-bezier(.2,.8,.3,1)'});
   wall.animate([{transform:'none'},{transform:'translateY(2px)',offset:.65},{transform:'translateY(-1px)',offset:.8},{transform:'none'}],{duration:420});
   const st=nw.querySelector('.n2-strip');if(st)st.animate([{clipPath:'inset(0 100% 0 0)',transform:'rotate(-4deg)'},{clipPath:'inset(0 0 0 0)',transform:'rotate(-4deg)'}],{duration:260,delay:420,easing:'ease-out',fill:'backwards'})}}};
SN.mount('n2')})();
