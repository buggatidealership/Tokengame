/* ---------- shared: svg wrapper, defs ---------- */
const svgW=(vb,body,defs,cls)=>`<svg class="m15-svg ${cls||''}" viewBox="${vb.map(v=>f1(v)).join(' ')}" aria-hidden="true"><defs>${defs||''}<radialGradient id="m15vg" cx="50%" cy="42%" r="72%"><stop offset="60%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".5"/></radialGradient>
 <linearGradient id="m15holo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff6b6b"/><stop offset=".2" stop-color="#ffd93d"/><stop offset=".4" stop-color="#6bff95"/><stop offset=".6" stop-color="#5ad1ff"/><stop offset=".8" stop-color="#b48cff"/><stop offset="1" stop-color="#ff6bd6"/></linearGradient>
 <filter id="m15ink" x="-3%" y="-15%" width="106%" height="130%"><feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G"/></filter></defs>${body}</svg>`;
const R4=(g,X,Y)=>[X(g[0]),Y(g[1]),X(g[2]-g[0]),Y(g[3]-g[1])];
/* a speech balloon: an ellipse-ish hand-cut shape with a wedge tail toward (tx,ty), its words fitted */
function balloon(x,y,w,h,tx,ty,txt,o){o=o||{};const cx=x+w/2,cy=y+h/2,rx=w/2,ry=h/2;
  const a=Math.atan2(ty-cy,tx-cx),b1=a-.32,b2=a+.32,p1=[cx+Math.cos(b1)*rx*.86,cy+Math.sin(b1)*ry*.86],p2=[cx+Math.cos(b2)*rx*.86,cy+Math.sin(b2)*ry*.86];
  const q=qfit(txt,w*.8,h*.72,o.smax||h*.3,o.smin||4,'s');const sw=o.sw||Math.max(1.5,h*.035);
  const shape=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}"/><path d="M${f1(p1[0])} ${f1(p1[1])}L${f1(tx)} ${f1(ty)}L${f1(p2[0])} ${f1(p2[1])}Z"/>`;
  return `<g class="m15-bal"><g fill="${INK}" transform="translate(${f1(sw*1.4)} ${f1(sw*1.6)})" opacity=".55">${shape}</g><g fill="${INK}" stroke="${INK}" stroke-width="${f1(sw*2)}" stroke-linejoin="round">${shape}</g><g fill="#fbf4e2">${shape}</g>${q?lines(q,cx,cy,INK,{f:'s'}):''}</g>`}
/* ================= A · the Season 1 set (trading cards) ================= */
const GA={p:{img:'pa2',W:1536,H:2048,vb:[0,0,1,1],
  c:[{w:[.1387,.104,.448,.264],pl:[.142,.268,.445,.300],pn:[.1387,.305,.448,.388],o:[.117,.093,.47,.404],md:[.155,.11]},
     {w:[.536,.104,.856,.264],pl:[.539,.268,.853,.300],pn:[.536,.305,.856,.388],o:[.514,.093,.867,.404],md:[.555,.11]},
     {w:[.1387,.446,.448,.608],pl:[.142,.613,.445,.645],pn:[.1387,.652,.448,.734],o:[.117,.43,.47,.75],md:[.155,.4525]},
     {w:[.536,.446,.856,.608],pl:[.539,.613,.853,.645],pn:[.536,.652,.856,.734],o:[.514,.43,.867,.75],md:[.555,.4525]}],
  mr:.034,pack:[.53,.802,.862,.926],title:[.5,.045,.9,.07],key:[.5,.768,.7]},
 w:{img:'wa',W:2048,H:1152,vb:[0,.06,1,.9],
  c:[[.066,.198],[.238,.364],[.406,.532],[.572,.696]].map(([a,b])=>({w:[a,.318,b,.527],pl:[a+.002,.536,b-.002,.562],pn:[a,.571,b,.718],o:[a-.012,.302,b+.012,.736],md:[a+.009,.322]})),
  mr:.02,pack:[.757,.238,.884,.472],title:[.36,.16,.62,.12],key:[.36,.245,.6]}};
function tA(R,wide){const g=GA[wide?'w':'p'],Wd=g.W,Hd=g.H,X=f=>f*Wd,Y=f=>f*Hd;let s=`<image href="${BASE}${g.img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none"/>`,df='';
  s+=head(X(g.title[0]),Y(g.title[1]),X(g.title[2]),Y(g.title[3]));s+=tag(X(g.key[0]),Y(g.key[1]),Y(wide?.03:.016),X(g.key[2]));
  R.forEach((r,i)=>{const c=g.c[i],id='m15a'+i,[wx,wy,ww,wh]=R4(c.w,X,Y);
    /* the card's border in the model's colour; #1 printed on holo foil */
    s+=ring(g.img,Wd,Hd,[X(c.o[0]),Y(c.o[1]),X(c.o[2]),Y(c.o[3])],[wx,wy,X(c.pn[2]),Y(c.pn[3])],r.c,id+'t',1.3);
    if(i===0)s+=`<path clip-rule="evenodd" fill-rule="evenodd" d="M${f1(X(c.o[0]))} ${f1(Y(c.o[1]))}H${f1(X(c.o[2]))}V${f1(Y(c.o[3]))}H${f1(X(c.o[0]))}Z M${f1(wx)} ${f1(wy)}H${f1(X(c.pn[2]))}V${f1(Y(c.pn[3]))}H${f1(wx)}Z" fill="url(#m15holo)" opacity=".55" style="mix-blend-mode:overlay"/>`;
    s+=face(r.m,wx,wy,ww,wh,{vg:'m15vg'});
    /* name plate (gold): the name in ink, the flag patch at its right end */
    const [px,py,pw,ph]=R4(c.pl,X,Y);s+=nm(r,px+ph*.45,py+ph*.53,ph*.98,pw-ph*1.9,{a:'start',c:'#16110a',vc:'#16110a'})+patch(r.cc,px+pw-ph*.75,py+ph*.5,ph*1.05,4);
    /* the black panel: the lab, the season line, the model's own line */
    const [nx,ny,nw,nh]=R4(c.pn,X,Y),pad=nw*.06;
    if(!wide){s+=T(nx+nw/2,ny+nh*.15,nh*.14,'by '+LAB[r.m],{f:'s',c:LB})+stat(r,nx+nw/2,ny+nh*.36,nh*.21,nw-pad*2);
      const q=qfit(r.q,nw-pad*2,nh*.42,nh*.16,4,'s');if(q)s+=lines(q,nx+nw/2,ny+nh*.75,QT,{f:'s'})}
    else{s+=T(nx+nw/2,ny+nh*.12,nh*.12,'by '+LAB[r.m],{f:'s',c:LB})+stat2(r,nx+nw/2,ny+nh*.3,nh*.15,nw-pad*2);
      const q=qfit(r.q,nw-pad*2,nh*.34,nh*.13,4,'s');if(q)s+=lines(q,nx+nw/2,ny+nh*.79,QT,{f:'s'})}
    /* the medallion: the rank struck in it */
    const mx=X(c.md[0]),my=Y(c.md[1]),mr=X(g.mr);s+=T(mx,my+mr*.08,mr*1.6,String(i+1),{c:'#1a1208',st:'#f7e2a0',sw:mr*.06});});
  /* Season 2: the sealed pack */
  const [kx,ky,kw,kh]=R4(g.pack,X,Y),vert=kh>kw;let t='';
  t+=T(kx+kw/2,ky+kh*(vert?.15:.18),fit(kh*(vert?.14:.22),'SEASON 2',kw*.8),'SEASON 2',{c:CR,ls:2});
  t+=T(kx+kw/2,ky+kh*(vert?.28:.36),fit(kh*(vert?.065:.11),'SEALED · IN INFERENCE',kw*.86,'s'),'SEALED · IN INFERENCE',{f:'s',c:LB});
  S2.forEach(([n,cc],j)=>{const col=vert?0:j%2,row=vert?j:Math.floor(j/2),cx=vert?kx+kw/2:kx+kw*(col?.72:.28),cy=vert?ky+kh*(.45+j*.14):ky+kh*(.58+row*.24),ss=vert?kh*.085:kh*.13;
    t+=patch(cc,cx-tw(n,ss)/2-ss*.9,cy,ss*1.25,0)+T(cx+ss*.2,cy,ss,n,{c:'#cfc6b0'})});
  s+=t;
  return svgW([0,Y(g.vb[1]),Wd,Y(g.vb[3]-g.vb[1])],s,df)}
