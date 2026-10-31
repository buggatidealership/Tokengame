/* X3+ chrome, round H, part 2 (owner, 2026-10-31: F3 "Through the page", from tools/concepts/worlds/comic/story/h/chrome/f3.js):
   the explainer film on the cover seen through a hole torn in a comic page, a hand-cut caption box presenting it, the running time in
   a burst at the film's corner. The film and its controls are the page's own (x2plus.js) and untouched: the frame is a layer inside
   .x2p-vt above the picture and below the buttons, so play, sound, the film tap and the corner player work as before (the corner
   player moves only the video element). Part 1 (the loading cover, L3) is CSS only, in h_chrome.css.
   Fixed from the mockup: the burst collapsed to nothing (width:max-content beat its size) and the frame covered the sound button.
   Starts as soon as the cover is mounted (html.sh-on, before the cover lifts, so the visitor never sees the old frame swap out);
   never on X5+ (cd-on). Sets html.hc-f3; every page rule is gated by it. A failure is kept in window.__hcErr. */
(function(){var H=document.documentElement,D=document;if(window.__hcF3)return;window.__hcF3=1;
var IMG='media/film-tear-f3.webp',IW=896,IH=604,HOLE=[159,83,728,505];  /* the painting (896x604) and the hole's bounding box in it */
try{var pre=new Image();pre.decoding='async';pre.src=IMG}catch(e){}       /* ask for it now, while the page is still being built */
var BURST='M50 2 L58 16 L74 6 L72 22 L96 18 L82 32 L99 44 L78 46 L86 64 L66 54 L56 69 L46 55 L28 66 L30 49 L4 52 L18 38 L2 24 L24 24 L18 6 L38 15 Z',
    BURST_IN='M50 12 L56 22 L68 16 L66 28 L84 26 L74 35 L86 43 L71 44 L76 56 L62 50 L55 60 L48 51 L35 58 L36 47 L17 49 L27 39 L16 30 L31 30 L28 18 L41 24 Z';
function rnd(s){return function(){s=(s*16807)%2147483647;return s/2147483647}}
/* a hand-cut box: a wobbly outline (thick outer ink, thin inner line), a gold fill with a shade band and a highlight, a hard ink drop */
function inkBox(el,seed){var R=rnd(seed),j=[];for(var i=0;i<16;i++)j.push(R()-.5);
  var sv=D.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('class','hcf-ib');sv.setAttribute('aria-hidden','true');el.insertBefore(sv,el.firstChild);
  var w0=0,h0=0;el.__ib=function(){var w=el.offsetWidth,h=el.offsetHeight;if(!w||(w===w0&&h===h0))return;w0=w;h0=h;var a=1.8;
    function pt(x,y,k){return (x+j[k%16]*a).toFixed(1)+','+(y+j[(k+5)%16]*a).toFixed(1)}
    var c=[[0,0],[w*.34,0],[w*.7,0],[w,0],[w,h*.5],[w,h],[w*.62,h],[w*.28,h],[0,h],[0,h*.48]];
    var d='M'+c.map(function(q,k){return pt(q[0],q[1],k)}).join(' L')+'Z',ins=Math.max(3,Math.min(5,h*.08));
    var d2='M'+c.map(function(q,k){return pt(q[0]+(q[0]<w/2?ins:-ins),q[1]+(q[1]<h/2?ins:-ins),k+3)}).join(' L')+'Z',id='hcb'+seed;
    sv.setAttribute('viewBox','-4 -4 '+(w+8)+' '+(h+8));sv.setAttribute('width',w+8);sv.setAttribute('height',h+8);
    sv.innerHTML='<defs><clipPath id="'+id+'"><path d="'+d+'"/></clipPath></defs><path d="'+d+'" transform="translate(3 3.5)" fill="#15121a"/><path d="'+d+'" fill="#fdbc2a"/>'
      +'<g clip-path="url(#'+id+')"><path d="M0 '+h*.64+' Q '+w*.5+' '+h*.56+' '+w+' '+h*.7+' L '+w+' '+(h+9)+' L 0 '+(h+9)+'Z" fill="rgba(0,0,0,.16)"/><path d="M'+w*.06+' '+h*.2+' L '+w*.22+' '+h*.16+'" stroke="rgba(255,255,255,.5)" stroke-width="1.6" stroke-linecap="round"/></g>'
      +'<path d="'+d+'" fill="none" stroke="#15121a" stroke-width="2.6" stroke-linejoin="round"/><path d="'+d2+'" fill="none" stroke="#15121a" stroke-width=".8" opacity=".55"/>'};
  el.__ib()}
var vt=null,fr=null,ro=null;
function logo(){var s=D.querySelector('#x2pLoad svg')||D.querySelector('header.top .brand svg');return s?s.outerHTML:''}
function dur(){var e=vt&&vt.querySelector('.vt-s');return e?e.textContent.trim():'1:20'}
/* place the painting so its hole sits centred on the film, the hole as wide as the film; the burst on the film's bottom-right corner,
   kept inside the frame; the caption box redrawn to its size */
function lay(){if(!vt||!fr)return;var f=vt.querySelector('.vt-f');if(!f)return;var fb=f.getBoundingClientRect(),cb=fr.getBoundingClientRect();if(!fb.width||!cb.width)return;
  var pw=fb.width*IW/(HOLE[2]-HOLE[0]),ph=pw*IH/IW,s=pw/IW,cx=fb.left-cb.left+fb.width/2,cy=fb.top-cb.top+fb.height/2;
  var p=fr.querySelector('.hcf-p');p.style.width=pw.toFixed(1)+'px';
  p.style.left=(cx-(HOLE[0]+HOLE[2])/2*s).toFixed(1)+'px';p.style.top=(cy-(HOLE[1]+HOLE[3])/2*s).toFixed(1)+'px';
  var bu=fr.querySelector('.hcf-bu'),bw=bu.offsetWidth,bh=bu.offsetHeight;   /* its tilt adds about 6% to each side: keep 8px clear of the frame */
  var bx=Math.min(fb.right-cb.left-bw*.38,cb.width-bw*1.06-8),by=Math.min(fb.bottom-cb.top-bh*.42,cb.height-bh*1.1-6);
  bu.style.left=bx.toFixed(1)+'px';bu.style.top=by.toFixed(1)+'px';
  var cap=fr.querySelector('.hcf-cap');if(cap.__ib)cap.__ib()}
function build(){var v=D.querySelector('#wc-book .wc-cover .sh-film .x2p-vt');if(!v||!v.querySelector('.vt-f'))return false;
  if(v===vt&&v.querySelector('.hcf'))return true;vt=v;
  var bk=D.createElement('div');bk.className='hcf-bk';bk.setAttribute('aria-hidden','true');
  fr=D.createElement('div');fr.className='hcf';fr.setAttribute('aria-hidden','true');
  fr.innerHTML='<div class="hcf-c"><img class="hcf-p" src="'+IMG+'" alt="" decoding="async" width="'+IW+'" height="'+IH+'"></div>'
    +'<div class="hcf-cap"><span class="hcf-lg">'+logo()+'</span><span><small>presents</small><b>How it works</b></span></div>'
    +'<div class="hcf-bu"><svg viewBox="0 0 100 70" aria-hidden="true"><path d="'+BURST+'" fill="#15121a" transform="translate(2.5 3)"/><path d="'+BURST+'" fill="#ff3a31" stroke="#15121a" stroke-width="2.4" stroke-linejoin="round"/><path d="'+BURST_IN+'" fill="#fdbc2a" stroke="#15121a" stroke-width=".8"/></svg><b>'+dur()+'</b></div>';
  v.appendChild(bk);v.appendChild(fr);inkBox(fr.querySelector('.hcf-cap'),21);
  /* the time follows the page's own running time ("1:20", then the time left while it plays) */
  var st=v.querySelector('.vt-s');if(st)new MutationObserver(function(){var b=fr&&fr.querySelector('.hcf-bu b');if(b)b.textContent=dur()}).observe(st,{childList:true,characterData:true,subtree:true});
  fr.querySelector('.hcf-p').addEventListener('load',lay);
  if(ro)ro.disconnect();ro=new ResizeObserver(lay);ro.observe(v);ro.observe(fr);ro.observe(fr.querySelector('.hcf-cap'));
  H.classList.add('hc-f3');lay();return true}
function go(){try{if(H.classList.contains('cd-on'))return;build()}catch(e){window.__hcErr=e;console.error(e)}}
var mo=new MutationObserver(function(){if(H.classList.contains('sh-on')&&!vt){go();if(vt)mo.disconnect()}});mo.observe(H,{attributes:true,attributeFilter:['class']});
if(H.classList.contains('sh-on'))go();
/* a redrawn cover or a font arriving: rebuild or re-lay */
if(D.fonts&&D.fonts.ready)D.fonts.ready.then(function(){if(vt)lay()});
var w0=innerWidth;addEventListener('resize',function(){if(innerWidth===w0)return;w0=innerWidth;setTimeout(function(){go();lay()},120)});
})();
