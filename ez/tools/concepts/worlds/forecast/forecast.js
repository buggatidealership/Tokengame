/* EZ world mockup: the forecast station. Injected into v46-live-x2plus.html at DOMContentLoaded.
   Every figure is read from the page's own data (ROUNDS, PENDING, UPCOMING, MODELS, CO_LOGOS, CAPS, __x2pPnl). */
(function(){var d=document;
var ORDER=['GPT','KIMI','CLAUDE','GROK'];
function nm(m){return m==='GPT'?'GPT':m.charAt(0)+m.slice(1).toLowerCase()}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function pd(s){if(!s)return null;var p=s.split('/');return new Date(Date.UTC(2000+ +p[2]%100,+p[0]-1,+p[1]))}
var WD=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],MO=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function md(dt){return MO[dt.getUTCMonth()]+' '+dt.getUTCDate()}
function nyNow(){var f=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()),o={};f.forEach(function(p){o[p.type]=p.value});
 return{day:new Date(Date.UTC(+o.year,+o.month-1,+o.day)),h:+o.hour%24,mi:+o.minute}}
function money(v){var s=Math.round(Math.abs(v)).toLocaleString('en-US');return(v<0?'−$':'+$')+s}
function usd(v){return '$'+Math.round(v).toLocaleString('en-US')}
function pc(v){return(Math.round(Math.abs(v)*100)/100)+'%'}
/* the forecaster's mark: the page's own model logos */
function mark(m,s){var M=MODELS[m];return '<span class="wf-mk wf-mk-'+m.toLowerCase()+'" style="width:'+s+'px;height:'+s+'px;background:'+M.bg+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="'+(M.fr||'nonzero')+'" d="'+M.d+'" fill="'+M.fg+'"/>'+(M.dot?'<path d="'+M.dot+'" fill="'+M.dotc+'"/>':'')+'</svg></span>'}
function co(t,s){var L=CO_LOGOS[t];return L?'<span class="wf-co" style="width:'+s+'px;height:'+s+'px"><img src="media/'+L.f+'" alt="" loading="lazy"></span>':'<span class="wf-co wf-co-t" style="width:'+s+'px;height:'+s+'px">'+esc((t||'').replace(/\..*$/,'').slice(0,4))+'</span>'}
/* the weather of a call: up = sun, down = cloud; the bigger the move, the stronger the weather */
function tier(v){v=Math.abs(v);return v<2?1:v<4?2:3}
function wx(v,s,anim){var t=tier(v),k=anim?' wf-anim':'';
 if(v>=0){var r=4+t,rays='',L=2+t*1.6;for(var i=0;i<8;i++){var a=i*Math.PI/4,x1=16+Math.cos(a)*(r+2.6),y1=16+Math.sin(a)*(r+2.6),x2=16+Math.cos(a)*(r+2.6+L),y2=16+Math.sin(a)*(r+2.6+L);rays+='<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'"/>'}
  return '<svg class="wf-wx wf-sun'+k+'" viewBox="0 0 32 32" width="'+s+'" height="'+s+'" aria-hidden="true"><g class="wf-rays">'+rays+'</g><circle cx="16" cy="16" r="'+r+'"/></svg>'}
 var cl='<path class="wf-cloud" d="M9.5 20.5h13a4.6 4.6 0 0 0 .6-9.15A6.6 6.6 0 0 0 10.6 10a5.25 5.25 0 0 0-1.1 10.5z"/>',ex='';
 if(t>=2)ex+='<g class="wf-rain"><line x1="11.5" y1="23.5" x2="10.3" y2="27"/><line x1="16" y1="23.5" x2="14.8" y2="27"/><line x1="20.5" y1="23.5" x2="19.3" y2="27"/></g>';
 if(t>=3)ex='<path class="wf-bolt" d="M17.6 19.5l-4 6.2h3.2l-1.4 5.3 5.2-7.4h-3.3l1.6-4.1z"/>'+ex.replace('<line x1="16" y1="23.5" x2="14.8" y2="27"/>','');
 return '<svg class="wf-wx wf-rn wf-t'+t+k+'" viewBox="0 0 32 32" width="'+s+'" height="'+s+'" aria-hidden="true">'+cl+ex+'</svg>'}
function wxWord(v){var t=tier(v);return v>=0?['Up a little','Up','Up big'][t-1]:['Down a little','Down','Down big'][t-1]}
function parseCall(c){var m=/(UP|DOWN)\s*([\d.]+)/.exec(c[1]||'');if(!m)return null;var v=+m[2];return{m:c[0],v:m[1]==='UP'?v:-v,off:+c[2]}}
function says(v){return(v>=0?'up ':'down ')+pc(v)}
/* how many of the calls point the same way, in plain words */
function consensus(cs){var up=cs.filter(function(c){return c.v>=0}).length,n=cs.length,dn=n-up;
 if(n<3)return{w:n+' of 4 forecasts in',k:'wait'};
 if(up===n)return{w:'All '+n+' see a rise',k:'fair'};if(dn===n)return{w:'All '+n+' see a drop',k:'storm'};
 if(up>dn)return{w:up+' of '+n+' see a rise',k:'fair'};if(dn>up)return{w:dn+' of '+n+' see a drop',k:'storm'};return{w:'Split, '+up+' up and '+dn+' down',k:'split'}}
/* "right about 2 calls in 3": a rate as a natural frequency (Gigerenzer et al. 2005: say what the number counts) */
function freq(r){var F=[[1,4],[1,3],[2,5],[1,2],[3,5],[2,3],[3,4],[4,5]],b=F[0],e=9;F.forEach(function(f){var x=Math.abs(r-f[0]/f[1]);if(x<e){e=x;b=f}});return(e>0.012?'about ':'')+b[0]+' in '+b[1]}

function build(){if(d.getElementById('wf-fc')||typeof ROUNDS==='undefined'||typeof __x2pPnl!=='function')return false;
 var main=d.querySelector('main#top');if(!main)return false;
 d.documentElement.classList.add('wf');
 var P=__x2pPnl().A,now=nyNow();
 /* the sky */
 if(!d.querySelector('.wf-sky')){var sky=d.createElement('div');sky.className='wf-sky';sky.setAttribute('aria-hidden','true');sky.innerHTML='<i class="wf-s1"></i><i class="wf-s2"></i><i class="wf-s3"></i><i class="wf-stars"></i>';d.body.prepend(sky)}
 function sec(id,kick,head,sub){var s=d.createElement('section');s.id=id;s.className='wf-sec';s.innerHTML='<header class="wf-h"><p class="wf-k">'+kick+'</p><h2>'+head+'</h2>'+(sub?'<p class="wf-sub">'+sub+'</p>':'')+'</header>';return s}
 function relDay(dt){var dd=Math.round((dt-now.day)/864e5);return dd===0?'Tonight':dd===1?'Tomorrow':WD[dt.getUTCDay()]}

 /* ---------- the next close: the forecasts that are locked ---------- */
 var pend=PENDING.filter(function(r){return r.resolves&&r.calls&&r.calls.length}),dates=pend.map(function(r){return+pd(r.resolves)}),next=dates.length?new Date(Math.min.apply(null,dates)):null;
 var tonight=pend.filter(function(r){return+pd(r.resolves)===+next}).map(function(r){var cs={};r.calls.forEach(function(c){cs[c.m]=c.v});return{n:r.n,co:r.co,t:r.ticker,cs:cs,list:ORDER.filter(function(m){return m in cs}).map(function(m){return{m:m,v:cs[m]}})}});
 tonight.sort(function(a,b){return(CAPS[b.t]||0)-(CAPS[a.t]||0)});
 var full=tonight.filter(function(r){return r.list.length>=3}),cnt={fair:0,storm:0,split:0};full.forEach(function(r){cnt[consensus(r.list).k]++});
 var closeAt=new Date(Date.UTC(next.getUTCFullYear(),next.getUTCMonth(),next.getUTCDate(),0,0)),mins=Math.round(((+closeAt-+now.day)/6e4)+16*60-(now.h*60+now.mi));
 var label=relDay(next),when=mins>0?(mins>=60?Math.floor(mins/60)+'h '+(mins%60)+'m':mins+'m'):'any minute';

 /* ---------- hero ---------- */
 var hero=d.createElement('section');hero.className='wf-hero';hero.id='wf-hero';
 hero.innerHTML='<p class="wf-bug"><span class="wf-dot"></span>EZ forecast desk <span>Season 1</span></p>'+
  '<h1>Four AIs forecast stocks before earnings.</h1>'+
  '<p class="wf-lede">The market close grades every forecast. The forecaster on top bets our $EZ pool.</p>';
 /* film: the page's own explainer, framed as the station's explainer */
 var bet=main.querySelector('section.x2o-bet');
 if(bet&&!bet.querySelector('.wf-fh')){var fh=d.createElement('div');fh.className='wf-fh';fh.innerHTML='<span class="wf-k">How the forecast works</span><span class="wf-fh-t">1:20 · tap to play</span>';bet.prepend(fh)}

 /* ---------- tonight's forecast ---------- */
 var fc=sec('wf-fc','The forecast',label+'’s forecast','Locked before the reports. Graded at '+(label==='Tonight'?'tonight’s':WD[next.getUTCDay()]+'’s')+' close.');
 var big=full[0];
 var outlook=cnt.storm>cnt.fair&&cnt.storm>cnt.split?'Mostly stormy':cnt.fair>cnt.storm&&cnt.fair>cnt.split?'Mostly fair':'Mixed';
 var now1='<div class="wf-now wf-glass"><div class="wf-now-a"><p class="wf-place">'+WD[next.getUTCDay()]+' · '+md(next)+'</p><p class="wf-temp">'+tonight.length+'</p><p class="wf-cond">stocks on the map</p><p class="wf-hl">'+outlook+'</p></div>'+
  '<div class="wf-now-b"><p><b>'+wx(3,22)+cnt.fair+'</b><span>most see a rise</span></p><p><b>'+wx(-3,22)+cnt.storm+'</b><span>most see a drop</span></p><p><b><i class="wf-split">'+wx(2,15)+wx(-2,15)+'</i>'+cnt.split+'</b><span>split 2 to 2</span></p>'+
  (tonight.length>full.length?'<p class="wf-pend"><b>+'+(tonight.length-full.length)+'</b><span>still filing forecasts ('+tonight.filter(function(r){return r.list.length<3}).map(function(r){return esc(r.co)}).join(', ')+')</span></p>':'')+'</div>'+
  '<p class="wf-when">Graded at the close · US close in '+when+'</p></div>';
 var feat='';if(big){var cb=consensus(big.list);feat='<article class="wf-feat wf-glass"><div class="wf-feat-h">'+co(big.t,36)+'<div><p class="wf-k">The big one</p><h3>'+esc(big.co)+'</h3></div></div>'+
  '<ul class="wf-feat-l">'+big.list.map(function(c){return '<li>'+mark(c.m,26)+'<b>'+nm(c.m)+'</b>'+wx(c.v,34,true)+'<span class="wf-say '+(c.v>=0?'wf-up':'wf-dn')+'">'+wxWord(c.v)+'<small>by '+pc(c.v)+'</small></span></li>'}).join('')+'</ul>'+
  '<p class="wf-feat-f">'+cb.w+'.</p></article>'}
 var heads='<div class="wf-colh"><span>Stock</span>'+ORDER.map(function(m){return '<span class="wf-colm">'+mark(m,18)+'<small>'+nm(m)+'</small></span>'}).join('')+'</div>';
 var rows=tonight.map(function(r){var c=consensus(r.list);return '<li class="wf-row wf-c-'+c.k+'">'+co(r.t,30)+'<span class="wf-rn-t"><b>'+esc(r.co)+'</b><small>'+c.w+'</small></span>'+
  ORDER.map(function(m){return '<span class="wf-cell" title="'+nm(m)+(m in r.cs?' says '+says(r.cs[m]):' has not filed')+'">'+(m in r.cs?wx(r.cs[m],26):'<i class="wf-nf">…</i>')+'</span>'}).join('')+'</li>'}).join('');
 var legend='<p class="wf-key">'+wx(3,20)+'<span>says up</span>'+wx(-3,20)+'<span>says down</span><em>Stronger weather, bigger move: '+wx(1,16)+wx(5,16)+' under 2% to 4% or more, in a day.</em></p>';
 fc.insertAdjacentHTML('beforeend',now1+feat+'<div class="wf-list wf-glass">'+legend+heads+'<ul>'+rows+'</ul></div>');

 /* ---------- yesterday's verdict ---------- */
 var lastD=Math.max.apply(null,ROUNDS.map(function(r){return+pd(r.resolves)||0})),lastRs=ROUNDS.filter(function(r){return+pd(r.resolves)===lastD}),ld=new Date(lastD);
 var dd=Math.round((now.day-ld)/864e5),vlab=dd===1?'Yesterday':dd===0?'Today':WD[ld.getUTCDay()];
 var vd=sec('wf-vd','The verdict',vlab+'’s verdict','What they forecast, and what the stock did. Tap a replay for the round’s film.');
 var cards=lastRs.map(function(r){var cs=r.calls.map(parseCall).filter(Boolean),a=r.a,right=cs.filter(function(c){return(c.v>=0)===(a>=0)}),
   best=cs.slice().sort(function(x,y){return x.off-y.off})[0],wins=ORDER.filter(function(m){return(r.win||'').indexOf(m)>=0});
   var line=right.length===0?'Nobody saw it coming.':right.length===cs.length?'All '+cs.length+' got the direction.':right.length===1?'Only '+nm(right[0].m)+' saw the '+(a>=0?'rise':'drop')+'.':right.length+' of '+cs.length+' got the direction.';
   var cl=wins.length?wins.map(nm).join(' and ')+' '+(wins.length>1?'were':'was')+' closest: said '+says(cs.filter(function(c){return c.m===wins[0]})[0].v)+', it '+(a>=0?'rose ':'fell ')+pc(a)+'.':'No winner: nobody got the direction.';
   var poster=r.poster?'<img src="media/'+r.poster+'.jpg" alt="" loading="lazy">':'';
   return '<article class="wf-v wf-glass"><a class="wf-rep" href="#/round/'+r.n+'" aria-label="Replay round '+r.n+', '+esc(r.co)+'">'+poster+'<span class="wf-play"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z"/></svg></span><span class="wf-rep-t">Replay</span></a>'+
    '<div class="wf-v-b"><p class="wf-v-h">'+co(r.ticker,22)+'<b>'+esc(r.co)+'</b></p>'+
    '<div class="wf-v-g"><p class="wf-k">Forecast</p><p class="wf-v-f">'+cs.map(function(c){var ok=(c.v>=0)===(a>=0);return '<span class="wf-vf'+(ok?' wf-ok':' wf-no')+'" title="'+nm(c.m)+' said '+says(c.v)+'">'+wx(c.v,22)+mark(c.m,12)+'<i>'+(ok?'✓':'✗')+'</i></span>'}).join('')+'</p>'+
    '<p class="wf-k">It went</p><p class="wf-v-x">'+wx(a,26)+'<b class="'+(a>=0?'wf-up':'wf-dn')+'">'+(a>=0?'Up ':'Down ')+pc(a)+'</b></p></div>'+
    '<p class="wf-v-l"><b>'+line+'</b> '+cl+'</p></div></article>'}).join('');
 vd.insertAdjacentHTML('beforeend','<div class="wf-vg">'+cards+'</div>');

 /* ---------- the forecasters ---------- */
 var team=ORDER.map(function(m){return P[m]}).sort(function(a,b){return b.pnl-a.pnl});
 var tm=sec('wf-team','The forecasters','Who to trust','Each runs a $100,000 practice account and bets the whole balance on every forecast. Ranked by that account.');
 tm.insertAdjacentHTML('beforeend','<ol class="wf-tl">'+team.map(function(a,i){var n=a.W+a.L,r=a.W/n,last=a.seq.slice(-10);
  return '<li class="wf-f wf-glass'+(i===0?' wf-top':'')+'"><span class="wf-rk">'+(i+1)+'</span>'+mark(a.m,42)+'<div class="wf-f-n"><b>'+nm(a.m)+'</b><small>'+esc(a.ver)+'</small></div>'+
   '<div class="wf-f-acc"><p class="wf-big">Right '+freq(r)+'</p><p class="wf-sm">'+a.W+' of '+n+' forecasts went the right way</p></div>'+
   '<div class="wf-f-l10"><p class="wf-sm">Last 10</p><p class="wf-l10">'+last.map(function(s){return '<i class="'+(s==='W'?'wf-ok':'wf-no')+'">'+(s==='W'?'✓':'✗')+'</i>'}).join('')+'</p></div>'+
   '<div class="wf-f-p"><p class="wf-pnl '+(a.pnl>=0?'wf-up':'wf-dn')+'">'+money(a.pnl)+'</p><p class="wf-sm">'+(a.pnl>=0?'made':'lost')+' since the start</p></div>'+
   (i===0?'<p class="wf-crown">On top now. If NVIDIA reported today, '+nm(a.m)+' would make the call.</p>':'')+'</li>'}).join('')+'</ol>');

 /* ---------- the long-range outlook ---------- */
 var nv=UPCOMING.filter(function(r){return r.ticker==='NVDA'})[0],nvD=nv&&pd(nv.called);
 var days={};PENDING.concat(UPCOMING).forEach(function(r){var k=r.called;if(!k)return;var t=+pd(k);if(t<+now.day)return;(days[t]=days[t]||[]).push(r)});
 var keys=Object.keys(days).map(Number).sort(function(a,b){return a-b}).filter(function(t){return!nvD||t<=+nvD}),mx=Math.max.apply(null,keys.map(function(t){return days[t].length}));
 var strip=keys.map(function(t){var dt=new Date(t),rs=days[t].slice().sort(function(a,b){return(CAPS[b.ticker]||0)-(CAPS[a.ticker]||0)}),isNv=nvD&&t===+nvD,n=rs.length;
  return '<li class="wf-day'+(isNv?' wf-nvd':'')+'"><p class="wf-dw">'+(t===+now.day?'Today':WD[dt.getUTCDay()].slice(0,3))+'</p><p class="wf-dd">'+md(dt)+'</p>'+
   '<p class="wf-dl">'+co(rs[0].ticker,26)+'</p><p class="wf-db"><i style="height:'+Math.max(6,Math.round(n/mx*56))+'px"></i></p><p class="wf-dn2"><b>'+n+'</b>'+(n===1?'stock':'stocks')+'</p></li>'}).join('');
 var nvIn=nvD?Math.round((+nvD-+now.day)/864e5):null,lead=team[0];
 var out=sec('wf-out','Long-range outlook','The storm on the horizon',nvD?'Forecast days between now and '+md(nvD)+', when NVIDIA reports.':'');
 out.insertAdjacentHTML('beforeend','<div class="wf-glass wf-strip-w"><p class="wf-k">Stocks forecast each day</p><ol class="wf-strip">'+strip+'</ol></div>'+
  (nvD?'<article class="wf-storm wf-glass"><div class="wf-storm-art" aria-hidden="true">'+wx(-6,120,true)+wx(6,64,true)+'</div><div><p class="wf-k">Bet #1 · '+WD[nvD.getUTCDay()]+' '+md(nvD)+' · in '+nvIn+' days</p><h3>NVIDIA</h3>'+
   '<p>The forecaster on top makes the call, up or down. We bet the $EZ pool on it.</p><ul class="wf-two"><li class="wf-up-b"><b>Right</b> Profits buy back $EZ.</li><li class="wf-dn-b"><b>Wrong</b> The pool can be wiped out.</li></ul>'+
   '<p class="wf-sm">The board freezes 24 hours before. On top today: '+nm(lead.m)+'. NVIDIA is the first bet, not the last: Season 2 brings more.</p></div></article>':''));

 /* ---------- the almanac ---------- */
 var first=pd(ROUNDS[0].called),allC=[],bigR=null;ROUNDS.forEach(function(r){r.calls.map(parseCall).filter(Boolean).forEach(function(c){c.r=r;allC.push(c)});if(!bigR||Math.abs(r.a)>Math.abs(bigR.a))bigR=r});
 var right=allC.filter(function(c){return(c.v>=0)===(c.r.a>=0)}).length,sharp=allC.filter(function(c){return(c.v>=0)===(c.r.a>=0)}).sort(function(a,b){return a.off-b.off||b.r.n-a.r.n})[0];
 var bigRight=bigR.calls.map(parseCall).filter(function(c){return c&&(c.v>=0)===(bigR.a>=0)}).length;
 var bals={};team.forEach(function(a){var b=100000,lo=b,hi=b;Object.keys(a.per).map(Number).sort(function(x,y){return x-y}).forEach(function(n){b+=a.per[n].v;lo=Math.min(lo,b);hi=Math.max(hi,b)});bals[a.m]={lo:lo,hi:hi,now:a.bal}});
 var LO=Math.min.apply(null,team.map(function(a){return bals[a.m].lo})),HI=Math.max.apply(null,team.map(function(a){return bals[a.m].hi}));
 function X(v){return((v-LO)/(HI-LO)*100).toFixed(2)+'%'}
 var alm=sec('wf-alm','The almanac','Season 1 so far','Since '+md(first)+'. Every forecast, checked against the close.');
 alm.insertAdjacentHTML('beforeend','<div class="wf-facts"><div class="wf-fact wf-glass"><p class="wf-fn">'+ROUNDS.length+'</p><p>stocks graded, <b>'+allC.length+'</b> forecasts in all. <b>'+right+'</b> of them got the direction right.</p></div>'+
  '<div class="wf-fact wf-glass"><p class="wf-k">Biggest storm</p><p class="wf-fx">'+co(bigR.ticker,24)+'<b>'+esc(bigR.co)+'</b></p><p>'+(bigR.a>=0?'Jumped ':'Fell ')+pc(bigR.a)+' in a day. '+(bigRight===0?'All '+bigR.calls.length+' forecast the opposite.':bigRight+' of '+bigR.calls.length+' saw it.')+'</p></div>'+
  '<div class="wf-fact wf-glass"><p class="wf-k">Sharpest forecast</p><p class="wf-fx">'+mark(sharp.m,22)+'<b>'+nm(sharp.m)+' on '+esc(sharp.r.co)+'</b></p><p>Said '+says(sharp.v)+'. It '+(sharp.r.a>=0?'rose ':'fell ')+pc(sharp.r.a)+'. Off by '+pc(sharp.off)+'.</p></div></div>'+
  '<div class="wf-range wf-glass"><p class="wf-k">Practice accounts, lowest to highest this season</p><ul>'+team.map(function(a){var B=bals[a.m];return '<li>'+mark(a.m,20)+'<b>'+nm(a.m)+'</b><span class="wf-lo">'+usd(B.lo)+'</span><span class="wf-tr"><i class="wf-bar" style="left:'+X(B.lo)+';right:calc(100% - '+X(B.hi)+')"></i><i class="wf-start" style="left:'+X(100000)+'"></i><i class="wf-nowd" style="left:'+X(B.now)+'"></i></span><span class="wf-hi">'+usd(B.hi)+'</span></li>'}).join('')+'</ul>'+
  '<p class="wf-sm">The bar runs from each account’s low to its high. The white dot is today. The line marks the $100,000 start.</p></div>');

 /* ---------- the page's own sections, re-headed ---------- */
 function rehead(id,kick,h,sub){var s=d.getElementById(id);if(!s||s.querySelector(':scope>.wf-h'))return;s.classList.add('wf-own');s.insertAdjacentHTML('afterbegin','<header class="wf-h"><p class="wf-k">'+kick+'</p><h2>'+h+'</h2>'+(sub?'<p class="wf-sub">'+sub+'</p>':'')+'</header>')}
 rehead('record','The archive','Every forecast, graded','One card per stock. The film on the front, the grading on the back. Tap to turn.');
 rehead('highlights','Record breakers','The forecasts we remember','The sharpest calls and the biggest surprises of the season.');
 rehead('get','The token','Get $EZ','');

 var anchor=main.querySelector('section.hero');
 [hero,fc,vd,tm,out,alm].forEach(function(s){main.insertBefore(s,anchor)});
 return true}

function go(){if(build())return;var n=0,t=setInterval(function(){if(build()||++n>80)clearInterval(t)},150)}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',go);else go();
})();
