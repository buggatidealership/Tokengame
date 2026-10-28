/* the EZ. logo's markup, shared by the header and the film's presents box */
var X2P_LOGO='<svg viewBox="0 0 400 400" aria-hidden="true" focusable="false"><circle cx="198.7" cy="199.4" r="198.2" fill="#04070e"/><path fill="#f8f0d9" d="M116.8,88.0 L86.2,152.0 L102.1,152.0 L55.0,274.5 L154.2,274.5 L188.5,225.8 L128.7,225.8 L137.5,204.0 L170.2,203.5 L193.2,162.0 L149.1,162.0 L154.8,145.0 L143.4,138.5 L217.9,138.2 L192.2,182.0 L234.9,182.0 L181.5,250.8 L136.0,315.8 L272.5,315.8 L292.5,265.0 L230.4,265.0 L328.2,130.8 L225.1,130.8 L253.0,87.8 Z"/><path fill="#03c870" d="M146.2,287.0 L133.0,287.0 L106.5,327.2 L119.0,326.5 Z M86.8,169.5 L74.8,169.5 L29.5,282.2 L43.7,282.2 Z M105.8,92.5 L89.5,95.8 L55.5,169.2 L69.0,169.2 Z"/><path fill="#ff3a31" d="M304.5,259.0 L300.5,269.5 L313.0,268.2 L317.0,258.8 Z M361.5,126.0 L344.0,126.5 L269.5,235.8 L256.0,257.5 L276.2,257.0 Z M279.0,87.8 L266.7,87.5 L251.5,117.2 L262.2,119.0 Z"/><path fill="#fdbc2a" d="M334.2,281.2 L302.0,281.2 L288.2,315.8 L321.0,315.5 Z"/></svg>';
/* (audit, 2026-10-28) "GPT, Claude and Grok", not "GPT and Claude and Grok" */
function x2pAnd(a){return a.length<3?a.join(" and "):a.slice(0,-1).join(", ")+" and "+a[a.length-1]}
/* the cover comes off once the X2+ page is built (owner, 2026-10-23: "I want the current page to be the only page, not the makeover"):
   the new tabs (x2p-launch), the film ticket and the bet ticket on the Overview, or the fight-night Upcoming when X2's router shows that
   tab (data-sec; a shared round still to come opens there, a graded one over the Overview); then the first screen's fonts, which the page asked for as soon as it started (window.__x2pF, build.py), at
   most 1.5 s more, so the type does not swap in front of the visitor. If the page is never built, it shows itself 9.5 s after this
   script started; build.py adds a last net (20 s) and a <noscript> rule. */
(function(){var H=document.documentElement;if(!H.classList.contains("x2p-cur"))return;var t0=Date.now(),okAt=0,fok=!window.__x2pF;
  if(window.__x2pF)window.__x2pF.then(function(){fok=true},function(){fok=true});
  function built(){if(H.getAttribute("data-sec")==="upcoming")return !!document.querySelector(".x2p-up");
    return H.classList.contains("x2p-launch")&&H.classList.contains("x2pbt")&&!!document.querySelector(".x2p-vt")&&
      (H.classList.contains("x2pst")||!!window.__x2pBetErr)}   /* and the bet ticket moved to the foot (BETSEC), or that block gave up */
  function lift(){if(!H.classList.contains("x2p-cur"))return;H.classList.add("x2p-rv");H.classList.remove("x2p-cur");setTimeout(function(){H.classList.remove("x2p-rv")},400);try{performance.mark("x2p-shown")}catch(e){}}
  (function tick(){if(!H.classList.contains("x2p-cur"))return;
    if(built()){if(!okAt)okAt=Date.now();if(fok||Date.now()-okAt>1500){requestAnimationFrame(lift);return}}
    else if(Date.now()-t0>9500){lift();return}
    setTimeout(tick,40)})()})();
/* EZ Live X2+ (owner, 2026-10-19): X2's words, with the decisions of 2026-10-19 on top. Runs after X2 has built the page.
   The first screen explains the concept, not the bet; NVIDIA sits under the chip as bet #1; "pool", not "pot"; the brand
   line drops "never edited" (a call changed after it was shown, 2026-10-14, as on X6). Numbers from ez-data.js (SIM). */
/* The trading competition (owner, 2026-10-26, after a friend's feedback: pump.fun traders think in P&L). One account per AI, exactly
   the proof's P&L view: $100,000 to start, the whole balance on every call, buy on up, short on down, no leverage, before fees.
   P&L = balance - $100,000; per call: what the account made or lost on that round; the record W-L (a W = a call that got the
   direction right) and the current streak. The standings, the proof and the MVP backs all read it, so the cards add up to the board.
   Mockups: ez/tools/concepts/pnl/. */
window.__x2pPnl=function(){if(window.__x2pPnlA)return window.__x2pPnlA;var A={};
  ROUNDS.forEach(function(r){if(typeof r.a!=="number"||isNaN(r.a))return;r.calls.forEach(function(x){var m=x[0],dn=/^DOWN/.test(x[1]),s=(dn?-1:1)*r.a/100,
    t=A[m]||(A[m]={m:m,ver:(MODELS[m]&&MODELS[m].ver)||m,bal:100000,W:0,L:0,seq:[],per:{},bw:null,bl:null}),dv=t.bal*s;
    t.per[r.n]={v:dv,dn:dn,mg:parseFloat(x[1].replace(/^(UP|DOWN)\s*/,""))};t.bal+=dv;if(s>0)t.W++;else t.L++;t.seq.push(s>0?"W":"L");
    if(t.bw==null||dv>t.bw)t.bw=dv;if(t.bl==null||dv<t.bl)t.bl=dv})});
  Object.keys(A).forEach(function(m){var t=A[m],k=t.seq[t.seq.length-1],n=0;for(var i=t.seq.length-1;i>=0&&t.seq[i]===k;i--)n++;t.streak=k+n;t.pnl=t.bal-100000;t.pct=t.pnl/1000});
  return window.__x2pPnlA={A:A,usd:function(v,k){var a=Math.abs(v),q=k&&a>=1000?(a/1000).toFixed(a>=100000?0:1)+"K":Math.round(a).toLocaleString("en-US");return (v>=0?"+$":"−$")+q},
    pc:function(v){return (v>=0?"+":"−")+Math.abs(v).toFixed(1)+"%"}}};
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
     The bullets stay in the file for the Buyback tab. ez-landing-v4.mp4 is 18.7 MB (the owner's cut with smaller captions, 2026-10-23); only its metadata loads before the tap. */
  var T3=$(".x2p-t3");
  if(T3&&!$(".x2p-vt")){
    var vt=document.createElement("div");vt.className="x2p-vt";
    /* (owner, 2026-10-21, round 2: option 4) the film is the ticket: no paper, the scallops cut the film and the bands print over its edges;
       "How it works" is mockup A's tilted gold tag across the top edge, with the time left */
    /* (2026-10-22, review) the tag is the module's heading (h2) for screen readers; the time beside it is decoration */
    vt.innerHTML='<h2 class="vt-tag">How it works<small class="vt-s" aria-hidden="true">1:20</small></h2><div class="vt-p"><i class="vt-st" aria-hidden="true"></i>'+
      '<div class="vt-f"><video class="vt-v" playsinline preload="metadata" poster="media/ez-landing-v4-poster-ez.jpg" aria-label="How EZ works, a minute and 20 seconds"><source src="media/ez-landing-v4.mp4" type="video/mp4"><source src="media/ez-landing-v4.webm" type="video/webm"></video>'+
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
        t=!v.paused?fmt(v.duration?v.duration-v.currentTime:80):(!started||v.ended)?fmt(v.duration||80):st.textContent;if(st.textContent!==t)st.textContent=t}
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
  if(g&&!$(".x2p-cdh")){var c=document.createElement("div");c.className="x2p-cdh";c.innerHTML='<span class="k">Countdown to</span><b>Season 1<i></i> <em>NVIDIA</em></b>';
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
  /* the certificate (owner, 2026-10-25, round 50: "do the logo stamp. Put that one on the Easy Life X2 Plus, and then put the seal hot
     stamped on Easy Life X3 Plus"): a graded record card's stats side becomes round 47's certificate as the owner fixed it in rounds 49
     and 50. ★ Certificate ★ and the round's number; what they predicted, ranked 1 to 4 (right calls by closeness, then wrong ones), each
     with PASS or FAIL in a small worn cartouche between the name and the call, the winner marked by a printed crown-and-Winner tag; the
     market's move; at the foot Calls filed, Graded on and the stamp (no date in it), "See the film" small under the dates. The stamp
     is a hologram with the EZ. logo struck into the foil (the letters a second foil angle with a raised edge, the slashes and the dot in
     tinted foils): the logo stamp on X2+ (an oil-slick disc, two foil rings, GRADED · BY THE MARKET CLOSE round it), the certificate
     seal hot-stamped on X3+; since the owner's later note, both pages: the seal on perfect rounds, the logo stamp on the rest (xkind). Mockups: tools/concepts/launch-r40-recback/_r50.js (round 43 at
     390px). Drawn at that phone's size and scaled to the card by CSS (viewport units, the CERT block). The foils drift only on the card
     in front with its stats side up (xlive, xstep); every other stamp holds one still frame (t = 1.6 s, the boards' frame); certificates
     and stamps are drawn only for the cards near the front one. The PASS/FAIL cartouches share four worn-ink filters (#x2pcw0 to 3) in one hidden svg. */
  var XLG={e:'M116.8,88.0 L86.2,152.0 L102.1,152.0 L55.0,274.5 L154.2,274.5 L188.5,225.8 L128.7,225.8 L137.5,204.0 L170.2,203.5 L193.2,162.0 L149.1,162.0 L154.8,145.0 L143.4,138.5 L217.9,138.2 L192.2,182.0 L234.9,182.0 L181.5,250.8 L136.0,315.8 L272.5,315.8 L292.5,265.0 L230.4,265.0 L328.2,130.8 L225.1,130.8 L253.0,87.8 Z',g:'M146.2,287.0 L133.0,287.0 L106.5,327.2 L119.0,326.5 Z M86.8,169.5 L74.8,169.5 L29.5,282.2 L43.7,282.2 Z M105.8,92.5 L89.5,95.8 L55.5,169.2 L69.0,169.2 Z',r:'M304.5,259.0 L300.5,269.5 L313.0,268.2 L317.0,258.8 Z M361.5,126.0 L344.0,126.5 L269.5,235.8 L256.0,257.5 L276.2,257.0 Z M279.0,87.8 L266.7,87.5 L251.5,117.2 L262.2,119.0 Z',y:'M334.2,281.2 L302.0,281.2 L288.2,315.8 L321.0,315.5 Z'},
    XSPEC=['#eef1f6','#ffc6e2','#ffe6a0','#c2f3c6','#a2e7ff','#c8b6ff','#eef1f6'],XOIL=['#120d1f','#3a2a74','#11524c','#6a2747','#28205a','#0f3a46','#120d1f'],
    XGT=['#c9f7dd','#5fd99b','#e9fff3','#2fbf7a','#a8f0c9','#c9f7dd'],XRT=['#ffd1cc','#ff6b5e','#fff0ee','#e0443a','#ffb3aa','#ffd1cc'],XYT=['#ffefb8','#f7c24a','#fff8dc','#e0a422','#ffe08a','#ffefb8'],
    XK=0,xid=function(){return "x2c"+(++XK)},
    XRM=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
  function xlogo(cx,cy,w,f){var k=w/331.3;return '<g transform="translate('+(cx-195.9*k).toFixed(2)+' '+(cy-207.4*k).toFixed(2)+') scale('+k.toFixed(4)+')">'+
    (f.e?'<path d="'+XLG.e+'" fill="'+f.e+'"/>':'')+(f.g?'<path d="'+XLG.g+'" fill="'+f.g+'"/>':'')+(f.r?'<path d="'+XLG.r+'" fill="'+f.r+'"/>':'')+(f.y?'<path d="'+XLG.y+'" fill="'+f.y+'"/>':'')+'</g>'}
  /* a foil: repeating bands that drift on one 6 s clock */
  function xhx(id,a,x2,y2,dx){return '<linearGradient id="'+id+'" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="'+x2+'" y2="'+y2+'" spreadMethod="repeat">'+
    a.map(function(c,i){return '<stop offset="'+(i/(a.length-1)).toFixed(3)+'" stop-color="'+c+'"/>'}).join("")+
    '<animateTransform attributeName="gradientTransform" type="translate" values="0 0;'+dx+' '+(dx*y2/x2/3).toFixed(1)+'" dur="6s" repeatCount="indefinite"/></linearGradient>'}
  /* the light catching it now and then, and the fine diffraction grooves */
  function xglint(id,op){return '<linearGradient id="'+id+'" gradientUnits="userSpaceOnUse" x1="-70" y1="-10" x2="-36" y2="14"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity="'+op+'"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>'+
    '<animateTransform attributeName="gradientTransform" type="translate" values="0 0;230 0;230 0" keyTimes="0;.55;1" dur="6s" repeatCount="indefinite"/></linearGradient>'}
  function xgroove(id,per,ang,op){return '<pattern id="'+id+'" patternUnits="userSpaceOnUse" width="'+per+'" height="'+per+'" patternTransform="rotate('+ang+')"><rect width="'+(per*.45).toFixed(2)+'" height="'+per+'" fill="#fff" fill-opacity="'+op+'"/></pattern>'}
  /* hot-stamped foil follows the card's fibres: its grain multiplied through the foil */
  function xgrain(id,s){return '<filter id="'+id+'" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.05" numOctaves="3" seed="'+s+'" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/>'+
    '<feComponentTransfer in="g" result="t"><feFuncR type="linear" slope=".36" intercept=".72"/><feFuncG type="linear" slope=".36" intercept=".72"/><feFuncB type="linear" slope=".36" intercept=".72"/></feComponentTransfer>'+
    '<feComposite in="t" in2="SourceGraphic" operator="in" result="tm"/><feBlend in="SourceGraphic" in2="tm" mode="multiply"/></filter>'}
  function xarc(id,r,top){return '<path id="'+id+'" d="M '+(50-r)+',50 A '+r+','+r+' 0 0 '+(top?1:0)+' '+(50+r)+',50"/>'}
  function xring(id,r){return '<path id="'+id+'" d="M 50,'+(50+r)+' a '+r+','+r+' 0 1,1 0.01,0"/>'}
  function xtp(pid,txt,fs,fill,ls,len){return '<text text-rendering="geometricPrecision" font-family="Archivo, sans-serif" font-weight="900" font-size="'+fs+'" letter-spacing="'+ls+'" fill="'+fill+'"><textPath href="#'+pid+'" xlink:href="#'+pid+'" startOffset="50%" text-anchor="middle"'+
    (len?' textLength="'+len.toFixed(1)+'" lengthAdjust="spacing"':'')+'>'+txt+'</textPath></text>'}
  /* the logo in the foil: the letters in a second, broader foil drifting the other way, the slashes and the dot in green, red and gold
     tinted foils, a raised edge (light above and left, dark below and right) and a fine keyline */
  function xmark(id,cx,cy,w,o){var d=.6,k=w/331.3,one=function(f){return xlogo(cx,cy,w,{e:f,g:f,r:f,y:f})};
    return {defs:xhx(id+"b",o.pal,-78,96,-78)+xhx(id+"g",XGT,40,52,40)+xhx(id+"r",XRT,40,52,40)+xhx(id+"y",XYT,40,52,40),
      body:'<g transform="translate('+d+' '+(d*1.15).toFixed(2)+')" fill-opacity="'+o.sd+'">'+one("#1c1830")+'</g>'+
      '<g transform="translate('+(-d*.8).toFixed(2)+' '+(-d*.9).toFixed(2)+')" fill-opacity="'+o.lt+'">'+one("#ffffff")+'</g>'+
      xlogo(cx,cy,w,{e:"url(#"+id+"b)",g:"url(#"+id+"g)",r:"url(#"+id+"r)",y:"url(#"+id+"y)"})+
      '<g fill="none" stroke="#24203a" stroke-opacity=".38" stroke-linejoin="round" transform="translate('+(cx-195.9*k).toFixed(2)+' '+(cy-207.4*k).toFixed(2)+') scale('+k.toFixed(4)+')"><path d="'+XLG.e+'" stroke-width="'+(.5/k).toFixed(2)+'"/></g>'}}
  function xsv(defs,body){return '<svg class="xc-s" viewBox="0 0 100 100" role="img" aria-label="EZ hologram: graded by the market close" focusable="false"><defs>'+defs+'</defs>'+body+'</svg>'}
  /* X3+: the certificate seal, hot-stamped (flush in the card, the grain through the foil, its edge pressed) */
  function xseal(){var id=xid(),p="";for(var i=0;i<56;i++){var a=i/56*Math.PI*2,r=i%2?44.5:49;p+=(i?"L":"M")+(50+r*Math.cos(a)).toFixed(2)+","+(50+r*Math.sin(a)).toFixed(2)}p+="Z";
    var m=xmark(id+"m",50,52,46,{pal:["#dfe6ef","#9fe0ff","#f6b6dc","#fff0b0","#b6f2c8","#c3b0ff","#dfe6ef"],sd:.62,lt:.9});
    return xsv(xhx(id+"h",XSPEC,46,26,46)+xgroove(id+"q",1.6,62,.1)+xgrain(id+"n",13)+'<clipPath id="'+id+'c"><path d="'+p+'"/></clipPath>'+m.defs+xarc(id+"a",33.2,1)+xarc(id+"z",38.4,0),
      '<g clip-path="url(#'+id+'c)"><g filter="url(#'+id+'n)"><rect width="100" height="100" fill="url(#'+id+'h)"/></g><rect width="100" height="100" fill="url(#'+id+'q)"/></g>'+
      '<path d="'+p+'" fill="none" stroke="#4d5160" stroke-opacity=".45" stroke-width=".6"/><circle cx="50" cy="50" r="40.6" fill="none" stroke="#3b3f4b" stroke-opacity=".42" stroke-width=".6"/>'+
      xtp(id+"a","GRADED",6.6,"#262a35",1.6)+xtp(id+"z","BY THE MARKET CLOSE",4.6,"#262a35",.5)+
      m.body+'')}
  /* X2+: the logo stamp (the oil-slick disc, two foil rings, the legend round it, the logo small and in foil inside) */
  function xbadge(){var id=xid(),m=xmark(id+"m",50,51,40,{pal:XSPEC,sd:.6,lt:.35});
    return xsv(xhx(id+"h",XOIL,44,30,44)+xhx(id+"k",XSPEC,30,18,30)+xgroove(id+"q",1.4,90,.06)+'<clipPath id="'+id+'c"><circle cx="50" cy="50" r="47"/></clipPath>'+m.defs+xring(id+"t",36.1),
      '<g clip-path="url(#'+id+'c)"><rect width="100" height="100" fill="url(#'+id+'h)"/><rect width="100" height="100" fill="url(#'+id+'q)"/></g>'+
      '<circle cx="50" cy="50" r="44.4" fill="none" stroke="url(#'+id+'k)" stroke-width="2"/><circle cx="50" cy="50" r="33.4" fill="none" stroke="url(#'+id+'k)" stroke-width=".9"/>'+
      xtp(id+"t","GRADED · BY THE MARKET CLOSE ·",5.2,"url(#"+id+"k)",.6,2*Math.PI*36.1*.965)+m.body+
      '<circle cx="50" cy="50" r="47" fill="none" stroke="#000" stroke-opacity=".45" stroke-width=".6"/>')}
  /* a stamp holds the boards' frame until it is the one in front */
  function xstill(s){try{s.pauseAnimations();s.setCurrentTime(1.6)}catch(e){}}
  /* (owner, 2026-10-25: "the 9.5 and 10 rounds get the specific stamp. I love that idea") a perfect round, all AIs right on direction
     (the label's Perfect, Gem or Pristine), gets the hot-stamped seal; every other round the logo stamp; on both pages */
  function xkind(g){var up=g.a>0;return g.calls.every(function(x){return (x[1].indexOf("DOWN")<0)===up})?"seal":"badge"}
  function xstamp(c){var st=c.querySelector(".xc-st");if(!st||st.firstChild)return;st.innerHTML=st.getAttribute("data-k")==="seal"?xseal():xbadge();xstill(st.firstChild)}
  /* the four worn-ink filters of the PASS/FAIL cartouches, once for the page */
  function xdefs(){if(document.getElementById("x2pcw0")||!document.body)return;var sv=document.createElementNS("http://www.w3.org/2000/svg","svg");
    sv.setAttribute("width","0");sv.setAttribute("height","0");sv.setAttribute("aria-hidden","true");sv.style.position="absolute";
    sv.innerHTML='<filter id="x2pcM" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="2" seed="21" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.45 1.675" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter><filter id="x2pcL" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="2" seed="21" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.2 1.6" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter><filter id="x2pcInk" x="-6%" y="-12%" width="112%" height="124%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.1" xChannelSelector="R" yChannelSelector="G"/></filter>'+[21,22,23,24].map(function(s,i){return '<filter id="x2pcw'+i+'" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="2" seed="'+s+'" result="n"/>'+
      '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.9" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>'}).join("");document.body.appendChild(sv)}
  function xmini(w,c,rot,i){return '<svg class="xc-m" viewBox="0 0 29 13" width="29" height="13" style="--rot:'+rot+'deg" role="img" aria-label="'+w+'" focusable="false"><g filter="url(#x2pcw'+i+')" stroke="'+c+'" fill="'+c+'">'+
    '<path d="M4 1H25L28 4V9L25 12H4L1 9V4Z" fill="none" stroke-width="1.4"/><text x="14.5" y="9.09" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="7.2" letter-spacing=".5" stroke="none">'+w+'</text></g></svg>'}
  function xnm(m){return m==="GPT"?"GPT":m.charAt(0)+m.slice(1).toLowerCase()}
  function xsvg(m){try{var h=typeof logo==="function"?logo(m):"",x=h.match(/<svg[\s\S]*<\/svg>/);return x?x[0]:""}catch(e){return ""}}
  function xmove(a){var dn=a<0;return '<span aria-hidden="true">'+(dn?"−":"+")+'</span><span class="sr">'+(dn?"Down ":"Up ")+'</span>'+Math.abs(a).toFixed(2)+"%"}
  /* builds (or, on a copy such as the round opened over the page, rebuilds with fresh ids) a graded card's certificate */
  window.__x2pXdefs=xdefs;   /* the standings and the proof print in these inks too (LIGHTINK, skin-x2plus.css) */
  function certify(c,g,re){var fin=c.querySelector(".face.back .fin");if(!fin)return;var old=fin.querySelector(".xc");if(old&&!re)return;xdefs();
    var wn=g.win?g.win.split(" & "):[],up0=g.a>0,R=g.calls.map(function(x){var up=x[1].indexOf("DOWN")<0,mg=parseFloat(String(x[1]).replace(/^(UP|DOWN)\s*/,""));
      return {m:x[0],up:up,mg:Math.round(mg*100)/100,ok:up===up0,off:+x[2],win:wn.indexOf(x[0])>-1}}),by=function(a,b){return a.off-b.off};
    R=R.filter(function(x){return x.ok}).sort(by).concat(R.filter(function(x){return !x.ok}).sort(by));
    /* (owner, 2026-10-25) the winner's line is black like the rest; a "Winner" cartouche in the PASS stamp's style marks it, above the
       name, its crown in gold ink (an emoji cannot be printed) */
    var rows=R.map(function(x,i){var gd=x.win;
      return '<div class="xc-r '+(gd?"win":x.ok?"ok":"no")+'">'+(gd?'<span class="xc-wn"><svg viewBox="0 0 44 12" width="44" height="12" aria-hidden="true" focusable="false"><path d="M3.5 1H40.5L43 3.5V8.5L40.5 11H3.5L1 8.5V3.5Z" fill="none" stroke="#1d1a1e" stroke-width="1.2"/><path class="cr" d="M4.6 9.2L4 4L6.6 6.1L8.3 2.9L10 6.1L12.6 4L12 9.2Z" fill="#a87a1c"/><text x="28" y="8.6" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="7" letter-spacing=".7" fill="#1d1a1e">WINNER</text></svg><span class="sr">Winner</span></span>':'')+
        '<b class="xc-rk lp">'+(i+1)+'</b><span class="xc-mk" data-m="'+x.m+'" aria-hidden="true">'+xsvg(x.m)+'</span><span class="xc-nm lp">'+xnm(x.m)+'</span>'+
        xmini(x.ok?"PASS":"FAIL",x.ok?"#1f6b3f":"#a8231a",[-6,-4,-7,-5][i%4],i%4)+
        /* (owner, 2026-10-27) the logo's slab; shown by the skin's CERTL1 block on X2+ instead of the stamp */
        '<span class="xc-pf '+(x.ok?"p":"f")+'" aria-hidden="true"><span>'+(x.ok?"PASS":"FAIL")+'</span></span>'+
        '<span class="xc-cl lp '+(x.up?"up":"dn")+'" style="--rot:'+[-2.5,-1.5,-3,-2][i%4]+'deg"><span aria-hidden="true">'+(x.up?"+":"−")+'</span><span class="sr">'+(x.up?"Up ":"Down ")+'</span>'+x.mg+'%</span></div>'}).join("");
    var fb=(old||fin).querySelector("[data-flip]"),h4=(old||fin).querySelector("h4");
    var x=document.createElement("div");x.className="xc";
    x.innerHTML='<div class="xc-fr" aria-hidden="true"></div><div class="xc-hd"><p class="xc-t"><i class="xc-sr xc-g" aria-hidden="true">★</i><span class="lp">Certificate</span><i class="xc-sr xc-g" aria-hidden="true">★</i></p><p class="xc-no lp">No. '+String(g.n).padStart(4,"0")+'</p></div>'+
      '<p class="xc-sec"><span class="lp">What they predicted</span></p><div class="xc-rows">'+rows+'</div>'+
      '<div class="xc-out"><small class="lp">Market</small><b class="lp '+(g.a<0?"dn":"up")+'">'+xmove(g.a)+'</b></div>'+
      /* (owner, 2026-10-25, round 5) Calls filed and Graded on side by side, upright, the stamp level with them, the pair as far from
         the market box as from "See the film" under it */
      '<div class="xc-mid"><div class="xc-lc"><div class="xc-dt"><p class="xc-d"><small class="lp">Calls filed</small><b class="lp">'+md(g.called).t+'</b></p><p class="xc-d"><small class="lp">Graded on</small><b class="lp">'+md(g.resolves).t+'</b></p></div>'+
      '<div class="xc-st" data-k="'+xkind(g)+'" style="--xr:'+(xkind(g)==="seal"?7:6)+'deg"></div></div><div class="xc-ft"></div></div>';
    if(h4){h4.className="sr";x.insertBefore(h4,x.firstChild)}
    if(fb){fb.classList.add("lp","xc-film");x.querySelector(".xc-ft").appendChild(fb)}
    /* the page's own stats side stays under it, hidden: on a 350px phone and narrower it still sets the card's height (CERT block) */
    if(old)old.remove();fin.appendChild(x);
    if(re)xstamp(c)}
  /* (owner, 2026-10-28: a round with its calls in still showed the old dark panel while graded rounds carry the certificate; "a mock-up
     where we can have calls are in before it becomes a certificate... that doesn't have the graded stamp yet") the same certificate on a
     pending card's one face: the calls in the order filed, no ranks, no PASS/FAIL yet, the market still to answer, and where the graded
     stamp goes a stamp of its own. Variant by window.__x2pPendV (mockups); the build ships one */
  /* (audit, 2026-10-28) a stock listed abroad is graded at its own exchange's close: Seoul and Tokyo 15:30 (06:30 UTC), Taipei 13:30
     (05:30 UTC), Hong Kong 16:00 (08:00 UTC), London 16:30 and the euro exchanges 17:30 local (European summer time to the last
     Sunday of October) */
  function xcloseAt(s,tk){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);if(!m)return null;var y=2000+(+m[3]),mo=+m[1],d=+m[2],x=(String(tk||"").match(/\.([A-Z]+)$/)||[])[1];
    if(x==="KS"||x==="KQ"||x==="T")return Date.UTC(y,mo-1,d,6,30);if(x==="TW")return Date.UTC(y,mo-1,d,5,30);if(x==="HK")return Date.UTC(y,mo-1,d,8);
    if(x==="L"||x==="AS"||x==="DE"||x==="SW"||x==="PA"||x==="MI"||x==="MC"){var ls=function(mm){var t=new Date(Date.UTC(y,mm,0));return t.getUTCDate()-t.getUTCDay()},
      su=(mo>3&&mo<10)||(mo===3&&d>=ls(3))||(mo===10&&d<ls(10)),h=(x==="L"?16:17)-1-(su?1:0);return Date.UTC(y,mo-1,d,h+(x==="L"?1:0),30)}
    return xclose(s)}
  function xclose(s){if(!s)return null;var m=String(s).match(/(\d+)\/(\d+)\/(\d+)/);if(!m)return null;
    /* 4 pm in New York that day: 20:00 UTC in daylight time, 21:00 in standard time (from the first Sunday of November) */
    var y=2000+(+m[3]),mo=+m[1],d=+m[2],nov=new Date(Date.UTC(y,10,1)),fs=1+(7-nov.getUTCDay())%7,mar=new Date(Date.UTC(y,2,1)),ss=1+(7-mar.getUTCDay())%7+7;
    var dst=(mo>3&&mo<11)||(mo===3&&d>=ss)||(mo===11&&d<fs);return Date.UTC(y,mo-1,d,dst?20:21)}
  function xleft(ms){var mn=Math.max(0,Math.round(ms/60000)),h=Math.floor(mn/60);return h>=24?Math.floor(h/24)+"d "+(h%24)+"h":h?h+"h "+(mn%60)+"m":(mn%60)+"m"}
  function xlock(id,v){
    return '<svg class="xc-s xc-lk" viewBox="0 0 100 100" role="img" aria-label="'+(v==="B"||v==="D"?"Calls locked before the report":"Not graded yet")+'" focusable="false">'+(v==="B"||v==="D"?
      '<g filter="url(#x2pcw1)" fill="#a8231a" stroke="#a8231a"><rect x="6" y="28" width="88" height="44" rx="3" fill="none" stroke-width="3"/><rect x="11" y="33" width="78" height="34" rx="1.5" fill="none" stroke-width="1"/>'+
      '<text x="50" y="54.5" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="18" letter-spacing="2" stroke="none">LOCKED</text>'+
      '<text x="50" y="63.4" text-anchor="middle" font-family="Archivo,sans-serif" font-weight="800" font-size="4.7" letter-spacing=".7" stroke="none">BEFORE THE REPORT</text></g>':
      '<defs><path id="'+id+'c" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1 -72 0"/></defs><g filter="url(#x2pcw2)" fill="none" stroke="#1d1a1e">'+
      '<circle cx="50" cy="50" r="44" stroke-width="1.6" stroke-dasharray="4 3.2"/><circle cx="50" cy="50" r="29" stroke-width=".8" stroke-dasharray="2 2.4"/>'+
      '<text font-family="Archivo,sans-serif" font-weight="800" font-size="6.2" fill="#1d1a1e" stroke="none"><textPath href="#'+id+'c" startOffset="0" textLength="222" lengthAdjust="spacing">STAMPED AT THE CLOSE · STAMPED AT THE CLOSE ·</textPath></text>'+
      '<text x="50" y="54" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="13" fill="#1d1a1e" stroke="none" opacity=".55">?</text></g>')+'</svg>'}
  function xopen(v,i){if(v==="B")return xmini("LOCKED","#1d1a1e",[-6,-4,-7,-5][i%4],i%4).replace('font-size="7.2" letter-spacing=".5"','font-size="6.2" letter-spacing=".3"');
    /* (owner, 2026-10-28, a phone screenshot circling them: no empty boxes on a card still to be graded) an empty slot keeps the calls in their column */
    return '<span class="xc-m" aria-hidden="true"></span>'}
  var XPN=0;
  function pendify(c,u,re){var fin=c.querySelector(".face.front .fin");if(!fin)return;var old=fin.querySelector(".xc");if(old&&!re)return;xdefs();
    var v=window.__x2pPendV||"D",id="xp"+(++XPN),cl=xcloseAt(u.resolves,u.ticker),now=Date.now();
    var rows=u.calls.map(function(x,i){var up=x.dir==="UP";
      return '<div class="xc-r pd"><b class="xc-rk lp" aria-hidden="true"></b><span class="xc-mk" data-m="'+x.m+'" aria-hidden="true">'+xsvg(x.m)+'</span><span class="xc-nm lp">'+xnm(x.m)+'</span>'+xopen(v,i)+
        '<span class="xc-cl lp '+(up?"up":"dn")+'" style="--rot:'+[-2.5,-1.5,-3,-2][i%4]+'deg"><span aria-hidden="true">'+(up?"+":"−")+'</span><span class="sr">'+(up?"Up ":"Down ")+'</span>'+x.mag+'%</span></div>'}).join("");
    var mk=(v==="C"||v==="D")&&cl&&cl>now?'<b class="lp xc-cd" data-cl="'+cl+'"><i class="xc-ci">Closes in </i><span>'+xleft(cl-now)+'</span></b>':'<b class="lp xc-q">'+(!u.resolves?"Date to come":cl&&cl<=now?"Results soon":"At the close")+'</b>';
    var x=document.createElement("div");x.className="xc xc-pend";x.setAttribute("data-v",v);
    x.innerHTML='<div class="xc-fr" aria-hidden="true"></div><div class="xc-hd"><p class="xc-t"><i class="xc-sr xc-g" aria-hidden="true">★</i><span class="lp">Certificate</span><i class="xc-sr xc-g" aria-hidden="true">★</i></p><p class="xc-no lp">No. '+String(u.n).padStart(4,"0")+'</p></div>'+
      '<p class="xc-sec"><span class="lp">What they predicted</span></p><div class="xc-rows">'+rows+'</div>'+
      '<div class="xc-out"><small class="lp">Market</small>'+mk+'</div>'+
      '<div class="xc-mid"><div class="xc-lc"><div class="xc-dt"><p class="xc-d"><small class="lp">Calls filed</small><b class="lp">'+md(u.called).t+'</b></p><p class="xc-d"><small class="lp">Final grade</small><b class="lp">'+(u.resolves?md(u.resolves).t:"Soon")+'</b></p></div>'+
      '<div class="xc-st xc-stp" style="--xr:'+(v==="B"||v==="D"?-8:0)+'deg">'+xlock(id,v)+'</div></div><div class="xc-ft"></div></div>';
    if(old)old.remove();fin.appendChild(x);c.classList.add("x2p-pc")}
  window.__x2pPendCopy=function(c){var n=+c.getAttribute("data-n"),u=null;PENDING.forEach(function(q){if(q.n===n)u=q});if(u)try{pendify(c,u,true)}catch(e){window.__x2pCertErr=e}};
  /* the market box's countdown on a pending certificate, once a minute */
  setInterval(function(){[].forEach.call(document.querySelectorAll(".xc-pend .xc-cd[data-cl]"),function(b){var l=+b.getAttribute("data-cl")-Date.now();if(l>0)b.lastChild.textContent=xleft(l);else{b.className="lp xc-q";b.textContent="Results soon"}})},60000);
  /* the stamp in front: drawn for the front card and its neighbours, the foil moving only on the front card with its stats side
     up (or on the round opened over the page), while its section is on screen; never with reduced motion */
  /* the foils are stepped by script, 20 times a second, on a paused SMIL clock (setCurrentTime): measured on a 4x slower CPU, SMIL's own
     60 updates a second cost the page 2.1 s of work in 4 s and dropped it to 35 frames a second; 20 steps cost 1.0 s and keep 48 */
  /* (owner, 2026-10-25: the white stripe passing through was "a tiny bit too much... more subtle, rather slower, and less") the clock runs at
     half speed, and (later: "remove that white thing") the light sweep is gone */
  var XLIVE=null,XQ=0,XT=0,XL=0,XTI=-2;
  function xstep(ts){if(!XLIVE||!XLIVE.isConnected){XT=0;return}if(!XL||ts-XL>=50){try{XLIVE.setCurrentTime(XLIVE.getCurrentTime()+(XL?Math.min(ts-XL,200):50)/2000)}catch(e){}XL=ts}XT=requestAnimationFrame(xstep)}
  /* a card gets its certificate when it comes within two places of the front card (built for all 45 at load, it cost the first build
     about 1 s on a 4x slower CPU); a card further off keeps the page's own stats side, which no one sees */
  var XG=null;function xg(n){if(!XG){XG={};ROUNDS.forEach(function(r){XG[r.n]=r})}return XG[n]}
  function xnear(c){if(c.getAttribute("data-k")==="p"){if(!c.querySelector(".xc"))window.__x2pPendCopy(c);return}if(c.getAttribute("data-k")!=="g")return;if(!c.querySelector(".xc")){var g=xg(+c.getAttribute("data-n"));if(!g)return;try{certify(c,g)}catch(e){window.__x2pCertErr=e;return}}xstamp(c)}
  function xlive(){XQ=0;var car=document.getElementById("car"),rec=document.getElementById("record"),want=null,pm=document.querySelector("#x2pRm .card[data-k=g]");
    if(car){var cs=[].slice.call(car.querySelectorAll(".card[data-n]")),i=-1;cs.forEach(function(c,j){if(c.classList.contains("cur"))i=j});
      if(i>-1)for(var j=Math.max(0,i-2);j<=Math.min(cs.length-1,i+2);j++)xnear(cs[j]);
      /* (audit, 2026-10-28) a keyboard went through 170 "See the stats" buttons before the standings: only the card in front takes
         focus; the round picker and the arrows reach the others */
      /* the round picker: one tab stop (the chip of the card in front); the arrow keys, Home and End move along it */
      var chs=document.querySelector("#record .chips");if(chs){[].forEach.call(chs.querySelectorAll("button.chip"),function(b){b.tabIndex=b.getAttribute("aria-current")==="true"?0:-1});
        if(!chs.__x2pKb){chs.__x2pKb=1;chs.addEventListener("keydown",function(e){var bs=[].slice.call(chs.querySelectorAll("button.chip")),k=bs.indexOf(document.activeElement);if(k<0)return;
          var t=e.key==="ArrowRight"||e.key==="ArrowDown"?k+1:e.key==="ArrowLeft"||e.key==="ArrowUp"?k-1:e.key==="Home"?0:e.key==="End"?bs.length-1:null;if(t==null)return;e.preventDefault();
          t=Math.max(0,Math.min(bs.length-1,t));bs.forEach(function(b,j){b.tabIndex=j===t?0:-1});bs[t].focus()})}}
      if(i!==XTI){XTI=i;cs.forEach(function(c,j){[].forEach.call(c.querySelectorAll("button,a[href]"),function(b){if(j===i){if(b.hasAttribute("data-x2ptb")){b.removeAttribute("tabindex");b.removeAttribute("data-x2ptb")}}
        else if(!b.hasAttribute("tabindex")){b.setAttribute("tabindex","-1");b.setAttribute("data-x2ptb","")}})})}}
    if(pm)xstamp(pm);
    if(!XRM&&!document.hidden){if(pm){if(pm.classList.contains("flipped"))want=pm.querySelector(".xc-s")}
      else if(rec&&!rec.classList.contains("x2p-offs")){var cc=rec.querySelector(".card.cur[data-k=g]");if(cc&&(cc.classList.contains("flipped")||cc.classList.contains("nofilm")))want=cc.querySelector(".xc-s")}}
    if(want===XLIVE)return;XLIVE=want;XL=0;if(want&&!XT)XT=requestAnimationFrame(xstep)}
  window.__x2pCertLive=function(){if(!XQ)XQ=requestAnimationFrame(xlive)};
  window.__x2pCertCopy=function(c){if(c.getAttribute("data-k")==="p")return window.__x2pPendCopy(c);var g=xg(+c.getAttribute("data-n"));if(g&&c.getAttribute("data-k")==="g")try{certify(c,g,true)}catch(e){window.__x2pCertErr=e}};
  window.__x2pSlab=function(root){var late=[];[].forEach.call((root||document).querySelectorAll("#record .card[data-n]"),function(c){[].forEach.call(c.querySelectorAll(".cwin .wn"),function(w){if(w.textContent==="Date to come")w.textContent="Soon"});var fs=[].filter.call(c.querySelectorAll(".face"),function(f){return !f.querySelector(":scope>.fx")});if(!fs.length)return;
    /* (speed, 2026-10-27) the back of a far graded card is put in later (build.py, the record): it gets its label then, fitted on its own;
       the card's aria-label is added once */
    var fresh=!c.querySelector(".fx"),n=+c.getAttribute("data-n"),g=null,q=null,i;for(i=0;i<ROUNDS.length;i++)if(ROUNDS[i].n===n)g=ROUNDS[i];if(!g)for(i=0;i<PENDING.length;i++)if(PENDING[i].n===n)q=PENDING[i];var u=null;if(!g&&!q)for(i=0;i<UPCOMING.length;i++)if(UPCOMING[i].n===n)u=UPCOMING[i];
    var r=g||q||u;if(!r)return;var hit=g?g.calls.filter(function(x){return (x[1].indexOf("DOWN")<0)===(g.a>0)}).length:0,nc=g?g.calls.length:0,d=md(r.called);
    /* the EZ grade, rubric v1 (owner, 2026-10-21): direction sets the band and the word (all right 8-10 Perfect, most 6-7.5 Strong, half 4-5.5 Split,
       some 2-3.5 Rough, none 1 Rekt); closeness of the AIs that called the direction moves it up the band; a 10 (gold label, foil) = all right,
       average miss 1.5% or less and under half the move (else 9.5); Pristine = a 10 under 1% */
    var E=g?ezGrade(g):null,gr=E?E.gr:0,ds=E?E.ds:"",why=E?E.why:"",pr=E?E.pr:false;
    var h='<div class="zlab"><div class="zl"><span class="y">'+d.y+' <span class="s">$</span><span class="e">E</span><span class="z">Z</span> Season 1</span><span class="nm"><b>'+esc2(r.co)+'</b>'+(r.ticker?' <small>('+esc2(r.ticker)+')</small>':'')+'</span><span class="zb"><i></i>'+String(n).padStart(8,"0")+'<span class="holo"><i class="s">$</i><i class="e">E</i><i class="z">Z</i></span></span></div>'+
      '<div class="zr"><span class="no">#'+n+'</span>'+(g?'<span class="ds">'+ds+'</span><span class="gr">'+gr+'</span>':(q?(r.resolves?'<span class="ds">Final grade on</span><span class="gr">'+md(r.resolves).t.toUpperCase()+'</span>':'<span class="ds">Final grade</span><span class="gr">SOON</span>'):'<span class="ds">Calls due</span><span class="gr">'+md(r.called).t.toUpperCase()+'</span>'))+'</div>'+
      '</div>';
    fs.forEach(function(f){var o=document.createElement("div");o.className="fx"+(gr===10?" perfect":"")+(pr?" pristine":"");o.setAttribute("aria-hidden","true");o.innerHTML=h;f.appendChild(o);
      /* the back says why, in one line, where the barcode sits on the front */
      if(g&&f.classList.contains("back")){var zb=o.querySelector(".zb");zb.className="zb zwhy";
        /* (owner, rounds 40 and 41, 2026-10-25) the result first, in the label's head type; the miss after it, smaller */
        zb.innerHTML="<b>"+E.hit+" of "+E.nc+" right</b>"+(E.hit?" <small>\u00b7 "+E.av.toFixed(2)+"% off<em> on avg</em></small>":"")}
      /* (owner, 2026-10-21) a 10 gets the rolling foil on both faces (owner: it should not vanish when the card flips): rainbow bands that roll across without end; a sibling of .fx so it lights the film too */
      if(gr===10){var fl=document.createElement("i");fl.className="x2p-foil";fl.setAttribute("aria-hidden","true");fl.appendChild(document.createElement("i"));f.appendChild(fl);if(FRO)FRO.observe(f);else foilFit(f)}});if(!fresh){late.push.apply(late,fs);return}if(window.__x2pNmFit)window.__x2pNmFit();
    var lab=(g?ds+" "+gr+" of 10, "+why.replace(" \u00b7",",").replace("off on avg","off on average"):q?"calls in, final grade on "+md(r.resolves).t:"calls due "+md(r.called).t);c.setAttribute("aria-label",(c.getAttribute("aria-label")||"")+". Grade: "+lab+".")});
    if(late.length&&window.__x2pNmFitIn)window.__x2pNmFitIn(late)};
  /* (owner, 2026-10-21, later) the foil stays light over the film: the mask needs the film's top and bottom inside the face */
  /* (speed, 2026-10-23) every face is measured first and written after, so the page is laid out once, not once per face; the faces are
     fitted by the ResizeObserver, which reports them all together once the page is laid out */
  function foilGet(f){var fl=f.querySelector(".x2p-foil"),a=f.querySelector(f.classList.contains("back")?".fin":".art");if(!fl||!a||!a.offsetHeight)return null;var t=0,e=a;while(e&&e!==f){t+=e.offsetTop;e=e.offsetParent}
    return [fl,t,t+a.offsetHeight]}
  function foilAll(fs){fs.map(foilGet).forEach(function(x){if(x){x[0].style.setProperty("--at",x[1]+"px");x[0].style.setProperty("--ab",x[2]+"px")}})}
  function foilFit(f){foilAll([f])}
  var FRO=window.ResizeObserver?new ResizeObserver(function(es){foilAll(es.map(function(x){return x.target}))}):null;
  function esc2(t){return String(t).replace(/[&<>"]/g,function(x){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[x]})}
  window.__x2pSlab(document);
  /* the certificates' stamps follow the front card */
  try{(function(){var car=document.getElementById("car"),rec=document.getElementById("record");
    if(window.MutationObserver){var mo=new MutationObserver(window.__x2pCertLive);if(car)mo.observe(car,{subtree:true,attributes:true,attributeFilter:["class"]});if(rec)mo.observe(rec,{attributes:true,attributeFilter:["class"]})}
    document.addEventListener("visibilitychange",window.__x2pCertLive);window.__x2pCertLive()})()}catch(e){window.__x2pCertErr=e}

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
    /* season facts for the story sides (round 38), computed once from ROUNDS: the median miss, a right call's average miss, the average
       move, bullseyes, how many rounds took each grade word, and how often all four AIs were wrong together against chance */
    var SF=null;function sf(){if(SF)return SF;var G=ROUNDS.filter(function(g){return typeof g.a==="number"&&!isNaN(g.a)}),C=[];
      G.forEach(function(g){g.calls.forEach(function(x){C.push({g:g,ok:(x[1].indexOf("DOWN")<0)===(g.a>0),off:+x[2]})})});
      var o=C.map(function(c){return c.off}).sort(function(a,b){return a-b}),R=C.filter(function(c){return c.ok}),pw=(C.length-R.length)/C.length,
        f4=G.filter(function(g){return g.calls.length===4}),ds={};G.forEach(function(g){var w=ezGrade(g).ds;ds[w]=(ds[w]||0)+1});
      SF={n:C.length,rounds:G.length,med:o[Math.floor(o.length/2)],avgRight:R.reduce(function(a,c){return a+c.off},0)/R.length,
        mean:G.reduce(function(a,g){return a+Math.abs(g.a)},0)/G.length,bulls:R.filter(function(c){return Math.round(c.off*100)<=10}).length,ds:ds,
        four:f4.length,none4:f4.filter(function(g){return !C.some(function(c){return c.g===g&&c.ok})}).length,indep:Math.round(1/Math.pow(pw,4)),
        worst:function(g,k){return C.slice().sort(function(a,b){return b.off-a.off}).slice(0,k).every(function(c){return c.g===g})}};return SF}
    if(window.__x2pWL)(function(){var P=window.__x2pPnl&&window.__x2pPnl();if(!P)return;var all=[],m,n;for(m in P.A)for(n in P.A[m].per)all.push({m:m,n:+n,v:P.A[m].per[n].v});if(!all.length)return;
      all.sort(function(a,b){return b.v-a.v});var w=all[0],l=all[all.length-1],bi=-1;items.forEach(function(it,i){if(/big/i.test(it.tag))bi=i});
      var W={n:w.n,tag:"Biggest W",call:{m:w.m},head:"",body:"",rec:[]},L={n:l.n,tag:"Biggest L",call:{m:l.m},head:"",body:"",rec:[]};
      if(bi>=0)items.splice(bi,1,W,L);else items.push(W,L)})();
    var cards=[];function mk(it){if(/everyone was wrong/i.test(it.tag))return null;/* dropped on X2+ (owner, 2026-10-20) */var r=null,i;for(i=0;i<ROUNDS.length;i++)if(ROUNDS[i].n===it.n)r=ROUNDS[i];if(r&&window.__x2pRecFill)window.__x2pRecFill(it.n);/* its back, if it waits (build.py) */var o=r&&src.querySelector('.card[data-n="'+it.n+'"]');if(!o)return null;
      var c=o.cloneNode(true),E=ezGrade(r),k=it.tag.toLowerCase(),nf=c.classList.contains("nofilm");c.classList.remove("flipped","cur");c.removeAttribute("data-i");
      var fb=c.querySelector(".face.front [data-flip]");if(fb)fb.textContent="See why ↻";
      /* the story side (owner, 2026-10-25, round 38): the tabloid's words ("The $EZ Tape", option A) in the ringside recap's look
         (option C): the recap bug, a headline, a one-line deck, the story with the odds in it, a tale of the tape, the four calls and
         the rarity as on an old trading card (a star and "1 in N", bottom right). Every number from ROUNDS through sf(). */
      var S=sf(),kw=["","One","Two","Three","Four","Five"],co=esc2(r.co),mv=Math.abs(r.a).toFixed(2),dirW=r.a>0?"rise":"fall",
        per=r.calls.map(function(x){var up=x[1].indexOf("DOWN")<0,mg=parseFloat(x[1].replace(/^(UP|DOWN)\s*/,""));return {m:nm1(x[0]),raw:x[0],up:up,mg:mg,ok:up===(r.a>0),off:+x[2]}}),
        H="",D="",B="",T=null,RA="",RL="",bk=/bull|closest/.test(k)?"bull":/tight/.test(k)?"tight":/biggest w$/.test(k)?"w":/biggest l$/.test(k)?"l":/big/.test(k)?"big":"";
      /* (owner, 2026-10-25, later) context over numbers: the key facts highlighted in the story, then "Think of it this way" with an
         everyday comparison worked out from the same numbers (a miss is a share of the stock's price, so it scales to a stranger's
         height of 1.80 m; a winning margin to a 100 m race) */
      var TK="",hgt=function(pct){var mm=1800*pct/100;var sh=Math.max(1,Math.round(mm/.1));return mm<1?(["","one","two","three","four","five","six","seven","eight","nine","ten"][sh]||sh)+" sheet"+(sh>1?"s":"")+" of paper":mm<10?"a pencil's width":mm<30?"a coin":mm<75?"a thumb":mm<120?"a hand's width":"a ruler"};
      if(bk==="bull"){var bc=it.call?per.filter(function(p){return p.raw===it.call.m})[0]:per.filter(function(p){return p.ok}).sort(function(a,b){return a.off-b.off})[0];
        if(bc){var bull=bc.off<=.1,riv=per.filter(function(p){return !p.ok}).map(function(p){return p.m});
          H=esc2(bc.m)+(bull?" calls it <em>to the decimal</em>":" gets <em>closest</em>");
          D="Said "+co+" "+(bc.up?"+":"−")+(Math.round(bc.mg*100)/100)+"%. It "+(r.a>0?"rose":"fell")+" "+mv+"%.";
          B=riv.length?"<b>"+esc2(x2pAnd(riv))+" said "+(r.a>0?"down":"up")+".</b> "+esc2(bc.m)+" said "+(r.a>0?"up":"down")+", and nailed it.":"<b>All "+(kw[per.length]||per.length).toLowerCase()+" got the direction.</b> Only "+esc2(bc.m)+" "+(bull?"hit the bullseye.":"got this close.");
          TK="Guess a stranger's height. A typical AI call this season is off by <b>"+hgt(S.med)+"</b>. "+esc2(bc.m)+" was off by <b>"+hgt(bc.off)+"</b>.";
          T=[esc2(bc.m)+" missed by",bc.off.toFixed(2)+"%","g","Typical miss",S.med.toFixed(2)+"%","r"];
          if(bull){RA="1 in "+Math.round(S.n/S.bulls);RL=S.bulls+" of "+S.n+" calls this season landed this close"}else{RA="1 in "+S.n;RL="The closest of "+S.n+" calls"}}}
      else if(bk==="tight"&&per.every(function(p){return p.ok})){var tc=per.slice().sort(function(a,b){return a.off-b.off}),mg=tc.length>1?tc[1].off-tc[0].off:0,same=S.ds[E.ds]||1,cm=Math.round(mg*100);
        H=(kw[per.length]||per.length)+" AIs, <em>one brain</em>";
        D="All "+(kw[per.length]||per.length).toLowerCase()+" said "+co+" would "+dirW+". It "+(r.a>0?"rose":"fell")+" "+mv+"%.";
        B="<b>Everyone right. Everyone close.</b> "+(mg>0.0049?esc2(tc[0].m)+" edged "+esc2(tc[1].m)+" for the win.":esc2(tc[0].m)+" and "+esc2(tc[1].m)+" tied at the top.");
        TK=mg>0.0049?"A 100 m photo finish. "+(kw[per.length]||per.length)+" runners cross the line together, and "+esc2(tc[0].m)+" wins by <b>"+(cm<100?cm+" cm":(cm/100).toFixed(1)+" m")+"</b>.":"A 100 m race where "+(kw[per.length]||per.length).toLowerCase()+" runners cross the line together, and the judges cannot split the top two.";
        T=["This round, avg miss",E.av.toFixed(2)+"%","g","Normal right call",S.avgRight.toFixed(2)+"%","r"];
        RA="1 in "+Math.round(S.rounds/same);RL=same+" of "+S.rounds+" rounds graded "+E.ds}
      else if(bk==="big"){var rt=per.filter(function(p){return p.ok}).length,x=(Math.abs(r.a)/S.mean).toFixed(1),worst=S.worst(r,per.length),up=r.a>0;
        H=rt?co+" <em>breaks the scale</em>":co+" <em>fools</em> everyone";
        D=rt?"It "+(up?"jumped":"dropped")+" "+mv+"%. "+rt+" of "+per.length+" saw it coming.":"All "+(kw[per.length]||per.length).toLowerCase()+" said "+(up?"down":"up")+". It "+(up?"jumped":"dropped")+" "+mv+"%.";
        B="<b>The biggest move of the season</b>"+(worst?", and <b>the "+(kw[per.length]||per.length).toLowerCase()+" worst calls</b> of it, all in one day.":".");
        TK=rt?"Four weather apps. "+rt+" called the storm. The rest packed sunglasses.":"Four weather apps forecast drizzle. <b>A hurricane shows up.</b>"+
          (!rt&&per.length===4&&S.none4/S.four>1/S.indep?" And they keep failing together, like four students who “studied alone” and hand in <b>the same wrong answer</b>.":"");
        T=[co+" moved",(up?"▲":"▼")+mv+"%",up?"u":"r","Times a normal move",x+"x","g"];
        RA="1 in "+S.rounds;RL="The biggest move of "+S.rounds+" rounds"}
      /* Biggest W and Biggest L (owner, 2026-10-28, a mockup behind window.__x2pWL: "geared towards crypto people... which model had
         the best round in P&L... which one got wrecked the most"): the season's biggest single-call win and loss in the P&L view's
         accounts, told around that one AI in the traders' own words */
      else if((bk==="w"||bk==="l")&&it.call){var sc=per.filter(function(p){return p.raw===it.call.m})[0];if(sc){var su=r.a>0;
        H=bk==="w"?esc2(sc.m)+" "+(sc.up?"longs":"shorts")+" "+co+". <em>Prints.</em>":esc2(sc.m)+" gets <em>rekt</em> on "+co;
        D=esc2(sc.m)+" went "+(sc.up?"long":"short")+". "+co+" "+(su?"ripped":"dumped")+" "+mv+"%.";
        RA="1 in "+S.n;RL="The biggest "+(bk==="w"?"win":"loss")+" of "+S.n+" calls"}}
      /* (owner, 2026-10-25, later: "instead of showing numbers") the comparison lives in the analogy now, so no tale-of-the-tape box */
      T=null;
      if(!H){H=it.head;B=esc2(it.body)}
      var calls=per.map(function(p){return '<span class="x2p-hc '+(p.ok?"ok":"no")+'">'+esc2(p.m)+'<b><span class="'+(p.up?"x2p-cup":"x2p-cdn")+'">'+(p.up?"▲":"▼")+(Math.round(p.mg*100)/100)+'%</span> <i>'+(p.ok?"✓":"✗")+'</i></b></span>'}).join("");
      /* (owner, 2026-10-26: P&L, "the P&L card for when the story focuses on one individual stock"; M2 of ez/tools/concepts/pnl)
         no "Think of it this way": the headline, the deck and one punch line, then the P&L card: what the star's account made on the
         call (the bullseye) or what the whole table made (the others), the rest of the table in a strip under it, "Simulated" small at
         the foot. The accounts are the P&L view's (window.__x2pPnl), so the cards add up to the board. The call chips stay in the DOM,
         out of sight, for the story side's holo levels. */
      var PL=window.__x2pPnl&&window.__x2pPnl(),pnl="",pun="";
      if(PL){var tk=/^\d/.test(r.ticker)||String(r.ticker).indexOf(".")>-1?r.co.split(" ")[0]:r.ticker,
          rows=r.calls.map(function(x){var t=PL.A[x[0]],q=t&&t.per[r.n];return q&&{raw:x[0],nm:nm1(x[0]),dn:q.dn,mg:q.mg,v:q.v,ok:q.v>0}}).filter(Boolean).sort(function(a,b){return b.v-a.v}),
          wr=rows.filter(function(x){return !x.ok}),rt=rows.length-wr.length,hs=bk==="bull"&&bc?rows.filter(function(x){return x.raw===bc.raw})[0]:(bk==="w"||bk==="l")&&it.call?rows.filter(function(x){return x.raw===it.call.m})[0]:null,
          sum=rows.reduce(function(a,x){return a+x.v},0),big=hs?hs.v:sum,mvs=(r.a>0?"+":"−")+Math.abs(r.a).toFixed(2)+"%",
          side=function(x){return (x.dn?"Short ":"Long ")+esc2(tk)};
        pun=bk==="w"?"The biggest W of the season. One call.":bk==="l"?(!rt?"All "+rows.length+" went "+(rows[0].dn?"short":"long")+". "+(hs?esc2(hs.nm):"One")+" lost the most.":"The biggest L of the season. One call."):bk==="big"?(rt?rt+" of "+rows.length+" caught it.":"They all got wrecked."):bk==="tight"&&!wr.length?"Everyone right. Everyone got paid.":
          hs?(wr.length?esc2(x2pAnd(wr.map(function(x){return x.nm})))+" went "+(wr[0].dn?"short":"long")+". They paid for it.":"Everyone right. Only "+esc2(hs.nm)+" this close."):B;
        if(rows.length)pnl='<div class="pn"><div class="pn-card '+(big>=0?"ok":"no")+'"><div class="pn-ct"><span>'+(hs?esc2(hs.nm)+" · "+side(hs):"All "+rows.length+" AIs · "+esc2(tk))+'</span><em>'+(hs?"Its P&amp;L":"Combined P&amp;L")+'</em></div>'+
          '<b class="pn-big">'+PL.usd(big)+'</b><div class="pn-cs">'+(hs?"Called "+(hs.dn?"−":"+")+(Math.round(hs.mg*100)/100)+"% · It moved "+mvs:"The stock moved "+mvs)+'</div></div>'+
          '<div class="pn-strip">'+rows.filter(function(x){return x!==hs}).map(function(x){return '<span class="'+(x.ok?"ok":"no")+'">'+esc2(x.nm)+'<b>'+PL.usd(x.v,1)+'</b></span>'}).join("")+'</div>'+
          '<small class="pn-sim">Simulated · $100K each<span class="pn-nl"> · no leverage</span></small></div>'}
      var fin=c.querySelector(".face.back .fin");if(fin)fin.innerHTML='<div class="x2p-hb x2p-rc'+(pnl?' x2p-pnb':'')+'"><div class="x2p-rch"><span class="x2p-rbug">Recap</span><small>Round '+r.n+(r.resolves?" · "+md(r.resolves).t:"")+'</small></div>'+
        '<h4>'+H+'</h4>'+(D?'<p class="x2p-dk">'+D+'</p>':'')+(pnl?'<div class="x2p-hw"><p class="pn-pun">'+pun+'</p></div>'+pnl:'<div class="x2p-hw"><p>'+B+'</p>'+(TK?'<p class="x2p-tkw"><small>Think of it this way</small>'+TK+'</p>':'')+'</div>')+
        (T?'<div class="x2p-tt"><div><small>'+T[0]+'</small><b class="x2p-t'+T[2]+'">'+T[1]+'</b></div><i aria-hidden="true">vs</i><div><small>'+T[3]+'</small><b class="x2p-t'+T[5]+'">'+T[4]+'</b></div></div>':'')+
        '<div class="x2p-hcs">'+calls+'</div><div class="x2p-rft">'+(nf?'':'<button type="button" class="flipb" data-flip>↻ See the '+(c.querySelector(".art.still")?'picture':'film')+'</button>')+
        (RA?'<span class="x2p-rar" role="note" aria-label="Rarity: '+RA+'. '+RL+'" title="'+RL+'"><b aria-hidden="true">★</b><span aria-hidden="true">'+RA+'</span></span>':'')+'</div></div>';
      /* (owner, 2026-10-21) no film yet: the card opens on its story and stays there; "Film soon" is never the face we show */
      if(nf)c.classList.add("flipped");setFaces2(c,nf);return c}
    items.forEach(function(it){var c=mk(it);if(!c)return;var w=document.createElement("div");w.className="x2p-hi";var tg=document.createElement("span");tg.className="x2p-htag x2p-h-"+(/closest/i.test(it.tag)?"c":/tight|biggest w$/i.test(it.tag)?"t":"b");tg.textContent=it.tag;w.appendChild(tg);w.appendChild(c);cards.push(w)});
    /* Bullseyes (owner, 2026-10-24: "add the Tesla card on top of the Philip Morris one", "times three, so you can then see all of
       them"; "Grok hits the bullseye on Tesla"): every call that got the direction right and landed within 0.1% of the move, stacked
       in the Closest call's place under the tag "Bullseye" (the closest call of the season is always one of them), the closest on
       top (a tie: the newer first, so Tesla over Philip Morris), "×3" on the stack; a tap on it deals the next card to the top. Each
       card's back is the story side as before. Computed from ROUNDS; with none, the Closest call card stays as it was. */
    (function(){var bw=null;cards.forEach(function(w){var t=w.querySelector(".x2p-htag");if(t&&/closest/i.test(t.textContent))bw=w});if(!bw)return;
      var B=[],nC=0;ROUNDS.forEach(function(r){if(typeof r.a!=="number"||isNaN(r.a))return;r.calls.forEach(function(x){nC++;var up=x[1].indexOf("DOWN")<0,mg=parseFloat(x[1].replace(/^(UP|DOWN)\s*/,"")),cv=up?mg:-mg;
        if(up===(r.a>0)&&Math.round(Math.abs(cv-r.a)*100)<=10)B.push({r:r,m:x[0],up:up,mg:mg,off:Math.abs(cv-r.a)})})});
      if(!B.length)return;B.sort(function(a,b){return Math.round(a.off*100)-Math.round(b.off*100)||b.r.n-a.r.n});
      var cs=B.map(function(b){var co=b.r.co;return mk({n:b.r.n,tag:"Bullseye",call:{m:b.m},head:esc2(nm1(b.m))+" hits the bullseye on "+esc2(co)+".",rec:[],
        body:nm1(b.m)+" said "+co+" would "+(b.up?"rise ":"fall ")+(Math.round(b.mg*100)/100)+"%. It "+(b.r.a>0?"rose ":"fell ")+Math.abs(b.r.a).toFixed(2)+"%.",
        extra:b.off.toFixed(2)+"% off. Only "+B.length+" of "+nC+" calls this season landed within 0.1%."})}).filter(Boolean);
      if(!cs.length)return;var tg=bw.querySelector(".x2p-htag");tg.textContent="Bullseye";tg.setAttribute("data-k","Bullseyes");
      [].forEach.call(bw.querySelectorAll(":scope>.card"),function(c){c.remove()});cs.forEach(function(c){bw.appendChild(c)});cs[0].classList.add("x2p-s0");
      if(cs.length<2)return;bw.classList.add("x2p-stk");var order=cs.slice(),bt=document.createElement("button");bt.type="button";bt.className="x2p-stkb";bt.setAttribute("aria-expanded","false");bw.appendChild(bt);
      /* spread the hand (owner, 2026-10-24: "spread the hand is probably the best one", also the lighter of the two measured): the
         corner says "See all 3"; a tap fans the three out side by side and smaller, numbered under them, the top one outlined in
         gold; a tap on one closes the hand onto it, the button or the carousel moving on closes it onto the top one. While spread
         all three take taps (the cards behind are otherwise inert). Poses are CSS variables on the individual transform
         properties, so only translate, rotate, scale and brightness move (the BULLSEYE block). Mockup: launch-r34-stack o4. */
      var spread=false,nums=cs.map(function(c,i){var e=document.createElement("span");e.className="x2p-spn";e.setAttribute("aria-hidden","true");e.textContent=String(i+1);bw.appendChild(e);return e});
      var FAN='<svg viewBox="0 0 16 12" aria-hidden="true" focusable="false"><rect x="1.5" y="2" width="6" height="9" rx="1" transform="rotate(-14 4.5 6.5)" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="8.5" y="2" width="6" height="9" rx="1" transform="rotate(14 11.5 6.5)" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="5" y="1" width="6" height="10" rx="1" fill="#1b181c" stroke="currentColor" stroke-width="1.4"/></svg>';
      var PV=["--t","--r","--s","--b","--dl"];
      function lay(){order.forEach(function(c,i){c.classList.remove("x2p-s0","x2p-s1","x2p-s2");c.classList.add("x2p-s"+Math.min(i,2));var off=!spread&&!!i;c.setAttribute("aria-hidden",off?"true":"false");if("inert" in c)c.inert=off});
        bt.innerHTML=FAN+(spread?"Close":"See all "+order.length);bt.setAttribute("aria-expanded",String(spread));
        bt.setAttribute("aria-label",spread?"Close. Bullseye "+(cs.indexOf(order[0])+1)+" of "+order.length+" stays on top":"Bullseye "+(cs.indexOf(order[0])+1)+" of "+order.length+". See all "+order.length)}
      function open(){if(spread)return;spread=true;bw.classList.add("x2p-spr");var W=bw.offsetWidth,n=cs.length;
        cs.forEach(function(c,i){var k=i-(n-1)/2,x=k*W*.4;c.style.setProperty("--t",x.toFixed(1)+"px "+(Math.abs(k)*22+20)+"px");c.style.setProperty("--r",(k*11)+"deg");c.style.setProperty("--s",".56");c.style.setProperty("--b","1");c.style.setProperty("--dl",(i*45)+"ms");
          c.style.zIndex=String(c===order[0]?14:11+i);c.classList.toggle("x2p-cur",c===order[0]);nums[i].style.left=(W/2+x-5).toFixed(1)+"px"});lay()}
      function close(pick){if(!spread)return;spread=false;bw.classList.remove("x2p-spr");cs.forEach(function(c){PV.forEach(function(v){c.style.removeProperty(v)});c.style.zIndex="";c.classList.remove("x2p-cur")});
        while(pick&&order[0]!==pick){var t=order.shift();if(t.classList.contains("flipped")&&!t.classList.contains("nofilm")){t.classList.remove("flipped");setFaces2(t,false)}var v=t.querySelector("video");if(v&&!v.paused)v.pause();order.push(t)}
        lay();films()}
      lay();
      bt.addEventListener("click",function(e){if(!bw.classList.contains("on"))return;/* off centre: the carousel brings the stack in first */e.preventDefault();e.stopPropagation();if(spread)close(null);else open()});
      bw.addEventListener("click",function(e){if(!spread)return;var c=e.target.closest(".card");if(!c||c.parentNode!==bw)return;e.preventDefault();e.stopPropagation();close(c)},true);
      bw.addEventListener("keydown",function(e){if(spread&&e.key==="Escape"){e.preventDefault();close(null);bt.focus()}});
      if(window.MutationObserver)new MutationObserver(function(){if(spread&&!bw.classList.contains("on"))close(null)}).observe(bw,{attributes:true,attributeFilter:["class"]});
      /* the cue, once: the first time the stack sits centred and whole on screen, the cards behind fan out a little and back and
         the corner button wiggles (not with reduced motion) */
      if(!(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches)&&"IntersectionObserver" in window){var cued=false,cue=function(){if(cued||spread||!bw.classList.contains("on"))return;var r=bw.getBoundingClientRect();
          if(r.top<0||r.bottom>innerHeight+30||r.left<-2||r.right>innerWidth+2)return;cued=true;setTimeout(function(){bw.classList.add("x2p-cue");setTimeout(function(){bw.classList.remove("x2p-cue")},420)},380)},
        cio=new IntersectionObserver(function(){cue();if(cued)cio.disconnect()},{threshold:[.5,.8,1]});cio.observe(bw);
        if(window.MutationObserver){var cmo=new MutationObserver(function(){cue();if(cued)cmo.disconnect()});cmo.observe(bw,{attributes:true,attributeFilter:["class"]})}}})();
    if(!cards.length)return;var old=document.getElementById("x2pHl");if(old)old.remove();
    var box=document.createElement("div");box.id="x2pHl";box.className="x2p-hlc";box.setAttribute("role","region");box.setAttribute("aria-roledescription","carousel");box.setAttribute("aria-label","Highlights");
    var tr=document.createElement("div");tr.className="x2p-hlt";tr.tabIndex=0;cards.forEach(function(w){tr.appendChild(w)});
    var dots=document.createElement("div");dots.className="x2p-hld";cards.forEach(function(w,i){var d=document.createElement("button");d.type="button";d.setAttribute("aria-label","Highlight "+(i+1)+" of "+cards.length);d.addEventListener("click",function(){go(i)});dots.appendChild(d)});
    box.appendChild(tr);box.appendChild(dots);ul.setAttribute("data-x2p","1");ul.hidden=true;ul.parentNode.insertBefore(box,ul.nextSibling);
    [].forEach.call(box.querySelectorAll(".face"),function(f){if(f.querySelector(".x2p-foil")){if(FRO)FRO.observe(f);else foilFit(f)}});
    var cur=0,vis=false,reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
    /* a card's place in the track's scroll (its offsetLeft counts from the page, which is the track's start only on phones: on
       desktop the track starts 340px in, so the carousel landed on the wrong card; fixed 2026-10-24) */
    function ox(w){return w.getBoundingClientRect().left-tr.getBoundingClientRect().left-tr.clientLeft+tr.scrollLeft}
    function topc(w){return w.querySelector(":scope>.card.x2p-s0")||w.querySelector(".card")}
    function near(){var mid=tr.scrollLeft+tr.clientWidth/2,b=0,bd=1e9;cards.forEach(function(w,i){var d=Math.abs(ox(w)+w.offsetWidth/2-mid);if(d<bd){bd=d;b=i}});return b}
    function mark(){[].forEach.call(dots.children,function(d,i){d.classList.toggle("on",i===cur);d.setAttribute("aria-current",i===cur?"true":"false")});cards.forEach(function(w,i){w.classList.toggle("on",i===cur)})}
    /* one sound switch for the whole page: the page keeps it to itself but marks every .snd (these copies too) with data-on */
    function pageSound(){var b=document.querySelector("#record .snd");return !!(b&&b.dataset.on==="1")}
    document.addEventListener("pointerdown",function(){setTimeout(films,400)},{passive:true,capture:true});
    window.__x2pHlFilms=function(){films()};
    function films(){cards.forEach(function(w,i){var c=topc(w),v=c&&c.querySelector("video");[].forEach.call(w.querySelectorAll("video"),function(x){if(x!==v&&!x.paused)x.pause()});if(!v)return;
      if(i===cur&&vis&&!reduce&&!c.classList.contains("flipped")){v.muted=!pageSound();v.preload="auto";var p=v.play();if(p&&p.then)p.then(function(){v.classList.add("on")}).catch(function(){})}else if(!v.paused)v.pause()})}
    function go(i){i=Math.max(0,Math.min(cards.length-1,i));var w=cards[i];tr.scrollTo({left:ox(w)+w.offsetWidth/2-tr.clientWidth/2,behavior:reduce?"auto":"smooth"})}
    var raf=0;tr.addEventListener("scroll",function(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;var n=near();if(n!==cur){var oc=cards[cur]&&cards[cur].querySelector(".card");if(oc&&oc.classList.contains("flipped")&&!oc.classList.contains("nofilm")){oc.classList.remove("flipped");setFaces2(oc,false)}cur=n;mark();films()}})},{passive:true});
    tr.addEventListener("keydown",function(e){if(e.key==="ArrowLeft"){e.preventDefault();go(cur-1)}else if(e.key==="ArrowRight"){e.preventDefault();go(cur+1)}});
    tr.addEventListener("click",function(e){var w=e.target.closest(".x2p-hi");if(!w)return;var i=cards.indexOf(w),c=topc(w);
      var sb=e.target.closest(".shr");if(sb){e.preventDefault();e.stopPropagation();if(typeof window.shareRound==="function")window.shareRound(sb);return}
      var sd=e.target.closest(".snd");if(sd){e.preventDefault();e.stopPropagation();var rs=document.querySelector("#record .snd");if(rs)rs.click();setTimeout(films,60);return}
      if(e.target.closest("a"))return;e.preventDefault();if(i!==cur){go(i);return}
      if(c.classList.contains("nofilm"))return;var f=!c.classList.contains("flipped");c.classList.toggle("flipped",f);setFaces2(c,f);films()});
    if("IntersectionObserver" in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting;films()},{threshold:.3}).observe(tr);
    /* every card one height: the record card's (owner, 2026-10-23: the record's trading-card shape), else the tallest; then the story
       side's paragraph steps down half a pixel at a time (never below 10px) until it fits */
    function eqH(){var cs=[];cards.forEach(function(w){[].forEach.call(w.querySelectorAll(":scope>.card"),function(c){cs.push(c)})});cs.forEach(function(c){c.style.height=""});var m=0;cs.forEach(function(c){m=Math.max(m,c.offsetHeight)});
      var rc=document.querySelector("#record .card"),t=rc&&rc.getBoundingClientRect().height;if(t)m=t;if(m)cs.forEach(function(c){c.style.height=m+"px"});
      cs.forEach(function(c){var hb=c.querySelector(".x2p-hb"),p=hb&&hb.querySelector(".x2p-hw");if(!p)return;
        // the four call chips share one size, stepped down until the widest fits its box (CLAUDE ▼2.5% ✓ on a 360px phone)
        var hc=[].slice.call(hb.querySelectorAll(".x2p-hc"));hc.forEach(function(e){e.style.fontSize=""});var y=hc[0]&&parseFloat(getComputedStyle(hc[0]).fontSize),k=0;
        while(y&&hc.some(function(e){return e.scrollWidth>e.clientWidth+.5})&&y>8.5&&k++<12){y-=.5;hc.forEach(function(e){e.style.fontSize=y+"px"})}
        /* the story must fit the card: the back face may not grow past the card (a longer story pushed it 20 to 90px taller) */
        var fc=c.querySelector(".face.back"),tooTall=function(){return hb.scrollHeight>hb.clientHeight+1||(fc&&fc.getBoundingClientRect().height>c.getBoundingClientRect().height+.5)};
        p.style.fontSize="";var z=parseFloat(getComputedStyle(p).fontSize),n=0;
        while(tooTall()&&z>10&&n++<20){z-=.5;p.style.fontSize=z+"px"}
        /* still too tall at the floor (a long story on a narrow phone): the headline and the deck step down too */
        var h4=hb.querySelector("h4"),dk=hb.querySelector(".x2p-dk");[h4,dk].forEach(function(e){if(e)e.style.fontSize=""});
        if(tooTall()&&h4){var zh=parseFloat(getComputedStyle(h4).fontSize),zd=dk?parseFloat(getComputedStyle(dk).fontSize):0;n=0;
          while(tooTall()&&zh>14&&n++<20){zh-=.5;h4.style.fontSize=zh+"px";if(dk&&zd>10.5){zd-=.25;dk.style.fontSize=zd+"px"}}}})}
    window.addEventListener("load",function(){setTimeout(eqH,120)});
    var eqT,eqW=innerWidth;window.addEventListener("resize",function(){if(innerWidth===eqW)return;eqW=innerWidth;clearTimeout(eqT);eqT=setTimeout(eqH,150)});if(document.fonts&&document.fonts.ready)document.fonts.ready.then(eqH);
    mark();requestAnimationFrame(function(){eqH();tr.scrollLeft=0;cur=near();mark();films()});
    /* (owner, 2026-10-22, two-tab launch) the Overview's highlights land on a chosen card with its story side up; false while
       the carousel is out of view (no width yet), so the caller tries again when the Overview shows */
    window.__x2pHlGo=function(i,back){if(!tr.clientWidth)return false;eqH();var w=cards[Math.max(0,Math.min(cards.length-1,i))];
      tr.scrollLeft=ox(w)+w.offsetWidth/2-tr.clientWidth/2;cur=near();mark();var c=topc(w);
      /* (owner, 2026-10-28: "by default in the MVP section, users should fall on the back of the card, not the video") back: every
         highlight card turned to its certificate, the stacked ones too */
      if(back)cards.forEach(function(sl){[].forEach.call(sl.querySelectorAll(".card"),function(k){if(!k.classList.contains("nofilm")&&!k.classList.contains("flipped")){k.classList.add("flipped");setFaces2(k,true)}})});films();return true}}
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
  /* (speed, 2026-10-23) all the labels step down together: measured, then written, round by round, so the page is laid out once a round
     (at most ten), not once per label and step */
  /* (speed, 2026-10-27) roots: fit only the labels inside these (a card back put in later); each label is fitted on its own measure, so
     the result is the one the whole-page pass gives */
  function nmFit(roots){var L=roots&&roots.length?[].concat.apply([],roots.map(function(r){return [].slice.call(r.querySelectorAll(".fx .zl .nm"))})):document.querySelectorAll("#record .fx .zl .nm, #x2pHl .fx .zl .nm");
    var els=[].filter.call(L,function(el){return el.firstChild&&el.offsetWidth}),st=[];
    els.forEach(function(el){el.style.fontSize=""});
    els.forEach(function(el){var b=el.firstChild;if(b.scrollWidth>b.clientWidth+.5)st.push({el:el,b:b,z:parseFloat(getComputedStyle(el).fontSize)})});
    while(st.length){st=st.filter(function(x){return x.z>10});st.forEach(function(x){x.z-=.5;x.el.style.fontSize=x.z+"px"});st=st.filter(function(x){return x.b.scrollWidth>x.b.clientWidth+.5})}}
  var nmT;function nmLater(){clearTimeout(nmT);nmT=setTimeout(nmFit,120)}nmFit();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){nmFit()});window.__x2pNmFitIn=nmFit;var nmW=innerWidth;window.addEventListener("resize",function(){if(innerWidth===nmW)return;nmW=innerWidth;nmLater()});window.addEventListener("hashchange",nmLater);window.__x2pNmFit=nmLater;
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
      var bk=document.createElement("div");bk.className="x2p-bk x2p-tkb";bk.id="x2pHow";bk.setAttribute("inert","");bk.setAttribute("aria-hidden","true");bk.tabIndex=-1;
      /* (owner, 2026-10-23: the back still had "this old-school design... it needs to have a ticket looking like approach") the board
         turns over to a ticket: the proof ticket's card stock and scallops, the title in the green band in white ink between gold
         stars, the rules printed in ink in a double frame, "#1 makes the call" in gold foil, the ROI line as fine print, a red band */
      var nG=(typeof ROUNDS!=="undefined"?ROUNDS.length:0),ko=function(t,c){return '<span class="bk-ko'+(c?' '+c:'')+'" data-t="'+t+'">'+t+'</span>'};
      bk.innerHTML='<div class="bk-s"><div class="bk-t"><div class="bk-bd g"><h3><em class="bk-st" aria-hidden="true">★</em>'+ko("How we rank")+'<em class="bk-st" aria-hidden="true">★</em></h3></div>'+
        '<div class="bk-in"><p class="x2p-why">Why it matters: <b class="bk-fo" data-t="#1 makes the call">#1 makes the call</b> on the next bet.</p><ol>'+
        /* (owner, 2026-10-26: "just focus on P&L for now, because that's usually whoever everybody wants to follow") ranked by P&L */
        '<li>Ranked by P&amp;L: $100,000 each, the whole balance on every call.</li>'+
        '<li>Buy on up, short on down. No leverage.</li>'+
        '<li>Every call is made before the company reports and graded at the next market close.</li>'+
        '<li>Called fewer than half the rounds? Ranked after the rest.</li>'+
        '<li>The board freezes 24h before each bet.</li></ol>'+
        '<p class="x2p-roi">P&amp;L: simulated, before fees.</p></div>'+
        '<div class="bk-bd r" aria-hidden="true">'+ko("Season 1")+ko("Nº "+String(nG).padStart(6,"0"))+'</div></div></div>';
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
  /* Upcoming as fight night (owner, 2026-10-23: of the round 25 mockups "my favorite one was graded at the close. I also like the
     ticket approach... tonight, Friday night, graded at the close, that gets the competitive element out again"): tonight's rounds
     under one warm light, each an Admit One ticket with its four calls stamped in and the time to the bell; then every round still
     to come as a ticket, day by day, "on the card". Mag 7 stubs in gold foil. Tickets open the round's card, as X2's tiles did. */
  function upTab(v){if(!v||$(".x2p-up",v)||typeof UPCOMING==="undefined")return;var d=document,$$=function(q,r){return [].slice.call((r||d).querySelectorAll(q))};
    var ue=function(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
    /* X2's date helpers live inside routes.js, so the same logic here: m/d/yy dates, a day key, the US close (4pm New York) */
    var D=function(x){var m=String(x||"").match(/(\d+)\/(\d+)\/(\d+)/);return m?new Date(2000+(+m[3]%100),+m[1]-1,+m[2]):null},
      dkey=function(t){return t.getFullYear()+"-"+String(t.getMonth()+1).padStart(2,"0")+"-"+String(t.getDate()).padStart(2,"0")},K=function(x){var t=D(x);return t?dkey(t):"9999"},
      NYF=null;try{NYF=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",hourCycle:"h23",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})}catch(e){}
    var nyParts=function(t){var o={};if(!NYF){var g=new Date(t-4*36e5);return {y:g.getUTCFullYear(),mo:g.getUTCMonth()+1,d:g.getUTCDate(),h:g.getUTCHours(),mi:g.getUTCMinutes(),s:g.getUTCSeconds()}}
        NYF.formatToParts(new Date(t)).forEach(function(q){o[q.type]=+q.value});return {y:o.year,mo:o.month,d:o.day,h:o.hour%24,mi:o.minute,s:o.second}},
      nyOff=function(t){var q=nyParts(t);return (Date.UTC(q.y,q.mo-1,q.d,q.h,q.mi,q.s)-Math.floor(t/1000)*1000)/6e4},
      closeOn=function(t){var g=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),16,0),u=g-nyOff(g)*6e4;return g-nyOff(u)*6e4},
      tkBadge=function(t){if(CO_LOGOS[String(t||"").toUpperCase()])return coMark(t);var x=String(t||"").split(".")[0].slice(0,5);return '<span class="co-mark tkb" aria-hidden="true">'+x+'</span>'};
    var
wd=function(t,o){return t.toLocaleDateString("en-US",o)},m7=function(n){return !!((RMETA[n]||{}).mag7)},ai=function(n){return ((RMETA[n]||{}).themes||[]).indexOf("AI")>-1};
    var big=function(u){return /\d/.test(u.ticker)?u.co:String(u.ticker).replace(/\..*$/,"")},sml=function(u){return /\d/.test(u.ticker)?u.ticker:u.co};
    var call=function(c){var dn=c.dir==="DOWN";return '<span class="'+(dn?'dn':'up')+'"><span class="sr">'+ue(nmM(c.m))+': '+(dn?'down ':'up ')+ue(c.mag)+'%</span><span aria-hidden="true">'+logo(c.m)+'<b>'+(dn?'▼':'▲')+ue(c.mag)+'%</b></span></span>'};
    var stub=function(u){return '<span class="tk-s"><small>No.</small><b>'+u.n+'</b>'+(m7(u.n)?'<em>Mag 7</em>':'')+'</span>'};
    var SH={"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"},
      sec=function(n){var x=((RMETA[n]||{}).sector)||"";return SH[x]||x};
    /* (owner, 2026-10-23: "a lot of space on the side... SK Hynix and then the ticker, so it fills up the space") the company and its ticker
       on one line, as on the slab's label ("SK HYNIX (000660.KS)"); the sector under it; the logo bigger */
    var nmT=function(u){var t=String(u.ticker||""),same=!t||t.replace(/\..*$/,"").toUpperCase()===String(u.co).toUpperCase();
      return '<b><span class="tk-co">'+ue(u.co)+'</span>'+(same?'':'<small class="tk-tk">('+ue(t)+')</small>')+'</b>'};
    /* a ticket: the stub, the company printed on the card; with its calls once they are in */
    var tk=function(u,bigT){var inn=u.calls&&u.calls.length,dt=wd(D(u.called),{month:"short",day:"numeric"});
      return '<li><a class="x2p-tk'+(bigT?' big':'')+(m7(u.n)?' m7':'')+'" href="#/round/'+u.n+'">'+stub(u)+'<span class="tk-b"><span class="tk-m">'+tkBadge(u.ticker)+'<span class="tk-n">'+nmT(u)+'<small>'+
        ue(bigT?(inn?'calls filed '+dt:'calls due '+dt):sec(u.n))+'</small></span></span>'+
        (inn?'<span class="tk-c">'+u.calls.map(call).join("")+'</span>':'')+'</span></a></li>'};
    /* a long name steps down in half pixels until it fits beside its ticker, never below 13px (then it trims) */
    var fitN=function(r){$$(".tk-n>b",r).forEach(function(b){b.style.fontSize="";var co=b.firstChild,z=parseFloat(getComputedStyle(b).fontSize),k=0;
      while(co&&co.scrollWidth>co.clientWidth+.5&&z>13&&k++<24){z-=.5;b.style.fontSize=z+"px"}})};
    /* tonight: the rounds graded at the next close (calls in), else the next day's rounds */
    var P=PENDING.slice().sort(function(a,b){return K(a.resolves).localeCompare(K(b.resolves))||a.n-b.n}),spK=P.length?K(P[0].resolves):null,
      sp=P.filter(function(u){return K(u.resolves)===spK}),rest=P.filter(function(u){return K(u.resolves)!==spK});
    var U=UPCOMING.slice().sort(function(a,b){return K(a.called).localeCompare(K(b.called))||a.n-b.n});
    var calls=!!sp.length;if(!calls&&U.length){spK=K(U[0].called);sp=U.filter(function(u){return K(u.called)===spK});U=U.filter(function(u){return K(u.called)!==spK})}
    var spD=sp.length?D(calls?sp[0].resolves:sp[0].called):null,ny=nyParts(Date.now()),nyK=ny.y+"-"+String(ny.mo).padStart(2,"0")+"-"+String(ny.d).padStart(2,"0");
    var close=spD&&calls?closeOn(spD):0;
    var kick=!spD?"":(spK===nyK&&calls?"Tonight · "+wd(spD,{weekday:"short",month:"short",day:"numeric"}).replace(/,/g,""):(spK===nyK?"Today · ":wd(spD,{weekday:"long"})+" · ")+wd(spD,{month:"short",day:"numeric"}));
    var shut=function(){return close&&Date.now()>=close},left=function(){var ms=close-Date.now();if(ms<=0)return "The bell has rung";var m=Math.ceil(ms/6e4),d=Math.floor(m/1440),h=Math.floor(m%1440/60),mi=m%60;
      return "In "+(d?d+"d "+h+"h":h?h+"h"+(mi?" "+mi+"m":""):mi+"m")},tail=function(){return calls?(!close?" · calls locked · date to come":shut()?" · results soon":" · calls locked"):" · the calls drop before each report"};
    var h1=$("h1",v),root=d.createElement("div");root.className="x2p-up";root.setAttribute("data-x2p-up","");
    root.innerHTML=(sp.length?'<section class="x2p-sp" aria-labelledby="x2pSpH"><p class="sp-k">'+ue(kick)+'</p><h2 id="x2pSpH" class="sp-h">'+(calls?'Graded at the close':'Next on the card')+'</h2>'+
        '<p class="sp-s">'+(calls&&close?'<span class="sp-cd" role="timer">'+left()+'</span> · ':'')+sp.length+' round'+(sp.length>1?'s':'')+'<span class="sp-t">'+tail()+'</span></p>'+
        '<ul class="x2p-tks sp-l">'+sp.map(function(u){return tk(u,true)}).join("")+'</ul></section>':'')+
      '<section class="x2p-ul" aria-labelledby="x2pUlH"><div class="ul-hd"><h2 id="x2pUlH">Coming up</h2><div class="ul-f" role="group" aria-label="Which rounds"></div></div><p class="ul-l">The calls drop before each report. Graded at the next close.</p><div class="ul-d"></div></section>';
    if(h1){h1.classList.add("x2p-sr");root.insertBefore(h1,root.firstChild)}
    v.insertBefore(root,v.firstChild);v.classList.add("x2p-upv");
    /* X2's timeline scrolled to its next day before this replaced it: the tab opens on tonight's card */
    if(/^#\/(upcoming|rounds)\b/.test(location.hash))try{window.scrollTo({top:0,behavior:"instant"})}catch(e){window.scrollTo(0,0)}
    /* the rest of the card, day by day; a filter like X2's (All, Mag 7, AI) */
    var L=rest.map(function(u){return {u:u,k:K(u.resolves)}}).concat(U.map(function(u){return {u:u,k:K(u.called)}})),F="all";
    var ok=function(x){return F==="mag7"?m7(x.u.n):F==="ai"?ai(x.u.n):true};
    $(".ul-f",root).innerHTML=[["all","All"],["mag7","Mag 7"],["ai","AI"]].map(function(f){var n=L.filter(function(x){return f[0]==="mag7"?m7(x.u.n):f[0]==="ai"?ai(x.u.n):true}).length;
      return '<button type="button" data-uf2="'+f[0]+'" aria-pressed="'+(f[0]===F)+'">'+f[1]+' <b>'+n+'</b></button>'}).join("");
    function days(){var by={},ks=[];L.filter(ok).forEach(function(x){if(!by[x.k]){by[x.k]=[];ks.push(x.k)}by[x.k].push(x.u)});ks.sort();
      if(!ks.length)return '<p class="ul-e">Nothing in this filter yet.</p>';
      /* a round with calls in but no grading date yet (2026-10-28, R59 GE Vernova) groups last under "Date to come" (wd(null) threw and
         left the whole list empty) */
      /* (audit, 2026-10-28) a day already gone whose rounds have no calls in the sheet says so, not "6 on the card" */
      return ks.map(function(k){var dd=D(by[k][0].calls&&by[k][0].calls.length?by[k][0].resolves:by[k][0].called),n=by[k].length;
        if(!dd)return '<section class="ul-dy" data-k="'+k+'" aria-label="Date to come"><div class="dy-h"><b>Date to come</b><em></em><small>'+n+' on the card</small></div>'+
          '<ul class="x2p-tks">'+by[k].map(function(u){return tk(u,false)}).join("")+'</ul></section>';
        return '<section class="ul-dy" data-k="'+k+'" aria-label="'+ue(wd(dd,{weekday:"long",month:"long",day:"numeric"}))+'"><div class="dy-h"><b>'+ue(k===nyK?"Today":wd(dd,{weekday:"long"}))+'</b><em>'+ue(wd(dd,{month:"short",day:"numeric"}))+'</em><small>'+(k<nyK&&!(by[k][0].calls&&by[k][0].calls.length)?"Calls not in yet":n+' on the card')+'</small></div>'+
          '<ul class="x2p-tks">'+by[k].map(function(u){return tk(u,false)}).join("")+'</ul></section>'}).join("")}
    $(".ul-d",root).innerHTML=days();fitN(root);
    $(".ul-f",root).addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-uf2]");if(!b||b.dataset.uf2===F)return;F=b.dataset.uf2;
      $$("[data-uf2]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});$(".ul-d",root).innerHTML=days();fitN(root)});
    var lw=innerWidth;addEventListener("resize",function(){if(!root.isConnected||innerWidth===lw)return;lw=innerWidth;fitN(root)});
    if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){if(root.isConnected)fitN(root)});
    /* the time to the bell, once a minute */
    if(close){var cd=$(".sp-cd",root),ct=$(".sp-t",root),iv=setInterval(function(){if(!cd.isConnected){clearInterval(iv);return}cd.textContent=left();ct.textContent=tail()},3e4)}}
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
      if(!window.__x2pHold&&!window.__x2pClassicUp)upTab($("#view"));
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
  /* a shared round (#/round/43) opens on the Upcoming tab with its card up: it gets the fight-night tab too (it showed X2's own list
     under the card, and after it closed). Upcoming is built as soon as the page is parsed, not at "load" (every image), so a visitor
     who arrives there is not kept waiting behind the cover (2026-10-23). */
  function place(){var r=route();if(/^\/round\//.test(r)&&document.documentElement.getAttribute("data-sec")==="upcoming")r="/upcoming";
    var f=PLACE[r];if(!f||mine())return;if(!f()&&tries++<30)setTimeout(place,100)}
  addEventListener("hashchange",function(){tries=0;setTimeout(place,60)});
  if(document.readyState==="complete")place();else{addEventListener("load",place);
    document.addEventListener("DOMContentLoaded",function(){if(/^\/(upcoming|round\/)/.test(route()))place()})}
  setTimeout(place,300);
}catch(e){}})();

/* logos printed into the paper (owner, 2026-10-23: "make it look like the logos are part of the environment and not just slapped
   on... like it's on the back of a paper", wherever a logo sits on paper): on the tickets (standings, the proof, Upcoming) an AI's
   logo loses its app-icon square and its mark is printed in one ink (the icon's dark ground for GPT, Kimi and Grok, Claude's orange;
   Kimi's dot keeps its blue), multiplied into the stock with a slightly rough, uneven ink (#x2pPrint); a company's logo is
   printed the same way, a light logo meant for a dark ground in black ink. Held off production until the owner's go. */
(function(){try{if(window.__x2pHold)return;var d=document;d.documentElement.classList.add("x2p-plogo");
  var lum=function(h){h=String(h||"").replace("#","");if(h.length===3)h=h.replace(/./g,"$&$&");var c=parseInt(h,16);return isNaN(c)?1:(0.2126*(c>>16&255)+0.7152*(c>>8&255)+0.0722*(c&255))/255};
  var INK={};Object.keys(MODELS).forEach(function(k){var M=MODELS[k];INK[M.app]=lum(M.bg)<.5?(lum(M.bg)<.1?"#1b181c":M.bg):M.fg});
  function ink(root){[].forEach.call((root||d).querySelectorAll(".lg[title]"),function(l){var c=INK[l.getAttribute("title")];if(c&&!l.style.getPropertyValue("--lgi"))l.style.setProperty("--lgi",c)})}
  var sv=d.createElementNS("http://www.w3.org/2000/svg","svg");sv.setAttribute("width","0");sv.setAttribute("height","0");sv.setAttribute("aria-hidden","true");sv.style.position="absolute";
  /* ink, not pixels: the edge pushed about by the paper's tooth, the coverage a little uneven */
  sv.innerHTML='<filter id="x2pPrint" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" seed="13" result="n"/>'+
    '<feDisplacementMap in="SourceGraphic" in2="n" scale="0.9" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="2.3" numOctaves="1" seed="21" result="g"/>'+
    '<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.3" result="m"/><feComposite in="d" in2="m" operator="in"/></filter>';
  function go(){d.body.appendChild(sv);ink(d);if(window.MutationObserver)new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(x){if(x.nodeType===1)ink(x)})})}).observe(d.body,{childList:true,subtree:true})}
  if(d.body)go();else d.addEventListener("DOMContentLoaded",go)}catch(e){}})();

/* a round opened over the page is the record's own slab (owner, 2026-10-23: a ticket opened "the old dark X2 card"; "we need to change
   that so it becomes sort of a pre-graded PSA card... so it remains consistent"): when X2 opens a round (routes.js openRound, the
   .rmod layer), its card is swapped for a copy of that round's card from the record, slab and label included ("Calls due", "Graded
   on", or its grade), laid out at the record card's exact size and zoomed to fill the screen. X2's layer stays underneath, hidden,
   so Escape, the address and focus keep working as before; closing goes through its own close button. Held off production. */
(function(){try{if(window.__x2pHold)return;var d=document,still=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,WH=null,cur=null;
  addEventListener("resize",function(){WH=null});
  /* the record card's size; on another tab the Overview is hidden, so it is shown for one measure, off screen and invisible */
  function recSize(){var c=d.querySelector("#record .card[data-n]");if(!c)return null;var r=c.getBoundingClientRect();if(r.width)return {w:r.width,h:r.height};
    var top=d.getElementById("top");if(!top||!top.hidden)return null;var st=top.getAttribute("style");
    top.style.cssText=(st||"")+";position:absolute;left:-300vw;top:0;width:100%;visibility:hidden";top.hidden=false;r=c.getBoundingClientRect();top.hidden=true;
    if(st==null)top.removeAttribute("style");else top.setAttribute("style",st);return r.width?{w:r.width,h:r.height}:null}
  var ON="M12 5.2a4 4 0 0 1 0 5.6M13.9 3.3a6.6 6.6 0 0 1 0 9.4",OFF="M11.5 5.5l4 4M15.5 5.5l-4 4";
  function faces(c,f){var fr=c.querySelector(".face.front"),bk=c.querySelector(".face.back");if(!fr||!bk)return;fr.setAttribute("aria-hidden",f?"true":"false");bk.setAttribute("aria-hidden",f?"false":"true");if("inert" in fr){fr.inert=f;bk.inert=!f}}
  function open(rm){var c0=rm.querySelector(".card[data-n]"),n=c0&&c0.getAttribute("data-n");if(n&&window.__x2pRecFill)window.__x2pRecFill(n);/* its back, if it waits (build.py) */var src=n&&d.querySelector('#record .card[data-n="'+n+'"]');if(!src||!src.querySelector(".fx"))return;
    var sz=WH||(WH=recSize());if(!sz)return;
    var c=src.cloneNode(true);c.classList.remove("flipped");c.classList.add("cur");c.removeAttribute("data-i");c.style.width=sz.w+"px";c.style.height=sz.h+"px";c.style.flex="none";
    /* the certificate on its back is drawn again for the copy (its stamp and ids its own) */
    if(window.__x2pCertCopy)window.__x2pCertCopy(c);
    [].forEach.call(c.querySelectorAll("video"),function(v){v.classList.remove("on")});
    var o=d.createElement("div");o.id="x2pRm";o.className="x2p-rm";o.setAttribute("role","dialog");o.setAttribute("aria-modal","true");o.setAttribute("aria-label",rm.getAttribute("aria-label")||"Round "+n);
    o.innerHTML='<div class="x2p-rmc"><button type="button" class="x2p-rmx" aria-label="Close">✕</button><div class="x2p-rmz"></div></div>';
    var z=o.querySelector(".x2p-rmz"),rc=o.querySelector(".x2p-rmc");z.appendChild(c);
    var k=Math.max(1,Math.min((innerWidth-32)/sz.w,(innerHeight-112)/sz.h,1.6));z.style.zoom=k;rc.style.width=Math.round(sz.w*k)+"px";
    /* X2's own layer stays underneath, hidden, its film stopped */
    rm.classList.add("x2p-rmh");rm.setAttribute("aria-hidden","true");[].forEach.call(rm.querySelectorAll("video"),function(v){try{v.pause()}catch(e){}v.preload="none"});
    d.body.appendChild(o);cur={o:o,rm:rm};
    var nf=c.classList.contains("nofilm")||!c.querySelector(".face.back"),f0=c.classList.contains("nofilm")&&!!c.querySelector(".face.back");if(f0)c.classList.add("flipped");faces(c,f0);if(window.__x2pCertLive)window.__x2pCertLive();
    var v=c.querySelector(".face.front video");
    if(v&&!f0){v.muted=true;v.loop=true;v.preload="auto";v.addEventListener("playing",function(){v.classList.add("on")});var pp=v.play();if(pp&&pp.catch)pp.catch(function(){})}
    o.addEventListener("click",function(e){if(e.target===o||e.target.closest(".x2p-rmx")){var x=rm.querySelector(".rmod-x");if(x)x.click();return}
      var sd=e.target.closest(".snd");if(sd){if(v){v.muted=!v.muted;sd.dataset.on=v.muted?"0":"1";sd.setAttribute("aria-label",v.muted?"Unmute":"Mute");var ps=sd.querySelectorAll("path");if(ps.length>1)ps[ps.length-1].setAttribute("d",v.muted?OFF:ON);if(!v.muted&&v.paused){var q=v.play();if(q&&q.catch)q.catch(function(){})}}return}
      var sb=e.target.closest(".shr");if(sb){var xs=rm.querySelector('.shr[data-share="'+sb.getAttribute("data-share")+'"]')||rm.querySelector(".shr");if(xs)xs.click();return}
      if(e.target.closest("a"))return;
      if(!nf&&e.target.closest(".card")&&c.getAttribute("data-k")==="g"){var f=!c.classList.contains("flipped");c.classList.toggle("flipped",f);faces(c,f);if(window.__x2pCertLive)window.__x2pCertLive();if(v){if(f)v.pause();else{var q2=v.play();if(q2&&q2.catch)q2.catch(function(){})}}
        var fb=c.querySelector((f?".face.back":".face.front")+" [data-flip]");if(fb&&o.contains(d.activeElement))fb.focus({preventScroll:true})}});
    if(!still&&rc.animate){rc.animate([{transform:"translateY(14px) scale(.94)",opacity:0},{transform:"none",opacity:1}],{duration:320,easing:"cubic-bezier(.2,0,0,1)"});o.animate([{opacity:0},{opacity:1}],{duration:220,easing:"ease-out"})}
    o.querySelector(".x2p-rmx").focus({preventScroll:true})}
  function shut(){if(!cur)return;[].forEach.call(cur.o.querySelectorAll("video"),function(v){try{v.pause()}catch(e){}});cur.o.remove();cur=null;if(window.__x2pCertLive)window.__x2pCertLive()}
  function init(){new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(x){if(x.nodeType===1&&x.classList.contains("rmod")){shut();open(x)}});
    [].forEach.call(m.removedNodes,function(x){if(cur&&x===cur.rm)shut()})})}).observe(d.body,{childList:true})}
  if(d.body)init();else d.addEventListener("DOMContentLoaded",init);
  /* keep the focus inside while it is open (X2's close hands focus back to the ticket once its layer is gone: let it) */
  d.addEventListener("focusin",function(e){if(!cur)return;if(!d.body.contains(cur.rm)){shut();return}if(!cur.o.contains(e.target)){var x=cur.o.querySelector(".x2p-rmx");if(x)x.focus({preventScroll:true})}});
}catch(e){window.__x2pRmErr=e}})();

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

/* (2026-10-23, code review) a section off screen holds its looping animations still (skin-x2plus.css, after SPEED): the Overview's
   sections are watched with 200px of warning; a section on a hidden tab counts as off screen */
(function(){try{if(!window.IntersectionObserver)return;var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("x2p-offs",!e.isIntersecting)})},{rootMargin:"200px 0px"});
  function watch(){["#standings","#record","#learn","#highlights","#get"].forEach(function(q){var el=document.querySelector(q);if(el&&!el.hasAttribute("data-x2p-io")){el.setAttribute("data-x2p-io","");io.observe(el)}})}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",watch);else watch();addEventListener("load",watch);setTimeout(watch,2000)}catch(e){}})();
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
  /* (owner, 2026-10-28: "certificate cream plus fine grain... makes the numbers pop out a bit more") every bet-stock ticket's ivory takes
     the record certificate's cream (#f8f0d9, the logo's) and loses its mottle, aged rim, light gradient and faint sunburst; X2+ keeps
     the fine grain, X3+ is flat like the certificate (build.py sets window.__x2pCream="flat" there). The layers stay in their places
     as "none": the strip, the season ticket and the proof read them by position. The bands, holes, rules and toning are unchanged. */
  var CRM=window.__x2pCream||"grain",OFF=function(l){return l.replace(/^(radial-gradient|repeating-conic-gradient|linear-gradient|url)\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\)/,"none")};
  var INK='#141217',PAPER='#f8f0d9',GREEN='#1f7a45',RED='#c8372a';
  /* ---- textures (A's stock): static data-URI svgs, rasterised once ---- */
  var GRAIN=enc("<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='t' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.7' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .30 0 0 0 0 .22 0 0 0 0 .11 1.5 0 0 0 -.79'/></filter><filter id='l' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.7' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 .98 -1.7 0 0 0 .79'/></filter><filter id='s' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='1' seed='19' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .28 0 0 0 0 .2 0 0 0 0 .1 0 7 0 0 -5.05'/></filter><rect width='200' height='200' filter='url(#t)'/><rect width='200' height='200' filter='url(#l)'/><rect width='200' height='200' filter='url(#s)'/></svg>");
  /* paper showing through the solids: fine drop-outs (A) and B's ink voids, a starved patch toward the header's far end, rubbed scuffs */
  var DROP=enc("<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='d' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='2' seed='23' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .96 0 0 0 0 .93 0 0 0 0 .86 0 6 0 0 -4.3'/></filter><rect width='180' height='180' filter='url(#d)'/></svg>");
  var NZ=function(body,w,op){return enc("<svg xmlns='http://www.w3.org/2000/svg' width='"+w+"' height='"+w+"'><filter id='f' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>"+body+"</filter><rect width='100%' height='100%' filter='url(#f)' opacity='"+op+"'/></svg>")};
  var VOID=NZ("<feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' seed='21' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .91  0 0 0 0 .82  14 0 0 0 -10.4'/>",180,.32);
  var VOID2=enc("<svg xmlns='http://www.w3.org/2000/svg' width='220' height='17'><defs><linearGradient id='g'><stop offset='0' stop-color='#fff' stop-opacity='0'/><stop offset='.55' stop-color='#fff' stop-opacity='.25'/><stop offset='1' stop-color='#fff'/></linearGradient><mask id='m'><rect width='100%' height='100%' fill='url(#g)'/></mask></defs><filter id='f' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.55' numOctaves='2' seed='37'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .91  0 0 0 0 .82  12 0 0 0 -8.2'/></filter><rect width='100%' height='100%' filter='url(#f)' mask='url(#m)' opacity='.5'/></svg>");
  var SCUFF=NZ("<feTurbulence type='fractalNoise' baseFrequency='.03 .09' numOctaves='3' seed='5' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .92  0 0 0 0 .84  9 0 0 0 -6.3'/>",360,.2);
  var MOTTLE=enc("<svg xmlns='http://www.w3.org/2000/svg' width='560' height='180'><filter id='m' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.011 .03' numOctaves='3' seed='8'/><feColorMatrix values='0 0 0 0 .55 0 0 0 0 .40 0 0 0 0 .18 .9 0 0 0 -.39'/></filter><rect width='560' height='180' filter='url(#m)'/></svg>");
  /* (owner, 2026-10-28: the green and red bands "look a bit cheap... AI sloppy... they don't look grained... handcrafted") each band is
     printed ink, not a flat fill: the colour with a roller's uneven density (soft darker and lighter drifts, longer across than down),
     a fine dark grain, and specks of the card showing through where the ink missed; one 240px tile, stitched, repeated across */
  var INKB=function(c){return enc("<svg xmlns='http://www.w3.org/2000/svg' width='240' height='40' preserveAspectRatio='none'>"+
    "<filter id='m' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.018 .11' numOctaves='3' seed='14' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.5 0 0 0 -.62'/></filter>"+
    "<filter id='l' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.02 .13' numOctaves='3' seed='31' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 .97  0 0 0 0 .9  1.4 0 0 0 -.66'/></filter>"+
    "<filter id='g' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='2' seed='5' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.4 0 0 0 1.32'/></filter>"+
    "<filter id='v' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' seed='9' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .97  0 0 0 0 .94  0 0 0 0 .85  4.2 0 0 0 -2.7'/></filter>"+
    "<rect width='100%' height='100%' fill='"+c+"'/><rect width='100%' height='100%' filter='url(#m)' opacity='.42'/><rect width='100%' height='100%' filter='url(#l)' opacity='.2'/>"+
    "<rect width='100%' height='100%' filter='url(#g)' opacity='.42'/><rect width='100%' height='100%' filter='url(#v)' opacity='.9'/></svg>")};
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
        OFF('linear-gradient(168deg,rgba(255,255,255,.1),rgba(255,255,255,0) 42%,rgba(110,80,35,.07))'),
        /* B's aged rim: the ivory a shade warmer toward the edges */
        OFF('radial-gradient(140% 120% at 45% 40%,#0000 55%,rgba(130,92,30,.15))'),
        /* B's print: rubbed scuffs and ink voids (paper on paper disappears, so they only show on the solids) */
        SCUFF+' 140px 3px/360px',
        VOID+' 0 0/180px',
        VOID2+' right 14px top 0/220px var(--st) no-repeat',
        /* B's letterpress strips, bled past the die: ink with a darker squeeze edge on the inner side */
        'linear-gradient(#0000 calc(var(--st) - 1.2px),rgba(0,0,0,.22) calc(var(--st) - 1.2px)) 0 0/100% var(--st) no-repeat',
        INKB(GREEN)+' 0 0/240px var(--st) repeat-x',
        'linear-gradient(rgba(0,0,0,.22) 1.2px,#0000 1.2px) 0 100%/100% var(--sb) no-repeat',
        INKB(RED)+' 0 100%/240px var(--sb) repeat-x',
        /* the card under the ink: A's fibres and grain (the solids cover them, as ink covers the sheet) */
        FIB+' 0 0/'+FW+'px '+FH+'px',
        (CRM==='flat'?'none':GRAIN)+' 0 0/200px 200px',
        /* B's pale red sunburst round the name, fading out toward the edges of the body column */
        'none 0 0/var(--b) 100% no-repeat',
        'none 0 0/var(--b) 100% no-repeat',
        'none 0 0/100% 100%',
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
  var im=g.querySelector('img');if(im){im.loading='lazy'}   /* at the foot of the Overview since 2026-10-24: loads when reached */
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
    /* the ⓘ sits on the head, at the top right of its last letter (owner, 2026-10-23: "top right of the S", smaller; it sat higher
       than the head at the far right); capTop() lines the circle's top up with the capitals' top, measured */
    var h2=$(".sh .tx h2",st);if(h2){var hw=d.createElement("div");hw.className="x2p-hdw";h2.parentNode.insertBefore(hw,h2);hw.appendChild(h2);hw.appendChild(o.btn);
      var capTop=function(){var i=$("i",o.btn);if(!i||!h2.offsetHeight)return;o.btn.style.removeProperty("margin-top");var p=d.createElement("span");p.style.cssText="display:inline-block;width:0;height:0;vertical-align:baseline";h2.appendChild(p);
        var base=p.getBoundingClientRect().top;p.remove();var cs=getComputedStyle(h2),cv=d.createElement("canvas").getContext("2d");cv.font=cs.fontWeight+" "+cs.fontSize+" "+cs.fontFamily;
        var cap=base-cv.measureText("S").actualBoundingBoxAscent,top=i.getBoundingClientRect().top;o.btn.style.setProperty("margin-top",(parseFloat(getComputedStyle(o.btn).marginTop)+cap-top).toFixed(2)+"px","important")};
      capTop();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(capTop);addEventListener("load",capTop);var ctW=innerWidth,ctT;addEventListener("resize",function(){if(innerWidth===ctW)return;ctW=innerWidth;clearTimeout(ctT);ctT=setTimeout(capTop,150)})}
    else ($(".sh .tx",st)||$(".sh",st)||st).appendChild(o.btn);
    st.appendChild(o.fl);st.appendChild(o.ft);
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
    /* Round 35 (owner, 2026-10-24; CSS: the FIVE block of skin-x2plus.css). The lab's country printed on each stub under the rank
       ("subtle... integrated"; drawn for its size, never emoji, which Windows shows as two letters): GPT (OpenAI), Claude
       (Anthropic) and Grok (xAI) the United States, Kimi (Moonshot AI) China. Then the No. 5 ticket in place of "As it stands":
       "Next models / in tryouts" in red, centred in its field, on kraft card (owner, round 36), the ticket the others' size, the stub "No. 5" in the red of "No." with only the ? in black under it (owner: the ? stays, "that's where the model logo is going to appear once
       we decide who is going to make it into the league"), the three in tryouts in the owner's order with the flag the owner
       gave each: Qwen (Alibaba, China), Mistral (Mistral AI, the European flag), Gemini (Google, United States). Their marks are
       the labs' own one-colour marks (Simple Icons, CC0, for Gemini; LobeHub's icons, MIT, for Qwen and Mistral), each printed
       in one ink. Naming them on the page is a public promise. */
    if(TIX)(function(){var RED="#b3261c",NAVY="#22356a",YEL="#f0c02c";
      var star=function(cx,cy,r){var q=[];for(var i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r;q.push((cx+rr*Math.cos(a)).toFixed(2)+","+(cy+rr*Math.sin(a)).toFixed(2))}return q.join(" ")};
      var flag=function(cc){var v='<svg class="x2p-fl" viewBox="0 0 16 10" preserveAspectRatio="none" aria-hidden="true" focusable="false">',i;
        if(cc==="US"){for(i=0;i<7;i+=2)v+='<rect y="'+(i*10/7).toFixed(3)+'" width="16" height="'+(10/7).toFixed(3)+'" fill="'+RED+'"/>';v+='<rect width="6.6" height="'+(40/7).toFixed(3)+'" fill="'+NAVY+'"/>';
          [[1.3,1.25],[3.3,1.25],[5.3,1.25],[1.3,3.4],[3.3,3.4],[5.3,3.4]].forEach(function(q){v+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r=".62" fill="#fff"/>'})}
        else if(cc==="CN"){v+='<rect width="16" height="10" fill="'+RED+'"/><polygon points="'+star(3.2,3,2.15)+'" fill="'+YEL+'"/>';[[6.2,1.1],[7.2,2.2],[7.2,3.7],[6.2,4.8]].forEach(function(q){v+='<polygon points="'+star(q[0],q[1],.72)+'" fill="'+YEL+'"/>'})}
        else{v+='<rect width="16" height="10" fill="'+NAVY+'"/>';for(i=0;i<12;i++){var a=i*Math.PI/6;v+='<circle cx="'+(8+3.3*Math.cos(a)).toFixed(2)+'" cy="'+(5+3.3*Math.sin(a)).toFixed(2)+'" r=".55" fill="'+YEL+'"/>'}}
        return v+'</svg>'};
      var NM={US:"United States",CN:"China",EU:"Europe"},LAB={GPT:"US",CLAUDE:"US",GROK:"US",KIMI:"CN"};
      if(!d.getElementById("x2pFlInk")){var fsv=d.createElementNS("http://www.w3.org/2000/svg","svg");fsv.setAttribute("width","0");fsv.setAttribute("height","0");fsv.setAttribute("aria-hidden","true");fsv.style.position="absolute";
        fsv.innerHTML='<filter id="x2pFlInk" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="1" seed="7" result="n"/>'+
          '<feDisplacementMap in="SourceGraphic" in2="n" scale="0.45" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="3" numOctaves="1" seed="19" result="g"/>'+
          '<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.55 1.25" result="m"/><feComposite in="d" in2="m" operator="in"/></filter>'+
          '<linearGradient id="x2pGem" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3f86d8"/><stop offset=".55" stop-color="#8a6fc4"/><stop offset="1" stop-color="#c85f6e"/></linearGradient>';st.appendChild(fsv)}
      /* (owner, 2026-10-27, night) the flag on the model line, as on the tickets of EZ Live X2+'s F2 board, not under the rank; "GPT-" goes
         from "GPT-6 Astra" to make room for it (the name above already says GPT) */
      $$("li.lbr",o.fl).forEach(function(li){var rk=$(".rk",li),h=$(".pc-t h3",li),sm=$(".pc-t small",li);if(!rk||!sm||sm.classList.contains("x2p-mfs"))return;var cc=LAB[(h?h.textContent:"").trim().toUpperCase()]||"US";
        sm.innerHTML='<span>'+sm.textContent.trim().replace(/^GPT-/,"")+'</span><i class="x2p-sfw x2p-mfl" aria-hidden="true">'+flag(cc)+'</i>';sm.classList.add("x2p-mfs");
        if(!$(".sr",rk))rk.insertAdjacentHTML("beforeend",'<span class="sr">'+NM[cc]+'</span>')});
      var ol=$("ol.lbl",o.fl);if(!ol||$("li.x2p-n5",ol))return;
      var C5=[{n:"Qwen",lab:"Alibaba",cc:"CN",c:"#5b4fe0",fr:1,d:"M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z"},{n:"Mistral",lab:"Mistral AI",cc:"EU",c:"#f05a14",fr:1,d:"M3.428 3.4h3.429v3.428h3.429v3.429h-.002 3.431V6.828h3.427V3.4h3.43v13.714H24v3.429H13.714v-3.428h-3.428v-3.429h-3.43v3.428h3.43v3.429H0v-3.429h3.428V3.4zm10.286 13.715h3.428v-3.429h-3.427v3.429z"},{n:"Gemini",lab:"Google",cc:"US",c:"",d:"M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"}];
      var li=d.createElement("li");li.className="x2p-n5";
      li.innerHTML='<span class="n5-st" aria-hidden="true"><i>No. 5</i><b>?</b></span><span class="n5-w" aria-hidden="true"><b>Models<br>in tryouts</b></span>'+
        C5.map(function(m){return '<span class="n5-c" aria-hidden="true"><span class="n5-lg" style="--c:'+(m.c||"#1b181c")+'"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path'+(m.fr?' fill-rule="evenodd"':'')+(m.c?'':' fill="url(#x2pGem)"')+' d="'+m.d+'"/></svg></span><b>'+m.n+'</b><i class="n5-fw">'+flag(m.cc)+'</i></span>'}).join("")+
        '<span class="sr">Number 5 is still open. Models in tryouts: '+C5.map(function(m){return m.n+" ("+m.lab+", "+NM[m.cc]+")"}).join(", ").replace(/, ([^,]+)$/," or $1")+'.</span>';
      ol.appendChild(li)})();
    if(TIX&&!d.getElementById("x2pWorn")){var wsv=d.createElementNS("http://www.w3.org/2000/svg","svg");wsv.setAttribute("width","0");wsv.setAttribute("height","0");wsv.setAttribute("aria-hidden","true");wsv.style.position="absolute";
      wsv.innerHTML='<filter id="x2pWorn" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.9 1.75" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>';st.appendChild(wsv)}
    /* the board as a trading competition (owner, 2026-10-26, SB of ez/tools/concepts/pnl): "Last 5" becomes the record (W-L, like a
       fighter's, the current streak under it), the hit rate is "Accuracy" and takes the ROI's old place, the ROI is the P&L in dollars
       (the % under it) in the last column ("The PNL should be on the right"). Ranked by accuracy as before. */
    if(TIX)(function(){var P=window.__x2pPnl&&window.__x2pPnl();if(!P)return;
      $$(".lbh>span:not(.lb-f)",o.fl).forEach(function(e){if(e.children.length)return;var t=e.textContent.trim(),n={"Last 5":"W-L","ROI":"P&L"}[t];if(n)e.textContent=n});
      $$("li.lbr",o.fl).forEach(function(li){var h=$(".pc-t h3",li),m=(h?h.textContent:"").trim().toUpperCase(),t=P.A[m];if(!t)return;li.classList.add("x2p-pnr");
        var f=$(".x2p-l5 .fq",li);if(f)f.outerHTML='<span class="pn-rec"><span class="sr">Record: '+t.W+' right, '+t.L+' wrong. Streak: '+t.streak.slice(1)+(t.streak[0]==="W"?" right":" wrong")+' in a row. </span>'+
          '<span aria-hidden="true"><b class="w">'+t.W+'</b><i>–</i><b class="l">'+t.L+'</b><small class="'+(t.streak[0]==="W"?"w":"l")+'">'+t.streak+'</small></span></span>';
        var r=$(".lb-c.roi",li);if(r){var b=$("b",r),sm=$("small",r);if(b)b.textContent=P.usd(t.pnl);if(sm)sm.textContent=P.pc(t.pct);r.classList.toggle("pu",t.pnl>=0);r.classList.toggle("pd",t.pnl<0)}});
      /* ranked by P&L (owner, 2026-10-26, later: "the one with the biggest P&L should be at the top"; the P&L leader makes the
         buyback call); an AI that called fewer than half the graded rounds still goes after the rest, as before */
      var ol=$("ol.lbl",o.fl),G=ROUNDS.filter(function(g){return typeof g.a==="number"&&!isNaN(g.a)}).length,n5=ol&&$("li.x2p-n5",ol),
        nm=function(li){var h=$(".pc-t h3",li);return (h?h.textContent:"").trim().toUpperCase()},
        rows=$$("li.lbr",o.fl).filter(function(li){return P.A[nm(li)]}),crown=$(".crown",o.fl);
      rows.sort(function(a,b){var A=P.A[nm(a)],B=P.A[nm(b)],qa=A.W+A.L>=G/2,qb=B.W+B.L>=G/2;return qa!==qb?(qa?-1:1):B.pnl-A.pnl});
      if(ol)rows.forEach(function(li,i){ol.insertBefore(li,n5||null);li.classList.remove("lead","r1","r2","r3","r4");li.classList.add("r"+(i+1));if(!i)li.classList.add("lead");
        var rk=$(".rk",li),tn=rk&&[].filter.call(rk.childNodes,function(x){return x.nodeType===3&&/\d/.test(x.nodeValue)})[0];if(tn)tn.nodeValue=String(i+1)});
      if(crown&&rows[0])rows[0].insertBefore(crown,rows[0].firstChild);st.classList.add("x2p-pnrank")})();
    rec.before(st)}   /* the standings first again, the record second (owner, 2026-10-28: "the leaderboard is number one... the record becomes number two") */
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
      /* (owner, 2026-10-26: the trading competition, PA of ez/tools/concepts/pnl) the money view is "P&L": each AI's biggest win and
         biggest loss on one call, then its P&L (the company names wait for the Leaderboard tab; owner); the line ends print the P&L % */
      roi:{t:"P&L",top:"Would following them have made you money?",bot:"Simulated · before fees",
        /* (owner, 2026-10-23) Start, ROI, Now: the start in short ("$100K"), the ROI with a small + or − in place of the triangle, both
           the same small size; Now the biggest figure; each label centred over its numbers */
        html:function(){var k="$"+Math.round(STK/1000)+"K",PL=window.__x2pPnl&&window.__x2pPnl();if(PL&&MK.every(function(m){return PL.A[m]}))return '<div class="lp pt-3"><div class="pt-hd" aria-hidden="true"><i></i><i></i><i></i><span>Top <i class="pn-w">W</i></span><span>P&amp;L</span><span>Top <i class="pn-l">L</i></span></div>'+
          byRoi.map(function(m,i){var t=PL.A[m],up=t.pnl>=0;return row(i,m,'<span class="pt-v tnum pn-bw"><span class="sr">top win </span>'+PL.usd(t.bw,1)+'</span><span class="pt-v tnum pn-pl '+(up?'pt-u':'pt-d')+'"><span class="sr">P&amp;L </span>'+PL.usd(t.pnl)+'</span>',
            '<span class="pt-c tnum pn-bl"><span class="sr">top loss </span>'+PL.usd(t.bl,1)+'</span>')}).join("")+'</div>'+
          '<div class="pt-fl"><div class="pt-ch lp"></div>'+ax("R1","Start: "+usd(STK))+'</div><p class="pt-cp">'+usd(STK)+' to start. The whole balance on every call. Wins and losses carry over. Buy on up, short on down. No leverage.</p>';
          return '<div class="lp pt-3"><div class="pt-hd" aria-hidden="true"><i></i><i></i><i></i><span>Start</span><span>ROI</span><span>Now</span></div>'+byRoi.map(function(m,i){var b=S[m].bal,up=b>=STK,cl=up?'pt-u':'pt-d',p=Math.abs(b/STK*100-100).toFixed(1)+"%";
          return row(i,m,'<span class="pt-v pt-st tnum"><span class="sr">started with </span>'+k+'</span><span class="pt-v tnum '+cl+'"><span class="sr">ROI '+(up?'up ':'down ')+'</span><span class="pt-pm" aria-hidden="true">'+(up?'+':'−')+'</span>'+p+'</span>','<span class="pt-c tnum '+cl+'"><span class="sr">now </span>'+usd(b)+'</span>')}).join("")+'</div>'+
          '<div class="pt-fl"><div class="pt-ch lp"></div>'+ax("R1","Start: "+usd(STK))+'</div><p class="pt-cp">'+usd(STK)+' to start. The whole balance on every call. Wins and losses carry over. Buy on up, short on down. No leverage.</p>'},
        draw:function(el,h){var vs=[STK];MK.forEach(function(m){S[m].roi.forEach(function(p){vs.push(p[1])})});var lo=Math.min.apply(null,vs),hi=Math.max.apply(null,vs),pd=(hi-lo)*.1||STK*.05;lo-=pd;hi+=pd;
          chart(el,h,byRoi.map(function(m,i){return {m:m,rank:i+1,pts:S[m].roi.map(function(p){return [p[0]/N*100,(hi-p[1])/(hi-lo)*100]})}}),(hi-STK)/(hi-lo)*100,{lead:true,lab:function(m){var PL=window.__x2pPnl&&window.__x2pPnl();return PL&&PL.A[m]?PL.pc(PL.A[m].pct):ver(m)}})}},
      hit:{t:"Accuracy",top:"How often were they right about the direction?",bot:"Up or down only",
        /* (owner, 2026-10-26, later) the rows as a trader's record: trades, W and L (no "25 of 37"); the hit rate moves to where each
           line ends on the chart, as the P&L view prints its P&L % there */
        html:function(){return '<div class="lp pt-3 pn-acc"><div class="pt-hd" aria-hidden="true"><i></i><i></i><i></i><span>Trades</span><span class="pn-w">W</span><span class="pn-l">L</span><span>Accuracy</span></div>'+
          byHit.map(function(m,i){var s=S[m];return row(i,m,'<span class="pt-v tnum pn-tr"><span class="sr">'+Math.round(s.hit*100)+'% right. Trades </span>'+s.n+'</span><span class="pt-v tnum pt-u pn-wv"><span class="sr">won </span>'+s.k+'</span><span class="pt-v tnum pt-d pn-lv"><span class="sr">lost </span>'+(s.n-s.k)+'</span>','<span class="pt-c tnum pn-hv'+(i?'':' pn-hg')+'" aria-hidden="true">'+Math.round(s.hit*100)+'%</span>')}).join("")+'</div>'+
          '<div class="pt-fl"><div class="pt-ch lp"></div>'+ax("Start","Coin flip: 50%")+'</div><p class="pt-cp">Every line starts at 50/50 and moves with each call.</p>'},
        draw:function(el,h){var LO=30,HI=80,y=function(v){return (HI-Math.max(LO,Math.min(HI,v)))/(HI-LO)*100};
          chart(el,h,byHit.map(function(m,i){return {m:m,rank:i+1,pts:S[m].run.map(function(p){return [p[0]/N*100,y(p[1])]})}}),y(50),{left:24,grid:[80,70,60,40,30].map(function(v){return [y(v),v+"%"]})})}},
      /* (owner, 2026-10-26, later: "change the average miss to target hits") no average miss: under each target its bullseyes
         (right way, within 0.1%), its shots within 1% (bullseyes included) and its shots off target (the wrong way, the red dots
         outside); ranked by bullseyes, then within 1%, then fewer off target */
      miss:{t:"Target hits",top:"How close did they get to the real move?",bot:"Closer is better",
        html:function(){var T={};MK.forEach(function(m){var c=S[m].calls;T[m]={b:c.filter(function(x){return x.ok&&x.off<=.1}).length,w:c.filter(function(x){return x.ok&&x.off<=1}).length,o:c.filter(function(x){return !x.ok}).length}});
          var byT=MK.slice().sort(function(a,b){return (T[b].b-T[a].b)||(T[b].w-T[a].w)||(T[a].o-T[b].o)});
          return '<div class="pt-tg lp">'+byT.map(function(m,i){var t=T[m];return '<figure><figcaption style="--c:'+COL[m]+'"><i>'+(i?i+1:fo("1"))+'</i>'+logo(m)+(i?esc(m):fo(m))+'</figcaption>'+target(m,i)+
            '<div class="pt-ts"><span><b class="pt-bu">'+t.b+'</b>Bullseye'+(t.b===1?'':'s')+'</span><span><b class="pt-w1">'+t.w+'</b>Within 1%</span><span><b class="pt-ot">'+t.o+'</b>Off target</span></div></figure>'}).join("")+'</div>'+
          '<p class="pt-cp">The bullseye is what the stock did. One hole per call. Bullseye: within 0.1%. Off target: the wrong way.</p>'}},
      sector:{t:"Sector",top:"Which industries do they call best?",bot:"Small samples · it fills in",
        html:function(){var sec=function(r){return ((typeof RMETA!=="undefined"&&RMETA[r.n])||{}).sector||""},cnt={};ROUNDS.forEach(function(r){var x=sec(r);if(x)cnt[x]=(cnt[x]||0)+1});
          var secs=Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a]});
          var cell=function(m,x){var n=0,ok=0;ROUNDS.forEach(function(r){if(sec(r)!==x)return;var c=callOf(r,m);if(c){n++;if((/^DOWN/.test(c[1])?-1:1)>0===(r.a>0))ok++}});
            if(!n)return '<td class="tnum">–</td>';return '<td class="tnum '+(3*ok>=2*n?'hi':3*ok<=n?'lo':'md')+'">'+ok+'/'+n+'</td>'};
          return '<div class="pt-fl"><table class="pt-sg lp"><colgroup><col style="width:30%">'+byHit.map(function(){return '<col>'}).join("")+'</colgroup><tr><th scope="col">Sector</th>'+byHit.map(function(m){return '<th scope="col">'+logo(m)+esc(m)+'</th>'}).join("")+'</tr>'+
            /* (owner, 2026-10-26: "who's the best in sector") the best right/made in each row gets a small crown, ties share it, a row
               where all tie gets none; the rest are dimmed (PS, crowns only) */
            secs.map(function(x){var cs=byHit.map(function(m){return cell(m,x)}),v=cs.map(function(c){var q=c.match(/>(\d+)\/(\d+)</);return q&&+q[2]?+q[1]/+q[2]:-1}),mx=Math.max.apply(null,v),all=v.every(function(y){return y===mx});
              if(mx>0&&!all)cs=cs.map(function(c,i){return v[i]===mx?c.replace('<td class="','<td class="pn-k ').replace('</td>','<span class="sr"> leads</span></td>'):c});
              return '<tr><th scope="row">'+esc(SH[x]||x)+'<small>'+cnt[x]+' round'+(cnt[x]>1?'s':'')+'</small></th>'+cs.join("")+'</tr>'}).join("")+'</table></div>'+
            '<div class="pt-lgd" aria-hidden="true"><span><i class="hi"></i>2 in 3 or better</span><span><i class="md"></i>In between</span><span><i class="lo"></i>1 in 3 or worse</span></div><p class="pt-cp">Right calls out of calls made, by sector.</p>'}}};
    var ORDER=["roi","hit","miss","sector"],cur="roi";
    /* a chart in real pixels: each line in its colour, ink multiplied into the card; the leader foil-stamped (the NVIDIA recipe: a
       satin gold with grain, a dark wall above, a pale lip below), as thin as the rest; the model where each line ends */
    /* the room on the right is the widest end label's, not a fixed 96px (owner, 2026-10-28: "extend the charts a bit to the right"),
       so the lines run as far right as the names after them allow */
    var cid=0;function chart(el,h,ser,yz,o){var W=el.clientWidth,H=h||el.clientHeight||180,L=o.left||0,pad=6,ih=H-2*pad;el.style.height=H+"px";
      var G=0;el.innerHTML="";ser.forEach(function(s){var t=o.lab?o.lab(s.m):ver(s.m),q=d.createElement("div");q.className="pt-lb";q.style.cssText="visibility:hidden;left:0;top:0";q.innerHTML='<b'+(s.rank===1?' class="pt-fo"':'')+'>'+esc(t)+'</b>';el.appendChild(q);G=Math.max(G,q.getBoundingClientRect().width)});
      G=Math.min(96,Math.max(40,Math.ceil(G)+10));var pw=W-G-L;if(pw<40)return;var axr=el.parentNode&&el.parentNode.querySelector(".pt-ax");if(axr)axr.style.marginRight=G+"px";
      var id="xpt"+(++cid),sx=function(x){return L+x/100*pw},sy=function(y){return pad+y/100*ih},P=function(s){return s.pts.map(function(p,i){return (i?"L":"M")+sx(p[0]).toFixed(1)+","+sy(p[1]).toFixed(1)}).join("")};
      var FL='filterUnits="userSpaceOnUse" x="-10" y="-10" width="'+(W+20)+'" height="'+(H+20)+'"',ln=function(dd,c,w,x){return '<path class="pt-dr" pathLength="1" d="'+dd+'" fill="none" stroke="'+c+'" stroke-width="'+w+'" stroke-linejoin="round" stroke-linecap="round"'+(x||"")+'/>'};
      var defs='<defs><linearGradient id="'+id+'g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="54" y2="20" spreadMethod="reflect"><stop offset="0" stop-color="#f6dc93"/><stop offset=".3" stop-color="#e4b54a"/><stop offset=".52" stop-color="#c99227"/><stop offset=".7" stop-color="#e7bd5b"/><stop offset="1" stop-color="#bf8a22"/></linearGradient>'+
        '<filter id="'+id+'n" '+FL+'><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/><feComponentTransfer in="g" result="h"><feFuncR type="linear" slope=".38" intercept=".7"/><feFuncG type="linear" slope=".38" intercept=".7"/><feFuncB type="linear" slope=".38" intercept=".7"/></feComponentTransfer><feBlend in="SourceGraphic" in2="h" mode="multiply" result="b"/><feComposite in="b" in2="SourceGraphic" operator="in"/></filter>'+
        '<filter id="'+id+'s" '+FL+'><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="1" seed="3" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale=".9" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
      var win=ser.filter(function(s){return s.rank===1})[0],ink=(o.grid||[]).map(function(g){return '<path d="M'+L+','+sy(g[0]).toFixed(1)+'H'+(L+pw)+'" stroke="rgba(20,18,23,.18)" stroke-width=".8"/>'}).join("")+'<path d="M'+L+','+sy(yz).toFixed(1)+'H'+(L+pw)+'" stroke="rgba(20,18,23,.5)" stroke-width="1.1" stroke-dasharray="5 4"/>';
      ser.forEach(function(s){if(s!==win)ink+=ln(P(s),COL[s.m],2,' filter="url(#'+id+'s)" opacity=".92"')});
      /* the leader's line as thin as the rest (owner, 2026-10-23: "because it's golden, it already stands out"; the thick line hid
         what the others were doing): 2px of gold, its wall and lip pulled in to half a pixel so the whole mark is no wider than an ink line */
      var top=ln(P(win),"rgba(255,250,232,.85)",2,' transform="translate(0,.55)"')+ln(P(win),"rgba(70,42,6,.55)",2,' transform="translate(0,-.45)"')+ln(P(win),"url(#"+id+"g)",2,' filter="url(#'+id+'n)"');
      var ends=ser.map(function(s){var p=s.pts[s.pts.length-1];return {s:s,y0:sy(p[1]),y:sy(p[1]),x:sx(p[0])}}).sort(function(a,b){return a.y-b.y});
      for(var i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<19)ends[i].y=ends[i-1].y+19;var ov=ends[ends.length-1].y-(H-9);if(ov>0)ends.forEach(function(e){e.y-=ov});
      /* (owner, 2026-10-23) no logo and no connector line at the line ends: the rows above carry the logos, and each name sits at its
         line's height in the line's colour (moved apart only where two ends would touch) */
      el.innerHTML='<svg class="ink" width="'+W+'" height="'+H+'" aria-hidden="true" focusable="false">'+defs+ink+'</svg><svg width="'+W+'" height="'+H+'" aria-hidden="true" focusable="false">'+defs.replace(/id="/g,'id="t')+top.replace(/url\(#/g,"url(#t")+'</svg>'+
        ends.map(function(e){var w=e.s.rank===1,t=o.lab?o.lab(e.s.m):ver(e.s.m);return '<div class="pt-lb" aria-hidden="true" style="left:'+(L+pw+6)+'px;top:'+e.y.toFixed(1)+'px;--c:'+COL[e.s.m]+'"><b'+(w?' class="pt-fo" data-t="'+esc(t)+'"':'')+'>'+esc(t)+'</b></div>'}).join("")+
        (o.grid||[]).map(function(g){return '<span class="pt-yl" aria-hidden="true" style="top:'+sy(g[0]).toFixed(1)+'px">'+g[1]+'</span>'}).join("")}
    /* target practice: rings every 3% off, the % off in each ring, a crosshair; each call a bullet hole placed by how far off it
       was; a call that missed the direction a red dot outside the target. Printed into the card (owner, 2026-10-24: "just do the
       white and the red... part of the environment. Just like you do with grok", take B of tools/concepts/launch-r33-avgmiss
       ink/press): each band is its own ring of ink (nothing laid on top of another, no outlines), white ink and red ink that let
       the card's grain through, the ticket's rough press (#xptInk); the PROOF block presses them in like GROK (.pt-wi, .pt-ri) */
    function target(m,j){var R=60,C=73,ga=Math.PI*(3-Math.sqrt(5)),holes="",out="";
      S[m].calls.forEach(function(c,i){var a=i*ga;if(c.ok){var r=Math.min(c.off,12)/12*R;holes+='<circle cx="'+(C+r*Math.cos(a)).toFixed(1)+'" cy="'+(C+r*Math.sin(a)).toFixed(1)+'" r="2.6" fill="#1b1613" stroke="rgba(255,250,236,.9)" stroke-width=".8"/>'}
      });   /* (owner, 2026-10-26, later) no red dots outside for the wrong-way calls ("too much noise"): Off target counts them */
      var band=function(r0,r1,col){return r0?'<circle cx="'+C+'" cy="'+C+'" r="'+((r0+r1)/2)+'" fill="none" stroke="'+col+'" stroke-width="'+(r1-r0)+'"/>':'<circle cx="'+C+'" cy="'+C+'" r="'+r1+'" fill="'+col+'"/>'};
      var rings='<g class="pt-wi" opacity=".62">'+band(R/4,R/2,"#fffbf1")+band(3*R/4,R,"#fffbf1")+'</g><g class="pt-ri" opacity=".86" style="mix-blend-mode:multiply">'+band(0,R/4,"#c2261d")+band(R/2,3*R/4,"#c2261d")+'</g>';
      var nums=[[3,1],[6,2],[9,3],[12,4]].map(function(v,i){return '<text x="'+(C+(v[1]-.5)/4*R).toFixed(1)+'" y="'+(C+2)+'" font-size="5.6" font-family="Barlow Condensed,sans-serif" font-weight="700" text-anchor="middle" fill="'+(i%2?"rgba(196,38,30,.95)":"rgba(255,246,232,.95)")+'">'+v[0]+'</text>'}).join("");
      return '<svg viewBox="0 0 146 146" aria-hidden="true" focusable="false"><g filter="url(#xptInk)">'+rings+'<path d="M'+(C-R)+','+C+'H'+(C+R)+'M'+C+','+(C-R)+'V'+(C+R)+'" stroke="rgba(40,16,12,.28)" stroke-width=".5" style="mix-blend-mode:multiply"/>'+nums+'</g>'+out+holes+'</svg>'}
    var tk=d.createElement("div");tk.className="x2p-pt";
    tk.innerHTML='<div class="pt-cd"><div class="pt-bd g"><span class="pt-q"><em class="pt-fo pt-st" data-t="★" aria-hidden="true">★</em><span class="pt-top pt-ko"></span><em class="pt-fo pt-st" data-t="★" aria-hidden="true">★</em></span></div><div class="pt-in">'+
      '<div class="pt-tb" role="group" aria-label="Show the AIs by">'+ORDER.map(function(k){return '<button type="button" data-pt="'+k+'" aria-pressed="'+(k===cur)+'">'+V[k].t+'</button>'}).join("")+'</div><div class="pt-body"></div></div>'+
      '<div class="pt-bd r"><span class="pt-bot pt-ko"></span><span class="pt-ko" data-t="Nº '+no+'">Nº '+no+'</span></div></div>'+
      '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><filter id="xptInk" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="11" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale=".7" xChannelSelector="R" yChannelSelector="G"/></filter></svg>';
    ln.insertBefore(tk,sw);ln.classList.add("x2p-ptk");
    var body=$(".pt-body",tk),inn=$(".pt-in",tk);
    /* put a view in place; natural: at its own height (to measure), else at the ticket's one height, the chart or grid filling it */
    function show(k,natural){var v=V[k],q=$(".pt-q",tk),bt=$(".pt-bot",tk);$(".pt-top",tk).textContent=$(".pt-top",tk).dataset.t=v.top;bt.textContent=bt.dataset.t=v.bot;q.style.fontSize="";
      /* the question and its stars on one line: down in half pixels until it fits, never below 11px */
      var z=parseFloat(getComputedStyle(q).fontSize);while(q.scrollWidth>q.clientWidth+.5&&z>11){z-=.5;q.style.fontSize=z+"px"}body.innerHTML=v.html();
      $$("[data-pt]",tk).forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.pt===k))});
      var ch=$(".pt-ch",body);if(ch&&v.draw)v.draw(ch,natural?180:0);
      var t=$(".pt-sg",body);if(t&&!natural){var fl=t.parentNode,hd=t.rows[0].getBoundingClientRect().height,n=t.rows.length-1,hh=(fl.clientHeight-hd-8)/n;if(hh>0)for(var i=1;i<=n;i++)t.rows[i].style.height=hh.toFixed(1)+"px"}if(k==="roi")plc()}
    var lastW=0;function fit(force){if(!tk.offsetWidth)return;if(!force&&tk.offsetWidth===lastW)return;lastW=tk.offsetWidth;tk.style.removeProperty("--tin");var mx=0;
      ORDER.forEach(function(k){show(k,true);mx=Math.max(mx,inn.getBoundingClientRect().height)});tk.style.setProperty("--tin",Math.ceil(mx)+"px");show(cur,false)}
    /* (owner, 2026-10-27: the P&L label "needs to be above the number") the label sits centred over the widest P&L figure, not flush right */
    function plc(){var w=tk.querySelector(".pt-hd i.pn-w");if(!w)return;var l=w.parentNode.nextElementSibling;if(!l)return;l.style.marginRight="";var mw=0;
      tk.querySelectorAll(".pn-pl").forEach(function(v){mw=Math.max(mw,v.getBoundingClientRect().width)});var lw=l.getBoundingClientRect().width;if(mw&&lw)l.style.marginRight=Math.max(0,(mw-lw)/2).toFixed(2)+"px"}
    /* the motion (owner, 2026-10-23: "like switching folders... very smooth", after the cinematic reference): the open page fades and
       sinks back in 120ms, the new one comes forward in 280ms (Material's shared axis: a quick exit, about 300ms in, standard easing),
       then its lines draw from the start and the rows step in; never with reduced motion */
    var still=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,swT,anT;
    function animate(){if(still)return;tk.classList.remove("pt-anim");void tk.offsetWidth;tk.classList.add("pt-anim");clearTimeout(anT);anT=setTimeout(function(){tk.classList.remove("pt-anim")},1500)}
    function swap(k){$$("[data-pt]",tk).forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.pt===k))});
      if(still){show(k,false);return}body.classList.add("pt-out");clearTimeout(swT);
      swT=setTimeout(function(){show(k,false);body.classList.remove("pt-out");body.classList.add("pt-pre");void body.offsetWidth;animate();body.classList.remove("pt-pre")},120)}
    $(".pt-tb",tk).addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-pt]");if(!b||b.dataset.pt===cur)return;cur=b.dataset.pt;swap(cur)});
    /* the first time the ticket comes into view its lines draw in once */
    if(!still&&window.IntersectionObserver){var seen=new IntersectionObserver(function(es){if(!es.some(function(e){return e.isIntersecting}))return;seen.disconnect();animate();show(cur,false)},{threshold:.35});seen.observe(tk)}
    fit(true);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){fit(true)});addEventListener("load",function(){fit(true)});
    var ptT;addEventListener("resize",function(){clearTimeout(ptT);ptT=setTimeout(function(){fit(false)},150)});addEventListener("hashchange",function(){setTimeout(function(){fit(true)},80)})}
  if(!window.__x2pClassicProof&&sw&&rf)try{x2pProof(ln,sw,rf)}catch(e){window.__x2pPtErr=String(e&&e.stack||e)}
  hold.remove();
  /* 04 highlights: the Results page's first section, built into slabs by hlSlabs, placed after the proof */
  var tp=d.createElement("template");tp.innerHTML=R.vResults();var hs=tp.content.querySelector("section.xsec");
  if(hs&&window.__x2pHlSlabs){var h2=d.createElement("div");h2.hidden=true;d.body.appendChild(h2);h2.appendChild(hs);window.__x2pHlSlabs();
    if($("#x2pHl",hs)){hs.id="highlights";hs.classList.add("sec","x2p-hl-sec");hs.setAttribute("aria-labelledby","x2hlH");
      var sh=d.createElement("div");sh.className="sh";sh.innerHTML='<div class="tx"><span class="no">04</span><span class="eb">Highlights</span><h2 id="x2hlH">Most valuable predictions</h2></div>';
      /* "MVPs" and "(Most valuable predictions)" on one line (owner, 2026-10-25): the brackets step down until the head fits
         its column; if even .45em does not fit (a 320px phone), they wrap at full size as before */
      (function(){var fit=function(){var h=d.querySelector("h2.x2p-mvp"),s=h&&h.querySelector("small");if(!s||!h.clientWidth)return;s.style.fontSize="";h.style.whiteSpace="nowrap";
          var r=d.createRange();r.selectNodeContents(h);var av=h.clientWidth-1,z=1,n=0;while(r.getBoundingClientRect().width>av&&z>.45&&n++<40){z-=.025;s.style.fontSize=z.toFixed(3)+"em"}
          if(r.getBoundingClientRect().width>av){s.style.fontSize="";h.style.whiteSpace=""}},w=0;
        if(d.fonts){d.fonts.ready.then(fit);if(d.fonts.addEventListener)d.fonts.addEventListener("loadingdone",function(){setTimeout(fit,30)})}
        addEventListener("resize",function(){if(innerWidth!==w){w=innerWidth;fit()}});
        if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting)fit()},{rootMargin:"600px 0px"});setTimeout(function(){var h=d.querySelector("h2.x2p-mvp");if(h)io.observe(h)},0)}else fit()})();
      var xh=$(".xsh",hs);if(xh)hs.replaceChild(sh,xh);else hs.insertBefore(sh,hs.firstChild);ln.parentNode.insertBefore(hs,ln.nextSibling)}
    h2.remove()}
  /* bullets under the standings, proof and highlights heads, the record's style (owner, 2026-10-22: "a bit dry"); the
     standings in the owner's words, for visitors who skip the film (no buyback lines for now); the count comes from the sheet;
     the highlights name their three kinds from the cards' own tags */
  var gN=(typeof SHEET!=="undefined"?SHEET:[]).filter(function(r){return r[12]!==""&&r[12]!=null}).length;
  /* (owner, 2026-10-22) one colour each, the same as its card's tag, so the three read as the top three: closest gold, tightest green, biggest red */
  var hk=$$("#x2pHl .x2p-htag").map(function(t){var k=(t.className.match(/x2p-h-(\w)/)||[])[1]||"c";t=(t.getAttribute("data-k")||t.textContent).trim().toLowerCase().replace(/[&<>]/g,"");t=t.replace(/ (w|l)$/,function(x){return x.toUpperCase()});return '<b class="x2p-hk x2p-h-'+k+'">'+t.charAt(0).toUpperCase()+t.slice(1)+'.</b>'}).join(" ");
  /* (owner, 2026-10-22) "predict", not "call each stock" (they don't call every stock); "before" and "after" in gold */
  /* the standings' three rules on the "The rules" strap above the board, with the tickets too (owner, 2026-10-23: "in the same
     format as we have it on the current live site"; they were the tickets' small print under the board for a day) */
  [].concat([["#standings","x2p-stb",['4 AI<span class="x2p-lc">s</span> paper-trade every earnings report.',"$100K account each. Graded at the close.","Top P&amp;L makes the buyback call."],"The rules"]],
  [["#learn","x2p-lrb",["Do not trust the models. Verify the trend.",gN+" rounds graded so far. Judge for yourself."],"The stats"],
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
    ws.forEach(function(w,j){var t=$(".x2p-htag",w);if(t&&/tight/i.test(t.textContent))i=j});if(window.__x2pHlGo(i,true))landed=true}
  /* the standings: rank, logo, name, the last five, hit rate and ROI on each strip's middle by what the eye sees (the ink of
     the letters and digits, not their line boxes; owner: "a freak when it comes to symmetry"), and the last five halfway
     between the longest name and the leftmost hit rate, the same on every row */
  /* the ink's top and bottom above the baseline, from the text itself drawn at 10x and scanned (font metrics alone left it 1 to 2px off) */
 var IK={};function inkOf(cs,txt){var fz=parseFloat(cs.fontSize),key=cs.fontFamily+"|"+cs.fontWeight+"|"+cs.fontStyle+"|"+fz+"|"+txt;if(IK[key])return IK[key];
  var c=d.createElement("canvas"),x=c.getContext("2d"),F=fz*10;c.width=Math.ceil(F*txt.length*.9+40);c.height=Math.ceil(F*2);x.font=cs.fontStyle+" "+cs.fontWeight+" "+F+"px "+cs.fontFamily;x.textBaseline="alphabetic";x.fillText(txt,10,F*1.4);
  var dt=x.getImageData(0,0,c.width,c.height).data,top=-1,bot=-1;for(var y=0;y<c.height;y++){for(var i=0;i<c.width;i++)if(dt[(y*c.width+i)*4+3]>100){if(top<0)top=y;bot=y;break}}
  return IK[key]=top<0?[fz*.72,0]:[(F*1.4-top)/10,(F*1.4-bot-1)/10]}
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
    if(e)st.style.setProperty("--x2p-aiw",Math.ceil(e+16)+"px");n5fit()}
  /* the No. 5 ticket's "Models / in tryouts" (owner, 2026-10-24: "just models in tryouts", centred in its field) at the names'
     size, stepped down half a pixel at a time until its longer line clears the field's line by 4px (never below 9px). Measured by
     the text's own box, not scrollWidth (Safari lets text run into the padding without growing it) */
  function n5fit(){var w=$("#standings li.x2p-n5 .n5-w"),b=w&&$("b",w);if(!b||!w.offsetWidth)return;b.style.fontSize="";
    var cs=getComputedStyle(w),av=w.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)-4,
      tw=function(){var r=d.createRange();r.selectNodeContents(b);return r.getBoundingClientRect().width},z=parseFloat(getComputedStyle(b).fontSize),n=0;
    while(tw()>av&&z>9&&n++<40){z-=.5;b.style.fontSize=z+"px"}}
  /* a late web font (Anton arriving after the first fit) widens the words: fit again whenever a font finishes loading */
  if(d.fonts&&d.fonts.addEventListener)d.fonts.addEventListener("loadingdone",function(){setTimeout(n5fit,30)});
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
  var rt,rtW=innerWidth;addEventListener("resize",function(){if(innerWidth===rtW)return;rtW=innerWidth;clearTimeout(rt);rt=setTimeout(function(){fitRules();tixCols();centre();fitSec()},150)});
}catch(e){}})();

/*BETSEC{*/
/* ---- the explainer film's frame and the bet at the foot of the Overview (owner, 2026-10-24; CSS in the BETSEC block of
   skin-x2plus.css): the fight-night bill in the brand's colours round the film, and section 05 The bet with the NVIDIA ticket and
   the Season 2 ticket. Runs in the same pass as the bet ticket and the launch blocks, so the cover never shows the ticket in its
   old place. A failure is kept in window.__x2pBetErr. ---- */
(function(){var tries=0;function go(){try{
  if(!document.querySelector('.x2p-vt')||!document.querySelector('.x2p-bt')||!document.getElementById('get')){if(tries++<50)setTimeout(go,100);else window.__x2pBetErr='parts missing';return}
  (function(){/* The film's frame: round 30's fight-night bill in the brand's colours, take c3 "bands" (owner, 2026-10-24: "the colors
   should be ours... And the dollar sign EZ should be in our color as well"; "I would go with the green and red bands"). The film is the
   picture, bled to the trimmed sheet, nothing over it; a green band across the top with "How it works" knocked out of the ink (the bare
   card shows through); "$EZ presents" in a gap of bare card left in the green ($ gold foil, E green ink, Z red ink); a red band at the
   foot with the running time knocked out between two gold-foil stars ("Time left" while it plays). The bet ticket leaves the first
   screen (the next block). Idempotent: a second run reuses the layer, the head spans and the foot. */
var D=document,H=D.documentElement,vt=D.querySelector('.x2p-vt');if(!vt)return;
H.classList.add('x2pbill');
var tag=vt.querySelector('.vt-tag'),vs=vt.querySelector('.vt-s'),v=vt.querySelector('video');
/* the sheet: shadow and printed face (aria-hidden, behind the film) */
var bl=vt.querySelector(':scope>.vb-bl');
if(!bl){bl=D.createElement('div');bl.className='vb-bl';bl.setAttribute('aria-hidden','true');bl.innerHTML='<i class="vb-sh"></i><i class="pa"></i>';vt.insertBefore(bl,vt.firstChild)}
/* the foot: the running time between two gold-foil stars (the time element itself moves here; it was already aria-hidden) */
var ft=vt.querySelector(':scope>.vb-ft');
if(!ft){ft=D.createElement('div');ft.className='vb-ft';ft.setAttribute('aria-hidden','true');ft.innerHTML='<b class="st" data-t="★">★</b><span class="t"><em class="tl">Running time</em></span><b class="st" data-t="★">★</b>';vt.appendChild(ft)}
var slot=ft.querySelector('.t');if(vs&&vs.parentNode!==slot)slot.appendChild(vs);
/* the head: its words in one span (data-t feeds the foil layer), and "$EZ presents" stacked small before it, hanging in the margin so the
   head itself stays centred on the bill; the stack is decoration, so the h2 still reads "How it works" */
if(tag&&!tag.querySelector('.vb-lk')){var t='';for(var n=tag.firstChild;n;){var nx=n.nextSibling;if(n.nodeType===3){t+=n.nodeValue;tag.removeChild(n)}n=nx}
  var lk=D.createElement('span'),k=D.createElement('span'),hd=D.createElement('span');lk.className='vb-lk';k.className='vb-k';hd.className='vb-hd';
  k.setAttribute('aria-hidden','true');k.innerHTML='<b class="vb-lg">'+X2P_LOGO+'</b><b class="ez"><i class="s" data-t="$">$</i><i class="e">E</i><i class="z">Z</i></b><b>presents</b>';
  hd.textContent=t.replace(/\s+/g,' ').trim();hd.setAttribute('data-t',hd.textContent);
  lk.appendChild(k);lk.appendChild(hd);tag.insertBefore(lk,tag.firstChild)}
/* "Running time 1:20" before and after; "Time left 0:58" while it counts down */
var full=function(){var d=v&&isFinite(v.duration)&&v.duration?v.duration:80;d=Math.round(d);return Math.floor(d/60)+':'+('0'+d%60).slice(-2)};
var lab=function(){var tl=ft.querySelector('.tl'),s=vs?vs.textContent:'',w=s&&s!==full()?'Time left':'Running time';if(tl.textContent!==w)tl.textContent=w};
if(vs&&!vs.__x2pVb){vs.__x2pVb=1;new MutationObserver(lab).observe(vs,{childList:true,characterData:true,subtree:true});if(v)v.addEventListener('loadedmetadata',lab)}
lab();
})();
  (function(){/* 05 The bet (owner, 2026-10-24: rounds 31 and 32, "a combination of the ticket roll and the fight card", then "season 2
   ticket"): after the highlights, "The first of many", the stakes on a strap, the NVIDIA ticket as it is (the live element itself,
   moved, so its countdown keeps running), and joined to it at a perforation, as on a roll, the Season 2 ticket: the bet ticket's own
   die and stock (bands, double rule, serial No 000002), "Season 2 / ticket" on the stub, its window printed with the coming bets: four
   logos in one ink, one per report day this season (Meta and Tesla reported the same day, Alphabet and Microsoft, Apple and Amazon;
   NVIDIA alone), in the order they reported, "& more" in red ink, then "Q4 2026 earnings / Next earnings season". No months: the owner
   ("if they would read Jan to Feb, they'd think, oh, they'll do nothing else after the NVIDIA earnings"); the calls, the graded cards
   and the X posts go on in between. Stacked on narrow columns, side by side once the column holds two. Get $EZ becomes 06.
   Idempotent. */
var d=document,H=d.documentElement,$=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var bt=$('.x2p-bt'),get=$('#get');
if(!bt||!get)return;
var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
/* the four, in the order they reported this season (ez-data.js: TSLA 10/21, GOOGL 10/27, AAPL 10/28, NVDA 11/17) */
var PICK=['TSLA','GOOGL','AAPL','NVDA'];
var name=function(t){return (typeof TICKERS!=='undefined'&&TICKERS[t])||t};
var sec=$('#x2pSt');
if(!sec){
  sec=d.createElement('section');sec.className='sec x2p-bs s2t-va';sec.id='x2pSt';sec.setAttribute('aria-labelledby','x2pStH');
  sec.innerHTML='<div class="sh"><div class="tx"><span class="no">05</span><span class="eb">The bet</span><h2 id="x2pStH">The first of many</h2></div>'+
    '<div class="x2p-strap"><span class="x2p-bug" aria-hidden="true">The stakes</span><ul class="x2o-ul lede">'+
      /* three lines at most (owner, 2026-10-25): right and wrong share the last line */
      '<li>69% of $EZ creator fees fill the pool.</li>'+
      '<li>The pool gets bet on the top AI\'s call.</li>'+
      '<li><b class="x2p-hk s2t-ok">Right:</b> $EZ buyback. <b class="x2p-hk s2t-ng">Wrong:</b> pool can be wiped out.</li></ul></div></div>'+
    '<div class="bs-clip"><div class="bs-roll"></div></div>'+
    '<p class="sr">'+'Season 2 ticket. Season 2, the next earnings season (Q4 2026 earnings), brings more bets: '+PICK.map(name).join(', ')+' and more.</p>';
  get.parentNode.insertBefore(sec,get);
}
var roll=$('.bs-roll',sec);
if(bt.parentNode!==roll)roll.insertBefore(bt,roll.firstChild);
/* the film's section is the film alone now: it takes its name from the film's own tag (an h2), not a second label */
var fs=$('section.x2o-bet'),tag=fs&&$('.vt-tag',fs);
if(fs&&tag){if(!tag.id)tag.id='x2pVtTag';fs.removeAttribute('aria-label');fs.setAttribute('aria-labelledby',tag.id)}
H.classList.add('x2pst');
/* the Season 2 ticket: the bet ticket's own die line, stock, bands, frame and numbering (its classes) */
if(!$('.bs-tail',roll)){
  var ink=[1,.84,.95,.88,1,.9],dy=[0,.3,-.2,.2,-.3,.1];
  var serial=function(n){return 'N<u>o</u> '+n.split('').map(function(c,i){return '<s style="opacity:'+ink[i]+';top:'+dy[i]+'px">'+c+'</s>'}).join('')};
  var media=typeof MEDIA!=='undefined'?MEDIA:'media/';
  var cells=PICK.map(function(t){var L=(typeof CO_LOGOS!=='undefined'&&CO_LOGOS[t])||null,f=L&&(L.f||L);
    return '<li><span class="s2t-lg'+(L&&L.dark?' dk':'')+'">'+(f?'<img src="'+media+f+'" alt="" loading="lazy" decoding="async">':'')+'</span><b>'+esc(t)+'</b></li>'}).join('')+
    '<li class="s2t-more"><span class="s2t-lg s2t-amp">&amp;</span><b>More</b></li>';
  var stub=
    '<div class="s2t-lab"><b class="s2t-in">Season 2</b><b class="s2t-in s2t-rd">ticket</b></div><div class="bt-mk"><i></i><i></i><i></i></div>';
  var tail=d.createElement('div');tail.className='bs-tail';tail.setAttribute('aria-hidden','true');
  tail.innerHTML='<div class="bs-nx s2t"><div class="bt-sh"><i></i></div><div class="bt-hs"></div><div class="bt-p">'+
    '<div class="bt-pp"><i class="bt-pl"></i><i class="bt-r1"></i><i class="bt-r2"></i></div>'+
    '<div class="bt-b">'+stub+'</div>'+
    '<div class="bt-s"><div class="s2t-win"><ul class="s2t-row">'+cells+'</ul><span class="s2t-tba"><b>Q4 2026 earnings</b><b>Next earnings season</b></span></div></div>'+
    '<div class="bt-st bt-hd"><span class="l"><i></i>$EZ main event<i></i></span><span class="r">Season 2</span></div>'+
    '<div class="bt-st bt-ft"><span class="l">Admit one</span><span class="r e"><span class="bt-no">'+serial('000002')+'</span></span></div>'+
    '<i class="bs-perf"></i></div></div>';
  /* the inks: a logo in one ink (a logo made for a light ground: its white stays paper; one made for a dark ground: all of it
     ink), and the press's slight unevenness (the PRINTLOGO block's #x2pPrint, copied so this works on its own) */
  var sv=d.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('width','0');sv.setAttribute('height','0');sv.setAttribute('focusable','false');sv.style.cssText='position:absolute;width:0;height:0';
  sv.innerHTML='<filter id="s2tInkL" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">'+
      '<feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.063 -3.576 -0.361 5 0" result="a"/>'+
      '<feComposite in="a" in2="SourceAlpha" operator="in" result="m"/><feFlood flood-color="#1b181c" flood-opacity=".94"/><feComposite in2="m" operator="in"/></filter>'+
    '<filter id="s2tInkD" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feFlood flood-color="#1b181c" flood-opacity=".94"/><feComposite in2="SourceAlpha" operator="in"/></filter>'+
    '<filter id="s2tPrint" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" seed="13" result="n"/>'+
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="0.9" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="2.3" numOctaves="1" seed="21" result="g"/>'+
      '<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.3" result="m"/><feComposite in="d" in2="m" operator="in"/></filter>';
  tail.appendChild(sv);
  roll.appendChild(tail);
}
/* numbers: Get $EZ follows as 06. X2's order routine (patched by build.py to include this section) re-runs on every return to the
   Overview; this is its safety net */
var fix=function(){var g=$('#get'),s=$('#x2pSt');if(!g||!s)return;if(s.nextElementSibling!==g)g.parentNode.insertBefore(s,g);var k=0;['#standings','#record','#learn','#highlights','#x2pSt','#get'].forEach(function(q){var e=$(q);if(!e||e.hidden)return;k++;var n=$('.sh .no',e);if(n)n.textContent=(k<10?'0':'')+k})};
fix();
/* each logo at the same optical size: its ink measured from the file itself (the white of a logo made for a light ground is
   paper, not ink), scaled so every mark carries about the same weight, and centred on its ink, not on its file's box
   (the fight card's fitLogo) */
var fitLogo=function(img){var box=img.parentNode;if(!img.naturalWidth||!box||!box.offsetWidth)return;
  var W=box.clientWidth,Hh=box.clientHeight,nw=img.naturalWidth,nh=img.naturalHeight,dk=box.classList.contains('dk');
  var m=img.__s2Ink;if(!m){try{var c=d.createElement('canvas');c.width=nw;c.height=nh;var x=c.getContext('2d');x.drawImage(img,0,0);var px=x.getImageData(0,0,nw,nh).data,x0=nw,y0=nh,x1=-1,y1=-1,sum=0;
      for(var y=0;y<nh;y++)for(var i=0;i<nw;i++){var o=(y*nw+i)*4,a=px[o+3]/255,l=(.2126*px[o]+.7152*px[o+1]+.0722*px[o+2])/255,k=dk?a:a*Math.max(0,Math.min(1,5*(1-l)));
        if(k>.25){if(i<x0)x0=i;if(i>x1)x1=i;if(y<y0)y0=y;if(y>y1)y1=y}sum+=k}
      m=img.__s2Ink=x1<0?null:{x0:x0,y0:y0,w:x1-x0+1,h:y1-y0+1,c:sum/((x1-x0+1)*(y1-y0+1))}}catch(e){m=null}}
  if(!m){img.style.cssText='';return}
  var s=Math.min(W/m.w,Hh/m.h,Math.sqrt(W*Hh*.42/(m.w*m.h*Math.sqrt(m.c))));
  img.style.cssText='position:absolute;max-width:none;width:'+(nw*s).toFixed(2)+'px;height:'+(nh*s).toFixed(2)+'px;left:'+(W/2-(m.x0+m.w/2)*s).toFixed(2)+'px;top:'+(Hh/2-(m.y0+m.h/2)*s).toFixed(2)+'px'};
var fitLogos=function(){$$('#x2pSt .s2t-lg img').forEach(function(im){if(im.complete&&im.naturalWidth)fitLogo(im);else if(!im.__s2L){im.__s2L=1;im.addEventListener('load',function(){fitLogo(im)})}})};
/* a strap's lines one line each (the standings strap's rule): all step down together, half a pixel at a time, until none
   wraps; too narrow even at 12px (a 320px phone): the full size, wrapped. This section's strap and the proof's ("The stats";
   owner, 2026-10-24: "it always needs to be one line") */
var fitLines=function(sel,mn){mn=mn||12;var ls=$$(sel+' .x2p-strap li');if(!ls.length||!ls[0].offsetWidth)return;ls.forEach(function(l){l.style.fontSize=''});
  var nl=function(l){var g=d.createRange();g.selectNodeContents(l);var t=[];[].forEach.call(g.getClientRects(),function(r){if(r.width&&!t.some(function(q){return Math.abs(q-r.top)<4}))t.push(r.top)});return t.length};
  var z=parseFloat(getComputedStyle(ls[0]).fontSize),n=0;
  while(ls.some(function(l){return nl(l)>1})&&z>mn&&n++<40){z-=.5;ls.forEach(function(l){l.style.fontSize=z+'px'})}
  if(ls.some(function(l){return nl(l)>1}))ls.forEach(function(l){l.style.fontSize=''})};
/* the fitting measures the page (a full layout each time), so it waits until the section is about a screen away: on arrival the
   section is far below the first screen and the cover would wait for it */
var lrn=$('#learn'),near=!window.IntersectionObserver,nearL=near,all=function(){fix();if(near){fitLines('#x2pSt',11);fitLogos()}if(nearL){fitLines('#learn');fitLines('#highlights',11)}fitLines('#record',11)};   /* (audit, 2026-10-28) Receipts and Replays wrapped at 320 and 360 px: every strap one line */
if(!near&&!sec.__x2pIo){sec.__x2pIo=1;var io=new IntersectionObserver(function(es){if(!es.some(function(e){return e.isIntersecting}))return;io.disconnect();near=true;all()},{rootMargin:'900px 0px'});io.observe(sec)}
if(!nearL&&lrn&&!lrn.__x2pIo){lrn.__x2pIo=1;var io2=new IntersectionObserver(function(es){if(!es.some(function(e){return e.isIntersecting}))return;io2.disconnect();nearL=true;fitLines('#learn');fitLines('#highlights',11)},{rootMargin:'900px 0px'});io2.observe(lrn)}
all();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(all);
if(!window.__x2pBs){window.__x2pBs=1;var ft,lw=innerWidth;addEventListener('resize',function(){if(innerWidth===lw)return;lw=innerWidth;clearTimeout(ft);ft=setTimeout(all,120)});addEventListener('load',all);
  addEventListener('hashchange',function(){setTimeout(all,0)})}

})();
}catch(e){window.__x2pBetErr=String(e&&e.stack||e)}}go()})();
/*}BETSEC*/

/* The top left (owner, 2026-10-26: "a little bigger", option B of ez/x2p-header-logo-*.png; "the E from Earnings Zeason... has to be green
   and the Z has to be red. And remove Zeason one"): the EZ. logo (the X avatar, traced: ez/tools/concepts/ez-logo-traced.svg) in place
   of the $EZ mark, 46px; the name one line, its E and Z in the $EZ mark's own green and red (--mark-e, --mark-z); the BRAND block of
   skin-x2plus.css. The link's aria-label still names the site. */
(function(){try{var d=document;function go(){var b=d.querySelector(".brand");if(!b||b.querySelector(".x2p-lg"))return;
  var m=b.querySelector(".mark"),t=b.querySelector("b");
  if(m){m.className="mark x2p-lg";m.innerHTML=X2P_LOGO}
  if(t)t.innerHTML='<span class="x2p-be">E</span>arnings <span class="x2p-bz">Z</span>eason'}
  if(d.body)go();else d.addEventListener("DOMContentLoaded",go)}catch(e){}})();

/* the certificate's inks for the standings and the proof (owner, 2026-10-26, the LIGHTINK block of skin-x2plus.css): the filters exist
   from the start, not only once a certificate has been drawn */
(function(){try{function go(){if(window.__x2pXdefs)window.__x2pXdefs()}if(document.body)go();else document.addEventListener("DOMContentLoaded",go)}catch(e){}})();

/* the headline (owner, 2026-10-27, night: one sentence, two lines at most; "4 AIs trade earnings is the correct one because it's sort of
   the most in line with what we actually do"; mockups ez/x2p-r1028-headlines-2.png, option 3): the two lines step down together in half
   pixels until the wider one fits the column, refitted on fonts and on width changes only */
(function(){try{function go(){var h=document.querySelector(".hero h1");if(!h)return;
  /* (owner, 2026-10-27, later: "I like the M3"; the font "more aligned with our EZ logo"; the highlighted words green and gold with "that
     little edge" of the logo's E) "4 AIs trade earnings / to run our buybacks." in Kanit, the logo's gold square for the full stop */
  /* (owner, 2026-10-28) "trade earnings" in the logo's red, "to run our buybacks" in its green, no gold square for the full stop */
  h.innerHTML='4 AI<span class="x2p-lc">s</span> <span class="rz-eg">trade earnings</span><br><span class="rz-ey">to run our buybacks<span class="sr">.</span></span>';h.classList.add("x2p-h1","rz-h1");
  var lw=0;function fit(){var w=h.clientWidth;if(!w||w===lw)return;lw=w;h.style.removeProperty("font-size");h.style.whiteSpace="nowrap";
    var f=parseFloat(getComputedStyle(h).fontSize);while(h.scrollWidth>h.clientWidth+.5&&f>18){f-=.5;h.style.setProperty("font-size",f+"px","important")}}
  fit();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){lw=0;fit()});
  if(document.fonts&&document.fonts.addEventListener)document.fonts.addEventListener("loadingdone",function(){lw=0;fit()});
  addEventListener("resize",fit)}
 if(document.body)go();else document.addEventListener("DOMContentLoaded",go)}catch(e){}})();

/* R1028 (owner, 2026-10-27, night: "remove the cards, like the sort of ticket style from everywhere... we only need the ticket at the end,
   the first of many... the bet is the ticket"; "push it to EZ Live X2+"): the standings become the timing tower (the terminal's live tag,
   a P&L line under each P&L, the flag on the model line, the tryouts as row "5?") and the proof becomes L2 Speed (the logo's black, Kanit,
   the leader in shiny gold, its line too; Top W / Top L; a red and white target). Mockups: ez/x2p-r1028-*.png. The page's own board and
   proof ticket are still built underneath, out of sight, so nothing that reads them breaks. Numbers: window.__x2pPnl() (the same accounts as
   before), ROUNDS, RMETA; the rules as x2pProof's (the same ranking, the 50/50 start, the sector bands). */
(function(){try{var d=document,TRY=[["Qwen","CN"],["Mistral","EU"],["Gemini","US"]];
 var NM={GPT:"GPT",KIMI:"Kimi",CLAUDE:"Claude",GROK:"Grok"},MC={GPT:"#10a37f",KIMI:"#1e80ff",CLAUDE:"#d97757",GROK:"#f8f0d9"},CC={GPT:"US",CLAUDE:"US",GROK:"US",KIMI:"CN"};
 var SH={"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"};
 function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
 function mark(m,fill,sz){var M=MODELS[m];return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" aria-hidden="true" focusable="false"><path fill="'+fill+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+' d="'+M.d+'"/></svg>'}
 function disc(m,sz){return '<span class="rz-dc" style="width:'+sz+'px;height:'+sz+'px">'+mark(m,MC[m],Math.round(sz*.54))+'</span>'}
 function star(cx,cy,r){var q=[];for(var i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r;q.push((cx+rr*Math.cos(a)).toFixed(2)+","+(cy+rr*Math.sin(a)).toFixed(2))}return q.join(" ")}
 function flag(cc,w){var h=(w*10/16).toFixed(1),v='<svg class="rz-fl" viewBox="0 0 16 10" width="'+w+'" height="'+h+'" preserveAspectRatio="none" role="img" aria-label="'+({US:"United States",CN:"China",EU:"Europe"}[cc])+'">',i,RED="#d0262f",NAVY="#253f8a",YEL="#ffd23a";
  if(cc==="US"){v+='<rect width="16" height="10" fill="#fff"/>';for(i=0;i<7;i+=2)v+='<rect y="'+(i*10/7).toFixed(3)+'" width="16" height="'+(10/7).toFixed(3)+'" fill="'+RED+'"/>';v+='<rect width="6.6" height="'+(40/7).toFixed(3)+'" fill="'+NAVY+'"/>';
   [[1.3,1.25],[3.3,1.25],[5.3,1.25],[1.3,3.4],[3.3,3.4],[5.3,3.4]].forEach(function(q){v+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r=".62" fill="#fff"/>'})}
  else if(cc==="CN"){v+='<rect width="16" height="10" fill="'+RED+'"/><polygon points="'+star(3.2,3,2.15)+'" fill="'+YEL+'"/>';[[6.2,1.1],[7.2,2.2],[7.2,3.7],[6.2,4.8]].forEach(function(q){v+='<polygon points="'+star(q[0],q[1],.72)+'" fill="'+YEL+'"/>'})}
  else{v+='<rect width="16" height="10" fill="'+NAVY+'"/>';for(i=0;i<12;i++){var a=i*Math.PI/6;v+='<circle cx="'+(8+3.3*Math.cos(a)).toFixed(2)+'" cy="'+(5+3.3*Math.sin(a)).toFixed(2)+'" r=".55" fill="'+YEL+'"/>'}}
  return v+'</svg>'}
 function usd(v,k){var s=v<0?"−":"+",a=Math.abs(v);if(k&&a>=1000)return s+"$"+(a/1000).toFixed(1)+"K";return s+"$"+Math.round(a).toLocaleString("en-US")}
 function pc(v){return (v<0?"−":"+")+Math.abs(v).toFixed(1)+"%"}
 function lx(t,c){return '<b class="rz-lx '+(c||'')+'">'+t+'</b>'}
 function data(){var P=window.__x2pPnl(),A=P.A,MK=Object.keys(A),G=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)}),N=G.length,S={};
  function callOf(r,m){return (r.calls||[]).filter(function(c){return c[0]===m})[0]}
  MK.forEach(function(m){var n=0,k=0,off=0,run=[50],bal=100000,b=[bal],calls=[];G.forEach(function(r){var c=callOf(r,m);if(c){var dn=/^DOWN/.test(c[1]),ok=((dn?-1:1)>0)===(r.a>0),o=parseFloat(c[2])||0;n++;if(ok)k++;off+=o;calls.push({ok:ok,off:o,n:r.n});
    run.push((k+1)/(n+2)*100);bal*=1+(dn?-1:1)*r.a/100}else run.push(run[run.length-1]);b.push(bal)});
   S[m]={m:m,n:n,k:k,hit:n?k/n:0,miss:n?off/n:0,run:run,bal:b,calls:calls,bu:calls.filter(function(c){return c.ok&&c.off<=.1}).length,w1:calls.filter(function(c){return c.ok&&c.off<=1}).length,ot:calls.filter(function(c){return !c.ok}).length,
    pnl:A[m].pnl,pct:A[m].pct,bw:A[m].bw,bl:A[m].bl,W:A[m].W,L:A[m].L,ver:A[m].ver}});
  var half=function(m){return S[m].n>=N/2};
  return {A:A,MK:MK,G:G,N:N,S:S,callOf:callOf,
   byP:MK.slice().sort(function(a,b){return half(a)!==half(b)?(half(a)?-1:1):S[b].pnl-S[a].pnl}),
   byH:MK.slice().sort(function(a,b){return half(a)!==half(b)?(half(a)?-1:1):(S[b].hit-S[a].hit)||(S[a].miss-S[b].miss)}),
   byT:MK.slice().sort(function(a,b){return (S[b].bu-S[a].bu)||(S[b].w1-S[a].w1)||(S[a].ot-S[b].ot)})}}
 /* on air: a round's calls are due today or it is graded at today's close (New York), on a weekday */
 function onAir(){try{var p={};new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",year:"2-digit",month:"numeric",day:"numeric",weekday:"short"}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
   if(p.weekday==="Sat"||p.weekday==="Sun")return false;var t=+p.month+"/"+(+p.day)+"/"+p.year,nd=function(s){var q=String(s||"").split("/");return q.length===3?(+q[0])+"/"+(+q[1])+"/"+q[2].slice(-2):""};
   return [].concat(ROUNDS,PENDING,UPCOMING).some(function(r){return nd(r.called)===t||nd(r.resolves)===t})}catch(e){return false}}
 /* ---- the timing tower ---- */
 function tower(D){var G=D.G,S=D.S,lead=D.byP[0],live=onAir();
  function spark(m,w,h){var s=S[m].bal,lo=Math.min.apply(0,s),hi=Math.max.apply(0,s),f=function(v){return (2+(h-4)*(1-(v-lo)/(hi-lo||1))).toFixed(1)},pth=s.map(function(v,i){return (i?'L':'M')+(w*i/(s.length-1)).toFixed(1)+' '+f(v)}).join(' '),c=s[s.length-1]>=100000?'#03c870':'#ff3a31';
   return '<svg viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" aria-hidden="true" focusable="false"><line x1="0" x2="'+w+'" y1="'+f(100000)+'" y2="'+f(100000)+'" stroke="rgba(255,255,255,.18)" stroke-dasharray="2 2"/><path d="'+pth+'" fill="none" stroke="'+c+'" stroke-width="1.3" stroke-linejoin="round"/></svg>'}
  var h='<div class="rz-tw"><div class="rz-hd"><span>Season 1 · Round '+G[G.length-1].n+'</span><span class="rz-live'+(live?'':' off')+'"><i aria-hidden="true"></i>'+(live?'Live':'Off air')+'</span></div>'+
   '<div class="rz-cols" aria-hidden="true"><span>Pos</span><span></span><span>AI</span><span>W-L</span><span>Hit rate</span><span class="rz-plh">P&amp;L</span></div><ol class="rz-rows">'+
   D.byP.map(function(m,i){var s=S[m];return '<li class="rz-r'+(i?'':' rz-1')+'"><span class="rz-pos">'+(i+1)+'</span><span class="rz-bar" style="background:'+(i?(m==="GROK"?"#e9e9ee":MC[m]):"#fdbc2a")+'"></span>'+
    '<span class="rz-ai"><span class="rz-lo">'+mark(m,MC[m],14)+'</span><span class="rz-nmw"><b>'+NM[m]+'</b><small>'+esc(String(s.ver||"").replace(/^GPT-/,""))+flag(CC[m],12)+'</small></span></span>'+
    '<span class="rz-v"><span class="sr">Record </span><span class="up">'+s.W+'</span>-<span class="dn">'+s.L+'</span></span><span class="rz-v"><span class="sr">Hit rate </span>'+Math.round(s.hit*100)+'%</span>'+
    '<span class="rz-pl"><b class="'+(s.pnl<0?'dn':'up')+'"><span class="sr">P&amp;L </span>'+usd(s.pnl)+'</b>'+spark(m,70,16)+'</span></li>'}).join('')+
   '<li class="rz-r rz-5"><span class="rz-pos">5?</span><span class="rz-bar"></span><span class="rz-5t">In tryouts</span><span class="rz-5n">'+TRY.map(function(t){return '<span>'+t[0]+flag(t[1],12)+'</span>'}).join('')+'</span></li></ol>'+
   '<div class="rz-how" hidden><p class="rz-why">Why it matters: <b>#1 makes the call</b> on the next bet.</p><ol><li>Ranked by P&amp;L: $100,000 each, the whole balance on every call.</li><li>Buy on up, short on down. No leverage.</li>'+
   '<li>Every call is made before the company reports and graded at the next market close.</li><li>Called fewer than half the rounds? Ranked after the rest.</li><li>The board freezes 24h before each bet.</li></ol><p class="rz-fine">P&amp;L: simulated, before fees.</p></div></div>';
  return h}
 /* ---- the proof in L2 Speed ---- */
 var GID=0;
 function chart(D,series,lead,o){var MK=D.MK,N=D.N,G=D.G,W=330,H=o.H||170,pad=o.ends?[8,46,16,30]:[8,30,16,2],all=[];MK.forEach(function(m){all=all.concat(series[m])});
  var lo=o.lo!=null?o.lo:Math.floor(Math.min.apply(0,all)/o.step)*o.step,hi=o.hi!=null?o.hi:Math.ceil(Math.max.apply(0,all)/o.step)*o.step;
  var x=function(i){return pad[3]+(W-pad[1]-pad[3])*i/N},y=function(v){return pad[0]+(H-pad[0]-pad[2])*(1-(Math.max(lo,Math.min(hi,v))-lo)/(hi-lo))},g='',T=function(xx,yy,t,a){return '<text x="'+xx+'" y="'+yy+'"'+(a?' text-anchor="'+a+'"':'')+' font-size="8.5" font-style="italic" font-weight="700" fill="rgba(248,240,217,.45)" font-family="Kanit">'+t+'</text>'};
  for(var v=lo;v<=hi+1e-9;v+=o.step){var yv=y(v).toFixed(1);g+='<line x1="'+pad[3]+'" x2="'+(W-pad[1])+'" y1="'+yv+'" y2="'+yv+'" stroke="rgba(248,240,217,'+(v===o.base?.35:.08)+')"'+(v===o.base?' stroke-dasharray="4 4"':'')+'/>'+(o.ends?T(pad[3]-4,(+yv+3).toFixed(1),o.fmt(v),'end'):T(W-pad[1]+4,(+yv+3).toFixed(1),o.fmt(v)))}
  var gid='rzG'+(++GID),ls='<defs><linearGradient id="'+gid+'" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="'+W+'" y2="0"><stop offset="0" stop-color="#b8860b"/><stop offset=".35" stop-color="#fdbc2a"/><stop offset=".6" stop-color="#fff1b8"/><stop offset=".8" stop-color="#fdbc2a"/><stop offset="1" stop-color="#ffe08a"/></linearGradient></defs>';
  MK.filter(function(m){return m!==lead}).concat([lead]).forEach(function(m){var pth=series[m].map(function(v,i){return (i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)}).join(' '),c=m===lead?'url(#'+gid+')':MC[m];
   ls+='<path d="'+pth+'" transform="translate(-5 2)" fill="none" stroke="'+c+'" stroke-opacity=".25" stroke-width="1.4"/><path class="rz-ln'+(m===lead?' ld':'')+'" d="'+pth+'" fill="none" stroke="'+c+'" stroke-width="'+(m===lead?2.6:1.8)+'" stroke-linejoin="round"/>'});
  var en='';if(o.ends){var es=MK.map(function(m){return {m:m,y:y(series[m][N])}}).sort(function(a,b){return a.y-b.y});for(var j=1;j<es.length;j++)if(es[j].y-es[j-1].y<11)es[j].y=es[j-1].y+11;
   es.forEach(function(e){en+='<text x="'+(x(N)+6)+'" y="'+(e.y+3).toFixed(1)+'" font-size="9.5" font-style="italic" font-weight="900" fill="'+(e.m===lead?'#fdbc2a':MC[e.m])+'" font-family="Kanit">'+o.ends(e.m)+'</text>'})}
  return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="display:block" aria-hidden="true" focusable="false">'+g+ls+en+T(pad[3],H-3,o.x0||'R1')+T(W-pad[1],H-3,'R'+G[N-1].n,'end')+'</svg>'}
 var TABS=[["pnl","P&amp;L"],["acc","Accuracy"],["tgt","Target hits"],["sec","Sector"]];
 function proof(D){var S=D.S,MK=D.MK,G=D.G,N=D.N,BAL={},RUN={};MK.forEach(function(m){BAL[m]=S[m].bal;RUN[m]=S[m].run});
  var CO={pnl:{step:20000,base:100000,fmt:function(v){return (v/1000)+'K'},ends:function(m){return pc(S[m].pct)}},acc:{lo:30,hi:80,step:10,base:50,x0:'Start',fmt:function(v){return v+'%'}}};
  function card(k,q,sub,body){return '<div class="rz-pv" data-v="'+k+'" role="tabpanel" aria-label="'+q+'"><p class="rz-q">'+lx(q)+'</p><p class="rz-sm rz-sub">'+sub+'</p>'+body+'</div>'}
  var pnl=card("pnl","Would following them have made you money?","$100K each. All in on every call. No leverage.",'<div class="rz-ch" data-k="pnl">'+chart(D,BAL,D.byP[0],CO.pnl)+'</div>'+
   '<div class="rz-g rz-gp"><span class="rz-cap">#</span><span></span><span class="rz-cap">AI</span><span class="rz-cap c">Top <span class="w">W</span></span><span class="rz-cap c">Top <span class="l">L</span></span><span class="rz-cap c">P&amp;L</span>'+
   D.byP.map(function(m,i){var s=S[m];return '<span class="rz-lx rz-n'+(i?'':' gd')+'">'+(i+1)+'</span>'+disc(m,24)+lx(NM[m],i?'':'gd')+'<span class="rz-sm c up"><span class="sr">Top win </span>'+usd(s.bw,1)+'</span><span class="rz-sm c dn"><span class="sr">Top loss </span>'+usd(s.bl,1)+'</span><span class="c">'+lx('<span class="sr">P&amp;L </span>'+usd(s.pnl),i?(s.pnl<0?'dn':'up'):'gd')+'</span>'}).join('')+'</div>');
  var acc=card("acc","How often were they right about the direction?","Every line starts at 50/50 and moves with each call.",'<div class="rz-ch" data-k="acc">'+chart(D,RUN,D.byH[0],CO.acc)+'</div>'+
   '<div class="rz-g rz-ga"><span class="rz-cap">#</span><span></span><span class="rz-cap">AI</span><span class="rz-cap c">Trades</span><span class="rz-cap c"><span class="w">W</span></span><span class="rz-cap c"><span class="l">L</span></span><span class="rz-cap c">Accuracy</span>'+
   D.byH.map(function(m,i){var s=S[m];return '<span class="rz-lx rz-n'+(i?'':' gd')+'">'+(i+1)+'</span>'+disc(m,24)+lx(NM[m],i?'':'gd')+'<span class="rz-sm c">'+s.n+'</span><span class="rz-sm c up">'+s.k+'</span><span class="rz-sm c dn">'+(s.n-s.k)+'</span><span class="c">'+lx(Math.round(s.hit*100)+'%',i?'':'gd')+'</span>'}).join('')+'</div>');
  function target(m){var R=46,C=50,sc=R/12,h='<svg viewBox="0 0 100 100" width="100%" aria-hidden="true" focusable="false">';
   for(var r=4;r>=1;r--)h+='<circle cx="'+C+'" cy="'+C+'" r="'+(r*3*sc).toFixed(1)+'" fill="'+(r%2?'#ff3a31':'#f8f0d9')+'"/>';
   h+='<circle cx="'+C+'" cy="'+C+'" r="'+(0.6*sc+.6).toFixed(1)+'" fill="#fdbc2a"/><line x1="'+(C-R)+'" x2="'+(C+R)+'" y1="'+C+'" y2="'+C+'" stroke="rgba(4,7,14,.25)" stroke-width=".4"/><line y1="'+(C-R)+'" y2="'+(C+R)+'" x1="'+C+'" x2="'+C+'" stroke="rgba(4,7,14,.25)" stroke-width=".4"/>';
   S[m].calls.forEach(function(c){if(!c.ok)return;var a=((c.n*137.508+m.length*53)%360)*Math.PI/180,dd=Math.min(c.off,12)*sc;h+='<circle cx="'+(C+dd*Math.cos(a)).toFixed(2)+'" cy="'+(C+dd*Math.sin(a)).toFixed(2)+'" r="1.9" fill="#04070e" stroke="#f8f0d9" stroke-width=".7"/>'});
   return h+'</svg>'}
  var tgt=card("tgt","How close did they get to the real move?","The bullseye is what the stock did. One hole per call.",'<div class="rz-tg">'+D.byT.map(function(m,i){var s=S[m];
   return '<figure><figcaption><span class="rz-lx rz-n'+(i?'':' gd')+'">'+(i+1)+'</span>'+lx(NM[m],i?'':'gd')+'</figcaption>'+target(m)+'<div class="rz-ts"><span><b class="gdf">'+s.bu+'</b>Bullseye'+(s.bu===1?'':'s')+'</span><span><b class="up">'+s.w1+'</b>Within 1%</span><span><b class="dn">'+s.ot+'</b>Off target</span></div></figure>'}).join('')+'</div>'+
   '<p class="rz-sm rz-note">Bullseye: within 0.1%. Off target: the wrong way.</p>');
  var secs={};G.forEach(function(r){var x=((RMETA[r.n]||{}).sector)||"";if(!x)return;x=SH[x]||x;(secs[x]=secs[x]||{n:0,r:[]}).n++;secs[x].r.push(r)});
  var order=Object.keys(secs).sort(function(a,b){return secs[b].n-secs[a].n});
  var sec=card("sec","Which industries do they call best?","Right calls out of calls made, by sector.",'<div class="rz-sg"><span class="rz-cap">Sector</span>'+D.byH.map(function(m){return '<span class="rz-sh">'+disc(m,20)+'<span class="rz-cap">'+NM[m]+'</span></span>'}).join('')+
   order.map(function(x){var cells=D.byH.map(function(m){var n=0,k=0;secs[x].r.forEach(function(r){var c=D.callOf(r,m);if(!c)return;n++;if(((/^DOWN/.test(c[1])?-1:1)>0)===(r.a>0))k++});return {n:n,k:k,v:n?k/n:-1}});
    var best=Math.max.apply(0,cells.map(function(c){return c.v})),all=cells.every(function(c){return c.v===best});
    return '<span class="rz-sx">'+lx(esc(x))+'<small>'+secs[x].n+' round'+(secs[x].n===1?'':'s')+'</small></span>'+cells.map(function(c,j){var b=c.v<0?'na':c.v>=2/3?'hi':c.v<=1/3?'lo':'md',top=c.v===best&&!all&&c.v>=0;
     return '<span class="rz-c '+b+(top?' top':(!all?' dim':''))+'"><span class="sr">'+NM[D.byH[j]]+' </span>'+(c.n?c.k+'/'+c.n:'–')+'</span>'}).join('')}).join('')+'</div>'+
   '<div class="rz-lgd rz-sm" aria-hidden="true"><span><i class="hi"></i>2 in 3 or better</span><span><i class="md"></i>In between</span><span><i class="lo"></i>1 in 3 or worse</span></div>');
  return {html:'<div class="rz-pf"><div class="rz-tb" role="group" aria-label="Show the AIs by">'+TABS.map(function(t,i){return '<button type="button" data-v="'+t[0]+'" aria-pressed="'+(i?'false':'true')+'">'+t[1]+'</button>'}).join('')+'</div><div class="rz-pvs">'+pnl+acc+tgt+sec+'</div></div>',
   redraw:function(k,H){var o=Object.assign({},CO[k]);o.H=H;return chart(D,k==='pnl'?BAL:RUN,k==='pnl'?D.byP[0]:D.byH[0],o)}}}
 /* (owner, 2026-10-27, night: "I prefer the design of the one that we currently have on our website... the fonts, all of that")
    the tower and the L2 proof are switched off: the page keeps the live ticket board and proof ticket (the headline above stays) */
 window.__x2pRzOff=true;
 function go(){if(window.__x2pRzOff)return true;var st=d.querySelector("#standings"),fl=st&&st.querySelector(".x2p-flip"),lp=d.querySelector("#learn .x2p-pt");
  if(!fl||!lp||!window.__x2pPnl||typeof MODELS==="undefined")return false;if(d.querySelector(".rz-tw"))return true;var D=data();
  /* standings */
  var tw=d.createElement("div");tw.className="rz-twr";tw.innerHTML=tower(D);fl.parentNode.insertBefore(tw,fl);d.documentElement.classList.add("x2p-rz");
  var rows=tw.querySelector(".rz-rows"),how=tw.querySelector(".rz-how"),btn=st.querySelector(".x2p-flipbtn");
  if(btn)btn.addEventListener("click",function(e){e.stopImmediatePropagation();var on=how.hidden;how.style.minHeight=rows.offsetHeight+"px";how.hidden=!on;rows.hidden=on;
   btn.setAttribute("aria-expanded",on?"true":"false");btn.setAttribute("aria-controls","rzHow");var s=btn.querySelector("span"),ii=btn.querySelector("i");if(s)s.textContent=on?"Back to the board":"How we rank";if(ii)ii.textContent=on?"×":"i"},true);
  how.id="rzHow";
  /* the P&L label over the middle of its figures */
  function plc(){var h=tw.querySelector(".rz-plh");if(!h)return;h.style.paddingRight="";var fw=Math.max.apply(0,[].slice.call(tw.querySelectorAll(".rz-pl b")).map(function(b){return b.getBoundingClientRect().width})),r=d.createRange();r.selectNodeContents(h);
   h.style.paddingRight=Math.max(0,(fw-r.getBoundingClientRect().width)/2).toFixed(2)+"px"}
  /* proof */
  var P=proof(D),pw=d.createElement("div");pw.className="rz-pw";pw.innerHTML=P.html;lp.parentNode.insertBefore(pw,lp);
  var pvs=[].slice.call(pw.querySelectorAll(".rz-pv")),bts=[].slice.call(pw.querySelectorAll(".rz-tb button")),cur="pnl";
  function show(k){cur=k;pvs.forEach(function(p){p.hidden=p.getAttribute("data-v")!==k});bts.forEach(function(b){b.setAttribute("aria-pressed",String(b.getAttribute("data-v")===k))})}
  bts.forEach(function(b){b.addEventListener("click",function(){show(b.getAttribute("data-v"))})});
  /* all four the tallest one's height; the charts grow to fill it */
  var lw=0;function fit(force){var w=pw.offsetWidth;if(!w||(!force&&w===lw))return;lw=w;plc();
   pvs.forEach(function(p){p.hidden=false;p.style.minHeight=""});[].slice.call(pw.querySelectorAll(".rz-ch")).forEach(function(ch){ch.innerHTML=P.redraw(ch.getAttribute("data-k"),170)});
   var mx=Math.max.apply(0,pvs.map(function(p){return p.offsetHeight}));
   [].slice.call(pw.querySelectorAll(".rz-ch")).forEach(function(ch){var p=ch.closest(".rz-pv"),gap=mx-p.offsetHeight;if(gap>2)ch.innerHTML=P.redraw(ch.getAttribute("data-k"),170+gap*330/ch.offsetWidth)});
   pvs.forEach(function(p){p.style.minHeight=mx+"px"});show(cur)}
  fit(true);addEventListener("resize",function(){fit(false)});if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){fit(true)});
  if(d.fonts&&d.fonts.addEventListener)d.fonts.addEventListener("loadingdone",function(){fit(true)});
  return true}
 function tryGo(n){var ok=false;try{ok=go()}catch(e){window.__x2pRzErr=e;return}if(!ok&&n<100)setTimeout(function(){tryGo(n+1)},100)}
 if(d.body)tryGo(0);else d.addEventListener("DOMContentLoaded",function(){tryGo(0)})}catch(e){window.__x2pRzErr=e}})();
/* R1030 (owner, 2026-10-27, night: "F2, tickets spaced like E1, stitched... remove the +42.1%" and "P2... the stitch just under the
   Admit one band, so P&L, Accuracy, Target hits and Sector are under the stitch"): the standings as the board's paper tickets spaced like
   E1 (no lines inside a ticket, one typeface for the figures, the flag on the model line, headers once above), each with its P&L line,
   joined as the bet's two tickets are (punched holes, half-round bites at the edges, a hole where the stub's perforation crosses, the red
   foot band meeting the green head band); the proof on the same ticket stock with the bet's red head band and green foot band, a stitch
   under the one and over the other. Built over R1028's tower and proof (their rows, the ⓘ and the four views stay as they are).
   Mockups: ez/x2p-r1030-*.png (F2, P2). */
(function(){try{var d=document;
 function go(){if(window.__x2pRzOff)return true;var tw=d.querySelector("#standings .rz-tw"),pf=d.querySelector("#learn .rz-pf");if(!tw||!pf||!window.__x2pPnl)return false;if(tw.querySelector(".tq30"))return true;
  var P=window.__x2pPnl(),A=P.A,G=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)});
  var S={};Object.keys(A).forEach(function(m){var b=100000,s=[b];G.forEach(function(r){var c=(r.calls||[]).filter(function(x){return x[0]===m})[0];if(c)b*=1+(/^DOWN/.test(c[1])?-1:1)*r.a/100;s.push(b)});S[m]=s});
  /* marks, flags and order from the tower (ranked by P&L) */
  var R=[].slice.call(tw.querySelectorAll(".rz-r:not(.rz-5)")).map(function(li){var nm=li.querySelector(".rz-nmw b").textContent.trim(),m=nm.toUpperCase(),sm=li.querySelector(".rz-nmw small"),fl=sm.querySelector("svg"),t=A[m];
   return {m:m,nm:nm,ver:sm.textContent.trim(),flag:fl?fl.outerHTML:"",logo:li.querySelector(".rz-lo").innerHTML,W:t.W,L:t.L,hit:Math.round(t.W/(t.W+t.L)*100),pnl:t.pnl,s:S[m]}});
  var TRY=[].slice.call(tw.querySelectorAll(".rz-5n>span")).map(function(s){return s.innerHTML});
  var usd=function(v){return (v>=0?"+$":"−$")+Math.round(Math.abs(v)).toLocaleString("en-US")};
  /* the P&L line: the balance after every graded round, the $100K start dashed; green in profit, red at a loss */
  function spark(s,w,h){var lo=Math.min.apply(0,s.concat([1e5])),hi=Math.max.apply(0,s.concat([1e5])),f=function(v){return (2+(h-4)*(1-(v-lo)/(hi-lo||1))).toFixed(2)},x=function(i){return (w*i/(s.length-1)).toFixed(2)},c=s[s.length-1]>=1e5?"#0f8a4c":"#c8302a",z=f(1e5);
   return '<svg class="qs" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" aria-hidden="true" focusable="false"><line x1="0" x2="'+w+'" y1="'+z+'" y2="'+z+'" stroke="rgba(4,7,14,.35)" stroke-width=".8" stroke-dasharray="2.5 2.5"/>'+
    '<path d="'+s.map(function(v,i){return (i?"L":"M")+x(i)+" "+f(v)}).join(" ")+'" fill="none" stroke="'+c+'" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><circle cx="'+x(s.length-1)+'" cy="'+f(s[s.length-1])+'" r="1.9" fill="'+c+'"/></svg>'}
  var box=d.createElement("div");box.className="f30 tq30";
  box.innerHTML='<div class="tq-cols" aria-hidden="true"><span></span><span>AI</span><span>W-L</span><span>Hit rate</span><span>P&amp;L</span></div><ol class="tq-list">'+
   R.map(function(r,i){return '<li class="tq'+(i?'':' qg')+'"><span class="tq-stub"><small>No.</small><b>'+(i+1)+'</b></span>'+
    '<span class="tq-ai"><span class="tq-lo">'+r.logo+'</span><span class="qn"><b>'+r.nm+'</b><small>'+r.ver+r.flag+'</small></span></span>'+
    '<span class="tq-v"><span class="sr">Record </span><span class="qw">'+r.W+'</span><span class="qd">-</span><span class="ql">'+r.L+'</span></span>'+
    '<span class="tq-v"><span class="sr">Hit rate </span>'+r.hit+'%</span>'+
    '<span class="tq-pl"><b class="'+(r.pnl<0?'dn':'up')+'"><span class="sr">P&amp;L </span>'+usd(r.pnl)+'</b>'+spark(r.s,78,18)+'</span></li>'}).join("")+
   '<li class="tq qk5"><span class="tq-stub"><small>No. 5</small><b>?</b></span><span class="tq-5t">Models<br>in tryouts</span><span class="tq-5n">'+TRY.map(function(t){return '<span>'+t+'</span>'}).join("")+'</span></li></ol>';
  var rows=tw.querySelector(".rz-rows");rows.parentNode.insertBefore(box,rows);d.documentElement.classList.add("x2p-tq");
  var list=box.querySelector(".tq-list");
  /* the bet's join on every join */
  function joins(){[].slice.call(list.querySelectorAll(".qj")).forEach(function(e){e.remove()});var O=list.getBoundingClientRect(),T=[].slice.call(list.querySelectorAll(".tq"));if(!O.width)return;
   function add(c,css){var e=d.createElement("span");e.className="qj "+c;e.setAttribute("aria-hidden","true");e.style.cssText=css;list.appendChild(e)}
   /* the board's own ends carry the bands too (owner, 2026-10-27: green on top, red at the bottom, so #1 and the last ticket sit in the same frame as the rest) */
   var f0=T[0].getBoundingClientRect(),fz=T[T.length-1].getBoundingClientRect();add("qjg","left:"+(f0.left-O.left)+"px;width:"+f0.width+"px;top:"+(f0.top-O.top)+"px");add("qjr","left:"+(fz.left-O.left)+"px;width:"+fz.width+"px;top:"+(fz.bottom-O.top-6)+"px");
   for(var i=1;i<T.length;i++){var a=T[i-1].getBoundingClientRect(),b=T[i].getBoundingClientRect(),y=(a.bottom+b.top)/2-O.top,L=b.left-O.left,W=b.width,sx=T[i].querySelector(".tq-stub").getBoundingClientRect().right-O.left;
    add("qjr","left:"+L+"px;width:"+W+"px;top:"+(y-6)+"px");add("qjg","left:"+L+"px;width:"+W+"px;top:"+y+"px");
    add("qjp","left:"+(L+10)+"px;width:"+(W-20)+"px;top:"+(y-1.9)+"px");add("qjb","left:"+(L-10)+"px;top:"+(y-10)+"px");add("qjb","left:"+(L+W-10)+"px;top:"+(y-10)+"px");add("qjh","left:"+(sx-6)+"px;top:"+(y-6)+"px")}}
  /* each P&L line as wide as its own figure, starting under its first character (owner, 2026-10-27: it ran out to the left) */
  function sparks(){[].slice.call(list.querySelectorAll(".tq-pl")).forEach(function(c,i){var b=c.querySelector("b"),sv=c.querySelector(".qs"),w=b&&b.getBoundingClientRect().width;if(!w||!R[i])return;
   var t=d.createElement("span");t.innerHTML=spark(R[i].s,Math.round(w),18);sv.replaceWith(t.firstChild)})}
  function lay(){sparks();joins()}
  lay();var lw=0;if(window.ResizeObserver)new ResizeObserver(function(){var w=list.offsetWidth;if(w&&w!==lw){lw=w;lay()}}).observe(list);
  if(d.fonts&&d.fonts.ready)d.fonts.ready.then(lay);
  /* "How we rank" (R1028's ⓘ) shows in place of the tickets, at their height */
  var how=tw.querySelector(".rz-how");if(how&&window.MutationObserver)new MutationObserver(function(){if(!how.hidden)how.style.minHeight=box.offsetHeight+"px";box.hidden=!how.hidden;if(how.hidden)lay()}).observe(how,{attributes:true,attributeFilter:["hidden"]});
  /* the proof on the ticket stock: red head band, the stitch right under it, the four views, the stitch, the green foot band */
  var last=G[G.length-1],tb=pf.querySelector(".rz-tb");pf.classList.add("pq","P2");
  pf.insertAdjacentHTML("afterbegin",'<div class="pq-band r" aria-hidden="true"><span>Admit one</span><span>Season 1 · Nº '+("000000"+last.n).slice(-6)+'</span></div><div class="pq-stitch t" aria-hidden="true"></div>');
  pf.insertAdjacentHTML("beforeend",'<div class="pq-stitch b" aria-hidden="true"></div><div class="pq-band g" aria-hidden="true"><span>★ The proof ★</span><span>Graded at the close</span></div>');
  /* Target hits as the earlier paper target (owner, 2026-10-27: "go with T1"): rings in red and white ink with the % off printed in
     each (3, 6, 9, 12), a fine crosshair, and one bullet hole per right-way call on a golden-angle spiral, so no two holes share a spot */
  (function(){var ga=Math.PI*(3-Math.sqrt(5));[].slice.call(pf.querySelectorAll(".rz-tg figure")).forEach(function(f){var c0=f.querySelector("figcaption .rz-lx:not(.rz-n)"),sv=f.querySelector("svg");if(!c0||!sv)return;
   var m=c0.textContent.trim().toUpperCase(),calls=[];G.forEach(function(r){var c=(r.calls||[]).filter(function(x){return x[0]===m})[0];if(c)calls.push({ok:((/^DOWN/.test(c[1])?-1:1)>0)===(r.a>0),off:parseFloat(c[2])||0})});
   var R=60,C=73,band=function(r0,r1,col){return r0?'<circle cx="'+C+'" cy="'+C+'" r="'+((r0+r1)/2)+'" fill="none" stroke="'+col+'" stroke-width="'+(r1-r0)+'"/>':'<circle cx="'+C+'" cy="'+C+'" r="'+r1+'" fill="'+col+'"/>'};
   var h='<svg viewBox="0 0 146 146" width="100%" aria-hidden="true" focusable="false">'+band(0,R/4,"#c2261d")+band(R/4,R/2,"#fffbf1")+band(R/2,3*R/4,"#c2261d")+band(3*R/4,R,"#fffbf1")+
    '<circle cx="'+C+'" cy="'+C+'" r="'+R+'" fill="none" stroke="rgba(40,16,12,.35)" stroke-width=".6"/><path d="M'+(C-R)+','+C+'H'+(C+R)+'M'+C+','+(C-R)+'V'+(C+R)+'" stroke="rgba(40,16,12,.28)" stroke-width=".5"/>'+
    [[3,1],[6,2],[9,3],[12,4]].map(function(v,i){return '<text x="'+(C+(v[1]-.5)/4*R).toFixed(1)+'" y="'+(C+2)+'" font-size="5.6" font-family="Barlow Condensed,sans-serif" font-weight="700" text-anchor="middle" fill="'+(i%2?"rgba(196,38,30,.95)":"rgba(255,246,232,.95)")+'">'+v[0]+'%</text>'}).join("");
   calls.forEach(function(c,i){if(!c.ok)return;var a=i*ga,r=Math.min(c.off,12)/12*R,x=(C+r*Math.cos(a)).toFixed(1),y=(C+r*Math.sin(a)).toFixed(1);
    h+='<circle cx="'+x+'" cy="'+y+'" r="3.1" fill="rgba(255,250,236,.85)"/><circle cx="'+x+'" cy="'+y+'" r="2.3" fill="#1b1613"/><circle cx="'+(x-.6).toFixed(1)+'" cy="'+(y-.6).toFixed(1)+'" r=".7" fill="rgba(255,255,255,.25)"/>'});
   sv.outerHTML=h+'</svg>'})})();
  /* switching views (owner, 2026-10-27: "some type of nice smooth motion"): the new view comes forward from 10px below at 98.5% in 280ms,
     its lines draw from the start in 700ms, then the end labels; the round's earlier folder swap's timings. Not with reduced motion. */
  var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  [].slice.call(pf.querySelectorAll(".rz-tb button")).forEach(function(bn){bn.addEventListener("click",function(){if(rm)return;var v=pf.querySelector('.rz-pv[data-v="'+bn.getAttribute("data-v")+'"]');if(!v||!v.animate)return;
   v.animate([{opacity:0,transform:"translateY(10px) scale(.985)"},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(.2,0,0,1)"});
   [].slice.call(v.querySelectorAll(".rz-ln")).forEach(function(l){var L=l.getTotalLength&&l.getTotalLength();if(!L)return;l.animate([{strokeDasharray:L+" "+L,strokeDashoffset:L},{strokeDasharray:L+" "+L,strokeDashoffset:0}],{duration:700,delay:90,easing:"cubic-bezier(.3,0,.2,1)",fill:"backwards"})});
   [].slice.call(v.querySelectorAll(".rz-ch svg text[fill]:not([fill^='rgba'])")).forEach(function(t){t.animate([{opacity:0},{opacity:1}],{duration:220,delay:700,fill:"backwards"})});
   [].slice.call(v.querySelectorAll(".rz-tg figure, .rz-g > *, .rz-sg > *")).forEach(function(e,j){e.animate([{opacity:0},{opacity:1}],{duration:220,delay:Math.min(j,24)*14,fill:"backwards"})})})});
  return true}
 function tryGo(n){var ok=false;try{ok=go()}catch(e){window.__x2pTqErr=e;return}if(!ok&&n<120)setTimeout(function(){tryGo(n+1)},100)}
 if(d.body)tryGo(0);else d.addEventListener("DOMContentLoaded",function(){tryGo(0)})}catch(e){window.__x2pTqErr=e}})();

/* STITCH (owner, 2026-10-27, night: the board's tickets "tied together", as the bet's two tickets are): the standings tickets touch, and
   every join is the bet's: the red foot band of the upper ticket meeting the green head band of the lower one, a row of punched holes
   along it, a half-round bite out of each edge and a hole where the stub's perforation crosses; the first ticket carries a green head
   band and the last a red foot band, so each sits between the two. Drawn on the list (the tickets' scallop masks would cut half of
   it), redrawn on width changes, fonts and when the board is rebuilt. */
(function(){try{var d=document;
 function draw(ol){[].slice.call(ol.querySelectorAll(":scope>.xs-j")).forEach(function(e){e.remove()});var T=[].slice.call(ol.children).filter(function(e){return e.tagName==="LI"&&e.offsetHeight>20});
  if(T.length<2)return;var O=ol.getBoundingClientRect();if(!O.width)return;
  function add(c,css){var e=d.createElement("span");e.className="xs-j "+c;e.setAttribute("aria-hidden","true");e.style.cssText=css;ol.appendChild(e)}
  var f0=T[0].getBoundingClientRect(),fz=T[T.length-1].getBoundingClientRect();
  /* the Season 1 bar sits on ticket No. 1 with the same join (SEASONBAR below): holes, bites, the crossing hole at the stub's perforation */
  var hb=ol.previousElementSibling;if(hb&&hb.classList.contains("x2p-sb")){var a0=hb.getBoundingClientRect(),y0=(a0.bottom+f0.top)/2-O.top,L0=f0.left-O.left,W0=f0.width,rk0=T[0].querySelector(".rk"),sx0=rk0?rk0.getBoundingClientRect().right-O.left:L0+52;
   add("xs-p","left:"+(L0+10)+"px;width:"+(W0-20)+"px;top:"+(y0-1.9)+"px");add("xs-b","left:"+(L0-10)+"px;top:"+(y0-10)+"px");add("xs-b","left:"+(L0+W0-10)+"px;top:"+(y0-10)+"px");add("xs-h","left:"+(sx0-6)+"px;top:"+(y0-6)+"px")}
  for(var i=1;i<T.length;i++){var a=T[i-1].getBoundingClientRect(),b=T[i].getBoundingClientRect(),y=(a.bottom+b.top)/2-O.top,L=b.left-O.left,W=b.width,rk=T[i].querySelector(".rk"),sx=rk?rk.getBoundingClientRect().right-O.left:L+52;
   add("xs-p","left:"+(L+10)+"px;width:"+(W-20)+"px;top:"+(y-1.9)+"px");add("xs-b","left:"+(L-10)+"px;top:"+(y-10)+"px");add("xs-b","left:"+(L+W-10)+"px;top:"+(y-10)+"px");add("xs-h","left:"+(sx-6)+"px;top:"+(y-6)+"px")}}
 /* (owner, same night: "remove the green and the red... it looks very cheaply done") the joins keep only the holes, the bites and the
    crossing hole, no bands; and the P&L takes its line, as on the F2 tickets: the balance after every graded round, the $100K start
    dashed, green in profit and red at a loss, exactly as wide as the figure above it (the % under the figure goes) */
 var S=null;function series(){if(S)return S;S={};var G=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)});
  ["GPT","KIMI","CLAUDE","GROK"].forEach(function(m){var b=1e5,s=[b];G.forEach(function(r){var c=(r.calls||[]).filter(function(x){return x[0]===m})[0];if(c)b*=1+(/^DOWN/.test(c[1])?-1:1)*r.a/100;s.push(b)});S[m]=s});return S}
 function spark(s,w,h){var lo=Math.min.apply(0,s.concat([1e5])),hi=Math.max.apply(0,s.concat([1e5])),f=function(v){return (1.6+(h-3.2)*(1-(v-lo)/(hi-lo||1))).toFixed(2)},x=function(i){return (w*i/(s.length-1)).toFixed(2)},c=s[s.length-1]>=1e5?"#0f8a4c":"#c8302a",z=f(1e5);
  return '<svg class="xs-sp" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" aria-hidden="true" focusable="false"><line x1="0" x2="'+w+'" y1="'+z+'" y2="'+z+'" stroke="rgba(4,7,14,.35)" stroke-width=".8" stroke-dasharray="2.5 2.5"/><path d="'+s.map(function(v,i){return (i?"L":"M")+x(i)+" "+f(v)}).join(" ")+'" fill="none" stroke="'+c+'" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><circle cx="'+x(s.length-1)+'" cy="'+f(s[s.length-1])+'" r="1.8" fill="'+c+'"/></svg>'}
 function lines(ol){var Q=series();[].slice.call(ol.querySelectorAll("li.lbr")).forEach(function(li){var h=li.querySelector(".pc-t h3"),c=li.querySelector(".lb-c.roi"),b=c&&c.querySelector("b"),m=h&&h.textContent.trim().toUpperCase();if(!b||!Q[m])return;
   var w=Math.round(b.getBoundingClientRect().width),old=c.querySelector(".xs-sp");if(!w||(old&&+old.getAttribute("width")===w))return;var t=d.createElement("span");t.innerHTML=spark(Q[m],w,15);if(old)old.replaceWith(t.firstChild);else c.appendChild(t.firstChild)})}
 /* (owner, same night: "the height... is completely off": the P&L figure sat high over its line, the hit rate low) the W-L and the
    hit rate are moved onto the P&L figure's baseline, measured per ticket (a transform on the figures only, so the printed field lines stay) */
 /* (owner, same night, then: "remove the chart... we're trying to pack too much into one thing": no P&L line, so the P&L figure is centred too)
    (before that: "what's in the win and loss box needs to be exactly in the middle... the top of the numbers [and] the bottom
    at the same distance"; the P&L is fine) the W-L and the hit rate sit with their ink centred in the ticket: the digits' cap top and
    baseline measured (canvas metrics of the figure's own font), moved by a transform on the figures only, so the field lines stay */
 /* the ink's top and bottom above the baseline, from the text itself drawn at 10x and scanned (font metrics alone left it 1 to 2px off) */
 var IK={};function inkOf(cs,txt){var fz=parseFloat(cs.fontSize),key=cs.fontFamily+"|"+cs.fontWeight+"|"+cs.fontStyle+"|"+fz+"|"+txt;if(IK[key])return IK[key];
  var c=d.createElement("canvas"),x=c.getContext("2d"),F=fz*10;c.width=Math.ceil(F*txt.length*.9+40);c.height=Math.ceil(F*2);x.font=cs.fontStyle+" "+cs.fontWeight+" "+F+"px "+cs.fontFamily;x.textBaseline="alphabetic";x.fillText(txt,10,F*1.4);
  var dt=x.getImageData(0,0,c.width,c.height).data,top=-1,bot=-1;for(var y=0;y<c.height;y++){for(var i=0;i<c.width;i++)if(dt[(y*c.width+i)*4+3]>100){if(top<0)top=y;bot=y;break}}
  return IK[key]=top<0?[fz*.72,0]:[(F*1.4-top)/10,(F*1.4-bot-1)/10]}
 function level(ol){[].slice.call(ol.querySelectorAll("li.lbr")).forEach(function(li){var R=li.getBoundingClientRect(),mid=R.top+R.height/2;
   [li.querySelector(".lb-f2 .pn-rec"),li.querySelector(".lb-c:not(.roi)>b"),li.querySelector(".lb-c.roi>b")].forEach(function(c){if(!c)return;c.style.removeProperty("transform");var b=c.tagName==="B"?c:c.querySelector("b");if(!b)return;
    var p=d.createElement("span");p.style.cssText="display:inline-block;width:0;height:0;vertical-align:baseline";b.appendChild(p);var base=p.getBoundingClientRect().top;p.remove();
    var cs=getComputedStyle(b),k=inkOf(cs,b.textContent.replace(/\s+/g,"")),asc=k[0]-k[1];
    var dy=mid-(base-k[1]-asc/2);if(Math.abs(dy)>.05)c.style.setProperty("transform","translateY("+dy.toFixed(2)+"px)","important")})})}
 /* SEASONBAR (owner, 2026-10-27, night: "I prefer M3"; "connect the season one card... seamless"; Live "the same style that we have
    across the entire leaderboard"): the board's header row becomes a bar in the proof band's green, lightly aged, perforated along its
    top, a cream double frame inset, joined to ticket No. 1 by the tickets' own join (draw above): "Season 1" and an honest Live / Off
    air on the left (Live = calls due or a round graded today in New York, on a weekday), W-L / Hit rate / P&L over their columns;
    every piece centred by its ink on the bar's middle and each label over its column's figure. Everything in the lighter ink. */
 function isLive(){try{var p={};new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",year:"2-digit",month:"numeric",day:"numeric",weekday:"short"}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
  if(p.weekday==="Sat"||p.weekday==="Sun")return false;var t=+p.month+"/"+(+p.day)+"/"+p.year,nd=function(v){var q=String(v||"").split("/");return q.length===3?(+q[0])+"/"+(+q[1])+"/"+q[2].slice(-2):""};
  return [].concat(window.ROUNDS||[],window.PENDING||[],window.UPCOMING||[]).some(function(r){return nd(r.called)===t||nd(r.resolves)===t})}catch(e){return false}}
 function sbar(ol){var h=ol.previousElementSibling;if(!h||!h.classList.contains("lbh"))return;
  if(!h.classList.contains("x2p-sb")){var lv=isLive(),s=d.createElement("span");s.className="sb-s";s.setAttribute("aria-hidden","true");
    s.innerHTML='<b class="hk">Season 1</b><span class="hv'+(lv?' on':'')+'"><i></i><b>'+(lv?"Live":"Off air")+'</b></span>';h.appendChild(s);
   [].slice.call(h.children).forEach(function(c){if(c===s||c.querySelector(".hk"))return;var t=c.textContent.trim();
    if(t==="W-L")c.innerHTML='<span class="hk"><i class="g">W</i>-<i class="r">L</i></span>';else if(t==="P&L")c.innerHTML='<span class="hk"><i class="g">P</i>&amp;<i class="r">L</i></span>';else if(t==="Hit rate")c.innerHTML='<span class="hk">Hit rate</span>'});
   h.classList.add("x2p-sb")}
  var K=[].slice.call(h.querySelectorAll(".hk,.hv"));K.forEach(function(e){e.style.removeProperty("transform")});
  var li=ol.querySelector("li.lbr"),R=h.getBoundingClientRect(),mid=R.top+R.height/2,map=[["W-L",".lb-f2 .pn-rec"],["Hit rate",".lb-c:not(.roi)>b"],["P&L",".lb-c.roi>b"]],dx=[];
  if(li)[].slice.call(h.children).forEach(function(c){var k=c.querySelector(":scope>.hk");if(!k||c.classList.contains("sb-s"))return;var t=c.textContent.trim(),m=map.filter(function(x){return t===x[0]})[0],f=m&&li.querySelector(m[1]);if(!f)return;
   var a=k.getBoundingClientRect(),r=f.getBoundingClientRect();k.__dx=(r.left+r.width/2)-(a.left+a.width/2)});
  K.forEach(function(e){var cy,a=e.getBoundingClientRect();if(e.classList.contains("hv"))cy=a.top+a.height/2;
    else{var p=d.createElement("span");p.style.cssText="display:inline-block;width:0;height:0;vertical-align:baseline";e.appendChild(p);var base=p.getBoundingClientRect().top;p.remove();
     var cs=getComputedStyle(e),k=inkOf(cs,(cs.textTransform==="uppercase"?e.textContent.toUpperCase():e.textContent).replace(/\s+/g,""));cy=base-(k[0]+k[1])/2}
    e.style.setProperty("transform","translate("+(e.__dx||0).toFixed(2)+"px,"+(mid-cy).toFixed(2)+"px)","important")})}
 var cur=null,lw=0,raf=0;function run(){cancelAnimationFrame(raf);raf=requestAnimationFrame(function(){var ol=d.querySelector("#standings.x2p-tix ol.lbl");
   /* (speed, 2026-10-28) the season ticket draws the board now; the page's own board under it is hidden (.stx-sr), so no measuring it:
      levelling it measured every figure on canvas each time a row changed (3.3 s of a throttled scroll) */
   if(ol&&ol.closest(".stx-sr"))return;if(ol){d.documentElement.classList.add("x2p-stitch");try{[].slice.call(ol.querySelectorAll(".xs-sp")).forEach(function(e){e.remove()});level(ol)}catch(e){window.__x2pStitchErr=e}try{sbar(ol)}catch(e){window.__x2pSbErr=e}draw(ol);watch(ol)}})}
 var mo=window.MutationObserver&&new MutationObserver(function(ms){if(ms.some(function(m){return [].slice.call(m.addedNodes).concat([].slice.call(m.removedNodes)).some(function(n){return n.nodeType===1&&!n.classList.contains("xs-j")})}))run()});
 function watch(ol){if(ol===cur||!mo)return;cur=ol;mo.observe(ol,{childList:true})}
 addEventListener("resize",function(){if(innerWidth!==lw){lw=innerWidth;run()}});if(d.fonts&&d.fonts.ready)d.fonts.ready.then(run);addEventListener("load",run);addEventListener("hashchange",function(){setTimeout(run,120)});
 var n=0;(function poll(){run();if(++n<40)setTimeout(poll,250)})()}catch(e){window.__x2pStitchErr=e}})();
/*SEASONTIX{*/
/* The season ticket, the tryouts ticket and the proof on the bet ticket's own stock (owner, 2026-10-28; CSS in the SEASONTIX block of
   skin-x2plus.css; mockups ez/tools/concepts/r1038, picks A4 and P4 K2). Built from the page's own board and proof ticket and the bet
   ticket's classes; the page's board stays in the page, out of sight, for screen readers and the ⓘ flip. Each ticket's paper is the bet's
   layer list with some layers set to none (read from the computed style, so it is redone on every width change: the band heights
   follow the width): the fibres (22: they "make the ticket look dirty"), the sunburst behind the bet's label (24, 25), and on the season
   ticket's foot and the tryouts ticket's head the strips and their squeeze edges (17 to 21), so the two meet on bare stock. The proof's
   die gets stamp teeth down both sides (owner: "K2 stamp teeth... both on the left and on the right"). */
(function(){try{var d=document,H=d.documentElement;
 var lst=function(v){var o=[],dp=0,st=0;for(var i=0;i<v.length;i++){var c=v[i];if(c==="(")dp++;else if(c===")")dp--;else if(c===","&&!dp){o.push(v.slice(st,i).trim());st=i+1}}o.push(v.slice(st).trim());return o};
 var full=function(v,n){var a=lst(v),o=[];for(var i=0;i<n;i++)o.push(a[i%a.length]);return o};
 var PROPS=["background-image","background-size","background-position","background-repeat","mask-image","mask-size","mask-position","mask-repeat","mask-composite","mask-origin","mask-clip"];
 /* the paper: the bet's layers with some set to none; teeth: added to the die of the paper and both shadows, toned like the bet's bites */
 function paper(t,o){var pp=t.querySelector(".bt-pp");if(!pp)return null;[pp,t.querySelector(".bt-sh>i"),t.querySelector(".bt-hs")].forEach(function(e){if(e)PROPS.forEach(function(p){e.style.removeProperty(p)})});
  var L=lst(getComputedStyle(pp).backgroundImage);if(L.length<27||!/1f7a45/i.test(L[19])||!/c8372a/i.test(L[21]))return null;var grain=L[23];
  L[22]="none";L[24]="none";L[25]="none";if(o.noTop){L[17]="none";L[18]="none";L[19]="none"}if(o.noBot){L[20]="none";L[21]="none"}pp.style.backgroundImage=L.join(", ");
  if(o.teeth){var r=3,p=9,cut=function(x){return "radial-gradient(circle at "+x+" 50%, #0000 "+(r-.35)+"px, #000 "+(r+.45)+"px)"},tone=function(x){return "radial-gradient(circle at "+x+" 50%, #0000 "+(r-.2)+"px, rgba(110,78,34,.22) "+(r+.3)+"px, #0000 "+(r+3.5)+"px)"};
   [pp,t.querySelector(".bt-sh>i"),t.querySelector(".bt-hs")].forEach(function(e){if(!e)return;var cs=getComputedStyle(e),im=lst(cs.maskImage),n=im.length;
    /* every list at the full layer count first: CSS cycles a short list, which gave the added layers the wrong size */
    e.style.setProperty("mask-image",im.concat([cut("0"),cut("100%")]).join(", "));e.style.setProperty("mask-size",full(cs.maskSize,n).concat(["100% "+p+"px","100% "+p+"px"]).join(", "));
    e.style.setProperty("mask-position",full(cs.maskPosition,n).concat(["0 50%","0 50%"]).join(", "));e.style.setProperty("mask-repeat",full(cs.maskRepeat,n).concat(["repeat-y","repeat-y"]).join(", "));
    e.style.setProperty("mask-composite",full(cs.maskComposite,n).concat(["intersect","intersect"]).join(", "));e.style.setProperty("mask-origin",full(cs.maskOrigin,n).concat(["border-box","border-box"]).join(", "));e.style.setProperty("mask-clip",full(cs.maskClip,n).concat(["border-box","border-box"]).join(", "))});
   var cs=getComputedStyle(pp),nb=L.length;pp.style.backgroundImage=[tone("0"),tone("100%")].concat(L).join(", ");pp.style.backgroundSize=["100% "+p+"px","100% "+p+"px"].concat(full(cs.backgroundSize,nb)).join(", ");
   pp.style.backgroundPosition=["0 50%","0 50%"].concat(full(cs.backgroundPosition,nb)).join(", ");pp.style.backgroundRepeat=["repeat-y","repeat-y"].concat(full(cs.backgroundRepeat,nb)).join(", ")}
  [].slice.call(t.querySelectorAll(".stx-ko")).forEach(function(e){e.style.backgroundImage=grain;e.style.backgroundSize="200px 200px"});
  /* the band stars: the certificate star's gold with the card's grain multiplied in */
  [].slice.call(t.querySelectorAll(".stx-sw i")).forEach(function(e){e.style.backgroundImage=grain+",linear-gradient(135deg,#cfae5c,#a98329 40%,#c9a453 62%,#93701f)";e.style.backgroundSize="200px 200px,100% 100%";e.style.backgroundBlendMode="multiply,normal"});return grain}
 function isLive(){try{var p={};new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",year:"2-digit",month:"numeric",day:"numeric",weekday:"short"}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
  if(p.weekday==="Sat"||p.weekday==="Sun")return false;var t=+p.month+"/"+(+p.day)+"/"+p.year,nd=function(v){var q=String(v||"").split("/");return q.length===3?(+q[0])+"/"+(+q[1])+"/"+q[2].slice(-2):""};
  return [].concat(window.ROUNDS||[],window.PENDING||[],window.UPCOMING||[]).some(function(r){return nd(r.called)===t||nd(r.resolves)===t})}catch(e){return false}}
 var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
 var num=function(s){var ink=[1,.84,.95,.88,1,.9],dy=[0,.3,-.2,.2,-.3,.1];return "N<u>o</u> "+s.split("").map(function(c,i){return '<s style="opacity:'+ink[i]+';top:'+dy[i]+'px">'+c+"</s>"}).join("")};
 function tk(cls,inner,head,foot,j){return '<div class="bs-nx stx-t '+cls+'"><div class="bt-sh"><i></i></div><div class="bt-hs"></div><div class="bt-p"><div class="bt-pp"><i class="bt-pl"></i><i class="bt-r1"></i><i class="bt-r2"></i></div>'+
   inner+(head?'<div class="bt-st bt-hd">'+head+"</div>":"")+(foot?'<div class="bt-st bt-ft">'+foot+"</div>":"")+(j?'<i class="bs-perf"></i>':"")+"</div></div>"}
 /* ---- the board ---- */
 var sig="",roll=null;
 function board(){var ol=d.querySelector("#standings ol.lbl"),fin=ol&&ol.closest(".x2p-fin"),lbx=ol&&ol.closest(".lbx");if(!ol||!fin||!lbx)return;var li=[].slice.call(ol.querySelectorAll("li.lbr"));if(li.length<2)return;
  var s=ol.textContent.replace(/\s+/g," ");if(s===sig&&roll&&roll.isConnected)return;sig=s;
  var rows=li.map(function(l){var t=function(q){var e=l.querySelector(q);return e?e.textContent.trim():""},sm=l.querySelector(".pc-t small"),fl=sm&&sm.querySelector("svg"),w=l.querySelector(".pn-rec b.w"),ls=l.querySelector(".pn-rec b.l");
   return {rk:(t(".rk b")||t(".rk")).replace(/\D/g,""),nm:t(".pc-t h3"),ver:sm?(sm.querySelector("span")||sm).textContent.trim():"",flag:fl?fl.outerHTML:"",logo:(l.querySelector(".lg")||{}).innerHTML||"",w:w?w.textContent.trim():"",l:ls?ls.textContent.trim():"",hit:t(".lb-c:not(.roi)>b"),pl:t(".lb-c.roi>b")}});
  var n5=ol.querySelector("li.x2p-n5"),TRY=n5?[].slice.call(n5.querySelectorAll(".n5-c")).map(function(c){var f=c.querySelector(".n5-fw");return {lg:(c.querySelector(".n5-lg")||{}).innerHTML||"",nm:(c.querySelector("b")||{}).textContent||"",flag:f?f.innerHTML:""}}):[];
  var live=isLive();
  var foil=function(t){return '<span class="bt-b stx-fo"><span class="x2p-cdh"><b><em data-t="'+esc(t)+'">'+esc(t)+"</em></b></span></span>"};
  var row=function(r,i){return '<div class="stx-r"><span class="stx-rk"><small>No.</small><b>'+esc(r.rk)+"</b></span>"+
   '<span class="stx-ai"><span class="stx-lg">'+r.logo+'</span><span class="stx-nm">'+(i?"<b>"+esc(r.nm)+"</b>":foil(r.nm.toUpperCase()))+"<small>"+esc(r.ver)+'<span class="stx-fl">'+r.flag+"</span></small></span></span>"+
   '<span class="stx-wl"><i class="stx-w">'+esc(r.w)+'</i>-<i class="stx-l">'+esc(r.l)+'</i></span><span class="stx-hr">'+esc(r.hit)+'</span><span class="stx-pl '+(/^[-−]/.test(r.pl)?"dn":"up")+'">'+esc(r.pl)+"</span></div>"};
  var ant='<span class="stx-air'+(live?" on":"")+'"><svg viewBox="0 0 20 22" aria-hidden="true" focusable="false"><path class="w" d="M4.2 3.6a8 8 0 0 0 0 11.3M15.8 3.6a8 8 0 0 1 0 11.3M6.9 6.3a4.2 4.2 0 0 0 0 5.9M13.1 6.3a4.2 4.2 0 0 1 0 5.9"/><path class="m" d="M10 9.3 6.6 21.2M10 9.3l3.4 11.9M7.6 17.6h4.8M8.6 14h2.8"/><circle class="d" cx="10" cy="9.3" r="2.1"/></svg><b class="stx-ko">'+(live?"Live":"Off air")+"</b></span>";
  var h=tk("stx-board",'<div class="stx-in"><div class="stx-cols"><span></span><span>Model</span><span>W-L</span><span>Hit rate</span><span>P&amp;L</span></div>'+rows.map(row).join("")+"</div>",'<span class="stx-ko stx-s1">Season 1</span>'+ant,"",0)+
   (TRY.length?tk("stx-try",'<div class="stx-in stx-tin"><span class="stx-rk"><small>No. 5</small><b class="stx-rd">?</b></span><span class="stx-tl"><b>Models</b><b class="stx-rd">in tryouts</b></span>'+
    TRY.map(function(c){return '<span class="stx-tc"><span class="stx-lg">'+c.lg+"</span><b>"+esc(c.nm.toUpperCase())+'</b><span class="stx-fl">'+c.flag+"</span></span>"}).join("")+"</div>","",'<span class="stx-ko">Not signed yet</span><span class="bt-no">'+num("000005")+"</span>",1):"");
  if(roll&&roll.isConnected)roll.remove();roll=d.createElement("div");roll.className="stx-roll";roll.setAttribute("aria-hidden","true");roll.innerHTML=h;fin.insertBefore(roll,lbx);lbx.classList.add("stx-sr");dress()}
 /* each label over its figure's ink, as the Season 1 bar did */
 function align(){if(!roll)return;var ink=function(e){var g=d.createRange();g.selectNodeContents(e);return g.getBoundingClientRect()},row=roll.querySelector(".stx-r"),map={"W-L":".stx-wl","Hit rate":".stx-hr","P&L":".stx-pl"};if(!row)return;
  [].slice.call(roll.querySelectorAll(".stx-cols span")).forEach(function(l){var q=map[l.textContent.trim()];if(!q)return;l.style.transform="";var f=ink(row.querySelector(q)),a=ink(l);l.style.transform="translateX("+((f.left+f.width/2)-(a.left+a.width/2)).toFixed(2)+"px)"})}
 function dress(){if(!roll)return;var T=[].slice.call(roll.querySelectorAll(".stx-t"));T.forEach(function(t,i){paper(t,{noTop:i>0,noBot:i<T.length-1})});align()}
 /* ---- the proof ---- */
 var pcd=null;
 function proof(force){var pt=d.querySelector("#learn .x2p-pt"),cd=pt&&pt.querySelector(".pt-cd");if(!cd)return;if(cd===pcd){if(force){paper(cd,{teeth:1});gap(cd)}return}pcd=cd;
  var ser=((cd.querySelector(".pt-bd.r .pt-ko:last-child")||{}).textContent||"").match(/\d{6}/);ser=ser?ser[0]:"";
  var star=d.querySelector(".x2p-bt .bt-st span i");if(star)cd.style.setProperty("--stx-star",getComputedStyle(star).backgroundImage);
  cd.classList.add("bs-nx","stx-p");pt.classList.add("stx-pt");
  var sw='<span class="stx-sw" aria-hidden="true"><i></i></span>';  /* the bands replace the page's own (hidden), so they stay readable */
  cd.insertAdjacentHTML("afterbegin",'<div class="bt-sh" aria-hidden="true"><i></i></div><div class="bt-hs" aria-hidden="true"></div><div class="bt-pp" aria-hidden="true"><i class="bt-r1"></i><i class="bt-r2"></i></div>'+
   '<div class="bt-st bt-hd"><span class="stx-q">'+sw+'<b class="stx-ko stx-qt"></b>'+sw+"</span></div>"+
   '<div class="bt-st bt-ft"><span class="stx-q">'+sw+'<b class="stx-ko stx-qt">Simulated. Before fees.</b>'+sw+'</span><span class="stx-q"><b class="stx-ko stx-qt stx-n">Nº '+ser+"</b></span></div>");
  /* the question follows the page's own band (it changes with the tab) */
  var src=cd.querySelector(".pt-top"),q=cd.querySelector(".bt-hd .stx-qt"),sync=function(){q.textContent=src?src.textContent.trim():""};sync();
  if(src&&window.MutationObserver)new MutationObserver(sync).observe(cd.querySelector(".pt-q")||src,{subtree:true,childList:true,characterData:true});
  var tb=cd.querySelector(".pt-tb");if(tb&&window.MutationObserver)new MutationObserver(function(){gap(cd)}).observe(tb,{subtree:true,attributes:true,attributeFilter:["aria-pressed"]});
  paper(cd,{teeth:1});gap(cd)}
 /* the rule under the folder tabs, drawn with a gap under the open one */
 function gap(cd){var tb=cd.querySelector(".pt-tb"),on=tb&&tb.querySelector('[aria-pressed="true"]');if(!on)return;var R=tb.getBoundingClientRect(),o=on.getBoundingClientRect(),a=(o.left-R.left).toFixed(1),b=(o.right-R.left).toFixed(1),ink="rgba(20,18,23,.75)";
  tb.style.setProperty("border-bottom-color","transparent","important");tb.style.setProperty("background","linear-gradient(90deg,"+ink+" 0 "+a+"px,transparent "+a+"px "+b+"px,"+ink+" "+b+"px 100%) 0 100%/100% 1.5px no-repeat","important")}
 var lw=0,raf=0;function run(force){cancelAnimationFrame(raf);raf=requestAnimationFrame(function(){if(!H.classList.contains("x2pbt"))return;try{board();if(force)dress();proof(force)}catch(e){window.__x2pTixErr=e}})}
 addEventListener("resize",function(){if(innerWidth!==lw){lw=innerWidth;run(1)}});if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){run(1)});addEventListener("load",function(){run(1)});addEventListener("hashchange",function(){setTimeout(run,150)});
 var n=0;(function poll(){run();if(++n<40)setTimeout(poll,250)})()}catch(e){window.__x2pTixErr=e}})();
/*}SEASONTIX*/
/*LIVESTRIP{*/
/* The live strip under the film (owner, 2026-10-28: E of ez/tools/concepts/r1043, "E would be one I'd be willing to ship with", with the
   owner's fixes: the company logos are what matters, so they sit big with the counts smaller under them; the labels at the top of each
   frame; every row level across the three frames (label, logos or the winner, the figure, its word, the line under it); the last round as
   who won, what they made on that call (the company's logo, no ticker) and their season P&L; the next frame as bright as the others while
   on air, dimmed only off air; the corner stars the same on every frame). A ticket from the bet ticket's own classes: the green band and
   the red band are the film's two edges with sprocket holes punched along them, the three frames parted by the ticket's perforations.
   Everything comes from ez-data.js and the New York clock; it redraws once a minute. CSS in the LIVESTRIP block of skin-x2plus.css. */
(function(){try{var d=document,H=d.documentElement,P0=window.__x2pPnl;if(typeof ROUNDS==="undefined"||!P0)return;
 var esc=function(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
 /* the New York clock */
 var NYF=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",hourCycle:"h23",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"});
 function ny(t){var o={};NYF.formatToParts(new Date(t)).forEach(function(q){o[q.type]=+q.value});return {y:o.year,mo:o.month,d:o.day,h:o.hour%24,mi:o.minute,s:o.second}}
 function off(t){var q=ny(t);return (Date.UTC(q.y,q.mo-1,q.d,q.h,q.mi,q.s)-Math.floor(t/1000)*1000)/6e4}
 function at(y,mo,dd,h,mi){var g=Date.UTC(y,mo-1,dd,h,mi||0),u=g-off(g)*6e4;return g-off(u)*6e4}
 function key(y,mo,dd){return y+"-"+String(mo).padStart(2,"0")+"-"+String(dd).padStart(2,"0")}
 function K(s){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);return m?key(2000+(+m[3]%100),+m[1],+m[2]):"9999"}
 /* NYSE 2026-27: full closures and 1pm early closes (nyse.com/markets/hours-calendars) */
 var HOL={"2026-11-26":1,"2026-12-25":1,"2027-01-01":1,"2027-01-18":1,"2027-02-15":1},EARLY={"2026-11-27":13,"2026-12-24":13};
 var WD=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
 function kdate(k){var p=k.split("-");return new Date(Date.UTC(+p[0],+p[1]-1,+p[2]))}
 function kadd(k,n){var t=new Date(kdate(k).getTime()+n*864e5);return key(t.getUTCFullYear(),t.getUTCMonth()+1,t.getUTCDate())}
 function trading(k){var w=kdate(k).getUTCDay();return w>0&&w<6&&!HOL[k]}
 function bellOf(k){var p=k.split("-");return at(+p[0],+p[1],+p[2],EARLY[k]||16,0)}
 function kfmt(k,full){var t=kdate(k);return WD[t.getUTCDay()]+(full?" "+MON[t.getUTCMonth()]+" "+t.getUTCDate():"")}
 function left(ms){if(ms<=0)return "0m";var m=Math.ceil(ms/6e4),dd=Math.floor(m/1440),h=Math.floor(m%1440/60),mi=m%60;return dd?dd+"d "+h+"h":h?h+"h "+String(mi).padStart(2,"0")+"m":mi+"m"}
 var nm=function(m){return {GPT:"GPT",KIMI:"Kimi",CLAUDE:"Claude",GROK:"Grok"}[m]||m};
 var cap=function(u){return (window.CAPS||{})[String(u.ticker).toUpperCase()]||0};
 var big=function(L){return L.map(function(u,i){return {u:u,i:i,c:cap(u)}}).sort(function(a,b){return (b.c-a.c)||(a.i-b.i)}).map(function(x){return x.u})};
 var logo=function(u,cls){var t=String(u.ticker).toUpperCase(),L=(window.CO_LOGOS||{})[t],f=L&&(L.f||L);
  return f?'<span class="x2p-ls-lg '+(cls||"")+(L.dark?" dk":"")+'"><img src="'+MEDIA+f+'" alt="'+esc(u.co)+'" title="'+esc(u.co)+'"></span>':'<span class="x2p-ls-lg x2p-ls-tx '+(cls||"")+'">'+esc(t.slice(0,4))+'</span>'};
 var logos=function(R,n){var B=big(R),s=B.slice(0,n),k=0;return '<span class="x2p-ls-lgs">'+s.map(function(u){return logo(u)}).join("")+(k>0?'<span class="x2p-ls-k">+'+k+'</span>':'')+'</span>'};
 var INK={GPT:"#1b181c",KIMI:"#1b181c",GROK:"#1b181c",CLAUDE:"#d97757"};
 var ai=function(m){var M=MODELS[m];return M?'<svg class="x2p-ls-ai" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="'+(M.fr||"nonzero")+'" fill="'+(INK[m]||"#1b181c")+'" d="'+M.d+'"/></svg>':""};
 /* where the season stands right now */
 function model(){var now=Date.now(),q=ny(now),today=key(q.y,q.mo,q.d),all=[].concat(ROUNDS,PENDING,UPCOMING);
  var bk=today;for(var i=0;i<10;i++){if(trading(bk)&&bellOf(bk)>now)break;bk=kadd(bk,1)}var bell=bellOf(bk),rung=trading(today)&&now>=bellOf(today);
  var atBell=PENDING.filter(function(u){return K(u.resolves)===today&&bk===today}),waiting=PENDING.filter(function(u){return K(u.resolves)!=="9999"&&(K(u.resolves)<today||K(u.resolves)===today&&rung)});
  var due=UPCOMING.filter(function(u){return K(u.called)===today});
  var nxs=UPCOMING.map(function(u){return K(u.called)}).filter(function(k){return k>today}).sort(),nk=nxs[0]||null,nR=UPCOMING.filter(function(u){return K(u.called)===nk});
  /* (audit, 2026-10-28) a day with predictions due shows them, with the rounds graded at today's close as a line under them (the bell
     used to win and hide a day of 15 predictions) */
  var s=due.length&&trading(today)?{k:"due",on:1,R:due,B:atBell,W:waiting}:atBell.length?{k:"bell",on:1,R:atBell}:waiting.length?{k:"rung",on:0,R:waiting}:{k:"off",on:0,R:[]};
  /* the last round: the newest graded day, its biggest company; the winner, what that call made, and the winner's season P&L */
  var lk=ROUNDS.reduce(function(a,u){var k=K(u.resolves);return k!=="9999"&&k>a?k:a},"0000"),r=big(ROUNDS.filter(function(u){return K(u.resolves)===lk}))[0];
  var P=P0(),wins=String(r&&r.win||"").split(/\s*&\s*/).filter(Boolean),who=wins[0];
  if(r&&!who)who=r.calls.map(function(c){return c[0]}).sort(function(a,b){return P.A[b].per[r.n].v-P.A[a].per[r.n].v})[0];
  var first=ROUNDS.map(function(u){return K(u.called)}).sort()[0],mon=function(k){var t=kdate(k),w=t.getUTCDay();return t.getTime()-((w+6)%7)*864e5},wk=first?Math.floor((mon(today)-mon(first))/(7*864e5))+1:1;
  var graded=ROUNDS.length;
  return {s:s,bell:bell,today:today,r:r,who:who,won:wins.length>0,pn:r&&who?P.A[who].per[r.n].v:0,tot:who?P.A[who].pnl:0,usd:P.usd,nk:nk,nR:nR,wk:wk,graded:graded,total:all.length}}
 var pl=function(n,w){return w+(n===1?"":"s")};
 function html(m){var s=m.s,r=m.r,on=s.on;
  /* (owner, 2026-10-28) four rows shared by the three frames: the label at the top, a line under it, the middle, the bottom.
     Last round: "Grok won" high, what the call made in the middle, "on" the company's logo at the bottom (no season P&L: the board has it).
     Today: On air at the top, three logos in the middle, the count at the bottom. Next: the day, three logos, the count. */
  var row=function(a,b,c,dd){return '<span class="x2p-ls-a">'+a+'</span><span class="x2p-ls-b">'+b+'</span><span class="x2p-ls-c">'+c+'</span><span class="x2p-ls-d">'+dd+'</span>'};
  var cnt=function(n,w){return '<span class="x2p-ls-ct"><b class="x2p-ls-n">'+n+'</b> <span class="x2p-ls-w">'+pl(n,w)+'</span></span>'};
  var L=r?row('<b class="x2p-ls-lb">Last round</b>','<span class="x2p-ls-who">'+ai(m.who)+'<b>'+esc(nm(m.who))+(m.won?" won":" · top P&amp;L")+'</b></span>',
    '<span class="x2p-ls-pn '+(m.pn>=0?"up":"dn")+'">'+m.usd(m.pn,true)+'</span>','<span class="x2p-ls-on">on '+logo(r,"x2p-ls-bg")+'</span>'):row("","","","");
  var burst='<span class="x2p-ls-bu'+(on?" on":"")+'"><b>'+(on?"On<br>air":"Off<br>air")+'</b></span>',C;
  if(s.k==="bell")C=row(burst,"",logos(s.R,3),cnt(s.R.length,"resolution"));
  else if(s.k==="due")C=row(burst,"",logos(s.R,3),cnt(s.R.length,"prediction"));
  else if(s.k==="rung")C=row(burst,"",logos(s.R,3),'<span class="x2p-ls-s">Results soon</span>');
  else C=row(burst,"",'<span class="x2p-ls-x">'+(m.nk?"Back "+kfmt(m.nk):"Off air")+'</span>','<span class="x2p-ls-s">'+(m.nk?m.nR.length+" "+pl(m.nR.length,"prediction").toLowerCase():"")+'</span>');
  var N=m.nk?row('<b class="x2p-ls-lb">Next · '+kfmt(m.nk)+'</b>',"",logos(m.nR,3),cnt(m.nR.length,"prediction")):row('<b class="x2p-ls-lb">Next</b>',"","",'<span class="x2p-ls-s">Dates to come</span>');
  /* (owner, 2026-10-28, mockups E1 to E3) Last round and Next the biggest words in their frames; On air smaller and higher; the logos in
     the middle: two, or four in two rows, with "+n more" under them; the logos in their own colours */
  var V=String(window.__x2pLsV||"EF");if(/^E/.test(V)){var two=V==="E3"||V==="EF",tg=V!=="E1";
   var grid=function(R,n){var B=big(R),sh=B.slice(0,n),k=B.length-sh.length;return '<span class="x2p-ls-lgw"><span class="x2p-ls-lgs'+(n>2?" g4":"")+'">'+sh.map(function(u){return logo(u)}).join("")+'</span>'+(k>0?'<span class="x2p-ls-more">+'+k+' more</span>':'')+'</span>'};
   var big1=function(t,b){return '<b class="x2p-ls-lb x2p-ls-big">'+(two?t+'<br>'+b:t+(b?' '+b:''))+'</b>'};
   L=r?row(big1("Last","round"),'<span class="x2p-ls-who">'+ai(m.who)+'<b>'+esc(nm(m.who))+(m.won?" won":" · top P&amp;L")+'</b></span>',
    '<span class="x2p-ls-pn '+(m.pn>=0?"up":"dn")+'">'+m.usd(m.pn,true)+'</span>','<span class="x2p-ls-on">on '+logo(r,"x2p-ls-bg")+'</span>'):row("","","","");
   if(s.k==="bell"||s.k==="due")C=row(burst,"",grid(s.R,tg?4:2),cnt(s.R.length,s.k==="bell"?"resolution":"prediction"));
   else if(s.k==="rung")C=row(burst,"",grid(s.R,tg?4:2),'<span class="x2p-ls-s">Results soon</span>');
   N=m.nk?row(big1("Next",(two?"":"· ")+kfmt(m.nk)),"",grid(m.nR,4),cnt(m.nR.length,"prediction")):row(big1("Next",""),"","",'<span class="x2p-ls-s">Dates to come</span>')}
  /* F (owner, 2026-10-28, on E3): the winner and what the call made as one block in the middle of the frame, on the same line as the
     other frames' logos; On air = the resolutions at today's close; a day's predictions still due show under Next ("Next / Today") */
  if(V==="EF"){L=r?row(big1("Last","round"),"",'<span class="x2p-ls-mid"><span class="x2p-ls-who">'+ai(m.who)+'<b>'+esc(nm(m.who))+(m.won?" won":" · top P&amp;L")+'</b></span>'+
     '<span class="x2p-ls-pn '+(m.pn>=0?"up":"dn")+'">'+m.usd(m.pn,true)+'</span></span>','<span class="x2p-ls-on">on '+logo(r,"x2p-ls-bg")+'</span>'):row("","","","");
   if(s.k==="due"){N=row(big1("Next","Today"),"",grid(s.R,4),cnt(s.R.length,"prediction"));   /* today's predictions never in On air */
    C=s.B&&s.B.length?row(burst,"",grid(s.B,4),cnt(s.B.length,"resolution")):s.W&&s.W.length?row(burst,"",grid(s.W,4),'<span class="x2p-ls-s">Results soon</span>'):row(burst,"",'<span class="x2p-ls-x">No results today</span>',"")}
   /* (owner, 2026-10-28, on EF) the logos of On air and Next on one band in the middle: "+n more" leaves the middle for the foot,
      above the count, and On air is as tall as the big labels beside it (one wide burst, "On air" on one line) */
   var mv=function(x){var k=x.match(/<span class="x2p-ls-more">[^<]*<\/span>/);return k?[x.replace(k[0],""),k[0]]:[x,""]};
   [C,N]=[C,N].map(function(h){var c=h.match(/<span class="x2p-ls-c">([\s\S]*?)<\/span><span class="x2p-ls-d">([\s\S]*)<\/span>$/);if(!c)return h;var q=mv(c[1]);if(!q[1])return h;
    return h.slice(0,c.index)+'<span class="x2p-ls-c">'+q[0]+'</span><span class="x2p-ls-d"><span class="x2p-ls-dd">'+q[1]+c[2]+'</span></span>'});
   C=C.replace('<span class="x2p-ls-bu','<span class="x2p-ls-bu x2p-ls-wb').replace(/On<br>air/,"On air").replace(/Off<br>air/,"Off air")}
  var g=(m.graded/m.total*100).toFixed(2),t=((s.k==="bell"?s.R.length:s.k==="due"?s.B.length:0)/m.total*100).toFixed(2);
  var inner='<div class="r39-in x2p-ls-fs"><div class="x2p-ls-fr x2p-ls-l">'+L+'</div><div class="x2p-ls-fr x2p-ls-td">'+C+'</div><div class="x2p-ls-fr x2p-ls-nx'+(on?"":" dim")+'">'+N+'</div></div>';
  var head='<b class="x2p-ls-bw">Season 1 · Week '+m.wk+'</b>',foot='<b class="x2p-ls-bw">Season 1</b><span class="x2p-ls-bar"><i class="g" style="width:'+g+'%"></i><i class="t" style="left:'+g+'%;width:'+t+'%"></i></span><b class="x2p-ls-bw">'+m.graded+'/'+m.total+' · <span class="x2p-ls-gd">NVDA ★</span></b>';
  return '<div class="bs-nx x2p-ls-t"><div class="bt-sh"><i></i></div><div class="bt-hs"></div><div class="bt-p"><div class="bt-pp"><i class="bt-pl"></i><i class="bt-r1"></i><i class="bt-r2"></i></div>'+inner+
   '<div class="bt-st bt-hd">'+head+'</div><div class="bt-st bt-ft">'+foot+'</div></div></div>'}
 /* the paper: the bet's layers with the fibres (22) and the sunburst (24, 25) off; sprocket holes along both bands and a perforation in
   each gap between the frames (measured), each an SVG pattern put first in the die's mask list and XORed onto it */
 var lst=function(v){var o=[],dp=0,st=0;for(var i=0;i<v.length;i++){var c=v[i];if(c==="(")dp++;else if(c===")")dp--;else if(c===","&&!dp){o.push(v.slice(st,i).trim());st=i+1}}o.push(v.slice(st).trim());return o};
 var full=function(v,n){var a=lst(v),o=[];for(var i=0;i<n;i++)o.push(a[i%a.length]);return o};
 var svg=function(s){return "url(\"data:image/svg+xml,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg'><defs>"+s+"</defs><rect width='100%' height='100%' fill='url(#p)'/></svg>")+"\")"};
 var ROW=svg("<pattern id='p' width='13' height='7' patternUnits='userSpaceOnUse'><rect x='3.5' width='6' height='7' rx='1.3'/></pattern>"),COL=svg("<pattern id='p' width='8' height='6.5' patternUnits='userSpaceOnUse'><circle cx='4' cy='3.25' r='1.75'/></pattern>");
 var PROPS=["background-image","mask-image","mask-size","mask-position","mask-repeat","mask-composite","mask-origin","mask-clip"];
 function paper(t){var pp=t.querySelector(".bt-pp"),els=[pp,t.querySelector(".bt-sh>i"),t.querySelector(".bt-hs")];els.forEach(function(e){if(e)PROPS.forEach(function(p){e.style.removeProperty(p)})});
  var Lb=lst(getComputedStyle(pp).backgroundImage);if(Lb.length<27)return;Lb[22]=Lb[24]=Lb[25]="none";pp.style.backgroundImage=Lb.join(", ");
  /* the bands' words knocked out of the band's ink, the card's grain in them, as the season ticket's; NVDA and its star in the band
     stars' gold with the grain multiplied in (owner, 2026-10-28: "a nice golden one... that's sort of the end of season 1") */
  var grain=Lb[23];[].forEach.call(t.querySelectorAll(".x2p-ls-bw"),function(e){e.style.backgroundImage=grain;e.style.backgroundSize="200px 200px"});
  [].forEach.call(t.querySelectorAll(".x2p-ls-bar .g"),function(e){e.style.backgroundImage=grain;e.style.backgroundSize="200px 200px"});
  [].forEach.call(t.querySelectorAll(".x2p-ls-gd"),function(e){e.style.backgroundImage=grain+",linear-gradient(135deg,#fed98a,#fdbc2a 45%,#e8a817 70%,#fed98a)";e.style.backgroundSize="200px 200px,100% 100%";e.style.backgroundBlendMode="multiply,normal"});
  var fs=t.querySelector(".x2p-ls-fs"),T=t.getBoundingClientRect(),F=[].slice.call(fs.querySelectorAll(".x2p-ls-fr")).map(function(x){return x.getBoundingClientRect()});
  var cols=[0,1].map(function(i){return ((F[i].right+F[i+1].left)/2-T.left).toFixed(1)+"px"});
  var Lx=[{i:ROW,s:"calc(100% - 26px) 7px",p:"13px 5px"},{i:ROW,s:"calc(100% - 26px) 7px",p:"13px calc(100% - 5px)"}].concat(cols.map(function(x){return {i:COL,s:"8px calc(100% - var(--st) - var(--sb) - 6px)",p:"calc("+x+" - 4px) calc(var(--st) + 3px)"}}));
  els.forEach(function(e){if(!e)return;var cs=getComputedStyle(e),im=lst(cs.maskImage),n=im.length,Pf=function(p){return full(cs[p],n)},g=function(k){return Lx.map(function(l){return l[k]})},c=function(v){return Lx.map(function(){return v})};
   e.style.setProperty("mask-image",g("i").concat(im).join(", "));e.style.setProperty("mask-size",g("s").concat(Pf("maskSize")).join(", "));e.style.setProperty("mask-position",g("p").concat(Pf("maskPosition")).join(", "));
   e.style.setProperty("mask-repeat",c("no-repeat").concat(Pf("maskRepeat")).join(", "));e.style.setProperty("mask-composite",c("exclude").concat(Pf("maskComposite")).join(", "));
   e.style.setProperty("mask-origin",c("border-box").concat(Pf("maskOrigin")).join(", "));e.style.setProperty("mask-clip",c("border-box").concat(Pf("maskClip")).join(", "))})}
 /* as wide as the film, under it */
 var box=null,last="";function size(){var vt=d.querySelector(".x2p-vt");if(!vt||!box)return;var c=getComputedStyle(vt);box.style.width=vt.getBoundingClientRect().width+"px";box.style.marginLeft=c.marginLeft;box.style.marginRight=c.marginRight}
 function draw(force){var vt=d.querySelector(".x2p-vt");if(!vt||!H.classList.contains("x2pbt"))return false;
  if(!box){box=d.createElement("div");box.className="x2p-ls";box.setAttribute("role","region");box.setAttribute("aria-label","Live this week");box.setAttribute("data-v",window.__x2pLsV||"EF");   /* (owner, 2026-10-28) EF is the strip; A to E3 stay for mockups */vt.after(box)}else if(box.previousElementSibling!==vt)vt.after(box);
  size();var h=html(model());if(h!==last||force){last=h;box.innerHTML=h;solid(box);bigfit();var t=box.querySelector(".x2p-ls-t");if(t)paper(t);band()}return true}   /* (speed, 2026-10-28) the paper only when the strip or the width changed: redone every 250 ms it restyled the page */
 /* a logo drawn on a tile (SK Hynix on white) prints as a block in one ink: when all four corners are opaque and the same colour, that
    colour is cut out on a canvas (same-origin image) and the logo then prints in ink like the rest; a logo whose shapes reach the corners
    in different colours (Microsoft) is left as it is */
 /* optical nudges (owner, 2026-10-28): Amazon "a bit lower... the same height as the Apple one" (its "a" sits high over the smile);
    a flat wordmark (Samsung) a touch low, as words sit on a line ("move Samsung down a little bit"); shares of the logo box's height */
 var OPT={"Amazon":.1},OFF={};function nudge(im){var r=im.getBoundingClientRect(),o=OFF[im.getAttribute("data-k")];if(!r.height||!im.closest(".x2p-ls-lgs"))return;
  var v=(OPT[im.alt]||0)*r.height+(o&&o.ar>3?r.height*.12:0);im.style.translate=v?"0 "+v.toFixed(2)+"px":""}
 var KEY={},LT={};function solid(r){[].slice.call(r.querySelectorAll(".x2p-ls-lg img")).forEach(function(im){var s=im.getAttribute("src");if(/^data:/.test(s))return;
   im.setAttribute("data-k",s);if(KEY[s]!==undefined){if(KEY[s])im.src=KEY[s];if(LT[s]&&im.parentNode)im.parentNode.classList.add("dk");nudge(im);return}var test=function(){try{var c=d.createElement("canvas"),w=c.width=im.naturalWidth,h=c.height=im.naturalHeight;if(!w||!h)return;var x=c.getContext("2d");x.drawImage(im,0,0);
     var D=x.getImageData(0,0,w,h),a=D.data,px=function(X,Y){var o=(Y*w+X)*4;return [a[o],a[o+1],a[o+2],a[o+3]]},C=[px(1,1),px(w-2,1),px(1,h-2),px(w-2,h-2)],dist=function(p,q){return Math.abs(p[0]-q[0])+Math.abs(p[1]-q[1])+Math.abs(p[2]-q[2])};
     var keyed=C.every(function(p){return p[3]>200&&dist(p,C[0])<30});
     if(keyed)for(var o=0;o<a.length;o+=4){var e=Math.abs(a[o]-C[0][0])+Math.abs(a[o+1]-C[0][1])+Math.abs(a[o+2]-C[0][2]);if(e<60)a[o+3]=0;else if(e<120)a[o+3]=Math.round(a[o+3]*(e-60)/60)}
     /* (owner, 2026-10-28: the Apple and Amazon logos "a bit larger") empty margins in a logo's file are trimmed, so every mark fills its box */
     var x0=w,y0=h,x1=-1,y1=-1;for(var Y=0;Y<h;Y++)for(var X=0;X<w;X++)if(a[(Y*w+X)*4+3]>12){if(X<x0)x0=X;if(X>x1)x1=X;if(Y<y0)y0=Y;if(Y>y1)y1=Y}
     /* a light logo meant for a dark ground (Samsung's white wordmark) prints in ink on the cream, like the CO_LOGOS dark ones */
     var lu=0,sat=0,ln=0;for(var o2=0;o2<a.length;o2+=16)if(a[o2+3]>128){lu+=.299*a[o2]+.587*a[o2+1]+.114*a[o2+2];sat+=Math.max(a[o2],a[o2+1],a[o2+2])-Math.min(a[o2],a[o2+1],a[o2+2]);ln++}if(ln&&lu/ln>175&&sat/ln<40){LT[s]=1;if(im.parentNode)im.parentNode.classList.add("dk")}
     var cw=x1-x0+1,ch=y1-y0+1,crop=x1>=0&&(cw<w*.92||ch<h*.92);
     /* the ink's shape (a flat wordmark is nudged down) */
     if(x1>=0)OFF[s]={ar:cw/ch};
     if(!keyed&&!crop){KEY[s]=null;nudge(im);return}
     x.putImageData(D,0,0);if(crop){var c2=d.createElement("canvas"),q=Math.max(cw,ch);c2.width=cw;c2.height=ch;c2.getContext("2d").drawImage(c,x0,y0,cw,ch,0,0,cw,ch);c=c2}
     KEY[s]=c.toDataURL("image/png");im.src=KEY[s];nudge(im)}catch(e){KEY[s]=null}};
   if(im.complete&&im.naturalWidth)test();else im.addEventListener("load",test,{once:true})})}
 /* On air's logos halfway between the burst and the count under them (owner, 2026-10-28: "the bottom logo needs to be as close to
    resolution as the top logos" to On air, "a bit more room to breathe"); Next's logos move with them so the two grids stay on one line */
 function band(){var td=box.querySelector(".x2p-ls-td"),nx=box.querySelector(".x2p-ls-nx");if(!td)return;var cs=[td,nx].map(function(f){return f&&f.querySelector(".x2p-ls-c")});
  cs.forEach(function(c){if(c)c.style.translate=""});var g=cs[0]&&cs[0].querySelector(".x2p-ls-lgw"),bu=td.querySelector(".x2p-ls-bu"),ct=td.querySelector(".x2p-ls-d .x2p-ls-ct,.x2p-ls-d .x2p-ls-s");if(!g||!bu||!ct)return;
  var G=g.getBoundingClientRect(),A=bu.getBoundingClientRect(),D=ct.getBoundingClientRect(),v=A.bottom+(D.top-A.bottom-G.height)/2-G.top;if(!(v>.5))return;
  cs.forEach(function(c){if(c&&c.querySelector(".x2p-ls-lgw"))c.style.translate="0 "+v.toFixed(2)+"px"})}
 /* the big labels (E takes) step down until they fit their frame */
 function bigfit(){[].forEach.call(box.querySelectorAll(".x2p-ls-big"),function(b){b.style.fontSize="";var f=b.closest(".x2p-ls-fr");if(!f)return;var cs=getComputedStyle(f),w=f.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)-2,z=parseFloat(getComputedStyle(b).fontSize),n=0;
   while(b.scrollWidth>w&&z>9&&n++<30){z-=.5;b.style.fontSize=z+"px"}})}
 function go(force){try{draw(force)}catch(e){window.__x2pLsErr=e}}
 var lw=0;addEventListener("resize",function(){if(innerWidth!==lw){lw=innerWidth;go(1)}});if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){go(1)});addEventListener("load",function(){go(1)});
 setInterval(function(){go(0)},60000);var n=0;(function poll(){go(0);if(++n<40)setTimeout(poll,250)})()}catch(e){window.__x2pLsErr=e}})();
/*}LIVESTRIP*/
/*PILL{*/
/* The "In play" pill (owner, 2026-10-28: keep "In play: <company>" and its glowing dot, "a sign that the site is alive"; not gold, a square
   module; "In play" in the logo's raised style). The page writes the words (v15, the next card); this wraps "In play:" so the CSS can set
   it in the logo's heavy italic with a green and a red step behind it. CSS in the PILL block of skin-x2plus.css. */
(function(){try{var d=document;function wrap(){var lt=d.querySelector("#liveTxt");if(!lt||lt.querySelector(".x2p-ip"))return;var h=lt.innerHTML,m=/^\s*(In play:)\s*/i.exec(h);if(!m)return;
  var rest=h.slice(m[0].length);
  /* (audit, 2026-10-28) on phones the page shortens a company with a numeric ticker to its first word: "SK" for SK Hynix reads as another
     company (SK Group); a first word of two letters or fewer takes the next word too */
  var lng=null;try{[].concat(PENDING,UPCOMING).some(function(u){var w=String(u.co||"").split(" ");if(w.length>1&&w[0].length<=2&&rest.trim()===w[0]){lng=w[0]+" "+w[1];return true}})}catch(e){}
  lt.innerHTML='<b class="x2p-ip">'+m[1]+'</b> <span class="x2p-ic">'+rest+'</span>';
  /* the longer name only where the header keeps its rows (at 390 to 412 px "SK Hynix" pushed the X icon onto a row of its own) */
  if(lng){var hd=d.querySelector("header"),h0=hd?hd.offsetHeight:0,ic=lt.querySelector(".x2p-ic");ic.textContent=lng;if(hd&&hd.offsetHeight>h0)ic.innerHTML=rest}}
 function hook(){var lt=d.querySelector("#liveTxt");if(!lt)return false;wrap();if(window.MutationObserver)new MutationObserver(wrap).observe(lt,{childList:true,characterData:true,subtree:true});return true}
 if(!hook()){var n=0;(function p(){if(!hook()&&++n<40)setTimeout(p,250)})()}}catch(e){}})();
/*}PILL*/
/*HEADS{ M1 (owner, 2026-10-28: "just go with M1 lockup plus numbers... every call receipts included need to be on the same line... same for
   getting smarter or just lucky"; the number and the eyebrow tag stay as on the live site): each section head's words in spans, the
   first half edged green to the left, the rest red to the right (CSS in the HEADS block of skin-x2plus.css); every head one line,
   stepped down from its CSS size until it fits its column (not the MVPs head, which has its own fitter); the standings strap's second
   line "All tracked, public, graded at the close." */
(function(){try{var d=document;
 function words(){d.querySelectorAll('section .sh h2:not(.x2p-mvp)').forEach(function(h){if(h.__h45)return;h.__h45=1;var ws=[];
   if(h.id==='lrnH')h.textContent=window.__x2pLrnH||'Smarter or just lucky?';
   var walk=function(n){[].slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){var fr=d.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(p){if(!p)return;
      if(/^\s+$/.test(p))fr.appendChild(d.createTextNode(p));else{var s=d.createElement('span');s.className='h45-w';s.textContent=p;fr.appendChild(s);ws.push(s)}});c.replaceWith(fr)}
     else if(c.nodeType===1&&c.tagName==='SMALL')walk(c)})};walk(h);
   ws.forEach(function(s){var nx=s.nextSibling;if(nx&&nx.nodeType===1&&nx.classList.contains('x2p-lc'))s.appendChild(nx)});
   ws.forEach(function(s,i){s.classList.add(i<Math.ceil(ws.length/2)?'h45-L':'h45-R')});h.classList.add('h45-h')})}
 function fit(){d.querySelectorAll('section .sh h2.h45-h').forEach(function(h){if(!h.offsetWidth)return;h.style.removeProperty('font-size');var p=h.parentNode,
   room=function(){var cs=getComputedStyle(p);return p.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)},
   need=function(){var r=d.createRange();r.selectNodeContents(h);var b=r.getBoundingClientRect();return b.width+h.offsetLeft-p.offsetLeft+(h.querySelector('.x2p-flipbtn')?0:0)};
   var z=parseFloat(getComputedStyle(h).fontSize),n=0,w=room();while(h.scrollWidth>h.clientWidth+.5&&z>14&&n++<60){z-=.5;h.style.setProperty('font-size',z+'px','important')}})}
 function strap(){var ls=d.querySelectorAll('#standings .x2p-strap li');if(ls[1]&&!ls[1].__h45){ls[1].__h45=1;ls[1].textContent='All tracked, public, graded at the close.'}}
 function go(){words();strap();fit()}
 var lw=0;addEventListener('resize',function(){if(innerWidth!==lw){lw=innerWidth;fit()}});if(d.fonts&&d.fonts.ready)d.fonts.ready.then(fit);addEventListener('load',fit);
 var n=0;(function p(){go();if(++n<24)setTimeout(p,250)})()}catch(e){window.__x2pHdErr=e}})();
/*}HEADS*/

/*G2JS{ the MVP backs as certificates of record, G2 (owner, 2026-10-28: the P&L in the middle, the punch line at the foot); lifted from ez/tools/concepts/r1045-mvp/G2.js */
/* G2: MVP backs as a certificate of record (owner, 2026-10-28, round 45). Self-contained; lift it as is.
   Hook: runs on its own once #x2pHl's recap backs exist (x2plus.js hlSlabs writes each back as .fin > .x2p-hb) and again whenever a
   back is rewritten (a MutationObserver on #x2pHl rebuilds any .fin whose G2 layer is gone). It refits on fonts, load and width
   changes, after the page's eqH (150 ms) has set the cards' height. window.__x2pG2() runs it by hand.
   Reads only the page's own recap DOM (headline, deck, punch line, P&L card and strip, rarity, round and date), the card's front
   label (the highlight's tag) and the global logo() from ez-data.js; numbers are never computed here. The recap stays in the DOM
   under the layer (visibility hidden), with its hidden call chips (.x2p-hcs), which the holo levels read; the page's own flip button
   is moved into the layer's foot, as certify() does on the record. */
(function(){if(window.__x2pG2)return;var d=document,n=0;
function E(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function T(e){return e?e.textContent.trim():''}
function mark(m){var k=String(m).toUpperCase(),s='';try{var h=typeof logo==='function'?logo(k):'',x=h.match(/<svg[\s\S]*<\/svg>/);s=x?x[0]:''}catch(e){}
  return s?'<span class="b45-mk" data-m="'+k+'" aria-hidden="true">'+s+'</span>':''}
function seal(rar,id){var mid=E(rar).toUpperCase();return '<svg class="b45-seal" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs><path id="'+id+'" d="M50 50m-32 0a32 32 0 1 1 64 0a32 32 0 1 1 -64 0"/></defs>'+
  '<g transform="rotate(-9 50 50)" fill="none" stroke="#a8231a"><circle cx="50" cy="50" r="47" stroke-width="3.2"/><circle cx="50" cy="50" r="42.5" stroke-width="1.3"/><circle cx="50" cy="50" r="29" stroke-width="1.6"/></g>'+
  '<g transform="rotate(-9 50 50)" fill="#a8231a" text-rendering="geometricPrecision"><text font-family="Archivo,sans-serif" font-style="italic" font-weight="900" font-stretch="62%" font-size="11" letter-spacing="1.6"><textPath href="#'+id+'">RARITY ★ $EZ ★ SEASON 1 ★ </textPath></text>'+
  '<text x="50" y="44" text-anchor="middle" font-size="11" font-family="Anton,Impact,sans-serif">★</text><text x="50" y="62" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="17" letter-spacing=".4">'+mid+'</text></g></svg>'}
function no4(v){return ('0000'+v).slice(-4)}
function build(card){var fin=card.querySelector('.face.back .fin'),hb=fin&&fin.querySelector('.x2p-hb.x2p-rc');if(!hb||fin.querySelector(':scope>.b45-g2'))return null;
  var w=card.closest('.x2p-hi'),q=function(s){return hb.querySelector(s)},rch=T(q('.x2p-rch small')).match(/Round (\d+)(?: · (.*))?/)||[],
    tag=w?T(w.querySelector('.x2p-htag')):'',big=T(q('.pn-big')),lab=T(q('.pn-ct em')),ct=T(q('.pn-ct span')).split(' · '),star=/^Its/i.test(lab),
    rar=q('.x2p-rar'),rarT=rar?T(rar.querySelector('span')):'',h4=q('h4');if(!h4||!big)return null;
  var st=[].map.call(hb.querySelectorAll('.pn-strip>span'),function(s){return '<span><i>'+mark(s.firstChild.textContent.trim())+' '+E(s.firstChild.textContent.trim())+'</i><b class="'+(s.classList.contains('ok')?'b45-ok':'b45-no2')+'">'+E(T(s.querySelector('b')))+'</b></span>'}).join('');
  var el=d.createElement('div');el.className='b45-g2';el.setAttribute('role','group');el.setAttribute('aria-label','Certificate of record'+(tag?': '+tag:''));
  el.innerHTML='<i class="b45-fr" aria-hidden="true"></i><div class="b45-hd"><div class="b45-lb b45-t">★ Certificate of record ★</div><b class="b45-k">'+E(tag)+'</b><div class="b45-lb b45-no">No. '+no4(rch[1]||'')+(rch[2]?' · '+E(rch[2]):'')+'</div></div>'+
   '<div class="b45-bd"><div class="b45-lb b45-cf">This certifies that</div><h4 class="b45-h">'+h4.innerHTML+'</h4>'+(q('.x2p-dk')?'<p class="b45-dk">'+E(T(q('.x2p-dk')))+'</p>':'')+'</div><div class="b45-sp"></div>'+
   '<div class="b45-stub"><div class="b45-sl">'+(star?'':'<span class="b45-lb">'+E(lab)+'</span>')+(star&&ct[1]?'<span class="b45-who">'+E(ct[0])+' · '+E(ct[1])+'</span>':'')+
     '<b class="b45-big '+(/^\+/.test(big)?'b45-ok':'b45-no2')+'">'+E(big)+'</b></div><div class="b45-sr">'+st+'</div></div><div class="b45-sp"></div>'+
   (T(q('.pn-pun'))?'<p class="b45-pu">'+E(T(q('.pn-pun')))+'</p><div class="b45-sp"></div>':'')+
   '<div class="b45-ft"><div class="b45-fl"><span class="b45-lb">'+E(T(q('.pn-cs')))+'</span><span class="b45-lb">'+E(T(q('.pn-sim')))+'</span></div>'+(rarT?seal(rarT,'b45g2s'+(n++)):'')+'</div>';
  var fb=hb.querySelector('.flipb');if(fb){fb.classList.add('b45-film');el.querySelector('.b45-fl').appendChild(fb)}
  hb.style.visibility='hidden';fin.appendChild(el);return el}
/* type steps down (headline, deck, punch line; the figures stop at 1) until nothing runs past the card, and up to 1.24 where a tall
   card leaves room, keeping some air at the foot */
function over(el){if(el.scrollHeight>el.clientHeight+.5)return true;var R=el.getBoundingClientRect(),o=false;
  [].forEach.call(el.querySelectorAll('.b45-hd,.b45-bd,.b45-stub,.b45-pu,.b45-ft,.b45-big,.b45-sr b,.b45-who'),function(e){var r=e.getBoundingClientRect();if(r.width&&(r.right>R.right+.5||r.bottom>R.bottom+.5||r.left<R.left-.5))o=true});
  [].forEach.call(el.querySelectorAll('.b45-big,.b45-who'),function(e){if(e.scrollWidth>e.clientWidth+1)o=true});return o}
function air(el){return [].reduce.call(el.querySelectorAll(':scope>.b45-sp'),function(a,e){return a+e.getBoundingClientRect().height},0)}
function fit(el){if(!el.clientHeight)return;var k=1;el.style.setProperty('--k',k);while(over(el)&&k>.66){k=Math.round((k-.03)*100)/100;el.style.setProperty('--k',k)}
  if(!over(el))while(k<1.24){var k2=Math.round((k+.03)*100)/100;el.style.setProperty('--k',k2);if(over(el)||air(el)<el.clientHeight*.06){el.style.setProperty('--k',k);break}k=k2}
  el.dataset.k=k}
/* one type size across the row, as a carousel needs: every back takes the smallest fit */
function fitAll(){var ls=[].slice.call(d.querySelectorAll('#x2pHl .b45-g2'));ls.forEach(fit);var m=Math.min.apply(null,ls.map(function(e){return +e.dataset.k||1}));
  ls.forEach(function(e){e.style.setProperty('--k',m);e.dataset.k=m})}
function run(){var hl=d.getElementById('x2pHl');if(!hl)return;[].forEach.call(hl.querySelectorAll('.card'),build);fitAll()}
window.__x2pG2=run;
var t,mo,w0=innerWidth;function soon(ms){clearTimeout(t);t=setTimeout(run,ms||60)}
function watch(){var hl=d.getElementById('x2pHl');if(!hl){setTimeout(watch,250);return}run();
  mo=new MutationObserver(function(ms){if(ms.some(function(m){return [].some.call(m.removedNodes,function(x){return x.nodeType===1&&(x.classList.contains('b45-g2')||x.classList.contains('x2p-hb'))})||[].some.call(m.addedNodes,function(x){return x.nodeType===1&&x.classList.contains('x2p-hb')})}))soon()});
  mo.observe(hl,{childList:true,subtree:true})}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',watch);else watch();
addEventListener('load',function(){soon(400)});if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){soon(300)});
addEventListener('resize',function(){if(innerWidth===w0)return;w0=innerWidth;soon(300)});
})();

/*}G2JS*/
