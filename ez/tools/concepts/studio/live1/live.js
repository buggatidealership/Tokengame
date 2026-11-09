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
    var foot=st==="live"?'Trades in before the report. Today’s close grades all four. <b data-lvcd="'+(+cl)+'">Resolves in '+dur(cl-now())+'</b>':
             st==="await"?'The close has rung. The result posts when the sheet updates.':
             'Trades in before the report. The market is shut; the close '+(cl?(g.est?"~":"")+day(cl)+" "+tm(cl):"")+' grades all four.'+(cl?' <b data-lvcd="'+(+cl)+'">In '+dur(cl-now())+'</b>':'');
    return '<div class="lv-c"><div class="lv-hd">'+pill+'<span>Round '+p.n+'</span><span class="r">'+hdr+'</span></div>'+
      '<div class="lv-bd">'+col(Lg,"LONG","L")+'<div class="lv-mid">'+coIcon(p.ticker)+'<b class="nm">'+esc(p.co)+'</b><span class="tk">'+esc(p.ticker)+hl(p.ticker)+'</span><span class="sc">'+Lg.length+'<i>v</i>'+Sh.length+'</span></div>'+col(Sh,"SHORT","S")+'</div>'+
      '<div class="lv-ft">'+foot+'</div></div>'}).join("");
  return '<section class="pn lv"><div class="tabs"><button class="on">'+(anyLive?'<span class="lvd"></span>LIVE NOW':'IN PLAY')+'<span class="n">'+L.length+'</span></button></div>'+cards+'</section>'}
function lastDay(){var G=ROUNDS.filter(function(r){return r.resolves&&typeof r.a==="number"});if(!G.length)return "";
  var last=G.reduce(function(m,r){var d=pd(r.resolves);return d&&d>m?d:m},new Date(0)),R=G.filter(function(r){var d=pd(r.resolves);return d&&+d===+last}).sort(function(a,b){return (CAPS[b.ticker]||0)-(CAPS[a.ticker]||0)||b.n-a.n});
  var rows=R.map(function(r,ri){var W=String(r.win||"").toUpperCase().split(/\s*&\s*/).filter(function(m){return MK.indexOf(m)>-1}),calls={},mag={};
    r.calls.forEach(function(c){calls[c[0]]=c[1].indexOf("DOWN")===0?-1:1;mag[c[0]]=parseFloat(String(c[1]).replace(/[^0-9.]/g,""))});
    var lu=MK.filter(function(m){return calls[m]}).map(function(m){var ok=calls[m]*r.a>0,w=W.indexOf(m)>-1;return '<span class="lv-lu'+(ok?"":" no")+(w?" w":"")+'">'+aiIcon(m,20)+'</span>'}).join("");
    var ws=W.length&&W.every(function(m){return calls[m]===calls[W[0]]})?' · '+(calls[W[0]]>0?"Long ":"Short ")+mag[W[0]]+'%':'';
    var who=W.length?W.map(function(m){return APP[m]}).join(" & ")+" won the round"+ws:"Nobody won the round",open=LVOPEN[r.n]==null?ri===0:!!LVOPEN[r.n];
    var ord=MK.filter(function(m){return calls[m]}).sort(function(x,y){var ox=calls[x]*r.a>0,oy=calls[y]*r.a>0;if(ox!==oy)return ox?-1:1;return Math.abs(mag[x]*calls[x]-r.a)-Math.abs(mag[y]*calls[y]-r.a)});
    var det=ord.map(function(m,i){var s=calls[m],pl=1000*s*r.a,w=W.indexOf(m)>-1;
      return '<div class="lv-xr'+(w?" w":"")+'"><span class="rk">'+(i+1)+'</span><span class="lv-ic">'+(w?CRN:'')+aiIcon(m,22)+'</span><span class="nm">'+APP[m]+'</span><span class="sd">'+(s>0?"Long":"Short")+' ('+mag[m]+'%)</span><b class="'+(pl<0?"d":"u")+'">'+money(pl,1)+'</b></div>'}).join("");
    det='<div class="lv-xr lv-xh"><span></span><span></span><span></span><span></span><span class="ph">P&amp;L</span></div>'+det;
    return '<div class="lv-it'+(open?" on":"")+'"><button type="button" class="lv-rr" data-lvx="'+r.n+'" aria-expanded="'+open+'">'+coIcon(r.ticker)+'<span class="lv-who"><span class="lv-l1"><b>'+esc(r.co)+' <i>'+esc(r.ticker)+'</i></b><span class="lv-mk"><small>Market closed</small><span class="mv '+(r.a<0?"d":"u")+'">'+pct(r.a)+'</span></span></span></span><span class="cv" aria-hidden="true"></span></button>'+
      '<div class="lv-x"'+(open?'':' hidden')+'>'+det+'</div></div>'}).join("");
  return '<section class="pn lv"><div class="tabs"><button class="on">LAST MATCHDAY<span class="n">'+R.length+'</span></button><span class="lv-dt">'+day(last)+'</span></div><div class="lv-ls">'+rows+'</div></section>'}
var CRN='<svg class="lv-cr" viewBox="0 0 24 16" aria-hidden="true"><path d="M2 14 L1 3 L7 8 L12 1 L17 8 L23 3 L22 14 Z" fill="#fdbc2a" stroke="#7a5a10" stroke-width="1.2" stroke-linejoin="round"/></svg>';var LVOPEN={};document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-lvx]");if(!b)return;var n=b.getAttribute("data-lvx"),it=b.parentNode,x=it.querySelector(".lv-x");LVOPEN[n]=!it.classList.contains("on");setTimeout(function(){var bb=document.querySelector('[data-lvx="'+n+'"]');if(!bb)return;var ii=bb.parentNode,xx=ii.querySelector(".lv-x");ii.classList.toggle("on",!!LVOPEN[n]);bb.setAttribute("aria-expanded",!!LVOPEN[n]);if(xx)xx.hidden=!LVOPEN[n]},0)});
/* (owner, 2026-11-09: "it should be 3 p.m... add the date... is it today or tomorrow") the drop is the end of the window, 1 hour before an estimated report, floored to the half hour so it never promises later than it is; then the day */
window.__lvDrop=function(b){var t=new Date(Math.floor(+b/18e5)*18e5),h=t.getMinutes()?t.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}):t.toLocaleTimeString([],{hour:"numeric"});
  var n=new Date(),d0=new Date(n.getFullYear(),n.getMonth(),n.getDate()),d1=new Date(t.getFullYear(),t.getMonth(),t.getDate()),k=Math.round((d1-d0)/864e5),
  dd=k===0?"today":k===1?"tomorrow":t.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"});
  return '<small>Trades drop by</small><b class="ut-t">'+h+'</b><i class="ut-d">'+dd+'</i>'};
window.__lvLive=liveCards;window.__lvLast=lastDay;
if(AT==="up"){var U0=upcoming;inPlay=function(){return liveCards()};upcoming=function(){return U0()+lastDay()};}
else{var Lo=leaders;leaders=function(){return liveCards()+lastDay()+Lo()};inPlay=function(){return ""};}
draw();
setInterval(function(){document.querySelectorAll("[data-lvcd]").forEach(function(b){var t=+b.getAttribute("data-lvcd");b.textContent=(b.textContent.indexOf("Resolves")===0?"Resolves in ":"In ")+dur(t-now())})},30000);
})();
