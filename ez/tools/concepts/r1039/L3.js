/* L3 · The stub: the lightest take, one slim ticket stub under the film: the antenna lit on the stub, today's line pressed in, the day's
   biggest companies stamped beside it. No bands, so the film stays the star. */
(function(){var L=LV,s=lvState(),R=s.rounds,nx=lv4.next();
 var line={due:"Today: "+R.length+" calls due",bell:"Graded at the close · "+L.left(),rung:"Bell rung · results soon",off:"Off air · back "+nx.wds}[s.k],
     sub={due:"Graded at the close",bell:R.length+" rounds",rung:R.length+" rounds",off:nx.R.length+" calls on "+nx.wds}[s.k];
 var inner='<div class="r39-in r39-st"><span class="r39-stb">'+r39.ant(s.on,"ink")+'<b class="r39-v'+(s.on?" rd":"")+'">'+(s.on?"Live":"Off air")+'</b></span>'+
  '<span class="r39-bd"><span class="r39-v">'+lvE(line)+'</span><span class="r39-row">'+r39.logos(s.k==="off"?nx.R:R,5)+'<span class="r39-s">'+lvE(sub)+'</span></span></span></div>';
 var d=document.createElement("div");d.className="r39 r39-l3";d.setAttribute("aria-label",s.aria);d.innerHTML=r39.tk("r39-k3",inner,null,null);
 lv4.mount(d);r39.dress(d.querySelector(".r39-t"))})();
