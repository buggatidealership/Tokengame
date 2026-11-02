/* H32: the ledger strip is off (owner, 2026-11-02): its pulse loop never starts */window.__M10T=-1;
/* X2+ MEET THE MODELS, H26 meet10, the owner's pick (2026-11-02): drop-in, load after tools/v22/story/x2p_chips.js (chips8 take c) and its CSS after x2p_chips.css.
   The strip S1 by default (window.__M10S='s2' gives the tape). Images from media/.
   Media (written out so make_site.py copies them; copy them flat into ez/media/ first): H34 (chip15, the board in the model's unit colour, the flag panel a solid inlay; tools/concepts/worlds/comic/story/h/meet14/chip14.py without the LAST 5 band): media/chip15-grok-1200.jpg media/chip15-grok-1200.webp media/chip15-grok-1800.jpg media/chip15-grok-1800.webp media/chip15-claude-1200.jpg media/chip15-claude-1200.webp media/chip15-claude-1800.jpg media/chip15-claude-1800.webp media/chip15-gpt-1200.jpg media/chip15-gpt-1200.webp media/chip15-gpt-1800.jpg media/chip15-gpt-1800.webp media/chip15-kimi-1200.jpg media/chip15-kimi-1200.webp media/chip15-kimi-1800.jpg media/chip15-kimi-1800.webp Before: media/chip12-grok-1200.jpg media/chip12-grok-1200.webp media/chip12-grok-1800.jpg media/chip12-grok-1800.webp media/chip12-claude-1200.jpg media/chip12-claude-1200.webp media/chip12-claude-1800.jpg media/chip12-claude-1800.webp media/chip12-gpt-1200.jpg media/chip12-gpt-1200.webp media/chip12-gpt-1800.jpg media/chip12-gpt-1800.webp media/chip12-kimi-1200.jpg media/chip12-kimi-1200.webp media/chip12-kimi-1800.jpg media/chip12-kimi-1800.webp media/mb-strip.webp media/mb-strip.jpg media/mb-bundle.webp media/mb-bundle.jpg */
window.__M10IMG=window.__M10IMG||"media/";window.__M10BUS=window.__M10BUS||"media/";window.__M10S=window.__M10S||"s1";
/* Round H26 · meet10, the owner's pick (2026-11-02): Meet the models, the quote in the chip, fed by the ledger strip. Laid over the live chips8 take c
   (x2p_chips.js) without touching it. The chip now reads: name and No. · SEASON P&L (the big window) · W-L · the quote.
     LAST 7 DAYS window -> the SEASON P&L, full figure ("+$148,480"), green or red, the biggest figure; the painted "LAST 7 DAYS" label is gone (gen.py, chip11-*)
                           and a live "SEASON" label sits in its place. The No. order (ranked by season P&L) now explains itself on the chip.
     LAST ROUND window  -> the W-L record, W in green light, L in red; the painted "LAST ROUND" label is gone, a live "W-L" label in its place.
     SEASON window      -> the computed quote (x2p_chips.js LINE, read from the live balloon so it stays computed), in one tall glass window 9-sliced from
                           the chip's own SEASON window (gen.py), one size on all four chips, a sentence per line. The balloons leave.
   The strip (window.__M10S): 's1' THE STRIP (default; meetbus A): the ledger glass down the left, the 12 newest graded rounds running up it on their side;
     's2' THE TAPE: each round a flat ticket (round, the company's mark, the move). As a round passes a chip's trace, a pulse runs into that chip, green if
     that model's trade on it went the right way, red if not, and lands on the W-L window: the W lights (green) or the L (red). A model that did not trade
     a round gets no pulse. Desktop (2x2): the strip runs down the column gap and feeds both columns.
   Data, live: __x2pPnl().A (W, L, bal, per[n].v), ROUNDS, MODELS, CO_LOGOS. Nothing typed.
   Motion: one deterministic clock (window.__M10T freezes it), transforms, opacity and CSS variables only, no perspective; only while the section is near the
   screen; still with reduced motion (the newest round, each trace and its W or L lit). Options: window.__M10IMG (paintings), window.__M10BUS (strip and traces).
   window.__m10 = {layout, render, state, fit, geo}. */
(function(){const W=window,D=document;let tries=0;
(function go(){const sec=D.querySelector('section.c8'),four=sec&&sec.querySelector('.c8-four');
 if(!four||!W.__x2pPnl||!W.ROUNDS||four.querySelectorAll('.c8-one').length<4){if(++tries<400)setTimeout(go,50);return}
 try{run(sec,four)}catch(e){W.__m10Err=e;console.error(e)}})();
function run(sec,four){
const S=(W.__M10S||'s1').toLowerCase(),N=W.__M10N||12;
const IMG=W.__M10IMG||'tools/concepts/worlds/comic/story/h/meet10/out/',BUS=W.__M10BUS||'tools/concepts/worlds/comic/story/h/meetbus/out/pub/',MED='media/';
const P=W.__x2pPnl(),A=P.A,CL=W.CO_LOGOS||{},MD=W.MODELS||{};
const G=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)).slice(-N);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const mv=r=>String(r.out||'').replace(/^-/,'−');
const mv1=r=>{const v=+r.a;return isNaN(v)?mv(r):(v<0?'−':'+')+Math.abs(v).toFixed(1)+'%'};/* the tape's short form, one decimal, from the sheet's own number */
const vd=(m,r)=>{const q=A[m]&&A[m].per[r.n];return q?(q.v>0?'ok':'no'):null};
const $=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const pct=(v,t)=>(v/t*100).toFixed(4)+'%';
const SZ=[1800,728],at=r=>`left:${pct(r[0],SZ[0])};top:${pct(r[1],SZ[1])};width:${pct(r[2]-r[0],SZ[0])};height:${pct(r[3]-r[1],SZ[1])}`;
const clip=r=>`clip-path:inset(${pct(r[1],SZ[1])} ${pct(SZ[0]-r[2],SZ[0])} ${pct(SZ[1]-r[3],SZ[1])} ${pct(r[0],SZ[0])})`;
/* geometry in the 1800 painting (gen.py): the quote window, its text box inside the bezel, the W-L label, the SEASON label (where LAST 7 DAYS was) */
const LW=[408,418,1251,603],LT=[434,436,1225,585],WLL=[998,372,1247,414],SNL=[404,262,532,330];
sec.classList.add('m10','m10-'+S);
['strip','bundle'].forEach(k=>sec.style.setProperty('--mb-'+k,`image-set(url("${BUS}mb-${k}.webp") type("image/webp"),url("${BUS}mb-${k}.jpg") type("image/jpeg"))`));
const ones=[...four.querySelectorAll('.c8-one')],ms=ones.map(o=>o.dataset.m);
/* ---------- the chips ---------- */
const line={};
ones.forEach(o=>{const m=o.dataset.m,b=o.querySelector('.c8-bal span');line[m]=b?b.textContent.trim():'';
 const pic=o.querySelector('.c7-pic'),lm=m.toLowerCase();
 pic.querySelectorAll('img').forEach(im=>{for(const k of ['src','srcset'])if(im.getAttribute(k))im.setAttribute(k,im.getAttribute(k).replace(/[^ ,]*chip8c-([a-z]+)-(\d+)\.(jpg|webp)/g,(s,mm,w,x)=>`${IMG}chip15-${mm}-${w}.${x}`));if(im.getAttribute('sizes'))im.setAttribute('sizes','(min-width:1000px) 600px, calc(100vw - 72px)')});
 /* the SEASON window and its glass: off */
 const se=pic.querySelector('.c8-se');if(se){se.style.display='none';const g=se.nextElementSibling;if(g&&g.matches('img.c7-glass'))g.style.display='none'}
 /* LAST ROUND -> W-L */
 const lr=pic.querySelector('.c8-lr');lr.className='c7-win m10-wl';lr.innerHTML='<span class="c7-glow"></span><i class="m10-fl m10-flw"></i><i class="m10-fl m10-fll"></i><svg aria-hidden="true"></svg><i class="c7-gl"></i>';
 /* the line window: dark glass, the text, the glare, the painting's own glass screened back on top */
 const lw=D.createElement('div');lw.className='c7-win m10-ln';lw.style.cssText=at(LW);lw.innerHTML='<span class="c7-glow"></span><svg aria-hidden="true"></svg><i class="c7-gl"></i>';
 const gl=D.createElement('img');gl.className='c7-glass m10-lng';gl.alt='';gl.src=`${IMG}chip15-${lm}-1200.jpg`;gl.srcset=`${IMG}chip15-${lm}-1200.webp 1200w, ${IMG}chip15-${lm}-1800.webp 1800w`;gl.sizes='(min-width:1000px) 580px, 100vw';gl.style.cssText=clip(LW);
 lr.parentNode.insertBefore(lw,lr);lr.parentNode.insertBefore(gl,lr);
 /* the printed labels, live, in the painted labels' type */
 const lb=D.createElement('div');lb.className='m10-lab m10-labwl';lb.style.cssText=at(WLL);lb.innerHTML='<span>W-L</span>';pic.append(lb);
 /* LAST 7 DAYS -> SEASON P&L: the same lit window, its figure and colour swapped (chips8's own fit refits it) */
 const d7=pic.querySelector('.c8-d7'),p=A[m].bal-1e5;if(d7){d7.className='c7-win c8-d7 '+(p>=0?'c7-up':'c7-dn');const sv=d7.querySelector('svg'),t=d7.querySelector('text'),vh=sv.viewBox.baseVal.height;
   if(t){t.textContent=$(p);t.setAttribute('font-size',(vh*.66).toFixed(2));t.setAttribute('y',(vh*.5+vh*.66*.36).toFixed(2));const g=t.parentNode;g.dataset.y=t.getAttribute('y')}}
 const sl=D.createElement('div');sl.className='m10-lab m10-labsn';sl.style.cssText=at(SNL);sl.innerHTML='<span>Season</span>';pic.append(sl);
});
/* ---------- text: canvas metrics of Anton, so the fit is measured, not guessed ---------- */
const cv=D.createElement('canvas').getContext('2d');
const tw=(s,fs)=>{cv.font=`${fs}px Anton`;return cv.measureText(s).width+s.length*fs*.02};
let CAP=.735;const capR=()=>{cv.font='100px Anton';const m=cv.measureText('H');if(m.actualBoundingBoxAscent>40)CAP=m.actualBoundingBoxAscent/100};
let CAP0;const LH=1.1,CAPMIN=9,CAPMAX=16;
function bal(words,fs){let b=null;for(let i=1;i<words.length;i++){const a=words.slice(0,i).join(' '),c=words.slice(i).join(' '),mx=Math.max(tw(a,fs),tw(c,fs));if(!b||mx<b.mx)b={mx,L:[a,c]}}return b?b.L:[words.join(' ')]}
function wrap(txt,w,fs,bySentence){const parts=bySentence?txt.match(/[^.!?]+[.!?]+/g)||[txt]:[txt],out=[];
  for(const p of parts){const ws=p.trim().split(/\s+/),g=[];let cur='';for(const word of ws){const t=cur?cur+' '+word:word;if(tw(t,fs)<=w||!cur)cur=t;else{g.push(cur);cur=word}}cur&&g.push(cur);
    /* a sentence that needs two lines is split where the two come out most even (no orphan word) */
    if(g.length===2){const b2=bal(ws,fs);out.push(...(b2.every(x=>tw(x,fs)<=w)?b2:g))}else out.push(...g)}return out}
const fitLog={};
function plan(o,cap){const lw=o.querySelector('.m10-ln'),R=lw.getBoundingClientRect();if(!R.width)return null;const k=R.width/(LW[2]-LW[0]),w=(LT[2]-LT[0])*k,h=(LT[3]-LT[1])*k,fs=cap/CAP,maxL=Math.max(1,Math.floor(h/(fs*LH)+.02)),txt=line[o.dataset.m];
  for(const bs of [true,false]){const L=wrap(txt,w,fs,bs);if(L.length<=maxL&&L.every(s=>tw(s,fs)<=w+.5))return {cap,fs,L,w,h,k,R}}return null}
function fitLines(){let cap=CAPMAX,ok=null;for(;cap>=5;cap-=.25){const ps=ones.map(o=>plan(o,cap));if(ps.every(Boolean)){ok=ps;break}}if(!ok)return;
  ones.forEach((o,j)=>{const b=ok[j],m=o.dataset.m,lw=o.querySelector('.m10-ln'),fs=b.fs,n=b.L.length,x0=(LT[0]-LW[0])*b.k,y0=(LT[1]-LW[1])*b.k,top=y0+(b.h-n*fs*LH)/2;
    const sv=lw.querySelector('svg');sv.setAttribute('viewBox',`0 0 ${b.R.width} ${b.R.height}`);
    sv.innerHTML=b.L.map((s,i)=>`<text x="${(x0+b.w/2).toFixed(2)}" y="${(top+fs*LH*i+fs*LH/2+fs*CAP/2).toFixed(2)}" font-size="${fs.toFixed(2)}" text-anchor="middle">${esc(s)}</text>`).join('');
    fitLog[m]={cap:+b.cap.toFixed(2),fs:+fs.toFixed(2),lines:b.L,box:[+b.w.toFixed(1),+b.h.toFixed(1)],widest:+Math.max(...b.L.map(s=>tw(s,fs))).toFixed(1),under:b.cap<CAPMIN}})}
function fitWL(o){const m=o.dataset.m,wl=o.querySelector('.m10-wl'),R=wl.getBoundingClientRect(),a=A[m],h=R.height,fs=h*.6,sv=wl.querySelector('svg');
  sv.setAttribute('viewBox',`0 0 ${R.width} ${h}`);let k=1;const Ws=String(a.W),Ls=String(a.L),dw=tw('-',fs)*1.1,ww=tw(Ws,fs),lw2=tw(Ls,fs),tot=ww+dw+lw2,max=R.width*.84;if(tot>max)k=max/tot;
  const f=fs*k,cx=R.width/2-(ww-lw2)*k/2,y=h/2+f*CAP/2,d2=dw*k/2;
  const t=(cls,x,an,s)=>`<text class="${cls}" x="${x.toFixed(2)}" y="${y.toFixed(2)}" font-size="${f.toFixed(2)}" text-anchor="${an}">${s}</text>`;
  sv.innerHTML=t('m10-w',cx-d2,'end',Ws)+t('m10-dash',cx,'middle','-')+t('m10-l',cx+d2,'start',Ls)+t('m10-w m10-hot',cx-d2,'end',Ws)+t('m10-l m10-hot',cx+d2,'start',Ls);
  wl.style.setProperty('--wx',((cx-d2-ww*k/2)/R.width*100).toFixed(1)+'%');wl.style.setProperty('--lx',((cx+d2+lw2*k/2)/R.width*100).toFixed(1)+'%')}
/* the painted labels' cap is 29 units of the 1800 painting; Barlow Condensed's cap is .7 em */
function fitLabels(){sec.querySelectorAll('.m10-lab').forEach(l=>{const pw=l.parentNode.getBoundingClientRect().width;l.style.fontSize=(pw*29/1800/.7).toFixed(2)+'px'})}
/* ---------- the strip ---------- */
const L=D.createElement('div');L.className='m10-l';L.setAttribute('aria-hidden','true');four.prepend(L);
const sp=D.createElement('div');sp.className='m10-sp';L.append(sp);sp.innerHTML='<div class="m10-gl"><div class="m10-col"></div><i class="m10-glare"></i></div>';
const col=sp.querySelector('.m10-col');
if(S==='s1')col.innerHTML=G.map(r=>`<span class="m10-lb"><b>R${r.n}</b> ${esc(r.co)} (${esc(r.ticker)}) <i>${esc(mv(r))}</i></span>`).join('').repeat(2);
else col.innerHTML=G.map(r=>{const lg=CL[String(r.ticker).toUpperCase()],f=lg&&(lg.f||lg);
  return `<span class="m10-tk"><b>R${r.n}</b>${f?`<img class="m10-lg" data-src="${MED+f}" alt="">`:`<em>${esc(r.ticker)}</em>`}<i>${esc(mv1(r))}</i></span>`}).join('').repeat(2);
/* a logo shown as the glass's own warm light (as the live LAST ROUND logo), so green and red stay the verdict's */
col.querySelectorAll('img.m10-lg[data-src]').forEach(im=>{const s=im.dataset.src;im.removeAttribute('data-src');const o=new Image();o.onload=()=>{try{const c=D.createElement('canvas'),n=48;c.width=c.height=n;const x=c.getContext('2d');x.drawImage(o,0,0,n,n);const d=x.getImageData(0,0,n,n).data;
  const tile=[0,n-1,n*(n-1),n*n-1].every(i=>d[i*4+3]>200);let L=0,c2=0;for(let i=0;i<d.length;i+=4)if(d[i+3]>128){L+=.2126*d[i]+.7152*d[i+1]+.0722*d[i+2];c2++}
  /* the mark in the glass's own amber light, its inner detail kept (grey levels, dark marks inverted): green and red stay the verdict's */
  im.classList.add(tile?'m10-tile':(c2&&L/c2/255<.5?'m10-dk':'m10-lt'))}catch(e){im.classList.add('m10-col')}im.src=s};o.onerror=()=>{im.src=s};o.src=s});
/* one size for every move on the tape, the widest fitted to the glass */
function fitTape(){if(S!=='s2')return;const g=sp.querySelector('.m10-gl'),gw=g.getBoundingClientRect().width,base=parseFloat(col.style.getPropertyValue('--fs'))||11.5;
  const mx=Math.max(...G.map(r=>tw(mv1(r),base)));col.style.setProperty('--mfs',Math.min(base,base*gw*.9/mx).toFixed(2)+'px')}
const taps=ones.map(o=>{const t=D.createElement('div');t.className='m10-tp';t.innerHTML='<i class="m10-tl"></i><i class="m10-ph"></i>';L.append(t);
  const h=D.createElement('i');h.className='m10-hit';o.querySelector('.c7-pic').append(h);return {o,t,h,m:o.dataset.m,wl:o.querySelector('.m10-wl')}});
let Gm={};
function layout(){capR();W.__c8&&W.__c8.fit&&W.__c8.fit();fitLines();ones.forEach(fitWL);fitLabels();
  const fr=four.getBoundingClientRect(),desk=fr.width>=700;sec.classList.toggle('m10-desk',desk);
  const R=taps.map(x=>{const r=x.o.querySelector('.c7-pic').getBoundingClientRect();return {x:r.left-fr.left,y:r.top-fr.top,w:r.width,h:r.height}});
  const sw=S==='s1'?(desk?46:32):(desk?78:54);
  let cx;if(desk){cx=(Math.max(...R.filter(r=>r.x<fr.width/2).map(r=>r.x+r.w))+Math.min(...R.filter(r=>r.x>=fr.width/2).map(r=>r.x)))/2}else cx=3+sw/2;
  const top=Math.min(...R.map(r=>r.y))-(desk?60:14),bot=Math.max(...R.map(r=>r.y+r.h))+10;
  sp.style.cssText=`left:${cx-sw/2}px;top:${top}px;width:${sw}px;height:${bot-top}px;--sw:${sw}px`;
  Gm={cx,sw,top,bot,desk,R};
  taps.forEach((x,j)=>{const r=R[j],left=!desk||r.x>cx,y=r.y+r.h*.5,h=Math.max(9,r.h*.2);
    const x0=left?cx+sw/2-2:r.x+r.w-2,x1=left?r.x+2:cx-sw/2+2;x.left=left;x.y=y;x.len=Math.max(0,x1-x0);
    x.t.style.cssText=`left:${x0}px;top:${y-h/2}px;width:${x.len}px;height:${h}px`;x.t.classList.toggle('m10-rev',!left);x.h.classList.toggle('m10-rt',!left)});
  col.style.setProperty('--fs',(S==='s1'?(desk?17:13):(desk?15:11.5))+'px');fitTape();
  requestAnimationFrame(()=>{const lb=[...col.children],n=G.length;Gm.lab=lb.slice(0,n).map((e,k)=>({k,c:e.offsetTop+e.offsetHeight/2}));Gm.LL=lb[n].offsetTop-lb[0].offsetTop;render(now())})}
const RM=matchMedia('(prefers-reduced-motion: reduce)');
const now=()=>W.__M10T!=null?+W.__M10T:(RM.matches?-1:performance.now());
const V=24,TR=520,HOLD=1600;
const set=(x,v,i,u,land)=>{for(const e of [x.t,x.h])e.classList.remove('m10-ok','m10-no');if(v){x.t.classList.add('m10-'+v);x.h.classList.add('m10-'+v)}
  x.t.style.setProperty('--i',i.toFixed(3));x.h.style.setProperty('--i',land.toFixed(3));x.t.style.setProperty('--u',u.toFixed(3));
  x.wl.style.setProperty('--fw',(v==='ok'?land:0).toFixed(3));x.wl.style.setProperty('--fl',(v==='no'?land:0).toFixed(3))};
function render(t){if(!Gm.lab)return;const still=t<0,LL=Gm.LL,gt=sp.querySelector('.m10-gl').getBoundingClientRect(),ft=four.getBoundingClientRect(),off=gt.top-ft.top,H=gt.height;
  const s=still?(Gm.lab[G.length-1].c-H*.5+LL)%LL:(t/1000*V)%LL;col.style.transform=`translateY(${(-s-LL+H).toFixed(2)}px)`;
  taps.forEach(x=>{if(still){const v=vd(x.m,G[G.length-1]);set(x,v,v?.6:0,1,v?.8:0);x.r=G[G.length-1];return}
    let best=null;for(const L0 of Gm.lab){const yy=x.y-off-H+LL,sS=L0.c-yy,ds=(((s-sS)%LL)+LL)%LL,dt=ds/V*1000;if(best===null||dt<best.dt)best={dt,r:G[L0.k]}}
    const v=vd(x.m,best.r),u=Math.min(1,best.dt/TR),i=best.dt<TR?1:Math.max(0,1-(best.dt-TR)/1400),land=best.dt<TR?0:Math.max(0,1-(best.dt-TR)/HOLD);x.r=best.r;
    set(x,v,v?Math.max(i,.12):0,u,v?land:0)})}
let raf=0,vis=false;const loop=()=>{raf=0;if(!vis||W.__M10T!=null||RM.matches)return;render(now());raf=requestAnimationFrame(loop)};
new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(loop)},{rootMargin:'120px 0px'}).observe(sec);
let lwid=0;new ResizeObserver(()=>{const w=four.clientWidth;if(w!==lwid){lwid=w;layout()}}).observe(four);
D.fonts&&D.fonts.ready.then(layout);layout();
/* screen readers: chips8's list rewritten for the new chip (no "Last 7 days", no "Last round"); its last item (the models in inference) stays */
const CC={GPT:'United States',CLAUDE:'United States',GROK:'United States',KIMI:'China'};
const srl0=sec.querySelector('ol.ch-sr');if(srl0){const li=[...srl0.children];ones.forEach((o,i)=>{const m=o.dataset.m;if(li[i])li[i].textContent=`No. ${i+1} ${(MD[m]&&MD[m].ver)||m}${CC[m]?', '+CC[m]:''}. ${line[m]} Season P&L: ${$(A[m].bal-1e5)}. W-L: ${A[m].W}-${A[m].L}.`})}
const srl=D.createElement('p');srl.className='ch-sr';srl.textContent='The ledger, newest rounds: '+G.slice().reverse().slice(0,4).map(r=>`round ${r.n}, ${r.co}, ${mv(r)}: `+ms.map(m=>{const v=vd(m,r);return v?`${m} ${v==='ok'?'right':'wrong'}`:''}).filter(Boolean).join(', ')).join('; ')+'.';sec.append(srl);
W.__m10={layout,render,fit:fitLog,geo:()=>Gm,seq:G.map(r=>r.n),
 state:t=>{render(t);return taps.map(x=>({m:x.m,r:x.r&&x.r.n,i:+x.t.style.getPropertyValue('--i'),u:+x.t.style.getPropertyValue('--u'),land:+x.h.style.getPropertyValue('--i'),v:x.t.classList.contains('m10-ok')?'ok':x.t.classList.contains('m10-no')?'no':null}))}};
D.documentElement.classList.add('m10-ready');
}})();
/* Round H28 · meet11 D2, the owner's pick (2026-11-02: "D2 works as it is"), ported from tools/concepts/worlds/comic/story/h/meet11/ (m11.js take e).
   Laid over meet10 above, after it has built (html.m10-ready):
   - every chip the same size, one column at every width (desktop at most 600px, so the 1800px paintings stay 3x the chip);
   - the rank as a big extruded numeral outside each chip on the left (#1 gold), the painted "No." box off;
   - the paintings chip12-<m> (gen.py take e): one tall NAME window across the panel's top row (the name live, the biggest word on the chip, the version
     small beside it, from MODELS.ver with the name taken off its front), shorter Season P&L and W-L windows with their labels on the matte at their left,
     the flag patch gone and the gold plate moved down, the lab's flag waving in the board itself (US, China), a bus of gold traces to the board's edges;
   - one board of four: each chip's pins and rim are cut where it meets the next (clip-path rows 63 and 661 of 728) and the chips pulled together, so the
     bus lines run on from chip to chip; the No. 5 chip stays apart;
   - no glare on the display windows; every figure, label and the quote written plainly (no glow, no sheen); only the name keeps its light.
   Numbers: live as in meet10 (__x2pPnl, the computed line). Nothing new moves. window.__m11 = {layout, measure}. */
(function(){const W=window,D=document;let tries=0;
(function go(){const sec=D.querySelector('section.c8.m10'),four=sec&&sec.querySelector('.c8-four');
 if(!four||!W.__m10||!W.__c8||!D.documentElement.classList.contains('m10-ready')){if(++tries<400)setTimeout(go,50);return}
 try{run(sec,four)}catch(e){W.__m11Err=e;console.error(e)}})();
function run(sec,four){
const MD=W.MODELS||{};
const ones=[...four.querySelectorAll('.c8-one')],ms=ones.map(o=>o.dataset.m);ones.forEach((o,i)=>o.dataset.r=i+1);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NM=m=>String((MD[m]&&MD[m].name)||m).toUpperCase();
const VER=m=>{const v=String((MD[m]&&MD[m].ver)||'').trim(),n=String((MD[m]&&MD[m].name)||m);return v.toLowerCase().startsWith(n.toLowerCase())?v.slice(n.length).replace(/^[\s\-–]+/,''):v};
sec.classList.add('m11','m11-d2');
/* H34: the flag patch (meet14 m14.js patch(), verbatim but for ids): a hand-cut cloth outline, the flag woven in, a stitch line, a hard shadow */
const f1=v=>(+v).toFixed(1);
function m15star(cx,cy,r,rot){let p=[];for(let i=0;i<10;i++){const a=(rot||0)-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r;p.push(f1(cx+Math.cos(a)*rr)+','+f1(cy+Math.sin(a)*rr))}return p.join(' ')}
function m15patch(cc,cx,cy,w,rot,m){const id='m15pt'+m,h=w*.64,x=-w/2,y=-h/2,r=w*.13;
  const j=[.010,-.008,.012,-.006,.009,-.011,.007,-.01];const q=(a,b,k)=>`${f1(a+j[k%8]*w)},${f1(b+j[(k+3)%8]*w)}`;
  const o=`M${q(x+r,y,0)} Q${q(0,y-h*.03,1)} ${q(x+w-r,y,2)} Q${q(x+w,y,3)} ${q(x+w,y+r,4)} Q${q(x+w+w*.02,0,5)} ${q(x+w,y+h-r,6)} Q${q(x+w,y+h,7)} ${q(x+w-r,y+h,0)} Q${q(0,y+h+h*.03,1)} ${q(x+r,y+h,2)} Q${q(x,y+h,3)} ${q(x,y+h-r,4)} Q${q(x-w*.02,0,5)} ${q(x,y+r,6)} Q${q(x,y,7)} ${q(x+r,y,0)}Z`;
  const ix=x+w*.09,iy=y+h*.13,iw=w*.82,ih=h*.74;let fl='';
  if(cc==='us'){for(let i=0;i<13;i++)fl+=`<rect x="${f1(ix)}" y="${f1(iy+i*ih/13)}" width="${f1(iw)}" height="${f1(ih/13+.5)}" fill="${i%2?'#f3ead6':'#c8312c'}"/>`;
    const cw=iw*.44,ch=ih*7/13;fl+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(cw)}" height="${f1(ch)}" fill="#25366f"/>`;
    for(let a=0;a<4;a++)for(let b=0;b<5;b++)fl+=`<circle cx="${f1(ix+cw*(.12+b*.19+(a%2)*.09))}" cy="${f1(iy+ch*(.15+a*.24))}" r="${f1(ih*.026)}" fill="#f3ead6"/>`}
  else{fl+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" fill="#cf2f26"/>`;const s=ih;
    fl+=`<polygon points="${m15star(ix+iw*.18,iy+s*.3,s*.17,0)}" fill="#ffd21f"/>`;[[.36,.12,.3],[.44,.24,.9],[.44,.42,0],[.36,.54,.4]].forEach(([a,b,t])=>fl+=`<polygon points="${m15star(ix+iw*a,iy+s*b,s*.06,t)}" fill="#ffd21f"/>`)}
  return `<g transform="translate(${f1(cx)} ${f1(cy)}) rotate(${rot||0})">
    <path d="${o}" transform="translate(${f1(w*.035)} ${f1(h*.07)})" fill="rgba(0,0,0,.62)"/>
    <path d="${o}" fill="#1b1712"/><clipPath id="${id}"><rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" rx="${f1(w*.05)}"/></clipPath>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>
    <g clip-path="url(#${id})">${fl}<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" fill="url(#${id}s)"/></g>
    <rect x="${f1(x+w*.05)}" y="${f1(y+h*.08)}" width="${f1(w*.9)}" height="${f1(h*.84)}" rx="${f1(w*.08)}" fill="none" stroke="#e9dcc0" stroke-width="${f1(w*.018)}" stroke-dasharray="${f1(w*.035)} ${f1(w*.025)}" opacity=".85"/></g>`}
const SZ=[1800,728],pc=(v,t)=>(v/t*100).toFixed(4)+'%';
const at=r=>`left:${pc(r[0],SZ[0])};top:${pc(r[1],SZ[1])};width:${pc(r[2]-r[0],SZ[0])};height:${pc(r[3]-r[1],SZ[1])}`;
/* the new windows in the 1800 painting (gen.py) */
const NAME=[408,113,1252,262],PNL=[530,276,946,404],WL=[1046,276,1252,404],SNL=[404,276,526,404],WLL=[950,276,1044,404];
const glassOf=e=>{let g=e&&e.nextElementSibling;return g&&g.matches('img.c7-glass')?g:null};
const DF=D.createElement('div');DF.innerHTML='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="m11gC" x1="0" y1="0" x2="0" y2="1"><stop offset=".05" stop-color="#ffffff"/><stop offset=".55" stop-color="#fff6dc"/><stop offset="1" stop-color="#f0d9a2"/></linearGradient></defs></svg>';sec.prepend(DF.firstChild);
ones.forEach(o=>{const m=o.dataset.m,pic=o.querySelector('.c7-pic');
 const no=pic.querySelector('.c8-no');if(no){no.style.display='none';const g=glassOf(no);g&&(g.style.display='none')}
 const d7=pic.querySelector('.c8-d7');if(d7){d7.style.cssText=at(PNL);
  const w=PNL[2]-PNL[0],h=PNL[3]-PNL[1],fs=h*.58,sv=d7.querySelector('svg'),t=d7.querySelector('text'),gg=t&&t.parentNode;sv.setAttribute('viewBox',`0 0 ${w} ${h}`);
  if(t){t.setAttribute('x',w/2);t.setAttribute('y',(h*.5+fs*.36).toFixed(2));t.setAttribute('font-size',fs.toFixed(2));gg.dataset.w=w*.9;gg.dataset.cx=w/2;gg.dataset.y=(h*.5+fs*.36).toFixed(2)}}
 const wl=pic.querySelector('.m10-wl');if(wl)wl.style.cssText=at(WL);
 const lw=pic.querySelector('.m10-labwl');if(lw){lw.style.cssText=at(WLL);lw.innerHTML='<span>W-L</span>';lw.classList.add('m11-lab')}
 const ls=pic.querySelector('.m10-labsn');if(ls){ls.style.cssText=at(SNL);ls.innerHTML='<span>Season<br>P&amp;L</span>';ls.classList.add('m11-lab')}
 const nm=D.createElement('div');nm.className='c7-win m11-nm';nm.style.cssText=at(NAME);nm.innerHTML='<span class="c7-glow"></span><svg aria-hidden="true"></svg>';
 pic.insertBefore(nm,pic.querySelector('.c8-d7')||pic.firstChild);
 /* H34 (owner, 2026-11-02, night): the lab's flag as a small sewn patch on the name window's top right corner (meet14 V1's patch); the board is the unit colour now */
 const fl=D.createElement('div');fl.className='m15-fl';fl.setAttribute('aria-hidden','true');fl.style.cssText=at([1192-82,118-56,1192+82,118+56]);
 fl.innerHTML=`<svg viewBox="-82 -56 164 112">${m15patch(m==='KIMI'?'cn':'us',0,0,136,4,m)}</svg>`;pic.append(fl);
});
/* the name, measured on canvas: its cap 62% of the window's height, the version at .42 of it, both shrunk together if the row runs out */
const cv=D.createElement('canvas').getContext('2d');
const tw=(s,fs,f)=>{cv.font=`${fs}px ${f||'Anton'}`;return cv.measureText(s).width+s.length*fs*.02};
let CAP=.735;const capR=()=>{cv.font='100px Anton';const m=cv.measureText('H');if(m.actualBoundingBoxAscent>40)CAP=m.actualBoundingBoxAscent/100};
const nameLog={};
function names(){capR();ones.forEach(o=>{const m=o.dataset.m,nm=o.querySelector('.m11-nm'),R=nm.getBoundingClientRect();if(!R.width)return;
  const w=R.width,h=R.height,pad=h*.3;let fs=h*.62/CAP,vs=fs*.42;const gap=fs*.16,N=NM(m),V=VER(m).toUpperCase();
  const tot=tw(N,fs)+gap+tw(V,vs,"'Barlow Condensed'"),max=w-pad*2-w*.15;if(tot>max){const k=max/tot;fs*=k;vs*=k}
  const y=h/2+fs*CAP/2,nw=tw(N,fs),sv=nm.querySelector('svg');sv.setAttribute('viewBox',`0 0 ${w} ${h}`);
  sv.innerHTML=`<text class="m11-n" x="${pad.toFixed(2)}" y="${y.toFixed(2)}" font-size="${fs.toFixed(2)}">${esc(N)}</text>`+(V?`<text class="m11-v" x="${(pad+nw+gap).toFixed(2)}" y="${y.toFixed(2)}" font-size="${vs.toFixed(2)}">${esc(V)}</text>`:'');
  nameLog[m]={cap:+(fs*CAP).toFixed(2),ver:+(vs*.7).toFixed(2)}})}
/* the layout: one column, equal chips, joined into one board */
const desk=()=>innerWidth>=1000;
const L=D.createElement('div');L.className='m11-l';L.setAttribute('aria-hidden','true');four.append(L);
const CCOL={GROK:'#5b5148',CLAUDE:'#cd5e26',GPT:'#207e49',KIMI:'#3c5691'};
const nums=ones.map((o,i)=>{const e=D.createElement('b');e.className='m11-num'+(i?'':' m11-num1');e.style.setProperty('--cc',CCOL[ms[i]]||'#444');e.innerHTML=`<span>${i+1}</span>`;L.append(e);return e});
const CT=63/728,CB=(728-661)/728;
function size(){const cs=getComputedStyle(four),inner=four.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight),top=Math.min(inner,desk()?600:9e9);ones.forEach(o=>{o.style.width=top.toFixed(1)+'px'})}
function join(){ones.forEach((o,i)=>{const pic=o.querySelector('.c7-pic'),h=pic.getBoundingClientRect().height,t=i?CT:0,b=i<ones.length-1?CB:0;
  pic.style.clipPath=`inset(${(t*100).toFixed(4)}% 0 ${(b*100).toFixed(4)}% 0)`;o.style.marginTop=i?(-(CB+CT)*h).toFixed(2)+'px':''})}
function strip(){const g=W.__m10.geo(),sw=g.sw,sp=four.querySelector('.m10-sp'),fr=four.getBoundingClientRect();
 const R=ones.map(o=>{const r=o.querySelector('.c7-pic').getBoundingClientRect();return {x:r.left-fr.left,y:r.top-fr.top,w:r.width,h:r.height}});
 const x0=Math.min(...R.map(r=>r.x)),cx=desk()?x0-150:3+sw/2,top=Math.min(...R.map(r=>r.y))-14,bot=Math.max(...R.map(r=>r.y+r.h))+10;
 sp.style.left=(cx-sw/2)+'px';sp.style.top=top+'px';sp.style.height=(bot-top)+'px';sp.style.width=sw+'px';
 [...four.querySelectorAll('.m10-tp')].forEach((t,j)=>{const r=R[j],y=r.y+r.h*.5,h=Math.max(9,r.h*.2),a=cx+sw/2-2,b=r.x+2;t.style.cssText=`left:${a}px;top:${y-h/2}px;width:${Math.max(0,b-a)}px;height:${h}px`;t.classList.remove('m10-rev')});
 ones.forEach(o=>{const h=o.querySelector('.m10-hit');h&&h.classList.remove('m10-rt')})}
cv.font='100px Bangers';const DW={};for(const d of '1234')DW[d]=cv.measureText(d).width/100||.46;
function place(){const fr=four.getBoundingClientRect(),sR=four.querySelector('.m10-sp').getBoundingClientRect().right-fr.left;
 ones.forEach((o,i)=>{const r0=o.querySelector('.c7-pic').getBoundingClientRect(),r={x:r0.left-fr.left,y:r0.top-fr.top,h:r0.height},e=nums[i];
  const gx=desk()?sR+6:sR+2,gw=r.x-gx-(desk()?8:2),maxH=r.h*.5-Math.max(9,r.h*.2)/2-2,fs=Math.min(maxH/.74,gw/DW[String(i+1)]/1.12,desk()?110:9e9);
  Object.assign(e.style,{left:(gx+gw/2).toFixed(1)+'px',top:(r.y-2+(i?CT*r.h:0)).toFixed(1)+'px',fontSize:fs.toFixed(1)+'px'})})}
let busy=false;
function layout(){if(busy)return;busy=true;try{size();join();W.__m10.layout();names();W.__c8.fit&&W.__c8.fit();strip();place();W.__m10.render(W.__M10T!=null?+W.__M10T:-1)}finally{busy=false}}
let lw=0;new ResizeObserver(()=>{const w=four.clientWidth;if(w!==lw){lw=w;requestAnimationFrame(layout)}}).observe(four);
D.fonts&&D.fonts.ready.then(()=>requestAnimationFrame(layout));layout();
W.__m11={layout,names:nameLog,measure:()=>{const fr=four.getBoundingClientRect(),box=e=>{const r=e.getBoundingClientRect();return [r.left-fr.left,r.top-fr.top,r.width,r.height].map(v=>+v.toFixed(1))};
 const ov=(a,b)=>!(a[0]+a[2]<=b[0]||b[0]+b[2]<=a[0]||a[1]+a[3]<=b[1]||b[1]+b[3]<=a[1]),chips=ones.map(o=>box(o.querySelector('.c7-pic'))),N=nums.map(box),sp=box(four.querySelector('.m10-sp')),hits=[];
 N.forEach((b,i)=>{chips.forEach((c,j)=>{if(ov(b,c))hits.push('n'+(i+1)+'xchip'+(j+1))});if(ov(b,sp))hits.push('n'+(i+1)+'xstrip')});
 const bodyTop=chips.map((c,i)=>+(c[1]+(i?CT*c[3]:0)).toFixed(1)),bodyBot=chips.map((c,i)=>+(c[1]+c[3]-(i<chips.length-1?CB*c[3]:0)).toFixed(1));
 return {chips,sizes:chips.map(c=>c[2]+'x'+c[3]),nums:N,overlap:hits,joins:bodyTop.slice(1).map((t,i)=>+(t-bodyBot[i]).toFixed(2)),names:nameLog,h:Math.round(fr.height)}}};
D.documentElement.classList.add('m11-ready');
}})();

/* ===== H32 (owner, 2026-11-02: "remove the vertical ledger strip... let the board use the width"; the rank numerals "look slapped on"): the strip, its
   traces and the pulses are off; each rank is a contact tab of the board itself, pressed into the metal at the chip's left edge: #1's tab gold
   (the golden socket of How a round works' BOARD frame), 2 to 4 nickel like its silver sockets; the numeral stamped into the plate. CSS: H32 block. ===== */
(function(){const D=document;let n=0;(function go(){const four=D.querySelector('section.m11 .c8-four');if(!four||!D.documentElement.classList.contains('m11-ready')){if(++n<400)setTimeout(go,50);return}
 try{[...four.querySelectorAll('.c8-one')].forEach((o,i)=>{if(o.querySelector('.m32-tab'))return;const t=D.createElement('i');t.className='m32-tab'+(i?'':' m32-t1');t.setAttribute('aria-hidden','true');
   t.innerHTML=`<b>${i+1}</b>`;o.prepend(t)});D.documentElement.classList.add('m32');window.__m11&&window.__m11.layout()}catch(e){window.__m32Err=e;console.error(e)}})()})();
