/* ================= D · the portrait gallery (living portraits) ================= */
const GD4={p:{img:'pd2',W:1536,H:2048,vb:[0,0,1,.965],
   cv:[[.16,.142,.392,.316],[.608,.142,.84,.316],[.16,.516,.392,.688],[.608,.516,.84,.688]],mat:[.024,.017,.024,.019],pq:[.016,.052],
   cloth:[[.05,.235],[.25,.445],[.53,.715],[.735,.93]],cy:.875},
  w:{img:'wd',W:2048,H:1152,vb:[0,.03,1,.88],
   cv:[[.082,.356,.176,.559],[.264,.356,.356,.559],[.436,.356,.528,.559],[.603,.356,.690,.559]],mat:[.012,.022,.012,.024],pq:[.03,.115],
   cloth:[[.752,.846],[.858,.954]],cy:.36}};
/* a brass plaque, hand-cut: bevelled, two screws, its lines engraved (pale brass with a dark cut under) */
function brass(x,y,w,h,id){return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a2e"/><stop offset=".45" stop-color="#5e4519"/><stop offset="1" stop-color="#3a2a0e"/></linearGradient>
  <rect x="${f1(x+h*.06)}" y="${f1(y+h*.1)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h*.08)}" fill="rgba(0,0,0,.55)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h*.08)}" fill="url(#${id})" stroke="#1c1306" stroke-width="${f1(h*.04)}"/>
  <rect x="${f1(x+h*.06)}" y="${f1(y+h*.06)}" width="${f1(w-h*.12)}" height="${f1(h*.88)}" rx="${f1(h*.05)}" fill="none" stroke="#c9a35a" stroke-opacity=".45" stroke-width="${f1(h*.02)}"/>
  ${[x+h*.16,x+w-h*.16].map(cx=>`<circle cx="${f1(cx)}" cy="${f1(y+h/2)}" r="${f1(h*.055)}" fill="#c9a35a" stroke="#2a1d08" stroke-width="${f1(h*.015)}"/>`).join('')}`}
const ENG={c:'#f3dfa8',st:'#1c1306'};
function tD(R,wide){const g=GD4[wide?'w':'p'],Wd=g.W,Hd=g.H,X=f=>f*Wd,Y=f=>f*Hd;let s=`<image href="${BASE}${g.img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none"/>`,top='';
  if(wide){s+=head(X(.38),Y(.095),X(.5),Y(.09),{rot:-1.5})+tag(X(.38),Y(.165),Y(.028),X(.5))}
  R.forEach((r,i)=>{const c=g.cv[i],[cx,cy,cw,ch]=R4(c,X,Y),m=g.mat,id='m15d'+i;
    /* the mat in the model's colour */
    s+=ring(g.img,Wd,Hd,[X(c[0]-m[0]),Y(c[1]-m[1]),X(c[2]+m[2]),Y(c[3]+m[3])],[cx,cy,cx+cw,cy+ch],r.c,id+'t',1.35);
    s+=face(r.m,cx,cy,cw,ch,{vg:'m15vg'});
    /* the catalogue number, a brass disc on the frame's top-left corner */
    const nr=cw*(wide?.13:.11),nx=X(c[0]-m[0])-nr*.1,ny=Y(c[1]-m[1])-nr*.1;
    s+=`<circle cx="${f1(nx+nr*.08)}" cy="${f1(ny+nr*.12)}" r="${f1(nr)}" fill="rgba(0,0,0,.6)"/><circle cx="${f1(nx)}" cy="${f1(ny)}" r="${f1(nr)}" fill="url(#${id}b)" stroke="#1c1306" stroke-width="${f1(nr*.1)}"/>`+T(nx,ny+nr*.05,nr*1.25,String(i+1),ENG);
    /* the plaque: No. and name, the lab with its flag, the season line */
    const py=Y(c[3]+m[3])+Y(g.pq[0]),ph=Y(g.pq[1]),px=cx-cw*(wide?.12:.04),pw=cw*(wide?1.24:1.08);s+=brass(px,py,pw,ph,id+'b');
    if(!wide){s+=nm(r,px+pw/2,py+ph*.3,ph*.36,pw*.8,{c:ENG.c})+stat(r,px+pw/2,py+ph*.72,ph*.28,pw*.84,{lc:'#d9c08a'})}
    else{s+=nm(r,px+pw/2,py+ph*.2,ph*.24,pw*.84,{c:ENG.c})+T(px+pw/2+ph*.1,py+ph*.42,ph*.13,LAB[r.m],{f:'s',c:'#d9c08a'})+patch(r.cc,px+pw/2-tw(LAB[r.m],ph*.13,'s')/2-ph*.08,py+ph*.42,ph*.16,0)+stat2(r,px+pw/2,py+ph*.62,ph*.17,pw*.9,{lc:'#d9c08a'})}
    /* the portrait speaks */
    if(!wide){const right=i%2===0,bw=X(.27),bh=Y(.07),by=cy+(right?ch*.52:ch*.08),bx=right?X(.37):X(.63)-bw;
      top+=balloon(bx,by,bw,bh,right?cx+cw*.86:cx+cw*.14,by+bh*(right?.1:.9),r.q,{smax:bh*.24})}
    else{const pb=py+ph,bw=cw*1.7,bh=Y(.1),bx=cx+cw/2-bw/2,by=pb+Y(.035);top+=balloon(bx,by,bw,bh,cx+cw*.62,pb-ph*.1,r.q,{smax:bh*.22})}
  });
  /* Season 2: the frames under cloth, a paper tag on each cord */
  const tags=wide?S2.map((s2,j)=>[g.cloth[j%2],j<2?.36:.555]):S2.map((s2,j)=>[g.cloth[j],g.cy]);
  S2.forEach(([n,cc],j)=>{const [[a,b],yy]=tags[j],tx=X((a+b)/2),ty=Y(yy),tw0=X(b-a)*.62,th=tw0*.36;
    s+=`<g transform="rotate(${j%2?4:-4} ${f1(tx)} ${f1(ty)})"><path d="M${f1(tx-tw0/2)} ${f1(ty-th/2)}H${f1(tx+tw0/2-th*.4)}L${f1(tx+tw0/2)} ${f1(ty)}L${f1(tx+tw0/2-th*.4)} ${f1(ty+th/2)}H${f1(tx-tw0/2)}Z" fill="#e8dcc0" stroke="${INK}" stroke-width="${f1(th*.05)}"/><circle cx="${f1(tx+tw0/2-th*.42)}" cy="${f1(ty)}" r="${f1(th*.08)}" fill="${INK}"/>`
      +patch(cc,tx-tw0/2+th*.42,ty-th*.02,th*.5,0)+T(tx+th*.12,ty-th*.13,fit(th*.36,n,tw0*.58),n,{c:INK})+T(tx+th*.12,ty+th*.24,fit(th*.2,'Season 2',tw0*.58,'s'),'Season 2',{f:'s',c:'#5a4a30'})+`</g>`});
  const lab=wide?[.903,.70]:[.5,.952];s+=T(X(lab[0]),Y(lab[1]),fit(Y(wide?.026:.016),'Season 2 · in inference',X(wide?.18:.6),'s'),'Season 2 · in inference',{f:'s',c:LB});
  return svgW([0,Y(g.vb[1]),Wd,Y(g.vb[3]-g.vb[1])],s+top,'')}
