/* live-r2 shared: company logos, biggest first. The sheet has no company size, so this mockup carries market caps in $ billions
   read from companiesmarketcap.com on 26 Oct 2026 (top 200 only; anything smaller keeps its sheet order behind them). A build
   would need the size in the sheet (a MARKET CAP or SIZE RANK column) or a list kept by sync_sheet.py. Only the order is used. */
window.LV_CAP={NVDA:5094,AAPL:5074,MSFT:3894,GOOGL:3880,AMZN:2675,TSMC:2170,SPCX:2003,META:1637,TSLA:1471,"BRK.B":1160,LLY:1135,"005930.KS":1046,
  MU:993,JPM:881,AMD:844,XOM:753,"000660.KS":701,JNJ:635,"ASML.AS":606,MA:546,PLTR:473,INTC:460,CVX:457,COST:445,KO:399,ORCL:382,UNH:375,MRK:358,
  BAC:350,HD:319,CAT:316,PM:311,"HSBA.L":310,"SHEL.L":307,AMAT:299,GE:296,LRCX:288,"NOVN.SW":287,MS:281,SAP:275,NFLX:274,"AZN.L":266,TXN:260,
  GS:255,WFC:247,IBM:240,ARM:225,"SIE.DE":223,GEV:217,SHOP:217,AXP:210,C:200,DIS:194,QCOM:188,SNDK:179,NOW:164,BA:149,STX:143,KIOXIA:127,NET:116,SBUX:115};
window.lvBig=function(L){return L.map(function(u,i){return {u:u,i:i,c:LV_CAP[String(u.ticker).toUpperCase()]||0}}).sort(function(a,b){return (b.c-a.c)||(a.i-b.i)}).map(function(x){return x.u})};
/* one logo: a round chip on dark grounds (cls lv-chip), printed into the paper on cards (cls lv-prt) */
window.lvLogo=function(u,cls){var t=String(u.ticker).toUpperCase(),L=CO_LOGOS[t],f=L&&(L.f||L);
  return f?'<span class="lv-lg '+(cls||"")+(L.dark?" dk":"")+'" title="'+lvE(u.co)+'"><img src="'+MEDIA+f+'" alt="'+lvE(u.co)+'"></span>':'<span class="lv-lg lv-tx '+(cls||"")+'">'+lvE(t.slice(0,4))+'</span>'};
/* the first company named, the next n as logos, then +k */
window.lvLead=function(R,n,o){o=o||{};var B=lvBig(R);if(!B.length)return "";var f=B[0],rest=B.slice(1,1+n),k=B.length-1-rest.length;
  return '<span class="lv-ld">'+lvLogo(f,"lv-chip")+'<b class="lv-nm">'+lvE(o.long?f.co:LV.short(f))+'</b></span>'+
    (rest.length?'<span class="lv-stk">'+rest.map(function(u){return lvLogo(u,"lv-chip")}).join("")+'</span>':'')+(k>0?'<span class="lv-more">+'+k+'</span>':'')};
window.lvStack=function(R,n){var B=lvBig(R),s=B.slice(0,n),k=B.length-s.length;return '<span class="lv-stk lv-stk0">'+s.map(function(u){return lvLogo(u,"lv-chip")}).join("")+'</span>'+(k>0?'<span class="lv-more">+'+k+'</span>':'')};
/* fit: while something in the pill overflows, trim inside the deepest overflowing box: drop logos from the end of its stack into the
   +k, and only when it has no stack left, drop the lead's name (the logo stays) */
window.lvFit=function(a){var tol=+(a.getAttribute("data-tol")||1);
  function ov(e){return e.offsetParent!==null&&e.scrollWidth>e.clientWidth+tol&&(e===a||getComputedStyle(e).overflow!=="visible")}
  function run(){for(var t=0;t<14;t++){var O=[a].concat([].slice.call(a.querySelectorAll("*"))).filter(ov);if(!O.length)return;
    var d=O.filter(function(e){return !O.some(function(x){return x!==e&&e.contains(x)})})[0];
    var q=d.querySelectorAll(".lv-stk .lv-lg");
    if(q.length){var lg=q[q.length-1],p=lg.parentNode,m=p.parentNode.querySelector(".lv-more");
      if(!m){m=document.createElement("span");m.className="lv-more";m.textContent="+0";p.after(m)}
      m.textContent="+"+(+m.textContent.slice(1)+1);lg.remove();if(!p.children.length)p.remove();continue}
    var nm=d.querySelector(".lv-nm");if(nm){nm.remove();lost=1;continue}return}}
  /* if a name had to go, start again from the full pill without names, so the logos dropped for it come back */
  var html=a.innerHTML,lost=0;function go(){a.innerHTML=html;lost=0;run();if(lost){a.innerHTML=html;[].slice.call(a.querySelectorAll(".lv-row .lv-nm,.lv-line .lv-nm")).forEach(function(n){if(n.offsetParent)n.remove()});run()}}
  go();if(document.fonts)document.fonts.ready.then(go);return a};
