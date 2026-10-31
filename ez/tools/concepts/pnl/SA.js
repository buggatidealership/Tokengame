/* SA · Standings as a trading board: "Last 5" becomes the record (W-L, like a fighter's), "ROI" becomes P&L in dollars (% under it),
   "Hit rate" becomes Accuracy ("on direction" kept). Order unchanged (ranked by accuracy, as the site ranks today). */
(function(){var P=PNL,st=document.querySelector("#standings");
  st.querySelectorAll(".lbh span,.lbh").forEach(function(e){if(e.children.length)return;var t=e.textContent.trim();e.textContent={"Last 5":"Record","Hit rate":"Accuracy","ROI":"P&L"}[t]||e.textContent});
  st.querySelectorAll("li.lbr").forEach(function(li){var v=li.querySelector(".pc-t small"),m=v&&P.byVer[v.textContent.trim()];if(!m)return;var t=P.A[m];
    var f=li.querySelector(".lb-f2 .fq");if(f)f.outerHTML='<span class="pn-rec"><b class="w">'+t.W+'</b><i>–</i><b class="l">'+t.L+'</b>'+(window.__pnStreak?'<small class="'+(t.streak[0]==="W"?"w":"l")+'">'+t.streak+'</small>':'')+'</span>';
    var r=li.querySelector(".lb-c.roi");if(r){r.querySelector("b").textContent=P.usd(t.pnl);r.querySelector("small").textContent=P.pc(t.pct)}})})();
