/* P1 · The docked bill. While the scoreboard is on screen and the fight bill's stubs have scrolled away, the same three stubs
   dock under the header as a slim ticket strip (a copy that only calls the live bill). Ground: Season 1 ticket stock printed
   with the model's own mark as a security print. Beside Last 5: the balance, round by round, the window's stretch drawn bold. */
(function(){const S=SP,D=document;
const tile=m=>{const M=S.MODELS[m],c=S.col(m),o=m==='GROK'?.09:.13,p=`<path d="${M.d}"${M.fr?` fill-rule="${M.fr}"`:''}/>${M.dot?`<path d="${M.dot}" fill="${M.dotc}"/>`:''}`;
  const g=(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(.62)" fill="${c}" fill-opacity="${o}">${p}</g>`;
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">${g(4,6,-8)}${g(32,34,-8)}</svg>`)}")`};
const line=(m,x)=>{const b=x.bal[m];if(b.length<2)return '';const vs=b.map(q=>q.v).concat(100000),lo=Math.min(...vs),hi=Math.max(...vs),W=100,Hh=30,n=b.length;
  const X=i=>(i/(n-1)*W).toFixed(2),Y=v=>(Hh-2-(v-lo)/(hi-lo||1)*(Hh-4)).toFixed(2),pts=b.map((q,i)=>X(i)+','+Y(q.v));
  const win=x.k!=='season',i0=b.findIndex(q=>q.in),seg=win&&i0>=0?pts.slice(Math.max(0,i0-1)).join(' '):'';
  const up=x.amt[m]>=0,c=up?'#0a7a3c':'#c0261d';
  return `<span class="sp-k">Balance</span><svg class="sp-ln" viewBox="0 0 ${W} ${Hh}" preserveAspectRatio="none" aria-hidden="true">
   <line x1="0" x2="${W}" y1="${Y(100000)}" y2="${Y(100000)}" class="sp-ln0"/>
   <polyline points="${pts.join(' ')}" class="sp-lna${win?' sp-dim':''}" style="--c:${(b[n-1].v>=100000)?'#0a7a3c':'#c0261d'}"/>
   ${seg?`<polyline points="${seg}" class="sp-lnw" style="--c:${c}" pathLength="1"/>`:''}
   <circle cx="${X(n-1)}" cy="${Y(b[n-1].v)}" r="2.2" class="sp-lne" style="--c:${win?c:(b[n-1].v>=100000?'#0a7a3c':'#c0261d')}"/></svg>`};
window.SPT={id:'p1',cls:'sp-p1',
 mount(){D.body.insertAdjacentHTML('beforeend',`<div class="sp-dock sp-d1"><span class="sp-dl">Scoreboard P&amp;L over</span>${S.ctl('sp-c1')}</div>`);
  const dk=D.querySelector('.sp-d1'),hd=D.querySelector('header.top'),pos=()=>{dk.style.top=Math.max(0,hd.getBoundingClientRect().bottom)+'px'};
  pos();addEventListener('scroll',pos,{passive:true});addEventListener('resize',pos);
  S.watch(s=>{const on=s.sb&&!s.st;dk.classList.toggle('sp-show',on);dk.inert=!on})},
 card(el,m,x,prev,anim){const cap=el.querySelector('.wc9-cap');cap.style.setProperty('--sp-tile',tile(m));
  const f=el.querySelector('.sp-fill');f.innerHTML=line(m,x);
  if(anim&&!S.RM()){const w=f.querySelector('.sp-lnw');if(w)w.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration:650,easing:'cubic-bezier(.3,.8,.3,1)'})}}};
S.mount();})();
