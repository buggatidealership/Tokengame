/* U4 · The season tape: one mark per round of Season 1, in order. Graded rounds printed in ink,
   calls in half-printed, today's rounds lit, the rest blank. A season you are in the middle of. */
(function(){var L=LV,s=lvState(),today=L.today;
  var all=[].concat(ROUNDS.map(function(r){return {r:r,st:"g"}}),PENDING.map(function(r){return {r:r,st:"p"}}),UPCOMING.map(function(r){return {r:r,st:"u"}})).sort(function(a,b){return a.r.n-b.r.n});
  var marks=all.map(function(x){var r=x.r,c=x.st;if(c==="g"){var ok=r.calls.filter(function(q){return /^UP/.test(q[1])===(r.a>0)}).length;c+=ok*2>=r.calls.length?" ok":" ng"}
    if(c==="u"&&L.K(r.called)===today)c="t";if(c==="p"&&L.K(r.resolves)===L.bellKey&&s.k==="bell")c="t";return '<i class="lv4-m lv4-'+c.replace(" "," lv4-")+'"></i>'}).join("");
  var ks=all.map(function(x){return L.K(x.r.called)}).sort(),fmt=function(k){return L.kfmt(k).split(" ").slice(1).join(" ")};
  var right={due:"Today: "+s.n+" calls due",bell:"Graded today · "+L.left(),rung:"Bell rung · results soon",off:"Off air · back "+L.nextLabel.split(" ")[0]}[s.k];
  var d=document.createElement("div");d.className="lv4 lv4-u4 lv-"+s.k;d.setAttribute("aria-label","Season 1, week "+lv4.week()+": "+L.graded+" of "+L.total+" rounds graded. "+s.aria);
  d.innerHTML='<div class="lv4-sh"><b>Season 1 · Week '+lv4.week()+'</b><span>'+(s.k==="off"?"":'<i class="lv-dot"></i>')+lvE(right)+'</span></div>'+
    '<div class="lv4-tp" aria-hidden="true">'+marks+'</div><div class="lv4-sf"><span>'+fmt(ks[0])+'</span><span><b>'+L.graded+'</b> of '+L.total+' graded</span><span>'+fmt(ks[ks.length-1])+'</span></div>';
  lv4.mount(d)})();
