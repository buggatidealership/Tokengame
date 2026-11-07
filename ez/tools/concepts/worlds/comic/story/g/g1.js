/* G1 · The blow-up: the company's familiar part (Amazon's smile, Starbucks' siren) blown up past the card's edges in pop-art Ben-Day dots
   and a heavy ink line, drifting slowly like a camera across a fight poster. Undercards: the same blow-up, still, as their tile. */
(function(){const G=SG,{cv,rgb,dil,dots,INK,CREAM,mix}=G;
const fit=(m,W,H,kw,kh,cx,cy)=>{const s=Math.min(kw*W/m.width,kh*H/m.height),w=m.width*s,h=m.height*s,c=cv(W,H),x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(m,cx*W-w/2,cy*H-h/2,w,h);return c};
function pop(W,H,part,B,kw,kh,cx,cy,ol0){const k0=Math.min(kw*W/part.width,kh*H/part.height),ol=Math.max(2,Math.min(ol0,part.height*k0*.045));const c=cv(W,H),x=c.getContext('2d');x.fillStyle=rgb(CREAM);x.fillRect(0,0,W,H);
  dots(x,W,H,Math.max(6,Math.min(W/26,H/8)),rgb(mix(B,CREAM,.15)),(u,v)=>.12+.32*Math.min(1,(u+v)/1.5));
  const L=fit(part,W,H,kw,kh,cx,cy);x.drawImage(dil(L,ol,INK),0,0);x.drawImage(L,0,0);
  const sh=cv(W,H),s=sh.getContext('2d');dots(s,W,H,Math.max(4,Math.min(W/48,H/15)),rgb(INK,.5),(u,v)=>Math.max(0,(u+v-1.05)*.8));s.globalCompositeOperation='destination-in';s.drawImage(L,0,0);x.drawImage(sh,0,0);return c}
G.art={
  async main(el,card,M){const r=el.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1),W=Math.round(r.width*1.2*d),H=Math.round(r.height*1.2*d);
    /* a wide part (a smile, a wordmark) shows whole across the card; a round or square one is blown past the edges on the right */
    const wide=M.part.width/M.part.height>1.6;
    let kw=wide?.8:1.0,kh=wide?.6:1.05,cx=wide?.52:.66,cy=wide?.4:.44;
    if(card.classList.contains('sg-wm')){const b=G.band(card),Hc=r.height,Wc=r.width,rr=card.querySelector('.sg-ring').getBoundingClientRect().right-r.left;
      if(Wc>900&&Wc-rr>260){kw=(Wc-rr)*.82/(Wc*1.2);kh=.6/1.2;cx=((rr+Wc)/2+Wc*.1)/(Wc*1.2);cy=.5}
      else{kw=.74;kh=(b.b-b.t)*.85/(Hc*1.2);cx=.5;cy=((b.t+b.b)/2+Hc*.1)/(Hc*1.2)}}
    const c=pop(W,H,M.part,M.B,kw,kh,cx,cy,Math.max(6,W*.016));
    c.className='sg1-c';el.appendChild(c);card.classList.add('sg1-'+M.how)},
  async mini(el,card,M){const d=Math.min(2,devicePixelRatio||1),W=Math.round(40*d),c=pop(W,W,M.part,M.B,.86,.86,.5,.5,Math.max(2,W*.04));el.appendChild(c)}};
G.go('sg1')})();
