/* Round H, bet: shared kit. Live data only: the bet time is the page's own rule (world-comic.js betAt, copied
   verbatim below and checked against the live chip's digits before the section is replaced). */
(function(){
const D=document,H='tools/concepts/worlds/comic/story/h/bet2/img/';
function betAt(){const md2=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
  const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
  const S=window.SIM||{},C=window.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
  const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
  let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}
function left(){const at=betAt();if(!at)return null;const s=Math.max(0,Math.floor((at-Date.now())/1e3));return {s,d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),x:s%60}}
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
function data(){const P=window.__x2pPnl().A,lead=Object.keys(P).sort((a,b)=>P[b].pnl-P[a].pnl)[0],S=window.SIM||{},at=betAt();
  return {at,share:S.poolShare!=null?Math.round(S.poolShare*100):69,lead,leadName:NM[lead],M:MODELS[lead],
    day:at?new Date(at).toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',timeZone:'America/New_York'}):'',
    start:(()=>{const r=(window.ROUNDS||[])[0];const m=r&&String(r.called||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?Date.UTC(2000+(+m[3]%100),+m[1]-1,+m[2]):null})(),
    graded:(window.ROUNDS||[]).length}}
const p2=v=>String(v).padStart(2,'0');
/* every [data-k] in root shows the live value; ticks once a second */
function tick(root,onTick){const set=()=>{const L=left();if(!L)return;root.querySelectorAll('[data-k]').forEach(e=>{const k=e.dataset.k,v=k==='d'?String(L.d):p2(L[k]);if(e.textContent!==v)e.textContent=v});onTick&&onTick(L)};set();setInterval(set,1000)}
function face(m,cls){const M=MODELS[m];return `<i class="bt-face ${cls||''}" style="--mc:${M.c}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d}"/></svg></i>`}
/* homography: the unit rect (w x h) onto quad q=[tl,tr,br,bl] -> CSS matrix3d */
function persp(w,h,q){const [x0,y0]=q[0],[x1,y1]=q[1],[x2,y2]=q[2],[x3,y3]=q[3];
  const dx1=x1-x2,dx2=x3-x2,dx3=x0-x1+x2-x3,dy1=y1-y2,dy2=y3-y2,dy3=y0-y1+y2-y3,den=dx1*dy2-dx2*dy1;
  const g=(dx3*dy2-dx2*dy3)/den,hh=(dx1*dy3-dx3*dy1)/den;
  const a=x1-x0+g*x1,b=x3-x0+hh*x3,c=x0,d=y1-y0+g*y1,e=y3-y0+hh*y3,f=y0;
  const A=a/w,B=b/h,Dd=d/w,E=e/h,G=g/w,Hh=hh/h;
  return `matrix3d(${A},${Dd},0,${G},${B},${E},0,${Hh},0,0,1,0,${c},${f},0,1)`}
/* an art box showing a crop of an image (image px), returns scale fn */
function art(el,src,iw,ih,crop){const place=()=>{const c=typeof crop==='function'?crop():crop,w=el.clientWidth,k=w/c[2];
    el.style.height=Math.round(c[3]*k)+'px';el.style.backgroundImage=`url(${H+src})`;el.style.backgroundSize=`${iw*k}px ${ih*k}px`;el.style.backgroundPosition=`${-c[0]*k}px ${-c[1]*k}px`;
    el.querySelectorAll('[data-q]').forEach(n=>{const q=JSON.parse(n.dataset.q).map(([x,y])=>[(x-c[0])*k,(y-c[1])*k]);n.style.transform=persp(n.offsetWidth,n.offsetHeight,q)});
    el.querySelectorAll('[data-at]').forEach(n=>{const [x,y]=JSON.parse(n.dataset.at);n.style.left=((x-c[0])*k)+'px';n.style.top=((y-c[1])*k)+'px'});
    el.style.setProperty('--k',k)};
  place();addEventListener('resize',place);D.fonts&&D.fonts.ready.then(place)}
function go(build){const sec=D.querySelector('.wc-bet');if(!sec)return;
  const live=[...sec.querySelectorAll('.wc-die b')].map(b=>b.textContent),L=left(),mine=L?[String(L.d).padStart(2,'0'),p2(L.h),p2(L.m),p2(L.x)]:[];
  window.__btCheck={live:live.join(':'),mine:mine.join(':'),okDH:live[0]===mine[0]&&live[1]===mine[1]};
  sec.classList.add('bt-on');build(sec,data());D.documentElement.classList.add('bt-ready')}
function head(D,cap){return `<div class="bt-open"><div class="i"><div class="g"></div></div><p class="c">The pool. Bet #1 opens the vault.</p></div>
  <h2 class="bt-h"><span class="w">Bet #1:</span> <span class="w w2">NVIDIA</span></h2><p class="bt-sub">${cap||'The first of many. It goes on at the close, '+D.day+'.'}</p>`}
window.BT={go,head,tick,face,persp,art,left,data,H,p2,NM};
})();
