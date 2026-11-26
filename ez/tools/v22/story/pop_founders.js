/* FOUNDERS: puts each lab's founder (stills from the owner's green room film) behind its Meet the models card; reruns whenever
   pop_p1 rebuilds a card (width changes). Needs pop_p1 (html.p1-on). */
(function(){var H=document.documentElement,n=0;
/* (owner, 2026-10-31: "the animated visuals of the 4 models") each founder is a 5 s Hedra loop now: muted, looping, autoplay by the
   attribute (not play(), which x2plus.js holds while the explainer plays; browsers pause muted autoplay off screen themselves);
   the poster alone with reduced motion or save-data */
/* full file names written out: make_site.py copies only media named in the page */
var MAP={CLAUDE:['media/founder-claude-anim','#d9622e','us'],GPT:['media/founder-gpt-anim','#10a37f','us'],GROK:['media/founder-grok-anim','#3a3540','us'],KIMI:['media/founder-kimi-anim','#1a6bff','cn']};
var still=false;try{still=matchMedia('(prefers-reduced-motion: reduce)').matches||!!(navigator.connection&&navigator.connection.saveData)}catch(e){}
function port(b){return '<div class="fb-port" style="background-image:url('+b+'.jpg)">'+(still?'':'<video muted loop playsinline autoplay preload="auto" poster="'+b+'.jpg" aria-hidden="true" tabindex="-1"><source src="'+b+'.mp4" type="video/mp4"><source src="'+b+'.webm" type="video/webm"></video>')+'</div>'}
function flag(k){if(k==='cn')return '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#de2910"/><path d="M6 3l1.2 3.6H11L8 8.8l1.1 3.6L6 10.2 2.9 12.4 4 8.8 1 6.6h3.8z" fill="#ffde00"/><circle cx="13" cy="3" r="1" fill="#ffde00"/><circle cx="15" cy="6" r="1" fill="#ffde00"/><circle cx="15" cy="10" r="1" fill="#ffde00"/><circle cx="13" cy="13" r="1" fill="#ffde00"/></svg>';
  return '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#fff"/>'+[0,2,4,6,8,10,12].map(function(i){return '<rect y="'+(i*20/13).toFixed(2)+'" width="30" height="'+(20/13).toFixed(2)+'" fill="#e0241c"/>'}).join('')+'<rect width="13" height="'+(20/13*7).toFixed(2)+'" fill="#1d3fb0"/></svg>'}
function dress(){document.querySelectorAll('.pp1-c[data-m]:not(.fb-on)').forEach(function(c){var m=MAP[c.getAttribute('data-m')];if(!m)return;var fl=c.querySelector('.pp1-fl');if(!fl)return;
  c.classList.add('fb-on');c.style.setProperty('--fc',m[1]);
  fl.innerHTML='<div class="fb-l"></div>'+port(m[0]);var vd=fl.querySelector('video');if(vd){vd.muted=true;vd.defaultMuted=true}
  var v=c.querySelector('.pp1-ver');if(v&&!c.querySelector('.fb-patch'))v.insertAdjacentHTML('afterend','<span class="fb-patch">'+flag(m[2])+'</span>')})}
(function go(){var g=document.querySelector('.wc-chars');if(!(H.classList.contains('p1-on')&&g&&g.querySelector('.pp1-c'))){if(++n<240)setTimeout(go,250);return}
  dress();new MutationObserver(function(){dress()}).observe(g,{childList:true,subtree:true})})()})();
