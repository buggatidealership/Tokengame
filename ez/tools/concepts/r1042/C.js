/* C · Cards on film: round 41's strip of film with its lit sprocket holes, and each frame a small card in the cards' colours (a green top
   band with its label, the beige, a red foot band with its line); today raised, the next card dimmed; the season bar as the edge print */
(function(){var q=q41,c=function(cls,lb,mid,ft){return '<div class="q42-cd '+cls+'"><span class="q42-ch">'+lb+'</span><span class="q42-cm">'+mid+'</span><span class="q42-cf">'+ft+'</span></div>'};
 var last=c("q42-l",q.last.lb,'<span class="q41-who">'+q.ai(q.who)+'<b>'+lvE(q.whoT)+'</b></span><span class="q41-v '+(q.pn>=0?"q41-up":"q41-dn")+'">'+q.usd(q.pn)+'</span>','on '+lvLogo(q.r,"q41-lg q41-lg-s q42-lgc")+lvE(q.r.ticker));
 var now=c("q42-t",q.mark("lx",q.on),(q.now.R.length?q.lg(q.now.R,3):'<span class="q41-lgs q41-nil"></span>')+'<span class="q41-v">'+lvE(q.now.v)+'</span>',lvE(q.now.s));
 var nx=c("q42-n",lvE(q.next.lb),q.lg(q.nx.R,2)+'<span class="q41-v">'+lvE(q.next.v)+'</span>',lvE(q.next.day));
 var d=document.createElement("div");d.className="q41 q42c";
 d.innerHTML='<div class="q42c-s">'+last+now+nx+'<div class="q42c-e"><span>Season 1</span>'+q.bar("q42c-b")+'<span><b>'+q.graded+'</b>/'+q.total+' · NVDA ★</span></div></div>';lv4.mount(d)})();
