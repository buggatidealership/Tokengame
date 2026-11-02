/* B · ONE SCOPE, TWO BEATS: CALIBRATE, THEN MEASURE. The scope stays on screen (sticky) while the page scrolls past it.
   Beat 1 is the scope calibrated on a coin: only the gold zone where a coin's hit rate lands, round by round, and the four AIs
   waiting at its mouth in their colours with "?" (lesson 128: the shape first, the numbers one scroll later). Scroll on and the
   same glass draws the four lines (beat 2). No animation: a state change on scroll, the way a comic turns a page.
   The switch: the scope's own two big keys, repainted (s7-wide-keys): HIT RATE and P&L lit in the caps, the open one lit gold.
   No windows: P&L shows the season (the Leaderboard keeps Season / 7 days / 24 hours). */
(function(){const P5=window.P5,S=window.S7,t=S.t;
const IMG='media/s7-wide-keys.jpg',AR=.75,CROP=[36,96,964,716],GL=[127,130,871,524],K=[[247,577,474,661],[528,577,755,661]];
let cal=true,io=null;
function keys(V){let lit='',items=[];[['acc','HIT RATE'],['pnl','P&L']].forEach(([v,l],i)=>{const [x0,y0,x1,y1]=K[i],on=V.view===v,cx=(x0+x1)/2,cy=(y0+y1)/2;
  if(on)lit+=`<rect x="${x0+5}" y="${y0+5}" width="${x1-x0-10}" height="${y1-y0-10}" rx="7" fill="${S.AMB}" fill-opacity=".92"/>`;
  else lit+=`<rect x="${x0+5}" y="${y0+5}" width="${x1-x0-10}" height="${y1-y0-10}" rx="7" fill="none" stroke="${S.AMB}" stroke-opacity=".55" stroke-width="2"/>`;
  lit+=t(cx,cy+15,42,l,{a:'middle',c:on?'#140a00':S.CR,ls:1.5});
  items.push({k:'v',val:v,x:x0,y:y0,w:x1-x0,h:y1-y0,label:l==='HIT RATE'?'Hit rate':'P&L',on})});return {lit,items}}
P5.take={id:'s7b',html(X,V){const c=cal&&V.view==='acc',r=S.rows(X),T=Math.max(...r.map(x=>x.t)),rg=S.range(T);
  return `<div class="p5-bleed">${P5.head('Smart or','lucky?')}
  ${c?S.kick(1,'Where a coin lands'):S.kick(2,V.view==='acc'?'Where the four landed':'Who made money')}
  <div class="s7-stk"><div class="s7-st s7-b2"></div></div>
  <p class="s7-ln">${c?`<b>A coin flip</b> goes the right way half the time. Over ${T} trades it lands <b>${rg.lo} to ${rg.hi}</b>: anywhere in the gold.`:S.line(X,V)}</p>${S.table(X,V)}</div>`},
 draw(box,X,V){const c=cal&&V.view==='acc',st=box.querySelector('.s7-b2'),s=S.scope(X,V,GL,{sm:30,lab:36,padL:84,padT:22,oneLine:true,rowsH:58,cal:c,zoneLabel:c?'A COIN LANDS IN THE GOLD':undefined}),k=keys(V);
  S.stage(st,{img:IMG,ar:AR,crop:CROP,lit:s.lit+k.lit,under:s.under,over:s.over,glass:[[GL[0],GL[1],GL[2],GL[3],16]].concat(K.map(q=>[q[0],q[1],q[2],q[3],8])),glare:.3,
   label:c?'Scope, calibrated on a coin: where a coin’s hit rate lands, round by round':V.view==='acc'?'Scope: each AI’s hit rate round by round against where a coin lands':'Scope: P&L if you’d bet $100K on every trade, the season'});
  st.insertAdjacentHTML('beforeend',P5.hits(CROP,k.items));
  /* the page turn: past the scope's middle, the lines are drawn in */
  if(!io&&!S.noScroll){const wr=box.querySelector('.s7-stk');const f=()=>{if(S.noScroll)return;const r=box.querySelector('.s7-stk').getBoundingClientRect(),now=r.top< -0.18*innerHeight;if(now===cal){cal=!now;P5.cur.draw()}};io=1;addEventListener('scroll',f,{passive:true})}}};
S.setCal=v=>{S.noScroll=true;document.querySelector('#learn').classList.add('s7-still');cal=v;P5.cur&&P5.cur.draw()};
})();
