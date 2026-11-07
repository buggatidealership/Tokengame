/* r1028: one header for the two money columns (owner, 2026-10-27 night: "Biggest W" and "Biggest L" are too wide; "biggest W and then
   the and sign and L... the W is above the W column, and the & in between the W and the L column"): the word ends just before the W, W
   centred over its column, & halfway between the two columns, L centred over its column; the values are centred in their columns.
   window.__wlWord = "Biggest" | "Top" */
(function(){var tk=document.querySelector('#learn .x2p-pt');if(!tk)return;var body=tk.querySelector('.pt-body'),WD=window.__wlWord||'Biggest';
 var st=document.createElement('style');st.textContent='#learn .x2p-pt .pt-hd.cq-wl{position:relative}#learn .x2p-pt .pt-hd.cq-wl>span:not(.cq-wlx):has(.pn-w),#learn .x2p-pt .pt-hd.cq-wl>span:not(.cq-wlx):has(.pn-l){visibility:hidden}'+
  '#learn .x2p-pt .cq-wlx{position:absolute;top:0;bottom:0;display:flex;align-items:center;white-space:nowrap;visibility:visible}';document.head.appendChild(st);
 function put(){var hd=body.querySelector('.pt-hd');if(!hd||!hd.querySelector('.pn-w')||hd.classList.contains('cq-wl'))return;hd.classList.add('cq-wl');
  var span=hd.querySelector('.pn-w').parentNode,cs=getComputedStyle(span),H=hd.getBoundingClientRect();
  function ctr(sel){var l=1e9,r=-1e9;body.querySelectorAll(sel).forEach(function(e){var q=e.getBoundingClientRect();l=Math.min(l,q.left);r=Math.max(r,q.right)});return {l:l-H.left,r:r-H.left,c:(l+r)/2-H.left}}
  var w=ctr('.pn-bw'),l=ctr('.pn-bl');
  function lab(html,x,anchor){var e=document.createElement('span');e.className='cq-wlx';e.innerHTML=html;['font','letterSpacing','textTransform','color','fontStretch'].forEach(function(k){e.style[k]=cs[k]});hd.appendChild(e);var ew=e.getBoundingClientRect().width;
   e.style.left=(anchor==='c'?x-ew/2:x-ew)+'px';return e}
  var ew=lab('<i class="pn-w">W</i>',w.c,'c');lab(WD+'&nbsp;',w.c-ew.getBoundingClientRect().width/2,'r');lab('&amp;',(w.c+l.c)/2,'c');lab('<i class="pn-l">L</i>',l.c,'c')}
 new MutationObserver(put).observe(body,{childList:true});put()})();
