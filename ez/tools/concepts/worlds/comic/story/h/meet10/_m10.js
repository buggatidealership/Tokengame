/* Round H26 · meet10: Meet the models, the line in the chip, fed by the ledger strip. Laid over the live chips8 take c (x2p_chips.js) without touching it.
   The chip's windows (owner, H26):
     SEASON window  -> the computed personality line (x2p_chips.js LINE, read from the live balloon, so it stays computed); one tall glass window
                       9-sliced from the chip's own SEASON window (gen.py, out/chip10-*), fitted to 9 CSS px cap height or more, a sentence per line.
     LAST ROUND     -> the W-L record, W in green ink-light, L in red; the painted "LAST ROUND" label is gone (gen.py), a live "W-L" label in its place.
     LAST 7 DAYS and No. stay as they are.
   The P&L question (window.__M10P):
     'a' the season P&L leaves the chip (as the owner said);
     'b' the season P&L stays as a small lit line in the label row under LAST 7 DAYS ("SEASON +$148,480"), so the head "Ranked by season P&L" has its number.
   The strip (window.__M10S):
     's1' THE STRIP  meetbus A as the owner saw it: the ledger glass down the left, the 12 newest graded rounds running up it, on their side;
     's2' THE TAPE   my own: the same housing, but each round is a flat ticket read the right way up (round, the company's mark lit in the glass, the move);
     both: as a round passes a chip's trace, a pulse runs into that chip, green if the model's trade on it went the right way, red if not, and lands
     on the W-L window: the W lights (green) or the L lights (red). That is the fact the motion carries: the ledger writes each trade into the record.
     A model that did not trade a round gets no pulse. Desktop (2x2): the strip runs down the column gap and feeds both columns.
   Data, live: __x2pPnl().A (W, L, bal, per[n].v), ROUNDS, CO_LOGOS. Nothing typed.
   Motion: one deterministic clock (window.__M10T freezes it), only while the section is near the screen; still with reduced motion
   (the newest round on the strip, each trace and its W or L lit for it). Options: window.__M10IMG, window.__M10BUS (meetbus's pub folder), window.__M10N.
   window.__m10 = {layout, render, state, fit, geo}. */
(function(){const W=window,D=document;let tries=0;
(function go(){const sec=D.querySelector('section.c8'),four=sec&&sec.querySelector('.c8-four');
 if(!four||!W.__x2pPnl||!W.ROUNDS||four.querySelectorAll('.c8-one').length<4){if(++tries<400)setTimeout(go,50);return}
 try{run(sec,four)}catch(e){W.__m10Err=e;console.error(e)}})();
function run(sec,four){
const S=(W.__M10S||'s1').toLowerCase(),PN=(W.__M10P||'a').toLowerCase(),N=W.__M10N||12;
const IMG=W.__M10IMG||'tools/concepts/worlds/comic/story/h/meet10/out/',BUS=W.__M10BUS||'tools/concepts/worlds/comic/story/h/meetbus/out/pub/',MED='media/';
const P=W.__x2pPnl(),A=P.A,CL=W.CO_LOGOS||{};
const G=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)).slice(-N);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const mv=r=>String(r.out||'').replace(/^-/,'−');
const mv1=r=>{const v=+r.a;return isNaN(v)?mv(r):(v<0?'−':'+')+Math.abs(v).toFixed(1)+'%'};/* the tape's short form, one decimal, from the sheet's own number */
const vd=(m,r)=>{const q=A[m]&&A[m].per[r.n];return q?(q.v>0?'ok':'no'):null};
const $=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const pct=(v,t)=>(v/t*100).toFixed(4)+'%';
const SZ=[1800,728],at=r=>`left:${pct(r[0],SZ[0])};top:${pct(r[1],SZ[1])};width:${pct(r[2]-r[0],SZ[0])};height:${pct(r[3]-r[1],SZ[1])}`;
const clip=r=>`clip-path:inset(${pct(r[1],SZ[1])} ${pct(SZ[0]-r[2],SZ[0])} ${pct(SZ[1]-r[3],SZ[1])} ${pct(r[0],SZ[0])})`;
/* geometry in the 1800 painting (gen.py): the line window, its text box inside the bezel, the W-L label, the season small line (b) */
const LW=[408,418,1251,603],LT=[434,436,1225,585],WLL=[998,372,1247,414],SEL=[536,372,985,414];
sec.classList.add('m10','m10-'+S,'m10-'+PN);
['strip','bundle'].forEach(k=>sec.style.setProperty('--mb-'+k,`image-set(url("${BUS}mb-${k}.webp") type("image/webp"),url("${BUS}mb-${k}.jpg") type("image/jpeg"))`));
const ones=[...four.querySelectorAll('.c8-one')],ms=ones.map(o=>o.dataset.m);
/* ---------- the chips ---------- */
const line={};
ones.forEach(o=>{const m=o.dataset.m,b=o.querySelector('.c8-bal span');line[m]=b?b.textContent.trim():'';
 const pic=o.querySelector('.c7-pic'),lm=m.toLowerCase();
 pic.querySelectorAll('img').forEach(im=>{for(const k of ['src','srcset'])if(im.getAttribute(k))im.setAttribute(k,im.getAttribute(k).replace(/[^ ,]*chip8c-([a-z]+)-(\d+)\.(jpg|webp)/g,(s,mm,w,x)=>`${IMG}chip10-${mm}-${w}.${x}`))});
 /* the SEASON window and its glass: off */
 const se=pic.querySelector('.c8-se');if(se){se.style.display='none';const g=se.nextElementSibling;if(g&&g.matches('img.c7-glass'))g.style.display='none'}
 /* LAST ROUND -> W-L */
 const lr=pic.querySelector('.c8-lr');lr.className='c7-win m10-wl';lr.innerHTML='<span class="c7-glow"></span><i class="m10-fl m10-flw"></i><i class="m10-fl m10-fll"></i><svg aria-hidden="true"></svg><i class="c7-gl"></i>';
 /* the line window: dark glass, the text, the glare, the painting's own glass screened back on top */
 const lw=D.createElement('div');lw.className='c7-win m10-ln';lw.style.cssText=at(LW);lw.innerHTML='<span class="c7-glow"></span><svg aria-hidden="true"></svg><i class="c7-gl"></i>';
 const gl=D.createElement('img');gl.className='c7-glass m10-lng';gl.alt='';gl.src=`${IMG}chip10-${lm}-1200.jpg`;gl.srcset=`${IMG}chip10-${lm}-1200.webp 1200w, ${IMG}chip10-${lm}-1800.webp 1800w`;gl.sizes='(min-width:1000px) 580px, 100vw';gl.style.cssText=clip(LW);
 lr.parentNode.insertBefore(lw,lr);lr.parentNode.insertBefore(gl,lr);
 /* the printed labels, live, in the painted labels' type */
 const lb=D.createElement('div');lb.className='m10-lab m10-labwl';lb.style.cssText=at(WLL);lb.innerHTML='<span>W-L</span>';pic.append(lb);
 if(PN==='b'){const sl=D.createElement('div');sl.className='m10-lab m10-labse';sl.style.cssText=at(SEL);sl.innerHTML=`<span>Season</span><b class="${A[m].bal-1e5>=0?'m10-u':'m10-d'}">${$(A[m].bal-1e5)}</b>`;pic.append(sl)}
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
function layout(){capR();fitLines();ones.forEach(fitWL);fitLabels();
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
/* screen readers: the chip list of chips8 stays (it already says the line and W-L); the season and last-round parts are left as they are there */
const srl=D.createElement('p');srl.className='ch-sr';srl.textContent='The ledger, newest rounds: '+G.slice().reverse().slice(0,4).map(r=>`round ${r.n}, ${r.co}, ${mv(r)}: `+ms.map(m=>{const v=vd(m,r);return v?`${m} ${v==='ok'?'right':'wrong'}`:''}).filter(Boolean).join(', ')).join('; ')+'.';sec.append(srl);
W.__m10={layout,render,fit:fitLog,geo:()=>Gm,seq:G.map(r=>r.n),
 state:t=>{render(t);return taps.map(x=>({m:x.m,r:x.r&&x.r.n,i:+x.t.style.getPropertyValue('--i'),u:+x.t.style.getPropertyValue('--u'),land:+x.h.style.getPropertyValue('--i'),v:x.t.classList.contains('m10-ok')?'ok':x.t.classList.contains('m10-no')?'no':null}))}};
D.documentElement.classList.add('m10-ready');
}})();
