/* f4 "A countdown line" (round 31). The bet ticket leaves the first screen (as f1); under the film one slim stub keeps the stakes in
   view: "Bet #1: NVIDIA" (NVIDIA foil-stamped, the bet ticket's recipe) and the time left, read from the page's own countdown
   (#gpuSr, which the moved ticket's chip keeps updating), with an arrow; the whole stub is a link down to the bet section. Idempotent. */
var d=document,H=d.documentElement,bt=d.querySelector('.x2p-bt'),get=d.getElementById('get');
var s=d.getElementById('r31-bet');
if(bt&&get){if(!s){s=d.createElement('section');s.id='r31-bet';s.className='sec r31-bet';s.setAttribute('aria-label','The bet');get.parentNode.insertBefore(s,get)}
  if(bt.parentNode!==s)s.appendChild(bt)}
H.classList.add('r31-f4');
var vt=d.querySelector('.x2p-vt'),sr=d.getElementById('gpuSr');
if(vt&&s&&!d.querySelector('.r31-cd')){
  var a=d.createElement('a');a.className='r31-cd';a.href='#r31-bet';
  a.innerHTML='<span class="cd-k"><i class="fb l" aria-hidden="true"></i><span class="cd-n" aria-hidden="true"><span class="ink">Bet #1:</span> <em data-t="NVIDIA">NVIDIA</em></span>'+
    '<i class="cd-pf" aria-hidden="true"></i><span class="cd-t ink" aria-hidden="true"></span>'+
    '<i class="cd-ar" aria-hidden="true"><svg viewBox="0 0 12 14" width="10" height="12"><path d="M6 1v10M1.8 7.2L6 11.6l4.2-4.4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"/></svg></i>'+
    '<i class="fb r" aria-hidden="true"></i></span>';
  var w=d.createElement('div');w.className='r31-cdw';w.appendChild(a);vt.after(w);
  var t=a.querySelector('.cd-t');
  function upd(){var m=sr&&sr.textContent.match(/(\d+)\s*days?,\s*(\d+)\s*hours?,\s*(\d+)\s*minutes?/);
    if(!m){t.innerHTML='';a.setAttribute('aria-label','Bet #1: NVIDIA. See the bet.');return}
    var h='<b>'+m[1]+'</b><small>days</small><b>'+('0'+m[2]).slice(-2)+'</b><small>hrs</small><b>'+('0'+m[3]).slice(-2)+'</b><small>min</small>';
    if(t.innerHTML!==h)t.innerHTML=h;a.setAttribute('aria-label','Bet #1: NVIDIA, '+m[1]+' days, '+(+m[2])+' hours, '+(+m[3])+' minutes left. See the bet.')}
  upd();if(sr&&'MutationObserver' in window)new MutationObserver(upd).observe(sr,{childList:true,characterData:true,subtree:true});
  /* down to the bet section without touching the address (the tabs live in the #) */
  a.addEventListener('click',function(e){e.preventDefault();var r=matchMedia('(prefers-reduced-motion:reduce)').matches;
    s.tabIndex=-1;s.scrollIntoView({behavior:r?'auto':'smooth',block:'start'});s.focus({preventScroll:true})});
}
window.__r31={shot:'.r31-cd'};
