/* E4/E5 shared: today's bill geometry kept to the pixel. Nothing is added to the layout: the live elements are restyled in place.
   The "$EZ presents" box (.vb-k) keeps today's box (its width fixed at today's 1.73em) and gets the small EZ. disc where "$EZ" stood,
   "presents" in gold under it, on a black box. "How it works" (.vb-hd) goes into Kanit black italic, sized so it spans exactly today's
   width (so the lockup sits where today's does), and lifted so its capitals sit on the middle of today's capitals. */
window.F45T=function(id){var vt=document.querySelector('.x2p-vt'),k=vt.querySelector('.vb-k'),hd=vt.querySelector('.vb-hd');vt.classList.add('f45','f45t','f45-'+id);
  var w0=hd.getBoundingClientRect().width;
  k.innerHTML='<b class="f45-kd">'+F45.disc()+'</b><b class="f45-kp">presents</b>';
  function fit(){hd.style.fontSize='';vt.classList.add('f45-kn');var fs=parseFloat(getComputedStyle(hd).fontSize),w1=hd.getBoundingClientRect().width,n=fs*w0/w1;hd.style.fontSize=n.toFixed(2)+'px';
    var c=document.createElement('canvas').getContext('2d');c.font='400 '+fs+'px Anton';var a=c.measureText('H').actualBoundingBoxAscent;c.font='italic 900 '+n+'px Kanit';var b=c.measureText('H').actualBoundingBoxAscent;
    hd.style.transform='translateY('+(-(a-b)/2).toFixed(2)+'px)'}
  fit();document.fonts.ready.then(fit);
  return vt};
