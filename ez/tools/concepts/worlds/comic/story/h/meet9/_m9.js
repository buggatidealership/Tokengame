/* Round H25 · meet9: Meet the models, the lines and the ground between the chips. Laid over the live chips8 take c (x2p_chips.js) on the built X2+.
   window.__M9T picks the take (A..E); window.__M9IMG = folder of this round's images (default this folder's out/).
   The personality line is read from the live balloon (x2p_chips.js LINE: computed from the sheet by stated rules), never typed here.
   A  marquee: the line runs on a fifth glass window in the chip's own foot band (9-sliced from its painted SEASON window) · ground: the board, the black lifted
   B  hologram: the line projected as light from the founder's window into the gap above, in the chip's colour · ground: pins to pins (gold traces chain the chips)
   C  channel: the line lit in a light-guide channel cut into the board between two chips (painted strip), fed by a lit lead from the founder's die · ground: the channel strip
   D  typed: the founder's die types the line on the foot window, a sentence at a time, down a lit data link · ground: colour spill (each chip lights the board in its colour)
   E  C seamless: chip, channel, chip, channel as one continuous board (no page ground between), no motion but the founders */
(function(){const D=document,W=window,T=(W.__M9T||'C').toUpperCase(),IM=W.__M9IMG||'tools/concepts/worlds/comic/story/h/meet9/out/';
const sec=D.querySelector('section.c8');if(!sec)return;
const COL={GROK:'#9aa7b8',CLAUDE:'#ff8a3d',GPT:'#3ee08a',KIMI:'#4f9dff'};
const PINS=[66,143,224,306,393,486,582,679,772,861,948,1037,1127,1218,1306,1394,1482,1568,1653,1738].map(x=>x/18);/* % of the chip's width, measured */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
sec.classList.add('m9','m9-'+T);
const ones=[...sec.querySelectorAll('.c8-one')];
const lines=ones.map(o=>{const b=o.querySelector('.c8-bal span');return b?b.textContent.trim():''});
ones.forEach((o,i)=>{const b=o.querySelector('.c8-bal');b&&b.remove();o.style.setProperty('--mc',COL[o.dataset.m]||'#ffd21f');o.dataset.i=i});
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* the foot window (A, D): the chip9 paintings carry it; the lit line sits on its glass */
function footChips(){ones.forEach(o=>{const im=o.querySelector('img.c7-base'),m=o.dataset.m.toLowerCase();
  im.src=IM+`chip9-${m}-1200.jpg`;im.srcset=`${IM}chip9-${m}-1200.webp 1200w, ${IM}chip9-${m}-1800.webp 1800w`;
  o.querySelectorAll('img.c7-glass').forEach(g=>{g.src=IM+`chip9-${m}-1200.jpg`;g.srcset=im.srcset})})}
function footLine(o,i,kind){const p=o.querySelector('.c7-pic'),f=D.createElement('div');f.className='m9-ft m9-'+kind;
  f.innerHTML=`<span class="m9-gl"></span><span class="m9-tx"><b>${esc(lines[i])}</b></span><i class="m9-sc"></i>`;p.append(f);return f}
/* the gap strip (C, E): a painted light-guide channel, the line lit in it, a lead from the channel's right end down into the founder's window */
function channel(o,i){const s=D.createElement('div');s.className='m9-ch';s.setAttribute('aria-hidden','true');
  s.innerHTML=`<span class="m9-chg"></span><span class="m9-cht"><b>${esc(lines[i])}</b></span><svg class="m9-lead" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M84.8 62 V100"/></svg>`;o.prepend(s)}
/* pins to pins (B, E): one gold trace from every bottom pin of the chip above to the same pin of the chip below */
function traces(o){if(!o.previousElementSibling)return;const g=D.createElement('div');g.className='m9-tr';g.setAttribute('aria-hidden','true');
  g.innerHTML=`<svg viewBox="0 0 100 100" preserveAspectRatio="none">${PINS.map(x=>`<rect class="m9-t" x="${(x-.55).toFixed(2)}" y="0" width="1.1" height="100"/><rect class="m9-th" x="${(x-.2).toFixed(2)}" y="0" width=".28" height="100"/>`).join('')}</svg>`;
  o.prepend(g)}
function holo(o,i){const h=D.createElement('div');h.className='m9-ho';h.setAttribute('aria-hidden','true');
  h.innerHTML=`<i class="m9-beam" style="background-image:url(${IM}m9-holo.jpg)"></i><span class="m9-hot"><b>${lines[i].match(/[^.!?]+[.!?]?/g).map(x=>esc(x.trim())).join('<br>')}</b></span>`;o.prepend(h)}
function spill(o){const s=D.createElement('i');s.className='m9-sp';o.prepend(s)}
/* fit: shrink a line only if it overflows its glass; report the scale (the 9 px cap rule is checked by run.js) */
function fit(){sec.querySelectorAll('.m9-tx b,.m9-cht b,.m9-hot b').forEach(b=>{b.style.transform='';const box=b.parentElement,w=box.clientWidth,bw=b.scrollWidth;
  const run=b.closest('.m9-mq');if(run){const over=bw-w;b.style.setProperty('--over',Math.max(0,over)+'px');b.style.setProperty('--dur',Math.max(6,(over+w)/34)+'s');box.classList.toggle('m9-run',over>2&&!RM);return}
  if(bw>w){const k=w/bw;b.style.transform=`scale(${k})`;b.dataset.k=k.toFixed(3)}else b.dataset.k='1'})}
/* D: type a sentence at a time, the cursor the die's own light; holds, then the next; only while on screen; whole line, still, with reduced motion */
function typer(f,i){const b=f.querySelector('b'),ss=lines[i].match(/[^.!?]+[.!?]?/g).map(s=>s.trim()).filter(Boolean);let si=0,ci=0,on=false,t=0;
  b.textContent=ss[0];if(RM)return;b.classList.add('m9-cur');
  const step=()=>{if(!on)return;const s=ss[si];if(ci<=s.length){b.textContent=s.slice(0,ci);ci++;t=setTimeout(step,ci===1?380:46)}else{t=setTimeout(()=>{si=(si+1)%ss.length;ci=0;step()},2600)}};
  new IntersectionObserver(es=>es.forEach(e=>{const was=on;on=e.isIntersecting;if(on&&!was){clearTimeout(t);step()}})).observe(f)}
if(T==='A'){footChips();ones.forEach((o,i)=>footLine(o,i,'mq'))}
if(T==='B'){ones.forEach((o,i)=>{traces(o);holo(o,i)})}
if(T==='C'){ones.forEach((o,i)=>channel(o,i))}
if(T==='D'){footChips();ones.forEach((o,i)=>{spill(o);const f=footLine(o,i,'ty');const ln=D.createElement('div');ln.className='m9-link';ln.innerHTML='<svg viewBox="0 0 1800 728" preserveAspectRatio="none"><path d="M1302 560 H1262 V582 H1244"/></svg>';o.querySelector('.c7-pic').append(ln);typer(f,i)})}
if(T==='E'){ones.forEach((o,i)=>channel(o,i))}
requestAnimationFrame(fit);D.fonts&&D.fonts.ready.then(fit);addEventListener('resize',fit);W.__m9={fit,lines,T};
D.documentElement.classList.add('m9-ready')})();
