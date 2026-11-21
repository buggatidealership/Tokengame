/* B: the head's words on one inline tape so each line gets its own cream strip */
document.querySelectorAll('section .sh h2.h45-h').forEach(function(h){if(h.querySelector('.h45-in'))return;var s=document.createElement('span');s.className='h45-in';while(h.firstChild)s.appendChild(h.firstChild);h.appendChild(s)});
