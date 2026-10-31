/* P4 · The week on the card: five day stubs (Mon to Fri of this week) under the film, each with its count of rounds by
   the day the calls are made; past days show how many are graded, today is lit, and the season's count closes the row. */
(function(){var L=LV,W=["Mon","Tue","Wed","Thu","Fri"];
  var d=document.createElement("section");d.className="lv-wk";d.setAttribute("aria-label","This week on the card");
  var cells=L.week.map(function(x,i){var t=x.k.split("-"),lab=W[i]+" "+(+t[2]),cls=x.today?" lv-wk-t":x.past?" lv-wk-p":"",
      sub=x.today?(L.atBell.length?"at the bell":x.inn?"calls in":x.n?"calls due":"none"):x.past?(!x.n?"none":x.graded===x.n?"✓ graded":x.graded+" of "+x.n+" graded"):(x.n?"on the card":"none yet");
    return '<li class="lv-wk-d'+cls+'"><small>'+lab+'</small><b>'+x.n+'</b><em>'+sub+'</em></li>'}).join("");
  d.innerHTML='<div class="lv-wk-h"><span>This week on the card</span><b>'+L.weekCalls+' rounds</b></div><ol class="lv-wk-l">'+cells+'</ol>'+
    '<p class="lv-wk-f"><b>'+L.graded+'</b> graded so far · <b>'+(L.pending)+'</b> with calls in · <b>'+L.upcoming+'</b> still to come</p>';
  var rec=document.querySelector("#record");rec.parentNode.insertBefore(d,rec);
})();
