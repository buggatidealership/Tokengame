/* L1 · Then · Now · Next: one ticket in three panels torn along two perforations: the last result, what is on today (the antenna lit
   when live), what comes next. Green band: the week; red band: the rule of the game. */
(function(){var L=LV,s=lvState(),R=s.rounds,nx=lv4.next(),r=lv4.last(),wk=r39.week();
 var nowV={due:R.length+" calls due",bell:L.left(),rung:"Bell rung",off:"Off air"}[s.k],
     nowS={due:"Graded at the close",bell:"to the bell",rung:"Results soon",off:"Back "+nx.wds}[s.k];
 var inner='<div class="r39-in r39-3">'+
  '<div class="r39-c"><span class="r39-lb">Last · '+lvE(L.kfmt(L.K(r.resolves),{date:false}))+'</span>'+r39.logos([r],1)+
   '<span class="r39-v">'+lvE(L.short(r))+' <span class="'+(r.a>0?"up":"dn")+'">'+lvE(r.out)+'</span></span><span class="r39-s">'+lvE(lv4.win(r))+'</span></div>'+
  '<div class="r39-c r39-now"><span class="r39-lb rd">'+r39.ant(s.on,"ink")+'Today</span>'+(s.k==="off"?'<span class="r39-lgs"><span class="r39-k">·</span></span>':r39.logos(R,3))+
   '<span class="r39-v">'+lvE(nowV)+'</span><span class="r39-s">'+lvE(nowS)+'</span></div>'+
  '<div class="r39-c"><span class="r39-lb">Next · '+lvE(nx.wds)+'</span>'+r39.logos(nx.R,3)+'<span class="r39-v">'+nx.R.length+' calls</span><span class="r39-s">'+lvE(L.kfmt(nx.k))+'</span></div></div>';
 var d=document.createElement("div");d.className="r39 r39-l1";d.setAttribute("aria-label",s.aria);
 d.innerHTML=r39.tk("r39-k1",inner,'<b class="r39-ko">Season 1 · Week '+wk+'</b><span class="r39-side">'+r39.ant(s.on)+'<b class="r39-ko">'+(s.on?"Live":lvE(s.head))+'</b></span>','<b class="r39-ko">Called before the report. Graded at the close.</b>');
 lv4.mount(d);r39.dress(d.querySelector(".r39-t"),["66.667%"])})();
