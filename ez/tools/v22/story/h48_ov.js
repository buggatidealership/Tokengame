/* ===== H48 OVERVIEW (EZ Live X6+ only; owner, 2026-11-03: "that approach is better than what we have right now... do one version where
   you apply it to what we have today"). The Overview as one episode of a Saturday-morning cartoon (the H47 "saturday" take's art) told in
   the humour magazine's words (the H47 "satire" take): what we do; who to follow so far, with its sample and its founder's face; its
   next trades and where to follow them on Hyperliquid; the proof (we track, you read; one real round, start to finish; the record; the
   cast; smart or lucky); our own stake (the cliffhanger); next time. Built from ez-data.js through h48_data.js; X2+'s own Overview
   sections stay in the page out of sight (h48_show.css), and the record stays laid out because the round view (#/round/N) copies its
   cards. The cover waits for this (window.__x2pNeedWorld, html.x2p-world). A failure takes html.h48 off, so X2+'s Overview shows. ===== */
(function(){
var d=document,H=d.documentElement,W=window;
if(!H.classList.contains("h48"))return;
function fail(e){W.__h48Err=e;try{console.error("h48",e)}catch(x){}var o=d.getElementById("h48ov");if(o)o.remove();H.classList.remove("h48");H.classList.add("x2p-world")}
var n=0;
(W.__h48T=W.__h48T||{}).run=performance.now();
(function wait(){var top=d.getElementById("top");
  if(!(W.ROUNDS&&ROUNDS.length&&W.H48D&&W.H48UI&&top&&W.MODELS)){if(++n<400)return setTimeout(wait,25);return fail(new Error("h48: page not ready"))}
  try{(W.__h48T=W.__h48T||{}).start=performance.now();build(top)}catch(e){fail(e)}})();

function build(top){
var E=H48D,D=E.get(),U=H48UI,esc=U.esc,RM=U.RM();
var ord=D.ord,R=D.R,nR=D.N,nT=D.nT,L=ord[0],LS=D.season[L],WR=E.wilson(LS.w,LS.n);
var mc2={GROK:"#9c968a",CLAUDE:"#c2552a",GPT:"#7a55d6",KIMI:"#2f84cf"};
var DESK=W.matchMedia("(min-width:1000px)").matches;
function sz(t){return U.size(t)}
function byOrd(a){return ord.map(function(m){return a.filter(function(t){return t.m===m})[0]}).filter(Boolean)}
var logo='<img src="media/icon.svg" alt="" width="30" height="30">';   /* the EZ. logo (media/icon.svg, the site's own icon) */
var h="";

/* ---------- 1. the title card: what we do ---------- */
h+='<section class="h8-tcw" aria-label="Four AIs Trade Earnings"><div class="h8-tc"><div class="h8-in">'+
  '<p class="h8-pres"><span class="h8-plg" aria-label="EZ.">'+logo+'</span>presents</p>'+
  '<h1 class="h8-let" data-h8let="7">Four AIs Trade Earnings</h1>'+
  '<p class="h8-ep"><span>Season 1</span>'+(D.weekNo?'<span>Week '+D.weekNo+'</span>':'')+'</p></div></div>'+
  '<div class="h8-cred h8-g"><div class="h8-wrap"><div><p class="h8-say">We track four AIs on every earnings trade, so you don&rsquo;t have to.</p>'+
  '<p class="h8-film"><button class="h8-btn" type="button" id="h8film"><span class="h8-play" aria-hidden="true"></span>How it works · <span id="h8ft">1:20</span></button></p></div>'+
  '<div class="h8-star"><span class="h8-slab">Starring</span>'+["GPT","CLAUDE","GROK","KIMI"].map(function(m){return '<span class="h8-who" style="--mc:'+E.COL[m]+'">'+U.badge(m,26)+E.NAME[m]+'</span>'}).join("")+'</div></div></div></section>';

/* ---------- 2. who to follow: so far, it's the top model, with its sample ---------- */
var hr=function(s){return (s.hit*100).toFixed(1)+"%"};
h+='<section class="h8-versec h8-g" aria-label="Who to follow"><div class="h8-wrap h8-vw"><div><p class="h8-act">Who to follow</p>'+
  '<h2 class="h8-let h8-h2" data-h8let="9" data-h8amp=".7">So far, it&rsquo;s '+E.NAME[L]+'.</h2></div>'+
  U.ticket(L,LS)+
  '<div><p class="h8-hon">So far is the word. On '+LS.n+' trades, '+E.NAME[L]+'&rsquo;s real hit rate could be anywhere from about <b>'+Math.round(WR[0]*100)+'% to '+Math.round(WR[1]*100)+'%</b>. A lead, not a proof.</p>'+
  '<div class="h8-field"><span class="h8-lbl">The field, season P&amp;L</span>'+ord.slice(1).map(function(m){var s=D.season[m];return '<span class="h8-fe h8-pl h8-t">'+U.badge(m,22)+'<b>'+E.NAME[m]+'</b><i class="h8-num '+(s.pl>=0?"h8-pos":"h8-neg")+'">'+E.money(s.pl)+'</i><small>'+s.w+' of '+s.n+' right</small></span>'}).join("")+'</div></div></div></section>';

/* ---------- 3. its next trades, and where to follow them ---------- */
var NU=D.next,inN=NU.filter(function(u){return u.in}).length,nWl=DESK?8:6;
var wl=NU.filter(function(u){return !u.in&&E.hlMarket(u.ticker)&&u.ticker!=="NVDA"}).slice(0,nWl);
var rest=NU.length-inN-wl.length,restNo=NU.filter(function(u){return !u.in&&!E.hlMarket(u.ticker)}).length;
h+='<section class="h8-flw h8-g" aria-label="'+E.NAME[L]+'&rsquo;s next trades"><div class="h8-wrap"><p class="h8-act">Coming up</p>'+
  '<h2 class="h8-let h8-h2" data-h8let="10" data-h8amp=".7">'+E.NAME[L]+'&rsquo;s next trades</h2>'+
  (inN?'<div class="h8-nxs'+(inN===1?' h8-solo':'')+'">'+NU.filter(function(u){return u.in}).map(function(u){return U.nextCard(u,L,ord)}).join("")+'</div>':'<p class="h8-lede">No trades in yet for the next close. They drop before each company&rsquo;s earnings.</p>')+
  (wl.length?'<p class="h8-lbl h8-nxl">Next with a market on <span class="h8-hlw">Hyperliquid</span></p><div class="h8-nxs h8-wts">'+wl.map(function(u){return U.nextCard(u,L,ord)}).join("")+'</div>':'')+
  '<p class="h8-fine">'+rest+' more companies on the schedule, NVIDIA last. '+restNo+' of the '+(NU.length-inN)+' still to come have no Hyperliquid market. Markets: <span class="h8-asof">'+E.hlAsOf()+'</span>.</p></div></section>';

/* ---------- 4. the proof: we track, you read ---------- */
h+='<div class="h8-bump" aria-hidden="true"><p class="h8-bt"><small>The proof</small><span data-h8let="2" data-h8amp=".7">We track. You read.</span></p></div>';
h+='<section class="h8-proof h8-g" aria-label="We track. You read."><div class="h8-wrap"><h2 class="h8-sr">We track. You read.</h2>'+
  '<div class="h8-pfg"><div class="h8-pf h8-pl"><span class="h8-num">'+nR+'</span><span class="h8-lbl">rounds graded</span></div>'+
  '<div class="h8-pf h8-pl"><span class="h8-num">'+nT+'</span><span class="h8-lbl">trades graded</span></div></div>'+
  '<p class="h8-lede"><b>Each one locked before the earnings, graded by the close.</b> Here is one, start to finish.</p></div></section>';

/* ---------- 5. one real round, start to finish: the round's film on the painted TV, the beats under it ---------- */
var rc=D.recap,rcT=rc.__h8.tr,rcR=rcT.filter(function(t){return t.w}),rcW=E.winners(rc),F=(W.FILMS||{})[rc.n];
/* owner, 2026-11-04: the size at the card's end ("don't put it that close, put it at the end here"), Long or Short under the name */
function tokTrade(t){return '<div class="h8-tk h8-pl h8-t h8-tkx">'+U.badge(t.m,28)+'<div class="h8-wh"><span class="h8-who">'+E.NAME[t.m]+'</span><span class="h8-sz '+(t.up?"h8-long":"h8-short")+'">'+(t.up?"Long":"Short")+'</span></div><span class="h8-tkz h8-num '+(t.up?"h8-long":"h8-short")+'">'+t.size+'%</span></div>'}
function tokGrade(t){return '<div class="h8-tk h8-pl h8-t '+(t.w?"h8-mw":"h8-ml")+'">'+U.badge(t.m,28)+'<div class="h8-wh"><span class="h8-who">'+E.NAME[t.m]+'</span><span class="h8-sz h8-num '+(t.v>0?"h8-pos":"h8-neg")+'">'+E.money(t.v)+'</span></div><span class="h8-st" role="img" aria-label="'+(t.w?"Win":"Loss")+'">'+(t.w?"W":"L")+'</span></div>'}
var rcRn=byOrd(rcR).map(function(t){return E.NAME[t.m]}),rcWn=rcW.map(function(m){return E.NAME[m]}).join(" &amp; ");
var pay=rcR.length===1?'<b>'+rcRn[0]+' was the only one right</b>'+(rcW.length===1&&rcW[0]===rcR[0].m?' and won the round.':'.'):
  rcR.length?'<b>'+rcRn.slice(0,-1).join(", ")+' and '+rcRn[rcRn.length-1]+' were right.</b> '+(rcWn?rcWn+(rcW.length>1?' tied closest and won the round.':' was closest and won the round.'):''):'<b>Nobody was right.</b>';
/* owner, 2026-11-04: the payoff leads into the record ("There have been 84. Here they are.") */
pay+=' There have been '+nR+'. Here they are.';
h+='<section class="h8-prev h8-g" aria-label="One real round, start to finish: Round '+rc.n+'"><div class="h8-pw">'+
  '<div class="h8-tvw">'+(F?'<div class="h8-tvs" id="h8tvs"><video id="h8tvv" muted playsinline preload="none" poster="media/'+esc(F.p)+'.jpg"><source src="media/'+esc(F.f)+'.mp4" type="video/mp4"><source src="media/'+esc(F.f)+'.webm" type="video/webm"></video>'+
    '<button type="button" aria-label="Play the film of Round '+rc.n+', '+esc(E.coLabel(rc.ticker))+'"></button><span class="h8-tvp" aria-hidden="true"></span></div>':'')+'</div>'+
  '<div class="h8-beats"><p class="h8-act">One real round, start to finish</p><h2 class="h8-let h8-cr" data-h8let="11" data-h8amp=".6">'+esc(E.coLabel(rc.ticker))+'</h2>'+
  '<p class="h8-when">Round '+rc.n+'</p>'+
  '<div class="h8-beat"><p>Before its earnings, each AI placed a trade:</p><div class="h8-tok">'+byOrd(rcT).map(tokTrade).join("")+'</div></div>'+
  '<div class="h8-beat"><p>Then the close:</p><div class="h8-close h8-pl h8-t"><span class="h8-num '+(rc.a>0?"h8-pos":"h8-neg")+'">'+E.pct(rc.a)+'</span><span class="h8-lbl">At market close</span></div></div>'+
  '<div class="h8-beat"><p><b>P&amp;L</b> on a <b>$100K trade</b>:</p><div class="h8-tok">'+byOrd(rcT).map(tokGrade).join("")+'</div></div>'+
  '<p class="h8-payoff">'+pay+'</p></div></div></section>';

/* ---------- 6. the record: every round so far ---------- */
var shown=6;   /* owner, 2026-11-04: "I think it's okay to do 6" (was 12, 15 on desktop) */
function tile(r){var F2=(W.FILMS||{})[r.n];return 'media/tile-r'+r.n+'-'+(F2?(F2.t||'f1'):'t2')+'.jpg'}
function ep(r){var w=E.winners(r);
  return '<a class="h8-ep2" href="#/round/'+r.n+'" aria-label="Round '+r.n+', '+esc(E.coLabel(r.ticker))+', '+E.pct(r.a)+', '+(w.length?w.map(function(m){return E.NAME[m]}).join(" and ")+" won":"nobody won")+'. Open its graded card.">'+
  '<span class="h8-scr"><img src="'+tile(r)+'" alt="" loading="lazy" decoding="async"></span>'+
  /* owner, 2026-11-04: the winner up top and bigger, the move smaller beside the company, one row fewer */
  '<span class="h8-cap h8-pl h8-t"><span class="h8-r1"><span class="h8-wn'+(w.length?"":" h8-no")+'">'+(w.length?w.map(function(m){return U.badge(m,22)}).join("")+w.map(function(m){return E.NAME[m]}).join(" &amp; ")+" won":"Nobody won")+'</span><span class="h8-rn">R'+r.n+'</span></span>'+
  '<span class="h8-r2"><span class="h8-cn">'+esc(E.coLabel(r.ticker))+'</span><span class="h8-mv h8-num '+(r.a>0?"h8-pos":"h8-neg")+'">'+E.pct(r.a)+'</span></span></span></a>'}
var rev=R.slice().reverse();
h+='<div class="h8-bump h8-flip" aria-hidden="true"><p class="h8-bt"><small>The record</small><span data-h8let="4" data-h8amp=".7">Every round so far</span></p></div>';
h+='<section class="h8-rec h8-g" aria-label="The record: every round so far"><div class="h8-wrap"><h2 class="h8-sr">The record: every round so far</h2><p class="h8-lede">Newest first. Tap one to open its graded card.</p>'+
  '<p class="h8-key"><b>Won</b> = the trade closest to the move, among those that got the direction right. Both on a tie. <b>Nobody</b> when all four were wrong.</p>'+
  '<div class="h8-guide" id="h8guide">'+rev.slice(0,shown).map(ep).join("")+'</div>'+(nR>shown?'<div class="h8-more"><button class="h8-btn" id="h8more" type="button">Show all '+nR+' rounds</button></div>':'')+'</div></section>';

/* ---------- 7. meet the cast ---------- */
h+='<div class="h8-bump" aria-hidden="true"><p class="h8-bt"><small>Starring</small><span data-h8let="3" data-h8amp=".7">Meet the cast</span></p></div>';
h+='<section class="h8-castsec h8-g" aria-label="Meet the cast"><div class="h8-wrap"><h2 class="h8-sr">Meet the cast</h2><div class="h8-cast">'+ord.map(function(m,i){var s=D.season[m],sh=s.short,
   bias=sh*2>s.n?"Short on "+sh+" of "+s.n+" trades.":"Long on "+(s.n-sh)+" of "+s.n+" trades.";
   return '<article class="h8-cc" style="--mc:'+E.COL[m]+';--mc2:'+mc2[m]+'"><div class="h8-pic"><img src="'+U.CAST[m]+'" alt="'+E.NAME[m]+', drawn as a cartoon of its lab&rsquo;s founder" loading="lazy" decoding="async"></div>'+
   '<div class="h8-card h8-pl"><div><span class="h8-rk">No. '+(i+1)+(s.first>1?' · joined in Round '+s.first:'')+'</span><div class="h8-nmr"><span class="h8-nml">'+U.badge(m,30)+'<h3 class="h8-let" data-h8let="'+(20+i)+'" data-h8amp=".7">'+E.NAME[m]+'</h3></span>'+U.flag(m,30)+'</div></div>'+
   '<div class="h8-fig"><div><span class="h8-lbl">Season P&amp;L</span><span class="h8-num '+(s.pl>=0?"h8-pos":"h8-neg")+'">'+E.money(s.pl)+'</span></div><div><span class="h8-lbl">W-L</span><span class="h8-num">'+s.w+'-'+s.l+'</span></div></div>'+
   '<p class="h8-trait">'+bias+'</p></div></article>'}).join("")+
   /* No. 5 (owner, 2026-11-04: "there should be a card for number 5"): the models in tryouts, not signed yet */
   '<article class="h8-cc h8-n5"><div class="h8-card h8-pl"><div class="h8-n5h"><span class="h8-rk">No. 5 · not signed yet</span><h3 class="h8-let h8-cr" data-h8let="24" data-h8amp=".6">In tryouts</h3></div>'+
   '<ul class="h8-n5l">'+U.TRY.map(function(c){return '<li>'+U.tryBadge(c,30)+'<span class="h8-n5n"><b>'+esc(c.n)+'</b><small>'+esc(c.lab)+'</small></span>'+U.flag(c.cc,24)+'</li>'}).join("")+'</ul>'+
   '<p class="h8-trait">One of them joins the cast in Season 2.</p></div></article>'+
   '</div></div></section>';

/* ---------- 8. smart or lucky ---------- */
h+='<div class="h8-bump h8-flip" aria-hidden="true"><p class="h8-bt"><small>The question</small><span data-h8let="5" data-h8amp=".7">Smart or lucky?</span></p></div>';
h+='<section class="h8-solsec h8-g" aria-label="Smart or lucky?"><div class="h8-wrap"><h2 class="h8-sr">Smart or lucky?</h2><p class="h8-lede"><b>'+nR+' rounds, '+nT+' trades.</b> Too few to say it is skill either way. Here is how it looks so far.</p>'+
  '<div class="h8-sol2"><div class="h8-bd"><h3 class="h8-let" data-h8let="31" data-h8amp=".6">Hit rate</h3><p class="h8-q">How often were they right on their long or short?</p><figure class="h8-scene h8-sc" id="h8sc1"><div class="h8-sf" id="h8sf1"></div></figure></div>'+
  '<div class="h8-bd"><h3 class="h8-let" data-h8let="33" data-h8amp=".6">P&amp;L</h3><p class="h8-q">Would following them have made you money? $100K a trade.</p><figure class="h8-scene h8-sc" id="h8sc2"><div class="h8-sf" id="h8sf2"></div></figure></div></div></div></section>';

/* ---------- 9. the cliffhanger: our own stake ---------- */
var B=D.BET,P=Math.round(((W.SIM&&SIM.poolShare)!=null?SIM.poolShare:.69)*100),nyD=function(t,o){return new Date(t).toLocaleDateString("en-US",Object.assign({timeZone:"America/New_York"},o))};
var frz=B&&W.SIM&&SIM.leadHours!=null?new Date(B-SIM.leadHours*3600e3):null;
var NV=(W.CO_LOGOS||{}).NVDA;
h+='<div class="h8-bump" aria-hidden="true"><p class="h8-bt"><small>Our own stake</small><span data-h8let="6" data-h8amp=".7">The cliffhanger</span></p></div>';
h+='<section class="h8-betsec h8-g" aria-label="The cliffhanger: Bet #1, NVIDIA"><div class="h8-wrap h8-bw"><figure class="h8-cliff" role="img" aria-label="The pool, a chest of coins, teeters on a cliff edge beside a signpost">'+
  '<div class="h8-pk h8-pk1"><span class="h8-a">Bet #1</span><span class="h8-b">'+(NV?'<img src="media/'+esc(NV.f)+'" alt="">':'')+'NVIDIA</span></div>'+
  '<div class="h8-pk h8-pk2"><span class="h8-a">At the close</span><span class="h8-b">'+(B?nyD(B,{month:"short",day:"numeric"}):"Soon")+'</span></div>'+
  '<div class="h8-pk h8-pk3"><span class="h8-a">Time left</span><span class="h8-b" id="h8cd" aria-live="off"></span></div>'+
  '<div class="h8-plq" aria-label="'+P+' percent">'+P+'%</div></figure>'+
  '<div class="h8-bettx"><h2 class="h8-sr">The cliffhanger</h2><p class="h8-say">We put our own pool on the top model&rsquo;s trade. <b>'+P+'% of $EZ creator fees</b> fill it. At the close on '+(B?nyD(B,{weekday:"short",month:"short",day:"numeric"}):"a date to come")+', the whole pool goes on <b>NVIDIA (NVDA)</b>, long or short, as the top model trades it.</p>'+
  '<div class="h8-outs"><div class="h8-out h8-pl"><span class="h8-k h8-let h8-gr" data-h8let="41" data-h8amp=".5">Right</span><p>Profits buy back $EZ.</p></div><div class="h8-out h8-pl"><span class="h8-k h8-let h8-rd" data-h8let="43" data-h8amp=".5">Wrong</span><p>The pool shrinks or can be wiped out.</p></div></div>'+
  (frz?'<p class="h8-frz">The board freezes 24 hours before: '+nyD(frz,{weekday:"short",month:"short",day:"numeric"})+', '+frz.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",timeZone:"America/New_York"}).replace(":00","")+' New York. The top model then holds the golden ticket.</p>':'')+
  '<p class="h8-tbc h8-let" data-h8let="47">To be continued&hellip;</p><p class="h8-s2">NVIDIA is the first bet, not the last. Season 2 brings more.</p></div></div></section>';

/* ---------- 10. the end card: next time ---------- */
var nx=NU.filter(function(u){return u.in&&u.resolves})[0],nxCos=nx?NU.filter(function(u){return u.in&&u.resolves&&E.dayKey(u.resolves)===E.dayKey(nx.resolves)}):[];
var up1=!nx&&NU[0];
h+='<section class="h8-endw" aria-label="Next time"><div class="h8-endc"><div class="h8-in"><p class="h8-k">Next time on</p><h2 class="h8-let" data-h8let="51">Four AIs Trade Earnings</h2>'+
  (nxCos.length?'<p class="h8-nt">The next close grades the trades on '+nxCos.map(function(u){return esc(E.coLabel(u.ticker))}).join(", ").replace(/, ([^,]*)$/," and $1")+'.</p>':(up1?'<p class="h8-nt">Next on the card: '+esc(E.coLabel(up1.ticker))+'.</p>':''))+
  '</div></div><div class="h8-nextsec h8-g"><div class="h8-wrap"><div class="h8-bye"><p class="h8-let" data-h8let="61" data-h8amp=".6">That&rsquo;s all for this week.</p>'+
  '<div class="h8-btns"><a class="h8-btn" href="#/leaderboard">See who to follow right now</a>'+((W.CONFIG&&CONFIG.x)?'<a class="h8-btn h8-cr" href="'+esc(CONFIG.x)+'" target="_blank" rel="noopener"><svg class="h8-x" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>Follow on X</a>':'')+'</div></div>'+
  '<p class="h8-small"><span class="h8-plg" aria-hidden="true">'+logo+'</span><span>Simulated record, $100K a trade, before fees. Not financial advice. Trading can lose money; the pool can be wiped out. Hyperliquid is not available in every country.</span></p></div></div></section>';

var root=d.createElement("div");root.id="h48ov";root.className="h8r";root.innerHTML=h;
top.insertBefore(root,top.firstChild);
U.letterAll(root);
(W.__h48T=W.__h48T||{}).built=performance.now();

/* the film, through the page's own player (x2p_top.js: a phone's own full-screen player, desktop's theatre) */
var fb=d.getElementById("h8film");
fb.addEventListener("click",function(){if(W.__f4open)W.__f4open();else{var v=d.createElement("video");v.src="media/ez-landing-v4.mp4";v.controls=true;v.playsInline=true;v.style.cssText="position:fixed;inset:0;width:100%;height:100%;z-index:999;background:#000";d.body.appendChild(v);v.play();v.addEventListener("ended",function(){v.remove()})}});
(function(){var t=d.querySelector(".f4-t"),k=0;(function rd(){t=d.querySelector(".f4-t");if(t&&/\d:\d\d/.test(t.textContent)){d.getElementById("h8ft").textContent=t.textContent.trim();return}if(++k<40)setTimeout(rd,500)})()})();

/* the countdown on the third plank (seconds only when motion is welcome) */
var cd=d.getElementById("h8cd");
function tick(){if(!B){cd.textContent="Soon";return}var s=Math.max(0,Math.floor((B-Date.now())/1000)),dd=Math.floor(s/86400),hh=Math.floor(s%86400/3600),mm=Math.floor(s%3600/60),ss=s%60;
  cd.innerHTML=dd+'<u>d</u>'+String(hh).padStart(2,"0")+'<u>h</u>'+String(mm).padStart(2,"0")+'<u>m</u>'+(RM?"":String(ss).padStart(2,"0")+'<u>s</u>');
  cd.setAttribute("aria-label",dd+" days, "+hh+" hours, "+mm+" minutes until the bet")}
tick();
/* the one quiet loop on that screen: the seconds, only while the signpost is on screen */
var tmr=0;function run(on){clearInterval(tmr);if(on)tmr=setInterval(tick,RM?60000:1000)}
if("IntersectionObserver" in W)new IntersectionObserver(function(es){run(es[0].isIntersecting)}).observe(d.querySelector("#h48ov .h8-cliff"));else run(true);

/* the TV: the round's film, paused where the trades are in (loaded when it comes near); a tap plays it with sound, inline */
var tv=d.getElementById("h8tvv"),tvs=d.getElementById("h8tvs");
if(tv){var near=function(){if(tv.preload!=="none")return;tv.preload="metadata";tv.addEventListener("loadedmetadata",function(){try{if(tv.paused&&!tvs.classList.contains("h8-on"))tv.currentTime=tv.duration*.36}catch(e){}},{once:true});try{tv.load()}catch(e){}};
  if("IntersectionObserver" in W){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();near()}},{rootMargin:"500px 0px"});io.observe(tvs)}
  tvs.querySelector("button").addEventListener("click",function(){if(tv.paused){tv.muted=false;if(!tvs.classList.contains("h8-on"))try{tv.currentTime=0}catch(e){}var p=tv.play();if(p&&p.catch)p.catch(function(){});tvs.classList.add("h8-on")}else{tv.pause();tvs.classList.remove("h8-on")}});
  tv.addEventListener("ended",function(){tvs.classList.remove("h8-on")})}

/* the record: a tile opens the round's graded card (the page's own round view); closing it puts the page back where it was */
var back=null;
root.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a.h8-ep2");if(!a)return;back={y:scrollY,h:location.hash&&!/^#\/round\//.test(location.hash)?location.hash:"#/"}},true);
new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.removedNodes,function(x){if(x.nodeType===1&&x.id==="x2pRm"&&back){var b=back;
  setTimeout(function(){if(d.getElementById("x2pRm"))return;back=null;var put=function(){if(/^#\/round\//.test(location.hash))history.replaceState(null,"",b.h);scrollTo({top:b.y,behavior:"instant"})};put();setTimeout(put,120);setTimeout(put,450)},40)}})})}).observe(d.body,{childList:true});
var more=d.getElementById("h8more");
if(more)more.addEventListener("click",function(){var g=d.getElementById("h8guide");g.insertAdjacentHTML("beforeend",rev.slice(shown).map(ep).join(""));this.parentNode.remove()});

/* the two charts on their painted surfaces */
function draw(){var a=d.getElementById("h8sc1"),b=d.getElementById("h8sc2");if(!a.clientWidth)return;var side=innerWidth>=1000,BX=U.BOX;
  /* side by side, both boards the same height: the screen gives up width to match the chalkboard */
  U.fit(a,d.getElementById("h8sf1"),BX.sc,.92);U.fit(b,d.getElementById("h8sf2"),BX.sc,.92);
  var eh={},ep={};E.MK.forEach(function(m){var s=D.season[m];eh[m]=s.n?(s.hit*100).toFixed(1)+"%":"–";ep[m]=E.kmoney(s.pl)});
  U.chart(d.getElementById("h8sf1"),"sc",{rs:R,ends:eh,anim:true,aria:"Hit rate round by round, every line starting at 50 percent"});
  U.chart(d.getElementById("h8sf2"),"sc",{rs:R,ends:ep,anim:true,money:true,aria:"P&L round by round from $0, $100K a trade"})}
/* the small next-trade cards: one size for every name and one for every "Trade drops" line, the largest at which the longest fits on one
   line (owner, 2026-11-04: "each module the same size, but also the same layout... even if the writing has to be a bit smaller") */
function fitWts(){var g=root.querySelector(".h8-nxs.h8-wts");if(!g||!g.clientWidth)return;g.style.removeProperty("--wtn");g.style.removeProperty("--wtd");
  var one=function(sel,floor,v){var r=1,f0=0;g.querySelectorAll(sel).forEach(function(el){if(!f0)f0=parseFloat(getComputedStyle(el).fontSize);if(el.clientWidth)r=Math.max(r,el.scrollWidth/el.clientWidth)});
    if(r>1&&f0)g.style.setProperty(v,Math.max(floor,Math.floor(f0/r*4)/4)+"px")};
  one(".h8-nxcn",11,"--wtn");one(".h8-nxgd",9,"--wtd")}
var lw=0;function onR(){if(innerWidth!==lw){lw=innerWidth;draw();fitWts()}}
fitWts();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(fitWts);
addEventListener("resize",onR);

/* Hyperliquid's own figures, once, after the page is up: the open interest goes live, else the snapshot stays with its date */
E.onHL(function(){root.querySelectorAll("[data-h8hl]").forEach(function(el){var mk=E.hlMarket(el.getAttribute("data-h8hl"));if(!mk)return;var s=el.querySelector(".h8-mkl");if(s)s.innerHTML='<b>'+esc(mk.name)+'</b> · $'+mk.oi.toFixed(1)+'M open interest'+(mk.thin?' · <em>thin market</em>':'');
    var oi=el.querySelector(".h8-mkoi");if(oi)oi.innerHTML='$'+mk.oi.toFixed(1)+'M open interest'+(mk.thin?' · <em>thin market</em>':'');var nm=el.querySelector(".h8-mknm");if(nm)nm.textContent=mk.name});
  root.querySelectorAll(".h8-asof").forEach(function(s){s.textContent=E.hlAsOf()})});

/* the cover lifts once the faces are in (at most 2.5 s), as X2+ waits for its own */
var F=d.fonts?Promise.all(['400 40px "H8 Caprasimo"','400 20px "H8 Lilita"','500 16px "H8 Fredoka"','700 16px "H8 Fredoka"'].map(function(f){return d.fonts.load(f)})):Promise.resolve();
var done=false,lbw=0;function show(){if(done)return;
  /* arriving on the Leaderboard tab, the cover also waits for the scorecard (at most 4 s) */
  if(H.getAttribute("data-sec")==="leaderboard"&&!d.getElementById("h48lb")&&!W.__h48LbErr&&lbw++<80)return setTimeout(show,50);
  done=true;onR();
  /* round H49: each helper file (h48_x_*.js) pushes a function onto window.H48HOOK; they patch the built Overview before the cover lifts */
  (W.H48HOOK||[]).forEach(function(f){try{f(root,D)}catch(e){(W.__h48HookErr=W.__h48HookErr||[]).push(e);try{console.error("h48 hook",e)}catch(x){}}});
  H.classList.add("x2p-world");W.__h48Ov=D;(W.__h48T=W.__h48T||{}).world=performance.now();
  var lift=function(){if(H.classList.contains("x2p-cur"))return setTimeout(lift,400);setTimeout(function(){E.refreshHL()},1500)};lift()}
F.then(show,show);setTimeout(show,2500);
}
})();
