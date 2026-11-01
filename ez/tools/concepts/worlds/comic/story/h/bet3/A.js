/* A · Engraved: 69% engraved into the pool's brass rim, the fees drip off the traces into it; the call as a noir narration caption
   breaking into the fork panel; RIGHT and WRONG on the board's own enamel plates; Season 2 = the chip's empty sockets down the board */
B3.go('A',(box,Dt)=>{const {pic,flow,eng,ss,cap,who}=B3;
 const pool=pic('a-pool','pool-rim-2k.jpg',1280,720,[180,70,960,580],[150,50,1000,600],
  `<path id="a-arc" d="M287 368 A372 207 0 0 0 1031 368" fill="none"/>
   ${eng(`<textPath href="#a-arc" startOffset="54%" text-anchor="middle" dominant-baseline="central"><tspan class="big">${Dt.share}%</tspan> OF $EZ CREATOR FEES FILL THE POOL</textPath>`,'font-size="35"')}
   ${flow(['M610 88 L612 140 L614 262','M714 96 L714 140 L712 276','M392 176 L420 200 L452 300','M858 198 L850 232 L846 312','M1012 232 L962 262 L930 332','M236 405 L300 396 L352 402'],{n:2,dur:2.6,r:10})}`);
 const fork=pic('a-fork','fork-ink-2k.jpg',1280,720,[240,40,760,620],[140,40,1000,620],
  `<text class="pl ok" x="760" y="312" text-anchor="middle" font-size="50">RIGHT</text>
   <text class="pl no" x="761" y="573" text-anchor="middle" font-size="50">WRONG</text>
   ${ss('$EZ BUYBACK','x="760" y="372" text-anchor="middle" font-size="28"')}
   ${ss('THE POOL CAN BE WIPED OUT','x="761" y="634" text-anchor="middle" font-size="26"')}`,
  cap(`The pool gets bet on the top AI's call. Today that's ${who(Dt)}.`,'a-cap'));
 const s2=pic('a-s2','chain-ink-2k.jpg',1280,720,[150,190,1000,500],[110,200,1170,430],
  `${eng('BET #1','x="0" y="0" font-size="44" class="lid" transform="translate(370 420) rotate(-15) skewX(-22)" text-anchor="middle" dominant-baseline="central"')}
   ${ss('#2','font-size="58" text-anchor="middle" transform="translate(748 404) rotate(-12) skewX(-24)"')}
   ${ss('#3','font-size="42" text-anchor="middle" transform="translate(932 364) rotate(-12) skewX(-24)"')}
   ${ss('#4','font-size="30" text-anchor="middle" transform="translate(1076 330) rotate(-12) skewX(-24)"')}
   ${ss('SEASON 2 →','font-size="40" text-anchor="middle" transform="translate(905 488) rotate(-11) skewX(-20)"')}`,
  cap(`NVIDIA is the first bet, <b>not the last.</b>`,'a-cap2'));
 box.innerHTML=`<div class="a-row">${pool}${fork}</div>${s2}`;
});
