/* rounds6 (round H13): Hot off the press, second pass under H12's rules. Laid over the live X3+ page by shot.js (it sets window.__R6BASE).
   window.__R6 = {w:'W1'|'W2'|'W3' (phone wire composition; desktop always spans the width), plate:'slate'|'brass' (desktop tally surface),
                  loop:'sway'|'ink', bl:'pencil'|'plain'}.
   - exactly four printed covers of one size (the four newest graded rounds, newest first) plus two or three blank sheets for the prints to come;
   - the tally "Printed at every close · N so far" is chalked on the slate (or engraved on the brass plate on the press), never over the sheets;
   - the only tap is a cover opening its round (navigation: #/round/n, the live slab); no sheet leaves its clip;
   - one small loop: the sheets sway, or the newest print's wet ink runs.
   Every word and number: ROUNDS, UPCOMING, MODELS, CO_LOGOS (ez-data.js). Paintings: Hedra gpt-image-2 (img/, and ../rounds5/img/ for covers and sheets). */
(function(){
const B=window.__R6BASE||'',R5=B+'../rounds5/',O=Object.assign({w:'W1',plate:'slate',loop:'sway',bl:'pencil'},window.__R6||{}),INK='#0d0b10';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rng=s=>()=>((s=Math.imul(s^s>>>15,1|s)+0x6D2B79F5|0,(s^s>>>13)>>>0)/4294967296);
const MO=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const date=s=>{if(!s)return'';const[m,d]=s.split('/');return MO[m-1]+' '+(+d)};
const pct=a=>(a>0?'+':'−')+Math.abs(a).toFixed(2)+'%';
const nm=m=>(MODELS[m]&&MODELS[m].name)||m;
const winners=r=>r.win?r.win.split(' & ').filter(x=>MODELS[x]):[];
function line(r){const w=winners(r);if(!w.length)return'NOBODY WINS!';if(w.length>1)return w.map(x=>nm(x).toUpperCase()).join(' & ')+' TIE!';return nm(w[0]).toUpperCase()+' WINS!'}
function mastC(t){const c=(CO_LOGOS[t]||{}).c;if(!c)return'#ffd21f';const n=parseInt(c.slice(1),16),R=n>>16,G=n>>8&255,Bb=n&255;return(.2126*R+.7152*G+.0722*Bb)<80?'#ffd21f':c}
function wob(seed,x0,y0,x1,y1,k=1.4,n=5){const r=rng(seed);const p=[];const side=(ax,ay,bx,by)=>{for(let i=0;i<n;i++){const t=i/n;p.push([(ax+(bx-ax)*t+(r()-.5)*k).toFixed(1),(ay+(by-ay)*t+(r()-.5)*k).toFixed(1)])}};
 side(x0,y0,x1,y0);side(x1,y0,x1,y1);side(x1,y1,x0,y1);side(x0,y1,x0,y0);return'M'+p.map(q=>q.join(' ')).join('L')+'Z'}
function star(seed,n){const r=rng(seed*97+11);let d='';for(let i=0;i<n*2;i++){const a=i/(n*2)*Math.PI*2,k=i%2?(.6+r()*.12):(.94+r()*.1);d+=(i?'L':'M')+(50+Math.cos(a)*48*k).toFixed(1)+' '+(50+Math.sin(a)*40*k).toFixed(1)}return d+'Z'}
/* ---- the cover: treatment B (rounds5's pick): the painter left the trade dress blank, the live words sit inside the painted shapes ---- */
let DRESS=null;
function cover(r){const d=DRESS[r.n],up=r.a>0;
 if(!d)return`<img class="art" src="${R5}img/cv-r${r.n}.jpg" alt="">`;   /* a round without a measured cover (none today) */
 const bx=d.box,bn=d.banner,bs=d.burst,rb=d.ribbon,x0=Math.max(bn[0],bx[0]+bx[2]+1);
 const at=(b,c,h)=>`<div class="sf ${c}" style="left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%">${h}</div>`;
 return`<img class="art" src="${R5}img/${d.img}.jpg" alt="">`+
  at([x0,bn[1],bn[0]+bn[2]-x0,bn[3]],'bn',`<span class="co">${esc(r.co)}<small>(${esc(r.ticker)})</small></span>`)+
  at(bx,'bx',`<i>No.</i><b>${r.n}</b>`)+
  at(bs,'bs',`<span style="--mv:${up?'#03a85e':'#e22b22'}">${pct(r.a)}</span>`)+
  at(rb,'rb',`<span>${esc(line(r))}</span>`)}
/* the print sheet's own furniture in its margin: crop marks, a colour bar, a registration target */
function marks(r){const R=rng(r.n*3+9),j=()=>((R()-.5)*.6).toFixed(2);const L=(x,y,dx,dy)=>`<path d="M${x+dx*1.5} ${y}h${dx*5}M${x} ${y+dy*1.2}v${dy*4}" stroke="${INK}" stroke-width="1" vector-effect="non-scaling-stroke"/>`;
 const bar=['#fdbc2a','#03c870','#ff3a31',INK].map((c,i)=>`<rect x="${-1+i*5.4}" y="${137+ +j()}" width="5" height="4" fill="${c}" stroke="${INK}" stroke-width=".6" vector-effect="non-scaling-stroke"/>`).join('');
 return`<svg class="r6-mk" viewBox="0 0 100 133.3" preserveAspectRatio="none" style="overflow:visible">${L(0,0,-1,-1)}${L(100,0,1,-1)}${L(0,133.3,-1,1)}${L(100,133.3,1,1)}${bar}<g transform="translate(96 139)"><circle r="2.4" fill="none" stroke="${INK}" stroke-width=".8" vector-effect="non-scaling-stroke"/><path d="M-3.6 0H3.6M0 -3.6V3.6" stroke="${INK}" stroke-width=".8" vector-effect="non-scaling-stroke"/></g></svg>`}
/* wet ink running off the newest print (the 'ink' loop): tapered drops, each its own length and timing */
function drips(r){const R=rng(r.n*11);let p='';const col=[INK,mastC(r.ticker)==='#ffd21f'?'#c42a20':mastC(r.ticker)];
 for(let i=0;i<3;i++){const x=14+R()*72,len=45+R()*55,w=2.2+R()*1.8;
  p+=`<path style="--dd:${(6.5+R()*3).toFixed(1)}s;--dk:${(.4+i*1.7+R()).toFixed(1)}s" d="M${x-w} 0C${x-w*.6} ${len*.5} ${x-w*.9} ${len*.82} ${x} ${len}C${x+w*.9} ${len*.82} ${x+w*.6} ${len*.5} ${x+w} 0Z" fill="${col[i%2]}" stroke="${INK}" stroke-width=".7" vector-effect="non-scaling-stroke"/>`}
 return`<svg class="r6-dr" viewBox="0 0 100 100" preserveAspectRatio="none">${p}</svg>`}
function sheet(r,i){const lab=`Round ${r.n}: ${r.co} (${r.ticker}), ${r.a>0?'up':'down'} ${Math.abs(r.a).toFixed(2)}%, ${line(r).toLowerCase()} Open its graded card.`;
 const wet=O.loop==='ink'&&i===0;
 return`<a class="r6-sh${wet?' wet':''}" href="#/round/${r.n}" data-n="${r.n}" aria-label="${esc(lab)}" style="--p:${(4.2+i*.55).toFixed(2)}s;--dl:${(-i*1.3).toFixed(1)}s;--a:${(1.1-i*.08).toFixed(2)}deg">`+
  `<div class="r6-pp"><div class="r6-cv">${cover(r)}${wet?'<i class="r6-wet"></i>':''}</div><div class="r6-mw">${marks(r)}</div>${wet?drips(r):''}</div>`+
  `<img class="r6-ov" src="${R5}img/spr-sheet.png" alt=""></a>`}
/* a blank sheet for a print still to come. Pencilled: the next round laid out in non-photo blue, as a comic artist roughs a cover:
   the corner box with its number, the company and ticker with the grading day, the empty burst and ribbon where the result will go */
function blank(u,i){const pencil=O.bl==='pencil'&&u;
 const pn=pencil?`<div class="r6-pn"><svg viewBox="0 0 100 133.3" preserveAspectRatio="none">`+
   `<path d="${wob(u.n,3,3,24,24,1.6,3)}" fill="none" stroke="currentColor" stroke-width="1.1" vector-effect="non-scaling-stroke"/>`+
   `<path d="${wob(u.n+2,27,3,97,22,1.8,4)}" fill="none" stroke="currentColor" stroke-width=".9" stroke-dasharray="4 2" vector-effect="non-scaling-stroke"/>`+
   `<g transform="translate(55 76) scale(.42)"><path d="${star(u.n,12)}" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="5 3" vector-effect="non-scaling-stroke"/></g>`+
   `<path d="${wob(u.n+4,6,112,94,127,2,4)}" fill="none" stroke="currentColor" stroke-width=".9" stroke-dasharray="4 2" vector-effect="non-scaling-stroke"/>`+
   `<path d="M10 50Q30 40 45 58T88 52M14 70Q40 64 52 82" fill="none" stroke="currentColor" stroke-width=".6" opacity=".55" vector-effect="non-scaling-stroke"/></svg>`+
   `<span class="p1">No.<b>${u.n}</b></span><span class="p2">${esc(u.co)}</span><span class="p3">(${esc(u.ticker)}) · ${esc(date(u.resolves))}</span></div>`:'';
 const lab=u?`Next print: round ${u.n}, ${u.co}, graded at the close on ${date(u.resolves)}`:'A blank sheet for the next print';
 return`<div class="r6-sh blank" role="img" aria-label="${esc(lab)}" style="--p:${(4.6+i*.4).toFixed(2)}s;--dl:${(-i*.9-2).toFixed(1)}s;--a:${(1.3+i*.1).toFixed(2)}deg"><div class="r6-pp">${pn}</div><img class="r6-ov" src="${R5}img/spr-sheet2.png" alt=""></div>`}
function frame(){const r=rng(41),p=[];const n=7,k=.5;const side=(ax,ay,bx,by)=>{for(let i=0;i<n;i++){const t=i/n;p.push([(ax+(bx-ax)*t+(r()-.5)*k).toFixed(2),(ay+(by-ay)*t+(r()-.5)*k).toFixed(2)])}};
 side(.4,.4,99.6,.4);side(99.6,.4,99.6,99.6);side(99.6,99.6,.4,99.6);side(.4,99.6,.4,.4);
 return`<svg class="r6-fr" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M${p.map(q=>q.join(' ')).join('L')}Z" fill="none" stroke="${INK}" stroke-width="5" vector-effect="non-scaling-stroke"/></svg>`}
/* a drying wire drawn by hand: hooks into the wall at both ends (or runs on past the frame), a slight sag between the clips */
function wire(y,seed,x0=-2,x1=102){const r=rng(seed);let d=`M${x0} ${(6+(r()-.5)).toFixed(1)}`;for(let x=x0+8;x<=x1;x+=8)d+=`L${x} ${(6.6+Math.sin((x-x0)/(x1-x0)*Math.PI)*.9+(r()-.5)*.8).toFixed(2)}`;
 const hook=x=>x>0&&x<100?`<circle cx="${x}" cy="6" r=".7" fill="#fdbc2a" stroke="${INK}" stroke-width="1.2" vector-effect="non-scaling-stroke"/>`:'';
 return`<svg class="r6-wire" style="top:${y}%" viewBox="0 0 100 12" preserveAspectRatio="none"><path d="${d}" fill="none" stroke="${INK}" stroke-width="2.4" vector-effect="non-scaling-stroke"/><path d="${d}" transform="translate(0 -.7)" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width=".7" vector-effect="non-scaling-stroke"/>${hook(x0)}${hook(x1)}</svg>`}
/* ---- compositions. Positions in % of the panel; every printed sheet the same size in a take. ---- */
const LAY={
 /* W1, three a wire: the four newest read left to right, top to bottom, and the line runs on into the blanks */
 W1:{w:29.4,wires:[[13.6,3],[42.2,7]],cells:[[2.9,13.6],[35.3,13.6],[67.7,13.6],[2.9,42.2],[35.3,42.2],[67.7,42.2]],printed:4,blanks:2},
 /* W2, two a wire, big: the wires run on past the frame and a pencilled sheet hangs half out of the picture on each: more is coming */
 W2:{w:35.5,wires:[[12.6,3],[44.6,7]],cells:[[4,12.6],[44.5,12.6],[4,44.6],[44.5,44.6],[85,12.6],[85,44.6]],printed:4,blanks:2},
 /* W3, printed / to come: the four newest on the top wire, the next three pencilled on the wire below, all one size */
 W3:{w:22.8,wires:[[13.4,3],[37.4,7,-2,76]],cells:[[1.7,13.4],[26.3,13.4],[50.9,13.4],[75.5,13.4],[1.7,37.4],[26.3,37.4],[50.9,37.4]],printed:4,blanks:3},
 /* desktop: one wire spans the width, four printed then three to come */
 D:{w:12.4,wires:[[15.2,3]],cells:[0,1,2,3,4,5,6].map(i=>[1.53+i*14.1,15.2]),printed:4,blanks:3}};
let SURF=null;
const PLATE={slate:{ph:'p-slate-9x16',dk:'p-slate-16x9'},brass:{ph:'p-slate-9x16',dk:'p-brass2-16x9'}};
/* the tally: chalked on the slate's black, or engraved into the brass plate on the press (it faces us at an angle: the words follow it) */
function tally(desk,G,occ){const pl=desk?PLATE[O.plate].dk:PLATE[O.plate].ph,s=SURF[pl];let[x,y,w,h]=s;
 if(desk&&O.plate==='brass'){[x,y,w,h]=[40.8,73.5,15.6,20];  /* the plate's inner face, measured by eye on a 2x crop: its top edge falls ~20deg to the right */
  return`<div class="r6-tl brass" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%"><div class="in"><span class="t1">Printed at every close</span><span class="t2"><b>${G}</b> so far</span></div></div>`}
 /* a sheet hanging in front of the slate's top: the chalk goes in the part that still shows */
 const cut=occ(x,x+w);if(cut>y){h=y+h-cut-1;y=cut+1}
 return`<div class="r6-tl chalk" style="left:${x+1.5}%;top:${y+.6}%;width:${w-3}%;height:${h-1.2}%"><div class="in"><span class="t1">Printed at every close</span><span class="t2"><b>${G}</b> so far</span></div></div>`}
function build(){const sec=document.querySelector('#wc-book .wc-season');if(!sec)return;sec.querySelector('.r6')?.remove();
 const desk=innerWidth>=1000,G=ROUNDS.filter(r=>r.a!=null).sort((a,b)=>b.n-a.n),four=G.slice(0,4),U=(window.UPCOMING||[]).slice(0,3);
 const L=LAY[desk?'D':O.w],pl=desk?PLATE[O.plate].dk:PLATE[O.plate].ph,ar=desk?16/9:9/16,hOf=w=>w*(900/576)*ar;
 const items=[...four.map((r,i)=>sheet(r,i)),...[0,1,2].slice(0,L.blanks).map(i=>blank(U[i],i))];
 const ord=L.order||items.map((_,i)=>i);let html='';const boxes=[];
 ord.forEach((k,ci)=>{const c=L.cells[ci];if(!c||!items[k])return;const y=c[1]-hOf(L.w)*.03;boxes.push([c[0],c[0]+L.w,y+hOf(L.w)]);
  html+=items[k].replace('style="','style="left:'+c[0]+'%;top:'+y.toFixed(2)+'%;--w:'+L.w+'%;')});
 const occ=(a,b)=>Math.max(0,...boxes.filter(q=>q[1]>a&&q[0]<b).map(q=>q[2]));
 const box=document.createElement('div');box.className='r6 lp-'+O.loop+(desk?' dk':' '+O.w);box.setAttribute('role','group');box.setAttribute('aria-label','Hot off the press: the four newest graded rounds');
 box.innerHTML=`<div class="r6-st"><img class="r6-pl" src="${B}img/${pl}.jpg" alt="">${L.wires.map(a=>wire(...a)).join('')}`+
  `<div class="r6-ttl"><h2 class="r6-h"><span>Hot off the press</span></h2></div>${tally(desk,G.length,occ)}${html}${frame()}</div>`;
 sec.insertBefore(box,sec.firstChild);fit(box)}
function fit(root){root.querySelectorAll('.sf.bn .co,.sf.rb span,.r6-pn .p2,.r6-tl .t1').forEach(e=>{const p=e.parentElement,cs=getComputedStyle(p);
 const room=(p.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight))*(e.closest('.sf.rb')?.9:1);
 e.style.display='inline-block';let f=parseFloat(getComputedStyle(e).fontSize),g=0;while(Math.max(e.offsetWidth,e.scrollWidth)>room+.5&&f>4&&g++<80){f-=.3;e.style.fontSize=f+'px'}e.style.display=''})}
function start(){Promise.all([window.__R6DRESS?Promise.resolve(window.__R6DRESS):fetch(R5+'dress.json').then(r=>r.json()),fetch(B+'surf.json').then(r=>r.json())])
 .then(([d,s])=>{DRESS=d;SURF=s;build();document.fonts.ready.then(()=>fit(document.querySelector('.r6')||document))})}
let w0=innerWidth;addEventListener('resize',()=>{if((innerWidth>=1000)!==(w0>=1000)){w0=innerWidth;build()}else fit(document.querySelector('.r6')||document)});
window.__R6fit=()=>fit(document.querySelector('.r6'));
start();
})();
