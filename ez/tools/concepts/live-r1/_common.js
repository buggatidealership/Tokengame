/* live-r1 shared helpers: a pill in place of #liveChip, text escaping, a once-a-minute refresh */
window.lvE=function(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
window.lvPill=function(cls,html,label){var lc=document.querySelector("#liveChip");var a=document.createElement("a");a.className="lv-pill "+cls;a.href="#/upcoming";
  if(label)a.setAttribute("aria-label",label);a.innerHTML=html;if(lc){lc.after(a)}document.documentElement.classList.add("lv-has");return a};
/* the range of round numbers, "43–45" or "46" */
window.lvRange=function(L){if(!L.length)return "";var a=L[0].n,b=L[L.length-1].n;return a===b?String(a):a+"–"+b};
window.lvUp=function(s){return String(s).toUpperCase()};
