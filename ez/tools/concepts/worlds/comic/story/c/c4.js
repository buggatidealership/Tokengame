/* C4 "Line race": every model's P&L after each graded round, a gold burst wherever the lead changes hands,
   a big ZOOM! on the latest one, and the gaps where the lines end. */
(function(){const d=window.__scD,{bal,N,R,ORDER,NM,face,col,changes,now}=d;
const pl=m=>bal[m].map(v=>v-1e5),all=[].concat(...ORDER.map(pl)),mn=Math.min(...all),mx=Math.max(...all);
const lo=Math.floor((mn-5000)/25000)*25000,hi=Math.ceil((mx+5000)/25000)*25000;
const X=i=>i/N*1000,Y=v=>(hi-v)/(hi-lo)*100,XP=i=>i/N*100;
const gl=[];for(let v=Math.ceil(lo/50000)*50000;v<=hi;v+=50000)gl.push(v);
const lines=now.slice().reverse().map(m=>'<path class="sc4-o" d="'+pl(m).map((v,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(2)).join(' ')+'"/><path class="sc4-l'+(m===now[0]?' sc4-lead':'')+'" pathLength="1" style="--mc:'+col(m)+'" d="'+pl(m).map((v,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(2)).join(' ')+'"/>').join('');
const lab=v=>v===0?'Start':(v>0?'+':'−')+'$'+Math.abs(v/1000)+'K';
const bursts=changes.map((c,k)=>{const last=k===changes.length-1;return '<span class="sc4-b'+(last?' sc4-zoom':'')+'" style="left:'+XP(c.i).toFixed(2)+'%;top:'+Y(bal[c.m][c.i]-1e5).toFixed(2)+'%" title="Round '+c.n+', '+c.co+': '+NM[c.m]+' passes '+NM[c.from]+'">'+(last?'<em>Zoom!</em>':'')+'</span>'}).join('');
const lc=changes[changes.length-1];
let es=now.map((m,i)=>({m,i,y:Y(pl(m)[N])})).sort((a,b)=>a.y-b.y);for(let i=1;i<es.length;i++)if(es[i].y-es[i-1].y<17)es[i].y=es[i-1].y+17;
const ends=es.map(e=>{const v=pl(e.m)[N],ahead=e.i?bal[now[e.i-1]][N]-bal[e.m][N]:0;return '<span class="sc4-e" style="top:'+e.y.toFixed(1)+'%">'+face(e.m,'wc-f-s')+'<span><b class="'+(v>=0?'wc-tu':'wc-td')+'">'+d.usdK(v)+'</b>'+(e.i?'<small>$'+(ahead/1000).toFixed(1)+'K back</small>':'<small class="sc4-1">#1</small>')+'</span></span>'}).join('');
const ticks=[];for(let i=10;i<N;i+=10)ticks.push(i);
const inner='<figure class="wc-pn wc-in sc4" aria-label="P&L after every round. '+now.map(m=>NM[m]+' '+d.usd(pl(m)[N])).join(', ')+'.">'
 +'<p class="sc-key sc4-key"><span><i class="sc4-kb"></i>The lead changes hands</span><span><i class="sc4-ks"></i>$100,000 start</span></p>'
 +'<div class="sc4-pl"><div class="sc4-cv"><div class="sc4-rv"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">'
 +gl.map(v=>'<line class="'+(v===0?'sc4-z':'sc4-g')+'" x1="0" x2="1000" y1="'+Y(v)+'" y2="'+Y(v)+'"/>').join('')+lines+'</svg>'+bursts
 +'<span class="sc4-cap" style="left:'+XP(lc.i).toFixed(2)+'%;top:'+Y(bal[lc.m][lc.i]-1e5).toFixed(2)+'%">R'+lc.n+': '+NM[lc.m]+' passes '+NM[lc.from]+'</span></div>'
 +gl.map(v=>'<span class="sc4-yl" style="top:'+Y(v)+'%">'+lab(v)+'</span>').join('')+'</div>'
 +'<div class="sc4-ends" aria-hidden="true">'+ends+'</div></div>'
 +'<p class="sc4-x" aria-hidden="true"><span style="left:0">Start</span>'+ticks.map(i=>'<span class="'+(i%20?'sc-odd':'')+'" style="left:'+XP(i).toFixed(2)+'%">R'+R[i-1].n+'</span>').join('')+'<span style="left:100%;transform:translateX(-100%)">R'+R[N-1].n+'</span></p>'
 +'</figure>';
const s=d.raceSec('sc4-on',inner,d.raceLine);d.reveal(s.querySelector('.sc4'));
document.documentElement.classList.add('sc-ready-c4')})();
