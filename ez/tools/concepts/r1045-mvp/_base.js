/* Round 45 MVP backs (owner, 2026-10-28: "the recap... more aligned with the ticket format, the certificate format").
   Shared: reads the story the page itself wrote on a highlight's back (x2plus.js hlSlabs: headline, deck, punch line, the P&L card,
   the strip, the rarity, the hidden calls) and the front label (company, grade), so no number is typed here; mounts an option as a
   layer over the back panel exactly where the record's certificate sits (.fin, inset 0), hides the recap under it, and fits it
   the way eqH does (steps the type down until nothing overflows). */
(function(){var d=document;
var pap=(function(){var x=d.querySelector('#record .xc');if(x){var m=getComputedStyle(x).backgroundImage.match(/url\("[^"]*"\)/);if(m)return m[0]}return 'none'})();
d.documentElement.style.setProperty('--b45pap',pap);
var E=function(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var T=function(e){return e?e.textContent.trim():''};
var pm=function(s){return String(s).replace(/▲/g,'+').replace(/▼/g,'−')};
var MK={};[].forEach.call(d.querySelectorAll('#record .xc-mk[data-m]'),function(e){if(!MK[e.dataset.m])MK[e.dataset.m]=e.innerHTML});
function mark(n){var k=String(n).toUpperCase();return MK[k]?'<span class="b45-mk" data-m="'+k+'">'+MK[k]+'</span>':'<span class="b45-mk b45-mkx">'+E(n.charAt(0))+'</span>'}
function data(w,card){var hb=card.querySelector('.x2p-hb'),fr=card.querySelector('.face.front'),q=function(s){return hb.querySelector(s)};
  var rch=T(q('.x2p-rch small')),m=rch.match(/Round (\d+)(?: · (.*))?/)||[],ct=T(q('.pn-ct span')).split(' · '),rar=q('.x2p-rar');
  var tag=T(w.querySelector('.x2p-htag')),kind=/bull/i.test(tag)?'bull':/tight/i.test(tag)?'tight':'big';
  var calls=[].map.call(hb.querySelectorAll('.x2p-hc'),function(c){var b=c.querySelector('b span');return {m:c.firstChild.textContent.trim(),v:pm(T(b)),up:/▲/.test(T(b)),ok:c.classList.contains('ok')}});
  var strip=[].map.call(hb.querySelectorAll('.pn-strip>span'),function(s){return {m:s.firstChild.textContent.trim(),v:T(s.querySelector('b')),ok:s.classList.contains('ok')}});
  var big=T(q('.pn-big')),star=/Its/.test(T(q('.pn-ct em')))?ct[0]:null;
  var acct=calls.map(function(c){var s=strip.filter(function(x){return x.m===c.m})[0];return {m:c.m,v:c.v,up:c.up,ok:c.ok,pl:s?s.v:(c.m===star?big:''),star:c.m===star}});
  return {kind:kind,tag:tag,n:m[1],date:m[2]||'',co:T(fr.querySelector('b')),tkr:T(fr.querySelector('.tkn')).replace(/[()]/g,''),ds:T(fr.querySelector('.ds')),gr:T(fr.querySelector('.gr')),
    h:q('h4').innerHTML,dk:T(q('.x2p-dk')),pun:T(q('.pn-pun')),who:ct[0],pos:ct[1]||'',lab:T(q('.pn-ct em')),big:big,pos0:/^\+/.test(big),cs:T(q('.pn-cs')),strip:strip,star:star,
    sim:'Simulated · $100K each · no leverage',rar:rar?T(rar.querySelector('span')):'',rarL:rar?rar.getAttribute('title'):'',calls:calls,acct:acct,
    film:card.querySelector('.art.still')?'picture':'film'}}
function mount(card,id,html){var fin=card.querySelector('.face.back .fin');fin.querySelectorAll('.b45').forEach(function(e){e.remove()});
  var hb=fin.querySelector('.x2p-hb');hb.style.visibility='hidden';var el=d.createElement('div');el.className='b45 b45-'+id+(B45.CLS[id]?' '+B45.CLS[id]:'');
  el.style.setProperty('--u',(fin.getBoundingClientRect().width/202)+'px');el.innerHTML=html;fin.appendChild(el);return el}
function over(el){var R=el.getBoundingClientRect(),o=[];if(el.scrollHeight>el.clientHeight+.5)o.push('scroll '+(el.scrollHeight-el.clientHeight));
  el.querySelectorAll('*').forEach(function(e){if(e.closest('.b45-free'))return;var r=e.getBoundingClientRect();if(!r.width||!r.height)return;
    if(r.right>R.right+.5||r.bottom>R.bottom+.5||r.left<R.left-.5||r.top<R.top-.5)o.push((e.className.baseVal!==undefined?e.className.baseVal:e.className||e.tagName)+' '+Math.round(r.right-R.right)+'/'+Math.round(r.bottom-R.bottom))});
  /* text that runs past its own box (a word wider than its line) */
  el.querySelectorAll('.b45-fit').forEach(function(e){if(e.scrollWidth>e.clientWidth+1)o.push('wide '+e.className)});return o}
/* down until it fits (as eqH does); where the card has room (a tall 320px card) up to 1.24, keeping a little air at the foot */
function fit(el){var k=1;el.style.setProperty('--k',k);var o=over(el);while(o.length&&k>.66){k=Math.round((k-.03)*100)/100;el.style.setProperty('--k',k);o=over(el)}
  if(!o.length){var sp=function(){return [].reduce.call(el.querySelectorAll(':scope>.b45-sp'),function(a,e){return a+e.getBoundingClientRect().height},0)};
    while(k<1.24){var k2=Math.round((k+.03)*100)/100;el.style.setProperty('--k',k2);if(over(el).length||sp()<el.clientHeight*.06){el.style.setProperty('--k',k);break}k=k2}o=over(el)}
  return {k:k,over:o.slice(0,5)}}
window.B45={CLS:{a2:'b45-a',f:'b45-a'},E:E,data:data,mount:mount,fit:fit,over:over,mark:mark,R:{}};
})();
/* a round rubber stamp: a double rim, words round it, a star and the odds in the middle; struck in PASS's worn ink */
B45.seal=function(top,mid,uid,col,w){col=col||'#a8231a';var id='b45s'+uid;
  return '<svg class="b45-seal b45-stp b45-w'+(w||0)+'" viewBox="0 0 100 100" aria-hidden="true"><defs><path id="'+id+'" d="M50 50m-32 0a32 32 0 1 1 64 0a32 32 0 1 1 -64 0"/></defs>'+
  '<g transform="rotate(-9 50 50)" fill="none" stroke="'+col+'"><circle cx="50" cy="50" r="47" stroke-width="3.2"/><circle cx="50" cy="50" r="42.5" stroke-width="1.3"/><circle cx="50" cy="50" r="29" stroke-width="1.6"/></g>'+
  '<g transform="rotate(-9 50 50)" fill="'+col+'"><text font-family="Archivo,sans-serif" font-style="italic" font-weight="900" font-stretch="62%" font-size="11" letter-spacing="1.6" text-rendering="geometricPrecision"><textPath href="#'+id+'" startOffset="0">'+top+'</textPath></text>'+
  '<text x="50" y="44" text-anchor="middle" font-size="11" font-family="Anton,Impact,sans-serif">★</text><text x="50" y="62" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="17" letter-spacing=".4" text-rendering="geometricPrecision">'+mid.toUpperCase()+'</text></g></svg>'};
B45.logo='<svg class="b45-logo" viewBox="0 0 400 400" aria-hidden="true"><circle cx="198.7" cy="199.4" r="198.2" fill="#04070e"/><path fill="#f8f0d9" d="M116.8,88.0 L86.2,152.0 L102.1,152.0 L55.0,274.5 L154.2,274.5 L188.5,225.8 L128.7,225.8 L137.5,204.0 L170.2,203.5 L193.2,162.0 L149.1,162.0 L154.8,145.0 L143.4,138.5 L217.9,138.2 L192.2,182.0 L234.9,182.0 L181.5,250.8 L136.0,315.8 L272.5,315.8 L292.5,265.0 L230.4,265.0 L328.2,130.8 L225.1,130.8 L253.0,87.8 Z"/><path fill="#03c870" d="M146.2,287.0 L133.0,287.0 L106.5,327.2 L119.0,326.5 Z M86.8,169.5 L74.8,169.5 L29.5,282.2 L43.7,282.2 Z M105.8,92.5 L89.5,95.8 L55.5,169.2 L69.0,169.2 Z"/><path fill="#ff3a31" d="M304.5,259.0 L300.5,269.5 L313.0,268.2 L317.0,258.8 Z M361.5,126.0 L344.0,126.5 L269.5,235.8 L256.0,257.5 L276.2,257.0 Z M279.0,87.8 L266.7,87.5 L251.5,117.2 L262.2,119.0 Z"/><path fill="#fdbc2a" d="M334.2,281.2 L302.0,281.2 L288.2,315.8 L321.0,315.5 Z"/></svg>';
B45.no=function(n){return ('0000'+n).slice(-4)};
