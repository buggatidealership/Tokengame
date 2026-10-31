/* J9 (a measurement, not a take): the page's own endless loops that animate background-position (the waving flags,
   the holo and foil sweeps) paused, to see what they cost on a slow phone. Transform-based versions would look the same. */
(function(){const bg=()=>document.getAnimations().filter(a=>{try{const k=a.effect.getKeyframes()[0]||{};return 'backgroundPositionX' in k||'backgroundPosition' in k}catch(e){return false}});
window.__sjToggle=on=>bg().forEach(a=>on?a.pause():a.play());document.documentElement.classList.add('sj-ready-j9')})();
