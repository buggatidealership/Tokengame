/* round H50 "follow" (launch day, 2026-11-04, owner: "only show follow on Hyperliquid only while the trade can still be entered before
   the report"). A Follow button (and its open-interest and market line, .h8-hl[data-h8hl=TICKER]) shows only before the company's report:
   until 4 pm New York on the day the trade drops (an after-the-close report comes later that evening, a before-the-open one the next
   morning), or, for a round graded on the day its trade drops (a before-the-open report that day), until 6 am New York that morning.
   Hyperliquid trades round the clock, so the move happens at the report, not at the next open. Checked when a card is drawn and every 30 s,
   so a button leaves the page on its own at the cutoff; a company with no trade in yet shows no button anyway. */
(function(){var W=window,d=document,H=d.documentElement;if(!H.classList.contains("h48"))return;
function md(s){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);return m?{y:2000+(+m[3]%100),mo:+m[1],d:+m[2]}:null}
/* the UTC time of hh:00 in New York on a given day (the offset read from Intl, so daylight saving is right) */
function nyAt(o,hh){var g=Date.UTC(o.y,o.mo-1,o.d,hh+5,0,0);try{var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",hour:"2-digit",hour12:false}).formatToParts(new Date(g)),h=+p.filter(function(x){return x.type==="hour"})[0].value%24;return g+(hh-h)*3600e3}catch(e){return g}}
function cut(r){var c=md(r.called),g=md(r.resolves);if(!c)return 0;var same=g&&g.y===c.y&&g.mo===c.mo&&g.d===c.d;return nyAt(c,same?6:16)}
function rounds(t){return (W.PENDING||[]).filter(function(r){return r.ticker===t||String(r.ticker).split(".")[0]===t})}
function apply(){var now=Date.now();[].forEach.call(d.querySelectorAll(".h8-hl[data-h8hl]"),function(el){
  var rs=rounds(el.getAttribute("data-h8hl"));if(!rs.length)return;
  /* the soonest round of that company still before its cutoff decides; none left, the follow line goes */
  var open=rs.some(function(r){var c=cut(r);return c&&now<c});el.classList.toggle("h8-hl-off",!open)})}
(W.H48HOOK=W.H48HOOK||[]).push(function(){apply()});
var t=0;new MutationObserver(function(){clearTimeout(t);t=setTimeout(apply,60)}).observe(d.documentElement,{childList:true,subtree:true});
setInterval(apply,30000);
W.__h50FollowCut=function(t){return rounds(t).map(function(r){return {n:r.n,cut:new Date(cut(r)).toISOString()}})};
})();
