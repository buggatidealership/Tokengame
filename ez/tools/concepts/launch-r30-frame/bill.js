/* Round 30, concept "bill": the explainer film as the bout's picture on a letterpress fight-night handbill.
   The bill is the site's card stock, torn at the top and bottom (a light fibre rim where the sheet split) and pasted on the night wall
   with the site's hard ink shadow, drawn by its own layer (no filter over the playing film). "How it works" is printed above the
   picture in wood type in two passes ("How it" black, "works" red, the red a hair out of register); a rule row of small type
   between red brass rules carries "$EZ presents" and the running time (the same small.vt-s, still counted down by x2plus.js).
   Idempotent: a second run reuses the layer, the row and the observers. */
var D=document,H=D.documentElement,vt=D.querySelector('.x2p-vt');if(!vt)return;
H.classList.add('r30bill');
var tag=vt.querySelector('.vt-tag'),vs=vt.querySelector('.vt-s'),vp=vt.querySelector('.vt-p'),v=vt.querySelector('video');
/* the press filters: the site's own ink roughening (x2pInk's numbers) */
if(!D.getElementById('r30bInk')){var fs=D.createElementNS('http://www.w3.org/2000/svg','svg');fs.setAttribute('width','0');fs.setAttribute('height','0');fs.setAttribute('aria-hidden','true');fs.style.cssText='position:absolute;width:0;height:0';
  fs.innerHTML='<filter id="r30bInk" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale=".8" xChannelSelector="R" yChannelSelector="G"/></filter>';
  fs.id='r30bSvg';D.body.appendChild(fs);fs.firstChild.id='r30bInk'}
/* the sheet: shadow, fibre rim, printed face (aria-hidden, behind the film) */
var bl=vt.querySelector(':scope>.r30-bl');
if(!bl){bl=D.createElement('div');bl.className='r30-bl';bl.setAttribute('aria-hidden','true');bl.innerHTML='<i class="sh"></i><i class="rim"></i><i class="pa"></i>';vt.insertBefore(bl,vt.firstChild)}
/* the head: the same h2, its words split into the two passes: "How it" in the black, "works" in the red (it still reads "How it works") */
if(tag&&!tag.querySelector('.r30-hw')){var t='';for(var n=tag.firstChild;n;){var nx=n.nextSibling;if(n.nodeType===3){t+=n.nodeValue;tag.removeChild(n)}n=nx}
  t=t.replace(/\s+/g,' ').trim();var cut=t.lastIndexOf(' ');
  var k1=D.createElement('span'),k2=D.createElement('span');k1.className='r30-hw k';k2.className='r30-hw r';k1.textContent=t.slice(0,cut+1);k2.textContent=t.slice(cut+1);
  tag.insertBefore(k1,tag.firstChild);tag.insertBefore(k2,k1.nextSibling)}
/* the rule row: "$EZ presents" and the running time (the same small.vt-s, moved out of the heading) */
var rr=vt.querySelector('.r30-rr');
if(!rr){rr=D.createElement('div');rr.className='r30-rr';rr.setAttribute('aria-hidden','true');
  rr.innerHTML='<span class="l">$EZ presents</span><i class="r30-rl"></i><span class="r"><em class="tl">Running time</em></span>';
  vt.insertBefore(rr,vp)}
if(vs&&vs.parentNode!==rr.querySelector('.r'))rr.querySelector('.r').appendChild(vs);
/* "Running time 1:20" before and after; "Time left 0:58" while it counts down */
var full=function(){var d=v&&isFinite(v.duration)&&v.duration?v.duration:80;d=Math.round(d);return Math.floor(d/60)+':'+('0'+d%60).slice(-2)};
var lab=function(){var tl=rr.querySelector('.tl'),t=vs?vs.textContent:'',w=t&&t!==full()?'Time left':'Running time';if(tl.textContent!==w)tl.textContent=w};
if(vs&&!vs.__r30){vs.__r30=1;new MutationObserver(lab).observe(vs,{childList:true,characterData:true,subtree:true});if(v)v.addEventListener('loadedmetadata',lab)}
lab();
/* the torn edges, drawn to the sheet's real width in px (a tear's grain is in pixels, not percent) and redrawn when it changes:
   a slow wander, fine fibre jitter and a few deeper bites; the printed face tears a little short of the rim, so a pale fibre edge
   shows where the sheet split. The shadow follows the rim. */
function rnd(s){return function(){s=(s*16807)%2147483647;return (s-1)/2147483646}}
/* 1D value noise in octaves (wavelengths 64, 23, 9 and 3.5px): irregular like a real tear, no repeating bump */
function edge(seed,W,base){var r=rnd(seed),oc=[[64,1.15],[23,.7],[9,.42],[3.5,.22]].map(function(o){var g=[];for(var k=0;k<=W/o[0]+2;k++)g.push(r()*2-1);return [o[0],o[1],g]}),p=[],bite=0,bw=0,bd=0;
  function vn(o,x){var t=x/o[0],k=Math.floor(t),f=t-k,u=f*f*(3-2*f);return o[1]*(o[2][k]*(1-u)+o[2][k+1]*u)}
  for(var x=0;x<=W+.01;x+=1.2){var y=base;oc.forEach(function(o){y+=vn(o,x)});y+=(r()-.5)*.35;
    if(bite<=0&&r()<.008){bw=4+r()*7;bd=1+r()*1.8;bite=bw}
    if(bite>0){y+=bd*Math.sin(Math.PI*(1-bite/bw));bite-=1.2}
    p.push([Math.min(x,W),Math.max(0,y)])}return p}
function face(seed,rim){var r=rnd(seed),run=0,amt=0;return rim.map(function(q){if(run<=0&&r()<.03){run=8+r()*22;amt=.8+r()*1.6}var e=.7+r()*.45+(run>0?amt:0);run-=1.2;return [q[0],q[1]+e]})}
function poly(top,bot){var s=[];top.forEach(function(q){s.push(q[0].toFixed(1)+'px '+q[1].toFixed(2)+'px')});
  for(var j=bot.length-1;j>=0;j--)s.push(bot[j][0].toFixed(1)+'px calc(100% - '+bot[j][1].toFixed(2)+'px)');return 'polygon('+s.join(',')+')'}
function draw(){var W=Math.round(bl.getBoundingClientRect().width);if(!W||W===bl.__w)return;bl.__w=W;
  var tR=edge(11,W,2.6),bR=edge(29,W,2.6),tF=face(47,tR),bF=face(83,bR),rim=poly(tR,bR);
  bl.querySelector('.sh').style.clipPath=rim;bl.querySelector('.rim').style.clipPath=rim;bl.querySelector('.pa').style.clipPath=poly(tF,bF)}
draw();
if(!vt.__r30ro&&window.ResizeObserver){vt.__r30ro=new ResizeObserver(draw);vt.__r30ro.observe(vt)}
