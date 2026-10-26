/* PA · The proof's ROI tab as P&L (owner, 2026-10-26): tabs "P&L" and "Accuracy"; the rows Biggest W / Biggest L / P&L (each AI's
   best and worst single call in dollars, then the account's P&L); the chart's line ends print the P&L % in place of the model. */
(function(){var P=PNL,pt=document.querySelector("#learn");
  pt.querySelectorAll("button[data-pt]").forEach(function(b){b.textContent={roi:"P&L",hit:"Accuracy"}[b.getAttribute("data-pt")]||b.textContent});
  pt.querySelectorAll(".pt-hd span").forEach(function(s,i){s.textContent=["Biggest W","P&L","Biggest L"][i]||s.textContent});
  pt.querySelectorAll(".pt-r").forEach(function(r){var nm=r.querySelector(".pt-nm"),m=nm&&nm.textContent.trim().toUpperCase();var t=P.A[m];if(!t)return;
    var st=r.querySelector(".pt-st"),v=r.querySelector(".pt-v:not(.pt-st)"),c=r.querySelector(".pt-c");if(!st||!v||!c)return;
    st.className="pt-v tnum pn-bw";st.innerHTML=P.usd(t.bw.v,1)+'<small>'+t.bw.t+'</small>';
    c.className="pt-c tnum pn-bl";c.innerHTML=P.usd(t.bl.v,1)+'<small>'+t.bl.t+'</small>';
    v.className="pt-v tnum pn-pl "+(t.pnl>=0?"pt-u":"pt-d");v.textContent=P.usd(t.pnl)});
  var on=pt.querySelector("button[data-pt=roi][aria-pressed=true]");if(on)pt.querySelectorAll(".pt-lb b").forEach(function(b){var m=P.byVer[(b.getAttribute("data-t")||b.textContent).trim()];if(!m)return;var t=P.A[m];
    b.textContent=P.pc(t.pct);b.setAttribute("data-t",b.textContent)})})();
