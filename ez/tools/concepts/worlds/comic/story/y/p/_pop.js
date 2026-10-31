/* Round P shared helpers: the pop cover's recipe as functions, so every element of a module can be built in it.
   POP.ext(text,o)   extruded lettering as an inline SVG sized to its own ink (gradient fill, ink outline via paint-order,
                     stacked solid extrusion in a dark shade, thin white highlight top-left). Tight box: no dead space.
   POP.xbox(dp,sh)   box-shadow for an extruded slab (ink outline round the whole extrusion, solid shade copies, white inner highlight).
   POP.burst/star/rays SVG pieces from pop.html.  POP.mark(m) a model's mark.  POP.data() every number from the page's globals. */
(function(){
const INK='#0d0b10';
const cx=document.createElement('canvas').getContext('2d');
let gid=0;
const G={
 gold:['#fff6a8','#ffd21f','#ff9a00'],cream:['#ffffff','#fff3d0','#f2d9a0'],red:['#ff8f84','#ff3a31','#c3140c'],green:['#9dffc8','#22e087','#04964f'],
 pink:['#ff8fb0','#ff3a6e','#c80f45'],blue:['#9fd2ff','#3a8bff','#1446c8'],white:['#ffffff','#f6f1ff','#d9d2ec'],orange:['#ffd08a','#ff8a1f','#e0560a']};
const SH={gold:'#7a2a06',cream:'#5b2a0c',red:'#5e0703',green:'#053b20',pink:'#6b0626',blue:'#0b2366',white:'#3b2f5c',orange:'#6e2104'};
function shade(hex,k){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;r=Math.round(r*k);g=Math.round(g*k);b=Math.round(b*k);return '#'+((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1)}
function lighten(hex,k){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;r=Math.round(r+(255-r)*k);g=Math.round(g+(255-g)*k);b=Math.round(b+(255-b)*k);return '#'+((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1)}
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
function measure(t,font,size){cx.font=`${size}px "${font}"`;const m=cx.measureText(t);return {w:m.width,a:m.actualBoundingBoxAscent,d:m.actualBoundingBoxDescent,l:m.actualBoundingBoxLeft,r:m.actualBoundingBoxRight}}
/* o: size, font ('Luckiest Guy'|'Bangers'), fill (key of G or [top,mid,bot]), shade (hex), depth, sw (outline), max (fit width px), rot, cls, hl (bool), measureAs (widest text it will show) */
function ext(t,o={}){let size=o.size||32;const font=o.font||'Luckiest Guy';const ma=o.measureAs||t;
  let m=measure(ma,font,size);if(o.max){const sw0=o.sw!=null?o.sw:Math.max(1.4,size*.085),dp0=o.depth!=null?o.depth:Math.max(2,Math.round(size*.12));const w=m.l+m.r+2*sw0+dp0+2;if(w>o.max){size=Math.max(o.min||8,size*o.max/w);m=measure(ma,font,size)}}
  const fill=Array.isArray(o.fill)?o.fill:G[o.fill||'gold'],sh=o.shade||SH[o.fill]||'#5e0703';
  const sw=o.sw!=null?o.sw:Math.max(1.4,size*.085),dp=o.depth!=null?o.depth:Math.max(2,Math.round(size*.12)),pad=sw+1;
  const W=Math.ceil(m.l+m.r+2*pad+dp+1),H=Math.ceil(m.a+m.d+2*pad+dp+1),x=pad+m.l,y=pad+m.a,id='ppg'+(++gid);
  const T=(xx,yy,f,s,sw2,extra='')=>`<text x="${xx.toFixed(2)}" y="${yy.toFixed(2)}" fill="${f}"${s?` stroke="${s}" stroke-width="${sw2.toFixed(2)}" stroke-linejoin="round" paint-order="stroke"`:''}${extra}>${esc(t)}</text>`;
  let s=`<svg class="pp-ext ${o.cls||''}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true" font-family="${font}" font-size="${size.toFixed(2)}" style="--w:${W}px;--h:${H}px${o.rot?`;transform:rotate(${o.rot}deg)`:''}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${fill[0]}"/><stop offset=".55" stop-color="${fill[1]}"/><stop offset="1" stop-color="${fill[2]}"/></linearGradient></defs>`;
  for(let d=dp;d>0;d--)s+=T(x+d,y+d,sh,d===dp?INK:(o.mid?INK:null),d===dp?sw+1.6:sw*.35);
  s+=T(x,y,`url(#${id})`,INK,sw);
  if(o.hl!==false&&size>=15)s+=T(x-size*.022,y-size*.022,'none','rgba(255,255,255,.75)',Math.max(.55,size*.016)).replace('fill="none"','fill="none" class="pp-hl"');
  return s+'</svg>'}
/* set the text of an ext svg (count-ups) */
function setText(svg,t){svg.querySelectorAll('text').forEach(n=>n.textContent=t)}
/* an extruded slab: ink outline round the whole extrusion, then the shade copies, then an inner highlight top-left and a soft inner shade bottom-right */
function xbox(dp,sh,o={}){const a=[];a.push(`inset ${o.hl||2}px ${o.hl||2}px 0 rgba(255,255,255,${o.ha||.55})`,`inset -${o.lo||3}px -${o.lo||3}px 0 rgba(0,0,0,${o.la||.16})`);
  for(let k=1;k<=dp;k++)a.push(`${k}px ${k}px 0 ${sh}`);{const bw=o.bw||2.5;for(let k=Math.min(dp,Math.ceil(bw));k<=dp;k++)a.push(`${k}px ${k}px 0 ${bw}px ${INK}`)}if(o.cast)a.push(`${dp+o.cast}px ${dp+o.cast}px 0 ${o.bw||2.5}px rgba(13,11,16,.55)`);return a.join(',')}
function seed(s){return ()=>(s=(s*9301+49297)%233280)/233280}
function burst(cx0,cy0,r1,r2,n,sd){const rnd=seed(sd||7),pts=[];for(let i=0;i<n*2;i++){const a=i/(n*2)*2*Math.PI-Math.PI/2,r=i%2?r2*(.85+.3*rnd()):r1*(.9+.25*rnd());pts.push((cx0+r*Math.cos(a)).toFixed(1)+','+(cy0+r*Math.sin(a)).toFixed(1))}return pts.join(' ')}
/* a burst sized to a box (w x h) as an svg string: ink drop, outer colour, inner colour */
function burstSvg(w,h,o={}){const n=o.n||12,cx0=w/2,cy0=h/2,dp=o.dp||5,R1=Math.min(w,h)/2-dp-3;const sx=(w-dp-6)/(Math.min(w,h)-dp-6);
  const pts=burst(0,0,R1,R1*(o.k||.74),n,o.seed||7),pts2=burst(0,0,R1*.84,R1*(o.k||.74)*.84,n,o.seed||7);
  const tr=`translate(${(cx0-dp/2).toFixed(1)} ${(cy0-dp/2).toFixed(1)}) scale(${(w>h?sx:1).toFixed(3)} ${(h>w?(h-dp-6)/(w-dp-6):1).toFixed(3)})`;
  return `<svg class="pp-bst ${o.cls||''}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true"><g transform="translate(${dp} ${dp})"><polygon points="${pts}" fill="${INK}" transform="${tr}"/></g><polygon points="${pts}" fill="${o.c1||'#ff3a31'}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round" transform="${tr}"/>${o.c2?`<polygon points="${pts2}" fill="${o.c2}" transform="${tr}"/>`:''}${o.c3?`<polygon points="${burst(0,0,R1*.62,R1*(o.k||.74)*.62,n,o.seed||7)}" fill="${o.c3}" transform="${tr}"/>`:''}</svg>`}
function star(cx0,cy0,r,f){let p=[];for(let i=0;i<10;i++){const a=i/10*2*Math.PI-Math.PI/2,rr=i%2?r*.45:r;p.push((cx0+rr*Math.cos(a)).toFixed(1)+','+(cy0+rr*Math.sin(a)).toFixed(1))}return `<polygon points="${p.join(' ')}" fill="${f||'#ffd21f'}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`}
/* a sunburst as a CSS background (repeating conic) : two tones */
const rays=(c1,c2,at,n)=>`repeating-conic-gradient(from 0deg at ${at||'50% 50%'},${c1} 0deg ${180/(n||20)}deg,${c2} ${180/(n||20)}deg ${360/(n||20)}deg)`;
/* halftone that fades in from the edges: background + mask, as pop.html's .ht */
const MCOL={GROK:'#15121a'};
function mcol(m){return MCOL[m]||MODELS[m].c}
function mark(m,sz,fill){const M=MODELS[m];return `<svg class="pp-mk" width="${sz}" height="${sz}" viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d}" fill="${fill||mcol(m)}" fill-rule="${M.fr||'nonzero'}"/></svg>`}
/* a disc that holds a model's mark, built as an extruded coin (radial light, ink rim, solid extrusion in the model's dark) */
function coin(m,sz,o={}){const c=mcol(m),dk=m==='GROK'?'#000':shade(c,.45),dp=o.dp!=null?o.dp:Math.max(2,Math.round(sz*.07));
  return `<i class="pp-coin${o.holo?' pp-holo':''}" style="--sz:${sz}px;--mc:${c};box-shadow:${xbox(dp,dk,{hl:Math.max(1.5,sz*.04),lo:Math.max(2,sz*.06),bw:Math.max(2,sz*.035)})}">${mark(m,Math.round(sz*.6))}</i>`}
const NM={GPT:'GPT',CLAUDE:'Claude',GROK:'Grok',KIMI:'Kimi'};
const FLAG={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'};
const pm=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pct=a=>Math.abs(a).toFixed(2)+'%';
function data(){const P=window.__x2pPnl().A,R=ROUNDS.slice();const order=[...document.querySelectorAll('.wc-chars article.wc-ch')].map(a=>a.dataset.m);
  const best=m=>{let b=null;for(const r of R){const x=P[m].per[r.n];if(x&&(!b||x.v>b.v))b={v:x.v,r}}return b};
  const models=order.map((m,i)=>{const a=P[m];return {m,i,name:NM[m],ver:MODELS[m].ver,pnl:a.pnl,W:a.W,L:a.L,tot:a.W+a.L,best:best(m),last5:a.seq.slice(-5),flag:FLAG[m]}});
  return {models,rounds:R.slice().sort((a,b)=>b.n-a.n)}}
const winners=r=>r.win?r.win.split(' & ').filter(x=>MODELS[x]):[];
/* company display: "Exxon Mobil (XOM)" */
const coName=r=>`${r.co} (${r.ticker})`;
/* count up an ext svg once in view */
function countUp(svg,v,sign){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const fin=sign+'$'+Math.round(v).toLocaleString('en-US');setText(svg,sign+'$0');
  const io=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting))return;io.disconnect();const t0=performance.now(),D=1100;
    const f=t=>{const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,3);setText(svg,k<1?sign+'$'+Math.round(v*e).toLocaleString('en-US'):fin);if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)},{threshold:.4});io.observe(svg)}
/* fonts */
function fonts(){if(!document.getElementById('pp-fonts')){const l=document.createElement('link');l.id='pp-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bangers&family=Luckiest+Guy&display=swap';document.head.appendChild(l)}
  return Promise.all(['40px "Luckiest Guy"','40px "Bangers"'].map(f=>document.fonts.load(f))).then(()=>document.fonts.ready)}
/* a hard-rule checker shared by the takes: empty area inside cards, emoji, overflow, pale grounds */
function check(sel,cardSel){const sec=document.querySelector(sel),cards=[...sec.querySelectorAll(cardSel)].filter(c=>c.offsetParent);const emo=/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(sec.innerText);
  const over=[...sec.querySelectorAll('*')].filter(n=>n.scrollWidth>n.clientWidth+1&&getComputedStyle(n).overflow!=='visible'&&n.clientWidth>0).map(n=>n.className&&n.className.baseVal!==undefined?n.className.baseVal:n.className).slice(0,6);
  /* dead space: share of each card's area covered by no content box (text, svg, img, canvas, coin), sampled on a 4px grid */
  const dead=cards.map(c=>{c.scrollIntoView({block:'center'});const r=c.getBoundingClientRect();let tot=0,empty=0;for(let y=r.top+3;y<r.bottom-3;y+=4)for(let x=r.left+3;x<r.right-3;x+=4){tot++;const e=document.elementFromPoint(x,y);if(!e||e===c||e.classList.contains('pp-pad'))empty++}return tot?Math.round(empty/tot*100):0});
  const pale=cards.map(c=>{const bg=getComputedStyle(c).backgroundColor;const m=bg.match(/\d+/g);return m&&+m[3]!==0&&(+m[0]+ +m[1]+ +m[2])/3>235}).filter(Boolean).length;
  return {cards:cards.length,deadPct:dead,emoji:emo,overflowing:over,paleCardGrounds:pale,sw:document.documentElement.scrollWidth,vw:innerWidth}}
window.POP={INK,G,SH,ext,setText,xbox,burst,burstSvg,star,rays,mark,coin,mcol,shade,lighten,NM,FLAG,pm,pct,data,winners,coName,countUp,fonts,check,esc};
})();
