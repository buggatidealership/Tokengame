/* x2p_cb (round H38, owner 2026-11-03: "D the plate for the back card but bottom right should be the EZ stamp diegetically integrated
   into the card. Winner plate should be golden."): the back of a round opened big (#x2pRm, the round's address) is a blackened steel
   vault plate. Every part is painted (Hedra, from the H36 plate d1) and laid out by the page so the plate fills the card at any shape:
   the steel shell stretches by its border (the rivets and corners stay whole), the nickel nameplates by their bevels; the wells and the
   EZ. maker's mark keep their painted proportions. The mark is die-struck into the steel on a graded round; on a round still to grade its
   die seat is empty. The winner's nameplate is gold (both on a tie, none when nobody won).
   Media, written out in full for make_site.py: media/cb-plate-h38-shell-1200.jpg media/cb-plate-h38-shell-1800.jpg
   media/cb-plate-h38-title.jpg media/cb-plate-h38-np.jpg media/cb-plate-h38-npg.jpg media/cb-plate-h38-mk.jpg
   media/cb-plate-h38-wellc.webp media/cb-plate-h38-wellcg.webp media/cb-plate-h38-wellr.webp media/cb-plate-h38-wellrg.webp
   media/cb-plate-h38-stamp.webp media/cb-plate-h38-stamp-steel.webp media/cb-plate-h38-die.webp
   It sits over the page's certificate (graded: the back face; pending: the one face), which stays underneath, hidden, so the flip, the
   arrows, close and the holo levels keep working. Every word and number from ROUNDS / PENDING. window.__x2pCbStamp="steel" shows the
   plain struck-steel mark instead of the enamelled one (a mockup switch). Failures are kept in window.__x2pCbErr. */
(function(){try{
var D=document;
var NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},MC={GROK:'#e4e0d6',CLAUDE:'#ef8a55',GPT:'#b18cff',KIMI:'#58b7ff'},CC={GPT:'US',CLAUDE:'US',GROK:'US',KIMI:'CN'};
var MO=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function md(s){var m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?MO[+m[1]]+' '+(+m[2]):''}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function star(cx,cy,r,rot){rot=rot||0;var p='';for(var i=0;i<10;i++){var a=rot-Math.PI/2+i*Math.PI/5,rr=i%2?r*.4:r;p+=(i?'L':'M')+(cx+Math.cos(a)*rr).toFixed(2)+' '+(cy+Math.sin(a)*rr).toFixed(2)}return p+'Z'}
/* the lab's flag, a small enamel patch by the name */
function flag(c){var s='<svg class="cb-fl" viewBox="0 0 30 20" preserveAspectRatio="none" aria-hidden="true" focusable="false">';
  if(c==='US'){s+='<rect width="30" height="20" fill="#f4efe2"/>';for(var i=0;i<7;i++)s+='<rect y="'+(i*40/13)+'" width="30" height="'+(20/13)+'" fill="#b22234"/>';s+='<rect width="13" height="10.77" fill="#3c3b6e"/>';
    for(var r=0;r<5;r++)for(var k=0;k<(r%2?4:5);k++)s+='<path d="'+star(1.4+k*2.55+(r%2)*1.27,1.3+r*2.05,.62)+'" fill="#fff"/>'}
  else{s+='<rect width="30" height="20" fill="#de2910"/><path d="'+star(5,5,3)+'" fill="#ffde00"/>';[[10,2,.9],[12,4,.5],[12,7,.1],[10,9,-.3]].forEach(function(q){s+='<path d="'+star(q[0],q[1],1,q[2])+'" fill="#ffde00"/>'})}
  return s+'</svg>'}
function mark(m){var h='';try{h=(typeof logo==='function'?logo(m):'').match(/<svg[\s\S]*<\/svg>/);h=h?h[0]:''}catch(e){h=''}
  return '<span class="cb-mk" style="--mc:'+MC[m]+'" aria-hidden="true">'+h+'</span>'}
var CROWN='<svg class="cb-cr" viewBox="0 0 40 26" aria-hidden="true" focusable="false"><path d="M3.5 22.5 L2.2 6.8 L11.4 14 L19.6 2.3 L28.4 13.6 L37.6 6 L36.2 22.8 C25 24.4 14 24.2 3.5 22.5Z" fill="currentColor"/></svg>';
function pct(v){return (Math.round(v*100)/100)+'%'}
/* a graded round, ranked as the certificate ranks it: right way by closeness, then wrong way by closeness */
function graded(n){var g=null;ROUNDS.forEach(function(r){if(r.n===n)g=r});if(!g)return null;var W=g.win?g.win.split(' & '):[],up=g.a>0;
  var rows=g.calls.map(function(x){var u=String(x[1]).indexOf('DOWN')<0,v=parseFloat(String(x[1]).replace(/^(UP|DOWN)\s*/,''));return {m:x[0],up:u,v:v,off:+x[2],ok:u===up,win:W.indexOf(x[0])>-1}});
  var by=function(a,b){return a.off-b.off};rows=rows.filter(function(r){return r.ok}).sort(by).concat(rows.filter(function(r){return !r.ok}).sort(by));
  return {k:'g',n:n,co:g.co,t:g.ticker,a:g.a,rows:rows,W:W,filed:md(g.called),graded:md(g.resolves),right:rows.filter(function(r){return r.ok}).length}}
function pending(n){var u=null;(window.PENDING||[]).forEach(function(q){if(q.n===n)u=q});if(!u)return null;
  return {k:'p',n:n,co:u.co,t:u.ticker,rows:(u.calls||[]).map(function(x){return {m:x.m,up:x.dir==='UP',v:parseFloat(x.mag)}}),filed:md(u.called),graded:u.resolves?md(u.resolves):'Soon'}}
function trade(r){return '<span class="cb-tr"><i>'+(r.up?'Long':'Short')+'</i> <b>'+pct(r.v)+'</b></span>'}
function pf(r,i){return '<span class="cb-pf '+(r.ok?'p':'f')+'" style="--rot:'+[-6,-3,-7,-4][i%4]+'deg">'+(r.ok?'PASS':'FAIL')+'</span>'}
function move(a){return '<b class="cb-mv '+(a<0?'dn':'up')+'"><span aria-hidden="true">'+(a<0?'−':'+')+'</span><span class="sr">'+(a<0?'Down ':'Up ')+'</span>'+Math.abs(a).toFixed(2)+'%</b>'}
function build(d,fb){var G=d.k==='g',h='<div class="cb-p"><i class="cb-sh" aria-hidden="true"></i>';
  h+='<i class="cb-g" style="--g:.6"></i><div class="cb-ti cb-np"><small class="cb-fit">Season 1 · Round '+d.n+'</small><b class="cb-co cb-fit">'+esc(d.co)+' <span class="cb-tk">('+esc(d.t)+')</span></b></div><i class="cb-g" style="--g:1.4"></i>';
  h+='<ol class="cb-rows" aria-label="'+(G?'The trades, ranked by the close':'The trades, as filed')+'">';
  d.rows.forEach(function(r,i){if(i)h+='<i class="cb-g cb-gr" aria-hidden="true"></i>';
    h+='<li class="cb-r cb-np'+(G&&r.win?' win':'')+(G?(r.ok?' ok':' no'):' pd')+'"><span class="cb-wc">'+mark(r.m)+'</span>'+
      '<span class="cb-tx"><span class="cb-l1 cb-fit">'+(G?'<b class="cb-rk">'+(i+1)+'</b>':'')+'<span class="cb-nm">'+NM[r.m]+'</span>'+flag(CC[r.m])+(G&&r.win?'<span class="sr"> (winner)</span>':'')+'</span>'+
      '<span class="cb-l2 cb-fit">'+trade(r)+(G?'<small class="cb-off">'+(r.ok?pct(r.off)+' off':'wrong way')+'</small>':'')+'</span></span>'+
      '<span class="cb-wr">'+(G?pf(r,i):'<span class="sr">Not graded yet</span>')+'</span></li>'});
  h+='</ol><i class="cb-g" style="--g:1"></i>';
  h+='<div class="cb-mw"><span class="cb-ml"><small class="cb-fit">'+esc(d.co)+' at the close</small>'+(G?move(d.a):'<b class="cb-mv cb-q"></b>')+'</span>'+
    (G?(d.W.length?'<span class="cb-wn cb-fit">'+CROWN+'<em>'+(d.W.length>1?'Winners':'Winner')+'</em> '+d.W.map(function(m){return '<b style="--wc:'+MC[m]+'">'+NM[m]+'</b>'}).join(' <em>&amp;</em> ')+'</span>':
      '<span class="cb-wn cb-fit none"><em>No winner</em>'+(d.right?'':' <small>all '+d.rows.length+' wrong way</small>')+'</span>'):'<span class="cb-wn cb-fit cb-cd"><em></em></span>')+'</div>';
  h+='<i class="cb-g" style="--g:1"></i><div class="cb-bt"><div class="cb-dt cb-np"><small class="cb-fit">Trades filed</small><b class="cb-fit">'+d.filed+'</b></div><div class="cb-dt cb-np"><small class="cb-fit">'+(G?'Graded on':'Final grade')+'</small><b class="cb-fit">'+d.graded+'</b></div>'+
    '<span class="cb-st'+(G?'':' cb-die')+'" role="img" aria-label="'+(G?'Struck with the EZ. mark: graded by the market close':'The EZ. mark is struck once the market closes')+'"></span></div><i class="cb-g" style="--g:.5"></i>';
  h+=fb?'<button type="button" class="cb-flip" data-flip><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M13 8a5 5 0 1 1-1.6-3.7M13 2.5v3h-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'+esc(fb)+'</button>':'<i class="cb-flip cb-nob" aria-hidden="true"></i>';
  return h+'</div>'}
/* one line each: the type steps down to fit its plate, never below the 8 px floor (on screen, through the view's zoom) */
function fit(o){var z=+o.style.getPropertyValue('--cbz')||1,fl=8.2/z;
  [].forEach.call(o.querySelectorAll('.cb-fit'),function(e){e.style.fontSize='';if(!e.clientWidth||getComputedStyle(e).flexWrap==='wrap')return;var n=0;
    while(e.scrollWidth>e.clientWidth+.5&&n++<40){var f=parseFloat(getComputedStyle(e).fontSize),nf=Math.max(fl,f*Math.max(.9,e.clientWidth/e.scrollWidth));if(nf>=f-.01)break;e.style.fontSize=nf+'px'}})}
function zoomOf(c){var z=c.closest('.x2p-rmz');return z&&parseFloat(z.style.zoom)||1}
function countdown(o,fin){var src=fin.querySelector('.xc-pend .xc-out b'),t=o.querySelector('.cb-cd em');if(!t)return;
  var s=src?src.textContent.replace(/\s+/g,' ').trim():'At the close';t.textContent=s||'At the close'}
function mount(){var rm=D.getElementById('x2pRm');if(!rm)return;var c=rm.querySelector('.card[data-n]');if(!c)return;var n=+c.getAttribute('data-n');
  var k=c.getAttribute('data-k'),d=k==='g'?graded(n):k==='p'?pending(n):null;if(!d)return;
  var fin=c.querySelector(k==='g'?'.face.back .fin':'.face.front .fin');if(!fin||fin.querySelector(':scope>.cb'))return;
  var fbt=fin.querySelector('.xc [data-flip]'),lab=fbt?fbt.textContent.replace(/↻/g,'').trim():'';
  var o=D.createElement('div');o.className='cb cb-'+d.k+(window.__x2pCbStamp==='steel'?' cb-steel':'');o.style.setProperty('--cbz',zoomOf(c));
  o.innerHTML=build(d,fbt?(lab||'See the film'):'');fin.insertBefore(o,fin.firstChild);fin.classList.add('cb-on');
  if(d.k==='p'){countdown(o,fin);o.__cd=setInterval(function(){if(!o.isConnected){clearInterval(o.__cd);return}countdown(o,fin)},30000)}
  var f=function(){if(o.isConnected)fit(o)};f();if(D.fonts&&D.fonts.ready)D.fonts.ready.then(f);setTimeout(f,400)}
function run(){try{mount()}catch(e){window.__x2pCbErr=e}}
function init(){new MutationObserver(function(ms){for(var i=0;i<ms.length;i++)for(var j=0;j<ms[i].addedNodes.length;j++){var x=ms[i].addedNodes[j];if(x.nodeType===1&&x.id==='x2pRm'){run();return}}}).observe(D.body,{childList:true});run();
  var lw=innerWidth;addEventListener('resize',function(){if(innerWidth===lw)return;lw=innerWidth;var o=D.querySelector('#x2pRm .cb');if(o){var c=o.closest('.card');o.style.setProperty('--cbz',zoomOf(c));fit(o)}})}
if(D.body)init();else D.addEventListener('DOMContentLoaded',init);
}catch(e){window.__x2pCbErr=e}})();
