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
  if(M.mv!=null){var s=L?1:-1,ok=s*M.mv>0,pl=Math.round(s*M.mv*1000);f='<footer class="fp-r '+(ok?"ok":"no")+'"><span class="mv">Closed '+(M.mv<0?"\u2212":"+")+Math.abs(M.mv).toFixed(2)+'%</span><b>'+(ok?"Right":"Wrong")+'</b><b>P&amp;L '+money(pl)+'</b></footer>'}
  return '<article class="fp"><header class="fp-h">'+(MODELS[p.m]?aiIcon(p.m,40):"")+'<div class="fp-w"><b>'+nm+'</b><span class="fp-co">'+coIcon(p.t)+x(co)+'</span></div><div class="fp-p"><span class="fp-sd '+(L?"L":"S")+'">'+p.sd+' ('+(L?"+":"\u2212")+x(p.sz)+'%)</span><small>'+x(p.cf)+'% confident</small></div></header><p class="fp-t">'+mark(p.q)+'</p>'+f+'</article>'}
st.fs=st.fs||"new";st.fn=st.fn||15;
function feed(){var F=(window.S2_FEED||[]).slice(),o=MK.slice();F.sort(st.fs==="conf"?function(a,b){return b.cf-a.cf||b.r-a.r}:function(a,b){return b.r-a.r||o.indexOf(a.m)-o.indexOf(b.m)});
  if(!F.length)return '<section class="pn fd"><div class="empty">The first posts appear when the AIs file their next trades.</div></section>';
  return '<section class="pn fd"><div class="tabs"><button class="on">FEED<span class="n">'+F.length+'</span></button></div><div class="sub"><button data-fs="new" class="'+(st.fs==="new"?"on":"")+'">Latest</button><button data-fs="conf" class="'+(st.fs==="conf"?"on":"")+'">Most confident</button></div><div class="fd-l">'+F.slice(0,st.fn).map(post).join("")+'</div>'+(F.length>st.fn?'<button class="more" data-fmore="1">Show more</button>':"")+'</section>'}
document.addEventListener("click",function(e){var b=e.target.closest("[data-fs],[data-fmore]");if(!b)return;if(b.dataset.fs){st.fs=b.dataset.fs;st.fn=15}if(b.dataset.fmore)st.fn+=15},true);
/* copy on Season 2: "Season", never "All time"; no "paper"; sentence case for the page's own capitals; one type scale, nothing under 12 px */
var KEEP={"p&l":"P&L","ai":"AI","ais":"AIs","w-l":"W-L","w/l":"W/L","24h":"24H","7d":"7D","30d":"30D"};
function sc(t){var s=t.toLowerCase().replace(/[a-z0-9&\/-]+/g,function(w){return KEEP[w]||w});return s.replace(/^(\s*)([a-z])/,function(m,a,b){return a+b.toUpperCase()})}
function fix(){var w=document.createTreeWalker(document.getElementById("main"),NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){var o=n.nodeValue,t=o.replace(/ALL TIME P&L/g,"SEASON P&L").replace(/ALL TIME/g,"SEASON").replace(/Paper P&L:\s*/g,"P&L: ").replace(/\$100K of paper money on each pick/g,"$100K on each trade").replace(/\s*\bpaper\b\s*/gi," ");if(t!==o)n.nodeValue=t}
  document.querySelectorAll("#main .tabs button,#main .kick small,#main .ud,#main .st th:first-child,#main .th,#main .sb b").forEach(function(el){el.childNodes.forEach(function(c){if(c.nodeType===3&&/[A-Z]{3}/.test(c.nodeValue)&&c.nodeValue===c.nodeValue.toUpperCase()&&!el.closest(".tabs"))c.nodeValue=sc(c.nodeValue)})});
  var S=[12,14,16,20,28];document.querySelectorAll(".app *,.nav *").forEach(function(el){var own=false;for(var i=0;i<el.childNodes.length;i++){var c=el.childNodes[i];if(c.nodeType===3&&c.nodeValue.trim()){own=true;break}}if(!own)return;el.style.removeProperty("font-size");var f=parseFloat(getComputedStyle(el).fontSize),g=S.reduce(function(a,b){return Math.abs(b-f)<Math.abs(a-f)?b:a},12);if(f<12)g=12;if(g!==f)el.style.setProperty("font-size",g+"px","important")})}
var D0=draw;draw=function(){D0();if(st.v==="feed"){document.getElementById("main").innerHTML=ssw()+feed()}fix()};
window.__s2feed=feed})();
