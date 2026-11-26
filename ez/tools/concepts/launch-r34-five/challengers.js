/* 2 · Challengers approaching: the fight-night bill's voice (a new fighter's "Here comes a new challenger"): under the board, where
   "As it stands" was, a printed fight card with four locked seats, each a "?" medallion printed in screened ink in a die-cut window,
   numbered Seat 5 to Seat 8. No names (no public promise; the reveal is the next post on X). The red foot band says who pays the
   entry: 31% of creator fees. */
var st=document.getElementById("standings"),fl=st.querySelector(".x2p-flip");if(!fl)return;
var c=st.querySelector(".r34f-ch");if(!c){c=document.createElement("div");c.className="r34f-ch r34f-card";
  var seats=[5,6,7,8].map(function(n){return '<li><span class="r34f-md" aria-hidden="true"><b>?</b></span><span class="r34f-sn" data-line>Seat '+n+'</span></li>'}).join("");
  c.innerHTML='<p class="r34f-hd" aria-hidden="true"><i>★</i><span data-line>New challengers approaching</span><i>★</i></p>'+
    '<ol class="r34f-seats" aria-hidden="true">'+seats+'</ol>'+
    '<p class="r34f-ft" aria-hidden="true"><span data-line>Entry paid by 31% of creator fees</span></p>'+
    '<p class="sr">New challengers approaching: four more seats on the board, paid for by 31% of our creator fees.</p>';
  fl.parentNode.insertBefore(c,fl.nextSibling)}
