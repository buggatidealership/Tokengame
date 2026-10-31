/* Round H2, area "upcoming2": shared bits for the four takes (A..D) and the sign study. Built on ../upcoming/_hu.js (HU).
   Everything shown comes from the page: rounds, days, calls, names, tickers, logo files, brand colours (SE, TICKERS, CAPS, ROUNDS).
   The painted layers are img/*.jpg from Hedra; the company's mark is never painted by a model in method (a): the page places the
   site's own logo file on the painting's blank lit panel, and traces a ring of bulbs around the mark's own outline. */
window.H2=(function(){const U=HU,S=U.S,D=document,e=U.esc,I='tools/concepts/worlds/comic/story/h/upcoming2/img/';
/* blank panels measured on each painting (% of the picture), see panels.json */
const PAN={'a-roof':{x:17.97,y:15.89,w:64.45,h:31.25},'a-roof-seed':{x:20.69,y:19.81,w:58.61,h:34.81},'a-tower':{x:22.46,y:21.61,w:57.42,h:37.24},'a-arena':{x:16.6,y:28.39,w:67.77,h:22.14},'a-roof-2k':{x:20.7,y:13.54,w:61.13,h:35.68}};
/* the calls-in state for the mock: the newest graded round's own calls, read from ROUNDS (never typed) */
const PAST=(()=>{const r=(window.ROUNDS||[]).slice(-1)[0];if(!r)return null;
  return {n:r.n,co:r.co,tk:r.ticker,calls:(r.calls||[]).map(c=>{const m=String(c[1]).match(/(UP|DOWN)\s*([\d.]+)/i);return m?{m:c[0],dir:m[1].toUpperCase(),mag:+m[2]}:null}).filter(Boolean)}})();
const callsOf=x=>window.__h2Calls&&PAST?S.ORDER.map(m=>({m,c:PAST.calls.find(c=>c.m===m)||null})):U.calls(x);
const anyIn=x=>callsOf(x).some(k=>k.c);
const ctext=c=>c?(c.dir==='UP'?'▲':'▼')+' '+Math.abs(+c.mag)+'%':'?';
const csr=(m,c)=>`${S.NM[m]}: ${c?(c.dir==='UP'?'up ':'down ')+Math.abs(+c.mag)+'%':'call not in yet'}`;

/* ---- the bulb ring: trace the outline of the (dilated) mark and set bulbs along it at even spacing ---- */
function loadImg(src){return new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src})}
/* outline chains: the boundary pixels of the mark, walked neighbour to neighbour (a chain per outline) */
function contours(b,W,H){const isB=new Uint8Array(W*H),seen=new Uint8Array(W*H),out=[];const at=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&b[y*W+x];
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(b[y*W+x]&&(!at(x-1,y)||!at(x+1,y)||!at(x,y-1)||!at(x,y+1)))isB[y*W+x]=1;
  const N8=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];
  for(let i=0;i<W*H;i++){if(!isB[i]||seen[i])continue;let cx=i%W,cy=(i/W)|0;const P=[];seen[i]=1;
    for(;;){P.push([cx,cy]);let nx=-1,ny=-1;
      for(const [dx,dy] of N8){const X=cx+dx,Y=cy+dy;if(X>=0&&Y>=0&&X<W&&Y<H&&isB[Y*W+X]&&!seen[Y*W+X]){nx=X;ny=Y;break}}
      if(nx<0)for(let r=2;r<=3&&nx<0;r++)for(let dy=-r;dy<=r&&nx<0;dy++)for(let dx=-r;dx<=r;dx++){const X=cx+dx,Y=cy+dy;if(X>=0&&Y>=0&&X<W&&Y<H&&isB[Y*W+X]&&!seen[Y*W+X]){nx=X;ny=Y;break}}
      if(nx<0)break;seen[ny*W+nx]=1;cx=nx;cy=ny}
    out.push(P)}return out}
/* the mark as a smooth white mask: a logo drawn on a tile loses the tile (so a wordmark on a coloured square becomes its letters) */
const mcache={};
async function mask(t){if(mcache[t])return mcache[t];const src=S.logo(t);const im=src&&await loadImg(src);if(!im)return mcache[t]=null;
  const w=im.naturalWidth,h=im.naturalHeight,c=D.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(im,0,0);
  const id=x.getImageData(0,0,w,h),d=id.data,tile=[0,w-1,(h-1)*w,(h-1)*w+w-1].every(i=>d[i*4+3]>250),bg=[d[0],d[1],d[2]];
  const m0=await U.mark(t,400);if(!tile&&!(m0&&m0.mono))return mcache[t]={own:src};
  for(let i=0;i<w*h;i++){const q=i*4;let a=d[q+3];if(tile){const dd=Math.abs(d[q]-bg[0])+Math.abs(d[q+1]-bg[1])+Math.abs(d[q+2]-bg[2]);a=Math.min(255,Math.max(0,(dd-40)*2.2))}d[q]=d[q+1]=d[q+2]=255;d[q+3]=a}
  x.putImageData(id,0,0);let x0=w,y0=h,x1=0,y1=0;for(let i=0;i<w*h;i++)if(d[i*4+3]>128){const X=i%w,Y=(i/w)|0;x0=Math.min(x0,X);x1=Math.max(x1,X);y0=Math.min(y0,Y);y1=Math.max(y1,Y)}
  const bw=x1-x0+1,bh=y1-y0+1,sc=Math.max(1,Math.ceil(1100/Math.max(bw,bh))),o=D.createElement('canvas');o.width=bw*sc;o.height=bh*sc;const ox=o.getContext('2d');
  ox.imageSmoothingQuality='high';ox.filter=`blur(${(sc*.5).toFixed(1)}px)`;ox.drawImage(c,x0,y0,bw,bh,0,0,o.width,o.height);ox.filter='none';
  const od=ox.getImageData(0,0,o.width,o.height);for(let i=3;i<od.data.length;i+=4){const a=od.data[i];od.data[i]=a<110?0:a>150?255:(a-110)*6.3}ox.putImageData(od,0,0);
  /* how many separate shapes the mark has: three or more side by side = a wordmark (its letters already say the name) */
  const sw=Math.max(40,Math.round(160*bw/Math.max(bw,bh))),sh=Math.max(20,Math.round(160*bh/Math.max(bw,bh))),k=D.createElement('canvas');k.width=sw;k.height=sh;const kx=k.getContext('2d');kx.drawImage(o,0,0,sw,sh);
  const kd=kx.getImageData(0,0,sw,sh).data,kb=new Uint8Array(sw*sh);for(let i=0;i<sw*sh;i++)kb[i]=kd[i*4+3]>128?1:0;
  const parts=contours(kb,sw,sh).filter(P=>P.length>8).length;
  return mcache[t]={mask:o.toDataURL(),ar:bw/bh,parts}}
/* bulbs around a mark: returns {w,h,b:[[x,y]..]} in a box of w x h (the mark drawn contain-fit with pad), dilation r, spacing sp */
async function ring(t,w,h,o){o=o||{};const m=await mask(t);if(!m||!m.mask)return null;const im=await loadImg(m.mask);if(!im)return null;
  const c=D.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');const pad=o.pad||.14,ar=im.width/im.height;
  let dw=w*(1-2*pad),dh=dw/ar;if(dh>h*(1-2*pad)){dh=h*(1-2*pad);dw=dh*ar}const ox=(w-dw)/2,oy=(h-dh)/2;
  const r=o.r||Math.max(3,Math.min(dw,dh)*.06);x.filter=`blur(${r}px)`;x.drawImage(im,ox,oy,dw,dh);x.filter='none';
  const a=x.getImageData(0,0,w,h).data,b=new Uint8Array(w*h);for(let i=0;i<w*h;i++)b[i]=a[i*4+3]>18?1:0;
  const sp=o.sp||Math.max(7,Math.min(dw,dh)*.075),B=[];
  for(const P of contours(b,w,h)){if(P.length<sp*3)continue;let acc=sp/2,prev=P[0];
    for(let i=1;i<=P.length;i++){const q=P[i%P.length],dd=Math.hypot(q[0]-prev[0],q[1]-prev[1]);acc+=dd;if(acc>=sp){B.push([q[0],q[1]]);acc=0}prev=q}}
  return {w,h,b:B,box:[ox,oy,dw,dh],mask:m.mask}}
/* the bulbs as SVG: socket, glass, filament glow; every bulb its own small brightness (hand-made, never one even pattern) */
let gid=0;
function bulbsSvg(R,o){o=o||{};const id='h2b'+(gid++),rr=o.size||Math.max(2.4,Math.min(R.w,R.h)*.021),rnd=U.rnd(U.hash(id));
  return `<svg class="h2-bulbs" viewBox="0 0 ${R.w} ${R.h}" aria-hidden="true"><defs><radialGradient id="${id}"><stop offset="0" stop-color="#fffdf0"/><stop offset=".35" stop-color="#ffe9a0"/><stop offset=".7" stop-color="#ffb43a"/><stop offset="1" stop-color="#c86a10"/></radialGradient>
   <radialGradient id="${id}g"><stop offset="0" stop-color="#ffcf6a" stop-opacity=".75"/><stop offset="1" stop-color="#ff9a1a" stop-opacity="0"/></radialGradient></defs>
   <g>${R.b.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${(rr*3.2).toFixed(1)}" fill="url(#${id}g)" opacity="${(.55+rnd()*.45).toFixed(2)}"/>`).join('')}</g>
   <g>${R.b.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${(rr*1.25).toFixed(1)}" fill="#2a1a10"/><circle cx="${x}" cy="${y}" r="${rr.toFixed(1)}" fill="url(#${id})" opacity="${(.82+rnd()*.18).toFixed(2)}"/><circle cx="${(x-rr*.35).toFixed(1)}" cy="${(y-rr*.35).toFixed(1)}" r="${(rr*.3).toFixed(1)}" fill="#fff"/>`).join('')}</g></svg>`}
/* bulbs along a rectangle's border (for the small sign boxes and boards) */
function rectBulbs(w,h,sp,inset){const B=[],i=inset||6;const nx=Math.max(2,Math.round((w-2*i)/sp)),ny=Math.max(2,Math.round((h-2*i)/sp));
  for(let k=0;k<=nx;k++){B.push([i+(w-2*i)*k/nx,i]);B.push([i+(w-2*i)*k/nx,h-i])}for(let k=1;k<ny;k++){B.push([i,i+(h-2*i)*k/ny]);B.push([w-i,i+(h-2*i)*k/ny])}return {w,h,b:B}}

/* ---- the sign: a painted scene, the panel tinted to the brand's glass, the real mark lit on it, bulbs traced around the mark ---- */
function signHtml(x,scene,inner){const p=PAN[scene];const bc=S.brand(x.ticker);
  return `<span class="h2-sign" style="--bc:${bc};--px:${p.x}%;--py:${p.y}%;--pw:${p.w}%;--ph:${p.h}%"><img class="h2-scene" src="${I}${scene}.jpg" alt="">
   <span class="h2-panel" data-h2-tk="${e(x.ticker)}" data-name="${e(U.nm(x.ticker))}"><i class="h2-glass"></i><i class="h2-lit"></i></span>${inner||''}</span>`}
async function lightSigns(root){for(const pn of root.querySelectorAll('.h2-panel[data-h2-tk]:not([data-done])')){pn.dataset.done=1;const t=pn.dataset.h2Tk;
  const W=Math.round(pn.clientWidth),H=Math.round(pn.clientHeight);if(!W||!H)continue;const m=await mask(t);
  const lit=pn.querySelector('.h2-lit');
  /* a mark that is not itself a wordmark shares the panel with the name in lights (the mark left, the name right) */
  const wide=m&&m.ar>=1.6&&m.parts>=3,withName=pn.dataset.name!==undefined&&!wide;
  const RW=withName?Math.round(Math.min(W*.44,H*(m&&m.ar||1)*1.3)):W;
  if(m&&m.mask){const R=await ring(t,RW*2,H*2,{pad:.1,r:wide?H*2*.08:undefined,sp:wide?H*2*.07:undefined});lit.style.setProperty('--m',`url(${m.mask})`);
    const [ox,oy,dw,dh]=R.box;lit.style.cssText+=`;left:${ox/2}px;top:${oy/2}px;width:${dw/2}px;height:${dh/2}px`;
    pn.insertAdjacentHTML('beforeend',bulbsSvg(R).replace('class="h2-bulbs"',`class="h2-bulbs" style="width:${RW}px;right:auto"`))}
  else if(m&&m.own){lit.classList.add('own');lit.style.cssText+=`;right:auto;width:${RW*.7}px;left:${RW*.15}px`;lit.innerHTML=`<img src="${m.own}" alt="">`}
  if(withName){const nm=pn.dataset.name;pn.insertAdjacentHTML('beforeend',`<b class="h2-pnm" style="left:${RW}px" aria-hidden="true"><span>${e(nm)}</span></b>`);
    const q=pn.querySelector('.h2-pnm'),sp=q.firstChild,room=W-RW-Math.max(8,W*.04);let f=Math.min(H*.6,120);q.style.fontSize=f+'px';
    while((sp.getBoundingClientRect().width>room||sp.getBoundingClientRect().height>H*.95)&&f>9){f-=.5;q.style.fontSize=f+'px'}}
  pn.setAttribute('role','img');pn.setAttribute('aria-label',U.nm(t)+' logo'+(withName?' and name':'')+', lit on the sign')}}
/* the company's name in bulbs: page text, filled with a dot screen of lit bulbs */
const nameLights=(x,cls)=>`<span class="h2-nl ${cls||''}"><b class="hu-t">${e(U.nm(x.ticker))}</b><small>${e(S.tk(x.ticker))}</small></span>`;
/* the quiet label once the sign carries the name: name and ticker together */
const nameLine=(x)=>`<span class="h2-nm"><b class="hu-t h2-fit">${e(U.nm(x.ticker))}</b> <small>(${e(S.tk(x.ticker))})</small></span>`;
const due=x=>x.locked||window.__h2Calls?'Calls in · graded at the close':'Calls due '+S.wd(x.day);
/* a day's own list, the filter */
const filterBar=(cls)=>`<nav class="h2-flt ${cls||''}" aria-label="Show">${U.FLT.map(([k,l])=>`<button type="button" data-hf="${k}" aria-pressed="${!k}">${l}</button>`).join('')}</nav>`;
async function done(root){U.wireFilter(root);try{await Promise.all(['400 40px Bungee','400 20px Bangers','400 20px Anton'].map(f=>D.fonts.load(f)))}catch(_){};await U.paint(root);await D.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>r()));await lightSigns(root);
  U.fit(root,'.h2-nl b',22);U.fit(root,'.h2-fit',11);D.documentElement.classList.add('hu-ready')}
return {nameLine,mask,U,S,e,I,PAN,PAST,callsOf,anyIn,ctext,csr,ring,bulbsSvg,rectBulbs,signHtml,lightSigns,nameLights,due,filterBar,done}})();
