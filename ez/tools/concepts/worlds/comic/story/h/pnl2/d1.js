/* Take D1, "The plot": the 1940s ops room, wide. The chart is plotted in grease pencil on the room's big glass board, in its
   perspective; the room's lamps and the window light run across the marks (the glass's own highlights, screened over them); the two
   officers in front cover the foot of the board. Lead line, window tabs and axis are written on the glass by the same hand. On a
   wide screen the rows are written on the glass too, between the officers' heads, where they are looking; on a phone they sit on a
   strip of the same glass under the frame. */
window.PNT=PSurf({id:'d1',title:'Follow the money',beat:'Meanwhile, in the ops room…',hd:['Follow the','money'],seed:31,mat:PN2.wax,rfs2:15,
 phone:{src:'d1-3x4.jpg',hl:'d1-3x4-hl.jpg',fg:'d1-3x4-fg.png',iw:768,ih:1024,Q:[[125,62],[697,140],[718,850],[133,850]],
   crop:W=>({w:W*1.23,ox:125*(W*1.23/768)-W*.03,top:.035,bot:.9}),fs:13,top:[.055,.165,.06,.94],chart:[.12,.24,.76,.665],rub:.28},
 wide:{src:'d1-16x9.jpg',hl:'d1-16x9-hl.jpg',fg:'d1-16x9-fg.png',iw:1280,ih:720,Q:[[255,58],[1068,100],[1128,640],[228,640]],
   fs:13.5,ref:540,top:[.06,.075,.58,.97],chart:[.1,.17,.8,.52],rows:[.17,.585,.74,.96],rfs:.95,rub:.25},
 strip(rw){rw.style.background=`linear-gradient(#5b4318,#a3803b 3px,#3a2a10 7px,#0000 9px),url(${PN2.IMG}d1-3x4.jpg) 40% 46%/260% auto,#0d1219`;rw.style.boxShadow='inset 0 -6px 0 #2a1f0c'}});
