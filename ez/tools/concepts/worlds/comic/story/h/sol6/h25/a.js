/* A · THE TOTE BOARD: "Beat the coin". A racetrack odds board (the section's own world: a wager, not a chip). Each AI's W-L
   trade by trade (right +1, wrong −1) races against the coin, the flat gold line at 0. The gold band is where a fair coin's W-L
   stays, 95 in 100, after that many trades (±1.96·√n): it widens as √n while skill grows with n, so a line that leaves it has left
   luck's reach. Same inequality as the live scope (|W−L| > 1.96·√n ⇔ |hit rate − 50%| > 1.96·√(.25/n)), so the verdicts match.
   W-L is the word the visitor already met on the chips ("45-27"). The toggles are the view, the three buttons the window. */
(function(){const P5=window.P5,S=window.S25,{t}=S;
const IMG='media/s25-tote.jpg',AR=1.3333,CROP=[150,110,935,1225],AMB='#ffb21a';
const GL=[208,150,668,780],ST=[188,968,708,84];
function board(X,V){const ac=V.view==='acc',w=X.W[V.win];let lit='',under='';
  const cx0=268,cx1=700,cy0=300,cy1=880,lab=34,sm=27;
  if(ac){const rows=S.rows(X),N=Math.max(...rows.map(r=>r.t)),ser={};rows.forEach(r=>ser[r.m]=S.net(X,r.m));
    const lim=Math.max(22,...rows.map(r=>Math.abs(r.net)+3),1.96*Math.sqrt(N)+3),Y=v=>(cy0+cy1)/2-v/lim*(cy1-cy0)/2,Xp=i=>cx0+i/N*(cx1-cx0);
    /* header, lettered on the glass like the board's odds line */
    lit+=t(cx0-30,250,lab,'W-L, TRADE BY TRADE',{c:AMB,ls:1});
    /* the coin's band */
    const up=[],dn=[];for(let i=0;i<=N;i++){const z=1.96*Math.sqrt(i);up.push([Xp(i),Y(z)]);dn.push([Xp(i),Y(-z)])}
    under+=`<path d="M${up.map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L')} L${dn.reverse().map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L')}Z" fill="${S.GOLD}" fill-opacity=".16" stroke="${S.GOLD}" stroke-opacity=".75" stroke-width="2.2" stroke-dasharray="8 6"/>`;
    [-20,-10,10,20].forEach(v=>{if(Math.abs(v)<lim){under+=`<line x1="${cx0}" y1="${Y(v)}" x2="${cx1}" y2="${Y(v)}" stroke="#ffd98a" stroke-opacity=".1" stroke-width="1.4"/>`;lit+=t(cx0-10,Y(v)+sm*.36,sm,(v>0?'+':'−')+Math.abs(v),{a:'end',c:'#e9d9b0',op:.8})}});
    lit+=`<line x1="${cx0}" y1="${Y(0)}" x2="${cx1}" y2="${Y(0)}" stroke="${S.GOLD}" stroke-width="3"/>`+t(cx0-10,Y(0)+sm*.36,sm,'COIN 0',{a:'end',c:S.GOLD});
    const bx=Math.round(N*.62),bz=1.96*Math.sqrt(bx);lit+=t(Xp(bx),Y(-bz)+sm+6,sm*.92,'A COIN STAYS IN THE GOLD',{a:'middle',c:S.GOLD,op:.95});
    /* the axis: the sample, in trades */
    [0,20,40,60,80].filter(v=>v<=N).forEach(v=>lit+=t(Xp(v),cy1+34,sm*.9,v===0?'0':String(v),{a:'middle',c:'#e9d9b0',op:.75}));
    lit+=t(cx1,cy1+66,sm*.9,'TRADES',{a:'end',c:'#e9d9b0',op:.75});
    /* the lines, leader last */
    rows.slice().reverse().forEach((r,i)=>{const s=ser[r.m];lit+=`<path class="s25-tr" d="${s.map((v,i)=>(i?'L':'M')+Xp(i).toFixed(1)+' '+Y(v).toFixed(1)).join(' ')}" stroke="${S.C[r.m]}" stroke-width="${r===rows[0]?5:3.6}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`});
    /* the end readouts: name, W-L and the net, pushed apart */
    const ends=rows.map(r=>{const s=ser[r.m];return {r,x:Xp(s.length-1),y:Y(s[s.length-1])}}).sort((a,b)=>a.y-b.y);
    for(let i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<74)ends[i].y=ends[i-1].y+74;const ov=ends[ends.length-1].y-(cy1-10);if(ov>0)ends.forEach(e=>e.y-=ov);
    ends.forEach(e=>{const r=e.r,c=S.C[r.m],xx=cx1+18;lit+=`<circle cx="${e.x.toFixed(1)}" cy="${Y(r.net).toFixed(1)}" r="6" fill="${c}"/>`;
      lit+=t(xx,e.y-6,lab*.86,S.NM[r.m].toUpperCase(),{c})+t(xx,e.y+lab*.92,lab,(r.net>0?'+':r.net<0?'−':'')+Math.abs(r.net),{c:r.beyond?S.UP:r.below?S.DN:S.CR})+t(xx+P5.tw((r.net>0?'+':r.net<0?'−':'')+Math.abs(r.net),lab)+10,e.y+lab*.92,sm,r.W+'-'+r.L,{c:'#e9d9b0',op:.85})});
  }else{
    const n=w.n,lim0=[].concat(...X.MS.map(m=>w.ser[m])),a=Math.min(0,...lim0),b=Math.max(0,...lim0),pd=(b-a||1)*.1,lo=a-pd,hi=b+pd,Y=v=>cy1-(v-lo)/(hi-lo)*(cy1-cy0),Xp=i=>cx0+(n?i/n:0)*(cx1-cx0);
    lit+=t(cx0-30,250,lab,'P&L, $100K ON EVERY TRADE',{c:AMB,ls:1});
    if(n){lit+=`<line x1="${cx0}" y1="${Y(0)}" x2="${cx1}" y2="${Y(0)}" stroke="${S.GOLD}" stroke-width="3"/>`+t(cx0-10,Y(0)+sm*.36,sm,'$0',{a:'end',c:S.GOLD});
      [b,a].forEach(v=>{if(Math.abs(Y(v)-Y(0))>40)lit+=t(cx0-10,Y(v)+sm*.36,sm,S.$(v).replace('.0K','K'),{a:'end',c:'#e9d9b0',op:.8})});
      lit+=t(cx1,cy1+34,sm*.9,n+(n===1?' ROUND':' ROUNDS')+' · '+w.t.toUpperCase(),{a:'end',c:'#e9d9b0',op:.75});
      w.rank.slice().reverse().forEach(m=>{const s=w.ser[m];lit+=`<path class="s25-tr" d="${s.map((v,i)=>(i?'L':'M')+Xp(i).toFixed(1)+' '+Y(v).toFixed(1)).join(' ')}" stroke="${S.C[m]}" stroke-width="${m===w.rank[0]?5:3.6}" fill="none" stroke-linejoin="round"/>`});
      const ends=w.rank.map(m=>({m,y:Y(w.tot[m])})).sort((p,q)=>p.y-q.y);for(let i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<74)ends[i].y=ends[i-1].y+74;const ov=ends[ends.length-1].y-(cy1-10);if(ov>0)ends.forEach(e=>e.y-=ov);
      ends.forEach(e=>{const v=w.tot[e.m];lit+=t(cx1+18,e.y-6,lab*.86,S.NM[e.m].toUpperCase(),{c:S.C[e.m]})+t(cx1+18,e.y+lab*.92,lab,S.$(v),{c:v>0?S.UP:v<0?S.DN:S.CR})})}
    else lit+=t((cx0+cx1)/2+40,(cy0+cy1)/2,lab,'NO CLOSE IN '+w.t.toUpperCase(),{a:'middle',c:AMB});
  }
  /* the bottom strip: the board's key line, lit; then the soft labels over the controls */
  const keys=[['v','acc','W-L',305],['v','pnl','P&L',800],['w','season','SEASON',455],['w','d7','7D',570],['w','d1','24H',680]];
  keys.forEach(([k,val,l,x])=>{const on=k==='v'?V.view===val:(!ac&&V.win===val),dim=k==='w'&&ac,s=30,wd=P5.tw(l,s)+18;
    lit+=(on?`<rect x="${x-wd/2}" y="${1012-s*.98}" width="${wd}" height="${s*1.32}" rx="4" fill="${AMB}" fill-opacity=".92"/>`:'')+t(x,1012,s,l,{a:'middle',c:on?'#140a00':AMB,op:on?1:dim?.28:.8})});
  return {lit,under}}
P5.take={id:'a',html(X,V){const r=S.rows(X)[0];return `<div class="p5-bleed">${P5.head('Smart or','lucky?')}<div class="s25-st"></div><p class="s25-ln">${V.view==='acc'?
   `<b>W-L:</b> every right trade +1, every wrong one −1. ${S.NM[r.m]} is <b>${r.W}-${r.L}</b> after ${r.t}. <span class="a">A coin flip stays in the gold.</span>`:S.line(X,V)}</p>${S.table(X,V)}</div>`},
 draw(box,X,V){const st=box.querySelector('.s25-st'),b=board(X,V);
  S.stage(st,{img:IMG,ar:AR,crop:CROP,glass:[GL,ST],lit:b.lit,under:b.under,glare:.5,bloom:2.4,label:V.view==='acc'?'Tote board: each AI’s W-L trade by trade against the coin’s band':'Tote board: P&L if you’d bet $100K on every trade'});
  st.insertAdjacentHTML('beforeend',S.hits(CROP,[{k:'v',val:'acc',x:255,y:1085,w:100,h:110,label:'W-L view',on:V.view==='acc'},{k:'v',val:'pnl',x:750,y:1085,w:100,h:110,label:'P&L view',on:V.view==='pnl'}]
   .concat(V.view==='pnl'?[['season','Season',455],['d7','Last 7 days',570],['d1','Last 24 hours',680]].map(([v,l,x])=>({k:'w',val:v,x:x-50,y:1095,w:100,h:95,label:l,on:V.win===v})):[])));
  P5.vis(st)}};
})();
