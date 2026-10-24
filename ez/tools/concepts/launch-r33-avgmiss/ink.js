/* Round 35 (owner, 2026-10-24: keep the target, "the white and the red... just make it part of the environment", the way GROK is part of
   the paper): the same rings, the same holes, re-printed. No ring is laid over another (each band is its own ring of ink, so nothing
   stacks), no dark outlines, white ink and red ink that let the card's grain through, and the ink's slightly rough edge (#xptInk) */
var P=window.__r35press;
document.querySelectorAll('#learn .x2p-pt .pt-tg figure>svg').forEach(function(sv,j){var g=sv.querySelector('g[filter]');if(!g||sv.dataset.r35)return;sv.dataset.r35=1;
  var C=73,R=60,nums=[].slice.call(g.querySelectorAll('text')).map(function(t){return t.outerHTML}).join(''),
    band=function(r0,r1,col){var m=(r0+r1)/2,w=r1-r0;return r0===0?'<circle cx="'+C+'" cy="'+C+'" r="'+r1+'" fill="'+col+'"/>':'<circle cx="'+C+'" cy="'+C+'" r="'+m+'" fill="none" stroke="'+col+'" stroke-width="'+w+'"/>'};
  var white='<g class="r35w" opacity=".62">'+band(R/4,R/2,'#fffbf1')+band(3*R/4,R,'#fffbf1')+'</g>',
    red='<g class="r35r" opacity=".86" style="mix-blend-mode:multiply">'+band(0,R/4,'#c2261d')+band(R/2,3*R/4,'#c2261d')+'</g>',
    hair='<path d="M'+(C-R)+','+C+'H'+(C+R)+'M'+C+','+(C-R)+'V'+(C+R)+'" stroke="rgba(40,16,12,.28)" stroke-width=".5" style="mix-blend-mode:multiply"/>';
  var n=document.createElementNS('http://www.w3.org/2000/svg','g');n.setAttribute('filter','url(#xptInk)');n.innerHTML=white+red+hair+nums;
  g.parentNode.replaceChild(n,g);if(P)sv.classList.add('r35p')});
