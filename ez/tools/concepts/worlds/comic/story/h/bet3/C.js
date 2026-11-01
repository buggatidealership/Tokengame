/* C · Gauge: the tank's dial reads the pool's share (the needle at SIM.poolShare on a 0 to 100 scale printed on the blank dial), gold rises
   in its window; the call as a caption, then the leader speaks from the junction, its mark struck on the solder ball; Season 2 down the board */
B3.go('C',(box,Dt)=>{const {pic,eng,ss,cap,mark,lines}=B3;
 const cx=726,cy=372,R=88,a0=-225,sw=270,ang=v=>(a0+sw*v/100)*Math.PI/180,P=(v,r)=>[cx+r*Math.cos(ang(v)),cy+r*Math.sin(ang(v))];
 let ticks='';for(let v=0;v<=100;v+=5){const [x1,y1]=P(v,R*.86),[x2,y2]=P(v,R*(v%25?.76:.68));ticks+=`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke-width="${v%25?1.6:3}"/>`}
 const num=[[0,.6,11],[50,.52,13],[100,.6,11]].map(([v,r,f])=>{const [x,y]=P(v,R*r);return `<text x="${x.toFixed(1)}" y="${(y+4).toFixed(1)}" text-anchor="middle" font-size="${f}">${v}</text>`}).join('');
 const sh=Dt.share,[nx,ny]=P(sh,R*.8);
 const [sx,sy]=P(0,R*.78),[ex,ey]=P(sh,R*.78);
 const dial=`<g class="c-dial"><path class="arc" d="M${sx.toFixed(1)} ${sy.toFixed(1)} A${R*.78} ${R*.78} 0 ${sh>66.7?1:0} 1 ${ex.toFixed(1)} ${ey.toFixed(1)}"/>${ticks}${num}
   <text class="dv" x="${cx}" y="${cy+44}" text-anchor="middle" font-size="27">${sh}%</text>
   <line class="nd" x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}"/><circle cx="${cx}" cy="${cy}" r="9" class="hub"/></g>`;
 /* fees: gold rising in the window, a glint running down the pipe (one loop) */
 const bub=Array.from({length:7},(_,i)=>{const x=492+i*11,d=(2.2+(i%3)*.5).toFixed(1);return `<circle cx="${x}" cy="520" r="${3+(i%3)}" class="bb"><animate attributeName="cy" values="525;305" dur="${d}s" begin="-${(i*.37).toFixed(2)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;.9;0" keyTimes="0;.1;.8;1" dur="${d}s" begin="-${(i*.37).toFixed(2)}s" repeatCount="indefinite"/></circle>`}).join('');
 const glint=`<rect x="618" y="-60" width="78" height="46" class="gl"><animate attributeName="y" values="-60;120" dur="2.2s" repeatCount="indefinite"/></rect>`;
 const pool=pic('c-pool','pool-gauge-2k.jpg',1280,720,[400,40,520,580],[190,0,900,630],
  `<clipPath id="c-pipe"><rect x="615" y="0" width="86" height="120"/></clipPath><g clip-path="url(#c-pipe)">${glint}</g>${bub}${dial}
   ${ss('OF $EZ CREATOR FEES','x="660" y="578" text-anchor="middle" font-size="25"')}${ss('FILL THE POOL','x="660" y="606" text-anchor="middle" font-size="25"')}`);
 const fork=pic('c-fork','fork-ink-2k.jpg',1280,720,[230,60,770,600],[150,40,1000,620],
  `${mark(Dt.M,437,330,40)}<text class="nmk" x="437" y="274" text-anchor="middle" font-size="44">${(B3.NM[Dt.lead]||Dt.name).toUpperCase()}</text>
   <path class="bal" stroke-width="5" d="M268 432 C320 404 470 400 520 430 C556 452 552 502 512 522 C482 538 420 542 372 538 C328 534 280 526 262 500 C248 478 250 446 268 432Z M402 410 L428 366 L440 414Z"/>
   ${lines(404,468,34,['TODAY','THAT’S ME.'],'class="vb" text-anchor="middle" font-size="31"')}
   <text class="pl ok" x="760" y="312" text-anchor="middle" font-size="50">RIGHT</text><text class="pl no" x="761" y="573" text-anchor="middle" font-size="50">WRONG</text>
   ${ss('$EZ BUYBACK','x="760" y="372" text-anchor="middle" font-size="28"')}${ss('THE POOL CAN BE WIPED OUT','x="761" y="634" text-anchor="middle" font-size="26"')}`,
  cap(`The pool gets bet on the top AI's call.`,'c-cap'));
 const s2=pic('c-s2','chain-ink-2k.jpg',1280,720,[150,190,1000,500],[110,200,1170,430],
  `${eng('BET #1','x="0" y="0" font-size="44" text-anchor="middle" dominant-baseline="central" transform="translate(370 420) rotate(-15) skewX(-22)"')}
   ${ss('#2','font-size="58" text-anchor="middle" transform="translate(748 404) rotate(-12) skewX(-24)"')}${ss('#3','font-size="42" text-anchor="middle" transform="translate(932 364) rotate(-12) skewX(-24)"')}${ss('#4','font-size="30" text-anchor="middle" transform="translate(1076 330) rotate(-12) skewX(-24)"')}
   ${ss('NVIDIA IS THE FIRST BET,','font-size="30" text-anchor="middle" transform="translate(880 470) rotate(-11) skewX(-20)"')}${ss('NOT THE LAST. SEASON 2 →','font-size="30" text-anchor="middle" transform="translate(890 508) rotate(-11) skewX(-20)"')}`);
 box.innerHTML=`<div class="c-row">${pool}${fork}</div>${s2}`;
});
