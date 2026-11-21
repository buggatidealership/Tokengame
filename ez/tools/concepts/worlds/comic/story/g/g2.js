/* G2 · The charge: the whole mark at the heart of a Kirby energy burst (helper a's G4 genre), split into layers so it lives:
   the rays turn, the krackle and a shock ring pulse out from the mark. The pulse quickens as the bell nears
   (about 4 s a beat a day out, 1.2 s in the last hour): the motion is the countdown. Undercards: the same burst, still. */
(function(){const G=SG,{cv,rgb,dil,mix,INK,CREAM,rnd,hash}=G;
const fit=(m,W,H,bw,bh,cx,cy)=>{const s=Math.min(bw/m.width,bh/m.height),w=m.width*s,h=m.height*s,c=cv(W,H),x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(m,cx-w/2,cy-h/2,w,h);return c};
/* the krackle: clusters of ink dots in a band around the mark; the band is found on a quarter-size copy (dilation is the slow part) */
function krackle(Ls,q,W,H,R,n){const band=dil(Ls,Ls.width*.11,INK),inner=dil(Ls,Ls.width*.06,INK),w=Ls.width,h=Ls.height,bd=band.getContext('2d').getImageData(0,0,w,h).data,id=inner.getContext('2d').getImageData(0,0,w,h).data,c=cv(W,H),x=c.getContext('2d'),pts=[];
  for(let k=0;k<6000&&pts.length<n;k++){const X=(R()*w)|0,Y=(R()*h)|0,i=(Y*w+X)*4;if(bd[i+3]>100&&id[i+3]<40)pts.push([X*q,Y*q])}
  x.fillStyle=rgb(INK);pts.forEach(([X,Y])=>{const k=1+((R()*3)|0);for(let j=0;j<k;j++){x.beginPath();x.arc(X+(R()-.5)*W*.03,Y+(R()-.5)*W*.03,W*(.007+R()*.022),0,7);x.fill()}});return c}
G.art={
  async main(el,card,M){const b=el.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1),Wc=b.width,Hc=b.height,W=Math.round(Wc*d),H=Math.round(Hc*d),R=rnd(hash(card.dataset.t+'g2'));
    const ring=card.querySelector('.sg-ring'),top=ring.getBoundingClientRect().top-b.top,wide=M.m.width/M.m.height>1.8;
    const wm=card.classList.contains('sg-wm'),bnd=G.band(card);
    let cx=wm?Wc*.5:Wc*(wide?.62:.72),cy=wm?(bnd.t+bnd.b)/2:Math.max(48,top*.5),bw=wm?Wc*.84:Wc*(wide?.62:.4),bh=wm?(bnd.b-bnd.t)*.78:Math.min(top*.86,Wc*.42);
    /* desktop: the corners keep to the left, so the burst takes the free right side, full height */
    const rr=ring.getBoundingClientRect().right-b.left;if(Wc>900&&Wc-rr>260){cx=(rr+Wc)/2+6;cy=Hc*.5;bw=(Wc-rr)*.8;bh=Hc*.7}
    el.style.setProperty('--cx',cx+'px');el.style.setProperty('--cy',cy+'px');
    /* the field and the rays are CSS (a radial and a conic gradient on two layers), so only the krackle and the mark are canvases */
    const B=M.B;el.style.setProperty('--b0',rgb(mix(B,[255,255,255],.45)));el.style.setProperty('--b1',rgb(B));el.style.setProperty('--b2',rgb(mix(B,INK,.62)));
    const D=Math.ceil(Math.hypot(Wc,Hc)*2.2),rc=document.createElement('i');rc.className='sg2-ray';rc.style.cssText=`width:${D}px;height:${D}px;left:${cx-D/2}px;top:${cy-D/2}px`;
    const q=4,L=fit(M.m,W,H,bw*d,bh*d,cx*d,cy*d),Ls=fit(M.m,W/q,H/q,bw*d/q,bh*d/q,cx*d/q,cy*d/q),k=krackle(Ls,q,W,H,R,150);k.className='sg2-kr';
    const mk=cv(W,H),mx=mk.getContext('2d');mx.save();mx.filter=`blur(${(W*.012).toFixed(1)}px)`;mx.imageSmoothingQuality='high';mx.drawImage(dil(Ls,Ls.width*.045,CREAM),0,0,W,H);mx.restore();
    mx.drawImage(dil(Ls,Ls.width*.03,CREAM),0,0,W,H);mx.drawImage(dil(L,Math.max(2,W*.008),INK),0,0);mx.drawImage(L,0,0);mk.className='sg2-mk';
    el.appendChild(rc);[k,mk].forEach(c=>{c.style.inset='0';c.style.width='100%';c.style.height='100%';el.appendChild(c)});
    const sw=document.createElement('i');sw.className='sg2-sw';sw.style.setProperty('--r',Math.max(bw,bh)*.62+'px');el.insertBefore(sw,mk);
    const ms=G.bellMs(card),p=ms==null?4.6:Math.max(1.2,Math.min(4.2,1.2+ms/36e5/24*3));el.style.setProperty('--p',p.toFixed(2)+'s')},
  async mini(el,card,M){const d=Math.min(2,devicePixelRatio||1),W=Math.round(40*d),B=M.B,c=cv(W,W),x=c.getContext('2d'),R=rnd(hash(card.dataset.t+'g2m'));
    const rg=x.createRadialGradient(W/2,W/2,W*.05,W/2,W/2,W*.75);rg.addColorStop(0,rgb(mix(B,[255,255,255],.45)));rg.addColorStop(.55,rgb(B));rg.addColorStop(1,rgb(mix(B,INK,.6)));x.fillStyle=rg;x.fillRect(0,0,W,W);
    for(let i=0;i<14;i++){const a=i/14*Math.PI*2;x.strokeStyle=rgb(CREAM,.25);x.lineWidth=W*.02;x.beginPath();x.moveTo(W/2,W/2);x.lineTo(W/2+Math.cos(a)*W,W/2+Math.sin(a)*W);x.stroke()}
    const L=fit(M.m,W,W,W*.72,W*.72,W/2,W/2);x.drawImage(dil(L,W*.06,CREAM),0,0);x.drawImage(dil(L,W*.025,INK),0,0);x.drawImage(L,0,0);el.appendChild(c)}};
G.go('sg2')})();
