/* O5 · The needle lands. The market box above the ring becomes a meter: up on the bulls' side, down on the bears' side,
   each AI's face printed on the dial where it predicted. The close swings the needle from 0 and it settles on the move;
   the half it lands in lights up and the other half greys, then the corners below follow (PASS or FAIL slams on each
   fighter); last, a gold arc measures the gap from the needle to the closest face on the right side, and the crown drops
   on it. One instrument shows the whole rule: the side passes, the closest pass wins. Plays once on view; tap the meter
   to play it again. Reduced motion: the graded panel. Scale: 10% each way (a call beyond sits at the end stop). */
(function(){const S=SO,P=S.p3();if(!P){S.ready('o5');return}const {pn,d,ring,fs,order,says,rule,win,lose}=P,cl=S.cl,out=S.out;
  pn.classList.add('so5');const A=d.r.a,up=A>0,cx=160,cy=140,R=104,MX=10;
  const ang=v=>90+Math.max(-MX,Math.min(MX,v))*(90/MX),pt=(v,r)=>{const a=ang(v)*Math.PI/180;return [cx+r*Math.cos(a),cy-r*Math.sin(a)]};
  const arc=(v0,v1,r)=>{const [x0,y0]=pt(v0,r),[x1,y1]=pt(v1,r);return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 ${v0>v1?1:0} ${x1.toFixed(1)} ${y1.toFixed(1)}`};
  let ticks='';for(let v=-MX;v<=MX;v+=2.5){const [a,b]=pt(v,R-11),[c,e]=pt(v,R+11),[g,h]=pt(v,R-(v%5===0?19:15));ticks+=`<path class="so5-tk${v===0?' so5-tk0':''}" d="M${g.toFixed(1)} ${h.toFixed(1)}L${a.toFixed(1)} ${b.toFixed(1)}"/>`}
  /* faces: at their calls, pushed apart along the dial where two would touch */
  const cs=d.cs.map(x=>({...x,v:x.c.up?x.c.v:-x.c.v})).sort((a,b)=>b.v-a.v);let prev=null;cs.forEach(x=>{x.a=ang(x.v);if(prev!=null&&prev-x.a<13)x.a=prev-13;prev=x.a});
  const best=cs.filter(x=>x.ok).sort((a,b)=>a.off-b.off)[0];
  const face=x=>{const r=R+34,a=x.a*Math.PI/180,X=cx+r*Math.cos(a),Y=cy-r*Math.sin(a);return `<span class="so5-mk${x.ok?' so5-ok':' so5-no'}" data-m="${x.m}" style="left:${(X/320*100).toFixed(2)}%;top:${(Y/190*100).toFixed(2)}%">${SD.face(x.m,'so5-f')}${x===best?'<em class="so5-cr" aria-hidden="true">♛</em>':''}</span>`};
  const gap=best?Math.abs(best.v-A):0,G=best?`<path class="so5-gap" d="${arc(A,best.v,R+15)}"/>`:'';
  const [lx,ly]=best?pt((A+best.v)/2,R+6):[0,0];
  says.insertAdjacentHTML('beforebegin',`<div class="so5-g" role="img" aria-label="${SD.esc(d.r.co)} ${up?'rose':'fell'} ${SD.pct(A)} at the close. ${cs.map(x=>SD.NM[x.m]+(x.ok?' right':' wrong')).join(', ')}.${best?' '+SD.NM[best.m]+' was closest, '+gap.toFixed(2)+'% off.':''}" tabindex="0">
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <path class="so5-bd so5-up" d="${arc(MX,0,R)}"/><path class="so5-bd so5-dn" d="${arc(0,-MX,R)}"/>${ticks}
      <text class="so5-lb so5-lu" x="${pt(7.6,R-36)[0].toFixed(1)}" y="${pt(7.6,R-36)[1].toFixed(1)}">▲ Up</text><text class="so5-lb so5-ld" x="${pt(-7.6,R-36)[0].toFixed(1)}" y="${pt(-7.6,R-36)[1].toFixed(1)}">Down ▼</text>
      <text class="so5-sc" x="${cx-R}" y="${cy+24}">+10%</text><text class="so5-sc" x="${cx+R}" y="${cy+24}">−10%</text><text class="so5-sc" x="${cx}" y="${cy-R-16}">0</text>
      ${cs.map(x=>{const [a,b]=pt(x.v,R+11),[c,e]=pt(x.v,R+20);return `<path class="so5-ct so5-c${x.ok?'ok':'no'}" data-m="${x.m}" d="M${a.toFixed(1)} ${b.toFixed(1)}L${c.toFixed(1)} ${e.toFixed(1)}"/>`}).join('')}
      ${G}<g class="so5-nd"><path d="M${cx-5} ${cy}L${cx} ${cy-R+16}L${cx+5} ${cy}Z"/><circle cx="${cx}" cy="${cy}" r="11"/><circle class="so5-hub" cx="${cx}" cy="${cy}" r="4"/></g>
    </svg>${cs.map(face).join('')}
    ${best?`<b class="so5-off" style="left:${(lx/320*100).toFixed(2)}%;top:${(ly/190*100).toFixed(2)}%">${gap.toFixed(2)}% off</b>`:''}
    <span class="so5-rd ${up?'so5-rU':'so5-rD'}"><small>The close</small> ${up?'▲ +':'▼ −'}${SD.pct(A)}</span></div>`);
  const g=pn.querySelector('.so5-g'),nd=g.querySelector('.so5-nd'),bw=g.querySelector(up?'.so5-up':'.so5-dn'),bl=g.querySelector(up?'.so5-dn':'.so5-up'),rd=g.querySelector('.so5-rd'),
    mks=[...g.querySelectorAll('.so5-mk')],gp=g.querySelector('.so5-gap'),off=g.querySelector('.so5-off'),cr=g.querySelector('.so5-cr');
  if(gp){const L=gp.getTotalLength();gp.style.strokeDasharray=`5 5`;gp.dataset.L=L}
  const target=-(ang(A)-90);   /* the needle's turn (clockwise positive) */
  const T={sw:0,lit:1.35,st:1.7,sd:.24};const tG=T.st+T.sd*order.length+.1,DUR=tG+1;
  const nwf=fs.find(f=>!f.win),plain=nwf?getComputedStyle(nwf.el.querySelector('.sd2-f')).boxShadow:'none';
  function draw(t){const k=t<0?0:t;const rot=t<0?0:target*(1-Math.exp(-3.2*k)*Math.cos(7.5*k));nd.style.transform=`rotate(${rot.toFixed(2)}deg)`;
    const r=cl((t-1.05)/.2);rd.style.opacity=t<1.05?0:1;rd.style.transform=`translateX(-50%) scale(${(r<1?1.5-.5*out(r):1).toFixed(3)})`;
    const L=cl((t-T.lit)/.3);bw.style.opacity=(.35+.65*L).toFixed(2);bl.style.opacity=(.35-.15*L).toFixed(2);bl.style.filter=`grayscale(${L.toFixed(2)})`;
    g.querySelectorAll('.so5-cno').forEach(c=>c.style.opacity=(1-.6*L).toFixed(2));
    mks.forEach(m=>{const ok=m.classList.contains('so5-ok');m.style.filter=ok?'':`grayscale(${(.9*L).toFixed(2)})`;m.style.opacity=ok?1:(1-.45*L).toFixed(2)});
    const c=cl((t-T.lit-.1)/.4);lose.style.filter=`grayscale(${(.9*c).toFixed(2)})`;lose.style.opacity=(1-.4*c).toFixed(2);
    win.style.boxShadow=c>0?`0 0 0 ${(3*c).toFixed(1)}px var(--wc-gold),4px 4px 0 3px var(--wc-ink)`:'none';
    order.forEach((f,i)=>{const a=T.st+i*T.sd,q=cl((t-a)/.14);if(f.pf){f.pf.style.opacity=t<a?0:1;f.pf.style.transform=`rotate(-10deg) scale(${(q<1?2.4-1.4*out(q):1).toFixed(3)})`}});
    if(gp){const q=cl((t-tG)/.45),Lg=+gp.dataset.L;gp.style.opacity=q>0?1:0;gp.style.strokeDashoffset=0;gp.style.clipPath='';gp.setAttribute('stroke-dasharray',`5 5`);gp.style.strokeDasharray=`${(Lg*q).toFixed(1)} ${Lg}`}
    if(off)off.style.opacity=cl((t-tG-.35)/.25);
    const w=cl((t-tG-.5)/.25);if(cr){cr.style.opacity=w;cr.style.transform=`translate(-50%,${((1-out(w))*-14).toFixed(1)}px) rotate(-8deg)`}
    fs.forEach(f=>{if(f.cr){f.cr.style.opacity=w;f.cr.style.transform=`translateX(-50%) translateY(${((1-out(w))*-18).toFixed(1)}px) rotate(-8deg)`}
      if(f.win){const fc=f.el.querySelector('.sd2-f');if(fc)fc.style.boxShadow=w>0?'':plain}});
    if(rule)rule.style.opacity=cl((t-tG-.6)/.4)}
  S.timeline(pn,draw,DUR,g);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();g.click()}});S.H.classList.add('so-o5');S.ready('o5')})();
