/* D · A × the logo: A's film ticket set in the EZ. logo's language. Type in the logo's heavy italic (Kanit black italic); the frames are
   parted by the logo's own slashes (green before today, as the E's; red after it, as the Z's); today is the logo's black disc stretched
   into a slab, cream letters, gold figures, "On air" on a red slab; every head ends in the logo's gold square */
(function(){var q=q41,f=q43,sq='<i class="q43d-sq"></i>';
 var mk='<span class="q43d-on'+(q.on?" on":"")+'"><b>'+(q.on?"On air":"Off air")+'</b></span>';
 var head='<b class="q42-bw q43d-bw">Season 1 · Week '+q.wk+sq+'</b>',foot='<b class="q42-bw q43d-bw">Season 1</b>'+q.bar("q42-bb")+'<b class="q42-bw q43d-bw"><u>'+q.graded+'</u>/'+q.total+' · NVDA'+sq+'</b>';
 var slash=function(c){return '<svg class="q43d-sl q43d-'+c+'" viewBox="0 0 26 60" aria-hidden="true"><path d="M14 0h7L9 60H2z M23 8h3L16 52h-3z"/></svg>'};
 var d=f.make("q43-d",[f.lastP(),f.nowP(mk),f.nextP()],{head:head,foot:foot,perf:false,extra:slash("g")+slash("r")});
 /* each slash centred in the gap between two frames */
 var put=function(){var fs=d.querySelector(".q42-fs"),R=fs.getBoundingClientRect(),F=[].slice.call(fs.querySelectorAll(".q42-fr")).map(function(x){return x.getBoundingClientRect()});
  [[".q43d-g",0],[".q43d-r",1]].forEach(function(a){var s=fs.querySelector(a[0]),w=s.getBoundingClientRect().width;s.style.left=((F[a[1]].right+F[a[1]+1].left)/2-R.left-w/2).toFixed(1)+"px"})};
 put();if(document.fonts)document.fonts.ready.then(put);addEventListener("resize",put)})();
