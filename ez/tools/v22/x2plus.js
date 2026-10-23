/* EZ Live X2+ (owner, 2026-10-19): X2's words, with the decisions of 2026-10-19 on top. Runs after X2 has built the page.
   The first screen explains the concept, not the bet; NVIDIA sits under the chip as bet #1; "pool", not "pot"; the brand
   line drops "never edited" (a call changed after it was shown, 2026-10-14, as on X6). Numbers from ez-data.js (SIM). */
(function(){try{
  var $=function(s,r){return (r||document).querySelector(s)};
  var P=SIM.poolShare!=null?Math.round(SIM.poolShare*100):69;
  /* the first screen (owner, 2026-10-20, after seeing the live site: "keep it more simple"): three bullets, the last one
     splitting into the two outcomes. Replaced the four numbered steps (and the picture pass on them). "Liquidated" is the
     owner's word (crypto-native, and true of a leveraged bet); the pool is 69% of the trading fees, never "of the volume". */
  var ul=$(".x2o-lines");
  if(ul&&!$(".x2p-t3")){
    var t3=document.createElement("div");t3.className="x2p-t3";
    t3.innerHTML='<ul><li><span>4 AIs predict stock moves <b>before earnings</b>.</span></li>'+
      '<li><span>Every call is tracked. We bet our pool on <b>the most accurate AI</b>.</span></li>'+
      '<li><span>The pool: <b>'+P+'% of $EZ trading fees</b>.</span><div class="fan">'+
        '<div class="oc r"><b>▲ Right call</b>Profits buy back $EZ.</div>'+
        '<div class="oc w"><b>▼ Wrong call</b>The pool shrinks or gets liquidated.</div></div></li></ul>';
    ul.parentNode.insertBefore(t3,ul);ul.remove()}
  /* the explainer film (owner, 2026-10-21: "C is my favorite", on the $EZ ticket, no footer, no host): it replaces the three bullets and
     the right/wrong boxes. Since 2026-10-22 it waits for "Tap to play" (owner: no autoplay) and starts with sound; it keeps talking in a
     corner player when you scroll past it. The round films pause while it plays, and it pauses when one of them starts.
     The bullets stay in the file for the Buyback tab. ez-landing-v2.mp4 is 15.2 MB; only its metadata loads before the tap. */
  var T3=$(".x2p-t3");
  if(T3&&!$(".x2p-vt")){
    var vt=document.createElement("div");vt.className="x2p-vt";
    /* (owner, 2026-10-21, round 2: option 4) the film is the ticket: no paper, the scallops cut the film and the bands print over its edges;
       "How it works" is mockup A's tilted gold tag across the top edge, with the time left */
    /* (2026-10-22, review) the tag is the module's heading (h2) for screen readers; the time beside it is decoration */
    vt.innerHTML='<h2 class="vt-tag">How it works<small class="vt-s" aria-hidden="true">1:07</small></h2><div class="vt-p"><i class="vt-st" aria-hidden="true"></i>'+
      '<div class="vt-f"><video class="vt-v" playsinline preload="metadata" poster="media/ez-landing-hd-poster.jpg" aria-label="How EZ works, one minute"><source src="media/ez-landing-v2.mp4" type="video/mp4"><source src="media/ez-landing-v2.webm" type="video/webm"></video>'+
      '<button type="button" class="vt-snd"></button><button type="button" class="vt-tap">Tap for sound</button><button type="button" class="vt-play"><i aria-hidden="true"></i><span>Tap to play</span></button><span class="vt-bar" aria-hidden="true"><i></i></span></div></div>';
    T3.parentNode.insertBefore(vt,T3);T3.hidden=true;T3.setAttribute("data-x2p-kept","buyback");
    (function(){var v=vt.querySelector(".vt-v"),snd=vt.querySelector(".vt-snd"),tap=vt.querySelector(".vt-tap"),play=vt.querySelector(".vt-play"),pl=play.querySelector("span"),bar=vt.querySelector(".vt-bar>i"),st=vt.querySelector(".vt-s"),f=vt.querySelector(".vt-f");
      var SON='<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M3 6h3l4-3.5v11L6 10H3z" fill="currentColor"/><path d="M12 5.5a3.5 3.5 0 0 1 0 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
      var SOFF='<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M3 6h3l4-3.5v11L6 10H3z" fill="currentColor"/><path d="M11.5 5.5l4 4M15.5 5.5l-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
      var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches,started=false,ended=false,mini=null,rolling=false,nosrc=false,userMuted=false,tapAt=0;
      function fmt(t){t=Math.max(0,Math.round(t));return Math.floor(t/60)+":"+("0"+t%60).slice(-2)}
      function loading(){return !v.paused&&!v.ended&&!rolling&&!nosrc}
      /* the state follows real playback (the playing event), not v.paused: a play() still waiting for data, or for a file that isn't there,
         leaves paused false while nothing rolls (owner, 2026-10-21: "the video doesn't play when I click on it"). One button, .vt-play, carries
         every state: "Tap to play", "Loading" while it fetches, and "Pause" while it rolls (then invisible to touch, shown on keyboard focus) */
      function ui(){var ld=loading(),t;snd.innerHTML=v.muted?SOFF:SON;snd.setAttribute("aria-label",v.muted?"Unmute":"Mute");snd.title=v.muted?"Sound off":"Sound on";
        if(mini){var ms=mini.querySelector(".m-snd");ms.innerHTML=v.muted?SOFF:SON;ms.setAttribute("aria-label",v.muted?"Unmute":"Mute")}
        /* "Tap for sound" only when the browser refused sound (not after a deliberate mute), and only for 3 s: it sits on the captions */
        tap.hidden=!(rolling&&v.muted&&!userMuted&&Date.now()-tapAt<3000);
        vt.classList.toggle("playing",rolling);vt.classList.toggle("loading",ld);t=rolling?"Pause":ld?"Loading":"Tap to play";if(pl.textContent!==t)pl.textContent=t;
        t=!v.paused?fmt(v.duration?v.duration-v.currentTime:67):(!started||v.ended)?fmt(v.duration||67):st.textContent;if(st.textContent!==t)st.textContent=t}
      function pauseRounds(){[].forEach.call(document.querySelectorAll("#record video, #x2pHl video, .rx3 video"),function(r){if(r!==v&&!r.paused)r.pause()})}
      /* precedence with the round films (2026-10-22, review: a thumb scroll over the record stopped the explainer, because every touch scroll
         starts with a pointerdown and the record and the highlights call play() on gestures and on coming into view). While the explainer is on
         (playing, loading, or just touched), a round film that asks to play by itself waits: its play() returns a promise that never settles, so
         the record neither plays nor falls back to "sound off". Only a click on a card (browsers never fire one for a scroll; Enter and Space do)
         lets a round film start, and then the explainer stops. When the explainer stops, the record's centred film and the highlight resume. */
      var nativePlay=HTMLMediaElement.prototype.play,lastClick=0,armed=0,held=false;
      function active(){return (!v.paused&&!v.ended&&!nosrc)||Date.now()-armed<1500}
      document.addEventListener("click",function(e){if(e.target.closest&&e.target.closest("#record, #x2pHl, .rx3"))lastClick=Date.now()},true);
      document.addEventListener("pointerdown",function(e){if(e.target.closest&&e.target.closest(".x2p-vt, .x2p-vmini"))armed=Date.now()},true);
      HTMLMediaElement.prototype.play=function(){if(this!==v&&this.tagName==="VIDEO"&&active()&&Date.now()-lastClick>1200){held=true;return new Promise(function(){})}
        return nativePlay.apply(this,arguments)};
      document.addEventListener("play",function(e){var t=e.target;if(!t||t===v||t.tagName!=="VIDEO")return;if(v.paused||v.ended)return;
        if(Date.now()-lastClick<1200){v.pause();hideMini()}else t.pause()},true);
      function resume(){if(!held)return;held=false;
        var c=document.querySelector("#record .card.cur"),r=c&&c.querySelector("video");
        if(r&&r.paused&&!reduce&&!c.classList.contains("flipped")){var bx=c.getBoundingClientRect(),seen=Math.min(bx.bottom,innerHeight)-Math.max(bx.top,0);
          if(bx.height&&seen>bx.height*.3){var sb=document.querySelector("#record .snd");r.muted=!(sb&&sb.dataset.on==="1");
            nativePlay.call(r).then(function(){r.classList.add("on")}).catch(function(){r.muted=true;nativePlay.call(r).then(function(){r.classList.add("on")}).catch(function(){})})}}
        if(window.__x2pHlFilms)window.__x2pHlFilms()}
      /* and the other way round: whenever this one starts, the round films stop */
      v.addEventListener("play",pauseRounds);
      function go(withSound){if(nosrc){nosrc=false;v.load()}if(withSound)v.muted=false;pauseRounds();var p=v.play();
        /* only a refusal to play with sound falls back to muted (with "Tap for sound" for 3 s); a missing file shows the play button again */
        if(p&&p.then)p.then(function(){started=true;ui()}).catch(function(e){if(!nosrc&&e&&e.name==="NotAllowedError"&&!v.muted){v.muted=true;tapAt=Date.now();setTimeout(ui,3100);v.play().then(function(){started=true;ui()}).catch(ui)}else ui()});ui()}
      var srcs=v.querySelectorAll("source");srcs[srcs.length-1].addEventListener("error",function(){nosrc=true;rolling=false;v.pause();ui()});
      v.addEventListener("playing",function(){rolling=true;ui()});v.addEventListener("waiting",function(){rolling=false;ui()});
      /* the sound button only switches the sound, never starts the film; a mute chosen before play is kept (the film then starts muted) */
      snd.addEventListener("click",function(e){e.stopPropagation();v.muted=!v.muted;userMuted=v.muted;ui()});
      tap.addEventListener("click",function(e){e.stopPropagation();v.muted=false;userMuted=false;tapAt=0;if(v.paused)go(true);ui()});
      play.addEventListener("click",function(e){e.stopPropagation();if(loading())return;if(rolling){v.pause();ui()}else go(!userMuted)});
      /* a tap on the film (owner's rule): rolling muted, sound on; paused, play (muted only if the visitor chose mute); playing, pause;
         loading, nothing. It never turns over */
      f.addEventListener("click",function(e){if(e.target.closest("button"))return;if(loading())return;if(rolling&&v.muted){v.muted=false;userMuted=false;tapAt=0;ui()}else if(v.paused||nosrc)go(!userMuted);else{v.pause();ui()}});
      v.addEventListener("timeupdate",function(){if(v.duration)bar.style.width=(100*v.currentTime/v.duration)+"%";ui();if(mini)mini.querySelector(".m-bar i").style.width=bar.style.width});
      v.addEventListener("play",ui);v.addEventListener("pause",function(){rolling=false;ui();if(mini&&v.paused&&!v.ended)hideMini();setTimeout(resume,60)});
      v.addEventListener("ended",function(){ended=true;rolling=false;ui();hideMini();setTimeout(resume,60)});
      /* the corner player while you scroll on: the same video element, moved into a fixed box, so the sound never stops */
      var hold=null;function showMini(){if(mini||v.paused||v.ended||nosrc)return;if(window.__x2pTrack)window.__x2pTrack("film",{a:"corner"},"film-corner");mini=document.createElement("div");mini.className="x2p-vmini";mini.setAttribute("role","region");mini.setAttribute("aria-label","How it works film");
        mini.innerHTML='<button type="button" class="m-x" aria-label="Stop the film">✕</button><button type="button" class="m-snd"></button><button type="button" class="m-back">Back to the film</button><span class="m-bar" aria-hidden="true"><i></i></span>';
        hold=document.createElement("div");hold.className="vt-hold";f.insertBefore(hold,v);mini.insertBefore(v,mini.firstChild);document.body.appendChild(mini);
        mini.querySelector(".m-snd").addEventListener("click",function(e){e.stopPropagation();v.muted=!v.muted;userMuted=v.muted;ui()});
        mini.querySelector(".m-x").addEventListener("click",function(e){e.stopPropagation();var had=mini.contains(document.activeElement);v.pause();hideMini();if(had)play.focus({preventScroll:true})});
        /* back to the film, from any tab: the Overview first, then the ticket */
        function back(){var had=mini&&mini.contains(document.activeElement);var r=location.hash.replace(/^#/,"")||"/";
          function to(){vt.scrollIntoView({behavior:reduce?"auto":"smooth",block:"center"});if(had)setTimeout(function(){play.focus({preventScroll:true})},reduce?0:400)}
          if(r!=="/"){location.hash="#/";setTimeout(to,120)}else to()}
        mini.querySelector(".m-back").addEventListener("click",function(e){e.stopPropagation();back()});
        mini.addEventListener("click",function(e){if(e.target.closest("button"))return;back()});ui()}
      function hideMini(){if(!mini)return;f.insertBefore(v,f.firstChild);if(hold){hold.remove();hold=null}mini.remove();mini=null;ui()}
      /* the film counts as out of view once it is under the sticky header, not only once it leaves the screen; the newest entry wins */
      if("IntersectionObserver" in window){var hd=document.querySelector(".top"),hh=hd?Math.round(hd.getBoundingClientRect().height):0;
        new IntersectionObserver(function(es){var on=es[es.length-1].isIntersecting;if(!on&&!v.paused&&!v.ended)showMini();else if(on&&mini)hideMini()},{threshold:.25,rootMargin:"-"+hh+"px 0px 0px 0px"}).observe(vt)}
      /* the film files are v2 (2026-10-22): the master's audio carried 269 duplicate packets squeezed to one tick at each ~8.4 s cut; players that play
         every packet (the owner's phone) repeated up to 1 s at each cut and ran 5.65 s late by the end. v2 drops them; new names because /media is cached as immutable */
      /* arrival (owner, 2026-10-22: "Video shouldn't start by default"): the poster with "Tap to play"; it starts with sound on the tap */
      ui();
      window.__x2pExplainer={video:v}})()}
  var g=$("#gpu");
  if(g&&!$(".x2p-cdh")){var c=document.createElement("div");c.className="x2p-cdh";c.innerHTML='<span class="k">Countdown to</span><b>Bet #1<i>:</i> <em>NVIDIA</em></b>';
    g.parentNode.insertBefore(c,g);
    /* the risk sits in the red box above; he stands beside this head (owner, 2026-10-20), so nothing goes under the chip */
  }
  /* following on X (owner, 2026-10-21: followers are the number one goal; "the subtle art of the sell", not a car
     salesman): each prompt sits where X gives something the page can't, the calls before the report and the result the
     moment it lands, and says that, not "follow us"; plus a quiet icon in the header and a line in the footer */
  var XU=CONFIG.x?(/^https?:/.test(CONFIG.x)?CONFIG.x:"https://x.com/"+String(CONFIG.x).replace(/^@/,"")):"";
  if(XU){var XH="@"+XU.replace(/\/+$/,"").split("/").pop(),
    XS='<svg class="x2p-xg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    xa=function(cls,html,label){var a=document.createElement("a");a.className=cls;a.href=XU;a.target="_blank";a.rel="noopener";a.innerHTML=html;if(label)a.setAttribute("aria-label",label);a.addEventListener("click",function(e){e.stopPropagation()});return a};
    var lc=$("#liveChip");if(lc&&!$(".x2p-xhd"))lc.after(xa("x2p-xhd",XS,"Follow $EZ on X, "+XH));
    /* (owner, 2026-10-21) the record section's second bullet, worded as the visitor's job to be done (Christensen): see
       every call before the report without having to come back and check; it replaces the line under the chip */
    var rb=$(".x2o-rec");if(rb&&!$(".x2p-xli")){var li=document.createElement("li");li.className="x2p-xli";
      /* (owner, 2026-10-21) "to your feed on X", the X highlighted as the link; no handle */
      /* (owner, 2026-10-21, later) shorter: "Every call straight to your X feed." */
      /* (owner, 2026-10-22, later) "prediction", not "call": the line above already says "every call" */
      li.appendChild(document.createTextNode("Every prediction straight to your "));li.appendChild(xa("x2p-xlink x2p-xword","X","Follow "+XH+" on X"));li.appendChild(document.createTextNode(" feed."));rb.appendChild(li)}
    /* (owner, 2026-10-21) for now only two: the record bullet and the header icon; the card and footer links are off */
  }
  /* the record cards as graded slabs (owner, 2026-10-21): each face gets the PSA-style label; the grade is how many AIs
     called the direction (from the sheet); a perfect round gets the black label (and, by CSS, the holo stats side) */
  var MO=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],md=function(s){var m=String(s).match(/(\d+)\/(\d+)\/(\d+)/);return m?{t:MO[+m[1]]+" "+(+m[2]),y:2000+(+m[3])}:{t:"",y:""}};
  /* the EZ grade (rubric v1, owner 2026-10-21), shared by the record slabs, the highlight slabs and the tickets; half points: closeness of
     the AIs that called the direction adds 0 to 2 in steps of .5 (1.5% or less: 2, 2%: 1.5, 2.5%: 1, 3%: .5); below "all right" a band tops out .5 under the next */
  function ezGrade(g){var nc=g.calls.length,rw=g.calls.filter(function(x){return (x[1].indexOf("DOWN")<0)===(g.a>0)}).map(function(x){return +x[2]}),hit=rw.length,f=hit/nc,
      av=hit?rw.reduce(function(a,b){return a+b},0)/hit:0,mv=Math.abs(g.a),pt=av<=1.5?2:av<=2?1.5:av<=2.5?1:av<=3?.5:0,gr,ds,pr=false;
    if(f===1){gr=8+pt;if(gr===10&&!(av<mv/2))gr=9.5;ds=gr===10?((pr=av<1)?"Pristine":"Gem"):"Perfect"}else if(f>=.66){gr=6+Math.min(pt,1.5);ds="Strong"}else if(f>=.5){gr=4+Math.min(pt,1.5);ds="Split"}else if(f>0){gr=2+Math.min(pt,1.5);ds="Rough"}else{gr=1;ds="Rekt"}
    return {gr:gr,ds:ds,pr:pr,hit:hit,nc:nc,av:av,why:hit===0?"0 of "+nc+" right":hit+" of "+nc+" right \u00b7 "+av.toFixed(2)+"% off on avg"}}
  window.__x2pSlab=function(root){[].forEach.call((root||document).querySelectorAll("#record .card[data-n]"),function(c){if(c.querySelector(".fx"))return;
    var n=+c.getAttribute("data-n"),g=null,q=null,i;for(i=0;i<ROUNDS.length;i++)if(ROUNDS[i].n===n)g=ROUNDS[i];if(!g)for(i=0;i<PENDING.length;i++)if(PENDING[i].n===n)q=PENDING[i];var u=null;if(!g&&!q)for(i=0;i<UPCOMING.length;i++)if(UPCOMING[i].n===n)u=UPCOMING[i];
    var r=g||q||u;if(!r)return;var hit=g?g.calls.filter(function(x){return (x[1].indexOf("DOWN")<0)===(g.a>0)}).length:0,nc=g?g.calls.length:0,d=md(r.called);
    /* the EZ grade, rubric v1 (owner, 2026-10-21): direction sets the band and the word (all right 8-10 Perfect, most 6-7.5 Strong, half 4-5.5 Split,
       some 2-3.5 Rough, none 1 Rekt); closeness of the AIs that called the direction moves it up the band; a 10 (gold label, foil) = all right,
       average miss 1.5% or less and under half the move (else 9.5); Pristine = a 10 under 1% */
    var E=g?ezGrade(g):null,gr=E?E.gr:0,ds=E?E.ds:"",why=E?E.why:"",pr=E?E.pr:false;
    var h='<div class="zlab"><div class="zl"><span class="y">'+d.y+' <span class="s">$</span><span class="e">E</span><span class="z">Z</span> Season 1</span><span class="nm"><b>'+esc2(r.co)+'</b>'+(r.ticker?' <small>('+esc2(r.ticker)+')</small>':'')+'</span><span class="zb"><i></i>'+String(n).padStart(8,"0")+'<span class="holo"><i class="s">$</i><i class="e">E</i><i class="z">Z</i></span></span></div>'+
      '<div class="zr"><span class="no">#'+n+'</span>'+(g?'<span class="ds">'+ds+'</span><span class="gr">'+gr+'</span>':(q?'<span class="ds">Graded on</span><span class="gr">'+md(r.resolves).t.toUpperCase()+'</span>':'<span class="ds">Calls due</span><span class="gr">'+md(r.called).t.toUpperCase()+'</span>'))+'</div>'+
      '</div>';
    [].forEach.call(c.querySelectorAll(".face"),function(f){var o=document.createElement("div");o.className="fx"+(gr===10?" perfect":"")+(pr?" pristine":"");o.setAttribute("aria-hidden","true");o.innerHTML=h;f.appendChild(o);
      /* the back says why, in one line, where the barcode sits on the front */
      if(g&&f.classList.contains("back")){var zb=o.querySelector(".zb");zb.className="zb zwhy";zb.textContent=why}
      /* (owner, 2026-10-21) a 10 gets the rolling foil on both faces (owner: it should not vanish when the card flips): rainbow bands that roll across without end; a sibling of .fx so it lights the film too */
      if(gr===10){var fl=document.createElement("i");fl.className="x2p-foil";fl.setAttribute("aria-hidden","true");fl.appendChild(document.createElement("i"));f.appendChild(fl);foilFit(f);if(FRO)FRO.observe(f)}});if(window.__x2pNmFit)window.__x2pNmFit();
    var lab=(g?ds+" "+gr+" of 10, "+why.replace(" \u00b7",",").replace("off on avg","off on average"):q?"calls in, graded "+md(r.resolves).t:"calls due "+md(r.called).t);c.setAttribute("aria-label",(c.getAttribute("aria-label")||"")+". Grade: "+lab+".")})};
  /* (owner, 2026-10-21, later) the foil stays light over the film: the mask needs the film's top and bottom inside the face */
  function foilFit(f){var fl=f.querySelector(".x2p-foil"),a=f.querySelector(f.classList.contains("back")?".fin":".art");if(!fl||!a||!a.offsetHeight)return;var t=0,e=a;while(e&&e!==f){t+=e.offsetTop;e=e.offsetParent}
    fl.style.setProperty("--at",t+"px");fl.style.setProperty("--ab",(t+a.offsetHeight)+"px")}
  var FRO=window.ResizeObserver?new ResizeObserver(function(es){es.forEach(function(x){foilFit(x.target)})}):null;
  function esc2(t){return String(t).replace(/[&<>"]/g,function(x){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[x]})}
  window.__x2pSlab(document);

  /* Results (owner, 2026-10-21, later): the highlights become full-size slabs you swipe through, like the record on the Overview.
     Front: the round's slab with its highlight tag; "See why" flips it. Back: the calls, how the stock moved (plain green or red,
     no box), the winner, and why it is here in plain words, then what its grade means. Built from the page's own highlight list
     (titles and sentences come from the sheet) and the Overview's cards; build.py lets the slab CSS match #x2pHl too.
     Every graded round keeps its ticket and gets the grade as a stamp, top right; its film shows whole (it is square, the
     strip is tall), with a soft blur of itself behind. */
  function gradeLine(E){if(E.gr===10)return E.pr?"Pristine 10: everyone right, and everyone close. The best grade there is.":"Gem 10: everyone right, and close.";
    if(E.ds==="Rekt")return "Rekt 1: nobody got it right. The lowest grade.";
    if(E.ds==="Perfect")return "Perfect "+E.gr+": all "+E.nc+" AIs got up or down right.";
    return E.ds+" "+E.gr+": "+(E.ds==="Strong"?"":"only ")+E.hit+" of the "+E.nc+" AIs got up or down right."}
  function nm1(m){return m==="GPT"?"GPT":m.charAt(0)+m.slice(1).toLowerCase()}
  function setFaces2(c,f){var fr=c.querySelector(".face.front"),bk=c.querySelector(".face.back");if(!fr||!bk)return;fr.setAttribute("aria-hidden",f?"true":"false");bk.setAttribute("aria-hidden",f?"false":"true");if("inert" in fr){fr.inert=f;bk.inert=!f}}
  function hlSlabs(){var ul=document.querySelector("ul.hx2s");if(!ul||ul.getAttribute("data-x2p"))return;var src=document.querySelector("#record");if(!src)return;
    var items=[].map.call(ul.querySelectorAll(":scope>li"),function(li){var a=li.querySelector("a.hx2"),m=a&&(a.getAttribute("href")||"").match(/round\/(\d+)/),q=function(c){var e=li.querySelector(c);return e?e:null};
      return {n:m?+m[1]:0,tag:q(".hx2-k")?q(".hx2-k").textContent:"",head:q(".hx2-h")?q(".hx2-h").innerHTML:"",body:q(".hx2-p")?q(".hx2-p").textContent:"",
        rec:[].map.call(li.querySelectorAll(".hx2-r>span"),function(sp){return [(sp.querySelector("b")||{}).textContent||"",(sp.querySelector("small")||{}).textContent||""]})}});
    var cards=[];items.forEach(function(it){if(/everyone was wrong/i.test(it.tag))return;/* dropped on X2+ (owner, 2026-10-20) */var r=null,i;for(i=0;i<ROUNDS.length;i++)if(ROUNDS[i].n===it.n)r=ROUNDS[i];var o=r&&src.querySelector('.card[data-n="'+it.n+'"]');if(!o)return;
      var c=o.cloneNode(true),E=ezGrade(r),k=it.tag.toLowerCase(),nf=c.classList.contains("nofilm");c.classList.remove("flipped","cur");c.removeAttribute("data-i");
      var fb=c.querySelector(".face.front [data-flip]");if(fb)fb.textContent="See why ↻";
      var why=it.body;if(/closest/.test(k))why="Every AI guesses how much a stock will move after the company reports. "+why+" No guess this season came closer.";
      else if(/tight/.test(k))why+=" On average, they were off by "+E.av.toFixed(2)+"%.";
      else if(/big/.test(k)){it.rec.forEach(function(x){if(/normal/.test(x[1])&&/x$/.test(x[0]))why+=" That’s about "+x[0].replace(/x$/,"")+" times a normal move."})}
      var calls=r.calls.map(function(x){var up=x[1].indexOf("DOWN")<0,ok=up===(r.a>0);return '<span class="x2p-hc '+(ok?"ok":"no")+'">'+esc2(nm1(x[0]))+'<b>'+(up?"▲":"▼")+esc2(x[1].replace(/^(UP|DOWN)\s*/,""))+" "+(ok?"✓":"✗")+'</b></span>'}).join("");
      var fin=c.querySelector(".face.back .fin");if(fin)fin.innerHTML='<div class="x2p-hb"><h4>'+it.head+'</h4><div class="x2p-hcs">'+calls+'</div>'+
        '<div class="x2p-ho">Stock moved<b class="'+(r.a>0?"u":"d")+'">'+(r.a>0?"▲":"▼")+" "+Math.abs(r.a).toFixed(2)+'%</b></div>'+
        '<div class="x2p-ho">Winner<b class="w">'+(r.win?esc2(nm1(r.win)):"Nobody")+'</b></div>'+
        '<p class="x2p-hw">'+esc2(why)+'<em>'+esc2(gradeLine(E))+'</em></p>'+(nf?'':'<button type="button" class="flipb" data-flip>↻ See the film</button>')+'</div>';
      /* (owner, 2026-10-21) no film yet: the card opens on its story and stays there; "Film soon" is never the face we show */
      if(nf)c.classList.add("flipped");setFaces2(c,nf);var w=document.createElement("div");w.className="x2p-hi";var tg=document.createElement("span");tg.className="x2p-htag x2p-h-"+(/closest/i.test(it.tag)?"c":/tight/i.test(it.tag)?"t":"b");tg.textContent=it.tag;w.appendChild(tg);w.appendChild(c);cards.push(w)});
    if(!cards.length)return;var old=document.getElementById("x2pHl");if(old)old.remove();
    var box=document.createElement("div");box.id="x2pHl";box.className="x2p-hlc";box.setAttribute("role","region");box.setAttribute("aria-roledescription","carousel");box.setAttribute("aria-label","Highlights");
    var tr=document.createElement("div");tr.className="x2p-hlt";tr.tabIndex=0;cards.forEach(function(w){tr.appendChild(w)});
    var dots=document.createElement("div");dots.className="x2p-hld";cards.forEach(function(w,i){var d=document.createElement("button");d.type="button";d.setAttribute("aria-label","Highlight "+(i+1)+" of "+cards.length);d.addEventListener("click",function(){go(i)});dots.appendChild(d)});
    box.appendChild(tr);box.appendChild(dots);ul.setAttribute("data-x2p","1");ul.hidden=true;ul.parentNode.insertBefore(box,ul.nextSibling);
    [].forEach.call(box.querySelectorAll(".face"),function(f){if(f.querySelector(".x2p-foil")){foilFit(f);if(FRO)FRO.observe(f)}});
    var cur=0,vis=false,reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
    function near(){var mid=tr.scrollLeft+tr.clientWidth/2,b=0,bd=1e9;cards.forEach(function(w,i){var d=Math.abs(w.offsetLeft+w.offsetWidth/2-mid);if(d<bd){bd=d;b=i}});return b}
    function mark(){[].forEach.call(dots.children,function(d,i){d.classList.toggle("on",i===cur);d.setAttribute("aria-current",i===cur?"true":"false")});cards.forEach(function(w,i){w.classList.toggle("on",i===cur)})}
    /* one sound switch for the whole page: the page keeps it to itself but marks every .snd (these copies too) with data-on */
    function pageSound(){var b=document.querySelector("#record .snd");return !!(b&&b.dataset.on==="1")}
    document.addEventListener("pointerdown",function(){setTimeout(films,400)},{passive:true,capture:true});
    window.__x2pHlFilms=function(){films()};
    function films(){cards.forEach(function(w,i){var c=w.querySelector(".card"),v=w.querySelector("video");if(!v)return;
      if(i===cur&&vis&&!reduce&&!c.classList.contains("flipped")){v.muted=!pageSound();v.preload="auto";var p=v.play();if(p&&p.then)p.then(function(){v.classList.add("on")}).catch(function(){})}else if(!v.paused)v.pause()})}
    function go(i){i=Math.max(0,Math.min(cards.length-1,i));var w=cards[i];tr.scrollTo({left:w.offsetLeft+w.offsetWidth/2-tr.clientWidth/2,behavior:reduce?"auto":"smooth"})}
    var raf=0;tr.addEventListener("scroll",function(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;var n=near();if(n!==cur){var oc=cards[cur]&&cards[cur].querySelector(".card");if(oc&&oc.classList.contains("flipped")&&!oc.classList.contains("nofilm")){oc.classList.remove("flipped");setFaces2(oc,false)}cur=n;mark();films()}})},{passive:true});
    tr.addEventListener("keydown",function(e){if(e.key==="ArrowLeft"){e.preventDefault();go(cur-1)}else if(e.key==="ArrowRight"){e.preventDefault();go(cur+1)}});
    tr.addEventListener("click",function(e){var w=e.target.closest(".x2p-hi");if(!w)return;var i=cards.indexOf(w),c=w.querySelector(".card");
      var sb=e.target.closest(".shr");if(sb){e.preventDefault();e.stopPropagation();if(typeof window.shareRound==="function")window.shareRound(sb);return}
      var sd=e.target.closest(".snd");if(sd){e.preventDefault();e.stopPropagation();var rs=document.querySelector("#record .snd");if(rs)rs.click();setTimeout(films,60);return}
      if(e.target.closest("a"))return;e.preventDefault();if(i!==cur){go(i);return}
      if(c.classList.contains("nofilm"))return;var f=!c.classList.contains("flipped");c.classList.toggle("flipped",f);setFaces2(c,f);films()});
    if("IntersectionObserver" in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting;films()},{threshold:.3}).observe(tr);
    /* every card one height: the record card's (owner, 2026-10-23: the record's trading-card shape), else the tallest; then the story
       side's paragraph steps down half a pixel at a time (never below 10px) until it fits */
    function eqH(){var cs=cards.map(function(w){return w.querySelector(".card")});cs.forEach(function(c){c.style.height=""});var m=0;cs.forEach(function(c){m=Math.max(m,c.offsetHeight)});
      var rc=document.querySelector("#record .card"),t=rc&&rc.getBoundingClientRect().height;if(t)m=t;if(m)cs.forEach(function(c){c.style.height=m+"px"});
      cs.forEach(function(c){var hb=c.querySelector(".x2p-hb"),p=hb&&hb.querySelector(".x2p-hw");if(!p)return;
        // the four call chips share one size, stepped down until the widest fits its box (CLAUDE ▼2.5% ✓ on a 360px phone)
        var hc=[].slice.call(hb.querySelectorAll(".x2p-hc"));hc.forEach(function(e){e.style.fontSize=""});var y=hc[0]&&parseFloat(getComputedStyle(hc[0]).fontSize),k=0;
        while(y&&hc.some(function(e){return e.scrollWidth>e.clientWidth+.5})&&y>8.5&&k++<12){y-=.5;hc.forEach(function(e){e.style.fontSize=y+"px"})}
        p.style.fontSize="";var z=parseFloat(getComputedStyle(p).fontSize),n=0;
        while(hb.scrollHeight>hb.clientHeight+1&&z>10&&n++<20){z-=.5;p.style.fontSize=z+"px"}})}
    window.addEventListener("load",function(){setTimeout(eqH,120)});
    var eqT;window.addEventListener("resize",function(){clearTimeout(eqT);eqT=setTimeout(eqH,150)});if(document.fonts&&document.fonts.ready)document.fonts.ready.then(eqH);
    mark();requestAnimationFrame(function(){eqH();tr.scrollLeft=0;cur=near();mark();films()});
    /* (owner, 2026-10-22, two-tab launch) the Overview's highlights land on a chosen card with its story side up; false while
       the carousel is out of view (no width yet), so the caller tries again when the Overview shows */
    window.__x2pHlGo=function(i,back){if(!tr.clientWidth)return false;eqH();var w=cards[Math.max(0,Math.min(cards.length-1,i))];
      tr.scrollLeft=w.offsetLeft+w.offsetWidth/2-tr.clientWidth/2;cur=near();mark();var c=w.querySelector(".card");
      if(back&&c&&!c.classList.contains("nofilm")&&!c.classList.contains("flipped")){c.classList.add("flipped");setFaces2(c,true)}films();return true}}
  function tkStamp(){[].forEach.call(document.querySelectorAll("ol.rx3>li"),function(li){if(li.querySelector(".x2p-tg"))return;var a=li.querySelector("a.rx3-r"),m=a&&(a.getAttribute("href")||"").match(/round\/(\d+)/);if(!m)return;
      var r=null,i;for(i=0;i<ROUNDS.length;i++)if(ROUNDS[i].n===+m[1])r=ROUNDS[i];if(!r)return;var E=ezGrade(r),s=document.createElement("span");
      s.className="x2p-tg"+(E.gr===10?" gold":"");s.setAttribute("aria-hidden","true");s.innerHTML="<b>"+E.gr+"</b><small>"+E.ds+"</small>";li.appendChild(s);
      a.setAttribute("aria-label",(a.getAttribute("aria-label")||"")+". Grade: "+E.ds+" "+E.gr+" of 10");
      var v=li.querySelector(".rx3-v"),im=v&&v.querySelector("img");if(v&&im)v.style.setProperty("--bg",'url("'+im.getAttribute("src")+'")')})}
  function x2pResults(){try{hlSlabs();tkStamp()}catch(e){}}
  window.__x2pHlSlabs=hlSlabs;
  /* the Overview record: a no-film card opens on its stats (the page does that); a tap no longer turns it to "Film soon" */
  document.addEventListener("click",function(e){var c=e.target.closest&&e.target.closest("#record .card.nofilm.cur");if(!c||e.target.closest(".shr,.snd,a,video[controls]"))return;e.stopPropagation();e.preventDefault()},true);
  x2pResults();var resT;window.__x2pResults=function(){clearTimeout(resT);resT=setTimeout(x2pResults,30)};
  /* the name and its ticker fit the label: a long name steps down from 15px until it fits (never below 10px), on load, resize and tab change */
  function nmFit(){[].forEach.call(document.querySelectorAll("#record .fx .zl .nm, #x2pHl .fx .zl .nm"),function(el){var b=el.firstChild;if(!b||!el.offsetWidth)return;el.style.fontSize="";var z=parseFloat(getComputedStyle(el).fontSize);while(b.scrollWidth>b.clientWidth+.5&&z>10){z-=.5;el.style.fontSize=z+"px"}})}
  var nmT;function nmLater(){clearTimeout(nmT);nmT=setTimeout(nmFit,120)}nmFit();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(nmFit);window.addEventListener("resize",nmLater);window.addEventListener("hashchange",nmLater);window.__x2pNmFit=nmLater;
  /* the record section's first two bullets said what steps 1 and 2 now say: keep only the dare */
  var rec=$(".x2o-rec"),own=rec?[].filter.call(rec.children,function(c){return !c.classList.contains("x2p-xli")}):[];if(own.length===3){own[0].remove();own[1].remove()}
  var sn=$(".x2o-stn");if(sn)sn.textContent="The model on top of the leaderboard makes the call on bet #1, NVIDIA.";
  /* words, on every route as it renders: pot becomes pool; NVIDIA's bet is the first one; no "never edited" */
  var RE=[[/\bpot\b/g,"pool"],[/\bPot\b/g,"Pool"],[/\bPOT\b/g,"POOL"],[/ · NEVER EDITED/g,""],[/, never edited\./g,"."],[/\bNext bet\b/g,"Bet #1"],[/\bNEXT BET\b/g,"BET #1"],[/Longest hit streak/g,"Longest right-way streak"]];
  /* no model pages for now (owner, 2026-10-22: "remove the being able to click into a model for now"): every link to one becomes plain
     text, as the page renders, and an address that points at one goes to the Overview. The pages stay in the build for later. */
  function noModelLinks(root){var as=root.matches&&root.matches('a[href^="#/model/"]')?[root]:[].slice.call(root.querySelectorAll?root.querySelectorAll('a[href^="#/model/"]'):[]);
    as.forEach(function(a){if(!a.parentNode)return;var sp=document.createElement("span");sp.className="x2p-mn";while(a.firstChild)sp.appendChild(a.firstChild);a.parentNode.replaceChild(sp,a)})}
  function noModelRoute(){if(/^#\/model\//.test(location.hash))location.replace("#/")}
  noModelRoute();addEventListener("hashchange",noModelRoute);
  function fix(root){if(!root||root.nodeType!==1)return;noModelLinks(root);var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;
    while(n=w.nextNode()){var t=n.textContent,u=t;if(!/pot|Pot|POT|NEVER|never edited|ext bet|EXT BET|hit streak/.test(t))continue;
      if(n.parentNode&&/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName))continue;
      RE.forEach(function(p){u=u.replace(p[0],p[1])});if(u!==t)n.textContent=u}
    var w2=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),m,hit=[];while(m=w2.nextNode())if(/\bAIs\b/.test(m.textContent)&&m.parentNode&&m.parentNode.nodeType===1&&!m.parentNode.closest("script,style,.x2p-lc"))hit.push(m);
    hit.forEach(function(n){if(getComputedStyle(n.parentNode).textTransform!=="uppercase")return;var f=document.createDocumentFragment();
      n.textContent.split(/(\bAIs\b)/).forEach(function(x){if(x==="AIs"){f.appendChild(document.createTextNode("AI"));var sp=document.createElement("span");sp.className="x2p-lc";sp.textContent="s";f.appendChild(sp)}else if(x)f.appendChild(document.createTextNode(x))});
      n.parentNode.replaceChild(f,n)})}
  fix(document.body);
  if(window.MutationObserver){var busy=false;new MutationObserver(function(ms){if(busy)return;busy=true;
    ms.forEach(function(m){[].forEach.call(m.addedNodes,function(x){if(x.nodeType===1){fix(x);if(window.__x2pSlab)window.__x2pSlab(x.closest&&x.closest("#record")?x.closest("#record"):x);if(window.__x2pResults&&!(x.closest&&x.closest("#x2pHl")))window.__x2pResults()}else if(x.nodeType===3&&x.parentNode)fix(x.parentNode)})});busy=false})
    .observe(document.body,{childList:true,subtree:true})}
}catch(e){}})();
/* the $EZ host, the mascot (owner, 2026-10-20: "one on each tab, not more", subtle, never in your face). Small, ink-outlined,
   tucked at the edge of a module that matches what he does; at most one short line, built from the sheet, on two tabs.
   He never covers a number: each sits in space made for him. Placed when a tab renders; nothing on model or round pages. */
(function(){try{
  var $=function(s,r){return (r||document).querySelector(s)},M="media/commissioner/web/";
  function img(f,w,alt){var i=document.createElement("img");i.className="x2p-hz";i.src=M+f;i.alt=alt||"";i.width=w;i.style.width=w+"px";i.loading="lazy";i.decoding="async";return i}
  function say(html){var d=document.createElement("div");d.className="x2p-say";d.innerHTML='<span class="nm">$EZ</span><div class="st">'+html+'</div><i class="tl"></i>';return d}
  function row(cls){var d=document.createElement("div");d.className="x2p-row "+(cls||"");d.setAttribute("data-x2p-host","");return d}
  function nmM(k){var n=(MODELS[k]&&MODELS[k].name)||k;return n.length<=3?n:n.charAt(0)+n.slice(1).toLowerCase()}
  /* the Overview stays in the page (hidden) while a tab shows in #view: look for a host only where this route renders */
  function mine(){var s=route()==="/"?$("#top"):$("#view");return s&&s.querySelector("[data-x2p-host]")}
  /* the board turned into a card with "How we rank" on its back, and the "As it stands" ticket under it. The Leaderboard tab
     used it first; since the two-tab launch (owner, 2026-10-22) the Overview's standings build from it too. The caller
     places the button. */
  function lbFlip(lbx){var rows=[].slice.call(lbx.querySelectorAll("li.lbr")),top=rows[0];
      var a=top&&top.querySelector(".pc-t a,.pc-t .x2p-mn"),nm=a?a.textContent.trim():"",pc=top&&top.querySelector(".lb-c b"),pct=pc?pc.textContent.trim():"";
      var lbn=lbx.nextElementSibling&&lbx.nextElementSibling.classList.contains("lbn")?lbx.nextElementSibling:null;
      var roi=lbn&&/<b>ROI<\/b>:([^<]*)/.exec(lbn.innerHTML);
      var fl=document.createElement("div");fl.className="x2p-flip";
      var btn=document.createElement("button");btn.type="button";btn.className="x2p-flipbtn";btn.setAttribute("aria-expanded","false");btn.setAttribute("aria-controls","x2pHow");
      btn.innerHTML='<i aria-hidden="true">i</i><span>How we rank</span>';
      var fin=document.createElement("div");fin.className="x2p-fin";
      var bk=document.createElement("div");bk.className="x2p-bk";bk.id="x2pHow";bk.setAttribute("inert","");bk.setAttribute("aria-hidden","true");bk.tabIndex=-1;
      bk.innerHTML='<h3>How we rank</h3><p class="x2p-why">Why it matters: <b>#1 makes the call</b> on the next bet.</p><ol>'+
        '<li>Ranked by how often they get the direction right.</li>'+
        '<li>Tie? The smaller average miss wins.</li>'+
        '<li>Every call is made before the company reports and graded at the next market close.</li>'+
        '<li>Called fewer than half the rounds? Ranked after the rest.</li>'+
        '<li>The board freezes 24h before each bet.</li></ol>'+
        (roi?'<p class="x2p-roi"><b>ROI</b>:'+roi[1]+'</p>':'');
      lbx.parentNode.insertBefore(fl,lbx);fl.appendChild(fin);fin.appendChild(lbx);fin.appendChild(bk);if(lbn)lbn.remove();
      btn.addEventListener("click",function(){var on=!fl.classList.contains("on");fl.classList.toggle("on",on);
        btn.setAttribute("aria-expanded",on?"true":"false");btn.querySelector("span").textContent=on?"Back to the board":"How we rank";btn.querySelector("i").textContent=on?"×":"i";
        if(on){lbx.setAttribute("inert","");lbx.setAttribute("aria-hidden","true");bk.removeAttribute("inert");bk.removeAttribute("aria-hidden")}
        else{bk.setAttribute("inert","");bk.setAttribute("aria-hidden","true");lbx.removeAttribute("inert");lbx.removeAttribute("aria-hidden")}});
      var r=row("x2p-row-r x2p-row-foot");
      if(nm)r.appendChild(say("As it stands, we follow <em>"+nm+"</em> on our next bet."));
      /* no host here any more (owner, 2026-10-22: "remove him from the Leaderboard tab"); his line stays on its ticket */
      /* the two rules are behind the ⓘ now (owner, 2026-10-20: no repetition); under the board only his line */
      var ft=document.createElement("div");ft.className="x2p-lbfoot";ft.appendChild(r);fl.after(ft);return {fl:fl,btn:btn,ft:ft}}
  window.__x2pLbFlip=lbFlip;
  var PLACE={
    /* Overview: no host (owner, 2026-10-22: he is in the explainer film above, "no need to keep him there"); he stood
       beside "Countdown to Bet #1: NVIDIA" from 2026-10-20 */
    /* Leaderboard (owner, 2026-10-20, second pass): the head with a small "How we rank" beside it; he names the leader
       above the board; the board turns over to the rule in full, at the board's own size; the three rules sit under it.
       Hall of fame third; three findings. The glossary line under the board moves onto its back. */
    "/leaderboard":function(){var lbx=$("#view .lbx");if(!lbx)return false;
      var xsh=lbx.parentNode.querySelector(".xsh"),h1=xsh&&xsh.querySelector("h1"),ul=xsh&&xsh.querySelector(".x2-lbul");
      var o=lbFlip(lbx);if(h1){var hd=document.createElement("div");hd.className="x2p-lbhead";h1.parentNode.insertBefore(hd,h1);hd.appendChild(h1);hd.appendChild(o.btn)}
      /* the two rules are behind the ⓘ now (owner, 2026-10-20: no repetition) */
      if(ul)ul.remove();
      var secs=[].slice.call(document.querySelectorAll("#view section.blk")),find=function(re){return secs.filter(function(s){var m=s.querySelector(".mk");return m&&re.test(m.textContent)})[0]};
      var hall=find(/hall of fame/i),grid=find(/one square/i);
      if(hall&&grid&&hall.compareDocumentPosition(grid)&Node.DOCUMENT_POSITION_PRECEDING){grid.parentNode.insertBefore(hall,grid)}
      document.querySelectorAll("#view section.blk").forEach(function(s,i){var n=s.querySelector(".xsh .no, .no");if(n)n.textContent=("0"+(i+2)).slice(-2)});
      /* Unusual findings (owner, 2026-10-20: too much text, too big, give a reason to care): each one becomes a small tile,
         a question a trader would ask, then the numbers with one dot per call or round, like a betting app's hit-rate card */
      var HOOK=[[/agree/i,"Follow the crowd?"],[/up calls|down calls/i,"Bulls or bears?"]];
      [].forEach.call(document.querySelectorAll("#view .fdg"),function(f){var k=f.querySelector(".fdg-k"),kt=k?k.textContent.trim():"";
        if(/^how big/i.test(kt)){f.remove();return}
        var h3=f.querySelector("h3"),hk=HOOK.filter(function(q){return q[0].test(kt)})[0],hook=hk?hk[1]:(h3?h3.textContent.trim():kt),fun=f.classList.contains("fun");
        var rows=[].map.call(f.querySelectorAll(".fdg-s span"),function(sp){var b=sp.querySelector("b"),sm=sp.querySelector("small"),t=b?b.textContent.trim():"",m=/(\d+)\s*(?:of|in)\s*(\d+)/i.exec(t),d="";
          if(m&&+m[2]<=40)for(var i=0;i<+m[2];i++)d+='<i'+(i<+m[1]?' class="on"':'')+'></i>';
          return '<div class="x2p-fr"><b>'+t+'</b>'+(d?'<span class="x2p-dots" aria-hidden="true">'+d+'</span>':'')+'<small>'+(sm?sm.textContent.trim():'')+'</small></div>'});
        if(!rows.length)return;
        f.innerHTML=(fun?'<span class="x2p-fk">Just for fun</span>':'')+'<h3>'+hook+'</h3>'+rows.join('');f.classList.add("x2p-ft")});
      var fs=find(/unusual findings/i),fp=fs&&fs.querySelector(".xsh-t p");if(fp)fp.textContent="Patterns so far. Small samples, so they can flip. Not advice.";
      return true},
    /* Results: beside the selector, pointing at the rounds (owner, 2026-10-20: he took too much room); the newest
       round's closest call where the screen has room for it */
    "/results":function(){var seg=$("#view .seg.bseg");if(!seg)return false;var box=seg.parentNode;box.classList.add("x2p-segbox");
      /* Highlights: no "Everyone was wrong" card (owner, 2026-10-20: no need for it) */
      [].forEach.call(document.querySelectorAll("#view a.hx2"),function(h){var k=h.querySelector(".hx2-k");if(k&&/everyone was wrong/i.test(k.textContent)){var li=h.closest("li");(li||h).remove()}
        /* (owner, 2026-10-20) compact rows, so the graded rounds and the first ticket show on landing: the label moves
           beside the title, one number stays; the sentence is on the round's own card */
        else if(k){var t=h.querySelector(".hx2-t");if(t)t.insertBefore(k,t.firstChild)}});
      var hs=$("#view .hx2s"),hsec=hs&&hs.closest("section");if(hsec)hsec.classList.add("x2p-hl-sec");
      [].forEach.call(document.querySelectorAll("#view .xsh h2 .mk"),function(m){if(!/^every round$/i.test(m.textContent.trim()))return;m.textContent="Every graded round";
        var p=m.closest(".xsh-t");p=p&&p.querySelector("p");if(p)p.textContent="Every W and every L. Newest first."});
      var h=img("02-presenter.webp",86,"");h.classList.add("x2p-hz-seg");h.setAttribute("data-x2p-host","");box.appendChild(h);
      var R=ROUNDS[ROUNDS.length-1];if(R&&R.win){var w=R.win.split(" & ").map(nmM).join(" & "),s=say("Round "+R.n+": <em>"+w+"</em> came closest.");s.classList.add("x2p-say-seg");box.appendChild(s)}
      return true},
    /* Upcoming: looking over his shoulder, beside "the calls drop before each report" */
    "/upcoming":function(){var p=$("#view .ufn");if(!p)return false;
      /* (owner, 2026-10-21) only two follow prompts for now: X2's "Follow on X to see them first" comes off this line */
      if(/Follow on X/.test(p.textContent))p.textContent="The calls drop before each report.";
      /* no host here any more (owner, 2026-10-22: he left too much space between the filter and the first day) */
      return true},
    /* Buyback: stamping on the top corner of the pool card */
    "/buyback":function(){var pool=$("#view .pool");if(!pool)return false;
      /* (owner, 2026-10-20) no "Buyback" title: the tab already says it; kept for screen readers and focus */
      var h1=$("#view h1");if(h1)h1.classList.add("x2p-sr");
      /* How the buyback works, X7's four cel panels (owner, 2026-10-20), about every bet: Season 1 is one bet, NVIDIA, then
         the pool fills for the next; Season 2 brings more bets. They say what the paragraph under the head said, so it goes.
         The host stands beside right call (buying back $EZ) and wrong call (burning the cash, calm about it). */
      var sub=$("#view p.sub"),P=SIM.poolShare!=null?Math.round(SIM.poolShare*100):69,L=SIM.leverage||5,H=SIM.leadHours||24;
      var pot='<svg class="x2p-pot" viewBox="0 0 200 210" aria-hidden="true"><g class="x2p-cn"><ellipse cx="100" cy="40" rx="13" ry="6" fill="#f2b632" stroke="#000" stroke-width="3"/></g><g class="x2p-cn"><ellipse cx="84" cy="30" rx="13" ry="6" fill="#f2b632" stroke="#000" stroke-width="3"/></g><g class="x2p-cn"><ellipse cx="116" cy="34" rx="13" ry="6" fill="#f2b632" stroke="#000" stroke-width="3"/></g>'+
        '<path d="M42 112h116c4 44-22 86-58 86s-62-42-58-86z" fill="#2d2a38" stroke="#000" stroke-width="4"/><path d="M112 112h46c4 44-22 86-58 86 30-10 15-52 12-86z" fill="#1b1924"/>'+
        '<g stroke="#000" stroke-width="2.6" fill="#f2b632"><ellipse cx="70" cy="104" rx="15" ry="7"/><ellipse cx="100" cy="98" rx="15" ry="7"/><ellipse cx="128" cy="104" rx="15" ry="7"/><ellipse cx="86" cy="92" rx="15" ry="7"/><ellipse cx="115" cy="90" rx="15" ry="7"/><ellipse cx="100" cy="82" rx="15" ry="7"/></g>'+
        '<rect x="30" y="106" width="140" height="16" rx="4" fill="#3d3a4a" stroke="#000" stroke-width="4"/><path d="M30 122q-14 6-12 20" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/><path d="M170 122q14 6 12 20" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/>'+
        '<g transform="rotate(-6 100 156)"><rect x="62" y="140" width="76" height="30" fill="#f3e6c8" stroke="#000" stroke-width="3"/><rect x="65" y="140" width="4" height="30" fill="#11714a"/><rect x="131" y="140" width="4" height="30" fill="#b3261e"/><text x="100" y="163" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="20" fill="#000">POOL</text></g></svg>';
      /* props drawn in the cel style: $EZ tokens going up; a pile of cash on fire */
      var coins='<svg class="x2p-prop x2p-coins" viewBox="0 0 90 110" aria-hidden="true">'+[[45,80,0],[24,52,.5],[62,30,1]].map(function(c){return '<g class="x2p-tok" style="animation-delay:'+c[2]+'s"><circle cx="'+c[0]+'" cy="'+c[1]+'" r="17" fill="#f2b632" stroke="#000" stroke-width="3"/><circle cx="'+c[0]+'" cy="'+c[1]+'" r="11.5" fill="none" stroke="#b9800f" stroke-width="2"/><text x="'+c[0]+'" y="'+(c[1]+4.5)+'" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="11" fill="#000">$EZ</text></g>'}).join('')+'</svg>';
      var bill=function(x,y,r,ch){return '<g transform="translate('+x+' '+y+') rotate('+r+')"><rect x="-34" y="-15" width="68" height="30" rx="1.5" fill="#d9e6cf" stroke="#1d2a1d" stroke-width="2"/>'+
          '<rect x="-30" y="-11" width="60" height="22" fill="none" stroke="#5f7d5a" stroke-width="1.2"/><path d="M-30 -6h60M-30 6h60" stroke="#a9c09f" stroke-width=".8"/>'+
          '<ellipse cx="0" cy="0" rx="9" ry="10" fill="#c2d6b6" stroke="#4d6b48" stroke-width="1.2"/><text x="0" y="4" text-anchor="middle" font-family="Georgia,serif" font-size="11" font-weight="700" fill="#2f4a2b">$</text>'+
          '<text x="-26" y="-3" font-family="Georgia,serif" font-size="7" font-weight="700" fill="#3d5a38">100</text><text x="14" y="10" font-family="Georgia,serif" font-size="7" font-weight="700" fill="#3d5a38">100</text>'+
          (ch?'<path d="M-34 -15h68v9c-8 4-14-3-22 2s-15-4-22 1-12-2-24 3z" fill="#3b2a1a" opacity=".85"/><path d="M-34 -15h68v4c-9 3-14-2-22 1s-15-3-22 0-12-1-24 2z" fill="#140c06"/>':'')+'</g>'};
      var fire='<svg class="x2p-prop x2p-fire" viewBox="0 0 140 130" aria-hidden="true">'+
        '<g class="x2p-fl"><path d="M70 6c12 24 40 34 35 70-4 27-26 38-35 38s-34-10-36-37c-2-25 14-31 16-49 10 11 9 25 15 27 5-16-5-32 5-49z" fill="#ff7a1a" stroke="#000" stroke-width="3.5" stroke-linejoin="round"/>'+
        '<path d="M71 46c6 14 19 21 16 39-2 13-10 20-17 20s-16-7-17-19c-1-12 7-16 9-25 6 7 5 14 8 15 2-9-2-18 1-30z" fill="#ffd23f"/></g>'+
        bill(52,104,-9,0)+bill(90,108,8,0)+bill(70,96,-2,1)+'</svg>';
      var sec=document.createElement("section");sec.className="x2p-how";sec.setAttribute("aria-labelledby","x2pHowH");
      sec.innerHTML='<div class="x2p-kick">How the buyback works</div><h2 id="x2pHowH" class="x2p-h2">One call. <em>The whole pool.</em></h2><div class="x2p-manga">'+
        '<div class="x2p-pn x2p-p1 x2p-sl"><span class="x2p-no">1 · The pool</span><div class="x2p-u"><div><div class="x2p-big">'+P+'%</div><p>of every $EZ trading fee drops into the pool.</p><p class="x2p-s">It starts at $0 on launch day.</p></div>'+pot+'</div></div>'+
        '<div class="x2p-pn x2p-p2 x2p-sl"><span class="x2p-no">2 · The pick</span><div class="x2p-u"><div class="x2p-myst" aria-hidden="true">?<i>#1</i></div><div class="x2p-ud" aria-hidden="true"><span class="x2p-up">▲ Up</span><span class="x2p-dn">▼ Down</span><small>One call. No take-backs.</small></div></div><p>'+H+'h before each bet, the board freezes. The AI on top makes the pick.</p></div>'+
        '<div class="x2p-pn x2p-p3 x2p-wide"><span class="x2p-no">3 · The bet</span><div class="x2p-u"><div class="x2p-ten">'+L+'x<small>on Hyperliquid</small></div><div><p>The whole pool goes on that call, right before the company reports.</p><p class="x2p-s">When the stock moves 1%, the pool moves about '+L+'%.</p></div></div>'+
          '<ol class="x2p-seasons"><li class="on"><b>Season 1</b><span>One bet: NVIDIA</span></li><li><b>Then</b><span>The pool fills up again</span></li><li><b>Season 2</b><span>Mag 7 + more</span></li></ol></div>'+
        '<div class="x2p-pn x2p-p4 x2p-wide"><div class="x2p-u">'+
          '<div class="x2p-end x2p-ev"><div class="x2p-cast"><img class="x2p-hz" data-x2p-host src="'+M+'03-stamping.webp" alt="" width="104" decoding="async">'+coins+'</div><div><h4>▲ Right call</h4><p>The profit buys back $EZ on the open market.</p></div></div>'+
          '<div class="x2p-end x2p-ed"><div class="x2p-cast"><img class="x2p-hz" src="'+M+'07-sweat.webp" alt="" width="104" decoding="async">'+fire+'</div><div><h4>▼ Wrong call</h4><p>No stop loss. The pool can be wiped out.</p></div></div>'+
        '</div></div></div>';
      var at=sub||pool;at.parentNode.insertBefore(sec,at);if(sub)sub.remove();
      /* "How big could the bag get?" comes off for now (owner, 2026-10-20) */
      var calc=$("#view #bbCalc");if(calc)calc.remove();
      return true}
  };
  function route(){var h=location.hash.replace(/^#/,"")||"/";if(h.indexOf("/")!==0)h="/";return h.split("?")[0]}
  var tries=0;
  function place(){var f=PLACE[route()];if(!f||mine())return;if(!f()&&tries++<30)setTimeout(place,100)}
  addEventListener("hashchange",function(){tries=0;setTimeout(place,60)});
  if(document.readyState==="complete")place();else addEventListener("load",place);
  setTimeout(place,300);
}catch(e){}})();

/* visitor analytics (owner, 2026-10-22: "we need to start adding analytics to the page"): Umami Cloud, cookieless (no consent banner),
   on the live domain only, and off until UMAMI_ID holds the site's Website ID (a public ID: it sits in the page source anyway).
   Page views are sent by hand (the tabs live in the URL's #), plus a few events: which sections a visit reaches, the explainer film
   (play, 25/50/75%, end, corner player, sound), the record (a swipe to another round, a tap on a card), and taps on the X links. Each event goes once
   per page load, so a visit costs about 10 to 15 of the free plan's 100,000 a month. Every visitor gets a lasting bucket, a or b, sent as
   the tag, for the planned split test of the Overview's order. localStorage "ez-track-debug" = 1 logs events to the console instead. */
(function(){try{
  var UMAMI_ID="";
  var live=/^(www\.)?earningszn\.xyz$/.test(location.hostname),dbg=false,b="a";
  try{dbg=localStorage.getItem("ez-track-debug")==="1"}catch(e){}
  try{b=localStorage.getItem("ez-ab");if(b!=="a"&&b!=="b"){b=Math.random()<.5?"a":"b";localStorage.setItem("ez-ab",b)}}catch(e){b="a"}
  window.__x2pBucket=b;
  var on=dbg||(live&&!!UMAMI_ID),sent={},q=[];
  function url(){return location.pathname+location.hash}
  function send(n,d){if(dbg){console.log("[ez-track]",n||"pageview",d||{},url(),"tag="+b);return}
    if(window.umami&&umami.track){if(n)umami.track(n,d);else umami.track(function(p){p.url=url();return p})}else q.push([n,d])}
  /* once: the key keeps an event to one send per page load */
  window.__x2pTrack=function(n,d,once){if(!on)return;if(once){if(sent[once])return;sent[once]=1}send(n,d)};
  if(!on)return;
  if(!dbg){var sc=document.createElement("script");sc.defer=true;sc.src="https://cloud.umami.is/script.js";
    sc.setAttribute("data-website-id",UMAMI_ID);sc.setAttribute("data-domains","earningszn.xyz,www.earningszn.xyz");
    sc.setAttribute("data-auto-pageview","false");sc.setAttribute("data-tag",b);
    sc.onload=function(){var x;while(x=q.shift())send(x[0],x[1])};document.head.appendChild(sc)}
  var T=window.__x2pTrack;
  /* page views: on load and on every tab change; not for an address that only sends you on to the Overview (model pages, and
     since the two-tab launch the Leaderboard, Results and Buyback tabs), so those don't count twice */
  var gone=function(){return /^#\/(leaderboard|models?|results|buyback)(\/|$)/.test(location.hash)};
  if(!gone())T();addEventListener("hashchange",function(){if(gone())return;Object.keys(sent).forEach(function(k){if(k.indexOf("sec-")===0)delete sent[k]});T()});
  /* sections reached: once each, when 40% of one is on screen (the Overview's own sections; the others render inside #view) */
  var SEC=[[".x2p-vt","film"],["#gpu","bet"],["#record","record"],["#standings","standings"],["#learn","stats"],["#x2pHl","highlights"],["#get","get"]];
  if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&e.target.offsetParent!==null)T("section",{s:e.target.getAttribute("data-x2p-sec")},"sec-"+e.target.getAttribute("data-x2p-sec"))})},{threshold:.4});
    var seen=function(){SEC.forEach(function(x){var el=document.querySelector(x[0]);if(el&&!el.hasAttribute("data-x2p-sec")){el.setAttribute("data-x2p-sec",x[1]);io.observe(el)}})};
    seen();addEventListener("hashchange",function(){setTimeout(seen,400)});setTimeout(seen,1500)}
  /* the explainer film */
  var ex=window.__x2pExplainer,v=ex&&ex.video;
  if(v){var mk={};v.addEventListener("play",function(){T("film",{a:"play"},"film-play")});
    v.addEventListener("timeupdate",function(){if(!v.duration)return;var f=v.currentTime/v.duration;[25,50,75].forEach(function(m){if(f>=m/100&&!mk[m]){mk[m]=1;T("film",{a:String(m)},"film-"+m)}})});
    v.addEventListener("ended",function(){T("film",{a:"end"},"film-end")});
    v.addEventListener("volumechange",function(){T("film",{a:v.muted?"mute":"unmute"},"film-snd-"+(v.muted?"off":"on"))})}
  /* the record: a swipe to another round, a flip, a round's film started by a tap */
  var car=document.getElementById("car");
  if(car){var cn=function(){var c=car.querySelector(".card.cur");return c&&c.getAttribute("data-n")},c0=cn(),st=0;
    car.addEventListener("scroll",function(){clearTimeout(st);st=setTimeout(function(){var n=cn();if(c0===null)c0=n;else if(n&&n!==c0)T("record",{a:"swipe"},"rec-swipe")},300)},{passive:true})}
  document.addEventListener("click",function(e){var t=e.target;if(!t.closest)return;
    var x=t.closest('a[href*="x.com/"]');if(x){T("follow",{where:x.classList.contains("x2p-xhd")?"header":x.classList.contains("x2p-xlink")?"record":"other"});return}
    if(t.closest("#record .card")){T("record",{a:"tap"},"rec-tap")}
    if(t.closest("#x2pHl .card")){T("highlights",{a:"tap"},"hl-tap")}},true);
}catch(e){}})();

/* ---- the bet ticket (owner, 2026-10-22): Admit One's format with Fight Night's colours and words, under the explainer film ---- */
/* v4 "Admit One x Fight Night" (owner, 2026-10-22: "I sort of like the ticket format more from Admit One, but I prefer ... the colors
   in general, the layout of the colors and how everything is written, more from Fight Night").
   FORMAT from Admit One (v1): the die cut (a concave quarter-circle bite at each corner, a half-circle notch top and bottom at the
   perforation), the perforation as a row of punched round holes with a lit lip and a shaded wall, the thin printed double-rule frame
   with its arcs, the card stock (fibre grain, longer fibres, toned cut edges, a lit top edge and a shaded bottom edge for the card's
   thickness), the soft contact shadow plus the small hard offset, and the chip window as a picture plate (stock margin + ink keyline).
   COLOURS, THEIR LAYOUT AND THE WRITING from Fight Night (v2): the green header strip ("★ $EZ MAIN EVENT ★" over the body, "SEASON 1"
   over the stub), the red footer strip ("ADMIT ONE" over the body, "№ 000001" over the stub), the ivory body, "BET #1:" pressed in ink
   and "NVIDIA" in gold foil over a red print offset, three red stars under it, centred in the body column, the faint red sunburst.
   The strips are solids printed to bleed, so the die cuts straight through them: the corner bites, the notches and the punched holes
   all go through the green and the red. The double rule is printed on the ivory between the strips (frame "inside"): type and fine
   rules are kept off the solids and away from the trim, as a printer would, and its corners and the perforation keep A's arcs.
   Dropped: A's side colour bars, vertical "ADMIT ONE", "$EZ · SEASON 1" line and serials; B's torn edge, worn corners, crease, gloss.
   NVIDIA's foil is one smooth mirror gradient (bright top, a single soft horizon, warm bounce at the foot) with a lit top rim and a
   dark keyline, no hard stops, so it reads as stamped foil and not as stripes. Static, no animation.
   No filter, mask or blend on any ancestor of the live #gpu chip: the paper, the rules and the shadows are siblings of it.
   Built from the mockup tools/concepts/bet-ticket-v4-combo.js (owner, 2026-10-22: "push it to production"); runs once at load. (The mockup's "frame around"
   variant is kept in the code but off.) */
(function(){try{var run=function(){
  var d=document,H=d.documentElement;if(H.classList.contains('x2pbt'))return 'already';H.classList.add('x2pbt');
  var F={},AROUND=false;
  var P='html.x2p.x2d.x2pbt';
  var CX0=392,CX1=1608,CY0=370,CY1=1056,CW=CX1-CX0,CH=CY1-CY0,pct=function(n){return (n*100).toFixed(4)+'%'};
  var enc=function(s){return 'url("data:image/svg+xml,'+encodeURIComponent(s)+'")'};
  var INK='#141217',PAPER='#e9ddbf',GREEN='#1f7a45',RED='#c8372a';
  /* ---- textures (A's stock): static data-URI svgs, rasterised once ---- */
  var GRAIN=enc("<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='t' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.7' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .30 0 0 0 0 .22 0 0 0 0 .11 1.5 0 0 0 -.79'/></filter><filter id='l' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.7' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 .98 -1.7 0 0 0 .79'/></filter><filter id='s' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='1' seed='19' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .28 0 0 0 0 .2 0 0 0 0 .1 0 7 0 0 -5.05'/></filter><rect width='200' height='200' filter='url(#t)'/><rect width='200' height='200' filter='url(#l)'/><rect width='200' height='200' filter='url(#s)'/></svg>");
  /* paper showing through the solids: fine drop-outs (A) and B's ink voids, a starved patch toward the header's far end, rubbed scuffs */
  var DROP=enc("<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='d' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='2' seed='23' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .96 0 0 0 0 .93 0 0 0 0 .86 0 6 0 0 -4.3'/></filter><rect width='180' height='180' filter='url(#d)'/></svg>");
  var NZ=function(body,w,op){return enc("<svg xmlns='http://www.w3.org/2000/svg' width='"+w+"' height='"+w+"'><filter id='f' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>"+body+"</filter><rect width='100%' height='100%' filter='url(#f)' opacity='"+op+"'/></svg>")};
  var VOID=NZ("<feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' seed='21' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .91  0 0 0 0 .82  14 0 0 0 -10.4'/>",180,.32);
  var VOID2=enc("<svg xmlns='http://www.w3.org/2000/svg' width='220' height='17'><defs><linearGradient id='g'><stop offset='0' stop-color='#fff' stop-opacity='0'/><stop offset='.55' stop-color='#fff' stop-opacity='.25'/><stop offset='1' stop-color='#fff'/></linearGradient><mask id='m'><rect width='100%' height='100%' fill='url(#g)'/></mask></defs><filter id='f' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.55' numOctaves='2' seed='37'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .91  0 0 0 0 .82  12 0 0 0 -8.2'/></filter><rect width='100%' height='100%' filter='url(#f)' mask='url(#m)' opacity='.5'/></svg>");
  var SCUFF=NZ("<feTurbulence type='fractalNoise' baseFrequency='.03 .09' numOctaves='3' seed='5' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .92  0 0 0 0 .84  9 0 0 0 -6.3'/>",360,.2);
  var MOTTLE=enc("<svg xmlns='http://www.w3.org/2000/svg' width='560' height='180'><filter id='m' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.011 .03' numOctaves='3' seed='8'/><feColorMatrix values='0 0 0 0 .55 0 0 0 0 .40 0 0 0 0 .18 .9 0 0 0 -.39'/></filter><rect width='560' height='180' filter='url(#m)'/></svg>");
  var STAR=function(c){return enc("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='"+c+"' d='M10 .8l2.7 6.1 6.6.6-5 4.4 1.5 6.5L10 15l-5.8 3.4 1.5-6.5-5-4.4 6.6-.6z'/></svg>")};
  /* longer fibres and a few specks, seeded so every load is the same sheet */
  var seed=20261022,rnd=function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296};
  var FW=300,FH=200,fs='';
  for(var k=0;k<34;k++){var x=rnd()*FW,y=rnd()*FH,a=rnd()*Math.PI*2,L=5+rnd()*rnd()*30,bend=(rnd()-.5)*L*.5,
    ex=x+Math.cos(a)*L,ey=y+Math.sin(a)*L,cx=(x+ex)/2-Math.sin(a)*bend,cy=(y+ey)/2+Math.cos(a)*bend,
    col=rnd()<.72?'110,84,48':(rnd()<.6?'96,104,122':'160,70,60'),op=(.13+rnd()*.19).toFixed(2),w=(.4+rnd()*.45).toFixed(2);
    fs+="<path d='M"+x.toFixed(1)+' '+y.toFixed(1)+'Q'+cx.toFixed(1)+' '+cy.toFixed(1)+' '+ex.toFixed(1)+' '+ey.toFixed(1)+"' stroke='rgba("+col+','+op+")' stroke-width='"+w+"' fill='none' stroke-linecap='round'/>"}
  for(k=0;k<9;k++){fs+="<circle cx='"+(rnd()*FW).toFixed(1)+"' cy='"+(rnd()*FH).toFixed(1)+"' r='"+(.3+rnd()*.45).toFixed(2)+"' fill='rgba(55,40,22,"+(.22+rnd()*.25).toFixed(2)+")'/>"}
  var FIB=enc("<svg xmlns='http://www.w3.org/2000/svg' width='"+FW+"' height='"+FH+"'>"+fs+"</svg>");
  var PTOOTH=enc("<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='g' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95 0 0 0 0 .92 0 0 0 0 .84 1.15 0 0 0 -.6'/></filter><rect width='160' height='160' filter='url(#g)'/></svg>");
  /* ---- A's die line: four corner bites, a notch top and bottom at the perforation, the punched holes; full-size layers, intersected ---- */
  var cut=function(at,r){return 'radial-gradient(circle at '+at+',#0000 calc('+r+' - .35px),#000 calc('+r+' + .45px))'};
  var DIE=[cut('0 0','var(--rb)'),cut('100% 0','var(--rb)'),cut('0 100%','var(--rb)'),cut('100% 100%','var(--rb)'),
    cut('var(--px) 0','var(--rn)'),cut('var(--px) 100%','var(--rn)'),
    'radial-gradient(circle at var(--px) 50%,#0000 calc(var(--hr) - .3px),#000 calc(var(--hr) + .4px)) 0 50%/100% var(--hp) repeat-y'].join(',');
  var MASK='-webkit-mask:'+DIE+';-webkit-mask-composite:source-in;mask:'+DIE+';mask-composite:intersect;';
  var STRIPS='linear-gradient(180deg,#000 0 var(--st),#0000 var(--st) calc(100% - var(--sb)),#000 calc(100% - var(--sb)))';
  var hole=function(at,r){return 'radial-gradient(circle at '+at+',#0000 calc('+r+' - .3px),#000 calc('+r+' + .3px))'};
  var ring=function(at,r,w,c){return 'radial-gradient(circle at '+at+',#0000 calc('+r+' - .3px),'+c+' '+r+','+c+' calc('+r+' + '+w+'px),#0000 calc('+r+' + '+(w+.4)+'px))'};
  /* the double rule printed on the ivory between the strips: its sides at A's inset from the die line, a concave arc at each corner
     (echoing the bites) and a half-round dip under each notch (echoing the notches); d = distance in from the outer rule, w = weight */
  var ruleIn=function(d,w){
    var o='-'+d+'px',e='calc(100% + '+d+'px)',rc='calc(var(--rc) + '+d+'px)',rq='calc(var(--rq) + '+d+'px)',qx='calc(var(--px) - var(--fi) - '+d+'px)',c='var(--ink)';
    var M=[hole(o+' '+o,rc),hole(e+' '+o,rc),hole(o+' '+e,rc),hole(e+' '+e,rc),hole(qx+' '+o,rq),hole(qx+' '+e,rq)].join(',');
    return 'position:absolute;left:calc(var(--fi) + '+d+'px);right:calc(var(--fi) + '+d+'px);top:calc(var(--st) + var(--fg) + '+d+'px);bottom:calc(var(--sb) + var(--fg) + '+d+'px);'+
      'border:'+w+'px solid '+c+';background:'+[ring(o+' '+o,rc,w,c),ring(e+' '+o,rc,w,c),ring(o+' '+e,rc,w,c),ring(e+' '+e,rc,w,c),ring(qx+' '+o,rq,w,c),ring(qx+' '+e,rq,w,c)].join(',')+
      ';background-origin:border-box;-webkit-mask:'+M+';-webkit-mask-composite:source-in;mask:'+M+';mask-composite:intersect;pointer-events:none'};
  /* comparison only: A's own frame (round the die line at a constant inset), ink on the ivory and knocked out (paper) on the strips */
  var ruleAround=function(i,w,c){
    var ri='calc(var(--rb) + '+i+'px)',rn='calc(var(--rn) + '+i+'px)',px='calc(var(--px) - '+i+'px)',o='-'+i+'px',e='calc(100% + '+i+'px)';
    var M=[hole(o+' '+o,ri),hole(e+' '+o,ri),hole(o+' '+e,ri),hole(e+' '+e,ri),hole(px+' '+o,rn),hole(px+' '+e,rn)].join(',');
    return 'position:absolute;inset:'+i+'px;border:'+w+'px solid '+c+';background:'+
      [ring(o+' '+o,ri,w,c),ring(e+' '+o,ri,w,c),ring(o+' '+e,ri,w,c),ring(e+' '+e,ri,w,c),ring(px+' '+o,rn,w,c),ring(px+' '+e,rn,w,c)].join(',')+
      ';background-origin:border-box;-webkit-mask:'+M+';-webkit-mask-composite:source-in;mask:'+M+';mask-composite:intersect;pointer-events:none'};
  var css=[
    /* geometry: --b is the body column (B's), the perforation sits at its right edge; --st/--sb are the strips (B's, a touch slimmer on phones) */
    P+' .x2p-bt{--ink:rgba(20,18,23,.88);--ls:clamp(25px,7.4vw,34px);--rb:11px;--rn:8px;--hr:1.7px;--hp:6.5px;'+
      '--b:clamp(128px,41vw,200px);--px:var(--b);--st:clamp(15px,4vw,17px);--sb:var(--st);--fi:5px;--fg:2.5px;--rc:4.5px;--rq:3.5px;'+
      '--pad:calc(var(--st) + 12px);'+(AROUND?'--st:clamp(19px,5vw,22px);--pad:calc(var(--st) + 5px);':'')+
      'position:relative;isolation:isolate;margin:22px 0 0;max-width:560px;color:'+INK+'}',
    /* A's shadows: a soft contact shadow (blurred sibling, never an ancestor of the chip) and the site's hard offset, small */
    P+' .bt-sh{position:absolute;inset:0;z-index:-2;filter:blur(4.5px);transform:translate(2px,6px);pointer-events:none}',
    P+' .bt-sh>i,'+P+' .bt-hs{position:absolute;inset:0;background:#000;'+MASK+'}',
    P+' .bt-sh>i{opacity:.75}',
    P+' .bt-hs{z-index:-1;transform:translate(4px,4px);pointer-events:none}',
    /* the card: B's grid (body column | stub), the strips' depth as padding */
    P+' .bt-p{position:relative;display:grid;grid-template-columns:var(--b) minmax(0,1fr);align-items:center;padding:var(--pad) 0;min-height:0}',
    /* the paper: its own absolutely placed layer, die-cut by the mask; the label and the chip sit on it unmasked */
    P+' .bt-pp{position:absolute;inset:0;z-index:0;pointer-events:none;'+MASK+
      'background:'+[
        /* each hole's cut wall: a lit lip upper left, a shaded wall lower right (light from the top left) */
        'radial-gradient(circle at calc(var(--px) + .7px) calc(50% + .9px),#0000 calc(var(--hr) - .1px),rgba(70,48,20,.55) calc(var(--hr) + .2px),#0000 calc(var(--hr) + 1.1px)) 0 50%/100% var(--hp) repeat-y',
        'radial-gradient(circle at calc(var(--px) - .6px) calc(50% - .7px),#0000 calc(var(--hr) - .1px),rgba(255,255,255,.7) calc(var(--hr) + .1px),#0000 calc(var(--hr) + .9px)) 0 50%/100% var(--hp) repeat-y',
        'radial-gradient(circle at var(--px) 50%,rgba(84,58,26,.34) calc(var(--hr) + .4px),rgba(84,58,26,0) calc(var(--hr) + 1.7px)) 0 50%/100% var(--hp) repeat-y',
        /* toning along every cut: the bites, the notches, the straight edges; the top edge catches light, the bottom shows the card's thickness */
        'radial-gradient(circle at 0 0,#0000 var(--rb),rgba(140,100,45,.18) calc(var(--rb) + .5px),#0000 calc(var(--rb) + 6px))',
        'radial-gradient(circle at 100% 0,#0000 var(--rb),rgba(140,100,45,.18) calc(var(--rb) + .5px),#0000 calc(var(--rb) + 6px))',
        'radial-gradient(circle at 0 100%,#0000 var(--rb),rgba(110,78,34,.24) calc(var(--rb) + .5px),#0000 calc(var(--rb) + 6px))',
        'radial-gradient(circle at 100% 100%,#0000 var(--rb),rgba(110,78,34,.26) calc(var(--rb) + .5px),#0000 calc(var(--rb) + 6px))',
        'radial-gradient(circle at var(--px) 0,#0000 var(--rn),rgba(140,100,45,.17) calc(var(--rn) + .5px),#0000 calc(var(--rn) + 5px))',
        'radial-gradient(circle at var(--px) 100%,#0000 var(--rn),rgba(110,78,34,.22) calc(var(--rn) + .5px),#0000 calc(var(--rn) + 5px))',
        'linear-gradient(180deg,rgba(255,255,255,.55) 0 1px,rgba(150,112,58,.10) 1px,#0000 6px)',
        'linear-gradient(0deg,rgba(60,40,14,.45) 0 1.2px,rgba(120,90,45,.14) 1.2px,#0000 7px)',
        'linear-gradient(90deg,rgba(255,255,255,.4) 0 .8px,rgba(150,112,58,.12) .8px,#0000 6px)',
        'linear-gradient(270deg,rgba(78,54,22,.3) 0 1px,rgba(150,112,58,.12) 1px,#0000 6px)',
        /* light across the card, slightly brighter top left, a hair darker bottom right */
        'linear-gradient(168deg,rgba(255,255,255,.1),rgba(255,255,255,0) 42%,rgba(110,80,35,.07))',
        /* B's aged rim: the ivory a shade warmer toward the edges */
        'radial-gradient(140% 120% at 45% 40%,#0000 55%,rgba(130,92,30,.15))',
        /* B's print: rubbed scuffs and ink voids (paper on paper disappears, so they only show on the solids) */
        SCUFF+' 140px 3px/360px',
        VOID+' 0 0/180px',
        VOID2+' right 14px top 0/220px var(--st) no-repeat',
        /* B's letterpress strips, bled past the die: ink with a darker squeeze edge on the inner side */
        'linear-gradient(#0000 calc(var(--st) - 1.2px),rgba(0,0,0,.22) calc(var(--st) - 1.2px)) 0 0/100% var(--st) no-repeat',
        'linear-gradient('+GREEN+','+GREEN+') 0 0/100% var(--st) no-repeat',
        'linear-gradient(rgba(0,0,0,.22) 1.2px,#0000 1.2px) 0 100%/100% var(--sb) no-repeat',
        'linear-gradient('+RED+','+RED+') 0 100%/100% var(--sb) no-repeat',
        /* the card under the ink: A's fibres and grain (the solids cover them, as ink covers the sheet) */
        FIB+' 0 0/'+FW+'px '+FH+'px',
        GRAIN+' 0 0/200px 200px',
        /* B's pale red sunburst round the name, fading out toward the edges of the body column */
        'radial-gradient(closest-side at 50% 52%,#0000 35%,'+PAPER+' 100%) 0 0/var(--b) 100% no-repeat',
        'repeating-conic-gradient(from 3deg at 50% 52%,rgba(200,55,42,.05) 0 5deg,#0000 5deg 10deg) 0 0/var(--b) 100% no-repeat',
        MOTTLE+' 0 0/100% 100%',
        PAPER].join(',')+'}',
    /* the drop-outs stop at the strips: the ivory keeps only A's clean grain */
    /* printed rules (A's weights: a heavier outer and a hairline inner, 3.3px apart), the black pass a hair off the die */
    AROUND?P+' .bt-r1{'+ruleAround(5,1.3,'var(--ink)')+'}':P+' .bt-r1{'+ruleIn(0,1.3)+'}',
    AROUND?P+' .bt-r2{'+ruleAround(8.3,.7,'var(--ink)')+'}':P+' .bt-r2{'+ruleIn(3.3,.7)+'}',
    P+' .bt-r1,'+P+' .bt-r2{transform:translate(.8px,-.4px)}',
    /* the perforation's lip either side of the holes (A), on the ivory only: on the solids it read as a scratch */
    P+' .bt-pl{position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,#0000 calc(var(--px) - 4.5px),rgba(255,255,255,.3) calc(var(--px) - 4.5px) calc(var(--px) - 3.5px),#0000 calc(var(--px) - 3.5px) calc(var(--px) + 3.6px),rgba(96,70,32,.16) calc(var(--px) + 3.6px) calc(var(--px) + 5.2px),#0000 calc(var(--px) + 5.2px));'+
      '-webkit-mask:linear-gradient(180deg,#0000 var(--st),#000 var(--st) calc(100% - var(--sb)),#0000 calc(100% - var(--sb)));mask:linear-gradient(180deg,#0000 var(--st),#000 var(--st) calc(100% - var(--sb)),#0000 calc(100% - var(--sb)))}',
    /* ---- B's strip labels, reversed out of the ink ---- */
    P+' .bt-st{position:absolute;left:0;right:0;z-index:2;display:flex;align-items:center;pointer-events:none;font:800 8.6px/1 "Barlow Condensed",Barlow,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#f3ead3;white-space:nowrap}',
    P+' .bt-st.bt-hd{top:0;height:var(--st)}',P+' .bt-st.bt-ft{bottom:0;height:var(--sb)}',
    AROUND?P+' .bt-st.bt-hd{top:9px;height:calc(var(--st) - 9px)}'+P+' .bt-st.bt-ft{bottom:9px;height:calc(var(--sb) - 9px)}':'',
    P+' .bt-st span{display:flex;align-items:center;gap:5px}',P+' .bt-st span i{display:block;width:7px;height:7px;background:'+STAR('#f2b632')+' 0 0/100% no-repeat}',
    P+' .bt-st .l{width:var(--b);justify-content:center;padding:0 5px 0 calc(12px + .22em)}',P+' .bt-st .r{flex:1;justify-content:center;padding:0 15px 0 10px}',
    /* the serial: B's numbering-machine "No 000001" in ink on the red, right edge on the chip window's right edge */
    P+' .bt-st .r.e{justify-content:flex-end;padding:0 15px 0 0}',
    P+' .bt-st .bt-no{display:block;text-transform:none;letter-spacing:.16em;margin-right:-.16em;color:'+INK+';opacity:.86;transform:translate(.6px,-.4px) rotate(-.6deg);font-variant-numeric:tabular-nums}',
    P+' .bt-st .bt-no u{display:inline-block;font-size:.7em;line-height:1;vertical-align:.42em;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:1.5px;margin:0 .32em 0 .02em;letter-spacing:0}',
    P+' .bt-st .bt-no s{text-decoration:none;position:relative}',
    /* ---- B's label, centred in the body column ---- */
    P+' .bt-b{position:relative;z-index:1;display:grid;justify-items:center;align-content:center;min-width:0;padding:0 5px 0 12px}',
    P+' .bt-b .x2p-cdh{margin:0;display:block;padding:0}',
    P+' .bt-b .x2p-cdh .k{display:none}',
    P+'[data-theme] .bt-b .x2p-cdh b{display:block;text-align:center;font:400 var(--ls)/.94 Anton,Impact,sans-serif!important;text-transform:uppercase;letter-spacing:.01em;color:'+INK+';text-shadow:none;white-space:nowrap}',
    /* "BET #1:" pressed in ink: B's letterpress (a pale lip under each stroke), edges roughened a hair by the press (static) */
    P+' .bt-b .x2p-cdh .bt-ink{display:block;text-shadow:0 .9px 0 rgba(255,251,238,.75)}',
    P+' .bt-b .x2p-cdh b i{font-style:normal;color:'+INK+'}',
    'html.x2pbt-rough'+P.slice(4)+' .bt-b .x2p-cdh .bt-ink{filter:url(#btRough)}',
    /* "NVIDIA" in gold foil: the red print offset and a dark keyline below (B), then the foil itself: a lit top rim and one smooth mirror gradient */
    P+' .bt-b .x2p-cdh b em{position:relative;display:table;margin:.05em auto 0;font-style:normal;color:transparent;text-shadow:.055em .055em 0 '+RED+';-webkit-text-stroke:.75px #3a2706}',
    P+' .bt-b .x2p-cdh b em::before,'+P+' .bt-b .x2p-cdh b em::after{content:attr(data-t);content:attr(data-t) / "";position:absolute;left:0;top:0;right:0;text-shadow:none;-webkit-text-stroke:0;pointer-events:none}',
    P+' .bt-b .x2p-cdh b em::before{color:#fff7dc;transform:translate(.35px,-1.05px)}',
    P+' .bt-b .x2p-cdh b em::after{transform:translate(.5px,-.45px);-webkit-text-fill-color:transparent;-webkit-background-clip:text;background-clip:text;background:'+
      (F.foil||[
        /* one soft specular bloom high on the left (the light), and a faint cool kiss of the room top right: mirror, not stripes */
        'radial-gradient(ellipse 46% 70% at 28% 18%,rgba(255,252,236,.72),rgba(255,248,214,.3) 45%,rgba(255,244,200,0) 75%)',
        'radial-gradient(ellipse 40% 60% at 86% 22%,rgba(255,250,232,.38),rgba(255,250,232,0) 70%)',
        /* the mirror: bright sky, a single soft horizon below the middle, the warm bounce of the paper at the foot */
        'linear-gradient(180deg,#fff0bf 0%,#fddc7a 18%,#f5c043 38%,#e3a628 50%,#b98110 57%,#d89d24 64%,#f3bf45 80%,#fcdc8a 100%)'
      ].join(','))+';-webkit-background-clip:text;background-clip:text}',
    /* B's three red stars under the name */
    P+' .bt-mk{display:flex;align-items:center;justify-content:center;gap:6px;margin:8px 0 0}',
    P+' .bt-mk i{display:block;width:8px;height:8px;background:'+STAR(RED)+' 0 0/100% no-repeat}',P+' .bt-mk i:nth-child(2){width:10px;height:10px}',
    /* ---- the stub: A's picture plate (a thin margin of the stock, then an ink keyline), concept 2's crop ---- */
    P+' .bt-s{position:relative;z-index:1;min-width:0;display:flex;align-items:center;padding:0 15px 0 10px}',
    P+' .bt-s #gpu{margin:0!important;width:100%;max-width:none!important;min-width:0}',
    P+' .bt-s #gpu .gpu-c{border:0!important;border-radius:0!important;box-shadow:none!important;background:none!important;overflow:visible;width:100%}',
    P+'[data-theme] .bt-s #gpu .gpu-img{position:relative!important;width:100%!important;aspect-ratio:'+CW+'/'+CH+'!important;clip-path:none!important;margin:0!important;max-width:none!important;overflow:hidden!important;'+
      'border:0!important;border-radius:0!important;box-shadow:none!important;outline:.9px solid rgba(20,18,23,.82)!important;outline-offset:2px!important;background:#000}',
    P+' .bt-s #gpu .gpu-img img,'+P+' .bt-s #gpu .gpu-img .gpu-core{position:absolute!important;inset:auto!important;left:'+pct(-CX0/CW)+'!important;top:'+pct(-CY0/CH)+'!important;width:'+pct(2000/CW)+'!important;height:'+pct(1500/CH)+'!important;max-width:none!important}',
    P+' .bt-s #gpuCore .gc-u{font:800 58px "Barlow Condensed",Barlow,sans-serif;letter-spacing:.12em;stroke-width:9px;transform:translateY(12px)}',
    P+' .bt-s #gpu :is(.gpu-t,.gpu-n){display:none}',
    /* the photo printed on the stock: a static paper tooth and a faint ivory wash between the photo and the live digits (normal blend, no filter) */
    P+' .bt-s #gpu .gpu-img::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:'+PTOOTH+' 0 0/160px 160px,linear-gradient(rgba(239,228,200,.06),rgba(239,228,200,.06))}',
    P+' .bt-s #gpu .gpu-img .gpu-core{z-index:2}',
    /* ---- phones: hero on two lines; the film 16px in from each edge (in line with the headline), the bet ticket 30px in,
       so it reads smaller than the film (owner, 2026-10-22, option A: "touching the edges", "the video takes center stage").
       Tight gaps, A1 (owner, same day: stretching the section to the screen's height left too much space, and so did the
       space moved above the headline or before the record): the record follows straight on, so on a tall phone its
       heading, bullets and the top of the cards show under the ticket. ---- */
    '@media (max-width:599.98px){',
    P+'[data-theme] section.hero{padding-top:14px}',
    P+'[data-theme] section.hero h1{font-size:calc((100vw - 32px) / 10)!important;line-height:.94!important}',
    P+' section.x2o-bet:has(>.x2p-vt){padding-top:6px;margin-top:8px}',
    P+' .x2p-vt{margin:28px 0 0;max-width:none;overflow-x:clip}',
    P+' .x2p-vt .vt-tag{left:16px}',
    /* (owner, 2026-10-22, later) the ticket as wide as the film on phones too (from 600px both were already 560px) */
    P+' .x2p-bt{margin:24px 0 0;max-width:none;overflow-x:clip}',
    P+' section.x2o-bet + section.x2o-rc{padding-top:22px}',
    '}'
  ].join('\n');
  if(F.rough!==0)H.classList.add('x2pbt-rough');
  var st=d.createElement('style');st.id='x2pbt-css';st.textContent=css;d.head.appendChild(st);
  var g=d.getElementById('gpu'),h=d.querySelector('.x2p-cdh');if(!g||!h)return 'missing';
  var mk=function(tag,cls,html){var e=d.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e};
  var hid=function(e){e.setAttribute('aria-hidden','true');return e};
  /* the label: "Bet #1:" wrapped so the press roughening stays off the foil (same words, same reading order) */
  var lb=h.querySelector('b'),em=lb&&lb.querySelector('em');
  if(lb&&em&&!lb.querySelector('.bt-ink')){var sp=mk('span','bt-ink');while(lb.firstChild&&lb.firstChild!==em)sp.appendChild(lb.firstChild);lb.insertBefore(sp,em);lb.insertBefore(d.createTextNode(' '),em);
    if(/\s$/.test(sp.textContent)&&sp.lastChild.nodeType===3)sp.lastChild.nodeValue=sp.lastChild.nodeValue.replace(/\s+$/,'')}
  if(em)em.setAttribute('data-t',em.textContent);
  var bt=mk('div','x2p-bt'),sh=hid(mk('div','bt-sh')),hs=hid(mk('div','bt-hs')),p=mk('div','bt-p'),b=mk('div','bt-b'),s=mk('div','bt-s');
  sh.appendChild(mk('i'));bt.appendChild(sh);bt.appendChild(hs);bt.appendChild(p);g.parentNode.insertBefore(bt,g);
  if(F.rough!==0){var fs2=d.createElementNS('http://www.w3.org/2000/svg','svg');fs2.setAttribute('width','0');fs2.setAttribute('height','0');fs2.setAttribute('aria-hidden','true');fs2.style.cssText='position:absolute;width:0;height:0';
    fs2.innerHTML="<filter id='btRough' x='-4%' y='-4%' width='108%' height='108%'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' seed='5' result='n'/><feDisplacementMap in='SourceGraphic' in2='n' scale='.55' xChannelSelector='R' yChannelSelector='G'/></filter>";bt.appendChild(fs2)}
  var pp=hid(mk('div','bt-pp'));p.appendChild(pp);
  ['bt-pl','bt-r1','bt-r2'].forEach(function(c){pp.appendChild(hid(mk('i',c)))});
  if(AROUND){/* the same frame knocked out of the strips: paper-coloured over the solids */
    var ko=hid(mk('i','bt-ko'));ko.style.cssText='position:absolute;inset:0;-webkit-mask:'+STRIPS+';mask:'+STRIPS;pp.appendChild(ko);
    var k1=hid(mk('i','bt-r1')),k2=hid(mk('i','bt-r2'));k1.style.setProperty('--ink','#efe4c8');k2.style.setProperty('--ink','#efe4c8');ko.appendChild(k1);ko.appendChild(k2)}
  b.appendChild(h);b.appendChild(hid(mk('div','bt-mk','<i></i><i></i><i></i>')));p.appendChild(b);
  p.appendChild(s);s.appendChild(g);
  /* B's strips and words; the serial's digits inked a touch unevenly, as a numbering machine does */
  var ink=[1,.84,.95,.88,1,.9],dy=[0,.3,-.2,.2,-.3,.1];
  var num='N<u>o</u> '+'000001'.split('').map(function(c,i){return '<s style="opacity:'+ink[i]+';top:'+dy[i]+'px">'+c+'</s>'}).join('');
  p.appendChild(hid(mk('div','bt-st bt-hd','<span class="l"><i></i>$EZ main event<i></i></span><span class="r">Season 1</span>')));
  p.appendChild(hid(mk('div','bt-st bt-ft','<span class="l">Admit one</span><span class="r e"><span class="bt-no">'+num+'</span></span>')));
  var im=g.querySelector('img');if(im){im.loading='eager'}
  return 'ok'};run()}catch(e){}})();
/* ---- two-tab launch (owner, 2026-10-22): only Overview and Upcoming. The Overview reads: the first screen, 01 current
   standings (the Leaderboard tab's board: hit rate and ROI, no avg miss; a bare ⓘ turns it to "How we rank"; the "As it
   stands" ticket under it), 02 the record, 03 the proof (the Leaderboard's four stats in the owner's order: hit rate, ROI,
   avg miss, by sector), 04 the Results highlights (landing on the middle card, Tightest race, its story side up), 05 Get $EZ.
   The Leaderboard, Results and Buyback tabs are off and their addresses go to the Overview; "Every graded round" comes later.
   build.py hands this block the page's own renderers (window.__x2pR) on X2+ only. ---- */
(function(){try{
  var d=document,R=window.__x2pR,$=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
  var st=$("#standings"),rec=$("#record"),ln=$("#learn");if(!R||!st||!rec||!ln)return;
  d.documentElement.classList.add("x2p-launch");
  /* tabs: Overview and Upcoming */
  $$(".nav a").forEach(function(a){if(/^(leaderboard|results|buyback)$/.test(a.dataset.r||""))a.remove()});
  /* a third tab that says what comes next (owner, 2026-10-22: "Buybacks (soon)", option B): the tabs' own font (an <a> with no
     address, so it takes the same styles and goes nowhere), dimmed, a small gold "Soon" tag; it lights up when the buyback ships */
  var nav=$(".nav");if(nav&&!$(".x2p-soon",nav)){var sn=d.createElement("a");sn.className="x2p-soon";sn.setAttribute("aria-disabled","true");sn.innerHTML='Buybacks <small aria-hidden="true">Soon</small><span class="sr"> (coming soon)</span>';nav.appendChild(sn)}
  function offRoute(){if(/^#\/(leaderboard|models|results|buyback)(\/|$)/.test(location.hash))location.replace("#/")}
  offRoute();addEventListener("hashchange",offRoute);
  /* the standings as printed tickets (owner, 2026-10-22) are on the X2+ preview; the live site keeps today's board until the
     owner says so: make_site.py sets window.__x2pClassicBoard there (SITE_TIX=1 builds with the tickets) */
  var TIX=!window.__x2pClassicBoard;
  /* the PRINTED block of skin-x2plus.css (names foil-stamped into the tickets) is on everywhere, production too (owner, 2026-10-23) */
  d.documentElement.classList.add("x2p-prt");
  /* 01 standings and 03 stats come from the Leaderboard page, rendered once out of sight */
  var hold=d.createElement("div");hold.hidden=true;d.body.appendChild(hold);hold.innerHTML=R.vModels();R.wireModels(hold);
  var lbx=$(".lbx",hold);
  if(lbx&&window.__x2pLbFlip){var o=window.__x2pLbFlip(lbx);
    $$(".band,.lede",st).forEach(function(e){if(e.parentNode===st)e.remove()});
    ($(".sh .tx",st)||$(".sh",st)||st).appendChild(o.btn);st.appendChild(o.fl);st.appendChild(o.ft);
    /* the "As it stands" line on its new ticket (owner, 2026-10-22: the film ticket's layout, real paper; the words stay) */
    var sy=$(".x2p-say .st",o.ft),em=sy&&$("em",sy);
    if(sy&&em){var bf="",af="",past=false;[].forEach.call(sy.childNodes,function(n){if(n===em){past=true;return}var t=n.nodeType===3?n.nodeValue:(n.classList&&n.classList.contains("nm")?"":n.textContent);if(past)af+=t;else bf+=t});
      var esc=function(t){return t.replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})};
      o.ft.classList.add("x2p-astf");o.ft.innerHTML='<div class="x2p-ast"><div class="tk"><i class="fb l" aria-hidden="true"></i><i class="fb r" aria-hidden="true"></i><span class="ink">'+esc(bf.trim())+'</span> <em data-t="'+esc(em.textContent.trim())+'">'+esc(em.textContent.trim())+'</em> <span class="ink">'+esc(af.trim())+'</span></div></div>'+
        '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><filter id="x2pInk" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale=".8" xChannelSelector="R" yChannelSelector="G"/></filter></svg>'}
    var lbh=$(".lbh",o.fl);if(lbh){[].slice.call(lbh.children).forEach(function(h){if(/miss/i.test(h.textContent))h.remove()});
      /* "Last 5" over the boxes, once, in the header like Hit rate and ROI (owner, 2026-10-22: L2); the header's own "Last 5"
         stays for screen readers, so this one is for the eye only */
      var hc=d.createElement("span");hc.setAttribute("aria-hidden","true");hc.className="x2p-l5h";hc.textContent="Last 5";lbh.insertBefore(hc,lbh.children[2]||null)}
    $$("li.lbr",o.fl).forEach(function(li){var c=$$(".lb-c",li);if(c.length>2)c[1].remove();
      var f2=$(".lb-f2",li),c0=$(".lb-c",li);if(f2&&c0){f2.classList.add("x2p-l5");li.insertBefore(f2,c0)}});
    /* Grok in NVIDIA's gold (owner, 2026-10-22: "use this one"): the bet ticket's own rules for its name, re-aimed at this ticket */
    var bcss=d.getElementById("x2pbt-css");if(bcss&&$(".x2p-ast",st)){var gold=bcss.textContent.split("\n").filter(function(l){return l.indexOf(" .bt-b .x2p-cdh b em")>-1}).map(function(l){return l.split("html.x2p.x2d.x2pbt .bt-b .x2p-cdh b em").join("html.x2p #standings .x2p-ast .tk em")}).join("\n");
      if(gold){var gs=d.createElement("style");gs.id="x2p-ast-gold";gs.textContent=gold;d.head.appendChild(gs)}}
    /* the standings as printed tickets (owner, 2026-10-22; CSS: the TICKETS block of skin-x2plus.css); the stamped ticks' worn ink */
    if(TIX)st.classList.add("x2p-tix");
    if(TIX&&!d.getElementById("x2pWorn")){var wsv=d.createElementNS("http://www.w3.org/2000/svg","svg");wsv.setAttribute("width","0");wsv.setAttribute("height","0");wsv.setAttribute("aria-hidden","true");wsv.style.position="absolute";
      wsv.innerHTML='<filter id="x2pWorn" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.9 1.75" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>';st.appendChild(wsv)}
    rec.parentNode.insertBefore(st,rec)}
  var sw=$(".rsw2",hold),rf=$("#rflip",hold);
  if(sw&&rf){$$(".lsw,.lrn",ln).forEach(function(e){if(e.parentNode===ln)e.remove()});ln.appendChild(sw);ln.appendChild(rf);
    ["hit","roi","miss","sector"].forEach(function(k){var b=$('[data-rk="'+k+'"]',sw);if(b)sw.appendChild(b)});
    /* the page's own handler marks the pressed button among the buttons where it first drew them (out of sight, now empty),
       so Hit rate stayed lit (owner, 2026-10-22): mark them here */
    sw.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-rk]");if(!b)return;$$("[data-rk]",sw).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))})})}
  /* 03 the proof on the bet ticket's card (owner, 2026-10-23, rounds 22 and 23; mockups ez/tools/concepts/launch-r23-ticket.js): four
     views (ROI first, it opens there; Hit rate; Avg miss; Sector) on one printed ticket, every mark printed on it: lines in ink that
     lets the card through, the view's leader foil-stamped (gold only for the leader of the view on show; the open tab is a solid ink
     box), logos printed onto the stock, numbers pressed in ink. All four views take the height of the tallest, so a switch never moves
     the page: the chart or the grid fills the room. ROI and Hit rate print the ranks 1 to 4 in each line's colour and name the model
     where each line ends (no connector on Hit rate; owner: "too much noise"); Hit rate starts every line at 50/50 ((right + 1) /
     (calls + 2)); Avg miss is target practice. The numbers are the page's own: the same rounds, the same ROI sum, the same ranking
     rule and sector bands. The page's switch stays in the DOM, out of sight. The live site keeps that switch until the owner says so:
     make_site.py sets window.__x2pClassicProof there (SITE_TIX=1 builds with the ticket). CSS: the PROOF block of skin-x2plus.css. */
  function x2pProof(ln,sw,rf){
    /* the page's stake ($100,000, the same as its own ROI view); its variable is not global on this page */
    var STK=typeof STAKE!=="undefined"?STAKE:100000;
    var MK=Object.keys(MODELS).filter(function(m){return ROUNDS.some(function(r){return callOf(r,m)})}),N=ROUNDS.length;if(!MK.length||!N)return;
    var COL={};MK.forEach(function(m){COL[m]=m==="GROK"?"#141217":MODELS[m].c});
    /* the page's short sector names (routes.js SECT_SHORT, not global on this page) */
    var SH=(typeof SECT_SHORT!=="undefined"&&SECT_SHORT)||{"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"};
    /* per AI, from the graded rounds in order: calls, right, average miss, the running hit rate from 50/50, the $100,000 balance */
    var S={};MK.forEach(function(m){var n=0,k=0,off=0,run=[],roi=[],bal=STK,calls=[];
      ROUNDS.forEach(function(r,i){var c=callOf(r,m);if(!c)return;var dn=/^DOWN/.test(c[1]),ok=(dn?-1:1)>0===(r.a>0),o=parseFloat(c[2])||0;
        if(!n){run.push([i,50]);roi.push([i,bal])}n++;if(ok)k++;off+=o;calls.push({ok:ok,off:o});run.push([i+1,(k+1)/(n+2)*100]);bal*=1+(dn?-1:1)*r.a/100;roi.push([i+1,bal])});
      S[m]={m:m,n:n,k:k,hit:n?k/n:0,miss:n?off/n:0,run:run,roi:roi,bal:bal,calls:calls}});
    var byHit=MK.slice().sort(function(a,b){var qa=S[a].n>=N/2,qb=S[b].n>=N/2;return qa!==qb?(qa?-1:1):(S[b].hit-S[a].hit)||(S[a].miss-S[b].miss)}),
      byRoi=MK.slice().sort(function(a,b){return S[b].bal-S[a].bal}),byMiss=MK.slice().sort(function(a,b){return S[a].miss-S[b].miss});
    var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})},
      fo=function(t){return '<em class="pt-fo" data-t="'+esc(t)+'">'+esc(t)+'</em>'},usd=function(v){return "$"+Math.round(v).toLocaleString("en-US")},
      ver=function(m){return (MODELS[m]&&MODELS[m].ver)||m},no=String(N).padStart(6,"0");
    var row=function(i,m,v,c){return '<div class="pt-r" style="--c:'+COL[m]+'"><b>'+(i?i+1:fo("1"))+'</b>'+logo(m)+'<span class="pt-nm">'+(i?esc(m):fo(m))+'</span>'+v+c+'</div>'};
    var ax=function(a,k){return '<div class="pt-ax"><span>'+a+'</span><span class="pt-k">'+k+'</span><span>R'+N+'</span></div>'};
    /* the four views: the band words, the body, and what to draw once it is in place */
    var V={
      roi:{t:"ROI",top:"$100,000 on every call",bot:"Simulated · before fees",
        html:function(){return '<div class="lp">'+byRoi.map(function(m,i){var b=S[m].bal,up=b>=STK,p=Math.abs(b/STK*100-100).toFixed(1)+"%";
          return row(i,m,'<span class="pt-v tnum">'+usd(b)+'</span>','<span class="pt-c tnum '+(up?'pt-u':'pt-d')+'"><span aria-hidden="true">'+(up?'▲':'▼')+'</span><span class="sr">'+(up?'up':'down')+'</span> '+p+'</span>')}).join("")+'</div>'+
          '<div class="pt-fl"><div class="pt-ch lp"></div>'+ax("R1","Start: "+usd(STK))+'</div><p class="pt-cp"><b>What would '+usd(STK)+' be worth now?</b> Buy on an up call, short on a down call.</p>'},
        draw:function(el,h){var vs=[STK];MK.forEach(function(m){S[m].roi.forEach(function(p){vs.push(p[1])})});var lo=Math.min.apply(null,vs),hi=Math.max.apply(null,vs),pd=(hi-lo)*.1||STK*.05;lo-=pd;hi+=pd;
          chart(el,h,byRoi.map(function(m,i){return {m:m,rank:i+1,pts:S[m].roi.map(function(p){return [p[0]/N*100,(hi-p[1])/(hi-lo)*100]})}}),(hi-STK)/(hi-lo)*100,{lead:true})}},
      hit:{t:"Hit rate",top:"Right on direction",bot:"Up or down only",
        html:function(){return '<div class="lp">'+byHit.map(function(m,i){var s=S[m];return row(i,m,'<span class="pt-v sm tnum">'+s.k+' of '+s.n+'</span>','<span class="pt-c big tnum">'+Math.round(s.hit*100)+'%</span>')}).join("")+'</div>'+
          '<div class="pt-fl"><div class="pt-ch lp"></div>'+ax("Start","Coin flip: 50%")+'</div><p class="pt-cp"><b>How often were they right about the direction?</b> Every line starts at 50/50 and moves with each call. Up or down only.</p>'},
        draw:function(el,h){var LO=30,HI=80,y=function(v){return (HI-Math.max(LO,Math.min(HI,v)))/(HI-LO)*100};
          chart(el,h,byHit.map(function(m,i){return {m:m,rank:i+1,pts:S[m].run.map(function(p){return [p[0]/N*100,y(p[1])]})}}),y(50),{left:24,grid:[80,70,60,40,30].map(function(v){return [y(v),v+"%"]})})}},
      miss:{t:"Avg miss",top:"How close they got",bot:"Closer is better",
        html:function(){return '<div class="pt-tg lp">'+byMiss.map(function(m,i){return '<figure><figcaption style="--c:'+COL[m]+'"><i>'+(i?i+1:fo("1"))+'</i>'+logo(m)+(i?esc(m):fo(m))+'<small>'+S[m].miss.toFixed(2)+'% off</small></figcaption>'+target(m,i)+'</figure>'}).join("")+'</div>'+
          '<p class="pt-cp"><b>How close did they get?</b> The bullseye is what the stock did; the numbers are % off. One hole per call; a red dot outside missed the direction.</p>'}},
      sector:{t:"Sector",top:"Where they are sharpest",bot:"Small samples · it fills in",
        html:function(){var sec=function(r){return ((typeof RMETA!=="undefined"&&RMETA[r.n])||{}).sector||""},cnt={};ROUNDS.forEach(function(r){var x=sec(r);if(x)cnt[x]=(cnt[x]||0)+1});
          var secs=Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a]});
          var cell=function(m,x){var n=0,ok=0;ROUNDS.forEach(function(r){if(sec(r)!==x)return;var c=callOf(r,m);if(c){n++;if((/^DOWN/.test(c[1])?-1:1)>0===(r.a>0))ok++}});
            if(!n)return '<td class="tnum">–</td>';return '<td class="tnum '+(3*ok>=2*n?'hi':3*ok<=n?'lo':'md')+'">'+ok+'/'+n+'</td>'};
          return '<div class="pt-fl"><table class="pt-sg lp"><colgroup><col style="width:30%">'+byHit.map(function(){return '<col>'}).join("")+'</colgroup><tr><th scope="col">Sector</th>'+byHit.map(function(m){return '<th scope="col">'+logo(m)+esc(m)+'</th>'}).join("")+'</tr>'+
            secs.map(function(x){return '<tr><th scope="row">'+esc(SH[x]||x)+'<small>'+cnt[x]+' round'+(cnt[x]>1?'s':'')+'</small></th>'+byHit.map(function(m){return cell(m,x)}).join("")+'</tr>'}).join("")+'</table></div>'+
            '<div class="pt-lgd" aria-hidden="true"><span><i class="hi"></i>2 in 3 or better</span><span><i class="md"></i>In between</span><span><i class="lo"></i>1 in 3 or worse</span></div><p class="pt-cp"><b>Where are they sharpest?</b> Right calls by sector.</p>'}}};
    var ORDER=["roi","hit","miss","sector"],cur="roi";
    /* a chart in real pixels: each line in its colour, ink multiplied into the card; the leader foil-stamped (the NVIDIA recipe: a
       satin gold with grain, a dark wall above, a pale lip below) and the thickest; logo and model where each line ends */
    var cid=0;function chart(el,h,ser,yz,o){var W=el.clientWidth,H=h||el.clientHeight||180,G=96,L=o.left||0,pw=W-G-L,pad=6,ih=H-2*pad;el.style.height=H+"px";if(pw<40)return;
      var id="xpt"+(++cid),sx=function(x){return L+x/100*pw},sy=function(y){return pad+y/100*ih},P=function(s){return s.pts.map(function(p,i){return (i?"L":"M")+sx(p[0]).toFixed(1)+","+sy(p[1]).toFixed(1)}).join("")};
      var FL='filterUnits="userSpaceOnUse" x="-10" y="-10" width="'+(W+20)+'" height="'+(H+20)+'"',ln=function(dd,c,w,x){return '<path d="'+dd+'" fill="none" stroke="'+c+'" stroke-width="'+w+'" stroke-linejoin="round" stroke-linecap="round"'+(x||"")+'/>'};
      var defs='<defs><linearGradient id="'+id+'g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="54" y2="20" spreadMethod="reflect"><stop offset="0" stop-color="#f6dc93"/><stop offset=".3" stop-color="#e4b54a"/><stop offset=".52" stop-color="#c99227"/><stop offset=".7" stop-color="#e7bd5b"/><stop offset="1" stop-color="#bf8a22"/></linearGradient>'+
        '<filter id="'+id+'n" '+FL+'><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/><feComponentTransfer in="g" result="h"><feFuncR type="linear" slope=".38" intercept=".7"/><feFuncG type="linear" slope=".38" intercept=".7"/><feFuncB type="linear" slope=".38" intercept=".7"/></feComponentTransfer><feBlend in="SourceGraphic" in2="h" mode="multiply" result="b"/><feComposite in="b" in2="SourceGraphic" operator="in"/></filter>'+
        '<filter id="'+id+'s" '+FL+'><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="1" seed="3" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale=".9" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
      var win=ser.filter(function(s){return s.rank===1})[0],ink=(o.grid||[]).map(function(g){return '<path d="M'+L+','+sy(g[0]).toFixed(1)+'H'+(L+pw)+'" stroke="rgba(20,18,23,.18)" stroke-width=".8"/>'}).join("")+'<path d="M'+L+','+sy(yz).toFixed(1)+'H'+(L+pw)+'" stroke="rgba(20,18,23,.5)" stroke-width="1.1" stroke-dasharray="5 4"/>';
      ser.forEach(function(s){if(s!==win)ink+=ln(P(s),COL[s.m],2,' filter="url(#'+id+'s)" opacity=".92"')});
      var top=ln(P(win),"rgba(255,250,232,.85)",3.8,' transform="translate(0,1.1)"')+ln(P(win),"rgba(70,42,6,.55)",3.8,' transform="translate(0,-.9)"')+ln(P(win),"url(#"+id+"g)",3.8,' filter="url(#'+id+'n)"');
      var ends=ser.map(function(s){var p=s.pts[s.pts.length-1];return {s:s,y0:sy(p[1]),y:sy(p[1]),x:sx(p[0])}}).sort(function(a,b){return a.y-b.y});
      for(var i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<19)ends[i].y=ends[i-1].y+19;var ov=ends[ends.length-1].y-(H-9);if(ov>0)ends.forEach(function(e){e.y-=ov});
      if(o.lead)ends.forEach(function(e){ink+='<path d="M'+(e.x+2).toFixed(1)+','+e.y0.toFixed(1)+'L'+(L+pw+8).toFixed(1)+','+e.y.toFixed(1)+'" fill="none" stroke="rgba(20,18,23,.62)" stroke-width=".9"/>'});
      el.innerHTML='<svg class="ink" width="'+W+'" height="'+H+'" aria-hidden="true" focusable="false">'+defs+ink+'</svg><svg width="'+W+'" height="'+H+'" aria-hidden="true" focusable="false">'+defs.replace(/id="/g,'id="t')+top.replace(/url\(#/g,"url(#t")+'</svg>'+
        ends.map(function(e){var w=e.s.rank===1,t=ver(e.s.m);return '<div class="pt-lb" aria-hidden="true" style="left:'+(L+pw+(o.lead?11:6))+'px;top:'+e.y.toFixed(1)+'px;--c:'+COL[e.s.m]+'">'+logo(e.s.m)+'<b'+(w?' class="pt-fo" data-t="'+esc(t)+'"':'')+'>'+esc(t)+'</b></div>'}).join("")+
        (o.grid||[]).map(function(g){return '<span class="pt-yl" aria-hidden="true" style="top:'+sy(g[0]).toFixed(1)+'px">'+g[1]+'</span>'}).join("")}
    /* target practice: rings every 3% off in white ink and red ink (with the card's grain), the % off in each ring, a crosshair;
       each call a bullet hole placed by how far off it was; a call that missed the direction a red dot outside the target */
    function target(m,j){var R=60,C=73,ga=Math.PI*(3-Math.sqrt(5)),holes="",out="",id="xptg"+j;
      S[m].calls.forEach(function(c,i){var a=i*ga;if(c.ok){var r=Math.min(c.off,12)/12*R;holes+='<circle cx="'+(C+r*Math.cos(a)).toFixed(1)+'" cy="'+(C+r*Math.sin(a)).toFixed(1)+'" r="2.6" fill="#1b1613" stroke="rgba(255,250,236,.9)" stroke-width=".8"/>'}
        else{var q=R+4.5+(i%3)*1.8;out+='<circle cx="'+(C+q*Math.cos(a)).toFixed(1)+'" cy="'+(C+q*Math.sin(a)).toFixed(1)+'" r="2" fill="rgba(200,45,35,.9)"/>'}});
      var rings=[4,3,2,1].map(function(k,i){return '<circle cx="'+C+'" cy="'+C+'" r="'+(k/4*R).toFixed(1)+'" fill="'+(i%2?"rgba(196,38,30,.9)":"#fbf8f0")+'" stroke="rgba(60,20,16,.55)" stroke-width=".7"/>'}).join("");
      var nums=[[3,1],[6,2],[9,3],[12,4]].map(function(v,i){return '<text x="'+(C+(v[1]-.5)/4*R).toFixed(1)+'" y="'+(C+2)+'" font-size="5.6" font-family="Barlow Condensed,sans-serif" font-weight="700" text-anchor="middle" fill="'+(i%2?"rgba(196,38,30,.95)":"rgba(255,246,232,.95)")+'">'+v[0]+'</text>'}).join("");
      return '<svg viewBox="0 0 146 146" aria-hidden="true" focusable="false"><defs><filter id="'+id+'" x="0" y="0" width="146" height="146" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="'+(j+3)+'" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/><feComponentTransfer in="g" result="h"><feFuncR type="linear" slope=".25" intercept=".8"/><feFuncG type="linear" slope=".25" intercept=".8"/><feFuncB type="linear" slope=".25" intercept=".8"/></feComponentTransfer><feBlend in="SourceGraphic" in2="h" mode="multiply" result="b"/><feComposite in="b" in2="SourceGraphic" operator="in"/></filter></defs>'+
        '<g filter="url(#'+id+')">'+rings+'<path d="M'+(C-R-2)+','+C+'H'+(C+R+2)+'M'+C+','+(C-R-2)+'V'+(C+R+2)+'" stroke="rgba(60,20,16,.35)" stroke-width=".5"/>'+nums+'</g>'+out+holes+'</svg>'}
    var tk=d.createElement("div");tk.className="x2p-pt";
    tk.innerHTML='<div class="pt-cd"><div class="pt-bd g"><span><i aria-hidden="true">★</i> <span class="pt-top"></span> <i aria-hidden="true">★</i></span><span>Season 1</span></div><div class="pt-in">'+
      '<div class="pt-tb" role="group" aria-label="Show the AIs by">'+ORDER.map(function(k){return '<button type="button" data-pt="'+k+'" aria-pressed="'+(k===cur)+'">'+V[k].t+'</button>'}).join("")+'</div><div class="pt-body"></div></div>'+
      '<div class="pt-bd r"><span class="pt-bot"></span><span>Nº '+no+'</span></div></div>';
    ln.insertBefore(tk,sw);ln.classList.add("x2p-ptk");
    var body=$(".pt-body",tk),inn=$(".pt-in",tk);
    /* put a view in place; natural: at its own height (to measure), else at the ticket's one height, the chart or grid filling it */
    function show(k,natural){var v=V[k];$(".pt-top",tk).textContent=v.top;$(".pt-bot",tk).textContent=v.bot;body.innerHTML=v.html();
      $$("[data-pt]",tk).forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.pt===k))});
      var ch=$(".pt-ch",body);if(ch&&v.draw)v.draw(ch,natural?180:0);
      var t=$(".pt-sg",body);if(t&&!natural){var fl=t.parentNode,hd=t.rows[0].getBoundingClientRect().height,n=t.rows.length-1,hh=(fl.clientHeight-hd-8)/n;if(hh>0)for(var i=1;i<=n;i++)t.rows[i].style.height=hh.toFixed(1)+"px"}}
    var lastW=0;function fit(force){if(!tk.offsetWidth)return;if(!force&&tk.offsetWidth===lastW)return;lastW=tk.offsetWidth;tk.style.removeProperty("--tin");var mx=0;
      ORDER.forEach(function(k){show(k,true);mx=Math.max(mx,inn.getBoundingClientRect().height)});tk.style.setProperty("--tin",Math.ceil(mx)+"px");show(cur,false)}
    $(".pt-tb",tk).addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-pt]");if(!b||b.dataset.pt===cur)return;cur=b.dataset.pt;show(cur,false)});
    fit(true);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){fit(true)});addEventListener("load",function(){fit(true)});
    var ptT;addEventListener("resize",function(){clearTimeout(ptT);ptT=setTimeout(function(){fit(false)},150)});addEventListener("hashchange",function(){setTimeout(function(){fit(true)},80)})}
  if(!window.__x2pClassicProof&&sw&&rf)try{x2pProof(ln,sw,rf)}catch(e){window.__x2pPtErr=String(e&&e.stack||e)}
  hold.remove();
  /* 04 highlights: the Results page's first section, built into slabs by hlSlabs, placed after the proof */
  var tp=d.createElement("template");tp.innerHTML=R.vResults();var hs=tp.content.querySelector("section.xsec");
  if(hs&&window.__x2pHlSlabs){var h2=d.createElement("div");h2.hidden=true;d.body.appendChild(h2);h2.appendChild(hs);window.__x2pHlSlabs();
    if($("#x2pHl",hs)){hs.id="highlights";hs.classList.add("sec","x2p-hl-sec");hs.setAttribute("aria-labelledby","x2hlH");
      var sh=d.createElement("div");sh.className="sh";sh.innerHTML='<div class="tx"><span class="no">04</span><span class="eb">Highlights</span><h2 id="x2hlH">Memorable predictions</h2></div>';
      var xh=$(".xsh",hs);if(xh)hs.replaceChild(sh,xh);else hs.insertBefore(sh,hs.firstChild);ln.parentNode.insertBefore(hs,ln.nextSibling)}
    h2.remove()}
  /* bullets under the standings, proof and highlights heads, the record's style (owner, 2026-10-22: "a bit dry"); the
     standings in the owner's words, for visitors who skip the film (no buyback lines for now); the count comes from the sheet;
     the highlights name their three kinds from the cards' own tags */
  var gN=(typeof SHEET!=="undefined"?SHEET:[]).filter(function(r){return r[12]!==""&&r[12]!=null}).length;
  /* (owner, 2026-10-22) one colour each, the same as its card's tag, so the three read as the top three: closest gold, tightest green, biggest red */
  var hk=$$("#x2pHl .x2p-htag").map(function(t){var k=(t.className.match(/x2p-h-(\w)/)||[])[1]||"c";t=t.textContent.trim().toLowerCase().replace(/[&<>]/g,"");return '<b class="x2p-hk x2p-h-'+k+'">'+t.charAt(0).toUpperCase()+t.slice(1)+'.</b>'}).join(" ");
  /* (owner, 2026-10-22) "predict", not "call each stock" (they don't call every stock); "before" and "after" in gold */
  /* the standings' three rules on the "The rules" strap above the board, with the tickets too (owner, 2026-10-23: "in the same
     format as we have it on the current live site"; they were the tickets' small print under the board for a day) */
  [].concat([["#standings","x2p-stb",['4 AIs predict a stock\'s move <b class="x2p-kw">before</b> it reports.','Graded at the next market close <b class="x2p-kw">after</b> earnings.',"In public, every earnings season."],"The rules"]],
  [["#learn","x2p-lrb",["One lucky call proves nothing. The trend does.",gN+" rounds graded so far. Judge for yourself."],"The stats"],
   ["#highlights","x2p-hlb",hk?[hk,"Swipe for more. Flip a card for the story."]:[],"Replays"]]).forEach(function(x){if(!x[2].length)return;
    var sh=$(x[0]+" .sh");if(!sh||$("."+x[1],sh))return;var ul=d.createElement("ul");ul.className="x2o-ul lede "+x[1];
    x[2].forEach(function(t){var li=d.createElement("li");li.innerHTML=t;ul.appendChild(li)});
    /* each list on its broadcast strap with a bug (owner, 2026-10-22: C3; "The stats" on the proof); X3+ shows the same lists as neon */
    var sp=d.createElement("div");sp.className="x2p-strap";sp.innerHTML='<span class="x2p-bug" aria-hidden="true">'+x[3]+'</span>';sp.appendChild(ul);sh.appendChild(sp)});
  /* (owner, 2026-10-22) the record's two bullets on a strap too, like the other sections; its X link keeps its tap area */
  /* (owner, 2026-10-22) the record's first line names the graded cards: "graded" and "card" must be there */
  var rl1=$("#record .x2o-rec li:not(.x2p-xli)");if(rl1)rl1.textContent="Don't trust us. Verify every graded card.";
  var rcl=$("#record .x2o-rec");if(rcl&&!rcl.closest(".x2p-strap")){var rsp=d.createElement("div");rsp.className="x2p-strap";rsp.innerHTML='<span class="x2p-bug" aria-hidden="true">Receipts</span>';rcl.parentNode.insertBefore(rsp,rcl);rsp.appendChild(rcl)}
  [["#standings","01"],["#record","02"],["#learn","03"],["#get","05"]].forEach(function(x){var n=$(x[0]+" .sh .no");if(n)n.textContent=x[1]});
  /* the highlights land on Tightest race (the middle card), its film first (owner, 2026-10-22: with "Flip a card for the
     story" under the head, the animation shows first; it replaced the story side up), once the Overview is on screen */
  var landed=false;function land(){if(landed||!window.__x2pHlGo)return;var ws=$$("#x2pHl .x2p-hi"),i=1;
    ws.forEach(function(w,j){var t=$(".x2p-htag",w);if(t&&/tight/i.test(t.textContent))i=j});if(window.__x2pHlGo(i,false))landed=true}
  /* the standings: rank, logo, name, the last five, hit rate and ROI on each strip's middle by what the eye sees (the ink of
     the letters and digits, not their line boxes; owner: "a freak when it comes to symmetry"), and the last five halfway
     between the longest name and the leftmost hit rate, the same on every row */
  var cv=d.createElement("canvas").getContext("2d");
  function ink(el){var cs=getComputedStyle(el),t=[].filter.call(el.childNodes,function(n){return n.nodeType===3}).map(function(n){return n.nodeValue}).join("").trim()||el.textContent.trim();
    if(cs.textTransform==="uppercase")t=t.toUpperCase();cv.font=cs.font;var m=cv.measureText(t);
    var pr=d.createElement("i");pr.style.cssText="display:inline-block;width:0;height:0;vertical-align:baseline";el.appendChild(pr);var base=pr.getBoundingClientRect().top;pr.remove();
    /* +.5: the browser draws the ink about half a pixel lower than the metrics say (measured on the pixels, phone and desktop) */
    return base-((m.actualBoundingBoxAscent||0)-(m.actualBoundingBoxDescent||0))/2+.5}
  function centre(){var rows=$$("#standings li.lbr");if(!rows.length||!rows[0].offsetParent||$("#standings.x2p-tix"))return;
    rows.forEach(function(li){[".rk",".lg",".pc-t",".x2p-l5"].forEach(function(s){var e=$(s,li);if(e)e.style.transform=""});$$(".lb-c",li).forEach(function(e){e.style.transform=""})});
    rows.forEach(function(li){var r=li.getBoundingClientRect(),mid=(r.top+r.bottom)/2,mv=function(e,y){if(e)e.style.transform="translateY("+Math.round((mid-y)*4)/4+"px)"},box=function(e){var q=e.getBoundingClientRect();return (q.top+q.bottom)/2};
      var lg=$(".lg",li);if(lg)mv(lg,box(lg));var nm=$(".pc-t h3 .x2p-mn",li)||$(".pc-t h3",li);if(nm)mv($(".pc-t",li),ink(nm));
      var fq=$(".x2p-l5 .fq",li);if(fq)mv($(".x2p-l5",li),box(fq));$$(".lb-c",li).forEach(function(c){var b=$("b",c);if(b)mv(c,ink(b))});var rk=$(".rk",li);if(rk)mv(rk,ink(rk))});
    var tr=function(n){var x=d.createRange();x.selectNodeContents(n);return x.getBoundingClientRect()};
    var nameR=Math.max.apply(null,rows.map(function(li){return tr($(".pc-t h3",li)).right})),hitL=Math.min.apply(null,rows.map(function(li){return tr($(".lb-c b",li)).left}));
    rows.forEach(function(li){var f=$(".x2p-l5",li),fq=f&&$(".fq",f);if(!fq)return;var q=fq.getBoundingClientRect();f.style.transform+=" translateX("+Math.round(((nameR+hitL)/2-(q.left+q.right)/2)*4)/4+"px)"});
    /* the header's "Last 5" sits over the middle of the boxes */
    var l5h=$("#standings .x2p-l5h"),fq0=$(".x2p-l5 .fq",rows[0]);if(l5h&&fq0){l5h.style.transform="";var a=l5h.getBoundingClientRect(),b=fq0.getBoundingClientRect();
      l5h.style.transform="translateX("+Math.round(((b.left+b.right)/2-(a.left+a.right)/2)*4)/4+"px)"}}
  /* the ticket board's columns (owner, 2026-10-23: "the last 5 needs to be more in the middle... give it a bit of room to breathe"):
     the AI field is as wide as the longest name or model plus 16px of air, the last five take the rest with their boxes in its
     middle (the TICKETS block reads --x2p-aiw; without it the AI field takes the rest as before) */
  function tixCols(){var st=$("#standings.x2p-tix"),rows=st?$$("li.lbr",st):[];if(!rows.length||!rows[0].offsetParent)return;var e=0;
    rows.forEach(function(li){var m=$(".lb-m",li);if(!m)return;var L=m.getBoundingClientRect().left;
      $$(".pc-t h3,.pc-t small",li).forEach(function(t){var x=d.createRange();x.selectNodeContents(t);var q=x.getBoundingClientRect();if(q.width)e=Math.max(e,q.right-L)})});
    if(e)st.style.setProperty("--x2p-aiw",Math.ceil(e+16)+"px")}
  /* the standings' three rules one line each (owner, 2026-10-23: "Graded at the next market close after earnings." on one line):
     the three step down together, half a pixel at a time, until the longest fits; never below 12px (narrower: the full size, wrapped) */
  function fitRules(){var ls=$$("#standings .x2p-strap li");if(!ls.length||!ls[0].offsetWidth)return;ls.forEach(function(l){l.style.fontSize=""});
    /* the lines each one draws (the strap's grid column grows with no-wrap text, so a line's own width cannot tell) */
    var nl=function(l){var g=d.createRange();g.selectNodeContents(l);var t=[];[].forEach.call(g.getClientRects(),function(r){if(r.width&&!t.some(function(x){return Math.abs(x-r.top)<4}))t.push(r.top)});return t.length};
    var z=parseFloat(getComputedStyle(ls[0]).fontSize),n=0;
    while(ls.some(function(l){return nl(l)>1})&&z>12&&n++<40){z-=.5;ls.forEach(function(l){l.style.fontSize=z+"px"})}
    /* too narrow even at 12px (a 320px phone): keep the full size and let them wrap, as before */
    if(ls.some(function(l){return nl(l)>1}))ls.forEach(function(l){l.style.fontSize=""})}
  /* the hit-rate chart: on a narrow screen the round labels (R1 ... R35, 7px apart) run into each other; keep R1 and every
     fifth so each has room */
  function thin(){$$("#learn svg").forEach(function(sv){var t=$$("text",sv).filter(function(x){return /^R\d+$/.test(x.textContent.trim())});if(t.length<3)return;
    var gap=Math.abs(parseFloat(t[1].getAttribute("x"))-parseFloat(t[0].getAttribute("x")))||99,step=1;while(gap*step<16)step=step===1?5:step*2;
    t.forEach(function(x){var n=+x.textContent.trim().slice(1);x.style.display=(step===1||n===1||n%step===0)?"":"none"})})}
  /* By sector: every row shares one first column (a long name pushed its row's squares off line: "Industrials"); a name that
     does not fit steps down from the page's size, half a pixel at a time, never below 10px */
  function fitSec(){$$("#learn .st-sec").forEach(function(c){var b=$("b",c);if(!b||!c.offsetWidth)return;b.style.fontSize="";var z=parseFloat(getComputedStyle(b).fontSize),n=0;
    while(c.scrollWidth>c.clientWidth+.5&&z>10&&n++<30){z-=.5;b.style.fontSize=z+"px"}})}
  if(window.MutationObserver){var lt;new MutationObserver(function(){clearTimeout(lt);lt=setTimeout(function(){thin();fitSec()},30)}).observe(ln,{childList:true,subtree:true})}
  function later(){setTimeout(function(){fitRules();tixCols();centre();land();thin();fitSec()},80)}
  requestAnimationFrame(function(){requestAnimationFrame(function(){fitRules();tixCols();centre();land();thin()})});
  if(d.fonts&&d.fonts.ready)d.fonts.ready.then(later);addEventListener("load",later);addEventListener("hashchange",later);
  var rt;addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(function(){fitRules();tixCols();centre();fitSec()},150)});
}catch(e){}})();
