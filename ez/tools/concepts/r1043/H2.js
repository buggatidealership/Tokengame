/* H2 · H with D's slashes either side of today's panel (green before, red after, as round 43's D) */
(function(){var q=q41,f=q43;f.font("Alfa+Slab+One");
 var burst='<span class="q43e-bu'+(q.on?" on":"")+'"><b>'+(q.on?"On<br>air":"Off<br>air")+'</b></span>';
 var head='<b class="q42-bw q43e-bw">Season 1 · Week '+q.wk+'</b>',foot='<b class="q42-bw q43e-bw">Season 1</b>'+q.bar("q42-bb")+'<b class="q42-bw q43e-bw"><u>'+q.graded+'</u>/'+q.total+' · NVDA ★</b>';
 var d=f.make("q43-e q43-h q43-h2",[f.lastP(),f.nowP(burst,"Today"),f.nextP()],{head:head,foot:foot});
 /* D's slashes either side of today: green before (the E's), red after (the Z's), each centred in its gap */
 var sl=function(c){return '<svg class="q43d-sl q43d-'+c+'" viewBox="0 0 26 60" aria-hidden="true"><path d="M14 0h7L9 60H2z M23 8h3L16 52h-3z"/></svg>'},fs=d.querySelector('.q42-fs');fs.insertAdjacentHTML('beforeend',sl('g')+sl('r'));
 var put=function(){var R=fs.getBoundingClientRect(),F=[].slice.call(fs.querySelectorAll('.q42-fr')).map(function(x){return x.getBoundingClientRect()});[['.q43d-g',0],['.q43d-r',1]].forEach(function(a){var s=fs.querySelector(a[0]),w=s.getBoundingClientRect().width;s.style.left=((F[a[1]].right+F[a[1]+1].left)/2-R.left-w/2).toFixed(1)+'px'})};put();if(document.fonts)document.fonts.ready.then(put);
 /* wood type: the count big, its word small under it */
 [].slice.call(d.querySelectorAll(".q42-t .q41-v,.q42-n .q41-v")).forEach(function(v){var m=/^(\d+)\s+(.*)$/.exec(v.textContent);if(m){v.classList.add("q43e-n");v.innerHTML="<b>"+m[1]+"</b><small>"+lvE(m[2])+"</small>"}})})();
