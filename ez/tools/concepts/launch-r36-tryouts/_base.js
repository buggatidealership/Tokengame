/* shared (the head is an <em>, not the site's <b>, so the page's own n5fit, which reruns when a font loads, leaves it alone): the words field takes one head (b) and an optional small line (i); fit() steps the head down until it clears the field's
   line by 4px (as the site's n5fit does), else lets it take two lines at that size */
var n=document.querySelector('#standings li.x2p-n5'),w=n.querySelector('.n5-w');
window.R36={n:n,w:w,words:function(head,small,two){w.innerHTML='<em class="r36h">'+head+'</em>'+(small?'<i>'+small+'</i>':'');var b=w.querySelector('em');if(two)b.classList.add('r36-2');
  var cs=getComputedStyle(w),av=w.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)-4,tw=function(){var r=document.createRange();r.selectNodeContents(b);return r.getBoundingClientRect().width};
  var z=parseFloat(getComputedStyle(b).fontSize),k=0;while(tw()>av&&z>9&&k++<40){z-=.5;b.style.fontSize=z+'px'}},
  style:function(cls){n.classList.add('r36',cls)}};
