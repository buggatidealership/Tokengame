/* U1 · On-air strap: the site's own broadcast strap under the film, its bug the on-air dot. Two lines: what is happening today, when it is graded. */
(function(){var L=LV,s=lvState(),R=s.rounds,n=R.length,nx=lv4.next(),lines;
  if(s.k==="due")lines=["Today: 4 AIs call "+n+" stocks.","Graded at the next close."];
  else if(s.k==="bell")lines=[n+" graded at today’s close.",L.left()+" to the bell."];
  else if(s.k==="rung")lines=["The bell has rung on "+n+" stocks.","Results soon."];
  else lines=["Back "+nx.wd+": "+nx.R.length+" new calls.","New calls every weekday."];
  var d=document.createElement("div");d.className="lv4 lv4-u1 lv-"+s.k;d.setAttribute("aria-label",s.aria);
  d.innerHTML='<div class="x2p-strap"><span class="x2p-bug lv4-bug"><i class="lv-dot"></i>'+(s.on?"Live":s.k==="rung"?"Bell rung":"Off air")+'</span>'+
    '<ul class="x2o-ul lede"><li>'+lvE(lines[0])+'</li><li>'+lvE(lines[1])+'</li></ul><span class="lv4-lg">'+lvStack(R.length?R:nx.R,3)+'</span></div>';
  lv4.mount(d)})();
