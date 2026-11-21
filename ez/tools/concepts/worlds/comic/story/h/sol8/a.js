/* A · READ THE GOLD. Beat 1 is the chart's own key, drawn before the chart: the gold coin, and pouring out of it the zone a coin
   flip's hit rate lands in (95 in 100 coins), wide after a handful of trades and narrowing as trades pile up. Three places are
   lettered into the picture: above the gold "BEATS A COIN", inside it "A COIN COULD DO THIS", under it "WORSE THAN A COIN".
   No AI yet (their lines are the reveal in beat 2, in the same gold). Raw hit rate here (right / trades): the exact binomial
   range for 1 to 80 trades. Paintings: sol6's coin (s25-coin). */
(function(){const P5=window.P5,S=window.S7,S8=window.S8,t=S.t;
const b1={id:'a',kick:'What luck looks like',
 html(X){return `<p class="s8-ln">A coin flip calls a trade right <b>half the time</b>. Over a few trades it can look like genius. Over ${X.N}, it settles near half.</p><div class="s8a-st"></div>`},
 draw(el,X){const n=X.N,x0=300,x1=968,yT=58,yB=478,Y=v=>yB-v*(yB-yT),Xp=i=>x0+(i-1)/(n-1)*(x1-x0);
  /* the exact binomial range as an envelope (S8.env): never narrower than the exact range, exactly it at ${n} trades */
  const E=S8.env(n,i=>{if(!i)return [.5,.5];const r=S.range(i);return [r.lo/i,r.hi/i]}),up=[],dn=[];for(let i=1;i<=n;i++){up.push([Xp(i),Y(E[i][1])]);dn.push([Xp(i),Y(E[i][0])])}
  const pth=`M${up.map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L')} L${dn.slice().reverse().map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L')}Z`;
  const r80=S.range(n);let g='';
  for(let i=0;i<=10;i++)g+=`<line x1="${x0}" y1="${Y(i/10).toFixed(1)}" x2="${x1}" y2="${Y(i/10).toFixed(1)}" stroke="#7dffb0" stroke-opacity="${i===5?0:.07}" stroke-width="1.2"/>`;
  for(let i=0;i<=8;i++)g+=`<line x1="${(x0+(x1-x0)*i/8).toFixed(1)}" y1="${yT}" x2="${(x0+(x1-x0)*i/8).toFixed(1)}" y2="${yB}" stroke="#7dffb0" stroke-opacity=".07" stroke-width="1.2"/>`;
  const ym=Y(.5);
  el.querySelector('.s8a-st').innerHTML=`<svg class="s8a-svg" viewBox="0 0 1000 560" role="img" aria-label="A gold coin, and pouring out of it the band a coin flip's hit rate lands in: wide after a few trades, narrowing to ${r80.lo} to ${r80.hi} right of ${n}. Above the band: beats a coin. Inside: a coin could do this. Under: worse than a coin.">
   <defs><radialGradient id="s8ag" cx="22%" cy="50%" r="80%"><stop offset="0" stop-color="#1a1405"/><stop offset=".45" stop-color="#06100a"/><stop offset="1" stop-color="#020403"/></radialGradient>
    <linearGradient id="s8af" x1="0" x2="1"><stop offset="0" stop-color="#ffd21f" stop-opacity=".55"/><stop offset="1" stop-color="#ffb21a" stop-opacity=".22"/></linearGradient>
    <filter id="s8abl" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
   <rect width="1000" height="560" fill="url(#s8ag)"/>${g}
   <path d="${pth}" fill="url(#s8af)" stroke="#ffd21f" stroke-width="2.4" stroke-dasharray="8 6" filter="url(#s8abl)"/>
   <line x1="${x0}" y1="${ym}" x2="${x1}" y2="${ym}" stroke="#ffb21a" stroke-width="2.4"/>
   <image href="media/s25-coin.jpg" x="-96" y="${ym-206}" width="430" height="430" preserveAspectRatio="xMidYMid meet" style="mix-blend-mode:lighten"/>
   ${S8.strike(158,ym+10,.42,7,[[-120,62,'A COIN FLIP'],[70,230,'50%'],[150,62,'RIGHT WAY']])}
   <g filter="url(#s8abl)">
    ${t(x1-6,Y(.86),40,'BEATS A COIN',{a:'end',c:'#3ee07f'})}
    ${t(x1-6,ym-12,30,'A COIN COULD DO THIS',{a:'end',c:'#fff1c2'})}
    ${t(x1-6,Y(.14)+12,40,'WORSE THAN A COIN',{a:'end',c:'#ff5148'})}
    ${t(x0,yB+46,32,'1 TRADE',{c:'#9fd8b4',op:.85})}${t(x1,yB+46,32,n+' TRADES',{a:'end',c:'#9fd8b4',op:.85})}
    ${t(x1+2,Y(r80.hi/n)-10,30,r80.lo+'–'+r80.hi+' OF '+n+' RIGHT',{a:'end',c:'#ffd21f'})}
   </g></svg>`}};
S8.mount(b1)})();
