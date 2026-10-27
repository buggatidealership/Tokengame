/* r1030 (owner, 2026-10-27, night: the P&L chart on the tickets; E1 read clearer than the tickets, so one E1 on the logo's cream and
   tickets spaced as clearly as E1, the stitched joins kept; five mockups): F2 to F5 drawn on X2+ in place of the tower, from the page's
   own accounts (window.__x2pPnl, the same sum as the proof) and the tower's own marks and flags. window.__fV = 'F2'..'F5'. */
(function(){var V=window.__fV,tw=document.querySelector('.rz-tw');if(!tw)return;
 var P=window.__x2pPnl(),A=P.A,G=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)}),N=G.length,last=G[N-1].n;
 /* the balance after every graded round (a skipped round keeps the balance), as the proof's chart draws it */
 var S={};Object.keys(A).forEach(function(m){var b=100000,s=[b];G.forEach(function(r){var c=(r.calls||[]).filter(function(x){return x[0]===m})[0];if(c)b*=1+(/^DOWN/.test(c[1])?-1:1)*r.a/100;s.push(b)});S[m]=s});
 /* marks, flags and order from the tower itself (it is already ranked by P&L) */
 var R=[].slice.call(tw.querySelectorAll('.rz-r:not(.rz-5)')).map(function(li){var nm=li.querySelector('.rz-nmw b').textContent.trim(),m=nm.toUpperCase(),sm=li.querySelector('.rz-nmw small'),fl=sm.querySelector('svg');
  var t=A[m],hit=Math.round(t.W/(t.W+t.L)*100);return {m:m,nm:nm,ver:sm.textContent.trim(),flag:fl?fl.outerHTML:'',logo:li.querySelector('.rz-lo').innerHTML,mc:getComputedStyle(li.querySelector('.rz-bar')).backgroundColor,W:t.W,L:t.L,hit:hit,pnl:t.pnl,pct:t.pct,s:S[m]}});
 var TRY=[].slice.call(tw.querySelectorAll('.rz-5n>span')).map(function(s){return s.innerHTML});
 var usd=function(v){return (v>=0?'+$':'−$')+Math.round(Math.abs(v)).toLocaleString('en-US')},pc=function(v){return (v>=0?'+':'−')+Math.abs(v).toFixed(1)+'%'};
 /* the P&L line: the balance after every round, the $100K start dashed; green in profit, red at a loss */
 function spark(s,w,h,o){o=o||{};var lo=Math.min.apply(0,s.concat([100000])),hi=Math.max.apply(0,s.concat([100000])),pd=o.pd||2,
   f=function(v){return (pd+(h-2*pd)*(1-(v-lo)/(hi-lo||1))).toFixed(2)},x=function(i){return (w*i/(s.length-1)).toFixed(2)},
   p=s.map(function(v,i){return (i?'L':'M')+x(i)+' '+f(v)}).join(' '),c=o.c||(s[s.length-1]>=100000?'#0f8a4c':'#c8302a'),z=f(100000);
  return '<svg class="qs" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" preserveAspectRatio="none" aria-hidden="true">'+
   (o.fill?'<path d="'+p+' L'+w+' '+z+' L0 '+z+' Z" fill="'+c+'" fill-opacity=".12"/>':'')+
   '<line x1="0" x2="'+w+'" y1="'+z+'" y2="'+z+'" stroke="'+(o.base||'rgba(4,7,14,.35)')+'" stroke-width=".8" stroke-dasharray="2.5 2.5" vector-effect="non-scaling-stroke"/>'+
   '<path d="'+p+'" fill="none" stroke="'+c+'" stroke-width="'+(o.sw||1.5)+'" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>'+
   '<circle cx="'+x(s.length-1)+'" cy="'+f(s[s.length-1])+'" r="'+(o.dot||1.9)+'" fill="'+c+'"/></svg>'}
 var wl=function(r){return '<span class="qw">'+r.W+'</span><span class="qd">-</span><span class="ql">'+r.L+'</span>'};
 var nmBlock=function(r){return '<span class="qn"><b>'+r.nm+'</b><small>'+r.ver+r.flag+'</small></span>'};
 var h='';
 if(V==='F2'||V==='F5'){ /* tickets: the live stock and stub, stitched as the bet is, the fields spaced like E1 */
  h='<div class="tq-cols" aria-hidden="true"><span></span><span>AI</span><span>W-L</span><span>Hit rate</span><span>P&amp;L</span></div><div class="tq-list">'+
   R.map(function(r,i){return '<div class="tq'+(i?'':' qg')+'" data-m="'+r.m+'"><span class="tq-stub"><small>No.</small><b>'+(i+1)+'</b></span>'+
    '<span class="tq-ai"><span class="tq-lo">'+r.logo+'</span>'+nmBlock(r)+'</span><span class="tq-v">'+wl(r)+'</span><span class="tq-v">'+r.hit+'%</span>'+
    '<span class="tq-pl"><b class="'+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'</b>'+(V==='F2'?'<span class="tq-pc">'+pc(r.pct)+'</span>'+spark(r.s,78,18):'<span class="tq-pc">'+pc(r.pct)+'</span>')+'</span>'+
    (V==='F5'?'<span class="tq-ch"><span class="tq-chl">P&amp;L, round by round · dashed: the $100K start</span>'+spark(r.s,262,30,{fill:1,sw:1.6,dot:2.2})+'<span class="tq-chx"><i>R1</i><i>R'+last+'</i></span></span>':'')+'</div>'}).join('')+
   '<div class="tq qk5"><span class="tq-stub"><small>No. 5</small><b>?</b></span><span class="tq-5t">Models<br>in tryouts</span><span class="tq-5n">'+TRY.map(function(t){return '<span>'+t+'</span>'}).join('')+'</span></div></div>'}
 if(V==='F3'||V==='F4'){ /* the digital ticket on the logo's cream */
  var rows=R.map(function(r,i){return '<div class="qe-r'+(i?'':' qg')+'" data-m="'+r.m+'"><span class="qe-pos">'+(i+1)+'</span><span class="qe-bar" style="background:'+(i?r.mc:'#fdbc2a')+'"></span>'+
   '<span class="qe-ai"><span class="qe-lo">'+r.logo+'</span>'+nmBlock(r)+'</span><span class="qe-v">'+wl(r)+'</span><span class="qe-v">'+r.hit+'%</span>'+
   '<span class="qe-pl"><b class="'+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'</b>'+spark(r.s,74,18,{fill:1})+'</span></div>'}).join('');
  var try5='<div class="qe-r qk5"><span class="qe-pos">5?</span><span class="qe-5t">In tryouts</span><span class="qe-5n">'+TRY.map(function(t){return '<span>'+t+'</span>'}).join('')+'</span></div>';
  var cols='<div class="qe-cols" aria-hidden="true"><span>Pos</span><span>AI</span><span>W-L</span><span>Hit rate</span><span>P&amp;L</span></div>';
  if(V==='F3')h='<div class="qe"><div class="qe-hd"><span class="qe-k">E-ticket</span><span class="qe-t">Season 1 · Round '+last+'</span><span class="qe-live"><i></i>Live</span></div>'+
   '<div class="qe-perf"></div>'+cols+rows+try5+'<div class="qe-perf"></div><div class="qe-ft"><span class="qe-meta"><b>EZ-S1-R'+last+'</b><span>Issued by the market close · 4 AIs · '+N+' rounds</span></span><span class="qe-adm">Admit<br>the market<br>close</span></div></div>';
  else h='<div class="qe4-hd"><span class="qe-t">Season 1 · Round '+last+'</span><span class="qe-live"><i></i>Live</span></div>'+cols+'<div class="tq-list qe4">'+
   R.map(function(r,i){return '<div class="qe4-t'+(i?'':' qg')+'">'+rows.split('</div>').filter(Boolean)[i]+'</div></div>'}).join('')+'<div class="qe4-t qk5">'+try5+'</div></div>'}
 var box=document.createElement('div');box.className='f30 '+V;box.innerHTML=h;tw.parentNode.insertBefore(box,tw);tw.style.display='none';
 var how=document.querySelector('#standings .rz-how');if(how)how.hidden=true;
 /* the bet's join on every join: punched holes, half-round bites at the edges, a hole where the stub's perforation crosses, and
   (tickets) the red foot band meeting the green head band */
 var list=box.querySelector('.tq-list');if(!list)return;var bands=V!=='F4';
 function joins(){[].slice.call(list.querySelectorAll('.qj')).forEach(function(e){e.remove()});var O=list.getBoundingClientRect(),T=[].slice.call(list.children).filter(function(e){return !e.classList.contains('qj')});
  function add(c,css){var e=document.createElement('span');e.className='qj '+c;e.setAttribute('aria-hidden','true');e.style.cssText=css;list.appendChild(e)}
  for(var i=1;i<T.length;i++){var a=T[i-1].getBoundingClientRect(),b=T[i].getBoundingClientRect(),y=(a.bottom+b.top)/2-O.top,L=b.left-O.left,W=b.width,st=T[i].querySelector('.tq-stub'),sx=st?st.getBoundingClientRect().right-O.left:null;
   if(bands){add('qjr','left:'+L+'px;width:'+W+'px;top:'+(y-6)+'px');add('qjg','left:'+L+'px;width:'+W+'px;top:'+y+'px')}
   add('qjp','left:'+(L+10)+'px;width:'+(W-20)+'px;top:'+(y-1.9)+'px');add('qjb','left:'+(L-10)+'px;top:'+(y-10)+'px');add('qjb','left:'+(L+W-10)+'px;top:'+(y-10)+'px');
   if(sx!=null)add('qjh','left:'+(sx-6)+'px;top:'+(y-6)+'px')}}
 joins()})();
