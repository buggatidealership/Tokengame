/* round H49 A "anim" (2026-11-04, owner: "we need to animate Elon... each character has to be animated as well"): the cast comes alive.
   Each of the four Saturday-morning cast paintings plays as a seamless 5 s painted loop wherever it is shown big: Meet the cast (.h8-pic),
   the golden ticket's window on the Overview (.h8-gtface, the season leader) and the Leaderboard's "Who to follow" portrait (#h48lb .h8-por).
   The loops are Hedra kling-v3 image-to-video with the still as first and last frame, so frame 0 is the poster and the seam is the still.
   The painting stays in the page as an <img> (its alt text, and the picture with reduced motion, save-data or a slow connection); the
   video sits over it, hidden until it really plays a frame, so nothing ever flashes. A loop loads and plays only while on screen and
   pauses off screen; it never starts while the explainer film plays (x2plus.js holds scripted play() then), it waits for its pause.
   Media (written out so make_site.py copies them): media/h49-cast-grok.mp4 media/h49-cast-grok.webm media/h49-cast-claude.mp4
   media/h49-cast-claude.webm media/h49-cast-gpt.mp4 media/h49-cast-gpt.webm media/h49-cast-kimi.mp4 media/h49-cast-kimi.webm */
(function(){var W=window,d=document,H=d.documentElement;if(!H.classList.contains("h48"))return;
var LOOP={"h48-cast-grok.jpg":["media/h49-cast-grok.mp4","media/h49-cast-grok.webm"],"h48-cast-claude.jpg":["media/h49-cast-claude.mp4","media/h49-cast-claude.webm"],
  "h48-cast-gpt.jpg":["media/h49-cast-gpt.mp4","media/h49-cast-gpt.webm"],"h48-cast-kimi.jpg":["media/h49-cast-kimi.mp4","media/h49-cast-kimi.webm"]};
var SEL=".h8-pic>img, .h8-gtface>img, #h48lb .h8-por>img";
var mq=W.matchMedia?matchMedia("(prefers-reduced-motion: reduce)"):null;
function still(){var c=navigator.connection;return (mq&&mq.matches)||(c&&(c.saveData||/(^|-)2g$/.test(c.effectiveType||"")))}
var io=null,live=[];
/* the explainer film (X2+'s .x2p-vt) holds every other video while it plays: wait for it to stop instead of asking */
function busy(){var e=d.querySelector(".x2p-vt video");return e&&!e.paused&&!e.ended?e:null}
function go(v){if(still()||d.hidden||!v.__h49in)return;var e=busy();
  if(e){if(!e.__h49w){e.__h49w=1;var r=function(){e.__h49w=0;e.removeEventListener("pause",r);e.removeEventListener("ended",r);live.forEach(go)};e.addEventListener("pause",r);e.addEventListener("ended",r)}return}
  if(!v.__h49src){v.__h49src=1;v.__h49s.forEach(function(s,i){var o=d.createElement("source");o.src=s;o.type=i?"video/webm":"video/mp4";v.appendChild(o)})}
  if(v.paused){var p=v.play();if(p&&p.catch)p.catch(function(){})}}
function stop(v){if(!v.paused)v.pause()}
function obs(){if(io||!("IntersectionObserver" in W))return io;
  io=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;v.__h49in=e.isIntersecting;if(e.isIntersecting)go(v);else stop(v)})},{rootMargin:"120px 0px"});return io}
/* one painting: a muted looping video laid exactly over it, the same crop (object-fit and object-position come from the CSS) */
function up(img){var b=(img.getAttribute("src")||"").split("/").pop(),s=LOOP[b],box=img.parentNode;if(!s||!box||box.querySelector(":scope>video.h49-lv"))return;
  var v=d.createElement("video");v.className="h49-lv";v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;v.preload="none";
  ["muted","loop","playsinline","disablepictureinpicture","disableremoteplayback"].forEach(function(a){v.setAttribute(a,"")});
  v.setAttribute("aria-hidden","true");v.tabIndex=-1;v.poster=img.getAttribute("src");v.__h49s=s;
  v.addEventListener("playing",function(){v.classList.add("h49-on")});
  box.classList.add("h49-box");box.appendChild(v);live.push(v);if(obs())io.observe(v)}
function scan(r){if(still())return;[].forEach.call((r||d).querySelectorAll(SEL),up);
  live=live.filter(function(v){if(v.isConnected)return true;if(io)io.unobserve(v);return false})}
/* nothing loads before the cover lifts: the loops wait for the finished page */
var ready=false,queued=[];function later(f){if(ready)f();else queued.push(f)}
(function lift(){if(H.classList.contains("x2p-cur"))return setTimeout(lift,300);setTimeout(function(){ready=true;queued.splice(0).forEach(function(f){f()})},400)})();
/* the Overview, as h48_ov.js builds it */
(W.H48HOOK=W.H48HOOK||[]).push(function(root){later(function(){scan(root)})});
/* the Leaderboard (built when its tab first shows, rebuilt on a window change or a resize) and any later rebuild of the Overview */
var t=0;function soon(){if(!t)t=setTimeout(function(){t=0;later(function(){scan()})},120)}
new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes;for(var j=0;j<a.length;j++){var n=a[j];
  if(n.nodeType===1&&(n.tagName==="IMG"||n.querySelector&&n.querySelector("img"))){soon();return}}}}).observe(d.body||H,{childList:true,subtree:true});
/* reduced motion switched on: every loop stops and the painting shows; off again: the loops on screen play */
if(mq){var mc=function(){if(mq.matches)live.forEach(function(v){stop(v);v.classList.remove("h49-on")});else{scan();live.forEach(go)}};
  if(mq.addEventListener)mq.addEventListener("change",mc);else if(mq.addListener)mq.addListener(mc)}
d.addEventListener("visibilitychange",function(){live.forEach(d.hidden?stop:go)});
})();
