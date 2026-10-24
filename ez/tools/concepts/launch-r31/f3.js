/* f3 "Tap to enlarge" (round 31). The bet ticket leaves the first screen (as f1, with f1's tighter gap), and the film gets a small
   "Watch it bigger" button: the sound button's twin (the same 20px dark chip and white glyph), in the picture's bottom right corner,
   level with the play disc, where every player keeps its full-screen button.
   Desktop: a theatre view (the page dimmed to the night colour, the same film ticket, video element and controls moved into a centred
   frame at min(92vw,1200px), the tag lifted above the picture, close top right; Esc or a click on the dark closes).
   Phones and tablets: the browser's own full screen. iPhone: video.webkitEnterFullscreen() (the native player, which turns with the
   phone). Android and iPad: requestFullscreen on the film ticket, styled by f3.css (only the picture, centred on black, the page's own
   sound and play controls kept), then a landscape lock where the browser allows it; the same button then reads "Back to the page".
   Load cost: none. The same video element and file (nothing new is fetched), this script and its CSS (a few KB). Idempotent. */
var d=document,H=d.documentElement,bt=d.querySelector('.x2p-bt'),get=d.getElementById('get');
if(bt&&get){var s=d.getElementById('r31-bet');
  if(!s){s=d.createElement('section');s.id='r31-bet';s.className='sec r31-bet';s.setAttribute('aria-label','The bet');get.parentNode.insertBefore(s,get)}
  if(bt.parentNode!==s)s.appendChild(bt)}
var sb=d.querySelector('section.x2o-bet');if(sb)sb.setAttribute('aria-label','How it works');
H.classList.add('r31-f3');
var vt=d.querySelector('.x2p-vt'),f=vt&&vt.querySelector('.vt-f'),v=vt&&vt.querySelector('video'),snd=vt&&vt.querySelector('.vt-snd');
if(vt&&f&&v&&snd&&!vt.querySelector('.r31-big')){
  var OUT='<svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true"><path d="M1.5 6V1.5H6M10 1.5h4.5V6M14.5 10v4.5H10M6 14.5H1.5V10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>';
  var IN='<svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true"><path d="M6 1.5V6H1.5M14.5 6H10V1.5M10 14.5V10h4.5M1.5 10H6v4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>';
  var big=d.createElement('button');big.type='button';big.className='r31-big';
  function label(on){big.setAttribute('aria-label',on?'Back to the page':'Watch it bigger');big.title=on?'Back to the page':'Watch it bigger';big.innerHTML=on?IN:OUT}
  label(false);f.appendChild(big);
  var th=null,hold=null,back=null,coarse=window.matchMedia&&matchMedia('(pointer:coarse)').matches;
  function fsEl(){return d.fullscreenElement||d.webkitFullscreenElement||null}
  function play(){if(v.paused){var pb=vt.querySelector('.vt-play');if(pb)pb.click()}}
  /* the theatre (desktop) and, for the mockup's phone shots only, a stand-in for the browser's full screen (.r31-fs, the same rules) */
  function close(){
    if(vt.classList.contains('r31-fs')){vt.classList.remove('r31-fs');H.classList.remove('r31-thon');label(false);d.removeEventListener('keydown',key,true);return}
    if(!th)return;hold.replaceWith(vt);th.remove();th=null;hold=null;H.classList.remove('r31-thon');
    d.removeEventListener('keydown',key,true);if(back&&back.focus)back.focus({preventScroll:true});back=null}
  function key(e){if(e.key==='Escape'){e.preventDefault();close()}
    /* keep Tab inside the theatre: close, then the film's own buttons */
    if(e.key==='Tab'&&th){var fs=[].filter.call(th.querySelectorAll('button'),function(b){return b.offsetParent&&!b.hidden&&getComputedStyle(b).visibility!=='hidden'});if(!fs.length)return;
      var i=fs.indexOf(d.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();fs[fs.length-1].focus()}else if(!e.shiftKey&&i===fs.length-1){e.preventDefault();fs[0].focus()}}}
  window.__r31open=function(mode,start,kb){if(th||vt.classList.contains('r31-fs'))return;mode=mode||(coarse?'full':'theatre');back=kb?d.activeElement:null;
    if(mode==='full'){vt.classList.add('r31-fs');H.classList.add('r31-thon');label(true);d.addEventListener('keydown',key,true);if(start)play();return}
    var r=vt.getBoundingClientRect(),cs=getComputedStyle(vt);
    hold=d.createElement('div');hold.className='r31-vhold';hold.setAttribute('aria-hidden','true');hold.style.height=r.height+'px';hold.style.margin=cs.margin;
    th=d.createElement('div');th.className='r31-th';th.setAttribute('role','dialog');th.setAttribute('aria-modal','true');th.setAttribute('aria-label','How it works, the big view');
    th.innerHTML='<button type="button" class="r31-x" aria-label="Close the big view"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"/></svg></button><div class="r31-thf"></div>';
    vt.replaceWith(hold);th.querySelector('.r31-thf').appendChild(vt);d.body.appendChild(th);H.classList.add('r31-thon');
    th.querySelector('.r31-x').addEventListener('click',function(e){e.stopPropagation();close()});
    th.addEventListener('click',function(e){if(e.target===th)close()});
    d.addEventListener('keydown',key,true);
    /* focus moves into the dialog for keyboards (Enter or Space on the button); a mouse click leaves no ring on the close button */
    var x=th.querySelector('.r31-x');if(kb)x.focus({preventScroll:true});else{th.tabIndex=-1;th.style.outline='none';th.focus({preventScroll:true})}
    /* a click on "Watch it bigger" while the film waits starts it with sound, through the page's own play button */
    if(start)play()};
  big.addEventListener('click',function(e){e.stopPropagation();var kb=e.detail===0;
    if(fsEl()){(d.exitFullscreen||d.webkitExitFullscreen).call(d);return}
    if(vt.classList.contains('r31-fs')){close();return}
    if(coarse){play();
      /* iPhone: no element full screen, so the native player */
      if(v.webkitEnterFullscreen&&!d.fullscreenEnabled&&!d.webkitFullscreenEnabled){try{v.webkitEnterFullscreen()}catch(_){};return}
      var rq=vt.requestFullscreen||vt.webkitRequestFullscreen;
      if(rq){var p=rq.call(vt,{navigationUI:'hide'});
        if(p&&p.then)p.then(function(){if(screen.orientation&&screen.orientation.lock)screen.orientation.lock('landscape').catch(function(){})}).catch(function(){window.__r31open('theatre',false,kb)});
        return}}
    window.__r31open('theatre',true,kb)});
  function fsChange(){var on=fsEl()===vt;label(on);if(!on&&screen.orientation&&screen.orientation.unlock)try{screen.orientation.unlock()}catch(_){}}
  d.addEventListener('fullscreenchange',fsChange);d.addEventListener('webkitfullscreenchange',fsChange);
}
window.__r31={shot:'.x2p-vt',after:'window.__r31open&&window.__r31open(null,false)',landscape:true};
