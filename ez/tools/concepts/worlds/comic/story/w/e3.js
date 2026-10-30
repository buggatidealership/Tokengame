/* E3 · Ride the move: the move is the actor. A thick comic arrow (green up, red down) shoots out of the company's mark; how steep it
   is says how big the move was. The winner rides its head with the crown, the others who got the direction ride along, the ones
   who called the wrong way are thrown off. Nobody won: all four tumble. The stub keeps #, ticker, move, stamp. */
(async function(){const X=WW;
  const draw=async(a,r)=>{const art=a.querySelector('.wc-bi-art');if(!art||art.querySelector('.ww-p'))return;
    const bm=await X.brand(r.ticker),up=r.a>0,W=X.W(r),cs=X.calls(r),x=Math.abs(r.a);
    art.style.setProperty('--bm',bm);art.style.setProperty('--bt',X.onBrand(bm));art.classList.add('ww-d');
    /* the arrow in a 100 x 86 box: same span every time, the rise grows with the move (the page's sfx steps) */
    const dy=x<1.5?12:x<4?26:x<8?42:56,sx=10,ex=80,sy=up?47+dy/2:47-dy/2,ey=up?47-dy/2:47+dy/2;
    const L=Math.hypot(ex-sx,ey-sy),ux=(ex-sx)/L,uy=(ey-sy)/L,nx=uy,ny=-ux,hw=5,hh=11,hl=13;   /* (nx,ny) points to the arrow's upper side */
    const bx=ex-ux*hl,by=ey-uy*hl,P=(px,py)=>px.toFixed(1)+','+py.toFixed(1);
    const poly=[P(sx+nx*hw,sy+ny*hw),P(bx+nx*hw,by+ny*hw),P(bx+nx*hh,by+ny*hh),P(ex+ux*3,ey+uy*3),P(bx-nx*hh,by-ny*hh),P(bx-nx*hw,by-ny*hw),P(sx-nx*hw,sy-ny*hw)].join(' ');
    const right=cs.filter(c=>c.up===up).sort((p,q)=>(W.includes(q.m)-W.includes(p.m))||p.off-q.off),wrong=cs.filter(c=>c.up!==up);
    const at=(t,o)=>({x:sx+(ex-sx)*t+nx*o,y:sy+(ey-sy)*t+ny*o});
    const riders=right.map((c,i)=>{const w=W.includes(c.m),q=at(w?.86:[.62,.42,.22][Math.min(2,i-(W.includes(right[0].m)?1:0))]||.3,w?14:11);
      return `<span class="ww3-r${w?' ww3-win':''}" style="left:${q.x}%;top:${q.y/0.86}%">${w?'<i class="ww3-cr">👑</i>':''}${X.face(c.m,'ww3-f')}</span>`}).join('');
    /* thrown off: the corner below the arrow */
    const spots=up?[[66,74],[84,66],[52,82],[86,84]]:[[12,82],[28,74],[8,62],[30,88]];
    const fall=wrong.map((c,i)=>`<span class="ww3-o" style="left:${spots[i][0]}%;top:${spots[i][1]/0.86}%;--r:${[-130,70,160,-40][i]}deg">${X.face(c.m,'ww3-f')}</span>`).join('');
    art.insertAdjacentHTML('beforeend',`<span class="ww-p ww3 ${up?'ww-up':'ww-dn'}${right.length?'':' ww3-all'}" aria-hidden="true">
      <svg class="ww3-sv" viewBox="0 0 100 86" preserveAspectRatio="none"><g class="ww3-sp">${[-9,0,9].map(o=>`<line x1="${(sx-ux*4+nx*o).toFixed(1)}" y1="${(sy-uy*4+ny*o).toFixed(1)}" x2="${(sx-ux*22+nx*o).toFixed(1)}" y2="${(sy-uy*22+ny*o).toFixed(1)}"/>`).join('')}</g>
      <polygon class="ww3-ar" points="${poly}"/><polygon class="ww3-ar2" points="${poly}"/></svg>
      <span class="ww3-tail" style="left:${sx}%;top:${sy/0.86}%">${X.lgDisc(r.ticker,'ww3-lg')}</span>
      <b class="ww3-sfx ${up?'ww3-sfu':'ww3-sfd'}">${X.sfx(r.a)}</b>${riders}${fall}</span>`);
    art.querySelectorAll('.ww-lg img').forEach(X.capImg)};
  X.eachNoFilm(draw);X.demo(draw);
  X.ready('e3')})();
