/* C1 · L1 refined: one ticket, three panels torn along two perforations; the band holds the season and week only */
(function(){var c=r40,L=LV;
 var p=function(lb,red,ant,R,v,s,cls){return '<div class="r39-c'+(cls?" "+cls:"")+'"><span class="r39-lb'+(red?" rd":"")+'">'+(ant?r39.ant(c.s.on,"ink"):"")+lvE(lb)+'</span>'+(R.length?r39.logos(R,3):'<span class="r39-lgs"><span class="r39-k">·</span></span>')+'<span class="r39-v">'+v+'</span><span class="r39-s">'+lvE(s)+'</span></div>'};
 var inner='<div class="r39-in r39-3">'+p(c.last.lb,0,0,[c.r],lvE(c.last.v)+' <span class="'+(c.last.up?"up":"dn")+'">'+lvE(c.last.o)+'</span>',c.last.s)+
  p("Today",1,1,c.now.R,lvE(c.now.v),c.now.s,"r39-now")+p(c.next.lb,0,0,c.next.R,lvE(c.next.v),c.next.s)+'</div>';
 var d=document.createElement("div");d.className="r39 r40 r39-l1 r40-c1";d.innerHTML=r39.tk("r40-k1",inner,'<b class="r39-ko">Season 1 · Week '+c.wk+'</b>','<b class="r39-ko">'+c.foot+'</b>');
 lv4.mount(d);var t=d.querySelector(".r39-t");r39.dress(t);r40.cut(t,["33.333%","66.667%"])})();
