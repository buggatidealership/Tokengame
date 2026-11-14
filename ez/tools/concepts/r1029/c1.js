/* C1: the foot bands and the perforation under the proof's tabs */
(function(){var G=ROUNDS.filter(function(r){return typeof r.a==="number"}),no='Nº '+String(G[G.length-1].n).padStart(6,'0');
 var tw=document.querySelector('.rz-tw');if(tw&&!tw.querySelector('.c1-ft'))tw.insertAdjacentHTML('beforeend','<div class="c1-ft" aria-hidden="true"><span>Admit one</span><span>'+no+'</span></div>');
 var pf=document.querySelector('.rz-pf');if(pf&&!pf.querySelector('.c1-ft')){pf.querySelector('.rz-tb').insertAdjacentHTML('afterend','<div class="c1-pp" aria-hidden="true"></div>');pf.insertAdjacentHTML('beforeend','<div class="c1-ft" aria-hidden="true"><span>Season 1</span><span>'+no+'</span></div>')}})();
