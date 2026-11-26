/* ===== H48 SPEED (2026-11-04, launch day): the old record sleeps until a round is asked for. build.py sets html.wc-pre before the
   page is parsed (as on the comic pages) and h48_show.css keeps X2+'s record carousel (114 cards, about 9,700 elements, laid out
   off screen) out of layout until then: on a 4x slower phone the cover lifted at 22 s with it laid out, about 5 s without.
   The round view (x2plus.js open(), patched by build.py's _WCPATCH) copies a record card, so it wakes the record first and opens
   once it is laid out; a press on a round link wakes it ahead of the tap, and so does a quiet moment a few seconds after the
   cover lifts. Waking fits the name labels and tied winners, as loading did. */
(function(){var H=document.documentElement;if(!H.classList.contains('wc-pre')||!H.classList.contains('h48'))return;
  var awake=false,started=false,q=[];
  function done(){awake=true;q.splice(0).forEach(function(f){try{f()}catch(e){}})}
  function wake(){if(started)return;started=true;H.classList.add('wc-rw');
    /* not the carousel's home: X6+ never shows the carousel, and scrolling it there measured every card again (1.8 s at 4x) */
    try{if(window.__x2pNmFitIn)window.__x2pNmFitIn()}catch(e){}
    try{if(window.__wcTiesFit)window.__wcTiesFit(document.getElementById('record'))}catch(e){}
    requestAnimationFrame(function(){requestAnimationFrame(done)})}
  /* true when the record is awake; else wakes it and calls back once it is */
  window.__wcRecWake=function(cb){if(awake)return true;if(cb)q.push(cb);wake();return false};
  addEventListener('pointerdown',function(e){var t=e.target;if(t&&t.closest&&t.closest('a[href^="#/round/"]'))wake()},{capture:true,passive:true});
  /* the quiet moment: 4 s after the cover lifts and 2.5 s after the last scroll, touch or key (laying the record out takes the main
     thread for a few seconds on a slow phone, so not while the visitor is moving through the page) */
  var last=0;['scroll','touchstart','pointerdown','keydown','wheel'].forEach(function(t){addEventListener(t,function(){last=Date.now()},{capture:true,passive:true})});
  function quiet(){if(started)return;var w=2500-(Date.now()-last);if(w>0){setTimeout(quiet,w+50);return}
    if(window.requestIdleCallback)requestIdleCallback(function(){if(Date.now()-last<2500)quiet();else wake()},{timeout:4000});else wake()}
  (function idle(){if(started)return;if(H.classList.contains('x2p-cur')){setTimeout(idle,500);return}setTimeout(quiet,4000)})()})();
