/* Option 3, "The set": Closest call becomes Bullseyes, a set of graded cards, the closest on top (ties: the newest, so Tesla over
   Philip Morris, both 0.02% off) with the other bullseyes fanned behind it and a count on the stack. That frees the fourth place for
   the streak the owner asked about: the longest run of right calls within 1% ("Hot streak"; Claude, four rounds). Gold stays with
   the closest calls; the streak takes the new paper colour. */
var Z=window.__r33,B=Z.bulls,top=B[0],nB=B.length,nC=Z.calls.length,K=Z.streak,rT=Z.round(top.n);
var ul=document.querySelector('ul.hx2s'),first=ul.querySelector('li');
ul.replaceChild(Z.item({n:top.n,tag:'Bullseyes',head:nB+' bullseyes. The closest calls of the season.',body:'.',rec:[[top.miss.toFixed(2)+'%','off'],[nB+' of '+nC,'calls this close']]}),first);
var sc=Z.callOf(K.to,K.m),rS=Z.round(K.to);
ul.appendChild(Z.item({n:K.to,tag:'Hot streak',head:Z.esc(Z.nm(K.m))+': '+K.len+' in a row within 1%.',body:'.',rec:[[String(K.len),'in a row'],['1%','or closer']]}));
Z.rebuild();
/* tag colours: the set keeps Closest call's gold; the streak takes the paper */
var wS=Z.card('Bullseyes'),wH=Z.card('Hot streak');wS.querySelector('.x2p-htag').className='x2p-htag x2p-h-c';
var c=wS.querySelector('.card'),rec=document.querySelector('#record');
/* the stack: the other bullseyes' own slabs behind the top one, turned a few degrees, and the count */
B.slice(1).forEach(function(x,k){var o=rec.querySelector('.card[data-n="'+x.n+'"]');if(!o)return;var f=o.cloneNode(true);f.classList.remove('flipped','cur');f.removeAttribute('data-i');
  [].forEach.call(f.querySelectorAll('video,button'),function(e){e.remove()});f.setAttribute('aria-hidden','true');
  var dv=document.createElement('div');dv.className='r33-fan r33-f'+k;dv.appendChild(f);wS.appendChild(dv)});   /* after the card, under it by z-index: the page's eqH sizes the wrapper's first .card */
var cnt=document.createElement('span');cnt.className='r33-cnt';cnt.setAttribute('aria-hidden','true');cnt.innerHTML='<b>1</b>/'+nB;wS.appendChild(cnt);
var cw=c.querySelector('.face.front .cwin');if(cw){var lg=cw.querySelector('.lg');cw.innerHTML='<small class="r33-off">'+top.miss.toFixed(2)+'% off</small><span class="wv"><span class="wn">'+Z.esc(Z.nm(top.m))+(lg&&top.m===rT.win?lg.outerHTML:'')+'</span></span>'}
/* the set's back: the three, one line each, then how rare they are */
var next=Z.right.filter(function(x){return x.h>10}).sort(function(a,b){return a.h-b.h})[0];
var mv=function(x){return (x.a<0?'▼':'▲')+Math.abs(x.a).toFixed(2)+'%'},cl=function(x){return (x.c<0?'▼':'▲')+Math.abs(x.c)+'%'};
c.querySelector('.face.back .x2p-hb').innerHTML='<h4>'+nB+' bullseyes. '+(Z.by.GPT.bulls>1?'Two from GPT.':'')+'</h4>'+
  '<div class="r33-set">'+B.map(function(x,k){return '<span'+(k?'':' class="on"')+'><i>'+Z.esc(Z.nm(x.m))+'</i><b>'+Z.esc(Z.round(x.n).co)+'</b><em>'+x.miss.toFixed(2)+'%</em></span>'}).join('')+'</div>'+
  '<p class="x2p-hw">'+Z.esc(Z.nm(top.m))+' said '+Z.esc(rT.co)+' would '+(top.c<0?'fall ':'rise ')+Math.abs(top.c)+'%. It '+(top.a<0?'fell ':'rose ')+Math.abs(top.a).toFixed(2)+'%. A bullseye: the right way, within 0.1%. Only '+nB+' of '+nC+' calls so far.'+
  (next?'<em>The next closest: '+Z.esc(Z.nm(next.m))+' on '+Z.esc(Z.round(next.n).co)+', '+next.miss.toFixed(2)+'% off.</em>':'')+'</p><button type="button" class="flipb" data-flip>↻ See the film</button>';
/* the streak card: its front's winner bar names the run; its back tells the four rounds and how it ended */
var h=wH.querySelector('.card'),hw=h.querySelector('.face.front .cwin');if(hw)hw.innerHTML='<small>'+K.len+' in a row</small><span class="wv"><span class="wn">'+Z.esc(Z.nm(K.m))+(typeof logo==='function'?logo(K.m):'')+'</span></span>';
var run=Z.calls.filter(function(x){return x.m===K.m&&x.n>=K.from&&x.n<=K.to}),after=Z.calls.filter(function(x){return x.m===K.m&&x.n>K.to})[0];
var why=after?(after.right?after.miss.toFixed(2)+'% off':'the wrong way'):'';
h.querySelector('.face.back .x2p-hb').innerHTML='<h4>'+Z.esc(Z.nm(K.m))+': '+K.len+' in a row within 1%.</h4>'+
  '<div class="r33-run">'+run.map(function(x){var t=String(x.t).replace(/\..*$/,'');return '<span><b>'+Z.esc(/\d/.test(t)?Z.round(x.n).co:t)+'</b><em>'+x.miss.toFixed(2)+'%</em></span>'}).join('<i aria-hidden="true">›</i>')+'</div>'+
  '<p class="x2p-hw">From '+Z.esc(Z.round(K.from).co)+' to '+Z.esc(Z.round(K.to).co)+', '+Z.nm(K.m)+' got the direction right and landed within 1% '+K.len+' rounds running. No AI has gone longer.'+
  (after?'<em>It ended on '+Z.esc(Z.round(after.n).co)+': '+why+'.</em>':'')+'</p><button type="button" class="flipb" data-flip>↻ See the film</button>';
Z.strap([['c','Bullseyes'],['t','Tightest race'],['b','Biggest move'],['y','Hot streak']]);
window.__r33cfg={tag:'Bullseyes',also:'Hot streak'};
