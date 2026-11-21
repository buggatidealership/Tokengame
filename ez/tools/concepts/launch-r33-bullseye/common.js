/* Round 33 mockups, shared (a function body run in the real X2+ page after load, before the option's own body).
   window.__r33: the season's closeness numbers computed from ROUNDS (the sheet), and helpers that add a highlight card through the
   page's own builder (hlSlabs, via a new item in the Results list it reads), so the card is a real slab at the record card's size,
   with the carousel's dots, snapping, flip and eqH. A bullseye = the right direction and within 0.1% of the real move. */
var d=document,$=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};
var Z=window.__r33={};
var M=['GPT','KIMI','CLAUDE','GROK'];
Z.nm=function(m){return m==='GPT'?'GPT':m.charAt(0)+m.slice(1).toLowerCase()};
Z.esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
Z.f2=function(x){return x.toFixed(2)+'%'};
var rs=ROUNDS.slice().sort(function(a,b){return a.n-b.n}),calls=[];
rs.forEach(function(r){r.calls.forEach(function(x){var mm=String(x[1]).match(/(UP|DOWN)\s*([\d.]+)/);if(!mm)return;
  var c=(mm[1]==='UP'?1:-1)*parseFloat(mm[2]),h=Math.round(Math.abs(c-r.a)*100);   /* in hundredths: no float edge at 0.10 */
  calls.push({n:r.n,co:r.co,t:r.ticker,m:x[0],c:c,a:r.a,right:(c>0)===(r.a>0),h:h,miss:h/100})})});
Z.calls=calls;Z.rounds=rs;Z.M=M;
Z.right=calls.filter(function(x){return x.right});
/* bullseyes, closest first, then the newest first */
Z.bulls=Z.right.filter(function(x){return x.h<=10}).sort(function(a,b){return a.h-b.h||b.n-a.n});
Z.by={};M.forEach(function(m){var mine=calls.filter(function(x){return x.m===m}),ri=mine.filter(function(x){return x.right});
  var run=0,best=0,bs=0,be=0,st=0;mine.forEach(function(x){if(x.right&&x.h<=100){run++;if(run===1)st=x.n;if(run>best){best=run;bs=st;be=x.n}}else run=0});
  Z.by[m]={calls:mine.length,right:ri.length,bulls:ri.filter(function(x){return x.h<=10}).length,in05:ri.filter(function(x){return x.h<=50}).length,
    in1:ri.filter(function(x){return x.h<=100}).length,avg:ri.reduce(function(s,x){return s+x.miss},0)/(ri.length||1),
    streak:best,from:bs,to:be,now:run,last10:mine.slice(-10)}});
/* the longest run of right calls within 1%, ties to the earliest */
Z.streak=M.map(function(m){return {m:m,len:Z.by[m].streak,from:Z.by[m].from,to:Z.by[m].to}}).sort(function(a,b){return b.len-a.len||a.from-b.from})[0];
Z.round=function(n){for(var i=0;i<rs.length;i++)if(rs[i].n===n)return rs[i];return null};
Z.callOf=function(n,m){for(var i=0;i<calls.length;i++)if(calls[i].n===n&&calls[i].m===m)return calls[i];return null};
Z.closestN=function(){var a=$('ul.hx2s>li a.hx2'),m=a&&(a.getAttribute('href')||'').match(/round\/(\d+)/);return m?+m[1]:0};
/* a new highlight: a copy of the list's first item, pointed at round n, with its tag, head, sentence and two numbers */
Z.item=function(o){var ul=$('ul.hx2s'),src=$('li',ul),li=src.cloneNode(true),a=$('a.hx2',li),r=Z.round(o.n);
  a.setAttribute('href','#/round/'+o.n);a.setAttribute('aria-label',o.tag+': open round '+o.n+', '+r.co);
  var im=$('img',li);if(im&&r.poster)im.setAttribute('src','media/'+r.poster+'.jpg');
  $('.hx2-k',li).textContent=o.tag;$('.hx2-h',li).innerHTML=o.head;$('.hx2-p',li).textContent=o.body;
  var sp=$$('.hx2-r>span',li);(o.rec||[]).forEach(function(x,i){if(sp[i]){$('b',sp[i]).textContent=x[0];$('small',sp[i]).textContent=x[1]}});
  return li};
/* add or replace items, then let the page rebuild the carousel */
Z.rebuild=function(){var ul=$('ul.hx2s');ul.removeAttribute('data-x2p');window.__x2pHlSlabs();
  $$('#x2pHl .x2p-htag').forEach(function(t){var k=t.textContent.toLowerCase();if(/bull|sharp|streak/.test(k))t.className='x2p-htag x2p-h-y'})};
Z.card=function(tag){var w=$$('#x2pHl .x2p-hi').filter(function(w){return $('.x2p-htag',w).textContent===tag})[0];return w};
/* the strap's first line names the kinds, each in its tag's colour */
Z.strap=function(words){var li=$('#highlights .x2p-hlb li');if(li)li.innerHTML=words.map(function(w){return '<b class="x2p-hk x2p-h-'+w[0]+'">'+w[1]+'.</b>'}).join(' ')};
Z.land=function(tag,back){var ws=$$('#x2pHl .x2p-hi'),i=0;ws.forEach(function(w,j){if($('.x2p-htag',w).textContent===tag)i=j});window.__r33i=i;return window.__x2pHlGo&&window.__x2pHlGo(i,!!back)};
/* the dartboard roundel used on tags and the strap: printed, red bull, green ring, card and ink rings */
Z.bullSvg=function(s){return '<svg class="r33-bull" viewBox="0 0 20 20" width="'+s+'" height="'+s+'" aria-hidden="true"><circle cx="10" cy="10" r="9.3" fill="#1b181c"/><circle cx="10" cy="10" r="7.6" fill="#efe4c8"/><circle cx="10" cy="10" r="5.6" fill="#1b181c"/><circle cx="10" cy="10" r="4" fill="#1f7a45"/><circle cx="10" cy="10" r="1.9" fill="#c8372a"/></svg>'};
