/* C1 · The prize wheel. Pop art leads (rays, halftone from the edges, extruded lettering); chrome Y2K adds the ring track and its
   travelling light; holo trading card adds the golden ticket; clay adds the hub. The loop is one shape read clockwise: four stops on a ring. */
(function(){const X=CV,S=X.S,P=X.P,m=X.mount('c1');if(!m)return;const {root,film,h1}=m;
  root.innerHTML=`<div class="c1-pg"><div class="c1-top"></div><div class="c1-wh" role="list" aria-label="How every round goes"></div><div class="c1-fm"></div><p class="c1-gd">${X.next()}</p></div>`;
  const top=root.querySelector('.c1-top'),wh=root.querySelector('.c1-wh');root.querySelector('.c1-fm').append(film);X.wire(root);
  const L=X.last;
  function build(){const W=root.clientWidth,desk=W>=900,cw=desk?Math.min(580,(W-40)*.5):W-20;
    const hs=desk?72:Math.min(50,cw*.15);
    top.innerHTML=`<span class="c1-vol"><b>Vol. 1</b><small>Season 1</small><small>No. ${X.R.length}</small></span><span class="c1-t"></span>`;
    top.querySelector('.c1-t').append(h1);
    X.head(h1,`<span class="c1-ln1">${X.aisWord({size:hs*.6,fill:'gold'})}${X.ext('TRADE',{size:hs,fill:'red'})}</span>${X.ext('EARNINGS',{size:hs,fill:'gold',max:desk?560:cw-96})}<span class="c1-q">${X.ext('WHO CALLS IT BEST?',{size:hs*.44,fill:'cream',depth:3,hl:false,max:desk?560:cw-100})}</span>`);
    /* the wheel: four stops on a ring */
    const D=Math.round(Math.min(cw-(desk?10:0),desk?520:380)),Hh=Math.round(D*(desk?1.16:1.24));wh.style.setProperty('--d',D+'px');wh.style.setProperty('--h',Hh+'px');
    const rx=D*.36,ry=Hh*.37,cx=D/2,cy=Hh/2;
    const chev=[45,135,225,315].map(a=>{const t=a*Math.PI/180,x=cx+rx*Math.cos(t-Math.PI/2),y=cy+ry*Math.sin(t-Math.PI/2),dx=-rx*Math.sin(t-Math.PI/2),dy=ry*Math.cos(t-Math.PI/2),ang=Math.atan2(dy,dx)*180/Math.PI;return `<path d="M-7 -8L9 0L-7 8z" fill="#ffd21f" stroke="#0d0b10" stroke-width="3" stroke-linejoin="round" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)})"/>`}).join('');
    const cs=Math.round(D*.085),lb=Math.max(13.5,D*.04);
    const stop1=`<span class="c1-cls">${['GPT','KIMI','CLAUDE','GROK'].map(mm=>{const c=X.calls.find(x=>x.m===mm);return `<span class="c1-cl">${X.coin(mm,cs,{dp:2,holo:false})}${X.callExt(c,D*.04)}</span>`}).join('')}</span>`;
    const stop2=`<span class="c1-bl">${X.bell(Math.round(D*.13))}${X.ext((L.a<0?'▼':'▲')+Math.abs(L.a).toFixed(2)+'%',{size:D*.06,fill:L.a<0?'red':'green',max:D*.28})}</span><span class="c1-pfs">${X.calls.map(c=>`<span class="c1-pfc ${c.pass?'c1-ok':'c1-no'}">${X.coin(c.m,Math.round(D*.05),{dp:1,holo:false})}</span>`).join('')}</span>`;
    const stop3=X.ticket(Math.round(D*.5));
    const stop4=`${X.slabs(Math.round(D*.24))}`;
    const ST=[stop1,stop2,stop3,stop4];
    const lab=(i)=>`<p class="c1-lb" style="font-size:${lb.toFixed(1)}px"><b class="c1-n">${i+1}</b><span>${X.STEP[i]}</span></p>`;
    wh.innerHTML=`<svg class="c1-ring" width="${D}" height="${Hh}" viewBox="0 0 ${D} ${Hh}" aria-hidden="true"><defs><linearGradient id="c1chr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".3" stop-color="#b8c2d6"/><stop offset=".5" stop-color="#5c6680"/><stop offset=".55" stop-color="#e9eef8"/><stop offset=".8" stop-color="#8c96ae"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>
        <ellipse cx="${cx+5}" cy="${cy+5}" rx="${rx}" ry="${ry}" fill="none" stroke="#0d0b10" stroke-width="20"/>
        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#0d0b10" stroke-width="20"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="url(#c1chr)" stroke-width="13"/>
        <ellipse class="c1-run" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#fff6a8" stroke-width="13" stroke-linecap="round" pathLength="100" stroke-dasharray="5 95" transform="rotate(-90 ${cx} ${cy})"/>
        ${chev}</svg>
      ${ST.map((h,i)=>`<div class="c1-st c1-s${i+1}" role="listitem">${i>1?'':''}<div class="c1-ob">${h}</div>${lab(i)}</div>`).join('')}
      <span class="c1-hub" aria-hidden="true"><b>Every<br>round</b></span>
      <p class="c1-rb"><span>Round ${L.n}</span>${S.esc(X.co(L))}</p>`;
  }
  build();let lw=root.clientWidth;new ResizeObserver(()=>{const w=root.clientWidth;if(Math.abs(w-lw)>2){lw=w;build()}}).observe(root);
  X.ready('c1')})();
