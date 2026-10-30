/* H2 · Fight for the golden ticket: one scene, as a real cover. The golden ticket hangs in a spotlight over Earnings City;
   the four AIs rocket up toward it, as high as their P&L ranks them (no numbers), each shouting its real call on the next
   fight, whose logo is on the billboard; the clock runs to the close; the pool waits below. The loop is the corner box: a
   dial whose hand lights the four numbered blurbs on the art in turn. On desktop the film plays on the city's big screen. */
(function(){const X=SH,S=X.S,m=X.mount('sh-h2');if(!m)return S.ready();const {cv,h1,film,star}=m;
  const A=window.__x2pPnl().A,rank=Object.keys(A).sort((a,b)=>A[b].pnl-A[a].pnl),f=X.fight(),K='#15121a',hi=A[rank[0]].pnl,lo=A[rank[3]].pnl;
  star.classList.add('se-hide');
  const ai=S.STAR.map((mm,i)=>{const c=f&&f.r.calls.find(x=>x.m===mm),up=c&&c.dir==='UP',rk=rank.indexOf(mm);
    return `<div class="sh-ai sh-ai${i+1} sh-rk${rk+1}" style="--i:${i};--t:${((hi-A[mm].pnl)/((hi-lo)||1)).toFixed(3)}" role="listitem" aria-label="${S.NM[mm]}${c?', says '+(up?'up':'down'):''}">
      <i class="sh-jet" aria-hidden="true"></i>${X.face(mm)}<b>${S.NM[mm]}</b>${c?`<i class="sh-say ${up?'sh-up':'sh-dn'}" aria-hidden="true">${up?'▲':'▼'}</i>`:''}</div>`}).join('');
  const cap=(i,cls)=>`<p class="sh-cap sh-cap${i+1} ${cls||''}" style="--i:${i}"><i class="sh-n">${i+1}</i><span>${X.STEP[i]}</span></p>`;
  const city=`<svg class="sh-city" viewBox="0 0 330 90" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${(()=>{let x=0,o='',k=0;const rnd=n=>{k=(k*9301+49297+n)%233280;return k/233280};
      while(x<330){const w=14+rnd(x)*16,h=30+rnd(x+7)*52,up=rnd(x+3)>.45;o+=`<path d="M${(x+w/2).toFixed(1)} ${(90-h-8).toFixed(1)}v8M${(x+w/2).toFixed(1)} 90" stroke="${K}" stroke-width="2"/><rect x="${x.toFixed(1)}" y="${(90-h).toFixed(1)}" width="${(w-3).toFixed(1)}" height="${h.toFixed(1)}" fill="${up?'#1d8f52':'#c8352d'}" stroke="${K}" stroke-width="2"/>`;
        for(let wy=90-h+6;wy<84;wy+=9)o+=`<rect class="sh-win" x="${(x+4).toFixed(1)}" y="${wy.toFixed(1)}" width="${(w-11).toFixed(1)}" height="3" fill="#ffe28a" opacity=".55" style="--d:${(rnd(wy+x)*5).toFixed(2)}s"/>`;x+=w}return o})()}</svg>`;
  const clock=`<div class="sh-clk" aria-hidden="true"><svg viewBox="-44 -44 88 88"><circle r="40" fill="#fffaf0" stroke="${K}" stroke-width="4"/>
      ${Array.from({length:12},(_,i)=>`<path d="M0 -34V${i%3?-30:-27}" stroke="${K}" stroke-width="${i%3?2.2:3.4}" transform="rotate(${i*30})"/>`).join('')}
      <path d="M0 4V-19" stroke="${K}" stroke-width="5" stroke-linecap="round" transform="rotate(120)"/><g class="sh-mh"><path d="M0 6V-31" stroke="#e0352d" stroke-width="3.4" stroke-linecap="round"/></g><circle r="4" fill="${K}"/>
      <g class="sh-ring2" stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M-46 -30l-7-5M46 -30l7-5M-50 0h-8M50 0h8"/></g></svg></div>`;
  const bill=f?`<div class="sh-bb" aria-hidden="true"><span>${S.coImg(f.r.ticker,'sh-bblg')}</span><i></i><i></i></div>`:'';
  const dial=`<div class="sh-dial" aria-hidden="true"><svg viewBox="-40 -40 80 80"><circle r="36" fill="#fffaf0" stroke="${K}" stroke-width="3"/>
      ${[0,1,2,3].map(i=>`<path d="M0 0L${(36*Math.sin(i*Math.PI/2-Math.PI/4)).toFixed(2)} ${(-36*Math.cos(i*Math.PI/2-Math.PI/4)).toFixed(2)}" stroke="${K}" stroke-width="1.6"/>`).join('')}
      ${[0,1,2,3].map(i=>{const a=i*Math.PI/2,x=(22*Math.sin(a)).toFixed(1),y=(-22*Math.cos(a)).toFixed(1);return `<g class="sh-dq" style="--i:${i}"><circle cx="${x}" cy="${y}" r="9.5" fill="#fdbc2a" stroke="${K}" stroke-width="2"/><text x="${x}" y="${(+y+4.6).toFixed(1)}" text-anchor="middle" font-family="Bangers,Impact,sans-serif" font-size="13" fill="${K}">${i+1}</text></g>`}).join('')}
      <g class="sh-hand"><path d="M0 4V-31" stroke="#e0352d" stroke-width="3.5" stroke-linecap="round"/><path d="M-5 -26L0 -35 5 -26z" fill="#e0352d"/></g><circle r="4.5" fill="${K}"/></svg><b>Every round</b></div>`;
  const mh=`<div class="sh-mh2"></div>`;
  cv.insertAdjacentHTML('afterbegin',X.issue()+`<div class="sh-sc" role="group" aria-label="How every round goes">
    <i class="sh-beam" aria-hidden="true"></i>${mh}${clock}
    <div class="sh-tkw">${X.V[2]()}</div>
    <div class="sh-crew" role="list" aria-label="Starring, each one's call on ${f?S.esc(f.r.co):'the next round'}"><span class="sh-stl">Starring</span>${ai}</div>
    ${city}${bill}<div class="sh-jar">${X.V[3]()}</div>
    ${cap(0)}${cap(1)}${cap(2)}${cap(3)}</div>`);
  const sc=cv.querySelector('.sh-sc'),mh2=sc.querySelector('.sh-mh2');mh2.insertAdjacentHTML('afterbegin',dial);mh2.append(h1);
  sc.after(film);film.classList.add('sh-film');sc.insertAdjacentHTML('afterend',X.guard());
  const fc=film.querySelector('.wc-film-cap');if(fc)fc.textContent='Inside: how it works · 1:20';
  S.ready()})();
