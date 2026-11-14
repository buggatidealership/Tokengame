/* G2: MVP backs as a certificate of record (owner, 2026-10-28, round 45). Self-contained; lift it as is.
   Hook: runs on its own once #x2pHl's recap backs exist (x2plus.js hlSlabs writes each back as .fin > .x2p-hb) and again whenever a
   back is rewritten (a MutationObserver on #x2pHl rebuilds any .fin whose G2 layer is gone). It refits on fonts, load and width
   changes, after the page's eqH (150 ms) has set the cards' height. window.__x2pG2() runs it by hand.
   Reads only the page's own recap DOM (headline, deck, punch line, P&L card and strip, rarity, round and date), the card's front
   label (the highlight's tag) and the global logo() from ez-data.js; numbers are never computed here. The recap stays in the DOM
   under the layer (visibility hidden), with its hidden call chips (.x2p-hcs), which the holo levels read; the page's own flip button
   is moved into the layer's foot, as certify() does on the record. */
(function(){if(window.__x2pG2)return;var d=document,n=0;
function E(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function T(e){return e?e.textContent.trim():''}
function mark(m){var k=String(m).toUpperCase(),s='';try{var h=typeof logo==='function'?logo(k):'',x=h.match(/<svg[\s\S]*<\/svg>/);s=x?x[0]:''}catch(e){}
  return s?'<span class="b45-mk" data-m="'+k+'" aria-hidden="true">'+s+'</span>':''}
function seal(rar,id){var mid=E(rar).toUpperCase();return '<svg class="b45-seal" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs><path id="'+id+'" d="M50 50m-32 0a32 32 0 1 1 64 0a32 32 0 1 1 -64 0"/></defs>'+
  '<g transform="rotate(-9 50 50)" fill="none" stroke="#a8231a"><circle cx="50" cy="50" r="47" stroke-width="3.2"/><circle cx="50" cy="50" r="42.5" stroke-width="1.3"/><circle cx="50" cy="50" r="29" stroke-width="1.6"/></g>'+
  '<g transform="rotate(-9 50 50)" fill="#a8231a" text-rendering="geometricPrecision"><text font-family="Archivo,sans-serif" font-style="italic" font-weight="900" font-stretch="62%" font-size="11" letter-spacing="1.6"><textPath href="#'+id+'">RARITY ★ $EZ ★ SEASON 1 ★ </textPath></text>'+
  '<text x="50" y="44" text-anchor="middle" font-size="11" font-family="Anton,Impact,sans-serif">★</text><text x="50" y="62" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="17" letter-spacing=".4">'+mid+'</text></g></svg>'}
function no4(v){return ('0000'+v).slice(-4)}
function build(card){var fin=card.querySelector('.face.back .fin'),hb=fin&&fin.querySelector('.x2p-hb.x2p-rc');if(!hb||fin.querySelector(':scope>.b45-g2'))return null;
  var w=card.closest('.x2p-hi'),q=function(s){return hb.querySelector(s)},rch=T(q('.x2p-rch small')).match(/Round (\d+)(?: · (.*))?/)||[],
    tag=w?T(w.querySelector('.x2p-htag')):'',big=T(q('.pn-big')),lab=T(q('.pn-ct em')),ct=T(q('.pn-ct span')).split(' · '),star=/^Its/i.test(lab),
    rar=q('.x2p-rar'),rarT=rar?T(rar.querySelector('span')):'',h4=q('h4');if(!h4||!big)return null;
  var st=[].map.call(hb.querySelectorAll('.pn-strip>span'),function(s){return '<span><i>'+mark(s.firstChild.textContent.trim())+' '+E(s.firstChild.textContent.trim())+'</i><b class="'+(s.classList.contains('ok')?'b45-ok':'b45-no2')+'">'+E(T(s.querySelector('b')))+'</b></span>'}).join('');
  var el=d.createElement('div');el.className='b45-g2';el.setAttribute('role','group');el.setAttribute('aria-label','Certificate of record'+(tag?': '+tag:''));
  el.innerHTML='<i class="b45-fr" aria-hidden="true"></i><div class="b45-hd"><div class="b45-lb b45-t">★ Certificate of record ★</div><b class="b45-k">'+E(tag)+'</b><div class="b45-lb b45-no">No. '+no4(rch[1]||'')+(rch[2]?' · '+E(rch[2]):'')+'</div></div>'+
   '<div class="b45-bd"><div class="b45-lb b45-cf">This certifies that</div><h4 class="b45-h">'+h4.innerHTML+'</h4>'+(q('.x2p-dk')?'<p class="b45-dk">'+E(T(q('.x2p-dk')))+'</p>':'')+'</div><div class="b45-sp"></div>'+
   '<div class="b45-stub"><div class="b45-sl"><span class="b45-lb">'+E(lab)+'</span>'+(star&&ct[1]?'<span class="b45-who">'+E(ct[0])+' · '+E(ct[1])+'</span>':'')+
     '<b class="b45-big '+(/^\+/.test(big)?'b45-ok':'b45-no2')+'">'+E(big)+'</b></div><div class="b45-sr">'+st+'</div></div><div class="b45-sp"></div>'+
   (T(q('.pn-pun'))?'<p class="b45-pu">'+E(T(q('.pn-pun')))+'</p><div class="b45-sp"></div>':'')+
   '<div class="b45-ft"><div class="b45-fl"><span class="b45-lb">'+E(T(q('.pn-cs')))+'</span><span class="b45-lb">'+E(T(q('.pn-sim')))+'</span></div>'+(rarT?seal(rarT,'b45g2s'+(n++)):'')+'</div>';
  var fb=hb.querySelector('.flipb');if(fb){fb.classList.add('b45-film');el.querySelector('.b45-fl').appendChild(fb)}
  hb.style.visibility='hidden';fin.appendChild(el);return el}
/* type steps down (headline, deck, punch line; the figures stop at 1) until nothing runs past the card, and up to 1.24 where a tall
   card leaves room, keeping some air at the foot */
function over(el){if(el.scrollHeight>el.clientHeight+.5)return true;var R=el.getBoundingClientRect(),o=false;
  [].forEach.call(el.querySelectorAll('.b45-hd,.b45-bd,.b45-stub,.b45-pu,.b45-ft,.b45-big,.b45-sr b,.b45-who'),function(e){var r=e.getBoundingClientRect();if(r.width&&(r.right>R.right+.5||r.bottom>R.bottom+.5||r.left<R.left-.5))o=true});
  [].forEach.call(el.querySelectorAll('.b45-big,.b45-who'),function(e){if(e.scrollWidth>e.clientWidth+1)o=true});return o}
function air(el){return [].reduce.call(el.querySelectorAll(':scope>.b45-sp'),function(a,e){return a+e.getBoundingClientRect().height},0)}
function fit(el){if(!el.clientHeight)return;var k=1;el.style.setProperty('--k',k);while(over(el)&&k>.66){k=Math.round((k-.03)*100)/100;el.style.setProperty('--k',k)}
  if(!over(el))while(k<1.24){var k2=Math.round((k+.03)*100)/100;el.style.setProperty('--k',k2);if(over(el)||air(el)<el.clientHeight*.06){el.style.setProperty('--k',k);break}k=k2}
  el.dataset.k=k}
/* one type size across the row, as a carousel needs: every back takes the smallest fit */
function fitAll(){var ls=[].slice.call(d.querySelectorAll('#x2pHl .b45-g2'));ls.forEach(fit);var m=Math.min.apply(null,ls.map(function(e){return +e.dataset.k||1}));
  ls.forEach(function(e){e.style.setProperty('--k',m);e.dataset.k=m})}
function run(){var hl=d.getElementById('x2pHl');if(!hl)return;[].forEach.call(hl.querySelectorAll('.card'),build);fitAll()}
window.__x2pG2=run;
var t,mo,w0=innerWidth;function soon(ms){clearTimeout(t);t=setTimeout(run,ms||60)}
function watch(){var hl=d.getElementById('x2pHl');if(!hl){setTimeout(watch,250);return}run();
  mo=new MutationObserver(function(ms){if(ms.some(function(m){return [].some.call(m.removedNodes,function(x){return x.nodeType===1&&(x.classList.contains('b45-g2')||x.classList.contains('x2p-hb'))})||[].some.call(m.addedNodes,function(x){return x.nodeType===1&&x.classList.contains('x2p-hb')})}))soon()});
  mo.observe(hl,{childList:true,subtree:true})}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',watch);else watch();
addEventListener('load',function(){soon(400)});if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){soon(300)});
addEventListener('resize',function(){if(innerWidth===w0)return;w0=innerWidth;soon(300)});
})();
