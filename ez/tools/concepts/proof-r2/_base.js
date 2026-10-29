/* proof-r2: the proof card re-cut (owner, 2026-10-29). Laid over the built X2+ page (run.js injects it at DOMContentLoaded).
   - the card's top edge is the four tabs: one die-cut silhouette of the ticket stock (an SVG: paper, grain, tone, hard shadow),
     the open tab part of the body, the closed ones a step lower and darker; take A folder tabs, B ticket stubs, C stepped skyline
   - the view's question under the tabs as the card's headline, pressed into the card (the green band is gone)
   - chart first, rows under it (CSS order), small print and the red foot band as now
   - P&L rows: 24h, 7d, P&L (total): each AI's P&L on the rounds graded at a close (4pm New York on `resolves`) in the last
     24 hours / 7 days before NOW (window.__pr2Now, else the clock)
   The page's own switching is kept: the tab buttons, show(), the chart drawing; this only re-dresses and rewrites text. */
(function(){
 var d=document,TAKE=window.__pr2Take||"A",H=d.documentElement;H.classList.add("pr2","pr2-"+TAKE);
 var NOW=function(){return window.__pr2Now||Date.now()};
 var lst=function(v){var o=[],dp=0,st=0;for(var i=0;i<v.length;i++){var c=v[i];if(c==="(")dp++;else if(c===")")dp--;else if(c===","&&!dp){o.push(v.slice(st,i).trim());st=i+1}}o.push(v.slice(st).trim());return o};
 var uri=function(s){var m=/url\("?(.*?)"?\)$/.exec(s||"");return m?m[1]:""};
 /* ---- 24h / 7d ---- */
 function nyClose(s){var q=String(s||"").split("/");if(q.length!==3)return null;var y=+q[2];if(y<100)y+=2000;var g=Date.UTC(y,+q[0]-1,+q[1],20);
  var h=+new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",hour:"numeric",hourCycle:"h23"}).format(new Date(g));return g-(h-16)*3600e3}
 function windows(){var P=window.__x2pPnl&&window.__x2pPnl();if(!P)return null;var now=NOW(),o={};
  Object.keys(P.A).forEach(function(m){o[m]={d1:0,d7:0,n1:0,n7:0}});
  (window.ROUNDS||[]).forEach(function(r){var t=nyClose(r.resolves);if(t==null||t>now)return;var a=now-t;
   Object.keys(P.A).forEach(function(m){var p=P.A[m].per&&P.A[m].per[r.n];if(!p)return;if(a<=864e5){o[m].d1+=p.v;o[m].n1++}if(a<=7*864e5){o[m].d7+=p.v;o[m].n7++}})});
  o.P=P;return o}
 window.__pr2Windows=windows;
 var money=function(P,v){var r=Math.round(v);return r===0?"$0":P.usd(r)};
 function pnlRows(body){var hd=body.querySelector(".pt-3 .pt-hd");if(!hd||!body.querySelector(".pn-bw")||hd.dataset.pr2)return;var W=windows();if(!W)return;hd.dataset.pr2=1;
  var sp=hd.querySelectorAll("span");if(sp.length>=3){sp[0].innerHTML='<i class="pr2-hl">24h</i>';sp[2].innerHTML='<i class="pr2-hl">7d</i>';sp[1].innerHTML='<i class="pr2-hl">P&amp;L</i>'}
  [].slice.call(body.querySelectorAll(".pt-r")).forEach(function(r){var nm=(r.querySelector(".pt-nm")||{}).textContent||"",m=nm.trim().toUpperCase(),w=W[m];if(!w)return;
   [[".pn-bw",w.d1,"last 24 hours "],[".pn-bl",w.d7,"last 7 days "]].forEach(function(x){var e=r.querySelector(x[0]);if(!e)return;var v=Math.round(x[1]);
    e.innerHTML='<span class="sr">'+x[2]+'</span>'+money(W.P,v);e.classList.remove("pr2-u","pr2-d","pr2-z");e.classList.add(v>0?"pr2-u":v<0?"pr2-d":"pr2-z")})});
  var cp=body.querySelector(".pt-cp");if(cp&&!cp.dataset.pr2){cp.dataset.pr2=1;cp.textContent="$100,000 to start. The whole balance on every call. Buy on up, short on down. No leverage. 24h and 7d: rounds graded at the close in the last 24 hours and 7 days."}
  centre(body)}
 /* each column label over its figures' middle */
 function centre(body){var hd=body.querySelector(".pt-3 .pt-hd"),r=body.querySelector(".pt-3 .pt-r");if(!hd||!r)return;var ink=function(e){var g=d.createRange();g.selectNodeContents(e);return g.getBoundingClientRect()};
  var cols=hd.querySelectorAll("span"),fig=[".pn-bw",".pn-pl",".pn-bl"];if(!body.querySelector(".pn-bw"))return;
  [].forEach.call(cols,function(l,i){var q=fig[i];if(!q)return;var lab=l.querySelector("i")||l;lab.style.transform="";var mid=0,n=0;
   body.querySelectorAll(".pt-r "+q).forEach(function(f){var b=ink(f);mid+=b.left+b.width/2;n++});if(!n)return;mid/=n;var a=ink(lab);lab.style.display="inline-block";lab.style.transform="translateX("+(mid-(a.left+a.width/2)).toFixed(2)+"px)"})}
 /* ---- the headline ---- */
 function headline(cd){var q=cd.querySelector(".pr2-q");if(!q){q=d.createElement("h3");q.className="pr2-q";var inn=cd.querySelector(".pt-in");inn.insertBefore(q,inn.querySelector(".pt-body"))}
  var src=cd.querySelector(".pt-top"),t=src?src.textContent.trim():"";if(q.dataset.t!==t){q.dataset.t=t;q.textContent=t}fitQ(q)}
 function fitQ(q){q.style.fontSize="";var z=parseFloat(getComputedStyle(q).fontSize),lh=parseFloat(getComputedStyle(q).lineHeight)||z*1.05,room=q.clientHeight;
  while(q.scrollHeight>room+1&&z>12){z-=.5;q.style.fontSize=z+"px"}}
 /* ---- the silhouette ---- */
 var GEO={A:{th:36,step:7,gap:5,inset:12},B:{th:36,step:7,gap:0,inset:0},C:{th:38,step:6,gap:0,inset:0}};
 function poly(pts){/* pts: [x,y,r]; round each vertex by r (convex or concave alike) */var n=pts.length,s="";
  for(var i=0;i<n;i++){var p=pts[i],a=pts[(i-1+n)%n],b=pts[(i+1)%n],r=p[2]||0;
   if(!r){s+=(i?"L":"M")+p[0].toFixed(2)+","+p[1].toFixed(2);continue}
   var la=Math.hypot(a[0]-p[0],a[1]-p[1]),lb=Math.hypot(b[0]-p[0],b[1]-p[1]),ra=Math.min(r,la/2),rb=Math.min(r,lb/2);
   var p1=[p[0]+(a[0]-p[0])*ra/la,p[1]+(a[1]-p[1])*ra/la],p2=[p[0]+(b[0]-p[0])*rb/lb,p[1]+(b[1]-p[1])*rb/lb];
   s+=(i?"L":"M")+p1[0].toFixed(2)+","+p1[1].toFixed(2)+"Q"+p[0].toFixed(2)+","+p[1].toFixed(2)+" "+p2[0].toFixed(2)+","+p2[1].toFixed(2)}
  return s+"Z"}
 var layers=null;
 function readLayers(cd){var pp=cd.querySelector(".bt-pp");if(!pp)return null;var cs=getComputedStyle(pp),L=lst(cs.backgroundImage),S=lst(cs.backgroundSize),P=lst(cs.backgroundPosition),o={};
  L.forEach(function(l,i){var sz=S[i%S.length],ps=P[i%P.length];if(/^url/.test(l)&&/^200px 200px/.test(sz))o.grain=uri(l);if(/^url/.test(l)&&/100%$/.test(ps)&&/^240px/.test(sz))o.red=uri(l)});
  return o.grain&&o.red?o:null}
 function build(cd){var tb=cd.querySelector(".pt-tb");if(!tb)return;var bs=[].slice.call(tb.querySelectorAll("button"));if(bs.length!==4)return;
  if(!layers)layers=readLayers(cd);if(!layers)return;var G=GEO[TAKE],W=cd.offsetWidth,Hh=cd.offsetHeight,C=cd.getBoundingClientRect(),T=G.th,BH=parseFloat(getComputedStyle(cd).getPropertyValue("--pr2-bh"))||31;
  var tabs=bs.map(function(b){var r=b.getBoundingClientRect();return {x0:r.left-C.left,x1:r.right-C.left,on:b.getAttribute("aria-pressed")==="true"}}),o=tabs.findIndex(function(t){return t.on});if(o<0)o=0;
  var top=[],holes="",dark="",rules="",tone="";
  if(TAKE==="A"){/* folder tabs: trapezoids with rounded tops, gaps between, the closed ones lower; the open one rises out of the body */
   top.push([0,T+0,6]);tabs.forEach(function(t,i){var y=t.on?0:G.step,sl=5,fr=t.on?6:4;top.push([t.x0,T,fr],[t.x0+sl,y,7],[t.x1-sl,y,7],[t.x1,T,fr]);
    if(!t.on){dark+='<path d="'+poly([[t.x0,T+2,0],[t.x0+sl,y,7],[t.x1-sl,y,7],[t.x1,T+2,0]])+'" fill="rgba(122,92,44,.17)"/>';rules+='<path d="M'+(t.x0-0.5)+','+(T-.2)+'H'+(t.x1+.5)+'" stroke="rgba(20,18,23,.62)" stroke-width="1.4"/>'}});
   top.push([W,T,6])}
  else if(TAKE==="B"){/* ticket stubs: square stubs edge to edge, a perforation and a notch between them, the closed ones lower and torn off
     the body along a row of punched holes; the open one whole with the body */
   tabs.forEach(function(t,i){var y=t.on?0:G.step,x0=i?(t.x0+tabs[i-1].x1)/2:0,x1=i<3?(t.x1+tabs[i+1].x0)/2:W;t.a=x0;t.b=x1;t.y=y});
   tabs.forEach(function(t,i){var pv=tabs[i-1];if(!i)top.push([0,t.y,4]);else{top.push([t.a,Math.max(pv.y,t.y),0]);if(pv.y!==t.y)top.push([t.a,Math.min(pv.y,t.y)===t.y?t.y:pv.y,0])}
    if(i===3)top.push([W,t.y,4])});
   /* rebuild cleanly: walk left to right, at each junction go to the lower of the two tops then the next top */
   top=[];tabs.forEach(function(t,i){if(!i)top.push([0,t.y,3.5]);else{top.push([t.a,tabs[i-1].y,0],[t.a,t.y,0])}if(i===3)top.push([W,t.y,3.5])});
   tabs.forEach(function(t,i){if(i){var jt=Math.max(tabs[i-1].y,t.y);holes+='<circle cx="'+t.a+'" cy="'+jt+'" r="3.2"/>';for(var y=jt+6.5;y<T-2;y+=5.2)holes+='<circle cx="'+t.a+'" cy="'+y.toFixed(1)+'" r="1.15"/>';
     tone+='<circle cx="'+t.a+'" cy="'+jt+'" r="3.2" fill="none" stroke="rgba(110,78,34,.4)" stroke-width="1.2"/>'}
    if(!t.on){dark+='<rect x="'+t.a+'" y="'+t.y+'" width="'+(t.b-t.a)+'" height="'+(T-t.y)+'" fill="rgba(122,92,44,.17)"/>';for(var x=t.a+4;x<t.b-2;x+=5.2)holes+='<circle cx="'+x.toFixed(1)+'" cy="'+T+'" r="1.15"/>'}})}
  else{/* skyline: the open tab the tallest, each one further away a step lower; flat tops, square steps, tint deepening with distance */
   tabs.forEach(function(t,i){var x0=i?(t.x0+tabs[i-1].x1)/2:0,x1=i<3?(t.x1+tabs[i+1].x0)/2:W;t.a=x0;t.b=x1;t.k=Math.abs(i-o);t.y=t.k*G.step});
   tabs.forEach(function(t,i){if(!i)top.push([0,t.y,3]);else top.push([t.a,tabs[i-1].y,tabs[i-1].y<t.y?2:0],[t.a,t.y,tabs[i-1].y<t.y?0:2]);if(i===3)top.push([W,t.y,3])});
   tabs.forEach(function(t){if(!t.on){dark+='<rect x="'+t.a+'" y="'+t.y+'" width="'+(t.b-t.a)+'" height="'+(T-t.y)+'" fill="rgba(122,92,44,'+(.1+.06*t.k).toFixed(2)+')"/>';
    rules+='<path d="M'+t.a+','+(T-.2)+'H'+t.b+'" stroke="rgba(20,18,23,.62)" stroke-width="1.4"/>'}})}
  var outline=poly(top.concat([[W,Hh,0],[0,Hh,0]]));
  /* teeth down both sides of the body (the stamp teeth, r 3 every 9px), the bites at the bottom corners */
  var teeth="";for(var y=T+14;y<Hh-16;y+=9){teeth+='<circle cx="0" cy="'+y+'" r="3"/><circle cx="'+W+'" cy="'+y+'" r="3"/>';tone+='<circle cx="0" cy="'+y+'" r="3.4" fill="none" stroke="rgba(110,78,34,.22)" stroke-width="1.2"/><circle cx="'+W+'" cy="'+y+'" r="3.4" fill="none" stroke="rgba(110,78,34,.22)" stroke-width="1.2"/>'}
  teeth+='<circle cx="0" cy="'+Hh+'" r="11"/><circle cx="'+W+'" cy="'+Hh+'" r="11"/>';tone+='<circle cx="0" cy="'+Hh+'" r="11.5" fill="none" stroke="rgba(110,78,34,.26)" stroke-width="1.4"/><circle cx="'+W+'" cy="'+Hh+'" r="11.5" fill="none" stroke="rgba(110,78,34,.26)" stroke-width="1.4"/>';
  var id="pr2"+TAKE;
  var svg='<svg class="pr2-sv" width="'+W+'" height="'+Hh+'" viewBox="0 0 '+W+' '+Hh+'" aria-hidden="true" focusable="false"><defs>'+
   '<mask id="'+id+'m" maskUnits="userSpaceOnUse" x="-20" y="-20" width="'+(W+40)+'" height="'+(Hh+40)+'"><path d="'+outline+'" fill="#fff"/><g fill="#000">'+teeth+holes+'</g></mask>'+
   '<pattern id="'+id+'g" width="200" height="200" patternUnits="userSpaceOnUse"><image href="'+layers.grain+'" width="200" height="200"/></pattern>'+
   '<pattern id="'+id+'r" width="240" height="'+BH+'" patternUnits="userSpaceOnUse" y="'+(Hh-BH)+'"><image href="'+layers.red+'" width="240" height="'+BH+'" preserveAspectRatio="none"/></pattern>'+
   '<filter id="'+id+'b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="4.5"/></filter></defs>'+
   '<g transform="translate(2 6)" opacity=".5" filter="url(#'+id+'b)"><rect x="-20" y="-20" width="'+(W+40)+'" height="'+(Hh+40)+'" fill="#000" mask="url(#'+id+'m)"/></g>'+
   '<g transform="translate(4 4)"><rect x="-20" y="-20" width="'+(W+40)+'" height="'+(Hh+40)+'" fill="#000" mask="url(#'+id+'m)"/></g>'+
   '<g mask="url(#'+id+'m)"><rect width="'+W+'" height="'+Hh+'" fill="#f8f0d9"/><rect width="'+W+'" height="'+Hh+'" fill="url(#'+id+'g)"/>'+dark+rules+
   '<rect y="'+(Hh-BH)+'" width="'+W+'" height="'+BH+'" fill="url(#'+id+'r)"/><rect y="'+(Hh-BH)+'" width="'+W+'" height="1.2" fill="rgba(0,0,0,.22)"/>'+
   '<path d="'+outline+'" fill="none" stroke="rgba(110,78,34,.34)" stroke-width="2.4"/><path d="'+outline+'" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1" transform="translate(0 1)"/>'+tone+'</g></svg>';
  var host=cd.querySelector(".pr2-sil");if(!host){host=d.createElement("div");host.className="pr2-sil";cd.insertBefore(host,cd.querySelector(".bt-pp"))}
  var key=W+"x"+Hh+":"+o+":"+TAKE;if(host.dataset.k!==key){host.dataset.k=key;host.innerHTML=svg}
  tb.style.removeProperty("background");tb.style.removeProperty("border-bottom-color")}
 /* ---- run ---- */
 var cd=null,raf=0;function go(){cancelAnimationFrame(raf);raf=requestAnimationFrame(function(){try{var c=d.querySelector("#learn .x2p-pt .pt-cd.stx-p");if(!c)return;
  if(c!==cd){cd=c;wire(c)}headline(c);var b=c.querySelector(".pt-body");if(b)pnlRows(b);build(c)}catch(e){window.__pr2Err=String(e&&e.stack||e)}})}
 function wire(c){var tb=c.querySelector(".pt-tb"),b=c.querySelector(".pt-body"),src=c.querySelector(".pt-q")||c;
  if(window.MutationObserver){new MutationObserver(go).observe(tb,{attributes:true,subtree:true,attributeFilter:["aria-pressed","style"]});new MutationObserver(go).observe(b,{childList:true});
   new MutationObserver(go).observe(src,{subtree:true,childList:true,characterData:true})}
  if(window.ResizeObserver)new ResizeObserver(go).observe(c)}
 d.addEventListener("DOMContentLoaded",function(){var n=0;(function poll(){go();if(++n<80)setTimeout(poll,200)})()});
 addEventListener("resize",go);addEventListener("load",go);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(go);
})();
