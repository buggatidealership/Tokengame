/* P3 the sports page (round 2 of "the paper"): the same day's paper turned to its sports section, a pink-paper tabloid racing form.
   The nameplate shrinks above a giant SPORT flag; the standings are the league table with a form guide of each AI's last ten calls
   (from __x2pPnl's W/L sequence) under it; the record's cards are followed straight away by the box scores (every round in agate);
   the fixtures (every round still to be called, by day) come before the main event. Agate everywhere. */
window.__npCfg={cls:'np-p3',edition:'Sports final',flag:'<b>Sport</b><span>Four AIs. One belt. Every earnings report.</span>',cardTitle:"Tonight's card",ixTitle:'In this section',
 fonts:'https://fonts.googleapis.com/css2?family=Pirata+One&family=Oswald:wght@500;700&family=Roboto+Condensed:ital,wght@0,400;0,700;1,400&display=swap',
 byline:'By the closing bell',pg:function(p){return 'B'+p},tapeBefore:'learn',
 bannerKick:function(D){return 'Fight night · Season 1 · Week '+D.wk},
 tapeWords:function(D){return {kick:'Box scores',h:D.N+' rounds, every call',dk:'The move, each AI\'s call as filed in %, the winner. '+D.pend.length+' more with calls in, graded at the close.'}},
 index:[['The table','standings',1],['Form guide','standings',1],['The cards','record',2],['Box scores','np-tape',2],['The proof','learn',3],['Plays of the week','highlights',3],['Fixtures','np-fix',4],['Main event','x2pSt',4],['Tickets','get',4]],
 folios:{record:2,learn:3,'np-fix':4},
 fronts:{standings:'The table',record:'The cards',learn:'The proof',highlights:'Plays of the week',x2pSt:'Main event',get:'Tickets',2:'The cards · Box scores',3:'The proof · Plays of the week',4:'Fixtures · Main event'},
 extra:function(D,T,u){var d=document,P=D.P;
  /* the form guide under the table: last ten calls per AI, record, rate, P&L, streak */
  var cap=d.querySelector('#standings .x2p-flip+.np-cap');if(cap&&!d.querySelector('.np-form')){var f=d.createElement('div');f.className='np-form';
   f.innerHTML='<div class="np-fh"><b>Form guide</b><span>Last 10 calls, newest right · W right direction · L wrong</span></div>'+D.rk.map(function(m,i){var q=P.A[m].seq,l=q.slice(-10),k=1;while(k<q.length&&q[q.length-1-k]===q[q.length-1])k++;
    return '<div class="np-fr"><span class="np-fp">'+(i+1)+'</span><span class="np-fn">'+u.NM[m]+'</span><span class="np-fs">'+l.map(function(x){return '<i class="'+(x==='W'?'w':'l')+'">'+x+'</i>'}).join('')+'</span><span>'+D.W[m]+'-'+D.L[m]+'</span><span>'+D.hit[m]+'%</span><span class="'+(D.tot[m]<0?'np-dn':'np-up')+'">'+u.usd(D.tot[m])+'</span><span>'+q[q.length-1]+k+'</span></div>'}).join('');
   cap.after(f)}
  /* the fixtures: every round still to be called, by calls day */
  var st=d.getElementById('x2pSt');if(st&&!d.getElementById('np-fix')){var days={},ord=[];D.due.concat(D.up).forEach(function(r){var k=r.called;if(!days[k]){days[k]=[];ord.push(k)}days[k].push(r)});
   var s=d.createElement('section');s.className='sec np-fix';s.id='np-fix';var n=0;ord.forEach(function(k){n+=days[k].length});
   s.innerHTML='<div class="sh"><div class="np-kick"><span class="np-no">Fixtures</span><span class="np-pg">B4</span></div><div class="np-hd"><h3>'+n+' rounds still on the card</h3><p class="np-dk">Calls lock before each report and are graded at the next close. Every company, by calls day.</p></div></div>'+
    '<div class="np-fx">'+ord.slice(0,12).map(function(k){var dt=u.pd(k);return '<div class="np-fd"><b>'+u.WD[dt.getDay()].slice(0,3)+' '+u.MO[dt.getMonth()].slice(0,3)+' '+dt.getDate()+'</b><span>'+days[k].length+'</span><p>'+days[k].map(function(r){return u.esc(u.tk(r))}).join(' · ')+'</p></div>'}).join('')+'</div>';
   st.parentNode.insertBefore(s,st)}}};
