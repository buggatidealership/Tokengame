/* Round H24 · board5: the gaps. window.__B5G = '1' the bus (vertical gold traces cross each beat gap, data pulses run down them, from one beat into
   the next), '2' the seam (the upper board's gold edge fingers plug into the lower board's slot), '3' the breakaway rail (the board's own perforation,
   mouse bites, one tab snapped: the PCB's version of the torn paper). Every beat gap takes it, plus one more into Meet the models.
   The light gaps between the four frames keep their gold trace; a spark runs along it in the order 1 → 2 → 3 → 4. */
(function(){var n=0;(function go(){if(!document.querySelector('.t5-bg')||!document.querySelector('section.ch')){if(++n<400)setTimeout(go,50);return}
try{const D=document,G=window.__B5G||'1',IMG=window.__B5IMG||'tools/concepts/worlds/comic/story/h/board5/out/',F={1:'g1-traces',2:'g2-seam',3:'g3-bites'}[G];
 const band=()=>`<i class="b5g-band" style="background-image:url(${IMG}${F}-p.jpg)"></i>`+(G==='1'?'<i class="b5g-pulse"></i>':'');
 D.querySelectorAll('section.t4 .t5-bg').forEach(el=>{el.classList.add('b5g','b5g'+G);el.querySelectorAll('svg,i').forEach(x=>x.style.display='none');el.insertAdjacentHTML('beforeend',band())});
 const ch=D.querySelector('section.ch');if(ch&&!D.querySelector('.b5g-into')){const g=D.createElement('div');g.className='t5-bg b5g b5g'+G+' b5g-into';g.setAttribute('aria-hidden','true');g.innerHTML=band();ch.before(g)}
 D.documentElement.classList.add('b5g-on');window.__b5g=G}catch(e){window.__b5gErr=e;console.error(e)}})()})();
