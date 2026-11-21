/* Round 30, fight-night bill in EZ colours, take c3 "bands" (owner, 2026-10-24: the bill, "but the colors should be ours... the yellow,
   the green, and the red. And the dollar sign EZ should be in our color as well"). The same bill as round 30's "bill": the film is the
   picture, bled to the trimmed sheet; "$EZ presents" hangs left of the head; "Running time 1:20" in the foot. Here the bill is printed
   like the site's tickets: a green band across the top with "How it works" knocked out of the ink (the bare card shows through), a red
   band at the foot with the running time knocked out between two gold-foil stars; "$EZ presents" sits in a gap of bare card left in
   the green, "$EZ" in the logo's three colours ($ gold foil, E green ink, Z red ink).
   The bet ticket moves to a plain placeholder section before 05 Get $EZ (round 31, f1), so the first screen is the headline, the
   framed film and the standings. Idempotent: a second run reuses the layer, the head spans, the foot, the observer and the section. */
var D=document,H=D.documentElement,vt=D.querySelector('.x2p-vt');if(!vt)return;
H.classList.add('r30bc3');
var tag=vt.querySelector('.vt-tag'),vs=vt.querySelector('.vt-s'),v=vt.querySelector('video');
/* the sheet: shadow and printed face (aria-hidden, behind the film) */
var bl=vt.querySelector(':scope>.r30-bl');
if(!bl){bl=D.createElement('div');bl.className='r30-bl';bl.setAttribute('aria-hidden','true');bl.innerHTML='<i class="sh"></i><i class="pa"></i>';vt.insertBefore(bl,vt.firstChild)}
/* the foot: the running time between two gold-foil stars (the time element itself moves here; it was already aria-hidden) */
var ft=vt.querySelector(':scope>.r30-ft');
if(!ft){ft=D.createElement('div');ft.className='r30-ft';ft.setAttribute('aria-hidden','true');ft.innerHTML='<b class="st" data-t="★">★</b><span class="t"><em class="tl">Running time</em></span><b class="st" data-t="★">★</b>';vt.appendChild(ft)}
var slot=ft.querySelector('.t');if(vs&&vs.parentNode!==slot)slot.appendChild(vs);
/* the head: its words in one span (data-t feeds the foil layer), and "$EZ presents" stacked small before it, hanging in the margin so the
   head itself stays centred on the bill; the stack is decoration, so the h2 still reads "How it works" */
if(tag&&!tag.querySelector('.r30-lk')){var t='';for(var n=tag.firstChild;n;){var nx=n.nextSibling;if(n.nodeType===3){t+=n.nodeValue;tag.removeChild(n)}n=nx}
  var lk=D.createElement('span'),k=D.createElement('span'),hd=D.createElement('span');lk.className='r30-lk';k.className='r30-k';hd.className='r30-hd';
  k.setAttribute('aria-hidden','true');k.innerHTML='<b class="ez"><i class="s" data-t="$">$</i><i class="e">E</i><i class="z">Z</i></b><b>presents</b>';
  hd.textContent=t.replace(/\s+/g,' ').trim();hd.setAttribute('data-t',hd.textContent);
  lk.appendChild(k);lk.appendChild(hd);tag.insertBefore(lk,tag.firstChild)}
/* "Running time 1:20" before and after; "Time left 0:58" while it counts down */
var full=function(){var d=v&&isFinite(v.duration)&&v.duration?v.duration:80;d=Math.round(d);return Math.floor(d/60)+':'+('0'+d%60).slice(-2)};
var lab=function(){var tl=ft.querySelector('.tl'),s=vs?vs.textContent:'',w=s&&s!==full()?'Time left':'Running time';if(tl.textContent!==w)tl.textContent=w};
if(vs&&!vs.__r30){vs.__r30=1;new MutationObserver(lab).observe(vs,{childList:true,characterData:true,subtree:true});if(v)v.addEventListener('loadedmetadata',lab)}
lab();
/* round 31 f1: the bet ticket (the live element, so its countdown keeps running) moves to a placeholder section right before Get $EZ */
var bt=D.querySelector('.x2p-bt'),get=D.getElementById('get');
if(bt&&get){var s=D.getElementById('r31-bet');
  if(!s){s=D.createElement('section');s.id='r31-bet';s.className='sec r31-bet';s.setAttribute('aria-label','The bet');get.parentNode.insertBefore(s,get)}
  if(bt.parentNode!==s)s.appendChild(bt)}
var sb=D.querySelector('section.x2o-bet');if(sb)sb.setAttribute('aria-label','How it works');
H.classList.add('r31-f1');
