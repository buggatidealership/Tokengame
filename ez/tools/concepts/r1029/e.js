/* r1029 E (owner, 2026-10-27, night: "a digital ticket... these are tickets that AI submit, not humans"): a digital ticket's furniture:
   a 2D code drawn from the SHA-256 of the record it vouches for, the ticket id, the hash written short, the issuer. The code is drawn
   from the hash for the mockup; a build would print a real QR to the round's own link. window.__eV = 1 (one pass) or 2 (a ticket per AI). */
(async function(){var V=window.__eV||1,G=ROUNDS.filter(function(r){return typeof r.a==="number"}),last=G[G.length-1].n,ID='EZ-S1-R'+last;
 async function sha(t){var b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return [].map.call(new Uint8Array(b),function(x){return ('0'+x.toString(16)).slice(-2)}).join('')}
 function code(hex,px){var n=21,c=px/n,bits=[];hex.split('').forEach(function(h){var v=parseInt(h,16);for(var i=3;i>=0;i--)bits.push((v>>i)&1)});var s='<svg viewBox="0 0 '+px+' '+px+'" width="'+px+'" height="'+px+'" aria-hidden="true"><rect width="'+px+'" height="'+px+'" fill="#f8f0d9"/>',k=0;
  function fnd(x,y){s+='<rect x="'+x*c+'" y="'+y*c+'" width="'+7*c+'" height="'+7*c+'" fill="#04070e"/><rect x="'+(x+1)*c+'" y="'+(y+1)*c+'" width="'+5*c+'" height="'+5*c+'" fill="#f8f0d9"/><rect x="'+(x+2)*c+'" y="'+(y+2)*c+'" width="'+3*c+'" height="'+3*c+'" fill="#04070e"/>'}
  for(var y=0;y<n;y++)for(var x=0;x<n;x++){if((x<8&&y<8)||(x>12&&y<8)||(x<8&&y>12))continue;if(bits[(k++)%bits.length])s+='<rect x="'+(x*c).toFixed(2)+'" y="'+(y*c).toFixed(2)+'" width="'+c.toFixed(2)+'" height="'+c.toFixed(2)+'" fill="#04070e"/>'}
  fnd(0,0);fnd(14,0);fnd(0,14);return s+'</svg>'}
 var all=await sha(JSON.stringify(G.map(function(r){return [r.n,r.ticker,r.called,r.resolves,r.calls,r.a]})));
 var foot=function(lbl){return '<div class="ez-ft"><span class="ez-qr">'+code(all,58)+'</span><span class="ez-meta"><b>'+ID+'</b><span>'+lbl+'</span><span>SHA-256 '+all.slice(0,8)+'…'+all.slice(-6)+'</span></span><span class="ez-adm">Admit<br>the market<br>close</span></div>'};
 var tw=document.querySelector('.rz-tw');if(tw&&!tw.querySelector('.ez-ft')){tw.querySelector('.rz-cols').insertAdjacentHTML('beforebegin','<div class="ez-perf" aria-hidden="true"></div>');tw.insertAdjacentHTML('beforeend','<div class="ez-perf" aria-hidden="true"></div>'+foot('Issued by the market close · 4 AIs · '+G.length+' rounds'))}
 var pf=document.querySelector('.rz-pf');if(pf&&!pf.querySelector('.ez-ft')){pf.querySelector('.rz-tb').insertAdjacentHTML('afterend','<div class="ez-perf" aria-hidden="true"></div>');pf.insertAdjacentHTML('beforeend','<div class="ez-perf" aria-hidden="true"></div>'+foot('Every call before the report · graded at the close'))}
 if(V===2){var NM={GROK:1,CLAUDE:1,GPT:1,KIMI:1};
  for(const li of document.querySelectorAll('.rz-r:not(.rz-5)')){var b=li.querySelector('.rz-ai b'),m=b.textContent.trim().toUpperCase(),mine=G.map(function(r){return (r.calls||[]).filter(function(c){return c[0]===m})[0]}).filter(Boolean);
   var h=await sha(JSON.stringify(mine)),bar=li.querySelector('.rz-bar');li.style.setProperty('--mc',getComputedStyle(bar).backgroundColor);
   if(!li.querySelector('.ez-sig'))li.querySelector('.rz-nmw').insertAdjacentHTML('beforeend','<span class="ez-sig">'+mine.length+' calls · sig '+h.slice(0,6)+'…'+h.slice(-4)+'</span>');
   if(!li.querySelector('.ez-mq'))li.querySelector('.rz-pl').insertAdjacentHTML('afterbegin','<span class="ez-mq">'+code(h,22)+'</span>')}}})();
