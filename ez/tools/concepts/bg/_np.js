/* _np.js, round 2 of "the paper" (owner, 2026-10-29: "what if it should feel like you're reading a newspaper... a newspaper you go
   to every day, checking in on the AIs"). Shared by P1, P2 and P3 (shots2.js puts it in front of each take's own JS; the take sets
   window.__npCfg first). It turns the Overview into one day's paper: a masthead with today's date, the edition and a weather-box style
   "today's card" (the rounds graded at the next close, the calls due today) and an index; every section a story with a kicker, its
   standing head (the site's own h2), a headline and deck written from the data, a byline and a jump line; captions under the tickets
   and slabs as under photos; folio lines and column rules drawn round the stories; "The tape", an agate table of every round.
   Every number comes from ROUNDS, PENDING, UPCOMING and window.__x2pPnl(); nothing is typed in. Mockup only. */
(function(){var d=document,C=window.__npCfg||{};
var NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},AB={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Cla',GROK:'Grok'};
var WD=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],MO=['January','February','March','April','May','June','July','August','September','October','November','December'];
var NW=['no','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
function word(n){return NW[n]||String(n)}function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function pd(s){if(!s)return null;var a=String(s).split('/');return new Date(2000+(+a[2]%100),a[0]-1,+a[1])}
function usd(v,sign){var s='$'+Math.abs(Math.round(v)).toLocaleString('en-US');return sign===false?s:(v<0?'−':'+')+s}
function wins(r){return r.win&&r.win!=='null'?String(r.win).split(/\s*&\s*/).filter(function(m){return NM[m]}):[]}
function wname(r){var w=wins(r);return w.length?w.map(function(m){return NM[m]}).join(' and ')+(w.length>1?' tie':''):'nobody'}
function tk(r){return /^\d/.test(r.ticker)||/[a-z]/.test(r.ticker)?r.co:r.ticker}
function call(s){if(!s)return '–';var m=/^(UP|DOWN)\s*([\d.]+)/.exec(s);return m?(m[1]==='UP'?'+':'−')+m[2]:'–'}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function list(a){return a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1]}
function data(){var P=window.__x2pPnl(),M=['GROK','CLAUDE','GPT','KIMI'],D={P:P,M:M,tot:{},W:{},L:{},hit:{}};
 M.forEach(function(m){D.tot[m]=P.A[m].bal-1e5;D.W[m]=P.A[m].W;D.L[m]=P.A[m].L;D.hit[m]=Math.round(100*P.A[m].W/Math.max(1,P.A[m].W+P.A[m].L))});
 D.rk=M.slice().sort(function(a,b){return D.tot[b]-D.tot[a]});D.hk=M.slice().sort(function(a,b){return D.hit[b]-D.hit[a]});
 var ny=new Date(new Date().toLocaleString('en-US',{timeZone:'America/New_York'}));D.today=new Date(ny.getFullYear(),ny.getMonth(),ny.getDate());
 D.date=WD[D.today.getDay()]+', '+MO[D.today.getMonth()]+' '+D.today.getDate()+', '+D.today.getFullYear();
 D.dshort=WD[D.today.getDay()].slice(0,3)+' '+MO[D.today.getMonth()].slice(0,3)+' '+D.today.getDate();
 D.wk=Math.floor((D.today-new Date(2026,8,8))/864e5/7)+1;D.N=ROUNDS.length;
 D.rs=ROUNDS.slice().sort(function(a,b){return b.n-a.n});
 var lt=Math.max.apply(null,ROUNDS.map(function(r){return +pd(r.resolves)||0}));D.lastDay=new Date(lt);
 D.lastR=ROUNDS.filter(function(r){return +pd(r.resolves)===lt}).sort(function(a,b){return a.n-b.n});
 var pend=(typeof PENDING!=='undefined'?PENDING:[]).filter(function(r){return r.status==='calls-in'&&r.resolves&&pd(r.resolves)>=D.today});
 var nt=Math.min.apply(null,pend.map(function(r){return +pd(r.resolves)}));D.nextDay=isFinite(nt)?new Date(nt):null;
 D.nextR=pend.filter(function(r){return +pd(r.resolves)===nt}).sort(function(a,b){return a.n-b.n});D.pend=(typeof PENDING!=='undefined'?PENDING:[]).filter(function(r){return r.status==='calls-in'});
 D.due=(typeof UPCOMING!=='undefined'?UPCOMING:[]).filter(function(r){return +pd(r.called)===+D.today}).sort(function(a,b){return a.n-b.n});
 D.isToday=D.nextDay&&+D.nextDay===+D.today;D.closeWord=D.isToday?"today's close":WD[D.nextDay?D.nextDay.getDay():0]+"'s close";
 D.bulls=[];ROUNDS.forEach(function(r){r.calls.forEach(function(c){if(!c[1])return;var up=/^UP/.test(c[1]);if(up===(r.a>0)&&+c[2]<=0.1)D.bulls.push({r:r,m:c[0],off:+c[2]})})});
 var all=[].concat(typeof PENDING!=='undefined'?PENDING:[],typeof UPCOMING!=='undefined'?UPCOMING:[]);D.nvda=all.filter(function(r){return r.ticker==='NVDA'})[0];
 D.up=(typeof UPCOMING!=='undefined'?UPCOMING:[]).filter(function(r){return pd(r.called)>D.today}).sort(function(a,b){return pd(a.called)-pd(b.called)||a.n-b.n});
 return D}
/* the words of the day's paper, all from D */
function words(D){var r0=D.rk[0],r1=D.rk[1],r3=D.rk[3],T={};var lw=WD[D.lastDay.getDay()];
 T.standings={kick:'The leaderboard',h:NM[r0]+' holds the belt',
  dk:'Up '+usd(D.tot[r0])+' after '+D.N+' rounds, '+usd(D.tot[r0]-D.tot[r1],false)+' clear of '+NM[r1]+'. '+NM[r3]+' sits at '+usd(D.tot[r3])+'.',
  jump:'Every result: The tape, page 4',cap:'The table after '+D.N+' rounds. A $100K paper account each, simulated, before fees.'};
 var c={};D.lastR.forEach(function(r){wins(r).forEach(function(m){c[m]=(c[m]||0)+1})});var best=Object.keys(c).sort(function(a,b){return c[b]-c[a]})[0];
 T.record={kick:'The record',h:best&&c[best]>1?NM[best]+' takes '+word(c[best])+' of '+word(D.lastR.length)+' on '+lw:cap(word(D.lastR.length))+' rounds graded '+lw,
  dk:D.lastR.map(function(r){return r.co+' '+r.out+', '+wname(r)}).join('. ')+'.',jump:'Continued on page 4: every round in The tape',
  cap:'The card for every round, stamped at the close. Newest: '+D.rs[0].co+', Round '+D.rs[0].n+'.'};
 var h0=D.hk[0];T.learn={kick:'The proof',h:NM[h0]+' calls it right '+D.hit[h0]+'% of the time',
  dk:D.hk.slice(1).map(function(m){return NM[m]+' '+D.hit[m]+'%'}).join(', ')+'. A coin flip gets 50%.',cap:"Each line is one AI's paper account from $100,000."};
 var bm={};D.bulls.forEach(function(b){(bm[b.m]=bm[b.m]||[]).push(b.r.co)});
 T.highlights={kick:'Highlights',h:cap(word(D.bulls.length))+' bullseyes in '+D.N+' rounds',
  dk:'Within 0.1% of the move: '+Object.keys(bm).map(function(m){return NM[m]+' on '+list(bm[m])}).join('; ')+'.',cap:'Bullseye: the right direction, within 0.1% of the move.'};
 var nv=D.nvda?pd(D.nvda.called):null;
 T.x2pSt={kick:'The bet',h:'NVIDIA is bet No. 1',dk:'When NVIDIA reports'+(nv?' ('+MO[nv.getMonth()].slice(0,3)+' '+nv.getDate()+')':'')+", the pool rides on the top AI's call. As it stands, "+NM[r0]+' makes it.',
  cap:'Bet No. 1, NVIDIA, the countdown running, the Season 2 ticket attached.'};
 T.get={kick:'Notices',h:'The coin is not live yet',dk:'The address appears here, and only here, at launch.'};
 T.film={cap:'How it works: the explainer, running time 1:20.'};
 T.strip={cap:D.lastR.length+' rounds graded '+lw+'. '+D.nextR.length+' more at '+D.closeWord+'.'};
 T.tape=C.tapeWords?C.tapeWords(D):{kick:'The tape',h:'Every round of Season 1',dk:D.N+' graded, '+D.pend.length+' with calls in. Calls as filed, in %; the winning call in bold.'};
 return T}
function logo(){var s=d.querySelector('.brand .mark svg');return s?s.outerHTML:''}
function scrollToId(id){var e=d.getElementById(id);if(e)scrollTo({top:e.getBoundingClientRect().top+scrollY-70,behavior:'smooth'})}
function card(D){var a=D.nextR.map(tk),b=D.due.map(tk);
 return '<div class="np-wx"><div class="np-wxh">'+(C.cardTitle||"Today's card")+'</div>'+
  '<div class="np-wxr"><b>'+D.nextR.length+'</b><span>graded at '+D.closeWord+'<i>'+esc(a.join(' · '))+'</i></span></div>'+
  (b.length?'<div class="np-wxr"><b>'+b.length+'</b><span>calls due today<i>'+esc(b.join(' · '))+'</i></span></div>':'')+'</div>'}
function index(){var I=C.index||[['The standings','standings',1],['The record','record',2],['Smarter or just lucky?','learn',3],['Most valuable predictions','highlights',3],['The bet','x2pSt',4],['The tape','np-tape',4],['Get $EZ','get',4]];
 return '<div class="np-ix"><div class="np-wxh">'+(C.ixTitle||'Inside')+'</div>'+I.map(function(i){return '<a data-np-go="'+i[1]+'"><span>'+i[0]+'</span><b>'+(C.pg?C.pg(i[2]):i[2])+'</b></a>'}).join('')+'</div>'}
function mast(D){var m=d.createElement('div');m.className='np-mh';
 m.innerHTML=(C.flag?'<div class="np-flag">'+C.flag+'</div>':'')+
  '<div class="np-top">'+card(D)+'<div class="np-nmw"><div class="np-nm">The Earnings <span class="np-seal">'+logo()+'</span> Zeason</div>'+(C.motto?'<div class="np-mot">'+C.motto+'</div>':'')+'</div>'+index()+'</div>'+
  '<div class="np-dl"><span>Season 1 · Week '+D.wk+'</span><span>'+D.date+'</span><span>'+(C.edition||'Late edition')+' · '+D.N+' rounds graded</span></div>';
 return m}
function tape(D,T){var s=d.createElement('section');s.className='sec np-tape';s.id='np-tape';
 var rows=D.rs.slice().reverse().map(function(r){var w=wins(r),cm={};r.calls.forEach(function(c){cm[c[0]]=c});
   return '<div class="np-tr"><span>'+r.n+'</span><span class="np-co">'+esc(r.co)+'</span><span class="'+(r.a<0?'np-dn':'np-up')+'">'+(r.a>0?'+':'−')+Math.abs(r.a).toFixed(2)+'</span>'+
    ['GPT','KIMI','CLAUDE','GROK'].map(function(m){return '<span'+(w.indexOf(m)>=0?' class="np-w"':'')+'>'+(cm[m]?call(cm[m][1]):'–')+'</span>'}).join('')+'<span class="np-wn">'+(w.length?w.map(function(m){return AB[m]}).join('/'):'none')+'</span></div>'});
 D.pend.slice().sort(function(a,b){return a.n-b.n}).forEach(function(r){var cm={};(r.calls||[]).forEach(function(c){cm[c.m]=c});var rd=pd(r.resolves);
   rows.push('<div class="np-tr np-pn"><span>'+r.n+'</span><span class="np-co">'+esc(r.co)+'</span><span>'+(rd?(+rd===+D.today?'today':WD[rd.getDay()].slice(0,3)):'tba')+'</span>'+
    ['GPT','KIMI','CLAUDE','GROK'].map(function(m){return '<span>'+(cm[m]?(cm[m].dir==='UP'?'+':'−')+cm[m].mag:'–')+'</span>'}).join('')+'<span class="np-wn">at close</span></div>')});
 var k=C.tapeCols?C.tapeCols():(innerWidth>=1200?4:innerWidth>=700?2:1),per=Math.ceil(rows.length/k),hd='<div class="np-tr np-th"><span>R</span><span class="np-co">Company</span><span>Move</span><span>GPT</span><span>Kimi</span><span>Cla</span><span>Grok</span><span class="np-wn">Win</span></div>',cols='';
 for(var i=0;i<k;i++)cols+='<div class="np-tc">'+hd+rows.slice(i*per,(i+1)*per).join('')+'</div>';
 s.innerHTML='<div class="sh"><div class="np-kick"><span class="np-no">'+T.tape.kick+'</span><span class="np-pg">'+(C.pg?C.pg(4):'Page 4')+'</span></div><div class="np-hd"><h3>'+T.tape.h+'</h3><p class="np-dk">'+T.tape.dk+'</p></div></div><div class="np-ag" style="--k:'+k+'">'+cols+'</div>';
 return s}
function caption(el,txt,credit){if(!el||el.nextElementSibling&&el.nextElementSibling.classList.contains('np-cap'))return;var c=d.createElement('p');c.className='np-cap';c.innerHTML='<span>'+esc(txt)+'</span>'+(credit?'<em>'+credit+'</em>':'');el.after(c)}
function story(id,t,pg,front){var s=d.getElementById(id);if(!s||s.querySelector('.np-kick'))return;if(C.jump&&C.jump[id]!==undefined)t.jump=C.jump[id];var sh=s.querySelector(':scope>.sh');if(!sh)return;
 s.classList.add('np-story');var no=sh.querySelector('.no'),k=d.createElement('div');k.className='np-kick';
 k.innerHTML='<span class="np-no">'+(no?no.textContent+' · ':'')+(front||t.kick)+'</span><span class="np-pg">'+(C.pg?C.pg(pg):'Page '+pg)+'</span>';sh.prepend(k);
 var h=d.createElement('div');h.className='np-hd';h.innerHTML='<h3>'+esc(t.h)+'</h3><p class="np-dk">'+esc(t.dk)+'</p>'+
  (C.by!==false?'<p class="np-by">'+(C.byline||'Graded at the close')+(t.jump?' · <a data-np-go="np-tape">'+esc(t.jump)+'</a>':'')+'</p>':'');
 var tx=sh.querySelector(':scope>.tx');(tx||sh.firstChild).after(h)}
function furniture(D){var m=d.querySelector('main#top');if(!m)return;var f=m.querySelector(':scope>.np-fur');if(!f){f=d.createElement('div');f.className='np-fur';f.setAttribute('aria-hidden','true');m.appendChild(f)}
 var mr0=m.getBoundingClientRect(),cs=getComputedStyle(m),fr=f.getBoundingClientRect(),mr={left:fr.left,top:fr.top},Lx=mr0.left+parseFloat(cs.paddingLeft)-fr.left,Rx=mr0.right-parseFloat(cs.paddingRight)-fr.left,h='';
 var secs=[].slice.call(m.children).filter(function(e){return e.tagName==='SECTION'&&e.getBoundingClientRect().height>2});
 var fol=C.folios||{record:2,learn:3,x2pSt:4};
 secs.forEach(function(s){var p=fol[s.id];if(!p)return;var y=s.getBoundingClientRect().top-mr.top+(C.folioY||(innerWidth<600?26:30));
  h+='<div class="np-folio" style="top:'+y+'px;left:'+Lx+'px;width:'+(Rx-Lx)+'px"><span>'+(C.pg?C.pg(p):p)+'</span><span>The Earnings Zeason · '+D.date+'</span><span>'+(C.fronts&&C.fronts[p]||'')+'</span></div>'});
 if(innerWidth>=1200){var rows={};secs.forEach(function(s){var r=s.getBoundingClientRect();var k=Math.round(r.top);(rows[k]=rows[k]||[]).push(s)});
  Object.keys(rows).forEach(function(k){var a=rows[k];if(a.length<2)return;a.sort(function(x,y){return x.getBoundingClientRect().left-y.getBoundingClientRect().left});
   var r0=a[0].getBoundingClientRect(),r1=a[1].getBoundingClientRect(),x=(r0.right+r1.left)/2-mr.left,top=r0.top-mr.top+(fol[a[0].id]?(C.ruleTop||64):0),bot=Math.max(r0.bottom,r1.bottom)-mr.top;
   h+='<div class="np-crule" style="left:'+x+'px;top:'+top+'px;height:'+(bot-top)+'px"></div>'})}
 if(f.innerHTML!==h)f.innerHTML=h}
function build(){if(d.documentElement.classList.contains('np-built'))return;var D=data(),T=words(D);d.documentElement.classList.add('np-built');window.__npD=D;
 var top=d.querySelector('main#top');top.parentNode.insertBefore(mast(D),top);
 var hero=d.querySelector('.hero .hero-t');if(hero&&!hero.querySelector('.np-bk')){var b=d.createElement('div');b.className='np-bk';b.textContent=C.bannerKick?C.bannerKick(D):'Season 1 · Week '+D.wk+' · '+D.N+' rounds graded';hero.prepend(b)}
 var F=C.fronts||{};story('standings',T.standings,1,F.standings);story('record',T.record,2,F.record);story('learn',T.learn,3,F.learn);story('highlights',T.highlights,3,F.highlights);story('x2pSt',T.x2pSt,4,F.x2pSt);story('get',T.get,4,F.get);
 var credit=C.credit||'EZ. / Earnings Zeason';
 caption(d.querySelector('.x2o-bet .x2p-vt'),T.film.cap,credit);caption(d.querySelector('.x2o-bet .x2p-ls'),T.strip.cap,'Live');
 caption(d.querySelector('#standings .x2p-flip'),T.standings.cap,credit);caption(d.querySelector('#record #car'),T.record.cap,credit);
 caption(d.querySelector('#learn .x2p-pt'),T.learn.cap,credit);caption(d.querySelector('#highlights #x2pHl'),T.highlights.cap,credit);caption(d.querySelector('#x2pSt .bs-clip'),T.x2pSt.cap,credit);
 var g=d.getElementById(C.tapeBefore||'get');if(g&&!d.getElementById('np-tape'))g.parentNode.insertBefore(tape(D,T),g);
 if(C.extra)C.extra(D,T,{esc:esc,call:call,tk:tk,wname:wname,usd:usd,NM:NM,AB:AB,WD:WD,MO:MO,pd:pd});
 d.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-np-go]');if(a){e.preventDefault();scrollToId(a.getAttribute('data-np-go'))}});
 var fu=function(){furniture(D)};fu();[500,1500,3000,6000].forEach(function(t){setTimeout(fu,t)});addEventListener('resize',fu);
 if(window.ResizeObserver)new ResizeObserver(fu).observe(top)}
function go(){var t=0;(function w(){if(typeof ROUNDS!=='undefined'&&window.__x2pPnl&&!d.documentElement.classList.contains('x2p-cur')&&d.querySelector('#standings .sh .tx'))build();else if(t++<600)setTimeout(w,100)})()}
d.documentElement.classList.add('np',C.cls||'np-x');
if(C.fonts){var l=d.createElement('link');l.rel='stylesheet';l.href=C.fonts;d.head.appendChild(l)}
go()})();
