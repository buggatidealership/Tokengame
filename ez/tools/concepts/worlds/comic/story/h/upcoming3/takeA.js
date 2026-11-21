/* H32 Upcoming, take A "The next bell": the bet's craft on the next close. A painted countdown board (its plate names the day and the city of
   the close, its four dies count down), then one painted trade module per company graded at that close: the company's mark lit in the big die,
   each AI's trade lit in its own die (Long in green, Short in red, the size), a dark die with a dash while a trade is still coming in. Then the
   last bell's graded slabs (the record's own), the season card day by day (one chip per company, Mag 7 in gold and larger, four lights per chip
   for the four trades), the NVIDIA chip as Bet #1 at its foot, and the Overview's follow panel. Paintings: img/bell.jpg, img/trade.jpg,
   img/node.jpg, img/nodeg.jpg (Hedra, gpt-image-2), media/bet-chip-h2.jpg, media/p5-panel.jpg. */
(function(){const U=window.U3,{esc,T,MK,INK,LIT,stage}=U,IMG='tools/concepts/worlds/comic/story/h/upcoming3/img/';
const UPC='#3ee07f',DNC='#ff5148';
function bell(M){const b=M.bell;if(!b)return `<p class="u3-cap">No close on the card right now. The next trades drop before each report.</p>`;
  const dies=[[460,440,748,980],[892,440,1180,980],[1328,444,1620,980],[1772,440,2064,980]],U4=['d','h','m','s'],LB=['DAYS','HRS','MIN','SEC'];
  const plate=(b.day==='Today'||b.day==='Tomorrow'?b.day:b.day)+' · '+b.date+' · '+(b.mixed?'at each close':'4pm '+b.ex);
  let lit=T(1274,262,74,plate.toUpperCase(),{a:'middle',ls:3,tl:plate.length>30?900:null});
  dies.forEach((d,i)=>{lit+=`<text data-u3u="${U4[i]}" x="${(d[0]+d[2])/2}" y="${d[1]+(d[3]-d[1])*.74}" font-size="262" text-anchor="middle" font-family="Anton,sans-serif" fill="url(#u3dg)">00</text>`});
  const silk=dies.map((d,i)=>T((d[0]+d[2])/2,1072,40,LB[i],{a:'middle',c:'#1a1206',ls:5})).join('');
  const defs=`<defs><linearGradient id="u3dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf3"/><stop offset=".55" stop-color="#f8f0d9"/><stop offset="1" stop-color="#c9bd9f"/></linearGradient></defs>`;
  return `<div class="ua-bell" data-u3cd="${b.close}">${stage({img:IMG+'bell.jpg',W:2560,H:1440,crop:[150,20,2410,1360],glass:dies.map(d=>[d[0],d[1],d[2]-d[0],d[3]-d[1],14]).concat([[788,176,972,124,10]]),under:defs,lit,silk,bloom:9,
    label:`The next bell: ${b.day}, ${b.date}, ${b.mixed?'at each exchange’s close':'4pm '+b.ex}`})}</div>`}
function module(u,M){const dies=[[1048,496,1324,912],[1400,496,1692,912],[1772,496,2040,912],[2108,496,2368,912]];
  let lit=LIT(u,516,698,360,300),flat='',silk='';
  M.ORDER.forEach((m,i)=>{const d=dies[i],cx=(d[0]+d[2])/2,c=u.trades.find(x=>x.m===m);
    silk+=T(cx,985,44,U.nm(m).toUpperCase(),{a:'middle',c:'#f3e7c4',ls:3});
    if(c){const t=U.trade(c);lit+=MK(m,cx,d[1]+70,74,INK[m])+T(cx,d[1]+218,92,t.word.toUpperCase(),{a:'middle',c:t.dn?DNC:UPC})+T(cx,d[1]+350,104,(t.dn?'−':'+')+c.mag+'%',{a:'middle',c:'#f8f0d9'})}
    else{flat+=MK(m,cx,d[1]+70,74,'rgba(248,240,217,.22)')+T(cx,d[1]+300,150,'–',{a:'middle',c:'rgba(248,240,217,.32)'})}});
  const trades=u.trades.map(c=>U.trade(c).sr).join(', '),miss=u.missing.map(U.nm);
  const st=u.state==='in'?`<b>All ${u.nIn} trades in</b>`:u.state==='coming'?`<b>${u.nIn} of ${M.ORDER.length} in</b> · ${esc(miss.join(', '))} coming in`:`<b>Trades coming in</b> · due ${esc(U.md(u.cp))}`;
  return `<li class="ua-row${u.mag7?' ua-m7':''}"><a class="ua-a" href="#/round/${u.n}" aria-label="${esc(u.co+' ('+u.ticker+'), round '+u.n+'. '+(trades||'No trades in yet')+(miss.length&&u.nIn?'. Still coming in: '+miss.join(', '):''))}">
   <span class="ua-lab"><span class="ua-nm" data-fitw="11"><b>${esc(u.co)}</b> <small>(${esc(u.ticker)})</small>${u.mag7?'<em>Mag 7</em>':''}</span><span class="ua-st">${st}</span></span>
   ${stage({img:IMG+'trade.jpg',W:2560,H:1440,crop:[0,372,2560,1036],glass:dies.map(d=>[d[0],d[1],d[2]-d[0],d[3]-d[1],12]).concat([[264,460,504,476,18]]),lit,flat,silk,bloom:7,label:''})}</a></li>`}
function led(u,M){return `<svg class="ua-led" viewBox="0 0 64 14" aria-hidden="true">${M.ORDER.map((m,i)=>{const c=u.trades.find(x=>x.m===m),col=c?(c.dir==='DOWN'?DNC:UPC):null;const x=8+i*16;
  return col?`<circle cx="${x}" cy="7" r="5.6" fill="${col}" opacity=".35"/><circle cx="${x}" cy="7" r="3.9" fill="${col}"/><circle cx="${x-1.2}" cy="5.6" r="1.3" fill="#fff" opacity=".8"/>`:`<circle cx="${x}" cy="7" r="4.2" fill="#12160f" stroke="#7a6a3a" stroke-width="1.2"/>`}).join('')}</svg>`}
function chip(u,M){const big=u.mag7,sz=big?1.32:u.cap>=300?1:.84;
  return `<li class="ua-ch${big?' ua-chg':''}" style="--s:${sz}"><a href="#/round/${u.n}" aria-label="${esc(u.co+' ('+u.ticker+'), round '+u.n+(u.mag7?', Mag 7':'')+'. '+(u.nIn?u.nIn+' of '+M.ORDER.length+' trades in':'Trades due '+U.md(u.cp)))}">
    <span class="ua-cp"><img class="ua-cpi" src="${IMG}${big?'nodeg':'node'}.jpg" alt="" loading="lazy" decoding="async">${U.coImg(u,'ua-cl')}</span>${led(u,M)}
    <span class="ua-cn" data-fitw="8">${esc(u.co)}</span><small>${esc(u.ticker)}</small></a></li>`}
function season(M){const days=M.DAYS.filter(d=>!d.rounds.every(u=>u.bet));const bet=M.bet,bd=U.betDay(bet);
  return `<section class="ua-sea" aria-labelledby="uaSeaH"><h2 class="t4-h2" id="uaSeaH"><span class="t4-hw">The season card</span></h2>
   <p class="u3-cap">Four lights per chip, one per AI. They light up as the trades come in.</p>
   <ol class="ua-days">${days.map(d=>{const rs=d.rounds.filter(u=>!u.bet);const n7=rs.filter(u=>u.mag7).length;
     return `<li class="ua-day${d.past?' ua-past':''}"><div class="ua-dl"><b>${esc(d.day==="Today"?d.day:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(Date.UTC(d.p.y,d.p.mo-1,d.p.d)).getUTCDay()])}</b><span>${esc(d.date)}</span><small>${d.dueOnly?'trades due':'graded at the close'}</small></div><ul class="ua-chips">${rs.map(u=>chip(u,M)).join('')}</ul></li>`}).join('')}
   ${bet?`<li class="ua-day ua-betd"><a class="ua-bet" href="#/round/${bet.n}" aria-label="${esc('Bet #1: NVIDIA (NVDA), round '+bet.n+'. Trades '+U.md(bet.cp)+(bd?', the bet at the close '+U.md(bd):''))}"><img src="media/bet-chip-h2.jpg" alt="" loading="lazy" decoding="async"><span class="ua-btx"><span class="t4-h2 ua-bh"><span class="t4-hw">Bet #1: NVIDIA</span></span><span class="ua-bs">Trades ${esc(U.md(bet.cp))}${bd?' · the bet at the close '+esc(U.md(bd)):''}</span></span></a></li>`:''}</ol></section>`}
function last(M){if(!M.last.length)return '';const n=M.last.length;
  return `<section class="ua-last" aria-labelledby="uaLastH"><h3 class="u3-h3" id="uaLastH">The last bell <small>${esc(U.dayName(M.lastP,M.today))} ${esc(U.md(M.lastP))} · ${n} graded</small></h3>
   <ul class="u3-slabs">${M.last.slice(0,8).map(r=>`<li>${U.slab(r,'ua-sl')}</li>`).join('')}</ul>${n>8?`<a class="ua-more" href="#/">All ${n} on the record</a>`:''}</section>`}
U3.mount(M=>{const b=M.bell;return `<section class="ua" aria-labelledby="uaH"><h2 class="t4-h2 ua-h" id="uaH"><span class="t4-hw">The next bell</span></h2>${bell(M)}
  ${b?`<p class="u3-cap ua-cap">The close grades every trade. <span class="u3-n">${b.nIn}</span> of <span class="u3-n">${b.nAll}</span> are in.</p><ol class="ua-rows">${b.rounds.map(u=>module(u,M)).join('')}</ol>`:''}</section>${last(M)}${season(M)}${U.follow(M)}`},'u3-A')})();
