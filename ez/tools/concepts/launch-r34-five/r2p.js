/* r2 style P · The stub: a smaller ticket hanging under the board where "As it stands" was, tilted like it, its stub printed in red ink
   with "No. 5" knocked out (the one red stub on the board), "Next challenger", Qwen's mark in its colour, its name and flag */
var R=window.R34,m=R.next[0],st=document.getElementById("standings"),fl=st.querySelector(".x2p-flip");if(!fl)return;
if(!st.querySelector(".r34n-cw")){var w=document.createElement("div");w.className="r34n-cw r34n-p";
  w.innerHTML='<div class="r34n-c"><span class="r34n-cst" aria-hidden="true"><i>No.</i><b>5</b></span><span class="r34n-cb"><span class="r34n-hd r34n-pk">Next challenger</span><span class="r34n-crow">'+
    R.logo(m)+'<b class="r34n-pn">'+m.name+'</b>'+R.flag(m)+'</span></span></div>'+
    '<p class="sr">Ticket number 5: next challenger, '+m.name+', paid for by 31% of our creator fees.</p>';
  fl.parentNode.insertBefore(w,fl.nextSibling)}
