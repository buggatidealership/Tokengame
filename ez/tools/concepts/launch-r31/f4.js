/* f4 "A countdown line" (round 31). The bet ticket leaves the first screen (as f1); under the film one slim stub keeps the stakes in
   view. It is cut like the bet ticket, not like the film: the bet ticket's green strip on top and red strip at the foot, its corner
   bites, a perforation with a notch top and bottom (the bet ticket's die), straight ends. On it "Bet #1: NVIDIA" (NVIDIA hot-foil
   stamped, the bet ticket's recipe) and the time left, read from the page's own countdown (#gpuSr, which the moved ticket's chip keeps
   updating), with an arrow; the whole stub is a link down to the bet section. Under a day the days drop; at zero the time gives way
   to "See the bet" (a placeholder: the owner's line for that moment is still to come). Idempotent. */
var d=document,H=d.documentElement,bt=d.querySelector('.x2p-bt'),get=d.getElementById('get');
var s=d.getElementById('r31-bet');
if(bt&&get){if(!s){s=d.createElement('section');s.id='r31-bet';s.className='sec r31-bet';s.setAttribute('aria-label','The bet');get.parentNode.insertBefore(s,get)}
  if(bt.parentNode!==s)s.appendChild(bt)}
var sb=d.querySelector('section.x2o-bet');if(sb)sb.setAttribute('aria-label','How it works');
H.classList.add('r31-f4');
var vt=d.querySelector('.x2p-vt'),sr=d.getElementById('gpuSr');
if(vt&&s&&!d.querySelector('.r31-cd')){
  var a=d.createElement('a');a.className='r31-cd';a.href='#r31-bet';
  a.innerHTML='<span class="cd-k"><span class="cd-n" aria-hidden="true"><span class="ink">Bet #1:</span> <em data-t="NVIDIA">NVIDIA</em></span>'+
    '<i class="cd-pf" aria-hidden="true"></i><span class="cd-t ink" aria-hidden="true"></span>'+
    '<i class="cd-ar" aria-hidden="true"><svg viewBox="0 0 12 14" width="10" height="12"><path d="M6 1v10M1.8 7.2L6 11.6l4.2-4.4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"/></svg></i></span>';
  var w=d.createElement('div');w.className='r31-cdw';w.appendChild(a);vt.after(w);
  var k=a.querySelector('.cd-k'),t=a.querySelector('.cd-t'),pf=a.querySelector('.cd-pf');
  /* the notches and the punched holes sit on the perforation: its centre, measured */
  function px(){k.style.setProperty('--px',(pf.offsetLeft+pf.offsetWidth/2).toFixed(1)+'px')}
  function upd(){var m=sr&&sr.textContent.match(/(\d+)\s*days?,\s*(\d+)\s*hours?,\s*(\d+)\s*minutes?/),h,l;
    if(!m||(+m[1]===0&&+m[2]===0&&+m[3]===0)){h='<span class="cd-go">See the bet</span>';l='Bet #1: NVIDIA. See the bet.'}
    else{h=(+m[1]>0?'<b>'+m[1]+'</b><small>days</small>':'')+'<b>'+('0'+m[2]).slice(-2)+'</b><small>hrs</small><b>'+('0'+m[3]).slice(-2)+'</b><small>min</small>';
      l='Bet #1: NVIDIA, '+(+m[1]>0?m[1]+' days, ':'')+(+m[2])+' hours, '+(+m[3])+' minutes left. See the bet.'}
    if(t.innerHTML!==h){t.innerHTML=h;px()}a.setAttribute('aria-label',l)}
  upd();px();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(px);addEventListener('resize',px);
  if(sr&&'MutationObserver' in window)new MutationObserver(upd).observe(sr,{childList:true,characterData:true,subtree:true});
  /* down to the bet section without touching the address (the tabs live in the #) */
  a.addEventListener('click',function(e){e.preventDefault();var r=matchMedia('(prefers-reduced-motion:reduce)').matches;
    s.tabIndex=-1;s.scrollIntoView({behavior:r?'auto':'smooth',block:'start'});s.focus({preventScroll:true})});
}
window.__r31={shot:'.r31-cd'};
