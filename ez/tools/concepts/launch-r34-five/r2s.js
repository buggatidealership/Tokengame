/* r2 S · Camp pass: not a ticket at all but the pass a fighter wears in camp: rounded corners instead of scallops, a cool white card with
   the league's grain, a lanyard slot where the stub is, a green band "Training camp · No. 5", Qwen as the holder; the other three on
   the pass's foot as "Then one of these" */
var R=window.R34,m=R.next[0];
R.ticket("r34n-s",'<span class="s-band"><span>Training camp</span><span>Pass</span></span><span class="s-main"><i class="s-k">Next challenger</i><span class="s-row">'+R.logo(m)+'<b>'+m.name+'</b>'+R.flag(m)+'</span></span>'+
  '<span class="s-then"><i>Then one of these</i><span class="s-l">'+R.next.slice(1).map(function(x){return '<span class="s-m">'+R.mark(x,"r34n-svg")+'</span>'}).join("")+'</span></span>',
  "Training camp pass number 5: next challenger, "+m.name+". Then one of "+R.next.slice(1).map(function(x){return x.name}).join(", ")+".");
var st=document.querySelector("li.r34n-s .r34n-st");if(st&&!st.querySelector(".s-slot")){var sl=document.createElement("span");sl.className="s-slot";st.insertBefore(sl,st.firstChild)}
