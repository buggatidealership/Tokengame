(function(){const P=window.__x2pPnl(),usd=v=>(v<0?'−$':'+$')+Math.abs(Math.round(v)).toLocaleString('en-US');
const ord=['GROK','CLAUDE','GPT','KIMI'].sort((a,b)=>P.A[b].pnl-P.A[a].pnl);
const last=ROUNDS[ROUNDS.length-1];const today=UPCOMING.filter(u=>u.called===UPCOMING[0].called);
const pend=PENDING.filter(u=>u.resolves===PENDING[0].resolves);
let s='<span class="it"><span class="k">P&amp;L</span></span>'+ord.map((m,i)=>'<span class="it"><b>'+(i+1)+' '+MODELS[m].name.toUpperCase()+'</b><b class="'+(P.A[m].pnl<0?'dn':'up')+'">'+usd(P.A[m].pnl)+'</b></span>').join('');
s+='<i class="sep"></i><span class="it"><span class="k">Graded today</span><b>SK Hynix</b><b class="up">+10.89%</b> only GPT said up · <b>Seagate</b><b class="up">+4.51%</b> · <b>Robinhood</b><b class="dn">−3.31%</b> Grok 0.11% off · <b>GE Vernova</b><b class="dn">−1.90%</b></span>';
s+='<i class="sep r"></i><span class="it"><span class="k">Locked, graded tomorrow</span>'+pend.map(u=>'<b>'+u.ticker+'</b>').join(' ')+'</span>';
s+='<i class="sep"></i><span class="it"><span class="k">Predictions due</span>'+today.length+' · Apple · Amazon · Samsung · Eli Lilly · Coinbase · Strategy</span>';
const d=document.createElement('div');d.className='ezc';d.innerHTML='<div class="lg"><img src="tools/concepts/ez-logo-traced.svg"></div><div class="bug"><i></i><span>On air</span></div><div class="run"><div class="tr">'+s+'<i class="sep r"></i>'+s+'</div></div><div class="cl"><span>Next bell</span><b>4:00 PM ET</b></div>';document.body.appendChild(d)})();
