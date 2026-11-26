/* H32 Upcoming, take B "The road to NVIDIA": the season as one gold trace on the board, stop by stop. At its top the last bell (the record's
   slabs, small), then the next stop lit: the close's day, city and time left, and each company as a chip with its trades split into two corners,
   Long (green) and Short (red), each AI's mark and size in its corner, a dashed empty socket for a trade still coming in. Then every later close
   as a pad on the trace with its chips (biggest first, Mag 7 in gold and larger), and the trace ends in the NVIDIA chip, Bet #1.
   Paintings: img/node.jpg, img/nodeg.jpg (Hedra), media/bet-chip-h2.jpg, media/p5-panel.jpg; the trace and pads are drawn (SVG). */
(function(){const U=window.U3,{esc}=U,IMG='tools/concepts/worlds/comic/story/h/upcoming3/img/';
const WD3=p=>['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(Date.UTC(p.y,p.mo-1,p.d)).getUTCDay()];
/* one stop's slice of the trace: the bus (ink outline, gold core, a lit edge) and the pad (a solder ring); 'lit' glows */
function bus(kind){const lit=kind==='now',end=kind==='end',top=kind==='first';
  return `<span class="ub-bus ub-bus-${kind||'mid'}"><svg viewBox="0 0 40 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="ubg" gradientUnits="userSpaceOnUse" x1="14" x2="26" y1="0" y2="0"><stop offset="0" stop-color="#7a5310"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".6" stop-color="#d9a12a"/><stop offset="1" stop-color="#6b470c"/></linearGradient></defs>
   <path d="M20 0 V100" stroke="#0d0b10" stroke-width="12" vector-effect="non-scaling-stroke" fill="none"/>
   <path d="M20 0 V100" stroke="url(#ubg)" stroke-width="7" vector-effect="non-scaling-stroke" fill="none"/></svg></span>
   <svg class="ub-pad${lit?' ub-padl':''}" viewBox="0 0 40 40" aria-hidden="true"><defs><radialGradient id="ubp${lit?'l':''}" cx=".38" cy=".34" r=".7"><stop offset="0" stop-color="${lit?'#fff7d6':'#ffe7a0'}"/><stop offset=".55" stop-color="${lit?'#ffd21f':'#c9922a'}"/><stop offset="1" stop-color="${lit?'#a8740e':'#5a3c0a'}"/></radialGradient></defs>
   ${lit?'<circle cx="20" cy="20" r="19" fill="#ffd21f" opacity=".22"/>':''}<circle cx="20" cy="20" r="13.5" fill="#0d0b10"/><circle cx="20" cy="20" r="11" fill="url(#ubp${lit?'l':''})"/><circle cx="20" cy="20" r="4.6" fill="#0d0b10"/><circle cx="18.6" cy="18.6" r="1.4" fill="#fff" opacity=".7"/></svg>`}
const mk=(m,cls)=>`<svg class="ub-mk ${cls||''}" viewBox="0 0 24 24" aria-hidden="true">${U.MK(m,12,12,24,U.INK[m])}</svg>`;
const chipImg=(u,cls)=>`<span class="ub-cp ${cls||''}"><img class="ub-cpi" src="${IMG}${u.mag7?'nodeg':'node'}.jpg" alt="" loading="lazy" decoding="async">${U.coImg(u,'ub-cl')}</span>`;
function corner(u,M,dn){const cs=u.trades.filter(c=>(c.dir==='DOWN')===dn);
  return `<span class="ub-cor ${dn?'ub-dn':'ub-up'}"><b class="ub-cw">${dn?'Short':'Long'}</b>${cs.length?cs.map(c=>`<span class="ub-t">${mk(c.m)}<b>${dn?'−':'+'}${esc(c.mag)}%</b></span>`).join(''):'<span class="ub-none">nobody</span>'}</span>`}
function stopRow(u,M){const miss=u.missing;
  const body=u.nIn?`<span class="ub-corn">${corner(u,M,false)}${corner(u,M,true)}</span>${miss.length?`<span class="ub-miss">${miss.map(m=>`<span class="ub-t ub-tm">${mk(m)}<i>…</i></span>`).join('')}<em>${esc(miss.map(U.nm).join(', '))} coming in</em></span>`:''}`
    :`<span class="ub-miss ub-all">${M.ORDER.map(m=>`<span class="ub-t ub-tm">${mk(m)}<i>…</i></span>`).join('')}<em>Trades coming in · due ${esc(U.md(u.cp))}</em></span>`;
  return `<li class="ub-r${u.mag7?' ub-m7':''}"><a href="#/round/${u.n}" aria-label="${esc(u.co+' ('+u.ticker+'), round '+u.n+'. '+(u.trades.map(c=>U.trade(c).sr).join(', ')||'No trades in yet')+(u.nIn&&miss.length?'. Still coming in: '+miss.map(U.nm).join(', '):''))}">
   ${chipImg(u)}<span class="ub-rb"><span class="ub-nm" data-fitw="11"><b>${esc(u.co)}</b> <small>(${esc(u.ticker)})</small>${u.mag7?'<em>Mag 7</em>':''}</span>${body}</span></a></li>`}
function chip(u,M){const sz=u.mag7?1.3:u.cap>=300?1:.84,lights=M.ORDER.map(m=>{const c=u.trades.find(x=>x.m===m);return `<i class="${c?(c.dir==='DOWN'?'d':'u'):''}"></i>`}).join('');
  return `<li class="ub-ch${u.mag7?' ub-chg':''}" style="--s:${sz}"><a href="#/round/${u.n}" aria-label="${esc(u.co+' ('+u.ticker+'), round '+u.n+'. '+(u.nIn?u.nIn+' of '+M.ORDER.length+' trades in':'trades due '+U.md(u.cp)))}">${chipImg(u)}<span class="ub-li" aria-hidden="true">${lights}</span><span class="ub-cn" data-fitw="8">${esc(u.co)}</span><small>${esc(u.ticker)}</small></a></li>`}
U3.mount(M=>{const b=M.bell,bet=M.bet,bd=U.betDay(bet),days=M.DAYS.filter(d=>!d.rounds.every(u=>u.bet));const n=M.last.length;
  const past=n?`<li class="ub-s ub-past">${bus('first')}<div class="ub-sb"><p class="ub-k">Last bell · ${esc(WD3(M.lastP))} ${esc(U.md(M.lastP))} · <b>${n} graded</b></p>
     <ul class="ub-mini">${M.last.slice(0,6).map(r=>`<li>${U.slab(r,'ub-sl')}</li>`).join('')}</ul></div></li>`:'';
  const now=b?`<li class="ub-s ub-now" data-u3cd="${b.close}">${bus('now')}<div class="ub-sb"><p class="ub-k ub-kn">Next stop</p>
     <div class="ub-when"><b>${esc(b.day)}</b><span>${esc(b.date)} · ${b.mixed?'each close':'4pm '+esc(b.ex)}</span></div>
     <p class="ub-cd" role="timer" aria-label="Time to the close"><span><em data-u3u="d">00</em><i>d</i></span><span><em data-u3u="h">00</em><i>h</i></span><span><em data-u3u="m">00</em><i>m</i></span><span><em data-u3u="s">00</em><i>s</i></span></p>
     <p class="u3-cap ub-cap">Long or short, before the report. <span class="u3-n">${b.nIn}</span> of <span class="u3-n">${b.nAll}</span> trades in.</p>
     <ol class="ub-rows">${b.rounds.map(u=>stopRow(u,M)).join('')}</ol></div></li>`:'';
  const stops=days.map(d=>{const rs=d.rounds.filter(u=>!u.bet);return `<li class="ub-s">${bus()}<div class="ub-sb"><p class="ub-k"><b>${esc(d.day==='Today'?'Today':WD3(d.p))}</b> ${esc(d.date)} · ${d.dueOnly?'trades due':'graded at the close'}</p><ul class="ub-chips">${rs.map(u=>chip(u,M)).join('')}</ul></div></li>`}).join('');
  const end=bet?`<li class="ub-s ub-end">${bus('end')}<div class="ub-sb"><a class="ub-bet" href="#/round/${bet.n}" aria-label="${esc('Bet #1: NVIDIA (NVDA), round '+bet.n+'. Trades '+U.md(bet.cp)+(bd?', the bet at the close '+U.md(bd):''))}"><img src="media/bet-chip-h2.jpg" alt="" loading="lazy" decoding="async"><span class="t4-h2 ub-bh"><span class="t4-hw">Bet #1: NVIDIA</span></span><span class="ub-bs">Trades ${esc(U.md(bet.cp))}${bd?' · the bet at the close '+esc(U.md(bd)):''}</span></a></div></li>`:'';
  return `<section class="ub" aria-labelledby="ubH"><h2 class="t4-h2 ub-h" id="ubH"><span class="t4-hw">The road to NVIDIA</span></h2><ol class="ub-line">${past}${now}${stops}${end}</ol></section>${U.follow(M)}`},'u3-B')})();
