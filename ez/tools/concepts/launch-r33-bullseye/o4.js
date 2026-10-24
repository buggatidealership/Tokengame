/* Option 4, "Sharpshooter": the betting apps' hit-rate card turned to the next question. The standings say who gets the direction
   right; this card asks how close they land when they do: each AI's average distance on its right calls, how many landed within 1%,
   its bullseyes, and its last ten calls as a strip (bullseye, within 1%, right but further, wrong way), like a prop card's "last 10".
   Printed on the card stock where the film would be. Closest call keeps its one round (Philip Morris); the bullseye count lives here
   as a column, and Tesla, Grok's best, is the story on the back. */
var Z=window.__r33,M=Z.M.slice().sort(function(a,b){return Z.by[a].avg-Z.by[b].avg}),top=M[0],T=Z.by[top];
var best=Z.right.filter(function(x){return x.m===top}).sort(function(a,b){return a.h-b.h||b.n-a.n})[0],rB=Z.round(best.n);
var ul=document.querySelector('ul.hx2s');
ul.appendChild(Z.item({n:best.n,tag:'Sharpshooter',head:Z.esc(Z.nm(top))+'’s sharpest: '+Z.esc(rB.co)+', '+best.miss.toFixed(2)+'% off.',
  body:'When they get the direction right, how close do they land? '+Z.nm(top)+': '+T.avg.toFixed(2)+'% off on average, the closest of the four. Its best: '+rB.co+', '+(best.c<0?'called ':'called +')+best.c+'%, moved '+best.a+'%.',
  rec:[[T.avg.toFixed(2)+'%','off when right'],[T.in1+' of '+T.right,'within 1%']]}));
Z.rebuild();
var w=Z.card('Sharpshooter'),c=w.querySelector(':scope>.card'),fr=c.querySelector('.face.front'),bk=c.querySelector('.face.back');
var art=fr.querySelector('.art');[].forEach.call(art.querySelectorAll('video'),function(v){v.remove()});var pim=art.querySelector('img');if(pim)pim.style.visibility='hidden';art.classList.add('r33-art');
var dot=function(x){if(!x.right)return '<i class="x" title="wrong way"></i>';if(x.h<=10)return '<i class="b" title="bullseye"></i>';if(x.h<=100)return '<i class="g" title="within 1%"></i>';return '<i class="o" title="right, further"></i>'};
var col={GPT:'#10a37f',KIMI:'#1e80ff',CLAUDE:'#d97757',GROK:'#141217'};
art.insertAdjacentHTML('beforeend','<div class="r33-sh" role="img" aria-label="When they are right, how close: '+M.map(function(m){return Z.nm(m)+' '+Z.by[m].avg.toFixed(2)+'% off on average'}).join(', ')+'">'+
  '<p class="r33-q">When they’re right, how close?</p>'+
  M.map(function(m,k){var y=Z.by[m],bl='';for(var i=0;i<y.bulls;i++)bl+=Z.bullSvg(9);
    return '<div class="r33-row'+(k?'':' one')+'"><span class="n"><em>'+(k+1)+'</em><b style="--c:'+col[m]+'">'+Z.esc(Z.nm(m))+'</b>'+bl+'</span><span class="v">'+y.avg.toFixed(2)+'%<small>avg off</small></span>'+
      '<span class="l10">'+y.last10.map(dot).join('')+'</span><span class="w">'+y.in1+' of '+y.right+' in 1%</span></div>'}).join('')+
  '<p class="r33-key"><i class="b"></i>Bullseye <i class="g"></i>In 1% <i class="o"></i>Right <i class="x"></i>Wrong way</p></div>');
var setLab=function(f){var zl=f.querySelector('.zl');if(!zl)return;zl.querySelector('.nm').innerHTML='<b>Sharpshooter</b><small>(Season 1)</small>';var zb=zl.querySelector('.zb');if(zb){if(f===fr)zb.innerHTML=zb.innerHTML.replace(/\d{8}/,'S1000004');else zb.textContent='Last 10 calls each · '+Z.calls.length+' in all'}
  var zr=f.querySelector('.zr');zr.querySelector('.no').textContent='S1';zr.querySelector('.ds').textContent='Avg off';zr.querySelector('.gr').textContent=T.avg.toFixed(2)};
setLab(fr);setLab(bk);
var cw=fr.querySelector('.cwin');cw.innerHTML='<small>Sharpest</small><span class="wv"><span class="wn">'+Z.esc(Z.nm(top))+(typeof logo==='function'?logo(top):'')+'</span></span>';
var em=bk.querySelector('.x2p-hw em');if(em)em.textContent='Bullseyes (within 0.1%): '+Z.M.slice().sort(function(a,b){return Z.by[b].bulls-Z.by[a].bulls}).map(function(m){return Z.nm(m)+' '+Z.by[m].bulls}).join(', ')+'.';
Z.strap([['c','Closest call'],['t','Tightest race'],['b','Biggest move'],['y','Sharpshooter']]);
window.__r33cfg={tag:'Sharpshooter'};
