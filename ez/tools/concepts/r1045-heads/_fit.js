/* r1045: every strap line one line, like the page's fitRules/fitLines: all lines of a strap step down together by .25px until none wraps,
   never below the option's floor (data-h45min on <html>, default 10); a strap that cannot fit keeps its start size, wrapped */
window.__h45fit=function(){var d=document,mn=+(d.documentElement.getAttribute('data-h45min')||10),rep=[];
 var nl=function(l){var g=d.createRange();g.selectNodeContents(l);var t=[];[].forEach.call(g.getClientRects(),function(r){if(r.width&&!t.some(function(q){return Math.abs(q-r.top)<4}))t.push(r.top)});return t.length};
 d.querySelectorAll('section .x2p-strap').forEach(function(sp){var ls=[].slice.call(sp.querySelectorAll('li'));if(!ls.length)return;ls.forEach(function(l){l.style.removeProperty('font-size')});
  var z=parseFloat(getComputedStyle(ls[0]).fontSize),z0=z,n=0;
  while(ls.some(function(l){return nl(l)>1})&&z>mn&&n++<80){z-=.25;ls.forEach(function(l){l.style.setProperty('font-size',z+'px','important')})}
  if(ls.some(function(l){return nl(l)>1}))ls.forEach(function(l){l.style.removeProperty('font-size')});
  rep.push((sp.closest('section')||{}).id+':'+z0+'>'+parseFloat(getComputedStyle(ls[0]).fontSize)+(ls.some(function(l){return nl(l)>1})?' WRAP':''))});return rep};
