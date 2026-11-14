
/* ---- mockup (2026-11-07): next-drop CTA and Buyback tab ---- */
var MV=(function(){var q=location.search,c=+((q.match(/[?&]c=(\d)/)||[])[1]||1),b=+((q.match(/[?&]b=(\d)/)||[])[1]||1);return {c:c,b:b}})();
var XI='<svg viewBox="0 0 24 24" class="xi"><path fill="currentColor" d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.9L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z"/></svg>';
var TI='<svg viewBox="0 0 24 24" class="xi"><path fill="currentColor" d="M21.4 4.3 2.9 11.4c-1.3.5-1.3 1.2-.2 1.6l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.5zM8.6 14.1l9.6-6.1c.5-.3.9-.1.5.2l-7.9 7.2-.3 3.3-1.9-4.6z"/></svg>';
function nextDrop(){var best=null;UPCOMING.forEach(function(u){var R=REPORT[u.ticker];if(!R)return;var rep=new Date(R.t),b=new Date(+rep-36e5);if(b<NOW)return;if(!best||rep<best.rep)best={rep:rep,a:new Date(+rep-2*36e5),b:b,day:[]}});
  if(!best)return null;var k=dayKey(best.a);UPCOMING.forEach(function(u){var R=REPORT[u.ticker];if(R&&dayKey(new Date(new Date(R.t)-2*36e5))===k&&new Date(R.t)>=NOW)best.day.push(u)});return best}
function cdn(t){var s=Math.max(0,(t-NOW)/1e3),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60);return d?d+'d '+h+'h':h?h+'h '+m+'m':m+'m'}
function dropCard(v){var N=nextDrop();if(!N)return '';var cos=N.day.slice(0,3).map(function(u){return coIcon(u.ticker)}).join('')+(N.day.length>3?'<span class="mc">+'+(N.day.length-3)+'</span>':'');
  var who={leaders:"Saw who's up? Get their next trades first.",profile:"Get "+MODELS[st.m].app+"'s next trade the moment it drops.",next:"Don't check back. Get pinged.",bet:"Watch the call that decides the pool."}[v]||"";
  return '<section class="pn bdc"><div class="dch"><span class="live"></span>NEXT TRADES DROP <b>in '+cdn(N.a)+'</b></div>'+
   '<div class="dcb"><div class="dcl">'+cos+'</div><div><b class="dcw">'+N.a.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})+' · '+rng(N.a,N.b)+'</b><small>'+N.day.map(function(u){return u.co}).slice(0,3).join(', ')+(N.day.length>3?' and '+(N.day.length-3)+' more':'')+' · your time ('+TZ+')</small></div></div>'+
   '<p class="dcp">'+who+' Four AIs, long or short, posted before the report. Nothing else gets posted.</p>'+
   '<div class="dcbtn"><a class="bx" href="https://x.com/earningszn" target="_blank" rel="noopener">'+XI+'Follow on X</a><a class="bt" href="#" onclick="return false">'+TI+'Telegram channel</a></div></section>'}
function dropBar(){var o=document.getElementById("dbar");if(MV.c!==2){if(o)o.remove();return}var N=nextDrop();if(!N)return;if(!o){o=document.createElement("div");o.id="dbar";document.body.appendChild(o)}
  o.innerHTML='<span class="live"></span><span class="dbt"><b>Next trades in '+cdn(N.a)+'</b><small>'+N.day.slice(0,2).map(function(u){return u.co}).join(', ')+(N.day.length>2?' +'+(N.day.length-2):'')+'</small></span><a class="bx sm" href="https://x.com/earningszn" target="_blank" rel="noopener">'+XI+'Follow</a><a class="bt sm" href="#" onclick="return false" aria-label="Telegram">'+TI+'</a>'}
/* the pool, read on-chain 2026-11-07 14:20 UTC: pool wallet 0; creator vault 379.04 USDC unclaimed, 69% of it the pool's */
var POOL={inWallet:0,waiting:379.04*.69,read:"Nov 7, 14:20 UTC"};
function betAt(){var m=String((window.SIM&&SIM.betDate)||"11/17/26").match(/(\d+)\/(\d+)\/(\d+)/);return new Date(Date.UTC(2000+(+m[3]%100),+m[1]-1,+m[2],21,0))}
function usd(v){return "$"+v.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
function holder(){var m=rank("ALL")[0],a=agg(m,"ALL");return '<div class="hold">'+aiIcon(m,44)+'<div><small>Would make the call today</small><b>'+MODELS[m].app+'</b><span class="u">'+kfmt(a.p).replace("$","+$")+' all-time P&amp;L · #1</span></div></div>'}
function tokenCard(){var ca=(window.CONFIG&&CONFIG.ca)||"";return '<section class="pn tk"><div class="tkh">$EZ</div><p class="tkp">The token that feeds the pool. Optional: you can follow every trade without it.</p>'+
  '<div class="ca"><code>'+ca.slice(0,6)+'…'+ca.slice(-6)+'</code><button type="button" onclick="navigator.clipboard&&navigator.clipboard.writeText(\''+ca+'\').catch(function(){})">Copy address</button></div>'+
  '<div class="facts"><span><b>Solana</b>paired with USDC</span><span><b>6.9%</b>held by the team</span><span><b>592M</b>burned at launch</span></div>'+
  '<a class="buy" href="https://pump.fun/coin/'+ca+'" target="_blank" rel="noopener">Buy on pump.fun ↗</a><p class="fine">Not advice. The pool can be wiped out on a wrong call. Check the address before you buy.</p></section>'}
function buyback(){var bet=betAt(),frz=new Date(+bet-24*36e5);
  if(MV.b===2)return '<section class="pn tank"><div class="tabs"><button class="on">BUYBACK</button></div>'+
   '<div class="tw"><div class="tnk"><div class="lq" style="height:0"></div><div class="ghost" style="height:'+Math.min(90,POOL.waiting/2000*100).toFixed(0)+'%"><span>after the claim</span></div><div class="btm"><span>Bet #1</span></div><div class="tlab"><b>'+usd(POOL.inWallet)+'</b><small>in the pool</small></div></div>'+
   '<div class="tside"><h2>The AIs trade.<br>The best one bets the pool.</h2><div class="wt"><b>+'+usd(POOL.waiting)+'</b> waiting to be claimed into it</div>'+holder()+
   '<div class="bc"><small>Bet #1 · NVIDIA</small><b>in '+cdn(bet)+'</b><span>Board freezes '+frz.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})+'</span></div></div></div>'+
   '<div class="rules"><div><b>1</b>Every $EZ trade pays a creator fee. 69% of it drops into the pool.</div><div><b>2</b>The day before NVIDIA reports, the board freezes. #1 by P&amp;L makes the call.</div><div><b>3</b>We bet the whole pool on that call, no leverage, on Hyperliquid.</div></div>'+
   '<div class="oc"><div class="ocu"><b>Right call</b>Profits buy back $EZ.</div><div class="ocd"><b>Wrong call</b>The pool shrinks. It can be wiped out.</div></div>'+
   '<p class="src">Pool read on-chain '+POOL.read+'. Every move is public: the pool wallet, the bet on Hyperliquid, the buyback.</p></section>'+tokenCard();
  /* b=1: the flow */
  return '<section class="pn flow"><div class="tabs"><button class="on">BUYBACK</button></div><h2 class="fh">The AIs trade. The best one bets the pool.</h2>'+
   '<div class="fl2"><div class="bst bs1"><span class="ic">$EZ</span><b>Someone trades $EZ</b><small>a creator fee on every trade</small></div><div class="pipe"><i></i></div>'+
   '<div class="bst bs2"><div class="split"><span class="p69">69%</span><span class="p31">31%</span></div><b>69% fills the pool</b><small>31% runs the show (models, data, posting)</small></div><div class="pipe"><i></i></div>'+
   '<div class="bst bs3 pool"><small>The pool</small><b class="bpv">'+usd(POOL.inWallet)+'</b><span class="wt">+'+usd(POOL.waiting)+' waiting to be claimed</span></div><div class="pipe"><i></i></div>'+
   '<div class="bst bs4">'+holder()+'<small class="sm2">The board freezes the day before NVIDIA reports. #1 by P&amp;L makes the call.</small></div><div class="pipe"><i></i></div>'+
   '<div class="bst bs5"><small>Bet #1 · NVIDIA · '+bet.toLocaleDateString([],{month:"short",day:"numeric"})+'</small><b class="bcd">in '+cdn(bet)+'</b><small>The whole pool, long or short, no leverage, on Hyperliquid</small></div>'+
   '<div class="fork"><div class="ocu"><b>Right call</b>Profits buy back $EZ</div><div class="ocd"><b>Wrong call</b>The pool shrinks, or is wiped out</div></div></div>'+
   '<p class="src">Pool read on-chain '+POOL.read+'. Every step is public: the pool wallet, the bet, the buyback.</p></section>'+tokenCard()}
