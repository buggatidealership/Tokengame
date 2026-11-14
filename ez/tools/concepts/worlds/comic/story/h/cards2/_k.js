/* Round H2, area cards2: Meet the models cards. One builder, six takes = background (scene | robe | poster) x inner style (cut | ink).
   window.KCFG={bg,inner}. Needs ../cards/_c.js (HC: data from POP.data(), brush strokes, tick/cross, portraits, mount).
   Every number comes from POP.data() (the page's __x2pPnl, ROUNDS, MODELS); nothing typed.
   Kept from today: the founders' animated portraits, the rank, flag, role chip and last five (all redrawn in the take's style).
   Current P&L is the one loud thing on each card: POP.ext, the site's extruded, lit pop lettering. */
(function(){const {d,P,INK,ROLE,money,brush,flag,port,sr,mount}=HC;const C=window.KCFG||{bg:'scene',inner:'cut'};
const I='tools/concepts/worlds/comic/story/h/cards2/img/';
const PAPER={cream:I+'paper-cream.jpg',gold:I+'paper-gold.jpg',green:I+'paper-green.jpg',red:I+'paper-red.jpg',blue:I+'paper-blue.jpg',black:I+'paper-black.jpg'};
const MC={GROK:'black',CLAUDE:'red',GPT:'green',KIMI:'blue'};           /* paper for each model's mark disc */
const HUE={GROK:'#ff3fb4',CLAUDE:'#ff8a3a',GPT:'#33e0a0',KIMI:'#4f8dff'}; /* each model's accent in its own world */
let S=11;const R=()=>{S=(S*16807)%2147483647;return (S-1)/2147483646};
const cx=document.createElement('canvas').getContext('2d');
const meas=(t,f,s)=>{cx.font=`${s}px "${f}"`;const m=cx.measureText(t);return {l:m.actualBoundingBoxLeft,r:m.actualBoundingBoxRight,a:m.actualBoundingBoxAscent,d:m.actualBoundingBoxDescent}};
let uid=0;
/* a scissor-cut polygon: each side 2 to 3 straight cuts, corners nudged in (percent) */
function cut(j,s){if(s)S=s;const q=[],J=()=>R()*j;const side=(a,b,n,f)=>{for(let k=0;k<n;k++){const t=k/n;q.push(f(a+(b-a)*t+(k?(R()-.5)*8:0),J()))}};
  side(0,100,3,(t,o)=>[t,o]);side(0,100,2,(t,o)=>[100-o*.7,t]);side(100,0,3,(t,o)=>[t,100-o]);side(100,0,2,(t,o)=>[o*.7,t]);
  return 'polygon('+q.map(p=>Math.max(0,Math.min(100,p[0])).toFixed(1)+'% '+Math.max(0,Math.min(100,p[1])).toFixed(1)+'%').join(',')+')'}
/* a piece of cut paper: a cream backing sheet showing a white cut edge, the coloured sheet on it, lifted off the card */
function piece(col,inner,cls,s,j){j=j||2.6;return `<div class="kp ${cls||''}"><i class="kp-b" style="clip-path:${cut(j*.85,s)}"></i><i class="kp-f" style="background-image:url(${PAPER[col]});clip-path:${cut(j,(s||1)+5)}"></i><div class="kp-c">${inner}</div></div>`}
/* cut-paper lettering: the letters cut from a paper sheet (pattern fill), a white cut edge, lifted */
function cutText(t,o){const f=o.font||'Luckiest Guy',sz=o.size||28,m=meas(t,f,sz),sw=Math.max(2,sz*.09),pad=sw+2,W=Math.ceil(m.l+m.r+2*pad+3),H=Math.ceil(m.a+m.d+2*pad+3),id='kct'+(++uid);
  return `<svg class="kct ${o.cls||''}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true" font-family="${f}" font-size="${sz}"><defs><pattern id="${id}" patternUnits="userSpaceOnUse" width="260" height="260" patternTransform="rotate(${(uid*37)%90})"><image href="${PAPER[o.paper||'cream']}" width="260" height="260" preserveAspectRatio="xMidYMid slice"/></pattern></defs>
   <text x="${pad+m.l}" y="${pad+m.a}" fill="#000" opacity=".5" stroke="#000" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke" transform="translate(1.6 2.4)" filter="url(#kBlur)">${P.esc(t)}</text>
   <text x="${pad+m.l}" y="${pad+m.a}" fill="url(#${id})" stroke="${o.edge||'#fffaf0'}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke">${P.esc(t)}</text>
   <text x="${pad+m.l}" y="${pad+m.a}" fill="none" stroke="rgba(0,0,0,.28)" stroke-width=".7">${P.esc(t)}</text></svg>`}
/* ink-brush lettering: letters in a brush face, dry-brush broken edges, an ink drop */
function inkText(t,o){return `<span class="kit ${o.cls||''}" style="font-size:${o.size||28}px;color:${o.col||INK}">${P.esc(t)}</span>`}
/* a brush swipe (Hedra dry-brush stroke as an alpha mask) painted in a colour, content on it */
function swipe(col,inner,cls,which){return `<div class="ks ${cls||''}"><i class="ks-p" style="background:${col};-webkit-mask-image:url(${I}${which||'brush-swipe'}.png);mask-image:url(${I}${which||'brush-swipe'}.png)"></i><div class="ks-c">${inner}</div></div>`}
/* a small shape cut from paper that carries the stat's meaning: a tick (right way), an arrow (best call up or down) */
function deco(kind){const id='kdc'+(++uid),col=kind==='tick'||kind==='up'?'green':'red';
  const d=kind==='tick'?'M3 15 L9 9 L14 14 L27 2 L32 8 L14 25 Z':kind==='up'?'M17 1 L32 16 L23 16 L23 30 L11 30 L11 16 L2 16 Z':'M17 31 L32 16 L23 16 L23 2 L11 2 L11 16 L2 16 Z';
  return `<svg class="kdeco" viewBox="-2 -2 38 36" aria-hidden="true"><defs><pattern id="${id}" patternUnits="userSpaceOnUse" width="80" height="80"><image href="${PAPER[col]}" width="80" height="80" preserveAspectRatio="xMidYMid slice"/></pattern></defs><path d="${d}" fill="url(#${id})" stroke="#fffaf0" stroke-width="2.2" stroke-linejoin="round"/></svg>`}
/* a hand-drawn flag in cut paper: stripes and canton as paper pieces */
function paperFlag(k){const id='kpf'+(++uid),pt=(c,n)=>`<pattern id="${id+n}" patternUnits="userSpaceOnUse" width="90" height="90"><image href="${PAPER[c]}" width="90" height="90" preserveAspectRatio="xMidYMid slice"/></pattern>`;
  const out=`M1.2 1.6 L15 .8 L29 1.8 L28.4 18.6 L14 19.4 L.8 18.4Z`;
  let s=`<svg class="kflag" viewBox="-2 -2 34 25" aria-hidden="true"><defs>${pt('red','r')}${pt('cream','c')}${pt('blue','b')}${pt('gold','g')}<clipPath id="${id}k"><path d="${out}"/></clipPath></defs><path d="${out}" fill="#fffaf0" transform="translate(-.6 -.6) scale(1.04)"/>`;
  if(k==='cn')s+=`<path d="${out}" fill="url(#${id}r)"/><path d="M6 3.2l1.4 3.6h3.8l-3 2.2 1.2 3.6L6 10.4l-3.2 2.2 1.2-3.6-3-2.2h3.8z" fill="url(#${id}g)" stroke="#fffaf0" stroke-width=".8" stroke-linejoin="round"/>${[[13.5,3],[16,6.2],[16,10.4],[13.5,13.6]].map(q=>`<path d="M${q[0]-1.3} ${q[1]} l1.3-1.4 1.3 1.4 -1.3 1.4z" fill="url(#${id}g)" stroke="#fffaf0" stroke-width=".5"/>`).join('')}`;
  else{s+=`<g clip-path="url(#${id}k)"><rect x="-2" y="-2" width="34" height="24" fill="url(#${id}c)"/>`;for(let i=0;i<7;i++){const y=i*20/6.5-.2;s+=`<path d="M-2 ${(y+.3).toFixed(1)} L31 ${(y-.2).toFixed(1)} L31 ${(y+1.5).toFixed(1)} L-2 ${(y+1.8).toFixed(1)}Z" fill="url(#${id}r)"/>`}
    s+=`<path d="M-2 -2 L13.6 -2 L13.2 10.6 L-2 11Z" fill="url(#${id}b)" stroke="#fffaf0" stroke-width=".7"/>${[0,1,2].map(r=>[0,1,2].map(c=>`<circle cx="${2.3+c*4+(r%2)*2}" cy="${2+r*3}" r=".75" fill="#fffaf0"/>`).join('')).join('')}</g>`}
  return s+`</svg>`}
/* a brushed flag: stripes as tapered ink strokes in red over cream, a blue canton dabbed in */
function inkFlag(k){S=k==='cn'?5:9;let s=`<svg class="kflag" viewBox="0 0 34 24" aria-hidden="true">`;
  if(k==='cn'){s+=brush([[1,6],[12,4.6],[24,5.8],[33,4.8]],9,'#d8261c')+brush([[1,13],[14,12],[26,13.4],[33,12.2]],10,'#d8261c')+brush([[1,19],[16,18.2],[33,19.4]],8,'#d8261c');
    s+=`<path d="M7 4.6l1.5 3.8h4l-3.2 2.4 1.2 3.8L7 12.2l-3.4 2.4 1.2-3.8-3.2-2.4h4z" fill="#ffd21f" stroke="${INK}" stroke-width=".9" stroke-linejoin="round"/>`}
  else{for(let i=0;i<4;i++){const y=4+i*5.4;s+=brush([[1+R(),y],[12,y-.6+R()],[24,y+.5],[33,y-.3]],3.4,'#d8261c')}
    s+=brush([[1.5,5],[7,4],[13,5.2]],10,'#1d3fb0')+[0,1,2].map(c=>`<circle cx="${3.5+c*4}" cy="${4.8+(c%2)}" r=".85" fill="#fff8e6"/>`).join('')}
  return s+brush([[.8,1.2],[17,.4],[33.2,1.4]],1.6,INK)+brush([[33,1],[33.6,12],[32.8,23]],1.4,INK)+brush([[33,23],[16,23.6],[.6,22.8]],1.6,INK)+brush([[.8,23],[.2,12],[1,1]],1.4,INK)+`</svg>`}
/* last five: cut = paper tiles with a white cut tick or cross; ink = brushed tick or cross in green or red */
function l5(x){if(C.inner==='cut')return x.last5.map((s,k)=>`<i class="kt kt-${s}" style="background-image:url(${PAPER[s==='W'?'green':'red']});clip-path:${cut(5,30+k*7+x.i)};transform:rotate(${((k*37+x.i*11)%9-4)}deg)"><svg viewBox="0 0 20 20" aria-hidden="true">${s==='W'?'<path d="M4.5 10.5 L8.5 14.5 L15.8 5.6" fill="none" stroke="#fffaf0" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M5.5 5.5 L14.5 14.5 M14.5 5.5 L5.5 14.5" fill="none" stroke="#fffaf0" stroke-width="3.6" stroke-linecap="round"/>'}</svg></i>`).join('');
  return x.last5.map(s=>HC.mark(s,30,{w:'#2fe58a',l:'#ff4b3e'})).join('')}
function rank(i){if(C.inner==='cut'){const g=i===0;return `<div class="krk">${piece(g?'gold':'cream',cutText('#'+(i+1),{size:30,paper:g?'red':'black',font:'Luckiest Guy'}),'krk-p',60+i)}${g?'':''}</div>`}
  return `<div class="krk krk-ink"><i class="krk-e" style="-webkit-mask-image:url(${I}brush-enso.png);mask-image:url(${I}brush-enso.png);background:${i===0?'#ffd21f':'#fff3d6'}"></i>${inkText(String(i+1),{size:38,col:INK,cls:'krk-n'})}</div>`}
function role(i){const t=ROLE[i];if(C.inner==='cut')return piece(i===0?'gold':i===3?'red':'cream',`<b class="krl-t ${i===3?'krl-w':''}">${P.esc(t)}</b>`,'krl',80+i);
  return swipe(i===0?'#ffd21f':i===3?'#e3342b':'#fff3d6',`<b class="krl-t krl-ink ${i===3?'krl-w':''}">${P.esc(t)}</b>`,'krl','brush-swipe2')}
function stat(lbl,val,sub,col,s,up){if(C.inner==='cut'){return `<div class="kstw">`+piece(col,`<span class="ksl">${lbl}</span>${cutText(val,{size:col==='cream'?27:32,paper:col==='cream'?(up===false?'red':up?'green':'black'):'gold',edge:col==='cream'?'#1b1820':'#fffaf0',cls:'ksv'})}${deco(sub?(up===false?'dn':'up'):'tick')}`,'kst',s,6)+(sub?piece('cream',`<span class="kss">${sub}</span>`,'kco',s+40,3):'')+`</div>`}
  const fill=col==='cream'?'#fff3d6':col==='blue'?'#3d84ff':col==='red'?'#ff5a4a':col==='green'?'#2fd07a':'#ffd21f';
  return swipe(fill,`<span class="ksl ksl-ink">${lbl}</span>${inkText(val,{size:28,cls:'ksv-ink',col:col==='blue'?'#fff8e6':INK})}${sub?`<span class="kss kss-ink">${sub}</span>`:''}`,'kst',s%2?'brush-swipe':'brush-swipe2')}
function mark(m){const M=MODELS[m],c=m==='GROK'?'#15121a':M.c;if(C.inner==='cut')return `<i class="kmk" style="background-image:url(${PAPER[MC[m]]});clip-path:${cut(3,m.length*9)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d}" fill="#fffaf0" fill-rule="${M.fr||'nonzero'}"/></svg></i>`;
  return `<i class="kmk kmk-ink"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d}" fill="${m==='GROK'?'#fff3d6':c}" fill-rule="${M.fr||'nonzero'}"/></svg></i>`}
function name(x){if(C.inner==='cut')return cutText(x.name.toUpperCase(),{size:38,paper:'cream',cls:'knm'});return inkText(x.name.toUpperCase(),{size:40,col:'#fff3d6',cls:'knm knm-ink'})}

const {sec,g}=mount('k-sec');sec.classList.add('k-'+C.inner,'kb-'+C.bg);
if(!document.getElementById('kBlur'))document.body.insertAdjacentHTML('beforeend',`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="kBlur" x="-10%" y="-10%" width="120%" height="130%"><feGaussianBlur stdDeviation="1.3"/></filter>
<filter id="kDry" x="-4%" y="-8%" width="108%" height="116%"><feTurbulence type="fractalNoise" baseFrequency=".9 .12" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 1.7"/><feComposite in="SourceGraphic" operator="in" result="a"/><feTurbulence type="fractalNoise" baseFrequency=".06" seed="8" result="w"/><feDisplacementMap in="a" in2="w" scale="1.8"/></filter></svg>`);
d.models.forEach((x,i)=>{x.i=i;const b=x.best,up=x.pnl>=0;
  const c=document.createElement('article');c.className=`k-c k-r${i+1}`;c.dataset.m=x.m;c.style.setProperty('--hue',HUE[x.m]);
  c.innerHTML=sr(x,i)+`<div class="k-bg" style="background-image:url(${I}${C.bg}-${x.m.toLowerCase()}${C.bg==="scene"?"-2k":""}.jpg)"></div><svg class="k-fr" aria-hidden="true"></svg>
   <div class="k-in" aria-hidden="true">
    <div class="k-top"><div class="k-id">${rank(i)}<div class="k-nmrow">${mark(x.m)}${name(x)}</div>
      <div class="k-ver"><span>${P.esc(x.ver)}</span>${C.inner==='cut'?paperFlag(x.flag):inkFlag(x.flag)}</div>${role(i)}</div>
     <div class="k-pf"><i class="k-pfb"></i>${port(x.m,'k-port')}<svg class="k-pff" aria-hidden="true"></svg></div></div>
    <div class="k-pl"><span class="kpl-l">${C.inner==='cut'?piece('cream','<b>Current P&amp;L</b>','kpl-tag',90+i):`<b class="kpl-ink">Current P&amp;L</b>`}</span><span class="kpl-v"></span></div>
    <div class="k-row">${stat('Right way',`${x.W}/${x.tot}`,'',C.inner==='cut'?'blue':'blue',100+i)}${stat('Best call',money(b.v),`${P.esc(b.r.co)} (${P.esc(b.r.ticker)})`,C.inner==='cut'?(b.v>=0?'cream':'red'):(b.v>=0?'green':'red'),120+i,b.v>=0)}</div>
    <div class="k-l5"><span class="kl5-l">Last 5</span><span class="kl5-t">${l5(x)}</span></div>
   </div>`;
  g.appendChild(c)});
/* second pass, sized to the layout: the P&L in the site's pop lettering, the card's hand-drawn edge, the portrait's frame */
function frame(svg,w,h,o){S=o.s;let s='';svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.setAttribute('width',w);svg.setAttribute('height',h);
  if(o.ink){const e=o.e||5,J=()=>(R()-.5)*o.j;const L=(a,b)=>{const n=4,p=[];for(let k=0;k<=n;k++){const t=k/n;p.push([a[0]+(b[0]-a[0])*t+J(),a[1]+(b[1]-a[1])*t+J()])}return brush(p,o.wd,INK)};
    s+=L([-6,e+J()],[w+6,e+J()])+L([w-e+J(),-6],[w-e+J(),h+6])+L([w+6,h-e+J()],[-6,h-e+J()])+L([e+J(),h+6],[e+J(),-6]);
    if(o.spat)for(let k=0;k<o.spat;k++){const ex=R()<.5?R()*w:(R()<.5?R()*18:w-R()*18),ey=ex>18&&ex<w-18?(R()<.5?R()*16:h-R()*16):R()*h;s+=`<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="${(.6+R()*2.2).toFixed(1)}" fill="${INK}"/>`}}
  svg.innerHTML=s}
function second(){const desk=matchMedia('(min-width:1000px)').matches;
 [...g.children].forEach((c,i)=>{const x=d.models[i],up=x.pnl>=0,w=c.clientWidth,h=c.clientHeight,pl=c.querySelector('.kpl-v');
  pl.innerHTML=P.ext(P.pm(x.pnl),{size:desk?44:54,fill:up?'green':'red',shade:up?'#053b20':'#5e0703',max:c.querySelector('.k-pl').clientWidth-4,depth:7,cls:'kpl-x'});
  if(C.inner==='ink'){frame(c.querySelector('.k-fr'),w,h,{ink:1,wd:11,j:5,e:5,s:3+i*7,spat:14});
    const pf=c.querySelector('.k-pf'),fs=pf.querySelector('.k-pff');frame(fs,pf.clientWidth,pf.clientHeight,{ink:1,wd:7,j:3.4,e:3,s:9+i*5,spat:6})}
  else{c.querySelector('.k-bg').style.clipPath=cut(1.1,200+i*13);c.querySelector('.k-pf').style.setProperty('--cp',cut(2,300+i*3));c.querySelector('.k-pfb').style.clipPath=cut(2.4,310+i*3)}});}
function fitNames(){g.querySelectorAll('.ksv-ink').forEach(n=>{const av=n.closest('.kst').clientWidth-4;let f=parseFloat(getComputedStyle(n).fontSize);while(n.scrollWidth>av&&f>14){f--;n.style.fontSize=f+'px'}});g.querySelectorAll('.knm-ink').forEach(n=>{const row=n.parentElement,av=row.parentElement.clientWidth-(row.firstElementChild.offsetWidth+8);let f=40;n.style.fontSize=f+'px';while(n.scrollWidth>av&&f>18){f--;n.style.fontSize=f+'px'}})}
second();fitNames();if(document.fonts)document.fonts.ready.then(fitNames);if(document.fonts)document.fonts.ready.then(second);
})();
