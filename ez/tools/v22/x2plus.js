/* EZ Live X2+ (owner, 2026-10-19): X2's words, with the decisions of 2026-10-19 on top. Runs after X2 has built the page.
   The first screen explains the concept, not the bet; NVIDIA sits under the chip as bet #1; "pool", not "pot"; the brand
   line drops "never edited" (a call changed after it was shown, 2026-10-14, as on X6). Numbers from ez-data.js (SIM). */
(function(){try{
  var $=function(s,r){return (r||document).querySelector(s)};
  var P=SIM.poolShare!=null?Math.round(SIM.poolShare*100):69;
  /* the first screen (owner, 2026-10-20, after seeing the live site: "keep it more simple"): three bullets, the last one
     splitting into the two outcomes. Replaced the four numbered steps (and the picture pass on them). "Liquidated" is the
     owner's word (crypto-native, and true of a leveraged bet); the pool is 69% of the trading fees, never "of the volume". */
  var ul=$(".x2o-lines");
  if(ul&&!$(".x2p-t3")){
    var t3=document.createElement("div");t3.className="x2p-t3";
    t3.innerHTML='<ul><li><span>4 AIs predict stock moves <b>before earnings</b>.</span></li>'+
      '<li><span>Every call is tracked. We bet our pool on <b>the most accurate AI</b>.</span></li>'+
      '<li><span>The pool: <b>'+P+'% of $EZ trading fees</b>.</span><div class="fan">'+
        '<div class="oc r"><b>▲ Right call</b>Profits buy back $EZ.</div>'+
        '<div class="oc w"><b>▼ Wrong call</b>The pool shrinks or gets liquidated.</div></div></li></ul>';
    ul.parentNode.insertBefore(t3,ul);ul.remove()}
  var g=$("#gpu");
  if(g&&!$(".x2p-cdh")){var c=document.createElement("div");c.className="x2p-cdh";c.innerHTML='<span class="k">Countdown to</span><b>Bet #1<i>:</i> <em>NVIDIA</em></b>';
    g.parentNode.insertBefore(c,g);
    /* the risk sits in the red box above; he stands beside this head (owner, 2026-10-20), so nothing goes under the chip */
  }
  /* following on X (owner, 2026-10-21: followers are the number one goal; "the subtle art of the sell", not a car
     salesman): each prompt sits where X gives something the page can't, the calls before the report and the result the
     moment it lands, and says that, not "follow us"; plus a quiet icon in the header and a line in the footer */
  var XU=CONFIG.x?(/^https?:/.test(CONFIG.x)?CONFIG.x:"https://x.com/"+String(CONFIG.x).replace(/^@/,"")):"";
  if(XU){var XH="@"+XU.replace(/\/+$/,"").split("/").pop(),
    XS='<svg class="x2p-xg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    xa=function(cls,html,label){var a=document.createElement("a");a.className=cls;a.href=XU;a.target="_blank";a.rel="noopener";a.innerHTML=html;if(label)a.setAttribute("aria-label",label);a.addEventListener("click",function(e){e.stopPropagation()});return a};
    var lc=$("#liveChip");if(lc&&!$(".x2p-xhd"))lc.after(xa("x2p-xhd",XS,"Follow $EZ on X, "+XH));
    /* (owner, 2026-10-21) the record section's second bullet, worded as the visitor's job to be done (Christensen): see
       every call before the report without having to come back and check; it replaces the line under the chip */
    var rb=$(".x2o-rec");if(rb&&!$(".x2p-xli")){var li=document.createElement("li");li.className="x2p-xli";
      /* (owner, 2026-10-21) "to your feed on X", the X highlighted as the link; no handle */
      /* (owner, 2026-10-21, later) shorter: "Every call straight to your X feed." */
      li.appendChild(document.createTextNode("Every call straight to your "));li.appendChild(xa("x2p-xlink x2p-xword","X","Follow "+XH+" on X"));li.appendChild(document.createTextNode(" feed."));rb.appendChild(li)}
    /* (owner, 2026-10-21) for now only two: the record bullet and the header icon; the card and footer links are off */
  }
  /* the record cards as graded slabs (owner, 2026-10-21): each face gets the PSA-style label; the grade is how many AIs
     called the direction (from the sheet); a perfect round gets the black label (and, by CSS, the holo stats side) */
  var MO=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],md=function(s){var m=String(s).match(/(\d+)\/(\d+)\/(\d+)/);return m?{t:MO[+m[1]]+" "+(+m[2]),y:2000+(+m[3])}:{t:"",y:""}};
  window.__x2pSlab=function(root){[].forEach.call((root||document).querySelectorAll("#record .card[data-n]"),function(c){if(c.querySelector(".fx"))return;
    var n=+c.getAttribute("data-n"),g=null,q=null,i;for(i=0;i<ROUNDS.length;i++)if(ROUNDS[i].n===n)g=ROUNDS[i];if(!g)for(i=0;i<PENDING.length;i++)if(PENDING[i].n===n)q=PENDING[i];var u=null;if(!g&&!q)for(i=0;i<UPCOMING.length;i++)if(UPCOMING[i].n===n)u=UPCOMING[i];
    var r=g||q||u;if(!r)return;var hit=g?g.calls.filter(function(x){return (x[1].indexOf("DOWN")<0)===(g.a>0)}).length:0,nc=g?g.calls.length:0,d=md(r.called);
    /* the EZ grade, rubric v1 (owner, 2026-10-21): direction sets the band and the word (all right 8-10 Perfect, most 6-7.5 Strong, half 4-5.5 Split,
       some 2-3.5 Rough, none 1 Rekt); closeness of the AIs that called the direction moves it up the band; a 10 (gold label, foil) = all right,
       average miss 1.5% or less and under half the move (else 9.5); Pristine = a 10 under 1% */
    var gr=0,ds="",why="",pr=false;if(g){var rw=g.calls.filter(function(x){return (x[1].indexOf("DOWN")<0)===(g.a>0)}).map(function(x){return +x[2]}),f=hit/nc,
      av=rw.length?rw.reduce(function(a,b){return a+b},0)/rw.length:0,mv=Math.abs(g.a),pt=av<=1.5?2:av<=2?1.5:av<=2.5?1:av<=3?.5:0;
      /* half points (owner, 2026-10-21, later): closeness adds 0 to 2 in steps of .5 (1.5% or less: 2, 2%: 1.5, 2.5%: 1, 3%: .5); below "all right" a band tops out at .5 under the next */
      if(f===1){gr=8+pt;if(gr===10&&!(av<mv/2))gr=9.5;ds=gr===10?((pr=av<1)?"Pristine":"Gem"):"Perfect"}else if(f>=.66){gr=6+Math.min(pt,1.5);ds="Strong"}else if(f>=.5){gr=4+Math.min(pt,1.5);ds="Split"}else if(f>0){gr=2+Math.min(pt,1.5);ds="Rough"}else{gr=1;ds="Rekt"}
      why=hit===0?"0 of "+nc+" right":hit+" of "+nc+" right \u00b7 "+av.toFixed(2)+"% off on avg"}
    var h='<div class="zlab"><div class="zl"><span class="y">'+d.y+' <span class="s">$</span><span class="e">E</span><span class="z">Z</span> Season 1</span><span class="nm"><b>'+esc2(r.co)+'</b>'+(r.ticker?' <small>('+esc2(r.ticker)+')</small>':'')+'</span><span class="zb"><i></i>'+String(n).padStart(8,"0")+'<span class="holo"><i class="s">$</i><i class="e">E</i><i class="z">Z</i></span></span></div>'+
      '<div class="zr"><span class="no">#'+n+'</span>'+(g?'<span class="ds">'+ds+'</span><span class="gr">'+gr+'</span>':(q?'<span class="ds">At grading</span><span class="gr">'+md(r.resolves).t.toUpperCase()+'</span>':'<span class="ds">Calls due</span><span class="gr">'+md(r.called).t.toUpperCase()+'</span>'))+'</div>'+
      '</div>';
    [].forEach.call(c.querySelectorAll(".face"),function(f){var o=document.createElement("div");o.className="fx"+(gr===10?" perfect":"")+(pr?" pristine":"");o.setAttribute("aria-hidden","true");o.innerHTML=h;f.appendChild(o);
      /* the back says why, in one line, where the barcode sits on the front */
      if(g&&f.classList.contains("back")){var zb=o.querySelector(".zb");zb.className="zb zwhy";zb.textContent=why}
      /* (owner, 2026-10-21) a 10 gets the rolling foil on both faces (owner: it should not vanish when the card flips): rainbow bands that roll across without end; a sibling of .fx so it lights the film too */
      if(gr===10){var fl=document.createElement("i");fl.className="x2p-foil";fl.setAttribute("aria-hidden","true");fl.appendChild(document.createElement("i"));f.appendChild(fl);foilFit(f);if(FRO)FRO.observe(f)}});if(window.__x2pNmFit)window.__x2pNmFit();
    var lab=(g?ds+" "+gr+" of 10, "+why.replace(" \u00b7",",").replace("off on avg","off on average"):q?"calls in, graded "+md(r.resolves).t:"calls due "+md(r.called).t);c.setAttribute("aria-label",(c.getAttribute("aria-label")||"")+". Grade: "+lab+".")})};
  /* (owner, 2026-10-21, later) the foil stays light over the film: the mask needs the film's top and bottom inside the face */
  function foilFit(f){var fl=f.querySelector(".x2p-foil"),a=f.querySelector(f.classList.contains("back")?".fin":".art");if(!fl||!a||!a.offsetHeight)return;var t=0,e=a;while(e&&e!==f){t+=e.offsetTop;e=e.offsetParent}
    fl.style.setProperty("--at",t+"px");fl.style.setProperty("--ab",(t+a.offsetHeight)+"px")}
  var FRO=window.ResizeObserver?new ResizeObserver(function(es){es.forEach(function(x){foilFit(x.target)})}):null;
  function esc2(t){return String(t).replace(/[&<>"]/g,function(x){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[x]})}
  window.__x2pSlab(document);
  /* the name and its ticker fit the label: a long name steps down from 15px until it fits (never below 10px), on load, resize and tab change */
  function nmFit(){[].forEach.call(document.querySelectorAll("#record .fx .zl .nm"),function(el){var b=el.firstChild;if(!b||!el.offsetWidth)return;el.style.fontSize="";var z=parseFloat(getComputedStyle(el).fontSize);while(b.scrollWidth>b.clientWidth+.5&&z>10){z-=.5;el.style.fontSize=z+"px"}})}
  var nmT;function nmLater(){clearTimeout(nmT);nmT=setTimeout(nmFit,120)}nmFit();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(nmFit);window.addEventListener("resize",nmLater);window.addEventListener("hashchange",nmLater);window.__x2pNmFit=nmLater;
  /* the record section's first two bullets said what steps 1 and 2 now say: keep only the dare */
  var rec=$(".x2o-rec"),own=rec?[].filter.call(rec.children,function(c){return !c.classList.contains("x2p-xli")}):[];if(own.length===3){own[0].remove();own[1].remove()}
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
    ms.forEach(function(m){[].forEach.call(m.addedNodes,function(x){if(x.nodeType===1){fix(x);if(window.__x2pSlab)window.__x2pSlab(x.closest&&x.closest("#record")?x.closest("#record"):x)}else if(x.nodeType===3&&x.parentNode)fix(x.parentNode)})});busy=false})
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
    "/":function(){var cd=$(".x2p-cdh");if(!cd)return false;
      /* (owner, 2026-10-20) beside "Countdown to Bet #1: NVIDIA", not under the chip, where he served no purpose */
      var h=img("01-welcome.webp",96,"");h.classList.add("x2p-hz-cd");h.setAttribute("data-x2p-host","");cd.appendChild(h);return true},
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
      /* the two rules are behind the ⓘ now (owner, 2026-10-20: no repetition); under the board only his line */
      var ft=document.createElement("div");ft.className="x2p-lbfoot";if(ul)ul.remove();ft.appendChild(r);fl.after(ft)
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
      [].forEach.call(document.querySelectorAll("#view a.hx2"),function(h){var k=h.querySelector(".hx2-k");if(k&&/everyone was wrong/i.test(k.textContent)){var li=h.closest("li");(li||h).remove()}
        /* (owner, 2026-10-20) compact rows, so the graded rounds and the first ticket show on landing: the label moves
           beside the title, one number stays; the sentence is on the round's own card */
        else if(k){var t=h.querySelector(".hx2-t");if(t)t.insertBefore(k,t.firstChild)}});
      var hs=$("#view .hx2s"),hsec=hs&&hs.closest("section");if(hsec)hsec.classList.add("x2p-hl-sec");
      [].forEach.call(document.querySelectorAll("#view .xsh h2 .mk"),function(m){if(!/^every round$/i.test(m.textContent.trim()))return;m.textContent="Every graded round";
        var p=m.closest(".xsh-t");p=p&&p.querySelector("p");if(p)p.textContent="Every W and every L. Newest first."});
      var h=img("02-presenter.webp",86,"");h.classList.add("x2p-hz-seg");h.setAttribute("data-x2p-host","");box.appendChild(h);
      var R=ROUNDS[ROUNDS.length-1];if(R&&R.win){var w=R.win.split(" & ").map(nmM).join(" & "),s=say("Round "+R.n+": <em>"+w+"</em> came closest.");s.classList.add("x2p-say-seg");box.appendChild(s)}
      return true},
    /* Upcoming: looking over his shoulder, beside "the calls drop before each report" */
    "/upcoming":function(){var p=$("#view .ufn");if(!p)return false;
      /* (owner, 2026-10-21) only two follow prompts for now: X2's "Follow on X to see them first" comes off this line */
      if(/Follow on X/.test(p.textContent))p.textContent="The calls drop before each report.";p.classList.add("x2p-beside");var h=img("11-over-shoulder.webp",86,"");h.classList.add("x2p-hz-side");h.setAttribute("data-x2p-host","");p.appendChild(h);return true},
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
      var bill=function(x,y,r,ch){return '<g transform="translate('+x+' '+y+') rotate('+r+')"><rect x="-34" y="-15" width="68" height="30" rx="1.5" fill="#d9e6cf" stroke="#1d2a1d" stroke-width="2"/>'+
          '<rect x="-30" y="-11" width="60" height="22" fill="none" stroke="#5f7d5a" stroke-width="1.2"/><path d="M-30 -6h60M-30 6h60" stroke="#a9c09f" stroke-width=".8"/>'+
          '<ellipse cx="0" cy="0" rx="9" ry="10" fill="#c2d6b6" stroke="#4d6b48" stroke-width="1.2"/><text x="0" y="4" text-anchor="middle" font-family="Georgia,serif" font-size="11" font-weight="700" fill="#2f4a2b">$</text>'+
          '<text x="-26" y="-3" font-family="Georgia,serif" font-size="7" font-weight="700" fill="#3d5a38">100</text><text x="14" y="10" font-family="Georgia,serif" font-size="7" font-weight="700" fill="#3d5a38">100</text>'+
          (ch?'<path d="M-34 -15h68v9c-8 4-14-3-22 2s-15-4-22 1-12-2-24 3z" fill="#3b2a1a" opacity=".85"/><path d="M-34 -15h68v4c-9 3-14-2-22 1s-15-3-22 0-12-1-24 2z" fill="#140c06"/>':'')+'</g>'};
      var fire='<svg class="x2p-prop x2p-fire" viewBox="0 0 140 130" aria-hidden="true">'+
        '<g class="x2p-fl"><path d="M70 6c12 24 40 34 35 70-4 27-26 38-35 38s-34-10-36-37c-2-25 14-31 16-49 10 11 9 25 15 27 5-16-5-32 5-49z" fill="#ff7a1a" stroke="#000" stroke-width="3.5" stroke-linejoin="round"/>'+
        '<path d="M71 46c6 14 19 21 16 39-2 13-10 20-17 20s-16-7-17-19c-1-12 7-16 9-25 6 7 5 14 8 15 2-9-2-18 1-30z" fill="#ffd23f"/></g>'+
        bill(52,104,-9,0)+bill(90,108,8,0)+bill(70,96,-2,1)+'</svg>';
      var sec=document.createElement("section");sec.className="x2p-how";sec.setAttribute("aria-labelledby","x2pHowH");
      sec.innerHTML='<div class="x2p-kick">How the buyback works</div><h2 id="x2pHowH" class="x2p-h2">One call. <em>The whole pool.</em></h2><div class="x2p-manga">'+
        '<div class="x2p-pn x2p-p1 x2p-sl"><span class="x2p-no">1 · The pool</span><div class="x2p-u"><div><div class="x2p-big">'+P+'%</div><p>of every $EZ trading fee drops into the pool.</p><p class="x2p-s">It starts at $0 on launch day.</p></div>'+pot+'</div></div>'+
        '<div class="x2p-pn x2p-p2 x2p-sl"><span class="x2p-no">2 · The pick</span><div class="x2p-u"><div class="x2p-myst" aria-hidden="true">?<i>#1</i></div><div class="x2p-ud" aria-hidden="true"><span class="x2p-up">▲ Up</span><span class="x2p-dn">▼ Down</span><small>One call. No take-backs.</small></div></div><p>'+H+'h before each bet, the board freezes. The AI on top makes the pick.</p></div>'+
        '<div class="x2p-pn x2p-p3 x2p-wide"><span class="x2p-no">3 · The bet</span><div class="x2p-u"><div class="x2p-ten">'+L+'x<small>on Hyperliquid</small></div><div><p>The whole pool goes on that call, right before the company reports.</p><p class="x2p-s">When the stock moves 1%, the pool moves about '+L+'%.</p></div></div>'+
          '<ol class="x2p-seasons"><li class="on"><b>Season 1</b><span>One bet: NVIDIA</span></li><li><b>Then</b><span>The pool fills up again</span></li><li><b>Season 2</b><span>Mag 7 + more</span></li></ol></div>'+
        '<div class="x2p-pn x2p-p4 x2p-wide"><div class="x2p-u">'+
          '<div class="x2p-end x2p-ev"><div class="x2p-cast"><img class="x2p-hz" data-x2p-host src="'+M+'03-stamping.webp" alt="" width="104" decoding="async">'+coins+'</div><div><h4>▲ Right call</h4><p>The profit buys back $EZ on the open market.</p></div></div>'+
          '<div class="x2p-end x2p-ed"><div class="x2p-cast"><img class="x2p-hz" src="'+M+'07-sweat.webp" alt="" width="104" decoding="async">'+fire+'</div><div><h4>▼ Wrong call</h4><p>No stop loss. The pool can be wiped out.</p></div></div>'+
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
