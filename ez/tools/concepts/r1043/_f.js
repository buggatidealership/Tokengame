/* r1043 shared (owner, 2026-10-28: A of round 42 is the favourite, "more creative styles... carte blanche" on print and type; one may
   combine A with the EZ. logo). make(): A's ticket (the bet's die, green and red bands as the film's edges with sprocket holes) with the
   three frames given; a font link added on demand. */
window.q43=(function(){var e=q42,q=q41;
 var font=function(f){if(document.querySelector('link[data-q43="'+f+'"]'))return;var l=document.createElement("link");l.rel="stylesheet";l.dataset.q43=f;l.href="https://fonts.googleapis.com/css2?family="+f+"&display=swap";document.head.appendChild(l)};
 var make=function(cls,frames,o){o=o||{};
  var inner='<div class="r39-in q42-fs">'+frames.map(function(f,i){return '<div class="q42-fr '+["q42-l","q42-t","q42-n"][i]+'">'+f+'</div>'}).join("")+(o.extra||"")+'</div>';
  var d=document.createElement("div");d.className="r39 q41 q42 q43 "+cls;d.innerHTML=r39.tk("q42-k",inner,o.head||e.head,o.foot||e.foot);lv4.mount(d);
  var t=d.querySelector(".r39-t");e.paper(t);e.cut(t,[e.row("5px"),e.row("calc(100% - 5px)")].concat(o.perf===false?[]:[e.col("33.333%"),e.col("66.667%")]));return d};
 var whoV=function(){return '<span class="q41-v '+(q.pn>=0?"q41-up":"q41-dn")+'">'+q.usd(q.pn)+'</span>'},on=function(){return 'on '+lvLogo(q.r,"q41-lg q41-lg-s")+lvE(q.r.ticker)};
 return {font:font,make:make,whoV:whoV,on:on,
  lastP:function(lb){return '<span class="q41-lb">'+(lb||q.last.lb)+'</span><span class="q41-who">'+q.ai(q.who)+'<b>'+lvE(q.whoT)+'</b></span>'+whoV()+'<span class="q41-s q41-on">'+on()+'</span>'},
  nowP:function(mark,lb){return (lb?'<span class="q41-lb">'+lb+'</span>':"")+mark+(q.now.R.length?q.lg(q.now.R,3):'<span class="q41-lgs q41-nil"></span>')+'<span class="q41-v">'+lvE(q.now.v)+'</span><span class="q41-s">'+lvE(q.now.s)+'</span>'},
  nextP:function(lb){return '<span class="q41-lb">'+(lb||lvE(q.next.lb))+'</span>'+q.lg(q.nx.R,2)+'<span class="q41-v">'+lvE(q.next.v)+'</span><span class="q41-s">'+lvE(q.next.day)+'</span>'}}})();
