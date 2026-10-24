/* r2 T · Provisional slip: the entry form's carbon copy, thin pink paper, typed in blue carbon ink (Special Elite), straight edges, a
   little askew: "Provisional entry No. 5 / Challenger: Qwen (Alibaba) / Status: training camp", Qwen's mark in its colour; the next
   pick typed as names with "TBD" stamped in red */
var R=window.R34,m=R.next[0];
if(!document.getElementById("r2tFont")){var l=document.createElement("link");l.id="r2tFont";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Special+Elite&display=block";document.head.appendChild(l)}
R.ticket("r34n-t",'<span class="t-main"><i class="t-k">Provisional entry</i><span class="t-row">'+R.logo(m)+'<b>'+m.name+'</b>'+R.flag(m)+'</span><small>In training camp</small></span>'+
  '<span class="t-six"><small>No. 6</small><span>'+R.next.slice(1).map(function(x){return x.name}).join(" / ")+'</span><em>TBD</em></span>',
  "Provisional entry number 5: challenger "+m.name+", in training camp. Number 6 to be decided: "+R.next.slice(1).map(function(x){return x.name}).join(", ")+".");
