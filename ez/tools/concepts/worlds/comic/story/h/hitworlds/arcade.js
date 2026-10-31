/* W2 "Insert coin": one upright arcade cabinet in a dark arcade. The hit rate is a high-score race drawn in vector phosphor on the
   CRT (the lines glow and leave a faint trail), the coin flip is a row of gold coins across the screen at 50% (a coin is the
   arcade's own currency and the thing to beat). The switch is the cabinet's own buttons: each lights when its mode is on, with its
   name silkscreened on the plate under it (desktop); on a phone, where the plates are too small, the game's own on-screen menu
   ("1P HIT RATE  2P P&L") carries the same buttons. On a switch the screen blanks and redraws (a CRT re-trace). */
const arcM={font:'VT323,monospace',gold:'#ffd23f',dim:'#7f9bc4',up:'#5dff9e',dn:'#ff5a4e',baseC:'#ffd23f',
  ink:(m,ld)=>ld?'#ffd23f':({GPT:'#43f59a',KIMI:'#4fa2ff',CLAUDE:'#ff8a4c',GROK:'#eaf2ff'})[m],
  defs:id=>`<filter id="${id}Mat" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="g"/><feGaussianBlur in="SourceGraphic" stdDeviation=".4" result="c"/><feMerge><feMergeNode in="g"/><feMergeNode in="g"/><feMergeNode in="c"/></feMerge></filter>`,
  rule:(x0,y,x1,y1,c,w)=>`<path d="M${x0} ${y.toFixed(1)}H${x1}" stroke="${c}" stroke-width=".6" stroke-dasharray="2 5" opacity=".6" fill="none"/>`,
  base:(x0,x1,y)=>{let s='';const n=Math.floor((x1-x0)/16);for(let i=0;i<=n;i++){const x=x0+i*(x1-x0)/n;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="none" stroke="#ffd23f" stroke-width="1.1" opacity=".8"/>`}return s},
  line:(l,c)=>`<path class="hw-ln" pathLength="1" d="${l.d}" stroke="${c}" stroke-width="${l.ld?2.4:1.5}"/>`,
  ctl:(w,h,lab,on,dim,k)=>k.menu?`<text x="${w/2}" y="${h*.78}" font-size="${h*.95}" text-anchor="middle" fill="${on?'#04070e':dim?'#4d6487':'#cfe0ff'}" style="${on?'':''}">${HW.esc(lab.toUpperCase())}</text>${on?`<rect x="1" y="1" width="${w-2}" height="${h-2}" fill="#ffd23f" style="mix-blend-mode:normal" opacity=".95"/><text x="${w/2}" y="${h*.78}" font-size="${h*.95}" text-anchor="middle" fill="#04070e">${HW.esc(lab.toUpperCase())}</text>`:''}`
    :`<text x="${w/2}" y="${h*.72}" font-size="${h*.66}" text-anchor="middle" fill="${on?'#ffe9a6':'#e8e2d0'}" opacity="${dim?.5:.92}" letter-spacing=".04em">${HW.esc(lab.toUpperCase())}</text>`,
  cfont:'VT323,monospace'};
const AQ=(x0,y0,x1,y1)=>[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
window.HWT=HWorld({id:'arc',beat:'Meanwhile, at the arcade…',img:HWIMG,mat:arcM,
 phone:{src:'arcade-3x4.jpg',iw:768,ih:1024,crop:W=>({w:W*1.55,ox:W*1.55*190/768,top:.21,bot:.67}),Q:[[232,240],[590,232],[580,525],[215,520]],fs:19,ref:300,
   plot:[.08,.3,.72,.9],lead:[.05,.24],stack:1,
   /* the on-screen menu, top row of the screen */
   ctl:[{id:'hit',menu:1,Q:[[252,250],[352,249],[351,268],[251,269]],lab:'1P Hit rate',glow:[322,610,30,'#ffd23f']},{id:'pnl',menu:1,Q:[[362,249],[420,248],[419,267],[361,268]],lab:'2P P&L',glow:[385,608,30,'#ffd23f']},
        {id:'season',menu:1,Q:[[440,248],[497,247],[496,266],[439,267]],lab:'Szn',glow:[443,610,30,'#2bff7a']},{id:'d7',menu:1,Q:[[502,247],[535,246],[534,265],[501,266]],lab:'7D',glow:[500,612,30,'#ff3a31']},{id:'d1',menu:1,Q:[[540,246],[575,245],[574,264],[539,265]],lab:'24H',glow:[556,614,30,'#ffd23f']}]},
 wide:{src:'arcade-16x9.jpg',iw:1280,ih:720,crop:W=>({w:W*1.15,ox:W*1.15*95/1280,top:.08,bot:.88}),Q:[[380,108],[900,108],[905,384],[375,384]],fs:24,ref:520,
   plot:[.07,.25,.74,.9],lead:[.04,.11],stack:1,
   ctl:[{id:'hit',Q:AQ(466,521,534,546),lab:'Hit rate',glow:[507,476,44]},{id:'pnl',Q:AQ(563,521,631,546),lab:'P&L',glow:[597,476,44]},
        {id:'season',Q:AQ(666,521,733,546),glow:[697,476,44,'#2bff7a']},{id:'d7',Q:AQ(766,521,835,546),glow:[792,476,44,'#ff3a31']},{id:'d1',Q:AQ(865,521,934,546),glow:[892,476,44]}]}});
