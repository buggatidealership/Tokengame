/* C4 · The conductor's punch: one ticket with a line across it and three punch marks: the last resolution punched clean through (the dark
   shows), today being punched (a red ring, the antenna), the next not punched yet (a dotted ring); each label and figure under its mark */
(function(){var c=r40;
 var stop=function(cls,lb,mark,R,v,s){return '<div class="r40-st '+cls+'"><span class="r40-mk">'+mark+'</span><span class="r39-lb'+(cls==="r40-s2"?" rd":"")+'">'+lvE(lb)+'</span>'+(R.length?r39.logos(R,3):"")+'<span class="r39-v">'+v+'</span><span class="r39-s">'+lvE(s)+'</span></div>'};
 var inner='<div class="r39-in r40-pn"><i class="r40-ln" aria-hidden="true"></i>'+stop("r40-s1",c.last.lb,"",[c.r],lvE(c.last.v)+' <span class="'+(c.last.up?"up":"dn")+'">'+lvE(c.last.o)+'</span>',c.last.s)+
  stop("r40-s2","Today",r39.ant(c.s.on,"ink"),c.now.R,lvE(c.now.v),c.now.s)+stop("r40-s3",c.next.lb,"",c.next.R,lvE(c.next.v),c.next.s)+'</div>';
 var d=document.createElement("div");d.className="r39 r40 r40-c4";d.innerHTML=r39.tk("r40-k4",inner,'<b class="r39-ko">Season 1 · Week '+c.wk+'</b>','<b class="r39-ko">'+c.foot+'</b>');
 lv4.mount(d);r39.dress(d.querySelector(".r39-t"))})();
