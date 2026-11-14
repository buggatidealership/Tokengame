/* U3 · The week on the card, under the film: five day stubs with the day's biggest companies, today with the dot (live-r3 P4c, slimmer). */
(function(){var L=LV,s=lvState(),W=["Mon","Tue","Wed","Thu","Fri"],all=[].concat(ROUNDS,PENDING,UPCOMING);
  var cells=L.week.map(function(x,i){var R=lvBig(all.filter(function(r){return L.K(r.called)===x.k})),t=x.k.split("-"),sh=R.slice(0,3),k=R.length-sh.length,
      cls=(x.today?" lv4-wt lv-"+s.k:x.past?" lv4-wp":"")+" lv4-n"+sh.length;
    return '<li class="lv4-wd'+cls+'"><small>'+(x.today?'<i class="lv-dot"></i>':'')+W[i]+" "+(+t[2])+'</small><span class="lv4-wg">'+(sh.length?sh.map(function(u){return lvLogo(u,"lv-prt")}).join(""):'·')+'</span>'+
      '<em>'+(k>0?"+"+k:"")+'</em></li>'}).join("");
  var head={bell:"Live · graded at the close · "+L.left(),due:"Live · calls due today",rung:"Bell rung · results soon",off:"Off air · back "+L.nextLabel}[s.k];
  var d=document.createElement("div");d.className="lv4 lv4-u3 lv-"+s.k;d.setAttribute("aria-label",(L.week.some(function(x){return x.today})?"This week":"Next week")+". "+s.aria);
  d.innerHTML='<div class="lv4-wh"><span>'+(s.k==="off"?'':'<i class="lv-dot"></i>')+lvE(head)+'</span><b>'+(L.week.some(function(x){return x.today})?"This week":"Next week")+'</b></div><ol class="lv4-wl">'+cells+'</ol>';
  lv4.mount(d)})();
