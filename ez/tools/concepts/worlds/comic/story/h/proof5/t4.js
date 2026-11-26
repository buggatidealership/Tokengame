/* T4 THE GAUGES: four meters on the control panel, one per AI. The needle is the hit rate; the coin's 50% is straight up; the amber arc is
   the coin's luck zone for that AI's number of calls. A needle past the arc has left luck's reach. P&L: $0 straight up, the needle swings
   to the window's P&L. Painting: img/q-gauge-b.jpg. */
(function(){const P5=window.P5,{t,pc,k$,NM,INK,GD,AMB,UP,DN,CR}=P5;
const IMG='media/p5-gauge.jpg',CROP=[86,44,914,900],DI=[[294,242],[706,244],[294,654],[706,654]],R=118;
const pol=(cx,cy,r,a)=>[cx+r*Math.sin(a),cy-r*Math.cos(a)],arc=(cx,cy,r,a0,a1)=>{const [x0,y0]=pol(cx,cy,r,a0),[x1,y1]=pol(cx,cy,r,a1);return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${Math.abs(a1-a0)>Math.PI?1:0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`};
const SW=1.7;/* half sweep, radians */
function draw(X,V){const ac=V.view==='acc',w=X.W[V.win],rank=ac?X.arank:w.rank,lead=rank[0];let lit='',under='',top='';
  const mx=ac?0:Math.max(1,...X.MS.map(m=>Math.abs(w.tot[m])))*1.12;
  rank.forEach((m,i)=>{const [cx,cy]=DI[i],a=X.A[m],ld=m===lead,c=ld?GD:INK[m];
    const ang=v=>ac?Math.max(-SW,Math.min(SW,(v-.5)/.25*SW)):Math.max(-SW,Math.min(SW,v/mx*SW));
    under+=`<path d="${arc(cx,cy,R-12,-SW,SW)}" stroke="#d9cfae" stroke-opacity=".25" stroke-width="3" fill="none"/>`;
    if(ac){/* luck zone */lit+=`<path d="${arc(cx,cy,R-16,ang(.5-a.zone),ang(.5+a.zone))}" stroke="${AMB}" stroke-opacity=".75" stroke-width="12" fill="none"/>`;
      [.25,.5,.75].forEach(v=>{const [x,y]=pol(cx,cy,R-50,ang(v));lit+=t(x,y+10,28,Math.round(v*100)+'',{a:'middle',c:v===.5?AMB:'#b9d8c4'})})}
    else{const [x,y]=pol(cx,cy,R-50,0);lit+=t(x,y+10,28,'$0',{a:'middle',c:AMB});lit+=`<path d="${arc(cx,cy,R-16,-SW,-.04)}" stroke="${DN}" stroke-opacity=".5" stroke-width="8" fill="none"/><path d="${arc(cx,cy,R-16,.04,SW)}" stroke="${UP}" stroke-opacity=".5" stroke-width="8" fill="none"/>`}
    const v=ac?a.hr:(w.n?w.tot[m]:0),an=ang(v),[nx,ny]=pol(cx,cy,R-20,an),[bx,by]=pol(cx,cy,14,an+Math.PI);
    lit+=`<path d="M${bx} ${by} L${nx} ${ny}" stroke="${ac?(a.out>0?UP:a.out<0?DN:CR):(v>0?UP:v<0?DN:CR)}" stroke-width="6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="11" fill="${GD}"/>`;
    lit+=t(cx,cy+60,50,ac?pc(v):(w.n?k$(v):'—'),{a:'middle',c:ld?GD:(ac?(a.out>0?UP:a.out<0?DN:CR):(v>0?UP:v<0?DN:CR))});
    lit+=t(cx,cy+94,28,NM[m].toUpperCase()+(ac?' · '+a.W+'-'+a.L:''),{a:'middle',c})});
  return {lit,under}}
P5.take={id:'t4',html(X,V){return `<div class="p5-bleed">${P5.head('Smart or','lucky?')}<div class="p5-st"></div><div class="p5-col"><div class="p5-st p5-sw2"></div><p class="p5-ln">${V.view==='acc'?'Straight up is a coin flip. <b>The amber arc: a coin could still get there.</b> Past it, it can’t.':'Straight up is $0. <b>Right: in profit.</b> Left: losing.'}</p></div>${P5.table(X,V)}</div>`},
 draw(box,X,V){const [st,sw]=box.querySelectorAll('.p5-st'),d=draw(X,V);
  P5.stage(st,{img:IMG,crop:CROP,glass:DI.map(([x,y])=>[x-R,y-R,R*2,R*2,R]),lit:d.lit,under:d.under,glare:.5,bloom:2.2,label:'Four meters: each AI’s hit rate against a coin'});
  P5.strip(sw,V,{foot:V.view==='acc'?`${X.N} ROUNDS · THE ARC NARROWS WITH EVERY CALL`:'$100K A CALL · NO LEVERAGE · BEFORE FEES'});P5.vis(st)}};
})();
