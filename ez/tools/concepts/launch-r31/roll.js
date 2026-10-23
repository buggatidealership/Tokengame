/* Round 31, bet section "The ticket roll": the NVIDIA ticket leaves the first screen for its own section at the foot of the
   Overview (05, between the highlights and Get $EZ, which becomes 06). The ticket itself is moved, not copied, so its countdown
   keeps running. Under it, still attached at a perforation, the next tickets on the roll: the same stock, pre-printed (bands,
   frame, serial), the event not printed yet, fading out. Idempotent. */
var d=document,$=function(s,r){return (r||d).querySelector(s)};
var bt=$('.x2p-bt'),get=$('#get'),hl=$('#highlights');
if(!bt||!get)return;
var sec=$('#x2pBet');
if(!sec){
  sec=d.createElement('section');sec.className='sec x2p-r31';sec.id='x2pBet';sec.setAttribute('aria-labelledby','x2pBetH');
  sec.innerHTML='<div class="sh"><div class="tx"><span class="no">05</span><span class="eb">The bet</span><h2 id="x2pBetH">The first of many</h2></div>'+
    '<div class="x2p-strap"><span class="x2p-bug" aria-hidden="true">The stakes</span><ul class="x2o-ul lede x2p-r31b">'+
      '<li>We bet our pool on the top AI’s call.</li>'+
      '<li><b class="x2p-hk x2p-h-t">Right call:</b> profits buy back $EZ.</li>'+
      '<li><b class="x2p-hk x2p-h-b">Wrong call:</b> the pool can be wiped out.</li></ul></div></div>'+
    '<div class="r31-roll"></div>'+
    '<p class="r31-more">Season 2: a bet on every Mag 7 report, and more.</p>';
  get.parentNode.insertBefore(sec,get);
}
var roll=$('.r31-roll',sec);
if(bt.parentNode!==roll)roll.insertBefore(bt,roll.firstChild);
/* the film's section is the film alone now */
var fs=$('section.x2o-bet');if(fs)fs.setAttribute('aria-label','How it works');
/* the next tickets: the bet ticket's own die line, stock, bands, frame and numbering (its classes), the event left blank */
if(!$('.r31-tail',roll)){
  var ink=[1,.84,.95,.88,1,.9],dy=[0,.3,-.2,.2,-.3,.1];
  var serial=function(n){return 'N<u>o</u> '+n.split('').map(function(c,i){return '<s style="opacity:'+ink[i]+';top:'+dy[i]+'px">'+c+'</s>'}).join('')};
  var tk=function(no,bet,win,cls){return '<div class="r31-nx '+cls+'"><div class="bt-sh"><i></i></div><div class="bt-hs"></div><div class="bt-p">'+
    '<div class="bt-pp"><i class="bt-pl"></i><i class="bt-r1"></i><i class="bt-r2"></i></div>'+
    '<div class="bt-b"><div class="r31-lab"><b>'+bet+'<i>:</i></b><span class="r31-fill"></span></div><div class="bt-mk"><i></i><i></i><i></i></div></div>'+
    '<div class="bt-s"><div class="r31-win">'+(win?'<span>'+win+'</span>':'')+'</div></div>'+
    '<div class="bt-st bt-hd"><span class="l"><i></i>$EZ main event<i></i></span><span class="r">Season 2</span></div>'+
    '<div class="bt-st bt-ft"><span class="l">Admit one</span><span class="r e"><span class="bt-no">'+serial(no)+'</span></span></div>'+
    '<i class="r31-perf"></i></div></div>'};
  var tail=d.createElement('div');tail.className='r31-tail';tail.setAttribute('aria-hidden','true');
  tail.innerHTML=tk('000002','Bet #2','To be announced','n2')+tk('000003','Bet #3','','n3')+tk('000004','Bet #4','','n4');
  roll.appendChild(tail);
}
/* the stars' shape, for the blind (unprinted) ones on the next tickets */
var si=$('.x2p-bt .bt-mk i');if(si){var bi=getComputedStyle(si).backgroundImage;if(bi&&bi!=='none')roll.style.setProperty('--r31-star',bi)}
/* numbers: Get $EZ follows as 06; X2's order routine re-runs on tab changes, so the section is put back before Get $EZ */
var fix=function(){var g=$('#get'),s=$('#x2pBet');if(!g||!s)return;if(s.nextElementSibling!==g)g.parentNode.insertBefore(s,g);var n=$('.sh .no',g);if(n)n.textContent='06'};
fix();
if(!window.__r31roll){window.__r31roll=1;addEventListener('hashchange',function(){setTimeout(fix,0)})}
window.__r31={shot:'#x2pBet'};
