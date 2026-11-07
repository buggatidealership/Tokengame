(function(){var O=window.__o||"1";
if(!document.getElementById('x2pcU')){var sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('width','0');sv.setAttribute('height','0');sv.style.position='absolute';
 var f=function(id,v){return '<filter id="'+id+'" x="-2%" y="-2%" width="104%" height="104%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="2" seed="21" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 '+v+'" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>'};
 sv.innerHTML=f('x2pcU','-2.2 1.9')+f('x2pcL','-1.2 1.6');document.body.appendChild(sv)}
document.querySelectorAll('.xc').forEach(function(x){if(x.dataset.mk)return;x.dataset.mk=1;x.classList.add('o'+O);if(window.__lite)x.classList.add('lite');
 /* the Winner tag as a PASS-style cartouche: ink frame, Anton, a crown in gold ink */
 x.querySelectorAll('.xc-wn').forEach(function(w){w.innerHTML='<svg viewBox="0 0 44 12" width="44" height="12" aria-hidden="true"><path d="M3.5 1H40.5L43 3.5V8.5L40.5 11H3.5L1 8.5V3.5Z" fill="none" stroke="#1d1a1e" stroke-width="1.2"/><g class="cr"><path d="M4.6 9.2L4 4L6.6 6.1L8.3 2.9L10 6.1L12.6 4L12 9.2Z" fill="#a87a1c"/></g><text x="28" y="8.6" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="7" letter-spacing=".7" fill="#1d1a1e">WINNER</text></svg><span class="sr">Winner</span>'});
 var sec=x.querySelector('.xc-sec'),mid=x.querySelector('.xc-mid'),dt=mid.querySelector('.xc-dt'),ds=dt.querySelectorAll('.xc-d'),ft=x.querySelector('.xc-ft'),lc=document.createElement('div');lc.className='xc-lc';mid.insertBefore(lc,dt);lc.appendChild(dt);if(ft)lc.appendChild(ft);
 if(O==="1"||O==="2"){ds.forEach(function(d){d.classList.add('one')});sec.appendChild(ds[0])}
 if(O==="4"){ds.forEach(function(d){d.classList.add('one')});sec.remove();x.querySelectorAll('.xc-rk').forEach(function(r){r.remove()})}
});
setTimeout(function(){var x=document.querySelector('.card.cur .xc');if(!x)return;var R=function(s){var e=x.querySelector(s);return e&&e.getBoundingClientRect()};var o=R('.xc-out'),s=R('.xc-st'),q=x.getBoundingClientRect(),lc=R('.xc-lc');
 var tg=[].map.call(x.querySelectorAll('.xc-wn'),function(w){var r=w.getBoundingClientRect(),row=w.closest('.xc-r').getBoundingClientRect(),nm=w.closest('.xc-r').querySelector('.xc-nm').getBoundingClientRect();return [Math.round(r.top-row.top),Math.round(nm.top-r.bottom)]});
 window.__mkm={mkt2stamp:s&&Math.round(s.top-o.bottom),stamp2foot:s&&Math.round(q.bottom-s.bottom),mkt2left:lc&&Math.round(lc.top-o.bottom),tag:tg}},300);
})();
