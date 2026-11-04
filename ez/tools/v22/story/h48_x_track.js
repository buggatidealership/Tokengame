/* round H50 "track" (2026-11-04, launch day, owner: "we have to start on the Umami or Google Analytics, because we're planning to launch
   today"): what X6+ reports, through x2plus.js's window.__x2pTrack (Umami Cloud, cookieless so no consent banner; the live domain only;
   off until x2plus.js's UMAMI_ID holds the Website ID; localStorage "ez-track-debug" = 1 logs every event to the console instead).
   x2plus.js already sends a page view on load and on every tab or round address (#/round/N), and "follow" for every x.com link. This file
   adds, each kept small so a visit costs about 6 to 15 of the plan's events:
     section   how far down the Overview a visit gets: eight milestones, once each per page load (again after leaving the Overview);
     video     a film started by the visitor (the explainer, the TV in "One real round", a round's own film), once per kind per load;
               the founders' muted loops never count;
     follow-hl a tap on Follow on Hyperliquid, with the ticker and the tab it was on (every tap: it is the page's main action);
     filter    a filter used on Upcoming or the Leaderboard (its group and value), once per value per load.
   The calls go through window.__x2pTrack at the moment of each event: x2plus.js runs after this file. */
(function(){var W=window,d=document,H=d.documentElement;if(!H.classList.contains("h48"))return;
function T(n,o,once){try{if(W.__x2pTrack)W.__x2pTrack(n,o,once)}catch(e){}}
function where(t){if(t&&t.closest&&t.closest("#x2pRm"))return "round";var s=H.getAttribute("data-sec")||"board";return s==="board"?"overview":s}
/* the Overview's milestones, in reading order */
var MS=[["h8-versec","verdict"],["h8-flw","next-trades"],["h8-prev","one-round"],["h8-rec","record"],["h8-castsec","cast"],["h8-solsec","smart-or-lucky"],["h8-betsec","bet"],["h8-endw","end"]];
(W.H48HOOK=W.H48HOOK||[]).push(function(root){if(!("IntersectionObserver" in W))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var k=e.target.getAttribute("data-h8ms");if(k)T("section",{s:k},"sec-"+k)})},{threshold:.35});
  MS.forEach(function(m){var el=root.querySelector("."+m[0]);if(el){el.setAttribute("data-h8ms",m[1]);io.observe(el)}})});
/* films: play events do not bubble, so they are caught on the way down */
d.addEventListener("play",function(e){var v=e.target;if(!v||v.tagName!=="VIDEO"||v.loop||v.classList.contains("h49-lv"))return;
  var k=v.closest("#x2pRm")?"round":v.closest("#h48ov")&&v.closest(".h8-prev,#h8tvv,.h8-tv")?"tv":"explainer";
  T("video",{a:"play",f:k},"vid-"+k);
  if(k==="explainer"&&!v.__h8end){v.__h8end=1;v.addEventListener("ended",function(){T("video",{a:"end",f:k},"vid-end-"+k)})}},true);
d.addEventListener("click",function(e){var t=e.target;if(!t||!t.closest)return;
  var a=t.closest("a.h8-hlb,a[href*='app.hyperliquid.xyz']");
  if(a){var box=a.closest("[data-h8hl]"),m=/trade\/([^?#]+)/.exec(a.getAttribute("href")||"");
    T("follow-hl",{t:box?box.getAttribute("data-h8hl"):(m?decodeURIComponent(m[1]):""),where:where(a)});return}
  var b=t.closest("#h48up button.h8-sw,#h48lb button.h8-sw,#h48lb [role=tab]");
  if(b){var g=b.getAttribute("data-uf")?"upcoming":(b.getAttribute("data-g")||"leaderboard"),v=b.getAttribute("data-uf")||b.getAttribute("data-k")||(b.textContent||"").trim().slice(0,24);
    T("filter",{g:g,v:v},"flt-"+g+"-"+v)}},true);
})();
