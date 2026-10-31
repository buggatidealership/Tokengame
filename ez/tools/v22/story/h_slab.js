/* SLAB T1 (owner, 2026-10-31: round H "round", T1 "The slab, for real"; from tools/concepts/worlds/comic/story/h/round/t1.js): the round
   opened over the page (#x2pRm, built by x2plus.js; its certificate by world-comic.js certWatch) gets its drawn shapes here: the ink
   frames round the label, the film window and the market strip, a drawn crown on each winner, Pass and Fail struck each at its own
   angle, the painted hologram seal with the EZ. logo, a drawn close cross and brushed arrows. Every word and number stays the page's
   own; nothing is rebuilt, so flip, the arrows, swipe, Escape and close keep working. Styles in h_slab.css, gated by html.p1-on
   (set by pop_p1.js, X3+ only). Painted plates, full names written out (make_site.py copies only media named in the page):
   media/slab-acrylic-t1b.jpg, media/slab-holo-t1.jpg, media/cert-paper-t1.jpg (in h_slab.css), media/cert-seal-t1.png (here). */
(function(){var D=document,H=D.documentElement,SEAL='media/cert-seal-t1.png';
/* seeded jitter, so every shape is irregular but the same on every open */
var S=7;function rnd(){S=(S*16807)%2147483647;return S/2147483647}function seed(v){S=(v|0)||7}
function wob(k,amp){var p=[];function e(x0,y0,x1,y1){for(var i=0;i<k;i++){var t=i/k;p.push([x0+(x1-x0)*t+(rnd()-.5)*amp*(x0===x1?1:.3),y0+(y1-y0)*t+(rnd()-.5)*amp*(y0===y1?1:.3)])}}
  e(0,0,100,0);e(100,0,100,100);e(100,100,0,100);e(0,100,0,0);return p.map(function(q){return [Math.max(0,Math.min(100,q[0])),Math.max(0,Math.min(100,q[1]))]})}
/* an ink frame: a thick outer and a thin inner hand-wobbled line, stretched to its box (strokes keep their width) */
function ink(s,w,w2,inset){seed(s);w=w||3;w2=w2||1;inset=inset==null?2.6:inset;var a=wob(4,1.1),b=wob(4,.9).map(function(q){return [inset+q[0]*(100-2*inset)/100,inset+q[1]*(100-2*inset)/100]});
  var d=function(q){return 'M'+q.map(function(x){return x[0].toFixed(2)+' '+x[1].toFixed(2)}).join('L')+'Z'};
  return '<svg class="hs-ink" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="'+d(a)+'" fill="none" stroke="#0d0b10" stroke-width="'+w+'" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><path d="'+d(b)+'" fill="none" stroke="#0d0b10" stroke-width="'+w2+'" vector-effect="non-scaling-stroke" opacity=".8"/></svg>'}
function crown(){return '<svg viewBox="0 0 40 26" aria-hidden="true"><path d="M3.5 22.5 L2.2 6.8 L11.4 14 L19.6 2.3 L28.4 13.6 L37.6 6 L36.2 22.8 C25 24.4 14 24.2 3.5 22.5Z" fill="#ffcf33" stroke="#0d0b10" stroke-width="2.4" stroke-linejoin="round"/><path d="M6 19.5 C15 20.6 25 20.6 34 19.4" stroke="#a8740b" stroke-width="1.2" fill="none"/><circle cx="19.6" cy="2.6" r="2" fill="#ff3a31" stroke="#0d0b10" stroke-width="1.2"/></svg>'}
function arrow(dir){var t=dir<0?' transform="matrix(-1 0 0 1 60 0)"':'';return '<svg viewBox="0 0 60 40" aria-hidden="true"><g'+t+'><path d="M4 16.5 C14 15 24 15.8 33 15.2 L31.5 5.5 C40 11 49 16.5 56.5 20.3 C49 24.6 40.5 29.6 31.8 35 L33.2 25.1 C24 24.6 14 25.4 4.6 24 C3.2 21.4 3.1 19 4 16.5Z" fill="#ffd23f" stroke="#0d0b10" stroke-width="3.2" stroke-linejoin="round"/><path d="M9 18.6 C17 18 25 18.3 32 18" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7" fill="none"/><path d="M34 31 C41 27 48 23.6 53 21" stroke="#0d0b10" stroke-width="1" fill="none" opacity=".5"/></g></svg>'}
function cross(){return '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M7.5 4.8 L20.4 15.6 L32.6 4.2 L36.1 8.9 L25 20.4 L35.6 32.2 L31.2 36.2 L20 25.2 L8.4 36 L4.2 31.3 L15.4 20.3 L3.9 9.1Z" fill="#ffd23f" stroke="#0d0b10" stroke-width="3" stroke-linejoin="round"/><path d="M9 7.6 L19.6 17" stroke="#fff" stroke-width="1.4" opacity=".65" stroke-linecap="round"/></svg>'}
function add(el,html){var t=D.createElement('template');t.innerHTML=html;var n=t.content.firstChild;el.appendChild(n);return n}

function dress(o){
  var x=o.querySelector('.x2p-rmx');if(x&&!x.querySelector('svg'))x.innerHTML=cross();
  [].forEach.call(o.querySelectorAll('.x2p-rmn'),function(b){if(!b.querySelector('svg'))b.innerHTML=arrow(b.classList.contains('l')?-1:1)});
  [].forEach.call(o.querySelectorAll('.card[data-n]'),function(c){var n=+c.getAttribute('data-n')||1;
    [].forEach.call(c.querySelectorAll('.zlab'),function(l){if(!l.querySelector(':scope>.hs-ink'))l.insertAdjacentHTML('afterbegin',ink(n*7+11,2.4,.8))});
    var art=c.querySelector('.face.front .art');if(art&&!art.querySelector(':scope>.hs-ink'))add(art,ink(n*7+5,3,1));
    [].forEach.call(c.querySelectorAll('.wc-cert'),function(ce){
      [].forEach.call(ce.querySelectorAll('.wc-ce-r.wc-win .wc-ce-nm'),function(nm){if(!nm.querySelector('.hs-cr'))add(nm,'<i class="hs-cr" aria-hidden="true">'+crown()+'</i>')});
      /* Pass and Fail struck each at its own angle (a stamp, not a badge) */
      [].forEach.call(ce.querySelectorAll('.wc-ce-pf'),function(b,i){if(b.dataset.hs)return;b.dataset.hs=1;var ok=b.classList.contains('wc-ce-p');
        if(!b.classList.contains('wc-ce-q')){b.textContent=ok?'Pass':'Fail';seed(n*13+i);b.style.setProperty('--hs-r',((ok?-6:5)+i*2+(rnd()-.5)*3).toFixed(1)+'deg')}});
      var mk=ce.querySelector('.wc-ce-mk');if(mk&&!mk.querySelector(':scope>.hs-ink'))add(mk,ink(n*7+31,2.6,.9));
      var ft=ce.querySelector('.wc-ce-ft');if(ft&&!ce.classList.contains('wc-ce-pd')&&!ft.querySelector('.hs-seal'))
        add(ft,'<span class="hs-seal" aria-hidden="true"><img src="'+SEAL+'" alt="" decoding="async"><i>'+(window.X2P_LOGO||'')+'</i></span>')})})}

var qd=0,sub=null,seen=null;
function q(){if(qd)return;qd=1;requestAnimationFrame(function(){qd=0;var o=D.getElementById('x2pRm');if(o)try{dress(o)}catch(e){console.error('slab',e)}})}
function look(){var o=D.getElementById('x2pRm');if(o&&o!==seen){seen=o;if(sub)sub.disconnect();sub=new MutationObserver(q);sub.observe(o,{childList:true,subtree:true});q();
    /* the tied winners are fitted again in the new foot, once the fonts are in */
    setTimeout(function(){try{if(window.__wcTiesFit&&D.body.contains(o))window.__wcTiesFit(o)}catch(e){}},120)}
  else if(!o&&seen){seen=null;if(sub){sub.disconnect();sub=null}}}
function start(){new MutationObserver(look).observe(D.body,{childList:true});look()}
(function wait(n){if(H.classList.contains('p1-on')&&!H.classList.contains('cd-on')&&D.body)start();else if(n<480)setTimeout(function(){wait(n+1)},250)})(0);
})();
