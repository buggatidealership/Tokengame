/* B · Gold plate: 69% stamped on a brass plate riveted to the pool, the fees pour down the traces into it; the host says the call
   in a speech balloon (the site's own $EZ host, redrawn in the vault's ink); the fork's enamel plates; Season 2 = empty sockets */
B3.go('B',(box,Dt)=>{const {pic,flow,eng,ss,cap,mark,lines}=B3;
 const pool=pic('b-pool','pool-plate-2k.jpg',1280,720,[230,40,830,580],[150,0,980,620],
  `${eng(`${Dt.share}%`,'x="640" y="482" text-anchor="middle" font-size="104" class="big"')}
   ${eng('OF $EZ CREATOR FEES','x="640" y="519" text-anchor="middle" font-size="27"')}
   ${flow(['M614 0 L614 252','M650 0 L650 258','M686 26 L686 252','M703 36 L703 250','M626 60 L626 255'],{n:2,dur:2.2,r:9})}`);
 /* the balloon: one hand-tuned outline with its tail, toward the host's mouth */
 const nmW={GPT:'GPT',KIMI:'KIMI',CLAUDE:'CLAUDE',GROK:'GROK'}[Dt.lead]||Dt.name;
 const host=pic('b-host','host-ink-2k.jpg',768,1024,[0,40,768,620],[0,30,768,700],
  `<path class="bal" stroke-width="6" d="M70 70 C150 40 330 38 400 78 C452 108 458 190 420 234 C398 260 372 270 352 276 L408 372 L318 282 C270 292 180 296 118 280 C40 260 8 210 14 160 C20 116 34 88 70 70Z"/>
   ${lines(212,118,36,['THE POOL GETS BET','ON THE TOP AI’S CALL.','TODAY THAT’S'],'class="vb" text-anchor="middle" font-size="29"')}
   ${mark(Dt.M,138+Math.max(0,(6-nmW.length))*10,236,24)}<text class="vb" x="${172+Math.max(0,(6-nmW.length))*10}" y="254" font-size="54"><tspan class="nm" fill="#b3261e">${nmW}!</tspan></text>`);
 const fork=pic('b-fork','fork-ink-2k.jpg',1280,720,[300,70,700,600],[300,60,900,600],
  `<text class="pl ok" x="760" y="312" text-anchor="middle" font-size="50">RIGHT</text><text class="pl no" x="761" y="573" text-anchor="middle" font-size="50">WRONG</text>
   ${ss('$EZ BUYBACK','x="760" y="372" text-anchor="middle" font-size="28"')}${ss('THE POOL CAN BE WIPED OUT','x="761" y="634" text-anchor="middle" font-size="26"')}`);
 const S=(t,x,y,s)=>ss(t,`font-size="${s}" text-anchor="middle" dominant-baseline="central" transform="matrix(.92 .4 -.78 .42 ${x} ${y})"`);
 const s2=pic('b-s2','sockets-ink-2k.jpg',1280,720,[150,20,950,600],[100,0,1180,620],
  `${S('#2',512,418,110)}${S('#3',812,198,70)}${S('#4',977,82,46)}${S('SEASON 2',880,470,52)}`,
  cap(`NVIDIA is the first bet, <b>not the last.</b>`,'b-cap2'));
 box.innerHTML=`<div class="b-row">${pool}${host}</div><div class="b-row">${fork}${s2}</div>`;
});
