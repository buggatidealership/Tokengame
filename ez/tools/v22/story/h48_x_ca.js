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
  (POOL?'<div class="h8-capl"><p class="h8-cal">The pool wallet <span>69% of creator fees</span></p>'+
    '<div class="h8-car"><code class="h8-cac" translate="no">'+esc(POOL)+'</code><button type="button" class="h8-cab" data-h8ca="'+esc(POOL)+'">Copy</button></div>'+
    '<p class="h8-cab2"><a class="h8-capw" href="'+esc(PURL)+'" target="_blank" rel="noopener">Watch it fill on Solscan &#8599;</a><span>The 69% split is locked on-chain. Nobody can change it, us included.</span></p></div>':'')+'</div>'}
function mk(h){var t=d.createElement("template");t.innerHTML=h;return t.content.firstChild}
function copy(b){var v=b.getAttribute("data-h8ca"),done=function(){b.textContent="Copied";b.classList.add("h8-on");setTimeout(function(){b.textContent="Copy";b.classList.remove("h8-on")},1600)};
  var sel=function(){var c=b.parentNode.querySelector("code");try{var r=d.createRange();r.selectNodeContents(c);var s=getSelection();s.removeAllRanges();s.addRange(r)}catch(e){}};
  try{navigator.clipboard.writeText(v).then(done,sel)}catch(e){sel()}
  try{W.umami&&umami.track&&umami.track("copy-ca",{where:b.closest("footer")?"footer":"bet"})}catch(e){}}
function all(){var b=d.querySelector("#h48ov .h8-bettx");if(b&&!b.querySelector(".h8-ca"))b.appendChild(mk(plate("ov")));
  var f=d.querySelector("body>footer");if(f&&!f.querySelector(".h8-ca")){var s=f.querySelector("small");f.insertBefore(mk(plate("ft")),s?s.nextSibling:null)}}
d.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest(".h8-cab");if(b)copy(b)});
(W.H48HOOK=W.H48HOOK||[]).push(function(){all()});
var t=0;new MutationObserver(function(){clearTimeout(t);t=setTimeout(all,40)}).observe(H,{childList:true,subtree:true});
if(d.readyState!=="loading")all();else d.addEventListener("DOMContentLoaded",all);
})();
