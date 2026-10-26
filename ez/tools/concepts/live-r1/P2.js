/* P2 · Freshness: a printed date line on the record and on the standings, worked out from the newest result date in the
   sheet ("Graded through Fri Oct 23's close"), and under the board what that close did to it. The sync time itself is not in
   ez-data.js: the third line shows where it would go, marked as needing sync_sheet.py to write SYNCED_AT. */
(function(){var L=LV,day=L.lastLabel,b=L.lastBatch;
  var rec=document.querySelector("#record .sh .tx");
  var nx=L.atBell.length?'Next: <b>'+L.atBell.length+' at the bell</b> · '+L.left():L.waiting.length?'<b>'+L.waiting.length+' results</b> due tonight':L.due.length?'Next: <b>'+L.due.length+' calls due today</b>':'Next: <b>'+L.nextDay.length+' calls</b> '+lvE(L.nextLabel);
  if(rec){var p=document.createElement("p");p.className="lv-fr";
    p.innerHTML='<span class="lv-fr-st">Graded through<b>'+lvE(day)+'</b>close</span><span class="lv-fr-tx"><b>'+L.graded+' cards</b>, newest R'+b[b.length-1].n+' '+lvE(b[b.length-1].co)+'.<br>'+nx+'</span>';
    rec.appendChild(p)}
  /* the close's effect on the board: each AI's calls that day, and whether the order changed */
  var per=L.stand.map(function(t){var n=0,ok=0;b.forEach(function(r){r.calls.forEach(function(c){if(c[0]===t.m){n++;if(/^UP/.test(c[1])===(r.a>0))ok++}})});return {t:t,n:n,ok:ok}});
  var moved=L.stand.filter(function(t){return t.move}).length;
  var ol=document.querySelector("#standings ol.lbl");
  if(ol){var d=document.createElement("div");d.className="lv-fb";
    d.innerHTML='<p class="lv-fb-h"><span class="lv-fr-st lv-fr-sm">As of<b>'+lvE(day)+'</b>close</span><span>'+(moved?moved+' AIs changed places':'Same order as before')+' · '+L.graded+' rounds</span></p>'+
      '<p class="lv-fb-r">'+per.map(function(x){return '<span>'+lvE(L.nm(x.t.m))+' <b class="'+(x.ok===x.n?'lv-ok':x.ok?'':'lv-no')+'">'+x.ok+'/'+x.n+'</b></span>'}).join("")+'</p>'+
      '<p class="lv-fb-need"><span>Synced 6:42 pm ET</span><em>Not true yet: needs SYNCED_AT written by sync_sheet.py</em></p>';
    ol.parentNode.insertBefore(d,ol)}
})();
