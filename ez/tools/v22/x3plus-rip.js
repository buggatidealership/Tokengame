/* EZ Live X3+ only (owner, 2026-10-22): the ticket rip mockup. An Admit One ticket covers the first screen; scrolling tears it down
   its perforation (the tear spreads from the top, then the halves fly apart and fall) while the headline and the explainer film rise
   into place under it. The page scrolls normally the whole time: a spacer above the headline gives the tear its distance, and once
   the ticket is gone the spacer is taken out while the page is still, so nothing jumps (an instant scroll: the page's own smooth
   scrolling would show the correction). A tap on the ticket tears it for you. Not
   with reduced motion, not when the page opens on another tab or already scrolled. Styles: x3plus-rip.css. */
(function(){
  var d=document,html=d.documentElement;
  if(!html.classList.contains('x2p'))return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var onOv=function(){var h=location.hash;return !h||h==='#'||h==='#/'};
  if(!onOv()||window.scrollY>4)return;
  var h1=d.querySelector('h1:not(.sr)');if(!h1)return;
  var sec=h1.closest('section')||h1,hdr=d.querySelector('header.top');
  // the tear: a jagged line down the middle, the same for both halves (seeded, so it is the same every visit)
  var seed=11,rnd=function(){seed=seed*16807%2147483647;return seed/2147483647};
  var N=28,pts=[];for(var i=0;i<=N;i++)pts.push([(rnd()-.5)*8+(i%2?(rnd()-.5)*5:0),i/N*100]);
  var line=function(off){return pts.map(function(p){return 'calc(50% + '+(p[0]+off).toFixed(1)+'px) '+p[1].toFixed(2)+'%'})};
  var clipL=function(off){return 'polygon(0 0,'+line(off).join(',')+',0 100%)'};
  var clipR=function(off){return 'polygon(100% 0,100% 100%,'+line(off).reverse().join(',')+')'};
  var ox='calc(50% + '+pts[N][0].toFixed(1)+'px)';
  var face='<div class="x3r-band g">★ $EZ · Season 1 ★</div><div class="x3r-body"><div class="x3r-ad">Admit one</div><div class="x3r-ru"></div>'+
    '<div class="x3r-hl">We\'re putting buybacks <em>in the hands of an AI.</em></div><div class="x3r-ru"></div>'+
    '<div class="x3r-mt"><span>The explainer</span><span>1:07</span></div><div class="x3r-no"><i></i><b>Nº 000001</b></div></div>'+
    '<div class="x3r-band r">✂ Tear here ✂</div>';
  var half=function(s,clip,fib){return '<div class="x3r-half '+s+'" style="--ox:'+ox+';--s:'+(s==='l'?-1:1)+'"><div class="x3r-tug">'+
    '<div class="x3r-fib" style="clip-path:'+fib+'"></div><div class="x3r-face" style="clip-path:'+clip+'">'+face+'</div></div></div>'};
  var el=d.createElement('div');el.className='x3r idle';el.setAttribute('aria-hidden','true');
  el.innerHTML='<div class="x3r-bg"></div><div class="x3r-stage">'+half('l',clipL(0),clipL(2.6))+half('r',clipR(0),clipR(-2.6))+'</div>'+
    '<div class="x3r-hint"><span>Scroll to tear it open</span><i></i><i></i><i></i></div>';
  var sp=d.createElement('div');sp.className='x3r-sp';sp.setAttribute('aria-hidden','true');
  sec.parentNode.insertBefore(sp,sec);d.body.appendChild(el);
  var L=el.querySelector('.x3r-half.l'),R=el.querySelector('.x3r-half.r'),D=360,done=false,raf=0;
  var measure=function(){var t=hdr?Math.round(hdr.getBoundingClientRect().bottom):0;el.style.setProperty('--x3r-top',Math.max(0,t)+'px');
    D=Math.round(Math.min(460,Math.max(300,innerHeight*.5)));sp.style.height=D+'px'};
  var cl=function(x){return x<0?0:x>1?1:x},sm=function(a,b,x){x=cl((x-a)/(b-a));return x*x*(3-2*x)};
  var frame=function(){raf=0;if(done)return;
    var p=cl(window.scrollY/D),a=cl(p/.34),q=cl((p-.34)/.66),W=innerWidth;
    el.classList.toggle('idle',p<.004);
    var rot=9*a*a+30*q*q,tx=q*q*W*.62,ty=q*q*240+q*24,op=1-sm(.55,1,q);
    L.style.setProperty('--rt',(-rot).toFixed(2)+'deg');R.style.setProperty('--rt',rot.toFixed(2)+'deg');
    L.style.setProperty('--tx',(-tx).toFixed(1)+'px');R.style.setProperty('--tx',tx.toFixed(1)+'px');
    L.style.setProperty('--ty',ty.toFixed(1)+'px');R.style.setProperty('--ty',(ty*1.08).toFixed(1)+'px');
    L.style.setProperty('--op',op.toFixed(3));R.style.setProperty('--op',op.toFixed(3));
    el.style.setProperty('--bgo',(1-sm(.28,.86,p)).toFixed(3));el.style.setProperty('--hio',cl(1-p*7).toFixed(3));
    el.style.setProperty('--sc',(1+.025*Math.sin(Math.PI*a)).toFixed(4));
    if(p>=1)finish(true)};
  var tick=function(){if(!raf)raf=requestAnimationFrame(frame)};
  var t=0,idle=function(){clearTimeout(t);t=setTimeout(collapse,240)};
  // the spacer goes once the page is still: keep the film exactly where it is on screen while it does
  var collapse=function(){if(!sp.isConnected)return;var ref=d.querySelector('.x2p-vt')||sec,b=ref.getBoundingClientRect().top;
    sp.remove();var a2=ref.getBoundingClientRect().top;if(Math.abs(a2-b)>.5)window.scrollBy({top:a2-b,left:0,behavior:'instant'});removeEventListener('scroll',idle)};
  var finish=function(keep){if(done)return;done=true;el.hidden=true;removeEventListener('scroll',tick);removeEventListener('resize',onRs);
    if(keep){var vt=d.querySelector('.x2p-vt');if(vt){vt.classList.add('x3r-pulse');setTimeout(function(){vt.classList.remove('x3r-pulse')},3800)}
      addEventListener('scroll',idle,{passive:true});idle()}else if(sp.isConnected)sp.remove()};
  var onRs=function(){measure();tick()};
  el.querySelector('.x3r-stage').addEventListener('click',function(){window.scrollTo({top:D+2,behavior:'smooth'})});
  addEventListener('hashchange',function(){if(!onOv())finish(false)});
  addEventListener('scroll',tick,{passive:true});addEventListener('resize',onRs);
  measure();frame();
})();
