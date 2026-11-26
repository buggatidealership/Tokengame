/* top7 (round H31): a mockup over the built X2+ top. window.__T7 = 'A' rows | 'B' 2x2 captions under | 'C' one block, captions outside.
   Film: the film4 strip is hidden; the hero chip's season glass becomes the play button (window.__f4open: a phone's own player, desktop's theatre).
   Play glass per take: A lit LED words, B the poster thumbnail in the glass, C a lit gold key. Read-only on x2p_top.js: only DOM it built is restyled. */
(function(){try{const D=document,T=window.__T7||'A',sec=D.querySelector('section.t4');if(!sec)throw new Error('no .t4');
sec.classList.add('t7','t7-'+T);
const PS=({A:'led',B:'thumb',C:'key'})[T];
const tw=(t,f)=>String(t).length*f*.47;
const tri=(cx,cy,r,fill)=>`<path d="M${(cx-r*.42).toFixed(1)},${(cy-r*.62).toFixed(1)} L${(cx+r*.66).toFixed(1)},${cy.toFixed(1)} L${(cx-r*.42).toFixed(1)},${(cy+r*.62).toFixed(1)}Z" fill="${fill}"/>`;
const run=()=>{const t=D.querySelector('.f4-t');return t?t.textContent.trim():'1:20'};
function glass(w,h){const R=run(),T1='THE WHOLE GAME';
  if(PS==='led'){const r=h*.36,cx=h*.5,cy=h/2,x0=cx+r+h*.28,f=Math.min(h*.46,(w-x0-h*.2)/(tw(T1+'  '+R,1)));
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#q4gd)" stroke="#0d0b10" stroke-width="${(h*.04).toFixed(1)}" class="t7-disc"/>`+tri(cx+r*.08,cy,r,'#0d0b10')
     +`<text x="${x0.toFixed(1)}" y="${(cy+f*.36).toFixed(1)}" font-size="${f.toFixed(1)}" fill="#ffc23a" class="t4-an t4-led">${T1}<tspan dx="${(f*.5).toFixed(1)}" fill="#fff4c4">${R}</tspan></text>`}
  if(PS==='thumb'){const th=h*.82,tw2=th*16/9,tx=h*.09,ty=(h-th)/2,x0=tx+tw2+h*.22,f=Math.min(h*.36,(w-x0-h*.15)/tw(T1,1)),f2=Math.min(h*.3,f*.9);
    return `<defs><clipPath id="t7th"><rect x="${tx}" y="${ty}" width="${tw2}" height="${th}" rx="${h*.06}"/></clipPath></defs>`
     +`<image href="media/ez-landing-v4-poster-ez.jpg" x="${tx}" y="${ty}" width="${tw2}" height="${th}" preserveAspectRatio="xMidYMid slice" clip-path="url(#t7th)"/>`
     +`<rect x="${tx}" y="${ty}" width="${tw2}" height="${th}" rx="${h*.06}" fill="none" stroke="#ffd25a" stroke-width="${(h*.035).toFixed(1)}"/>`
     +`<circle cx="${tx+tw2/2}" cy="${h/2}" r="${th*.3}" fill="url(#q4gd)" stroke="#0d0b10" stroke-width="${(h*.03).toFixed(1)}"/>`+tri(tx+tw2/2+th*.02,h/2,th*.3,'#0d0b10')
     +`<text x="${x0.toFixed(1)}" y="${(h*.47).toFixed(1)}" font-size="${f.toFixed(1)}" fill="#ffc23a" class="t4-an t4-led">${T1}</text>`
     +`<text x="${x0.toFixed(1)}" y="${(h*.47+f2*1.12).toFixed(1)}" font-size="${f2.toFixed(1)}" fill="#fff4c4" class="t4-an">PLAY · ${R}</text>`}
  /* key: the glass lit gold, the words pressed in ink */
  const r=h*.3,cx=h*.52,cy=h/2,x0=cx+r+h*.24,f=Math.min(h*.44,(w-x0-h*.2)/tw('PLAY THE WHOLE GAME  '+R,1));
  return `<rect x="${h*.06}" y="${h*.08}" width="${w-h*.12}" height="${h*.84}" rx="${h*.14}" fill="url(#t4gold)" stroke="#0d0b10" stroke-width="${(h*.05).toFixed(1)}"/>`
   +`<rect x="${h*.12}" y="${h*.13}" width="${w-h*.24}" height="${h*.2}" rx="${h*.1}" fill="#fffbe0" opacity=".35"/>`
   +`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0d0b10"/>`+tri(cx+r*.08,cy,r,'#ffd25a')
   +`<text x="${x0.toFixed(1)}" y="${(cy+f*.36).toFixed(1)}" font-size="${f.toFixed(1)}" fill="#0d0b10" class="t4-an">PLAY THE WHOLE GAME<tspan dx="${(f*.45).toFixed(1)}" fill="#7a1a10">${R}</tspan></text>`}
function play(){const hp=sec.querySelector('.t4-hero');if(!hp)return;const sfs=hp.querySelectorAll('.t4-sf'),L=sfs[sfs.length-1];if(!L)return;const sv=L.querySelector('svg');if(!sv)return;
  const vb=sv.getAttribute('viewBox').split(/\s+/).map(Number);if(L.dataset.t7!==PS){sv.innerHTML=glass(vb[2],vb[3]);L.dataset.t7=PS;L.classList.add('t7-pg','t7-'+PS)}
  const mv=hp.querySelector('.t4-mv');let b=mv.querySelector('.t7-pb');if(!b){b=D.createElement('button');b.type='button';b.className='t7-pb';b.addEventListener('click',()=>window.__f4open&&window.__f4open());mv.appendChild(b)}
  b.setAttribute('aria-label',`Play The whole game, a film of ${run()}, with sound`);
  const a=L.getBoundingClientRect(),m=mv.getBoundingClientRect(),p=8;Object.assign(b.style,{left:(a.left-m.left-p)+'px',top:(a.top-m.top-p)+'px',width:(a.width+2*p)+'px',height:(a.height+2*p)+'px'});
  sec.dataset.t7play=JSON.stringify([Math.round(a.width),Math.round(a.height)])}
/* crops: the ledger painting shows a different part of its 1400 crop (cx, cy, w, h), the entry still in slot 3 */
const LC={A:[96,375,1150,767],B:[96,133,1150,1250],C:[96,133,1150,1250]}[T];
function recrop(){const fr=sec.querySelector('.q4-ledger'),p=fr&&fr.querySelector('.t4-pic');if(!p||p.dataset.t7)return;const[cx,cy,cw,ch]=LC,iw=1400;
  p.dataset.iw=cw;p.dataset.cx=cx;p.dataset.cy=cy;p.style.aspectRatio=cw+'/'+ch;p.dataset.t7=1;
  p.querySelectorAll('.t4-mv>img').forEach(i=>{i.style.width=(iw/cw*100).toFixed(3)+'%';i.style.left=(-cx/cw*100).toFixed(3)+'%';i.style.top=(-cy/ch*100).toFixed(3)+'%'})}
/* one caption size for all four: A the largest that fits each box (boxes = picture height); B, C the largest at which no caption runs past 3 lines */
function fit(){const cs=[...sec.querySelectorAll('.t4-b2 .r3c3-cap')];if(!cs.length)return;const fl=sec.querySelector('.t4-frs');
  const ok=f=>cs.every(c=>{const n=c.firstElementChild,z=getComputedStyle(c);if(T==='A')return n.scrollHeight<=c.clientHeight-parseFloat(z.paddingTop)-parseFloat(z.paddingBottom)+1&&n.scrollWidth<=n.clientWidth+1;
    return n.scrollHeight<=f*2.5&&n.scrollWidth<=n.clientWidth+1});
  const MX=T==='A'?32:(innerWidth>=1000?26:21);let lo=9,hi=MX;sec.style.setProperty('--t7fs',hi+'px');if(!ok(hi))for(let i=0;i<12;i++){const m=(lo+hi)/2;sec.style.setProperty('--t7fs',m+'px');if(ok(m))lo=m;else hi=m}else lo=hi;
  const f=Math.floor(lo*4)/4;sec.style.setProperty('--t7fs',f+'px');sec.dataset.t7fs=f}
function all(){recrop();window.__t4&&window.__t4.place();requestAnimationFrame(()=>{fit();play();requestAnimationFrame(play)})}
all();setTimeout(all,600);D.fonts&&D.fonts.ready.then(all);let to;addEventListener('resize',()=>{clearTimeout(to);to=setTimeout(()=>{if(!sec.isConnected)return;all()},250)});
}catch(e){window.__t7err=e;console.error(e)}})();
