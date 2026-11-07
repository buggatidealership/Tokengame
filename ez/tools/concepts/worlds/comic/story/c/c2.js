/* C2 "How far into the sample": the same chart on an axis that runs to 150 calls, the owner's 100 to 150 before a verdict.
   The band keeps narrowing into the calls still to come (printed fainter); a row of coins under the axis, one per 10 calls,
   fills as calls are graded; the 100 to 150 stretch is marked. The band's range is printed at today's count, at 100 and at 150. */
(function(){const d=window.__scD,{M,NM,face,band}=d,sp=document.querySelector('.wc-splash');
const XM=150,c=d.chart({xmax:XM,future:true}),now=c.now;
const rng=n=>{const b=band(n);return Math.round(b.lo/n*100)+' to '+Math.round(b.hi/n*100)+'%'};
let es=c.by.map(m=>({m,y:c.Y(M[m].sm[M[m].n])})).sort((a,b)=>a.y-b.y);for(let i=1;i<es.length;i++)if(es[i].y-es[i-1].y<13)es[i].y=es[i-1].y+13;
/* a bracket across the band at a call count, with the coin's exact range (raw %) printed above and below it */
const tag=(n,cls)=>{const b=band(n),[t,u]=c.bt(n);return '<span class="sc2-rb '+(cls||'')+'" style="left:'+c.XP(n).toFixed(2)+'%;top:'+c.Y(t).toFixed(2)+'%;bottom:'+(100-c.Y(u)).toFixed(2)+'%"><b>'+Math.round(b.hi/n*100)+'%</b><b>'+Math.round(b.lo/n*100)+'%</b></span>'};
const coins=[];for(let i=0;i<XM/10;i++){const full=(i+1)*10<=now;coins.push('<i class="sc2-c'+(full?' sc2-on':'')+((i*10)>=100?' sc2-goal':'')+'" style="left:'+((i*10+5)/XM*100).toFixed(2)+'%"></i>')}
const html='<div class="sc-take"><figure class="sc-ch sc-c2" aria-label="Hit rate after every call, on the way to 150 calls. '+now+' calls so far. A fair coin lands between '+rng(now)+' now, '+rng(100)+' at 100 calls and '+rng(150)+' at 150.">'
 +'<span class="sc-cap">Hit rate, call by call</span>'
 +'<p class="sc-key"><span><i class="sc-sw"></i>Where a coin lands, 19 times in 20</span><span><i class="sc-sw-c"></i>Coin flip 50%</span></p>'
 +'<div class="sc-pl sc2-pl">'+c.html
   +'<span class="sc2-today" style="left:'+c.XP(now).toFixed(2)+'%"><em>Today</em></span>'
   +'<span class="sc2-goalz" style="left:'+c.XP(100).toFixed(2)+'%"></span>'
   +tag(now,'sc2-t0')+tag(100,'sc2-t1')+tag(150,'sc2-t2')
   +'<span class="sc-coin" style="left:'+c.XP(122).toFixed(2)+'%;top:'+c.Y(.5)+'%"></span>'
   +'<div class="sc2-ends" style="left:'+c.XP(now).toFixed(2)+'%" aria-hidden="true">'+es.map(e=>'<span class="sc-e" style="top:'+e.y.toFixed(1)+'%">'+face(e.m,'wc-f-s')+'<b>'+d.rateTxt(e.m)+'</b></span>').join('')+'</div>'
 +'</div></div>'
 +'<div class="sc2-jar" aria-hidden="true">'+coins.join('')+'<span class="sc2-br" style="left:'+(100/XM*100).toFixed(2)+'%"><em>Enough calls to judge</em></span></div>'
 +'<p class="sc2-x" aria-hidden="true"><span style="left:0">0</span><span style="left:'+(now/XM*100).toFixed(2)+'%"><b>'+now+'</b> calls in</span><span style="left:'+(100/XM*100).toFixed(2)+'%">100</span><span style="left:100%">150</span></p>'
 +'</figure></div>';
sp.querySelector('.wc-sp-lead').insertAdjacentHTML('afterend',html);sp.classList.add('sc-sol');
sp.querySelector('.wc-sp-lead').textContent=now+' calls in. Too few to tell skill from luck yet.';
sp.querySelector('.wc-sp-cap').textContent='Each coin is 10 calls. The verdict waits for 100 to 150. Grok has made '+M.GROK.n+'.';
d.reveal(sp.querySelector('.sc-c2'));
document.documentElement.classList.add('sc-ready-c2')})();
