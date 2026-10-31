/* N "the paper" (owner, 2026-10-29: "what if it should feel like you're reading a newspaper... a newspaper you go to every day,
   checking in on the AIs"): behind the page, a newspaper made from the season's own record: a masthead with today's date and edition,
   headlines written from the data, and agate columns listing every round (company, move, who called it). The sections sit on it. */
(function(){var d=document;function go(){if(d.querySelector('.np')||typeof ROUNDS==='undefined'||!window.__x2pPnl)return;
 var l=d.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Pirata+One&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap';d.head.appendChild(l);
 var P=window.__x2pPnl(),M=['GROK','CLAUDE','GPT','KIMI'],NM={GROK:'Grok',CLAUDE:'Claude',GPT:'GPT',KIMI:'Kimi'};var tot={};M.forEach(function(m){var s=0;for(var k in P.A[m].per)s+=P.A[m].per[k].v;tot[m]=s});
 var rk=M.slice().sort(function(a,b){return tot[b]-tot[a]}),rs=ROUNDS.slice().sort(function(a,b){return b.n-a.n}),last=rs[0];
 var usd=function(v){return (v<0?'−$':'+$')+Math.abs(Math.round(v)).toLocaleString('en-US')};
 var now=new Date(),date=now.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric',timeZone:'America/New_York'});
 var wk=Math.floor((now-new Date('2026-09-08T12:00:00-04:00'))/864e5/7)+1;
 /* the masthead, in the page's flow under the header */
 var mh=d.createElement('div');mh.className='np-mh';mh.innerHTML='<div class="np-ear"><span>Season 1 · Week '+wk+'</span><span>'+ROUNDS.length+' rounds graded</span></div><div class="np-nm">The Earnings Zeason</div><div class="np-dl"><span>'+date+'</span><span>Late edition · graded at the close</span><span>Four AIs. One belt.</span></div>';
 var main=d.querySelector('main.wrap');main.parentNode.insertBefore(mh,main);
 /* headlines from the data */
 var w=function(r){return String(r.win||'').split(/\s*&\s*/).filter(Boolean).map(function(m){return NM[m]||m}).join(' & ')||'Nobody'};
 var H=[NM[rk[0]]+' holds the belt',(last.a<0?'Bears':'Bulls')+' win on '+last.co,NM[rk[1]]+' chases, '+usd(tot[rk[0]]-tot[rk[1]]).slice(1)+' behind',NM[rk[3]]+' sinks to '+usd(tot[rk[3]]),
  'Who calls it next?',rs[1].co+': '+w(rs[1])+' takes the round',rs[2].co+' moves '+(rs[2].a>0?'+':'')+rs[2].a+'%','Season 1, week '+wk+': '+ROUNDS.length+' rounds graded'];
 var ag=rs.map(function(r){var cs=r.calls.filter(function(c){return c[1]}).map(function(c){return (NM[c[0]]||c[0])+' '+(/^UP/.test(c[1])?'+':'−')+c[1].replace(/^(UP|DOWN)\s*/,'')}).join(', ');
  return '<p><b>R'+r.n+' '+r.co.toUpperCase()+'</b> '+(r.a>0?'+':'')+r.a+'%. '+cs+'. Winner: '+w(r)+'.</p>'}).join('');
 var bg=d.createElement('div');bg.className='np';d.body.prepend(bg);
 function lay(){var Ht=d.documentElement.scrollHeight,W=d.documentElement.clientWidth;bg.style.height=Ht+'px';var cols=Math.max(2,Math.round(W/190)),html='';
  for(var y=0,i=0;y<Ht;i++){var hh=i%2?'np-h2':'np-h1';html+='<div class="np-blk" style="top:'+y+'px"><h3 class="'+hh+'">'+H[i%H.length]+'</h3><div class="np-cols" style="column-count:'+cols+'">'+ag+ag+'</div></div>';y+=900}
  bg.innerHTML=html}
 lay();setTimeout(lay,4000)}
 if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',function(){setTimeout(go,2000)});else setTimeout(go,2000)})();
