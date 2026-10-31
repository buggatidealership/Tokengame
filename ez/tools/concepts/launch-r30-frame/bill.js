/* Round 30, concept "bill": the explainer film as the picture on a letterpress fight-night handbill, trimmed square, the picture bled
   to the sheet's side edges. The sheet (a hard shadow and the card) is one aria-hidden layer behind the film. "How it works" stays the
   same h2, pressed in the bet ticket's ink; the running time (the same small.vt-s, still counted down by x2plus.js) moves to the bill's
   foot between red rules, labelled "Running time" before and after the film and "Time left" while it counts down.
   Idempotent: a second run reuses the layer, the head span, the foot and the observer. */
var D=document,H=D.documentElement,vt=D.querySelector('.x2p-vt');if(!vt)return;
H.classList.add('r30bill');
var tag=vt.querySelector('.vt-tag'),vs=vt.querySelector('.vt-s'),v=vt.querySelector('video');
/* the sheet: shadow and printed face (aria-hidden, behind the film) */
var bl=vt.querySelector(':scope>.r30-bl');
if(!bl){bl=D.createElement('div');bl.className='r30-bl';bl.setAttribute('aria-hidden','true');bl.innerHTML='<i class="sh"></i><i class="pa"></i>';vt.insertBefore(bl,vt.firstChild)}
/* the foot: the running time between short red rules (the time element itself moves here; it was already aria-hidden) */
var ft=vt.querySelector(':scope>.r30-ft');
if(!ft){ft=D.createElement('div');ft.className='r30-ft';ft.setAttribute('aria-hidden','true');ft.innerHTML='<i></i><span class="t"><em class="tl">Running time</em></span><i></i>';vt.appendChild(ft)}
var slot=ft.querySelector('.t');if(vs&&vs.parentNode!==slot)slot.appendChild(vs);
/* the head: its words in one span (the press roughening sits on the letters only), and "$EZ presents" stacked small before it, hanging
   in the margin so the head itself stays centred on the bill; the stack is decoration, so the h2 still reads "How it works" */
if(tag&&!tag.querySelector('.r30-lk')){var t='';for(var n=tag.firstChild;n;){var nx=n.nextSibling;if(n.nodeType===3){t+=n.nodeValue;tag.removeChild(n)}n=nx}
  var lk=D.createElement('span'),k=D.createElement('span'),hd=D.createElement('span');lk.className='r30-lk';k.className='r30-k';hd.className='r30-hd';
  k.setAttribute('aria-hidden','true');k.innerHTML='<b>$EZ</b><b>presents</b>';hd.textContent=t.replace(/\s+/g,' ').trim();
  lk.appendChild(k);lk.appendChild(hd);tag.insertBefore(lk,tag.firstChild)}
/* "Running time 1:20" before and after; "Time left 0:58" while it counts down */
var full=function(){var d=v&&isFinite(v.duration)&&v.duration?v.duration:80;d=Math.round(d);return Math.floor(d/60)+':'+('0'+d%60).slice(-2)};
var lab=function(){var tl=ft.querySelector('.tl'),s=vs?vs.textContent:'',w=s&&s!==full()?'Time left':'Running time';if(tl.textContent!==w)tl.textContent=w};
if(vs&&!vs.__r30){vs.__r30=1;new MutationObserver(lab).observe(vs,{childList:true,characterData:true,subtree:true});if(v)v.addEventListener('loadedmetadata',lab)}
lab();
