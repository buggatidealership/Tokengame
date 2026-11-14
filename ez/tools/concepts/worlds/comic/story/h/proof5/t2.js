/* T2 THE TEST BENCH: each AI's chip sits in a burn-in socket under test. Its meter (the tall glass) fills to its hit rate; the coin's
   luck zone is printed on the meter in amber; the lamp under the socket says the verdict in one colour: green = beyond a coin's reach,
   amber = a coin could still do this, red = below a coin. P&L: the meter becomes a zero-centred bar. Painting: img/q-bench-a.jpg. */
(function(){const P5=window.P5,{t,pc,k$,NM,INK,GD,AMB,UP,DN,CR}=P5;
const IMG='media/p5-bench.jpg',CROP=[36,40,964,972];
const WIN=[[146,92,62,300],[356,92,60,300],[588,92,60,300],[790,90,60,302]],LAMP=[[156,878],[374,878],[604,878],[824,878]],SOCK=[160,387,611,836];
function draw(X,V){const ac=V.view==='acc',w=X.W[V.win],rank=ac?X.arank:w.rank,lead=rank[0];let lit='',under='',silk='',top='';
  const mx=ac?0:Math.max(1,...X.MS.map(m=>Math.abs(w.tot[m])));
  rank.forEach((m,i)=>{const [gx,gy,gw,gh]=WIN[i],cx=gx+gw/2,a=X.A[m],ld=m===lead,c=ld?GD:INK[m];
    /* the meter: 24 segments, 30% at the foot to 80% at the top (hit rate), or $0 at the middle (P&L) */
    const n=24,sy0=gy+gh-10,sy1=gy+78,sh=(sy0-sy1)/n;
    for(let k=0;k<n;k++){const y=sy0-(k+1)*sh+2,lo=.3+.5*k/n,hi=.3+.5*(k+1)/n;let on,col;
      if(ac){on=a.hr>=hi-.0001||(a.hr>lo);col=ld?GD:INK[m];const inZ=hi>.5-a.zone&&lo<.5+a.zone;
        under+=`<rect x="${gx+9}" y="${y}" width="${gw-18}" height="${sh-3}" fill="${inZ?AMB:'#1b2a20'}" fill-opacity="${inZ?.42:.6}"/>`;
        if(on)lit+=`<rect x="${gx+9}" y="${y}" width="${gw-18}" height="${sh-3}" fill="${col}"/>`;
        if(Math.abs(lo-.5)<.001)lit+=`<rect x="${gx+2}" y="${y+sh-3}" width="${gw-4}" height="3" fill="${AMB}"/>`}
      else{const mid=n/2,v=w.tot[m],seg=Math.round(Math.abs(v)/mx*mid);under+=`<rect x="${gx+9}" y="${y}" width="${gw-18}" height="${sh-3}" fill="#1b2a20" fill-opacity=".6"/>`;
        const kk=k-mid;if(v>0&&kk>=0&&kk<seg||v<0&&kk<0&&-kk<=seg)lit+=`<rect x="${gx+9}" y="${y}" width="${gw-18}" height="${sh-3}" fill="${v>0?UP:DN}"/>`;
        if(k===mid)lit+=`<rect x="${gx+2}" y="${y+sh-2}" width="${gw-4}" height="3" fill="${AMB}"/>`}}
    /* the figure at the meter's head */
    if(ac)lit+=t(cx,gy+52,34,pc(a.hr),{a:'middle',c:ld?GD:a.out>0?UP:a.out<0?DN:CR});
    else{const v=w.tot[m];lit+=t(cx,gy+50,w.n?(Math.abs(v)>=1e5?27:30):30,w.n?k$(v):'—',{a:'middle',c:ld&&v>0?GD:v>0?UP:v<0?DN:CR})}
    /* the lamp: the verdict in one colour */
    const lc=ac?(a.out>0?UP:a.out<0?DN:AMB):(!w.n||!w.tot[m]?'#333':w.tot[m]>0?UP:DN);
    top+=`<circle cx="${LAMP[i][0]}" cy="${LAMP[i][1]}" r="30" fill="${lc}" opacity=".55" style="mix-blend-mode:screen"/><circle cx="${LAMP[i][0]-6}" cy="${LAMP[i][1]-8}" r="9" fill="#fff" opacity=".55"/>`;
    lit+=`<circle cx="${LAMP[i][0]}" cy="${LAMP[i][1]}" r="44" fill="${lc}" opacity=".35"/>`;
    /* the chip's own print on the board under its socket: mark, name, rank */
    {const nw=P5.tw(NM[m].toUpperCase(),38),x0=SOCK[i]-(nw+44)/2;silk+=P5.mark(m,x0+18,786,36,'#fff6dc')+t(x0+44,800,38,NM[m].toUpperCase(),{c:'#fff6dc'})}});
  return {lit,under,silk,top}}
P5.take={id:'t2',html(X,V){return `<div class="p5-bleed">${P5.head('Smart or','lucky?')}<div class="p5-st"></div><div class="p5-col"><div class="p5-st p5-sw2"></div><p class="p5-ln">${V.view==='acc'?'Each AI under test. <b>Green lamp: beyond a coin’s reach.</b> Amber: a coin could still do this.':'Every call a $100K trade. <b>Green lamp: in profit.</b>'}</p></div>${P5.table(X,V)}</div>`},
 draw(box,X,V){const [st,sw]=box.querySelectorAll('.p5-st'),d=draw(X,V);
  P5.stage(st,{img:IMG,crop:CROP,glass:WIN.map(g=>[g[0],g[1],g[2],g[3],4]),lit:d.lit,under:d.under,silk:d.silk,top:d.top,glare:.6,bloom:2.2,label:'Test bench: four AI chips under test'});
  P5.strip(sw,V,{foot:V.view==='acc'?`${X.N} ROUNDS · THE AMBER BAND: WHERE 95 IN 100 COINS LAND`:'$100K A CALL · NO LEVERAGE · BEFORE FEES'});P5.vis(st)}};
})();
