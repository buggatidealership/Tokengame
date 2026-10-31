/* MVP backs with P&L (owner, 2026-10-26): no "Think of it this way"; the headline, the one-line deck and one punch line, then what
   each AI's account made or lost on that call (the same accounts as the P&L tab, so the cards add up to the board). An UP call is a
   long, a DOWN call a short. window.__pm: M1 ledger, M2 the P&L card (as traders screenshot them), M3 won / lost. */
(function(){var P=PNL,opt=window.__pm,MAG={};
  document.querySelectorAll("#x2pHl .x2p-hi").forEach(function(w){var k=(w.querySelector(".x2p-htag")||{}).textContent||"",kind=/bull/i.test(k)?"bull":/tight/i.test(k)?"tight":"big";
    w.querySelectorAll(".card").forEach(function(c){var n=+c.getAttribute("data-n"),r=ROUNDS.filter(function(q){return q.n===n})[0],back=c.querySelector(".x2p-rc");if(!r||!back)return;
      var tk=/^\d/.test(r.ticker)||String(r.ticker).indexOf(".")>-1?r.co.split(" ")[0]:r.ticker;
      var rows=r.calls.map(function(x){var t=P.A[x[0]],p=t.per[n];return {m:x[0],nm:t.nm,dn:p.dn,mg:p.mg,v:p.v,off:+x[2],ok:p.v>0}}).sort(function(a,b){return b.v-a.v});
      var right=rows.filter(function(x){return x.ok}),wrong=rows.filter(function(x){return !x.ok}),star=null;
      if(kind==="bull")star=right.slice().sort(function(a,b){return a.off-b.off})[0];if(kind==="tight")star=right.slice().sort(function(a,b){return a.off-b.off})[0];
      var pun=kind==="big"?(right.length?right.length+" of "+rows.length+" caught it.":"They all got wrecked."):kind==="tight"?"Everyone right. Everyone got paid.":
        (wrong.length?wrong.map(function(x){return x.nm}).join(" and ")+" went "+(wrong[0].dn?"short":"long")+". They paid for it.":"Everyone right. Only "+star.nm+" this close.");
      var hw=back.querySelector(".x2p-hw");if(hw)hw.outerHTML='<p class="pn-pun">'+pun+'</p>';
      var side=function(x){return (x.dn?"Short ":"Long ")+tk+' <i>'+(x.dn?"−":"+")+(Math.round(x.mg*100)/100)+'%</i>'};
      var sum=rows.reduce(function(a,x){return a+x.v},0),html="";
      if(opt==="M1")html='<div class="pn-h"><span>P&amp;L on this call</span><em>Simulated</em></div>'+rows.map(function(x){return '<div class="pn-r '+(x.ok?"ok":"no")+(star&&x.m===star.m?" st":"")+'"><b class="nm">'+x.nm+(star&&x.m===star.m?' <i class="pn-crw">👑</i>':'')+'</b><span class="sd">'+side(x)+'</span><b class="v">'+P.usd(x.v)+'</b></div>'}).join("");
      if(opt==="M2"){var h=kind==="bull"&&star?star:null,big=h?h.v:sum;
        html='<div class="pn-card '+(big>=0?"ok":"no")+'"><div class="pn-ct"><span>'+(h?h.nm+" · "+side(h):"All "+rows.length+" AIs · "+tk)+'</span><em>Simulated</em></div><b class="pn-big">'+P.usd(big)+'</b>'+
          '<div class="pn-cs">'+(h?"Called "+(h.dn?"−":"+")+h.mg+"% · It moved "+(r.a>0?"+":"−")+Math.abs(r.a).toFixed(2)+"%":"Combined P&amp;L · The stock moved "+(r.a>0?"+":"−")+Math.abs(r.a).toFixed(2)+"%")+'</div></div>'+
          '<div class="pn-strip">'+rows.filter(function(x){return !h||x.m!==h.m}).map(function(x){return '<span class="'+(x.ok?"ok":"no")+'">'+x.nm+' <b>'+P.usd(x.v,1)+'</b></span>'}).join("")+'</div>'}
      if(opt==="M3")html='<div class="pn-wl"><div class="ok"><small>Won</small>'+(right.length?right.map(function(x){return '<p><span>'+x.nm+'</span><b>'+P.usd(x.v)+'</b></p>'}).join(""):'<p class="nb">Nobody</p>')+'</div>'+
          '<div class="no"><small>Lost</small>'+(wrong.length?wrong.map(function(x){return '<p><span>'+x.nm+'</span><b>'+P.usd(x.v)+'</b></p>'}).join(""):'<p class="nb">Nobody</p>')+'</div></div>'+
          '<div class="pn-tot"><span>Table P&amp;L</span><b class="'+(sum>=0?"ok":"no")+'">'+P.usd(sum)+'</b><em>Simulated</em></div>';
      var el=document.createElement("div");el.className="pn pn-"+opt;el.innerHTML=html;var hcs=back.querySelector(".x2p-hcs");if(hcs)hcs.replaceWith(el)})})})();
