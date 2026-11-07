/* C2 ONE PANEL: the machine's last panel carries the whole close: the next calls' marks and the day they lock, the next bell's countdown,
   and two buttons, "See the card" (the Upcoming tab) and "Follow on X". Get $EZ is the display's foot line until launch. Painting: q-panel-b. */
(function(){const P5=window.P5,{t,GD,AMB,CR}=P5;
const CR2=[118,150,882,812],GL=[136,172,724,288],B1=[336,660],B2=[658,660];
P5.take={id:'c2',cd:X=>P5.cd(X),html(X){return `<div class="p5-bleed"><h2 class="t4-h2 p5-h"><span class="t4-hw">The next</span> <span class="t4-hw p5-hw2">bell</span></h2><div class="p5-st"></div><p class="p5-ln">$EZ isn’t live yet. The address appears here, and only here, at launch. <b>Anyone DMing you one before that is a scammer.</b> Not financial advice.</p></div>`},
 draw(box,X){const st=box.querySelector('.p5-st'),d=X.days[0];let lit='';
  if(d){const rs=d.rs.slice(0,4),gap=118,x0=500-(rs.length-1)*gap/2;rs.forEach((r,i)=>lit+=P5.litLogo(r.ticker,x0+i*gap,236,74));
    lit+=t(500,322,30,`CALLS LOCK ${P5.day(d.t,X.today).toUpperCase()}${d.rs.length>4?' · +'+(d.rs.length-4)+' MORE':''}`,{a:'middle',c:AMB,ls:1})}
  lit+=t(500,182+0,1,'');
  lit+=t(500,398,48,'',{a:'middle',raw:`<tspan fill="${CR}">BELL IN </tspan><tspan fill="${GD}" class="p5-cd">${P5.cd(X)}</tspan>`});
  lit+=t(500,442,22,(window.CONFIG&&CONFIG.ca)?'GET $EZ: '+CONFIG.ca:'GET $EZ: THE ADDRESS POSTS HERE AT LAUNCH',{a:'middle',c:'#9fd8b4'});
  lit+=t(B1[0],B1[1]-6,30,'SEE THE',{a:'middle',c:'#eafff1'})+t(B1[0],B1[1]+30,34,'CARD',{a:'middle',c:'#eafff1'})+t(B2[0],B2[1]-6,30,'FOLLOW',{a:'middle',c:CR})+t(B2[0],B2[1]+30,34,'ON X',{a:'middle',c:CR});
  const sk=t(B1[0],B1[1]+118,26,'THE SCHEDULE',{a:'middle',c:'#fff6dc'})+t(B2[0],B2[1]+118,26,'EVERY CALL FIRST',{a:'middle',c:'#fff6dc'});
  P5.stage(st,{img:'media/p5-panel.jpg',crop:CR2,glass:[[GL[0],GL[1],GL[2],GL[3],10]],lit,silk:sk,glare:.5,bloom:2.2,label:'Next on the card, the next bell, and Follow on X'});
  st.insertAdjacentHTML('beforeend',P5.link(CR2,{href:'#/upcoming',label:'See the card: everything coming up',x:B1[0]-90,y:B1[1]-90,w:180,h:180})+P5.link(CR2,{href:(window.CONFIG&&CONFIG.x)||'https://x.com/earningszn',label:'Follow EZ on X',x:B2[0]-90,y:B2[1]-90,w:180,h:180,ext:1}));P5.vis(st)}};
})();
