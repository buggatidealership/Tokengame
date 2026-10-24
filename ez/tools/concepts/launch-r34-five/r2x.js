/* camp pass 3 · Tryout bib: not a ticket but the paper number pinned on at a tryout: white (Tyvek-like) stock, four safety-pin holes at
   the corners, the number big in black, a green strip "Tryout", Qwen as the name on the bib */
/* shared: build a camp pass (cls, band left, band right, label, the name block, the foot) on the No. 5 ticket */
var R=window.R34;
R.pass=function(cls,bl,br,label,nameHtml,thenLabel,sr){var m=R.next[0];
  var li=R.ticket("pass "+cls,'<span class="p-band"><span>'+bl+'</span><span>'+br+'</span></span><span class="p-main"><i class="p-k">'+label+'</i>'+nameHtml+'</span>'+
    '<span class="p-then"><i>'+thenLabel+'</i><span class="p-l">'+R.next.slice(1).map(function(x){return '<span class="p-m">'+R.mark(x,"r34n-svg")+'</span>'}).join("")+'</span></span>',sr);
  var st=li&&li.querySelector(".r34n-st");if(st&&!st.querySelector(".p-slot")){var sl=document.createElement("span");sl.className="p-slot";st.insertBefore(sl,st.firstChild)}return li};

R.pass('pb','Tryout','Training camp','Next challenger','<span class="p-row">'+R.logo(R.next[0])+'<b>'+R.next[0].name+'</b>'+R.flag(R.next[0])+'</span>','Then one of these',"Training camp pass, number 5: "+R.next[0].name+", on a tryout. Then one of "+R.next.slice(1).map(function(x){return x.name}).join(", ")+".");var b=document.querySelector('li.r34n.pb');if(b&&!b.querySelector('.p-pin')){['tl','tr','bl','br'].forEach(function(k){var p=document.createElement('i');p.className='p-pin '+k;b.appendChild(p)})}
