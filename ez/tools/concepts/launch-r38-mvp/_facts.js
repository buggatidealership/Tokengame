/* Round 38 (owner, 2026-10-25): the MVP backs rewritten to make people go "wow": rarity, odds, the competition, a bit of sarcasm.
   Every number here is computed from ROUNDS (the sheet), the way the real build would, so nothing is typed by hand. */
var d=document;
var P=(function(){var r=d.querySelector('#standings li.lbr');if(!r)return'none';var m=getComputedStyle(r).backgroundImage.match(/url\("[^"]*"\)/);return m?m[0]:'none'})();
d.documentElement.style.setProperty('--r38pap',P);
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function md(s){var m=String(s||'').match(/^(\d+)\/(\d+)/);return m?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m[1]-1]+' '+(+m[2]):''}
function nm(m){return m==='GPT'?'GPT':m.charAt(0)+m.slice(1).toLowerCase()}
function two(v){return (Math.round(v*100)/100).toFixed(2)}
function num(v){return String(Math.round(v*100)/100)}
var F=(function(){
  var G=ROUNDS.filter(function(r){return typeof r.a==='number'&&!isNaN(r.a)});
  var C=[];G.forEach(function(r){r.calls.forEach(function(x){var up=x[1].indexOf('DOWN')<0,mg=parseFloat(x[1].replace(/^(UP|DOWN)\s*/,'')),cv=up?mg:-mg;C.push({r:r,m:x[0],up:up,mg:mg,cv:cv,ok:up===(r.a>0),off:Math.abs(cv-r.a)})})});
  var offs=C.map(function(c){return c.off}).sort(function(a,b){return a-b}),med=offs[Math.floor(offs.length/2)];
  var R=C.filter(function(c){return c.ok}),avgRight=R.reduce(function(s,c){return s+c.off},0)/R.length;
  var mean=G.reduce(function(s,r){return s+Math.abs(r.a)},0)/G.length;
  var B=C.filter(function(c){return c.ok&&Math.round(c.off*100)<=10}).sort(function(a,b){return Math.round(a.off*100)-Math.round(b.off*100)||b.r.n-a.r.n});
  var pw=C.filter(function(c){return !c.ok}).length/C.length,four=G.filter(function(r){return r.calls.length===4});
  var none4=four.filter(function(r){return C.filter(function(c){return c.r===r&&c.ok}).length===0}).length;
  var per=function(r){return C.filter(function(c){return c.r===r})};
  var avgOk=function(r){var k=per(r).filter(function(c){return c.ok});return k.reduce(function(s,c){return s+c.off},0)/k.length};
  var pristine=G.filter(function(r){var cs=per(r);return cs.every(function(c){return c.ok})&&avgOk(r)<1&&avgOk(r)<Math.abs(r.a)/2}).length;
  /* the three cards */
  var b=B[0],bullRivals=per(b.r).filter(function(c){return !c.ok}).map(function(c){return nm(c.m)});
  var bulls={};C.forEach(function(c){bulls[c.m]=bulls[c.m]||0});B.forEach(function(c){bulls[c.m]++});
  var zero=Object.keys(bulls).filter(function(k){return !bulls[k]}).map(nm);
  var other=per(b.r).filter(function(c){return c.ok&&c!==b})[0];
  var t=G.filter(function(r){return per(r).every(function(c){return c.ok})}).sort(function(x,y){return avgOk(x)-avgOk(y)})[0];
  var tc=per(t).slice().sort(function(x,y){return x.off-y.off});
  var big=G.slice().sort(function(x,y){return Math.abs(y.a)-Math.abs(x.a)})[0],bc=per(big).slice().sort(function(x,y){return y.off-x.off});
  var worst=C.slice().sort(function(x,y){return y.off-x.off}).slice(0,bc.length),allWorst=worst.every(function(c){return c.r===big});
  return {
    calls:C.length,rounds:G.length,med:two(med),avgRight:two(avgRight),
    bull:{r:b.r,n:b.r.n,co:b.r.co,tk:b.r.ticker,date:md(b.r.resolves),m:nm(b.m),call:(b.up?'+':'−')+num(b.mg)+'%',callAbs:num(b.mg),dir:b.up?'rise':'fall',
      act:(b.r.a>0?'+':'−')+two(Math.abs(b.r.a))+'%',actAbs:two(Math.abs(b.r.a)),moved:b.r.a>0?'rose':'fell',off:two(b.off),x:Math.floor(med/b.off/10)*10,
      count:B.length,odds:Math.round(C.length/B.length),rivals:bullRivals,zero:zero,other:other?{m:nm(other.m),off:two(other.off)}:null,
      calls:per(b.r).map(function(c){return {m:nm(c.m),v:(c.up?'▲':'▼')+num(c.mg)+'%',ok:c.ok,me:c===b}})},
    tight:{r:t,n:t.n,co:t.co,date:md(t.resolves),act:two(Math.abs(t.a)),moved:t.a>0?'rose':'fell',dir:t.a>0?'rise':'fall',avg:(avgOk(t)+1e-9).toFixed(2),max:two(tc[tc.length-1].off),
      win:nm(tc[0].m),winOff:two(tc[0].off),run:nm(tc[1].m),runOff:two(tc[1].off),margin:two(tc[1].off-tc[0].off),x:(avgRight/avgOk(t)).toFixed(1),
      pristine:pristine,odds:Math.round(G.length/pristine),
      calls:per(t).map(function(c){return {m:nm(c.m),v:(c.up?'▲':'▼')+num(c.mg)+'%',ok:c.ok,off:two(c.off)}})},
    big:{r:big,n:big.n,co:big.co,date:md(big.resolves),act:two(Math.abs(big.a)),up:big.a>0,moved:big.a>0?'jumped':'dropped',x:(Math.abs(big.a)/mean).toFixed(1),
      worst:allWorst,lo:two(bc[bc.length-1].off),hi:two(bc[0].off),hiM:nm(bc[0].m),k:bc.length,none4:none4,four:four.length,indep:Math.round(1/Math.pow(pw,4)),
      odds:G.length,calls:per(big).map(function(c){return {m:nm(c.m),v:(c.up?'▲':'▼')+num(c.mg)+'%',ok:c.ok,off:two(c.off)}})}}})();
window.R38F=F;
/* the rarity mark, bottom right, as on an old trading card: a star and the odds */
function rar(o,cls){return '<span class="r38rar '+(cls||'')+'" title="Rarity"><b>★</b>'+esc(o)+'</span>'}
function over(face,html,cls){var fin=face.querySelector('.fin');var fr=fin.getBoundingClientRect(),br=face.getBoundingClientRect();var el=d.createElement('div');el.className='r38p '+cls;
  el.style.cssText='position:absolute;z-index:40;left:'+(fr.left-br.left)+'px;top:'+(fr.top-br.top)+'px;width:'+fr.width+'px;height:'+fr.height+'px';el.innerHTML=html;face.appendChild(el);fin.style.visibility='hidden';fin.style.opacity='0';return el}
window.R38={F:F,esc:esc,rar:rar,over:over};
