/* Round H, area `round`: shared layer. Every number from the page (ROUNDS, __x2pPnl, CO_LOGOS, logo()); nothing typed. */
(function(){const D=document,IMG='tools/concepts/worlds/comic/story/h/round/img/';
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},MC={GPT:'#10a37f',KIMI:'#1f6bff',CLAUDE:'#d97757',GROK:'#15121a'};
const md=s=>fmtDate(s),pad=n=>String(n).padStart(4,'0');
/* seeded jitter, so every shape is irregular but stable between shots */
let S=7;const rnd=()=>{S=(S*16807)%2147483647;return S/2147483647};const seed=v=>{S=v|0||7};
/* an irregular box outline in a 0..100 box: corners nudged, edges with a few wobbles */
function wobPts(k,amp){const p=[];const e=(x0,y0,x1,y1)=>{for(let i=0;i<k;i++){const t=i/k;p.push([x0+(x1-x0)*t+(rnd()-.5)*amp*(x0===x1?1:.3),y0+(y1-y0)*t+(rnd()-.5)*amp*(y0===y1?1:.3)])}};
  e(0,0,100,0);e(100,0,100,100);e(100,100,0,100);e(0,100,0,0);return p.map(([x,y])=>[Math.max(0,Math.min(100,x)),Math.max(0,Math.min(100,y))])}
function clip(s,k=4,amp=1.4){seed(s);return 'polygon('+wobPts(k,amp).map(([x,y])=>x.toFixed(2)+'% '+y.toFixed(2)+'%').join(',')+')'}
/* ink frame: thick outer stroke + thin inner stroke, both hand-wobbled, scales to its box */
function ink(s,{w=3.2,w2=1.1,c='#0d0b10',inset=2.6}={}){seed(s);const a=wobPts(4,1.1),b=wobPts(4,.9).map(([x,y])=>[inset+x*(100-2*inset)/100,inset+y*(100-2*inset)/100]);const d=q=>'M'+q.map(p=>p.map(v=>v.toFixed(2)).join(' ')).join('L')+'Z';
  return `<svg class="rh-ink" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${d(a)}" fill="none" stroke="${c}" stroke-width="${w}" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><path d="${d(b)}" fill="none" stroke="${c}" stroke-width="${w2}" vector-effect="non-scaling-stroke" opacity=".8"/></svg>`}
/* a brushed, tapered arrow: drawn, not a glyph */
function arrow(dir,fill='#ffd23f',c='#0d0b10'){const t=dir<0?'transform="matrix(-1 0 0 1 60 0)"':'';return `<svg viewBox="0 0 60 40" aria-hidden="true"><g ${t}><path d="M4 16.5 C14 15 24 15.8 33 15.2 L31.5 5.5 C40 11 49 16.5 56.5 20.3 C49 24.6 40.5 29.6 31.8 35 L33.2 25.1 C24 24.6 14 25.4 4.6 24 C3.2 21.4 3.1 19 4 16.5Z" fill="${fill}" stroke="${c}" stroke-width="3.2" stroke-linejoin="round"/><path d="M9 18.6 C17 18 25 18.3 32 18" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7" fill="none"/><path d="M34 31 C41 27 48 23.6 53 21" stroke="${c}" stroke-width="1" fill="none" opacity=".5"/></g></svg>`}
function cross(fill='#ff3a31',c='#0d0b10'){return `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M7.5 4.8 L20.4 15.6 L32.6 4.2 L36.1 8.9 L25 20.4 L35.6 32.2 L31.2 36.2 L20 25.2 L8.4 36 L4.2 31.3 L15.4 20.3 L3.9 9.1Z" fill="${fill}" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><path d="M9 7.6 L19.6 17" stroke="#fff" stroke-width="1.4" opacity=".65" stroke-linecap="round"/></svg>`}
/* a hand-drawn crown */
function crown(fill='#ffcf33'){return `<svg viewBox="0 0 40 26" aria-hidden="true"><path d="M3.5 22.5 L2.2 6.8 L11.4 14 L19.6 2.3 L28.4 13.6 L37.6 6 L36.2 22.8 C25 24.4 14 24.2 3.5 22.5Z" fill="${fill}" stroke="#0d0b10" stroke-width="2.4" stroke-linejoin="round"/><path d="M6 19.5 C15 20.6 25 20.6 34 19.4" stroke="#a8740b" stroke-width="1.2" fill="none"/><circle cx="19.6" cy="2.6" r="2" fill="#ff3a31" stroke="#0d0b10" stroke-width="1.2"/></svg>`}
/* a burst with inner layers, every spike at its own length */
function burst(s,fill,fill2,n=14){seed(s);let o='',i2='';for(let i=0;i<n*2;i++){const a=i/(n*2)*Math.PI*2,r=i%2?30+rnd()*6:46+rnd()*4,r2=i%2?24+rnd()*4:36+rnd()*4;o+=(i?'L':'M')+(50+Math.cos(a)*r).toFixed(1)+' '+(50+Math.sin(a)*r*.82).toFixed(1);i2+=(i?'L':'M')+(50+Math.cos(a)*r2).toFixed(1)+' '+(50+Math.sin(a)*r2*.82).toFixed(1)}
  return `<svg class="rh-bu" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${o}Z" fill="${fill}" stroke="#0d0b10" stroke-width="3" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><path d="${i2}Z" fill="${fill2}"/></svg>`}
function face(m){return `<span class="rh-face" style="--mc:${MC[m]}">${logo(m)}</span>`}
function coLogo(t){const c=CO_LOGOS[t];return c?`media/${c.f}`:''}
function film(g,cls=''){return g.film?`<div class="rh-film ${cls}"><img src="media/${g.poster}.jpg" alt=""><video muted playsinline preload="none" poster="media/${g.poster}.jpg"></video></div>`:''}
/* one round as the page knows it; pend=true replays a graded round as it stood before its close (mockup only) */
function data(n,pend){const g=ROUNDS.find(r=>r.n===n);if(!g)return null;const P=__x2pPnl(),A=P.A;
  const W=g.win?g.win.split(' & '):[];const up=g.a>0;
  let rows=g.calls.map(([m,c,off])=>{const u=!/DOWN/.test(c),v=parseFloat(c.replace(/[^\d.]/g,''));return {m,up:u,v,off:+off,ok:u===up,win:W.includes(m),pnl:A[m]&&A[m].per[n]?A[m].per[n].v:null,season:A[m]?A[m].pnl:null}});
  const filed=MODEL_KEYS.map(m=>rows.find(r=>r.m===m)).filter(Boolean);
  rows=rows.filter(r=>r.ok).sort((a,b)=>a.off-b.off).concat(rows.filter(r=>!r.ok).sort((a,b)=>a.off-b.off));
  const right=rows.filter(r=>r.ok),avg=right.length?right.reduce((s,r)=>s+r.off,0)/right.length:null;
  const G=window.__rhGrade&&window.__rhGrade[n]||{};
  return {n,co:g.co,t:g.ticker,called:md(g.called),res:md(g.resolves),a:g.a,up,out:g.out,rows,filed,W,right:right.length,total:rows.length,avg,film:pend?null:(g.film?g:null),hasFilm:!!g.film,poster:g.poster,
    ds:G.ds||'',gr:G.gr||'',pend:!!pend,logo:coLogo(g.ticker),brand:(CO_LOGOS[g.ticker]||{}).c||'#15121a',usd:P.usd,sector:(RMETA[n]||{}).sector||''}}
function mount(html,cls){let o=D.getElementById('rh');if(o)o.remove();o=D.createElement('div');o.id='rh';o.className=cls||'';o.innerHTML=html;D.body.appendChild(o);return o}
window.RH={IMG,NM,MC,md,pad,clip,ink,arrow,cross,crown,burst,face,coLogo,film,data,mount,seed,rnd,usd:v=>__x2pPnl().usd(v)};
})();
