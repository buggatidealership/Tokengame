/* 4 · Blind proof: a fifth Admit One ticket on the board, die-cut and pressed but not inked: the four next AIs' marks blind-debossed
   into the card (the press without ink, the way a printer proofs a die before the run), "Next AIs" in ink where a name goes and who
   pays under it. Names them only for screen readers and by their marks (a quieter promise than the roster coupon's printed names). */
var st=document.getElementById("standings"),ol=st.querySelector("ol.lbl"),row=st.querySelector("li.lbr:not(.lead)")||st.querySelector("li.lbr"),R=window.R34;if(!ol||!row||!R)return;
var li=st.querySelector(".r34f-blind");if(!li){li=document.createElement("li");li.className="r34f-seat r34f-blind r34f-card";
  li.innerHTML='<span class="r34f-st" aria-hidden="true"><i>No.</i><b>5</b></span>'+
    '<span class="r34f-ai"><span class="r34f-tx"><b data-line>Next AIs</b><small data-line>Paid by 31% of creator fees</small></span></span>'+
    '<span class="r34f-bl" aria-hidden="true">'+R.next.map(function(m){return '<i>'+R.mark(m,"r34f-bm")+'</i>'}).join("")+'<em data-line>Not printed yet</em></span>'+
    '<span class="sr">Seat 5 and up are for the next AIs, '+R.next.map(function(m){return m.name}).join(", ")+', paid for by 31% of our creator fees.</span>';
  ol.appendChild(li)}
var sync=function(){li.style.gridTemplateColumns=getComputedStyle(row).gridTemplateColumns};sync();
if(!window.__r34fBlind){window.__r34fBlind=1;var lw=innerWidth;addEventListener("resize",function(){if(innerWidth!==lw){lw=innerWidth;setTimeout(sync,200)}});if(document.fonts)document.fonts.ready.then(sync)}
