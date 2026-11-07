/* Take F, "The big board": a 1920s exchange. The chart is chalked on the slate wall that boards like this carried prices on; the
   clerk on the ladder stands in front of it, the crowd below; chalk dust and the lamps' light are the painting's own. The rows are
   chalked on a strip of the same slate under the rail, the way the board listed every stock. */
window.PNT=PSurf({id:'f',title:'On the big board',beat:'Meanwhile, at the exchange…',hd:['On the','big board'],seed:57,mat:PN2.chalk,rfs2:15,
 phone:{src:'f-3x4.jpg',hl:null,fg:'f-3x4-fg.png',iw:768,ih:1024,Q:[[25,250],[522,122],[522,605],[25,598]],
   crop:W=>({w:W*1.34,ox:25*(W*1.34/768)-W*.02,top:.09,bot:.8}),fs:13,top:[.06,.25,.06,.94],chart:[.15,.34,.75,.93],rub:.3},
 wide:{src:'f-16x9.jpg',hl:null,fg:'f-16x9-fg.png',iw:1280,ih:720,Q:[[255,190],[860,95],[860,480],[255,492]],
   fs:12.5,ref:380,top:[.08,.1,.6,.99],chart:[.1,.24,.8,.9],rub:.3},
 strip(rw){rw.style.background=`linear-gradient(#6b4422,#3a220f 6px,#0000 9px),url(${PN2.IMG}f-3x4.jpg) 10% 34%/320% auto,#1f2622`;rw.style.boxShadow='inset 0 -7px 0 #3a220f'}});
