/* 1 · Seat 5: a fifth Admit One ticket on the board itself, die-cut and printed like the four but not filled in yet: the stub's
   "No. 5", an empty logo ring, "Next AI" where a name goes (its line runs on across the empty Last 5 field), and "Reserved" stamped
   in red ink across the ROI and hit rate fields. Names no model (no public promise). The line under the name says who pays: 31% of creator fees. Its columns are the
   rows' own (copied from a row's computed grid), so every field sits under its label. */
var st=document.getElementById("standings"),ol=st.querySelector("ol.lbl"),row=st.querySelector("li.lbr:not(.lead)")||st.querySelector("li.lbr");if(!ol||!row)return;
var li=st.querySelector(".r34f-seat");if(!li){li=document.createElement("li");li.className="r34f-seat r34f-card";
  li.innerHTML='<span class="r34f-st" aria-hidden="true"><i>No.</i><b>5</b></span>'+
    '<span class="r34f-ai"><span class="r34f-ring" aria-hidden="true"></span><span class="r34f-tx"><b data-line>Next AI</b><small data-line>Paid by 31% of creator fees</small></span></span>'+
    '<span class="r34f-res" aria-hidden="true"><span class="r34f-stamp">Reserved</span></span>'+
    '<span class="sr">Seat 5 is reserved for the next AI on the board, paid for by 31% of our creator fees.</span>';
  ol.appendChild(li)}
var sync=function(){li.style.gridTemplateColumns=getComputedStyle(row).gridTemplateColumns};sync();
if(!window.__r34fSeat){window.__r34fSeat=1;var lw=innerWidth;addEventListener("resize",function(){if(innerWidth!==lw){lw=innerWidth;setTimeout(sync,200)}});if(document.fonts)document.fonts.ready.then(sync)}
