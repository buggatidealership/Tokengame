/* Round 31, bet section "The season strip" (the most minimal of the three bet concepts): the NVIDIA ticket leaves the first screen
   for its own section at the foot of the Overview, 05 "The bet", between the highlights and Get $EZ (which becomes 06). The ticket
   itself is moved, not copied, so its countdown keeps running. The section is: a native head, the stakes on a strap (where the pool
   comes from, right call, wrong call), the ticket, and under it one printed strip of three stubs on one perforated strip: Season 1
   (one bet, NVIDIA; stamped "Now" in the record's worn red ink), Season 2 (every Mag 7 report), Then (more). Nothing else.
   Idempotent. */
var d=document,$=function(s,r){return (r||d).querySelector(s)};
var bt=$('.x2p-bt'),get=$('#get');
if(!bt||!get)return;
var sec=$('#x2pSs');
if(!sec){
  sec=d.createElement('section');sec.className='sec x2p-ss-sec';sec.id='x2pSs';sec.setAttribute('aria-labelledby','x2pSsH');
  sec.innerHTML='<div class="sh"><div class="tx"><span class="no">05</span><span class="eb">The bet</span><h2 id="x2pSsH">Our pool, the top AI’<span class="x2p-lc">s</span> call</h2></div>'+
    '<div class="x2p-strap"><span class="x2p-bug" aria-hidden="true">The stakes</span><ul class="x2o-ul lede x2p-ssb">'+
      '<li>$EZ trading fees fill the pool.</li>'+
      '<li><b class="x2p-hk x2p-h-t">Right call:</b> profits buy back $EZ.</li>'+
      '<li><b class="x2p-hk x2p-h-b">Wrong call:</b> the pool can be wiped out.</li></ul></div></div>'+
    '<div class="x2p-ssk"></div>'+
    /* the strip: one card, die-cut (corner bites, a notch top and bottom at each perforation, the perforations' holes), three stubs */
    '<div class="x2p-ssw"><ol class="x2p-ss" aria-label="The bets, season by season">'+
      '<li class="ss-now"><span class="ss-k">Season 1</span><span class="ss-v"><b>One bet</b><small>NVIDIA</small></span><span class="sr"> (this season)</span><i class="ss-st" aria-hidden="true">Now</i></li>'+
      '<li><span class="ss-k">Season 2</span><span class="ss-v"><b>Every&nbsp;Mag&nbsp;7 report</b></span></li>'+
      '<li><span class="ss-k">Then</span><span class="ss-v"><b>More</b></span></li>'+
    '</ol></div>';
  get.parentNode.insertBefore(sec,get);
}
var slot=$('.x2p-ssk',sec);
if(bt.parentNode!==slot)slot.appendChild(bt);
/* the film's section is the film alone now */
var fs=$('section.x2o-bet');if(fs)fs.setAttribute('aria-label','How it works');
/* numbers: Get $EZ follows as 06. X2's order routine re-runs on every tab change and puts Get $EZ straight after the highlights,
   so the section is put back before it afterwards */
var fix=function(){var g=$('#get'),s=$('#x2pSs');if(!g||!s)return;if(s.nextElementSibling!==g)g.parentNode.insertBefore(s,g);var n=$('.sh .no',g);if(n)n.textContent='06'};
fix();
if(!window.__r31ss){window.__r31ss=1;addEventListener('hashchange',function(){setTimeout(fix,0)})}
/* the strap's lines one line each where they fit (the standings strap's fitRules idea): all three step down together by half a pixel
   until none wraps; on a very narrow phone where even 13px wraps they keep the full size, wrapped */
var fitStrap=function(){var lis=[].slice.call(d.querySelectorAll('#x2pSs .x2p-strap li'));if(!lis.length||!lis[0].offsetWidth)return;
  lis.forEach(function(li){li.style.removeProperty('font-size')});
  var lines=function(li){var r=d.createRange();r.selectNodeContents(li);var ys={};[].forEach.call(r.getClientRects(),function(c){if(c.width>.5)ys[Math.round(c.top)]=1});return Object.keys(ys).length};
  var max=function(){return Math.max.apply(null,lis.map(lines))};
  var f0=parseFloat(getComputedStyle(lis[0]).fontSize),f=f0;
  while(max()>1&&f>13){f-=.5;lis.forEach(function(li){li.style.setProperty('font-size',f+'px','important')})}
  if(max()>1)lis.forEach(function(li){li.style.removeProperty('font-size')})};
fitStrap();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(fitStrap);
if(!window.__r31ssFit){window.__r31ssFit=1;var ft;addEventListener('resize',function(){clearTimeout(ft);ft=setTimeout(fitStrap,120)});addEventListener('load',fitStrap)}
window.__r31={shot:'#x2pSs'};
