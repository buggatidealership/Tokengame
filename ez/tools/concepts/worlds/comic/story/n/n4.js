/* N4 · The ring card: the bout on the ring's canvas, printed in the golden ticket's gold (what the fight is for), with
   the logo's green, cream and red ropes and each corner's pad in its fighter's colour. Between the two fighters a ring
   card is held up: VS, the window, the gap. Switching turns the card over to the next round's card while the fighters
   duck out under the ropes and the window's pair vaults in: a new round is announced. The undercard sits ringside. */
(function(){const N=SN;
const fx=(x,s)=>{const m=x.F[s],v=s==='a'?x.va:x.vb,w=s==='a'?x.wa:x.wb;
  return `<div class="n4-fx n4-${s}">${N.role(x,s)}${N.face(m,'wc-f-xl n4-f',N.held(m))}<span class="n4-nm">${N.NM[m]}</span><span class="n4-pl">${N.money(m,v)}</span>${N.wlh(w)}</div>`};
const ring=(x,inner,apron)=>`<i class="n4-post n4-pa" style="--c:${x?N.col(x.F.a):'#15121a'}"></i><i class="n4-post n4-pb" style="--c:${x?N.col(x.F.b):'#15121a'}"></i><i class="n4-ropes"></i>${inner}<div class="n4-apron">${apron}</div>`;
window.SNT={
 render:x=>ring(x,`<div class="n4-ring">${fx(x,'a')}<div class="n4-card"><span class="n4-vs">VS</span><b class="n4-wn">${x.w.k==='season'?'Season':x.w.t}</b><span class="n4-gap"><small>Gap</small>${N.gapEl(x)}</span></div>${fx(x,'b')}</div>`,
  `<p class="n4-rs"><small>Ringside</small>${x.under.map(m=>`<span>${N.face(m,'n4-uf')}${N.NM[m]} ${N.money(m,x.amts[m])}</span>`).join('')}</p><p class="n4-line">${x.line}</p>`),
 empty:x=>ring(null,`<div class="n4-ring n4-rq"><div class="n4-card"><span class="n4-vs">No bell</span><b class="n4-wn">in 24 hours</b><span class="n4-gap"><small>Rounds</small><b>0</b></span></div></div>`,
  `<p class="n4-rs"><small>Ringside</small>${['GPT','KIMI','CLAUDE','GROK'].map(m=>`<span>${N.face(m,'n4-uf')}$0</span>`).join('')}</p><p class="n4-line">${N.quiet()}</p>`),
 show:(bout,html,x,prev,anim,after)=>{
  const put=()=>{bout.innerHTML=html;after();if(!anim)return;
   const c=bout.querySelector('.n4-card');if(c)c.animate([{transform:'rotateY(-90deg)'},{transform:'rotateY(12deg)',offset:.7},{transform:'none'}],{duration:340,easing:'ease-out'});
   bout.querySelectorAll('.n4-fx').forEach((f,i)=>f.animate([{transform:`translate(${i?30:-30}px,-70px) rotate(${i?14:-14}deg)`,opacity:0},{transform:`translate(${i?10:-10}px,-40px) rotate(${i?6:-6}deg)`,opacity:1,offset:.45},{transform:'translateY(4px) scale(1.03,.96)',offset:.8},{transform:'none'}],{duration:520,delay:90+i*70,easing:'cubic-bezier(.4,0,.6,1)',fill:'backwards'}));
   bout.querySelectorAll('.n4-post').forEach(p=>p.animate([{filter:'brightness(1.6)'},{filter:'none'}],{duration:400}))};
  const c=bout.querySelector('.n4-card');if(!anim||!c){put();return}
  c.animate([{transform:'none'},{transform:'rotateY(90deg)'}],{duration:190,easing:'ease-in',fill:'forwards'});
  bout.querySelectorAll('.n4-fx').forEach(f=>f.animate([{transform:'none',opacity:1},{transform:'translateY(70px) scale(.9)',opacity:0}],{duration:200,easing:'ease-in',fill:'forwards'}));
  setTimeout(put,190)}};
SN.mount('n4')})();
