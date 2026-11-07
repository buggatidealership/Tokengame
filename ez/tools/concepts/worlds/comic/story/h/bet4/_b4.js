/* bet4 (round H27): shared helpers for the three takes of "the bet, simpler". Laid over the built v46-live-x2plus.html by run.js.
   Every number comes from the page: the bet time is world-comic.js's betAt (verbatim, as x2p_more.js has it), the pool share
   SIM.poolShare, the leader the P&L leader of window.__x2pPnl (the board's own rank). Words are page text; paintings are the
   existing media/bet-*.jpg. The live chapter's own parts stay in the DOM, hidden (#x2pSt.b4-on). */
window.B4=(function(){
const D=document,H=D.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)');
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const p2=v=>String(v).padStart(2,'0');
const desk=()=>innerWidth>=1000;
/* the bet: the close the weekday after NVIDIA's call date in the sheet (or SIM/CONFIG.betDate); world-comic.js betAt, verbatim */
function betAt(){const md2=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
  const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
  const S=window.SIM||{},C=window.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
  const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
  let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}
function left(){const at=betAt();if(!at)return null;const s=Math.max(0,Math.floor((at-Date.now())/1e3));return {s,d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),x:s%60}}
function data(){const S=window.SIM||{},at=betAt();let lead=null;
  if(window.__x2pPnl){const P=window.__x2pPnl().A;lead=Object.keys(P).sort((a,c)=>P[c].pnl-P[a].pnl)[0]}
  const f=o=>at?new Date(at).toLocaleDateString('en-US',Object.assign({timeZone:'America/New_York'},o)):'';
  return {at,lead,name:NM[lead]||lead||'',share:S.poolShare!=null?Math.round(S.poolShare*100):69,
    day:f({weekday:'long',month:'long',day:'numeric'}),dayS:f({weekday:'short',month:'short',day:'numeric'})}}
function face(m,cls){const M=(window.MODELS||{})[m];if(!M)return '';return `<i class="hb-face ${cls||''}" style="--mc:${M.c}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d}"/></svg></i>`}
/* homography: the unit rect (w x h) onto quad q=[tl,tr,br,bl] -> CSS matrix3d */
function persp(w,h,q){const [x0,y0]=q[0],[x1,y1]=q[1],[x2,y2]=q[2],[x3,y3]=q[3];
  const dx1=x1-x2,dx2=x3-x2,dx3=x0-x1+x2-x3,dy1=y1-y2,dy2=y3-y2,dy3=y0-y1+y2-y3,den=dx1*dy2-dx2*dy1;
  const g=(dx3*dy2-dx2*dy3)/den,hh=(dx1*dy3-dx3*dy1)/den;
  const a=x1-x0+g*x1,b=x3-x0+hh*x3,c=x0,d=y1-y0+g*y1,e=y3-y0+hh*y3,f=y0;
  return `matrix3d(${a/w},${d/w},0,${g/w},${b/h},${e/h},0,${hh/h},0,0,1,0,${c},${f},0,1)`}
const pk=v=>{const q=String(v).split('|');return desk()&&q[1]?q[1]:q[0]};
/* an art box: data-src, data-iw, data-ih, data-crop ("[x,y,w,h]" or "phone|desk"; a crop may run past the painting: the box's
   own ground shows there, blended by .b4-art::after). Children: [data-at] "[x,y]" placed at painting pixels, [data-q] quads. */
function place(el){const w=el.clientWidth;if(!w)return;const c=JSON.parse(pk(el.dataset.crop)),iw=+el.dataset.iw,ih=+el.dataset.ih,k=w/c[2];
  el.style.height=Math.round(c[3]*k)+'px';el.style.backgroundImage=`url(${el.dataset.src})`;el.style.backgroundSize=`${iw*k}px ${ih*k}px`;el.style.backgroundPosition=`${-c[0]*k}px ${-c[1]*k}px`;
  el.style.setProperty('--k',k);
  /* the painting's own edges, for the fade where the crop runs past it */
  el.style.setProperty('--pl',(-c[0]*k)+'px');el.style.setProperty('--pt',(-c[1]*k)+'px');el.style.setProperty('--pw',(iw*k)+'px');el.style.setProperty('--ph',(ih*k)+'px');
  el.querySelectorAll('[data-q]').forEach(n=>{const q=JSON.parse(n.dataset.q).map(([x,y])=>[(x-c[0])*k,(y-c[1])*k]);n.style.transform=persp(n.offsetWidth,n.offsetHeight,q)});
  el.querySelectorAll('[data-at]').forEach(n=>{const v=pk(n.dataset.at);if(v==='-'){n.style.display='none';return}n.style.display='';const [x,y]=JSON.parse(v);n.style.left=((x-c[0])*k)+'px';n.style.top=((y-c[1])*k)+'px'})}
/* the chip's four dies (measured on the 2048x1152 painting, x2p_more.js) */
const Q=[[[650,494],[781,471],[858,610],[719,631]],[[842,465],[981,440],[1064,579],[918,602]],[[1043,431],[1172,410],[1262,547],[1121,568]],[[1229,403],[1358,383],[1453,514],[1316,535]]];
const lq=q=>{const [tl,tr,br,bl]=q,m=(p,o,t)=>[p[0]+(p[0]-o[0])*t,p[1]+(p[1]-o[1])*t];return [m(bl,tl,.13),m(br,tr,.13),m(br,tr,.36),m(bl,tl,.36)]};
const K=['d','h','m','x'],LAB=['days','hrs','min','sec'];
function dies(){return [0,1,2,3].map(i=>`<div class="hbc-die" data-q='${JSON.stringify(Q[i])}'><span class="hbc-glow"></span><b class="hbc-num" data-b4r="${K[i]}" aria-hidden="true"></b><i class="hbc-glass"></i></div><div class="hbc-lab" data-q='${JSON.stringify(lq(Q[i]))}' aria-hidden="true">${LAB[i]}</div>`).join('')+'<span class="b4-sr" data-b4sr></span>'}
function setNum(el,str){if(el.dataset.v===str)return;el.dataset.v=str;el.innerHTML=[...str].map(c=>`<span class="hbc-sl"><i data-b4d>${c}</i></span>`).join('')}
function tick(root){const set=()=>{const L=left();if(!L)return;const v={d:p2(L.d),h:p2(L.h),m:p2(L.m),x:p2(L.x)};
    root.querySelectorAll('[data-b4r]').forEach(e=>setNum(e,v[e.dataset.b4r]));
    root.querySelectorAll('[data-b4sr]').forEach(e=>e.textContent=`${L.d} days, ${L.h} hours, ${L.m} minutes until the NVIDIA bet`)};
  set();const loop=()=>{if(!root.isConnected)return;set();setTimeout(loop,1000-(Date.now()%1000)+5)};setTimeout(loop,1000-(Date.now()%1000)+5)}
/* a narration caption drawn into the plate (the owner's K2 pick, x2p_more.js's .bd-c): hand-cut black box, gold double rule */
const cap=(html,cls,at)=>`<div class="b4-at ${cls||''}" data-at="${at}"><div class="bd-c"><span>${html}</span></div></div>`;
function mount(build){const sec=D.querySelector('#x2pSt.hb-on'),w=sec&&sec.querySelector('.hb-wrap');if(!w)throw new Error('no bet');
  const Dt=data(),box=D.createElement('div');box.className='b4';box.innerHTML=build(Dt);w.appendChild(box);
  sec.classList.add('b4-on');sec.setAttribute('aria-labelledby','b4H');
  const re=()=>box.querySelectorAll('.b4-art').forEach(place);re();
  let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;re()}});D.fonts&&D.fonts.ready.then(re);
  tick(box);if(B4.after)B4.after(box,Dt);re();H.classList.add('b4-ready');return box}
return {data,face,place,dies,tick,cap,mount,desk,NM,pk,RM}})();
