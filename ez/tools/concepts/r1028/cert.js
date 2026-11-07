/* r1028: PASS / FAIL as the logo's slanted slabs (the page's own stamps stay in the DOM, hidden, with their labels for screen readers) */
document.querySelectorAll('#car .card .xc .xc-r').forEach(function(r){if(r.querySelector('.cq-pf'))return;var m=r.querySelector('.xc-m');if(!m)return;var w=m.getAttribute('aria-label');
 r.insertAdjacentHTML('beforeend','<span class="cq-pf '+(w==='PASS'?'p':'f')+'" aria-hidden="true"><span>'+w+'</span></span>')});
