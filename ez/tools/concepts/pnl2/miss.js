/* Avg miss in the trading-competition voice (owner, 2026-10-26: "a design for average miss that is in line with... the change in
   approach we have in terms of the narrative"). window.__mo: M1 round wins (the closest call takes the round, as on the record's
   Winner line), M2 target hits (where each call landed: within 1%, 1 to 3%, over 3%, wrong way), M3 called vs moved (each call's size
   against the stock's real move; on the line = perfect), M4 the targets kept with three trader stats under each. Numbers from ROUNDS;
   the miss is the sheet's own column (x[2]). */
(function(){var o=window.__mo,R=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)}),MK=["CLAUDE","GROK","GPT","KIMI"],
  NM={CLAUDE:"Claude",GROK:"Grok",GPT:"GPT",KIMI:"Kimi"},COL={CLAUDE:"#d97757",GROK:"#141217",GPT:"#10a37f",KIMI:"#1f6fe0"},S={};
  MK.forEach(function(m){S[m]={n:0,ok:0,w:0,b1:0,b3:0,bx:0,wr:0,bull:0,offR:0,pts:[]}});
  R.forEach(function(r){var best=null;r.calls.forEach(function(x){var m=x[0],dn=/^DOWN/.test(x[1]),mg=parseFloat(x[1].replace(/^(UP|DOWN)\s*/,"")),off=+x[2],ok=(dn?-1:1)*r.a>0,s=S[m];if(!s)return;
    s.n++;s.pts.push([(dn?-1:1)*mg,r.a,ok]);if(ok){s.ok++;s.offR+=off;if(off<=.1)s.bull++;if(off<=1)s.b1++;else if(off<=3)s.b3++;else s.bx++;if(!best||off<best.off)best={off:off,m:[m]};else if(off===best.off)best.m.push(m)}else s.wr++});
    String(r.win||"").split(/\s*&\s*/).forEach(function(m){if(S[m])S[m].w++})});   /* the sheet's own winner (a tie names both) */
  var body=document.querySelector("#learn .x2p-pt .pt-body"),q=document.querySelector("#learn .pt-top"),bt=document.querySelector("#learn .pt-bot"),tab=document.querySelector('#learn [data-pt="miss"]');
  var logo=function(m){var l=document.querySelector('#learn .pt-r .lg[title="'+(m==="GPT"?"ChatGPT":NM[m])+'"]')||document.querySelector('#learn .lg[title*="'+NM[m]+'"]');return l?l.outerHTML:""};
  var set=function(t,top,bot,html){if(tab)tab.textContent=t;q.textContent=q.dataset.t=top;bt.textContent=bt.dataset.t=bot;body.innerHTML=html};
  var rank=function(key){return MK.slice().sort(function(a,b){return key(b)-key(a)})};
  if(o==="M1"){var rk=rank(function(m){return S[m].w}),mx=S[rk[0]].w,tot=R.filter(function(r){return S[String(r.win||"").split(/\s*&\s*/)[0]]}).length;
    set("Round wins","Who got closest, round after round?","The closest right call wins the round",
      '<div class="mo-rw">'+rk.map(function(m,i){var s=S[m];return '<div class="mo-r"><b class="mo-k'+(i?'':' mo-g')+'">'+(i+1)+'</b>'+logo(m)+'<span class="mo-n" style="color:'+COL[m]+'">'+NM[m]+'</span>'+
        '<span class="mo-belts">'+Array.apply(null,{length:s.w}).map(function(){return '<i></i>'}).join("")+'</span><b class="mo-v">'+s.w+'</b></div>'}).join("")+'</div>'+
      '<p class="mo-cp">'+tot+' rounds had a winner. A round goes to the AI whose call landed closest, on the right side. All wrong: nobody wins.</p>')}
  if(o==="M2"){var rk2=rank(function(m){return S[m].b1/S[m].n});
    set("Target hits","How close do their price calls land?","Within 1% · 1 to 3% · over 3% · wrong way",
      '<div class="mo-th"><div class="mo-key"><span><i class="z1"></i>Within 1%</span><span><i class="z3"></i>1 to 3%</span><span><i class="zx"></i>Over 3%</span><span><i class="zw"></i>Wrong way</span></div>'+
      rk2.map(function(m,i){var s=S[m],p=function(v){return (v/s.n*100).toFixed(1)+"%"};return '<div class="mo-r2"><div class="mo-h"><b class="mo-k'+(i?'':' mo-g')+'">'+(i+1)+'</b>'+logo(m)+'<span class="mo-n" style="color:'+COL[m]+'">'+NM[m]+'</span><b class="mo-v">'+s.b1+'<small> of '+s.n+' within 1%</small></b></div>'+
        '<div class="mo-bar"><i class="z1" style="width:'+p(s.b1)+'"></i><i class="z3" style="width:'+p(s.b3)+'"></i><i class="zx" style="width:'+p(s.bx)+'"></i><i class="zw" style="width:'+p(s.wr)+'"></i></div></div>'}).join("")+'</div>'+
      '<p class="mo-cp">One bar per AI, every call it made. Green: landed within 1% of the real move. Red: called the wrong way.</p>')}
  if(o==="M3"){var lim=12,sc=function(v){return 50+Math.max(-lim,Math.min(lim,v))/lim*46};
    set("Called vs moved","Do they know how big the move will be?","On the line = a perfect call",
      '<div class="mo-sc">'+MK.map(function(m){var s=S[m];return '<figure><figcaption>'+logo(m)+'<span class="mo-n" style="color:'+COL[m]+'">'+NM[m]+'</span><small>'+s.ok+' of '+s.n+' right way</small></figcaption>'+
        '<svg viewBox="0 0 100 100"><rect x="50" y="4" width="46" height="46" fill="rgba(47,160,95,.14)"/><rect x="4" y="50" width="46" height="46" fill="rgba(47,160,95,.14)"/><rect x="50" y="50" width="46" height="46" fill="rgba(210,60,45,.1)"/><rect x="4" y="4" width="46" height="46" fill="rgba(210,60,45,.1)"/>'+
        '<path d="M4 96L96 4" stroke="rgba(20,18,23,.55)" stroke-width=".8" stroke-dasharray="3 2"/><path d="M50 4V96M4 50H96" stroke="rgba(20,18,23,.3)" stroke-width=".5"/>'+
        s.pts.map(function(p){return '<circle cx="'+sc(p[0]).toFixed(1)+'" cy="'+(100-sc(p[1])).toFixed(1)+'" r="2.1" fill="'+(p[2]?"#1d7a43":"#b3221b")+'" fill-opacity=".85"/>'}).join("")+'</svg></figure>'}).join("")+'</div>'+
      '<p class="mo-cp">Across: the call. Up: what the stock did (±12%). Green corners: right way. The closer to the dashed line, the closer the call.</p>')}
  if(o==="M4"){var figs=[].slice.call(body.querySelectorAll(".pt-tg figure"));if(tab)tab.textContent="Avg miss";
    figs.forEach(function(f){var nmx=(f.querySelector("figcaption").textContent.match(/Claude|Grok|GPT|Kimi/i)||[""])[0].toUpperCase(),s=S[nmx];if(!s)return;
      f.insertAdjacentHTML("beforeend",'<div class="mo-st"><span><b>'+s.bull+'</b>Bullseyes</span><span><b>'+s.b1+'</b>Within 1%</span><span><b>'+(s.offR/s.ok).toFixed(2)+'%</b>Off when right</span></div>')})}
  document.querySelector("#learn").classList.add("mo-"+o)})();
