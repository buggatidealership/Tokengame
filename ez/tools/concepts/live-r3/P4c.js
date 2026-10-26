/* P4c · The week on the card, logos: five day stubs (Mon to Fri), each printed with up to four of that day's companies, the
   biggest first, and +k for the rest; today carries the on-air dot. No counts or season totals: a preview of what's next. */
(function(){var L=LV,s=lvState(),W=["Mon","Tue","Wed","Thu","Fri"],all=[].concat(ROUNDS,PENDING,UPCOMING);
  var d=document.createElement("section");d.className="lv-wk lv-wk3";d.id="lvwk";d.setAttribute("aria-label","This week on the card");
  var cells=L.week.map(function(x,i){var R=lvBig(all.filter(function(r){return L.K(r.called)===x.k})),t=x.k.split("-"),
      sh=R.slice(0,4),k=R.length-sh.length,cls=(x.today?" lv-wk-t lv-"+s.k:x.past?" lv-wk-p":"")+" lv-n"+sh.length,
      tag=x.today?'<em class="lv-wk-now"><i class="lv-dot"></i>'+(s.k==="rung"?"Bell rung":"Today")+'</em>':x.past&&R.length&&x.graded===x.n?'<em class="lv-wk-ok">✓ Graded</em>':'';
    return '<li class="lv-wk-d'+cls+'" aria-label="'+W[i]+" "+(+t[2])+": "+lvE(R.map(function(u){return u.co}).join(", ")||"no rounds")+'"><small>'+W[i]+" "+(+t[2])+'</small>'+
      '<span class="lv-wk-g">'+(sh.length?sh.map(function(u){return lvLogo(u,"lv-prt")}).join(""):'<span class="lv-wk-0">·</span>')+'</span>'+
      (k>0?'<span class="lv-wk-k">+'+k+'</span>':'<span class="lv-wk-k lv-wk-k0"></span>')+tag+'</li>'}).join("");
  var head={bell:'<i class="lv-dot"></i>Live · graded at the close · '+L.left(),due:'<i class="lv-dot"></i>Live · calls due today',rung:'<i class="lv-dot"></i>Bell rung · results soon',off:'Off air · back '+lvE(L.nextLabel)}[s.k];
  d.innerHTML='<div class="lv-wk-h lv-'+s.k+'"><span>'+head+'</span><b>'+(L.week.some(function(x){return x.today})?"This week":"Next week")+'</b></div><ol class="lv-wk-l">'+cells+'</ol>';
  var rec=document.querySelector("#record");rec.parentNode.insertBefore(d,rec);
  var p=document.querySelector(".lv-pill");if(p)p.setAttribute("href","#lvwk")})();
