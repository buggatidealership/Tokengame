/* H3 ringside: the header is the top of the ring, three painted ropes (red, cream, green) under the arena light; the tabs are fight tags clipped to the bottom rope */
(()=>{const h=CH.$('header.top');h.insertAdjacentHTML('afterbegin','<i class="h3-r" aria-hidden="true"></i>');CH.name({rot:6,y:2.5,sc:.1,seed:17});
 CH.tabs({fill:'#f8f0d9',on:'#fdbc2a',amp:1.5,sw:2});CH.$$('.nav a',h).forEach(a=>a.insertAdjacentHTML('afterbegin','<i class="h3-clip" aria-hidden="true"></i>'));
 const l=CH.$('#liveChip');if(!l.__ib)CH.inkBox(l,{fill:'#b71c1c',shade:'rgba(0,0,0,.28)',seed:3,amp:1.2,inner:0})})();
