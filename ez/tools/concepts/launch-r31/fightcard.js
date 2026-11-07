/* Round 31, bet section "The fight card" (owner, 2026-10-23: "move the NVIDIA card and the bet at the bottom... a section with
   the bet... the NVIDIA ticket and the timer... it needs to allude to the fact that there's gonna be more bets coming, Season 2").
   The Overview's fight-night voice ("on the card"): 05 The bet, "First of many.", a strap with the stakes (where the pool comes
   from, who makes the call, right, wrong), the NVIDIA ticket as the main event (the live element itself, moved, so its countdown
   keeps running), then a small Season 2 ticket under it, cut from the same die (the bet ticket's own paper, rules, strips and
   shadows, by its own classes): the Mag 7 printed into the card in one ink as the coming bets, "& more" after them, "Dates TBA".
   Get $EZ becomes 06. Idempotent. */
var d=document,H=d.documentElement,$=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var bt=$('.x2p-bt'),get=$('#get');
if(!bt||!get)return;
/* the Mag 7, as the sheet's MAG 7 column marks them; names and logos from ez-data.js (TICKERS, CO_LOGOS) */
var ORDER=['AAPL','MSFT','GOOGL','AMZN','META','TSLA','NVDA'];
var inSheet={};if(typeof SHEET!=='undefined')SHEET.forEach(function(r){if(String(r[17]).toUpperCase()==='TRUE')inSheet[String(r[1]).toUpperCase()]=1});
var MAG=ORDER.filter(function(t){return !Object.keys(inSheet).length||inSheet[t]});
var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var sec=$('#x2pFc');
if(!sec){
  var media=typeof MEDIA!=='undefined'?MEDIA:'media/';
  var bouts=MAG.map(function(t){var L=(typeof CO_LOGOS!=='undefined'&&CO_LOGOS[t])||null,f=L&&(L.f||L),nm=(typeof TICKERS!=='undefined'&&TICKERS[t])||t;
    return '<li><span class="fc-lg'+(L&&L.dark?' dk':'')+'" aria-hidden="true">'+(f?'<img src="'+media+f+'" alt="" loading="lazy" decoding="async">':'')+'</span><b aria-hidden="true">'+esc(t)+'</b><span class="sr">'+esc(nm)+'</span></li>'}).join('');
  sec=d.createElement('section');sec.className='sec x2p-fc';sec.id='x2pFc';sec.setAttribute('aria-labelledby','x2pFcH');
  sec.innerHTML='<div class="sh"><div class="tx"><span class="no">05</span><span class="eb">The bet</span><h2 id="x2pFcH">First of many.</h2></div>'+
    '<div class="x2p-strap"><span class="x2p-bug" aria-hidden="true">The stakes</span><ul class="x2o-ul lede fc-stb">'+
      '<li>$EZ trading fees fill the pool.</li>'+
      '<li>The AI on top of the board makes the call.</li>'+
      '<li><b class="x2p-hk fc-ok">Right call:</b> profits buy back $EZ.</li>'+
      '<li><b class="x2p-hk fc-ng">Wrong call:</b> the pool can be wiped out.</li></ul></div></div>'+
    '<div class="fc-main"></div>'+
    /* the Season 2 ticket: the bet ticket's die (corner bites, no stub), its paper, double rule, strips and both shadows */
    '<div class="fc-s2">'+
      '<div class="bt-sh" aria-hidden="true"><i></i></div><div class="bt-hs" aria-hidden="true"></div>'+
      '<div class="bt-p fc-p">'+
        '<div class="bt-pp" aria-hidden="true"><i class="bt-r1"></i><i class="bt-r2"></i></div>'+
        '<h3 class="sr" id="fcS2H">Season 2: more bets</h3>'+
        '<ul class="fc-bouts" aria-labelledby="fcS2H">'+bouts+
          '<li class="fc-more"><span class="fc-lg fc-amp" aria-hidden="true">&amp;</span><b aria-hidden="true">More</b><span class="sr">And more</span></li></ul>'+
        '<p class="sr">Dates to be announced.</p>'+
        '<div class="bt-st bt-hd" aria-hidden="true"><span class="fc-c"><i></i>Season 2: more bets<i></i></span></div>'+
        '<div class="bt-st bt-ft" aria-hidden="true"><span class="fc-c">Dates TBA</span></div>'+
      '</div></div>';
  /* the inks: a logo in one ink (light-ground logos: white stays paper; a logo made for a dark ground: all of it ink), and the
     press's slight unevenness (the PRINTLOGO block's #x2pPrint, copied so this works on its own) */
  var sv=d.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('width','0');sv.setAttribute('height','0');sv.setAttribute('aria-hidden','true');sv.setAttribute('focusable','false');sv.style.cssText='position:absolute;width:0;height:0';
  sv.innerHTML='<filter id="fcInkL" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">'+
      '<feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.063 -3.576 -0.361 5 0" result="a"/>'+
      '<feComposite in="a" in2="SourceAlpha" operator="in" result="m"/><feFlood flood-color="#1b181c" flood-opacity=".94"/><feComposite in2="m" operator="in"/></filter>'+
    '<filter id="fcInkD" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feFlood flood-color="#1b181c" flood-opacity=".94"/><feComposite in2="SourceAlpha" operator="in"/></filter>'+
    '<filter id="fcPrint" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" seed="13" result="n"/>'+
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="0.9" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="2.3" numOctaves="1" seed="21" result="g"/>'+
      '<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.3" result="m"/><feComposite in="d" in2="m" operator="in"/></filter>';
  sec.appendChild(sv);
  get.parentNode.insertBefore(sec,get);
}
var main=$('.fc-main',sec);if(bt.parentNode!==main)main.appendChild(bt);
/* the film's section is the film alone now */
var fs=$('section.x2o-bet');if(fs)fs.setAttribute('aria-label','How it works');
H.classList.add('r31-fc');
/* numbers: Get $EZ follows as 06. X2's order routine re-runs on every return to the Overview and puts Get $EZ straight after the
   highlights (numbering it 05), so the section goes back in front of it each time (production: put it in that routine instead) */
var fix=function(){var g=$('#get'),s=$('#x2pFc');if(!g||!s)return;if(s.nextElementSibling!==g)g.parentNode.insertBefore(s,g);var n=$('.sh .no',g);if(n&&n.textContent!=='06')n.textContent='06'};
fix();
/* each logo at the same optical size: its ink measured from the file itself (the white of a logo made for a light ground is
   paper, not ink), scaled so every mark carries about the same weight, and centred on its ink, not on its file's box */
var fitLogo=function(img){var box=img.parentNode;if(!img.naturalWidth||!box||!box.offsetWidth)return;
  var W=box.clientWidth,Hh=box.clientHeight,nw=img.naturalWidth,nh=img.naturalHeight,dk=box.classList.contains('dk');
  var m=img.__fcInk;if(!m){try{var c=d.createElement('canvas');c.width=nw;c.height=nh;var x=c.getContext('2d');x.drawImage(img,0,0);var px=x.getImageData(0,0,nw,nh).data,x0=nw,y0=nh,x1=-1,y1=-1,sum=0;
      for(var y=0;y<nh;y++)for(var i=0;i<nw;i++){var o=(y*nw+i)*4,a=px[o+3]/255,l=(.2126*px[o]+.7152*px[o+1]+.0722*px[o+2])/255,k=dk?a:a*Math.max(0,Math.min(1,5*(1-l)));
        if(k>.25){if(i<x0)x0=i;if(i>x1)x1=i;if(y<y0)y0=y;if(y>y1)y1=y}sum+=k}
      m=img.__fcInk=x1<0?null:{x0:x0,y0:y0,w:x1-x0+1,h:y1-y0+1,c:sum/((x1-x0+1)*(y1-y0+1))}}catch(e){m=null}}
  if(!m){img.style.cssText='';return}
  var s=Math.min(W/m.w,Hh/m.h,Math.sqrt(W*Hh*.42/(m.w*m.h*Math.sqrt(m.c))));
  img.style.cssText='position:absolute;max-width:none;width:'+(nw*s).toFixed(2)+'px;height:'+(nh*s).toFixed(2)+'px;left:'+(W/2-(m.x0+m.w/2)*s).toFixed(2)+'px;top:'+(Hh/2-(m.y0+m.h/2)*s).toFixed(2)+'px'};
var fitLogos=function(){$$('#x2pFc .fc-lg img').forEach(function(im){if(im.complete&&im.naturalWidth)fitLogo(im);else if(!im.__fcL){im.__fcL=1;im.addEventListener('load',function(){fitLogo(im)})}})};
/* the strap's lines one line each (the standings strap's rule): all four step down together, half a pixel at a time, until
   none wraps; too narrow even at 12px (a 320px phone): the full size, wrapped */
var fitStrap=function(){var ls=$$('#x2pFc .x2p-strap li');if(!ls.length||!ls[0].offsetWidth)return;ls.forEach(function(l){l.style.fontSize=''});
  var nl=function(l){var g=d.createRange();g.selectNodeContents(l);var t=[];[].forEach.call(g.getClientRects(),function(r){if(r.width&&!t.some(function(q){return Math.abs(q-r.top)<4}))t.push(r.top)});return t.length};
  var z=parseFloat(getComputedStyle(ls[0]).fontSize),n=0;
  while(ls.some(function(l){return nl(l)>1})&&z>12&&n++<40){z-=.5;ls.forEach(function(l){l.style.fontSize=z+'px'})}
  if(ls.some(function(l){return nl(l)>1}))ls.forEach(function(l){l.style.fontSize=''})};
var all=function(){fix();fitStrap();fitLogos()};
all();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(all);
if(!window.__r31fc){window.__r31fc=1;var ft;addEventListener('resize',function(){clearTimeout(ft);ft=setTimeout(all,120)});addEventListener('load',all);
  addEventListener('hashchange',function(){setTimeout(all,0)})}
window.__r31={shot:'#x2pFc'};
