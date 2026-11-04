/* round H50 "nav" (launch day, 2026-11-04, from the pre-launch QA sweep): the address follows the round view.
   (1) A round link (a record tile, an Upcoming row, a next-trade card) used to open the round in place without touching the address
       (routes.js: preventDefault, openRound), so Back left the site while a card was open. On X6+ the link now sets #/round/N: the
       router opens the round over the tab as a shared link does, and Back closes it. The round view's own arrows already did this.
   (2) The "In play" pill linked to #round-N and jumped X2+'s record carousel, which X6+ never shows: it now opens round N.
   (3) Closing a round (the cross, Escape, a tap outside) left #/round/N in the address, so a reload opened the card again: the address
       goes back to the tab under the card (the Overview, Upcoming or the Leaderboard), with no new history entry. */
(function(){var W=window,d=document,H=d.documentElement;if(!H.classList.contains("h48"))return;
/* (launch-day QA) X2's old tab addresses (#/results, #/buyback, #/models, #/model/N) sat on the cover for its 9.5 s net before
   landing on the Overview: they go straight there */
if(/^#\/(results|buyback|models?)(\/|$)/.test(location.hash))history.replaceState(history.state,"",location.pathname+location.search+"#/");
/* (launch-day QA) the page is built once, so a tab left open over night kept "Today, Wed Nov 4" and never saw newer results: when a
   tab comes back into view on another New York day, or after six hours, it loads again (a round left open is the address it keeps) */
var NYK=function(){try{return new Intl.DateTimeFormat("en-CA",{timeZone:"America/New_York"}).format(new Date())}catch(e){return ""}},k0=NYK(),t0=Date.now();
d.addEventListener("visibilitychange",function(){if(d.hidden)return;if(NYK()!==k0||Date.now()-t0>6*3600e3)location.reload()});
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
/* (device QA) on a short phone screen (iPhone Safari 390x664, SE 375x548) the round view's arrows, fixed at the foot, covered the
   bottom of the card: once the card is laid out, it is zoomed down until it clears them by 8px (phones only, never below .7) */
function clear(){var o=d.getElementById("x2pRm");if(!o||innerWidth>=760)return;var z=o.querySelector(".x2p-rmz"),rc=o.querySelector(".x2p-rmc"),n=o.querySelector(".x2p-rmn");if(!z||!rc||!n)return;
  var a=rc.getBoundingClientRect(),t=n.getBoundingClientRect().top-8;if(a.bottom<=t||!a.height)return;var k=parseFloat(z.style.zoom||getComputedStyle(z).zoom)||1,f=Math.max(.5,(t-a.top)/a.height),k2=Math.max(.7,k*f);
  if(k2>=k)return;z.style.zoom=k2;if(rc.style.width)rc.style.width=Math.round(parseFloat(rc.style.width)*k2/k)+"px"}
new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(x){if(x.nodeType===1&&x.id==="x2pRm"){requestAnimationFrame(function(){requestAnimationFrame(clear)});[500,1200,2500].forEach(function(t){setTimeout(clear,t)});var rc=x.querySelector(".x2p-rmc");if(rc&&W.ResizeObserver){var ro=new ResizeObserver(function(){if(!x.isConnected){ro.disconnect();return}clear()});ro.observe(rc)}}})})}).observe(d.body,{childList:true});
/* Back to a tab while a round is open closes the round (the router closes it over the Overview, not over Upcoming) */
W.addEventListener("hashchange",function(){if(isRound()||!d.getElementById("x2pRm"))return;var x=d.querySelector("#x2pRm .x2p-rmx");if(x)x.click();else d.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))});
/* closing: the round view (#x2pRm) leaves the page; once it is gone for good, the address is the tab under it again */
new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.removedNodes,function(x){if(x.nodeType!==1||x.id!=="x2pRm")return;
  setTimeout(function(){if(d.getElementById("x2pRm")||!isRound())return;var s=H.getAttribute("data-sec");
    history.replaceState(history.state,"",s==="upcoming"?"#/upcoming":s==="leaderboard"?"#/leaderboard":"#/")},500)})})}).observe(d.body,{childList:true});
})();
