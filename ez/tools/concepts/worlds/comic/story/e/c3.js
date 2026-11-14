/* C3 · The loop: the tagline becomes four small panels joined in a loop (call, close, golden ticket, the bet), the way every
   round repeats; a gold dot runs the loop. Starring and the film as today. */
(function(){const S=SE,cv=S.D.querySelector('#wc-book .wc-cover');if(!cv)return S.ready();
  const K='#15121a',st=`stroke="${K}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
  const I={
    call:`<svg viewBox="0 0 64 48"><path d="M6 6h22a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H16l-7 7 1-7H6a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" fill="#13a35a" ${st}/><path d="M17 12l-6 10h12z" fill="#fff"/>
      <path d="M36 14h22a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-4l1 7-7-7H36a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z" fill="#e0352d" ${st}/><path d="M41 22h12l-6 10z" fill="#fff"/></svg>`,
    bell:`<svg viewBox="0 0 48 48"><path d="M24 5c-9 0-13 8-13 16v8l-5 7h36l-5-7v-8c0-8-4-16-13-16z" fill="#fdbc2a" ${st}/><circle cx="24" cy="41" r="4" fill="${K}"/><path d="M24 2v4" ${st}/>
      <path d="M3 14l4 2M45 14l-4 2M2 24h5M46 24h-5" ${st}/></svg>`,
    tix:`<svg viewBox="0 0 64 48"><path d="M4 10h56v9a5 5 0 0 0 0 10v9H4v-9a5 5 0 0 0 0-10z" fill="#fdbc2a" ${st}/><path d="M18 11v26" stroke="${K}" stroke-width="2" stroke-dasharray="3 3"/>
      <path d="M40 15l3 7 7 .5-5.5 4.5 2 7-6.5-4-6.5 4 2-7-5.5-4.5 7-.5z" fill="#fff" ${st} stroke-width="2"/></svg>`,
    bet:`<svg viewBox="0 0 72 48"><circle cx="20" cy="24" r="15" fill="#fdbc2a" ${st}/><text x="20" y="30" text-anchor="middle" font-family="Bangers,Impact,sans-serif" font-size="16" fill="${K}">$EZ</text>
      <path d="M13 6l7-5 7 5" fill="none" stroke="#13a35a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M54 44c-9 0-13-6-12-12 1-5 5-7 5-13 4 3 5 6 5 9 2-2 3-4 3-7 5 4 8 9 8 13 0 6-4 10-9 10z" fill="#e0352d" ${st}/><path d="M54 44c-4 0-6-3-5-6 1-2 3-3 3-6 3 3 6 5 6 8s-2 4-4 4z" fill="#fdbc2a"/></svg>`};
  const P=[['call','They call it <b>before</b> earnings'],['bell','The close grades every call'],['tix','Top P&amp;L gets the golden ticket'],['bet','We bet the pool on its call']];
  const tag=cv.querySelector('.wc-tag');tag.classList.add('se-hide');
  tag.insertAdjacentHTML('afterend',`<div class="se-c3"><div class="se-c3g">${P.map((p,i)=>`<div class="se-c3p se-c3-${i+1}" style="--i:${i}"><span class="se-c3n">${i+1}</span>${I[p[0]]}<p>${p[1]}</p></div>`).join('')}
    <svg class="se-c3w" aria-hidden="true"></svg></div><p class="se-c3o"><span class="se-c3r">Right: $EZ buyback.</span> <span class="se-c3x">Wrong: the pool can be wiped out.</span></p></div>`);
  const box=cv.querySelector('.se-c3g'),svg=box.querySelector('.se-c3w');
  const draw=()=>{const b=box.getBoundingClientRect(),ps=[...box.querySelectorAll('.se-c3p')].map(p=>{const r=p.getBoundingClientRect();return {x:r.left-b.left+r.width/2,y:r.top-b.top+r.height/2,r}});
    const row=Math.abs(ps[0].y-ps[3].y)<4,W=b.width,Hh=b.height;svg.setAttribute('viewBox',`0 0 ${W} ${Hh}`);
    let d,heads=[];
    if(row){const y=ps[0].y,yb=Hh-4;d=`M${ps[0].x} ${y}H${ps[3].x}Q${ps[3].x+30} ${y} ${ps[3].x+30} ${(y+yb)/2}Q${ps[3].x+30} ${yb} ${ps[3].x} ${yb}H${ps[0].x}Q${ps[0].x-30} ${yb} ${ps[0].x-30} ${(y+yb)/2}Q${ps[0].x-30} ${y} ${ps[0].x} ${y}Z`;
      for(let i=0;i<3;i++)heads.push([(ps[i].r.right+ps[i+1].r.left)/2-b.left,y,0]);heads.push([(ps[1].x+ps[2].x)/2,yb,180])}
    else{const [a,bb,c,dd]=ps;const R=14;d=`M${a.x} ${a.y}H${bb.x}V${c.y}H${dd.x}Z`;
      heads=[[(a.r.right+bb.r.left)/2-b.left,a.y,0],[bb.x,(bb.r.bottom+c.r.top)/2-b.top,90],[(dd.r.right+c.r.left)/2-b.left,c.y,180],[a.x,(a.r.bottom+dd.r.top)/2-b.top,270]]}
    svg.innerHTML=`<path class="se-c3l" d="${d}"/>`+heads.map(h=>`<path class="se-c3h" d="M-7 -8L7 0L-7 8z" transform="translate(${h[0]} ${h[1]}) rotate(${h[2]})"/>`).join('')
      +(S.rm()?`<circle class="se-c3d" r="6" cx="${ps[0].x}" cy="${ps[0].y}"/>`:`<circle class="se-c3d" r="6"><animateMotion dur="9s" repeatCount="indefinite" path="${d}"/></circle>`)};
  draw();let w=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w){w=innerWidth;draw()}});S.D.fonts.ready.then(draw);
  S.once(cv.querySelector('.se-c3'),.4);S.ready()})();
