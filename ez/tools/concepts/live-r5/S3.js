/* S3 · The line score: a box score printed on the card, one column per week as a ballgame prints its innings. Calls and graded per week,
   this week's column lit, weeks ahead show how many calls are coming; the total at the end. */
(function(){var S=S5,s=lvState();
  function col(w){return w.n<S.now?"past":w.n===S.now?"now":"fut"}
  var hd=S.W.map(function(w){return '<th class="s3-'+col(w)+'">'+(w.n===S.now?'<i class="lv-dot"></i>':"")+w.n+'</th>'}).join(""),
    r1=S.W.map(function(w){return '<td class="s3-'+col(w)+(w.n===S.finWeek?" s3-f":"")+'">'+w.R.length+'</td>'}).join(""),
    r2=S.W.map(function(w){return '<td class="s3-'+col(w)+'">'+(w.n<=S.now||w.g?w.g:"")+'</td>'}).join("");
  var up=S.late?'<span class="lab">Final week · then <b>Season 2</b></span>':'<span class="lab">This week</span>'+lvStack(S.cur.big,4).replace(/lv-chip/g,"lv-prt")+'<span class="lab s3-fin">Week '+S.finWeek+': <b class="gold">NVIDIA · Bet #1</b></span>';
  var d=document.createElement("div");d.className="lv5 s3 lv-"+s.k+(S.late?" late":"");d.setAttribute("aria-label","Season 1, week "+S.now+" of "+S.weeks+". "+S.graded+" of "+S.total+" graded.");
  d.innerHTML='<div class="s3-c pp"><div class="s3-hd"><b class="val pr">Season 1</b><span class="lab">Week '+S.now+' of '+S.weeks+'</span></div>'+
   '<table class="s3-t"><thead><tr><th class="s3-k">Week</th>'+hd+'<th class="s3-tot">Tot</th></tr></thead><tbody>'+
   '<tr><th class="s3-k">Calls</th>'+r1+'<td class="s3-tot">'+S.total+'</td></tr><tr><th class="s3-k">Graded</th>'+r2+'<td class="s3-tot">'+S.graded+'</td></tr></tbody></table>'+
   '<div class="s3-up">'+up+'</div></div>';
  lv4.mount(d)})();
