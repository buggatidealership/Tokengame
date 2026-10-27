/* r1028b: the proof in L2 Speed's look, all four tabs (owner, 2026-10-27: "the one that I was the biggest fan of was the L2 speed one for
   getting smarter or just lucky... the only thing on that one is again PNL has to be in the middle"; "do top W and top L"; "I would like to see
   how every single tab... looks in the new look"). Runs in the real page; numbers from window.__x2pPnl(), ROUNDS and RMETA, computed the way
   x2pProof does (the same ranking rules, the same 50/50 start, the same sector bands). Puts four cards (#r2pv-pnl, -acc, -tgt, -sec) into
   #learn in place of the page's ticket. Class prefix r2v- (the site owns .lg .pc .rs .xg .mk .u .d .s .ft .fd .st .gt-b .pg .top .tick .cg .sb). */
(function(){
var P=window.__x2pPnl(),A=P.A,MK=Object.keys(A),G=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)}),N=G.length;
var NM={GPT:"GPT",KIMI:"Kimi",CLAUDE:"Claude",GROK:"Grok"},MC={GPT:"#10a37f",KIMI:"#1e80ff",CLAUDE:"#d97757",GROK:"#f8f0d9"};
var SH={"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"};
function callOf(r,m){return (r.calls||[]).filter(function(c){return c[0]===m})[0]}
var S={};MK.forEach(function(m){var n=0,k=0,off=0,run=[50],bal=100000,b=[bal],calls=[];G.forEach(function(r){var c=callOf(r,m);if(c){var dn=/^DOWN/.test(c[1]),ok=((dn?-1:1)>0)===(r.a>0),o=parseFloat(c[2])||0;n++;if(ok)k++;off+=o;calls.push({ok:ok,off:o,n:r.n});
  run.push((k+1)/(n+2)*100);bal*=1+(dn?-1:1)*r.a/100}else run.push(run[run.length-1]);b.push(bal)});
 var bu=calls.filter(function(c){return c.ok&&c.off<=.1}).length,w1=calls.filter(function(c){return c.ok&&c.off<=1}).length,ot=calls.filter(function(c){return !c.ok}).length;
 S[m]={m:m,n:n,k:k,hit:n?k/n:0,miss:n?off/n:0,run:run,bal:b,calls:calls,bu:bu,w1:w1,ot:ot,pnl:A[m].pnl,bw:A[m].bw,bl:A[m].bl}});
var half=function(m){return S[m].n>=N/2};
var byP=MK.slice().sort(function(a,b){return half(a)!==half(b)?(half(a)?-1:1):S[b].pnl-S[a].pnl});
var byH=MK.slice().sort(function(a,b){return half(a)!==half(b)?(half(a)?-1:1):(S[b].hit-S[a].hit)||(S[a].miss-S[b].miss)});
var byT=MK.slice().sort(function(a,b){return (S[b].bu-S[a].bu)||(S[b].w1-S[a].w1)||(S[a].ot-S[b].ot)});
function usd(v,k){var s=v<0?"−":"+",a=Math.abs(v);if(k&&a>=1000)return s+"$"+(a/1000).toFixed(1)+"K";return s+"$"+Math.round(a).toLocaleString("en-US")}
function mark(m,fill,sz){var M=MODELS[m];return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" aria-hidden="true"><path fill="'+fill+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+' d="'+M.d+'"/></svg>'}
function disc(m,sz){return '<span class="r2v-dc" style="width:'+sz+'px;height:'+sz+'px">'+mark(m,MC[m],Math.round(sz*.54))+'</span>'}
function lx(t,c){return '<b class="r2v-lx '+(c||'')+'">'+t+'</b>'}
/* a line chart in L2's look: one line per AI in its colour, the view's leader gold on top, a faint speed copy behind each, a square at each end */
function chart(series,lead,o){var W=330,H=o.H||170,pad=o.ends?[8,46,16,30]:[8,30,16,2],all=[];MK.forEach(function(m){all=all.concat(series[m])});var lo=o.lo!=null?o.lo:Math.floor(Math.min.apply(0,all)/o.step)*o.step,hi=o.hi!=null?o.hi:Math.ceil(Math.max.apply(0,all)/o.step)*o.step;
 var x=function(i){return pad[3]+(W-pad[1]-pad[3])*i/N},y=function(v){return pad[0]+(H-pad[0]-pad[2])*(1-(Math.max(lo,Math.min(hi,v))-lo)/(hi-lo))},g='';
 for(var v=lo;v<=hi+1e-9;v+=o.step)g+='<line x1="'+pad[3]+'" x2="'+(W-pad[1])+'" y1="'+y(v).toFixed(1)+'" y2="'+y(v).toFixed(1)+'" stroke="rgba(248,240,217,'+(v===o.base?.35:.08)+')"'+(v===o.base?' stroke-dasharray="4 4"':'')+'/><text x="'+(W-pad[1]+4)+'" y="'+(y(v)+3).toFixed(1)+'" font-size="8.5" font-style="italic" font-weight="700" fill="rgba(248,240,217,.45)" font-family="Kanit">'+o.fmt(v)+'</text>';if(o.ends)g=g.replace(/<text x="[^"]*" y="([^"]*)"/g,'<text x="'+(pad[3]-4)+'" y="$1" text-anchor="end"');
 var ls='';MK.filter(function(m){return m!==lead}).concat([lead]).forEach(function(m){var d=series[m].map(function(v,i){return (i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)}).join(' '),c=m===lead?"#fdbc2a":MC[m];
  ls+='<path d="'+d+'" transform="translate(-5 2)" fill="none" stroke="'+c+'" stroke-opacity=".25" stroke-width="1.4"/><path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+(m===lead?2.6:1.8)+'" stroke-linejoin="round"/>'});
 var en='';if(o.ends){var es=MK.map(function(m){return {m:m,y:y(series[m][N])}}).sort(function(a,b){return a.y-b.y});for(var j=1;j<es.length;j++)if(es[j].y-es[j-1].y<11)es[j].y=es[j-1].y+11;
  es.forEach(function(e){var c=e.m===lead?'#fdbc2a':MC[e.m];en+='<text x="'+(x(N)+6)+'" y="'+(e.y+3).toFixed(1)+'" font-size="9.5" font-style="italic" font-weight="900" fill="'+c+'" font-family="Kanit">'+o.ends(e.m)+'</text>'})}
 return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="display:block">'+g+ls+en+'<text x="'+pad[3]+'" y="'+(H-3)+'" font-size="8.5" font-style="italic" font-weight="700" fill="rgba(248,240,217,.45)" font-family="Kanit">'+(o.x0||'R1')+'</text><text x="'+(W-pad[1])+'" y="'+(H-3)+'" text-anchor="end" font-size="8.5" font-style="italic" font-weight="700" fill="rgba(248,240,217,.45)" font-family="Kanit">R'+G[N-1].n+'</text></svg>'}
var BAL={},RUN={};MK.forEach(function(m){BAL[m]=S[m].bal;RUN[m]=S[m].run});
var CO={pnl:{step:20000,base:100000,fmt:function(v){return (v/1000)+'K'},ends:function(m){var p=A[m].pct;return (p<0?'−':'+')+Math.abs(p).toFixed(1)+'%'}},acc:{lo:30,hi:80,step:10,base:50,x0:'Start',fmt:function(v){return v+'%'}}};
var TABS=[["pnl","P&amp;L"],["acc","Accuracy"],["tgt","Target hits"],["sec","Sector"]];
function card(k,q,sub,body){return '<div class="r2v" id="r2pv-'+k+'"><div class="r2v-tb">'+TABS.map(function(t){return '<span'+(t[0]===k?' class="on"':'')+'>'+t[1]+'</span>'}).join('')+'</div><p class="r2v-q">'+lx(q)+'</p><p class="r2v-sm r2v-sub">'+sub+'</p>'+body+'</div>'}
/* P&L: the page's own accounts; Top W / Top L / P&L, the P&L label centred over its figures by measuring (below) */
var pnl=card("pnl","Would following them have made you money?","$100K each. All in on every call. No leverage.",
 '<div class="r2v-ch" data-k="pnl">'+chart(BAL,byP[0],CO.pnl)+'</div>'+
 '<div class="r2v-g r2v-gp"><span class="r2v-cap">#</span><span></span><span class="r2v-cap">AI</span><span class="r2v-cap r">Top <span class="w">W</span></span><span class="r2v-cap r">Top <span class="l">L</span></span><span class="r2v-cap r r2v-plh">P&amp;L</span>'+
 byP.map(function(m,i){var s=S[m];return '<span class="r2v-lx r2v-n">'+(i+1)+'</span>'+disc(m,24)+lx(NM[m],i?'':'gd')+'<span class="r2v-sm r up">'+usd(s.bw,1)+'</span><span class="r2v-sm r dn">'+usd(s.bl,1)+'</span><span class="r r2v-plv">'+lx(usd(s.pnl),s.pnl<0?'dn':'up')+'</span>'}).join('')+'</div>');
/* Accuracy: the running hit rate from 50/50 (as the page draws it), Trades · W · L · Accuracy */
var acc=card("acc","How often were they right about the direction?","Every line starts at 50/50 and moves with each call.",
 '<div class="r2v-ch" data-k="acc">'+chart(RUN,byH[0],CO.acc)+'</div>'+
 '<div class="r2v-g r2v-ga"><span class="r2v-cap">#</span><span></span><span class="r2v-cap">AI</span><span class="r2v-cap c">Trades</span><span class="r2v-cap c"><span class="w">W</span></span><span class="r2v-cap c"><span class="l">L</span></span><span class="r2v-cap c">Accuracy</span>'+
 byH.map(function(m,i){var s=S[m];return '<span class="r2v-lx r2v-n">'+(i+1)+'</span>'+disc(m,24)+lx(NM[m],i?'':'gd')+'<span class="r2v-sm c">'+s.n+'</span><span class="r2v-sm c up">'+s.k+'</span><span class="r2v-sm c dn">'+(s.n-s.k)+'</span><span class="c">'+lx(Math.round(s.hit*100)+'%',i?'':'gd')+'</span>'}).join('')+'</div>');
/* Target hits: one target per AI, rings every 3% off, a hole per right-way call at its miss (angle fixed per call), the counts under it */
function target(m,lead){var R=46,C=50,sc=R/12,h='<svg viewBox="0 0 100 100" width="100%" aria-hidden="true">';
 for(var r=4;r>=1;r--)h+='<circle cx="'+C+'" cy="'+C+'" r="'+(r*3*sc).toFixed(1)+'" fill="'+(r%2?'#ff3a31':'#16131c')+'" stroke="rgba(248,240,217,.18)" stroke-width=".5"/>';
 h+='<circle cx="'+C+'" cy="'+C+'" r="'+(0.6*sc+.6).toFixed(1)+'" fill="#fdbc2a"/><line x1="'+(C-R)+'" x2="'+(C+R)+'" y1="'+C+'" y2="'+C+'" stroke="rgba(248,240,217,.16)" stroke-width=".4"/><line y1="'+(C-R)+'" y2="'+(C+R)+'" x1="'+C+'" x2="'+C+'" stroke="rgba(248,240,217,.16)" stroke-width=".4"/>';
 S[m].calls.forEach(function(c){if(!c.ok)return;var a=((c.n*137.508+m.length*53)%360)*Math.PI/180,d=Math.min(c.off,12)*sc;h+='<circle cx="'+(C+d*Math.cos(a)).toFixed(2)+'" cy="'+(C+d*Math.sin(a)).toFixed(2)+'" r="1.9" fill="#f8f0d9" stroke="#04070e" stroke-width=".7"/>'});
 return h+'</svg>'}
var tgt=card("tgt","How close did they get to the real move?","The bullseye is what the stock did. One hole per call.",
 '<div class="r2v-tg">'+byT.map(function(m,i){var s=S[m];return '<figure><figcaption><span class="r2v-lx r2v-n">'+(i+1)+'</span>'+disc(m,20)+lx(NM[m],i?'':'gd')+'</figcaption>'+target(m)+
  '<div class="r2v-ts"><span><b class="gd">'+s.bu+'</b>Bullseye'+(s.bu===1?'':'s')+'</span><span><b class="up">'+s.w1+'</b>Within 1%</span><span><b class="dn">'+s.ot+'</b>Off target</span></div></figure>'}).join('')+'</div>'+
 '<p class="r2v-sm r2v-note">Bullseye: within 0.1%. Off target: the wrong way.</p>');
/* Sector: right/made per sector per AI, the page's bands (2 in 3 or better green, 1 in 3 or worse red), a crown on each row's best */
var secs={};G.forEach(function(r){var x=((RMETA[r.n]||{}).sector)||"";if(!x)return;x=SH[x]||x;(secs[x]=secs[x]||{n:0,r:[]}).n++;secs[x].r.push(r)});
var order=Object.keys(secs).sort(function(a,b){return secs[b].n-secs[a].n});
var sec=card("sec","Which industries do they call best?","Right calls out of calls made, by sector.",
 '<div class="r2v-sg"><span class="r2v-cap">Sector</span>'+byH.map(function(m){return '<span class="r2v-sh">'+disc(m,20)+'<span class="r2v-cap">'+NM[m]+'</span></span>'}).join('')+
 order.map(function(x){var cells=byH.map(function(m){var n=0,k=0;secs[x].r.forEach(function(r){var c=callOf(r,m);if(!c)return;n++;if(((/^DOWN/.test(c[1])?-1:1)>0)===(r.a>0))k++});return {n:n,k:k,v:n?k/n:-1}});
  var best=Math.max.apply(0,cells.map(function(c){return c.v})),all=cells.every(function(c){return c.v===best});
  return '<span class="r2v-sx">'+lx(x)+'<small>'+secs[x].n+' round'+(secs[x].n===1?'':'s')+'</small></span>'+cells.map(function(c){var b=c.v<0?'na':c.v>=2/3?'hi':c.v<=1/3?'lo':'md';
   return '<span class="r2v-c '+b+(c.v===best&&!all&&c.v>=0?' top':(!all?' dim':''))+'">'+(c.n?c.k+'/'+c.n:'–')+'</span>'}).join('')}).join('')+'</div>'+
 '<div class="r2v-lgd r2v-sm"><span><i class="hi"></i>2 in 3 or better</span><span><i class="md"></i>In between</span><span><i class="lo"></i>1 in 3 or worse</span></div>');
var css='.r2v{background:#04070e;padding:14px 14px 12px;box-shadow:inset 0 0 0 1px rgba(248,240,217,.1);clip-path:polygon(0 0,calc(100% - 22px) 0,100% 22px,100% 100%,22px 100%,0 calc(100% - 22px));color:#f8f0d9;margin-bottom:22px;display:flex;flex-direction:column}'+
 '.r2v-dc{display:inline-grid;place-content:center;border-radius:50%;background:#04070e;box-shadow:0 0 0 1.5px rgba(248,240,217,.18);flex:none}'+
 '.r2v-lx{font-family:Kanit,sans-serif;font-style:italic;font-weight:900;letter-spacing:-.01em;line-height:.95;color:#f8f0d9}.r2v-lx.up,.r2v .up{color:#03c870}.r2v-lx.dn,.r2v .dn{color:#ff3a31}.r2v .gd{color:#fdbc2a}.r2v-lx.gd{background:linear-gradient(100deg,#b8860b 0%,#fdbc2a 28%,#fff4c8 46%,#fdbc2a 62%,#c9971e 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:#fdbc2a;filter:drop-shadow(0 0 6px rgba(253,188,42,.35))}'+
 '.r2v-sm{font:600 10.5px/1.25 "Barlow Condensed",sans-serif;color:rgba(248,240,217,.6);letter-spacing:.04em}.r2v-cap{font:italic 800 9px/1 Kanit,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:rgba(248,240,217,.55);white-space:nowrap}'+
 '.r2v-tb{display:flex;gap:6px;margin-bottom:12px}.r2v-tb span{flex:1;text-align:center;font:italic 800 11.5px/1 Kanit;padding:8px 0;transform:skewX(-12deg);background:rgba(248,240,217,.07);color:rgba(248,240,217,.6)}.r2v-tb span.on{background:#f8f0d9;color:#04070e}'+
 '.r2v-q{margin:0 0 4px}.r2v-q .r2v-lx{font-size:22px;line-height:1.02}.r2v-sub{margin:0 0 6px}'+
 '.r2v-g{display:grid;align-items:center;column-gap:8px;margin-top:6px}.r2v-g>*{padding:7px 0;border-top:1px solid rgba(248,240,217,.08)}.r2v-g>.r2v-cap{border-top:1.5px solid rgba(248,240,217,.3);padding:10px 0 6px}'+
 '.r2v-gp{grid-template-columns:14px 24px minmax(0,1fr) 52px 52px auto}.r2v-ga{grid-template-columns:14px 24px minmax(0,1fr) auto auto auto auto}.r2v-g .r{text-align:right}.r2v-g .c{text-align:center}'+
 '.r2v-g>.r2v-dc{padding:0;justify-self:center}.r2v-g .r2v-lx{font-size:16px}.r2v-n{font-size:16px!important}.r2v-g .r2v-sm{font-size:12px;font-weight:700}.r2v-g .w{color:#03c870}.r2v-g .l{color:#ff3a31}.r2v-ga .c .r2v-lx{font-size:17px}'+
 '.r2v-plh{text-align:center!important}.r2v-plv{text-align:right}'+
 '.r2v-tg{display:grid;grid-template-columns:1fr 1fr;gap:10px 14px;margin-top:4px;flex:1}.r2v-tg figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:6px}.r2v-tg figure:nth-child(n+3){border-top:1px dashed rgba(248,240,217,.18);padding-top:10px}'+
 '.r2v-tg figcaption{display:flex;align-items:center;justify-content:center;gap:6px;align-self:center}.r2v-tg figcaption .r2v-lx{font-size:16px}.r2v-tg svg{max-width:132px}'+
 '.r2v-ts{display:grid;grid-template-columns:repeat(3,1fr);width:100%;text-align:center}.r2v-ts span{font:italic 800 7.5px/1.2 Kanit;letter-spacing:.06em;text-transform:uppercase;color:rgba(248,240,217,.55)}.r2v-ts b{display:block;font:italic 900 17px/1 Kanit;margin-bottom:3px}'+
 '.r2v-note{text-align:center;margin:8px 0 0}'+
 '.r2v-sg{display:grid;grid-template-columns:minmax(0,1.25fr) repeat(4,minmax(0,1fr));gap:5px;margin-top:6px;flex:1;align-content:start}.r2v-sh{display:flex;flex-direction:column;align-items:center;gap:4px}'+
 '.r2v-sx{display:flex;flex-direction:column;justify-content:center;min-width:0}.r2v-sx .r2v-lx{font-size:12.5px;line-height:1.05;text-wrap:balance}.r2v-sx small{font:600 9.5px/1.3 "Barlow Condensed";color:rgba(248,240,217,.5)}'+
 '.r2v-c{position:relative;display:grid;place-content:center;min-height:36px;font:italic 900 15px/1 Kanit;transform:skewX(-10deg);color:#f8f0d9;background:rgba(248,240,217,.06)}'+
 '.r2v-c.hi{background:rgba(3,200,112,.22);color:#3ee08f}.r2v-c.lo{background:rgba(255,58,49,.2);color:#ff6a62}.r2v-c.md{background:rgba(253,188,42,.16);color:#fdd27a}.r2v-c.na{color:rgba(248,240,217,.35)}'+
 '.r2v-c.top{box-shadow:inset 0 0 0 1.5px currentColor}.r2v-c.dim{opacity:.5}.r2v-c i{position:absolute;left:-5px;top:-8px;font-size:11px;font-style:normal;transform:rotate(-14deg) skewX(10deg)}'+
 '.r2v-lgd{display:flex;justify-content:center;gap:12px;margin-top:10px}.r2v-lgd span{display:flex;align-items:center;gap:4px}.r2v-lgd i{width:10px;height:10px;display:block;transform:skewX(-10deg)}.r2v-lgd .hi{background:rgba(3,200,112,.5)}.r2v-lgd .md{background:rgba(253,188,42,.45)}.r2v-lgd .lo{background:rgba(255,58,49,.5)}';
var st=document.createElement('style');st.textContent=css+'#learn .x2p-pt{display:none!important}';document.head.appendChild(st);
var pt=document.querySelector('#learn .x2p-pt');var w=document.createElement('div');w.className='r2v-w';w.innerHTML=pnl+acc+tgt+sec;pt.parentNode.insertBefore(w,pt.nextSibling);
/* the P&L label centred over its figures: the column is as wide as the widest figure, the label centred in it */
/* all four the tallest one's height, as the page's ticket does */
var cs=[].slice.call(w.querySelectorAll('.r2v')),mx=Math.max.apply(0,cs.map(function(c){return c.offsetHeight}));cs.forEach(function(c){c.style.minHeight=mx+'px'});
[].slice.call(w.querySelectorAll('.r2v-ch')).forEach(function(ch){var c=ch.closest('.r2v'),gap=mx-c.scrollHeight;c.style.minHeight='';var nat=c.offsetHeight;gap=mx-nat;if(gap>2){var k=ch.dataset.k,o=Object.assign({},CO[k]);o.H=170+gap*330/ch.offsetWidth;ch.innerHTML=chart(k==='pnl'?BAL:RUN,k==='pnl'?byP[0]:byH[0],o)}c.style.minHeight=mx+'px'});
var bad=[];w.querySelectorAll('.r2v *').forEach(function(e){var c=e.closest('.r2v').getBoundingClientRect(),q=e.getBoundingClientRect();if(q.width&&(q.right>c.right+.5||q.left<c.left-.5))bad.push(e.className&&e.className.baseVal!=null?e.className.baseVal:e.className)});
var pl=w.querySelector('.r2v-plh').getBoundingClientRect(),fig=[].slice.call(w.querySelectorAll('.r2v-plv b')).map(function(b){return b.getBoundingClientRect()});
var fc=(Math.min.apply(0,fig.map(function(q){return q.left}))+Math.max.apply(0,fig.map(function(q){return q.right})))/2;
window.__r2vOk={bad:bad.slice(0,6),h:mx,plOff:Math.round(((pl.left+pl.right)/2-fc)*10)/10,counts:byT.map(function(m){return m+' '+S[m].bu+'/'+S[m].w1+'/'+S[m].ot}),hit:byH.map(function(m){return m+' '+S[m].k+'/'+S[m].n}),secs:order.map(function(x){return x+' '+secs[x].n})}})();
