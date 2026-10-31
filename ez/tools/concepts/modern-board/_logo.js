/* The logo look (owner, 2026-10-27: "borrow from the logo... manga... 3D-ish"; every piece of paper but the main event and Season 2
   tickets replaced by something "more akin to the design of the logo", the certificate too). The EZ. logo's own language: heavy italic
   letters cut by one diagonal, green speed slashes on the left, red on the right, a gold square for a full stop, all on the black disc.
   window.__lg = 'L1' disc, 'L2' speed, 'L3' title card. Runs in the real page; numbers from window.__x2pPnl() and ROUNDS.
   Class prefix lg1-/lg2-/lg3-/lgx- (the site owns .lg, so never a bare "lg-"). */
(function(){
var V=window.__lg;if(!V)return;
var P=window.__x2pPnl(),A=P.A,G=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)});
var NM={GPT:"GPT",KIMI:"Kimi",CLAUDE:"Claude",GROK:"Grok"};
var rows=Object.keys(A).map(function(m){var t=A[m];return {m:m,nm:NM[m]||m,ver:t.ver,W:t.W,L:t.L,n:t.W+t.L,acc:t.W/(t.W+t.L),pnl:t.pnl,pct:t.pct,stk:t.streak,bw:t.bw,bl:t.bl}});
rows.sort(function(a,b){var ha=a.n>=G.length/2,hb=b.n>=G.length/2;if(ha!==hb)return ha?-1:1;return b.pnl-a.pnl});var lead=rows[0];
var S={};rows.forEach(function(r){var b=100000,s=[b];G.forEach(function(g){var p=A[r.m].per[g.n];if(p)b+=p.v;s.push(b)});S[r.m]=s});
function usd(v,k){var s=v<0?"−":"+",a=Math.abs(v);if(k&&a>=1000)return s+"$"+(a/1000).toFixed(1)+"K";return s+"$"+Math.round(a).toLocaleString("en-US")}
function pc(v){return (v<0?"−":"+")+Math.abs(v).toFixed(1)+"%"}function p0(v){return Math.round(v*100)+"%"}
var MC={GPT:"#10a37f",KIMI:"#1e80ff",CLAUDE:"#d97757",GROK:"#f8f0d9"};
function mark(m,fill,sz){var M=MODELS[m];return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" aria-hidden="true"><path fill="'+fill+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+' d="'+M.d+'"/></svg>'}
function disc(m,sz){return '<span class="lgx-dc" style="width:'+sz+'px;height:'+sz+'px">'+mark(m,MC[m],Math.round(sz*.52))+'</span>'}
/* the logo's slashes: two long and one short, leaning like its letters */
function sl(col,h,flip){return '<svg class="lgx-sl" viewBox="0 0 14 30" height="'+h+'" aria-hidden="true"'+(flip?' style="transform:scaleX(-1) rotate(180deg)"':'')+'><path fill="'+col+'" d="M9 0h4L5 30H1z M4 4h2.6L2.6 19H0z"/></svg>'}
function dot(sz){return '<i class="lgx-dt" style="width:'+sz+'px;height:'+sz+'px"></i>'}
/* lettering like the logo's: heavy italic, a dark cut through the letters on one diagonal */
function lx(t,cls){return '<b class="lgx-lx '+(cls||'')+'">'+t+'</b>'}
var BASE='.lgx-dc{display:inline-grid;place-content:center;border-radius:50%;background:#04070e;box-shadow:0 0 0 1.5px rgba(248,240,217,.16);flex:none}'+
 '.lgx-sl{display:inline-block;vertical-align:middle;flex:none}.lgx-dt{display:inline-block;background:#fdbc2a;transform:skewX(-14deg);flex:none}'+
 '.lgx-lx{font-family:Kanit,sans-serif;font-style:italic;font-weight:900;letter-spacing:-.01em;line-height:.95;color:#f8f0d9;'+
 '}.lgx-lx.cut{background:linear-gradient(112deg,currentColor 0 48.6%,rgba(4,7,14,.95) 48.6% 50.4%,currentColor 50.4%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}'+
 '.lgx-lx.up{color:#03c870}.lgx-lx.dn{color:#ff3a31}.lgx-lx.gd{color:#fdbc2a}'+
 '.lgx-sm{font:600 10.5px/1.25 "Barlow Condensed",sans-serif;color:rgba(248,240,217,.58);letter-spacing:.04em}'+
 '.lgx-cap{font:italic 800 9px/1 Kanit,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(248,240,217,.5)}'+
 '.lgx .up,.lgx-pr .up{color:#03c870}.lgx .dn,.lgx-pr .dn{color:#ff3a31}';
function chart(o){var W=o.w,H=o.h,pad=[8,30,16,2],all=[];rows.forEach(function(r){all=all.concat(S[r.m])});var lo=Math.floor(Math.min.apply(0,all)/10000)*10000,hi=Math.ceil(Math.max.apply(0,all)/10000)*10000,N=G.length;
 var x=function(i){return pad[3]+(W-pad[1]-pad[3])*i/N},y=function(v){return pad[0]+(H-pad[0]-pad[2])*(1-(v-lo)/(hi-lo))},g='';
 for(var v=lo;v<=hi;v+=20000)g+='<line x1="'+pad[3]+'" x2="'+(W-pad[1])+'" y1="'+y(v).toFixed(1)+'" y2="'+y(v).toFixed(1)+'" stroke="rgba(248,240,217,'+(v===100000?.35:.08)+')"'+(v===100000?' stroke-dasharray="4 4"':'')+'/><text x="'+(W-pad[1]+4)+'" y="'+(y(v)+3).toFixed(1)+'" font-size="8.5" font-style="italic" font-weight="700" fill="rgba(248,240,217,.45)" font-family="Kanit">'+(v/1000)+'K</text>';
 var ls='';rows.slice().reverse().forEach(function(r){var d=S[r.m].map(function(v,i){return (i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)}).join(' '),c=r===lead?"#fdbc2a":MC[r.m];
  if(o.speed)ls+='<path d="'+d+'" transform="translate(-5 2)" fill="none" stroke="'+c+'" stroke-opacity=".25" stroke-width="1.4"/>';ls+='<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+(r===lead?2.6:1.8)+'" stroke-linejoin="round"/>';
  var e=S[r.m][N];ls+='<rect x="'+(x(N)-3)+'" y="'+(y(e)-3)+'" width="6" height="6" fill="'+c+'" transform="skewX(-14) translate('+(y(e)*Math.tan(14*Math.PI/180)).toFixed(1)+' 0)"/>'});
 return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="display:block">'+g+ls+'<text x="2" y="'+(H-3)+'" font-size="8.5" font-style="italic" font-weight="700" fill="rgba(248,240,217,.45)" font-family="Kanit">R1</text><text x="'+(W-pad[1])+'" y="'+(H-3)+'" text-anchor="end" font-size="8.5" font-style="italic" font-weight="700" fill="rgba(248,240,217,.45)" font-family="Kanit">R'+G[N-1].n+'</text></svg>'}
var TABS=["P&amp;L","Accuracy","Target hits","Sector"],TRY="Qwen · Mistral · Gemini";
/* the round on the card in front, for the certificate */
var cur=document.querySelector('#car .card.cur'),cn=cur&&(cur.textContent.match(/#(\d+)/)||[])[1],R=ROUNDS.filter(function(r){return String(r.n)===cn})[0]||G[G.length-1];
var calls=R.calls.map(function(x){var m=x[0],dn=/^DOWN/.test(x[1]),mg=parseFloat(String(x[1]).replace(/^(UP|DOWN)\s*/,"")),v=(dn?-1:1)*mg,ok=(v<0)===(R.a<0);return {m:m,v:v,ok:ok,off:Math.abs(v-R.a),win:R.win&&R.win.toUpperCase().indexOf(m)>=0}});
calls.sort(function(a,b){if(a.ok!==b.ok)return a.ok?-1:1;return a.off-b.off});
function cv(v){return (v<0?"−":"+")+Math.abs(v)+"%"}
var nOk=calls.filter(function(c){return c.ok}).length;
var LOGO=window.__ezlogo||'';
var B={};
/* L1 The disc: every AI on a black disc like the logo's; pill rows; the leader's name ends in the gold square */
B.L1=function(){var css='.lg1{display:grid;gap:9px;margin-top:6px}.lg1-r{display:grid;grid-template-columns:auto 1fr auto;gap:11px;align-items:center;background:#04070e;border-radius:40px 16px 16px 40px;padding:6px 14px 6px 6px;box-shadow:inset 0 0 0 1px rgba(248,240,217,.10)}'+
 '.lg1-r .lgx-lx{font-size:21px}.lg1-n{display:flex;align-items:center;gap:6px}.lg1-pl{text-align:right;display:flex;align-items:center;gap:5px}.lg1-pl .lgx-lx{font-size:21px}'+
 '.lg1-1{background:radial-gradient(110% 160% at 0 0,rgba(253,188,42,.20),transparent 60%),#04070e;box-shadow:inset 0 0 0 1.5px #fdbc2a;padding:9px 14px 9px 9px}.lg1-1 .lgx-lx{font-size:26px}.lg1-1 .lg1-pl .lgx-lx{font-size:25px}'+
 '.lg1-rk{position:relative}.lg1-rk i{position:absolute;right:-5px;bottom:-3px;font:italic 900 12px/18px Kanit;min-width:18px;height:18px;text-align:center;background:#f8f0d9;color:#04070e;border-radius:9px;font-style:italic}.lg1-1 .lg1-rk i{background:#fdbc2a}'+
 '.lg1-tg{display:inline-block;margin-top:5px;font:italic 900 9px/1 Kanit;letter-spacing:.12em;color:#04070e;background:#fdbc2a;padding:4px 8px 3px;transform:skewX(-14deg)}'+
 '.lg1-try{border-radius:40px 16px 16px 40px;padding:10px 16px;border:1.5px dashed rgba(248,240,217,.2);display:flex;justify-content:space-between;align-items:center}'+
 '.lg1-pr,.lgx-pr.lg1-pr{background:#04070e;border-radius:22px;padding:14px;box-shadow:inset 0 0 0 1px rgba(248,240,217,.10)}'+
 '.lg1-tb{display:flex;gap:14px;margin-bottom:10px}.lg1-tb span{font:italic 800 13px/1 Kanit;color:rgba(248,240,217,.45);padding-bottom:6px}.lg1-tb span.on{color:#f8f0d9;box-shadow:inset 0 -3px 0 #03c870}'+
 '.lg1-q{margin:0 0 8px}.lg1-q .lgx-lx{font-size:21px;line-height:1.05}'+
 '.lg1-lr{display:grid;grid-template-columns:30px 1fr auto auto auto;gap:9px;align-items:center;padding:7px 0;border-top:1px solid rgba(248,240,217,.08)}.lg1-lr .lgx-lx{font-size:17px}.lg1-lr .lgx-sm{font-size:11.5px;text-align:right}';
 var h='<div class="lgx lg1">'+rows.map(function(r,i){return '<div class="lg1-r'+(i?'':' lg1-1')+'"><span class="lg1-rk">'+disc(r.m,i?44:56)+'<i>'+(i+1)+'</i></span><span><span class="lg1-n">'+lx(r.nm)+(i?'':dot(8))+'</span><span class="lgx-sm">'+r.W+'–'+r.L+' · '+p0(r.acc)+' right · '+r.stk+'</span>'+(i?'':'<br><span class="lg1-tg">MAKES THE BUYBACK CALL</span>')+'</span><span class="lg1-pl">'+(r.pnl<0?'':sl('#03c870',i?20:26))+lx(usd(r.pnl),r.pnl<0?'dn':'up')+(r.pnl<0?sl('#ff3a31',20,1):'')+'</span></div>'}).join('')+
  '<div class="lg1-try"><span class="lgx-cap">In tryouts</span><span class="lgx-sm" style="color:#f8f0d9">'+TRY+'</span></div></div>';
 var p='<div class="lgx-pr lg1-pr"><div class="lg1-tb">'+TABS.map(function(t,i){return '<span'+(i?'':' class="on"')+'>'+t+'</span>'}).join('')+'</div><p class="lg1-q">'+lx('Would following them have made you money?')+'</p><p class="lgx-sm" style="margin:0 0 6px">$100K each. The whole balance on every call. No leverage.</p>'+
  chart({w:330,h:170})+rows.map(function(r,i){return '<div class="lg1-lr">'+disc(r.m,26)+lx(r.nm,r===lead?'gd':'')+'<span class="lgx-sm up">'+usd(r.bw,1)+'</span><span class="lgx-sm dn">'+usd(r.bl,1)+'</span>'+lx(usd(r.pnl),r.pnl<0?'dn':'up')+'</div>'}).join('')+'</div>';
 return {css:css,std:h,proof:p}};
/* L2 Speed: rows lean like the logo's letters (a skewed black slab, the content kept upright), speed slashes cut in at the left, the leader's slab gold */
B.L2=function(){var css='.lg2{display:grid;gap:8px;margin:6px 6px 0}.lg2-r{transform:skewX(-12deg);background:#04070e;box-shadow:4px 4px 0 rgba(3,200,112,.55),inset 0 0 0 1px rgba(248,240,217,.1);position:relative}'+
 '.lg2-in{transform:skewX(12deg);display:grid;grid-template-columns:30px 1fr 56px 44px 84px;align-items:center;gap:6px;padding:9px 12px 9px 10px}.lg2-r:nth-child(n+2){box-shadow:4px 4px 0 rgba(255,58,49,.0),inset 0 0 0 1px rgba(248,240,217,.1)}'+
 '.lg2-k{font:italic 900 30px/.9 Kanit;color:rgba(248,240,217,.85)}.lg2-r .lgx-lx{font-size:19px}.lg2-v{text-align:right}.lg2-v b{display:block;font:italic 800 15px/1 Kanit}.lg2-v small{font:italic 700 8.5px/1.5 Kanit;letter-spacing:.1em;color:rgba(248,240,217,.5)}'+
 '.lg2-1{background:#fdbc2a}.lg2-1 .lg2-k,.lg2-1 .lg2-v b{color:#04070e}.lg2-1 .lg2-v small,.lg2-1 .lgx-sm{color:rgba(4,7,14,.62)}.lg2-1 .lgx-lx{color:#04070e}'+
 '.lg2-1 .up{color:#04070e!important}.lg2-1 .lg2-k{font-size:36px}'+
 '.lg2-st{position:absolute;left:-14px;top:50%;transform:translateY(-50%) skewX(12deg)}'+
 '.lg2-h{display:grid;grid-template-columns:30px 1fr 56px 44px 84px;gap:6px;padding:0 22px 4px 16px}.lg2-h span{text-align:right}'+
 '.lg2-try{transform:skewX(-12deg);border:1.5px dashed rgba(248,240,217,.22);padding:9px 14px}.lg2-try>div{transform:skewX(12deg);display:flex;justify-content:space-between}'+
 '.lg2-pr{background:#04070e;padding:14px 14px 10px;box-shadow:inset 0 0 0 1px rgba(248,240,217,.1);clip-path:polygon(0 0,calc(100% - 22px) 0,100% 22px,100% 100%,22px 100%,0 calc(100% - 22px))}'+
 '.lg2-tb{display:flex;gap:6px;margin-bottom:12px}.lg2-tb span{flex:1;text-align:center;font:italic 800 11.5px/1 Kanit;padding:8px 0;transform:skewX(-12deg);background:rgba(248,240,217,.07);color:rgba(248,240,217,.6)}.lg2-tb span.on{background:#f8f0d9;color:#04070e}'+
 '.lg2-q .lgx-lx{font-size:22px;line-height:1.02}.lg2-lr{display:grid;grid-template-columns:22px 1fr auto auto auto;gap:9px;align-items:center;padding:7px 0;border-top:1px solid rgba(248,240,217,.08)}.lg2-lr .lgx-lx{font-size:16px}';
 var h='<div class="lgx lg2"><div class="lg2-h lgx-cap"><span style="text-align:left">#</span><span style="text-align:left">AI</span><span>W–L</span><span>ACC</span><span>P&amp;L</span></div>'+rows.map(function(r,i){return '<div class="lg2-r'+(i?'':' lg2-1')+'">'+(i?'':'<span class="lg2-st">'+sl('#03c870',34)+'</span>')+'<div class="lg2-in"><span class="lg2-k">'+(i+1)+'</span><span>'+lx(r.nm)+'<br><span class="lgx-sm">'+r.ver+'</span></span><span class="lg2-v"><b><span class="up">'+r.W+'</span>–<span class="dn">'+r.L+'</span></b><small>'+r.stk+'</small></span><span class="lg2-v"><b>'+p0(r.acc)+'</b></span><span class="lg2-v"><b class="'+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'</b><small>'+pc(r.pct)+'</small></span></div></div>'}).join('')+
  '<div class="lg2-try"><div><span class="lgx-cap">In tryouts</span><span class="lgx-sm" style="color:#f8f0d9">'+TRY+'</span></div></div></div>';
 var p='<div class="lgx-pr lg2-pr"><div class="lg2-tb">'+TABS.map(function(t,i){return '<span'+(i?'':' class="on"')+'>'+t+'</span>'}).join('')+'</div><p class="lg2-q" style="margin:0 0 4px">'+lx('Would following them have made you money?')+'</p><p class="lgx-sm" style="margin:0 0 6px">$100K each. All in on every call. No leverage.</p>'+
  chart({w:330,h:170,speed:1})+rows.map(function(r,i){return '<div class="lg2-lr"><span class="lgx-lx" style="font-size:16px">'+(i+1)+'</span>'+lx(r.nm,r===lead?'gd':'')+'<span class="lgx-sm up">'+usd(r.bw,1)+'</span><span class="lgx-sm dn">'+usd(r.bl,1)+'</span>'+lx(usd(r.pnl),r.pnl<0?'dn':'up')+'</div>'}).join('')+'</div>';
 return {css:css,std:h,proof:p}};
/* L3 Title card: the leader set as a logo lockup ("CLAUDE." with the gold square, the slashes round its P&L), the others as three smaller lockups */
B.L3=function(){var css='.lg3{margin-top:4px}.lg3-hero{background:#04070e;border-radius:50% 50% 18px 18px / 26% 26% 18px 18px;padding:22px 16px 16px;text-align:center;box-shadow:inset 0 0 0 1px rgba(248,240,217,.1);position:relative}'+
 '.lg3-hero .lg3-nm{display:inline-flex;align-items:flex-end;gap:4px}.lg3-hero .lg3-nm .lgx-lx{font-size:60px}'+
 '.lg3-pl{display:flex;justify-content:center;align-items:center;gap:6px;margin-top:6px}.lg3-pl .lgx-lx{font-size:40px}'+
 '.lg3-mk{position:absolute;left:14px;top:14px}.lg3-no{position:absolute;right:16px;top:16px;font:italic 900 15px/1 Kanit;color:#fdbc2a}'+
 '.lg3-st{display:flex;justify-content:center;gap:18px;margin-top:10px}.lg3-st span{text-align:center}.lg3-st b{display:block;font:italic 900 17px/1.1 Kanit;color:#f8f0d9}'+
 '.lg3-call{display:inline-block;margin-top:12px;font:italic 900 10px/1 Kanit;letter-spacing:.14em;color:#04070e;background:#fdbc2a;padding:5px 10px 4px;transform:skewX(-14deg)}'+
 '.lg3-g{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:8px}.lg3-c{background:#04070e;border-radius:14px;padding:10px 8px 10px;text-align:center;box-shadow:inset 0 0 0 1px rgba(248,240,217,.1)}'+
 '.lg3-c .lgx-lx{font-size:21px}.lg3-c .lg3-p .lgx-lx{font-size:16px}.lg3-c .lg3-k{font:italic 900 12px/1 Kanit;color:rgba(248,240,217,.5)}.lg3-c .lgx-dc{margin:6px auto 6px}'+
 '.lg3-try{margin-top:8px;text-align:center}'+
 '.lg3-pr{background:#04070e;border-radius:18px;padding:14px;box-shadow:inset 0 0 0 1px rgba(248,240,217,.1)}.lg3-tb{display:flex;justify-content:center;gap:16px;margin-bottom:10px}.lg3-tb span{font:italic 800 12.5px/1 Kanit;color:rgba(248,240,217,.45)}.lg3-tb span.on{color:#fdbc2a}'+
 '.lg3-hl{text-align:center;margin:2px 0 2px}.lg3-hl .lgx-lx{font-size:30px}.lg3-pg{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:6px}.lg3-pg div{text-align:center}.lg3-pg .lgx-lx{font-size:15px}';
 var r0=rows[0];var h='<div class="lgx lg3"><div class="lg3-hero"><span class="lg3-mk">'+disc(r0.m,40)+'</span><span class="lg3-no">#1</span><span class="lg3-nm">'+lx(r0.nm.toUpperCase())+dot(13)+'</span><div class="lg3-pl">'+sl('#03c870',36)+lx(usd(r0.pnl),'up')+sl('#ff3a31',36,1)+'</div>'+
  '<div class="lg3-st"><span class="lgx-cap">Record<b><span class="up">'+r0.W+'</span>–<span class="dn">'+r0.L+'</span></b></span><span class="lgx-cap">Accuracy<b>'+p0(r0.acc)+'</b></span><span class="lgx-cap">Streak<b>'+r0.stk+'</b></span></div><span class="lg3-call">MAKES THE BUYBACK CALL</span></div>'+
  '<div class="lg3-g">'+rows.slice(1).map(function(r,i){return '<div class="lg3-c"><span class="lg3-k">#'+(i+2)+'</span>'+disc(r.m,32)+lx(r.nm)+'<div class="lg3-p">'+lx(usd(r.pnl),r.pnl<0?'dn':'up')+'</div><div class="lgx-sm">'+r.W+'–'+r.L+' · '+p0(r.acc)+'</div></div>'}).join('')+'</div>'+
  '<div class="lg3-try"><span class="lgx-cap">In tryouts · </span><span class="lgx-sm" style="color:#f8f0d9">'+TRY+'</span></div></div>';
 var p='<div class="lgx-pr lg3-pr"><div class="lg3-tb">'+TABS.map(function(t,i){return '<span'+(i?'':' class="on"')+'>'+t+'</span>'}).join('')+'</div><div class="lg3-hl">'+lx('$100K')+' <span class="lgx-cap">on '+r0.nm+' is now</span><br>'+lx('$'+Math.round(S[r0.m][G.length]).toLocaleString('en-US'),'up')+'</div>'+
  chart({w:330,h:160})+'<div class="lg3-pg">'+rows.map(function(r){return '<div><span class="lgx-cap" style="color:'+(r===lead?'#fdbc2a':MC[r.m])+'">'+r.nm+'</span><br>'+lx(usd(r.pnl,1),r.pnl<0?'dn':'up')+'</div>'}).join('')+'</div></div>';
 return {css:css,std:h,proof:p}};
/* the certificate in the logo's look: black, the head lettered like the logo, PASS and FAIL as slanted green and red slabs, the winner's gold square, the logo itself as the seal */
function cert(v){var css='.lgc{position:absolute;inset:0;background:#04070e;border-radius:inherit;padding:calc(var(--u,1px)*10) calc(var(--u,1px)*11);display:flex;flex-direction:column;color:#f8f0d9;font-family:Kanit,sans-serif;overflow:hidden;z-index:5}'+
 '.lgc-hd{display:flex;align-items:center;justify-content:space-between}.lgc-hd .lgx-lx{font-size:21px}.lgc-no{font:italic 800 9px/1 Kanit;letter-spacing:.1em;color:rgba(248,240,217,.55)}'+
 '.lgc-co{font:600 10px/1.2 "Barlow Condensed";letter-spacing:.06em;color:rgba(248,240,217,.6);margin:3px 0 7px;text-transform:uppercase}'+
 '.lgc-r{display:grid;grid-template-columns:20px 1fr auto 36px;gap:6px;align-items:center;padding:5px 0;border-top:1px solid rgba(248,240,217,.09)}.lgc-r .lgx-lx{font-size:14px}.lgc-cl{font:italic 800 13px/1 Kanit;text-align:right}'+
 '.lgc-pf{font:italic 900 8.5px/1 Kanit;letter-spacing:.06em;color:#04070e;text-align:center;padding:4px 0 3px;transform:skewX(-14deg)}.lgc-pf.p{background:#03c870}.lgc-pf.f{background:#ff3a31}'+
 '.lgc-w{grid-column:2/-1;font:italic 900 7.5px/1 Kanit;letter-spacing:.12em;color:#fdbc2a;margin:-2px 0 1px;display:flex;align-items:center;gap:4px}'+
 '.lgc-mk{display:flex;justify-content:space-between;align-items:center;border-top:1.5px solid rgba(248,240,217,.3);border-bottom:1.5px solid rgba(248,240,217,.3);padding:6px 0;margin-top:5px}.lgc-mk .lgx-lx{font-size:19px}'+
 '.lgc-ft{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end}.lgc-ft .lgx-cap{font-size:7px}.lgc-ft b{display:block;font:italic 800 11px/1.3 Kanit;color:#f8f0d9;letter-spacing:0}.lgc-seal{width:48px;height:48px;transform:rotate(-8deg)}.lgc-seal svg{width:100%;height:100%;display:block}';
 if(v==='L2')css+='.lgc{clip-path:polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,18px 100%,0 calc(100% - 18px))}.lgc-r{border-top:0;background:rgba(248,240,217,.05);transform:skewX(-10deg);padding:5px 6px;margin-top:3px}.lgc-r>*{transform:skewX(10deg)}';
 if(v==='L3')css+='.lgc-hd{flex-direction:column;align-items:center}.lgc-hd .lgx-lx{font-size:26px}.lgc-co{text-align:center}.lgc-ft{justify-content:center;gap:12px;align-items:center}';
 var h='<div class="lgc"><div class="lgc-hd"><span style="display:inline-flex;align-items:flex-end;gap:2px">'+lx('GRADED','cut')+dot(6)+'</span><span class="lgc-no">No. '+String(R.n).padStart(4,'0')+'</span></div><div class="lgc-co">'+R.co+' ('+R.ticker+') · '+nOk+' of '+calls.length+' right</div>'+
  calls.map(function(c){return (c.win?'<div class="lgc-w" style="display:grid;grid-template-columns:20px 1fr;gap:6px"><span></span><span style="display:flex;align-items:center;gap:4px">'+dot(5)+'WINNER</span></div>':'')+'<div class="lgc-r">'+disc(c.m,18)+lx(NM[c.m]||c.m,c.win?'gd':'')+'<span class="lgc-cl '+(c.ok?'up':'dn')+'">'+cv(c.v)+'</span><span class="lgc-pf '+(c.ok?'p':'f')+'">'+(c.ok?'PASS':'FAIL')+'</span></div>'}).join('')+
  '<div class="lgc-mk"><span class="lgx-cap" style="color:#f8f0d9">Market</span>'+lx(cv(R.a),R.a<0?'dn':'up')+'</div>'+
  '<div class="lgc-ft"><span class="lgx-cap">Calls filed<b>'+fmtDate(R.called)+'</b></span><span class="lgx-cap">Graded on<b>'+fmtDate(R.resolves)+'</b></span><span class="lgc-seal">'+LOGO+'</span></div></div>';
 return {css:css,html:h}}
var o=B[V](),c=cert(V);var st=document.createElement('style');st.textContent=BASE+o.css+c.css+'#standings .x2p-flip,#learn .x2p-pt{display:none!important}';document.head.appendChild(st);
var fl=document.querySelector('#standings .x2p-flip');var w=document.createElement('div');w.innerHTML=o.std;fl.parentNode.insertBefore(w,fl.nextSibling);
var pt=document.querySelector('#learn .x2p-pt');var w2=document.createElement('div');w2.innerHTML=o.proof;pt.parentNode.insertBefore(w2,pt.nextSibling);
var fin=cur&&cur.querySelector('.face.back .fin .xc');if(fin){if(getComputedStyle(fin).position==='static')fin.style.position='relative';fin.insertAdjacentHTML('beforeend',c.html)}
window.__lgOk=[!!fin,R.n]})();
