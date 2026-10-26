/* Sizing mockups (owner, 2026-10-26: "Mock sizing versions first"): the standings with the P&L worked out under a sizing rule.
   window.__sz = "S0" today (the whole balance on every call), "S1" size = the AI's predicted move / 5% (5% or more = the whole
   balance), "S2" tiers (under 1.5%: a quarter, 1.5 to 3%: half, 3% or more: all). No leverage in any of them. */
(function(){var R=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)}),k=window.__sz||"S0";
  var f={S0:function(){return 1},S1:function(x){return Math.min(1,x/5)},S2:function(x){return x<1.5?.25:x<3?.5:1}}[k],A={};
  R.forEach(function(r){r.calls.forEach(function(x){var m=x[0],dn=/^DOWN/.test(x[1]),mg=parseFloat(x[1].replace(/^(UP|DOWN)\s*/,"")),t=A[m]||(A[m]={bal:1e5,sz:0,n:0});var s=f(mg);t.sz+=s;t.n++;t.bal+=t.bal*s*(dn?-1:1)*r.a/100})});
  var usd=function(v){return (v>=0?"+$":"−$")+Math.round(Math.abs(v)).toLocaleString("en-US")},ol=document.querySelector("#standings ol.lbl"),n5=ol.querySelector("li.x2p-n5");
  var rows=[].slice.call(ol.querySelectorAll("li.lbr")),nm=function(li){return li.querySelector(".pc-t h3").textContent.trim().toUpperCase()};
  rows.forEach(function(li){var t=A[nm(li)],c=li.querySelector(".lb-c.roi");c.querySelector("b").textContent=usd(t.bal-1e5);c.querySelector("small").textContent="avg size "+Math.round(t.sz/t.n*100)+"%";
    c.classList.toggle("pu",t.bal>=1e5);c.classList.toggle("pd",t.bal<1e5)});
  rows.sort(function(a,b){return A[nm(b)].bal-A[nm(a)].bal});var crown=ol.querySelector(".crown");
  rows.forEach(function(li,i){ol.insertBefore(li,n5);li.classList.remove("lead","r1","r2","r3","r4");li.classList.add("r"+(i+1));if(!i)li.classList.add("lead");
    var rk=li.querySelector(".rk"),tn=[].filter.call(rk.childNodes,function(x){return x.nodeType===3&&/\d/.test(x.nodeValue)})[0];if(tn)tn.nodeValue=String(i+1)});
  if(crown)rows[0].insertBefore(crown,rows[0].firstChild);if(n5)n5.style.display="none"})();
