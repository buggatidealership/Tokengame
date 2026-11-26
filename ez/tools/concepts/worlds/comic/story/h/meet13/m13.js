/* meet13 · Meet the models as a hand-painted sports standings board (mockup overlay over the built v46-live-x2plus.html).
   window.__M13(take) with take n0|n1|n2|n3. One painting (Hedra gpt-image-2, every plate blank) as an <image> in one SVG; every word and number is
   live SVG text from __x2pPnl() / MODELS / ROUNDS, painted on with a rough-edge filter and the board's own grain multiplied back through it.
   Founder portraits sit in the painted picture frames (the loops' posters; a <video> in a foreignObject would be the build). No perspective.
   Rows ranked by season P&L. #1: the red pennant beside its row carries a drawn crown. Geometry: fractions of each painting (measured on the files). */
(function(){
const D=document;
/* x fractions of W, y fractions of H. rows = row centres. name/lamps given as offsets from the row centre (dy). */
const G={
 n0:{p:{img:'n0p',W:1536,H:2048,crop:[.017,.031,.977,.9625],hd:[.081,.0775,.92,.265],lab:[.2955,.043],rows:[.3815,.5025,.623,.7435],ph:.103,
      rank:[.132,.105],fr:[.268,.0927,.076],name:[.4633,.2307,-.0275,.0465],lamps:[.368,.4133,.46,.5093,.5573],ldy:.0205,lr:.0125,pnl:[.704,.224],wl:[.8747,.0907],
      last:[.081,.92,.861,.0935],pen:[.087,.235]},
     w:{img:'n0w',W:2048,H:1152,crop:[.0425,.0267,.9575,.969],hd:[.075,.078,.9275,.207],lab:[.237,.0436],rows:[.3378,.48,.622,.7644],ph:.089,
      rank:[.1155,.0515],fr:[.206,.0605,.093],name:[.3535,.177,0,.089],pnl:[.5325,.155],wl:[.6525,.049],l5:[.723,.7685,.8135,.858,.9025],l5w:.038,
      last:[.075,.9275,.877,.0756],pen:[.0615,.255]}},
 n1:{p:{img:'n1p',W:1536,H:2048,crop:[.04,.03,.96,.975],hd:[.137,.1775,.88,.34],lab:[.3695,.039],rows:[.4463,.5537,.6631,.7695],ph:.0925,
      rank:[.182,.091],fr:[.3015,.081,.0675],name:[.4767,.204,-.0243,.044],lamps:[.39,.432,.474,.5167,.56],ldy:.0177,lr:.012,pnl:[.689,.2],wl:[.8407,.079],
      last:[.137,.88,.86,.058],pen:[.105,.455],cs:.042},
     w:{img:'n1w',W:2048,H:1152,crop:[.06,0,.94,.985],hd:[.159,.162,.845,.269],lab:[.2925,.033],rows:[.3733,.4913,.6094,.7274],ph:.07,
      rank:[.192,.04],fr:[.2637,.0469,.0729],name:[.3822,.1428,0,.07],pnl:[.5264,.1232],wl:[.623,.0396],l5:[.68,.7164,.7528,.7884,.8244],l5w:.03,
      last:[.159,.845,.822,.065],pen:[.145,.31],cs:.02}},
 n2:{p:{img:'n2p',W:1536,H:2048,crop:[0,.03,1,.985],hd:[.163,.19,.855,.3435],lab:[.3703,.0375],rows:[.4425,.543,.6426,.7432],ph:.085,
      rank:[.2057,.085],fr:[.3177,.0781,.0645],name:[.4797,.19,-.023,.039],lamps:[.3987,.4373,.4773,.5173,.5573],ldy:.0175,lr:.012,pnl:[.678,.185],wl:[.8187,.073],
      last:[.163,.855,.836,.07],pen:[.127,.455],cs:.042},
     w:{img:'n2w',W:2048,H:1152,crop:[.04,0,.96,.985],hd:[.19,.227,.83,.317],lab:[.342,.035],rows:[.422,.532,.641,.7467],ph:.068,
      rank:[.2204,.039],fr:[.2879,.0468,.0711],name:[.399,.132,0,.068],pnl:[.5344,.1136],wl:[.6244,.0368],l5:[.6772,.7116,.7452,.7784,.812],l5w:.028,
      last:[.19,.83,.8333,.062],pen:[.18,.355],cs:.018}},
 n3:{p:{img:'n3p2',W:1536,H:2048,crop:[0,.02,1,.99],hd:[.1613,.18,.8467,.316],lab:[.3443,.0385],rows:[.415,.5137,.6123,.7109],ph:.0835,
      rank:[.203,.083],fr:[.3112,.0755,.0635],name:[.47,.1866,-.0232,.0385],lamps:[.39,.4287,.468,.508,.5467],ldy:.016,lr:.0115,pnl:[.6687,.19],wl:[.8107,.072],
      last:[.1613,.8467,.8025,.065],pen:[.12,.35],cs:.04},
     w:{img:'n3w',W:2048,H:1152,crop:[.03,0,.97,1],hd:[.154,.14,.858,.255],lab:[.279,.044],rows:[.362,.4829,.6026,.7209],ph:.071,
      rank:[.1886,.041],fr:[.2637,.0469,.0694],name:[.3846,.145,0,.071],pnl:[.533,.126],wl:[.6316,.039],l5:[.6896,.7268,.764,.8004,.8372],l5w:.03,
      last:[.154,.858,.822,.062],pen:[.14,.29],cs:.018}}
};
const CR='#fff5d8',UP='#5be38d',DN='#ff6a55',GD='#ffd21f',INK='#0b0907';
const FND=m=>'media/founder-'+m.toLowerCase()+(m==='GROK'||m==='GPT'?'-anim2':'-anim')+'.jpg';
const TRY=['Mistral','Qwen','Gemini','Nemotron'];
function data(){const A=__x2pPnl().A,M=window.MODELS||{};
  const rows=Object.keys(A).filter(m=>M[m]).map(m=>{const a=A[m],ks=Object.keys(a.per).map(Number).sort((x,y)=>y-x).slice(0,5);
    return {m,name:M[m].name,ver:M[m].ver,pl:a.bal-1e5,W:a.W,L:a.L,l5:ks.map(k=>a.per[k].v>0?'W':'L').reverse()}});
  rows.sort((a,b)=>b.pl-a.pl);return rows}
const graded=()=>(window.ROUNDS||[]).filter(r=>typeof r.a==='number'&&!isNaN(r.a)).length;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
function T(x,y,s,str,o){o=o||{};return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}" text-anchor="${o.a||'middle'}" dominant-baseline="central" fill="${o.c||CR}" font-family="${o.ff||'Anton,sans-serif'}"${o.fw?` font-weight="${o.fw}"`:''}${o.ls?` letter-spacing="${(+o.ls).toFixed(2)}"`:''}${o.op?` opacity="${o.op}"`:''}${o.tr?` transform="${o.tr}"`:''}>${o.raw||esc(str)}</text>`}
function mark(m,x,y,s,fill){const M=window.MODELS&&MODELS[m];if(!M||!M.d)return '';const k=s/24;return `<path d="${M.d}" fill-rule="${M.fr||'nonzero'}" transform="translate(${(x-s/2).toFixed(1)} ${(y-s/2).toFixed(1)}) scale(${k.toFixed(4)})" fill="${fill}"/>`}
/* Anton width estimate per char (em); Shantell a touch wider. Canvas measure when fonts are in. */
const cv=D.createElement('canvas').getContext('2d');
const tw=(s,fs,ff)=>{cv.font=`${ff&&/Shantell/.test(ff)?'700 ':''}${fs}px ${ff||'Anton'}`;return cv.measureText(String(s)).width};
const fit=(s,str,w,ff)=>Math.min(s,s*w/Math.max(1,tw(str,s,ff)));
function crown(x,y,s,c){/* a drawn crown, ink line in the board's cream */const p=[[-.5,.32],[-.5,-.18],[-.25,.08],[0,-.42],[.25,.08],[.5,-.18],[.5,.32]].map(([a,b])=>`${(x+a*s).toFixed(1)},${(y+b*s).toFixed(1)}`).join(' ');
  return `<g><polygon points="${p}" fill="${c}" stroke="${INK}" stroke-width="${(s*.07).toFixed(1)}" stroke-linejoin="round"/><rect x="${(x-.5*s).toFixed(1)}" y="${(y+.38*s).toFixed(1)}" width="${s.toFixed(1)}" height="${(s*.14).toFixed(1)}" fill="${c}" stroke="${INK}" stroke-width="${(s*.06).toFixed(1)}"/>${[-.5,0,.5].map(a=>`<circle cx="${(x+a*s).toFixed(1)}" cy="${(y+(a?-.24:-.48)*s).toFixed(1)}" r="${(s*.08).toFixed(1)}" fill="${c}" stroke="${INK}" stroke-width="${(s*.05).toFixed(1)}"/>`).join('')}</g>`}
function build(take,wide){const g=G[take][wide?'w':'p'],W=g.W,H=g.H,X=f=>f*W,Y=f=>f*H,R=data(),id='m13'+take+(wide?'w':'p');
  const [cx0,cy0,cx1,cy1]=g.crop,vb=[X(cx0),Y(cy0),X(cx1-cx0),Y(cy1-cy0)];
  const ph=Y(g.ph);let txt='',top='',pics='',lit='',fine='';
  /* header board: the section title (the only gold) + one line */
  const [hx0,hy0,hx1,hy1]=g.hd,hw=X(hx1-hx0),hh=Y(hy1-hy0),hcx=X((hx0+hx1)/2);
  const ty=Y(hy0)+hh*(wide?.4:.4),ts=fit(Math.min(hh*(wide?.5:.36),hw*.2),'MEET THE MODELS',hw*.86,'Bangers');
  top+=`<g transform="rotate(-2 ${hcx.toFixed(0)} ${ty.toFixed(0)})">${T(hcx+ts*.06,ty+ts*.07,ts,'MEET THE MODELS',{ff:'Bangers,Anton,sans-serif',c:INK,ls:ts*.02})}<text x="${hcx.toFixed(1)}" y="${ty.toFixed(1)}" font-size="${ts.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-family="Bangers,Anton,sans-serif" letter-spacing="${(ts*.02).toFixed(1)}" fill="${GD}" stroke="${INK}" stroke-width="${(ts*.07).toFixed(1)}" paint-order="stroke" stroke-linejoin="round">MEET THE MODELS</text></g>`;
  const sub=`Season 1 · ${graded()} rounds · ranked by P&L, $100K on every trade`;
  const ns=fit(hh*(wide?.15:.11),sub,hw*.9,'Shantell Sans');
  fine+=T(hcx,Y(hy0)+hh*(wide?.79:.76),ns,sub,{ff:'Shantell Sans,sans-serif',fw:700});
  /* heading strip */
  const ly=Y(g.lab[0]),ls=Math.min(Y(g.lab[1])*.42,X(.022)*(wide?1:1.25)),lab=(x,s,a)=>{fine+=T(x,ly,ls,s,{ff:'Shantell Sans,sans-serif',fw:800,ls:ls*.04,a:a||'middle'})};
  lab(X(g.rank[0]),'NO.');lab(X(g.fr[0]),wide?'FOUNDER':'');lab(X(g.name[0]),wide?'MODEL':'MODEL · LAST 5');lab(X(g.pnl[0]),'SEASON P&L');lab(X(g.wl[0]),'W-L');
  if(wide)lab((X(g.l5[0])+X(g.l5[4]))/2,'LAST 5 · NEWEST →');
  /* rows */
  R.forEach((r,i)=>{const y=Y(g.rows[i]);
    /* rank */
    txt+=T(X(g.rank[0]),y+ph*.01,fit(ph*.62,String(i+1),X(g.rank[1])*.7),String(i+1));
    /* founder in the frame */
    const fw=X(g.fr[1]),fh=Y(g.fr[2]),fx=X(g.fr[0])-fw/2,fy=y-fh/2;
    pics+=`<clipPath id="${id}f${i}"><rect x="${fx.toFixed(1)}" y="${fy.toFixed(1)}" width="${fw.toFixed(1)}" height="${fh.toFixed(1)}"/></clipPath>
      <g clip-path="url(#${id}f${i})"><image href="${FND(r.m)}" x="${fx.toFixed(1)}" y="${fy.toFixed(1)}" width="${fw.toFixed(1)}" height="${fh.toFixed(1)}" preserveAspectRatio="xMidYMid slice" style="filter:saturate(.82) contrast(1.05)"/>
      <rect x="${fx.toFixed(1)}" y="${fy.toFixed(1)}" width="${fw.toFixed(1)}" height="${fh.toFixed(1)}" fill="url(#${id}vg)"/></g>`;
    /* name plate: the model's mark + name */
    const [nx,nw,ndy,nh]=g.name,ncx=X(nx),ny=y+Y(ndy),npw=X(nw),nph=Y(nh),msz=Math.min(nph*.56,npw*.16);
    const nfs0=Math.min(nph*.6,npw*.2),nfs=fit(nfs0,r.name,npw*.92-msz*1.35-npw*.06);const tot=msz*1.35+tw(r.name,nfs)+nfs*.04*r.name.length,nx0=ncx-tot/2;
    txt+=mark(r.m,nx0+msz/2,ny,msz,CR);txt+=T(nx0+msz*1.35,ny+nfs*.02,nfs,r.name,{a:'start',ls:nfs*.04});
    /* season P&L */
    const ps=$(r.pl),pfs=fit(ph*(wide?.56:.42),ps,X(g.pnl[1])*.86);txt+=T(X(g.pnl[0]),y+pfs*.02,pfs,ps,{c:r.pl>=0?UP:DN});
    /* W-L */
    const ws=`${r.W}-${r.L}`,wfs=fit(ph*.4,ws,X(g.wl[1])*.84);
    txt+=T(X(g.wl[0]),y+wfs*.02,wfs,'',{raw:`<tspan fill="${UP}">${r.W}</tspan><tspan>-</tspan><tspan fill="${DN}">${r.L}</tspan>`});
    /* last 5 */
    if(wide){const s5=fit(ph*.42,'W',X(g.l5w)*.7);r.l5.forEach((c,j)=>{txt+=T(X(g.l5[j]),y+s5*.02,s5,c,{c:c==='W'?UP:DN})})}
    else{const ly2=y+Y(g.ldy),lr=Y(g.lr);r.l5.forEach((c,j)=>{const lx=X(g.lamps[j]),col=c==='W'?UP:DN;
      lit+=`<circle cx="${lx.toFixed(1)}" cy="${ly2.toFixed(1)}" r="${(lr*2.3).toFixed(1)}" fill="url(#${id}g${c})" style="mix-blend-mode:screen"/>
        <circle cx="${lx.toFixed(1)}" cy="${ly2.toFixed(1)}" r="${(lr*1.02).toFixed(1)}" fill="${col}" opacity=".78" style="mix-blend-mode:multiply"/>`;
      fine+=T(lx,ly2+lr*.04,lr*1.05,c,{c:INK,op:.85})})}
  });
  /* #1's pennant: a drawn crown */
  top+=`<g transform="rotate(${wide?-12:-8} ${X(g.pen[0]).toFixed(0)} ${Y(g.pen[1]).toFixed(0)})">${crown(X(g.pen[0]),Y(g.pen[1]),X(g.cs||(wide?.026:.05)),CR)}</g>`;
  /* No. 5? in tryouts */
  const [l0,l1,lyc,lh]=g.last,lw=X(l1-l0),lcy=Y(lyc),lfs=Math.min(Y(lh)*.38,lw*.06);
  const tline=`IN TRYOUTS: ${TRY.join(' · ').toUpperCase()}`,tfs=fit(lfs*(wide?.8:.66),tline,lw*.78-tw('NO. 5?',lfs));
  const gw=tw('NO. 5?',lfs)*1.04+lfs*.6+tw(tline,tfs)*1.04,gx=Math.max(X(l0)+lw*.04,X(l0)+(lw-gw)/2);
  txt+=T(gx,lcy,lfs,'NO. 5?',{a:'start',ls:lfs*.04});
  fine+=T(gx+tw('NO. 5?',lfs)*1.04+lfs*.6,lcy,tfs,tline,{a:'start',op:.8,ls:tfs*.04});
  const img=`tools/concepts/worlds/comic/story/h/meet13/img/${g.img}.jpg`;
  return `<svg class="m13-svg" viewBox="${vb.map(v=>v.toFixed(0)).join(' ')}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Meet the models: the Season 1 standings, ranked by season P&L">
   <defs><filter id="${id}p" x="-3%" y="-10%" width="106%" height="120%" filterUnits="objectBoundingBox"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${(ph*.03).toFixed(1)}" xChannelSelector="R" yChannelSelector="G" result="d"/>
     <feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="2" seed="3" result="n2"/><feColorMatrix in="n2" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.6" result="a"/><feComposite in="d" in2="a" operator="in"/></filter>
    <radialGradient id="${id}vg" cx="50%" cy="42%" r="70%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".62"/></radialGradient>
    <radialGradient id="${id}gW"><stop offset="0" stop-color="${UP}" stop-opacity=".55"/><stop offset="1" stop-color="${UP}" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}gL"><stop offset="0" stop-color="${DN}" stop-opacity=".55"/><stop offset="1" stop-color="${DN}" stop-opacity="0"/></radialGradient>
    <filter id="${id}q" x="-3%" y="-10%" width="106%" height="120%" filterUnits="objectBoundingBox"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${(ph*.012).toFixed(1)}" xChannelSelector="R" yChannelSelector="G" result="d"/>
     <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="1" seed="3" result="n2"/><feColorMatrix in="n2" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -.5 1.5" result="a"/><feComposite in="d" in2="a" operator="in"/></filter>
    <clipPath id="${id}k">${txt}${fine}</clipPath></defs>
   <image href="${img}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="none"/>
   ${pics}${lit}
   <g filter="url(#${id}p)">${txt}</g><g filter="url(#${id}q)">${fine}</g>
   <image href="${img}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="none" clip-path="url(#${id}k)" style="mix-blend-mode:multiply" opacity=".24"/>
   <g filter="url(#${id}p)">${top}</g>
  </svg>`}
window.__M13G=G;
window.__M13=function(take){const sec=D.querySelector('section.c8');if(!sec)return false;D.documentElement.classList.add('m13-on','m13-'+take);
  [...sec.children].forEach(c=>{if(!c.classList.contains('m13'))c.style.display='none'});
  let host=sec.querySelector(':scope>.m13');if(!host){host=D.createElement('div');host.className='m13';sec.appendChild(host)}
  const wide=matchMedia('(min-width:900px)').matches;host.innerHTML=build(take,wide);
  host.insertAdjacentHTML('beforeend',`<table class="m13-sr"><caption>Meet the models: Season 1 standings, ranked by season P&amp;L ($100K on every call).</caption><tr><th>No.</th><th>Model</th><th>Season P&amp;L</th><th>W-L</th><th>Last 5, oldest to newest</th></tr>${data().map((r,i)=>`<tr><td>${i+1}</td><td>${esc(r.ver)}</td><td>${$(r.pl)}</td><td>${r.W}-${r.L}</td><td>${r.l5.join(' ')}</td></tr>`).join('')}<tr><td>5?</td><td colspan="4">In tryouts: ${TRY.join(', ')}</td></tr></table>`);
  return true};
})();
