/* r1028 standings (owner, 2026-10-27 night). window.__r28 = 'L2' (Speed, with the AIs' logos and flags, no streaks, "Hit rate"; and its proof
   with Biggest W / Biggest L / P&L labelled and the logos) or 'TT' (the timing tower with the terminal's LIVE tag and its P&L sparklines; no gap,
   no "leader · buyback call", no streak; W-L; logos and flags). Runs in the real page; numbers from window.__x2pPnl() and ROUNDS.
   Class prefixes r2- and rt- (the site owns .lg .pc .rs .xg .mk .u .d .s .ft .fd .st .gt-b .pg .top .tick .cg .sb). */
(function(){
var V=window.__r28;if(!V)return;
var P=window.__x2pPnl(),A=P.A,G=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)});
var NM={GPT:"GPT",KIMI:"Kimi",CLAUDE:"Claude",GROK:"Grok"},CC={GPT:"US",CLAUDE:"US",GROK:"US",KIMI:"CN"};
var rows=Object.keys(A).map(function(m){var t=A[m];return {m:m,nm:NM[m]||m,ver:t.ver,W:t.W,L:t.L,n:t.W+t.L,acc:t.W/(t.W+t.L),pnl:t.pnl,pct:t.pct,bw:t.bw,bl:t.bl}});
rows.sort(function(a,b){var ha=a.n>=G.length/2,hb=b.n>=G.length/2;if(ha!==hb)return ha?-1:1;return b.pnl-a.pnl});var lead=rows[0];
var S={};rows.forEach(function(r){var b=100000,s=[b];G.forEach(function(g){var p=A[r.m].per[g.n];if(p)b+=p.v;s.push(b)});S[r.m]=s});
function usd(v,k){var s=v<0?"−":"+",a=Math.abs(v);if(k&&a>=1000)return s+"$"+(a/1000).toFixed(1)+"K";return s+"$"+Math.round(a).toLocaleString("en-US")}
function pc(v){return (v<0?"−":"+")+Math.abs(v).toFixed(1)+"%"}function p0(v){return Math.round(v*100)+"%"}
var MC={GPT:"#10a37f",KIMI:"#1e80ff",CLAUDE:"#d97757",GROK:"#f8f0d9"};
function mark(m,fill,sz){var M=MODELS[m];return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" aria-hidden="true"><path fill="'+fill+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+' d="'+M.d+'"/></svg>'}
function disc(m,sz){return '<span class="r2-dc" style="width:'+sz+'px;height:'+sz+'px">'+mark(m,MC[m],Math.round(sz*.54))+'</span>'}
/* flags, drawn like the live board's stub flags but in full colour for a dark ground, with a cream keyline so they read at a glance */
function star(cx,cy,r){var q=[];for(var i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r;q.push((cx+rr*Math.cos(a)).toFixed(2)+","+(cy+rr*Math.sin(a)).toFixed(2))}return q.join(" ")}
function flag(cc,w){var h=Math.round(w*10/16*10)/10,v='<svg class="r2-fl" viewBox="0 0 16 10" width="'+w+'" height="'+h+'" preserveAspectRatio="none" role="img" aria-label="'+({US:"United States",CN:"China",EU:"Europe"}[cc])+'">',i,RED="#d0262f",NAVY="#253f8a",YEL="#ffd23a";
 if(cc==="US"){v+='<rect width="16" height="10" fill="#fff"/>';for(i=0;i<7;i+=2)v+='<rect y="'+(i*10/7).toFixed(3)+'" width="16" height="'+(10/7).toFixed(3)+'" fill="'+RED+'"/>';v+='<rect width="6.6" height="'+(40/7).toFixed(3)+'" fill="'+NAVY+'"/>';
  [[1.3,1.25],[3.3,1.25],[5.3,1.25],[1.3,3.4],[3.3,3.4],[5.3,3.4]].forEach(function(q){v+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r=".62" fill="#fff"/>'})}
 else if(cc==="CN"){v+='<rect width="16" height="10" fill="'+RED+'"/><polygon points="'+star(3.2,3,2.15)+'" fill="'+YEL+'"/>';[[6.2,1.1],[7.2,2.2],[7.2,3.7],[6.2,4.8]].forEach(function(q){v+='<polygon points="'+star(q[0],q[1],.72)+'" fill="'+YEL+'"/>'})}
 else{v+='<rect width="16" height="10" fill="'+NAVY+'"/>';for(i=0;i<12;i++){var a=i*Math.PI/6;v+='<circle cx="'+(8+3.3*Math.cos(a)).toFixed(2)+'" cy="'+(5+3.3*Math.sin(a)).toFixed(2)+'" r=".55" fill="'+YEL+'"/>'}}
 return v+'</svg>'}
var TRY=[["Qwen","CN"],["Mistral","EU"],["Gemini","US"]];
function tryouts(cls){return TRY.map(function(t){return '<span class="'+cls+'">'+t[0]+flag(t[1],cls==='rt-tc'?12:15)+'</span>'}).join('')}
function sl(col,h,flip){return '<svg viewBox="0 0 14 30" height="'+h+'" aria-hidden="true" style="display:inline-block;vertical-align:middle'+(flip?';transform:scaleX(-1) rotate(180deg)':'')+'"><path fill="'+col+'" d="M9 0h4L5 30H1z M4 4h2.6L2.6 19H0z"/></svg>'}
function lx(t,cls){return '<b class="r2-lx '+(cls||'')+'">'+t+'</b>'}
function chart(o){var W=o.w,H=o.h,pad=[8,30,16,2],all=[];rows.forEach(function(r){all=all.concat(S[r.m])});var lo=Math.floor(Math.min.apply(0,all)/10000)*10000,hi=Math.ceil(Math.max.apply(0,all)/10000)*10000,N=G.length;
 var x=function(i){return pad[3]+(W-pad[1]-pad[3])*i/N},y=function(v){return pad[0]+(H-pad[0]-pad[2])*(1-(v-lo)/(hi-lo))},g='';
 for(var v=lo;v<=hi;v+=20000)g+='<line x1="'+pad[3]+'" x2="'+(W-pad[1])+'" y1="'+y(v).toFixed(1)+'" y2="'+y(v).toFixed(1)+'" stroke="rgba(248,240,217,'+(v===100000?.35:.08)+')"'+(v===100000?' stroke-dasharray="4 4"':'')+'/><text x="'+(W-pad[1]+4)+'" y="'+(y(v)+3).toFixed(1)+'" font-size="8.5" font-style="italic" font-weight="700" fill="rgba(248,240,217,.45)" font-family="Kanit">'+(v/1000)+'K</text>';
 var ls='';rows.slice().reverse().forEach(function(r){var d=S[r.m].map(function(v,i){return (i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)}).join(' '),c=r===lead?"#fdbc2a":MC[r.m];
  ls+='<path d="'+d+'" transform="translate(-5 2)" fill="none" stroke="'+c+'" stroke-opacity=".25" stroke-width="1.4"/><path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+(r===lead?2.6:1.8)+'" stroke-linejoin="round"/>'});
 return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="display:block">'+g+ls+'<text x="2" y="'+(H-3)+'" font-size="8.5" font-style="italic" font-weight="700" fill="rgba(248,240,217,.45)" font-family="Kanit">R1</text><text x="'+(W-pad[1])+'" y="'+(H-3)+'" text-anchor="end" font-size="8.5" font-style="italic" font-weight="700" fill="rgba(248,240,217,.45)" font-family="Kanit">R'+G[N-1].n+'</text></svg>'}
var TABS=["P&amp;L","Accuracy","Target hits","Sector"];
var BASE='.r2-dc{display:inline-grid;place-content:center;border-radius:50%;background:#04070e;box-shadow:0 0 0 1.5px rgba(248,240,217,.18);flex:none}.r2-fl{display:inline-block;flex:none;vertical-align:middle;border-radius:1.5px;box-shadow:0 0 0 1px rgba(248,240,217,.55)}'+
 '.r2-lx{font-family:Kanit,sans-serif;font-style:italic;font-weight:900;letter-spacing:-.01em;line-height:.95;color:#f8f0d9}.r2-lx.up{color:#03c870}.r2-lx.dn{color:#ff3a31}.r2-lx.gd{color:#fdbc2a}'+
 '.r2-sm{font:600 10.5px/1.25 "Barlow Condensed",sans-serif;color:rgba(248,240,217,.58);letter-spacing:.04em}.r2-cap{font:italic 800 9px/1 Kanit,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(248,240,217,.55)}'+
 '.r2w .up,.r2p .up,.rtw .up{color:#03c870}.r2w .dn,.r2p .dn,.rtw .dn{color:#ff3a31}';
var B={};
B.L2=function(){var css='.r2w{display:grid;gap:8px;margin:6px 6px 0}.r2-r{transform:skewX(-12deg);background:#04070e;box-shadow:inset 0 0 0 1px rgba(248,240,217,.1);position:relative}'+
 '.r2-in,.r2-h{display:grid;grid-template-columns:26px minmax(0,1fr) 50px 46px 80px;align-items:center;gap:6px}.r2-in{transform:skewX(12deg);padding:9px 12px 9px 10px}'+
 '.r2-k{font:italic 900 28px/.9 Kanit;color:rgba(248,240,217,.85)}.r2-ai{display:flex;align-items:center;gap:8px;min-width:0}.r2-ai .r2-lx{font-size:18px;white-space:nowrap}.r2-nm{display:flex;align-items:center;gap:6px}'+
 '.r2-v{text-align:right}.r2-v b{display:block;font:italic 800 15px/1 Kanit}.r2-v small{font:italic 700 9px/1.5 Kanit;color:rgba(248,240,217,.55)}'+
 '.r2-1{background:#fdbc2a;box-shadow:4px 4px 0 rgba(3,200,112,.55)}.r2-1 .r2-k,.r2-1 .r2-v b,.r2-1 .r2-lx{color:#04070e}.r2-1 .r2-v small,.r2-1 .r2-sm{color:rgba(4,7,14,.62)}.r2-1 .up{color:#04070e!important}.r2-1 .dn{color:#a3120c!important}.r2-1 .r2-k{font-size:34px}'+
 '.r2-1 .r2-fl{box-shadow:0 0 0 1px rgba(4,7,14,.6)}.r2-st{position:absolute;left:-14px;top:50%;transform:translateY(-50%) skewX(12deg)}'+
 '.r2-h{padding:0 22px 2px 16px;white-space:nowrap}.r2-h span{letter-spacing:.06em}.r2-h span:nth-child(n+3){text-align:right}'+
 '.r2-try{transform:skewX(-12deg);border:1.5px dashed rgba(248,240,217,.22);padding:9px 14px}.r2-try>div{transform:skewX(12deg);display:flex;justify-content:space-between;align-items:center;gap:8px}.r2-tc{display:inline-flex;align-items:center;gap:5px;font:italic 800 12px/1 Kanit;color:#f8f0d9;margin-left:9px}'+
 '.r2p{background:#04070e;padding:14px 14px 10px;box-shadow:inset 0 0 0 1px rgba(248,240,217,.1);clip-path:polygon(0 0,calc(100% - 22px) 0,100% 22px,100% 100%,22px 100%,0 calc(100% - 22px))}'+
 '.r2-tb{display:flex;gap:6px;margin-bottom:12px}.r2-tb span{flex:1;text-align:center;font:italic 800 11.5px/1 Kanit;padding:8px 0;transform:skewX(-12deg);background:rgba(248,240,217,.07);color:rgba(248,240,217,.6)}.r2-tb span.on{background:#f8f0d9;color:#04070e}'+
 '.r2-q .r2-lx{font-size:22px;line-height:1.02}.r2-lr,.r2-lh{display:grid;grid-template-columns:14px 24px minmax(0,1fr) 58px 56px 72px;gap:7px;align-items:center}.r2-lr{padding:7px 0;border-top:1px solid rgba(248,240,217,.08)}.r2-lr .r2-lx{font-size:16px}.r2-lr .r2-n{font-size:15px}'+
 '.r2-lh{white-space:nowrap;letter-spacing:.06em;padding:10px 0 6px;border-top:1.5px solid rgba(248,240,217,.3);margin-top:6px}.r2-lh span:nth-child(n+4),.r2-lr>:nth-child(n+4){text-align:right}.r2-lh .w{color:#03c870}.r2-lh .l{color:#ff3a31}.r2-lr .r2-sm{font-size:12px;font-weight:700}';
 var h='<div class="r2w"><div class="r2-h r2-cap"><span>#</span><span>AI</span><span>W-L</span><span>Hit rate</span><span>P&amp;L</span></div>'+rows.map(function(r,i){return '<div class="r2-r'+(i?'':' r2-1')+'">'+(i?'':'<span class="r2-st">'+sl('#03c870',34)+'</span>')+'<div class="r2-in"><span class="r2-k">'+(i+1)+'</span><span class="r2-ai">'+disc(r.m,i?30:34)+'<span style="min-width:0"><span class="r2-nm">'+lx(r.nm)+flag(CC[r.m],18)+'</span><span class="r2-sm">'+r.ver+'</span></span></span><span class="r2-v"><b><span class="up">'+r.W+'</span>-<span class="dn">'+r.L+'</span></b></span><span class="r2-v"><b>'+p0(r.acc)+'</b></span><span class="r2-v"><b class="'+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'</b><small>'+pc(r.pct)+'</small></span></div></div>'}).join('')+
  '<div class="r2-try"><div><span class="r2-cap">In tryouts</span><span>'+tryouts('r2-tc')+'</span></div></div></div>';
 var p='<div class="r2p"><div class="r2-tb">'+TABS.map(function(t,i){return '<span'+(i?'':' class="on"')+'>'+t+'</span>'}).join('')+'</div><p class="r2-q" style="margin:0 0 4px">'+lx('Would following them have made you money?')+'</p><p class="r2-sm" style="margin:0 0 6px">$100K each. All in on every call. No leverage.</p>'+chart({w:330,h:170})+
  '<div class="r2-lh r2-cap"><span>#</span><span></span><span>AI</span><span>Biggest <span class="w">W</span></span><span>Biggest <span class="l">L</span></span><span>P&amp;L</span></div>'+
  rows.map(function(r,i){return '<div class="r2-lr"><span class="r2-lx r2-n">'+(i+1)+'</span>'+disc(r.m,24)+lx(r.nm,r===lead?'gd':'')+'<span class="r2-sm up">'+usd(r.bw,1)+'</span><span class="r2-sm dn">'+usd(r.bl,1)+'</span>'+lx(usd(r.pnl),r.pnl<0?'dn':'up')+'</div>'}).join('')+'</div>';
 return {css:css,std:h,proof:p}};
/* TT: the timing tower (Saira Condensed, glass rows, a colour bar, position boxes) with the terminal's LIVE tag and its P&L sparklines, in the
   logo's colours (the header bar the logo's red, the leader's box its gold) */
B.TT=function(){function spark(m,w,h){var s=S[m],lo=Math.min.apply(0,s),hi=Math.max.apply(0,s),d=s.map(function(v,i){return (i?'L':'M')+(w*i/(s.length-1)).toFixed(1)+' '+(2+(h-4)*(1-(v-lo)/(hi-lo||1))).toFixed(1)}).join(' '),up=s[s.length-1]>=100000,c=up?'#03c870':'#ff3a31';
  var y0=(2+(h-4)*(1-(100000-lo)/(hi-lo||1))).toFixed(1);return '<svg viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" aria-hidden="true"><line x1="0" x2="'+w+'" y1="'+y0+'" y2="'+y0+'" stroke="rgba(255,255,255,.18)" stroke-dasharray="2 2"/><path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="1.3" stroke-linejoin="round"/></svg>'}
 var css='.rtw{font-family:"Saira Condensed",sans-serif;margin-top:6px;background:linear-gradient(180deg,rgba(18,19,28,.95),rgba(8,9,14,.95));border-radius:6px;overflow:hidden;border:1px solid rgba(255,255,255,.08);color:#fff}'+
 '.rt-hd{display:flex;justify-content:space-between;align-items:center;padding:7px 8px 7px 10px;background:#ff3a31;color:#fff;font:800 13px/1 "Saira Condensed";letter-spacing:.08em}'+
 '.rt-live{display:inline-flex;align-items:center;gap:6px;background:#fff;color:#04070e;border-radius:3px;padding:4px 7px 3px;font:800 11.5px/1 "Saira Condensed";letter-spacing:.14em}.rt-live i{width:7px;height:7px;border-radius:50%;background:#ff3a31;box-shadow:0 0 0 2px rgba(255,58,49,.25)}'+
 '.rt-cols,.rt-r{display:grid;grid-template-columns:26px 4px minmax(0,1fr) 44px 50px 78px;align-items:center;column-gap:7px;padding:0 10px}'+
 '.rt-cols{padding-top:7px;padding-bottom:5px;font:700 9px/1 "Saira Condensed";letter-spacing:.12em;color:rgba(255,255,255,.5)}.rt-cols span:nth-child(4),.rt-cols span:nth-child(5){text-align:center}.rt-cols span:nth-child(6){text-align:right}'+
 '.rt-r{height:58px;border-top:1px solid rgba(255,255,255,.07)}.rt-r:nth-child(odd){background:rgba(255,255,255,.025)}'+
 '.rt-pos{width:26px;height:26px;background:#f8f0d9;color:#04070e;display:grid;place-content:center;font:800 16px/1 "Saira Condensed";border-radius:3px}.rt-1 .rt-pos{background:#fdbc2a}'+
 '.rt-bar{width:4px;height:34px;border-radius:2px}.rt-ai{display:flex;align-items:center;gap:7px;min-width:0}.rt-lo{width:24px;height:24px;border-radius:50%;background:#04070e;box-shadow:0 0 0 1px rgba(255,255,255,.16);display:grid;place-content:center;flex:none}'+
 '.rt-ai b{font:800 18px/1 "Saira Condensed";letter-spacing:.04em;text-transform:uppercase;display:flex;align-items:center;gap:5px;white-space:nowrap}.rt-ai small{display:flex;align-items:center;gap:5px;font:600 10.5px/1.25 "Saira Condensed";color:rgba(255,255,255,.5);letter-spacing:.02em;margin-top:3px;white-space:nowrap}'+
 '.rt-v{text-align:center;font:700 15px/1 "Saira Condensed";font-variant-numeric:tabular-nums}'+
 '.rt-pl{text-align:right;font-variant-numeric:tabular-nums}.rt-pl b{display:block;font:800 17px/1 "Saira Condensed"}.rt-pl svg{display:block;margin:4px 0 0 auto}.rt-1 .rt-pl b.up{color:#fdbc2a}'+
 '.rt-5{height:46px;border-top:1px dashed rgba(255,255,255,.18)}.rt-5 .rt-pos{background:transparent;color:#f8f0d9;box-shadow:inset 0 0 0 1.5px rgba(248,240,217,.6);font-size:13px;letter-spacing:.02em}.rt-5 .rt-bar{height:22px;background:repeating-linear-gradient(180deg,rgba(248,240,217,.5) 0 3px,transparent 3px 6px)}'+
 '.rt-5t{font:700 11px/1 "Saira Condensed";letter-spacing:.12em;color:rgba(255,255,255,.6);white-space:nowrap}.rt-5n{grid-column:4/-1;display:flex;justify-content:flex-end;gap:2px}.rt-5n .rt-tc{margin-left:8px}'+
 '.rt-try{display:flex;justify-content:space-between;align-items:center;padding:9px 10px;border-top:1px dashed rgba(255,255,255,.15);font:700 11px/1 "Saira Condensed";letter-spacing:.1em;color:rgba(255,255,255,.55)}.rt-tc{display:inline-flex;align-items:center;gap:5px;margin-left:10px;color:#fff;font:700 12px/1 "Saira Condensed";letter-spacing:.04em}';
 var h='<div class="rtw"><div class="rt-hd"><span>SEASON 1 · ROUND '+G[G.length-1].n+'</span><span class="rt-live"><i></i>LIVE</span></div><div class="rt-cols"><span>POS</span><span></span><span>AI</span><span>W-L</span><span>HIT RATE</span><span>P&amp;L</span></div>'+
  rows.map(function(r,i){return '<div class="rt-r'+(i?'':' rt-1')+'"><span class="rt-pos">'+(i+1)+'</span><span class="rt-bar" style="background:'+(i?(r.m==="GROK"?"#e9e9ee":MC[r.m]):"#fdbc2a")+'"></span><span class="rt-ai"><span class="rt-lo">'+mark(r.m,MC[r.m],14)+'</span><span style="min-width:0"><b>'+r.nm+'</b><small>'+r.ver.replace(/^GPT-/,'')+flag(CC[r.m],12)+'</small></span></span><span class="rt-v"><span class="up">'+r.W+'</span>-<span class="dn">'+r.L+'</span></span><span class="rt-v">'+p0(r.acc)+'</span><span class="rt-pl"><b class="'+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'</b>'+spark(r.m,70,16)+'</span></div>'}).join('')+
  '<div class="rt-r rt-5"><span class="rt-pos">5?</span><span class="rt-bar"></span><span class="rt-5t">IN TRYOUTS</span><span class="rt-5n">'+tryouts('rt-tc')+'</span></div></div>';
 return {css:css,std:h}};
var o=B[V]();var st=document.createElement('style');st.textContent=BASE+o.css+'#standings .x2p-flip'+(o.proof?',#learn .x2p-pt':'')+'{display:none!important}';document.head.appendChild(st);
var fl=document.querySelector('#standings .x2p-flip');var w=document.createElement('div');w.innerHTML=o.std;fl.parentNode.insertBefore(w,fl.nextSibling);
if(o.proof){var pt=document.querySelector('#learn .x2p-pt');var w2=document.createElement('div');w2.innerHTML=o.proof;pt.parentNode.insertBefore(w2,pt.nextSibling)}
/* the P&L label centred over its figures (owner, 2026-10-27, later) */
var plh=document.querySelector('.rt-cols span:last-child');if(plh){var fw=Math.max.apply(0,[].slice.call(document.querySelectorAll('.rt-pl b')).map(function(b){return b.getBoundingClientRect().width}));var r0=document.createRange();r0.selectNodeContents(plh);plh.style.paddingRight=Math.max(0,(fw-r0.getBoundingClientRect().width)/2).toFixed(2)+'px';
 var fr=[].slice.call(document.querySelectorAll('.rt-pl b')).map(function(b){return b.getBoundingClientRect()}),fc=(Math.min.apply(0,fr.map(function(q){return q.left}))+Math.max.apply(0,fr.map(function(q){return q.right})))/2,lr=plh.getBoundingClientRect();
 var rg=document.createRange();rg.selectNodeContents(plh);var tr=rg.getBoundingClientRect();window.__rtPl=Math.round(((tr.left+tr.right)/2-fc)*10)/10}
/* no row may run past its box */
var bad=[];document.querySelectorAll('.r2w *,.r2p *,.rtw *').forEach(function(e){var p=e.closest('.r2-in,.rt-r,.r2-lr,.r2-lh,.rt-cols,.r2-h');if(!p||e===p)return;var a=e.getBoundingClientRect(),b=p.getBoundingClientRect();if(a.width&&(a.right>b.right+1||a.left<b.left-1))bad.push((e.className.baseVal!=null?e.className.baseVal:e.className)+' '+Math.round(a.right-b.right))});
var gaps=[].slice.call(document.querySelectorAll('.rt-r:not(.rt-5)')).map(function(r){var f=r.querySelector('.r2-fl'),v=r.querySelector('.rt-v');if(!f||!v)return null;var rg=document.createRange();rg.selectNodeContents(v);return Math.round((rg.getBoundingClientRect().left-f.getBoundingClientRect().right)*10)/10});window.__rtGap=gaps;
window.__r28Ok=bad.slice(0,8)})();
