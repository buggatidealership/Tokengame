(function(){const F=window.__FL,B=F.base,bk=document.getElementById('wc-book');const S=F.secs();const iss=F.graded();
const curlSVG=(i)=>`<svg viewBox="0 0 100 100" aria-hidden="true"><defs>
 <pattern id="fla-st${i}" patternUnits="userSpaceOnUse" width="120" height="120"><image href="${B}img/web/f-stock.jpg" width="120" height="120"/></pattern>
 <pattern id="fla-bk${i}" patternUnits="userSpaceOnUse" width="90" height="90"><image href="${B}img/web/f-back.jpg" width="90" height="90"/></pattern>
 <linearGradient id="fla-sh${i}" x1="0" y1="0" x2="1" y2="1"><stop offset=".42" stop-color="#0b0712" stop-opacity=".62"/><stop offset=".72" stop-color="#0b0712" stop-opacity="0"/></linearGradient>
 <linearGradient id="fla-hl${i}" x1="1" y1="1" x2="0" y2="0"><stop offset=".22" stop-color="#fff8e6" stop-opacity=".75"/><stop offset=".55" stop-color="#fff8e6" stop-opacity="0"/><stop offset="1" stop-color="#5a4628" stop-opacity=".35"/></linearGradient></defs>
 <path d="M0,100 Q52,52 100,0 L100,100Z" fill="url(#fla-st${i})"/><path d="M0,100 Q52,52 100,0 L100,100Z" fill="url(#fla-sh${i})"/>
 <path d="M-3,99 Q50,48 99,-3 Q42,12 9,8 Q12,42 -3,99Z" fill="#0b0712" opacity=".38" transform="translate(-4 -3)"/>
 <path d="M0,100 Q52,52 100,0 Q44,16 8,8 Q16,44 0,100Z" fill="url(#fla-bk${i})"/><path d="M0,100 Q52,52 100,0 Q44,16 8,8 Q16,44 0,100Z" fill="url(#fla-hl${i})"/>
 <path d="M0,100 Q52,52 100,0 Q44,16 8,8 Q16,44 0,100Z" fill="none" stroke="#120f14" stroke-width="2.6" stroke-linejoin="round"/>
 <path d="M6,93 Q53,55 93,6" fill="none" stroke="#120f14" stroke-width=".8" opacity=".55"/></svg>`;
const parts=S.map(({el,id},i)=>{const sh=document.createElement('i');sh.className='fla-sheet';sh.setAttribute('aria-hidden','true');
 const fo=document.createElement('span');fo.className='fla-folio';fo.setAttribute('aria-hidden','true');fo.innerHTML=`EZ · Season 1 · No. ${iss} · <b>p. ${i+1}</b>`;
 const cu=document.createElement('i');cu.className='fla-curl';cu.innerHTML=curlSVG(i);
 bk.insertBefore(sh,el);bk.appendChild(fo);if(id!=='back')bk.appendChild(cu);[sh,fo,cu].forEach(x=>x.style.setProperty('--z',String(-(i+1))));return {el,id,sh,fo,cu}});
const place=()=>{const br=bk.getBoundingClientRect();const pad=F.desk()?26:8;
 parts.forEach((p,i)=>{const r=p.el.getBoundingClientRect(),nx=parts[i+1];const top=r.top-br.top-10;
  const bot=nx?nx.el.getBoundingClientRect().top-br.top+14:r.bottom-br.top+28;
  const x=Math.max(F.desk()?r.left-br.left-pad:6-br.left,-br.left+4),w=F.desk()?r.width+pad*2:innerWidth-12;
  [p.sh,p.fo,p.cu].forEach(e=>{e.style.setProperty('--x',x+'px');e.style.setProperty('--w',w+'px');e.style.setProperty('--y',top+'px');e.style.setProperty('--h',(bot-top)+'px')});
  p.fo.style.top=((nx?nx.el.getBoundingClientRect().top-br.top-24:r.bottom-br.top+6))+'px'})};
place();new ResizeObserver(()=>requestAnimationFrame(place)).observe(bk);addEventListener('resize',place);
if(!F.SDA&&!F.RM){const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('fl-up',e.boundingClientRect.top<innerHeight*.45)),{threshold:[0,.5,1],rootMargin:'0px 0px -40% 0px'});parts.forEach(p=>io.observe(p.cu))}
F.beats();F.ready()})();
