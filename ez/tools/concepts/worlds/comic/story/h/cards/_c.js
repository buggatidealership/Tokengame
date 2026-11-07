/* Round H cards: shared data and hand-tuned ink helpers. Every number from the page's own globals via POP.data() (pop_lib).
   HC.d.models[i]: {m,name,ver,pnl,W,L,tot,best:{v,r:{co,ticker,n}},last5:['W','L'..],flag}  (order = the page's ranking) */
(function(){const P=window.POP,D=P.data(),INK='#0d0b10';
const FOUND={CLAUDE:'media/founder-claude-anim',GPT:'media/founder-gpt-anim',GROK:'media/founder-grok-anim',KIMI:'media/founder-kimi-anim'};
const COL={CLAUDE:'#ff6a1f',GPT:'#33c98a',GROK:'#3a3540',KIMI:'#1f5fe0'};
const ROLE=['We bet on its call','In the hunt','In the hunt','Last place'];
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const money=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pct=(a,b)=>Math.round(100*a/Math.max(1,b));
/* irregular quad outline in a w x h box: corners nudged, edges with a mid wobble (hand-cut paper / hand-drawn panel) */
function wob(w,h,j,s){if(s)seed=s;const p=[[0,0],[w*.5,0],[w,0],[w,h*.5],[w,h],[w*.5,h],[0,h],[0,h*.5]].map(([x,y])=>[x+(rnd()-.5)*j*2,y+(rnd()-.5)*j*2]);
  p.forEach(q=>{q[0]=Math.max(.5,Math.min(w-.5,q[0]));q[1]=Math.max(.5,Math.min(h-.5,q[1]))});return 'M'+p.map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' L')+' Z'}
/* a tapered brush stroke along a polyline (ink with thick middle, thin ends) */
function brush(pts,wd,col){let L=[],R=[];for(let i=0;i<pts.length;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)];const dx=b[0]-a[0],dy=b[1]-a[1],n=Math.hypot(dx,dy)||1;
  const t=i/(pts.length-1),k=wd*(.25+.75*Math.sin(Math.PI*t));L.push([pts[i][0]-dy/n*k/2,pts[i][1]+dx/n*k/2]);R.unshift([pts[i][0]+dy/n*k/2,pts[i][1]-dx/n*k/2])}
  return `<path d="M${L.concat(R).map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' L')}Z" fill="${col||INK}"/>`}
/* hand-drawn tick and cross, two tapered strokes each, ink under a colour */
function mark(w,sz,o={}){sz=sz||22;const c=w==='W'?(o.w||'#1fb86a'):(o.l||'#e3342b');const s=sz/20;
  const tk=[[4,11],[8.3,15.2],[16.4,5.2]],x1=[[5,5],[15,15.4]],x2=[[15.2,4.8],[4.8,15]];
  const g=pts=>brush(pts.map(q=>[q[0]*s,q[1]*s]),5.6*s,INK)+brush(pts.map(q=>[q[0]*s-.4,q[1]*s-.4]),3*s,c);
  return `<svg class="hc-mk hc-mk${w}" width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}" aria-hidden="true">${w==="W"?g(tk):g(x1)+g(x2)}</svg>`}
function flag(k,w,h){w=w||30;h=h||20;if(k==='cn')return `<svg class="hc-flag" width="${w}" height="${h}" viewBox="0 0 30 20" aria-hidden="true"><path d="M.6 1.2Q8 -.4 15 1t14.4 .2L29.2 19Q22 20.6 15 19.2T.8 19.4Z" fill="#de2910" stroke="${INK}" stroke-width="1.4"/><path d="M6 3.4l1.2 3.4h3.6l-2.9 2.1 1.1 3.4L6 10.2l-3 2.1 1.1-3.4L1.2 6.8h3.6z" fill="#ffde00" stroke="${INK}" stroke-width=".5"/>${[[13,3],[15,6],[15,10],[13,13]].map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="1.05" fill="#ffde00"/>`).join('')}</svg>`;
  let s=`<svg class="hc-flag" width="${w}" height="${h}" viewBox="0 0 30 20" aria-hidden="true"><defs><clipPath id="hcf${++seed%9999}"><path d="M.6 1.2Q8 -.4 15 1t14.4 .2L29.2 19Q22 20.6 15 19.2T.8 19.4Z"/></clipPath></defs><g clip-path="url(#hcf${seed%9999})"><rect width="30" height="20" fill="#fff"/>`;
  for(let i=0;i<13;i+=2)s+=`<rect y="${(i*20/13).toFixed(2)}" width="30" height="${(20/13).toFixed(2)}" fill="#e0241c"/>`;
  return s+`<rect width="13" height="${(20/13*7).toFixed(2)}" fill="#1d3fb0"/>${[0,1,2,3].map(r=>[0,1,2].map(c=>`<circle cx="${2.2+c*4+(r%2)*2}" cy="${1.8+r*2.6}" r=".55" fill="#fff"/>`).join('')).join('')}</g><path d="M.6 1.2Q8 -.4 15 1t14.4 .2L29.2 19Q22 20.6 15 19.2T.8 19.4Z" fill="none" stroke="${INK}" stroke-width="1.4"/></svg>`}
let still=false;try{still=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
function port(m,cls){const b=FOUND[m];return `<div class="hc-port ${cls||''}" style="background-image:url(${b}.jpg)">${still?'':`<video muted loop playsinline autoplay preload="auto" poster="${b}.jpg" aria-hidden="true" tabindex="-1"><source src="${b}.mp4" type="video/mp4"><source src="${b}.webm" type="video/webm"></video>`}</div>`}
function sr(x,i){return `<p class="pp-sr">#${i+1} ${x.name}, ${P.esc(x.ver)}. ${ROLE[i]}. Current P&amp;L ${money(x.pnl)}. Right way on ${x.W} of ${x.tot} calls. Best call ${money(x.best.v)} on ${P.esc(x.best.r.co)}. Last five: ${x.last5.map(s=>s==='W'?'right':'wrong').join(', ')}.</p>`}
/* mount: hide today's grid, put the opener panel at the section top (title lifted over it), return a fresh grid element */
function mount(cls,o={}){const sec=document.querySelector('#wc-book .wc-chars');sec.classList.add('hc-sec',cls);
  sec.querySelectorAll('.pp1-grid').forEach(g=>g.style.display='none');
  const ttl=sec.querySelector('.pp1-ttl');
  if(o.opener!==false){const f=document.createElement('figure');f.className='hc-open';f.innerHTML='<div class="hc-open-i"></div>';sec.insertBefore(f,ttl);}
  ttl.style.display='none';const W=Math.min(sec.clientWidth-24,620);
  const h=document.createElement('div');h.className='hc-ttl';h.setAttribute('aria-hidden','true');
  h.innerHTML=P.ext('MEET THE',{size:40,fill:'gold',shade:'#7a0c06',max:W*.62,rot:-3})+P.ext('MODELS',{size:70,fill:'red',shade:'#7a0c06',max:W*.8,rot:-3,depth:8})+'<p class="hc-tag">Not the Instagram kind. Ranked by pretend $100,000 accounts.</p>';
  ttl.after(h);const g=document.createElement('div');g.className='hc-grid';h.after(g);return {sec,g,ttl:h}}
/* torn/hand-cut edge as a CSS polygon(): n points per side, jitter j (percent) */
function tear(n,j,s){if(s)seed=s;const p=[];const J=()=>(rnd()-.5)*2*j;
  for(let k=0;k<n;k++)p.push([k/n*100,Math.max(0,J()+j)]);for(let k=0;k<n;k++)p.push([100-Math.max(0,J()+j)*.6,k/n*100]);
  for(let k=0;k<n;k++)p.push([100-k/n*100,100-Math.max(0,J()+j)]);for(let k=0;k<n;k++)p.push([Math.max(0,J()+j)*.6,100-k/n*100]);
  return 'polygon('+p.map(q=>q[0].toFixed(2)+'% '+q[1].toFixed(2)+'%').join(',')+')'}
const FX=`<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<filter id="hcPress" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.45"/><feComposite in="SourceGraphic" operator="in" result="a"/><feTurbulence type="fractalNoise" baseFrequency=".08" seed="2" result="w"/><feDisplacementMap in="a" in2="w" scale="1.1"/></filter>
<filter id="hcStamp" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" seed="11"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3 2"/><feComposite in="SourceGraphic" operator="in"/></filter></svg>`;
if(!document.getElementById('hcPress'))document.body.insertAdjacentHTML('beforeend',FX);
window.HC={tear,d:D,P,INK,FOUND,COL,ROLE,money,pct,wob,brush,mark,flag,port,sr,mount,rnd:(s)=>{if(s)seed=s;return rnd()}};
})();
