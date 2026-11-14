/* C6 "Lead changes, panel by panel": a ribbon of who was in front after every round (one tick per round in the leader's
   colour, a star where it changes hands), then the season's lead changes as a comic strip, one panel each, the new leader
   bursting through, and the last panel: today's leader and the gap. */
(function(){const d=window.__scD,{bal,N,R,NM,face,col,changes,lead,now}=d;
const rib=lead.slice(1).map((m,i)=>'<i style="--mc:'+col(m)+'"'+(i&&lead[i]!==m?' class="sc6-chg"':'')+' title="Round '+R[i].n+': '+NM[m]+' in front"></i>').join('');
const fx=g=>g>=15000?'Ka-pow!':g>=8000?'Zoom!':'Whoosh!';
const pan=changes.map((c,k)=>'<li class="sc6-p" style="--mc:'+col(c.m)+'"><span class="sc6-r">R'+c.n+'<small>'+c.co+'</small></span>'
  +'<div class="sc6-art">'+face(c.from,'sc6-old')+'<span class="sc6-bu"><em>'+fx(c.gap)+'</em></span>'+face(c.m,'sc6-new')+'</div>'
  +'<p><b>'+NM[c.m]+'</b> passes '+NM[c.from]+'<small>by $'+Math.round(c.gap).toLocaleString('en-US')+'</small></p></li>').join('');
const lc=changes[changes.length-1],since=N-lc.i+1;
const fin='<li class="sc6-p sc6-now" style="--mc:'+col(now[0])+'"><span class="sc6-r">Now<small>after R'+R[N-1].n+'</small></span>'
  +'<div class="sc6-art">'+face(now[1],'sc6-old')+face(now[0],'sc6-new sc6-crown')+'</div>'
  +'<p><b>'+NM[now[0]]+'</b> leads '+NM[now[1]]+'<small>by $'+Math.round(d.gap).toLocaleString('en-US')+', '+since+' rounds on top</small></p></li>';
const inner='<figure class="wc-pn wc-in sc6" aria-label="Who was in front after every round, and the '+changes.length+' lead changes.">'
 +'<p class="sc6-h">In front after every round</p><div class="sc6-rib" aria-hidden="true">'+rib+'</div>'
 +'<p class="sc6-rx" aria-hidden="true"><span>R'+R[0].n+'</span><span>R'+R[N-1].n+'</span></p>'
 +'<p class="sc-key sc6-key">'+d.ORDER.map(m=>'<span><i class="sc6-sw" style="--mc:'+col(m)+'"></i>'+NM[m]+' '+d.ledRounds[m]+'</span>').join('')+'<span class="sc6-kn">rounds in front</span></p>'
 +'<ol class="sc6-strip">'+pan+fin+'</ol></figure>';
const s=d.raceSec('sc6-on',inner,d.raceLine);d.reveal(s.querySelector('.sc6'));
document.documentElement.classList.add('sc-ready-c6')})();
