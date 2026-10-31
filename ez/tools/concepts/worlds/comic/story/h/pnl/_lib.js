/* Round H5, area pnl: shared data, chart geometry, window switch and hand-tuned helpers for every take.
   Everything is read from the page: ROUNDS (graded rounds in order), MODELS (colour, mark path, version), __x2pPnl() (the flat P&L:
   $100,000 on every call, P&L = $100,000 x direction x move). The 24h / 7 days windows use the page's own rule (world-comic.js
   proofBuild inWin + closeAt, copied below) and are checked against the live Leaderboard rows (#wc-pfv-pnl) on every mount:
   a mismatch is logged and kept in window.PN.check. Nothing typed. Classes pn-. */
(function(){if(window.PN)return;
const MS=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const IDF={};function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
const nyToday=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return [g('month'),g('day'),g('year')]};
const NOW=Date.now();
function inWin(r,ms){if(ms>864e5){const td=nyToday(),[mm,dd,yy]=(r.resolves||'').split('/').map(Number);if(!mm)return false;const a=Math.round((Date.UTC(2000+td[2],td[0]-1,td[1])-Date.UTC(2000+(yy%100),mm-1,dd))/864e5);const c=closeAt(r.ticker,r.resolves);return a>=0&&a<=6&&c!=null&&c<=NOW}
  const t=closeAt(r.ticker,r.resolves);return t!=null&&t<=NOW&&t>NOW-ms}
const P=__x2pPnl().A,RS=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)).slice().sort((a,b)=>a.n-b.n),N=RS.length;
const WIN={season:{id:'season',lab:'Season',full:'Season P&L',ms:0},d7:{id:'d7',lab:'7 days',full:'Last 7 days',ms:7*864e5},d1:{id:'d1',lab:'24h',full:'Last 24 hours',ms:864e5}};
/* per window: the rounds in it, each AI's running P&L over those rounds (starting at 0), its total, and the rank */
const W={};Object.values(WIN).forEach(w=>{const rs=w.ms?RS.filter(r=>inWin(r,w.ms)):RS;const ser={},tot={};
  MS.forEach(m=>{let b=0;ser[m]=[0];rs.forEach(r=>{const x=P[m].per[r.n];if(x)b+=x.v;ser[m].push(b)});tot[m]=b});
  const rank=MS.slice().sort((a,b)=>tot[b]-tot[a]);W[w.id]={...w,rs,ser,tot,rank,n:rs.length,first:rs[0],last:rs[rs.length-1]}});
/* check against the live Leaderboard rows: Last 24h, Last 7d, P&L, as the page prints them */
const kShort=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)/1000).toFixed(1)+'K';
const live=[...document.querySelectorAll('#wc-pfv-pnl .wc-pf-r')].map(r=>[...r.querySelectorAll('[role=cell]')].map(c=>c.textContent.trim()));
const check=live.map(c=>{const nm=c[0].replace(/^\d+/,'').trim(),m=MS.find(k=>NM[k]===nm);if(!m)return 'name?'+nm;
  const want=[W.d1.tot[m]?kShort(W.d1.tot[m]):'·',W.d7.tot[m]?kShort(W.d7.tot[m]):'·'];return (want[0]===c[1]&&want[1]===c[2])?'ok':m+' '+want.join('/')+' vs '+c[1]+'/'+c[2]});
if(check.some(x=>x!=='ok'))console.warn('PN window check',check);
/* formats */
const $f=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const $k=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1e5?Math.round(Math.abs(v)/1000)+'K':(Math.abs(v)/1000).toFixed(1)+'K');
const col=m=>MODELS[m].c==='#111'?'#15121a':MODELS[m].c;
const rnd=s=>{let x=Math.sin(s*9301+49297)*233280;return x-Math.floor(x)};
const mark=(m,cls,fill)=>`<svg class="pn-mk ${cls||''}" viewBox="0 0 24 24" aria-hidden="true"><path d="${MODELS[m].d}" fill="${fill||col(m)}"/></svg>`;
/* hand lettering: every letter its own size, angle and baseline (seeded) */
function letter(txt,seed,j){j=j==null?1:j;let i=0;return txt.split('').map(ch=>{if(ch===' ')return '<span class="pn-sp"> </span>';i++;const r=k=>rnd(seed*17+i*5+k)-.5;
  return `<span class="pn-lt" style="--s:${(1+r(1)*.16*j).toFixed(3)};--r:${(r(2)*7*j).toFixed(2)}deg;--y:${(r(3)*.09*j).toFixed(3)}em">${ch}</span>`}).join('')}
/* the chart: series in a 1000 x H box; returns paths and end points. pad: share of range added top and bottom */
function geom(wid,H,pad){const w=W[wid],all=[].concat(...MS.map(m=>w.ser[m])),lo0=Math.min(0,...all),hi0=Math.max(0,...all),pd=(hi0-lo0||1)*(pad==null?.08:pad),lo=lo0-pd,hi=hi0+pd,n=w.n||1;
  const X=i=>i/n*1000,Y=v=>H-(v-lo)/(hi-lo)*H;
  const lines=w.rank.map(m=>{const s=w.ser[m];return {m,d:s.map((v,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(1)).join(' '),pts:s.map((v,i)=>[X(i),Y(v)]),end:[X(s.length-1),Y(s[s.length-1])],v:s[s.length-1]}});
  return {w,lo,hi,X,Y,H,lines,base:Y(0),n}}
/* end labels pushed apart so they never touch (y in px of the plot), keeps order */
function spread(items,gap,min,max){const a=items.slice().sort((x,y)=>x.y-y.y);for(let i=1;i<a.length;i++)if(a[i].y-a[i-1].y<gap)a[i].y=a[i-1].y+gap;
  const ov=a[a.length-1].y-max;if(ov>0){a[a.length-1].y-=ov;for(let i=a.length-2;i>=0;i--)if(a[i+1].y-a[i].y<gap)a[i].y=a[i+1].y-gap}
  if(a[0].y<min){const d=min-a[0].y;a.forEach(x=>x.y+=d)}return a}
/* gridlines every nice step */
function ticks(lo,hi,k){const raw=(hi-lo)/(k||4),p=Math.pow(10,Math.floor(Math.log10(raw))),st=[1,2,2.5,5,10].map(x=>x*p).find(x=>x>=raw);const out=[];for(let v=Math.ceil(lo/st)*st;v<=hi;v+=st)out.push(Math.round(v));return out}
const lead=W.season.rank[0],second=W.season.rank[1];
/* a wobbly closed outline (for plates, planks, strips): rectangle 0..100 with jittered points, as an SVG path */
function wob(seed,d,n){n=n||4;const q=[],k=(i,a)=>(rnd(seed*13+i*3+a)-.5)*d;for(let i=0;i<n;i++)q.push([i/n*100+k(i,1)*.3,k(i,2)]);for(let i=0;i<n;i++)q.push([100+k(i,3),i/n*100+k(i,4)*.3]);
  for(let i=0;i<n;i++)q.push([100-i/n*100+k(i,5)*.3,100+k(i,6)]);for(let i=0;i<n;i++)q.push([k(i,7),100-i/n*100+k(i,8)*.3]);return 'M'+q.map(x=>x[0].toFixed(2)+' '+x[1].toFixed(2)).join(' L')+'Z'}
window.PN={MS,NM,P,RS,N,W,WIN,check,$f,$k,col,mark,letter,geom,spread,ticks,lead,second,gap:P[lead].pnl-P[second].pnl,rnd,wob,
  share:Math.round((window.SIM||{}).poolShare*100)};
})();
/* mount: the take replaces the splash's content; T.html(PN) gives the section, T.draw(root,wid) draws the chart for a window,
   T.after(root) wires anything else. The window switch: any [data-win] button inside the take. */
function PNmount(){const T=window.PNT,sp=document.querySelector('.wc-splash');if(!T||!sp)return;document.documentElement.classList.add('pn-on');
  const beat=sp.previousElementSibling;if(beat&&beat.classList.contains('wc-beat')&&T.beat)beat.textContent=T.beat;
  sp.setAttribute('aria-label',T.title||'P&L');sp.insertAdjacentHTML('beforeend',`<div class="pn pn-${T.id}">${T.html(PN)}</div>`);const root=sp.querySelector('.pn');
  const set=(wid,anim)=>{root.dataset.win=wid;root.querySelectorAll('[data-win]').forEach(b=>{const on=b.dataset.win===wid;b.setAttribute('aria-pressed',on);b.classList.toggle('pn-on1',on)});
    T.draw(root,wid,anim);PNrows(root,wid);if(T.onWin)T.onWin(root,wid,anim)};
  root.addEventListener('click',e=>{const b=e.target.closest('[data-win]');if(b)set(b.dataset.win,true)});
  set(window.PN_WIN||'season',false);if(T.after)T.after(root);
  /* lines draw in once on view (not with reduced motion) */
  const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm&&!window.PN_STILL)new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();root.classList.add('pn-go')}},{threshold:.35}).observe(root);else root.classList.add('pn-go','pn-still')}
/* rows: re-ranked by the open window; every figure names its window (the column heads) */
function PNrows(root,wid){const L=root.querySelector('[data-rows]');if(!L)return;const w=PN.W[wid],T=window.PNT;
  L.innerHTML=w.rank.map((m,i)=>T.row(m,i,w,{d1:PN.W.d1.tot[m],d7:PN.W.d7.tot[m],s:PN.W.season.tot[m]},wid)).join('');
  const lv=root.querySelector('[data-lead]');if(lv&&T.leadLine)lv.innerHTML=T.leadLine(w)}
/* shared lead line: who leads the open window and by how much */
PN.leadTxt=w=>{const a=w.rank[0],b=w.rank[1],g=w.tot[a]-w.tot[b];return w.n?`<b>${PN.NM[a]}</b> leads ${w.id==='season'?'the season':'the '+w.full.toLowerCase()} by <b>${PN.$f(g).replace('+','')}</b>`:'No round closed in this window yet.'};
/* lay a painting under an element so a horizontal line in the painting (hy, 0..1 of its height) sits at y px of the element,
   the painting always covering the element; ax = which part stays in view horizontally (0 left .. 1 right) */
PN.bgAlign=(el,src,iw,ih,hy,y,ax)=>{const W=el.clientWidth,H=el.clientHeight;let s=Math.max(W/iw,H/ih,y/(hy*ih),(H-y)/((1-hy)*ih))*1.0001;
  const top=y-hy*ih*s,left=(ax==null?.5:ax)*(W-iw*s);el.style.backgroundImage=`url(${src})`;el.style.backgroundSize=`${(iw*s).toFixed(1)}px ${(ih*s).toFixed(1)}px`;el.style.backgroundPosition=`${left.toFixed(1)}px ${top.toFixed(1)}px`;el.style.backgroundRepeat='no-repeat';return s};
/* lay a painting under an element so a region of the painting [x0,y0,x1,y1] (fractions) fills the box b {x,y,w} of the element;
   returns the region's height in px at that width (the plot's height) */
PN.bgRegion=(el,src,iw,ih,R,b)=>{const s=b.w/((R[2]-R[0])*iw),h=(R[3]-R[1])*ih*s;el.style.backgroundImage=`url(${src})`;el.style.backgroundSize=`${(iw*s).toFixed(1)}px ${(ih*s).toFixed(1)}px`;
  el.style.backgroundPosition=`${(b.x-R[0]*iw*s).toFixed(1)}px ${(b.y-R[1]*ih*s).toFixed(1)}px`;el.style.backgroundRepeat='no-repeat';return h};
PN.IMG=(document.currentScript&&document.currentScript.dataset.base)||'/tools/concepts/worlds/comic/story/h/pnl/img/';
/* the lines of a chart as SVG (casing + core, pathLength 1 so they draw in), leader first in the list so it is drawn last (on top) */
PN.svgLines=(G,o)=>{o=o||{};return G.lines.slice().reverse().map((l,i)=>{const lead=l.m===G.w.rank[0];
  return `<path class="pn-cs${lead?' pn-ld':''}" data-m="${l.m}" d="${l.d}" pathLength="1"/><path class="pn-ln${lead?' pn-ld':''}" data-m="${l.m}" style="--mc:${PN.col(l.m)}" d="${l.d}" pathLength="1"/>`}).join('')};
