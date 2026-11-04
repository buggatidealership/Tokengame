/* launch night, 2026-11-04 (owner: the coin is paired to USDC, "maybe you can put that one under like the token address... it's paired to
   USDC because the bets are going to be placed on Hyperliquid... something simple"): the $EZ contract address on a plate, with a copy
   button, the pump.fun link and the one line on USDC. Shown only once CONFIG.ca holds the address (ez-data.js): under the cliffhanger on the
   Overview, and in the footer on every tab. ?ca=test (or window.__h48CaTest) shows a sample address for mockups. */
(function(){var W=window,d=document,H=d.documentElement;if(!H.classList.contains("h48"))return;
var C=W.CONFIG||{},CA=C.ca||((W.__h48CaTest||/[?&]ca=test/.test(location.search))?"EZtEsT1111111111111111111111111111111pump":"");if(!CA)return;
var BUY=C.buyUrl||("https://pump.fun/coin/"+CA),POOL=C.pool||"",PURL=C.poolUrl||("https://solscan.io/account/"+POOL);
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function plate(k){return '<div class="h8-ca'+(k==="ft"?' h8-caf':' h8-pl')+'" role="group" aria-label="$EZ contract address and pool wallet">'+
  '<p class="h8-cal">$EZ contract address <span>Solana</span></p>'+
  '<div class="h8-car"><code class="h8-cac" translate="no">'+esc(CA)+'</code><button type="button" class="h8-cab" data-h8ca="'+esc(CA)+'">Copy</button></div>'+
  '<p class="h8-cap"><b>Paired with USDC</b>, because the pool&rsquo;s bets are placed on Hyperliquid, in USDC.</p>'+
  '<p class="h8-cab2"><a class="h8-cabuy" href="'+esc(BUY)+'" target="_blank" rel="noopener">Buy on pump.fun</a><span>This is the only address. Check it before you buy.</span></p>'+
  (C.burnTx?'<p class="h8-caburn"><span><b>'+esc(C.burnAmt)+' $EZ burned at launch.</b> 90% of the dev&rsquo;s bag, sent to the burn address. The dev keeps '+esc(C.devPct)+'% of the supply. <a href="'+esc(C.burnTx)+'" target="_blank" rel="noopener">See the transaction &#8599;</a></span></p>':'')+
  (POOL?'<div class="h8-capl"><p class="h8-cal">The pool wallet <span>69% of creator fees</span></p>'+
    '<div class="h8-car"><code class="h8-cac" translate="no">'+esc(POOL)+'</code><button type="button" class="h8-cab" data-h8ca="'+esc(POOL)+'">Copy</button></div>'+
    '<p class="h8-cab2"><a class="h8-capw" href="'+esc(PURL)+'" target="_blank" rel="noopener">Watch it fill on Solscan &#8599;</a><span>The 69% split is locked on-chain. Nobody can change it, us included.</span></p></div>':'')+'</div>'}
function mk(h){var t=d.createElement("template");t.innerHTML=h;return t.content.firstChild}
function copy(b){var v=b.getAttribute("data-h8ca"),done=function(){b.textContent="Copied";b.classList.add("h8-on");setTimeout(function(){b.textContent="Copy";b.classList.remove("h8-on")},1600)};
  var sel=function(){var c=b.parentNode.querySelector("code");try{var r=d.createRange();r.selectNodeContents(c);var s=getSelection();s.removeAllRanges();s.addRange(r)}catch(e){}};
  try{navigator.clipboard.writeText(v).then(done,sel)}catch(e){sel()}
  try{W.umami&&umami.track&&umami.track("copy-ca",{where:b.closest("footer")?"footer":"bet"})}catch(e){}}
/* launch night, 2026-11-04 (owner: "this section has to be redesigned... it has to tell a story... the address and the pool wallet need a
   way better design... you have the permission to lead the redesign"): after the cliffhanger, the launch story in three painted panels in
   the cliff's own canyon (the dev bag, the bag on fire, the pouch left), then where the fees go (the chute pouring 69% into the pool chest
   and 31% into the project's bucket, the pool wallet engraved on a brass plate), then the coin on a ticket. Every number from CONFIG and the
   chain; the art carries no words. Nothing claims the launch buy was planned (it was not). */
/* launch night, 2026-11-04, second pass (owner: "more coherence... we set our bag on fire should be the last thing on the page... eradicate
   the where the fees go entirely... that's where the pool link should be"): one home per idea. The pool lives in the cliffhanger, whose
   line names both halves of the fee (h48_ov.js) and now carries the pool wallet on a brass plate; the bag story closes the episode as a
   post-credits scene after the end card, with the coin on its ticket. Every number from CONFIG and the chain; the art carries no words;
   nothing claims the launch buy was planned (it was not). */
function poolPlate(){var P=C.pool||"";return P?'<div class="h8-ezbr" role="group" aria-label="The pool wallet"><span class="h8-ezbl">The pool wallet &middot; '+Math.round(((W.SIM&&SIM.poolShare)!=null?SIM.poolShare:.69)*100)+'% of creator fees</span><code translate="no">'+esc(P)+'</code>'+
  '<span class="h8-ezba"><button type="button" class="h8-cab" data-h8ca="'+esc(P)+'">Copy</button><a href="'+esc(PURL)+'" target="_blank" rel="noopener">Watch it fill&nbsp;&#8599;</a></span>'+
  '<span class="h8-ezlk">The split is locked on-chain. Nobody can change it, us included.</span></div>':''}
function story(){var burnTx=C.burnTx||"",kept=C.devPct||"6.9",rm=W.matchMedia&&W.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var vid=function(n,poster,cls){return rm?'<img src="'+poster+'" alt="" loading="lazy" decoding="async">':'<video class="'+cls+'" muted loop playsinline autoplay preload="none" poster="'+poster+'"><source src="'+n+'" type="video/mp4"></video>'};
  var panel=function(img,k,h,sm){return '<li class="h8-ezp"><figure class="h8-ezf">'+img+'</figure><div class="h8-ezc"><span class="h8-ezk">'+k+'</span><b>'+h+'</b><span>'+sm+'</span></div></li>'};
  return '<div class="h8-ezx"><div class="h8-bump" aria-hidden="true"><p class="h8-bt"><small>After the credits</small><span data-h8let="7" data-h8amp=".7">We burned our own bag</span></p></div>'+
   '<section class="h8-ezs h8-g" aria-label="After the credits: we burned our own bag"><div class="h8-wrap"><h2 class="h8-sr">After the credits: we burned our own bag</h2>'+
   '<ol class="h8-ezr">'+
    panel('<img src="media/burn-h50-bag.jpg" alt="" loading="lazy" decoding="async">','Launch day','We bought 6.9K of our own coin.','That bought two-thirds of all $EZ.')+
    panel(vid('media/burn-h50-fire.mp4','media/burn-h50-fire.jpg','h8-ezv'),'Then','We set 90% of it on fire.',esc(C.burnAmt||'')+' $EZ to the burn address. Gone for good.'+(burnTx?' <a href="'+esc(burnTx)+'" target="_blank" rel="noopener">See the burn&nbsp;&#8599;</a>':''))+
    panel('<img src="media/burn-h50-pouch.jpg" alt="" loading="lazy" decoding="async">','What&rsquo;s left','We keep '+esc(kept)+'%.','For the culture.')+
   '</ol>'+
   '<div class="h8-eztk" role="group" aria-label="$EZ contract address"><span class="h8-ezts" aria-hidden="true"><b>$EZ</b><small>Solana</small></span>'+
    '<div class="h8-eztm"><span class="h8-ezbl">The coin</span><code translate="no">'+esc(CA)+'</code>'+
    '<span class="h8-ezba"><button type="button" class="h8-cab" data-h8ca="'+esc(CA)+'">Copy</button><a class="h8-ezbuy" href="'+esc(BUY)+'" target="_blank" rel="noopener">Buy on pump.fun</a></span>'+
    '<p>Paired with USDC: the pool&rsquo;s bets are placed on Hyperliquid, in USDC. This is the only address.</p></div></div>'+
  '</div></section></div>'}
function all(){var ov=d.getElementById("h48ov"),tx=ov&&ov.querySelector(".h8-bettx");
  if(tx&&!tx.querySelector(".h8-ezbr")){var pl=mk(poolPlate());if(pl){var tb=tx.querySelector(".h8-tbc");tx.insertBefore(pl,tb||null)}}
  if(ov&&!ov.querySelector(".h8-ezx")){var sx=mk(story());ov.appendChild(sx);try{W.H48UI&&H48UI.letterAll(sx)}catch(e){}}
  var f=d.querySelector("body>footer");if(f&&!f.querySelector(".h8-ca")){var s=f.querySelector("small");f.insertBefore(mk(plate("ft")),s?s.nextSibling:null)}}
d.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest(".h8-cab");if(b)copy(b)});
(W.H48HOOK=W.H48HOOK||[]).push(function(){all()});
var t=0;new MutationObserver(function(){clearTimeout(t);t=setTimeout(all,40)}).observe(H,{childList:true,subtree:true});
if(d.readyState!=="loading")all();else d.addEventListener("DOMContentLoaded",all);
})();
