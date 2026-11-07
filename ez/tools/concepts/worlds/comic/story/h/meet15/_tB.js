/* ================= B · pit lane (each lab's garage; the bay order is the standings) ================= */
const GB={p:{img:'pb4',W:1536,H:2048,vb:[0,.1,1,.92],
   b:[{f:[.10,.148,.475,.188],m:[.137,.222,.372,.308],p:[.408,.232,.442,.33]},{f:[.52,.148,.9,.188],m:[.547,.222,.788,.308],p:[.818,.232,.852,.33]},
      {f:[.10,.448,.475,.488],m:[.137,.527,.372,.617],p:[.408,.537,.442,.637]},{f:[.52,.448,.9,.488],m:[.547,.527,.788,.617],p:[.818,.537,.852,.637]}],
   sh:[[.10,.76,.265,.89],[.30,.76,.48,.89],[.52,.76,.69,.89],[.715,.76,.90,.89]],s2:[.5,.745,.6]},
 w:{img:'wb3',W:2048,H:1152,vb:[0,.03,1,.97],title:[.36,.1,.6,.11],key:[.36,.175,.6],
   b:[{f:[.028,.25,.217,.338],m:[.06,.45,.157,.57],p:[.181,.468,.209,.582]},{f:[.24,.25,.415,.338],m:[.265,.45,.357,.57],p:[.375,.468,.404,.582]},
      {f:[.438,.25,.578,.338],m:[.455,.456,.532,.572],p:[.545,.468,.567,.582]},{f:[.598,.25,.728,.338],m:[.612,.456,.69,.572],p:[.70,.468,.722,.582]}],
   s2:[.86,.215,.22],sh:[[.742,.25,.856,.44],[.862,.25,.978,.44],[.742,.46,.856,.72],[.862,.46,.978,.72]]}};
function tB(R,wide){const g=GB[wide?'w':'p'],Wd=g.W,Hd=g.H,X=f=>f*Wd,Y=f=>f*Hd;let s=`<image href="${BASE}${g.img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none"/>`,top='';
  if(g.title)s+=head(X(g.title[0]),Y(g.title[1]),X(g.title[2]),Y(g.title[3]),{rot:-1.5})+tag(X(g.key[0]),Y(g.key[1]),Y(wide?.028:.016),X(g.key[2]));
  R.forEach((r,i)=>{const b=g.b[i],id='m15b'+i;
    /* the fascia: the team's name lit in its colour, the lab and its flag */
    const [fx,fy,fw,fh]=R4(b.f,X,Y);s+=`<rect x="${f1(fx)}" y="${f1(fy)}" width="${f1(fw)}" height="${f1(fh)}" fill="${r.c}" opacity=".07"/>`;
    if(wide)s+=nm(r,fx+fw/2,fy+fh*.38,fh*.5,fw*.86,{c:r.c,vc:CR})+T(fx+fw/2+fh*.12,fy+fh*.8,fh*.17,LAB[r.m],{f:'s',c:LB})+patch(r.cc,fx+fw/2-tw(LAB[r.m],fh*.17,'s')/2-fh*.12,fy+fh*.8,fh*.24,0);
    else{const ls=fh*.36,lw=tw(LAB[r.m],ls,'s');s+=nm(r,fx+fh*.3,fy+fh*.52,fh*.78,fw-lw-fh*1.6,{a:'start',c:r.c,vc:CR})+T(fx+fw-fh*.25,fy+fh*.52,ls,LAB[r.m],{a:'end',f:'s',c:LB})+patch(r.cc,fx+fw-fh*.25-lw-fh*.45,fy+fh*.52,fh*.5,0)}
    /* the monitor: the founder, the season line as the timing strip */
    const [mx,my,mw,mh]=R4(b.m,X,Y),sh=mh*(wide?.2:.27);s+=face(r.m,mx,my,mw,mh-sh,{vg:'m15vg'})+`<rect x="${f1(mx)}" y="${f1(my+mh-sh)}" width="${f1(mw)}" height="${f1(sh)}" fill="#07090f"/><rect x="${f1(mx)}" y="${f1(my+mh-sh)}" width="${f1(mw*.025)}" height="${f1(sh)}" fill="${r.c}"/>`;
    {const pt=$(r.pl),k0=sh*.62,L='SEASON P&L',need=k=>tw(L,k*.62,'s')+k*.35+tw(pt,k);const k=need(k0)>mw*.88?k0*mw*.88/need(k0):k0,x0=mx+mw/2+mw*.012-need(k)/2;
     s+=T(x0,my+mh-sh/2,k*.62,L,{a:'start',f:'s',c:LB})+T(x0+tw(L,k*.62,'s')+k*.35,my+mh-sh/2,k,pt,{a:'start',c:r.pl>=0?UP:DN})}
    /* the pit board: the position and the record */
    const [px,py,pw,ph]=R4(b.p,X,Y);s+=T(px+pw/2,py+ph*.2,fit(ph*.2,'P'+(i+1),pw*.86),'P'+(i+1),{c:'#f4f1e8'})+T(px+pw/2,py+ph*.47,fit(ph*.1,'W-L',pw*.9),'W-L',{c:'#f4f1e8',op:.75});
    {const ws=`${r.W}-${r.L}`,k=fit(ph*.15,ws,pw*.9);s+=wl(r,k,px+pw/2,py+ph*.64,{dc:'#f4f1e8'})}
    /* team radio on the pit lane floor */
    const bw=X(wide?.15:.33),bh=Y(wide?.12:.068),bx=X((b.f[0]+b.f[2])/2)-bw/2,by=wide?Y(.76):Y(b.m[3])+Y(.032);top+=balloon(bx,by,bw,bh,X((b.m[0]+b.m[2])/2),wide?Y(b.m[3])+Y(.15):Y(b.m[3])+Y(.004),r.q,{smax:bh*.22});
    if(wide)top+=T(bx+bw*.5,by-bh*.04,bh*.13,'TEAM RADIO',{c:r.c,st:INK,sw:bh*.03,ls:wide?2:1});
  });
  /* Season 2: shutters down, the names stencilled on them */
  S2.forEach(([n,cc],j)=>{const [sx,sy,sw,sh2]=R4(g.sh[j],X,Y);s+=T(sx+sw/2,sy+sh2*.42,fit(sh2*.16,n,sw*.82),n,{c:'#d8cfba',op:.82,fl:'m15ink'})+patch(cc,sx+sw/2,sy+sh2*.62,sh2*.16,0)});
  s+=T(X(g.s2[0]),Y(g.s2[1]),fit(Y(wide?.03:.016),'SEASON 2 · IN INFERENCE',X(g.s2[2]),'s'),'SEASON 2 · IN INFERENCE',{f:'s',c:LB});
  return svgW([0,Y(g.vb[1]),Wd,Y(g.vb[3]-g.vb[1])],s+top,'')}
