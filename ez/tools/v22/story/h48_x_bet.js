/* round H49 "bet" (2026-11-04, owner, on the cliffhanger's signpost: the words floated over the boards in flat cream type and the countdown
   ran off the post; his arrows put the NVIDIA mark onto the top board and the countdown onto the middle one, and crossed out "At the close /
   Nov 18"). The bet now lives in the signpost's three painted wooden boards (media/h48-cliff.jpg, blank in the painting):
     top board     the NVIDIA mark painted on the upper plank beside "Bet #1", "NVIDIA" carved into the lower plank;
     middle board  "Time left" and the live countdown (h48_ov.js's own #h8cd and its ticking code, moved in, never re-made);
     bottom board  "Bet size: 69%" / "of creator fees" (the share from SIM.poolShare), the line that says where the bet's money comes from.
   The words are carved into the wood: dark letters, darker at the top of the cut, with a light lower lip. Each board is a box laid out at the
   board's own on-screen size and mapped onto its quad, measured on the 1280 x 960 painting (one 4:3 crop on phones and desktop), by a
   homography (matrix3d), so the lettering follows each board's tilt and perspective and nothing inside the box can cross the board's edge.
   Each line steps down from its CSS size in one measurement if it would not fit. The chest's 69% plate (.h8-plq) is untouched. */
(function(){var W=window,d=document,H=d.documentElement;if(!H.classList.contains("h48"))return;
/* the boards' corners on the painting: top-left, top-right, bottom-right, bottom-left, inset a little inside the painted rough edges */
var Q=[[[52,69],[421,106],[424,226],[53,209]],
       [[54,265],[428,294],[432,405],[60,393]],
       [[63,474],[438,455],[440,558],[71,600]]];
var IMW=1280;
/* the projective map of a w x h box onto a quad (Heckbert's square-to-quad, scaled), as a CSS matrix3d */
function m3d(w,h,q){var x0=q[0][0],y0=q[0][1],x1=q[1][0],y1=q[1][1],x2=q[2][0],y2=q[2][1],x3=q[3][0],y3=q[3][1],
  dx1=x1-x2,dx2=x3-x2,dx3=x0-x1+x2-x3,dy1=y1-y2,dy2=y3-y2,dy3=y0-y1+y2-y3,a,b,c,e,f,g,gg,hh;
  if(Math.abs(dx3)<1e-9&&Math.abs(dy3)<1e-9){a=x1-x0;b=x2-x1;e=y1-y0;f=y2-y1;gg=0;hh=0}
  else{var den=dx1*dy2-dx2*dy1;gg=(dx3*dy2-dx2*dy3)/den;hh=(dx1*dy3-dx3*dy1)/den;a=x1-x0+gg*x1;b=x3-x0+hh*x3;e=y1-y0+gg*y1;f=y3-y0+hh*y3}
  c=x0;g=y0;
  var M=[a/w,b/h,c, e/w,f/h,g, gg/w,hh/h,1];
  return "matrix3d("+[M[0],M[3],0,M[6], M[1],M[4],0,M[7], 0,0,1,0, M[2],M[5],0,M[8]].map(function(v){return +v.toFixed(8)}).join(",")+")"}
function len(p,q){return Math.hypot(q[0]-p[0],q[1]-p[1])}

(W.H48HOOK=W.H48HOOK||[]).push(function(root){
  var fig=root.querySelector(".h8-cliff");if(!fig||fig.querySelector(".h49-bd"))return;
  var esc=W.H48UI.esc,NV=(W.CO_LOGOS||{}).NVDA,cd=d.getElementById("h8cd");if(!cd)return;
  var P=Math.round(((W.SIM&&SIM.poolShare)!=null?SIM.poolShare:.69)*100);
  var lg=NV&&NV.f?'<span class="h49-lg" aria-hidden="true"><img src="media/'+esc(NV.f)+'" alt="" decoding="async"></span>':'';
  fig.insertAdjacentHTML("beforeend",
    '<div class="h49-bd h49-bd1" aria-hidden="true"><div class="h49-ln h49-l1">'+lg+'<span class="h49-cv h49-lb">Bet #1</span></div><div class="h49-ln h49-l2"><span class="h49-cv h49-big">NVIDIA</span></div></div>'+
    '<div class="h49-bd h49-bd2" aria-hidden="true"><div class="h49-ln h49-l1"><span class="h49-cv h49-lb">Time left</span></div><div class="h49-ln h49-l2 h49-cdw"></div></div>'+
    '<div class="h49-bd h49-bd3" aria-hidden="true"><div class="h49-ln h49-l1"><span class="h49-cv h49-md">Bet size: <b>'+P+'%</b></span></div><div class="h49-ln h49-l2"><span class="h49-cv h49-md">of creator fees</span></div></div>');
  /* the countdown element itself moves in, so h48_ov.js's tick() keeps writing to it */
  var cdw=fig.querySelector(".h49-cdw");cd.classList.add("h49-cv","h49-cd");cdw.appendChild(cd);
  [].forEach.call(fig.querySelectorAll(".h8-pk"),function(p){p.remove()});
  /* the figure reads as one picture; its name now carries the signpost's words (the countdown is in the text under it) */
  fig.setAttribute("aria-label","A signpost: Bet #1, NVIDIA; time left on the countdown; bet size, "+P+"% of creator fees. Beside it the pool, a chest of coins, teeters on a cliff edge.");
  var bds=[].slice.call(fig.querySelectorAll(".h49-bd"));

  /* lay each board out at its on-screen size, map it onto its quad, then fit its lines (all reads, then all writes) */
  var lastW=0;
  function lay(force){var fw=fig.clientWidth;if(!fw||(!force&&fw===lastW))return;lastW=fw;var k=fw/IMW;
    bds.forEach(function(el,i){var q=Q[i].map(function(p){return [p[0]*k,p[1]*k]}),
      w=(len(q[0],q[1])+len(q[3],q[2]))/2,h=(len(q[0],q[3])+len(q[1],q[2]))/2;
      el.style.width=w.toFixed(2)+"px";el.style.height=h.toFixed(2)+"px";el.style.setProperty("--h",h.toFixed(2)+"px");el.style.transform=m3d(w,h,q)});
    fit()}
  function fit(){var ls=[].slice.call(fig.querySelectorAll(".h49-ln"));
    ls.forEach(function(l){l.style.fontSize=""});
    var r=ls.map(function(l){return [l.clientWidth,l.scrollWidth,parseFloat(getComputedStyle(l).fontSize)]});
    ls.forEach(function(l,i){var a=r[i];if(a[0]&&a[1]>a[0])l.style.fontSize=(Math.floor(a[2]*(a[0]-1)/a[1]*4)/4)+"px"})}
  lay(true);
  if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){lay(true)});
  if("ResizeObserver" in W)new ResizeObserver(function(){lay()}).observe(fig);else W.addEventListener("resize",function(){lay()});
  /* the countdown changes length rarely (days 15 -> 9, seconds dropped with reduced motion): refit only then */
  var cl=cd.textContent.length;
  new MutationObserver(function(){var n=cd.textContent.length;if(n!==cl){cl=n;fit()}}).observe(cd,{childList:true,characterData:true,subtree:true});
});
})();
