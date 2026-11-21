/* camp pass 4 · Green card: the whole pass in the brand's green card stock with the league's grain, cream ink, a lanyard slot, no gold
   and no foil (those are the league's); "Rookie" on the band */
/* shared: build a camp pass (cls, band left, band right, label, the name block, the foot) on the No. 5 ticket */
var R=window.R34;
R.pass=function(cls,bl,br,label,nameHtml,thenLabel,sr){var m=R.next[0];
  var li=R.ticket("pass "+cls,'<span class="p-band"><span>'+bl+'</span><span>'+br+'</span></span><span class="p-main"><i class="p-k">'+label+'</i>'+nameHtml+'</span>'+
    '<span class="p-then"><i>'+thenLabel+'</i><span class="p-l">'+R.next.slice(1).map(function(x){return '<span class="p-m">'+R.mark(x,"r34n-svg")+'</span>'}).join("")+'</span></span>',sr);
  var st=li&&li.querySelector(".r34n-st");if(st&&!st.querySelector(".p-slot")){var sl=document.createElement("span");sl.className="p-slot";st.insertBefore(sl,st.firstChild)}return li};

R.pass('pgr','Training camp','Rookie','Next challenger','<span class="p-row">'+R.logo(R.next[0])+'<b>'+R.next[0].name+'</b>'+R.flag(R.next[0])+'</span>','Then one of these',"Training camp pass, number 5: "+R.next[0].name+", on a tryout. Then one of "+R.next.slice(1).map(function(x){return x.name}).join(", ")+".");
