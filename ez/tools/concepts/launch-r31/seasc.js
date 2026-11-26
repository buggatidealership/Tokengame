/* Round 32, bet section "The roll with a Season 2 ticket" (owner, 2026-10-24: the fight card is the favourite; "a combination
   of the ticket roll and the fight card"): 05 The bet, "The first of many", the stakes on a strap, the NVIDIA ticket as it is
   (the live element itself, moved, so its countdown keeps running), and joined to it at a perforation, as on the roll, the
   Season 2 ticket: the roll's ticket 2 (the same card and die: bands, double rule, serial No 000002), its picture window
   holding the coming bets the way the fight card's Season 2 ticket does: four logos printed into the card in one ink, one per
   report day (this season Meta and Tesla reported the same day, Alphabet and Microsoft, Apple and Amazon; NVIDIA alone), in the
   order they reported, "& more" in red ink, "Dates TBA" under them. Variants differ only in the second ticket's stub:
   a "Season ticket" printed, b "Bets #2+" pressed in with no ink (the roll's "Bet #2"), c a punch ticket: "Bets" printed over
   a row of numbered boxes, #2 to #5 and a red "+", none punched yet. Stacked on narrow columns, side by side once the column
   holds two (as a roll runs). Get $EZ becomes 06. Idempotent. Variant c. */
var d=document,H=d.documentElement,$=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var bt=$('.x2p-bt'),get=$('#get');
if(!bt||!get)return;
var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
/* the four, in the order they reported this season (ez-data.js: TSLA 10/21, GOOGL 10/27, AAPL 10/28, NVDA 11/17) */
var PICK=['TSLA','GOOGL','AAPL','NVDA'];
var name=function(t){return (typeof TICKERS!=='undefined'&&TICKERS[t])||t};
var sec=$('#x2pSt');
if(!sec){
  sec=d.createElement('section');sec.className='sec x2p-r31 s2t-vc';sec.id='x2pSt';sec.setAttribute('aria-labelledby','x2pStH');
  sec.innerHTML='<div class="sh"><div class="tx"><span class="no">05</span><span class="eb">The bet</span><h2 id="x2pStH">The first of many</h2></div>'+
    '<div class="x2p-strap"><span class="x2p-bug" aria-hidden="true">The stakes</span><ul class="x2o-ul lede">'+
      '<li>$EZ trading fees fill the pool.</li>'+
      '<li>The AI on top makes the call.</li>'+
      '<li><b class="x2p-hk s2t-ok">Right call:</b> profits buy back $EZ.</li>'+
      '<li><b class="x2p-hk s2t-ng">Wrong call:</b> the pool can be wiped out.</li></ul></div></div>'+
    '<div class="r31-clip"><div class="r31-roll"></div></div>'+
    '<p class="sr">'+'Bets #2 and up. '+'Season 2 brings more bets: '+PICK.map(name).join(', ')+' and more. Dates to be announced.</p>';
  get.parentNode.insertBefore(sec,get);
}
var roll=$('.r31-roll',sec);
if(bt.parentNode!==roll)roll.insertBefore(bt,roll.firstChild);
/* the film's section is the film alone now: it takes its name from the film's own tag (an h2), not a second label */
var fs=$('section.x2o-bet'),tag=fs&&$('.vt-tag',fs);
if(fs&&tag){if(!tag.id)tag.id='x2pVtTag';fs.removeAttribute('aria-label');fs.setAttribute('aria-labelledby',tag.id)}
H.classList.add('r31-st');
/* the Season 2 ticket: the bet ticket's own die line, stock, bands, frame and numbering (its classes) */
if(!$('.r31-tail',roll)){
  var ink=[1,.84,.95,.88,1,.9],dy=[0,.3,-.2,.2,-.3,.1];
  var serial=function(n){return 'N<u>o</u> '+n.split('').map(function(c,i){return '<s style="opacity:'+ink[i]+';top:'+dy[i]+'px">'+c+'</s>'}).join('')};
  var media=typeof MEDIA!=='undefined'?MEDIA:'media/';
  var cells=PICK.map(function(t){var L=(typeof CO_LOGOS!=='undefined'&&CO_LOGOS[t])||null,f=L&&(L.f||L);
    return '<li><span class="s2t-lg'+(L&&L.dark?' dk':'')+'">'+(f?'<img src="'+media+f+'" alt="" decoding="async">':'')+'</span><b>'+esc(t)+'</b></li>'}).join('')+
    '<li class="s2t-more"><span class="s2t-lg s2t-amp">&amp;</span><b>More</b></li>';
  var stub=
    
    
    '<div class="s2t-lab"><b class="s2t-in">Bets</b></div><ol class="s2t-pn"><li><i>#</i>2</li><li><i>#</i>3</li><li><i>#</i>4</li><li><i>#</i>5</li><li class="pl">+</li></ol>'+
    '';
  var tail=d.createElement('div');tail.className='r31-tail';tail.setAttribute('aria-hidden','true');
  tail.innerHTML='<div class="r31-nx s2t"><div class="bt-sh"><i></i></div><div class="bt-hs"></div><div class="bt-p">'+
    '<div class="bt-pp"><i class="bt-pl"></i><i class="bt-r1"></i><i class="bt-r2"></i></div>'+
    '<div class="bt-b">'+stub+'</div>'+
    '<div class="bt-s"><div class="s2t-win"><ul class="s2t-row">'+cells+'</ul><span class="s2t-tba">Dates TBA</span></div></div>'+
    '<div class="bt-st bt-hd"><span class="l"><i></i>$EZ main event<i></i></span><span class="r">Season 2</span></div>'+
    '<div class="bt-st bt-ft"><span class="l">Admit one</span><span class="r e"><span class="bt-no">'+serial('000002')+'</span></span></div>'+
    '<i class="r31-perf"></i></div></div>';
  /* the inks: a logo in one ink (a logo made for a light ground: its white stays paper; one made for a dark ground: all of it
     ink), and the press's slight unevenness (the PRINTLOGO block's #x2pPrint, copied so this works on its own) */
  var sv=d.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('width','0');sv.setAttribute('height','0');sv.setAttribute('focusable','false');sv.style.cssText='position:absolute;width:0;height:0';
  sv.innerHTML='<filter id="s2tInkL" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">'+
      '<feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.063 -3.576 -0.361 5 0" result="a"/>'+
      '<feComposite in="a" in2="SourceAlpha" operator="in" result="m"/><feFlood flood-color="#1b181c" flood-opacity=".94"/><feComposite in2="m" operator="in"/></filter>'+
    '<filter id="s2tInkD" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feFlood flood-color="#1b181c" flood-opacity=".94"/><feComposite in2="SourceAlpha" operator="in"/></filter>'+
    '<filter id="s2tPrint" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" seed="13" result="n"/>'+
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="0.9" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="2.3" numOctaves="1" seed="21" result="g"/>'+
      '<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.3" result="m"/><feComposite in="d" in2="m" operator="in"/></filter>';
  tail.appendChild(sv);
  roll.appendChild(tail);
}
/* numbers: Get $EZ follows as 06. X2's order routine re-runs on every return to the Overview and puts Get $EZ straight after the
   highlights, so the section goes back in front of it each time (production: put it in that routine instead) */
var fix=function(){var g=$('#get'),s=$('#x2pSt');if(!g||!s)return;if(s.nextElementSibling!==g)g.parentNode.insertBefore(s,g);var n=$('.sh .no',g);if(n&&n.textContent!=='06')n.textContent='06'};
fix();
/* each logo at the same optical size: its ink measured from the file itself (the white of a logo made for a light ground is
   paper, not ink), scaled so every mark carries about the same weight, and centred on its ink, not on its file's box
   (the fight card's fitLogo) */
var fitLogo=function(img){var box=img.parentNode;if(!img.naturalWidth||!box||!box.offsetWidth)return;
  var W=box.clientWidth,Hh=box.clientHeight,nw=img.naturalWidth,nh=img.naturalHeight,dk=box.classList.contains('dk');
  var m=img.__s2Ink;if(!m){try{var c=d.createElement('canvas');c.width=nw;c.height=nh;var x=c.getContext('2d');x.drawImage(img,0,0);var px=x.getImageData(0,0,nw,nh).data,x0=nw,y0=nh,x1=-1,y1=-1,sum=0;
      for(var y=0;y<nh;y++)for(var i=0;i<nw;i++){var o=(y*nw+i)*4,a=px[o+3]/255,l=(.2126*px[o]+.7152*px[o+1]+.0722*px[o+2])/255,k=dk?a:a*Math.max(0,Math.min(1,5*(1-l)));
        if(k>.25){if(i<x0)x0=i;if(i>x1)x1=i;if(y<y0)y0=y;if(y>y1)y1=y}sum+=k}
      m=img.__s2Ink=x1<0?null:{x0:x0,y0:y0,w:x1-x0+1,h:y1-y0+1,c:sum/((x1-x0+1)*(y1-y0+1))}}catch(e){m=null}}
  if(!m){img.style.cssText='';return}
  var s=Math.min(W/m.w,Hh/m.h,Math.sqrt(W*Hh*.42/(m.w*m.h*Math.sqrt(m.c))));
  img.style.cssText='position:absolute;max-width:none;width:'+(nw*s).toFixed(2)+'px;height:'+(nh*s).toFixed(2)+'px;left:'+(W/2-(m.x0+m.w/2)*s).toFixed(2)+'px;top:'+(Hh/2-(m.y0+m.h/2)*s).toFixed(2)+'px'};
var fitLogos=function(){$$('#x2pSt .s2t-lg img').forEach(function(im){if(im.complete&&im.naturalWidth)fitLogo(im);else if(!im.__s2L){im.__s2L=1;im.addEventListener('load',function(){fitLogo(im)})}})};
/* the strap's four lines one line each (the standings strap's rule): all four step down together, half a pixel at a time,
   until none wraps; too narrow even at 12px (a 320px phone): the full size, wrapped */
var fitStrap=function(){var ls=$$('#x2pSt .x2p-strap li');if(!ls.length||!ls[0].offsetWidth)return;ls.forEach(function(l){l.style.fontSize=''});
  var nl=function(l){var g=d.createRange();g.selectNodeContents(l);var t=[];[].forEach.call(g.getClientRects(),function(r){if(r.width&&!t.some(function(q){return Math.abs(q-r.top)<4}))t.push(r.top)});return t.length};
  var z=parseFloat(getComputedStyle(ls[0]).fontSize),n=0;
  while(ls.some(function(l){return nl(l)>1})&&z>12&&n++<40){z-=.5;ls.forEach(function(l){l.style.fontSize=z+'px'})}
  if(ls.some(function(l){return nl(l)>1}))ls.forEach(function(l){l.style.fontSize=''})};
var all=function(){fix();fitStrap();fitLogos()};
all();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(all);
if(!window.__r31st){window.__r31st=1;var ft,lw=innerWidth;addEventListener('resize',function(){if(innerWidth===lw)return;lw=innerWidth;clearTimeout(ft);ft=setTimeout(all,120)});addEventListener('load',all);
  addEventListener('hashchange',function(){setTimeout(all,0)})}
window.__r31={shot:'#x2pSt'};
