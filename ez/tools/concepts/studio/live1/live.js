/* live1 (owner, 2026-11-09: none of the six new interfaces; "what I do like is just the live now section of W2 from a design perspective, for the ones that are live... the last match day thing is not too bad"; "none of them show our actual interface"):
   W2's Live now card and its Last matchday list, rebuilt inside the live terminal (v53) with the terminal's own tokens, type and helpers.
   Everything else is the live page untouched. ?at=lb puts both on the Leaderboard (landing) instead of Upcoming. ?now=<ISO> fixes the clock for boards. */
(function(){
var Q=new URLSearchParams(location.search),AT=Q.get("at")==="lb"?"lb":"up",NOWQ=Q.get("now");
function now(){return NOWQ?new Date(NOWQ):new Date()}
var APP={GROK:"Grok",CLAUDE:"Claude",GPT:"ChatGPT",KIMI:"Kimi"};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function pct(a){return (a<0?"−":"+")+Math.abs(a).toFixed(2)+"%"}
function dur(ms){var m=Math.max(0,Math.round(ms/6e4)),d=Math.floor(m/1440),h=Math.floor(m%1440/60),mi=m%60;return d?d+"d "+h+"h":h?h+"h "+String(mi).padStart(2,"0")+"m":mi+"m"}
function day(d){return d.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}
/* a US listing grades at New York's close; open 6.5 h before it. Other exchanges: no live state claimed */
function us(t){return !/\.(T|KS|KQ|AS|L|SW|DE|PA|HK|TW|MI|CO|ST|HE|OL)$/.test(t)&&!/^\d/.test(t)&&["SOFTBANK","NINTENDO","BMW","DHL","SIEMENS","KIOXIA"].indexOf(t)<0}
function state(p,g,cl){if(!cl)return "ip";var n=+now();if(n>=+cl)return "await";if(us(p.ticker)&&n>=+cl-6.5*36e5&&new Date(cl).toDateString()===now().toDateString())return "live";return "ip"}
function side(c){return c.dir==="UP"?1:-1}
function col(arr,lab,k,done,winSide,winners){
  var cls="lv-sd "+k+(done?(winSide===k?" win":" lose"):"");
  return '<div class="'+cls+'"><h4>'+lab+'</h4><div class="lv-sl'+(arr.length>=3?" n3":"")+'">'+(arr.length?arr.map(function(c){var w=winners&&winners.indexOf(c.m)>-1;return '<div class="lv-p'+(w?" w":"")+'">'+aiIcon(c.m,arr.length>=3?26:32)+'<span>'+APP[c.m]+'</span><small>'+c.mag+'%</small></div>'}).join(""):'<div class="lv-none">Nobody</div>')+'</div></div>'}
function liveCards(){var L=(PENDING||[]).filter(function(p){return p.calls&&p.calls.length});if(!L.length)return "";
  var anyLive=false,cards=L.map(function(p){var g=gradeDay(p),cl=g&&nyClose(g.d),st=state(p,g,cl);if(st==="live")anyLive=true;
    var Lg=p.calls.filter(function(c){return c.dir==="UP"}),Sh=p.calls.filter(function(c){return c.dir!=="UP"});
    var pill=st==="live"?'<span class="lv-st live"><i></i>LIVE</span>':st==="await"?'<span class="lv-st aw">RESULT DUE</span>':'<span class="lv-st ip"><i></i>IN PLAY</span>';
    var hdr=cl?(st==="await"?"Graded ":"Grades ")+cl.toLocaleDateString([],{weekday:"short"})+" "+(g.est?"~":"")+tm(cl):"Date to come";
    var foot=st==="live"?'Trades in before the report. Today’s close grades all four. <b data-lvcd="'+(+cl)+'">Closes in '+dur(cl-now())+'</b>':
             st==="await"?'The close has rung. The result posts when the sheet updates.':
             'Trades in before the report. The market is shut; the close '+(cl?(g.est?"~":"")+day(cl)+" "+tm(cl):"")+' grades all four.'+(cl?' <b data-lvcd="'+(+cl)+'">In '+dur(cl-now())+'</b>':'');
    return '<div class="lv-c"><div class="lv-hd">'+pill+'<span>Round '+p.n+'</span><span class="r">'+hdr+'</span></div>'+
      '<div class="lv-bd">'+col(Lg,"LONG","L")+'<div class="lv-mid">'+coIcon(p.ticker)+'<b class="nm">'+esc(p.co)+'</b><span class="tk">'+esc(p.ticker)+hl(p.ticker)+'</span><span class="sc">'+Lg.length+'<i>v</i>'+Sh.length+'</span></div>'+col(Sh,"SHORT","S")+'</div>'+
      '<div class="lv-ft">'+foot+'</div></div>'}).join("");
  return '<section class="pn lv"><div class="tabs"><button class="on">'+(anyLive?'<span class="lvd"></span>LIVE NOW':'IN PLAY')+'<span class="n">'+L.length+'</span></button></div>'+cards+'</section>'}
function lastDay(){var G=ROUNDS.filter(function(r){return r.resolves&&typeof r.a==="number"});if(!G.length)return "";
  var last=G.reduce(function(m,r){var d=pd(r.resolves);return d&&d>m?d:m},new Date(0)),R=G.filter(function(r){var d=pd(r.resolves);return d&&+d===+last}).sort(function(a,b){return (CAPS[b.ticker]||0)-(CAPS[a.ticker]||0)||b.n-a.n});
  var rows=R.map(function(r){var W=String(r.win||"").toUpperCase().split(/\s*&\s*/).filter(function(m){return MK.indexOf(m)>-1}),calls={},mag={};
    r.calls.forEach(function(c){calls[c[0]]=c[1].indexOf("DOWN")===0?-1:1;mag[c[0]]=parseFloat(String(c[1]).replace(/[^0-9.]/g,""))});
    var lu=MK.filter(function(m){return calls[m]}).map(function(m){var ok=calls[m]*r.a>0,w=W.indexOf(m)>-1;return '<span class="lv-lu'+(ok?"":" no")+(w?" w":"")+'">'+aiIcon(m,20)+'</span>'}).join("");
    var who=W.length?W.map(function(m){return APP[m]}).join(" & ")+" won":"Nobody won",open=!!LVOPEN[r.n];
    var det=MK.filter(function(m){return calls[m]}).sort(function(x,y){return (calls[y]*r.a)-(calls[x]*r.a)||Math.abs(mag[x]*calls[x]-r.a)-Math.abs(mag[y]*calls[y]-r.a)}).map(function(m){var s=calls[m],ok=s*r.a>0,pl=1000*s*r.a,w=W.indexOf(m)>-1;
      return '<div class="lv-xr'+(ok?"":" no")+'">'+aiIcon(m,22)+'<span class="nm">'+APP[m]+(w?' <em>Closest</em>':'')+'</span><span class="sd">'+(s>0?"Long ":"Short ")+mag[m]+'%</span><span class="ok">'+(ok?"Right side":"Wrong side")+'</span><b class="'+(pl<0?"d":"u")+'">'+money(pl,1)+'</b></div>'}).join("");
    return '<div class="lv-it'+(open?" on":"")+'"><button type="button" class="lv-rr" data-lvx="'+r.n+'" aria-expanded="'+open+'">'+coIcon(r.ticker)+'<span class="lv-who"><b>'+esc(r.co)+' <i>'+esc(r.ticker)+'</i></b><small>'+who+'</small></span><span class="lus">'+lu+'</span><span class="mv '+(r.a<0?"d":"u")+'">'+pct(r.a)+'</span><span class="cv" aria-hidden="true"></span></button>'+
      '<div class="lv-x"'+(open?'':' hidden')+'>'+det+'<div class="lv-xf">'+esc(r.co)+' '+pct(r.a)+' at the close. $100K on every trade.</div></div></div>'}).join("");
  return '<section class="pn lv"><div class="tabs"><button class="on">LAST MATCHDAY<span class="n">'+R.length+'</span></button><span class="lv-dt">'+day(last)+'</span></div><div class="lv-ls">'+rows+'</div></section>'}
var LVOPEN={};document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-lvx]");if(!b)return;var n=b.getAttribute("data-lvx"),it=b.parentNode,x=it.querySelector(".lv-x");LVOPEN[n]=!LVOPEN[n];setTimeout(function(){var bb=document.querySelector('[data-lvx="'+n+'"]');if(!bb)return;var ii=bb.parentNode,xx=ii.querySelector(".lv-x");ii.classList.toggle("on",!!LVOPEN[n]);bb.setAttribute("aria-expanded",!!LVOPEN[n]);if(xx)xx.hidden=!LVOPEN[n]},0)});
window.__lvLive=liveCards;window.__lvLast=lastDay;
if(AT==="up"){var U0=upcoming;inPlay=function(){return liveCards()};upcoming=function(){return U0()+lastDay()};}
else{var Lo=leaders;leaders=function(){return liveCards()+lastDay()+Lo()};inPlay=function(){return ""};}
draw();
setInterval(function(){document.querySelectorAll("[data-lvcd]").forEach(function(b){var t=+b.getAttribute("data-lvcd");b.textContent=(b.textContent.indexOf("Closes")===0?"Closes in ":"In ")+dur(t-now())})},30000);
})();
