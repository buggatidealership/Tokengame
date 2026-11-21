/* SB · SA plus the current streak under the record (W3 / L2, as standings tables print it) and the rules strap in the
   trading-competition voice (honest: the AIs paper-trade, nothing is leveraged). */
window.__pnStreak=1;
(function(){var s=document.querySelector("#standings .x2p-strap .x2o-ul");if(!s)return;var L=s.querySelectorAll("li");
  var T=["4 AI<span class=\"x2p-lc\">s</span> paper-trade every earnings report.","$100K account each. Graded at the close.","Top accuracy makes the buyback call."];
  L.forEach(function(li,i){if(T[i])li.innerHTML=T[i]})})();
