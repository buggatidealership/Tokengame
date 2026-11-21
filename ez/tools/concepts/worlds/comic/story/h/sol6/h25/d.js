/* D · THE SCOPE, RE-WORDED (the control): the live T1 painting and chart, only the words redone. The trace ends say the sample
   ("45 OF 72"), the zone says what it is ("A COIN LANDS HERE"), the measurement row gives each AI its coin's range in counts. */
(function(){const P5=window.P5,S=window.S25,{t,pc,k$,NM,INK,GD,AMB,UP,DN,CR}=P5;
const IMG='media/p5-scope.jpg',G=[172,148,656,608],CROP=[120,118,880,940];
const KN=[[285,870],[385,870]],BT=[[672,870],[750,870],[828,870]];
function screen(X,V){const ac=V.view==='acc',w=X.W[V.win];let lit='',under='',over='';
  const cx0=258,cx1=628,cy0=262,cy1=598,lab=34,sm=30;
  /* the top line of the screen: what is traced, and how big the sample is */
  lit+=t(804,222,lab,ac?'RIGHT WAY, OF TRADES':(w.n+(w.n!==1?' ROUNDS':' ROUND')),{a:'end',c:AMB,ls:1});
  let lo,hi,n,rank,ser,Y,Xp;
  if(ac){n=X.N;rank=X.arank;ser=m=>X.A[m].s;lo=.3;hi=.8}
  else{n=w.n;rank=w.rank;ser=m=>w.ser[m];const all=[].concat(...X.MS.map(m=>w.ser[m]));const a=Math.min(0,...all),b=Math.max(0,...all),pd=(b-a||1)*.08;lo=a-pd;hi=b+pd}
  Y=v=>cy1-(Math.max(lo,Math.min(hi,v))-lo)/(hi-lo)*(cy1-cy0);Xp=i=>cx0+(n?i/n:0)*(cx1-cx0);
  /* graticule: the scope's own grid, faint phosphor */
  for(let i=0;i<=8;i++)under+=`<line x1="${cx0+(cx1-cx0)*i/8}" y1="${cy0}" x2="${cx0+(cx1-cx0)*i/8}" y2="${cy1}" stroke="#7dffb0" stroke-opacity=".09" stroke-width="1.2"/>`;
  if(ac){
    /* the mask: the coin's 95% zone for the line as drawn ((right+1)/(calls+2)), by round */
    const up=[],dn=[];for(let i=0;i<=n;i++){const z=i?1.96*Math.sqrt(i/4)/(i+2):0;up.push([Xp(i),Y(.5+z)]);dn.push([Xp(i),Y(.5-z)])}
    under+=`<path d="M${up.map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L')} L${dn.reverse().map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L')}Z" fill="${AMB}" fill-opacity=".13" stroke="${AMB}" stroke-opacity=".7" stroke-width="2" stroke-dasharray="7 6"/>`;
    [.4,.6,.7,.8].forEach(v=>{under+=`<line x1="${cx0}" y1="${Y(v)}" x2="${cx1}" y2="${Y(v)}" stroke="#7dffb0" stroke-opacity=".12" stroke-width="1.2"/>`;lit+=t(cx0-10,Y(v)+sm*.36,sm,Math.round(v*100)+'%',{a:'end',c:'#9fd8b4',op:.85})});
    lit+=`<line x1="${cx0}" y1="${Y(.5)}" x2="${cx1}" y2="${Y(.5)}" stroke="${AMB}" stroke-width="2.4"/>`+t(cx0-10,Y(.5)+sm*.36,sm,'50%',{a:'end',c:AMB});
    const li=Math.round(n*.2),lz=1.96*Math.sqrt(li/4)/(li+2);lit+=t(cx0+14,Y(.5)-12,sm,'COIN',{c:AMB})+t(Xp(Math.round(n*.27)),Math.min(cy1-8,Y(.5-lz*.72)),sm,'A COIN LANDS HERE',{a:'middle',c:AMB,op:.95});
  }else{
    const st=P5.k$;const tk=[lo,0,hi].map(v=>v);
    if(n){lit+=`<line x1="${cx0}" y1="${Y(0)}" x2="${cx1}" y2="${Y(0)}" stroke="${AMB}" stroke-width="2.4"/>`+t(cx0-10,Y(0)+sm*.36,sm,'$0',{a:'end',c:AMB});
      const top=Math.max(...[].concat(...X.MS.map(m=>w.ser[m]))),bot=Math.min(...[].concat(...X.MS.map(m=>w.ser[m])));
      [top,bot].forEach(v=>{if(Math.abs(Y(v)-Y(0))>40)lit+=t(cx0-10,Y(v)+sm*.36,sm,st(v).replace('.0K','K'),{a:'end',c:'#9fd8b4',op:.85})})}
    else lit+=t((cx0+cx1)/2,(cy0+cy1)/2,lab,'NO CLOSE IN '+w.t.toUpperCase(),{a:'middle',c:AMB});
  }
  /* the traces, the leader's in gold, drawn last */
  const lead=rank[0];
  if(n)rank.slice().reverse().forEach(m=>{const p=ser(m),ld=m===lead;
    lit+=`<path class="p5-tr" d="${p.map((v,i)=>(i?'L':'M')+Xp(i).toFixed(1)+' '+Y(v).toFixed(1)).join(' ')}" stroke="${ld?GD:INK[m]}" stroke-width="${ld?5:3.6}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`});
  /* the readouts at each trace's end: name and figure, pushed apart so they never touch */
  if(n){const ends=rank.map(m=>{const p=ser(m);return {m,y:Y(p[p.length-1])}}).sort((a,b)=>a.y-b.y);const gap=64;
    for(let i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<gap)ends[i].y=ends[i-1].y+gap;const ov=ends[ends.length-1].y-(cy1+(ac?6:-20));if(ov>0)ends.forEach(e=>e.y-=ov);
    ends.forEach(e=>{const ld=e.m===lead,c=ld?GD:INK[e.m],a=X.A[e.m];
      if(ac)lit+=t(cx1+16,e.y-2,lab*.9,NM[e.m].toUpperCase(),{c})+t(cx1+16,e.y+lab*.95,lab,a.W+' OF '+a.t,{c:a.out>0?UP:a.out<0?DN:CR});
      else{const v=w.tot[e.m];lit+=t(cx1+16,e.y-2,lab*.9,NM[e.m].toUpperCase(),{c})+t(cx1+16,e.y+lab*.95,lab,k$(v),{c:ld?GD:v>0?UP:v<0?DN:CR})}})}
  /* the measurement row, as a scope prints it under the trace: W-L per AI in the trace's colour */
  if(ac){const y=636;lit+=t(178,y,sm,'A COIN, SAME TRADES:',{c:AMB});rank.forEach((m,i)=>{const x=196+i*152,r=S.range(X.A[m].t);lit+=t(x,y+34,lab*.86,r.lo+'–'+r.hi,{c:AMB})+t(x,y+62,sm*.8,NM[m].toUpperCase(),{c:m===lead?GD:INK[m],op:.9})})}
  else if(n){const y=652;lit+=t(196,y,sm,'IF YOU’D BET $100K ON EVERY CALL',{c:'#9fd8b4'})+t(196,y+36,sm,'NO LEVERAGE · BEFORE FEES',{c:'#9fd8b4',op:.8})}
  /* soft-key labels on the screen's foot, above each control; the open one boxed */
  const keys=[['v','acc','HIT RATE',KN[0][0]],['v','pnl','P&L',KN[1][0]],['w','season','SEASON',BT[0][0]-12],['w','d7','7D',BT[1][0]],['w','d1','24H',BT[2][0]]];
  keys.forEach(([k,val,l,x])=>{if(k==='w'&&ac)return;const on=k==='v'?V.view===val:V.win===val,s=28,wdt=P5.tw(l,s)+16,xx=Math.min(Math.max(x,G[0]+14+wdt/2),G[0]+G[2]-12-wdt/2),y=738;lit+=(on?`<rect x="${xx-wdt/2}" y="${y-s*.95}" width="${wdt}" height="${s*1.3}" fill="${AMB}" fill-opacity=".9"/>`:'')+t(xx,y,s,l,{a:'middle',c:on?'#140a00':AMB,op:on?1:.75})});
  return {lit,under,over}}
P5.take={id:'s25',html(X,V){return `<div class="p5-bleed">${P5.head('Smart or','lucky?')}<div class="p5-st"></div><p class="s25-ln">${S.line(X,V)}</p>${S.table(X,V)}</div>`},
 draw(box,X,V){const st=box.querySelector('.p5-st'),s=screen(X,V);
  P5.stage(st,{img:IMG,crop:CROP,glass:[[G[0],G[1],G[2],G[3],26]],lit:s.lit,under:s.under,label:V.view==='acc'?'Oscilloscope: each AI’s hit rate round by round against the coin’s luck zone':'Oscilloscope: P&L if you’d bet $100K on every call',glare:.55,bloom:2.6});
  st.insertAdjacentHTML('beforeend',P5.hits(CROP,[{k:'v',val:'acc',x:KN[0][0]-46,y:828,w:92,h:84,label:'Hit rate view',on:V.view==='acc'},{k:'v',val:'pnl',x:KN[1][0]-46,y:828,w:92,h:84,label:'P&L view',on:V.view==='pnl'}]
   .concat(V.view==='pnl'?[['season','Season'],['d7','Last 7 days'],['d1','Last 24 hours']].map(([v,l],i)=>({k:'w',val:v,x:BT[i][0]-38,y:832,w:76,h:76,label:l,on:V.win===v})):[])));
  P5.vis(st)}};
})();
