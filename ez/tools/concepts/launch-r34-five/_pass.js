/* shared: build a camp pass (cls, band left, band right, label, the name block, the foot) on the No. 5 ticket */
var R=window.R34;
R.pass=function(cls,bl,br,label,nameHtml,thenLabel,sr){var m=R.next[0];
  var li=R.ticket("pass "+cls,'<span class="p-band"><span>'+bl+'</span><span>'+br+'</span></span><span class="p-main"><i class="p-k">'+label+'</i>'+nameHtml+'</span>'+
    '<span class="p-then"><i>'+thenLabel+'</i><span class="p-l">'+R.next.slice(1).map(function(x){return '<span class="p-m">'+R.mark(x,"r34n-svg")+'</span>'}).join("")+'</span></span>',sr);
  var st=li&&li.querySelector(".r34n-st");if(st&&!st.querySelector(".p-slot")){var sl=document.createElement("span");sl.className="p-slot";st.insertBefore(sl,st.firstChild)}return li};
