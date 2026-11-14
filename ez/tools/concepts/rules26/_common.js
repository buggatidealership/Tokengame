// shared by the rules26 mockups: runs in the page after the cover lifts. Reads the season ticket's own paper layers so the mockups
// use the real materials (the grained green band ink, the fine grain), the page's own rule lines, and the board's leader.
window.R26=(function(){var d=document;
 function layers(){var el=d.querySelector('#standings .stx-board .bt-pp');var bg=getComputedStyle(el).backgroundImage;return bg.split(/,(?=\s*(?:url|linear|radial|none|repeating|conic))/).map(function(s){return s.trim()})}
 function grain(){return layers().filter(function(l){return /baseFrequency%3D'1\.7'/.test(l)})[0]||'none'}
 function green(){return layers().filter(function(l){return /1f7a45/.test(l)})[0]||'none'}
 function rules(){return [].map.call(d.querySelectorAll('#standings .x2p-strap li'),function(l){return l.textContent.trim()})}
 function leader(){var r=d.querySelector('#standings .stx-board .stx-r');if(!r)return {};var n=r.querySelector('em'),p=r.querySelector('.stx-pl');
   var t=n?n.textContent.trim():'';return {name:t.charAt(0)+t.slice(1).toLowerCase(),pl:p?p.textContent.trim():''}}
 function evid(){var P=window.__x2pPnl&&window.__x2pPnl(),n=0;if(P)for(var m in P.A)n+=P.A[m].W+P.A[m].L;
   var g=ROUNDS.filter(function(r){return typeof r.a==='number'&&!isNaN(r.a)}),last=g[g.length-1];return {trades:n,rounds:g.length,last:last}}
 function css(t){var s=d.createElement('style');s.textContent=t;d.head.appendChild(s)}
 function hideStrap(){var s=d.querySelector('#standings .x2p-strap');if(s)s.style.display='none';return s}
 var INK='rgba(20,18,23,.88)',LIP='0 1px 0 rgba(255,255,255,.6),0 -1px 0 rgba(0,0,0,.2)';
 return {layers:layers,grain:grain,green:green,rules:rules,leader:leader,evid:evid,css:css,hideStrap:hideStrap,INK:INK,LIP:LIP}})();
