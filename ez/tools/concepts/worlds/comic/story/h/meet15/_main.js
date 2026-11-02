/* ===== meet15 · Meet the models, five inspirations (round H36). window.__M15(take), take A|B|C|D|E. Mockup overlay over the built v46-live-x2plus.html.
   Every word and number is live SVG text from __x2pPnl() / MODELS / the page's own computed line (x2p_chips LINE, read from the live chip);
   the paintings (Hedra gpt-image-2, img/) carry no text. Faces: the founders' loops (<video> in a foreignObject; the poster with reduced motion).
     A  The Season 1 set: four trading cards just pulled from a pack; the sealed Season 2 pack beside them
     B  Pit lane: each lab's garage, the bay order is the standings (as F1 allots garages); Season 2's bays still shuttered
     C  Character select: an arcade cabinet; four playable fighters, four locked slots for Season 2
     D  The portrait gallery: four living portraits on the wall, brass plaques; Season 2's frames still under cloth
     E  The weigh-in: each model on a scale whose needle reads its season P&L; Season 2 waits on the bench ===== */
const LAB={GROK:'xAI',CLAUDE:'Anthropic',GPT:'OpenAI',KIMI:'Moonshot AI'};
const S2=[['MISTRAL','eu','Mistral AI'],['QWEN','cn','Alibaba'],['GEMINI','us','Google'],['NEMOTRON','us','NVIDIA']];
const MOTION=!matchMedia('(prefers-reduced-motion: reduce)').matches;
const FOC={GROK:[.42,.36],CLAUDE:[.52,.3],GPT:[.64,.3],KIMI:[.5,.3]};
const MP4=m=>FND(m).replace('.jpg','.mp4');
let FID=0;
/* the founder, cropped into a window by a focal point (square source) */
function face(m,x,y,w,h,o){o=o||{};const id='m15f'+(FID++),s=Math.max(w,h)*(o.z||1),[fx,fy]=FOC[m];
  let ix=x+w/2-fx*s,iy=y+h/2-fy*s;ix=Math.min(x,Math.max(x+w-s,ix));iy=Math.min(y,Math.max(y+h-s,iy));
  const media=MOTION?`<foreignObject x="${f1(ix)}" y="${f1(iy)}" width="${f1(s)}" height="${f1(s)}"><video xmlns="http://www.w3.org/1999/xhtml" src="${MP4(m)}" poster="${FND(m)}" autoplay="" muted="" loop="" playsinline="" style="width:100%;height:100%;display:block;object-fit:cover"></video></foreignObject>`
    :`<image href="${FND(m)}" x="${f1(ix)}" y="${f1(iy)}" width="${f1(s)}" height="${f1(s)}" preserveAspectRatio="none"/>`;
  return `<clipPath id="${id}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(o.rx||0)}"/></clipPath><g clip-path="url(#${id})"${o.flt?` style="filter:${o.flt}"`:''}>${media}${o.vg?`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="url(#${o.vg})"/>`:''}</g>`}
/* the unit colour laid on a painted surface (a rect ring: outer minus inner), the paint's light kept */
function ring(img,Wd,Hd,o,i,col,id,gain){return `${tint(id,col,gain||1.25,.02)}<clipPath id="${id}c"><path clip-rule="evenodd" d="M${f1(o[0])} ${f1(o[1])}H${f1(o[2])}V${f1(o[3])}H${f1(o[0])}Z M${f1(i[0])} ${f1(i[1])}H${f1(i[2])}V${f1(i[3])}H${f1(i[0])}Z"/></clipPath><image href="${BASE}${img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none" clip-path="url(#${id}c)" filter="url(#${id})"/>`}
const head=(x,y,w,s,o)=>{o=o||{};s=fit(s,'MEET THE MODELS',w,'g');return `<g transform="rotate(${o.rot==null?-2:o.rot} ${f1(x)} ${f1(y)})">${T(x+s*.06,y+s*.07,s,'MEET THE MODELS',{f:'g',c:INK,ls:s*.02})}${T(x,y,s,'MEET THE MODELS',{f:'g',c:GD,st:INK,sw:s*.07,ls:s*.02})}</g>`};
const KEY='Ranked by season P&L · $100K on every trade';
const flagCC=cc=>cc;
/* text block helpers */
const nm=(r,x,y,s,w,o)=>{o=o||{};let ns=s,vs=s*.42;const tot=tw(r.name,ns)+ns*.18+tw(r.ver,vs);if(tot>w){const k=w/tot;ns*=k;vs*=k}const g=tw(r.name,ns)+ns*.18+tw(r.ver,vs);let x0=o.a==='start'?x:x-g/2;
  return T(x0,y,ns,r.name,{a:'start',c:o.c||CR,st:o.st,sw:o.sw})+T(x0+tw(r.name,ns)+ns*.18,y+ns*.12,vs,r.ver,{a:'start',c:o.vc||o.c||CR,op:o.vop||.8})};
/* season P&L + W-L on one line, labelled */
function stat(r,x,y,s,w,o){o=o||{};const pt=$(r.pl),ws=`${r.W}-${r.L}`,L1='SEASON P&L',L2='W-L',ls=s*.5;
  const need=k=>tw(L1,k*.5,'s')+k*.35+tw(pt,k)+k*.9+tw(L2,k*.5,'s')+k*.35+tw(ws,k);let k=s;if(need(k)>w)k*=w/need(k);
  let px=o.a==='start'?x:x-need(k)/2;const lc=o.lc||LB;let t='';
  t+=T(px,y,k*.5,L1,{a:'start',f:'s',c:lc});px+=tw(L1,k*.5,'s')+k*.35;t+=T(px,y,k,pt,{a:'start',c:r.pl>=0?(o.up||UP):(o.dn||DN),st:o.st,sw:o.sw});px+=tw(pt,k)+k*.9;
  t+=T(px,y,k*.5,L2,{a:'start',f:'s',c:lc});px+=tw(L2,k*.5,'s')+k*.35;t+=wl(r,k,px,y,{a:'start',dc:lc,wc:o.up,lc:o.dn,st:o.st,sw:o.sw});return t}
const tag=(x,y,s,w)=>T(x,y,fit(s,KEY,w,'s'),KEY,{f:'s',c:LB});
