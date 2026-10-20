/* EZ Live X2+ (owner, 2026-10-19): X2's words, with the decisions of 2026-10-19 on top. Runs after X2 has built the page.
   The first screen explains the concept, not the bet; NVIDIA sits under the chip as bet #1; "pool", not "pot"; the brand
   line drops "never edited" (a call changed after it was shown, 2026-10-14, as on X6). Numbers from ez-data.js (SIM). */
(function(){try{
  var $=function(s,r){return (r||document).querySelector(s)};
  var P=SIM.poolShare!=null?Math.round(SIM.poolShare*100):69;
  /* the first screen: four bullets, one line each from 320 px */
  var T=['4 AIs predict stock moves after earnings.','Every call is posted <b>before the report</b>.',
    'Graded at the <b>next close</b>. Lessons learned.','<b>'+P+'%</b> of trading fees bet on the <b>top AI’s call</b>.'];
  [].forEach.call(document.querySelectorAll(".x2o-lines li"),function(e,i){if(T[i])e.innerHTML=T[i]});
  /* under the chip: what it counts down to, then the risk in one line */
  var g=$("#gpu .gpu-c")||$(".gpu-img");
  if(g&&!$(".x2p-cap")){var c=document.createElement("div");c.className="x2p-cap";c.textContent="Countdown to bet #1 · NVIDIA";
    var r=document.createElement("p");r.className="x2p-risk";r.innerHTML="<b>Right:</b> profits buy back $EZ. <b>Wrong:</b> the pool can be wiped out.";
    g.after(c);c.after(r)}
  var sn=$(".x2o-stn");if(sn)sn.textContent="The model on top of the leaderboard makes the call on bet #1, NVIDIA.";
  /* words, on every route as it renders: pot becomes pool; NVIDIA's bet is the first one; no "never edited" */
  var RE=[[/\bpot\b/g,"pool"],[/\bPot\b/g,"Pool"],[/\bPOT\b/g,"POOL"],[/ · NEVER EDITED/g,""],[/, never edited\./g,"."],[/\bNext bet\b/g,"Bet #1"],[/\bNEXT BET\b/g,"BET #1"]];
  function fix(root){if(!root||root.nodeType!==1)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;
    while(n=w.nextNode()){var t=n.textContent,u=t;if(!/pot|Pot|POT|NEVER|never edited|ext bet|EXT BET/.test(t))continue;
      if(n.parentNode&&/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName))continue;
      RE.forEach(function(p){u=u.replace(p[0],p[1])});if(u!==t)n.textContent=u}}
  fix(document.body);
  if(window.MutationObserver){var busy=false;new MutationObserver(function(ms){if(busy)return;busy=true;
    ms.forEach(function(m){[].forEach.call(m.addedNodes,function(x){if(x.nodeType===1)fix(x);else if(x.nodeType===3&&x.parentNode)fix(x.parentNode)})});busy=false})
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
  var PLACE={
    /* Overview: checking his watch, on the chip's corner, beside "Countdown to bet #1" */
    "/":function(){var cap=$(".x2p-cap"),gi=$("#gpu .gpu-img");if(!cap||!gi)return false;
      var h=img("08-watch.webp",112,"");h.classList.add("x2p-hz-watch");h.setAttribute("data-x2p-host","");cap.parentNode.insertBefore(h,cap);return true},
    /* Leaderboard: arms crossed under the standings, with one dry line from the sheet */
    "/leaderboard":function(){var lbx=$("#view .lbx");if(!lbx)return false;var rows=[].slice.call(lbx.querySelectorAll("li.lbr")),last=rows[rows.length-1];
      var after=lbx.nextElementSibling&&lbx.nextElementSibling.tagName==="P"?lbx.nextElementSibling:lbx,r=row("x2p-row-r");
      var pct=last?(last.textContent.match(/(\d+)%/)||[])[1]:null,a=last&&last.querySelector(".pc-t a"),nm=a?a.textContent.trim():"";
      if(pct&&nm&&+pct<50)r.appendChild(say(nm+" is right "+pct+"% of the time. <b>A coin flip gets 50%.</b>"));
      r.appendChild(img("05-heckle.webp",118,""));after.after(r);return true},
    /* Results: pointing at the list of rounds, with the newest round's closest call */
    "/results":function(){var hs=document.querySelectorAll("#view .xsh");var hd=hs[1]||hs[0];if(!hd)return false;
      var R=ROUNDS[ROUNDS.length-1],r=row("x2p-row-l");r.appendChild(img("02-presenter.webp",104,""));
      if(R&&R.win){var w=R.win.split(" & ").map(nmM).join(" & ");r.appendChild(say("Round "+R.n+": <em>"+w+"</em> came closest."))}
      hd.after(r);return true},
    /* Upcoming: looking over his shoulder, beside "the calls drop before each report" */
    "/upcoming":function(){var p=$("#view .ufn");if(!p)return false;p.classList.add("x2p-beside");var h=img("11-over-shoulder.webp",86,"");h.classList.add("x2p-hz-side");h.setAttribute("data-x2p-host","");p.appendChild(h);return true},
    /* Buyback: stamping on the top corner of the pool card */
    "/buyback":function(){var pool=$("#view .pool");if(!pool)return false;pool.classList.add("x2p-stamped");var h=img("03-stamping.webp",104,"");h.classList.add("x2p-hz-stamp");h.setAttribute("data-x2p-host","");pool.appendChild(h);return true}
  };
  function route(){var h=location.hash.replace(/^#/,"")||"/";if(h.indexOf("/")!==0)h="/";return h.split("?")[0]}
  var tries=0;
  function place(){var f=PLACE[route()];if(!f||mine())return;if(!f()&&tries++<30)setTimeout(place,100)}
  addEventListener("hashchange",function(){tries=0;setTimeout(place,60)});
  if(document.readyState==="complete")place();else addEventListener("load",place);
  setTimeout(place,300);
}catch(e){}})();
