/* L2 · The week on the card: Monday to Friday printed as five boxes on the ticket, each day's biggest companies stamped in, today's box
   lit by the antenna, a day fully graded stamped GRADED in red ink. The owner's earlier pick of direction ("the week on the card"). */
(function(){var L=LV,s=lvState(),all=[].concat(ROUNDS,PENDING,UPCOMING),W=["Mon","Tue","Wed","Thu","Fri"],wk=r39.week();
 var span=L.week.length?(function(){var a=L.week[0].k.split("-"),b=L.week[L.week.length-1].k.split("-"),M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return M[+a[1]-1]+" "+(+a[2])+" – "+(+b[2])})():"";
 var cells=L.week.map(function(x,i){var R=all.filter(function(r){return L.K(r.called)===x.k}),t=x.k.split("-"),done=R.length&&x.graded===R.length;
   return '<div class="r39-d'+(x.today?" r39-td":"")+(x.past?" r39-ps":"")+'"><span class="r39-lb'+(x.today?" rd":"")+'">'+(x.today?r39.ant(s.on,"ink"):"")+W[i]+" "+(+t[2])+'</span>'+
    (R.length?'<span class="r39-g">'+lvBig(R).slice(0,4).map(r39.logo).join("")+'</span>'+(R.length>4?'<span class="r39-k">+'+(R.length-4)+'</span>':'<span class="r39-k r39-k0"></span>'):'<span class="r39-g"><span class="r39-k">·</span></span><span class="r39-k r39-k0"></span>')+
    (done?'<em class="r39-gd">Graded</em>':"")+"</div>"}).join("");
 var d=document.createElement("div");d.className="r39 r39-l2";d.setAttribute("aria-label","This week: "+s.aria);
 d.innerHTML=r39.tk("r39-k2",'<div class="r39-in r39-wk">'+cells+"</div>",'<b class="r39-ko">Week '+wk+" · "+lvE(span)+'</b><span class="r39-side">'+r39.ant(s.on)+'<b class="r39-ko">'+(s.on?"Live":lvE(s.head))+'</b></span>','<b class="r39-ko">Called before the report</b><b class="r39-ko">Graded at the close</b>');
 lv4.mount(d);r39.dress(d.querySelector(".r39-t"))})();
