/* C5 "The track": one lane per model, the car parked at its P&L now, a faded trail from its season low to its season high
   (where it has been), a flag at its best, a tape measure between #1 and #2, and a pit board of who led for how many rounds. */
(function(){const d=window.__scD,{bal,N,NM,face,col,now,ledRounds,changes}=d;
const pl=m=>bal[m].map(v=>v-1e5),all=[].concat(...d.ORDER.map(pl)),mn=Math.min(...all),mx=Math.max(...all);
const lo=Math.floor((mn-5000)/25000)*25000,hi=Math.ceil((mx+5000)/25000)*25000,XP=v=>(v-lo)/(hi-lo)*100;
const lanes=now.map((m,i)=>{const p=pl(m),v=p[N],a=Math.min(...p),b=Math.max(...p),bi=p.indexOf(b);
  return '<div class="sc5-ln'+(i?'':' sc5-1')+'" style="--mc:'+col(m)+';--x:'+XP(v).toFixed(2)+'%"><span class="sc5-rk">#'+(i+1)+'</span>'
   +'<div class="sc5-tr"><i class="sc5-start" style="left:'+XP(0).toFixed(2)+'%">'+(i?'':'<em>Start</em>')+'</i>'+'<i class="sc5-trail" style="left:'+XP(a).toFixed(2)+'%;right:'+(100-XP(b)).toFixed(2)+'%"></i>'
   +'<i class="sc5-best'+(XP(b)>78?' sc5-bl':'')+'" style="left:'+XP(b).toFixed(2)+'%" title="Best: '+d.usd(b)+' after round '+d.R[bi-1].n+'"><em>'+d.usdK(b)+'</em></i>'
   +'<span class="sc5-car">'+face(m)+'<i class="sc5-w1"></i><i class="sc5-w2"></i></span>'
   +'</div><p class="sc5-vv"><b class="sc5-v '+(v>=0?'wc-tu':'wc-td')+'" data-v="'+Math.round(v)+'">'+d.usdK(v)+'</b><small>'+(i?'$'+((bal[now[i-1]][N]-bal[m][N])/1000).toFixed(1)+'K back':'Leads')+'</small></p></div>'}).join('');
const g=d.gap,x1=XP(pl(now[0])[N]),x2=XP(pl(now[1])[N]);
const ticks=[];for(let v=Math.ceil(lo/50000)*50000;v<=hi;v+=50000)ticks.push(v);
const inner='<figure class="wc-pn wc-in sc5" style="--x0:'+XP(0).toFixed(2)+'" aria-label="Where each AI stands now on a track from '+d.usd(lo)+' to '+d.usd(hi)+'. '+now.map(m=>NM[m]+' '+d.usd(pl(m)[N])).join(', ')+'.">'
 +'<div class="sc5-trk">'+lanes+'</div>'
 +'<p class="sc5-x" aria-hidden="true">'+ticks.map(v=>'<span style="left:'+XP(v).toFixed(2)+'%">'+(v?d.usdK(v).replace('.0K','K'):'$0')+'</span>').join('')+'</p>'
 +'<p class="sc-key sc5-key"><span><i class="sc5-kt"></i>Where it has been this season</span><span><i class="sc5-kf"></i>Its best</span></p>'
 +'<div class="sc5-pit"><p class="sc5-pn"><b>'+changes.length+'</b>lead changes</p><ul>'+now.slice().sort((a,b)=>ledRounds[b]-ledRounds[a]).map(m=>'<li>'+face(m,'wc-f-s')+'<span>'+NM[m]+'</span><b>'+ledRounds[m]+'</b></li>').join('')+'</ul><small>rounds in front</small></div>'
 +'</figure>';
const s=d.raceSec('sc5-on',inner,d.raceLine);d.reveal(s.querySelector('.sc5'));
/* the P&L counts up as the cars drive in */
if(!d.rm())new IntersectionObserver((es,o)=>{if(!es[0].isIntersecting)return;o.disconnect();s.querySelectorAll('.sc5-v').forEach(n=>{const v=+n.dataset.v,fin=n.textContent,t0=performance.now();
  (function f(t){const k=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-k,3);n.textContent=k<1?d.usdK(v*e):fin;if(k<1)requestAnimationFrame(f)})(t0)})},{threshold:.3}).observe(s.querySelector('.sc5'));
document.documentElement.classList.add('sc-ready-c5')})();
