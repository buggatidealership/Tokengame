/* Round 31, bet section "The ticket roll": the NVIDIA ticket leaves the first screen for its own section at the foot of the
   Overview (05, between the highlights and Get $EZ, which becomes 06). The ticket itself is moved, not copied, so its countdown
   keeps running. Joined to it at a perforation, the next ticket on the roll: the same stock, pre-printed (bands, frame, serial),
   "Bet #2" pressed in with no ink yet, "Season 2" on its band and the plan printed in its window. Two tickets torn off the roll
   at every width: stacked on narrow columns, side by side (as a roll runs) once the column holds two. Idempotent. */
var d=document,$=function(s,r){return (r||d).querySelector(s)};
var bt=$('.x2p-bt'),get=$('#get');
if(!bt||!get)return;
var sec=$('#x2pBet');
if(!sec){
  sec=d.createElement('section');sec.className='sec x2p-r31';sec.id='x2pBet';sec.setAttribute('aria-labelledby','x2pBetH');
  sec.innerHTML='<div class="sh"><div class="tx"><span class="no">05</span><span class="eb">The bet</span><h2 id="x2pBetH">The first of many</h2></div>'+
    '<div class="x2p-strap"><span class="x2p-bug" aria-hidden="true">The stakes</span><ul class="x2o-ul lede x2p-r31b">'+
      '<li>$EZ trading fees fill the pool.</li>'+
      '<li>The AI on top makes the call.</li>'+
      '<li><b class="x2p-hk x2p-h-t">Right call:</b> profits buy back $EZ.</li>'+
      '<li><b class="x2p-hk x2p-h-b">Wrong call:</b> the pool can be wiped out.</li></ul></div></div>'+
    '<div class="r31-clip"><div class="r31-roll"></div></div>'+
    '<p class="sr">Bet #2 comes in Season 2: Mag 7 + more.</p>';
  get.parentNode.insertBefore(sec,get);
}
var roll=$('.r31-roll',sec);
if(bt.parentNode!==roll)roll.insertBefore(bt,roll.firstChild);
/* the film's section is the film alone now: it takes its name from the film's own tag (an h2), not a second label */
var fs=$('section.x2o-bet'),tag=fs&&$('.vt-tag',fs);
if(fs&&tag){if(!tag.id)tag.id='x2pVtTag';fs.removeAttribute('aria-label');fs.setAttribute('aria-labelledby',tag.id)}
/* the next ticket: the bet ticket's own die line, stock, bands, frame and numbering (its classes), the event not printed */
if(!$('.r31-tail',roll)){
  var ink=[1,.84,.95,.88,1,.9],dy=[0,.3,-.2,.2,-.3,.1];
  var serial=function(n){return 'N<u>o</u> '+n.split('').map(function(c,i){return '<s style="opacity:'+ink[i]+';top:'+dy[i]+'px">'+c+'</s>'}).join('')};
  var tk=function(no,bet,win,cls){return '<div class="r31-nx '+cls+'"><div class="bt-sh"><i></i></div><div class="bt-hs"></div><div class="bt-p">'+
    '<div class="bt-pp"><i class="bt-pl"></i><i class="bt-r1"></i><i class="bt-r2"></i></div>'+
    '<div class="bt-b"><div class="r31-lab"><b>'+bet+'</b><span class="r31-fill"></span></div></div>'+
    '<div class="bt-s"><div class="r31-win">'+win+'</div></div>'+
    '<div class="bt-st bt-hd"><span class="l"><i></i>$EZ main event<i></i></span><span class="r">Season 2</span></div>'+
    '<div class="bt-st bt-ft"><span class="l">Admit one</span><span class="r e"><span class="bt-no">'+serial(no)+'</span></span></div>'+
    '<i class="r31-perf"></i></div></div>'};
  var tail=d.createElement('div');tail.className='r31-tail';tail.setAttribute('aria-hidden','true');
  tail.innerHTML=tk('000002','Bet #2','<span>To be announced</span><small>Mag 7 + more</small>','n2');
  roll.appendChild(tail);
}
/* numbers: Get $EZ follows as 06; X2's order routine re-runs on tab changes, so the section is put back before Get $EZ */
var fix=function(){var g=$('#get'),s=$('#x2pBet');if(!g||!s)return;if(s.nextElementSibling!==g)g.parentNode.insertBefore(s,g);var n=$('.sh .no',g);if(n)n.textContent='06'};
fix();
if(!window.__r31roll){window.__r31roll=1;addEventListener('hashchange',function(){setTimeout(fix,0)})}
/* the strap's four lines one line each (the standings strap's fitRules idea): all four step down together by half a pixel
   until the strap fits its column (no-wrap text widens the grid column, so the strap's own width tells) */
var fitStrap=function(){var sh=$('#x2pBet .sh'),st=$('#x2pBet .x2p-strap');if(!sh||!st||!st.offsetWidth)return;var lis=[].slice.call(st.querySelectorAll('li'));
  lis.forEach(function(li){li.style.removeProperty('font-size')});var fs=parseFloat(getComputedStyle(lis[0]).fontSize),ml=parseFloat(getComputedStyle(st).marginLeft)||0;
  var over=function(){return st.offsetWidth+ml>sh.clientWidth+.5||lis.some(function(li){return li.scrollWidth>li.clientWidth+.5})};
  while(fs>11&&over()){fs-=.5;lis.forEach(function(li){li.style.setProperty('font-size',fs+'px','important')})}};
fitStrap();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(fitStrap);
if(!window.__r31rollFit){window.__r31rollFit=1;var ft;addEventListener('resize',function(){clearTimeout(ft);ft=setTimeout(fitStrap,120)});addEventListener('load',fitStrap)}
window.__r31={shot:'#x2pBet'};
