/* ================= C · character select (arcade) ================= */
const GC={p:{img:'pc',W:1536,H:2048,vb:[.095,.905,0,.8],mq:[.131,.054,.869,.186],sc:[.163,.283,.837,.642]},
          w:{img:'wc',W:2048,H:1152,vb:[0,1,0,.86],mq:[.106,.043,.894,.217],sc:[.152,.318,.848,.708]}};
function lock(x,y,s,c){return `<path d="M${f1(x-s*.28)} ${f1(y)}V${f1(y-s*.22)}A${f1(s*.28)} ${f1(s*.3)} 0 0 1 ${f1(x+s*.28)} ${f1(y-s*.22)}V${f1(y)}" fill="none" stroke="${c}" stroke-width="${f1(s*.1)}"/><rect x="${f1(x-s*.42)}" y="${f1(y-s*.02)}" width="${f1(s*.84)}" height="${f1(s*.62)}" rx="${f1(s*.08)}" fill="${c}"/><circle cx="${f1(x)}" cy="${f1(y+s*.25)}" r="${f1(s*.08)}" fill="#05060a"/>`}
function tC(R,wide){const g=GC[wide?'w':'p'],Wd=g.W,Hd=g.H,X=f=>f*Wd,Y=f=>f*Hd;let s=`<image href="${BASE}${g.img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none"/>`;
  const [mx,my,mw,mh]=R4(g.mq,X,Y);s+=head(mx+mw/2,my+mh*.5,mw*.86,mh*.62,{rot:0});
  const [x,y,w,h]=R4(g.sc,X,Y),G=w*.02;let t=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w*.03)}" fill="#04060b"/>`;
  /* header */
  const hh=h*(wide?.1:.085);t+=T(x+G*1.2,y+hh*.6,hh*.62,'SEASON 1 · SELECT A MODEL',{a:'start',c:CR,ls:hh*.04});t+=T(x+w-G*1.2,y+hh*.62,fit(hh*.5,KEY,w*.46,'s'),KEY,{a:'end',f:'s',c:LB});
  const r0=R[0];
  /* the preview of the model under the cursor (#1 at rest; the build steps the cursor through all four) */
  const pv=wide?[x+G,y+hh+G*.4,w*.47-G*1.5,h-hh-G*1.4]:[x+G,y+hh+G*.3,w-G*2,h*.39];
  const fsz=wide?Math.min(pv[3],pv[2]*.56):pv[3];t+=face(r0.m,pv[0],pv[1],fsz,fsz,{vg:'m15vg'});t+=`<rect x="${f1(pv[0])}" y="${f1(pv[1])}" width="${f1(fsz)}" height="${f1(fsz)}" fill="none" stroke="${r0.c}" stroke-width="${f1(fsz*.025)}"/>`;
  const ix=pv[0]+fsz+G,iy=pv[1]+(wide?fsz*.04:0),iw=pv[2]-fsz-G,L=wide?fsz*.92:pv[3];let yy=iy;
  t+=T(ix,yy+L*.1,fit(L*.15,'No. 1 · LEADS THE SEASON',iw),'No. 1 · LEADS THE SEASON',{a:'start',c:r0.c});
  t+=nm(r0,ix,yy+L*.29,L*.21,iw*.8,{a:'start',c:CR})+patch(r0.cc,ix+iw-L*.13,yy+L*.29,L*.2,0);
  t+=T(ix,yy+L*.45,L*.1,'by '+LAB[r0.m],{a:'start',f:'s',c:LB});
  const q=qfit('“'+r0.q+'”',iw,L*.27,L*(wide?.1:.11),4,'s');if(q)t+=q.L.map((l,j)=>T(ix,yy+L*.6+j*q.s*1.12,q.s,l,{a:'start',f:'s',c:QT})).join('');
  t+=wide?stat2(r0,ix+iw/2,yy+L*.86,L*.09,iw):stat(r0,ix,yy+L*.9,L*.12,iw,{a:'start'});
  /* the four fighters, in rank order; the cursor on #1 */
  const tr=wide?[x+w*.47+G*.5,y+hh+G*.4,w*.53-G*1.5,h*.56]:[x+G,pv[1]+pv[3]+G*.8,w-G*2,h*.29];
  const tw4=(tr[2]-G*.9*3)/4;
  R.forEach((r,i)=>{const tx=tr[0]+i*(tw4+G*.9),ty=tr[1],th=tr[3],fh=th*.62;
    t+=`<rect x="${f1(tx)}" y="${f1(ty)}" width="${f1(tw4)}" height="${f1(th)}" fill="#0b0e16"/>`+face(r.m,tx,ty,tw4,fh,{vg:'m15vg'});
    t+=T(tx+tw4*.08,ty+fh+th*.11,th*.13,String(i+1),{a:'start',c:r.c})+T(tx+tw4*.25,ty+fh+th*.11,fit(th*.12,r.name,tw4*.7),r.name,{a:'start',c:CR});
    t+=T(tx+tw4/2,ty+fh+th*.27,fit(th*.11,$(r.pl),tw4*.9),$(r.pl),{c:r.pl>=0?UP:DN});
    t+=`<rect x="${f1(tx)}" y="${f1(ty)}" width="${f1(tw4)}" height="${f1(th)}" fill="none" stroke="${r.c}" stroke-width="${f1(i?tw4*.012:tw4*.035)}"/>`;
    if(!i){const c=th*.11;t+=`<polygon points="${f1(tx+tw4/2-c*.6)},${f1(ty-c*.95)} ${f1(tx+tw4/2+c*.6)},${f1(ty-c*.95)} ${f1(tx+tw4/2)},${f1(ty-c*.15)}" fill="${GD}"/>`+T(tx+tw4/2,ty-c*1.55,c*.9,'P1',{c:GD})}});
  /* Season 2: four locked slots */
  const lr=wide?[tr[0],tr[1]+tr[3]+G*.9,tr[2],y+h-(tr[1]+tr[3]+G*.9)-G*.5]:[x+G,tr[1]+tr[3]+G*.6,w-G*2,y+h-(tr[1]+tr[3]+G*.6)-G*.5];
  t+=T(lr[0],lr[1]+lr[3]*.15,lr[3]*.17,'SEASON 2 · LOCKED · IN INFERENCE',{a:'start',c:LB,ls:2});
  const lw=(lr[2]-G*.9*3)/4,ly=lr[1]+lr[3]*.32,lh=lr[3]*.66;
  S2.forEach(([n,cc],j)=>{const lx=lr[0]+j*(lw+G*.9);t+=`<rect x="${f1(lx)}" y="${f1(ly)}" width="${f1(lw)}" height="${f1(lh)}" fill="#0b0e16" stroke="#3a3f4e" stroke-width="${f1(lh*.03)}" stroke-dasharray="${f1(lh*.08)} ${f1(lh*.05)}"/>`;
    t+=lock(lx+lh*.42,ly+lh*.45,lh*.5,'#8a8f9e')+T(lx+lh*.8,ly+lh*.38,fit(lh*.26,n,lw-lh*.95),n,{a:'start',c:'#a9aec0'})+patch(cc,lx+lh*.8+lh*.17,ly+lh*.72,lh*.28,0)});
  /* the glass: scanlines and a glow */
  t+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="url(#m15scan)" opacity=".5" pointer-events="none"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w*.03)}" fill="url(#m15crt)"/>`;
  const df=`<pattern id="m15scan" width="4" height="${wide?3:4}" patternUnits="userSpaceOnUse"><rect width="4" height="1.3" fill="#000"/></pattern><radialGradient id="m15crt" cx="50%" cy="50%" r="70%"><stop offset="70%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".55"/></radialGradient>`;
  return svgW([X(g.vb[0]),0,X(g.vb[1]-g.vb[0]),Y(g.vb[3])],s+t,df)}
