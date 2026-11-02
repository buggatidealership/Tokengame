/* T3 THE WAFER: one wafer, four quarters, one quarter per AI. Every die is one call, printed outward from the centre in round order:
   green = the stock went the way it called, red = it didn't, dark = no call that round, unprinted = rounds still to come this season.
   Yield is the hit rate. P&L: each die lit by that trade's dollars; the window prints only its own rounds, the rest stay dim.
   Painting: img/q-wafer-a.jpg (a dark mirror wafer on a gold chuck, quartered by two scribe lines). */
(function(){const P5=window.P5,{t,pc,k$,NM,INK,GD,AMB,UP,DN,CR}=P5;
const IMG='media/p5-wafer.jpg',CROP=[60,60,948,900],E=[505,478,412,378],SX=508,SY=440,PITCH=32;
function cells(){const [cx,cy,rx,ry]=E,q=[[],[],[],[]];
  for(let y=cy-ry;y<cy+ry;y+=PITCH)for(let x=cx-rx;x<cx+rx;x+=PITCH){const mx=x+PITCH/2,my=y+PITCH/2;
    const ok=[[x,y],[x+PITCH,y],[x,y+PITCH],[x+PITCH,y+PITCH]].every(([a,b])=>((a-cx)/rx)**2+((b-cy)/ry)**2<=.985);if(!ok)continue;
    if(Math.abs(mx-SX)<PITCH*.6||Math.abs(my-SY)<PITCH*.6)continue;const k=(mx<SX?0:1)+(my<SY?0:2);q[k].push({x,y,d:Math.hypot((mx-SX)/rx,(my-SY)/ry)})}
  return q.map(a=>a.sort((u,v)=>u.d-v.d))}
function draw(X,V){const ac=V.view==='acc',w=X.W[V.win],rank=ac?X.arank:w.rank,lead=rank[0],Q=cells();let lit='',under='',over='';
  const total=X.N+X.nUp,mx=Math.max(1,...X.MS.map(m=>Math.max(...X.RS.map(r=>Math.abs(X.per(m,r))))));
  rank.forEach((m,i)=>{const q=Q[i],a=X.A[m],ld=m===lead,c=ld?GD:INK[m];
    /* the label's window: kept clear of dies, at the quarter's outer middle */
    const lx=i%2?SX+190:SX-190,ly=i<2?SY-170:SY+150,box=[lx-120,ly-80,240,150];
    const free=q.filter(cl=>!(cl.x+PITCH>box[0]&&cl.x<box[0]+box[2]&&cl.y+PITCH>box[1]&&cl.y<box[1]+box[3]));
    free.forEach((cl,k)=>{const r=X.RS[k];const sz=PITCH-5,px=cl.x+2.5,py=cl.y+2.5;
      if(k>=total)return;if(!r){under+=`<rect x="${px}" y="${py}" width="${sz}" height="${sz}" fill="none" stroke="${CR}" stroke-opacity=".16" stroke-width="1.5"/>`;return}
      const p=X.A[m]&&X.P[m].per[r.n];if(!p){under+=`<rect x="${px}" y="${py}" width="${sz}" height="${sz}" fill="#2a2f2c" fill-opacity=".9"/>`;return}
      if(ac)lit+=`<rect x="${px}" y="${py}" width="${sz}" height="${sz}" fill="${p.v>0?UP:DN}" fill-opacity="${p.v>0?.95:.7}"/>`;
      else{const inW=w.set.has(r.n),o=inW?.35+.65*Math.min(1,Math.abs(p.v)/mx):.08;lit+=`<rect x="${px}" y="${py}" width="${sz}" height="${sz}" fill="${p.v>0?UP:DN}" fill-opacity="${o.toFixed(2)}"/>`}});
    /* the quarter's print: name, yield (or P&L), and where it stands against a coin */
    const v=ac?a.hr:w.tot[m];
    lit+=P5.mark(m,lx-P5.tw(NM[m].toUpperCase(),38)/2-10,ly-46,34,c)+t(lx+12,ly-34,38,NM[m].toUpperCase(),{a:'middle',c});
    lit+=t(lx,ly+34,70,ac?pc(v):(w.n?k$(v):'—'),{a:'middle',c:ac?(ld?GD:a.out>0?UP:a.out<0?DN:CR):(ld&&v>0?GD:v>0?UP:v<0?DN:CR)});
    lit+=t(lx,ly+66,26,ac?(a.out>0?'BEYOND A COIN':a.out<0?'BELOW A COIN':'A COIN COULD DO THIS'):(a.W+'-'+a.L+' · '+w.t.toUpperCase()),{a:'middle',c:ac?(a.out>0?UP:a.out<0?DN:AMB):'#cfe9d9'})});
  return {lit,under}}
P5.take={id:'t3',html(X,V){return `<div class="p5-bleed">${P5.head('Smart or','lucky?')}<div class="p5-st"></div><div class="p5-col"><div class="p5-st p5-sw2"></div><p class="p5-ln">${V.view==='acc'?'One die per call, printed from the centre out. <b>Green: right way.</b> Red: wrong. Yield = hit rate. A coin yields 50%.':'Every die a $100K trade. <b>The brighter, the bigger.</b>'}</p></div>${P5.table(X,V)}</div>`},
 draw(box,X,V){const [st,sw]=box.querySelectorAll('.p5-st'),d=draw(X,V);
  P5.stage(st,{img:IMG,crop:CROP,glass:[[E[0]-E[2],E[1]-E[3],E[2]*2,E[3]*2,E[3]]],lit:d.lit,under:d.under,glare:.5,bloom:1.6,label:'Wafer map: one die per call for each AI'});
  P5.strip(sw,V,{foot:V.view==='acc'?`${X.N} ROUNDS GRADED · ${X.nUp} STILL TO PRINT`:'$100K A CALL · NO LEVERAGE · BEFORE FEES'});P5.vis(st)}};
})();
