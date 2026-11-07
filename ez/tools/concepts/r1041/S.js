/* S · The scorebug: the strip as a broadcast's score graphic, in the logo's black with its green and red slashes: the corner bug ("On
   air", its lamp blinking; grey "Off air"), the season and the round count, three cells (Last round, Today, Next) with the companies on
   small cream discs, and along the foot the Season 1 bar running out to NVIDIA's bet */
(function(){var q=q41,C=function(lb,inner,cls){return '<div class="q41-s-c '+(cls||"")+'"><span class="q41-lb">'+lb+'</span>'+inner+'</div>'};
 var ai={GPT:"#f3ead3",KIMI:"#f3ead3",GROK:"#f3ead3",CLAUDE:"#e58a69"}[q.who];
 var d=document.createElement("div");d.className="q41 q41-s q41-dkg";
 d.innerHTML='<div class="q41-s-p"><div class="q41-s-hd">'+q.mark("bg",q.on)+'<span class="q41-s-t">Season 1 <i>·</i> Week '+q.wk+'</span><span class="q41-s-n"><b>'+q.graded+'</b>/'+q.total+'</span></div>'+
  '<div class="q41-s-cs">'+
   C(q.last.lb,'<span class="q41-who">'+q.ai(q.who,"",ai)+'<b>'+lvE(q.whoT)+'</b></span><span class="q41-v '+(q.pn>=0?"q41-up":"q41-dn")+'">'+q.usd(q.pn)+'</span><span class="q41-s q41-on">on '+lvLogo(q.r,"q41-lg q41-lg-s")+lvE(q.r.ticker)+'</span>')+
   C("Today",(q.now.R.length?q.lg(q.now.R,3):'<span class="q41-lgs q41-nil"></span>')+'<span class="q41-v">'+lvE(q.now.v)+'</span>',"q41-s-td")+
   C(lvE(q.next.lb),q.lg(q.nx.R,2)+'<span class="q41-v">'+lvE(q.next.v)+'</span>')+'</div>'+
  '<div class="q41-s-ft">'+q.bar("q41-s-bar")+'<span>NVDA ★</span></div></div>';
 lv4.mount(d)})();
