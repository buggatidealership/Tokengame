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
/* the models in tryouts for No. 5 (owner, 2026-11-04: "Qwen, Mistral, Nemotron... DeepSeek"): marks from LobeHub's icons (MIT; Qwen,
   Mistral, DeepSeek) and Simple Icons (CC0; NVIDIA for Nemotron), each in its lab's colour on a cream cel with the cast badges' ink ring */
var TRY=[{"n":"Qwen","lab":"Alibaba","cc":"CN","c":"#5b4fe0","fr":1,"d":"M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z"},{"n":"Mistral","lab":"Mistral AI","cc":"EU","c":"#f05a14","fr":1,"d":"M3.428 3.4h3.429v3.428h3.429v3.429h-.002 3.431V6.828h3.427V3.4h3.43v13.714H24v3.429H13.714v-3.428h-3.428v-3.429h-3.43v3.428h3.43v3.429H0v-3.429h3.428V3.4zm10.286 13.715h3.428v-3.429h-3.427v3.429z"},{"n":"Nemotron","lab":"NVIDIA","cc":"US","c":"#76b900","fr":0,"d":"M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z"},{"n":"DeepSeek","lab":"DeepSeek","cc":"CN","c":"#4d6bfe","fr":0,"d":"M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z"}];
function tryBadge(c,size){return '<span class="h8-mk" style="--s:'+(size||26)+'px" role="img" aria-label="'+c.n+'"><svg viewBox="0 0 32 32" aria-hidden="true">'+
  '<circle cx="16" cy="16" r="14.6" fill="#fff3d6"/><g transform="translate(6.4 6.4) scale(.8)"><path d="'+c.d+'" fill="'+c.c+'"'+(c.fr?' fill-rule="evenodd"':'')+'/></g>'+
  '<circle cx="16" cy="16" r="14.6" fill="none" stroke="#24140c" stroke-width="2.2"/></svg></span>'}
function flag(m,w){var cc=E.FLAG[m]||m,cn=cc==="CN",id="h8f"+(FID++),body;
  if(cn){var st=function(x,y,r,a){var p=[];for(var i=0;i<10;i++){var rr=i%2?r*.42:r,t=(a||0)+i*Math.PI/5-Math.PI/2;p.push((x+rr*Math.cos(t)).toFixed(2)+","+(y+rr*Math.sin(t)).toFixed(2))}return '<polygon points="'+p.join(" ")+'" fill="#ffd23a"/>'};
    body='<rect width="30" height="20" fill="#de2910"/>'+st(5.2,5.4,3.2)+st(10.4,2.4,1.05,.6)+st(12.4,4.6,1.05,.9)+st(12.4,7.6,1.05,0)+st(10.4,9.6,1.05,.6)}
  else if(cc==="EU"){body='<rect width="30" height="20" fill="#26408f"/>';for(var k=0;k<12;k++){var t=k*Math.PI/6;body+='<circle cx="'+(15+5.6*Math.cos(t)).toFixed(2)+'" cy="'+(10+5.6*Math.sin(t)).toFixed(2)+'" r=".95" fill="#ffd23a"/>'}}
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
  /* owner, 2026-11-04: "there should never be like no hyperliquid market at the bottom": the market line only where there is one */
  if(!mk&&(o.row||o.bare))return "";
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
function drops(u,lead){if(!u.called)return "Trade drops: date to come";var k=E.dayKey(u.called),tk=E.dayKey(E.nyToday(Date.now()));
  /* owner, 2026-11-04 (second pass): "Trade drops: Wed Nov 4", no name (the section is the leader's), no open interest */
  return k===tk?"Trade drops: today":k>tk?'Trade drops: <span class="h8-nw">'+E.fmtDay(u.called,true)+'</span>':"Trade not in yet"}
function nextCard(u,lead,ord){var t=u.in?u.tr.filter(function(x){return x.m===lead})[0]:null;
  var h='<article class="h8-nx h8-pl'+(u.in?'':' h8-wt')+'"><div class="h8-nxhd">'+co(u.ticker,38)+'<div><div class="h8-nxcn">'+esc(E.coLabel(u.ticker))+'</div><div class="h8-nxgd">'+(u.in?'Graded at the close · <span class="h8-nw">'+when(u)+'</span>':drops(u,lead))+'</div></div></div>';
  if(u.in)h+=(t?'<div class="h8-nxtop">'+badge(lead,34)+'<div><span class="h8-nxbig '+(t.up?"h8-long":"h8-short")+'">'+(t.up?"Long":"Short")+'</span></div><span class="h8-nxsz h8-nxbig '+(t.up?"h8-long":"h8-short")+'">'+t.size+'%</span></div>':
      '<div class="h8-nxtop h8-no">'+badge(lead,34)+'<div><span class="h8-nxlb">'+E.NAME[lead]+'</span><span class="h8-nxwt">No trade on this one</span></div></div>');
  return h+(u.in?follow(u.ticker,lead,t,{row:1}):'')+'</article>'}
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
/* kind: the surface ("sc" the screen, "ch" the chalkboard); o.money draws the P&L on the screen (owner, 2026-11-04: both charts the same display) */
function chart(sf,kind,o){var W=sf.clientWidth,H=sf.clientHeight,scr=kind==="sc",hit=scr&&!o.money,ink=scr?"#2a1a10":"#f3efe2",fs=W<420?11:13,rs=o.rs,n=rs.length;
  if(!n){sf.innerHTML='<div class="h8-chempty" style="color:'+ink+'">'+esc(o.empty||"Nothing graded yet")+'</div>';return}
  var pad={l:hit?40:58,r:0,t:16,b:30};
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
  if(!scr)g+='<defs><filter id="h8chalk'+sf.id+'" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.7"/><feComposite in="SourceGraphic" operator="in"/></filter></defs>';
  ticks.forEach(function(v){var base=hit?Math.abs(v-.5)<1e-6:v===0,y=Y(v).toFixed(1);
    g+='<line x1="'+pad.l+'" x2="'+(W-pad.r+6)+'" y1="'+y+'" y2="'+y+'" stroke="'+ink+'" stroke-opacity="'+(base?.75:.22)+'" stroke-width="'+(base?1.6:1)+'"'+(base?' stroke-dasharray="6 5"':'')+'/>'+
       '<text x="'+(pad.l-6)+'" y="'+(+y+4)+'" text-anchor="end" font-size="'+fs+'" fill="'+ink+'" fill-opacity="'+(base?1:.75)+'">'+(hit?Math.round(v*100)+"%":(v===0?"$0":(v>0?"+":"−")+"$"+Math.abs(v/1000)+"K"))+'</text>'});
  [[-1,"Start"],[n-1,"Round "+rs[n-1].n]].forEach(function(a,i){g+='<text x="'+X(a[0])+'" y="'+(H-8)+'" text-anchor="'+(i?"end":"start")+'" font-size="'+fs+'" fill="'+ink+'" fill-opacity=".8">'+a[1]+'</text>'});
  var ends=[],base0=hit?.5:0,cas=scr?"#24140c":"#173a2a";
  E.MK.slice().reverse().forEach(function(m){var S=ser[m];if(S.f0<0)return;var d="M"+X(S.f0-1).toFixed(1)+" "+Y(base0).toFixed(1);for(var i=S.f0;i<n;i++)d+="L"+X(i).toFixed(1)+" "+Y(S.s[i]).toFixed(1);
    g+='<path class="h8-ln" d="'+d+'" fill="none" stroke="'+cas+'" stroke-width="'+(scr?4.6:4.2)+'" stroke-linejoin="round" stroke-linecap="round"'+(DASH[m]?' stroke-dasharray="'+DASH[m]+'"':'')+(scr?'':' opacity=".55"')+'/>'+
       '<path class="h8-ln" d="'+d+'" fill="none" stroke="'+E.COL[m]+'" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"'+(DASH[m]?' stroke-dasharray="'+DASH[m]+'"':'')+(scr?'':' filter="url(#h8chalk'+sf.id+')"')+'/>';
    ends.push({m:m,y:Y(S.s[n-1]),v:S.s[n-1]})});
  ends.sort(function(a,b){return a.y-b.y});for(var i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<fs+5)ends[i].y=ends[i-1].y+fs+5;
  var over=ends.length?ends[ends.length-1].y-(H-pad.b):0;if(over>0)ends.forEach(function(e){e.y-=over});
  ends.forEach(function(e){var x=W-pad.r+10;
    g+='<circle cx="'+X(n-1).toFixed(1)+'" cy="'+Y(e.v).toFixed(1)+'" r="3.2" fill="'+E.COL[e.m]+'" stroke="'+cas+'" stroke-width="1.4"/>'+
      '<text x="'+x+'" y="'+(e.y+4).toFixed(1)+'" font-size="'+fs+'" fill="'+(scr?"#24140c":E.COL[e.m])+'"><tspan>'+E.NAME[e.m]+'</tspan> <tspan fill="'+(scr?"#24140c":"#f3efe2")+'">'+esc(o.ends[e.m])+'</tspan></text>'});
  g+='</svg>';sf.innerHTML=g;
  var key=o.key||sf.id;
  if(o.anim&&!RM()&&!SEEN[key]&&"IntersectionObserver" in window){var ps=sf.querySelectorAll(".h8-ln");ps.forEach(function(p){if(!p.getAttribute("stroke-dasharray")){var L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L}else p.style.clipPath="inset(0 100% 0 0)"});
    var done=false,go=function(){if(done)return;done=true;SEEN[key]=true;ps.forEach(function(p){p.style.transition="stroke-dashoffset 1.6s ease-out, clip-path 1.6s ease-out";p.style.strokeDashoffset=0;p.style.clipPath="inset(0 0 0 0)"})};
    /* draws when a third of it is on screen; a reader who scrolls past without stopping still gets it drawn, 1.2 s after it first shows */
    var tm=0,io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.intersectionRatio>=.34){io.disconnect();clearTimeout(tm);go()}else if(e.isIntersecting&&!tm)tm=setTimeout(function(){io.disconnect();go()},1200)})},{threshold:[0,.35]});io.observe(sf)}}
/* a painted ring around the best figure in a row (a brush stroke in red-brown ink, the cel's own line) */
function ring(){return '<svg class="h8-ring" viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden="true"><path d="M8 24C9 10 34 4 55 5S95 12 93 24 66 41 44 40 6 35 9 21 30 6 52 7" fill="none" stroke="#a8231a" stroke-width="3.4" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>'}
window.H48UI={esc:esc,badge:badge,flag:flag,TRY:TRY,tryBadge:tryBadge,co:co,letter:letter,letterAll:letterAll,ticket:ticket,nextCard:nextCard,follow:follow,size:size,when:when,CAST:CAST,mix:mix,
  fit:fit,chart:chart,BOX:BOX,ring:ring,RM:RM};
})();
