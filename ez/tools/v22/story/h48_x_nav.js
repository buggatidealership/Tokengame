/* round H50 "nav" (launch day, 2026-11-04, from the pre-launch QA sweep): the address follows the round view.
   (1) A round link (a record tile, an Upcoming row, a next-trade card) used to open the round in place without touching the address
       (routes.js: preventDefault, openRound), so Back left the site while a card was open. On X6+ the link now sets #/round/N: the
       router opens the round over the tab as a shared link does, and Back closes it. The round view's own arrows already did this.
   (2) The "In play" pill linked to #round-N and jumped X2+'s record carousel, which X6+ never shows: it now opens round N.
   (3) Closing a round (the cross, Escape, a tap outside) left #/round/N in the address, so a reload opened the card again: the address
       goes back to the tab under the card (the Overview, Upcoming or the Leaderboard), with no new history entry. */
(function(){var W=window,d=document,H=d.documentElement;if(!H.classList.contains("h48"))return;
function isRound(){return /^#\/round\//.test(location.hash)}
d.addEventListener("click",function(e){if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button)return;var t=e.target;if(!t||!t.closest)return;
  var lc=t.closest("#liveChip");
  if(lc){var m=/#round-(\d+)/.exec(lc.getAttribute("href")||"")||/#\/round\/(\d+)/.exec(lc.getAttribute("href")||"");if(!m)return;
    e.preventDefault();e.stopPropagation();location.hash="#/round/"+m[1];return}
  var a=t.closest('a[href^="#/round/"]');if(!a||a.closest("#x2pRm"))return;
  var h=a.getAttribute("href");if(location.hash===h)return;
  e.preventDefault();location.hash=h},true);
/* the pill's own address, for a long press or a new tab */
function pill(){var lc=d.getElementById("liveChip"),m=lc&&/#round-(\d+)/.exec(lc.getAttribute("href")||"");if(m)lc.setAttribute("href","#/round/"+m[1])}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",function(){pill();setTimeout(pill,1500)});else pill();
/* Back to a tab while a round is open closes the round (the router closes it over the Overview, not over Upcoming) */
W.addEventListener("hashchange",function(){if(isRound()||!d.getElementById("x2pRm"))return;var x=d.querySelector("#x2pRm .x2p-rmx");if(x)x.click();else d.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))});
/* closing: the round view (#x2pRm) leaves the page; once it is gone for good, the address is the tab under it again */
new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.removedNodes,function(x){if(x.nodeType!==1||x.id!=="x2pRm")return;
  setTimeout(function(){if(d.getElementById("x2pRm")||!isRound())return;var s=H.getAttribute("data-sec");
    history.replaceState(history.state,"",s==="upcoming"?"#/upcoming":s==="leaderboard"?"#/leaderboard":"#/")},500)})})}).observe(d.body,{childList:true});
})();
