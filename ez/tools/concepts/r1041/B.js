/* B · The boarding pass: the season as a journey. The route runs from round 1 to NVIDIA's bet (the bet is the destination), its line the
   Season 1 bar, a marker where today is; three printed fields like a pass's (Last round, Today, Next); the tear-off stub carries the
   tally lamp and "On air" or "Off air" */
(function(){var q=q41,F=function(lb,inner,cls){return '<div class="q41-b-f '+(cls||"")+'"><span class="q41-lb">'+lb+'</span>'+inner+'</div>'};
 var first=ROUNDS.map(function(u){return LV.K(u.called)}).sort()[0];
 var d=document.createElement("div");d.className="q41 q41-b";
 d.innerHTML='<div class="q41-b-c"><div class="q41-b-m">'+
  '<div class="q41-b-hd"><span>Season 1 · Week '+q.wk+'</span><span>'+q.graded+' of '+q.total+' rounds</span></div>'+
  '<div class="q41-b-rt"><span class="q41-b-a"><b>R1</b><small>'+LV.kfmt(first).replace(/^\w+ /,"")+'</small></span>'+
   '<span class="q41-b-ln">'+q.bar("q41-b-bar")+'<i class="q41-b-here" style="left:'+(q.graded/q.total*100).toFixed(2)+'%"></i></span>'+
   '<span class="q41-b-z"><b>NVDA</b><small>Bet #1</small></span></div>'+
  '<div class="q41-b-fs">'+
   F(q.last.lb,'<span class="q41-who">'+q.ai(q.who)+'<b>'+lvE(q.whoT)+'</b></span><span class="q41-v '+(q.pn>=0?"q41-up":"q41-dn")+'">'+q.usd(q.pn)+'</span><span class="q41-s q41-on">on '+lvLogo(q.r,"q41-lg q41-lg-s")+lvE(q.r.ticker)+'</span>')+
   F("Today",(q.now.R.length?q.lg(q.now.R,3):'<span class="q41-lgs q41-nil"></span>')+'<span class="q41-v">'+lvE(q.now.v)+'</span>',"q41-b-td")+
   F(lvE(q.next.lb),q.lg(q.nx.R,2)+'<span class="q41-v">'+lvE(q.next.v)+'</span>')+'</div></div>'+
  '<div class="q41-b-st">'+q.mark("ty",q.on)+'</div></div>';
 lv4.mount(d)})();
