/* ===== GR7 THE GREEN ROOM (mockup, v51-gr-x6plus.html only; see gr7.css). The title card's cast are painted into the green room (media/
   gr7-title-34.jpg on phones, gr7-title-169.jpg from 1000px), so the Starring list becomes the fight-plate name tags the owner's film uses,
   set beside each fighter: the model's name (the subject), the founder is the face. Positions are measured on the two paintings, in % of the
   title card (the paintings cover it: phones 3/4 from the top, desktop 16/9 centred). ===== */
(function(){var W=window,d=document,H=d.documentElement;if(!H.classList.contains("gr7"))return;
/* model, phone x/y, desktop x/y, a small tilt, as the film's plates sit a little off true */
var NP=[["GROK","16%","87%","54%","64%","-3deg"],["CLAUDE","43%","82%","70%","50%","2deg"],["GPT","64%","88%","80%","65%","-2deg"],["KIMI","87%","67%","91%","43%","3deg"]];
(W.H48HOOK=W.H48HOOK||[]).push(function(root){
  var E=W.H48D,tc=root.querySelector(".h8-tc");if(!tc||tc.querySelector(".gr7-nps"))return;
  var box=d.createElement("div");box.className="gr7-nps";box.setAttribute("aria-hidden","true");
  box.innerHTML=NP.map(function(p){return '<span class="gr7-np" style="--x:'+p[1]+';--y:'+p[2]+';--xd:'+p[3]+';--yd:'+p[4]+';--r:'+p[5]+'">'+(E&&E.NAME?E.NAME[p[0]]:p[0])+'</span>'}).join("");
  tc.appendChild(box);
  /* the plates are marks on the painting, so they ride on a box laid exactly over the painting as background-size:cover places it
     (phones 3/4, desktop 16/9); wide desktops crop the painting top and bottom, and the plates follow the faces, not the card */
  var fit=function(){var r=tc.getBoundingClientRect(),w=r.width,h=r.height;if(!w||!h)return;
    var ar=matchMedia("(min-width:1000px)").matches?16/9:3/4,k=Math.max(w/ar,h),dw=ar*k,dh=k,
      bp=(getComputedStyle(tc).backgroundPosition.split(",")[0]||"50% 50%").trim().split(/\s+/),
      pos=function(v,free){return /%$/.test(v)?free*parseFloat(v)/100:parseFloat(v)||0};
    box.style.cssText="inset:auto;left:"+pos(bp[0],w-dw)+"px;top:"+pos(bp[1]||"50%",h-dh)+"px;width:"+dw+"px;height:"+dh+"px"};
  fit();if(W.ResizeObserver)new ResizeObserver(fit).observe(tc);else W.addEventListener("resize",fit);
  /* "AIs" keeps its small s when the lettering is set in capitals (the site's rule, x2plus.js .x2p-lc) */
  [].forEach.call(root.querySelectorAll(".h8-let .h8-lw"),function(w){if(w.textContent.trim()==="AIs"){var l=w.querySelectorAll(".h8-lc");if(l.length)l[l.length-1].classList.add("gr7-lc")}})});
})();
