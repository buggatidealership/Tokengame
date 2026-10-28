/* R · The receipt: the season printing as it happens (the site's "receipts included"). A till roll with torn zigzag ends, a level meter
   that dances on air, three lines with dotted leaders (Last round, Today, Next), and the Season 1 bar as a barcode: one bar per round,
   graded in ink, today's in red, the rest still blank, NVIDIA's bet the last bar in gold */
(function(){var q=q41;
 var row=function(lb,mid,val,cls){return '<div class="q41-r-row '+(cls||"")+'"><span class="q41-lb">'+lb+'</span><span class="q41-r-mid">'+mid+'</span><i class="q41-r-dt"></i><span class="q41-r-val">'+val+'</span></div>'};
 var bars="",all=[].concat(ROUNDS,PENDING,UPCOMING),g=q.graded,t=(q.s.k==="due"||q.s.k==="bell")?q.now.R.length:0;
 for(var i=0;i<q.total;i++)bars+='<i class="'+(i===q.total-1?"nv":i<g?"g":i<g+t?"t":"")+'"></i>';
 var d=document.createElement("div");d.className="q41 q41-r";
 d.innerHTML='<div class="q41-r-p"><div class="q41-r-hd"><span>$EZ · Season 1 · Week '+q.wk+'</span>'+q.mark("me",q.on)+'</div>'+
  row(q.last.lb,q.ai(q.who)+'<b>'+lvE(q.whoT)+'</b> on '+lvLogo(q.r,"q41-lg q41-lg-s")+lvE(q.r.ticker),'<span class="q41-v '+(q.pn>=0?"q41-up":"q41-dn")+'">'+q.usd(q.pn)+'</span>')+
  row("Today",q.now.R.length?q.lg(q.now.R,3):"",'<span class="q41-v">'+lvE(q.now.v)+'</span>',"q41-r-td")+
  row(lvE(q.next.lb),q.lg(q.nx.R,2),'<span class="q41-v">'+lvE(q.next.v)+'</span>')+
  '<div class="q41-r-bc" aria-hidden="true">'+bars+'</div>'+
  '<div class="q41-r-ft"><span><b>'+g+'</b> of '+q.total+' rounds graded</span><span>Bet #1: NVDA ★</span></div></div>';
 lv4.mount(d)})();
