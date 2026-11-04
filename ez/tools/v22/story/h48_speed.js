/* ===== H48 SPEED (2026-11-04, launch day): the old record sleeps until a round is asked for. build.py sets html.wc-pre before the
   page is parsed (as on the comic pages) and h48_show.css keeps X2+'s record carousel (114 cards, about 9,700 elements, laid out
   off screen) out of layout until then: on a 4x slower phone the cover lifted at 22 s with it laid out, about 5 s without.
   The round view (x2plus.js open(), patched by build.py's _WCPATCH) copies a record card, so it wakes the record first and opens
   once it is laid out; a press on a round link wakes it ahead of the tap, and so does a quiet moment a few seconds after the
   cover lifts. Waking does what loading did for it: the carousel back on its card, the name labels and tied winners fitted. */
(function(){var H=document.documentElement;if(!H.classList.contains('wc-pre')||!H.classList.contains('h48'))return;
  var awake=false,started=false,q=[];
  function done(){awake=true;q.splice(0).forEach(function(f){try{f()}catch(e){}})}
  function wake(){if(started)return;started=true;H.classList.add('wc-rw');
    try{if(window.__wcCarHome)window.__wcCarHome()}catch(e){}
    try{if(window.__x2pNmFitIn)window.__x2pNmFitIn()}catch(e){}
    try{if(window.__wcTiesFit)window.__wcTiesFit(document.getElementById('record'))}catch(e){}
    requestAnimationFrame(function(){requestAnimationFrame(done)})}
  /* true when the record is awake; else wakes it and calls back once it is */
  window.__wcRecWake=function(cb){if(awake)return true;if(cb)q.push(cb);wake();return false};
  addEventListener('pointerdown',function(e){var t=e.target;if(t&&t.closest&&t.closest('a[href^="#/round/"]'))wake()},{capture:true,passive:true});
  (function idle(){if(started)return;if(H.classList.contains('x2p-cur')){setTimeout(idle,500);return}
    setTimeout(function(){if(window.requestIdleCallback)requestIdleCallback(wake,{timeout:8000});else wake()},4000)})()})();
