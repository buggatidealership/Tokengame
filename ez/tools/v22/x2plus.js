/* EZ Live X2+ (owner, 2026-10-19): X2's words, with the decisions of 2026-10-19 on top. Runs after X2 has built the page.
   The first screen explains the concept, not the bet; NVIDIA sits under the chip as bet #1; "pool", not "pot"; the brand
   line drops "never edited" (a call changed after it was shown, 2026-10-14, as on X6). Numbers from ez-data.js (SIM). */
(function(){try{
  var $=function(s,r){return (r||document).querySelector(s)};
  var P=SIM.poolShare!=null?Math.round(SIM.poolShare*100):69;
  /* the first screen: four bullets, one line each from 320 px */
  var T=['4 AIs predict stock moves after earnings.','Every call is posted <b>before the report</b>.',
    'Graded at the <b>next close</b>. Lessons learned.','<b>'+P+'%</b> of trading fees bet on the <b>top AI’s call</b>.'];
  [].forEach.call(document.querySelectorAll(".x2o-lines li"),function(e,i){if(T[i])e.innerHTML=T[i]});
  /* under the chip: what it counts down to, then the risk in one line */
  var g=$("#gpu .gpu-c")||$(".gpu-img");
  if(g&&!$(".x2p-cap")){var c=document.createElement("div");c.className="x2p-cap";c.textContent="Countdown to bet #1 · NVIDIA";
    var r=document.createElement("p");r.className="x2p-risk";r.innerHTML="<b>Right:</b> profits buy back $EZ. <b>Wrong:</b> the pool can be wiped out.";
    g.after(c);c.after(r)}
  var sn=$(".x2o-stn");if(sn)sn.textContent="The model on top of the leaderboard makes the call on bet #1, NVIDIA.";
  /* words, on every route as it renders: pot becomes pool; NVIDIA's bet is the first one; no "never edited" */
  var RE=[[/\bpot\b/g,"pool"],[/\bPot\b/g,"Pool"],[/\bPOT\b/g,"POOL"],[/ · NEVER EDITED/g,""],[/, never edited\./g,"."],[/\bNext bet\b/g,"Bet #1"],[/\bNEXT BET\b/g,"BET #1"]];
  function fix(root){if(!root||root.nodeType!==1)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;
    while(n=w.nextNode()){var t=n.textContent,u=t;if(!/pot|Pot|POT|NEVER|never edited|ext bet|EXT BET/.test(t))continue;
      if(n.parentNode&&/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName))continue;
      RE.forEach(function(p){u=u.replace(p[0],p[1])});if(u!==t)n.textContent=u}}
  fix(document.body);
  if(window.MutationObserver){var busy=false;new MutationObserver(function(ms){if(busy)return;busy=true;
    ms.forEach(function(m){[].forEach.call(m.addedNodes,function(x){if(x.nodeType===1)fix(x);else if(x.nodeType===3&&x.parentNode)fix(x.parentNode)})});busy=false})
    .observe(document.body,{childList:true,subtree:true})}
}catch(e){}})();
