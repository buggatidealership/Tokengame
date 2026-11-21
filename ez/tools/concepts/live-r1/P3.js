/* P3 · Stamps on the record: the cards whose state changed at the last close or changes today carry a rubber stamp:
   "Graded Fri" on the newest results, "At the bell 2h 51m" on cards with calls in, "Calls due today" on today's rounds.
   They come off by themselves when the next close has passed (they are worked out from the dates, not kept). */
(function(){var L=LV,day=L.lastLabel.split(" ")[0];
  function stamp(n,cls,top,big,bot){var c=document.querySelector('#car .card[data-n="'+n+'"]');if(!c)return;var f=c.querySelector(".face.front .fin")||c;
    var s=document.createElement("span");s.className="lv-stp "+cls;s.setAttribute("aria-hidden","true");s.innerHTML='<small>'+top+'</small><b>'+big+'</b><small>'+bot+'</small>';f.appendChild(s);
    /* graded: the film's lower left, just above the winner bar; calls in or due: the right end of the "Calls are in" line */
    var art=f.querySelector(".art");if(/lv-stp-g/.test(cls)&&art){s.style.top=(art.offsetTop+art.offsetHeight-s.offsetHeight-10)+"px";s.style.left="10px"}
    else{var h=f.querySelector(".cin-h,.pdh,[class*=calls]");s.style.top="9px";s.style.right="6px";s.style.left="auto"}}
  L.lastBatch.forEach(function(r){stamp(r.n,"lv-stp-g","Fresh","Graded",day+" close")});
  L.atBell.forEach(function(u){stamp(u.n,"lv-stp-b","Bell in",L.left(),"calls locked")});
  L.waiting.forEach(function(u){stamp(u.n,"lv-stp-r","Bell rung","Results soon","")});
  L.due.forEach(function(u){stamp(u.n,"lv-stp-d","Today","Calls due","before the report")});
})();
