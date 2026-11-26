/* Option 1, "The bullseye card": a fourth slab next to Closest call, the round itself (its film on the front, as every highlight).
   Which round: the closest bullseye not already on a card. Closest call keeps the first call to reach the season's smallest miss
   (Philip Morris, R35, 0.02%); Tesla ties it at 0.02% and is the next bullseye, so it takes this card (Western Digital, 0.03%, would
   be next). Front: the winner bar becomes the bullseye line. Back: the story, then the bullseye count as the race it starts. */
var Z=window.__r33,shown=Z.closestN(),b=Z.bulls.filter(function(x){return x.n!==shown})[0];if(!b){window.__r33err='no bullseye';return}
var r=Z.round(b.n),nB=Z.bulls.length,nC=Z.calls.length,mv=Math.abs(b.a).toFixed(2),cl=Math.abs(b.c);
var word=function(x){return x.c<0?'fall':'rise'},did=function(x){return x.a<0?'fell':'rose'};
var ul=document.querySelector('ul.hx2s'),first=ul.querySelector('li');
ul.insertBefore(Z.item({n:b.n,tag:'Bullseye',head:Z.esc(Z.nm(b.m))+' hit the bullseye on '+Z.esc(r.co)+'.',
  body:Z.nm(b.m)+' said '+r.co+' would '+word(b)+' '+cl+'%. It '+did(b)+' '+mv+'%. That is '+b.miss.toFixed(2)+'% off: the right way, and within 0.1%. Only '+nB+' of '+nC+' calls this season landed that close.',
  rec:[[b.miss.toFixed(2)+'%','off'],[nB+' of '+nC,'calls this close']]}),first.nextSibling);
Z.rebuild();
var w=Z.card('Bullseye'),c=w.querySelector('.card');
/* the front: the winner bar names the bullseye (the round's winner stays on the back) */
/* the winner bar reads like every other card's ("Winner Grok"), with the bullseye's distance where "Winner" is: "0.02% off Grok" */
var cw=c.querySelector('.face.front .cwin');if(cw){var lg=cw.querySelector('.lg');cw.innerHTML='<small class="r33-off">'+b.miss.toFixed(2)+'% off</small><span class="wv"><span class="wn">'+Z.esc(Z.nm(b.m))+(lg&&b.m===r.win?lg.outerHTML:'')+'</span></span>'}
/* the back: the race the bullseyes start, one row per AI, a roundel per bullseye */
var bk=c.querySelector('.face.back .x2p-hb'),em=bk&&bk.querySelector('.x2p-hw em');
if(em){var rows=Z.M.slice().sort(function(a,b){return Z.by[b].bulls-Z.by[a].bulls||Z.by[b].in05-Z.by[a].in05});
  em.outerHTML='<span class="r33-tally"><small>Bullseyes this season</small>'+rows.map(function(m){var k=Z.by[m].bulls,s='';for(var i=0;i<k;i++)s+=Z.bullSvg(11);
    return '<span class="'+(k?'':'z')+'"><b>'+Z.esc(Z.nm(m))+'</b>'+(s||'<i>0</i>')+'</span>'}).join('')+'</span>'}
Z.strap([['c','Closest call'],['y','Bullseye'],['t','Tightest race'],['b','Biggest move']]);
window.__r33cfg={tag:'Bullseye'};
