(function(){if(window.__S!==2)return;document.documentElement.classList.add("s2d");
/* Season 2 design (owner, 2026-11-26: "Frosted logo lettering... take D"; the Feed "mainly focus on the name of the models... the model,
   plus the logo... its position... next to the model name. And then the quote underneath... at the bottom, the confidence and the outcome") */
NAV.splice(1,0,["feed","FEED",'<path d="M5 5h14M5 10h14M5 15h9M5 20h6"/>']);
var NM={GPT:"ChatGPT",CLAUDE:"Claude",GROK:"Grok",GEMINI:"Gemini",QWEN:"Qwen"},MV={};
(window.S2_SHEET||[]).forEach(function(r){var m=parseFloat(r[r.length-2]);MV[+r[0]]={mv:isNaN(m)?null:m,gd:r[r.length-3]}});
function x(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function dd(s){var p=(s||"").split("/");if(p.length<3)return "";var d=new Date(Date.UTC(2000+(+p[2]%100),+p[0]-1,+p[1],12));return d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",timeZone:"UTC"})}
function mark(t){var i=t.search(/[.;](\s|$)/);return i>12&&i<t.length-2?"<mark>"+x(t.slice(0,i+1))+"</mark>"+x(t.slice(i+1)):"<mark>"+x(t)+"</mark>"}
function money(v){return (v<0?"\u2212":"+")+"$"+Math.abs(v).toLocaleString("en-US")}
function post(p){var M=MV[p.r]||{},L=p.sd==="LONG",nm=NM[p.m]||p.m,co=(window.S2_NAME&&S2_NAME[p.t])||p.t,f="";
  /* the owner, 2026-11-26: "data simplicity... add less than more": no model version, no dates, no "before the report" (said once in How it works) */
  /* the owner, 2026-11-26: the close in green or red by the day's move, the P&L in its own colour, no Right/Wrong, a slim line */
  if(M.mv!=null){var sg=L?1:-1,pl=Math.round(sg*M.mv*1000);f='<footer class="fp-r"><span class="mv '+(M.mv<0?"dn":"up")+'">Closed '+(M.mv<0?"\u2212":"+")+Math.abs(M.mv).toFixed(2)+'%</span><b class="'+(pl<0?"dn":"up")+'">P&amp;L '+money(pl)+'</b></footer>'}
  /* the owner, 2026-11-26: the logo and the name on one line with the AI's place on the board now (how much to trust it), the company and the side on the right, the confidence after the words */
  var R=rank("ALL").indexOf(p.m)+1,rk=R?'<span class="fp-rk'+(R===1?' g':'')+'" title="Season 2 leaderboard, by P&amp;L">#'+R+'</span>':"";
  return '<article class="fp"><header class="fp-h">'+(MODELS[p.m]?aiIcon(p.m,32):"")+'<b class="fp-n">'+nm+'</b>'+rk+'<div class="fp-p"><span class="fp-co" title="'+x(co)+'">'+coIcon(p.t)+'<span class="fp-cn">'+x(co)+'</span></span><span class="fp-sd '+(L?"L":"S")+'">'+p.sd+' ('+(L?"+":"\u2212")+x(p.sz)+'%)</span></div></header><p class="fp-t">'+mark(p.q)+' <small class="fp-cf">'+x(p.cf)+'% confident</small></p>'+f+'</article>'}
st.fs=st.fs||"new";st.fn=st.fn||15;
function feed(){var A=(window.S2_FEED||[]),RK=rank("ALL");if(!st.fm)st.fm=RK[0];/* the owner, 2026-11-26: land on the leader's own posts; the others one tap away */
  var F=A.filter(function(p){return st.fm==="all"||p.m===st.fm}),o=MK.slice();
  var chips='<div class="fd-m"><button data-fm="all" class="'+(st.fm==="all"?"on":"")+'">All</button>'+RK.filter(function(m){return A.some(function(p){return p.m===m})}).map(function(m,i){return '<button data-fm="'+m+'" class="'+(st.fm===m?"on":"")+'">'+aiIcon(m,20)+'<span>'+x(NM[m]||m)+'</span><i>#'+(RK.indexOf(m)+1)+'</i></button>'}).join("")+'</div>';F.sort(st.fs==="conf"?function(a,b){return b.cf-a.cf||b.r-a.r}:function(a,b){return b.r-a.r||o.indexOf(a.m)-o.indexOf(b.m)});
  if(!F.length)return '<section class="pn fd"><div class="empty">The first posts appear when the AIs file their next trades.</div></section>';
  return '<section class="pn fd"><div class="tabs"><button class="on">FEED<span class="n">'+A.length+'</span></button></div>'+chips+'<div class="sub"><button data-fs="new" class="'+(st.fs==="new"?"on":"")+'">Latest</button><button data-fs="conf" class="'+(st.fs==="conf"?"on":"")+'">Most confident</button></div><div class="fd-l">'+F.slice(0,st.fn).map(post).join("")+'</div>'+(F.length>st.fn?'<button class="more" data-fmore="1">Show more</button>':"")+'</section>'}
document.addEventListener("click",function(e){var b=e.target.closest("[data-fs],[data-fmore],[data-fm]");if(!b)return;if(b.dataset.fm){st.fm=b.dataset.fm;st.fn=15}if(b.dataset.fs){st.fs=b.dataset.fs;st.fn=15}if(b.dataset.fmore)st.fn+=15},true);
/* copy on Season 2: "Season", never "All time"; no "paper"; sentence case for the page's own capitals; one type scale, nothing under 12 px */
var KEEP={"p&l":"P&L","ai":"AI","ais":"AIs","w-l":"W-L","w/l":"W/L","24h":"24H","7d":"7D","30d":"30D"};
function sc(t){var s=t.toLowerCase().replace(/[a-z0-9&\/-]+/g,function(w){return KEEP[w]||w});return s.replace(/^(\s*)([a-z])/,function(m,a,b){return a+b.toUpperCase()})}
function fix(){var w=document.createTreeWalker(document.getElementById("main"),NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){var o=n.nodeValue,t=o.replace(/ALL TIME P&L/g,"SEASON P&L").replace(/ALL TIME/g,"SEASON").replace(/Paper P&L:\s*/g,"P&L: ").replace(/\$100K of paper money on each pick/g,"$100K on each trade").replace(/\s*\bpaper\b\s*/gi," ");if(t!==o)n.nodeValue=t}
  document.querySelectorAll("#main .tabs button,#main .kick small,#main .ud,#main .st th:first-child,#main .th,#main .sb b").forEach(function(el){el.childNodes.forEach(function(c){if(c.nodeType===3&&/[A-Z]{3}/.test(c.nodeValue)&&c.nodeValue===c.nodeValue.toUpperCase()&&!el.closest(".tabs"))c.nodeValue=sc(c.nodeValue)})});
  var S=[12,14,16,20,28];document.querySelectorAll(".app *,.nav *").forEach(function(el){var own=false;for(var i=0;i<el.childNodes.length;i++){var c=el.childNodes[i];if(c.nodeType===3&&c.nodeValue.trim()){own=true;break}}if(!own)return;el.style.removeProperty("font-size");var f=parseFloat(getComputedStyle(el).fontSize),g=S.reduce(function(a,b){return Math.abs(b-f)<Math.abs(a-f)?b:a},12);if(f<12)g=12;if(g!==f)el.style.setProperty("font-size",g+"px","important")})}
var D0=draw;draw=function(){D0();if(st.v==="feed"){document.getElementById("main").innerHTML=ssw()+feed()}fix()};
window.__s2feed=feed})();
