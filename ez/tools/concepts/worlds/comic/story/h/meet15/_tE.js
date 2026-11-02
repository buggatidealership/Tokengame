/* ================= E · the weigh-in (each scale reads its season P&L) ================= */
const GE={p:{img:'pe2',W:1536,H:2048,vb:[0,0,1,.985],ban:[.03,.015,.97,.125],
   d:[[.316,.247],[.681,.247],[.316,.556],[.681,.556]],dr:.077,
   po:[[.041,.183,.185,.306],[.8107,.183,.952,.306],[.0427,.506,.1813,.624],[.8107,.506,.952,.624]],
   pl:[[.205,.398,.43],[.57,.398,.43],[.205,.695,.43],[.57,.695,.43]],plw:.22,
   bal:[[.38,.172],[.38,.262],[.38,.481],[.38,.571]],chair:[[.13,.898],[.356,.898],[.60,.898],[.843,.898]],pw:.095,bench:[.5,.79]},
  w:{img:'we',W:2048,H:1152,vb:[0,0,1,1],ban:[.03,.01,.97,.105],
   d:[[.109,.509],[.269,.511],[.423,.511],[.577,.509]],dr:.0345,
   po:[[.086,.274,.160,.409],[.242,.274,.314,.409],[.390,.274,.462,.409],[.548,.274,.622,.409]],
   pl:[[.064,.895],[.224,.895],[.378,.895],[.532,.895]],plw:.09,
   chair:[[.725,.752],[.795,.752],[.865,.752],[.935,.752]],pw:.05,bench:[.83,.845]}};
const LO=-1e5,HI=2e5;
function dial(r,cx,cy,R0,id){const a=v=>(180+180*(Math.max(LO,Math.min(HI,v))-LO)/(HI-LO))*Math.PI/180,P=(v,k)=>[cx+Math.cos(a(v))*R0*k,cy-R0*.12+Math.sin(a(v))*R0*k];let t='';
  const arc=(v0,v1,k,col,w)=>{const [x0,y0]=P(v0,k),[x1,y1]=P(v1,k);return `<path d="M${f1(x0)} ${f1(y0)}A${f1(R0*k)} ${f1(R0*k)} 0 0 1 ${f1(x1)} ${f1(y1)}" fill="none" stroke="${col}" stroke-width="${f1(w)}"/>`};
  /* the dial's printed band in the model's colour; under it the loss side printed red, the profit side green */
  t+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R0*.95)}" fill="none" stroke="${r.c}" stroke-width="${f1(R0*.1)}"/>`+arc(LO,0,.8,'#c8392f',R0*.06)+arc(0,HI,.8,'#2f9a57',R0*.06);
  for(let v=LO;v<=HI;v+=25e3){const big=v%1e5===0,[x0,y0]=P(v,big?.64:.7),[x1,y1]=P(v,.76);t+=`<line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" stroke="#2a2118" stroke-width="${f1(R0*(big?.035:.018))}"/>`;
    if(big){const [lx,ly]=P(v,.5);t+=T(lx,ly+(v===LO||v===HI?-R0*.06:0),R0*.12,v===0?'0':(v>0?'+':'−')+Math.abs(v/1e3)+'K',{c:'#2a2118'})}}
  /* the needle swings to the season P&L */
  const [nx,ny]=P(r.pl,.78),[bx,by]=P(r.pl,-.1);t+=`<line x1="${f1(bx)}" y1="${f1(by)}" x2="${f1(nx)}" y2="${f1(ny)}" stroke="#14100c" stroke-width="${f1(R0*.05)}" stroke-linecap="round"/><circle cx="${f1(cx)}" cy="${f1(cy-R0*.12)}" r="${f1(R0*.07)}" fill="#14100c"/>`;
  const pt=$(r.pl);t+=T(cx,cy+R0*.3,fit(R0*.3,pt,R0*1.2),pt,{c:r.pl>=0?'#13703a':'#a3221a'})+T(cx,cy+R0*.55,R0*.13,'SEASON P&L',{f:'s',c:'#4a3d2c'});
  return t}
function tE(R,wide){const g=GE[wide?'w':'p'],Wd=g.W,Hd=g.H,X=f=>f*Wd,Y=f=>f*Hd;let s=`<image href="${BASE}${g.img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none"/>`,top='';
  const [bx,by,bw,bh]=R4(g.ban,X,Y);s+=head(bx+bw/2,by+bh*.42,bw*(wide?.5:.84),bh*.6,{rot:-1})+tag(bx+bw/2,by+bh*.85,bh*.17,bw*.8);
  R.forEach((r,i)=>{const id='m15e'+i,[dx,dy]=g.d[i],R0=X(g.dr);s+=dial(r,X(dx),Y(dy),R0,id);
    /* the fighter's poster: the founder, the name printed across its foot */
    const [px,py,pw,ph]=R4(g.po[i],X,Y);s+=face(r.m,px,py,pw,ph*.74,{vg:'m15vg'})+`<rect x="${f1(px)}" y="${f1(py+ph*.74)}" width="${f1(pw)}" height="${f1(ph*.26)}" fill="#0d0b10"/>`;
    s+=nm(r,px+pw/2,py+ph*.845,ph*.14,pw*.9)+T(px+pw/2,py+ph*.95,fit(ph*.06,'by '+LAB[r.m],pw*.86,'s'),'by '+LAB[r.m],{f:'s',c:LB});
    s+=patch(r.cc,px+pw-pw*.13,py+pw*.1,pw*.2,6);
    /* the platform's brass plate: the weigh-in order and the record */
    const pl=g.pl[i],plx=X(pl[0]),ply=Y(pl[1]),plw=X(g.plw),plh=plw*.2;s+=brass(plx,ply,plw,plh,id+'b');
    const wsx=`${r.W}-${r.L}`,s1=plh*.55;s+=T(plx+plw*.1,ply+plh*.53,s1,'No. '+(i+1),{a:'start',...ENG})+T(plx+plw*.58,ply+plh*.54,s1*.6,'W-L',{a:'end',f:'s',c:'#d9c08a'})+wl(r,s1,plx+plw*.62,ply+plh*.53,{a:'start',dc:'#d9c08a',st:'#1c1306',sw:s1*.08});
    /* trash talk */
    if(!wide){const [qx,qy]=g.bal[i],bw2=X(.24),bh2=Y(.075),bx2=X(qx),by2=Y(qy);
      top+=balloon(bx2,by2,bw2,bh2,i%2?X(dx)-R0*.95:X(dx)+R0*.95,Y(dy)+R0*(i%2?.35:-.45),r.q,{smax:bh2*.22})}
    else{const bw2=X(.1),bh2=Y(.15),bx2=X(dx)+R0*1.05,by2=Y(dy)+R0*1.6;top+=balloon(bx2,by2,bw2,bh2,X(dx)+R0*.75,Y(dy)+R0*.85,r.q,{smax:bh2*.17})}});
  /* Season 2: the bench, a card on every seat */
  S2.forEach(([n,cc],j)=>{const [cx,cy]=g.chair[j],w0=X(g.pw),h0=w0*.38,x0=X(cx),y0=Y(cy);s+=T(x0+h0*.18,y0-h0*.05,fit(h0*.42,n,w0*.66),n,{c:INK})+patch(cc,x0-w0*.36,y0,h0*.42,0)});
  const bt='SEASON 2 · NEXT TO WEIGH IN · IN INFERENCE';s+=T(X(g.bench[0]),Y(g.bench[1]),fit(Y(wide?.024:.016),bt,X(wide?.26:.9),'s'),bt,{f:'s',c:CR,st:INK,sw:Y(.002)});
  return svgW([0,Y(g.vb[1]),Wd,Y(g.vb[3]-g.vb[1])],s+top,'')}
