/* r1030 proof mockups P1 to P5 (owner, 2026-10-27, night: "Getting smarter or just lucky?" as E1's e-ticket without the code, on a
   white or beige ground from the tickets; five concepts). The page's own L2 proof (.rz-pf) restyled; this adds the ticket furniture. */
(function(){var V=window.__pV,pf=document.querySelector('.rz-pf');if(!pf||pf.querySelector('.pq-ft'))return;pf.classList.add('pq',V);
 var G=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)}),N=G.length,last=G[N-1],ID='EZ-S1-R'+last.n,calls=G.reduce(function(s,r){return s+(r.calls||[]).length},0);
 var md=function(s){var q=String(s||'').split('/'),M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];return q.length>1?M[+q[0]-1]+' '+(+q[1]):''};
 var tb=pf.querySelector('.rz-tb'),perf='<div class="pq-perf" aria-hidden="true"></div>';
 var foot='<div class="pq-ft"><span class="pq-meta"><b>'+ID+'</b><span>Every call before the report · graded at the close</span></span><span class="pq-adm">Admit<br>the market<br>close</span></div>';
 if(V==='P1'){tb.insertAdjacentHTML('beforebegin','<div class="pq-hd"><span class="pq-k">E-ticket</span><span class="pq-t">Season 1 · '+N+' rounds graded</span></div>');tb.insertAdjacentHTML('afterend',perf);pf.insertAdjacentHTML('beforeend',perf+foot)}
 if(V==='P2'){pf.insertAdjacentHTML('afterbegin','<div class="pq-band r" aria-hidden="true"><span>Admit one</span><span>Season 1 · Nº 0000'+last.n+'</span></div>');
  tb.insertAdjacentHTML('afterend','<div class="pq-stitch" aria-hidden="true"></div>');pf.insertAdjacentHTML('beforeend','<div class="pq-stitch" aria-hidden="true"></div><div class="pq-band g" aria-hidden="true"><span>★ The proof ★</span><span>Graded at the close</span></div>')}
 if(V==='P3'){pf.insertAdjacentHTML('afterbegin','<div class="pq-bar" aria-hidden="true"><span class="pq-dot"></span><span>E-ticket</span><b>Season 1 · Round '+last.n+'</b></div>');tb.insertAdjacentHTML('afterend',perf);pf.insertAdjacentHTML('beforeend',perf+foot)}
 if(V==='P4'){pf.insertAdjacentHTML('afterbegin','<div class="pq-bp" aria-hidden="true"><div class="pq-bpr"><span><small>From</small><b>R1</b><i>'+md(G[0].called)+'</i></span><span class="pq-pl">✈</span><span class="r"><small>To</small><b>R'+last.n+'</b><i>'+md(last.resolves||last.called)+'</i></span></div>'+
   '<div class="pq-bpf"><span><small>Rounds</small><b>'+N+'</b></span><span><small>Calls</small><b>'+calls+'</b></span><span><small>Models</small><b>4</b></span><span><small>Class</small><b>Season 1</b></span></div></div>'+perf);
  tb.insertAdjacentHTML('afterend',perf);pf.insertAdjacentHTML('beforeend',perf+foot)}
 if(V==='P5'){pf.insertAdjacentHTML('afterbegin','<div class="pq-rc" aria-hidden="true"><b>$EZ · THE PROOF</b><span>Season 1 · '+N+' rounds · '+calls+' calls</span><span>'+ID+'</span></div><div class="pq-dash" aria-hidden="true"></div>');
  tb.insertAdjacentHTML('afterend','<div class="pq-dash" aria-hidden="true"></div>');pf.insertAdjacentHTML('beforeend','<div class="pq-dash" aria-hidden="true"></div><div class="pq-rf" aria-hidden="true"><span>Every call before the report</span><span>Graded at the market close</span><b>*** Thank you for verifying ***</b></div>')}
})();
