/* F · The marquee: A's film ticket whose three frames are a picture house's letter boards, white slotted letters on black boards
   ("Last round", "Now showing", "Coming"); today's board is framed in bulbs that chase while on air and sit dark off air, so the
   marquee itself is the live mark */
(function(){var q=q41,f=q43;f.font("Bebas+Neue");
 var bd=function(lb,body){return '<span class="q43f-lb">'+lb+'</span><span class="q43f-bd">'+body+'</span>'};
 var last=bd("Last round",'<span class="q41-who">'+q.ai(q.who,"","#f3ead3")+'<b>'+lvE(q.whoT)+'</b></span>'+f.whoV()+'<span class="q41-s q41-on">'+f.on()+'</span>');
 var now=bd(q.on?"Now showing":"Dark tonight",(q.now.R.length?q.lg(q.now.R,3):'<span class="q41-lgs q41-nil"></span>')+'<span class="q41-v">'+lvE(q.now.v)+'</span><span class="q41-s">'+lvE(q.now.s)+'</span>');
 var nx=bd("Coming "+lvE(q.nx.wds),q.lg(q.nx.R,2)+'<span class="q41-v">'+lvE(q.next.v)+'</span><span class="q41-s">'+lvE(q.next.day)+'</span>');
 var d=f.make("q43-f",[last,now,nx],{perf:false});d.querySelector(".q42-t").classList.toggle("q43f-on",q.on);
 d.querySelector(".q42-t").insertAdjacentHTML("afterbegin",'<i class="q43f-bl q43f-b1" aria-hidden="true"></i><i class="q43f-bl q43f-b2" aria-hidden="true"></i>')})();
