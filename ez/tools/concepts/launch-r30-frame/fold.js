/* Round 30, concept "fold": a frame folded from four strips of card round the film. The geometry is plain CSS (fold.css: four faces,
   four hems, the top strip's shadow); this script only adds the aria-hidden layer, lends the side strips the bet ticket's own band
   wear (its scuffs and ink voids, read from the ticket's paper so the two greens and reds are one ink), and snaps the frame to whole
   pixels so the film's edges fall on the screen's pixels (no half-covered row at the foot). Idempotent: a second run reuses the
   layer and the listeners. */
var D=document,H=D.documentElement,vt=D.querySelector('.x2p-vt');if(!vt)return;
H.classList.add('r30fo');
var vp=vt.querySelector('.vt-p');if(!vp)return;
if(!vp.querySelector(':scope>.r30fo-fr')){var fr=D.createElement('div');fr.className='r30fo-fr';fr.setAttribute('aria-hidden','true');
  /* o: each strip's face; n: its hem; s: the top strip's shadow on the side strips (t), on the picture (p), the left fold's (l) */
  fr.innerHTML=['o t','o b','o l','o r','n t','n b','n l','n r','s t','s p','s l'].map(function(c){return '<i class="'+c+'"></i>'}).join('');
  vp.insertBefore(fr,vp.firstChild)}
/* the bet ticket's band wear: its paper layer carries SCUFF and VOID as data-URI svgs; take them by their own noise settings */
if(!H.style.getPropertyValue('--r30-scuff')){var pp=D.querySelector('.x2p-bt .bt-pp'),bi=pp?getComputedStyle(pp).backgroundImage:'',m=bi.match(/url\("data:image\/svg\+xml[^"]*"\)/g)||[];
  m.forEach(function(u){var s='';try{s=decodeURIComponent(u)}catch(e){}
    if(s.indexOf("baseFrequency='.03 .09'")>-1)H.style.setProperty('--r30-scuff',u);
    else if(s.indexOf("seed='21'")>-1)H.style.setProperty('--r30-void',u)})}
/* whole pixels: the frame's top on an integer, so the film (a whole number of pixels below it) starts on one too */
function snap(){var cur=parseFloat(vt.style.getPropertyValue('--r30-snap'))||0,y=vt.getBoundingClientRect().top+scrollY-cur,s=Math.ceil(y-.001)-y;
  s=Math.round(s*64)/64;if(Math.abs(s-cur)>.001)vt.style.setProperty('--r30-snap',s+'px')}
snap();
if(!vt.__r30fo){vt.__r30fo=1;addEventListener('resize',function(){requestAnimationFrame(snap)});if(D.fonts)D.fonts.ready.then(snap);
  if(window.ResizeObserver){var h=D.querySelector('section.hero');if(h)new ResizeObserver(function(){requestAnimationFrame(snap)}).observe(h)}}
