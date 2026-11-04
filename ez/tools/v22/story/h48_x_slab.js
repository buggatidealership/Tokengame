/* ===== H49 slab (EZ Live X6+ only, html.h48): a round opened big (#x2pRm) falls into the Saturday-morning show. CSS
   (h48_x_slab.css) repaints the case, the label, the card, the back and the chrome; this file only puts the show's own cels where
   X2+ had its icons: the model's cel badge (H48UI.badge) beside the winner's name and in each nameplate's well, the cel pennant
   (H48UI.flag) for the lab's flag, a brushed red cross for "Nobody", the EZ. mark (media/icon.svg) on the graded seal; and it fits
   the lettered company name and the winner's line to their plates (Caprasimo is wider than X2+'s condensed face). Every word stays
   the page's own; nothing is added to what a screen reader hears. Errors are kept in window.__h49SlabErr. ===== */
(function(){try{
var d=document,H=d.documentElement,W=window;
var KEY={grok:"GROK",claude:"CLAUDE",gpt:"GPT",kimi:"KIMI"};
function key(t){var s=String(t||"").toLowerCase();return KEY[s.replace(/[^a-z]/g,"")]||(/gpt|openai/.test(s)?"GPT":/claude|anthropic/.test(s)?"CLAUDE":/grok|xai/.test(s)?"GROK":/kimi|moonshot/.test(s)?"KIMI":null)}
/* a brushed cross, two strokes thick in the middle and tapered at the ends, red ink with the ink outline */
var CROSS='<svg class="h9s-x" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5.2 3.6c2.6 2 4.6 4.3 6.8 6.6 2.2-2.4 4.4-4.7 6.9-6.5 1.1-.8 2.5.6 1.6 1.7-2.1 2.4-4.3 4.7-6.5 6.6 2.4 2.2 4.6 4.4 6.6 6.9.8 1-.6 2.3-1.6 1.6-2.6-1.9-4.8-4.1-7-6.4-2.2 2.4-4.5 4.7-6.9 6.5-1 .7-2.3-.6-1.6-1.6 2-2.5 4.2-4.7 6.6-6.9-2.4-2.1-4.6-4.3-6.6-6.8-.8-1 .6-2.4 1.7-1.7z" fill="#c8321f" stroke="#24140c" stroke-width="1.3" stroke-linejoin="round"/></svg>';
/* step a box's font size down until its content fits its width (never below the floor) */
function fit(el,prop,start,floor){if(!el||!el.clientWidth)return;var s=start;el.style.setProperty(prop,s+"px");
  for(var n=0;n<30&&el.scrollWidth>el.clientWidth+.5&&s>floor;n++){s=Math.max(floor,s*.95);el.style.setProperty(prop,s.toFixed(2)+"px")}}
function dress(o){var U=W.H48UI;if(!U||!H.classList.contains("h48")||!o.isConnected)return;
  /* the winner: the cel badge after each name; nobody: the cross */
  [].forEach.call(o.querySelectorAll(".cwin .wn"),function(wn){if(wn.querySelector(".h9s-bd,.h9s-x"))return;var lg=wn.querySelector(".lg");if(!lg)return;
    if(lg.classList.contains("nob")){lg.insertAdjacentHTML("afterend",CROSS);return}var m=key(wn.firstChild&&wn.firstChild.nodeType===3?wn.firstChild.nodeValue:"")||key(lg.getAttribute("title"));
    if(m)lg.insertAdjacentHTML("afterend",'<span class="h9s-bd" aria-hidden="true">'+U.badge(m,22)+'</span>')});
  /* the back's nameplates: the badge in the well, the pennant for the flag */
  [].forEach.call(o.querySelectorAll(".cb .cb-r"),function(r){var nm=r.querySelector(".cb-nm"),m=nm&&key(nm.textContent);if(!m)return;
    var wc=r.querySelector(".cb-wc");if(wc&&!wc.querySelector(".h9s-wb"))wc.insertAdjacentHTML("beforeend",'<span class="h9s-wb" aria-hidden="true">'+U.badge(m,30)+'</span>');
    var fl=r.querySelector(".cb-fl");if(fl&&!r.querySelector(".h9s-fl"))fl.insertAdjacentHTML("afterend",'<span class="h9s-fl" aria-hidden="true">'+U.flag(m,20)+'</span>')});
  /* the graded seal carries the EZ. mark */
  [].forEach.call(o.querySelectorAll(".cb .cb-st:not(.cb-die)"),function(st){if(!st.querySelector(".h9s-ez"))st.insertAdjacentHTML("beforeend",'<img class="h9s-ez" src="media/icon.svg" alt="" aria-hidden="true" decoding="async">')});
  size(o)}
/* the card's own scale: X2+ lays the card out at 226 px on a phone and up to 335 px on desktop with the same label; the show's
   lettering grows with the card (at most 1.32x), so the desktop card reads as large as the phone's */
function size(o){var c=o.querySelector(".card[data-n]"),u=1;if(c&&c.offsetWidth)u=Math.max(1,Math.min(1.32,c.offsetWidth/226));if(c)c.style.setProperty("--h9u",u.toFixed(3));
  [].forEach.call(o.querySelectorAll(".fx .zlab .nm"),function(nm){fit(nm,"--h9nm",15*u,9)});
  [].forEach.call(o.querySelectorAll(".face.front .cwin"),function(x){fit(x,"--h9w",15*u,9)});
  /* a narrow label (a 320 px phone): the cert digits run under the hologram centred on the label; the bars and digits close up */
  [].forEach.call(o.querySelectorAll(".fx .zb:not(.zwhy)"),function(zb){zb.classList.remove("h9s-tz");var hl=zb.querySelector(".holo"),tx=null;
    for(var k=0;k<zb.childNodes.length;k++)if(zb.childNodes[k].nodeType===3&&zb.childNodes[k].nodeValue.trim())tx=zb.childNodes[k];if(!hl||!tx)return;
    var rg=d.createRange();rg.selectNodeContents(tx);if(rg.getBoundingClientRect().right>hl.getBoundingClientRect().left-3)zb.classList.add("h9s-tz")})}
var seen=null;
function arrive(o){if(seen===o)return;seen=o;var t=0;(function step(){if(!o.isConnected)return;try{dress(o)}catch(e){W.__h49SlabErr=e}if(++t<8)setTimeout(step,t<3?60:250)})();
  if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){if(o.isConnected)size(o)})}
function init(){new MutationObserver(function(ms){for(var i=0;i<ms.length;i++)for(var j=0;j<ms[i].addedNodes.length;j++){var x=ms[i].addedNodes[j];if(x.nodeType===1&&x.id==="x2pRm")arrive(x)}}).observe(d.body,{childList:true});
  var o=d.getElementById("x2pRm");if(o)arrive(o);
  var lw=innerWidth;addEventListener("resize",function(){if(innerWidth===lw)return;lw=innerWidth;var o=d.getElementById("x2pRm");if(o)setTimeout(function(){size(o)},80)})}
if(d.body)init();else d.addEventListener("DOMContentLoaded",init);
}catch(e){window.__h49SlabErr=e}})();
