/* round H49 A "anim" (2026-11-04, owner: "we need to animate Elon... each character has to be animated as well"): the cast comes alive.
   Each of the four Saturday-morning cast paintings plays as a seamless 5 s painted loop wherever it is shown big: Meet the cast (.h8-pic),
   the golden ticket's window on the Overview (.h8-gtface, the season leader) and the Leaderboard's "Who to follow" portrait (#h48lb .h8-por).
   The loops are Hedra kling-v3 image-to-video (1080p, pro, 5 s, no audio; $0.56 each) with the 768x1024 master of each still
   (tools/concepts/worlds/cartoon/saturday/img/cast-<m>.jpg) as first and last frame. Made into loops by dropping Kling's last frame (the
   start image again) and crossfading the last 10 frames' continuation into the first 10, so the wrap flows: 110 frames, 4.6 s, 24 fps,
   600x800 (the stills' size, 2.2x the desktop card), mp4 h264 CRF 20 faststart and webm VP9 CRF 38; mouths closed, faces on model,
   no lettering in any frame (checked frame by frame). A take that drifts off model is re-rolled once, else the still stays.
   The painting stays in the page as an <img> (its alt text, and the picture with reduced motion, save-data or a slow connection); the
   video sits over it, hidden until it really plays a frame, so nothing ever flashes. A loop loads and plays only while on screen and
   pauses off screen. While the explainer film plays ("How it works": x2p_top.js's .f4-v, or X2+'s .x2p-vt) the loops hold still and never
   ask to play (x2plus.js holds scripted play() then); they carry on when it pauses or ends.
   Take b since 2026-11-04 (owner: "a bit more noticeable"): one clear beat each (Grok's grin and wink, Claude's grin and notebook taps,
   GPT's grin and coin flip, Kimi's grin and helmet pats). Take c since 2026-11-04, later (owner: the old attitudes): Grok's arrogant
   sideways smirk, Sam's trust-me-bro side-eye with the coin, Dario thumbing through the notebook, Kimi's little closed-mouth smirk. Media (written out so make_site.py copies them): media/h49-cast-grok.mp4 media/h49-cast-grok.webm media/h49-cast-claude.mp4
   media/h49-cast-claude.webm media/h49-cast-gpt.mp4 media/h49-cast-gpt.webm media/h49-cast-kimi.mp4 media/h49-cast-kimi.webm */
(function(){var W=window,d=document,H=d.documentElement;if(!H.classList.contains("h48"))return;
var LOOP={"h48-cast-grok.jpg":["media/h49-cast-grok-c.mp4","media/h49-cast-grok-c.webm"],"h48-cast-claude.jpg":["media/h49-cast-claude-c.mp4","media/h49-cast-claude-c.webm"],
  "h48-cast-gpt.jpg":["media/h49-cast-gpt-c.mp4","media/h49-cast-gpt-c.webm"],"h48-cast-kimi.jpg":["media/h49-cast-kimi-c.mp4","media/h49-cast-kimi-c.webm"]};
var SEL=".h8-pic>img, .h8-gtface>img, #h48lb .h8-por>img";
var mq=W.matchMedia?matchMedia("(prefers-reduced-motion: reduce)"):null;
function still(){var c=navigator.connection;return (mq&&mq.matches)||(c&&(c.saveData||/(^|-)2g$/.test(c.effectiveType||"")))}
var io=null,live=[];
/* the explainer film: while it plays, the loops hold still; they carry on when it pauses or ends */
var FILM=".x2p-vt video, video.f4-v";
function busy(){return [].some.call(d.querySelectorAll(FILM),function(e){return !e.paused&&!e.ended})}
function isFilm(e){var t=e.target;return t&&t.matches&&t.matches(FILM)}
d.addEventListener("play",function(e){if(isFilm(e))live.forEach(stop)},true);
["pause","ended"].forEach(function(k){d.addEventListener(k,function(e){if(isFilm(e))setTimeout(function(){live.forEach(go)},0)},true)});
function go(v){if(still()||d.hidden||!v.__h49in||busy())return;
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
/* once the cover is up: every painting already on the page (the Leaderboard too, when the visit starts there), then any the page adds
   later (the Leaderboard is built when its tab first shows and rebuilt on a window change or a resize). Nothing runs before the lift. */
var t=0;function soon(){if(!t)t=setTimeout(function(){t=0;scan()},120)}
later(function(){scan();new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes;for(var j=0;j<a.length;j++){var n=a[j];
  if(n.nodeType===1&&(n.tagName==="IMG"||n.querySelector&&n.querySelector("img"))){soon();return}}}}).observe(d.body||H,{childList:true,subtree:true})});
/* reduced motion switched on: every loop stops and the painting shows; off again: the loops on screen play */
if(mq){var mc=function(){if(mq.matches)live.forEach(function(v){stop(v);v.classList.remove("h49-on")});else{scan();live.forEach(go)}};
  if(mq.addEventListener)mq.addEventListener("change",mc);else if(mq.addListener)mq.addListener(mc)}
d.addEventListener("visibilitychange",function(){live.forEach(d.hidden?stop:go)});
})();
