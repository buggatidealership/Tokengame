/* Modern board mockups (owner, 2026-10-27: alternatives to stamps and pressed letters on flat paper, "or forget the ticket approach
   altogether... a different style font"; the film and the bet stay paper, the leaderboard and "Getting smarter or just lucky?" can change).
   Runs in the real page: every number from window.__x2pPnl() and ROUNDS (the same accounts the live standings and proof use). It hides
   the live board and proof ticket and puts one direction in their place: window.__mb = 'A'..'E'. Class prefixes qa- .. qe- (the site
   already owns .lg .pc .rs .xg .mk .u .d .s .ft .fd .st .gt-b .pg .top .tick .cg .sb). */
(function(){
var D=window.__mb;if(!D)return;
var P=window.__x2pPnl(),A=P.A;
var G=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)});
var NM={GPT:"GPT",KIMI:"Kimi",CLAUDE:"Claude",GROK:"Grok"};
var rows=Object.keys(A).map(function(m){var t=A[m];return {m:m,nm:NM[m]||m,ver:t.ver,W:t.W,L:t.L,n:t.W+t.L,acc:t.W/(t.W+t.L),pnl:t.pnl,pct:t.pct,stk:t.streak,bw:t.bw,bl:t.bl,last:t.seq.slice(-5)}});
rows.sort(function(a,b){var ha=a.n>=G.length/2,hb=b.n>=G.length/2;if(ha!==hb)return ha?-1:1;return b.pnl-a.pnl});
var lead=rows[0];
/* balance after every graded round, per AI (a skipped round leaves it as it is) */
var S={};rows.forEach(function(r){var b=100000,s=[b];G.forEach(function(g){var p=A[r.m].per[g.n];if(p)b+=p.v;s.push(b)});S[r.m]=s});
function usd(v,k){var s=v<0?"−":"+",a=Math.abs(v);if(k&&a>=1000)return s+"$"+(a/1000).toFixed(1)+"K";return s+"$"+Math.round(a).toLocaleString("en-US")}
function bal(v){return "$"+Math.round(v).toLocaleString("en-US")}
function pc(v){return (v<0?"−":"+")+Math.abs(v).toFixed(1)+"%"}
function pct0(v){return Math.round(v*100)+"%"}
function mark(m,fill,sz){var M=MODELS[m];return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" aria-hidden="true"><path fill="'+fill+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+' d="'+M.d+'"/></svg>'}
function chart(o){var W=o.w,H=o.h,pad=o.pad||[10,10,18,10],all=[];rows.forEach(function(r){all=all.concat(S[r.m])});
 var lo=Math.min.apply(0,all),hi=Math.max.apply(0,all);lo=Math.floor(lo/10000)*10000;hi=Math.ceil(hi/10000)*10000;
 var N=G.length,x=function(i){return pad[3]+(W-pad[1]-pad[3])*i/N},y=function(v){return pad[0]+(H-pad[0]-pad[2])*(1-(v-lo)/(hi-lo))};
 var g='';if(o.grid){for(var v=lo;v<=hi;v+=o.grid){g+='<line x1="'+pad[3]+'" x2="'+(W-pad[1])+'" y1="'+y(v).toFixed(1)+'" y2="'+y(v).toFixed(1)+'" stroke="'+o.gc+'" stroke-width="'+(v===100000?o.bw||1:.6)+'"'+(v===100000&&o.dash?' stroke-dasharray="3 3"':'')+'/>';
  if(o.ax)g+='<text x="'+(W-pad[1]+4)+'" y="'+(y(v)+3).toFixed(1)+'" font-size="8.5" fill="'+o.ax+'" font-family="'+(o.af||'inherit')+'">'+(v/1000)+'K</text>'}}
 var ls='';rows.slice().reverse().forEach(function(r){var d=S[r.m].map(function(v,i){return (i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)}).join(' ');var c=o.col(r);
  if(o.glow)ls+='<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+(o.sw*3.4)+'" stroke-opacity=".22" stroke-linejoin="round"/>';
  ls+='<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+(r===lead?o.sw*(o.lw||1):o.sw)+'" stroke-linejoin="round" stroke-linecap="round"/>';
  if(o.end){var e=S[r.m][S[r.m].length-1];ls+='<circle cx="'+x(N).toFixed(1)+'" cy="'+y(e).toFixed(1)+'" r="'+(o.end)+'" fill="'+c+'"/>'}});
 var area='';if(o.area){var d0=S[lead.m].map(function(v,i){return (i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)}).join(' ')+' L'+x(N).toFixed(1)+' '+(H-pad[2])+' L'+x(0)+' '+(H-pad[2])+'Z';
  area='<defs><linearGradient id="mbar'+D+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+o.area+'" stop-opacity=".28"/><stop offset="1" stop-color="'+o.area+'" stop-opacity="0"/></linearGradient></defs><path d="'+d0+'" fill="url(#mbar'+D+')"/>'}
 var xl='';if(o.xl)xl='<text x="'+pad[3]+'" y="'+(H-4)+'" font-size="8.5" fill="'+o.xl+'" font-family="'+(o.af||'inherit')+'">'+(o.x0||'Start')+'</text><text x="'+(W-pad[1])+'" y="'+(H-4)+'" font-size="8.5" text-anchor="end" fill="'+o.xl+'" font-family="'+(o.af||'inherit')+'">'+(o.x1||('Round '+G[N-1].n))+'</text>';
 return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="display:block">'+area+g+ls+xl+'</svg>'}
var TABS=["P&amp;L","Accuracy","Target hits","Sector"];
var TRY=["Qwen","Mistral","Gemini"];
var B={};
/* A: the modern pass. Flat logo cream, flat ink, no pressing: hairline rules, small-caps labels, big tabular figures (an Apple Wallet event pass) */
B.A=function(){var css='.qa,.qa-pr{--c:#f8f0d9;--k:#04070e;--k2:rgba(4,7,14,.55);--k3:rgba(4,7,14,.14);--g:#fdbc2a;--up:#0d8a4c;--dn:#d8261e;font-family:"Space Grotesk",system-ui,sans-serif;display:grid;gap:10px;margin-top:6px}'+
 '.qa-p{background:var(--c);color:var(--k);border-radius:14px;display:grid;grid-template-columns:44px 1fr;position:relative;box-shadow:0 10px 24px rgba(0,0,0,.35)}'+
 '.qa-p::before,.qa-p::after{content:"";position:absolute;left:44px;width:14px;height:14px;border-radius:50%;background:#0b0a14;transform:translateX(-50%)}.qa-p::before{top:-7px}.qa-p::after{bottom:-7px}'+
 '.qa-rk{border-right:1.5px dashed var(--k3);display:grid;place-content:center;justify-items:center;gap:2px}.qa-rk small{font:600 7.5px/1 "Space Grotesk";letter-spacing:.16em;color:var(--k2)}.qa-rk b{font:700 24px/1 "Space Grotesk";font-variant-numeric:tabular-nums}'+
 '.qa-b{padding:11px 14px 12px 14px;display:grid;grid-template-columns:1fr auto;row-gap:9px;column-gap:10px;align-items:end}'+
 '.qa-id{display:flex;align-items:center;gap:9px;min-width:0}.qa-id h4{margin:0;font:700 17px/1 "Space Grotesk";letter-spacing:-.01em}.qa-id h4 small{display:block;font:500 10.5px/1.3 "Space Grotesk";color:var(--k2);letter-spacing:0;margin-top:2px}'+
 '.qa-pl{text-align:right}.qa-pl b{display:block;font:700 22px/1 "Space Grotesk";font-variant-numeric:tabular-nums;letter-spacing:-.02em}.qa-pl small{font:500 10.5px/1 "Space Grotesk";color:var(--k2)}'+
 '.qa-f{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--k3);padding-top:8px}.qa-f div{display:grid;gap:3px}.qa-f div+div{border-left:1px solid var(--k3);padding-left:10px}'+
 '.qa-f small{font:600 7.5px/1 "Space Grotesk";letter-spacing:.16em;text-transform:uppercase;color:var(--k2)}.qa-f b{font:700 14px/1 "Space Grotesk";font-variant-numeric:tabular-nums}'+
 '.qa .up,.qa-pr .up{color:var(--up)}.qa .dn,.qa-pr .dn{color:var(--dn)}'+
 '.qa-p.qa-1{background:var(--g)}.qa-p.qa-1 .qa-tag{position:absolute;right:14px;top:-9px;background:var(--k);color:var(--g);font:700 8px/1 "Space Grotesk";letter-spacing:.18em;padding:5px 8px;border-radius:20px}'+
 '.qa-p.qa-1 .up{color:var(--k)}.qa-p.qa-1{--k2:rgba(4,7,14,.66);--k3:rgba(4,7,14,.22)}'+
 '.qa-try{background:transparent;border:1.5px dashed rgba(248,240,217,.35);color:#f8f0d9;border-radius:14px;padding:11px 14px;display:flex;justify-content:space-between;align-items:center;font:600 12px/1 "Space Grotesk"}.qa-try small{font:600 7.5px/1 "Space Grotesk";letter-spacing:.16em;opacity:.7}'+
 '.qa-pr{display:block;margin-top:0;background:var(--c);color:var(--k);border-radius:14px;padding:14px;font-family:"Space Grotesk";box-shadow:0 10px 24px rgba(0,0,0,.35)}'+
 '.qa-tb{display:flex;gap:4px;background:rgba(4,7,14,.06);border-radius:10px;padding:3px;margin-bottom:12px}.qa-tb span{flex:1;text-align:center;font:600 11px/1 "Space Grotesk";padding:8px 0;border-radius:8px;color:var(--k2)}.qa-tb span.on{background:var(--k);color:var(--c)}'+
 '.qa-q{font:700 15px/1.2 "Space Grotesk";margin:0 0 2px}.qa-qs{font:500 10.5px/1.3 "Space Grotesk";color:var(--k2);margin:0 0 8px}'+
 '.qa-lg{display:flex;flex-wrap:wrap;gap:6px 12px;margin:8px 0 10px;font:600 10.5px/1 "Space Grotesk"}.qa-lg span{display:flex;align-items:center;gap:5px}.qa-lg i{width:12px;height:3px;border-radius:2px;display:block}'+
 '.qa-r{display:grid;grid-template-columns:14px 1fr auto auto auto;gap:10px;align-items:baseline;padding:8px 0;border-top:1px solid var(--k3);font:500 12px/1 "Space Grotesk";font-variant-numeric:tabular-nums}.qa-r b{font-weight:700}.qa-r .qa-big{font:700 15px/1 "Space Grotesk"}.qa-rh{font:600 7.5px/1 "Space Grotesk";letter-spacing:.14em;text-transform:uppercase;color:var(--k2);border-top:0}';
 var c={GPT:"#10a37f",KIMI:"#1e80ff",CLAUDE:"#d97757",GROK:"#04070e"};
 var h='<div class="qa">'+rows.map(function(r,i){return '<div class="qa-p'+(i?'':' qa-1')+'">'+(i?'':'<span class="qa-tag">BUYBACK CALL</span>')+'<div class="qa-rk"><small>NO.</small><b>'+(i+1)+'</b></div><div class="qa-b"><div class="qa-id">'+mark(r.m,i?c[r.m]:"#04070e",26)+'<h4>'+r.nm+'<small>'+r.ver+'</small></h4></div><div class="qa-pl"><b class="'+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'</b><small>P&amp;L '+pc(r.pct)+'</small></div><div class="qa-f"><div><small>Record</small><b><span class="up">'+r.W+'</span>–<span class="dn">'+r.L+'</span></b></div><div><small>Accuracy</small><b>'+pct0(r.acc)+'</b></div><div><small>Streak</small><b>'+r.stk+'</b></div></div></div></div>'}).join('')+
 '<div class="qa-try"><span><small>IN TRYOUTS</small></span><span>'+TRY.join(' · ')+'</span></div></div>';
 var p='<div class="qa-pr"><div class="qa-tb">'+TABS.map(function(t,i){return '<span'+(i?'':' class="on"')+'>'+t+'</span>'}).join('')+'</div><p class="qa-q">Would following them have made you money?</p><p class="qa-qs">$100,000 each. The whole balance on every call. No leverage.</p>'+
  chart({w:330,h:170,sw:1.8,lw:1.5,grid:20000,gc:"rgba(4,7,14,.12)",bw:1.2,dash:1,ax:"rgba(4,7,14,.5)",xl:"rgba(4,7,14,.5)",pad:[8,26,16,2],col:function(r){return r===lead?"#c98a0a":c[r.m]},end:2.6,af:"Space Grotesk"})+
  '<div class="qa-lg">'+rows.map(function(r){return '<span><i style="background:'+(r===lead?"#c98a0a":c[r.m])+'"></i>'+r.nm+'</span>'}).join('')+'</div>'+
  '<div class="qa-r qa-rh"><span></span><span>AI</span><span>Best W</span><span>Worst L</span><span>P&amp;L</span></div>'+rows.map(function(r,i){return '<div class="qa-r"><b>'+(i+1)+'</b><b>'+r.nm+'</b><span class="up">'+usd(r.bw,1)+'</span><span class="dn">'+usd(r.bl,1)+'</span><span class="qa-big '+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'</span></div>'}).join('')+'</div>';
 return {css:css,std:h,proof:p}};
/* B: the timing tower. A race broadcast's leaderboard: dark glass rows, a team colour bar, white position boxes, condensed caps, the gap to the leader */
B.B=function(){var c={GPT:"#10a37f",KIMI:"#1e80ff",CLAUDE:"#d97757",GROK:"#e9e9ee"};
 var css='.qb{font-family:"Saira Condensed",sans-serif;margin-top:6px;background:linear-gradient(180deg,rgba(18,19,28,.94),rgba(10,10,16,.94));border-radius:6px;overflow:hidden;border:1px solid rgba(255,255,255,.08)}'+
 '.qb-hd{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:#e10600;color:#fff;font:800 13px/1 "Saira Condensed";letter-spacing:.08em}.qb-hd span:last-child{font-weight:600;opacity:.9}'+
 '.qb-cols,.qb-r{display:grid;grid-template-columns:28px 5px 1fr 54px 44px 86px;align-items:center;column-gap:8px;padding:0 10px}'+
 '.qb-cols{padding-top:7px;padding-bottom:5px;font:700 9px/1 "Saira Condensed";letter-spacing:.12em;color:rgba(255,255,255,.45)}.qb-cols span:nth-child(n+4){text-align:right}'+
 '.qb-r{height:50px;border-top:1px solid rgba(255,255,255,.07);color:#fff}.qb-r:nth-child(odd){background:rgba(255,255,255,.025)}'+
 '.qb-pos{width:26px;height:26px;background:#fff;color:#0b0a14;display:grid;place-content:center;font:800 16px/1 "Saira Condensed";border-radius:3px}.qb-1 .qb-pos{background:#fdbc2a}'+
 '.qb-bar{width:4px;height:30px;border-radius:2px}.qb-nm{display:flex;align-items:center;gap:8px;min-width:0}.qb-nm b{font:800 19px/1 "Saira Condensed";letter-spacing:.04em;text-transform:uppercase}.qb-nm small{display:block;font:600 10.5px/1.2 "Saira Condensed";color:rgba(255,255,255,.5);letter-spacing:.02em;text-transform:none}'+
 '.qb-v{text-align:right;font:700 15px/1 "Saira Condensed";font-variant-numeric:tabular-nums}.qb-v small{display:block;font:600 9.5px/1.3 "Saira Condensed";color:rgba(255,255,255,.5)}'+
 '.qb-gap{text-align:right;font:800 17px/1 "Saira Condensed";font-variant-numeric:tabular-nums}.qb-gap small{display:block;font:600 9.5px/1.3 "Saira Condensed";color:rgba(255,255,255,.5)}'+
 '.qb .up,.qb-pr .up{color:#3ee08f}.qb .dn,.qb-pr .dn{color:#ff5a52}.qb-1 .qb-gap b{color:#fdbc2a}'+
 '.qb-try{display:flex;justify-content:space-between;padding:9px 10px;border-top:1px dashed rgba(255,255,255,.15);font:700 11px/1 "Saira Condensed";letter-spacing:.1em;color:rgba(255,255,255,.55)}.qb-try b{color:#fff;font-weight:700;letter-spacing:.04em}'+
 '.qb-pr{font-family:"Saira Condensed";background:linear-gradient(180deg,rgba(18,19,28,.96),rgba(8,8,13,.96));border-radius:6px;overflow:hidden;border:1px solid rgba(255,255,255,.08);color:#fff}'+
 '.qb-tb{display:flex;border-bottom:1px solid rgba(255,255,255,.1)}.qb-tb span{flex:1;text-align:center;font:800 12px/1 "Saira Condensed";letter-spacing:.08em;text-transform:uppercase;padding:11px 0;color:rgba(255,255,255,.45)}.qb-tb span.on{color:#fff;box-shadow:inset 0 -3px 0 #e10600}'+
 '.qb-q{padding:12px 12px 0;margin:0;font:800 18px/1.1 "Saira Condensed";text-transform:uppercase;letter-spacing:.02em}.qb-qs{padding:3px 12px 6px;margin:0;font:600 11px/1.3 "Saira Condensed";color:rgba(255,255,255,.5)}'+
 '.qb-cw{padding:0 6px 4px 8px}.qb-rr{display:grid;grid-template-columns:22px 4px 1fr auto auto 78px;gap:8px;align-items:center;padding:8px 12px;border-top:1px solid rgba(255,255,255,.07);font:700 13px/1 "Saira Condensed";font-variant-numeric:tabular-nums}.qb-rr .qb-bar{height:18px}.qb-rr .r{text-align:right}.qb-rr .big{font:800 16px/1 "Saira Condensed";text-align:right}'+
 '.qb-rh{font:700 9px/1 "Saira Condensed";letter-spacing:.12em;color:rgba(255,255,255,.45);padding-top:6px;padding-bottom:6px}';
 var h='<div class="qb"><div class="qb-hd"><span>SEASON 1 · ROUND '+G[G.length-1].n+'</span><span>P&amp;L</span></div><div class="qb-cols"><span>POS</span><span></span><span>AI</span><span>W–L</span><span>ACC</span><span>P&amp;L / GAP</span></div>'+
  rows.map(function(r,i){return '<div class="qb-r'+(i?'':' qb-1')+'"><span class="qb-pos">'+(i+1)+'</span><span class="qb-bar" style="background:'+c[r.m]+'"></span><span class="qb-nm"><span><b>'+r.nm+'</b><small>'+r.ver+'</small></span></span><span class="qb-v"><span class="up">'+r.W+'</span>–<span class="dn">'+r.L+'</span><small>'+r.stk+'</small></span><span class="qb-v">'+pct0(r.acc)+'</span><span class="qb-gap"><b class="'+(i?(r.pnl<0?'dn':'up'):'')+'">'+usd(r.pnl)+'</b><small>'+(i?'GAP '+usd(r.pnl-lead.pnl):'LEADER · BUYBACK CALL')+'</small></span></div>'}).join('')+
  '<div class="qb-try"><span>IN THE PIT LANE</span><b>'+TRY.join(' · ')+'</b></div></div>';
 var p='<div class="qb-pr"><div class="qb-tb">'+TABS.map(function(t,i){return '<span'+(i?'':' class="on"')+'>'+t+'</span>'}).join('')+'</div><p class="qb-q">Would following them have made you money?</p><p class="qb-qs">$100,000 each · the whole balance on every call · no leverage</p><div class="qb-cw">'+
  chart({w:340,h:180,sw:2,lw:1.4,glow:1,grid:20000,gc:"rgba(255,255,255,.08)",bw:1,dash:1,ax:"rgba(255,255,255,.4)",xl:"rgba(255,255,255,.4)",pad:[8,26,16,2],col:function(r){return r===lead?"#fdbc2a":c[r.m]},end:3,af:"Saira Condensed",x0:"R1",x1:"R"+G[G.length-1].n})+'</div>'+
  '<div class="qb-rr qb-rh"><span>POS</span><span></span><span>AI</span><span class="r">BEST W</span><span class="r">WORST L</span><span class="r">P&amp;L</span></div>'+rows.map(function(r,i){return '<div class="qb-rr"><span>'+(i+1)+'</span><span class="qb-bar" style="background:'+(i?c[r.m]:"#fdbc2a")+'"></span><span style="text-transform:uppercase">'+r.nm+'</span><span class="r up">'+usd(r.bw,1)+'</span><span class="r dn">'+usd(r.bl,1)+'</span><span class="big '+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'</span></div>'}).join('')+'</div>';
 return {css:css,std:h,proof:p}};
/* C: the terminal. An exchange's trader leaderboard (Hyperliquid, Alpha Arena): near-black, mono figures, account value first, a sparkline per AI */
B.C=function(){var c={GPT:"#10a37f",KIMI:"#1e80ff",CLAUDE:"#d97757",GROK:"#e6e8ee"};
 function spark(m,w,h){var s=S[m],lo=Math.min.apply(0,s),hi=Math.max.apply(0,s),d=s.map(function(v,i){return (i?'L':'M')+(w*i/(s.length-1)).toFixed(1)+' '+(2+(h-4)*(1-(v-lo)/(hi-lo||1))).toFixed(1)}).join(' ');var up=s[s.length-1]>=100000;
  return '<svg viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'"><path d="'+d+'" fill="none" stroke="'+(up?'#03c870':'#ff3a31')+'" stroke-width="1.3"/></svg>'}
 var css='.qc{font-family:"JetBrains Mono",ui-monospace,monospace;background:#07090d;border:1px solid #1b2130;border-radius:8px;margin-top:6px;color:#d9dde6;overflow:hidden}'+
 '.qc-bar{display:flex;justify-content:space-between;padding:8px 10px;border-bottom:1px solid #1b2130;font:500 10px/1 "JetBrains Mono";color:#7d8596}.qc-bar b{color:#03c870;font-weight:600}.qc-bar b::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#03c870;margin-right:6px;vertical-align:1px;box-shadow:0 0 6px #03c870}'+
 '.qc-h,.qc-r{display:grid;grid-template-columns:18px 1fr 64px 48px 92px;column-gap:6px;align-items:center;padding:0 10px}'+
 '.qc-h{padding-top:7px;padding-bottom:7px;font:500 9px/1 "JetBrains Mono";color:#6b7385;text-transform:uppercase;letter-spacing:.04em}.qc-h span:nth-child(n+3){text-align:right}'+
 '.qc-r{height:54px;border-top:1px solid #131925;font-variant-numeric:tabular-nums}.qc-r>span:nth-child(n+3){text-align:right}'+
 '.qc-rk{font:600 12px/1 "JetBrains Mono";color:#6b7385}.qc-1 .qc-rk{color:#fdbc2a}'+
 '.qc-id{display:flex;align-items:center;gap:8px;min-width:0}.qc-av{width:24px;height:24px;border-radius:6px;background:#121722;display:grid;place-content:center;flex:none}.qc-id b{font:600 12.5px/1.1 "JetBrains Mono";color:#fff;white-space:nowrap}.qc-id small{display:block;font:400 9.5px/1.3 "JetBrains Mono";color:#6b7385}'+
 '.qc-v{font:500 11.5px/1.2 "JetBrains Mono"}.qc-v small{display:block;font:400 9px/1.3 "JetBrains Mono";color:#6b7385}'+
 '.qc-pl b{display:block;font:600 13px/1.1 "JetBrains Mono"}.qc-pl svg{display:block;margin:3px 0 0 auto}'+
 '.qc .up{color:#03c870}.qc .dn{color:#ff3a31}.qc-1{background:linear-gradient(90deg,rgba(253,188,42,.10),transparent 60%);box-shadow:inset 2px 0 0 #fdbc2a}'+
 '.qc-try{padding:8px 10px;border-top:1px solid #1b2130;font:400 10px/1 "JetBrains Mono";color:#6b7385}.qc-try b{color:#d9dde6;font-weight:500}'+
 '.qc-pr{font-family:"JetBrains Mono";background:#07090d;border:1px solid #1b2130;border-radius:8px;color:#d9dde6;overflow:hidden}'+
 '.qc-tb{display:flex;gap:4px;padding:8px 10px;border-bottom:1px solid #1b2130}.qc-tb span{font:500 10.5px/1 "JetBrains Mono";padding:6px 8px;border-radius:5px;color:#7d8596}.qc-tb span.on{background:#141b28;color:#fff;box-shadow:inset 0 0 0 1px #2a3346}'+
 '.qc-kv{display:flex;align-items:baseline;justify-content:space-between;padding:10px 10px 2px}.qc-kv small{font:400 9.5px/1 "JetBrains Mono";color:#6b7385;display:block;margin-bottom:5px}.qc-kv b{font:600 22px/1 "JetBrains Mono";color:#fff}.qc-kv .r{text-align:right}'+
 '.qc-q{margin:0;padding:2px 10px 6px;font:400 10px/1.4 "JetBrains Mono";color:#7d8596}'+
 '.qc-lg{display:flex;gap:10px;padding:2px 10px 8px;font:500 9.5px/1 "JetBrains Mono";flex-wrap:wrap}.qc-lg span{display:flex;align-items:center;gap:5px}.qc-lg i{width:8px;height:8px;border-radius:2px;display:block}'+
 '.qc-pr .qc-h,.qc-pr .qc-r{grid-template-columns:18px 1fr 62px 62px 82px}.qc-pr .qc-r{height:36px}';
 var h='<div class="qc"><div class="qc-bar"><span>LEADERBOARD · ACCOUNT VALUE</span><b>LIVE</b></div><div class="qc-h"><span>#</span><span>AI</span><span>W/L</span><span>ACC</span><span>P&amp;L</span></div>'+
  rows.map(function(r,i){return '<div class="qc-r'+(i?'':' qc-1')+'"><span class="qc-rk">'+(i+1)+'</span><span class="qc-id"><span class="qc-av">'+mark(r.m,c[r.m],15)+'</span><span><b>'+r.nm+(i?'':' 👑')+'</b><small>'+bal(S[r.m][S[r.m].length-1])+'</small></span></span><span class="qc-v"><span class="up">'+r.W+'</span>/<span class="dn">'+r.L+'</span><small>'+r.stk+'</small></span><span class="qc-v">'+pct0(r.acc)+'</span><span class="qc-pl"><b class="'+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'</b>'+spark(r.m,64,16)+'</span></div>'}).join('')+
  '<div class="qc-try">queued: <b>'+TRY.join(', ')+'</b> · in tryouts</div></div>';
 var tot=rows.reduce(function(s,r){return s+r.pnl},0);
 var p='<div class="qc-pr"><div class="qc-tb">'+TABS.map(function(t,i){return '<span'+(i?'':' class="on"')+'>'+t+'</span>'}).join('')+'</div><div class="qc-kv"><span><small>LEADER · '+lead.nm.toUpperCase()+'</small><b class="up">'+usd(lead.pnl)+'</b></span><span class="r"><small>ALL 4 AIS</small><b class="'+(tot<0?'dn':'up')+'" style="font-size:15px">'+usd(tot)+'</b></span></div><p class="qc-q">Would following them have made you money? $100K each, all in on every call, 1x.</p>'+
  '<div style="padding:0 4px 0 6px">'+chart({w:340,h:170,sw:1.5,lw:1.3,grid:20000,gc:"#141a26",bw:1,dash:1,ax:"#5f6778",xl:"#5f6778",pad:[8,30,16,2],area:"#fdbc2a",col:function(r){return r===lead?"#fdbc2a":c[r.m]},end:2.4,af:"JetBrains Mono",x0:"R1",x1:"R"+G[G.length-1].n})+'</div>'+
  '<div class="qc-lg">'+rows.map(function(r){return '<span><i style="background:'+(r===lead?"#fdbc2a":c[r.m])+'"></i>'+r.nm+'</span>'}).join('')+'</div>'+
  '<div class="qc-h"><span>#</span><span>AI</span><span>BEST</span><span>WORST</span><span>P&amp;L</span></div>'+rows.map(function(r,i){return '<div class="qc-r'+(i?'':' qc-1')+'"><span class="qc-rk">'+(i+1)+'</span><span class="qc-id"><b>'+r.nm+'</b></span><span class="qc-v up">'+usd(r.bw,1)+'</span><span class="qc-v dn">'+usd(r.bl,1)+'</span><span class="qc-pl"><b class="'+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'</b></span></div>'}).join('')+'</div>';
 return {css:css,std:h,proof:p}};
/* D: type only. A Swiss sports poster: no boxes, no paper, no texture; the leader in giant type, the rest as a ruled list; the logo's five colours flat */
B.D=function(){var css='.qd{font-family:Anton,Impact,sans-serif;color:#f8f0d9;margin-top:4px}'+
 '.qd-1{border-top:3px solid #fdbc2a;padding-top:10px;display:grid;grid-template-columns:auto 1fr;column-gap:12px;align-items:start}'+
 '.qd-1 .qd-n{font:400 108px/.8 Anton;color:#fdbc2a}.qd-1 h4{margin:0;font:400 46px/.9 Anton;text-transform:uppercase;letter-spacing:.005em}.qd-1 h4 small{display:block;font:600 12px/1.4 "Archivo",sans-serif;letter-spacing:.14em;color:rgba(248,240,217,.6);text-transform:uppercase;margin-top:6px}'+
 '.qd-big{grid-column:1/-1;font:400 64px/1 Anton;color:#03c870;letter-spacing:-.005em;margin-top:10px;font-variant-numeric:tabular-nums}'+
 '.qd-st{grid-column:1/-1;display:flex;gap:18px;margin:8px 0 6px;font:700 11px/1.3 "Archivo",sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(248,240,217,.62)}.qd-st b{display:block;font:400 22px/1.1 Anton;letter-spacing:0;color:#f8f0d9}'+
 '.qd-call{grid-column:1/-1;display:inline-block;justify-self:start;background:#fdbc2a;color:#04070e;font:800 10px/1 "Archivo",sans-serif;letter-spacing:.2em;padding:6px 9px;margin:4px 0 14px}'+
 '.qd-r{display:grid;grid-template-columns:34px 1fr auto;column-gap:10px;align-items:baseline;border-top:1px solid rgba(248,240,217,.25);padding:11px 0 10px}'+
 '.qd-r .qd-n{font:400 30px/1 Anton;color:rgba(248,240,217,.45)}.qd-r h4{margin:0;font:400 28px/1 Anton;text-transform:uppercase}.qd-r h4 small{display:block;font:700 9.5px/1.5 "Archivo",sans-serif;letter-spacing:.14em;color:rgba(248,240,217,.55);text-transform:uppercase}'+
 '.qd-r .qd-p{text-align:right;font:400 26px/1 Anton;font-variant-numeric:tabular-nums}.qd-r .qd-p small{display:block;font:700 9.5px/1.6 "Archivo",sans-serif;letter-spacing:.1em;color:rgba(248,240,217,.55)}'+
 '.qd .up,.qd-pr .up{color:#03c870}.qd .dn,.qd-pr .dn{color:#ff3a31}'+
 '.qd-try{border-top:1px solid rgba(248,240,217,.25);padding-top:10px;font:700 10px/1.4 "Archivo",sans-serif;letter-spacing:.16em;text-transform:uppercase;color:rgba(248,240,217,.55)}.qd-try b{color:#f8f0d9}'+
 '.qd-pr{color:#f8f0d9;font-family:Anton}.qd-tb{display:flex;gap:16px;margin-bottom:12px;font:800 11px/1 "Archivo",sans-serif;letter-spacing:.14em;text-transform:uppercase}.qd-tb span{color:rgba(248,240,217,.45);padding-bottom:6px}.qd-tb span.on{color:#f8f0d9;box-shadow:inset 0 -3px 0 #fdbc2a}'+
 '.qd-hl{font:400 40px/.95 Anton;text-transform:uppercase;margin:0 0 4px}.qd-hl em{font-style:normal;color:#03c870}.qd-sub{font:700 10px/1.5 "Archivo",sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(248,240,217,.55);margin:0 0 6px}'+
 '.qd-pl{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(248,240,217,.25);margin-top:4px}.qd-pl div{padding:9px 0 0;font:700 9px/1.3 "Archivo",sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(248,240,217,.55)}.qd-pl b{display:block;font:400 19px/1.1 Anton;letter-spacing:0}';
 var c={GPT:"#10a37f",KIMI:"#1e80ff",CLAUDE:"#d97757",GROK:"#f8f0d9"};var r0=rows[0];
 var h='<div class="qd"><div class="qd-1"><span class="qd-n">1</span><h4>'+r0.nm+'<small>'+r0.ver+'</small></h4><div class="qd-big">'+usd(r0.pnl)+'</div><div class="qd-st"><span>Record<b><span class="up">'+r0.W+'</span>–<span class="dn">'+r0.L+'</span></b></span><span>Accuracy<b>'+pct0(r0.acc)+'</b></span><span>Streak<b>'+r0.stk+'</b></span></div><span class="qd-call">Makes the buyback call</span></div>'+
  rows.slice(1).map(function(r,i){return '<div class="qd-r"><span class="qd-n">'+(i+2)+'</span><h4>'+r.nm+'<small>'+r.W+'–'+r.L+' · '+pct0(r.acc)+' · '+r.stk+'</small></h4><span class="qd-p '+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'<small>'+pc(r.pct)+'</small></span></div>'}).join('')+
  '<div class="qd-try">In tryouts · <b>'+TRY.join(' · ')+'</b></div></div>';
 var p='<div class="qd-pr"><div class="qd-tb">'+TABS.map(function(t,i){return '<span'+(i?'':' class="on"')+'>'+t+'</span>'}).join('')+'</div><p class="qd-hl">$100K on '+r0.nm+'<br>is now <em>'+bal(S[r0.m][S[r0.m].length-1])+'</em></p><p class="qd-sub">Would following them have made you money? All in on every call. No leverage.</p>'+
  chart({w:358,h:170,sw:2.2,lw:1.6,grid:0,pad:[6,2,14,2],col:function(r){return r===lead?"#fdbc2a":c[r.m]},end:3.2,xl:"rgba(248,240,217,.5)",af:"Archivo",x0:"Start",x1:"Round "+G[G.length-1].n})+
  '<div class="qd-pl">'+rows.map(function(r){return '<div style="color:'+(r===lead?"#fdbc2a":c[r.m])+'">'+r.nm+'<b class="'+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl,1)+'</b></div>'}).join('')+'</div></div>';
 return {css:css,std:h,proof:p}};
/* E: the app. A fantasy and sportsbook leaderboard (DraftKings, Sleeper): rounded dark cards, an avatar per AI, the leader's card lit gold, form dots */
B.E=function(){var c={GPT:"#10a37f",KIMI:"#1e80ff",CLAUDE:"#d97757",GROK:"#f2f2f5"};
 var css='.qe{font-family:Inter,system-ui,sans-serif;display:grid;gap:8px;margin-top:6px;color:#fff}'+
 '.qe-1{border-radius:18px;padding:14px;background:radial-gradient(120% 140% at 0% 0%,rgba(253,188,42,.35),rgba(253,188,42,.06) 55%),#141320;box-shadow:inset 0 0 0 1.5px rgba(253,188,42,.75),0 12px 30px rgba(0,0,0,.4);display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center}'+
 '.qe-av{width:46px;height:46px;border-radius:50%;background:#0c0b14;display:grid;place-content:center;position:relative;box-shadow:inset 0 0 0 2px rgba(255,255,255,.12)}.qe-1 .qe-av{width:58px;height:58px;box-shadow:inset 0 0 0 2.5px #fdbc2a}'+
 '.qe-av i{position:absolute;right:-3px;bottom:-3px;min-width:18px;height:18px;border-radius:9px;background:#fdbc2a;color:#04070e;font:800 10px/18px Inter;text-align:center;font-style:normal;padding:0 4px}'+
 '.qe-nm b{display:block;font:800 18px/1.1 Inter;letter-spacing:-.01em}.qe-1 .qe-nm b{font-size:22px}.qe-nm small{font:500 11px/1.3 Inter;color:rgba(255,255,255,.55)}'+
 '.qe-pl{text-align:right}.qe-pl b{display:block;font:800 18px/1 Inter;font-variant-numeric:tabular-nums;letter-spacing:-.02em}.qe-1 .qe-pl b{font-size:24px}.qe-pl small{font:600 11px/1.6 Inter;color:rgba(255,255,255,.55)}'+
 '.qe-chips{grid-column:1/-1;display:flex;gap:6px;flex-wrap:wrap}.qe-chips span{font:700 10.5px/1 Inter;padding:6px 9px;border-radius:20px;background:rgba(255,255,255,.07);color:rgba(255,255,255,.85)}.qe-chips span.gd{background:#fdbc2a;color:#04070e}'+
 '.qe-r{border-radius:16px;padding:10px 12px;background:#141320;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06);display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center}'+
 '.qe-dots{display:flex;gap:3px;margin-top:5px}.qe-dots i{width:7px;height:7px;border-radius:50%;display:block}'+
 '.qe .up,.qe-pr .up{color:#2fe08a}.qe .dn,.qe-pr .dn{color:#ff5a52}'+
 '.qe-try{border-radius:16px;padding:10px 12px;border:1.5px dashed rgba(255,255,255,.18);display:flex;justify-content:space-between;align-items:center;font:600 11.5px/1 Inter;color:rgba(255,255,255,.6)}.qe-try b{color:#fff}'+
 '.qe-pr{font-family:Inter;background:#141320;border-radius:18px;padding:14px;color:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06)}'+
 '.qe-tb{display:flex;gap:6px;overflow:hidden;margin-bottom:12px}.qe-tb span{font:700 11.5px/1 Inter;padding:9px 12px;border-radius:20px;background:rgba(255,255,255,.07);color:rgba(255,255,255,.7);white-space:nowrap}.qe-tb span.on{background:#fff;color:#04070e}'+
 '.qe-q{margin:0;font:800 17px/1.2 Inter;letter-spacing:-.01em}.qe-qs{margin:3px 0 8px;font:500 11.5px/1.4 Inter;color:rgba(255,255,255,.55)}'+
 '.qe-lr{display:grid;grid-template-columns:22px 1fr auto auto;gap:10px;align-items:center;padding:9px 0;border-top:1px solid rgba(255,255,255,.07);font:600 12px/1 Inter;font-variant-numeric:tabular-nums}.qe-lr .big{font:800 15px/1 Inter;text-align:right}.qe-lr i{width:10px;height:10px;border-radius:50%;display:block}';
 function dots(r){return '<div class="qe-dots">'+r.last.map(function(s){return '<i style="background:'+(s==="W"?"#2fe08a":"#ff5a52")+'"></i>'}).join('')+'</div>'}
 var r0=rows[0];
 var h='<div class="qe"><div class="qe-1"><span class="qe-av">'+mark(r0.m,c[r0.m],30)+'<i>#1</i></span><span class="qe-nm"><b>'+r0.nm+' 👑</b><small>'+r0.ver+'</small>'+dots(r0)+'</span><span class="qe-pl"><b class="up">'+usd(r0.pnl)+'</b><small>'+pc(r0.pct)+'</small></span><div class="qe-chips"><span class="gd">Buyback call</span><span>'+r0.W+'–'+r0.L+'</span><span>'+pct0(r0.acc)+' right</span><span>🔥 '+r0.stk+'</span></div></div>'+
  rows.slice(1).map(function(r,i){return '<div class="qe-r"><span class="qe-av">'+mark(r.m,c[r.m],24)+'<i style="background:#2a2838;color:#fff">'+(i+2)+'</i></span><span class="qe-nm"><b>'+r.nm+'</b><small>'+r.W+'–'+r.L+' · '+pct0(r.acc)+' right · '+r.stk+'</small>'+dots(r)+'</span><span class="qe-pl"><b class="'+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'</b><small>'+pc(r.pct)+'</small></span></div>'}).join('')+
  '<div class="qe-try"><span>In tryouts</span><b>'+TRY.join(' · ')+'</b></div></div>';
 var p='<div class="qe-pr"><div class="qe-tb">'+TABS.map(function(t,i){return '<span'+(i?'':' class="on"')+'>'+t+'</span>'}).join('')+'</div><p class="qe-q">Would following them have made you money?</p><p class="qe-qs">$100K each. All in on every call. No leverage.</p>'+
  chart({w:330,h:160,sw:2.2,lw:1.4,grid:20000,gc:"rgba(255,255,255,.06)",bw:1,dash:1,ax:"rgba(255,255,255,.4)",pad:[6,28,8,2],area:"#fdbc2a",col:function(r){return r===lead?"#fdbc2a":c[r.m]},end:3,af:"Inter"})+
  rows.map(function(r,i){return '<div class="qe-lr"><span style="color:rgba(255,255,255,.5)">'+(i+1)+'</span><span style="display:flex;align-items:center;gap:7px"><i style="background:'+(r===lead?"#fdbc2a":c[r.m])+'"></i>'+r.nm+'</span><span style="color:rgba(255,255,255,.55);font-weight:500">best '+usd(r.bw,1)+'</span><span class="big '+(r.pnl<0?'dn':'up')+'">'+usd(r.pnl)+'</span></div>'}).join('')+'</div>';
 return {css:css,std:h,proof:p}};
var o=B[D]();var st=document.createElement('style');st.textContent=o.css+'#standings .x2p-flip,#learn .x2p-pt{display:none!important}';document.head.appendChild(st);
var fl=document.querySelector('#standings .x2p-flip');var w=document.createElement('div');w.className='q-std';w.innerHTML=o.std;fl.parentNode.insertBefore(w,fl.nextSibling);
var pt=document.querySelector('#learn .x2p-pt');var w2=document.createElement('div');w2.className='q-proof';w2.innerHTML=o.proof;pt.parentNode.insertBefore(w2,pt.nextSibling);
window.__mbOk=1})();
