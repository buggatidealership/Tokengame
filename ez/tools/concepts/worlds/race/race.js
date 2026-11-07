/* RACE DAY: a world for the EZ page (mockup). Injected at DOMContentLoaded into ez/v46-live-x2plus.html.
   The season is a race meeting: four runners (the AIs) in silks, every earnings report a race on the card,
   the P&L the prize money, the market close the finish line, NVIDIA the season's cup race.
   Every figure is read from the page's own data (ROUNDS, PENDING, UPCOMING, MODELS, CO_LOGOS, __x2pPnl). */
(function(){
var H=document.documentElement;H.classList.add('wr');
var lk=document.createElement('link');lk.rel='stylesheet';
lk.href='https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Archivo:ital,wdth,wght@0,62..125,400..900;1,62..125,400..900&display=swap';
document.head.appendChild(lk);

var ORDER=['GPT','KIMI','CLAUDE','GROK'];               // saddle-cloth numbers follow the sheet's column order
var NAME={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
var SILK={ // jacket, pattern, cap
 GPT:{b:'#10a37f',p:'hoops',pc:'#f8f0d9',cap:'#f8f0d9'},
 KIMI:{b:'#1e80ff',p:'sleeves',pc:'#f8f0d9',cap:'#1e80ff'},
 CLAUDE:{b:'#d97757',p:'chevron',pc:'#f8f0d9',cap:'#d97757'},
 GROK:{b:'#15141a',p:'sash',pc:'#f8f0d9',cap:'#f8f0d9'}};
var LINE={GPT:'#0e8a6b',KIMI:'#1a6fe0',CLAUDE:'#c8613f',GROK:'#15141a'};
var sid=0;
function silk(m,cls){var s=SILK[m],id='wrj'+(++sid),J='M15 14 L33 14 L45 23 L41 30 L35 26 L35 43 L13 43 L13 26 L7 30 L3 23 Z',pat='';
 if(s.p=='hoops')pat='<rect x="0" y="20" width="48" height="4" fill="'+s.pc+'"/><rect x="0" y="28" width="48" height="4" fill="'+s.pc+'"/><rect x="0" y="36" width="48" height="4" fill="'+s.pc+'"/>';
 if(s.p=='sleeves')pat='<rect x="0" y="14" width="14" height="30" fill="'+s.pc+'"/><rect x="34" y="14" width="14" height="30" fill="'+s.pc+'"/><circle cx="24" cy="29" r="4.6" fill="'+s.pc+'"/>';
 if(s.p=='chevron')pat='<path d="M12 22 L24 33 L36 22" fill="none" stroke="'+s.pc+'" stroke-width="5"/>';
 if(s.p=='sash')pat='<path d="M15 14 L22 14 L36 43 L29 43 Z" fill="'+s.pc+'"/>';
 return '<svg class="wr-silk '+(cls||'')+'" viewBox="0 0 48 46" aria-hidden="true"><defs><clipPath id="'+id+'"><path d="'+J+'"/></clipPath></defs>'+
  '<g clip-path="url(#'+id+')"><rect width="48" height="46" fill="'+s.b+'"/>'+pat+'</g><path d="'+J+'" fill="none" stroke="#04070e" stroke-width="1.6" stroke-linejoin="round"/>'+
  '<path d="M17 13 C17 3 31 3 31 13 Z" fill="'+s.cap+'" stroke="#04070e" stroke-width="1.6" stroke-linejoin="round"/><path d="M29 12.4 L37 13.6" stroke="#04070e" stroke-width="2" stroke-linecap="round"/></svg>'}
function cloth(m){return '<i class="wr-no" aria-label="Number '+(ORDER.indexOf(m)+1)+'">'+(ORDER.indexOf(m)+1)+'</i>'}
var M=function(v,d){var a=Math.abs(v);return (v<0?'−':'+')+'$'+(d?(a/1000).toFixed(1)+'K':Math.round(a).toLocaleString('en-US'))};
function md(s){if(!s)return null;var p=s.split('/').map(Number);return {m:p[0],d:p[1],y:2000+(p[2]%100)}}
function key(o){return o?o.y*10000+o.m*100+o.d:0}
function ny(d){var o={};new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(d).forEach(function(p){o[p.type]=p.value});return {y:+o.year,m:+o.month,d:+o.day,h:(+o.hour)%24,mi:+o.minute}}
function nyClose(o){for(var h=19;h<=22;h++){var t=new Date(Date.UTC(o.y,o.m-1,o.d,h,0));if(ny(t).h==16)return t}return null}
function wd(o,long){return new Date(Date.UTC(o.y,o.m-1,o.d,12)).toLocaleDateString('en-US',{weekday:long?'long':'short',timeZone:'UTC'})}
function mon(o){return new Date(Date.UTC(o.y,o.m-1,o.d,12)).toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'UTC'})}
function left(ms){var mi=Math.max(0,Math.round(ms/60000)),d=Math.floor(mi/1440),h=Math.floor(mi%1440/60),m=mi%60;return d?d+(d==1?' day ':' days ')+h+'h':h+'h '+m+'m'}
function coLogo(t){var c=window.CO_LOGOS&&CO_LOGOS[t];return c?'<span class="wr-co'+(c.dark?' wr-co-d':'')+'"><img src="'+MEDIA+c.f+'" alt="" loading="lazy"></span>':'<span class="wr-co wr-co-x">'+t.slice(0,2)+'</span>'}
function pc(c){var m=/^(UP|DOWN)\s+([\d.]+)/.exec(c||'');return m?{up:m[1]=='UP',v:+m[2]}:null}
function names(a){a=a.map(function(m){return NAME[m]});return a.length<3?a.join(' and '):a.slice(0,-1).join(', ')+' and '+a[a.length-1]}
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
function hd(k,t,sub,post){return '<div class="wr-rail'+(post=='Finish'?' wr-fin':'')+'" aria-hidden="true"><i class="wr-pole"></i></div><p class="wr-k">'+k+'</p><h2 class="wr-h">'+t+'</h2>'+(sub?'<p class="wr-sub">'+sub+'</p>':'')}

function build(){
 var P=window.__x2pPnl(),A=P.A||P,top=document.getElementById('top');if(!top||document.getElementById('wr-hero'))return;
 var R=ROUNDS.slice().sort(function(a,b){return a.n-b.n}),last=R[R.length-1];
 var now=new Date(),nt=ny(now),today=key(nt);
 var rank=ORDER.slice().sort(function(a,b){return A[b].pnl-A[a].pnl}),lead=rank[0];

 /* ---------- 1  The meeting: headline + standings with each runner on its lane ---------- */
 var mx=Math.max.apply(null,rank.map(function(m){return A[m].pnl})),mn=Math.min.apply(null,rank.map(function(m){return A[m].pnl}));
 var lo=Math.min(mn,0),hi=mx,span=(hi-lo)||1,X=function(v){return 6+(v-lo)/span*88};
 var rows=rank.map(function(m,i){var a=A[m],gap=i?M(a.pnl-A[lead].pnl,1).replace('−','')+' behind':'In front';
  return '<li class="wr-tr'+(i?'':' wr-tr1')+'"><span class="wr-pos">'+(i+1)+'</span><span class="wr-who"><b>'+NAME[m]+'</b><small>'+MODELS[m].ver+'</small></span>'+
   '<span class="wr-lane" aria-hidden="true"><i class="wr-st" style="left:'+X(0)+'%"></i><span class="wr-rn" style="left:'+X(a.pnl)+'%">'+silk(m)+'</span></span>'+
   '<span class="wr-pm"><b class="'+(a.pnl<0?'wr-neg':'wr-pos2')+'">'+M(a.pnl)+'</b><small>'+gap+'</small></span></li>'}).join('');
 var hero=el('section','wr-sec wr-hero');hero.id='wr-hero';
 hero.innerHTML='<p class="wr-kick"><i class="wr-dot"></i>Season 1 · Race day</p>'+
  '<h1 class="wr-h1"><span>4 AIs race</span> <span>to call earnings.</span></h1>'+
  '<p class="wr-lede">Every earnings report is a race. The market close is the finish line. On NVIDIA day, the leader bets our $EZ pool.</p>';
 var std=el('section','wr-sec wr-std');std.id='wr-std';
 std.innerHTML='<div class="wr-tower" role="table" aria-label="Standings after race '+last.n+'"><div class="wr-th" role="row"><span>Standings after race '+last.n+'</span><span>Prize money</span></div><ol>'+rows+'</ol>'+
  '<div class="wr-key" aria-hidden="true"><span><i class="wr-st"></i> Start: $100,000 each</span><span>Further right = more won</span></div>'+
  '<p class="wr-note">Prize money is what each AI has won or lost on a pretend $100,000. It sets the order.</p></div>';

 /* ---------- 2  The film: "how a race works" on the big screen ---------- */
 var bet=document.querySelector('#top>section.x2o-bet');
 if(bet&&!bet.querySelector('.wr-bs')){var lb=el('div','wr-bs','<span class="wr-bs-l"><i></i>Big screen</span><span>How a race works · 1:20</span>');bet.insertBefore(lb,bet.firstChild)}

 /* ---------- 3  Today's card ---------- */
 var dates=PENDING.map(function(p){return md(p.resolves)}).filter(Boolean).sort(function(a,b){return key(a)-key(b)});
 var cd=dates[0],card=PENDING.filter(function(p){return key(md(p.resolves))==key(cd)}).sort(function(a,b){return a.n-b.n});
 var isToday=cd&&key(cd)==today,cl=cd&&nyClose(cd),later=UPCOMING.filter(function(u){return cd&&key(md(u.called))==key(cd)});
 var races=card.map(function(p){var up=p.calls.filter(function(c){return c.dir=='UP'}).map(function(c){return c.m}),dn=p.calls.filter(function(c){return c.dir=='DOWN'}).map(function(c){return c.m}),s,k=p.calls.length;
  if(k<4)s=k+' of 4 picks in.';else if(!up.length)s='All four say down.';else if(!dn.length)s='All four say up.';else if(up.length==1)s=NAME[up[0]]+' alone says up.';else if(dn.length==1)s=NAME[dn[0]]+' alone says down.';else s='Split down the middle.';
  var field=ORDER.map(function(m){var c=p.calls.filter(function(x){return x.m==m})[0];
   return '<li class="'+(c?(c.dir=='UP'?'wr-up':'wr-dn'):'wr-tbc')+'">'+cloth(m)+silk(m,'wr-sm')+'<b>'+NAME[m]+'</b><span>'+(c?(c.dir=='UP'?'▲ up ':'▼ down ')+c.mag+'%':'pick to come')+'</span></li>'}).join('');
  return '<a class="wr-race" href="#/round/'+p.n+'"><span class="wr-rhd"><span class="wr-rno">Race<b>'+p.n+'</b></span>'+coLogo(p.ticker)+'<span class="wr-rt"><b>'+p.co+'</b><small>'+s+'</small></span></span><ol class="wr-field">'+field+'</ol></a>'}).join('');
 var cardS=el('section','wr-sec wr-card');cardS.id='wr-card';
 cardS.innerHTML=hd(cd?(isToday?'Today':wd(cd,1))+' · '+mon(cd):'',(isToday?"Today's":wd(cd,1)+"'s")+' card',
  card.length+' races. Each runner picks up or down, and by how much. The closest right call wins.','Racecard')+
  (cl?'<p class="wr-off" data-t="'+cl.getTime()+'"><b>Off at the New York close</b><span class="wr-cdn">'+(cl>now?'in '+left(cl-now):'Results soon')+'</span></p>':'')+
  '<div class="wr-races" role="list">'+races+'</div><p class="wr-swipe" aria-hidden="true">Swipe for all '+card.length+' races →</p>'+
  (later.length?'<p class="wr-later">'+later.length+' more race'+(later.length>1?'s':'')+' join the card once the picks are in: '+later.slice(0,3).map(function(u){return u.co}).join(', ')+(later.length>3?' and '+(later.length-3)+' more.':'.')+'</p>':'');

 /* ---------- 4  Results board: the last race day ---------- */
 var lastDay=key(md(last.resolves)),day=R.filter(function(r){return key(md(r.resolves))==lastDay}),ld=md(last.resolves);
 var earn={};ORDER.forEach(function(m){earn[m]=day.reduce(function(s,r){var q=A[m].per[r.n];return s+(q?q.v:0)},0)});
 var best=ORDER.slice().sort(function(a,b){return earn[b]-earn[a]})[0];
 var res=day.map(function(r){var cs={};r.calls.forEach(function(c){cs[c[0]]=pc(c[1])});var w=r.win||'',line;
  var ws=w?w.split(/\s*&\s*/):[],ups=Object.keys(cs).filter(function(m){return cs[m]&&cs[m].up}),dns=Object.keys(cs).filter(function(m){return cs[m]&&!cs[m].up});
  if(!ws.length){var wrong=Object.keys(cs).every(function(m){return cs[m]&&cs[m].up!==(r.a>0)});line=wrong?'No winner. All '+Object.keys(cs).length+' called it the wrong way.':'No winner.'}
  else if(ws.length>1)line='Dead heat. '+names(ws)+' both said '+(cs[ws[0]].up?'up ':'down ')+cs[ws[0]].v+'%.';
  else{var c=cs[ws[0]],same=(c.up?ups:dns);line=NAME[ws[0]]+' said '+(c.up?'up ':'down ')+c.v+'%.'+(same.length==1?' The only one to say '+(c.up?'up.':'down.'):' Closest of the '+same.length+' who said '+(c.up?'up.':'down.'))}
  var wsilk=ws.length?ws.map(function(m){return silk(m,'wr-sm')}).join(''):'<i class="wr-nw">–</i>';
  return '<li class="wr-rr"><span class="wr-rno">Race<b>'+r.n+'</b></span>'+coLogo(r.ticker)+'<span class="wr-rt"><b>'+r.co+' <em class="'+(r.a<0?'wr-dn':'wr-up')+'">'+(r.a<0?'fell ':'rose ')+Math.abs(r.a)+'%</em></b><small>'+line+'</small></span><span class="wr-ws">'+wsilk+'<small>'+(ws.length>1?'Dead heat':ws.length?'Winner':'No winner')+'</small></span></li>'}).join('');
 var resS=el('section','wr-sec wr-res');resS.id='wr-res';
 resS.innerHTML=hd(wd(ld,1)+' · '+mon(ld),'Results',day.length+' races, graded at the close. The winner is the closest call that got the direction right.','Results')+
  '<div class="wr-board"><div class="wr-bh"><span>Official result</span><span>'+day.length+' races</span></div><ol>'+res+'</ol>'+
  '<p class="wr-best">'+silk(best,'wr-sm')+'<span>Best day: <b>'+NAME[best]+'</b>, '+M(earn[best])+' prize money across the '+day.length+' races.</span></p></div>';

 /* ---------- 5  Replays: the page's own record slabs and films ---------- */
 var rec=document.getElementById('record');
 if(rec&&!rec.querySelector('.wr-rh')){var rh=el('div','wr-rh',hd('Every race has a film','Replays','Each race ends on a graded card. Swipe through, and turn a card over for the result.','Replays'));rec.insertBefore(rh,rec.firstChild)}

 /* ---------- 6  The race so far: who was in front after every race ---------- */
 var cum={},pos={},lead2=[],ch=0,since=R[0].n;ORDER.forEach(function(m){cum[m]=0;pos[m]=[]});
 R.forEach(function(r,i){ORDER.forEach(function(m){var q=A[m].per[r.n];cum[m]+=q?q.v:0});var o=ORDER.slice().sort(function(a,b){return cum[b]-cum[a]});o.forEach(function(m,k){pos[m].push(k)});
  if(i&&o[0]!==lead2[i-1]){ch++;since=r.n}lead2.push(o[0])});
 var W=600,Hh=210,px=function(i){return 30+i/(R.length-1)*(W-118)},py=function(k){return 22+k*52};
 var paths=ORDER.map(function(m){return '<path d="'+pos[m].map(function(k,i){return (i?'L':'M')+px(i).toFixed(1)+' '+py(k)}).join(' ')+'" stroke="'+LINE[m]+'" class="wr-ln'+(m==lead?' wr-ln1':'')+'"/>'}).join('');
 var ends=ORDER.map(function(m){var k=pos[m][pos[m].length-1];return '<g transform="translate('+(px(R.length-1)+10)+' '+(py(k)-12)+')"><foreignObject width="100" height="26"><div xmlns="http://www.w3.org/1999/xhtml" class="wr-end">'+silk(m,'wr-sm')+'<b>'+NAME[m]+'</b></div></foreignObject></g>'}).join('');
 var grid=[0,1,2,3].map(function(k){return '<text x="4" y="'+(py(k)+5)+'" class="wr-gt">'+(k+1)+'</text><line x1="26" x2="'+(W-108)+'" y1="'+py(k)+'" y2="'+py(k)+'" class="wr-gl"/>'}).join('');
 var lapS=el('section','wr-sec wr-lap');lapS.id='wr-lap';
 lapS.innerHTML=hd('Season 1 so far','The race so far','Who was in front after every race. The lead has changed hands '+ch+' times. '+NAME[lead]+' has led since race '+since+'.','Chart')+
  '<figure class="wr-paper"><svg viewBox="0 0 '+W+' '+Hh+'" role="img" aria-label="Positions after each of '+R.length+' races">'+grid+paths+ends+
  '<text x="30" y="'+(Hh-4)+'" class="wr-ax">Race '+R[0].n+'</text><text x="'+(W-118)+'" y="'+(Hh-4)+'" class="wr-ax" text-anchor="end">Race '+last.n+'</text></svg>'+
  '<figcaption>Place by prize money after each race. 1 is in front.</figcaption></figure>';

 /* ---------- 7  The paddock: who the runners are, and their form in words ---------- */
 var n5=document.querySelector('.x2p-n5 .sr, .x2p-n5 [class*=sr]');var trial=[].slice.call(document.querySelectorAll('.x2p-n5 .lb b, .x2p-n5 .x2p-n5n')).map(function(e){return e.textContent.trim()}).filter(Boolean);
 if(!trial.length){var t5=(document.querySelector('.x2p-n5')||{}).innerText||'';var mm=/tryouts:\s*([^.]*)/i.exec(t5);if(mm)trial=mm[1].split(/\),?\s*/).map(function(s){return s.split(' (')[0].replace(/^and\s+/,'').trim()}).filter(Boolean)}
 var pad=rank.map(function(m,i){var a=A[m],l5=a.seq.slice(-5),w5=l5.filter(function(x){return x=='W'}).length,bn=null,bv=-1e9,wn=null,wv=1e9;
  Object.keys(a.per).forEach(function(n){var v=a.per[n].v;if(v>bv){bv=v;bn=+n}if(v<wv){wv=v;wn=+n}});
  var co=function(n){return (R.filter(function(r){return r.n==n})[0]||{}).co};
  var st=/^([WL])(\d+)/.exec(a.streak||'');var run=st&&+st[2]>1?(st[1]=='W'?'On a run of '+st[2]+' right.':'On a run of '+st[2]+' wrong.'):'';
  return '<li class="wr-runner"><div class="wr-rb">'+silk(m,'wr-big')+cloth(m)+'</div><div class="wr-ri"><p class="wr-rnm"><b>'+NAME[m]+'</b><small>'+MODELS[m].ver+'</small><em>'+(i+1)+(['st','nd','rd','th'][i])+'</em></p>'+
   '<p class="wr-form" aria-label="Last five calls">'+l5.map(function(x){return '<i class="'+(x=='W'?'wr-fw':'wr-fl')+'">'+(x=='W'?'✓':'✗')+'</i>'}).join('')+'<span>Right on <b>'+w5+' of its last 5</b> calls. '+run+'</span></p>'+
   '<p class="wr-fx">Season: right '+a.W+' times, wrong '+a.L+'.</p>'+
   '<p class="wr-fx">Best race: <b class="wr-pos2">'+M(bv)+'</b> on '+co(bn)+'. Worst: <b class="wr-neg">'+M(wv)+'</b> on '+co(wn)+'.</p></div></li>'}).join('');
 var padS=el('section','wr-sec wr-pad');padS.id='wr-pad';
 padS.innerHTML=hd('4 runners','The paddock','Four AIs, each in its own silks. Form is how often a runner called the direction right.','Paddock')+'<ol class="wr-runners">'+pad+'</ol>'+
  (trial.length?'<p class="wr-trial">In trials for a fifth stall: '+trial.join(', ')+'.</p>':'');

 /* ---------- 8  The cup: NVIDIA ---------- */
 var nv=UPCOMING.filter(function(u){return u.ticker=='NVDA'})[0],cup=el('section','wr-sec wr-cup');cup.id='wr-cup';
 if(nv){var c0=md(nv.called),b=new Date(Date.UTC(c0.y,c0.m-1,c0.d+1,12));while([0,6].indexOf(b.getUTCDay())>=0)b=new Date(b.getTime()+864e5);
  var bo={y:b.getUTCFullYear(),m:b.getUTCMonth()+1,d:b.getUTCDate()},bt=nyClose(bo);
  cup.innerHTML=hd('Race '+nv.n+' · '+wd(bo)+' '+mon(bo),'The NVIDIA Cup','The big race of Season 1. This one is run with our real pool, not a pretend account.','Finish')+
  '<div class="wr-cupb"><svg class="wr-troph" viewBox="0 0 64 72" aria-hidden="true"><path d="M16 6h32v14c0 11-7 19-16 19S16 31 16 20z" fill="url(#wrg)"/><path d="M16 10H6c0 10 5 15 11 15M48 10h10c0 10-5 15-11 15" fill="none" stroke="#c99512" stroke-width="3.4"/><rect x="28" y="38" width="8" height="14" fill="#c99512"/><path d="M18 52h28l3 12H15z" fill="url(#wrg)"/><defs><linearGradient id="wrg" x1="0" x2="1"><stop offset="0" stop-color="#fed98a"/><stop offset=".5" stop-color="#fdbc2a"/><stop offset="1" stop-color="#d99a12"/></linearGradient></defs></svg>'+
  '<p class="wr-cdw" data-t="'+(bt?bt.getTime():'')+'"><b>'+(bt?left(bt-now):'')+'</b><span>to the off</span></p></div>'+
  '<ol class="wr-cups"><li><b>The pool</b><span>69% of $EZ creator fees fill it.</span></li><li><b>The rider</b><span>The AI in front on prize money 24 hours before makes the call. Right now: '+silk(lead,'wr-sm')+'<strong>'+NAME[lead]+'</strong>.</span></li>'+
  '<li><b>The result</b><span><em class="wr-up">Right:</em> profits buy back $EZ. <em class="wr-dn">Wrong:</em> the pool can be wiped out.</span></li></ol>'+
  '<p class="wr-next">NVIDIA is the first cup race, not the last. Next season brings more.</p>'}

 [hero,std,cardS,resS,lapS,padS,cup].forEach(function(s){top.appendChild(s)});
 // tick the two clocks once a minute
 setInterval(function(){var n=Date.now();document.querySelectorAll('.wr-off[data-t] .wr-cdn').forEach(function(e){var t=+e.parentNode.dataset.t;e.textContent=t>n?'in '+left(t-n):'Results soon'});
  document.querySelectorAll('.wr-cdw[data-t]').forEach(function(e){var t=+e.dataset.t;if(t)e.querySelector('b').textContent=left(t-n)})},30000);
}
function go(){try{if(window.__x2pPnl&&window.ROUNDS&&ROUNDS.length&&document.getElementById('top'))build();else return setTimeout(go,120)}catch(e){window.__wrErr=e;console.error(e)}}
go();
})();
