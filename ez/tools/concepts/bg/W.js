(function(){var d=document;function go(){if(d.querySelector('.bgw')||typeof ROUNDS==='undefined')return;var w=d.createElement('div');w.className='bgw';d.body.prepend(w);
 function lay(){var H=d.documentElement.scrollHeight,W=d.documentElement.clientWidth;w.style.height=H+'px';w.innerHTML='';var rs=ROUNDS.slice().reverse(),y=-20,k=0,seed=7;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
  while(y<H){var r=rs[k++%rs.length];var e=d.createElement('i');e.innerHTML='<small>Fight night · Round '+r.n+'</small>'+(r.ticker||r.co||'').replace(/\..*$/,'');
   e.style.left=(rnd()*W*0.7-W*0.12)+'px';e.style.top=y+'px';e.style.transform='rotate('+((rnd()-.5)*7).toFixed(1)+'deg)';w.appendChild(e);y+=60+rnd()*120}}
 lay();addEventListener('load',function(){setTimeout(lay,500)});setTimeout(lay,4000)}
 if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',go);else go()})();
