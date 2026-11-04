/* ===== H48 UI (EZ Live X6+ only): the Saturday-morning cartoon's drawing helpers, shared by the Overview (h48_ov.js) and the
   Leaderboard's action strip (h48_lb.js), ported from tools/concepts/worlds/cartoon/saturday/show.js. Every class is h8-, every rule
   sits under html.h48 (h48_show.css). Cels: a model's badge in its colour with one shadow tone and an ink line; a flag as a cel
   pennant; a company's own logo printed on a small painted card; brushed title lettering, each letter at its own angle; the golden
   ticket with the leader's founder face; one next-trade card. ===== */
(function(){
if(window.H48UI)return;
var E=window.H48D;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function mix(hex,k){var n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255,i=[36,20,12];return "rgb("+[r,g,b].map(function(v,j){return Math.round(v*(1-k)+i[j]*k)}).join(",")+")"}
/* the founders' cels (the H47 Saturday take's cast, painted in Hedra from the owner's founder stills), written out in full for make_site.py */
var CAST={GROK:"media/h48-cast-grok.jpg",CLAUDE:"media/h48-cast-claude.jpg",GPT:"media/h48-cast-gpt.jpg",KIMI:"media/h48-cast-kimi.jpg"};
function badge(m,size){var c=E.COL[m],Mo=MODELS[m]||{},d=Mo.d||"",dot=Mo.dot,fr=Mo.fr;
  return '<span class="h8-mk" style="--s:'+(size||26)+'px" role="img" aria-label="'+E.NAME[m]+'"><svg viewBox="0 0 32 32" aria-hidden="true">'+
   '<circle cx="16" cy="16" r="14.6" fill="'+c+'"/>'+
   '<path d="M3.2 19.5A13.4 13.4 0 0 0 28.8 19.5 15.5 12 0 0 1 3.2 19.5Z" fill="'+mix(c,.28)+'"/>'+
   '<circle cx="16" cy="16" r="14.6" fill="none" stroke="#24140c" stroke-width="2.2"/>'+
   '<g transform="translate(7.2 7.2) scale(.733)"><path fill="#24140c"'+(fr?' fill-rule="'+fr+'"':'')+' d="'+d+'"/>'+(dot?'<path fill="#24140c" d="'+dot+'"/>':'')+'</g>'+
   '<path d="M8 9.5Q10.5 6.2 14.5 5.4" stroke="#fff" stroke-opacity=".75" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg></span>'}
var FID=0;
function flag(m,w){var cn=E.FLAG[m]==="CN",id="h8f"+(FID++),body;
  if(cn){var st=function(x,y,r,a){var p=[];for(var i=0;i<10;i++){var rr=i%2?r*.42:r,t=(a||0)+i*Math.PI/5-Math.PI/2;p.push((x+rr*Math.cos(t)).toFixed(2)+","+(y+rr*Math.sin(t)).toFixed(2))}return '<polygon points="'+p.join(" ")+'" fill="#ffd23a"/>'};
    body='<rect width="30" height="20" fill="#de2910"/>'+st(5.2,5.4,3.2)+st(10.4,2.4,1.05,.6)+st(12.4,4.6,1.05,.9)+st(12.4,7.6,1.05,0)+st(10.4,9.6,1.05,.6)}
  else{body='<rect width="30" height="20" fill="#f6efe0"/>';for(var i=0;i<7;i++)body+='<rect y="'+(i*20/6.5).toFixed(2)+'" width="30" height="'+(20/13).toFixed(2)+'" fill="#c8202f"/>';
    body+='<rect width="13" height="10.8" fill="#26408f"/>';for(var y=0;y<3;y++)for(var x=0;x<4;x++)body+='<circle cx="'+(2+x*3)+'" cy="'+(2.2+y*3.2)+'" r=".62" fill="#f6efe0"/>'}
  return '<span class="h8-fl" style="--fw:'+(w||26)+'px" role="img" aria-label="'+(cn?"China":"United States")+'"><svg viewBox="-1 -1 32 22" aria-hidden="true"><clipPath id="'+id+'"><path d="M0 1Q8-1 15 1T30 1V19Q22 21 15 19T0 19Z"/></clipPath>'+
   '<g clip-path="url(#'+id+')">'+body+'<path d="M15 1Q19 10 15 19L22 19Q18 10 22 1Z" fill="#24140c" opacity=".22"/></g>'+
   '<path d="M0 1Q8-1 15 1T30 1V19Q22 21 15 19T0 19Z" fill="none" stroke="#24140c" stroke-width="1.5" stroke-linejoin="round"/></svg></span>'}
/* a company: its own logo printed on a small painted card; a logo made for a dark ground sits on an ink card */
function co(t,size){var L=W().CO_LOGOS&&CO_LOGOS[t];
  if(!L)return '<span class="h8-co" style="--cs:'+(size||34)+'px" aria-hidden="true"></span>';
  return '<span class="h8-co'+(L.dark?" h8-dk":"")+'" style="--cs:'+(size||34)+'px" aria-hidden="true"><img src="media/'+esc(L.f||L)+'" alt="" loading="lazy" decoding="async"></span>'}
function W(){return window}
/* lettering: each letter at its own angle, baseline and size, words kept whole (the label stays whole for screen readers) */
function rnd(i,s){var x=Math.sin(i*12.9898+s*78.233)*43758.5453;return x-Math.floor(x)}
function letter(el,seed,amp){var t=el.textContent,words=t.split(" "),k=0,a=amp||1;el.setAttribute("aria-label",t);
  el.innerHTML=words.map(function(w){return '<span class="h8-lw" aria-hidden="true">'+w.split("").map(function(ch){k++;var r=(rnd(k,seed||1)-.5)*9*a,y=(rnd(k+40,seed||1)-.5)*.11*a,s=1+(rnd(k+80,seed||1)-.5)*.1*a;
    return '<span class="h8-lc" style="transform:translateY('+y.toFixed(3)+'em) rotate('+r.toFixed(2)+'deg) scale('+s.toFixed(3)+')">'+esc(ch)+'</span>'}).join("")+'</span>'}).join(" ")}
function letterAll(root){(root||document).querySelectorAll("[data-h8let]").forEach(function(el,i){letter(el,+el.dataset.h8let||i+1,+el.dataset.h8amp||1)})}
function size(t){return (t.up?"Long ":"Short ")+t.size+"%"}
/* the market line under a trade: follow it on Hyperliquid, thin market under $10M open interest, or no market */
/* o.row (the Overview, owner 2026-11-04): the button smaller with the open interest beside it, the market's name under them;
   o.bare: the open interest only (a small card whose company is named above it). "Hyperliquid" in the button is green (owner). */
function follow(ticker,lead,t,o){var mk=E.hlMarket(ticker),h="";o=o||{};
  if(mk&&(o.row||o.bare)){var oi='<span class="h8-mkoi">$'+mk.oi.toFixed(1)+'M open interest'+(mk.thin?' · <em>thin market</em>':'')+'</span>';
    h+='<div class="h8-hl h8-hlx'+(o.bare?' h8-hlbare':'')+'" data-h8hl="'+esc(ticker)+'">'+(o.row&&t?'<div class="h8-hlrow"><a class="h8-btn h8-hlb" href="'+esc(mk.url)+'" target="_blank" rel="noopener">Follow '+E.NAME[lead]+'&rsquo;s '+(t.up?"long":"short")+' on <span class="h8-hlw">Hyperliquid</span></a>'+oi+'</div>':oi)+
      (o.row?'<span class="h8-mknm">'+esc(mk.name)+'</span>':'')+'</div>'}
  else if(mk){h+='<div class="h8-hl" data-h8hl="'+esc(ticker)+'">'+(t?'<a class="h8-btn h8-hlb" href="'+esc(mk.url)+'" target="_blank" rel="noopener">Follow '+E.NAME[lead]+'&rsquo;s '+(t.up?"long":"short")+' on Hyperliquid</a>':'')+
    '<span class="h8-mkl"><b>'+esc(mk.name)+'</b> · $'+mk.oi.toFixed(1)+'M open interest'+(mk.thin?' · <em>thin market</em>':'')+'</span></div>'}
  else h+='<div class="h8-hl h8-none"><span class="h8-mkl">No Hyperliquid market</span></div>';
  return h}
function when(u){return u.resolves?((E.dayKey(u.resolves)===E.dayKey(E.nyToday(Date.now()))?"Today, ":"")+E.fmtDay(u.resolves,true)):"Date to come"}
/* one company coming up, on the Overview: the top model's trade only (owner, 2026-11-04: "we only want to focus on Grok... why show the
   shittier models?"), Long or Short the big word and the size at the strip's right end ("the most important thing is people know he's
   short"); a company whose trades are not in yet says when the leader's trade drops ("that's when he drops it"), not when it is graded */
function drops(u,lead){if(!u.called)return E.NAME[lead]+"&rsquo;s trade: date to come";var k=E.dayKey(u.called),tk=E.dayKey(E.nyToday(Date.now()));
  return E.NAME[lead]+"&rsquo;s trade "+(k===tk?"drops today":k>tk?'drops <span class="h8-nw">'+E.fmtDay(u.called,true)+'</span>':"not in yet")}
function nextCard(u,lead,ord){var t=u.in?u.tr.filter(function(x){return x.m===lead})[0]:null;
  var h='<article class="h8-nx h8-pl'+(u.in?'':' h8-wt')+'"><div class="h8-nxhd">'+co(u.ticker,38)+'<div><div class="h8-nxcn">'+esc(E.coLabel(u.ticker))+'</div><div class="h8-nxgd">'+(u.in?'Graded at the close · <span class="h8-nw">'+when(u)+'</span>':drops(u,lead))+'</div></div></div>';
  if(u.in)h+=(t?'<div class="h8-nxtop">'+badge(lead,34)+'<div><span class="h8-nxlb">'+E.NAME[lead]+'&rsquo;s trade</span><span class="h8-nxbig '+(t.up?"h8-long":"h8-short")+'">'+(t.up?"Long":"Short")+'</span></div><span class="h8-nxsz h8-nxbig '+(t.up?"h8-long":"h8-short")+'">'+t.size+'%</span></div>':
      '<div class="h8-nxtop h8-no">'+badge(lead,34)+'<div><span class="h8-nxlb">'+E.NAME[lead]+'</span><span class="h8-nxwt">No trade on this one</span></div></div>');
  return h+follow(u.ticker,lead,t,u.in?{row:1}:{bare:1})+'</article>'}
/* the golden ticket: the leader's founder face in its window, the record with its sample printed on the painted ticket */
function ticket(m,s){return '<div class="h8-gt" role="group" aria-label="'+E.NAME[m]+' holds the golden ticket: right on '+s.w+' of '+s.n+' trades, '+(s.hit*100).toFixed(1)+' percent, '+E.money(s.pl)+' at $100K a trade">'+
  '<div class="h8-gtstub" aria-hidden="true"><span>Golden ticket</span></div>'+
  '<div class="h8-gtface"><img src="'+CAST[m]+'" alt="" decoding="async"></div>'+
  '<div class="h8-gtmain" aria-hidden="true"><span class="h8-gtn">'+badge(m,30)+'<b>'+E.NAME[m]+'</b></span>'+
   '<span class="h8-gtk">Right on '+s.w+' of '+s.n+' trades</span><span class="h8-gtbig">'+(s.hit*100).toFixed(1)+'%</span>'+
   '<span class="h8-gtbig '+(s.pl>=0?'h8-pos':'h8-neg')+'">'+E.money(s.pl)+'</span><span class="h8-gtk">at $100K a trade</span></div></div>'}
/* ---------- the charts, drawn on the painted surfaces: the hit rate projected on the screening-room screen (from 50%), the P&L in
   coloured chalk on the classroom board (from $0). Each line starts before the model's first trade in the rounds shown; lines are told
   apart by colour and dash. A chart draws in once (never with reduced motion); a redraw after that shows it whole. ---------- */
var BOX={sc:{x:.207,y:.12,w:.598,h:.623,ar:.75},ch:{x:.13,y:.167,w:.765,h:.627,ar:.75}};
/* place a surface on its painting (measured on the paintings, in % of the picture) */
/* extra (px, desktop Leaderboard only): the board drawn that much taller, the painting stretched to match, so a page ends level with the one beside it */
function fit(sc,sf,box,fill,extra){var W=sc.clientWidth,k=fill/box.w,pw=W*k,ph=pw*box.ar,x=W*(1-fill)/2-box.x*pw;if(extra>0)ph*=(box.h*ph+extra)/(box.h*ph);var y0=box.y*ph-W*.05;
  sc.style.backgroundSize=pw+"px "+ph+"px";sc.style.backgroundPosition=x+"px "+(-y0)+"px";sc.style.height=(box.h*ph+W*.1)+"px";sc.style.aspectRatio="auto";
  sf.style.left=(W*(1-fill)/2)+"px";sf.style.width=(W*fill)+"px";sf.style.top=(W*.05)+"px";sf.style.height=(box.h*ph)+"px"}
var SEEN={},DASH={GROK:"",CLAUDE:"9 5",GPT:"2.5 4",KIMI:"10 4 2.5 4"};
function RM(){return window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches}
/* o: {rs: rounds in order, ends: {m: label}, empty: words when there is nothing to draw, anim: draw in once} */
function chart(sf,kind,o){var W=sf.clientWidth,H=sf.clientHeight,hit=kind==="sc",ink=hit?"#2a1a10":"#f3efe2",fs=W<420?11:13,rs=o.rs,n=rs.length;
  if(!n){sf.innerHTML='<div class="h8-chempty" style="color:'+ink+'">'+esc(o.empty||"Nothing graded yet")+'</div>';return}
  var pad={l:hit?40:52,r:0,t:16,b:30};
  /* room on the right for the line ends (name and figure), measured roughly from their length */
  var lw=0;E.MK.forEach(function(m){if(o.ends[m]!=null)lw=Math.max(lw,(E.NAME[m]+" "+o.ends[m]).length)});pad.r=Math.min(Math.round(W*.42),Math.round(lw*fs*.6+16));
  var ser={},vals=[];E.MK.forEach(function(m){var a={pl:0,w:0,n:0},s=[],f0=-1;rs.forEach(function(r,i){var t=r.__h8.tr.filter(function(x){return x.m===m})[0];if(t){if(f0<0)f0=i;a.pl+=t.v;a.n++;if(t.w)a.w++}s.push(hit?(a.w+1)/(a.n+2):a.pl)});
    ser[m]={s:s,f0:f0};if(f0>=0)vals=vals.concat(s.slice(f0)).concat([hit?.5:0])});
  if(!vals.length){sf.innerHTML='<div class="h8-chempty" style="color:'+ink+'">'+esc(o.empty||"Nothing graded yet")+'</div>';return}
  var lo,hi,ticks=[],t;
  if(hit){lo=Math.min(.4,Math.floor(Math.min.apply(null,vals)*10)/10);hi=Math.max(.6,Math.ceil(Math.max.apply(null,vals)*10)/10);for(t=lo;t<=hi+1e-9;t+=.1)ticks.push(+t.toFixed(2))}
  else{var mn=Math.min(0,Math.min.apply(null,vals)),mx=Math.max(0,Math.max.apply(null,vals)),span=Math.max(mx-mn,20000),st=[5000,10000,25000,50000,100000].filter(function(s){return span/s<=6})[0]||100000;
    lo=Math.floor(mn/st)*st;hi=Math.ceil(mx/st)*st;if(lo===hi)hi=lo+st;for(t=lo;t<=hi+1e-9;t+=st)ticks.push(t)}
  var X=function(i){return pad.l+(W-pad.l-pad.r)*(i+1)/n},Y=function(v){return pad.t+(H-pad.t-pad.b)*(1-(v-lo)/(hi-lo))};
  var g='<svg class="h8-chart" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(o.aria||"")+'">';
  if(!hit)g+='<defs><filter id="h8chalk'+sf.id+'" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.7"/><feComposite in="SourceGraphic" operator="in"/></filter></defs>';
  ticks.forEach(function(v){var base=hit?Math.abs(v-.5)<1e-6:v===0,y=Y(v).toFixed(1);
    g+='<line x1="'+pad.l+'" x2="'+(W-pad.r+6)+'" y1="'+y+'" y2="'+y+'" stroke="'+ink+'" stroke-opacity="'+(base?.75:.22)+'" stroke-width="'+(base?1.6:1)+'"'+(base?' stroke-dasharray="6 5"':'')+'/>'+
       '<text x="'+(pad.l-6)+'" y="'+(+y+4)+'" text-anchor="end" font-size="'+fs+'" fill="'+ink+'" fill-opacity="'+(base?1:.75)+'">'+(hit?Math.round(v*100)+"%":(v===0?"$0":(v>0?"+":"−")+"$"+Math.abs(v/1000)+"K"))+'</text>'});
  [[-1,"Start"],[n-1,"Round "+rs[n-1].n]].forEach(function(a,i){g+='<text x="'+X(a[0])+'" y="'+(H-8)+'" text-anchor="'+(i?"end":"start")+'" font-size="'+fs+'" fill="'+ink+'" fill-opacity=".8">'+a[1]+'</text>'});
  var ends=[],base0=hit?.5:0,cas=hit?"#24140c":"#173a2a";
  E.MK.slice().reverse().forEach(function(m){var S=ser[m];if(S.f0<0)return;var d="M"+X(S.f0-1).toFixed(1)+" "+Y(base0).toFixed(1);for(var i=S.f0;i<n;i++)d+="L"+X(i).toFixed(1)+" "+Y(S.s[i]).toFixed(1);
    g+='<path class="h8-ln" d="'+d+'" fill="none" stroke="'+cas+'" stroke-width="'+(hit?4.6:4.2)+'" stroke-linejoin="round" stroke-linecap="round"'+(DASH[m]?' stroke-dasharray="'+DASH[m]+'"':'')+(hit?'':' opacity=".55"')+'/>'+
       '<path class="h8-ln" d="'+d+'" fill="none" stroke="'+E.COL[m]+'" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"'+(DASH[m]?' stroke-dasharray="'+DASH[m]+'"':'')+(hit?'':' filter="url(#h8chalk'+sf.id+')"')+'/>';
    ends.push({m:m,y:Y(S.s[n-1]),v:S.s[n-1]})});
  ends.sort(function(a,b){return a.y-b.y});for(var i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<fs+5)ends[i].y=ends[i-1].y+fs+5;
  var over=ends.length?ends[ends.length-1].y-(H-pad.b):0;if(over>0)ends.forEach(function(e){e.y-=over});
  ends.forEach(function(e){var x=W-pad.r+10;
    g+='<circle cx="'+X(n-1).toFixed(1)+'" cy="'+Y(e.v).toFixed(1)+'" r="3.2" fill="'+E.COL[e.m]+'" stroke="'+cas+'" stroke-width="1.4"/>'+
      '<text x="'+x+'" y="'+(e.y+4).toFixed(1)+'" font-size="'+fs+'" fill="'+(hit?"#24140c":E.COL[e.m])+'"><tspan>'+E.NAME[e.m]+'</tspan> <tspan fill="'+(hit?"#24140c":"#f3efe2")+'">'+esc(o.ends[e.m])+'</tspan></text>'});
  g+='</svg>';sf.innerHTML=g;
  var key=o.key||sf.id;
  if(o.anim&&!RM()&&!SEEN[key]&&"IntersectionObserver" in window){var ps=sf.querySelectorAll(".h8-ln");ps.forEach(function(p){if(!p.getAttribute("stroke-dasharray")){var L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L}else p.style.clipPath="inset(0 100% 0 0)"});
    var done=false,go=function(){if(done)return;done=true;SEEN[key]=true;ps.forEach(function(p){p.style.transition="stroke-dashoffset 1.6s ease-out, clip-path 1.6s ease-out";p.style.strokeDashoffset=0;p.style.clipPath="inset(0 0 0 0)"})};
    /* draws when a third of it is on screen; a reader who scrolls past without stopping still gets it drawn, 1.2 s after it first shows */
    var tm=0,io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.intersectionRatio>=.34){io.disconnect();clearTimeout(tm);go()}else if(e.isIntersecting&&!tm)tm=setTimeout(function(){io.disconnect();go()},1200)})},{threshold:[0,.35]});io.observe(sf)}}
/* a painted ring around the best figure in a row (a brush stroke in red-brown ink, the cel's own line) */
function ring(){return '<svg class="h8-ring" viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden="true"><path d="M8 24C9 10 34 4 55 5S95 12 93 24 66 41 44 40 6 35 9 21 30 6 52 7" fill="none" stroke="#a8231a" stroke-width="3.4" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>'}
window.H48UI={esc:esc,badge:badge,flag:flag,co:co,letter:letter,letterAll:letterAll,ticket:ticket,nextCard:nextCard,follow:follow,size:size,when:when,CAST:CAST,mix:mix,
  fit:fit,chart:chart,BOX:BOX,ring:ring,RM:RM};
})();
