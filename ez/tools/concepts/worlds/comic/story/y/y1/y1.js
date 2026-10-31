/* y1 The mirror (round Y, 2026-10-31): each Meet the models card is a dressing-room mirror station, drawn and lit in code.
   Laid over the built X3+. Rebuilds each article.wc-ch inside .wc-chars from the page's own globals (__x2pPnl, ROUNDS, MODELS,
   CO_LOGOS). No image files but the site's own company logos. Classes y1-.
   Facts and their carriers:
     rank / we bet on it  -> the ticket tucked in the mirror's corner (#1: gold leaf "Golden ticket", the rest card stock "Season 1")
     name + version       -> the weathered painted sign plate, two stars over it
     lab's country        -> the flag painted on the plate's end
     the model            -> its mark lit in the glass, the rim light in its colour
     role line            -> written on the glass in grease paint
     Current P&L          -> the big grease-paint figure on the glass (counts up), the key light green when up, red when down
     right way n of m     -> marker on a strip of gaffer tape on the counter
     highest P&L + company-> a press clipping tucked in the frame: the company's logo, name and ticker
     last five calls      -> the five bulbs across the top: lit = right way, dead = wrong way; the newest flickers once when it arrives
   Lit materials (plaster, lacquered wood, chipped enamel, leather, tape cloth) are rendered once with SVG lighting filters
   into canvas data URIs and reused as backgrounds, so nothing filters live. */
(function(){
const D=document,H=D.documentElement;
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const FLAG={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'};
const LIT={GROK:'#efe7d6'};               /* the glow a mark gives off in the glass (Grok's ink would vanish on dark glass) */
const RIM={GROK:'#cfc6b4'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const money=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');

/* ---------- materials, rendered once ---------- */
function rast(svg,w,h,png){return new Promise(res=>{const im=new Image();im.onload=()=>{const c=D.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(im,0,0,w,h);res(c.toDataURL(png?'image/png':'image/jpeg',.86))};im.onerror=()=>res('');im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)})}
const lit=(w,h,turb,light,extra)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><filter id="f" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">${turb}${light}${extra||''}</filter><rect width="${w}" height="${h}" filter="url(#f)"/></svg>`;
async function materials(){
  /* plaster wall: bumpy noise lit by a low light from the left */
  const wall=await rast(lit(520,520,'<feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="5" seed="7" result="n"/>',
    '<feDiffuseLighting in="n" surfaceScale="3.2" diffuseConstant="1.05" lighting-color="#fff"><feDistantLight azimuth="185" elevation="34"/></feDiffuseLighting>'),520,520);
  /* lacquered wood: stretched grain, lit, plus a specular sheen */
  const wood=await rast(lit(360,360,'<feTurbulence type="fractalNoise" baseFrequency=".006 .16" numOctaves="4" seed="11" result="n"/>',
    '<feDiffuseLighting in="n" surfaceScale="2.4" diffuseConstant="1" lighting-color="#fff" result="d"><feDistantLight azimuth="200" elevation="45"/></feDiffuseLighting>',
    '<feSpecularLighting in="n" surfaceScale="2.4" specularConstant=".7" specularExponent="22" lighting-color="#fff" result="s"><feDistantLight azimuth="200" elevation="45"/></feSpecularLighting><feComposite in="s" in2="d" operator="arithmetic" k2="1" k3=".55"/>'),360,360);
  /* enamel chips: where the paint has flaked off the plate (alpha mask, white = metal shows) */
  const chips=await rast(`<svg xmlns="http://www.w3.org/2000/svg" width="420" height="120"><filter id="f" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".13" numOctaves="3" seed="4"/><feColorMatrix type="matrix" values="0 0 0 0 .6  0 0 0 0 .47  0 0 0 0 .36  0 0 0 -34 12.2"/></filter><rect width="420" height="120" filter="url(#f)"/></svg>`,420,120,true);
  /* worn leather (counter top) and tape cloth */
  const leather=await rast(lit(320,120,'<feTurbulence type="turbulence" baseFrequency=".09" numOctaves="3" seed="2" result="n"/>',
    '<feDiffuseLighting in="n" surfaceScale="1.4" diffuseConstant="1" lighting-color="#fff"><feDistantLight azimuth="210" elevation="50"/></feDiffuseLighting>'),320,120);
  const cloth=await rast(lit(240,60,'<feTurbulence type="fractalNoise" baseFrequency=".9 .35" numOctaves="2" seed="9" result="n"/>',
    '<feDiffuseLighting in="n" surfaceScale="1.1" diffuseConstant="1.1" lighting-color="#fff"><feDistantLight azimuth="235" elevation="55"/></feDiffuseLighting>'),240,60);
  const v=(k,u)=>u?H.style.setProperty(k,`url("${u}")`):0;
  v('--y1-wall',wall);v('--y1-wood',wood);v('--y1-chips',chips);v('--y1-leather',leather);v('--y1-cloth',cloth)}

/* ---------- drawn parts ---------- */
const star=(r,f)=>{const q=[];for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.44:r;q.push((r+rr*Math.cos(a)).toFixed(2)+','+(r+rr*Math.sin(a)+r*.06).toFixed(2))}return q.join(' ')};
function stars(){const p=star(10);return `<span class="y1-stars" aria-hidden="true">${[0,1].map(()=>`<svg viewBox="-2 -2 24 24"><defs><linearGradient id="y1sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe7a1"/><stop offset=".45" stop-color="#fdbc2a"/><stop offset="1" stop-color="#9a6a10"/></linearGradient></defs><polygon points="${p}" fill="url(#y1sg)" stroke="#04070e" stroke-width="1.6" stroke-linejoin="round"/><polygon points="${p}" fill="none" stroke="#fff3c4" stroke-width=".7" transform="translate(-.6 -.6)" opacity=".7"/></svg>`).join('')}</span>`}
function flag(k){
  if(k==='cn'){const s=(x,y,r)=>`<polygon points="${star(r)}" transform="translate(${x-r} ${y-r})" fill="#fdbc2a"/>`;
    return `<svg class="y1-flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#d8352a"/>${s(7,7,4.2)}${s(13,2.8,1.4)}${s(15.4,5.4,1.4)}${s(15.4,9,1.4)}${s(13,11.4,1.4)}</svg>`}
  let x='<svg class="y1-flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#efe4c8"/>';
  for(let i=0;i<7;i++)x+=`<rect y="${(i*2*20/13).toFixed(2)}" width="30" height="${(20/13).toFixed(2)}" fill="#d8352a"/>`;
  x+='<rect width="13" height="10.8" fill="#2a4c9c"/>';for(let r=0;r<4;r++)for(let c=0;c<5;c++)x+=`<circle cx="${1.6+c*2.5+(r%2?1.2:0)}" cy="${1.6+r*2.5}" r=".55" fill="#efe4c8"/>`;
  return x+'</svg>'}
const mark=(m,cls)=>{const M=MODELS[m];return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d}" fill-rule="${M.fr||'nonzero'}"/></svg>`};
function bulb(state,i){/* state: on (always lit), w (a right call), l (a wrong call) */
  return `<i class="y1-b y1-b-${state}${i!=null?' y1-b5-'+i:''}" aria-hidden="true"><i class="y1-bg"></i><svg class="y1-fil" viewBox="0 0 10 10"><path d="${state==='l'?'M3 8 L3.4 5.6 Q3.8 4.4 4.4 5.2 M5.8 4.8 Q6.4 4.2 6.6 5.4 L7 8':'M3 8 L3.4 5.6 M6.6 5.6 L7 8 M3.4 5.6 q.4 -1 .8 0 q.4 -1 .8 0 q.4 -1 .8 0 q.4 -1 .8 0'}"/></svg></i>`}

/* ---------- the card ---------- */
function build(){
  const sec=D.querySelector('.wc-chars');if(!sec)return false;
  const arts=[...sec.querySelectorAll('article.wc-ch')];if(!arts.length||!window.__x2pPnl)return false;
  const P=window.__x2pPnl().A,R=ROUNDS.slice().sort((a,b)=>a.n-b.n);
  const best=m=>{let b=null;for(const r of R){const x=P[m].per[r.n];if(x&&(!b||x.v>b.v))b={v:x.v,r}}return b};
  arts.forEach((art,i)=>{const m=art.dataset.m,a=P[m],tot=a.W+a.L,b=best(m),role=((art.querySelector('.wc-ch-role')||{}).textContent||'').trim();
    const L5=a.seq.slice(-5),up=a.pnl>=0,mc=MODELS[m].c,lg=(window.CO_LOGOS||{})[b.r.ticker];
    const cnt=art.querySelector('.wc-cnt');const cv=cnt?cnt.dataset.v:Math.round(Math.abs(a.pnl)),cs=cnt?cnt.dataset.s:(a.pnl<0?'−':'+');
    art.className=art.className.replace(/\bwc-ch-\d\b/,'')+' wc-ch-'+(i+1)+' y1-st'+(i===0?' y1-gold':'')+(up?' y1-up':' y1-dn');
    art.style.cssText=`--mc:${mc};--y1-lit:${LIT[m]||mc};--y1-rim:${RIM[m]||mc}`;
    art.setAttribute('aria-label',`#${i+1} ${NM[m]}, ${MODELS[m].ver}. ${role}. Current P&L ${money(a.pnl)}. Right way on ${a.W} of ${tot} calls. Highest P&L ${money(b.v)} on ${b.r.co}. Last five calls: ${L5.map(x=>x==='W'?'right':'wrong').join(', ')}.`);
    art.innerHTML=`
      <i class="y1-key" aria-hidden="true"></i><i class="y1-tone" aria-hidden="true"></i>
      <div class="y1-head">${stars()}
        <div class="y1-plate"><i class="y1-rv y1-rv1"></i><i class="y1-rv y1-rv2"></i>${flag(FLAG[m]||'us')}<h3><span>${NM[m]}</span><small>${esc(MODELS[m].ver)}</small></h3></div></div>
      <div class="y1-mir">
        <div class="y1-row" aria-hidden="true">${L5.map((x,k)=>bulb(x==='W'?'w':'l',k)).join('')}<span class="y1-l5">Last 5</span></div>
        <div class="y1-side y1-sl" aria-hidden="true">${bulb('on')}${bulb('on')}${bulb('on')}</div>
        <div class="y1-side y1-sr" aria-hidden="true">${bulb('on')}${bulb('on')}${bulb('on')}</div>
        <div class="y1-glass">
          <i class="y1-refl" aria-hidden="true"></i>
          <div class="y1-mk">${mark(m,'y1-mk-glow')}${mark(m,'y1-mk-s')}</div>
          <div class="y1-tx">
            <p class="y1-role">${esc(role)}</p>
            <p class="y1-big ${up?'y1-u':'y1-d'}"><small>Current P&amp;L</small><span class="wc-cnt" data-v="${cv}" data-s="${cs}">${money(a.pnl)}</span></p>
          </div>
          <i class="y1-sheen" aria-hidden="true"></i>
        </div>
        <div class="y1-tk" aria-hidden="true"><b>#${i+1}</b><i>${i===0?'Golden ticket':'Season 1'}</i></div>
      </div>
      <div class="y1-ctr">
        <p class="y1-tape"><small>Right way</small><b>${a.W} of ${tot}</b></p>
        <div class="y1-clip"><small>Highest P&amp;L</small><b class="${b.v>=0?'y1-u':'y1-d'}">${money(b.v)}</b>${lg?`<img src="media/${lg.f}" alt=""${lg.dark?' class="y1-lgdk"':''}>`:''}<span>${esc(b.r.co)} <em>(${esc(b.r.ticker)})</em></span></div>
      </div>`});
  return true}

window.Y1check=function(){/* dead space: share of each card's area not covered by a drawn object (sampled every 3px) */
  const out=[];D.querySelectorAll('.wc-chars .y1-st').forEach(c=>{const r=c.getBoundingClientRect();
    const objs=[...c.querySelectorAll('.y1-stars svg,.y1-plate,.y1-mir,.y1-tape,.y1-clip,.y1-ctr')].map(e=>e.getBoundingClientRect());
    let n=0,e=0;for(let y=r.top+1;y<r.bottom;y+=3)for(let x=r.left+1;x<r.right;x+=3){n++;if(!objs.some(o=>x>=o.left&&x<=o.right&&y>=o.top&&y<=o.bottom))e++}
    /* glass: share not covered by the mark or the text */
    const g=c.querySelector('.y1-glass').getBoundingClientRect(),go=[...c.querySelectorAll('.y1-mk,.y1-role,.y1-big')].map(e=>e.getBoundingClientRect());
    let gn=0,ge=0;for(let y=g.top+1;y<g.bottom;y+=3)for(let x=g.left+1;x<g.right;x+=3){gn++;if(!go.some(o=>x>=o.left&&x<=o.right&&y>=o.top&&y<=o.bottom))ge++}
    /* overlaps: nothing over the company logo or the model mark */
    const lg=c.querySelector('.y1-clip img'),mk=c.querySelector('.y1-mk-s'),hit=(a,b)=>a&&b&&!(a.right<=b.left||a.left>=b.right||a.bottom<=b.top||a.top>=b.bottom);
    const lr=lg&&lg.getBoundingClientRect(),mr=mk.querySelector('path').getBoundingClientRect();
    const over=[...c.querySelectorAll('.y1-tk,.y1-tape,.y1-tx,.y1-clip small,.y1-clip b,.y1-clip span')].filter(x=>{const q=x.getBoundingClientRect();return hit(q,mr)||(lr&&!x.closest('.y1-clip')&&hit(q,lr))}).map(x=>x.className);
    /* text clipping inside its box */
    const clip=[...c.querySelectorAll('h3 span,.y1-big span,.y1-tape b,.y1-clip span,.y1-role')].filter(x=>x.scrollWidth>x.clientWidth+1).map(x=>x.className||x.tagName);
    out.push({m:c.dataset.m,w:Math.round(r.width),h:Math.round(r.height),emptyCard:+(e/n*100).toFixed(1),emptyGlass:+(ge/gn*100).toFixed(1),over,clip})});
  const emoji=/\p{Extended_Pictographic}/u.test(D.querySelector('.wc-chars').textContent);
  return {cards:out,emoji,sw:D.documentElement.scrollWidth}};

(async function go(t0){t0=t0||Date.now();
  if(!build()){if(Date.now()-t0<20000)return setTimeout(()=>go(t0),150);return}
  try{await materials()}catch(e){console.warn('y1 materials',e)}
  H.classList.add('y1-on','y1-ready')})();
})();
