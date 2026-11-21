/* Round H24 · rounds6: "Every round so far" on X2+, four takes in the chip art, continuing frame 3 (the LEDGER).
   window.__R6 = 'A' ledger entries (one chip per round, stacked like Meet the models' chips)
                 'D' the ledger grows (frame 3's glass ledger, one row per round; an open book of two pages on desktop)
                 'B' the season wafer (every round of Season 1 as a die on one wafer; the newest 8 cut out big below)
                 'C' the socket board (each round's film frame whole in a socket, its readout in the same glass)
   window.__R6IMG = folder of the paintings (default: this concepts folder; the drop-in uses media/ with the same flat names).
   Data live: ROUNDS (graded), PENDING / UPCOMING (what comes next), FILMS (which frame), CO_LOGOS, MODELS. Nothing typed.
   Every live word sits in a painted glass window, lit like the NVIDIA timer (amber gradient, glow, scanlines, the painting's own glare
   screened back over the glass). Sizes are set from the painting's on-screen scale so every live word keeps a cap height of 9 CSS px. */
(function(){
const D=document,TK=window.__R6||'A',IM=window.__R6IMG||'tools/concepts/worlds/comic/story/h/rounds6/h24/img/web/';
const sec=D.getElementById('record');if(!sec||sec.querySelector('.r6'))return;
const G=(window.ROUNDS||[]).filter(r=>r.a!=null&&r.out),NEW=G.slice().reverse();
const FUT=[...(window.PENDING||[]),...(window.UPCOMING||[])],NEXT=FUT[0]||null;
const MD=window.MODELS||{},ORDER=['GPT','KIMI','CLAUDE','GROK'];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>MD[m]);
const callOf=(r,m)=>(r.calls||[]).find(c=>c[0]===m);
const right=(c,a)=>/^UP/i.test(c)===(a>0);
const tile=n=>`media/tile-r${n}-${(window.FILMS||{})[n]?'f1':'t2'}.jpg`;
const mv=r=>String(r.out).replace(/^-/,'−');
const md=s=>{if(!s)return '';const[m,d]=String(s).split('/');return ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][m-1]+' '+(+d)};
const logoF=t=>{const L=(window.CO_LOGOS||{})[t];return L?'media/'+(L.f||L):''};
const winTxt=r=>{const W=wins(r);return W.length===1?W[0]+' WINS':W.length?W.join(' & ')+' TIE':'NOBODY WINS'};
const nmOf=r=>`${String(r.co).toUpperCase()} (${r.ticker})`;
const cap1=m=>m[0]+m.slice(1).toLowerCase();
const aria=r=>{const W=wins(r);return `Round ${r.n}, ${r.co} (${r.ticker}), moved ${r.out}. ${W.length?W.map(cap1).join(' and ')+(W.length>1?' tie':' wins'):'Nobody wins'}. `+
  ORDER.map(m=>{const c=callOf(r,m);return c?`${cap1(m)} ${right(c[1],r.a)?'right':'wrong'} way`:''}).filter(Boolean).join(', ')+'. Open the graded card.'};
/* real text widths in Anton (the page has loaded its fonts) */
const cv=D.createElement('canvas').getContext('2d');const TW=(t,f)=>{cv.font=`${f}px Anton`;return cv.measureText(String(t)).width};
const CAPR=(()=>{cv.font='100px Anton';return cv.measureText('H').actualBoundingBoxAscent/100})();
let uid=0,MINF=10;/* MINF: the font (painting px) whose cap height is 9.2 CSS px on the painting being drawn */
const setK=k=>{MINF=9.2/(CAPR*k)};
/* the largest size <= max at which t fits w, never below MINF; past that the company name is trimmed (the ticker always stays) */
const fitF=(t,w,max)=>Math.max(MINF,Math.min(max,max*w/TW(t,max)));
const fitName=(r,w,max)=>{let f=fitF(nmOf(r),w,max);if(TW(nmOf(r),f)<=w+.5)return [nmOf(r),f];
  let co=String(r.co).toUpperCase();while(co.length>3&&TW(`${co}… (${r.ticker})`,f)>w)co=co.slice(0,-1).trimEnd();return [`${co}… (${r.ticker})`,f]};
/* ---------- SVG pieces, in the painting's own px ---------- */
const DEFS=(b,PW)=>{const sp=(PW/150).toFixed(2);return `<defs>
 <pattern id="r6slp${b}" width="8" height="${sp}" patternUnits="userSpaceOnUse"><rect width="8" height="${(sp*.32).toFixed(2)}" fill="rgba(0,0,0,.28)"/></pattern>
 <radialGradient id="r6vg${b}" cx=".5" cy=".5" r=".72"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
 <linearGradient id="r6em${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf0"/><stop offset=".5" stop-color="#ffe9a8"/><stop offset="1" stop-color="#ffb43a"/></linearGradient>
 <linearGradient id="r6gd${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c8"/><stop offset=".55" stop-color="#ffd25a"/><stop offset="1" stop-color="#ff9d1c"/></linearGradient>
 <linearGradient id="r6up${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2ffeb"/><stop offset=".4" stop-color="#6ff59e"/><stop offset="1" stop-color="#16b955"/></linearGradient>
 <linearGradient id="r6dn${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe4dc"/><stop offset=".4" stop-color="#ff7a6a"/><stop offset="1" stop-color="#e3261c"/></linearGradient>
</defs>`};
const fillOf=(c,b)=>`url(#r6${c||'em'}${b})`;
const TX=(b,x,y,s,t,o={})=>`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}"${o.a?` text-anchor="${o.a}"`:''} fill="${fillOf(o.c,b)}" class="r6-tx r6-${o.c||'em'} ${o.cls||''}" data-cap="${(s*CAPR).toFixed(2)}">${esc(t)}</text>`;
const MK=(m,x,y,s,col,cls)=>`<svg x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" viewBox="0 0 24 24" class="r6-mk ${cls||''}"><path d="${(MD[m]||{}).d||''}" fill="${col}"/></svg>`;
const LOGO=(t,x,y,s)=>{const f=logoF(t);return f?`<image href="${f}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" preserveAspectRatio="xMidYMid meet" class="r6-lg"/>`:''};
const svgOpen=(PW,PH,b)=>`<svg class="r6-sv" viewBox="0 0 ${PW} ${PH}" preserveAspectRatio="none" aria-hidden="true">${DEFS(b,PW)}`;
/* the glass over a window: a faint warm wash, scanlines, and the painting's own glare (cut from the painting) screened back over it */
const glassOver=(b,x,y,w,h,paint,PW,PH,dy,wash)=>{const id='r6g'+b+'_'+(uid++);return `<clipPath id="${id}"><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"/></clipPath><g clip-path="url(#${id})">${wash===false?'':`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" class="r6-wash"/>`}<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="url(#r6slp${b})"/></g><g clip-path="url(#${id})" class="r6-glg"><image href="${paint}" x="0" y="${(dy||0).toFixed(1)}" width="${PW}" height="${PH}" class="r6-glr" preserveAspectRatio="none"/></g>`};
/* (a clipped group is isolated, so the screen blend must sit on the group, not on the image inside it) */
/* the film frame behind the glass, never repainted: fit (whole) or fill (cropped), darkened toward the rim */
const frame=(b,n,x,y,w,h,mode,rad,soft)=>{const id='r6c'+b+'_'+(uid++);return `<clipPath id="${id}"><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${(rad||0).toFixed(1)}"/></clipPath><g clip-path="url(#${id})"><image href="${tile(n)}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" preserveAspectRatio="xMidYMid ${mode||'slice'}" class="r6-fr"/><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="url(#r6vg${b})" opacity="${soft?.45:1}"/></g>`};
/* the four AIs, always in the same order: each mark lit green if it called the direction, red if not, dark if it made no call; the winner's mark ringed in gold */
function marks(b,r,x,y,s,gap){const W=wins(r);return ORDER.map((m,i)=>{const c=callOf(r,m),X=x+i*(s+gap);if(!c)return MK(m,X,y,s,'#3a3022','r6-off');
  const ok=right(c[1],r.a);return (W.includes(m)?`<circle cx="${(X+s/2).toFixed(1)}" cy="${(y+s/2).toFixed(1)}" r="${(s*.68).toFixed(1)}" class="r6-wring"/>`:'')+MK(m,X,y,s,fillOf(ok?'up':'dn',b),'r6-'+(ok?'up':'dn'))}).join('')}
const marksW=s=>4*s+3*s*.42;
/* readout, wide: line 1 logo, name (ticker) ... the move; line 2 R<n>, the four AIs ... who wins (if there is room; the gold ring always says it) */
function readWide(b,r,x,y,w,h,noMarks){const f=Math.max(MINF,h*.3),mvT=mv(r),fm=Math.max(f,Math.min(h*.36,f*1.18)),mw=TW(mvT,fm),hasL=!!logoF(r.ticker),ls=f*1.15,g=f*.3;
  const [nm,fn]=fitName(r,w-(hasL?ls+g:0)-mw-g*1.5,f),y1=y+h*.44,y2=y+h*.88;let s='';
  if(hasL)s+=LOGO(r.ticker,x,y1-fn*CAPR/2-ls/2,ls);s+=TX(b,x+(hasL?ls+g:0),y1,fn,nm)+TX(b,x+w,y1,fm,mvT,{a:'end',c:r.a>0?'up':'dn',cls:'r6-big'});
  const ms=f*1.02,rT='R'+r.n;let X=x;s+=TX(b,X,y2,f,rT,{c:'gd'});X+=TW(rT,f)+g*1.4;
  if(noMarks){/* the lenses carry the four AIs; the line names the winner, its mark in gold */
    const W=wins(r),wt=winTxt(r),fw=Math.max(MINF,Math.min(f*.95,f*.95*(x+w-X-W.length*(ms+g))/TW(wt,f*.95)));s+=TX(b,x+w,y2,fw,wt,{a:'end',c:'gd'});
    const x0=x+w-TW(wt,fw)-g*.6;W.forEach((m,i)=>{s+=MK(m,x0-(W.length-i)*(ms+g*.4),y2-ms*.88,ms,fillOf('gd',b),'r6-gdm')});return s}
  s+=marks(b,r,X,y2-ms*.9,ms,ms*.42);X+=marksW(ms)+g*1.6;
  const wt=winTxt(r),fw=Math.min(f*.95,f*.95*(x+w-X)/TW(wt,f*.95));if(fw>=MINF)s+=TX(b,x+w,y2,fw,wt,{a:'end',c:'gd'});return s}
/* readout, stacked: line 1 logo, name (ticker) across the whole glass; line 2 R<n>, the four AIs ... the move */
function readStack(b,r,x,y,w,h){const f=Math.max(MINF,h*.29),hasL=!!logoF(r.ticker),ls=f*1.15,g=f*.3,[nm,fn]=fitName(r,w-(hasL?ls+g:0),f),y1=y+h*.42,y2=y+h*.87;let s='';
  if(hasL)s+=LOGO(r.ticker,x,y1-fn*CAPR/2-ls/2,ls);s+=TX(b,x+(hasL?ls+g:0),y1,fn,nm);
  /* laid out from the right: the move, a clear gap (a ring reaches .18 of a mark past it), the four marks; R<n> on the left */
  const rT='R'+r.n,fm=f*1.12,mw=TW(mv(r),fm)*1.04,x0=x+TW(rT,f)+g*1.2,xr=x+w-mw-f*.75,ms=Math.min(f*1.02,(xr-x0)/5.5);
  s+=TX(b,x,y2,f,rT,{c:'gd'})+marks(b,r,xr-marksW(ms)-ms*.18,y2-ms*.9,ms,ms*.42)+TX(b,x+w,y2,fm,mv(r),{a:'end',c:r.a>0?'up':'dn',cls:'r6-big'});return s}
/* readout, narrow: line 1 logo, name (ticker); line 2 the move ... the four AIs */
function readNarrow(b,r,x,y,w,h){const f=Math.max(MINF,h*.31),hasL=!!logoF(r.ticker),ls=f*1.15,g=f*.3,[nm,fn]=fitName(r,w-(hasL?ls+g:0),f),y1=y+h*.42,y2=y+h*.88;let s='';
  if(hasL)s+=LOGO(r.ticker,x,y1-fn*CAPR/2-ls/2,ls);s+=TX(b,x+(hasL?ls+g:0),y1,fn,nm);
  const ms=Math.min(f*1.02,(w-TW(mv(r),f*1.1)-g*2)/5.26),fm=Math.max(MINF,Math.min(f*1.1,f*1.1*(w-marksW(ms)-g*1.5)/TW(mv(r),f*1.1)));
  s+=TX(b,x,y2,fm,mv(r),{c:r.a>0?'up':'dn',cls:'r6-big'})+marks(b,r,x+w-marksW(ms),y2-ms*.9,ms,ms*.42);return s}
/* the entry still to be written: its company lit dim, when it will be written, a blinking cursor */
function readNext(b,nx,x,y,w,h){const f=Math.max(MINF,h*.28),y1=y+h*.42,y2=y+h*.86,nm=`${String(nx.co).toUpperCase()} (${nx.ticker})`,fn=fitF(nm,w,f);
  const when=nx.resolves?`AT THE CLOSE · ${md(nx.resolves)}`:`CALLS DUE ${md(nx.called)}`,rT='R'+nx.n;
  const fw=Math.max(MINF,Math.min(f*.92,f*.92*(w-TW(rT,f)-f*1.4)/TW(when,f*.92)));
  return TX(b,x,y1,fn,nm,{cls:'r6-dim'})+TX(b,x,y2,f,rT,{c:'gd'})+TX(b,x+TW(rT,f)+f*.4,y2,fw,when,{cls:'r6-dim'})
   +`<rect class="r6-cur" x="${(x+TW(rT,f)+f*.4+TW(when,fw)+f*.3).toFixed(1)}" y="${(y2-f*CAPR).toFixed(1)}" width="${(f*.42).toFixed(1)}" height="${(f*CAPR).toFixed(1)}" fill="${fillOf('em',b)}"/>`}
const wrapA=(r,inner,cls)=>r?`<li class="r6-it ${cls||''}"><a href="#/round/${r.n}" aria-label="${esc(aria(r))}">${inner}</a></li>`:`<li class="r6-it r6-next ${cls||''}" aria-label="Next: round ${NEXT.n}, ${esc(NEXT.co)} (${esc(NEXT.ticker)}), ${NEXT.resolves?'written at the close on '+esc(NEXT.resolves):'calls due '+esc(NEXT.called)}">${inner}</li>`;
const paint=(src,PW,PH,s)=>`<div class="r6-pa" style="aspect-ratio:${PW}/${PH}"><img src="${src}" alt="" draggable="false" decoding="async">${s}</svg></div>`;

/* ---------- take A: ledger entries, one chip per round, their pins meeting ---------- */
const PA={src:IM+'rounds-h24-row.jpg',W:1920,H:697,cr:[110,400],k:1920/3620,win:[315,625,940,1500],strip:[1150,645,3530,1075],
  lens:[[1795,1230,2050,1485],[2275,1230,2530,1485],[2750,1230,3005,1485],[3155,1230,3410,1485]]};
const sA=a=>[(a[0]-PA.cr[0])*PA.k,(a[1]-PA.cr[1])*PA.k,(a[2]-PA.cr[0])*PA.k,(a[3]-PA.cr[1])*PA.k];
function rowA(r){const b='A'+(uid++),[wx,wy,wx2,wy2]=sA(PA.win),[sx,sy,sx2,sy2]=sA(PA.strip),pw=PA.W,ph=PA.H,sw=sx2-sx,sh=sy2-sy;let s=svgOpen(pw,ph,b);
  if(!r){s+=glassOver(b,wx,wy,wx2-wx,wy2-wy,PA.src,pw,ph)+(logoF(NEXT.ticker)?`<g class="r6-dim">${LOGO(NEXT.ticker,wx+(wx2-wx)*.18,(wy+wy2)/2-(wx2-wx)*.32,(wx2-wx)*.64)}</g>`:'')
    +glassOver(b,sx,sy,sw,sh,PA.src,pw,ph)+readNext(b,NEXT,sx+sw*.045,sy,sw*.91,sh);
    PA.lens.forEach(l=>{const[a,c,d,e]=sA(l);s+=glassOver(b,a,c,d-a,e-c,PA.src,pw,ph,0,false)});return wrapA(null,paint(PA.src,pw,ph,s))}
  s+=frame(b,r.n,wx+(wx2-wx)*.035,wy+(wy2-wy)*.025,(wx2-wx)*.93,(wy2-wy)*.95,'slice',(wx2-wx)*.05)+glassOver(b,wx,wy,wx2-wx,wy2-wy,PA.src,pw,ph,0,false);
  s+=glassOver(b,sx,sy,sw,sh,PA.src,pw,ph)+readWide(b,r,sx+sw*.045,sy,sw*.91,sh,true);
  /* the four lenses: each AI's own lamp, its mark lit green (right way) or red (wrong way); the winner's lens ringed in gold */
  const W=wins(r);PA.lens.forEach((l,i)=>{const[a,c,d,e]=sA(l),m=ORDER[i],cl=callOf(r,m),cx=(a+d)/2,cy=(c+e)/2,rr=(d-a)/2,ok=cl&&right(cl[1],r.a);
    if(!cl){s+=MK(m,cx-rr*.5,cy-rr*.5,rr,'#3a3022','r6-off');return}
    s+=`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(rr*.8).toFixed(1)}" class="r6-lens r6-l${ok?'up':'dn'}"/>`+(W.includes(m)?`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(rr*.9).toFixed(1)}" class="r6-wring"/>`:'')
      +MK(m,cx-rr*.48,cy-rr*.48,rr*.96,fillOf(ok?'up':'dn',b),'r6-'+(ok?'up':'dn'))+glassOver(b,a,c,d-a,e-c,PA.src,pw,ph,0,false)});
  return wrapA(r,paint(PA.src,pw,ph,s))}

/* ---------- take D: frame 3's ledger, grown (its middle row repeats, so every row has the same geometry) ---------- */
const PD={src:IM+'rounds-h24-ledger.jpg',W:1440,H:2765,k:1440/2000,top:[0,648],mid:[648,1066],bot:[3165,3840],row:{top:[282,600],mid:[696,1014],bot:[3210,3543]},win:[397,595],glass:[628,1642]};/* x in the painting cropped to x 80..2080 */
function rowD(r,piece){const b='D'+(uid++),k=PD.k,[p0,p1]=PD[piece],[g0,g1]=PD.row[piece],PW=PD.W,PH=(p1-p0)*k,dy=-p0*k,
  gy=(g0-p0)*k,gh=(g1-g0)*k,wx=PD.win[0]*k,ww=(PD.win[1]-PD.win[0])*k,gx=PD.glass[0]*k,gw=(PD.glass[1]-PD.glass[0])*k;let s=svgOpen(PW,PH.toFixed(1),b);
  if(!r){s+=glassOver(b,wx,gy,ww,gh,PD.src,PW,PD.H,dy)+(logoF(NEXT.ticker)?`<g class="r6-dim">${LOGO(NEXT.ticker,wx+ww*.1,gy+gh/2-ww*.4,ww*.8)}</g>`:'')+glassOver(b,gx,gy,gw,gh,PD.src,PW,PD.H,dy)+readNext(b,NEXT,gx+gw*.05,gy,gw*.9,gh)}
  else s+=frame(b,r.n,wx+ww*.05,gy+gh*.035,ww*.9,gh*.93,'slice',ww*.06,true)+glassOver(b,wx,gy,ww,gh,PD.src,PW,PD.H,dy,false)+glassOver(b,gx,gy,gw,gh,PD.src,PW,PD.H,dy)+readStack(b,r,gx+gw*.045,gy,gw*.91,gh);
  const img=`<img src="${PD.src}" alt="" draggable="false" decoding="async" style="top:${(-p0/(p1-p0)*100).toFixed(4)}%;height:${(3840/(p1-p0)*100).toFixed(4)}%">`;
  return wrapA(r,`<div class="r6-pd" style="aspect-ratio:${PW}/${PH.toFixed(1)}">${img}${s}</svg></div>`)}
function ledgerD(items,cls){const n=items.length;return `<ol class="r6-led ${cls||''}">`+items.map((r,i)=>rowD(r,i===0?'top':i===n-1?'bot':'mid')).join('')+`</ol>`}

/* ---------- take B: the season wafer ---------- */
const PB={src:IM+'rounds-h24-wafer.jpg',W:2048,cx:1024,cy:1024,R:902,die:IM+'rounds-h24-die.jpg',DW:900,DH:880,dwin:[120,120,1644,1604],dm:[1764,1724]};
function waferB(){const total=G.length+FUT.length,R=PB.R*.955,cx=PB.cx,cy=PB.cy;
  /* the largest square die whose grid holds the whole season inside the wafer's edge */
  let best=null;for(let c=6;c<40&&!best;c++){const a=2*R/c,cells=[];for(let j=0;j<c;j++)for(let i=0;i<c;i++){const x=cx-R+i*a,y=cy-R+j*a;if([[x,y],[x+a,y],[x,y+a],[x+a,y+a]].every(([u,v])=>Math.hypot(u-cx,v-cy)<=R))cells.push([x,y])}if(cells.length>=total)best={a,cells}}
  const a=best.a,cells=best.cells,b='B'+(uid++),gp=a*.06,seq=[...G,...FUT];let s=svgOpen(PB.W,PB.W,b);
  seq.forEach((r,i)=>{const[x,y]=cells[i],g=r.a!=null&&r.out,isN=NEXT&&r.n===NEXT.n,last=i===seq.length-1,X=x+gp,Y=y+gp,S=a-gp*2;
    const wx=X+S*PB.dwin[0]/PB.dm[0],wy=Y+S*PB.dwin[1]/PB.dm[1],ws=S*(PB.dwin[2]-PB.dwin[0])/PB.dm[0];
    let d=`<image href="${PB.die}" x="${X.toFixed(1)}" y="${Y.toFixed(1)}" width="${S.toFixed(1)}" height="${S.toFixed(1)}" preserveAspectRatio="none" class="r6-dimg"/>`;
    if(g)d+=`<image href="${tile(r.n)}" x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${ws.toFixed(1)}" height="${ws.toFixed(1)}" preserveAspectRatio="xMidYMid slice" class="r6-dfr"/>`;
    else if(isN)d+=`<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${ws.toFixed(1)}" height="${ws.toFixed(1)}" class="r6-dnext"/>`;
    else if(last)d+=`<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${ws.toFixed(1)}" height="${ws.toFixed(1)}" class="r6-dgold"/>`;
    s+=g?`<a href="#/round/${r.n}" aria-label="${esc(aria(r))}" class="r6-die r6-dg">${d}</a>`:`<g class="r6-die${isN?' r6-dn':''}${last?' r6-dl':''}">${d}</g>`});
  return `<div class="r6-wf" style="aspect-ratio:1"><img src="${PB.src}" alt="" draggable="false" decoding="async">${s}</svg></div>`}
function dieB(r){const b='B'+(uid++),k=PB.DW/PB.dm[0],[x0,y0,x1,y1]=PB.dwin.map(v=>v*k),w=x1-x0,h=y1-y0,PW=PB.DW,PH=PB.DH;let s=svgOpen(PW,PH,b);
  /* one glass window: the film frame in its upper part, the readout lit in its lower part */
  const fh=h*.6,ry=y0+h*.02+fh+h*.01,rh=y1-ry-h*.02;
  s+=frame(b,r.n,x0+w*.02,y0+h*.02,w*.96,fh,'slice',w*.03)+glassOver(b,x0,ry-h*.01,w,y1-ry+h*.01,PB.die,PW,PH)+readNarrow(b,r,x0+w*.06,ry,w*.88,rh)+glassOver(b,x0,y0,w,h,PB.die,PW,PH,0,false);
  return wrapA(r,paint(PB.die,PW,PH,s))}

/* ---------- take C: the socket board (the film frame whole at the top of the glass, the readout under it, the round on the plate) ---------- */
const PC={src:IM+'rounds-h24-socket.jpg',W:900,H:1759,k:900/1255,win:[101,107,1151,1862],plate:[20,2141,1235,2333]};
function sockC(r){const b='C'+(uid++),k=PC.k,[wx,wy,wx2,wy2]=PC.win.map(v=>v*k),[px,py,px2,py2]=PC.plate.map(v=>v*k),PW=PC.W,PH=PC.H,w=wx2-wx,fw=w*.96,fh=fw*4/3,fy=wy+w*.02,ry=fy+fh+w*.02,rh=wy2-ry-w*.03;
  let s=svgOpen(PW,PH,b);const f=Math.max(MINF,(py2-py)*.5);
  if(!r){s+=glassOver(b,wx,wy,w,wy2-wy,PC.src,PW,PH)+(logoF(NEXT.ticker)?`<g class="r6-dim">${LOGO(NEXT.ticker,wx+w*.2,fy+fh*.5-w*.3,w*.6)}</g>`:'')+readNext(b,NEXT,wx+w*.06,ry,w*.88,rh)
    +glassOver(b,px,py,px2-px,py2-py,PC.src,PW,PH)+TX(b,(px+px2)/2,(py+py2)/2+f*CAPR/2,f,'NEXT ROUND',{a:'middle',c:'gd',cls:'r6-dim'});return wrapA(null,paint(PC.src,PW,PH,s))}
  s+=frame(b,r.n,wx+w*.02,fy,fw,fh,'meet',w*.03)+glassOver(b,wx,wy,w,wy2-wy,PC.src,PW,PH)+readNarrow(b,r,wx+w*.06,ry,w*.88,rh);
  s+=glassOver(b,px,py,px2-px,py2-py,PC.src,PW,PH)+TX(b,(px+px2)/2,(py+py2)/2+f*CAPR/2,f,'ROUND '+r.n,{a:'middle',c:'gd'});
  return wrapA(r,paint(PC.src,PW,PH,s))}

/* ---------- the section ---------- */
const HEAD={A:['The ledger','Every trade, written. Newest first.'],D:['The ledger','Every trade, written. Newest first.'],
  B:['Season 1, die by die','Every round of the season. Lit dies are graded.'],C:['Every round so far','Each round, socketed. Newest first.']}[TK];
const PAGE=8;let shown=PAGE,wide=false;
const root=D.createElement('div');root.className='r6 r6-'+TK;
function body(cw){/* cw: the column's CSS width, so the readouts are sized for the screen they land on */
  if(TK==='A'){setK((wide?(cw-18)/2:cw)/PA.W);return `<ol class="r6-list r6-rows">${NEXT?rowA(null):''}${NEW.slice(0,shown).map(rowA).join('')}</ol>`}
  if(TK==='D'){const items=[...(NEXT?[null]:[]),...NEW.slice(0,shown)];
    if(!wide){setK(cw/PD.W);return `<div class="r6-book">${ledgerD(items)}</div>`}
    setK(((cw-22)/2)/PD.W);const h=Math.ceil(items.length/2);return `<div class="r6-book">${ledgerD(items.slice(0,h),'r6-pg1')}${ledgerD(items.slice(h),'r6-pg2')}</div>`}
  if(TK==='B'){const wf=waferB();setK((wide?((cw-22)*1.15/2.15-24)/4:(cw-8)/2)/PB.DW);
    return `<div class="r6-Bb"><figure class="r6-wfw">${wf}<figcaption class="r6-key"><span class="r6-k1"></span>${G.length} graded<span class="r6-k2"></span>next<span class="r6-k3"></span>${FUT.length} to come · gold: NVIDIA</figcaption></figure><ol class="r6-list r6-dies">${NEW.slice(0,shown).map(dieB).join('')}</ol></div>`}
  if(TK==='C'){setK((wide?(cw-36)/4:(cw-6)/2)/PC.W);return `<ol class="r6-list r6-socks">${NEXT?sockC(null):''}${NEW.slice(0,shown-(NEXT?1:0)).map(sockC).join('')}</ol>`}}
function more(){const n=TK==='C'&&NEXT?shown-1:shown;return n<NEW.length?`<button class="r6-more" type="button"><span>Show ${Math.min(PAGE,NEW.length-n)} more</span><i>${n} of ${NEW.length}</i></button>`:`<p class="r6-all">All ${NEW.length} rounds</p>`}
function render(){wide=matchMedia('(min-width:760px)').matches;root.innerHTML=`<header class="r6-hd"><h2 class="r6-h2"><span class="r6-hw">${esc(HEAD[0])}</span></h2><p class="r6-cap">${esc(HEAD[1])}</p></header><div class="r6-bd"></div>`;
  const bd=root.querySelector('.r6-bd');bd.innerHTML=body(bd.clientWidth)+more();
  root.querySelector('.r6-more')?.addEventListener('click',()=>{shown+=PAGE;render()});scale()}
/* --k: CSS px per painting px, for the glow sizes */
function scale(){root.querySelectorAll('.r6-sv').forEach(sv=>{const vb=sv.viewBox.baseVal,w=sv.getBoundingClientRect().width;if(vb&&w)sv.style.setProperty('--k',(w/vb.width).toFixed(5))})}
/* the old carousel stays laid out (the round view copies and measures its cards), only moved off screen and hidden from readers */
[...sec.children].forEach(c=>{c.classList.add('r6-old');c.setAttribute('aria-hidden','true');c.inert=true});
sec.classList.add('r6-sec');sec.appendChild(root);render();
/* a new round arrives: the first time the section comes into view, the newest graded entry is written in (the frame lights, the readout types on,
   a scan band passes). Once per visit; nothing moves with reduced motion. */
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();
  const it=root.querySelector('.r6-it:not(.r6-next)')||root.querySelector('.r6-die.r6-dg:last-of-type');if(it){it.classList.add('r6-in');setTimeout(()=>it.classList.remove('r6-in'),2600)}}},{threshold:.35});io.observe(root)}
let lw=innerWidth;addEventListener('resize',()=>{clearTimeout(scale.t);scale.t=setTimeout(()=>{if(innerWidth!==lw){lw=innerWidth;render()}else scale()},150)});
window.__r6={render,scale,set:n=>{shown=n;render()}};
})();
