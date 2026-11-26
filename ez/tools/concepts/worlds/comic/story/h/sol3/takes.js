/* the takes: world x style, with the surfaces measured on each painting (measure.py for the arcades, grid.py by eye for the rest) */
const FP3=(sx)=>({src:sx.src,surf:sx.surf,pen:sx.pen,plates:[{id:'season',q:sx.pl[0]},{id:'d7',q:sx.pl[1]},{id:'d1',q:sx.pl[2]},{id:'mode',q:sx.pl[3]}],knob:sx.knob});
const FP16=(sx)=>({surf:sx.surf,pen:sx.pen,plates:[{id:'hit',q:sx.pl[0]},{id:'season',q:sx.pl[1]},{id:'d7',q:sx.pl[2]},{id:'d1',q:sx.pl[3]},{id:'pnl',q:sx.pl[4]}],knob:sx.knob});
window.S3TAKES={
 a1:()=>S3ARC('a1','arc-s1',[104,124,696,612],[292,68,948,496]),
 a2:()=>S3ARC('a2','arc-s2',[96,156,668,592],[340,104,940,496]),
 a3:()=>S3ARC('a3','arc-s4',[120,120,672,592],[340,68,964,492]),
 p1:()=>S3FRT('p1','frt-s1',FP3({src:'frt-s1t-3x4.jpg',surf:[140,322,570,738],pen:440,pl:[[148,872,222,898],[256,872,332,898],[364,872,440,898],[504,884,618,912]],knob:[567,830,52]}),
     {surf:[432,205,828,505],pen:712,plates:[{id:'season',q:[420,668,476,690]},{id:'d7',q:[524,668,582,690]},{id:'d1',q:[620,668,678,690]},{id:'mode',q:[778,683,858,702]}],knob:[822,640,32]}),
 p2:()=>S3FRT('p2','frt-s2',FP3({src:'frt-s2t-3x4.jpg',surf:[130,318,570,750],pen:448,pl:[[148,890,228,918],[258,890,338,918],[366,890,446,918],[508,898,628,926]],knob:[568,845,55]}),
     {surf:[432,205,828,505],pen:712,plates:[{id:'season',q:[420,668,476,690]},{id:'d7',q:[524,668,582,690]},{id:'d1',q:[620,668,678,690]},{id:'mode',q:[778,683,858,702]}],knob:[822,640,32]}),
 p3:()=>S3FRT('p3','frt-s3',FP3({src:'frt-s3t-3x4.jpg',surf:[132,322,572,742],pen:444,pl:[[154,884,234,912],[262,884,340,912],[368,884,446,912],[514,890,624,922]],knob:[567,838,52]}),
     {surf:[432,205,828,505],pen:712,plates:[{id:'season',q:[420,668,476,690]},{id:'d7',q:[524,668,582,690]},{id:'d1',q:[620,668,678,690]},{id:'mode',q:[778,683,858,702]}],knob:[822,640,32]}),
 d1:()=>S3TOP('d1','top-s1',{surf:[88,262,612,758],pen:448},{surf:[322,112,928,700],pen:800}),
 d3:()=>S3TOP('d3','top-s3',{surf:[72,262,612,760],pen:447},{surf:[322,112,928,700],pen:800})};
/* the pick, painted at 2K (high): the same cabinet, a finer brush */
S3TAKES.a1hd=()=>S3World({id:'a1hd',kind:'arc',img:S3IMG,mat:arcM,
  phone:{src:'arc-s1hd-3x4.jpg',iw:1536,ih:2048,crop:[250,300,1350,1500],surf:[320,384,1280,1180],ctl:'menu',fk:.047,ins:.03},
  wide:{src:'arc-s1hd-16x9.jpg',iw:2048,ih:1152,crop:[0,0,2048,1152],surf:[564,150,1524,830],ctl:'menu',fk:.034,fmax:24,ins:.03}});
