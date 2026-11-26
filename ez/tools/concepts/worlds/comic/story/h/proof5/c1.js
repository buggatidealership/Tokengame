/* C1 THE NEXT SOCKETS: the board's last row is empty sockets waiting for the next rounds' chips. Each window above a socket lights the
   company's mark and the day its calls lock; the board ends in a gold edge connector that plugs into the Upcoming tab. Then the panel:
   the next bell's countdown on its glass, and two buttons: Get $EZ and Follow on X. Paintings: q-sockets-b, q-panel-b. */
(function(){const P5=window.P5,{t,GD,AMB,UP,CR}=P5;
const CR1=[112,196,888,826],WN=[[144,254],[270,256],[394,256],[518,256],[642,254],[766,254]],WW=90,WH=100,FING=[120,762,768,40];
const CR2=[118,150,882,812],GL=[136,172,724,288],B1=[336,660],B2=[658,660];
function card(X){const out=[];X.days.forEach(d=>d.rs.forEach(r=>{if(out.length<6)out.push({r,d})}));return out}
P5.take={id:'c1',cd:X=>P5.cd(X),html(X){return `<div class="p5-bleed"><h2 class="t4-h2 p5-h"><span class="t4-hw">Next on</span> <span class="t4-hw p5-hw2">the card</span></h2><div class="p5-col"><div class="p5-st"></div><p class="p5-ln">Every round gets its chip when the calls lock. <b>Plug in for the whole schedule.</b></p></div><div class="p5-gut"></div><div class="p5-col"><div class="p5-st"></div><p class="p5-ln">$EZ isn’t live yet. The address appears here, and only here, at launch. <b>Anyone DMing you one before that is a scammer.</b> Not financial advice.</p></div></div>`},
 draw(box,X){const [s1,s2]=box.querySelectorAll('.p5-st'),C=card(X);let lit='',silk='',top='';
  C.forEach(({r,d},i)=>{const [x,y]=WN[i],cx=x+WW/2;lit+=P5.litLogo(r.ticker,cx,y+38,56)+t(cx,y+88,26,new Date(d.t).toLocaleDateString('en-US',{weekday:'short',timeZone:'UTC'}).toUpperCase(),{a:'middle',c:AMB})});
  silk+=t(500,FING[1]-16,30,'EVERYTHING COMING UP',{a:'middle',c:'#fff6dc',ls:2});
  top+=`<rect class="p5-fing" x="${FING[0]}" y="${FING[1]}" width="${FING[2]}" height="${FING[3]}" fill="${GD}" style="mix-blend-mode:screen"/>`;
  const lab=C.map(({r,d})=>`${r.co} (${r.ticker}), calls lock ${P5.day(d.t,X.today)}`).join('; ');
  P5.stage(s1,{img:'media/p5-sockets.jpg',crop:CR1,glass:WN.map(([x,y])=>[x,y,WW,WH,6]),lit,silk,top,glare:.55,bloom:1.8,label:'Next on the card: '+lab});
  s1.insertAdjacentHTML('beforeend',P5.link(CR1,{href:'#/upcoming',label:'See everything coming up',x:FING[0],y:FING[1]-50,w:FING[2],h:FING[3]+60}));
  /* the panel: the next bell on the glass; the buttons' caps lit with what they do */
  const nb=P5.nextClose(X);let l2=t(500,232,32,'THE NEXT BELL',{a:'middle',c:AMB,ls:2})+t(500,338,92,P5.cd(X),{a:'middle',c:CR,cls:'p5-cd'})+t(500,400,28,nb?`${nb.r.co.toUpperCase()} · ${X.nUp} ROUNDS LEFT IN SEASON 1`:'',{a:'middle',c:'#9fd8b4'});
  const live=!!(window.CONFIG&&CONFIG.ca);
  l2+=t(B1[0],B1[1]-6,30,'GET',{a:'middle',c:'#eafff1'})+t(B1[0],B1[1]+30,34,'$EZ',{a:'middle',c:'#eafff1'})+t(B2[0],B2[1]-6,30,'FOLLOW',{a:'middle',c:CR})+t(B2[0],B2[1]+30,34,'ON X',{a:'middle',c:CR});
  const sk=t(B1[0],B1[1]+118,26,live?'':'OPENS AT LAUNCH',{a:'middle',c:'#fff6dc'})+t(B2[0],B2[1]+118,26,'EVERY CALL FIRST',{a:'middle',c:'#fff6dc'});
  P5.stage(s2,{img:'media/p5-panel.jpg',crop:CR2,glass:[[GL[0],GL[1],GL[2],GL[3],10]],lit:l2,silk:sk,glare:.5,bloom:2.2,label:'The next bell, Get $EZ and Follow on X'});
  s2.insertAdjacentHTML('beforeend',(live?P5.link(CR2,{href:CONFIG.buyUrl||'#',label:'Get $EZ',x:B1[0]-90,y:B1[1]-90,w:180,h:180,ext:1}):'')+P5.link(CR2,{href:(window.CONFIG&&CONFIG.x)||'https://x.com/earningszn',label:'Follow EZ on X',x:B2[0]-90,y:B2[1]-90,w:180,h:180,ext:1}));
  P5.vis(s1)}};
})();
