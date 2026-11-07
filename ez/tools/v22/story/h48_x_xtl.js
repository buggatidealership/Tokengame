/* launch night, 2026-11-04 (owner: "there need to be places on the site where people can say... follow on, especially in the upcoming
   section... get predictions early on your timeline and then just the X logo... see what Grok says on your timeline"): X is where the trades
   reach people first, so the page says so where a trade is waited for: (1) the Overview's "<leader>'s next trades", a plate under the cards;
   (2) the Upcoming tab, the same plate under the next close's companies, and on a card whose leader's trade is not in yet, "Get it on X" beside
   "Not in yet"; (3) the footer, the X mark and @earningszn on every tab. One plate, one wording family; the Upcoming end card stays. The
   leader's name is read from the page (H48D), never typed. Nothing here moves. */
(function(){var W=window,d=document,H=d.documentElement;if(!H.classList.contains("h48"))return;
var X=(W.CONFIG&&CONFIG.x)||"https://x.com/earningszn",HANDLE="@"+X.replace(/\/+$/,"").split("/").pop();
var XS='<svg class="h8-xsv" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>';
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function lead(){try{var D=W.H48D&&H48D.get();if(D&&D.ord&&D.ord.length)return H48D.NAME[D.ord[0]]}catch(e){}
  try{var b=d.querySelector("#h48ov .h8-flw h2");var m=b&&/^(.+?)[’']s next trades/.exec(b.textContent);if(m)return m[1]}catch(e){}return ""}
function plate(kind){var L=lead(),hd=kind==="up"?"Get the trades on your timeline as they drop":(L?"Get "+L+"&rsquo;s next trade on your timeline":"Get the next trades on your timeline"),
  sb=kind==="up"?"All four AIs, posted on X before each company&rsquo;s earnings.":"We post every AI&rsquo;s trade on X before the earnings.";
  return '<aside class="h8-xtl h8-pl" data-h8xtl="'+kind+'" aria-label="Follow on X"><span class="h8-xtlg" aria-hidden="true">'+XS+'</span>'+
    '<p class="h8-xtlt"><b>'+hd+'</b><span>'+sb+'</span></p>'+
    '<a class="h8-btn h8-xtlb" href="'+esc(X)+'" target="_blank" rel="noopener">Follow <span class="h8-xh">'+esc(HANDLE)+'</span><span class="h8-sr"> on X</span></a></aside>'}
function ov(){var s=d.querySelector("#h48ov .h8-flw .h8-wrap");if(!s||s.querySelector(".h8-xtl"))return;
  var f=s.querySelector(".h8-fine");s.insertBefore(mk(plate("ov")),f||null)}
function up(){var r=d.getElementById("h48up");if(!r)return;
  var w=r.querySelector(".h8-ubs>.h8-wrap");if(w&&!w.querySelector(".h8-xtl"))w.appendChild(mk(plate("up")));
  [].forEach.call(r.querySelectorAll(".h8-ucd .h8-nxtop.h8-no"),function(t){if(t.querySelector(".h8-xget"))return;
    var a=mk('<a class="h8-xget" href="'+esc(X)+'" target="_blank" rel="noopener">'+XS+'<span>Get it on X</span><span class="h8-sr"> (follow '+esc(HANDLE)+')</span></a>');t.appendChild(a)})}
function foot(){var f=d.querySelector("body>footer");if(!f||f.querySelector(".h8-ftx"))return;var s=f.querySelector("small");
  var a=mk('<a class="h8-ftx" href="'+esc(X)+'" target="_blank" rel="noopener">'+XS+'<span>Trades on your timeline: '+esc(HANDLE)+'</span></a>');
  if(s&&s.nextSibling)f.insertBefore(a,s.nextSibling);else f.appendChild(a)}
function mk(h){var t=d.createElement("template");t.innerHTML=h;return t.content.firstChild}
function all(){try{ov()}catch(e){}try{up()}catch(e){}try{foot()}catch(e){}}
(W.H48HOOK=W.H48HOOK||[]).push(function(){all()});
var t=0;new MutationObserver(function(){clearTimeout(t);t=setTimeout(all,40)}).observe(H,{childList:true,subtree:true});
if(d.readyState!=="loading")all();else d.addEventListener("DOMContentLoaded",all);
})();
