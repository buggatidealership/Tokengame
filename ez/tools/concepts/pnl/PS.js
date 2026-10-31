/* PS · Sector leaders at a glance (owner's friend: "I just want to see who's the best in sector"): in each row the best right/made
   ratio gets a crown (ties share it); a row where all four tie (Materials, 1 round) gets none. window.__pnSec: "g" gold cells, "c"
   crowns only with the rest dimmed. */
(function(){var pt=document.querySelector("#learn");pt.classList.add(window.__pnSec==="c"?"pn-c":"pn-g");
  pt.querySelectorAll("table.pt-sg tr").forEach(function(tr){var td=[].slice.call(tr.querySelectorAll("td"));if(!td.length)return;
    var v=td.map(function(c){var m=c.textContent.match(/(\d+)\/(\d+)/);return m&&+m[2]?+m[1]/+m[2]:-1}),mx=Math.max.apply(null,v);
    if(mx<=0||v.every(function(x){return x===mx}))return;td.forEach(function(c,i){if(v[i]===mx){c.classList.add("pn-k");c.insertAdjacentHTML("beforeend",'<span class="pn-cr" aria-label="Leads this sector">👑</span>')}})})})();
