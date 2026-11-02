/* sol10 · Smart or lucky as a sports standings board (mockup overlay over the built v46-live-x2plus.html).
   window.__S10(take) with take n0|n1|n2|n3. The painting is an <image> in one SVG; every word and number is live SVG text
   from __x2pPnl/MODELS, painted on with a rough-edge filter and the board's own grain multiplied back through it.
   Geometry is in fractions of each painting (measured with prof.py / ruler.py). No perspective anywhere. */
(function(){
const D=document,NS='http://www.w3.org/2000/svg';
/* p = phone (3:4, 1536x2048, 5 plates: W L HIT VS L10), w = wide (16:9, 2048x1152, name | 10 small | W L HIT VS) */
const G={
 n0:{p:{img:'n0p',W:1536,H:2048,crop:[.035,.035,.965,.935],hd:[.096,.087,.915,.278],lab:.3096,rows:[.386,.495,.6045,.714,.823],ph:.080,name:[.096,.366],cols:[.430,.536,.643,.749,.857],pw:.088},
     w:{img:'n0w2',W:2048,H:1152,crop:[.035,.03,.965,.965],hd:[.063,.090,.93,.248],lab:.286,rows:[.369,.4915,.612,.735,.852],ph:.08,name:[.063,.233],small:[26.6,30.7,34.7,38.7,42.7,46.8,51.1,55.5,59.8,64.4],sw:.037,cols:[.730,.788,.845,.906],pw:.05}},
 n1:{p:{img:'n1p',W:1536,H:2048,crop:[.12,.075,.88,.94],hd:[.195,.2227,.805,.3618],lab:.385,rows:[.441,.521,.600,.680,.760],ph:.058,name:[.200,.398],cols:[.444,.522,.5985,.676,.754],pw:.064},
     w:{img:'n1w',W:2048,H:1152,crop:[.11,.06,.89,.86],hd:[.225,.2144,.80,.3142],lab:.338,rows:[.390,.468,.546,.624,.702],ph:.054,name:[.235,.345],small:[36.55,39.2,41.8,44.35,46.95,49.65,52.35,55.15,58.0,60.9],sw:.025,cols:[.665,.701,.739,.7775],pw:.034}},
 n2:{p:{img:'n2p',W:1536,H:2048,crop:[.125,.02,.875,.885],hd:[.193,.1943,.817,.3477],lab:.373,rows:[.4355,.524,.613,.702,.790],ph:.063,name:[.193,.405],cols:[.4535,.537,.619,.7025,.7835],pw:.070},
     w:{img:'n2w',W:2048,H:1152,crop:[.10,.03,.90,.86],hd:[.21,.1953,.815,.3038],lab:.329,rows:[.383,.4665,.55,.633,.717],ph:.056,name:[.215,.332],small:[35.4,38.15,41.0,43.7,46.5,49.35,52.2,55.15,58.1,61.3],sw:.026,cols:[.672,.712,.752,.793],pw:.035}},
 n3:{p:{img:'n3p',W:1536,H:2048,crop:[.01,.04,.99,.97],hd:[.138,.1577,.894,.3384],lab:.368,rows:[.44,.543,.647,.750,.853],ph:.074,name:[.138,.392],cols:[.4515,.552,.6515,.7515,.852],pw:.083},
     w:{img:'n3w',W:2048,H:1152,crop:[.09,.08,.91,.90],hd:[.17,.1944,.83,.3108],lab:.338,rows:[.4035,.4937,.5857,.6743,.7724],ph:.063,name:[.1775,.304],small:[32.8,35.9,38.9,41.9,45.0,48.05,51.2,54.4,57.7,61.05],sw:.028,cols:[.6755,.7185,.7625,.8065],pw:.039}}
};
const CR='#fff5d8',UP='#58e08a',DN='#ff6a55',GD='#ffd21f';
const NM={GROK:'Grok',CLAUDE:'Claude',GPT:'GPT',KIMI:'Kimi'};
function data(){const A=__x2pPnl().A;const rows=Object.keys(A).filter(m=>NM[m]).map(m=>{const a=A[m],t=a.W+a.L,ks=Object.keys(a.per).map(Number).sort((x,y)=>y-x).slice(0,10);
   const l10=ks.map(k=>a.per[k].v>0?'W':'L').reverse();const vs=a.W-t/2;
   return {m,name:NM[m].toUpperCase(),W:a.W,L:a.L,t,hr:t?a.W/t:0,vs,l10,l10w:l10.filter(x=>x==='W').length}});
  rows.push({m:'COIN',name:'COIN FLIP',coin:1,hr:.5,vs:0,l10:[]});
  rows.sort((a,b)=>b.hr-a.hr||(b.W||0)-(a.W||0));return rows}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pct=v=>Math.round(v*100)+'%';
const sg=v=>(v>0?'+':v<0?'−':'±')+(Math.abs(v)%1?Math.abs(v).toFixed(1):Math.abs(v));
function T(x,y,s,str,o){o=o||{};return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}" text-anchor="${o.a||'middle'}" dominant-baseline="central" fill="${o.c||CR}" font-family="${o.ff||'Anton,sans-serif'}"${o.fw?` font-weight="${o.fw}"`:''}${o.ls?` letter-spacing="${o.ls}"`:''}${o.op?` opacity="${o.op}"`:''}${o.tr?` transform="${o.tr}"`:''}>${o.raw||esc(str)}</text>`}
function mark(m,x,y,s,fill){const M=window.MODELS&&MODELS[m];if(!M||!M.d)return '';const k=s/24;return `<path d="${M.d}" transform="translate(${(x-s/2).toFixed(1)} ${(y-s/2).toFixed(1)}) scale(${k.toFixed(4)})" fill="${fill}"/>`}
function coin(x,y,r){return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${CR}" stroke-width="${(r*.16).toFixed(1)}"/><circle cx="${x}" cy="${y}" r="${(r*.62).toFixed(1)}" fill="none" stroke="${CR}" stroke-width="${(r*.09).toFixed(1)}" opacity=".8"/>${T(x,y+r*.04,r*.95,'½',{ff:'Anton'})}</g>`}
/* fit: shrink font so an n-char Anton string fits width w (Anton ~.5em per char, .62 for %) */
const fit=(s,str,w)=>{const em=[...String(str)].reduce((a,c)=>a+(c==='%'?.66:c===' '?.25:/[A-Z]/.test(c)?.52:.47),0);return Math.min(s,w/em)};
function build(take,wide){const g=G[take][wide?'w':'p'],W=g.W,H=g.H,X=f=>f*W,Y=f=>f*H;const R=data();
  const [cx0,cy0,cx1,cy1]=g.crop,vb=[X(cx0),Y(cy0),X(cx1-cx0),Y(cy1-cy0)];
  const ph=Y(g.ph),pw=X(g.pw);let txt='',top='';
  /* header board: title + narrator */
  const [hx0,hy0,hx1,hy1]=g.hd,hw=X(hx1-hx0),hh=Y(hy1-hy0),hcx=X((hx0+hx1)/2);
  const ts=Math.min(hh*(wide?.44:.36),hw/7.2);
  top+=`<g class="s10-ttl" transform="rotate(-2 ${hcx.toFixed(0)} ${(Y(hy0)+hh*.34).toFixed(0)})">${T(hcx+ts*.06,Y(hy0)+hh*.34+ts*.07,ts,'SMART OR LUCKY?',{ff:'Bangers,Anton,sans-serif',c:'#0b0907',ls:ts*.02})}<text x="${hcx.toFixed(1)}" y="${(Y(hy0)+hh*.34).toFixed(1)}" font-size="${ts.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-family="Bangers,Anton,sans-serif" letter-spacing="${(ts*.02).toFixed(1)}" fill="${GD}" stroke="#0b0907" stroke-width="${(ts*.07).toFixed(1)}" paint-order="stroke" stroke-linejoin="round">SMART OR LUCKY?</text></g>`;
  const ns=Math.min(hh*(wide?.135:.12),hw/30);
  txt+=T(hcx,Y(hy0)+hh*.66,ns,'',{ff:'Shantell Sans,sans-serif',fw:700,raw:'A coin flip wins half its trades. Who’s beating it?'});
  txt+=T(hcx,Y(hy0)+hh*.84,ns*.82,'',{ff:'Shantell Sans,sans-serif',fw:600,op:.86,raw:'<tspan font-weight="800">VS COIN</tspan>: wins above what a coin gets on the same trades.'});
  /* column heads on the strip */
  const ly=Y(g.lab),ls=Math.min(Y(.03)*(wide?.95:.62),pw*.27);const lab=(x,s,o)=>{const L=String(s).split('\n');L.forEach((l,k)=>{txt+=T(x,ly+(k-(L.length-1)/2)*ls*1.02,ls,l,Object.assign({ff:'Shantell Sans,sans-serif',fw:800,ls:ls*.03},o||{}))})};
  lab(X(g.name[0])+ls*.6,'MODEL',{a:'start'});
  const heads=wide?['W','L','HIT %','VS COIN']:['W','L','HIT\nRATE','VS\nCOIN','LAST\n10'];
  heads.forEach((h,i)=>{if(wide){const z=Math.min(ls,pw*1.05/(h.length*.62));txt+=T(X(g.cols[i]),ly,z,h,{ff:'Shantell Sans,sans-serif',fw:800})}else lab(X(g.cols[i]),h)});
  if(wide){const a=X(g.small[0]/100)-X(g.sw)/2,b=X(g.small[9]/100)+X(g.sw)/2;lab((a+b)/2,'LAST 10 TRADES · OLDEST → NEWEST')}
  /* rows */
  R.forEach((r,i)=>{const y=Y(g.rows[i]),nx0=X(g.name[0]),nw=X(g.name[1]-g.name[0]);const dim=r.coin?{op:.78}:{};
    const ms=ph*.5;let x=nx0+ph*.18+ms/2;
    if(r.coin)top+=coin(x,y,ms*.5);else txt+=mark(r.m,x,y,ms,CR);
    const ns2=fit(ph*.46,r.name,nw-ms-ph*.55);txt+=T(x+ms/2+ph*.16,y,ns2,r.name,Object.assign({a:'start',ls:ns2*.04},dim));
    const fs=ph*.5;
    const cells=r.coin?['–','–',pct(.5),'±0','–']:[r.W,r.L,pct(r.hr),sg(r.vs),r.l10w+'-'+(r.l10.length-r.l10w)];
    const colr=[null,null,null,r.coin?null:(r.vs>0?UP:r.vs<0?DN:null),null];
    (wide?cells.slice(0,4):cells).forEach((c,j)=>{const s=fit(fs,c,pw*.76);txt+=T(X(g.cols[j]),y+s*.02,s,String(c),Object.assign({c:colr[j]||CR},dim))});
    if(wide){const sw=X(g.sw);(r.coin?Array(10).fill('½'):r.l10).forEach((c,j)=>{const s=fit(ph*.42,'W',sw*.8);txt+=T(X(g.small[j]/100),y,s,c,{c:c==='W'?UP:c==='L'?DN:CR,op:r.coin?.45:1})})}
  });
  const id='s10'+take+(wide?'w':'p'),img=`tools/concepts/worlds/comic/story/h/sol10/img/${g.img}.jpg`;
  return `<svg class="s10-svg" viewBox="${vb.map(v=>v.toFixed(0)).join(' ')}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Smart or lucky: standings by hit rate against a coin flip">
   <defs><filter id="${id}p" x="-3%" y="-10%" width="106%" height="120%" filterUnits="objectBoundingBox"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${(ph*.035).toFixed(1)}" xChannelSelector="R" yChannelSelector="G" result="d"/>
     <feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="2" seed="3" result="n2"/><feColorMatrix in="n2" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.55" result="a"/><feComposite in="d" in2="a" operator="in"/></filter>
    <clipPath id="${id}k">${txt}</clipPath></defs>
   <image href="${img}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="none"/>
   <g filter="url(#${id}p)">${txt}</g>
   <image href="${img}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="none" clip-path="url(#${id}k)" style="mix-blend-mode:multiply" opacity=".26"/>
   <g class="s10-top" filter="url(#${id}p)">${top}</g>
  </svg>`}
window.__S10=function(take){const sec=D.getElementById('learn');if(!sec)return;D.documentElement.classList.add('s10-on','s10-'+take);
  [...sec.children].forEach(c=>{if(!c.classList.contains('s10'))c.style.display='none'});
  let host=sec.querySelector(':scope>.s10');if(!host){host=D.createElement('div');host.className='s10';sec.appendChild(host)}
  const wide=matchMedia('(min-width:900px)').matches;host.innerHTML=build(take,wide);
  host.insertAdjacentHTML('beforeend',`<table class="s10-sr"><caption>Smart or lucky? Standings by hit rate; a coin flip wins half its trades.</caption><tr><th>Model</th><th>W</th><th>L</th><th>Hit rate</th><th>Wins above a coin</th><th>Last 10</th></tr>${data().map(r=>`<tr><td>${r.name}</td><td>${r.W??'–'}</td><td>${r.L??'–'}</td><td>${pct(r.hr)}</td><td>${sg(r.vs)}</td><td>${r.coin?'–':r.l10w+'-'+(r.l10.length-r.l10w)}</td></tr>`).join('')}</table>`);
  return true};
})();
