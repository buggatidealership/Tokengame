/* r1042 shared (owner, 2026-10-28, on round 41: "I like the film strip one... if you could turn that into a ticket"; the cards' colours:
   green top, beige middle, red bottom; the pill only says on air or off air). Builds on q41 (r1041/_d.js) and r39.tk (r1039/_r39.js). */
window.q42=(function(){var q=q41;
 var lst=function(v){var o=[],dp=0,st=0;for(var i=0;i<v.length;i++){var c=v[i];if(c==="(")dp++;else if(c===")")dp--;else if(c===","&&!dp){o.push(v.slice(st,i).trim());st=i+1}}o.push(v.slice(st).trim());return o};
 var full=function(v,n){var a=lst(v),o=[];for(var i=0;i<n;i++)o.push(a[i%a.length]);return o};
 var svg=function(s){return "url(\"data:image/svg+xml,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg'><defs>"+s+"</defs><rect width='100%' height='100%' fill='url(#p)'/></svg>")+"\")"};
 /* sprocket holes (rounded rectangles every 13px) and a perforation column (round holes every 6.5px) */
 var ROW=svg("<pattern id='p' width='13' height='7' patternUnits='userSpaceOnUse'><rect x='3.5' width='6' height='7' rx='1.3'/></pattern>"),
     COL=svg("<pattern id='p' width='8' height='6.5' patternUnits='userSpaceOnUse'><circle cx='4' cy='3.25' r='1.75'/></pattern>");
 /* cut: put layers first in the die's mask list, XORed onto it, so outside each layer the die is untouched (paper and both shadows) */
 var cut=function(t,L){[t.querySelector(".bt-pp"),t.querySelector(".bt-sh>i"),t.querySelector(".bt-hs")].forEach(function(e){if(!e)return;var cs=getComputedStyle(e),im=lst(cs.maskImage),n=im.length,P=function(p){return full(cs[p],n)},m=function(k){return L.map(function(l){return l[k]})};
   e.style.setProperty("mask-image",m("i").concat(im).join(", "));e.style.setProperty("mask-size",m("s").concat(P("maskSize")).join(", "));
   e.style.setProperty("mask-position",m("p").concat(P("maskPosition")).join(", "));e.style.setProperty("mask-repeat",L.map(function(){return "no-repeat"}).concat(P("maskRepeat")).join(", "));
   e.style.setProperty("mask-composite",L.map(function(){return "exclude"}).concat(P("maskComposite")).join(", "));
   e.style.setProperty("mask-origin",L.map(function(){return "border-box"}).concat(P("maskOrigin")).join(", "));e.style.setProperty("mask-clip",L.map(function(){return "border-box"}).concat(P("maskClip")).join(", "))})};
 var row=function(y){return {i:ROW,s:"calc(100% - 26px) 7px",p:"13px "+y}},col=function(x){return {i:COL,s:"8px calc(100% - var(--st) - var(--sb) - 6px)",p:"calc("+x+" - 4px) calc(var(--st) + 3px)"}};
 /* the three frames' content, as round 41's film strip */
 var last='<span class="q41-lb">'+q.last.lb+'</span><span class="q41-who">'+q.ai(q.who)+'<b>'+lvE(q.whoT)+'</b></span><span class="q41-v '+(q.pn>=0?"q41-up":"q41-dn")+'">'+q.usd(q.pn)+'</span><span class="q41-s q41-on">on '+lvLogo(q.r,"q41-lg q41-lg-s")+lvE(q.r.ticker)+'</span>',
     now=function(k){return q.mark(k||"lx",q.on)+(q.now.R.length?q.lg(q.now.R,3):'<span class="q41-lgs q41-nil"></span>')+'<span class="q41-v">'+lvE(q.now.v)+'</span><span class="q41-s">'+lvE(q.now.s)+'</span>'},
     next='<span class="q41-lb">'+lvE(q.next.lb)+'</span>'+q.lg(q.nx.R,2)+'<span class="q41-v">'+lvE(q.next.v)+'</span><span class="q41-s">'+lvE(q.next.day)+'</span>';
 var head='<b class="q42-bw">Season 1 · Week '+q.wk+'</b>',foot='<b class="q42-bw">Season 1</b>'+q.bar("q42-bb")+'<b class="q42-bw"><u>'+q.graded+'</u>/'+q.total+' · NVDA ★</b>';
 return {cut:cut,row:row,col:col,last:last,now:now,next:next,head:head,foot:foot,
  /* the bet's stock without its fibres and sunburst */
  paper:function(t){r39.dress(t)}}})();
