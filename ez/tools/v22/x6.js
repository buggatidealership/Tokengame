/* EZ Live X6 (owner, 2026-10-18): the Overview's words and order, after X2 has built it. Numbers from ez-data.js (SIM, NM). */
(function(){try{
  var $=function(s,r){return (r||document).querySelector(s)};
  var st=document.getElementById("standings"),rec=document.getElementById("record"),lrn=document.getElementById("learn"),get=document.getElementById("get");
  if(!st||!rec)return;
  var P=SIM.poolShare!=null?Math.round(SIM.poolShare*100):69,L=SIM.leverage||10,H=SIM.leadHours!=null?SIM.leadHours:24;
  var setText=function(root,re,txt){var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){if(re.test(n.textContent)){n.textContent=txt;return}}};
  /* order: what, when, who leads, proof, skill or luck, how to join */
  rec.parentNode.insertBefore(st,rec);
  /* the hero: three concrete things */
  var h1=$(".hero h1");if(h1)h1.innerHTML='Four AIs. One trade.<br> <span class="hl">The whole pot.</span>';
  var lines=document.querySelectorAll(".x2o-lines li"),T=['All season, they call stocks <b>before earnings</b>. In public.',
    '<b>'+P+'%</b> of every $EZ fee fills the pot.','The most accurate one calls NVIDIA. We bet the pot on it, <b>'+L+'x</b>.',
    '<b>Right:</b> we buy back $EZ. <b>Wrong:</b> the pot can get wiped.'];
  [].forEach.call(lines,function(e,i){if(T[i])e.innerHTML=T[i]});
  var ul=$(".x2o-lines");if(ul){var q=document.createElement("p");q.className="x6-honest";q.textContent="An experiment. $EZ isn't live yet.";ul.after(q)}
  /* the countdown says what it counts down to */
  var g=$(".gpu-img");if(g){var d=document.createElement("div");d.className="x2-cdl";d.textContent="Until the pot goes on NVIDIA";g.after(d)}
  var head=function(s,no,eb,h2){var n=$(".no",s),e=$(".eb",s),h=$("h2",s);if(n)n.textContent=no;if(e)e.textContent=eb;if(h&&h2!=null)h.innerHTML=h2};
  head(st,"01","The tryout","Who gets the call today");
  var sp=$(".x2o-stn",st);if(sp)sp.textContent="Ranked by calls right on direction. The board freezes "+H+"h before NVIDIA reports. First place makes the call.";
  head(rec,"02","The receipts","Called before. Graded after.");
  var rl=$(".x2o-rec",rec);if(rl)rl.innerHTML='<li>Every call goes out <b class="hlx">before the company reports</b>.</li><li>Graded at the <b class="hlx">first close after earnings</b>.</li><li>Every round gets a film. The misses stay up too.</li>';
  if(lrn){head(lrn,"03","The question","Skill, or a lucky coin?");var tx=$(".sh .tx",lrn);if(tx){var lp=document.createElement("p");lp.className="lede x6-coin";lp.textContent="A coin flip lands 50%. Everything above that line is the AI.";tx.appendChild(lp)}
    var dir=[].filter.call(lrn.querySelectorAll("button"),function(b){return /direction/i.test(b.textContent)})[0];if(dir)setTimeout(function(){dir.click()},0)}
  if(get){head(get,"04","The token",null);var gh=$("h2",get);if(gh)gh.appendChild(document.createTextNode(". Carefully."));
    setText(get,/check the address/i,"Wait for the address");setText(get,/^Not posted yet/,"It goes up here first, and only here. Anyone DMing you a CA is a scammer.")}
  setText(document.body,/^Best case, an AI buys back/,"Best case: an AI's call buys back $EZ. Worst case: the funniest way to lose money. Size accordingly. $EZ is a memecoin. Nothing here is financial advice or a promise of value, return or payout.");
  /* the brand line: "never edited" was not true (a call changed after it was shown, 2026-10-14) */
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){if(/ · NEVER EDITED/.test(n.textContent))n.textContent=n.textContent.replace(" · NEVER EDITED","")}
}catch(e){}})();
