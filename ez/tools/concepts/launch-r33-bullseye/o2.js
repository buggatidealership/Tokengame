/* Option 2, "The board": a fourth slab that is the whole season, not one round. Where a film would be, a dartboard printed on the
   card stock: every call that got the direction right is a dart in its AI's colour, as far from the middle as it was from the real
   move (the bull: within 0.1%; the green ring: within 0.5%; then 1%, 2%, 4% and more). Wrong-way calls miss the board. The three
   bullseyes are named. Closest call keeps its one-round story (Philip Morris); its dart is one of the three in the bull. */
var Z=window.__r33,n0=Z.bulls[0].n,nR=Z.right.length,nC=Z.calls.length,nB=Z.bulls.length;
var ul=document.querySelector('ul.hx2s');
ul.appendChild(Z.item({n:n0,tag:'Bullseyes',head:nB+' bullseyes in '+nC+' calls.',body:'.',rec:[[String(nB),'bullseyes'],[nR+' of '+nC,'on the board']]}));
Z.rebuild();
var w=Z.card('Bullseyes'),c=w.querySelector('.card'),fr=c.querySelector('.face.front'),bk=c.querySelector('.face.back');
/* the board, in a 200 x 200 box: centre (100,95), rings at 0.1, 0.5, 1, 2, 4% and the rim at 8% */
var R=[[0,0],[.1,7],[.5,17],[1,33],[2,51],[4,70],[8,86]];
var rad=function(m){for(var i=1;i<R.length;i++)if(m<=R[i][0]){var a=R[i-1],b=R[i];return a[1]+(b[1]-a[1])*(m-a[0])/(b[0]-a[0])}return 86};
var col={GPT:'#10a37f',KIMI:'#1e80ff',CLAUDE:'#d97757',GROK:'#141217'};
var bands=['#c8372a','#1f7a45','#efe4c8','#ddd0b2','#efe4c8','#ddd0b2'],s='';
for(var i=R.length-1;i>=1;i--)s+='<circle cx="100" cy="95" r="'+R[i][1]+'" fill="'+bands[i-1]+'" stroke="#1b181c" stroke-width="'+(i<3?.9:.7)+'"/>';
/* ring labels up the left, where no bull label sits */
[[.5,'0.5%'],[1,'1%'],[2,'2%'],[4,'4%']].forEach(function(x){var y=95-rad(x[0]);s+='<text x="100" y="'+(y+5.6).toFixed(1)+'" class="r33-rl">'+x[1]+'</text>'});
/* the darts: golden-angle spread by order, so the board fills evenly and the same call always lands in the same place */
var ga=Math.PI*(3-Math.sqrt(5)),dots='',lab='';
Z.right.forEach(function(x,k){var r=rad(x.miss),t=(k*ga+.6)%(2*Math.PI),u=Math.abs(t-1.5*Math.PI);if(u<.16)t+=.32;   /* keep the ring labels' wedge (straight up) clear */
  var cx=100+r*Math.cos(t),cy=95+r*Math.sin(t);
  if(x.h<=10){return}
  dots+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="2.5" fill="'+col[x.m]+'" stroke="'+(x.m==='GROK'?'#efe4c8':'#1b181c')+'" stroke-width=".6"/>'});
/* the bullseyes: in the bull, side by side, each named with a leader to the right */
Z.bulls.slice().sort(function(a,b){return a.n-b.n}).forEach(function(x,k){var cx=96+k*4.2,cy=93+k*2.2,ly=60+k*15;
  dots+='<circle cx="'+cx+'" cy="'+cy+'" r="2.5" fill="'+col[x.m]+'" stroke="'+(x.m==='GROK'?'#efe4c8':'#1b181c')+'" stroke-width=".6"/>';
  lab+='<path d="M'+(cx+2)+' '+cy+'L150 '+ly+'H156" fill="none" stroke="#1b181c" stroke-width=".7"/><g class="r33-bl" transform="translate(155 '+(ly-6.5)+')"><rect width="44" height="13" rx="2" fill="#1b181c"/><rect width="4" height="13" rx="1" fill="'+col[x.m]+'" stroke="#1b181c" stroke-width=".5"/>'+
    '<text x="24.5" y="9.3">'+Z.esc(x.t.replace(/\..*$/,''))+' '+x.miss.toFixed(2)+'%</text></g>'});
var legend=Z.M.map(function(m,k){return '<g transform="translate('+(14+k*46)+' 192)"><circle r="3" fill="'+col[m]+'" stroke="'+(m==='GROK'?'#efe4c8':'#1b181c')+'" stroke-width=".6"/><text x="6" y="3.2" class="r33-lg">'+Z.esc(Z.nm(m))+'</text></g>'}).join('');
/* the poster stays in place, unseen, so the box keeps a film's exact size; the film itself goes */
var art=fr.querySelector('.art');[].forEach.call(art.querySelectorAll('video'),function(v){v.remove()});var pim=art.querySelector('img');if(pim)pim.style.visibility='hidden';
art.insertAdjacentHTML('beforeend','<div class="r33-board"><svg viewBox="0 0 200 200" role="img" aria-label="'+nR+' calls that got the direction right, placed by how close they came. '+nB+' bullseyes.">'+s+dots+lab+legend+'</svg></div>');
art.classList.add('r33-art');
/* the label: a season card */
var zl=fr.querySelector('.zl');zl.querySelector('.nm').innerHTML='<b>Bullseyes</b><small>(Season 1)</small>';
var zb=zl.querySelector('.zb');zb.innerHTML=zb.innerHTML.replace(/\d{8}/,'S1000003');
var zr=fr.querySelector('.zr');zr.querySelector('.no').textContent='S1';zr.querySelector('.ds').textContent='Bulls';zr.querySelector('.gr').textContent=String(nB);
var top=Z.M.slice().sort(function(a,b){return Z.by[b].bulls-Z.by[a].bulls})[0];
var cw=fr.querySelector('.cwin');cw.innerHTML='<small>Most bulls</small><span class="wv"><span class="wn">'+Z.esc(Z.nm(top))+(typeof logo==='function'?logo(top):'')+'</span></span>';
/* the back: the season's closeness by AI, then what the board shows */
var rows=Z.M.slice().sort(function(a,b){return Z.by[b].bulls-Z.by[a].bulls||Z.by[b].in05-Z.by[a].in05||Z.by[b].in1-Z.by[a].in1});
var bzl=bk.querySelector('.zl');if(bzl){bzl.querySelector('.nm').innerHTML='<b>Bullseyes</b><small>(Season 1)</small>';var bzb=bzl.querySelector('.zb');if(bzb)bzb.textContent=nR+' of '+nC+' calls on the board'}
var bzr=bk.querySelector('.zr');if(bzr){bzr.querySelector('.no').textContent='S1';bzr.querySelector('.ds').textContent='Bulls';bzr.querySelector('.gr').textContent=String(nB)}
bk.querySelector('.x2p-hb').innerHTML='<h4>'+nB+' bullseyes in '+nC+' calls.</h4>'+
  '<div class="r33-tb"><span class="h"><i></i><b>Bull</b><b>0.5%</b><b>1%</b><b>Run</b></span>'+rows.map(function(m){var y=Z.by[m];
    return '<span><i style="--c:'+col[m]+'">'+Z.esc(Z.nm(m))+'</i><b class="'+(y.bulls?'on':'')+'">'+y.bulls+'</b><b>'+y.in05+'</b><b>'+y.in1+'</b><b class="'+(m===Z.streak.m?'rn':'')+'">'+y.streak+'</b></span>'}).join('')+'</div>'+
  '<p class="x2p-hw">Every dart is a call that got the direction right, placed by how close it came. Bull: within 0.1%. Run: most in a row within 1%.'+
  '<em>'+(nC-nR)+' wrong-way calls missed the board.</em></p><button type="button" class="flipb" data-flip>↻ See the board</button>';
Z.strap([['c','Closest call'],['t','Tightest race'],['b','Biggest move'],['y','Bullseyes']]);
window.__r33cfg={tag:'Bullseyes'};
