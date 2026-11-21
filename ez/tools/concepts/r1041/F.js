/* F · The film strip: the season as a reel running under the explainer film. Three frames on a strip of film with its sprocket holes lit
   from behind: the last round, today (an "On air" lightbox, the brightest frame), the next day (still dark, undeveloped); along the
   edge, where film prints its frame numbers, Season 1's rounds graded of all rounds to NVIDIA's bet */
(function(){var q=q41;
 var fr=function(cls,inner){return '<div class="q41-f-fr '+cls+'">'+inner+'</div>'};
 var last=fr("q41-f-l",'<span class="q41-lb">'+q.last.lb+'</span><span class="q41-who">'+q.ai(q.who)+'<b>'+lvE(q.whoT)+'</b></span><span class="q41-v '+(q.pn>=0?"q41-up":"q41-dn")+'">'+q.usd(q.pn)+'</span><span class="q41-s q41-on">on '+lvLogo(q.r,"q41-lg q41-lg-s")+lvE(q.r.ticker)+'</span>');
 var now=fr("q41-f-t",q.mark("lx",q.on)+(q.now.R.length?q.lg(q.now.R,3):'<span class="q41-lgs q41-nil"></span>')+'<span class="q41-v">'+lvE(q.now.v)+'</span><span class="q41-s">'+lvE(q.now.s)+'</span>');
 var nx=fr("q41-f-n",'<span class="q41-lb">'+lvE(q.next.lb)+'</span>'+q.lg(q.nx.R,2)+'<span class="q41-v">'+lvE(q.next.v)+'</span><span class="q41-s">'+lvE(q.next.day)+'</span>');
 var d=document.createElement("div");d.className="q41 q41-f";
 d.innerHTML='<div class="q41-f-s">'+last+now+nx+'<div class="q41-f-e"><span>Season 1</span>'+q.bar("q41-f-b")+'<span><b>'+q.graded+'</b>/'+q.total+' · NVDA ★</span></div></div>';
 lv4.mount(d)})();
