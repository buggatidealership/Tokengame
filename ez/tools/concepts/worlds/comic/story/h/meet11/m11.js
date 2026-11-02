/* Round H28 · meet11: Meet the models, equal chips, big names, the flag as the chip. A mockup laid over the live meet10 (x2p_chips.js +
   x2p_meet10.js) without touching it (the way rank2's r2.js was laid over).
   The owner's order (BRIEF-H.md, Round H28): every chip the same size; ranked top to bottom with a big numeral outside the chip on the left
   (rank2's numerals); the painted "No." box gone; the model's name the biggest word on the chip, its version small beside it; the flag
   becomes the chip (the board's own substrate carries the lab's flag; gen.py paints it); the small flag patch gone. Kept: Season P&L,
   W-L, the quote window, the founder loop, the strip S1.
   Options: window.__M11T = 'a' copper | 'b' mask | 'c' silhouette | 'd' waving (the flag take, chip12<t>-* paintings from gen.py);
            window.__M11L = 'col' (one column, every width; default) | 'grid' (from 1000px a ranked 2x2: 1 2 / 3 4, the strip in the gap);
            window.__M11IMG = the paintings' folder (default this folder's out/).
   Numbers: window.__x2pPnl() (bal - $100,000 = season P&L; W, L), ranks from the chip order meet10 built (season P&L). Nothing typed.
   Names: MODELS[m].name; the version is MODELS[m].ver with the name taken off its front ("Grok 4.7" -> "4.7", "GPT-6 Astra" -> "6 Astra").
   window.__m11 = {layout, measure}. */
(function(){const W=window,D=document;let tries=0;
(function go(){const sec=D.querySelector('section.c8.m10'),four=sec&&sec.querySelector('.c8-four');
 if(!four||!W.__m10||!W.__c8||!D.documentElement.classList.contains('m10-ready')){if(++tries<400)setTimeout(go,50);return}
 try{run(sec,four)}catch(e){W.__m11Err=e;console.error(e)}})();
function run(sec,four){
const T=(W.__M11T||'a').toLowerCase(),LAY=(W.__M11L||'col').toLowerCase(),IMG=W.__M11IMG||'tools/concepts/worlds/comic/story/h/meet11/out/';
const P=W.__x2pPnl(),A=P.A,MD=W.MODELS||{};
const ones=[...four.querySelectorAll('.c8-one')],ms=ones.map(o=>o.dataset.m);ones.forEach((o,i)=>o.dataset.r=i+1);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NM=m=>String((MD[m]&&MD[m].name)||m).toUpperCase();
const VER=m=>{const v=String((MD[m]&&MD[m].ver)||'').trim(),n=String((MD[m]&&MD[m].name)||m);return v.toLowerCase().startsWith(n.toLowerCase())?v.slice(n.length).replace(/^[\s\-–]+/,''):v};
const $=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const J=T==='e';/* D2: the four chips joined into one board, no glare, plain lettering but the name */
sec.classList.add('m11','m11-'+T,'m11-'+LAY);if(J)sec.classList.add('m11-d2');
/* ---------- the chip: new paintings (gen.py) and the live parts moved to the new layout ---------- */
const SZ=[1800,728],pc=(v,t)=>(v/t*100).toFixed(4)+'%';
const at=r=>`left:${pc(r[0],SZ[0])};top:${pc(r[1],SZ[1])};width:${pc(r[2]-r[0],SZ[0])};height:${pc(r[3]-r[1],SZ[1])}`;
const clip=r=>`clip-path:inset(${pc(r[1],SZ[1])} ${pc(SZ[0]-r[2],SZ[0])} ${pc(SZ[1]-r[3],SZ[1])} ${pc(r[0],SZ[0])})`;
const NAME=[408,113,1252,262],PNL=[530,276,946,404],WL=[1046,276,1252,404],SNL=[404,276,526,404],WLL=[950,276,1044,404];
const swap=(im,m)=>{const lm=m.toLowerCase();for(const k of ['src','srcset'])if(im.getAttribute(k))im.setAttribute(k,im.getAttribute(k).replace(/[^ ,]*chip1[01][a-z]?-([a-z]+)-(\d+)\.(jpg|webp)/g,(s,mm,w,x)=>`${IMG}chip12${T}-${mm}-${w}.${x}`))};
const glassOf=e=>{let g=e&&e.nextElementSibling;return g&&g.matches('img.c7-glass')?g:null};
const DEFS=D.createElement('div');DEFS.innerHTML='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="m11gC" x1="0" y1="0" x2="0" y2="1"><stop offset=".05" stop-color="#ffffff"/><stop offset=".55" stop-color="#fff6dc"/><stop offset="1" stop-color="#f0d9a2"/></linearGradient></defs></svg>';sec.prepend(DEFS.firstChild);
ones.forEach(o=>{const m=o.dataset.m,pic=o.querySelector('.c7-pic');
 pic.querySelectorAll('img').forEach(im=>swap(im,m));
 /* No. window off (the numeral outside the chip says it) */
 const no=pic.querySelector('.c8-no');if(no){no.style.display='none';const g=glassOf(no);g&&(g.style.display='none')}
 /* Season P&L: the window shorter, its figure redrawn for the new box (chips8's fit refits it) */
 const d7=pic.querySelector('.c8-d7');if(d7){d7.style.cssText=at(PNL);const g=glassOf(d7);g&&(g.style.clipPath=clip(PNL).slice(10));
  const w=(PNL[2]-PNL[0]),h=(PNL[3]-PNL[1]),fs=h*.58,sv=d7.querySelector('svg'),t=d7.querySelector('text'),gg=t&&t.parentNode;sv.setAttribute('viewBox',`0 0 ${w} ${h}`);
  if(t){t.setAttribute('x',w/2);t.setAttribute('y',(h*.5+fs*.36).toFixed(2));t.setAttribute('font-size',fs.toFixed(2));gg.dataset.w=w*.9;gg.dataset.cx=w/2;gg.dataset.y=(h*.5+fs*.36).toFixed(2)}}
 /* W-L: narrower, its label on the matte at its left (meet10's fitWL refits it to the new box) */
 const wl=pic.querySelector('.m10-wl');if(wl){wl.style.cssText=at(WL);const g=glassOf(wl);g&&(g.style.clipPath=clip(WL).slice(10))}
 const lw=pic.querySelector('.m10-labwl');if(lw){lw.style.cssText=at(WLL);lw.innerHTML='<span>W-L</span>';lw.classList.add('m11-lab')}
 const ls=pic.querySelector('.m10-labsn');if(ls){ls.style.cssText=at(SNL);ls.innerHTML='<span>Season<br>P&amp;L</span>';ls.classList.add('m11-lab')}
 /* the NAME window: the model's name, the biggest word on the chip, its version small beside it, lit cream on the glass */
 const nm=D.createElement('div');nm.className='c7-win m11-nm';nm.style.cssText=at(NAME);nm.innerHTML=`<span class="c7-glow"></span><svg aria-hidden="true"></svg><i class="c7-gl"></i>`;
 const ng=D.createElement('img');ng.className='c7-glass m11-nmg';ng.alt='';ng.src=`${IMG}chip12${T}-${m.toLowerCase()}-1200.jpg`;ng.srcset=`${IMG}chip12${T}-${m.toLowerCase()}-1200.webp 1200w, ${IMG}chip12${T}-${m.toLowerCase()}-1800.webp 1800w`;ng.sizes='(min-width:1000px) 760px, 100vw';ng.style.cssText=clip(NAME);
 const ref=pic.querySelector('.c8-d7')||pic.firstChild;pic.insertBefore(nm,ref);pic.insertBefore(ng,ref);
});
/* ---------- the name, measured on canvas so it fills its window and nothing runs over ---------- */
const cv=D.createElement('canvas').getContext('2d');
const tw=(s,fs,f)=>{cv.font=`${fs}px ${f||'Anton'}`;return cv.measureText(s).width+s.length*fs*.02};
let CAP=.735;const capR=()=>{cv.font='100px Anton';const m=cv.measureText('H');if(m.actualBoundingBoxAscent>40)CAP=m.actualBoundingBoxAscent/100};
const nameLog={};
function names(){capR();ones.forEach(o=>{const m=o.dataset.m,nm=o.querySelector('.m11-nm'),R=nm.getBoundingClientRect();if(!R.width)return;
  const w=R.width,h=R.height,pad=h*.3;let fs=h*.62/CAP;/* the name's cap = 62% of its window's height */
  const N=NM(m),V=VER(m).toUpperCase();let vs=fs*.42;const gap=fs*.16;
  let tot=tw(N,fs)+gap+tw(V,vs,"'Barlow Condensed'");const max=w-pad*2;if(tot>max){const k=max/tot;fs*=k;vs*=k}
  const y=h/2+fs*CAP/2,x=pad,nw=tw(N,fs);
  const sv=nm.querySelector('svg');sv.setAttribute('viewBox',`0 0 ${w} ${h}`);
  sv.innerHTML=`<text class="m11-n" x="${x.toFixed(2)}" y="${y.toFixed(2)}" font-size="${fs.toFixed(2)}">${esc(N)}</text>`+(V?`<text class="m11-v" x="${(x+nw+gap).toFixed(2)}" y="${y.toFixed(2)}" font-size="${vs.toFixed(2)}">${esc(V)}</text>`:'');
  nameLog[m]={cap:+(fs*CAP).toFixed(2),ver:+(vs*.7).toFixed(2)}})}
/* ---------- layout: equal chips, one column (or a ranked 2x2 on desktop) ---------- */
const desk=()=>innerWidth>=1000,grid=()=>LAY==='grid'&&desk();
const L=D.createElement('div');L.className='r2-l m11-l';L.setAttribute('aria-hidden','true');four.append(L);
const CCOL={GROK:'#5b5148',CLAUDE:'#cd5e26',GPT:'#207e49',KIMI:'#3c5691'};
const nums=ones.map((o,i)=>{const e=D.createElement('b');e.className='r2-n'+(i?'':' r2-n1');e.style.setProperty('--cc',CCOL[ms[i]]||'#444');e.innerHTML=`<span>${i+1}</span>`;L.append(e);return e});
/* D2, the join: each chip's pins and rim are cut where it meets the next (clip-path on the picture, painting rows 63 and 661 of 728),
   and the chips are pulled together by those amounts, so the boards butt into one; gen.py's bus traces sit at the same x on every chip and run on across */
const CT=63/728,CB=(728-661)/728;
function join(){ones.forEach((o,i)=>{const pic=o.querySelector('.c7-pic');pic.style.clipPath='';o.style.marginTop='';if(!J)return;
  const h=pic.getBoundingClientRect().height,t=i?CT:0,b=i<ones.length-1?CB:0;pic.style.clipPath=`inset(${(t*100).toFixed(4)}% 0 ${(b*100).toFixed(4)}% 0)`;
  if(i)o.style.marginTop=(-(CB+CT)*h).toFixed(2)+'px'})}
function size(){ones.forEach(o=>{o.style.width=''});sec.classList.toggle('m11-g',grid());if(grid())return;
 const cs=getComputedStyle(four),inner=four.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight),top=Math.min(inner,desk()?760:9e9);
 ones.forEach(o=>{o.style.width=top.toFixed(1)+'px'})}
function strip(){/* one column: rank2's strip down the left, a trace into each chip */
 const g=W.__m10.geo(),sw=g.sw,sp=four.querySelector('.m10-sp'),fr=four.getBoundingClientRect();
 const R=ones.map(o=>{const r=o.querySelector('.c7-pic').getBoundingClientRect();return {x:r.left-fr.left,y:r.top-fr.top,w:r.width,h:r.height}});
 const x0=Math.min(...R.map(r=>r.x)),lane=parseFloat(getComputedStyle(four).getPropertyValue('--m11-sx'))||3,cx=desk()?x0-parseFloat(getComputedStyle(four).getPropertyValue('--m11-sd')||150):lane+sw/2,top=Math.min(...R.map(r=>r.y))-14,bot=Math.max(...R.map(r=>r.y+r.h))+10;
 sp.style.left=(cx-sw/2)+'px';sp.style.top=top+'px';sp.style.height=(bot-top)+'px';sp.style.width=sw+'px';
 [...four.querySelectorAll('.m10-tp')].forEach((t,j)=>{const r=R[j],y=r.y+r.h*.5,h=Math.max(9,r.h*.2),a=cx+sw/2-2,b=r.x+2;t.style.cssText=`left:${a}px;top:${y-h/2}px;width:${Math.max(0,b-a)}px;height:${h}px`;t.classList.remove('m10-rev')});
 ones.forEach(o=>{const h=o.querySelector('.m10-hit');h&&h.classList.remove('m10-rt')})}
cv.font='100px Bangers';const DW={};for(const d of '1234')DW[d]=cv.measureText(d).width/100||.46;
function place(){const fr=four.getBoundingClientRect(),sp=four.querySelector('.m10-sp').getBoundingClientRect(),sR=sp.right-fr.left,sL=sp.left-fr.left;
 const R=ones.map(o=>{const r=o.querySelector('.c7-pic').getBoundingClientRect();return {x:r.left-fr.left,y:r.top-fr.top,w:r.width,h:r.height}});
 nums.forEach((e,i)=>{const r=R[i];let gx,gw;
  if(grid()){const right=r.x>fr.width/2;gx=right?sR+2:Math.max(0,r.x-110);gw=r.x-gx-6}else{gx=desk()?sR+6:sR+2;gw=r.x-gx-(desk()?8:2)}
  const maxH=r.h*.5-Math.max(9,r.h*.2)/2-2,d=String(i+1),fs=Math.min(maxH/.74,gw/DW[d]/1.12,desk()?120:9e9);
  Object.assign(e.style,{left:(gx+gw/2).toFixed(1)+'px',top:(r.y-2+(J&&i?CT*r.h:0)).toFixed(1)+'px',fontSize:fs.toFixed(1)+'px'})})}
let busy=false;
function layout(){if(busy)return;busy=true;try{size();join();W.__m10.layout();names();W.__c8.fit&&W.__c8.fit();if(!grid())strip();place();W.__m10.render(W.__M10T!=null?+W.__M10T:-1)}finally{busy=false}}
let lw=0;new ResizeObserver(()=>{const w=four.clientWidth;if(w!==lw){lw=w;requestAnimationFrame(layout)}}).observe(four);
D.fonts&&D.fonts.ready.then(()=>requestAnimationFrame(layout));layout();
/* screen readers: chips8/meet10's list already reads "No. 1 Grok 4.7, United States. ..." */
W.__m11={layout,names:nameLog,measure:()=>{const fr=four.getBoundingClientRect();const box=e=>{const r=e.getBoundingClientRect();return [r.left-fr.left,r.top-fr.top,r.width,r.height].map(v=>+v.toFixed(1))};
 const ov=(a,b)=>!(a[0]+a[2]<=b[0]||b[0]+b[2]<=a[0]||a[1]+a[3]<=b[1]||b[1]+b[3]<=a[1]);
 const chips=ones.map(o=>box(o.querySelector('.c7-pic'))),N=nums.map(box),sp=box(four.querySelector('.m10-sp'));
 const hits=[];N.forEach((b,i)=>{chips.forEach((c,j)=>{if(ov(b,c))hits.push('n'+(i+1)+'xchip'+(j+1))});if(ov(b,sp))hits.push('n'+(i+1)+'xstrip')});
 /* the name vs every other figure on its chip: cap heights from the drawn glyphs */
 const caps=ones.map(o=>{const q=s=>{const e=o.querySelector(s);if(!e)return 0;const b=e.getBBox?e.getBBox():null;return b?+b.height.toFixed(1):0};
  const nmT=o.querySelector('.m11-n'),nmR=nmT&&nmT.getBoundingClientRect(),d7T=o.querySelector('.c8-d7 text'),d7R=d7T&&d7T.getBoundingClientRect(),wlT=o.querySelector('.m10-wl text'),wlR=wlT&&wlT.getBoundingClientRect(),q2=o.querySelector('.m10-ln text'),qR=q2&&q2.getBoundingClientRect();
  return {m:o.dataset.m,name:nmR?+nmR.height.toFixed(1):0,pnl:d7R?+d7R.height.toFixed(1):0,wl:wlR?+wlR.height.toFixed(1):0,quote:qR?+qR.height.toFixed(1):0,
   nameW:nmR?+nmR.width.toFixed(1):0,nameBox:box(o.querySelector('.m11-nm')),nameRight:nmR?+(o.querySelector('.m11-nm').getBoundingClientRect().right-o.querySelector('.m11-v,.m11-n').getBoundingClientRect().right).toFixed(1):0}});
 const sizes=chips.map(c=>c[2]+'x'+c[3]);
 return {chips,sizes,nums:N,overlap:hits,caps,names:nameLog,h:Math.round(fr.height)}}};
D.documentElement.classList.add('m11-ready');
}})();
