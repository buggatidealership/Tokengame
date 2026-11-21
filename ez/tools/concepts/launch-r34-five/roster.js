/* 3 · The roster coupon: a tear-off coupon under the board, joined to it by a perforated edge, "Next on the board" with the four the
   owner named printed in one ink (their labs' own marks, multiplied into the card like the standings' logos), each name and lab under
   it; who pays, and that the order and timing are not set. Naming them is a public promise: the board must say so. */
var st=document.getElementById("standings"),fl=st.querySelector(".x2p-flip"),R=window.R34;if(!fl||!R)return;
var c=st.querySelector(".r34f-ro");if(!c){c=document.createElement("div");c.className="r34f-ro r34f-card";
  var cells=R.next.map(function(m){return '<li><span class="r34f-lg">'+R.mark(m)+'</span><b data-line>'+m.name+'</b><small data-line>'+m.lab+'</small></li>'}).join("");
  c.innerHTML='<span class="r34f-pf" aria-hidden="true"></span><p class="r34f-hd" aria-hidden="true"><span data-line>Next on the board</span></p>'+
    '<ul class="r34f-four" aria-hidden="true">'+cells+'</ul>'+
    '<p class="r34f-ft" aria-hidden="true"><span data-line>Seats paid by 31% of creator fees</span><small data-line>Order and timing not set</small></p>'+
    '<p class="sr">Next on the board: '+R.next.map(function(m){return m.name+' by '+m.lab}).join(', ')+'. Their seats are paid for by 31% of our creator fees. Order and timing are not set.</p>';
  fl.parentNode.insertBefore(c,fl.nextSibling)}
