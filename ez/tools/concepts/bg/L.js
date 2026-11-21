(function(){var d=document;function go(){if(d.querySelector('.bgl')||!window.__x2pPnl)return;var P=window.__x2pPnl(),M=['GROK','CLAUDE','GPT','KIMI'];
 var tot={};M.forEach(function(m){var s=0;for(var k in P.A[m].per)s+=P.A[m].per[k].v;tot[m]=s});var lead=M.slice().sort(function(a,b){return tot[b]-tot[a]})[0];
 var rs=ROUNDS.slice().sort(function(a,b){return a.n-b.n}),bal=[100000],b=100000;rs.forEach(function(r){var x=P.A[lead].per[r.n];b+=x?x.v:0;bal.push(b)});
 var w=d.createElement('div');w.className='bgl';d.body.prepend(w);
 function lay(){var H=d.documentElement.scrollHeight,W=d.documentElement.clientWidth,top=200,bot=H-120,mn=Math.min.apply(0,bal),mx=Math.max.apply(0,bal);
  var X=function(v){return W*(.12+.76*(v-mn)/(mx-mn||1))},Y=function(i){return top+(bot-top)*i/(bal.length-1)};
  var pts=bal.map(function(v,i){return [X(v),Y(i)]}),dp='M'+pts.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1)}).join(' L');
  var x0=X(100000),lab='';rs.forEach(function(r,i){if(i%3)return;var p=pts[i+1],dir=r.a>0?'u':'d';lab+='<text class="'+dir+'" x="'+(W-8)+'" y="'+(p[1]+3)+'" text-anchor="end">R'+r.n+' '+(r.ticker||'').replace(/\..*$/,'')+'</text><line class="st" x1="'+(p[0])+'" y1="'+p[1]+'" x2="'+(W-70)+'" y2="'+p[1]+'"/>'});
  w.style.height=H+'px';w.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none"><line class="gh" x1="'+x0+'" y1="'+top+'" x2="'+x0+'" y2="'+bot+'"/>'+lab+'<path class="ln" d="'+dp+'" pathLength="1"/><text x="'+(x0+6)+'" y="'+(top-8)+'">'+lead+' · $100K start</text></svg>';
  var pa=w.querySelector('.ln');pa.style.strokeDasharray='1';function sc(){var f=Math.min(1,(scrollY+innerHeight*.8)/H);pa.style.strokeDashoffset=String(1-f)}sc();addEventListener('scroll',sc,{passive:true})}
 lay();setTimeout(lay,4000)}
 if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',function(){setTimeout(go,2500)});else setTimeout(go,2500)})();
