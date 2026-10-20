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
  var RE=[[/\bpot\b/g,"pool"],[/\bPot\b/g,"Pool"],[/\bPOT\b/g,"POOL"],[/ · NEVER EDITED/g,""],[/, never edited\./g,"."],[/\bNext bet\b/g,"Bet #1"],[/\bNEXT BET\b/g,"BET #1"],[/Longest hit streak/g,"Longest right-way streak"]];
  function fix(root){if(!root||root.nodeType!==1)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;
    while(n=w.nextNode()){var t=n.textContent,u=t;if(!/pot|Pot|POT|NEVER|never edited|ext bet|EXT BET|hit streak/.test(t))continue;
      if(n.parentNode&&/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName))continue;
      RE.forEach(function(p){u=u.replace(p[0],p[1])});if(u!==t)n.textContent=u}}
  fix(document.body);
  if(window.MutationObserver){var busy=false;new MutationObserver(function(ms){if(busy)return;busy=true;
    ms.forEach(function(m){[].forEach.call(m.addedNodes,function(x){if(x.nodeType===1)fix(x);else if(x.nodeType===3&&x.parentNode)fix(x.parentNode)})});busy=false})
    .observe(document.body,{childList:true,subtree:true})}
}catch(e){}})();
/* the $EZ host, the mascot (owner, 2026-10-20: "one on each tab, not more", subtle, never in your face). Small, ink-outlined,
   tucked at the edge of a module that matches what he does; at most one short line, built from the sheet, on two tabs.
   He never covers a number: each sits in space made for him. Placed when a tab renders; nothing on model or round pages. */
(function(){try{
  var $=function(s,r){return (r||document).querySelector(s)},M="media/commissioner/web/";
  function img(f,w,alt){var i=document.createElement("img");i.className="x2p-hz";i.src=M+f;i.alt=alt||"";i.width=w;i.style.width=w+"px";i.loading="lazy";i.decoding="async";return i}
  function say(html){var d=document.createElement("div");d.className="x2p-say";d.innerHTML='<span class="nm">$EZ</span><div class="st">'+html+'</div><i class="tl"></i>';return d}
  function row(cls){var d=document.createElement("div");d.className="x2p-row "+(cls||"");d.setAttribute("data-x2p-host","");return d}
  function nmM(k){var n=(MODELS[k]&&MODELS[k].name)||k;return n.length<=3?n:n.charAt(0)+n.slice(1).toLowerCase()}
  /* the Overview stays in the page (hidden) while a tab shows in #view: look for a host only where this route renders */
  function mine(){var s=route()==="/"?$("#top"):$("#view");return s&&s.querySelector("[data-x2p-host]")}
  var PLACE={
    /* Overview: smug, fixing his cuff, on the chip's corner, beside "Countdown to bet #1" (owner, 2026-10-20: arrogant,
       welcoming the first bet; the watch pose was cut at the side) */
    "/":function(){var cap=$(".x2p-cap"),gi=$("#gpu .gpu-img");if(!cap||!gi)return false;
      /* (owner, 2026-10-20, second pass) the head only, from the first poses: the later busts' heads read as off */
      var h=img("19-head-smirk.webp",78,"");h.classList.add("x2p-hz-watch");h.setAttribute("data-x2p-host","");cap.parentNode.insertBefore(h,cap);return true},
    /* Leaderboard (owner, 2026-10-20): he names the leader as it stands; the rules in three one-line bullets; Hall of fame
       third; three findings. "How we rank" turns the board over to say the rule in full (the metric, when a call is
       graded, ties, the half-the-rounds rule, the freeze); the glossary line under the board moves onto its back. */
    "/leaderboard":function(){var lbx=$("#view .lbx");if(!lbx)return false;var rows=[].slice.call(lbx.querySelectorAll("li.lbr")),top=rows[0];
      var B=["Ranked by how often they call up/down right.","Tie? The smaller average miss wins.","Freezes 24h before NVIDIA. #1 calls it."];
      [].forEach.call(document.querySelectorAll("#view .x2-lbul li"),function(li,i){if(B[i])li.textContent=B[i]});
      var a=top&&top.querySelector(".pc-t a"),nm=a?a.textContent.trim():"",pc=top&&top.querySelector(".lb-c b"),pct=pc?pc.textContent.trim():"";
      var lbn=lbx.nextElementSibling&&lbx.nextElementSibling.classList.contains("lbn")?lbx.nextElementSibling:null;
      var roi=lbn&&/<b>ROI<\/b>:([^<]*)/.exec(lbn.innerHTML);
      var fl=document.createElement("div");fl.className="x2p-flip";
      var bar=document.createElement("div");bar.className="x2p-flipbar";
      bar.innerHTML='<button type="button" class="x2p-flipbtn" aria-expanded="false" aria-controls="x2pHow"><i aria-hidden="true">i</i><span>How we rank</span></button>';
      var fin=document.createElement("div");fin.className="x2p-fin";
      var bk=document.createElement("div");bk.className="x2p-bk";bk.id="x2pHow";bk.setAttribute("inert","");bk.setAttribute("aria-hidden","true");
      bk.innerHTML='<h3>How we rank</h3><ol>'+
        '<li><b>The call.</b> Before a company reports, each AI says up or down, and by how much.</li>'+
        '<li><b>The grade.</b> At the next market close: did the stock move the way it said? Size doesn’t count here.</li>'+
        '<li><b>The rank.</b> Calls right ÷ calls made. Highest goes first'+(nm&&pct?'. Now: <em>'+nm+'</em>, right on '+pct+' of its calls.':'.')+'</li>'+
        '<li><b>Ties.</b> The smaller average miss wins: how many points the call was off the real move.</li>'+
        '<li><b>Skipped rounds.</b> An AI that called fewer than half the rounds ranks after the rest.</li>'+
        '<li><b>The freeze.</b> 24h before NVIDIA reports, the board locks. The AI in first place makes the call on bet #1.</li></ol>'+
        (roi?'<p><b>ROI</b>:'+roi[1]+'</p>':'');
      lbx.parentNode.insertBefore(fl,lbx);fl.appendChild(bar);fl.appendChild(fin);fin.appendChild(lbx);fin.appendChild(bk);if(lbn)lbn.remove();
      var btn=bar.querySelector("button");btn.addEventListener("click",function(){var on=!fl.classList.contains("on");fl.classList.toggle("on",on);
        btn.setAttribute("aria-expanded",on?"true":"false");btn.querySelector("span").textContent=on?"Back to the board":"How we rank";
        if(on){lbx.setAttribute("inert","");lbx.setAttribute("aria-hidden","true");bk.removeAttribute("inert");bk.removeAttribute("aria-hidden")}
        else{bk.setAttribute("inert","");bk.setAttribute("aria-hidden","true");lbx.removeAttribute("inert");lbx.removeAttribute("aria-hidden")}
        fit()});
      /* the card is as tall as the face that shows; the back sits out of flow */
      function fit(){fin.style.minHeight=fl.classList.contains("on")?bk.offsetHeight+"px":""}addEventListener("resize",fit);
      var r=row("x2p-row-r");
      if(nm)r.appendChild(say("As it stands, we follow <em>"+nm+"</em> on our next bet."));
      r.appendChild(img("05-heckle.webp",118,""));fl.after(r);
      var secs=[].slice.call(document.querySelectorAll("#view section.blk")),find=function(re){return secs.filter(function(s){var m=s.querySelector(".mk");return m&&re.test(m.textContent)})[0]};
      var hall=find(/hall of fame/i),grid=find(/one square/i);
      if(hall&&grid&&hall.compareDocumentPosition(grid)&Node.DOCUMENT_POSITION_PRECEDING){grid.parentNode.insertBefore(hall,grid)}
      document.querySelectorAll("#view section.blk").forEach(function(s,i){var n=s.querySelector(".xsh .no, .no");if(n)n.textContent=("0"+(i+2)).slice(-2)});
      [].forEach.call(document.querySelectorAll("#view .fdg"),function(f){var k=f.querySelector("small,span,p");if(k&&/^how big/i.test(k.textContent.trim()))f.remove()});
      return true},
    /* Results: beside the selector, pointing at the rounds (owner, 2026-10-20: he took too much room); the newest
       round's closest call where the screen has room for it */
    "/results":function(){var seg=$("#view .seg.bseg");if(!seg)return false;var box=seg.parentNode;box.classList.add("x2p-segbox");
      var h=img("02-presenter.webp",86,"");h.classList.add("x2p-hz-seg");h.setAttribute("data-x2p-host","");box.appendChild(h);
      var R=ROUNDS[ROUNDS.length-1];if(R&&R.win){var w=R.win.split(" & ").map(nmM).join(" & "),s=say("Round "+R.n+": <em>"+w+"</em> came closest.");s.classList.add("x2p-say-seg");box.appendChild(s)}
      return true},
    /* Upcoming: looking over his shoulder, beside "the calls drop before each report" */
    "/upcoming":function(){var p=$("#view .ufn");if(!p)return false;p.classList.add("x2p-beside");var h=img("11-over-shoulder.webp",86,"");h.classList.add("x2p-hz-side");h.setAttribute("data-x2p-host","");p.appendChild(h);return true},
    /* Buyback: stamping on the top corner of the pool card */
    "/buyback":function(){var pool=$("#view .pool");if(!pool)return false;pool.classList.add("x2p-stamped");var h=img("03-stamping.webp",104,"");h.classList.add("x2p-hz-stamp");h.setAttribute("data-x2p-host","");pool.appendChild(h);return true}
  };
  function route(){var h=location.hash.replace(/^#/,"")||"/";if(h.indexOf("/")!==0)h="/";return h.split("?")[0]}
  var tries=0;
  function place(){var f=PLACE[route()];if(!f||mine())return;if(!f()&&tries++<30)setTimeout(place,100)}
  addEventListener("hashchange",function(){tries=0;setTimeout(place,60)});
  if(document.readyState==="complete")place();else addEventListener("load",place);
  setTimeout(place,300);
}catch(e){}})();
