/* Round 40 (owner, 2026-10-25): the record cards' stats side redesigned. Owner's picks: the result line on the label becomes the big
   headline ("2 of 4 right", the miss smaller); the back reads as a stamp of approval; the grade stays on the label only; 3 options keep
   today's content (S1-S3), 5 are carte blanche (C1-C5). Laid over the real back of the round named in R40N (Bloom Energy, 43). */
var d=document;
var P=(function(){var r=d.querySelector('#standings li.lbr');if(!r)return'none';var m=getComputedStyle(r).backgroundImage.match(/url\("[^"]*"\)/);return m?m[0]:'none'})();
d.documentElement.style.setProperty('--r40pap',P);
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function rnd(n){for(var i=0;i<ROUNDS.length;i++)if(ROUNDS[i].n===n)return ROUNDS[i];return null}
function md(s){var m=String(s||'').match(/^(\d+)\/(\d+)/);return m?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m[1]-1]+' '+(+m[2]):''}
function nm(m){return m==='GPT'?'GPT':m.charAt(0)+m.slice(1).toLowerCase()}
var SN=0;
/* a rubber stamp drawn once as plain SVG: hard double border with a milled rim (seal rules), the office round the rim, worn ink */
function stamp(o){var id='r40s'+(++SN),C=o.c||'#2b3f9e',top=o.top||'$EZ GRADING OFFICE',bot=o.bot||'SEASON 1 · EARNINGSZN';
  var teeth='';for(var i=0;i<72;i++){var a=i/72*Math.PI*2;teeth+='M'+(50+46*Math.cos(a)).toFixed(2)+','+(50+46*Math.sin(a)).toFixed(2)+'L'+(50+49*Math.cos(a)).toFixed(2)+','+(50+49*Math.sin(a)).toFixed(2)}
  return '<svg class="r40stamp '+(o.cls||'')+'" viewBox="0 0 100 100" aria-hidden="true" style="--rot:'+(o.rot||-9)+'deg">'+
  '<defs><path id="'+id+'t" d="M 15,50 A 35,35 0 0 1 85,50"/><path id="'+id+'b" d="M 13,50 A 37,37 0 0 0 87,50"/>'+
  '<filter id="'+id+'w" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="'+(o.wf||1.2)+'" numOctaves="2" seed="'+(o.seed||4)+'" result="n"/>'+
  '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 1.95" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter></defs>'+
  '<g filter="url(#'+id+'w)" fill="'+C+'" stroke="'+C+'"><path d="'+teeth+'" stroke-width="1.4" fill="none"/>'+
  '<circle cx="50" cy="50" r="45.5" fill="none" stroke-width="1.6"/><circle cx="50" cy="50" r="39.5" fill="none" stroke-width="1"/>'+
  '<text font-family="Archivo, sans-serif" font-weight="900" font-size="7.6" letter-spacing="1" stroke="none"><textPath href="#'+id+'t" startOffset="50%" text-anchor="middle">'+esc(top)+'</textPath></text>'+
  '<text font-family="Archivo, sans-serif" font-weight="900" font-size="6.6" letter-spacing=".8" stroke="none"><textPath href="#'+id+'b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">'+esc(bot)+'</textPath></text>'+
  '<text x="50" y="'+(o.date?'54':'58')+'" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="'+(o.ms||15)+'" letter-spacing=".8" stroke="none">'+esc(o.mid||'APPROVED')+'</text>'+
  (o.date?'<text x="50" y="67" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="800" font-size="7.2" letter-spacing=".6" stroke="none">'+esc(o.date)+'</text>':'')+'</g></svg>'}
/* a guilloche rosette border as one path (hypotrochoid), computed once */
function guil(w,h,c,op){var p='',R=6,r=2.2,dd=3.4;for(var i=0;i<=900;i++){var t=i/900*Math.PI*2*11,x=(R-r)*Math.cos(t)+dd*Math.cos((R-r)/r*t),y=(R-r)*Math.sin(t)-dd*Math.sin((R-r)/r*t);p+=(i?'L':'M')+(x*1.6+10).toFixed(1)+','+(y*1.6+10).toFixed(1)}
  return '<svg class="r40g" viewBox="0 0 20 20" preserveAspectRatio="none" aria-hidden="true" style="opacity:'+(op||.35)+'"><path d="'+p+'" fill="none" stroke="'+(c||'#1f6b3f')+'" stroke-width=".12"/></svg>'}
function data(n){var c=d.querySelector('#record .card[data-n="'+n+'"]'),r=rnd(n),b=c.querySelector('.face.back');
  var rows=r.calls.map(function(x){var up=x[1].indexOf('DOWN')<0,mg=parseFloat(x[1].replace(/^(UP|DOWN)\s*/,''));return {raw:x[0],n:nm(x[0]),up:up,mg:mg,call:(up?'▲':'▼')+(Math.round(mg*100)/100)+'%',ok:up===(r.a>0),off:+x[2],win:r.win===x[0]}});
  var ok=rows.filter(function(x){return x.ok}).sort(function(a,b){return a.off-b.off});rows.forEach(function(x){x.rk=x.ok?ok.indexOf(x)+1:0});
  rows.sort(function(a,b){return (a.rk||9)-(b.rk||9)});
  var svgs={};[].forEach.call(b.querySelectorAll('.bk-r'),function(x){var nn=(x.querySelector('.who .n')||{}).textContent,s=x.querySelector('.lg svg');if(nn&&s)svgs[nn]=s.outerHTML});rows.forEach(function(x){x.svg=svgs[x.n]||''});
  var hit=ok.length,av=hit?ok.reduce(function(a,x){return a+x.off},0)/hit:0;
  return {card:c,face:b,n:n,co:r.co,tk:r.ticker,a:r.a,called:md(r.called),graded:md(r.resolves),rows:rows,hit:hit,nc:rows.length,av:av,film:!c.classList.contains('nofilm'),
    move:(r.a<0?'▼':'▲')+Math.abs(r.a).toFixed(2)+'%',dn:r.a<0}}
/* the label, as the owner picked: the result as the headline, the miss after it, smaller (on the back's label only) */
function label(D){var w=D.face.querySelector('.zwhy');if(!w)return;w.innerHTML='<b>'+D.hit+' of '+D.nc+' right</b>'+(D.hit?' <small>· '+D.av.toFixed(2)+'% off on avg</small>':'');w.classList.add('r40why')}
function over(face,html,cls){var fin=face.querySelector('.fin');var fr=fin.getBoundingClientRect(),br=face.getBoundingClientRect();var el=d.createElement('div');el.className='r40p '+cls;
  el.style.cssText='position:absolute;z-index:40;left:'+(fr.left-br.left)+'px;top:'+(fr.top-br.top)+'px;width:'+fr.width+'px;height:'+fr.height+'px';el.innerHTML=html;face.appendChild(el);fin.style.visibility='hidden';fin.style.opacity='0';return el}
window.R40={stamp:stamp,guil:guil,data:data,label:label,over:over,esc:esc,N:window.R40N||43};
