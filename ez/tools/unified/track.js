/* visitor analytics, as on X2+ (owner, 2026-10-22): Umami Cloud, cookieless, on the live domain only, and off until UMAMI_ID
   holds the site's Website ID. Events go once per page load: sections reached, the films, a die tapped, taps on the X links.
   localStorage "ez-track-debug" = 1 logs them to the console instead. */
(function(){try{
  var UMAMI_ID="";
  var live=/^(www\.)?earningszn\.xyz$/.test(location.hostname),dbg=false;
  try{dbg=localStorage.getItem("ez-track-debug")==="1"}catch(e){}
  var on=dbg||(live&&!!UMAMI_ID),sent={},q=[];
  function send(n,d){if(dbg){console.log("[ez-track]",n||"pageview",d||{});return}
    if(window.umami&&umami.track){if(n)umami.track(n,d);else umami.track()}else q.push([n,d])}
  window.__ezTrack=function(n,d,once){if(!on)return;if(once){if(sent[once])return;sent[once]=1}send(n,d)};
  if(!on)return;
  if(!dbg){var sc=document.createElement("script");sc.defer=true;sc.src="https://cloud.umami.is/script.js";
    sc.setAttribute("data-website-id",UMAMI_ID);sc.setAttribute("data-domains","earningszn.xyz,www.earningszn.xyz");
    sc.setAttribute("data-auto-pageview","false");sc.onload=function(){var x;while(x=q.shift())send(x[0],x[1])};document.head.appendChild(sc)}
  window.__ezTrack();
  addEventListener("DOMContentLoaded",function(){if(!("IntersectionObserver" in window))return;
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)window.__ezTrack("section",{s:e.target.id},"sec-"+e.target.id)})},{threshold:.4});
    document.querySelectorAll("main>.sec").forEach(function(s){io.observe(s)})});
}catch(e){}})();
