/* D · One board: the chip's board keeps going down the page as one painted picture: the fees run down the traces into the pool, the 69%
   silkscreened beside it, a single trace to the junction, the fork to the lamp and the fuse, and the empty sockets at the foot.
   Phone: the tall board read top to bottom; desktop: the wide board read left to right. */
B3.go('D',(box,Dt)=>{const {pic,flow,eng,ss,cap}=B3;
 const ph=`<g class="phonly">
   ${flow(['M282 0 L282 150 L320 220 L330 318','M318 0 L318 170 L340 230 L346 320','M352 0 L352 320','M392 0 L392 170 L372 236 L366 320','M430 0 L430 160 L398 230 L384 318'],{n:2,dur:2.4,r:9})}
   <text class="sk big" x="582" y="420" text-anchor="middle" font-size="74">${Dt.share}%</text>
   ${['OF $EZ','CREATOR','FEES FILL','THE POOL'].map((t,i)=>ss(t,`x="582" y="${458+i*30}" text-anchor="middle" font-size="25"`)).join('')}
   <text class="glo ok" x="140" y="935" font-size="40" font-family="Anton" letter-spacing="3">RIGHT</text>${ss('$EZ BUYBACK','x="140" y="962" font-size="22"')}
   <text class="glo no" x="600" y="895" text-anchor="middle" font-size="40" font-family="Anton" letter-spacing="3">WRONG</text>${['THE POOL','CAN BE','WIPED OUT'].map((t,i)=>ss(t,`x="600" y="${920+i*24}" text-anchor="middle" font-size="21"`)).join('')}
   ${ss('#2','x="180" y="1060" text-anchor="middle" font-size="62"')}${ss('#3','x="355" y="1060" text-anchor="middle" font-size="62"')}${ss('#4','x="526" y="1060" text-anchor="middle" font-size="62"')}
   ${ss('SEASON 2 →','x="355" y="1150" text-anchor="middle" font-size="34"')}</g>`;
 const dk=`<g class="dkonly">
   ${flow(['M0 230 L240 230 L340 320 L408 340','M0 300 L250 300 L330 340 L408 350','M0 420 L240 420 L330 380 L408 365','M0 480 L250 480 L340 400 L410 375'],{n:2,dur:2.8,r:9})}
   <text class="sk big" x="520" y="532" text-anchor="middle" font-size="56">${Dt.share}%</text>${ss('OF $EZ CREATOR FEES','x="520" y="560" text-anchor="middle" font-size="21"')}${ss('FILL THE POOL','x="520" y="584" text-anchor="middle" font-size="21"')}
   <text class="glo ok" x="812" y="150" text-anchor="end" font-size="40" font-family="Anton" letter-spacing="3">RIGHT</text>${ss('$EZ BUYBACK','x="812" y="176" text-anchor="end" font-size="21"')}
   <text class="glo no" x="806" y="584" text-anchor="end" font-size="40" font-family="Anton" letter-spacing="3">WRONG</text>${ss('THE POOL CAN','x="806" y="610" text-anchor="end" font-size="21"')}${ss('BE WIPED OUT','x="806" y="633" text-anchor="end" font-size="21"')}
   ${ss('#2','x="1105" y="222" text-anchor="middle" font-size="60"')}${ss('#3','x="1105" y="382" text-anchor="middle" font-size="60"')}${ss('#4','x="1105" y="542" text-anchor="middle" font-size="60"')}
   ${ss('SEASON 2 →','font-size="30" text-anchor="middle" transform="translate(1222 372) rotate(90)"')}</g>`;
 const board=pic('d-board','board-tall-2k.jpg|board-wide-2k.jpg','720|1280','1280|720',[40,0,640,1220],[0,40,1280,630],ph+dk,
  `<div class="d-at d-c1" data-at="[40,566]">${cap(`The pool gets bet on the top AI's call. Today that's ${B3.who(Dt)}.`,'d-cap')}</div>
   <div class="d-at d-c2" data-at="[350,1190]">${cap(`NVIDIA is the first bet, <b>not the last.</b>`,'d-cap2')}</div>`);
 box.innerHTML=board;
});
