/* C1 "The luck band": the R10 hit-rate chart with the band a fair coin lands in 19 times in 20, for the calls made so far.
   Wide early, narrow later. A line inside it can't be told from luck; a line above it can. No verdict in words. */
(function(){const d=window.__scD,{M,NM,face,band}=d,sp=document.querySelector('.wc-splash');
const c=d.chart({xmax:Math.max(...d.ORDER.map(m=>d.M[m].n))}),xmax=c.now;
const b=c.bt(xmax),bn=band(xmax);
let es=c.by.map(m=>({m,y:c.Y(M[m].sm[M[m].n])})).sort((a,b)=>a.y-b.y);for(let i=1;i<es.length;i++)if(es[i].y-es[i-1].y<14)es[i].y=es[i-1].y+14;
const ticks=[];for(let i=10;i<xmax;i+=10)ticks.push(i);
const html='<div class="sc-take"><figure class="sc-ch sc-c1" aria-label="Hit rate after every call, with the range a fair coin lands in 19 times in 20. '+c.by.map(m=>NM[m]+' '+M[m].W+' right of '+M[m].n).join(', ')+'. Every line is inside the coin\'s range so far.">'
 +'<span class="sc-cap">Hit rate, call by call</span>'
 +'<p class="sc-key"><span><i class="sc-sw"></i>Where a coin lands, 19 times in 20</span><span><i class="sc-sw-c"></i>Coin flip 50%</span></p>'
 +'<div class="sc-pl">'+c.html+'<span class="sc-brk" style="top:'+c.Y(b[0]).toFixed(2)+'%;bottom:'+(100-c.Y(b[1])).toFixed(2)+'%"></span>'
   +'<span class="sc-coin" style="left:58%;top:'+c.Y(.5)+'%"></span></div>'
   +'<div class="sc-ends" aria-hidden="true">'+es.map(e=>'<span class="sc-e" style="top:'+e.y.toFixed(1)+'%">'+face(e.m,'wc-f-s')+'<b>'+d.rateTxt(e.m)+'</b></span>').join('')+'</div></div>'
 +'<p class="sc-x" aria-hidden="true"><span style="left:0">0 calls</span>'+ticks.map(i=>'<span class="'+(i%20?'sc-odd':'')+'" style="left:'+(i/xmax*100).toFixed(2)+'%">'+i+'</span>').join('')+'<span style="left:100%;transform:translateX(-100%)">'+xmax+'</span></p>'
 +'<ul class="sc-cnt">'+c.by.map(m=>'<li>'+face(m,'wc-f-s')+'<b>'+M[m].W+'</b> of '+M[m].n+'</li>').join('')+'</ul>'
 +'</figure></div>';
sp.querySelector('.wc-sp-lead').insertAdjacentHTML('afterend',html);sp.classList.add('sc-sol');
sp.querySelector('.wc-sp-lead').textContent='A coin gets about half right. Inside the gold band, a coin could have done it too.';
sp.querySelector('.wc-sp-cap').textContent='Each line: how often a model called the direction right. The band shrinks with every call.';
d.reveal(sp.querySelector('.sc-c1'));
document.documentElement.classList.add('sc-ready-c1')})();
