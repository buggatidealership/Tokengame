/* G3 · The banner: the mark printed on a fight-night cloth banner (helper a's G2 golden-age newsprint genre), hung from a pole over the ring.
   It drops open when the card comes into view, then flutters for good: cut into vertical strips that ride one travelling wave,
   each strip shading as it swings back. Undercards: the same print, still, as their tile. */
(function(){const G=SG,{cv,rgb,dil,ring,mix,px,grain,INK,NEWS,rnd,hash}=G;
const fit=(m,W,H,bw,bh,cx,cy)=>{const s=Math.min(bw/m.width,bh/m.height),w=m.width*s,h=m.height*s,c=cv(W,H),x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(m,cx-w/2,cy-h/2,w,h);return c};
/* golden-age print: flat colour plates a little out of register, a black keyline, newsprint grain */
function print(x,W,H,m,B,R,bw,bh,cx,cy){const o=Math.max(1,W*.006),L=fit(m,W,H,bw,bh,cx,cy);x.drawImage(dil(L,W*.012,NEWS),0,0);
  const col=px(fit(m,W,H,bw,bh,cx,cy),(d,i)=>{for(let k=0;k<3;k++)d[i+k]=Math.round(d[i+k]/64)*64*.92+18});
  x.save();x.globalCompositeOperation='multiply';x.drawImage(col,o,o*.7);x.restore();x.drawImage(ring(L,Math.max(1,W*.005),INK),0,0);
  const dk=px(fit(m,W,H,bw,bh,cx,cy),(d,i)=>{if(Math.max(d[i],d[i+1],d[i+2])<70){d[i]=INK[0];d[i+1]=INK[1];d[i+2]=INK[2]}else d[i+3]=0});x.drawImage(dk,0,0)}
function banner(W,H,M,R,d){const c=cv(W,H),x=c.getContext('2d'),B=M.B,BD=mix(B,INK,.35),hem=H*.1,fr=H*.08,cloth=H-fr;
  x.fillStyle=rgb(NEWS);x.fillRect(0,0,W,cloth);x.fillStyle=rgb(BD);x.fillRect(0,0,W,hem);x.fillRect(0,cloth-hem,W,hem);
  x.strokeStyle=rgb(mix(B,[255,255,255],.7));x.setLineDash([W*.012,W*.008]);x.lineWidth=Math.max(1,d*1.2);[hem*.62,cloth-hem*.62].forEach(y=>{x.beginPath();x.moveTo(0,y);x.lineTo(W,y);x.stroke()});x.setLineDash([]);
  print(x,W,H,M.m,B,R,W*.9,(cloth-2*hem)*.9,W/2,cloth/2);
  grain(x,W,cloth,R,W*cloth/90,.2);x.save();x.globalCompositeOperation='multiply';x.fillStyle=rgb([250,238,205],.45);x.fillRect(0,0,W,cloth);x.restore();
  x.strokeStyle=rgb(INK);x.lineWidth=Math.max(2,d*2.5);x.strokeRect(x.lineWidth/2,x.lineWidth/2,W-x.lineWidth,cloth-x.lineWidth);
  const n=Math.round(W/(7*d));for(let i=0;i<n;i++){const X=(i+.5)*W/n;x.fillStyle=rgb(i%2?[253,188,42]:[201,138,18]);x.fillRect(X-W/n*.32,cloth-1,W/n*.64,fr*(.75+R()*.25));x.fillStyle=rgb(INK);x.fillRect(X-W/n*.32,cloth-1,W/n*.64,Math.max(1,d))}
  return c}
G.art={
  async main(el,card,M){const b=el.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1),R=rnd(hash(card.dataset.t+'g3')),bd=card.querySelector('.sg-bd');
    /* phones: a wide banner over the ring; desktop (the corners keep left): a tall drop banner on the right, the full height of the card */
    const tall=b.width>900;let top=parseFloat(getComputedStyle(bd).getPropertyValue('--bnt'))||28,bh=parseFloat(getComputedStyle(bd).getPropertyValue('--bnh'))||110,bx=10,bw=b.width-2*bx;
    if(tall){bw=Math.min(380,b.width*.3);bx=b.width-bw-28;top=34;bh=b.height-46}
    const W=Math.round(bw*d),H=Math.round(bh*d);
    const url=banner(W,H,M,R,d).toDataURL('image/png'),N=Math.max(10,Math.round(bw/22)),sw=bw/N;
    const wrap=document.createElement('div');wrap.className='sg3-bn';wrap.style.cssText=`left:${bx}px;top:${top}px;width:${bw}px;height:${bh}px`;
    wrap.innerHTML='<i class="sg3-pole"></i>'+Array.from({length:N},(_,i)=>`<i class="sg3-sl" style="left:${(i*sw).toFixed(2)}px;width:${(sw+.6).toFixed(2)}px;background-image:url(${url});background-size:${bw}px ${bh}px;background-position:${(-i*sw).toFixed(2)}px 0;animation-delay:${(-(i/N)*1.6).toFixed(2)}s"></i>`).join('');
    el.appendChild(wrap);el.style.background=`radial-gradient(rgba(0,0,0,.16) 1.1px,transparent 1.5px) 0 0/6px 6px,${rgb(M.B)}`},
  async mini(el,card,M){const d=Math.min(2,devicePixelRatio||1),W=Math.round(40*d),c=cv(W,W),x=c.getContext('2d'),R=rnd(hash(card.dataset.t+'g3m'));
    x.fillStyle=rgb(NEWS);x.fillRect(0,0,W,W);x.fillStyle=rgb(M.B);x.fillRect(0,0,W,W*.13);x.fillRect(0,W*.87,W,W*.13);print(x,W,W,M.m,M.B,R,W*.8,W*.62,W/2,W/2);grain(x,W,W,R,W*W/90,.2);el.appendChild(c)}};
G.go('sg3')})();
