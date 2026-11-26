/* H_BANDS (owner, 2026-10-31: "each section its own ground... green, red, goldenish... but also dark"; the cream page paper goes):
   every Overview section of X3+ gets its own full-width ground in the logo's colours, painted on the page itself (html's background,
   one hard stop per section, an ink line where two meet, a soft lamp glow in each), so no section's markup changes. A beat caption
   belongs to the section after it. Overview only; the Leaderboard and Upcoming tabs keep their paper. Not on X5+ (cd-on). */
(function(){
var H=document.documentElement,D=document;
var MAP=[['wc-cover','#04070e','rgba(253,188,42,.07)'],['wc-chars','#2b0907','rgba(255,58,49,.16)'],['wc-season','#04261a','rgba(3,200,112,.13)'],
 ['wc-cliff','#2b0907','rgba(255,58,49,.14)'],['wc-splash','#1d1505','rgba(253,188,42,.12)'],['wc-bet','#04070e','rgba(253,188,42,.05)'],['wc-back','#04070e','rgba(253,188,42,.04)']];
var last='',ro=null,raf=0;
function on(){return H.classList.contains('p1-on')&&!H.classList.contains('cd-on')}
function draw(){raf=0;var bk=D.getElementById('wc-book');
 if(!on()||!bk){H.classList.remove('wc-bands');return}
 if(!bk.offsetHeight)return;
 var Y=scrollY,g=[],beat=null;
 for(var k=bk.firstElementChild;k;k=k.nextElementSibling){
  if(k.classList.contains('wc-beat')){beat=k;continue}
  if(k.tagName!=='SECTION')continue;
  var m=null;for(var i=0;i<MAP.length;i++)if(k.classList.contains(MAP[i][0])){m=MAP[i];break}
  if(!m){beat=null;continue}
  var a=(beat||k).getBoundingClientRect(),b=k.getBoundingClientRect();
  if(b.height)g.push({t:a.top+Y,b:b.bottom+Y,c:m[1],l:m[2]});beat=null}
 if(!g.length)return;
 var stops=[],glow=[],top=0,W=Math.min(innerWidth*.9,900);
 for(var j=0;j<g.length;j++){
  var s=j?Math.round((g[j-1].b+g[j].t)/2):0,e=j<g.length-1?Math.round((g[j].b+g[j+1].t)/2):null;
  if(j)stops.push('#000 '+(s-1)+'px','#000 '+(s+1)+'px');
  stops.push(g[j].c+' '+(j?s+1:0)+'px',g[j].c+' '+(e==null?'100%':(e-1)+'px'));
  var mid=Math.round((g[j].t+g[j].b)/2),hh=Math.round(Math.max(200,(g[j].b-g[j].t)*.6));
  glow.push('radial-gradient('+Math.round(W)+'px '+hh+'px at 50% '+mid+'px,'+g[j].l+',transparent)')}
 var v=glow.join(',')+',linear-gradient(180deg,'+stops.join(',')+')';
 if(v!==last){last=v;H.style.setProperty('--wc-bands',v)}
 H.classList.add('wc-bands')}
function ask(){if(!raf)raf=requestAnimationFrame(draw)}
function hook(){var bk=D.getElementById('wc-book');if(!bk){setTimeout(hook,300);return}
 if(!ro&&window.ResizeObserver){ro=new ResizeObserver(ask);ro.observe(bk)}
 new MutationObserver(ask).observe(bk,{childList:true});ask()}
new MutationObserver(ask).observe(H,{attributes:true,attributeFilter:['class','data-sec']});
addEventListener('load',ask);hook();
})();
