/* camp pass 2 · Filled in by hand: plain grey board (no cream, no foil), printed field rules, the name written in black marker on the
   line (Permanent Marker), "Tryout" rubber-stamped in green; the league's tickets are printed, the rookie's is written in */
if(!document.getElementById("r2vFont")){var l=document.createElement("link");l.id="r2vFont";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=block";document.head.appendChild(l)}
/* shared: build a camp pass (cls, band left, band right, label, the name block, the foot) on the No. 5 ticket */
var R=window.R34;
R.pass=function(cls,bl,br,label,nameHtml,thenLabel,sr){var m=R.next[0];
  var li=R.ticket("pass "+cls,'<span class="p-band"><span>'+bl+'</span><span>'+br+'</span></span><span class="p-main"><i class="p-k">'+label+'</i>'+nameHtml+'</span>'+
    '<span class="p-then"><i>'+thenLabel+'</i><span class="p-l">'+R.next.slice(1).map(function(x){return '<span class="p-m">'+R.mark(x,"r34n-svg")+'</span>'}).join("")+'</span></span>',sr);
  var st=li&&li.querySelector(".r34n-st");if(st&&!st.querySelector(".p-slot")){var sl=document.createElement("span");sl.className="p-slot";st.insertBefore(sl,st.firstChild)}return li};

var li=R.pass('ph','Training camp','Camp invite','Name','<span class="p-row">'+R.logo(R.next[0])+'<b class="p-hand">'+R.next[0].name+'</b>'+R.flag(R.next[0])+'<em class="p-stamp">Tryout</em></span>','Next up: one of these',"Training camp pass, number 5: "+R.next[0].name+", on a tryout. Then one of "+R.next.slice(1).map(function(x){return x.name}).join(", ")+".");
