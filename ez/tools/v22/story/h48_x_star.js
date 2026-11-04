/* round H49 B "star" (2026-11-04, owner: "We track four AIs on every earnings trade, so you don't have to. I feel that one needs to stand out
   a bit more, because that's ultimately what we do"; and, on the Starring row: "you put this starring somewhere here [in the painting, by the
   road], and then you have small little... models of the characters, sort of show up here. So it's a funny way to introduce the models").
   The title card (.h8-tcw) as the show's opening:
   1. What we do, the loudest line after the title: lettered on the show's own cream plate (the painted master every card on the page is cut
      from), the substance in ink, the punchline "so you don't have to." in the title's own red lettering. On a phone it opens the green
      credits; from 1000px it sits in the title column under Season and Week, so it is on the first screen of a laptop, and the film button
      comes with it (the credits strip then has nothing left to say and goes).
   2. Starring, inside the painting: a painted parade banner stands across the road at the foot of the exchange's square (the spot the owner's
      arrow points at), "Starring" lettered on its cloth; the four cast members stand on the grass and the road edges at the owner's four marks,
      small toy-proportioned cels of the cast paintings (same faces, clothes and props: Sam's gold coin, Dario's notebook, Elon's rocket, Kimi's
      founder's helmet), each behind a little wooden stake with its name. The cast is a list named by the banner, so a screen reader hears
      "Starring, list: GPT, Claude, Grok, Kimi" once; the old Starring row is gone.
      The introduction is the joke: the first time the card is on screen (after the cover lifts), they pop up out of the grass one after
      another, in billing order, with a squash on landing, the way a Saturday-morning show introduces its cast; their stakes give a nod as
      each lands. Once only, then everything stands still. With reduced motion they simply stand there; nothing waits hidden.
   Positions are per painting (h48-title-34.jpg on phones, h48-title-169.jpg from 1000px), in percent of the painting, kept off the title
   lettering and the exchange. The figures and props are Hedra gpt-image-2 cels and gouache props cut from a flat ground
   (tools/concepts/worlds/cartoon/h49/star). Names come from H48D; the order is the credits' billing order.
   Media (written out so make_site.py copies them): media/h49-star-gpt.webp media/h49-star-claude.webp media/h49-star-grok.webp
   media/h49-star-kimi.webp media/h49-star-banner.webp media/h49-star-stake1.webp media/h49-star-stake2.webp media/h49-star-stake3.webp
   media/h49-star-stake4.webp */
(function(){var W=window,d=document,H=d.documentElement;if(!H.classList.contains("h48"))return;
var FIG={GPT:["media/h49-star-gpt.webp",.497],CLAUDE:["media/h49-star-claude.webp",.4545],GROK:["media/h49-star-grok.webp",.503],KIMI:["media/h49-star-kimi.webp",.5212]};
var STAKE=["media/h49-star-stake1.webp","media/h49-star-stake2.webp","media/h49-star-stake3.webp","media/h49-star-stake4.webp"];
var BILL=["GPT","CLAUDE","GROK","KIMI"];   /* the credits' billing order (the Starring row's order) */
var mq=W.matchMedia?matchMedia("(prefers-reduced-motion: reduce)"):null;
function still(){return !!(mq&&mq.matches)}

/* 1. the line: from the page's own sentence, split at its ", so " into the substance and the punchline */
function premise(tcw){
  var say=tcw.querySelector(".h8-cred .h8-say");if(!say||say.closest(".h49-pm"))return;
  var t=say.textContent.replace(/\s+/g," ").trim(),k=t.indexOf(", so "),U=W.H48UI,esc=U.esc;
  var pm=d.createElement("div");pm.className="h49-pm";
  var a=k>0?t.slice(0,k+1):t,b=k>0?t.slice(k+2):"";
  pm.innerHTML='<p class="h8-say h49-say"><span class="h49-s1">'+esc(a)+'</span>'+(b?' <span class="h8-sr">'+esc(b)+'</span><span class="h49-s2 h8-let" aria-hidden="true">'+esc(b)+'</span>':'')+'</p>';
  say.parentNode.replaceChild(pm,say);
  var s2=pm.querySelector(".h49-s2");if(s2){U.letter(s2,5,.55);s2.removeAttribute("aria-label")}
}

/* 2. the cast in the painting */
function stage(tcw,D){
  var tc=tcw.querySelector(".h8-tc"),old=tcw.querySelector(".h8-star");if(!tc||tc.querySelector(".h49-st"))return;
  var E=W.H48D,esc=W.H48UI.esc;
  var h='<div class="h49-st"><div class="h49-bn"><img src="media/h49-star-banner.webp" alt="" width="700" height="457" decoding="async"><span class="h49-bt" id="h49stl">Starring</span></div>'+
    '<ul class="h49-cast" aria-labelledby="h49stl">'+BILL.map(function(m,i){var f=FIG[m];
      return '<li class="h49-f h49-'+m.toLowerCase()+'" style="--i:'+i+';--ar:'+f[1]+'"><span class="h49-sh" aria-hidden="true"></span>'+
        '<span class="h49-pop"><img src="'+f[0]+'" alt="" width="'+Math.round(330*f[1])+'" height="330" decoding="async"></span>'+
        '<span class="h49-nm"><img src="'+STAKE[i]+'" alt=""><b>'+esc(E.NAME[m])+'</b></span></li>'}).join("")+'</ul></div>';
  tc.insertAdjacentHTML("beforeend",h);
  if(old)old.remove();
  return tc.querySelector(".h49-st")}

/* the premise and the film button move into the title column from 1000px (on a laptop's first screen), back to the credits below */
function place(tcw){
  var pm=tcw.querySelector(".h49-pm"),fl=tcw.querySelector(".h8-film"),inn=tcw.querySelector(".h8-tc .h8-in"),cr=tcw.querySelector(".h8-cred .h8-wrap>div");
  if(!pm||!inn||!cr)return;var desk=W.matchMedia("(min-width:1000px)").matches;
  if(desk){if(pm.parentNode!==inn){inn.appendChild(pm);if(fl)inn.appendChild(fl)}}
  else if(pm.parentNode!==cr){cr.insertBefore(pm,cr.firstChild);if(fl)cr.appendChild(fl)}
  tcw.classList.toggle("h49-dk",desk)}

/* the entrance: once, the first time the cast is on screen after the cover lifts */
function intro(st){
  if(!st||still()||!("IntersectionObserver" in W))return;
  st.classList.add("h49-wait");
  var io,go=function(){if(io)io.disconnect();st.classList.add("h49-go");st.classList.remove("h49-wait");
    /* after the last one lands nothing animates any more */
    setTimeout(function(){st.classList.add("h49-done")},2600)};
  var lifted=function(){return !H.classList.contains("x2p-cur")};
  var cast=st.querySelector(".h49-cast"),seen=false;
  io=new IntersectionObserver(function(es){seen=es[es.length-1].isIntersecting;if(seen&&lifted()&&!d.hidden)go()},{threshold:.6,rootMargin:"0px 0px -50px 0px"});
  io.observe(cast);
  (function wait(){if(st.classList.contains("h49-go"))return;if(lifted()){if(seen&&!d.hidden)go();return}setTimeout(wait,200)})();
  if(mq){var mc=function(){if(mq.matches){st.classList.remove("h49-wait");st.classList.add("h49-done");if(io)io.disconnect()}};
    if(mq.addEventListener)mq.addEventListener("change",mc);else if(mq.addListener)mq.addListener(mc)}
}

(W.H48HOOK=W.H48HOOK||[]).push(function(root,D){
  var tcw=root.querySelector(".h8-tcw");if(!tcw)return;
  premise(tcw);
  var st=stage(tcw,D);
  place(tcw);
  if(W.matchMedia){var mm=W.matchMedia("(min-width:1000px)"),pl=function(){place(tcw)};if(mm.addEventListener)mm.addEventListener("change",pl);else if(mm.addListener)mm.addListener(pl)}
  intro(st);
});
})();
