/* each of tomorrow's tickets takes its company's colours (read from its own logo by _pal.js); a take's CSS decides how */
(async function(){const lum=h=>{const n=parseInt(h.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;return (.2126*r+.7152*g+.0722*b)/255};
 const dk=(h,f)=>{const n=parseInt(h.slice(1),16);return '#'+[n>>16,n>>8&255,n&255].map(v=>Math.round(v*f).toString(16).padStart(2,'0')).join('')};
 for(const t of document.querySelectorAll('.wc-tnp')){const tk=((t.querySelector('header small')||{}).textContent||'').trim(),c=(window.CO_LOGOS||{})[tk];
  const p=c?await __bpal('media/'+c.f):{};const m=p.main||'#2b2733',a=p.acc||dk(m,.62);
  t.style.setProperty('--bm',m);t.style.setProperty('--ba',a);t.style.setProperty('--bmd',dk(m,.78));t.style.setProperty('--bt',lum(m)>.62?'#15121a':'#fff');t.classList.add('bk-t')}
 document.documentElement.classList.add('bk-ready')})();
