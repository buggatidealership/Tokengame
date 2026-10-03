/* =====================================================================
   EZ — shared data for every landing-page variant.
   Mirrors the ARENA sheet cell for cell. Edit here once; all variants follow.
   Winners, distances, direction, ladder: derived, never typed.
   ===================================================================== */
var CONFIG={ca:"",buyUrl:"",chain:"",x:"",tg:"",pool:"",poolUrl:"",betDate:"",
  /* the buyback scoreboard: "$EZ bought back" (text, e.g. "$12.4K"); empty = "Opens at launch" */
  boughtBack:"",
  /* the road: launch comes after launchAt graded rounds; set launched:true once $EZ is live */
  launchAt:35,launched:false};
/* The prompt every model gets, every round. verbatim:false = the shape only (pages say so);
   paste the exact text and set verbatim:true to publish it word for word. */
var PROMPT={verbatim:false,lines:["Company <i>X</i> reports on <i>date</i>.","Full freedom: use any tool you like.","Answer: <i>up or down</i>, and <i>by how much</i>."]};
var SHEET_CSV_URL="https://docs.google.com/spreadsheets/d/1Y9pKNsyB6NL_LGqUrEUydrt3R0cAwnGVllIRwk7CsLc/export?format=csv&gid=352731177";
var SHEET_HEADER=["ROUND","TICKER","CALL DATE (T-1)","GPT DIR","GPT MAG (%)","KIMI DIR","KIMI MAG (%)","CLAUDE DIR","CLAUDE MAG (%)","GROK DIR","GROK MAG (%)","RESOLUTION DATE/TIME","ACTUAL MOVE (%)","REPORT TIME"];
var SHEET=[
 ["1","GME","09/08/26","UP","1","UP","4","UP","2","","","09/09/26","5.95",""],
 ["2","ORCL","09/16/26","UP","6","DOWN","6","DOWN","3","","","09/17/26","-1.74",""],
 ["3","AZO","09/19/26","UP","4","DOWN","5","DOWN","4.5","","","09/22/26","3.25",""],
 ["4","GIS","09/19/26","UP","3","UP","3","DOWN","3","","","09/23/26","1.04",""],
 ["5","BB","09/20/26","UP","7","UP","9","UP","9","","","09/21/26","4.1",""],
 ["6","COST","09/24/26","DOWN","2.5","DOWN","2.5","DOWN","2.8","","","09/25/26","2.95",""],
 ["7","JEF","09/28/26","UP","3","UP","4.5","UP","3.7","","","09/29/26","-1.25",""],
 ["8","CCL","09/29/26","UP","3","UP","5","DOWN","5.7","","","09/29/26","13.53",""],
 ["9","MU","09/30/26","UP","4","UP","7","DOWN","6.8","UP","6","10/01/26","3.11",""],
 ["10","ACN","10/01/26","DOWN","4","DOWN","4.5","DOWN","6","DOWN","4.5","10/01/26","16.02",""],
 ["11","NKE","10/01/26","DOWN","3","UP","6","DOWN","8","DOWN","4.5","10/02/26","-3.64",""],
 ["12","2317.TW","10/05/26","","","","","","","","","10/06/26","",""],
 ["13","RPM","10/05/26","","","","","","","","","10/06/26","",""],
 ["14","005930.KS","10/06/26","","","","","","","","","10/08/26","",""],
 ["15","STX","10/06/26","","","","","","","","","10/07/26","",""],
 ["16","LEVI","10/07/26","","","","","","","","","10/08/26","",""],
 ["17","APLD","10/07/26","","","","","","","","","10/08/26","",""],
 ["18","PEP","10/07/26","","","","","","","","","10/08/26","",""],
 ["19","TSMC","10/08/26","","","","","","","","","10/12/26","",""],
 ["20","DAL","10/08/26","","","","","","","","","10/09/26","",""],
 ["21","JPM","10/12/26","","","","","","","","","10/13/26","",""],
 ["22","JNJ","10/12/26","","","","","","","","","10/13/26","",""],
 ["23","UNH","10/12/26","","","","","","","","","10/13/26","",""],
 ["24","GS","10/12/26","","","","","","","","","10/13/26","",""],
 ["25","WFC","10/12/26","","","","","","","","","10/13/26","",""],
 ["26","C","10/12/26","","","","","","","","","10/13/26","",""],
 ["27","DPZ","10/12/26","","","","","","","","","10/13/26","",""],
 ["28","8267.T","10/12/26","","","","","","","","","10/14/26","",""],
 ["29","ASML.AS","10/13/26","","","","","","","","","10/14/26","",""],
 ["30","BAC","10/13/26","","","","","","","","","10/14/26","",""],
 ["31","MS","10/13/26","","","","","","","","","10/14/26","",""],
 ["32","BLK","10/13/26","","","","","","","","","10/14/26","",""],
 ["33","2330.TW","10/14/26","","","","","","","","","10/16/26","",""],
 ["34","9602.T","10/14/26","","","","","","","","","10/16/26","",""],
 ["35","IBKR","10/15/26","","","","","","","","","10/16/26","",""],
 ["36","AA","10/15/26","","","","","","","","","10/16/26","",""]
];

/* presentation only — names, films, and the words on each card (never numbers) */
var TICKERS={JPM:"JPMorgan Chase",JNJ:"Johnson & Johnson",UNH:"UnitedHealth",GS:"Goldman Sachs",WFC:"Wells Fargo",C:"Citigroup",DPZ:"Domino's",BAC:"Bank of America",MS:"Morgan Stanley",BLK:"BlackRock",IBKR:"Interactive Brokers",AA:"Alcoa","8267.T":"AEON","ASML.AS":"ASML","2330.TW":"TSMC","9602.T":"Toho",GME:"GameStop",ORCL:"Oracle",AZO:"AutoZone",GIS:"General Mills",BB:"BlackBerry",COST:"Costco",JEF:"Jefferies",CCL:"Carnival",MU:"Micron",ACN:"Accenture",NKE:"Nike","2317.TW":"Foxconn",RPM:"RPM","005930.KS":"Samsung",STX:"Seagate",LEVI:"Levi Strauss",APLD:"Applied Digital",PEP:"PepsiCo",TSMC:"TSMC",DAL:"Delta"};
var CARDS={
 1:{tag:"SEASON OPENER",head:"Kimi Calls GameStop",film:"round-1-gamestop-hd",poster:"round-1-gamestop-hd-poster"},
 2:{tag:"THE FADE",head:"Oracle Fades; Claude Collects",film:"round-2-oracle-hd",poster:"round-2-oracle-hd-poster"},
 3:{tag:"TIGHTEST CALL",head:"GPT Answers the Doubters",film:"round-3-autozone",poster:"round-3-autozone-end"},
 4:{tag:"DEAD HEAT",head:"A Dead Heat at General Mills",film:"round-4-generalmills",poster:"round-4-generalmills-poster"},
 5:{tag:"LEAD CHANGE",head:"GPT Again, and the Standings Turn",film:"round-5-blackberry",poster:"round-5-blackberry-poster"},
 6:{tag:"NO WINNER",head:"The Call That Fooled All Three",film:"round-6-costco",poster:"round-6-costco-poster"}
};
/* optional exact times (UTC) for countdowns; the sheet only carries dates */
var TIMES={MU:{lock:"2026-09-30T20:30:00Z"}};
var MEDIA="media/";
/* Company marks. Put a logo file in media/logos/ (SVG or PNG, square, transparent) and list it here, e.g. GME:"logos/GME.svg".
   Without a file, pages show a ticker badge, so a new round never breaks the page. */
var CO_LOGOS={};
function coMark(t,cls){t=String(t||"").toUpperCase();var f=CO_LOGOS[t];
  return f?'<span class="co-mark has-logo '+(cls||'')+'" title="'+(TICKERS[t]||t)+'"><img src="'+MEDIA+f+'" alt="'+(TICKERS[t]||t)+'" loading="lazy"></span>'
          :'<span class="co-mark '+(cls||'')+'" title="'+(TICKERS[t]||t)+'">'+t+'</span>'}
/* Pool calculator assumptions (owner to confirm). null = not decided yet: the page uses its example value and marks it.
   feePct: % of each $EZ trade that becomes fees we collect · leverage: the bet's leverage · volPct: example daily volume as % of market cap
   betDate: MM/DD/YY of the NVIDIA bet (also CONFIG.betDate) */
var SIM={feePct:null,leverage:null,volPct:25,betDate:null};
/* the round films: webm/mp4/poster in media/, tall = 9:16 */
/* all rounds: 1080x1080 at 60fps ("-hd"); the original files stay for Variant 1.
   pan: for 9:16 films shown in a square, [second, vertical position %] keyframes so the frame follows the action */
/* PREFILMS: optional "calls are in" clips for rounds not graded yet (shown on the pending card only; the
   locked pages ignore them). Remove the entry once the round's real film is in FILMS. */
var PREFILMS={11:{f:"round-11-nike-calls",p:"round-11-nike-calls-poster"}};
/* RECEIPTS: public proof the calls were filed before the report, per round. Paste the link of the post
   (X, Telegram, or an on-chain memo) that published the calls with a timestamp, e.g. 11:"https://x.com/...". */
var RECEIPTS={};
var FILMS={1:{f:"round-1-gamestop-hd",p:"round-1-gamestop-hd-poster"},2:{f:"round-2-oracle-hd",p:"round-2-oracle-hd-poster"},3:{f:"round-3-autozone-hd",p:"round-3-autozone-end"},4:{f:"round-4-generalmills-hd",p:"round-4-generalmills-hd-poster"},5:{f:"round-5-blackberry-hd",p:"round-5-blackberry-hd-poster"},6:{f:"round-6-costco-hd",p:"round-6-costco-hd-poster"},7:{f:"round-7-jefferies-hd",p:"round-7-jefferies-hd-poster"},8:{f:"round-8-carnival-hd",p:"round-8-carnival-hd-poster"},9:{f:"round-9-micron-hd",p:"round-9-micron-hd-poster"},10:{f:"round-10-accenture-hd",p:"round-10-accenture-hd-poster"},11:{f:"round-11-nike-hd",p:"round-11-nike-hd-poster"}};
var NVIDIA_D="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z";
function nvLogo(){return '<span class="lg" style="background:#000" title="NVIDIA"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#76B900" d="'+NVIDIA_D+'"/></svg></span>'}
function hlLogo(){return '<span class="lg" style="background:#0f1a1f" title="Hyperliquid"><img src="'+MEDIA+'logo-hyperliquid.png" alt="" style="width:70%;height:70%;object-fit:contain"></span>'}
/* MODELS (ver = the exact model in play; keep it the newest one we use) — add a model here and it appears everywhere (roster, cards, logos).
   Marks: Simple Icons (CC0 paths of each brand's own mark), styled like the phone app icons. */
var MODELS={
 GPT:{name:"GPT",ver:"GPT-6 Astra",app:"ChatGPT",c:"#10a37f",bg:"#000",fg:"#fff",d:"M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"},
 KIMI:{name:"KIMI",ver:"Kimi K3",app:"Kimi",c:"#1e80ff",bg:"#000",fg:"#fff",d:"M9.41 13.388l8.447-8.377c.16-.16.07-.471-.14-.471h-4.55s-.1.02-.14.06l-9.099 9.029c-.14.14-.35.02-.35-.21V4.81c0-.15-.1-.27-.221-.27H.22c-.12 0-.22.12-.22.27v18.57c0 .15.1.27.22.27h3.137c.12 0 .22-.12.22-.27v-3.79c0-.08.03-.16.08-.21l2.826-2.796c.07-.07.16-.08.241-.03l7.546 5.551a8.9 8.9 0 0 0 4.018 1.493c.12.01.23-.11.23-.27V19.76c0-.14-.08-.25-.19-.26a5.8 5.8 0 0 1-2.355-.942l-6.533-4.73c-.14-.09-.15-.32-.03-.441",dot:"M21.765.351C22.998.351 24 1.353 24 2.586S22.998 4.82 21.765 4.82h-1.974c-.15 0-.26-.12-.26-.26V2.586A2.237 2.237 0 0 1 21.765.35",dotc:"#1e80ff"},
 CLAUDE:{name:"CLAUDE",ver:"Fable 5.1",app:"Claude",c:"#d97757",bg:"#f5f0e8",fg:"#d97757",d:"m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"},
 GROK:{name:"GROK",ver:"Grok 4.7",app:"Grok",c:"#111",bg:"#000",fg:"#fff",fr:"evenodd",d:"M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815"}
};
function logo(m,cls){var M=MODELS[m];return '<span class="lg '+(cls||'')+'" style="background:'+M.bg+'" title="'+M.app+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="'+M.fg+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+' d="'+M.d+'"/>'+(M.dot?'<path fill="'+M.dotc+'" d="'+M.dot+'"/>':'')+'</svg></span>'}

/* ---------- derive everything from the sheet ---------- */
var ROUNDS=[],PENDING=[],UPCOMING=[],LADDER=[],NEXT=null,MODEL_KEYS=[];
function fmtOut(v){var x=String(v).trim();if(x.charAt(0)==="-"||x.charAt(0)==="−")return "−"+x.replace(/^[-−]/,"")+"%";return "+"+x.replace(/^\+/,"")+"%"}
function fmtDate(d){var m=String(d).match(/(\d+)\/(\d+)/);if(!m)return d;return ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+m[1]]+" "+(+m[2])}
function build(header,rows){
  var col={};header.forEach(function(h,i){col[String(h).trim().toUpperCase()]=i});
  MODEL_KEYS=header.map(function(h){var m=String(h).trim().toUpperCase().match(/^(\w+) DIR$/);return m&&m[1]}).filter(Boolean);
  var g=function(r,k){var i=col[k];return i==null?"":String(r[i]==null?"":r[i]).trim()};
  ROUNDS=[];PENDING=[];UPCOMING=[];
  var tally={};MODEL_KEYS.forEach(function(m){tally[m]={won:0,right:0,n:0,err:0}});
  rows.forEach(function(r){
    var n=+g(r,"ROUND"),t=g(r,"TICKER").toUpperCase();if(!n||!t)return;
    var co=TICKERS[t]||t,act=g(r,"ACTUAL MOVE (%)"),calls=[];
    MODEL_KEYS.forEach(function(m){var d=g(r,m+" DIR").toUpperCase(),mg=g(r,m+" MAG (%)");if(d&&mg!=="")calls.push({m:m,dir:d,mag:mg,v:(d==="DOWN"?-1:1)*parseFloat(mg)})});
    var base={n:n,ticker:t,co:co,called:g(r,"CALL DATE (T-1)"),resolves:g(r,"RESOLUTION DATE/TIME"),timing:g(r,"REPORT TIME").toUpperCase(),card:CARDS[n]||{}};
    if(act!==""&&calls.length){
      var a=parseFloat(act),up=a>0;
      calls.forEach(function(c){c.ok=(c.v>0)===up;c.off=Math.abs(c.v-a);c.offs=c.off.toFixed(2)});
      var right=calls.filter(function(c){return c.ok}),best=Math.min.apply(null,right.map(function(c){return c.off}));
      var wn=right.filter(function(c){return Math.abs(c.off-best)<1e-9}).map(function(c){return c.m});
      calls.forEach(function(c){var T=tally[c.m];T.n++;T.err+=c.off;if(c.ok)T.right++;if(wn.indexOf(c.m)>-1)T.won++});
      var cd=base.card;
      ROUNDS.push({n:n,co:co,ticker:t,called:base.called,resolves:base.resolves,timing:base.timing,out:fmtOut(act),a:a,win:wn.length?wn.join(" & "):null,
        tag:cd.tag||(wn.length>1?"DEAD HEAT":wn.length?"":"NO WINNER"),head:cd.head||"",film:cd.film,poster:cd.poster,tall:cd.tall,
        calls:calls.map(function(c){return [c.m,c.dir+" "+c.mag+"%",c.offs]}),story:""});
    }else if(calls.length){PENDING.push({n:n,co:co,ticker:t,called:base.called,resolves:base.resolves,timing:base.timing,calls:calls,status:"calls-in"})}
    else{UPCOMING.push({n:n,co:co,ticker:t,called:base.called,resolves:base.resolves,timing:base.timing,lockAt:(TIMES[t]||{}).lock||null})}
  });
  LADDER=MODEL_KEYS.filter(function(m){return tally[m].n}).map(function(m){var T=tally[m];return {m:m,won:T.won,dir:T.right+" / "+T.n,avg:(T.err/T.n).toFixed(2)}})
    .sort(function(x,y){return (y.won-x.won)||(parseFloat(x.avg)-parseFloat(y.avg))});
  NEXT=UPCOMING[0]||PENDING[0]||null;
}
// REPORT TIME column (optional in the sheet): BMO = before the market opens, AMC = after it closes, DURING = in market hours
function timingLabel(t){return {BMO:"Before the open",AMC:"After the close",DURING:"During market hours"}[t]||""}
function nextLabel(u){return "Round "+u.n+" · "+u.co}
function parseCSV(t){var rows=[],r=[],f="",q=false;for(var i=0;i<t.length;i++){var ch=t[i];if(q){if(ch==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=ch}else if(ch==='"')q=true;else if(ch===","){r.push(f);f=""}else if(ch==="\n"||ch==="\r"){if(ch==="\r"&&t[i+1]==="\n")i++;r.push(f);rows.push(r);r=[];f=""}else f+=ch}if(f!==""||r.length){r.push(f);rows.push(r)}return rows.filter(function(x){return x.some(function(c){return String(c).trim()!==""})})}
build(SHEET_HEADER,SHEET);
ROUNDS.forEach(function(r){var f=FILMS[r.n];if(f){r.film=f.f;r.poster=f.p;r.tall=!!f.tall;r.pan=f.pan||null}});
function filmTag(r,attrs){return '<video '+(attrs||'playsinline muted loop preload="metadata"')+' poster="'+MEDIA+r.poster+'.jpg"><source src="'+MEDIA+r.film+'.webm" type="video/webm"><source src="'+MEDIA+r.film+'.mp4" type="video/mp4"></video>'}
function winLogos(r){return r.win?r.win.split(" & ").map(function(m){return logo(m)}).join(""):""}
function callOf(r,m){var c=r.calls.filter(function(c){return c[0]===m})[0];return c}
