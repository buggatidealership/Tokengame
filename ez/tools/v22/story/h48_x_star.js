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
/* one painted stake each (their stubs differ in length: the shorter ones go to the marks nearest the foot of the painting) */
var STAKE={GPT:"media/h49-star-stake3.webp",CLAUDE:"media/h49-star-stake1.webp",GROK:"media/h49-star-stake4.webp",KIMI:"media/h49-star-stake2.webp"};
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

/* the punchline holds one line: its size scales down from the CSS size by its own one-line width, in one measurement (a step-down loop
   forced a page layout per step before the cover lifts); floor 22px, below which it wraps, balanced */
function fit(tcw){var s2=tcw.querySelector(".h49-s2");if(!s2)return;
  s2.style.fontSize="";s2.style.textWrap="";s2.style.whiteSpace="nowrap";
  var av=s2.clientWidth,nd=s2.scrollWidth,fs=parseFloat(getComputedStyle(s2).fontSize);s2.style.whiteSpace="";
  if(!av||!nd)return;if(nd>av){fs=Math.floor(fs*(av-2)/nd*4)/4;if(fs<22){fs=22;s2.style.textWrap="balance"}s2.style.fontSize=fs+"px"}}

/* 2. the cast in the painting */
function stage(tcw,D){
  var tc=tcw.querySelector(".h8-tc"),old=tcw.querySelector(".h8-star");if(!tc||tc.querySelector(".h49-st"))return;
  var E=W.H48D,esc=W.H48UI.esc;
  var h='<div class="h49-st"><div class="h49-bn" aria-hidden="true"><img src="media/h49-star-banner.webp" alt="" width="700" height="457" decoding="async"><span class="h49-bt" id="h49stl">Starring</span></div>'+
    '<ul class="h49-cast" aria-labelledby="h49stl">'+BILL.map(function(m,i){var f=FIG[m];
      return '<li class="h49-f h49-'+m.toLowerCase()+'" style="--i:'+i+';--ar:'+f[1]+'"><span class="h49-sh" aria-hidden="true"></span>'+
        '<span class="h49-pop"><img src="'+f[0]+'" alt="" width="'+Math.round(330*f[1])+'" height="330" decoding="async"></span>'+
        '<span class="h49-nm"><img src="'+STAKE[m]+'" alt=""><b>'+esc(E.NAME[m])+'</b></span></li>'}).join("")+'</ul></div>';
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

/* the entrance: once, the first time the cast is really on screen: after the cover lifts, in a visible tab, with no round view open over
   the Overview (a shared #/round/N link opens over it), and the figures at least 60% inside the window (above the desktop crawl) */
function intro(st){
  if(!st||still()||!("IntersectionObserver" in W))return;
  st.classList.add("h49-wait");
  var io,on=false,figs=[].slice.call(st.querySelectorAll(".h49-f")),
    lifted=function(){return !H.classList.contains("x2p-cur")},
    /* a round view is open while #x2pRm is in the page (closing it can leave the address on #/round/N, so the address only counts until then) */
    gone=false,had=false,round=function(){var o=d.getElementById("x2pRm");if(o)had=true;return !!o||(!gone&&/^#\/round\//.test(location.hash||""))},
    vis=function(){var r=figs[0].getBoundingClientRect(),vh=(W.innerHeight||0)-(W.matchMedia("(min-width:1000px)").matches?50:0);
      return r.width>0&&r.top<vh-r.height*.6&&r.bottom>r.height*.6},
    go=function(){if(on)return;on=true;if(io)io.disconnect();
      st.classList.add("h49-go");st.classList.remove("h49-wait");
      /* after the last stake's nod nothing animates any more */
      var end=function(){st.classList.add("h49-done")},last=st.querySelector(".h49-f:last-child .h49-nm");
      if(last)last.addEventListener("animationend",end,{once:true});setTimeout(end,6000)},
    check=function(){if(!on&&lifted()&&!d.hidden&&!round()&&vis())go()};
  io=new IntersectionObserver(check,{threshold:[0,.6,1]});figs.forEach(function(f){io.observe(f)});
  var mo=new MutationObserver(function(){if(on)return mo.disconnect();if(had&&!d.getElementById("x2pRm")){gone=true;had=false;setTimeout(check,300)}});
  mo.observe(d.body,{childList:true});
  W.addEventListener("hashchange",function(){setTimeout(check,400)});d.addEventListener("visibilitychange",check);
  (function wait(){if(on)return;if(lifted())return check();setTimeout(wait,200)})();
  if(mq){var mc=function(){if(mq.matches){on=true;st.classList.remove("h49-wait");st.classList.add("h49-done");if(io)io.disconnect()}};
    if(mq.addEventListener)mq.addEventListener("change",mc);else if(mq.addListener)mq.addListener(mc)}
}

(W.H48HOOK=W.H48HOOK||[]).push(function(root,D){
  var tcw=root.querySelector(".h8-tcw");if(!tcw)return;
  premise(tcw);
  var st=stage(tcw,D);
  place(tcw);fit(tcw);
  var lw=W.innerWidth;W.addEventListener("resize",function(){if(W.innerWidth!==lw){lw=W.innerWidth;fit(tcw)}});
  if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){fit(tcw)});
  if(W.matchMedia){var mm=W.matchMedia("(min-width:1000px)"),pl=function(){place(tcw);fit(tcw)};if(mm.addEventListener)mm.addEventListener("change",pl);else if(mm.addListener)mm.addListener(pl)}
  intro(st);
});
})();
