/* r1040 shared: L1's content in the owner's words (2026-10-28): "Last resolution", today's predictions and resolutions, the next
   predictions; no Live in the band (the Today antenna says it); nothing stamped (it keeps moving): flat ink, no pressed lip. */
window.r40=(function(){var L=LV,all=[].concat(ROUNDS,PENDING,UPCOMING),s=lvState(),nx=lv4.next();
 /* the last resolution as of the moment: only rounds resolved before today (the sheet already holds later results) */
 var G=ROUNDS.filter(function(u){return u.resolves&&L.K(u.resolves)<L.today}),lk=G.reduce(function(a,u){var k=L.K(u.resolves);return k>a?k:a},"0000"),r=lvBig(G.filter(function(u){return L.K(u.resolves)===lk}))[0];
 var preds=all.filter(function(u){return L.K(u.called)===L.today}),res=all.filter(function(u){return L.K(u.resolves)===L.today&&L.K(u.called)!==L.today});
 /* at the bell the rounds graded at today's close are the state's rounds */
 if(s.k==="bell"||s.k==="rung")res=s.rounds;
 var pl=function(n,w){return n+" "+w+(n===1?"":"s")};
 var now=preds.length?{v:pl(preds.length,"prediction"),s:res.length?pl(res.length,"resolution")+" at the close":"Before the reports",R:preds}
  :res.length?{v:pl(res.length,"resolution"),s:s.k==="rung"?"Results soon":"At the close · "+L.left(),R:res}:{v:"Off air",s:"Back "+nx.wds,R:[]};
 return {s:s,nx:nx,r:r,now:now,wk:r39.week(),
  last:{lb:"Last resolution",v:L.short(r),o:r.out,up:r.a>0,s:lv4.win(r),day:L.kfmt(L.K(r.resolves),{date:false})},
  next:{lb:"Next · "+nx.wds,v:pl(nx.R.length,"prediction"),s:L.kfmt(nx.k),R:nx.R},
  foot:"Predicted before the report. Resolved at the close."}})();
/* a perforation that stops at the bands: the notches top and bottom cut as the bet's, the punched holes only between the bands (an SVG
   pattern of holes as one mask layer the height of the ivory, put first and XORed onto the die, so outside it the die is untouched) */
r40.cut=function(t,xs){var pp=t.querySelector(".bt-pp");var lst=function(v){var o=[],dp=0,st=0;for(var i=0;i<v.length;i++){var c=v[i];if(c==="(")dp++;else if(c===")")dp--;else if(c===","&&!dp){o.push(v.slice(st,i).trim());st=i+1}}o.push(v.slice(st).trim());return o};
 var full=function(v,n){var a=lst(v),o=[];for(var i=0;i<n;i++)o.push(a[i%a.length]);return o};
 var H="url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='p' width='8' height='6.5' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='4' cy='3.25' r='1.75'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23p)'/%3E%3C/svg%3E\")";
 [pp,t.querySelector(".bt-sh>i"),t.querySelector(".bt-hs")].forEach(function(e){var cs=getComputedStyle(e),im=lst(cs.maskImage),n=im.length,P=function(p){return full(cs[p],n)};
  var nI=[],nS=[],nP=[],nR=[],nC=[];
  xs.forEach(function(x){var cut=function(at){return "radial-gradient(circle at "+at+", #0000 calc(var(--rn) - .35px), #000 calc(var(--rn) + .45px))"};
   nI.push(cut(x+" 0"),cut(x+" 100%"));nS.push("100% 100%","100% 100%");nP.push("0 0","0 0");nR.push("no-repeat","no-repeat");nC.push("intersect","intersect")});
  var hI=[],hS=[],hP=[],hR=[],hC=[];xs.forEach(function(x){hI.push(H);hS.push("8px calc(100% - var(--st) - var(--sb) - 6px)");hP.push("calc("+x+" - 4px) calc(var(--st) + 3px)");hR.push("no-repeat");hC.push("exclude")});
  e.style.setProperty("mask-image",hI.concat(im,nI).join(", "));e.style.setProperty("mask-size",hS.concat(P("maskSize"),nS).join(", "));
  e.style.setProperty("mask-position",hP.concat(P("maskPosition"),nP).join(", "));e.style.setProperty("mask-repeat",hR.concat(P("maskRepeat"),nR).join(", "));
  e.style.setProperty("mask-composite",hC.concat(P("maskComposite"),nC).join(", "));
  e.style.setProperty("mask-origin",hI.map(function(){return "border-box"}).concat(P("maskOrigin"),nI.map(function(){return "border-box"})).join(", "));
  e.style.setProperty("mask-clip",hI.map(function(){return "border-box"}).concat(P("maskClip"),nI.map(function(){return "border-box"})).join(", "))})};
