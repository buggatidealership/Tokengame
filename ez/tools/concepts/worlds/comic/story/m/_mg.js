/* Round 3 (helper a, 30 Oct): the company's own mark IS the tile's picture, drawn by machine in one American cartoon genre.
   Procedural: every logo tile (films keep their film) is painted on a canvas from the real logo file and the brand colour from pal(),
   so a new company gets it automatically. Genres: g1 pop-art blow-up, g2 golden-age newsprint, g3 UPA flat modern, g4 Kirby cosmic, g5 underground crosshatch. */
(function(){const S=SA;
const rnd=seed=>{let a=seed>>>0;return ()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
const hex=h=>{const n=parseInt(h.slice(1),16);return [n>>16,n>>8&255,n&255]};
const rgb=(a,al)=>`rgba(${a.map(Math.round).join(',')},${al==null?1:al})`;
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
const lum=(r,g,b)=>(.2126*r+.7152*g+.0722*b)/255;
const INK=[21,18,26],PAPER=[243,234,211],CREAM=[255,250,240],NEWS=[238,224,184],MUSTARD=[226,166,44];
/* the logo file, with two retries (the shared local server drops requests under load) */
const load1=src=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src});
const load=async src=>(await load1(src))||(await load1(src+'?r=1'))||(await load1(src+'?r=2'));
const cv=(w,h)=>{const c=document.createElement('canvas');c.width=Math.max(1,Math.round(w));c.height=Math.max(1,Math.round(h));return c};
/* the mark: an opaque file loses its edge-connected background (Shell's yellow square, Volkswagen's white), a light logo made for dark grounds
   prints its white parts in ink (CAT), then trimmed to its ink */
function mark(img,dark){const w=img.naturalWidth,h=img.naturalHeight,c=cv(w,h),x=c.getContext('2d');x.drawImage(img,0,0);
  const id=x.getImageData(0,0,w,h),d=id.data;
  if([0,w-1,(h-1)*w,(h-1)*w+w-1].every(i=>d[i*4+3]>250)){const k=[d[0],d[1],d[2]],seen=new Uint8Array(w*h),q=[];
    const near=i=>Math.abs(d[i*4]-k[0])+Math.abs(d[i*4+1]-k[1])+Math.abs(d[i*4+2]-k[2])<70;
    for(let X=0;X<w;X++)q.push(X,(h-1)*w+X);for(let Y=0;Y<h;Y++)q.push(Y*w,Y*w+w-1);
    while(q.length){const i=q.pop();if(seen[i])continue;seen[i]=1;if(!near(i))continue;d[i*4+3]=0;const X=i%w,Y=(i/w)|0;if(X>0)q.push(i-1);if(X<w-1)q.push(i+1);if(Y>0)q.push(i-w);if(Y<h-1)q.push(i+w)}}
  if(dark)for(let i=0;i<d.length;i+=4){const mx=Math.max(d[i],d[i+1],d[i+2]),mn=Math.min(d[i],d[i+1],d[i+2]);if(mn>170&&mx-mn<40){d[i]=INK[0];d[i+1]=INK[1];d[i+2]=INK[2]}}
  x.putImageData(id,0,0);let x0=w,y0=h,x1=-1,y1=-1;
  for(let Y=0;Y<h;Y++)for(let X=0;X<w;X++)if(d[(Y*w+X)*4+3]>24){if(X<x0)x0=X;if(X>x1)x1=X;if(Y<y0)y0=Y;if(Y>y1)y1=Y}
  if(x1<0)return c;const t=cv(x1-x0+1,y1-y0+1);t.getContext('2d').drawImage(c,-x0,-y0);return t}
/* a mark placed and scaled into a canvas of the tile's size (k: share of the box it may fill) */
function placed(m,W,H,k,cx,cy){const s=Math.min(W*k/m.width,H*k/m.height),w=m.width*s,h=m.height*s,c=cv(W,H);
  const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(m,cx*W-w/2,cy*H-h/2,w,h);return c}
function sil(c,col,al){const o=cv(c.width,c.height),x=o.getContext('2d');x.drawImage(c,0,0);x.globalCompositeOperation='source-in';x.fillStyle=rgb(col,al);x.fillRect(0,0,o.width,o.height);return o}
function dil(c,r,col){const s=sil(c,col),o=cv(c.width,c.height),x=o.getContext('2d');const n=Math.max(16,Math.round(r*3));
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2;x.drawImage(s,Math.cos(a)*r,Math.sin(a)*r)}for(let rr=r*.5;rr>0;rr-=r*.5)for(let i=0;i<8;i++){const a=i/8*Math.PI*2;x.drawImage(s,Math.cos(a)*rr,Math.sin(a)*rr)}x.drawImage(s,0,0);return o}
function ring(c,r,col){const o=dil(c,r,col),x=o.getContext('2d');x.globalCompositeOperation='destination-out';x.drawImage(c,0,0);return o}
function grain(x,W,H,R,n,al){for(let i=0;i<n;i++){x.fillStyle=rgb(INK,al*R());x.fillRect(R()*W,R()*H,1+R()*1.4,1+R()*1.4)}}
function dots(x,W,H,P,col,rad){for(let Y=0,j=0;Y<H+P;Y+=P*.866,j++)for(let X=(j%2)*P/2;X<W+P;X+=P){const r=rad(X/W,Y/H)*P;if(r<=.2)continue;x.beginPath();x.arc(X,Y,r,0,7);x.fillStyle=col;x.fill()}}
/* map a function over the placed mark's pixels */
function px(c,f){const x=c.getContext('2d'),id=x.getImageData(0,0,c.width,c.height),d=id.data,w=c.width;for(let i=0;i<d.length;i+=4){if(d[i+3]<8)continue;const p=i/4;f(d,i,p%w,(p/w)|0)}x.putImageData(id,0,0);return c}

const G={
/* g1 POP-ART BLOW-UP (Lichtenstein, 1961 to 1965): the mark blown up to the panel's edges, a heavy black outline, Ben-Day dots
   for the brand colour behind and dot shading on the mark */
g1(x,W,H,m,B,R){x.fillStyle=rgb(CREAM);x.fillRect(0,0,W,H);
  dots(x,W,H,W/11,rgb(B),(u,v)=>.16+.3*Math.min(1,(u+v)/1.4));
  const L=placed(m,W,H,.9,.46,.44);x.drawImage(dil(L,W*.028,INK),0,0);x.drawImage(L,0,0);
  const sh=cv(W,H),s=sh.getContext('2d');dots(s,W,H,W/22,rgb(INK,.55),(u,v)=>Math.max(0,(u+v-1)*.9));s.globalCompositeOperation='destination-in';s.drawImage(L,0,0);x.drawImage(sh,0,0)},
/* g2 GOLDEN-AGE NEWSPRINT (1938 to the 1950s): yellowed newsprint, flat colour plates printed a little out of register against the black keyline */
g2(x,W,H,m,B,R){x.fillStyle=rgb(NEWS);x.fillRect(0,0,W,H);const o=W*.018;
  x.fillStyle=rgb(mix(B,NEWS,.12),.95);x.fillRect(o*1.6,o*1.2,W,H);
  const L=placed(m,W,H,.74,.45,.43);x.drawImage(dil(L,W*.05,NEWS),0,0);
  const col=px(placed(m,W,H,.74,.45,.43),(d,i)=>{for(let k=0;k<3;k++)d[i+k]=Math.round(d[i+k]/64)*64*.92+18});
  x.save();x.globalCompositeOperation='multiply';x.drawImage(col,o,o*.8);x.restore();
  x.drawImage(ring(L,W*.014,INK),0,0);
  const dk=px(placed(m,W,H,.74,.45,.43),(d,i)=>{if(Math.max(d[i],d[i+1],d[i+2])<70){d[i]=INK[0];d[i+1]=INK[1];d[i+2]=INK[2]}else d[i+3]=0});x.drawImage(dk,0,0);
  grain(x,W,H,R,W*H/40,.22);x.save();x.globalCompositeOperation='multiply';x.fillStyle=rgb([250,238,205],.5);x.fillRect(0,0,W,H);x.restore()},
/* g3 UPA MODERN (1950s): flat shapes in a limited palette (the brand colour, mustard, paper, one ink line), no outlines,
   the mark in its own colours flattened to a few flat tones, over an offset shadow plate in the brand's dark
   (none for a wordmark, where the plate read as doubled letters; a near-black brand gets a lighter band so black letters stay visible) */
g3(x,W,H,m,B,R){x.fillStyle=rgb(PAPER);x.fillRect(0,0,W,H);if(lum(...B)<.2)B=mix(B,PAPER,.55);const BD=mix(B,INK,.45),word=m.width/m.height>2.5;
  x.save();x.translate(W*.2,H*.78);x.rotate(-.22);x.fillStyle=rgb(B);x.fillRect(-W*.5,-H*.2,W*1.5,H*.7);x.restore();
  x.beginPath();x.arc(W*.8,H*.2,W*.27,0,7);x.fillStyle=rgb(MUSTARD);x.fill();
  x.strokeStyle=rgb(INK);x.lineWidth=Math.max(1.5,W*.008);x.beginPath();x.moveTo(W*.04,H*.3);x.lineTo(W*.5,H*.06);x.stroke();
  const L=placed(m,W,H,.66,.45,.43);if(!word)x.drawImage(sil(L,BD),W*.035,W*.035);
  const P=px(placed(m,W,H,.66,.45,.43),(d,i)=>{for(let k=0;k<3;k++)d[i+k]=Math.min(255,Math.round(d[i+k]/51)*51);d[i+3]=d[i+3]>100?255:0});x.drawImage(P,0,0)},
/* g4 KIRBY COSMIC (1960s): the mark in full colour inside a white-hot energy field, ringed by Kirby krackle (clusters of black dots),
   on the brand colour burning out from the centre */
g4(x,W,H,m,B,R){const g=x.createRadialGradient(W*.45,H*.43,W*.05,W*.45,H*.43,W*.8);g.addColorStop(0,rgb(mix(B,[255,255,255],.35)));g.addColorStop(.55,rgb(B));g.addColorStop(1,rgb(mix(B,INK,.6)));
  x.fillStyle=g;x.fillRect(0,0,W,H);
  for(let i=0;i<22;i++){const a=i/22*Math.PI*2+R()*.1;x.strokeStyle=rgb(CREAM,.16+R()*.14);x.lineWidth=W*(.006+R()*.01);x.beginPath();x.moveTo(W*.45,H*.43);x.lineTo(W*.45+Math.cos(a)*W,H*.43+Math.sin(a)*W);x.stroke()}
  const L=placed(m,W,H,.62,.45,.43),band=dil(L,W*.13,INK),inner=dil(L,W*.075,INK),bd=band.getContext('2d').getImageData(0,0,W,H).data,id=inner.getContext('2d').getImageData(0,0,W,H).data,pts=[];
  for(let k=0;k<4000&&pts.length<140;k++){const X=(R()*W)|0,Y=(R()*H)|0,i=(Y*W+X)*4;if(bd[i+3]>100&&id[i+3]<40)pts.push([X,Y])}
  x.fillStyle=rgb(INK);pts.forEach(([X,Y])=>{const n=1+((R()*3)|0);for(let j=0;j<n;j++){x.beginPath();x.arc(X+(R()-.5)*W*.03,Y+(R()-.5)*W*.03,W*(.008+R()*.026),0,7);x.fill()}});
  x.save();x.shadowColor=rgb(CREAM);x.shadowBlur=W*.05;x.drawImage(dil(L,W*.06,CREAM),0,0);x.restore();
  x.drawImage(dil(L,W*.018,INK),0,0);x.drawImage(L,0,0)},
/* g5 UNDERGROUND CROSSHATCH (late 1960s comix): pen and ink. The mark knocked out of the brand colour on paper, its outline inked,
   its colours drawn as hatching in their own colours (cross-hatched where dark, single where mid, bare paper where light) */
g5(x,W,H,m,B,R){x.fillStyle=rgb(B);x.fillRect(0,0,W,H);const p=Math.max(3,W/42),lw=Math.max(1,p*.32);
  x.strokeStyle=rgb(INK,.5);x.lineWidth=lw;for(let k=-H;k<W;k+=p){x.beginPath();x.moveTo(k,H);x.lineTo(k+H,0);x.stroke()}
  const vg=x.createRadialGradient(W*.45,H*.43,W*.25,W*.45,H*.43,W*.75);vg.addColorStop(0,rgb(B));vg.addColorStop(1,rgb(B,0));x.fillStyle=vg;x.fillRect(0,0,W,H);
  const L=placed(m,W,H,.72,.45,.43);x.drawImage(dil(L,W*.055,PAPER),0,0);x.drawImage(ring(dil(L,W*.055,PAPER),W*.012,INK),0,0);
  const P=px(placed(m,W,H,.72,.45,.43),(d,i,X,Y)=>{const l=lum(d[i],d[i+1],d[i+2]),h1=((X+Y)%p)<lw,h2=((X-Y+9999*p)%p)<lw,dark=l<.14;
    const on=dark||(l<.45&&(h1||h2))||(l<.8&&h1);const c=on?mix([d[i],d[i+1],d[i+2]],INK,.25):PAPER;d[i]=c[0];d[i+1]=c[1];d[i+2]=c[2];d[i+3]=d[i+3]>90?255:0});
  x.drawImage(P,0,0);x.drawImage(ring(L,W*.009,INK),0,0)}};

/* helper m (2026-10-30): three refinements of G5 underground crosshatch. The mark keeps its full brand colours; the pen only shades.
   Per pixel, from an exact distance field around the mark (Felzenszwalb EDT), so contour lines, cut plates and cast shadows follow its shape. */
const smo=(a,b,t)=>{t=Math.min(1,Math.max(0,(t-a)/(b-a)));return t*t*(3-2*t)};
const hh=(k,s)=>{let n=Math.imul(k|0,374761393)+Math.imul(s|0,668265263)|0;n=Math.imul(n^n>>>13,1274126177);return((n^n>>>16)>>>0)/4294967296};
const vn=seed=>(x,y)=>{const i=Math.floor(x),j=Math.floor(y),fx=x-i,fy=y-j,u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy),h=(a,b)=>hh(a*7919+b,seed);
  return h(i,j)*(1-u)*(1-v)+h(i+1,j)*u*(1-v)+h(i,j+1)*(1-u)*v+h(i+1,j+1)*u*v};
function edt1(f,n,d,v,z){let k=0;v[0]=0;z[0]=-1e20;z[1]=1e20;for(let q=1;q<n;q++){let s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k]);while(s<=z[k]){k--;s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k])}k++;v[k]=q;z[k]=s;z[k+1]=1e20}
  k=0;for(let q=0;q<n;q++){while(z[k+1]<q)k++;d[q]=(q-v[k])*(q-v[k])+f[v[k]]}}
function edt(ins,w,h){const D=new Float32Array(w*h),n=Math.max(w,h),f=new Float64Array(n),d=new Float64Array(n),v=new Int32Array(n),z=new Float64Array(n+1);
  for(let i=0;i<w*h;i++)D[i]=ins[i]?0:1e20;
  for(let x=0;x<w;x++){for(let y=0;y<h;y++)f[y]=D[y*w+x];edt1(f,h,d,v,z);for(let y=0;y<h;y++)D[y*w+x]=d[y]}
  for(let y=0;y<h;y++){for(let x=0;x<w;x++)f[x]=D[y*w+x];edt1(f,w,d,v,z);for(let x=0;x<w;x++)D[y*w+x]=Math.sqrt(d[x])}return D}
/* one family of hand-inked hatch lines: wobble, width varying line to line, pen lifts; returns coverage 0..1 */
function hatch(X,Y,ang,p,w,seed,nz,lift){const c=Math.cos(ang),s=Math.sin(ang);let t=(X*c+Y*s)/p+(nz(X/(p*5),Y/(p*5))-.5)*.32;const k=Math.round(t),r=hh(k,seed);
  const a=(-X*s+Y*c)/p;if(lift&&nz(a/3.2+r*40,k*1.37+seed)<lift)return 0;
  const ww=w*(.7+.6*r),dist=Math.abs(t-k)*p;return Math.max(0,Math.min(1,ww/2-dist+.5))}
const cv2=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
function prep(m,W,H,k){const L=placed(m,W,H,k,.45,.43),Ld=L.getContext('2d').getImageData(0,0,W,H).data,ins=new Uint8Array(W*H);
  for(let i=0;i<W*H;i++)ins[i]=Ld[i*4+3]>110?1:0;const D=edt(ins,W,H);const at=(X,Y)=>{X=Math.round(X);Y=Math.round(Y);return X<0||Y<0||X>=W||Y>=H?1e9:D[Y*W+X]};return {Ld,D,at}}
const bl=(o,c,a)=>{if(a<=0)return;o[0]+=(c[0]-o[0])*a;o[1]+=(c[1]-o[1])*a;o[2]+=(c[2]-o[2])*a};
function out(x,W,H,f){const id=x.createImageData(W,H),d=id.data,o=[0,0,0];for(let Y=0;Y<H;Y++)for(let X=0;X<W;X++){f(X,Y,o);const i=(Y*W+X)*4;d[i]=o[0];d[i+1]=o[1];d[i+2]=o[2];d[i+3]=255}x.putImageData(id,0,0)}
/* the mark itself, in its own full colours, with an ink keyline round it */
function markPx(P,X,Y,o,kw,off){const i=(Y*W_+X)*4,d=P.Ld;const dd=P.D[Y*W_+X];
  if(dd>0&&dd<kw+1)bl(o,INK,Math.min(1,kw-dd+.5));
  const ox=off?Math.round(off):0,j=((Y)*W_+Math.min(W_-1,X+ox))*4;if(d[j+3])bl(o,[d[j],d[j+1],d[j+2]],d[j+3]/255)}
let W_=0;
Object.assign(G,{
/* M1 · CUT AND SHADED: G5's ground kept (brand colour, inked hatching that thickens away from the light), the mark cut out on a paper plate
   with a heavy ink rim, the plate's own shadow side and its cast shadow drawn in pen (the page's hard offset shadow, hatched); the mark itself untouched */
m1(x,W,H,m,B,R){W_=W;const P=prep(m,W,H,.7),p=Math.max(3.2,W/34),lw=Math.max(1.1,p*.34),r0=W*.052,ow=Math.max(1.6,W*.013),sx=W*.045,sy=W*.05,nz=vn(R()*1e6|0),BD=mix(B,INK,.55);
  out(x,W,H,(X,Y,o)=>{o[0]=B[0];o[1]=B[1];o[2]=B[2];const d=P.D[Y*W+X],g=(X/W*.55+Y/H*.45),s0=smo(.2,1.05,g);
    const cast=Math.max(0,Math.min(1,r0-P.at(X-sx,Y-sy)+.5)),s=Math.max(s0*.85,cast);
    /* the ground: one family over everything past the light, a second where darker, a third in the cast shadow */
    if(d>r0-1){const a=1;let c1=s>.12+hh(X>>4,3)*0?hatch(X,Y,-.78,p,lw,11,nz,.16)*smo(.08,.3,s):0;
      let c2=s>.55?hatch(X,Y,.78,p*1.05,lw*.9,23,nz,.2)*smo(.5,.7,s):0,c3=cast>0?hatch(X,Y,.12,p*.9,lw,37,nz,.08)*cast:0;
      bl(o,BD,c1*.85);bl(o,INK,Math.max(c2,c3)*.82);if(cast>.5)bl(o,INK,c1*.4)}
    /* the paper plate, its rim inked, its bottom-right edge shaded */
    if(d<r0+.5){const a=Math.min(1,r0-d+.5);bl(o,PAPER,a);const rim=Math.max(0,Math.min(1,r0-P.at(X+W*.02,Y+W*.022)))<.5&&d>1;
      if(rim)bl(o,INK,hatch(X,Y,-.78,p*.8,lw*.85,51,nz,.1)*.55*a)}
    const e=Math.abs(d-r0);if(e<ow)bl(o,INK,Math.min(1,ow/2-e+.5));
    markPx(P,X,Y,o,Math.max(.8,W*.005))})},
/* M2 · ENGRAVED RINGS: tinted paper, the mark in full colour inside a bold ink outline, and contour lines that echo its shape outward,
   drawn in the brand's dark, heavier and closer on the shadow side, thinning and breaking up as they leave (the underground "emanata");
   the far corner cross-hatched in ink */
m2(x,W,H,m,B,R){W_=W;const P=prep(m,W,H,.68),p=Math.max(3.4,W/30),lw=Math.max(1,p*.3),r0=W*.03,K=9,nz=vn(R()*1e6|0),cx=W*.45,cy=H*.43,BD=mix(B,INK,lum(...B)>.55?.45:.2),BG=mix(PAPER,B,.13);
  out(x,W,H,(X,Y,o)=>{o[0]=BG[0];o[1]=BG[1];o[2]=BG[2];const d=P.D[Y*W+X];const sd=smo(-.55,.85,((X-cx)/W+(Y-cy)/H)*1.25),g=(X/W*.5+Y/H*.5);
    if(d>0){const dd=d+(nz(X/(W*.07),Y/(W*.07))-.5)*p*.45,t=(dd-r0)/p,k=Math.round(t);
      if(t>-.5&&k<=K&&k>=0){const fade=1-k/(K+1),ww=lw*(.45+1.5*sd)*(.55+.45*fade),dist=Math.abs(t-k)*p;let cov=Math.max(0,Math.min(1,ww/2-dist+.5));
        const along=Math.atan2(Y-cy,X-cx)*6;if(nz(along+k*3.1,k*.7)<(1-fade)*.55+.05)cov*=0;bl(o,BD,cov)}
      const s=smo(.62,1,g);if(s>0){bl(o,INK,hatch(X,Y,-.78,p*.75,lw*.95,71,nz,.14)*s*.85);if(s>.45)bl(o,INK,hatch(X,Y,.78,p*.8,lw*.85,83,nz,.18)*smo(.45,.8,s)*.8)}}
    markPx(P,X,Y,o,Math.max(1.4,W*.011))})},
/* M3 · NEWSPRINT AND PEN: G2's ground (yellowed newsprint, the brand colour as a Ben-Day dot screen, swelling toward the shadow), the mark in full
   colour on a clean cut with its keyline a hair out of register, and the shading in pen: a crosshatched cast shadow and a hatched corner */
m3(x,W,H,m,B,R){W_=W;const P=prep(m,W,H,.7),p=Math.max(3.2,W/34),lw=Math.max(1.05,p*.32),r0=W*.04,sx=W*.05,sy=W*.055,nz=vn(R()*1e6|0),Pd=Math.max(4,W/17),ca=Math.cos(.26),sa=Math.sin(.26),ow=Math.max(1.2,W*.009);
  out(x,W,H,(X,Y,o)=>{o[0]=NEWS[0];o[1]=NEWS[1];o[2]=NEWS[2];const d=P.D[Y*W+X],g=(X/W*.55+Y/H*.45);
    const u=(X*ca+Y*sa)/Pd,v=(-X*sa+Y*ca)/Pd,du=u-Math.round(u),dv=v-Math.round(v),rr=Math.hypot(du,dv)*Pd,rad=Pd*(.3+.16*smo(.1,1,g));
    if(d>r0-.5){bl(o,B,Math.max(0,Math.min(1,rad-rr+.5))*.96);
      const cast=Math.max(0,Math.min(1,r0-P.at(X-sx,Y-sy)+.5));
      if(cast>0){bl(o,INK,hatch(X,Y,-.78,p,lw,13,nz,.1)*cast*.9);bl(o,INK,hatch(X,Y,.78,p,lw*.9,29,nz,.14)*cast*.85)}
      const s=smo(.7,1.02,g);if(s>0)bl(o,INK,hatch(X,Y,-.6,p*.85,lw,41,nz,.16)*s*.75)}
    if(d<r0+.5)bl(o,NEWS,Math.min(1,r0-d+.5));const e=Math.abs(d-r0);if(e<ow)bl(o,INK,Math.min(1,ow/2-e+.5)*.9);
    /* the colour plate sits a hair right of its keyline, as an old press would print it */
    markPx(P,X,Y,o,Math.max(1,W*.007),W*.008);
    const gr=hh(X*131+Y,7);if(gr<.05)bl(o,INK,.18)})}
});

const RR={};ROUNDS.forEach(r=>RR[r.n]=r);
async function paint(name){const L=window.CO_LOGOS||{},dpr=window.devicePixelRatio||1;
  await Promise.all([...document.querySelectorAll('.wc-season .wc-bi')].map(async a=>{const art=a.querySelector('.wc-bi-art'),img=art&&art.querySelector('img.wc-lgimg');
    if(!img||art.querySelector('canvas.sa-gc5')||!a.offsetParent)return;const r=RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r)return;
    const lg=L[r.ticker]||{},im=await load(img.src);if(!im)return;
    const B=hex((await S.pal(img.src))||(await S.pal(img.src,.15))||(lg.c&&lg.c!=='#12131a'?lg.c:'#2b2733')),bb=art.getBoundingClientRect(),W=Math.round(bb.width*dpr),H=Math.round(bb.height*dpr);
    const c=cv(W,H);c.className='sa-gc5';G[name](c.getContext('2d'),W,H,mark(im,lg.dark),B,rnd(hash(r.ticker+name)));art.appendChild(c);art.classList.add('sa-gen')}))}
S.gen=async name=>{document.documentElement.classList.remove('sa-ready');/* s1.js marks ready first; wait for the paint */await paint(name);const mo=document.querySelector('.wc-more');if(mo)mo.addEventListener('click',()=>requestAnimationFrame(()=>paint(name)));
  document.documentElement.classList.add('sa-gen-'+name)};
})();
