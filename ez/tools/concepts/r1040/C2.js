/* C2 · A strip of three tickets: three small tickets side by side, each its own die and its own green and red bands with its label,
   today's raised and a size up, the others a touch quieter */
(function(){var c=r40;
 var one=function(cls,lb,ant,R,v,s){return r39.tk("r40-k2 "+cls,'<div class="r39-in r40-b">'+(R.length?r39.logos(R,cls==="r40-td"?3:2):'<span class="r39-lgs"><span class="r39-k">·</span></span>')+'<span class="r39-v">'+v+'</span><span class="r39-s">'+lvE(s)+'</span></div>',
   '<span class="r39-side">'+(ant?r39.ant(c.s.on):"")+'<b class="r39-ko">'+lvE(lb)+'</b></span>','<b class="r39-ko">'+(cls==="r40-td"?"Season 1 · Week "+c.wk:"&nbsp;")+'</b>')};
 var d=document.createElement("div");d.className="r39 r40 r40-c2";
 d.innerHTML='<div class="r40-row">'+one("r40-ls",c.last.lb,0,[c.r],lvE(c.last.v)+' <span class="'+(c.last.up?"up":"dn")+'">'+lvE(c.last.o)+'</span>',c.last.s)+one("r40-td","Today",1,c.now.R,lvE(c.now.v),c.now.s)+one("r40-nx",c.next.lb,0,c.next.R,lvE(c.next.v),c.next.s)+'</div>'+
  '<p class="r40-ft">'+c.foot+'</p>';
 lv4.mount(d);[].slice.call(d.querySelectorAll(".r39-t")).forEach(function(t){r39.dress(t)})})();
