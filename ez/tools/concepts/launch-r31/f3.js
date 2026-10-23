/* f3 "Tap to enlarge" (round 31). The bet ticket leaves the first screen (as f1, with f1's tighter gap), and the film gets a small
   "Watch it bigger" button under the sound button. Desktop: a theatre view (the page dimmed to the night colour, the same film ticket,
   video element and controls moved into a centred frame at min(92vw,1200px), close top right, Esc or a click on the dark closes).
   Phones: the native full-screen player (iPhone: video.webkitEnterFullscreen(); Android: requestFullscreen on the film, landscape lock).
   Load cost: none. The same video element and file (nothing new is fetched), this script and its CSS (a few KB). Idempotent. */
var d=document,H=d.documentElement,bt=d.querySelector('.x2p-bt'),get=d.getElementById('get');
if(bt&&get){var s=d.getElementById('r31-bet');
  if(!s){s=d.createElement('section');s.id='r31-bet';s.className='sec r31-bet';s.setAttribute('aria-label','The bet');get.parentNode.insertBefore(s,get)}
  if(bt.parentNode!==s)s.appendChild(bt)}
H.classList.add('r31-f3');
var vt=d.querySelector('.x2p-vt'),f=vt&&vt.querySelector('.vt-f'),v=vt&&vt.querySelector('video'),snd=vt&&vt.querySelector('.vt-snd');
if(vt&&f&&v&&snd&&!vt.querySelector('.r31-big')){
  var big=d.createElement('button');big.type='button';big.className='r31-big';big.setAttribute('aria-label','Watch it bigger');big.title='Watch it bigger';
  /* four square corners, printed in ink */
  big.innerHTML='<svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true"><path d="M1.5 6V1.5H6M10 1.5h4.5V6M14.5 10v4.5H10M6 14.5H1.5V10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"/></svg>';
  snd.after(big);
  var th=null,hold=null,back=null,coarse=window.matchMedia&&matchMedia('(pointer:coarse)').matches;
  function close(){if(!th)return;var full=th.classList.contains('full');hold.replaceWith(vt);th.remove();th=null;hold=null;H.classList.remove('r31-thon');
    d.removeEventListener('keydown',key,true);if(back&&back.focus)back.focus({preventScroll:true});back=null}
  function key(e){if(e.key==='Escape'){e.preventDefault();close()}
    /* keep Tab inside the theatre: close, then the film's own buttons */
    if(e.key==='Tab'&&th){var fs=[].filter.call(th.querySelectorAll('button'),function(b){return b.offsetParent&&!b.hidden&&getComputedStyle(b).visibility!=='hidden'});if(!fs.length)return;
      var i=fs.indexOf(d.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();fs[fs.length-1].focus()}else if(!e.shiftKey&&i===fs.length-1){e.preventDefault();fs[0].focus()}}}
  /* mode 'theatre' (desktop) or 'full' (a phone: stands in for the native player in the mockup's shots) */
  window.__r31open=function(mode,play,kb){if(th)return;mode=mode||(coarse?'full':'theatre');back=kb?d.activeElement:null;
    var r=vt.getBoundingClientRect(),cs=getComputedStyle(vt);
    hold=d.createElement('div');hold.className='r31-vhold';hold.setAttribute('aria-hidden','true');hold.style.height=r.height+'px';hold.style.margin=cs.margin;
    th=d.createElement('div');th.className='r31-th'+(mode==='full'?' full':'');th.setAttribute('role','dialog');th.setAttribute('aria-modal','true');th.setAttribute('aria-label','How it works, the big view');
    th.innerHTML='<button type="button" class="r31-x" aria-label="Close the big film"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"/></svg></button><div class="r31-thf"></div>';
    vt.replaceWith(hold);th.querySelector('.r31-thf').appendChild(vt);d.body.appendChild(th);H.classList.add('r31-thon');
    th.querySelector('.r31-x').addEventListener('click',function(e){e.stopPropagation();close()});
    th.addEventListener('click',function(e){if(e.target===th)close()});
    d.addEventListener('keydown',key,true);
    /* focus moves into the dialog for keyboards (Enter or Space on the button); a mouse click leaves no ring on the close button */
    var x=th.querySelector('.r31-x');if(kb)x.focus({preventScroll:true});else{th.tabIndex=-1;th.style.outline='none';th.focus({preventScroll:true})}
    /* a tap on "Watch it bigger" while the film waits starts it with sound, through the page's own play button */
    if(play&&v.paused){var pb=vt.querySelector('.vt-play');if(pb)pb.click()}};
  big.addEventListener('click',function(e){e.stopPropagation();var kb=e.detail===0;
    /* phones: the browser's own full-screen player, which turns with the phone */
    if(coarse){if(v.paused){var pb=vt.querySelector('.vt-play');if(pb)pb.click()}
      if(v.webkitEnterFullscreen&&!d.fullscreenEnabled){try{v.webkitEnterFullscreen()}catch(_){};return}
      if(vt.requestFullscreen){vt.requestFullscreen({navigationUI:'hide'}).then(function(){if(screen.orientation&&screen.orientation.lock)screen.orientation.lock('landscape').catch(function(){})}).catch(function(){window.__r31open('theatre',false,kb)});return}}
    window.__r31open('theatre',true,kb)});
}
window.__r31={shot:'.x2p-vt',after:'window.__r31open&&window.__r31open(null,false)',landscape:true};
