/* Round 33 backs, shared facts. Run in the real X2+ page before an option's own js. Everything comes from the page's data
   (ROUNDS, RMETA, MODELS from ez-data.js); nothing is typed. window.__r33F(n) returns one round's story facts. The EZ grade and its
   one-line meaning are copied from x2plus.js (ezGrade, gradeLine), which keeps them private. */
(function(){
var MO=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],WD=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var nm=function(m){return m==="GPT"?"GPT":m.charAt(0)+m.slice(1).toLowerCase()};
var day=function(s){var m=String(s).match(/(\d+)\/(\d+)\/(\d+)/);if(!m)return null;var d=new Date(Date.UTC(2000+(+m[3]),+m[1]-1,+m[2],12));return {t:MO[+m[1]]+" "+(+m[2]),wd:WD[d.getUTCDay()],d:d}};
var pct2=function(x){return Math.abs(x).toFixed(2)+"%"};
var mag=function(x){var s=String(Math.abs(x));return s+"%"};
function ezGrade(g){var nc=g.calls.length,rw=g.calls.filter(function(x){return (x[1].indexOf("DOWN")<0)===(g.a>0)}).map(function(x){return +x[2]}),hit=rw.length,f=hit/nc,
    av=hit?rw.reduce(function(a,b){return a+b},0)/hit:0,mv=Math.abs(g.a),pt=av<=1.5?2:av<=2?1.5:av<=2.5?1:av<=3?.5:0,gr,ds,pr=false;
  if(f===1){gr=8+pt;if(gr===10&&!(av<mv/2))gr=9.5;ds=gr===10?((pr=av<1)?"Pristine":"Gem"):"Perfect"}else if(f>=.66){gr=6+Math.min(pt,1.5);ds="Strong"}else if(f>=.5){gr=4+Math.min(pt,1.5);ds="Split"}else if(f>0){gr=2+Math.min(pt,1.5);ds="Rough"}else{gr=1;ds="Rekt"}
  return {gr:gr,ds:ds,pr:pr,hit:hit,nc:nc,av:av}}
function gradeLine(E){if(E.gr===10)return E.pr?"Pristine 10: everyone right, and everyone close. The best grade there is.":"Gem 10: everyone right, and close.";
  if(E.ds==="Rekt")return "Rekt 1: nobody got it right. The lowest grade.";
  if(E.ds==="Perfect")return "Perfect "+E.gr+": all "+E.nc+" AIs got up or down right.";
  return E.ds+" "+E.gr+": "+(E.ds==="Strong"?"":"only ")+E.hit+" of the "+E.nc+" AIs got up or down right."}
var R=ROUNDS.slice().sort(function(x,y){return x.n-y.n});
var parse=function(r){return r.calls.map(function(c){var up=c[1].indexOf("DOWN")<0,mg=parseFloat(c[1].replace(/^\D+/,""));return {m:c[0],name:nm(c[0]),up:up,mg:mg,v:(up?1:-1)*mg,off:+c[2],ok:up===(r.a>0)}})};
/* the season so far, as the board stood: X2's ranking rule (hit rate among the AIs that called at least half the graded rounds,
   ties to the smaller average miss, the rest after them) */
function board(upto){var rs=R.filter(function(r){return r.n<=upto}),T={};
  rs.forEach(function(r){parse(r).forEach(function(c){var t=T[c.m]||(T[c.m]={m:c.m,n:0,right:0,err:0});t.n++;if(c.ok)t.right++;t.err+=c.off})});
  var L=Object.keys(T).map(function(k){var t=T[k];t.hr=t.right/t.n;t.avg=t.err/t.n;t.el=t.n>=rs.length/2;return t});
  L.sort(function(a,b){return (b.el-a.el)||(b.hr-a.hr)||(a.avg-b.avg)});return L}
var ALLOFF=[];R.forEach(function(r){parse(r).forEach(function(c){if(c.ok)ALLOFF.push({n:r.n,co:r.co,m:c.m,off:c.off})})});
var NCALLS=R.reduce(function(s,r){return s+r.calls.length},0);
var AVGMOVE=R.reduce(function(s,r){return s+Math.abs(r.a)},0)/R.length;
window.__r33F=function(n){var r=null;R.forEach(function(x){if(x.n===n)r=x});if(!r)return null;
  var C=parse(r),up=r.a>0,bulls=C.filter(function(c){return c.up}),bears=C.filter(function(c){return !c.up}),right=C.filter(function(c){return c.ok});
  var best=right.length?Math.min.apply(null,right.map(function(c){return c.off})):null,win=right.filter(function(c){return Math.abs(c.off-best)<1e-9});
  /* where the closest call ranks among every right-way call this season (as the sheet stands now) */
  var rank=null,ties=[];if(best!=null){rank=1+ALLOFF.filter(function(x){return x.off<best-1e-9}).length;ties=ALLOFF.filter(function(x){return Math.abs(x.off-best)<1e-9&&!(x.n===n&&win.some(function(w){return w.m===x.m}))})}
  var B0=board(n-1),B1=board(n),top0=B0[0]&&B0[0].m,top1=B1[0]&&B1[0].m,hr=function(L,m){var t=L.filter(function(x){return x.m===m})[0];return t?Math.round(t.hr*100):null};
  /* each AI's run of right calls ending with this round (rounds it called) */
  var streak=function(m){var k=0;for(var i=R.length-1;i>=0;i--){var x=R[i];if(x.n>n)continue;var c=parse(x).filter(function(c){return c.m===m})[0];if(!c)continue;if(c.ok)k++;else break}return k};
  var E=ezGrade(r),meta=RMETA[n]||{};
  var lo=Math.min.apply(null,C.map(function(c){return c.v}).concat([r.a])),hi=Math.max.apply(null,C.map(function(c){return c.v}).concat([r.a]));
  return {n:n,co:r.co,t:r.ticker,a:r.a,up:up,move:pct2(r.a),called:day(r.called),resolves:day(r.resolves),timing:r.timing,meta:meta,
    calls:C,bulls:bulls,bears:bears,right:right,best:best,win:win,winNames:win.map(function(c){return c.name}),rank:rank,ties:ties,nCalls:NCALLS,
    ratio:Math.abs(r.a)/AVGMOVE,avgMove:AVGMOVE,E:E,gradeLine:gradeLine(E),lo:lo,hi:hi,
    top0:top0,top1:top1,topName0:top0&&nm(top0),topName1:top1&&nm(top1),hr0:function(m){return hr(B0,m)},hr1:function(m){return hr(B1,m)},streak:streak,
    nm:nm,pct2:pct2,mag:mag,logo:function(m,cls){return typeof logo==="function"?logo(m,cls):""},esc:function(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}}};
/* keep the page's own parts of the back: the flip button and the GRADED stamp; the option fills the rest */
window.__r33keep=function(card){var bk=card.querySelector(".face.back"),fin=bk.querySelector(".fin");
  if(!fin.__r33){var fl=fin.querySelector("[data-flip]");fin.__r33={foot:fl?fl.closest(".cfoot")||fl:null,stamp:fin.querySelector(".gstamp")}}
  return {bk:bk,fin:fin,foot:fin.__r33.foot,stamp:fin.__r33.stamp}};
/* one Google font for a mockup (production would add it to the page's font link) */
window.__r33font=function(fam){var id="r33f-"+fam.replace(/\W+/g,"");if(document.getElementById(id))return;var l=document.createElement("link");l.id=id;l.rel="stylesheet";
  l.href="https://fonts.googleapis.com/css2?family="+fam+"&display=swap";document.head.appendChild(l)};
/* put the story in the panel: the option's html, then the page's own footer (the flip button) */
window.__r33fill=function(card,cls,html){var K=__r33keep(card);card.classList.add("r33",cls);var d=document.createElement("div");d.className="r33s";d.innerHTML=html;
  K.fin.innerHTML="";K.fin.appendChild(d);if(K.foot)K.fin.appendChild(K.foot);return {K:K,el:d}};
/* the story says which AI was closest, with the season's rank: "closest of all 172 calls this season (tied)" */
window.__r33rankLine=function(F){if(F.rank==null)return "";var t=F.ties.length;
  if(F.rank===1)return t?"tied for the closest call of the season":"the closest call of the season";
  return "the #"+F.rank+" closest of "+F.nCalls+" calls"};
/* grow one part's type (in px) until the panel would overflow, then step back: the story fills the back at every width
   (the fixed card height leaves more room on some phones than others); min and max bound it */
window.__r33grow=function(box,el,min,max){if(!box||!el)return;var z=min;el.style.fontSize=z+"px";
  var fits=function(){return box.scrollHeight<=box.clientHeight+.5};if(!fits()){while(z>min-2&&!fits()){z-=.25;el.style.fontSize=z+"px"}return}
  while(z<max){el.style.fontSize=(z+.25)+"px";if(!fits()){el.style.fontSize=z+"px";break}z+=.25}};
})();
