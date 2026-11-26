/* MVP backs, money (owner, 2026-10-26: replace the four call chips at the bottom with "how much money it made on the call or lost").
   window.__mm picks the option: A $1,000 a call at the bet's leverage (SIM.leverage, 5x), 2x2 like today; B the same as four rows;
   C $1,000 a call, no leverage (the ROI tab's rules); D each AI's $100,000 running balance from the ROI tab. Money follows direction
   only (as the ROI tab does): every AI that got the direction right makes the same %. All numbers from ROUNDS. */
(function(){var opt=window.__mm,L=(typeof SIM!=="undefined"&&SIM.leverage)||5,NM={GPT:"GPT",KIMI:"Kimi",CLAUDE:"Claude",GROK:"Grok"};
  /* the ROI tab's running balances, before each round */
  var bal={},before={};ROUNDS.forEach(function(r){before[r.n]={};r.calls.forEach(function(x){var m=x[0];if(bal[m]==null)bal[m]=100000;before[r.n][m]=bal[m];bal[m]*=1+(/^DOWN/.test(x[1])?-1:1)*r.a/100})});
  var usd=function(v){var s=Math.abs(v)>=100?Math.round(Math.abs(v)).toLocaleString("en-US"):Math.abs(v).toFixed(2);return (v>=0?"+$":"−$")+s};
  document.querySelectorAll("#x2pHl .card").forEach(function(c){var n=+c.getAttribute("data-n"),r=ROUNDS.filter(function(q){return q.n===n})[0],hcs=c.querySelector(".x2p-hcs");if(!r||!hcs)return;
    var rows=r.calls.map(function(x){var dn=/^DOWN/.test(x[1]),s=(dn?-1:1)*r.a/100,mg=parseFloat(x[1].replace(/^(UP|DOWN)\s*/,""));
      var v=opt==="C"?1000*s:opt==="D"?before[n][x[0]]*s:1000*L*s;return {m:NM[x[0]]||x[0],up:!dn,mg:mg,ok:s>0,v:v,after:opt==="D"?before[n][x[0]]*(1+s):null}});
    var head={A:"$1,000 per call at "+L+"x",B:"$1,000 per call at "+L+"x",C:"$1,000 per call, no leverage",D:"Each AI's $100K pot"}[opt];
    var cell=function(p){return '<div class="mm-c '+(p.ok?"ok":"no")+'"><span class="mm-n">'+p.m+'<i class="'+(p.up?"mmu":"mmd")+'">'+(p.up?"▲":"▼")+(Math.round(p.mg*100)/100)+'%</i></span><b>'+usd(p.v)+'</b>'+(p.after!=null?'<small>now $'+Math.round(p.after/1000)+'K</small>':'')+'</div>'};
    var el=document.createElement("div");el.className="mm mm-"+opt;el.innerHTML='<div class="mm-h"><span>'+head+'</span><em>Simulated</em></div><div class="mm-g">'+rows.map(cell).join("")+'</div>';
    hcs.replaceWith(el)})})();
