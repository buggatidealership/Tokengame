/* r2 C · Next AI: a smaller ticket hanging under the board where "As it stands" was, tilted like it, its stub printed in red ink with
   "No. 5" knocked out to the card (the one red stub on the board, so it cannot be missed), the four logos in colour beside the words */
var R=window.R34,st=document.getElementById("standings"),fl=st.querySelector(".x2p-flip");if(!fl)return;
if(!st.querySelector(".r34n-cw")){var w=document.createElement("div");w.className="r34n-cw";
  w.innerHTML='<div class="r34n-c"><span class="r34n-cst" aria-hidden="true"><i>No.</i><b>5</b></span><span class="r34n-cb"><span class="r34n-crow"><span class="r34n-hd">Next AI</span>'+
    R.next.map(function(m){return R.logo(m)}).join("")+'</span><span class="r34n-fine">Paid by 31% of creator fees</span></span></div>'+
    '<p class="sr">Ticket number 5: the next AI, one of '+R.names+', paid for by 31% of our creator fees.</p>';
  fl.parentNode.insertBefore(w,fl.nextSibling)}
