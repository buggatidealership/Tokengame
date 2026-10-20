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
      RE.forEach(function(p){u=u.replace(p[0],p[1])});if(u!==t)n.textContent=u}
    var w2=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),m,hit=[];while(m=w2.nextNode())if(/\bAIs\b/.test(m.textContent)&&m.parentNode&&m.parentNode.nodeType===1&&!m.parentNode.closest("script,style,.x2p-lc"))hit.push(m);
    hit.forEach(function(n){if(getComputedStyle(n.parentNode).textTransform!=="uppercase")return;var f=document.createDocumentFragment();
      n.textContent.split(/(\bAIs\b)/).forEach(function(x){if(x==="AIs"){f.appendChild(document.createTextNode("AI"));var sp=document.createElement("span");sp.className="x2p-lc";sp.textContent="s";f.appendChild(sp)}else if(x)f.appendChild(document.createTextNode(x))});
      n.parentNode.replaceChild(f,n)})}
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
    /* Overview: beside "Countdown to bet #1", pointing at you, welcoming the first bet (owner, 2026-10-20: arrogant; the
       watch pose was cut at the side, the 13 to 18 busts' heads read as off, the head alone did not work) */
    "/":function(){var cap=$(".x2p-cap"),gi=$("#gpu .gpu-img");if(!cap||!gi)return false;
      var h=img("01-welcome.webp",96,"");h.classList.add("x2p-hz-watch");h.setAttribute("data-x2p-host","");cap.parentNode.insertBefore(h,cap);return true},
    /* Leaderboard (owner, 2026-10-20, second pass): the head with a small "How we rank" beside it; he names the leader
       above the board; the board turns over to the rule in full, at the board's own size; the three rules sit under it.
       Hall of fame third; three findings. The glossary line under the board moves onto its back. */
    "/leaderboard":function(){var lbx=$("#view .lbx");if(!lbx)return false;var rows=[].slice.call(lbx.querySelectorAll("li.lbr")),top=rows[0];
      var xsh=lbx.parentNode.querySelector(".xsh"),h1=xsh&&xsh.querySelector("h1"),ul=xsh&&xsh.querySelector(".x2-lbul");
      /* (owner, 2026-10-20, third pass) one rule on the front; the rest is behind "How we rank", kept plain */
      /* (owner, 2026-10-20, fourth pass) two rules under the board, beside him; the rest is behind "How we rank" */
      var B=["Ranked by how often they get the direction right.","Tie? The smaller average miss wins."];
      if(ul)[].forEach.call(ul.querySelectorAll("li"),function(li,i){if(B[i])li.textContent=B[i];else li.remove()});
      var a=top&&top.querySelector(".pc-t a"),nm=a?a.textContent.trim():"",pc=top&&top.querySelector(".lb-c b"),pct=pc?pc.textContent.trim():"";
      var lbn=lbx.nextElementSibling&&lbx.nextElementSibling.classList.contains("lbn")?lbx.nextElementSibling:null;
      var roi=lbn&&/<b>ROI<\/b>:([^<]*)/.exec(lbn.innerHTML);
      var fl=document.createElement("div");fl.className="x2p-flip";
      var btn=document.createElement("button");btn.type="button";btn.className="x2p-flipbtn";btn.setAttribute("aria-expanded","false");btn.setAttribute("aria-controls","x2pHow");
      btn.innerHTML='<i aria-hidden="true">i</i><span>How we rank</span>';
      if(h1){var hd=document.createElement("div");hd.className="x2p-lbhead";h1.parentNode.insertBefore(hd,h1);hd.appendChild(h1);hd.appendChild(btn)}
      var fin=document.createElement("div");fin.className="x2p-fin";
      var bk=document.createElement("div");bk.className="x2p-bk";bk.id="x2pHow";bk.setAttribute("inert","");bk.setAttribute("aria-hidden","true");bk.tabIndex=-1;
      bk.innerHTML='<h3>How we rank</h3><p class="x2p-why">Why it matters: <b>#1 makes the call</b> on the next bet.</p><ol>'+
        '<li>Ranked by how often they get the direction right.</li>'+
        '<li>Tie? The smaller average miss wins.</li>'+
        '<li>Every call is made before the company reports and graded at the next market close.</li>'+
        '<li>Called fewer than half the rounds? Ranked after the rest.</li>'+
        '<li>The board freezes 24h before each bet.</li></ol>'+
        (roi?'<p class="x2p-roi"><b>ROI</b>:'+roi[1]+'</p>':'');
      lbx.parentNode.insertBefore(fl,lbx);fl.appendChild(fin);fin.appendChild(lbx);fin.appendChild(bk);if(lbn)lbn.remove();
      btn.addEventListener("click",function(){var on=!fl.classList.contains("on");fl.classList.toggle("on",on);
        btn.setAttribute("aria-expanded",on?"true":"false");btn.querySelector("span").textContent=on?"Back to the board":"How we rank";btn.querySelector("i").textContent=on?"×":"i";
        if(on){lbx.setAttribute("inert","");lbx.setAttribute("aria-hidden","true");bk.removeAttribute("inert");bk.removeAttribute("aria-hidden")}
        else{bk.setAttribute("inert","");bk.setAttribute("aria-hidden","true");lbx.removeAttribute("inert");lbx.removeAttribute("aria-hidden")}});
      var r=row("x2p-row-r x2p-row-foot");
      if(nm)r.appendChild(say("As it stands, we follow <em>"+nm+"</em> on our next bet."));
      r.appendChild(img("05-heckle.webp",78,""));
      var ft=document.createElement("div");ft.className="x2p-lbfoot";if(ul){ul.classList.add("x2p-lbrules");ft.appendChild(ul)}ft.appendChild(r);fl.after(ft)
      var secs=[].slice.call(document.querySelectorAll("#view section.blk")),find=function(re){return secs.filter(function(s){var m=s.querySelector(".mk");return m&&re.test(m.textContent)})[0]};
      var hall=find(/hall of fame/i),grid=find(/one square/i);
      if(hall&&grid&&hall.compareDocumentPosition(grid)&Node.DOCUMENT_POSITION_PRECEDING){grid.parentNode.insertBefore(hall,grid)}
      document.querySelectorAll("#view section.blk").forEach(function(s,i){var n=s.querySelector(".xsh .no, .no");if(n)n.textContent=("0"+(i+2)).slice(-2)});
      /* Unusual findings (owner, 2026-10-20: too much text, too big, give a reason to care): each one becomes a small tile,
         a question a trader would ask, then the numbers with one dot per call or round, like a betting app's hit-rate card */
      var HOOK=[[/agree/i,"Follow the crowd?"],[/up calls|down calls/i,"Bulls or bears?"]];
      [].forEach.call(document.querySelectorAll("#view .fdg"),function(f){var k=f.querySelector(".fdg-k"),kt=k?k.textContent.trim():"";
        if(/^how big/i.test(kt)){f.remove();return}
        var h3=f.querySelector("h3"),hk=HOOK.filter(function(q){return q[0].test(kt)})[0],hook=hk?hk[1]:(h3?h3.textContent.trim():kt),fun=f.classList.contains("fun");
        var rows=[].map.call(f.querySelectorAll(".fdg-s span"),function(sp){var b=sp.querySelector("b"),sm=sp.querySelector("small"),t=b?b.textContent.trim():"",m=/(\d+)\s*(?:of|in)\s*(\d+)/i.exec(t),d="";
          if(m&&+m[2]<=40)for(var i=0;i<+m[2];i++)d+='<i'+(i<+m[1]?' class="on"':'')+'></i>';
          return '<div class="x2p-fr"><b>'+t+'</b>'+(d?'<span class="x2p-dots" aria-hidden="true">'+d+'</span>':'')+'<small>'+(sm?sm.textContent.trim():'')+'</small></div>'});
        if(!rows.length)return;
        f.innerHTML=(fun?'<span class="x2p-fk">Just for fun</span>':'')+'<h3>'+hook+'</h3>'+rows.join('');f.classList.add("x2p-ft")});
      var fs=find(/unusual findings/i),fp=fs&&fs.querySelector(".xsh-t p");if(fp)fp.textContent="Patterns so far. Small samples, so they can flip. Not advice.";
      return true},
    /* Results: beside the selector, pointing at the rounds (owner, 2026-10-20: he took too much room); the newest
       round's closest call where the screen has room for it */
    "/results":function(){var seg=$("#view .seg.bseg");if(!seg)return false;var box=seg.parentNode;box.classList.add("x2p-segbox");
      /* Highlights: no "Everyone was wrong" card (owner, 2026-10-20: no need for it) */
      [].forEach.call(document.querySelectorAll("#view a.hx2"),function(h){var k=h.querySelector(".hx2-k");if(k&&/everyone was wrong/i.test(k.textContent)){var li=h.closest("li");(li||h).remove()}});
      var h=img("02-presenter.webp",86,"");h.classList.add("x2p-hz-seg");h.setAttribute("data-x2p-host","");box.appendChild(h);
      var R=ROUNDS[ROUNDS.length-1];if(R&&R.win){var w=R.win.split(" & ").map(nmM).join(" & "),s=say("Round "+R.n+": <em>"+w+"</em> came closest.");s.classList.add("x2p-say-seg");box.appendChild(s)}
      return true},
    /* Upcoming: looking over his shoulder, beside "the calls drop before each report" */
    "/upcoming":function(){var p=$("#view .ufn");if(!p)return false;p.classList.add("x2p-beside");var h=img("11-over-shoulder.webp",86,"");h.classList.add("x2p-hz-side");h.setAttribute("data-x2p-host","");p.appendChild(h);return true},
    /* Buyback: stamping on the top corner of the pool card */
    "/buyback":function(){var pool=$("#view .pool");if(!pool)return false;
      /* (owner, 2026-10-20) no "Buyback" title: the tab already says it; kept for screen readers and focus */
      var h1=$("#view h1");if(h1)h1.classList.add("x2p-sr");
      /* How the buyback works, X7's four cel panels (owner, 2026-10-20), about every bet: Season 1 is one bet, NVIDIA, then
         the pool fills for the next; Season 2 brings more bets. They say what the paragraph under the head said, so it goes.
         The host stands beside right call (buying back $EZ) and wrong call (burning the cash, calm about it). */
      var sub=$("#view p.sub"),P=SIM.poolShare!=null?Math.round(SIM.poolShare*100):69,L=SIM.leverage||5,H=SIM.leadHours||24;
      var pot='<svg class="x2p-pot" viewBox="0 0 200 210" aria-hidden="true"><g class="x2p-cn"><ellipse cx="100" cy="40" rx="13" ry="6" fill="#f2b632" stroke="#000" stroke-width="3"/></g><g class="x2p-cn"><ellipse cx="84" cy="30" rx="13" ry="6" fill="#f2b632" stroke="#000" stroke-width="3"/></g><g class="x2p-cn"><ellipse cx="116" cy="34" rx="13" ry="6" fill="#f2b632" stroke="#000" stroke-width="3"/></g>'+
        '<path d="M42 112h116c4 44-22 86-58 86s-62-42-58-86z" fill="#2d2a38" stroke="#000" stroke-width="4"/><path d="M112 112h46c4 44-22 86-58 86 30-10 15-52 12-86z" fill="#1b1924"/>'+
        '<g stroke="#000" stroke-width="2.6" fill="#f2b632"><ellipse cx="70" cy="104" rx="15" ry="7"/><ellipse cx="100" cy="98" rx="15" ry="7"/><ellipse cx="128" cy="104" rx="15" ry="7"/><ellipse cx="86" cy="92" rx="15" ry="7"/><ellipse cx="115" cy="90" rx="15" ry="7"/><ellipse cx="100" cy="82" rx="15" ry="7"/></g>'+
        '<rect x="30" y="106" width="140" height="16" rx="4" fill="#3d3a4a" stroke="#000" stroke-width="4"/><path d="M30 122q-14 6-12 20" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/><path d="M170 122q14 6 12 20" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/>'+
        '<g transform="rotate(-6 100 156)"><rect x="62" y="140" width="76" height="30" fill="#f3e6c8" stroke="#000" stroke-width="3"/><rect x="65" y="140" width="4" height="30" fill="#11714a"/><rect x="131" y="140" width="4" height="30" fill="#b3261e"/><text x="100" y="163" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="20" fill="#000">POOL</text></g></svg>';
      /* props drawn in the cel style: $EZ tokens going up; a pile of cash on fire */
      var coins='<svg class="x2p-prop x2p-coins" viewBox="0 0 90 110" aria-hidden="true">'+[[45,80,0],[24,52,.5],[62,30,1]].map(function(c){return '<g class="x2p-tok" style="animation-delay:'+c[2]+'s"><circle cx="'+c[0]+'" cy="'+c[1]+'" r="17" fill="#f2b632" stroke="#000" stroke-width="3"/><circle cx="'+c[0]+'" cy="'+c[1]+'" r="11.5" fill="none" stroke="#b9800f" stroke-width="2"/><text x="'+c[0]+'" y="'+(c[1]+4.5)+'" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="11" fill="#000">$EZ</text></g>'}).join('')+'</svg>';
      var fire='<svg class="x2p-prop x2p-fire" viewBox="0 0 110 120" aria-hidden="true">'+
        '<g class="x2p-fl"><path d="M55 8c10 22 34 30 30 62-3 24-22 34-30 34s-29-9-31-33c-2-22 12-28 14-44 9 10 8 22 13 24 4-14-4-28 4-43z" fill="#ff7a1a" stroke="#000" stroke-width="3.5" stroke-linejoin="round"/>'+
        '<path d="M56 44c5 12 16 18 14 34-2 12-9 18-15 18s-14-6-15-17c-1-10 6-14 8-22 5 6 4 12 7 13 2-8-2-16 1-26z" fill="#ffd23f"/></g>'+
        '<g stroke="#000" stroke-width="3" stroke-linejoin="round"><rect x="10" y="88" width="56" height="22" rx="2" fill="#4fae6b" transform="rotate(-8 38 99)"/><rect x="44" y="90" width="56" height="22" rx="2" fill="#3f9a5a" transform="rotate(7 72 101)"/><rect x="26" y="96" width="58" height="20" rx="2" fill="#5cbf78"/></g>'+
        '<text x="55" y="111" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="15" fill="#0b3b1e">$</text></svg>';
      var sec=document.createElement("section");sec.className="x2p-how";sec.setAttribute("aria-labelledby","x2pHowH");
      sec.innerHTML='<div class="x2p-kick">How the buyback works</div><h2 id="x2pHowH" class="x2p-h2">One call. <em>The whole pool.</em></h2><div class="x2p-manga">'+
        '<div class="x2p-pn x2p-p1 x2p-sl"><span class="x2p-no">1 · The pool</span><div class="x2p-u"><div><div class="x2p-big">'+P+'%</div><p>of every $EZ trading fee drops into the pool.</p><p class="x2p-s">It starts at $0 on launch day.</p></div>'+pot+'</div></div>'+
        '<div class="x2p-pn x2p-p2 x2p-sl"><span class="x2p-no">2 · The pick</span><div class="x2p-u"><div class="x2p-myst" aria-hidden="true">?<i>#1</i></div><div class="x2p-ud" aria-hidden="true"><span class="x2p-up">▲ Up</span><span class="x2p-dn">▼ Down</span><small>One call. No take-backs.</small></div></div><p>'+H+'h before each bet, the board freezes. The AI on top makes the pick.</p></div>'+
        '<div class="x2p-pn x2p-p3 x2p-wide"><span class="x2p-no">3 · The bet</span><div class="x2p-u"><div class="x2p-ten">'+L+'x<small>on Hyperliquid</small></div><div><p>The whole pool goes on that call, right before the company reports.</p><p class="x2p-s">When the stock moves 1%, the pool moves about '+L+'%.</p></div></div>'+
          '<ol class="x2p-seasons"><li class="on"><b>Season 1</b><span>One bet: NVIDIA</span></li><li><b>Then</b><span>The pool fills up again</span></li><li><b>Season 2</b><span>Mag 7 + more</span></li></ol></div>'+
        '<div class="x2p-pn x2p-p4 x2p-wide"><div class="x2p-u">'+
          '<div class="x2p-end x2p-ev"><div class="x2p-cast"><img class="x2p-hz" data-x2p-host src="'+M+'06-cheer.webp" alt="" width="104" loading="lazy" decoding="async">'+coins+'</div><div><h4>▲ Right call</h4><p>The profit buys back $EZ on the open market.</p></div></div>'+
          '<div class="x2p-end x2p-ed"><div class="x2p-cast"><img class="x2p-hz" src="'+M+'07-sweat.webp" alt="" width="104" loading="lazy" decoding="async">'+fire+'</div><div><h4>▼ Wrong call</h4><p>No stop loss. The pool can be wiped out.</p></div></div>'+
        '</div></div></div>';
      var at=sub||pool;at.parentNode.insertBefore(sec,at);if(sub)sub.remove();
      /* "How big could the bag get?" comes off for now (owner, 2026-10-20) */
      var calc=$("#view #bbCalc");if(calc)calc.remove();
      return true}
  };
  function route(){var h=location.hash.replace(/^#/,"")||"/";if(h.indexOf("/")!==0)h="/";return h.split("?")[0]}
  var tries=0;
  function place(){var f=PLACE[route()];if(!f||mine())return;if(!f()&&tries++<30)setTimeout(place,100)}
  addEventListener("hashchange",function(){tries=0;setTimeout(place,60)});
  if(document.readyState==="complete")place();else addEventListener("load",place);
  setTimeout(place,300);
}catch(e){}})();
