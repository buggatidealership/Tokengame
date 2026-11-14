/* f1 "Card away" (round 31): the bet ticket leaves the first screen; nothing else changes. The ticket (the live element, so its countdown
   keeps running) moves into a plain placeholder section right before 05 Get $EZ, where the bet section will go. Idempotent. */
var d=document,H=d.documentElement,bt=d.querySelector('.x2p-bt'),get=d.getElementById('get');
if(bt&&get){var s=d.getElementById('r31-bet');
  if(!s){s=d.createElement('section');s.id='r31-bet';s.className='sec r31-bet';s.setAttribute('aria-label','The bet');get.parentNode.insertBefore(s,get)}
  if(bt.parentNode!==s)s.appendChild(bt)}
/* the film's section keeps routes.js's label "The NVIDIA bet"; it now holds only the film, so screen readers would hear two bet sections
   (the real build renames it in routes.js or build.py, X2+ only) */
var sb=d.querySelector('section.x2o-bet');if(sb)sb.setAttribute('aria-label','How it works');
H.classList.add('r31-f1');
window.__r31={shot:'section.x2o-bet'};
