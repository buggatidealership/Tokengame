/* H32 Upcoming, take C "Up for grading": the PSA slab world. Every round still to come is a sealed slab waiting for its grade. The next close's
   headliners stand on a grading bench under a spotlight (its brass plaque says when), their trades sealed in the window: each AI's mark, Long or
   Short, the size; a dash for a trade still coming in. The label is the record's own ("Final grade" and the date, the round's No., "?" where the
   grade will go). The rest of that close stand small beside them. Then the last close, fresh from grading (the record's slabs), and the season in
   its box: one sealed label per round, day by day, Mag 7 on gold labels, NVIDIA's last as Bet #1.
   Paintings: img/bench.jpg (Hedra), media/mag-slab-h32.webp, media/p5-panel.jpg; slab markup and CSS from the stand (x2p_more.js). */
(function(){const U=window.U3,{esc}=U,IMG='tools/concepts/worlds/comic/story/h/upcoming3/img/';
const WD3=p=>['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(Date.UTC(p.y,p.mo-1,p.d)).getUTCDay()];
const mk=(m,cls)=>`<svg class="uc-mk ${cls||''}" viewBox="0 0 24 24" aria-hidden="true">${U.MK(m,12,12,24,U.INK[m])}</svg>`;
function sealed(u,M,big){const lab=`<span class="m7-lab m7-lab0${u.mag7||u.bet?' m7-ten':''}"><span class="m7-l"><span class="m7-y">${u.dated?'Final grade '+esc(U.md(u.rp)):'Trades due '+esc(U.md(u.cp))}</span><span class="m7-nm"><b>${esc(u.co)}</b> <small>(${esc(u.ticker)})</small></span></span><span class="m7-r"><span class="m7-no">#${u.n}</span><span class="m7-ds">${u.bet?'Bet #1':u.mag7?'Mag 7':'Sealed'}</span><span class="m7-gr">?</span></span></span>`;
  const rows=M.ORDER.map(m=>{const c=u.trades.find(x=>x.m===m);if(!c)return `<span class="uc-tr uc-wait">${mk(m)}<b>–</b></span>`;const t=U.trade(c);
    return `<span class="uc-tr ${t.dn?'uc-dn':'uc-up'}">${mk(m)}<i>${t.word}</i><b>${t.dn?'−':'+'}${esc(c.mag)}%</b></span>`}).join('');
  const win=big?`<span class="uc-wl">${U.coImg(u,'uc-lg')}</span><span class="uc-trs">${rows}</span><span class="uc-st">${u.state==='in'?'All '+u.nIn+' in':u.state==='coming'?u.nIn+' of '+M.ORDER.length+' in':'Trades coming in'}</span>`
    :`<span class="uc-wl uc-wls">${U.coImg(u,'uc-lg')}</span><span class="uc-leds" aria-hidden="true">${M.ORDER.map(m=>{const c=u.trades.find(x=>x.m===m);return `<i class="${c?(c.dir==='DOWN'?'d':'u'):''}"></i>`}).join('')}</span>`;
  const aria=`Sealed slab: ${u.co} (${u.ticker}), round ${u.n}${u.mag7?', Mag 7':''}. ${u.dated?'Final grade at the close on '+U.md(u.rp):'Trades due '+U.md(u.cp)}. `+(u.trades.map(c=>U.trade(c).sr).join(', ')||'No trades in yet')+(u.nIn&&u.missing.length?'. Still coming in: '+u.missing.map(U.nm).join(', '):'');
  return `<a class="m7-sl m7-mt uc-sl${big?' uc-big':''}${u.mag7?' uc-m7':''}${u.bet?' uc-bet':''}" href="#/round/${u.n}" aria-label="${esc(aria)}"><span class="m7-wn uc-wn">${win}</span><span class="m7-fr" aria-hidden="true"></span>${lab}</a>`}
function label(u){return `<li><a class="uc-lb${u.mag7||u.bet?' uc-lbg':''}" href="#/round/${u.n}" aria-label="${esc(`${u.co} (${u.ticker}), round ${u.n}${u.bet?', Bet #1':u.mag7?', Mag 7':''}. ${u.dated?'Final grade at the close on '+U.md(u.rp):'Trades due '+U.md(u.cp)}`)}">
  <span class="uc-lbl"><span class="uc-y">2026 <b class="s">$</b><b class="e">E</b><b class="z">Z</b> Season 1</span><span class="uc-nm" data-fitw="8"><b>${esc(u.co)}</b> <small>(${esc(u.ticker)})</small></span><span class="uc-wh">${u.dated?'Final grade '+esc(U.md(u.rp)):'Trades due '+esc(U.md(u.cp))}</span></span>
  <span class="uc-lbr"><span class="uc-no">#${u.n}</span><span class="uc-ds">${u.bet?'Bet #1':u.mag7?'Mag 7':'Sealed'}</span><span class="uc-gr">?</span></span>${U.coImg(u,'uc-lbi')}</a></li>`}
U3.mount(M=>{const b=M.bell,bet=M.bet,bd=U.betDay(bet);
  const head=b?b.rounds.slice(0,2):[],also=b?b.rounds.slice(2):[];
  const plate=b?`Graded ${b.day==='Today'||b.day==='Tomorrow'?b.day.toLowerCase()+', '+b.date:WD3(b.p)+' '+b.date} · ${b.mixed?'at each close':'4pm '+b.ex}`:'';
  const bench=b?`<div class="uc-bench" data-u3cd="${b.close}"><div class="uc-row">${head.map(u=>`<div class="uc-slot">${sealed(u,M,true)}</div>`).join('')}</div>
     <p class="uc-plate"><span class="uc-pk">Graded at the close</span><span class="uc-pw">${esc(plate)}</span><span class="uc-pc" role="timer"><b data-u3u="d">00</b>d <b data-u3u="h">00</b>h <b data-u3u="m">00</b>m <b data-u3u="s">00</b>s</span></p></div>`:'';
  const alsoH=also.length?`<p class="uc-sub"><b>Also at this close</b> · ${also.filter(u=>u.state!=='in').length?'trades coming in':'trades in'}</p><ul class="uc-also">${also.map(u=>`<li>${sealed(u,M,false)}</li>`).join('')}</ul>`:'';
  const n=M.last.length,fresh=n?`<section class="uc-fresh" aria-labelledby="ucFrH"><h3 class="u3-h3" id="ucFrH">Fresh from grading <small>${esc(WD3(M.lastP))} ${esc(U.md(M.lastP))} · ${n} graded</small></h3><ul class="u3-slabs">${M.last.slice(0,8).map(r=>`<li>${U.slab(r,'uc-gs')}</li>`).join('')}</ul></section>`:'';
  const days=M.DAYS.filter(d=>!d.rounds.every(u=>u.bet));
  const box=`<section class="uc-box" aria-labelledby="ucBxH"><h2 class="t4-h2" id="ucBxH"><span class="t4-hw">Still sealed</span></h2><p class="u3-cap">One slab per round, graded at its close. Mag 7 on gold.</p>
    ${days.map(d=>{const rs=d.rounds.filter(u=>!u.bet);return `<div class="uc-day"><p class="uc-tab"><b>${esc(d.day==='Today'?'Today':WD3(d.p))}</b> ${esc(d.date)}<small>${rs.length} ${d.dueOnly?'· trades due':'· graded at the close'}</small></p><ul class="uc-lbs">${rs.map(label).join('')}</ul></div>`}).join('')}
    ${bet?`<div class="uc-day uc-betd"><p class="uc-tab"><b>${esc(WD3(bet.cp))}</b> ${esc(U.md(bet.cp))}<small>the last slab of Season 1</small></p><div class="uc-betw">${sealed(bet,M,false)}<p class="uc-bt"><span class="t4-h2 uc-bh"><span class="t4-hw">Bet #1: NVIDIA</span></span><span>Trades ${esc(U.md(bet.cp))}${bd?' · the bet at the close '+esc(U.md(bd)):''}</span></p></div></div>`:''}</section>`;
  return `<section class="uc" aria-labelledby="ucH"><h2 class="t4-h2 uc-h" id="ucH"><span class="t4-hw">Up for grading</span></h2>${bench}${alsoH}</section>${fresh}${box}${U.follow(M)}`},'u3-C')})();
