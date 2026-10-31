/* Take D2, "Edge-lit": close up on the plotting glass itself. 1940s plotting boards were edge-lit perspex: the light ran inside the
   sheet and made every grease-pencil mark glow, and the plotters stood BEHIND the glass, writing backwards so the room read it the
   right way round. So here everything is on the glass (lead line, tabs, chart, names, the rows ruled below), glowing from the edge
   light, and the plotter's hand is behind the sheet, dimmed by it, its pencil on the newest point of the leader's line. On a switch
   the hand moves to the new leader's last point. */
window.PNT=PSurf({id:'d2',title:'Follow the money',beat:'Meanwhile, behind the glass…',hd:['Follow the','money'],seed:23,mat:Object.assign({},PN2.wax,{lw:2.8}),rfs2:15,
 phone:{src:'d2-3x4.jpg',hl:'d2-3x4-hl.jpg',iw:768,ih:1024,Q:[[10,96],[758,96],[758,934],[10,934]],crop:W=>({w:W*1.02,ox:W*.01,top:.06,bot:.96}),
   fs:13,top:[.045,.165,.06,.94],chart:[.15,.23,.75,.59],rows:[.04,.63,.96,.97],rfs:1,rub:.3},
 wide:{src:'d2-16x9.jpg',hl:'d2-16x9-hl.jpg',iw:1280,ih:720,Q:[[32,64],[1246,64],[1246,664],[32,664]],
   fs:15,ref:780,top:[.07,.08,.6,.97],chart:[.07,.2,.43,.9],rows:[.57,.22,.985,.8],rfs:1.05,rub:.3},
 after2(root,o){const st=root.querySelector('.pq-st');let h=st.querySelector('.pq-hand');if(!h){h=new Image();h.className='pq-hand';h.alt='';h.src=PN2.IMG+'hand-cut.png';st.insertBefore(h,st.querySelector('.pq-sf'))}
   /* where the leader's last point lands on the page: the surface box point through the same homography */
   const l=o.G.lines.find(x=>x.m===o.w.rank[0]);if(!l){h.style.opacity=0;return}const bx=o.X(l.end[0]),by=o.Y(l.end[1]);
   const sf=root.querySelector('.pq-sf'),m=new DOMMatrix(getComputedStyle(sf).transform),p=m.transformPoint(new DOMPoint(bx,by,0,1)),px=p.x/p.w,py=p.y/p.w;
   const k=(PG.wide()?.26:.17)*(o.S.W/ (PG.wide()?1280:390));h.style.cssText=`position:absolute;z-index:0;width:${700*k}px;left:${px-4*k}px;top:${py-420*k}px;transform-origin:${4*k}px ${420*k}px;transform:rotate(28deg)`}});
