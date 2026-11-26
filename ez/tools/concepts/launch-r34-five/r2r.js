/* r2 R · Two tickets: No. 5 on kraft (Qwen, in training camp) and under it a No. 6 the league's cream but not printed yet: the three
   candidates pressed into it without ink, "Then one of these" in ink, so the order reads 5 then 6 */
var R=window.R34,m=R.next[0];
var li=R.ticket("r34n-q r34n-r",'<span class="q-main"><i class="q-k">Next challenger</i><span class="q-row">'+R.logo(m)+'<b>'+m.name+'</b>'+R.flag(m)+'</span><small>In training camp</small></span>'+
  '<span class="r-note"><span>Calls start after camp</span></span>',
  "Ticket number 5: next challenger, "+m.name+", in training camp.");
var ol=li.parentNode,row=ol.querySelector("li.lbr:not(.lead)")||ol.querySelector("li.lbr");
if(!ol.querySelector("li.r34n-six")){var s=document.createElement("li");s.className="r34n-six";
  s.innerHTML='<span class="r34n-st" aria-hidden="true"><i>No.</i><b>6</b></span><span class="r-six-t"><b>Then one of these</b><small>Not printed yet</small></span><span class="r-six-l">'+
    R.next.slice(1).map(function(x){return '<i class="r-bm">'+R.mark(x,"r34n-svg")+'</i>'}).join("")+'</span><span class="sr">Ticket number 6: one of '+R.next.slice(1).map(function(x){return x.name}).join(", ")+'.</span>';
  ol.appendChild(s);var sync=function(){s.style.gridTemplateColumns=getComputedStyle(row).gridTemplateColumns};sync();if(document.fonts)document.fonts.ready.then(sync)}
