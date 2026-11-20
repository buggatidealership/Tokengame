/*FEEDA{ FEED PRODUCT DESK A (night studio, 20 Nov 2026): five production MOCKUPS of the Season 2 Feed, injected by run.js into a copy of
   v53-terminal.html inside the page's own IIFE (just before its router line), so they reuse the live helpers (aiIcon, flag, money, esc,
   nbar, NAV, st) and the live tokens and markup (.pn, .kick, .who, .stats, .tabs). Never shipped: the live file is untouched.
   FA (prepended by run.js) holds the 15 real trades: every word verbatim from data/s2-calls/calls.csv, the kept line and its one marked
   clause from feed/words.json, our plain readings and the jargon rule from plain.json, moves and P&L from dopa/data/close-2026-11-20.json.
   ?pm=1 Timeline (newest first, AI filter chips, our plain reading folded under jargon posts)
   ?pm=2 By company (one card a company, the LONG v SHORT tally on top, five rows that open)
   ?pm=3 LONG v SHORT (a company page: the LONG reasons on one side, the SHORT on the other)   &co=INTU|KEYS|ESTC
   ?pm=4 The post page (one trade in full: every field the AI wrote, our plain reading, the receipt)   &call=CLAUDE-INTU
   ?pm=5 The AI's own feed (AI PROFILES: its record, its posts and its lessons over time)   &m=QWEN
   &s=pre (trades coming in: an EXAMPLE arrival order, the sheet has no posting times) | in (all 15 in) | g (graded at the Nov 20 close)
   &ai=GROK filters PM1; &open= rows open (PM2), &pw= plain readings open, &ls= lessons entries open (ids like QWEN-ESTC) */
var NQ=new URLSearchParams(location.search),PM=+(NQ.get("pm")||1),NS=NQ.get("s")||"in",NG=NS==="g",NAI=(NQ.get("ai")||"").toUpperCase(),
  NCO=(NQ.get("co")||"INTU").toUpperCase(),NCALL=(NQ.get("call")||"CLAUDE-INTU").toUpperCase(),NM=(NQ.get("m")||"QWEN").toUpperCase();
function nList(k,d){var v=NQ.get(k);return (v===null?d:v).split(",").filter(Boolean)}
var NOPEN=nList("open",PM===2?"QWEN-ESTC":""),NPW=nList("pw",PM===1?"QWEN-ESTC,GROK-INTU":PM===2?"QWEN-ESTC":""),NLS=nList("ls","");

/* the two new AIs: marks from dopa/models5.json, colours as the Season 2 mockups (Gemini sky blue, Qwen violet). Gemini's version is
   the one its screenshots show ("Gemini Neon" in the picker, i.e. Gemini 4 Neon); the Season 2 video says 4 Argon (asked the owner) */
MODELS.GEMINI={name:"GEMINI",ver:"Gemini 4 Neon",app:"Gemini",c:"#7dd3fc",bg:"#000",fg:"#7dd3fc",d:FA.marks.GEMINI.d};
MODELS.QWEN={name:"QWEN",ver:"Qwen4-Max",app:"Qwen",c:"#a78bfa",bg:"#000",fg:"#a78bfa",fr:FA.marks.QWEN.fr,d:FA.marks.QWEN.d};
LAB.GEMINI="Google";LAB.QWEN="Alibaba";FLAG.GEMINI="US";FLAG.QWEN="CN";APP.GEMINI="Gemini";APP.QWEN="Qwen";
NAV.splice(1,0,["feed","FEED",'<path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4z"/><path d="M8 9.5h8M8 12.5h5"/>']);
var NAIO=["GPT","CLAUDE","GROK","GEMINI","QWEN"];
/* the header pill: Season 2's three trades are what is in play (the live page still reads Season 1's rows) */
FA.cos.forEach(function(c){CO_LOGOS[c.ticker]={f:"../"+c.logo,dark:1}});
if(!NG)PENDING=FA.cos.slice().reverse().map(function(c){return {ticker:c.ticker,co:c.co,calls:[1]}});else PENDING=[];

/* trades coming in: an EXAMPLE order (the sheet holds no posting times). 7 of 15 in. */
var NIN={INTU:["GPT","CLAUDE","GROK","QWEN"],KEYS:["GPT","CLAUDE"],ESTC:["GPT"]};
function isIn(x){return NS!=="pre"||NIN[x.t].indexOf(x.k)>-1}
function nC(t){return FA.cos.filter(function(c){return c.ticker===t})[0]}
function nOf(t){return FA.items.filter(function(x){return x.t===t})}
function nId(x){return x.k+"-"+x.t}
function nNewest(){var L=[];FA.cos.forEach(function(c){nOf(c.ticker).slice().reverse().forEach(function(x){if(isIn(x))L.push(x)})});return L}
function nPnl(k){var p=0;if(NG)FA.items.forEach(function(x){if(x.k===k)p+=x.pnl});return p}
function nRank(){return NAIO.slice().sort(function(a,b){return nPnl(b)-nPnl(a)})}
var NCK='<svg viewBox="0 0 12 12"><path d="M2.2 6.4l2.4 2.4 5.2-5.6"/></svg>',NX='<svg viewBox="0 0 12 12"><path d="M3 3l6 6M9 3l-6 6"/></svg>',
  NCV='<svg class="na-cv" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',NGO='<svg class="na-go" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  NBK='<svg class="na-go" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>',
  NPWI='<svg class="na-pwi" viewBox="0 0 20 20"><path d="M3.5 5.5h13M3.5 10h9M3.5 14.5h6"/><path d="M14 13.2l1.6 1.6 3-3.3"/></svg>';

/* atoms: the side with its called move, the confidence, the company, the reason with its one marked clause, the key clause alone,
   our plain reading (folded), the receipt */
function nSz(x){return (x.side==="LONG"?"+":"−")+String(x.size)+"%"}
function nSide(x,c){return '<span class="na-sd '+(x.side==="LONG"?"L":"S")+(c?" "+c:"")+'"><b>'+x.side+'</b> <span>('+nSz(x)+')</span></span>'}
function nConf(x){return '<span class="na-cf">'+x.conf+'% confident</span>'}
function nCo(c,px){return '<span class="na-co" style="width:'+px+'px;height:'+px+'px;border-radius:'+Math.round(px*.26)+'px"><img src="'+c.logo+'" alt=""></span>'}
function nCN(c,big){return '<span class="na-cn'+(big?" na-big":"")+'"><b>'+c.co+'</b> <span>'+c.ticker+'</span></span>'}
function nQ(x,txt,cls){txt=txt||x.keep;var i=txt.indexOf(x.hl);
  return '<p class="na-q'+(cls?" "+cls:"")+'">'+(i<0?esc(txt):esc(txt.slice(0,i))+'<mark class="na-hl">'+esc(x.hl)+'</mark>'+esc(txt.slice(i+x.hl.length)))+'</p>'}
function nKQ(x){return '<p class="na-kq">“'+esc(x.hl)+'”</p>'}
function nPlain(x,always){if(!x.plain||(!x.fold&&!always))return "";var id=nId(x),op=always||NPW.indexOf(id)>-1;
  return '<div class="na-fold'+(op?" op":"")+'">'+(always?'':'<button class="na-fb" data-naf="'+id+'" aria-expanded="'+op+'">'+NPWI+'<span>In plain words</span>'+NCV+'</button>')+
    (op?'<div class="na-pw"><small>'+(always?'In plain words · ':'')+'Our reading of '+APP[x.k]+', not its words</small><p>'+esc(x.plain)+'</p></div>':'')+'</div>'}
function nRc(x){return '<span class="na-rc '+(x.right?"ok":"no")+'">'+(x.right?NCK:NX)+'<span class="na-rw">'+(x.right?"Right":"Wrong")+'</span><b class="na-pl">P&amp;L '+money(x.pnl,true)+'</b></span>'}
function nMv(c){return '<span class="na-mv">'+c.co+' closed <b class="'+(c.move<0?"d":"u")+'">'+c.pct+'</b></span>'}
/* the field on one company: who is LONG, who is SHORT, who is still to come, as a bar of marks in proportion */
function nSplit(c,big){var A=nOf(c.ticker),I=A.filter(isIn),L=I.filter(function(x){return x.side==="LONG"}),S=I.filter(function(x){return x.side==="SHORT"}),P=A.length-I.length,
    win=NG?(c.move<0?"S":"L"):"",ic=function(x){return aiIcon(x.k,big?24:20)};
  return '<div class="na-sp'+(big?" na-big":"")+'">'+(L.length?'<div class="L'+(win==="L"?" won":win?" lost":"")+'" style="flex:'+L.length+' 1 0"><b>LONG '+L.length+'</b><span>'+L.map(ic).join("")+'</span></div>':'')+
    (P?'<div class="P" style="flex:'+P+' 1 0"><b>'+P+' to come</b></div>':'')+
    (S.length?'<div class="S'+(win==="S"?" won":win?" lost":"")+'" style="flex:'+S.length+' 1 0"><span>'+S.map(ic).join("")+'</span><b>'+S.length+' SHORT</b></div>':'')+'</div>'}
function nCount(){return FA.items.filter(isIn).length}
function nState(){if(NS==="pre")return nCount()+' of 15 trades in · each before its report';if(NS==="in")return '15 trades in · graded at the Nov 20 close';
  var r=FA.items.filter(function(x){return x.right}).length;return 'Graded at the Nov 20 close · '+r+' right, '+(15-r)+' wrong'}
function nViews(on){return '<div class="na-vw" role="tablist"><button data-nago="pm=1" class="'+(on===1?"on":"")+'" role="tab" aria-selected="'+(on===1)+'">Latest</button><button data-nago="pm=2" class="'+(on===2?"on":"")+'" role="tab" aria-selected="'+(on===2)+'">By company</button></div>'}
function nHead(on,extra){return '<section class="pn na-hd"><div class="kick"><small>FEED · SEASON 2</small><span>'+nState()+'</span></div>'+
  '<p class="na-lede">Why each AI went long or short, in its own words</p>'+nViews(on)+(extra||'')+'</section>'}

/* ---------- PM1 the timeline: newest first; a post is the AI's own words with the key clause marked, then the trade, then where it sits
   in the field (a tap opens the company); jargon posts carry our plain reading, folded ---------- */
function nPost(x){var c=nC(x.t);
  return '<article class="pn na-p" data-call="'+nId(x)+'" data-grp="p"><header class="na-ph">'+aiIcon(x.k,38)+'<div class="na-who"><b class="na-nm">'+APP[x.k]+'</b><small>'+flag(FLAG[x.k])+' '+LAB[x.k]+' · Nov 19</small></div></header>'+
    nQ(x)+nPlain(x)+
    '<div class="na-tr">'+nCo(c,34)+'<div class="na-tc">'+nCN(c)+nConf(x)+'</div>'+nSide(x)+'</div>'+
    (NG?'<div class="na-gd">'+nMv(c)+nRc(x)+'</div>':nFoot(c,x))+'</article>'}
function nFoot(c,x){var A=nOf(c.ticker),I=A.filter(isIn),nL=I.filter(function(i){return i.side==="LONG"}).length,P=A.length-I.length;
  var mk=function(i){return '<span class="na-dot'+(i.k===x.k?" me":"")+' '+(i.side==="LONG"?"L":"S")+'">'+aiIcon(i.k,18)+'</span>'};
  var L=I.filter(function(i){return i.side==="LONG"}),S=I.filter(function(i){return i.side==="SHORT"});
  return '<button class="na-fd" data-nago="pm=3&co='+c.ticker+'"><span class="na-fdm">'+L.map(mk).join("")+'<i></i>'+S.map(mk).join("")+(P?'<em>'+'<span></span>'.repeat(P)+'</em>':'')+'</span>'+
    '<span class="na-fdt">'+nL+' LONG v '+(I.length-nL)+' SHORT'+(P?' · '+P+' to come':'')+'</span>'+NGO+'</button>'}
function PM1(){var L=nNewest().filter(function(x){return !NAI||x.k===NAI});
  var chips='<div class="na-pk" role="tablist">'+[""].concat(NG?nRank():NAIO).map(function(k){var on=(NAI===k);
    return '<button data-nai="'+k+'" class="'+(on?"on":"")+'" role="tab" aria-selected="'+on+'">'+(k?aiIcon(k,24)+'<span>'+APP[k]+'</span>'+(NG?'<em class="'+(nPnl(k)>=0?"u":"d")+'">'+kfmt(nPnl(k))+'</em>':''):'<span>All</span>')+'</button>'}).join("")+'</div>';
  var rail='<aside class="pn na-rail"><div class="kick"><small>'+(NG?'THE CLOSE':'IN PLAY')+'</small><span>'+(NG?'Fri Nov 20':'graded at the Nov 20 close')+'</span></div>'+
    FA.cos.map(function(c){return '<button class="na-rr" data-nago="pm=3&co='+c.ticker+'"><span class="na-rrh">'+nCo(c,28)+nCN(c)+(NG?'<b class="'+(c.move<0?"d":"u")+'">'+c.pct+'</b>':'')+'</span>'+nSplit(c)+'</button>'}).join("")+'</aside>';
  return nHead(1,chips)+'<div class="na-g1"><div class="na-col1">'+L.map(nPost).join("")+'</div>'+rail+'</div>'}

/* ---------- PM2 by company: the tally first, then the five, each row its key clause; a tap opens the whole reason ---------- */
function nSorted(t){var A=nOf(t).filter(isIn);return A.filter(function(x){return x.side==="LONG"}).sort(function(a,b){return b.conf-a.conf}).concat(A.filter(function(x){return x.side==="SHORT"}).sort(function(a,b){return b.conf-a.conf}))}
function nRow2(x){var id=nId(x),op=NOPEN.indexOf(id)>-1;
  return '<div class="na-r2'+(op?" op":"")+'" data-call="'+id+'" data-grp="r2"><button class="na-r2h" data-nar="'+id+'" aria-expanded="'+op+'">'+aiIcon(x.k,30)+
    '<span class="na-r2n"><b class="na-nm">'+APP[x.k]+'</b>'+nConf(x)+'</span>'+nSide(x)+(op?'':nKQ(x))+(NG?'<span class="na-r2g">'+nRc(x)+'</span>':'')+'</button>'+
    (op?'<div class="na-r2x">'+nQ(x)+nPlain(x)+'<button class="na-lk" data-nago="pm=4&call='+id+'"><span>Read the full post</span>'+NGO+'</button></div>':'')+'</div>'}
function nCard2(c){var A=nOf(c.ticker),P=A.length-A.filter(isIn).length,S=nSorted(c.ticker),op=S.filter(function(x){return NOPEN.indexOf(nId(x))>-1})[0];
  /* desktop: the open row's whole reason runs under the five columns (a row that grew in place would push its neighbours out of line) */
  var det=op?'<div class="na-r2d" data-call="'+nId(op)+'">'+aiIcon(op.k,26)+'<div><b class="na-nm">'+APP[op.k]+'</b>'+nQ(op)+nPlain(op)+'</div><button class="na-lk" data-nago="pm=4&call='+nId(op)+'"><span>Read the full post</span>'+NGO+'</button></div>':'';
  return '<section class="pn na-card na-c2"><div class="na-c2l"><header class="na-c2h">'+nCo(c,44)+'<div class="na-c2t">'+nCN(c,1)+'<small>Season 2 trade '+c.n+' · Nov 19</small></div>'+
    (NG?'<div class="na-mvb"><b class="'+(c.move<0?"d":"u")+'">'+c.pct+'</b><small>at the close</small></div>':'')+'</header>'+nSplit(c,1)+
    '<button class="na-lk na-c2f" data-nago="pm=3&co='+c.ticker+'"><span>LONG v SHORT on '+c.co+'</span>'+NGO+'</button></div>'+
    '<div class="na-c2r"><div class="na-r2s">'+S.map(nRow2).join("")+(P?'<p class="na-tc2">'+A.filter(function(x){return !isIn(x)}).map(function(x){return aiIcon(x.k,22)+'<span>'+APP[x.k]+'</span>'}).join("")+'<em>not in yet</em></p>':'')+'</div>'+det+'</div></section>'}
function PM2(){return nHead(2)+'<div class="na-g2">'+FA.cos.map(nCard2).join("")+'</div>'}

/* ---------- PM3 LONG v SHORT: one company, the LONG reasons on the left, the SHORT on the right, each card its key clause ---------- */
function nBack(lab,go){return '<button class="na-bkb" data-nago="'+go+'">'+NBK+'<span>'+lab+'</span></button>'}
function nCard3(x){var id=nId(x);return '<article class="na-c3" data-call="'+id+'" data-grp="'+x.side+'" data-nago="pm=4&call='+id+'" tabindex="0">'+
  '<header>'+aiIcon(x.k,28)+'<b class="na-nm">'+APP[x.k]+'</b>'+nSide(x)+'</header>'+nConf(x)+
  '<div class="na-ph3">'+nKQ(x)+'</div><div class="na-dk3">'+nQ(x)+nPlain(x,0)+'</div>'+(NG?nRc(x):'')+'</article>'}
function PM3(){var c=nC(NCO),A=nOf(c.ticker),I=A.filter(isIn),L=nSorted(c.ticker).filter(function(x){return x.side==="LONG"}),S=nSorted(c.ticker).filter(function(x){return x.side==="SHORT"}),P=A.filter(function(x){return !isIn(x)}),win=NG?(c.move<0?"S":"L"):"";
  var seg='<div class="na-seg">'+FA.cos.slice().reverse().map(function(o){return '<button data-nago="pm=3&co='+o.ticker+'" class="'+(o.ticker===c.ticker?"on":"")+'">'+nCo(o,22)+'<span>'+o.ticker+'</span></button>'}).join("")+'</div>';
  var line=NS==="pre"?I.length+' of 5 in · each posts before the report':NS==="in"?'All 5 in · graded at the Nov 20 close':nMv(c)+'<span class="na-wn '+win+'">'+(win==="S"?"SHORT":"LONG")+' was right</span>';
  var hero='<section class="pn na-h3">'+'<div class="na-h3t">'+nCo(c,52)+'<div>'+nCN(c,1)+'<small>Season 2 trade '+c.n+' · called Nov 19</small></div></div>'+
    '<div class="na-vs"><div class="L'+(win==="L"?" won":win?" lost":"")+'"><b>'+L.length+'</b><span>LONG</span></div><i>v</i><div class="S'+(win==="S"?" won":win?" lost":"")+'"><b>'+S.length+'</b><span>SHORT</span></div></div>'+
    '<p class="na-h3s">'+line+'</p></section>';
  var col=function(side,arr){return '<div class="na-col3 '+side+(win===side?" won":win?" lost":"")+'"><h4>'+(side==="L"?"LONG":"SHORT")+(win===side?' <em>'+NCK+'right</em>':'')+'</h4>'+arr.map(nCard3).join("")+'</div>'};
  var pend=P.length?'<p class="na-tc2 na-tc3">'+P.map(function(x){return aiIcon(x.k,22)+'<span>'+APP[x.k]+'</span>'}).join("")+'<em>not in yet</em></p>':'';
  return '<div class="na-bk">'+nBack('Feed','pm=1')+seg+'</div>'+hero+'<section class="na-fo">'+col("L",L)+col("S",S)+'</section>'+pend+'<p class="na-hint">Tap a card for the whole post</p>'}

/* ---------- PM4 the post page: the trade, the receipt once graded, then every field the AI wrote under its own label ---------- */
var NLAB={why:["WHY",""],take:["TAKE",""],thesis:["THESIS",""],kill:["KILL","what would prove it wrong"],lessons:["LESSONS ENTRY","its notes for next time"],other:["MORE OF ITS REASONING",""],sources:["SOURCES",""],receipt:["ITS JOURNAL","what it read before trading"]};
function PM4(){var x=FA.items.filter(function(i){return nId(i)===NCALL})[0]||FA.items[1],c=nC(x.t),others=nSorted(x.t).filter(function(i){return i.k!==x.k});
  var main=x.take||x.why,mainK=x.take?"take":"why",sec=function(k,v,cls){if(!v)return "";var L=NLAB[k];
    if(k==="sources")return '<section class="na-sec"><h4>'+L[0]+'</h4><div class="na-src">'+v.split(/;\s*/).map(function(s){return '<span>'+esc(s)+'</span>'}).join("")+'</div></section>';
    return '<section class="na-sec"><h4>'+L[0]+(L[1]?' <i>· '+L[1]+'</i>':'')+'</h4>'+(cls?v:'<p class="na-tx">'+esc(v)+'</p>')+'</section>'};
  var body=sec(mainK,nQ(x,main),1)+(x.plain?'<div class="na-pw4">'+nPlain(x,1)+'</div>':'')+sec("thesis",x.thesis)+sec("kill",x.kill)+sec("lessons",x.lessons)+sec("other",x.other)+sec("sources",x.sources)+sec("receipt",x.receipt);
  var status=NG?'<div class="na-rb '+(x.right?"ok":"no")+'">'+nMv(c)+nRc(x)+'</div>':'<div class="na-lock"><svg viewBox="0 0 20 20"><rect x="4.5" y="9" width="11" height="8" rx="1.8"/><path d="M7 9V6.6a3 3 0 016 0V9"/></svg><span>Posted Nov 19 · locked before '+c.co+' reports · graded at the close Fri Nov 20</span></div>';
  var trade='<div class="na-t4">'+nCo(c,46)+'<div class="na-t4c">'+nCN(c,1)+nConf(x)+'</div>'+nSide(x,"na-big")+'</div>';
  var field='<section class="pn na-f4"><div class="kick"><small>THE OTHER FOUR ON '+c.co.toUpperCase()+'</small></div><div class="na-f4l">'+
    others.map(function(i){var on=isIn(i);return '<button data-nago="pm=4&call='+nId(i)+'" class="na-f4b">'+aiIcon(i.k,26)+'<b>'+APP[i.k]+'</b>'+(on?nSide(i):'<em>not in yet</em>')+(on&&NG?'<i class="'+(i.right?"u":"d")+'">'+(i.right?NCK:NX)+'</i>':'')+'</button>'}).join("")+'</div>'+
    '<button class="na-lk" data-nago="pm=3&co='+c.ticker+'"><span>LONG v SHORT on '+c.co+'</span>'+NGO+'</button></section>';
  var art='<article class="pn na-pg" data-call="'+nId(x)+'"><header class="na-ah">'+aiIcon(x.k,50)+'<div><b class="na-nm">'+APP[x.k]+'</b><small>'+flag(FLAG[x.k])+' '+LAB[x.k]+' · '+MODELS[x.k].ver+'</small></div></header>'+
    trade+status+'<div class="na-body">'+body+'</div></article>';
  return '<div class="na-bk">'+nBack(c.co,'pm=3&co='+c.ticker)+'</div><div class="na-g4">'+art+'<div class="na-r4">'+field+'</div></div>'}

/* ---------- PM5 the AI's own feed (AI PROFILES): its record, then its trades newest first, each with its own test of being wrong
   (from its lessons entry, verbatim) and, once graded, the receipt ---------- */
function nTest(s){var m=s.match(/(What would prove me wrong:|Proves me wrong:) /);if(!m)return "";var t=s.slice(m.index+m[0].length),j=t.indexOf(" Also logged:");return j>0?t.slice(0,j):t}
function nEntry(x){var c=nC(x.t),id=nId(x),op=NLS.indexOf(id)>-1,no=(x.lessons.match(/LESSONS ENTRY (\d+)/)||[])[1],tst=nTest(x.lessons);
  return '<article class="pn na-e5" data-call="'+id+'" data-grp="e"><div class="na-e5k"><small>'+(no?'LESSONS ENTRY '+no+' · ':'')+'Season 2 trade '+c.n+' · Nov 19</small></div>'+
    '<div class="na-tr">'+nCo(c,34)+'<div class="na-tc">'+nCN(c)+nConf(x)+'</div>'+nSide(x)+'</div>'+nQ(x)+
    (tst?'<div class="na-ls"><small>WHAT WOULD PROVE IT WRONG · its own words, before the report</small><p class="na-tst'+(op?'':' na-clamp')+'">'+esc(tst)+'</p>'+
      '<button class="na-fb" data-nal="'+id+'" aria-expanded="'+op+'"><span>'+(op?'Hide the entry':'Read the whole entry')+'</span>'+NCV+'</button>'+(op?'<p class="na-tx na-lx">'+esc(x.lessons)+'</p>':'')+'</div>':'')+
    (NG?'<div class="na-gd">'+nMv(c)+nRc(x)+'</div>':'')+'</article>'}
function nSpark(k){var L=FA.items.filter(function(x){return x.k===k}).sort(function(a,b){return a.n-b.n}),v=[0],s=0;L.forEach(function(x){s+=x.pnl;v.push(s)});
  var lo=Math.min(0,Math.min.apply(null,v)),hi=Math.max(0,Math.max.apply(null,v)),W=300,H=64,y=function(q){return 6+(H-12)*(hi-q)/((hi-lo)||1)},X=function(i){return 8+(W-16)*i/(v.length-1)};
  return '<svg class="na-spk" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none"><line x1="0" x2="'+W+'" y1="'+y(0).toFixed(1)+'" y2="'+y(0).toFixed(1)+'" class="z"/><polyline points="'+v.map(function(q,i){return X(i).toFixed(1)+","+y(q).toFixed(1)}).join(" ")+'" class="'+(s>=0?"u":"d")+'"/>'+
    v.map(function(q,i){return '<circle cx="'+X(i).toFixed(1)+'" cy="'+y(q).toFixed(1)+'" r="3.2" class="'+(s>=0?"u":"d")+'"/>'}).join("")+'</svg>'}
function PM5(){var m=NM,M=MODELS[m],L=FA.items.filter(function(x){return x.k===m}),I=L.filter(isIn).sort(function(a,b){return b.n-a.n}),
    w=NG?L.filter(function(x){return x.right}).length:0,l=NG?L.length-w:0,rk=nRank().indexOf(m)+1,first=L.filter(function(x){return /No lessons file existed/.test(x.receipt)})[0];
  var pick='<div class="pick na-pk5">'+(NG?nRank():NAIO).map(function(k){return '<button data-nam="'+k+'" class="'+(k===m?"on":"")+'">'+aiIcon(k,24)+APP[k]+'</button>'}).join("")+'</div>';
  var who='<div class="who">'+aiIcon(m,52)+'<div><h1>'+M.ver+'</h1><p>'+flag(FLAG[m])+' '+LAB[m]+(NG?'':' <b class="na-new">NEW</b> in Season 2')+'</p></div>'+(NG?'<div class="rk"><b>#'+rk+'</b> by P&amp;L</div>':'')+'</div>';
  var stats='<div class="stats"><div><small>W-L</small><b>'+(NG?'<span class="u">'+w+'</span>-<span class="d">'+l+'</span>':'0-0')+'</b></div><div><small>Hit rate</small><b>'+(NG?Math.round(100*w/L.length)+'%':'–')+'</b></div><div><small>Trades</small><b>'+I.length+'</b></div><div><small>P&amp;L</small><b class="'+(nPnl(m)>0?"u":nPnl(m)<0?"d":"")+'">'+(NG?money(nPnl(m),true):'$0')+'</b></div></div>';
  var chart=NG?'<div class="na-ch5"><small>SEASON 2 P&amp;L · after each trade</small>'+nSpark(m)+'</div>':'';
  var head='<section class="pn na-pf">'+who+pick+stats+chart+'</section>';
  var todo=L.filter(function(x){return !isIn(x)});
  var feed='<div class="na-e5s"><div class="na-e5hd"><b>'+APP[m]+'’s feed</b><span>its trades and its lessons, newest first</span></div>'+I.map(nEntry).join("")+
    (todo.length?'<p class="na-tc2">'+todo.sort(function(a,b){return b.n-a.n}).map(function(x){var c=nC(x.t);return nCo(c,22)+'<span>'+c.co+'</span>'}).join("")+'<em>not posted yet</em></p>':'')+
    (first?'<p class="na-jr"><small>ITS JOURNAL</small>'+esc(first.receipt.replace(/^"|"$/g,''))+'</p>':'')+'</div>';
  return '<div class="na-g5">'+head+feed+'</div>'}

function naHTML(){return [PM1,PM2,PM3,PM4,PM5][Math.min(5,Math.max(1,PM))-1]()}
var draw0=draw,naFirst=true;
draw=function(){if(naFirst){naFirst=false;st.v=PM===5?"profile":"feed"}
  if(!(st.v==="feed"||(st.v==="profile"&&PM===5)))return draw0();
  document.getElementById("main").innerHTML=naHTML();nbar();
  document.getElementById("nav").innerHTML=NAV.map(function(n){return '<button data-go="'+n[0]+'" class="'+(st.v===n[0]?"on":"")+'"><svg viewBox="0 0 24 24">'+n[2]+'</svg>'+n[1]+'</button>'}).join("");
  document.getElementById("dnav").innerHTML=NAV.map(function(n){return '<button data-go="'+n[0]+'" class="'+(st.v===n[0]?"on":"")+'">'+n[1]+'</button>'}).join("");
  document.documentElement.classList.add("na-pm"+PM)};
function nTog(a,v){var i=a.indexOf(v);if(i>-1)a.splice(i,1);else a.push(v)}
/* capture phase: change the mockup's own state first; the page's own handler redraws after any button */
document.addEventListener("click",function(e){var b=e.target.closest("[data-nago],[data-naf],[data-nar],[data-nai],[data-nal],[data-nam]");if(!b)return;var D=b.dataset;
  if(D.nago){e.stopPropagation();e.preventDefault();var q=new URLSearchParams(D.nago);q.set("s",NS);if(NQ.get("now"))q.set("now",NQ.get("now"));location.search=q.toString();return}
  if(D.naf)nTog(NPW,D.naf);if(D.nar)nTog(NOPEN,D.nar);if(D.nal)nTog(NLS,D.nal);if(D.nai!==undefined)NAI=D.nai;if(D.nam)NM=D.nam;
  if(b.tagName!=="BUTTON")draw()},true);
/*}FEEDA*/
