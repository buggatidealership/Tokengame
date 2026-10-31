/* r1029 D (owner, 2026-10-27, night: "the module has sort of the same effect as the logo... that in-depth approach"): the logo's furniture on
   both modules: two red slashes at the top right (the Z's), two green ones at the bottom left (the E's), the gold square after the head */
(function(){[].forEach.call(document.querySelectorAll('.rz-twr,.rz-pw'),function(w){if(w.querySelector('.dz-sl'))return;
  w.insertAdjacentHTML('beforeend','<span class="dz-sl r" aria-hidden="true"><i></i><i></i></span><span class="dz-sl g" aria-hidden="true"><i></i><i></i></span>')});
 var h=document.querySelector('.rz-hd span');if(h&&!h.querySelector('.dz-dot'))h.insertAdjacentHTML('beforeend','<i class="dz-dot" aria-hidden="true"></i>')})();
