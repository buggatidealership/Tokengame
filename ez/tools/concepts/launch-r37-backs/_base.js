/* Round 37 (owner, 2026-10-24): the backs of the record cards ("See the stats") and of the MVP cards (the story), redrawn as
   printed paper in the brand's inks. Each option is laid over the real back panel (.fin) of a real card, its data read from the page
   (ROUNDS and the back's own rows), so every number is the sheet's. Shared: data readers, the rubber stamp, the paper. */
var d=document;
var P=(function(){var r=d.querySelector('#standings li.lbr');if(!r)return'none';var m=getComputedStyle(r).backgroundImage.match(/url\("[^"]*"\)/);return m?m[0]:'none'})();
d.documentElement.style.setProperty('--r37pap',P);
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function rnd(n){for(var i=0;i<ROUNDS.length;i++)if(ROUNDS[i].n===n)return ROUNDS[i];return null}
function md(s){if(!s)return'';var m=String(s).match(/^(\d+)\/(\d+)/);if(!m)return s;return['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m[1]-1]+' '+(+m[2])}
/* a rubber stamp: double ring, its words round the rim, GRADED and the date across the middle, worn ink, multiplied into the paper */
var SN=0;
function stamp(o){var id='r37s'+(++SN),C=o.c||'#b3261c',top=o.top||'$EZ GRADING OFFICE',bot=o.bot||'SEASON 1';
  return '<svg class="r37stamp '+(o.cls||'')+'" viewBox="0 0 100 100" aria-hidden="true" style="--rot:'+(o.rot||-9)+'deg">'+
  '<defs><path id="'+id+'t" d="M 14,50 A 36,36 0 0 1 86,50"/><path id="'+id+'b" d="M 12,50 A 38,38 0 0 0 88,50"/>'+
  '<filter id="'+id+'w" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="'+(o.wf||1.1)+'" numOctaves="2" seed="'+(o.seed||4)+'" result="n"/>'+
  '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.6 2.05" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in" result="c"/>'+
  '<feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="1" seed="'+((o.seed||4)+3)+'" result="v"/><feColorMatrix in="v" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .9 .45" result="vm"/><feComposite in="c" in2="vm" operator="in"/></filter></defs>'+
  '<g filter="url(#'+id+'w)" fill="'+C+'" stroke="'+C+'">'+
  '<circle cx="50" cy="50" r="46" fill="none" stroke-width="3.2"/><circle cx="50" cy="50" r="40.5" fill="none" stroke-width="1"/>'+
  '<text font-family="Archivo, sans-serif" font-weight="900" font-size="8.2" letter-spacing="1.1" stroke="none"><textPath href="#'+id+'t" startOffset="50%" text-anchor="middle">'+esc(top)+'</textPath></text>'+
  '<text font-family="Archivo, sans-serif" font-weight="900" font-size="8.2" letter-spacing="1.1" stroke="none"><textPath href="#'+id+'b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">'+esc(bot)+'</textPath></text>'+
  '<rect x="13" y="38" width="74" height="24" fill="none" stroke-width="1.6"/>'+
  '<text x="50" y="56.5" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="16" letter-spacing=".8" stroke="none">'+esc(o.mid||'GRADED')+'</text>'+
  '<text x="50" y="73" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="800" font-size="7.6" letter-spacing=".6" stroke="none">'+esc(o.date||'')+'</text>'+
  '<text x="50" y="33" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="800" font-size="7" stroke="none">★ ★ ★</text></g></svg>'}
/* the record card on show (the newest graded round, centred on arrival), turned to its stats */
function recData(){var c=d.querySelector('#car .card.cur')||d.querySelector('#record .card');var n=+c.dataset.n,r=rnd(n),b=c.querySelector('.face.back');
  var rows=[].map.call(b.querySelectorAll('.bk-r'),function(x){var lg=x.querySelector('.lg svg');return{rk:(x.querySelector('.rk')||{}).textContent.replace('Rank','').trim(),
    n:(x.querySelector('.who .n')||{}).textContent,call:(x.querySelector('.pd')||{}).textContent.replace(/Up |Down /,'').trim(),up:!!x.querySelector('.pd.u'),
    st:x.classList.contains('win')?'win':x.classList.contains('ok')?'ok':x.classList.contains('no')?'no':'',svg:lg?lg.outerHTML:''}});
  var ds=[].map.call(b.querySelectorAll('.bk-d b'),function(x){return x.textContent});
  return{card:c,face:b,n:n,co:r.co,tk:r.ticker,a:r.a,called:ds[0]||md(r.called),graded:ds[1]||md(r.resolves),rows:rows}}
/* the TSMC story card in the MVPs, turned to its story */
function hlData(){var w=[].filter.call(d.querySelectorAll('#x2pHl .x2p-hi'),function(x){return /tight/i.test(x.textContent)})[0],c=w.querySelector('.card'),b=c.querySelector('.face.back');
  var n=+c.dataset.n,r=rnd(n),p=b.querySelector('.x2p-hw'),em=p.querySelector('em');var body=p.textContent.replace(em?em.textContent:'','').trim();
  var calls=[].map.call(b.querySelectorAll('.x2p-hc'),function(x){var v=x.querySelector('b').textContent;return{n:x.firstChild.textContent,v:v.replace(/[✓✗]/g,'').trim(),ok:x.classList.contains('ok')}});
  var hos=b.querySelectorAll('.x2p-ho');
  return{wrap:w,card:c,face:b,n:n,co:r.co,tk:r.ticker,a:r.a,called:md(r.called),graded:md(r.resolves),head:b.querySelector('h4').innerHTML,body:body,grade:em?em.textContent:'',
    calls:calls,moved:hos[0].querySelector('b').textContent,mvdn:hos[0].querySelector('b').classList.contains('d'),winner:hos[1].querySelector('b').textContent}}
/* lay a panel over a back's .fin, at its exact box */
function over(face,html,cls){var fin=face.querySelector('.fin');var fr=fin.getBoundingClientRect(),br=face.getBoundingClientRect();var el=d.createElement('div');el.className='r37p '+cls;
  el.style.cssText='position:absolute;z-index:40;left:'+(fr.left-br.left)+'px;top:'+(fr.top-br.top)+'px;width:'+fr.width+'px;height:'+fr.height+'px';el.innerHTML=html;face.appendChild(el);fin.style.visibility='hidden';return el}
window.R37={stamp:stamp,recData:recData,hlData:hlData,over:over,esc:esc,md:md};
