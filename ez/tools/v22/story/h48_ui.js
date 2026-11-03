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
function follow(ticker,lead,t){var mk=E.hlMarket(ticker),h="";
  if(mk){h+='<div class="h8-hl" data-h8hl="'+esc(ticker)+'">'+(t?'<a class="h8-btn h8-hlb" href="'+esc(mk.url)+'" target="_blank" rel="noopener">Follow '+E.NAME[lead]+'&rsquo;s '+(t.up?"long":"short")+' on Hyperliquid</a>':'')+
    '<span class="h8-mkl"><b>'+esc(mk.name)+'</b> · $'+mk.oi.toFixed(1)+'M open interest'+(mk.thin?' · <em>thin market</em>':'')+'</span></div>'}
  else h+='<div class="h8-hl h8-none"><span class="h8-mkl">No Hyperliquid market</span></div>';
  return h}
function when(u){return u.resolves?((E.dayKey(u.resolves)===E.dayKey(E.nyToday(Date.now()))?"Today, ":"")+E.fmtDay(u.resolves,true)):"Date to come"}
/* one company coming up: the top model's trade on the gold strip, the other three as the field, and where to follow it */
function nextCard(u,lead,ord){var t=u.in?u.tr.filter(function(x){return x.m===lead})[0]:null,f=u.in?ord.filter(function(m){return m!==lead}).map(function(m){return u.tr.filter(function(x){return x.m===m})[0]}).filter(Boolean):[];
  var h='<article class="h8-nx h8-pl'+(u.in?'':' h8-wt')+'"><div class="h8-nxhd">'+co(u.ticker,38)+'<div><div class="h8-nxcn">'+esc(E.coLabel(u.ticker))+'</div><div class="h8-nxgd">'+(u.in?'Graded at the close · ':'Graded ')+'<span class="h8-nw">'+when(u)+'</span></div></div></div>';
  if(u.in)h+=(t?'<div class="h8-nxtop">'+badge(lead,34)+'<div><span class="h8-nxlb">'+E.NAME[lead]+'&rsquo;s trade</span><span class="h8-nxbig '+(t.up?"h8-long":"h8-short")+'">'+size(t)+'</span></div></div>':
      '<div class="h8-nxtop h8-no">'+badge(lead,34)+'<div><span class="h8-nxlb">'+E.NAME[lead]+'</span><span class="h8-nxwt">No trade on this one</span></div></div>')+
    '<div class="h8-nxfld"><span class="h8-nxlb">The field</span>'+f.map(function(x){return '<span class="h8-nxf">'+badge(x.m,18)+E.NAME[x.m]+' <i class="'+(x.up?"h8-long":"h8-short")+'">'+size(x)+'</i></span>'}).join("")+'</div>';
  return h+follow(u.ticker,lead,t)+'</article>'}
/* the golden ticket: the leader's founder face in its window, the record with its sample printed on the painted ticket */
function ticket(m,s){return '<div class="h8-gt" role="group" aria-label="'+E.NAME[m]+' holds the golden ticket: right on '+s.w+' of '+s.n+' trades, '+(s.hit*100).toFixed(1)+' percent, '+E.money(s.pl)+' at $100K a trade">'+
  '<div class="h8-gtstub" aria-hidden="true"><span>Golden ticket</span></div>'+
  '<div class="h8-gtface"><img src="'+CAST[m]+'" alt="" decoding="async"></div>'+
  '<div class="h8-gtmain" aria-hidden="true"><span class="h8-gtn">'+badge(m,30)+'<b>'+E.NAME[m]+'</b></span>'+
   '<span class="h8-gtk">Right on '+s.w+' of '+s.n+' trades</span><span class="h8-gtbig">'+(s.hit*100).toFixed(1)+'%</span>'+
   '<span class="h8-gtbig '+(s.pl>=0?'h8-pos':'h8-neg')+'">'+E.money(s.pl)+'</span><span class="h8-gtk">at $100K a trade</span></div></div>'}
window.H48UI={esc:esc,badge:badge,flag:flag,co:co,letter:letter,letterAll:letterAll,ticket:ticket,nextCard:nextCard,follow:follow,size:size,when:when,CAST:CAST,mix:mix};
})();
