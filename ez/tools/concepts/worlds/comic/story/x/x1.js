/* X1 · The crown. A tiny inked gold crown sits cocked on the leading figure of each row; a bigger one on the window
   leader's face. Arrival: each crown drops onto its figure as its row comes into view, lands with two ink ticks.
   Window switch: a crown that changes owner hops in an arc to its new head; a crown that keeps its owner rides
   along with the column; a crown with no owner left lifts off; a new one drops in. Row by row, top to bottom.
   Still state: the crowns where they landed. The one idle: a glint on the leader's crown every 7 s. */
(function(){const X=window.XX,D=document;
const SVG=`<svg viewBox="-2 -2 30 24" aria-hidden="true"><path class="xx1-b" d="M3 18 L1.6 6.4 L8 11.2 L13 2.6 L18 11.2 L24.4 6.4 L23 18 Z"/><path class="xx1-bd" d="M3 18 H23 V21 H3 Z"/><circle cx="1.6" cy="6.4" r="1.9"/><circle cx="13" cy="2.6" r="1.9"/><circle cx="24.4" cy="6.4" r="1.9"/><path class="xx1-hl" d="M5.2 16.2 L4.5 10"/></svg>`;
const EM=`<i class="xx1-em" aria-hidden="true"><b></b><b></b><b></b></i>`;
D.body.insertAdjacentHTML('beforeend',`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="xx1g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a6"/><stop offset=".45" stop-color="#fdbc2a"/><stop offset="1" stop-color="#c98a12"/></linearGradient></defs></svg>`);
let ov=null,marks={};/* key -> [{m,el}] */
const g=()=>X.grid();
const ensure=()=>{if(!ov||!ov.isConnected){ov=D.createElement('div');ov.className='xx-ov xx1-ov';g().appendChild(ov)}return ov};
const make=(k,m)=>{const e=D.createElement('i');e.className='xx1-cr'+(k==='top'?' xx1-lead':'');e.innerHTML=`<span class="xx1-in">${SVG}${EM}${k==='top'?'<i class="xx1-gl"></i>':''}</span>`;ensure().appendChild(e);return {m,el:e}};
/* where a crown sits: cocked on the figure's top-left corner; the leader's on top of its face */
function at(k,m){const G=g(),cw=G.offsetWidth<600;
  if(k==='top'){const f=X.head(m).querySelector('.ss3-face'),b=X.pos(f,G),w=cw?26:36;return {x:b.x+b.w/2-w/2+b.w*.1,y:b.y-w*.62,w}}
  let f=X.fig(k,m);if(k==='tp'||k==='wr')f=f.querySelector('.ss-lg')||f;
  const b=X.pos(f,G),w=cw?20:25;return {x:b.x+b.w/2-w/2,y:b.y-w*(k==="tp"||k==="wr"||k==="l5"?.86:.8),w}}
const put=(o,p)=>{o.el.style.left=p.x+'px';o.el.style.top=p.y+'px';o.el.style.width=p.w+'px';o.p=p};
const owners=s=>({top:s.L.top,wl:s.L.wl,hr:s.L.hr,l5:s.L.l5,tp:s.L.tp,wr:s.L.wr});
const KEYS=['top',...X.ROWS];
/* still: every crown at its owner, no motion; hide=true keeps them waiting for their row to come into view */
function still(s,hide){const O=owners(s);KEYS.forEach(k=>{const want=O[k],have=marks[k]||[];
    have.slice(want.length).forEach(o=>o.el.remove());const list=want.map((m,i)=>{const o=have[i]||make(k,m);o.m=m;put(o,at(k,m));o.el.classList.toggle('xx-wait',!!hide);return o});marks[k]=list})}
function land(o,delay){o.el.classList.remove('xx-wait');const i=o.el.querySelector('.xx1-in');
  i.animate([{transform:'translateY(-22px) rotate(-38deg) scale(.35)',opacity:0},{transform:'translateY(2px) rotate(4deg) scale(1.08)',opacity:1,offset:.62},{transform:'none',opacity:1}],{duration:480,delay,easing:'cubic-bezier(.25,.8,.3,1)',fill:'backwards'});
  const em=o.el.querySelector('.xx1-em');em.animate([{opacity:0,transform:'scale(.6)'},{opacity:1,transform:'scale(1)',offset:.35},{opacity:0,transform:'scale(1.25)'}],{duration:340,delay:delay+300,easing:'ease-out',fill:'backwards'});}
function arrive(s,keys){keys.forEach(k=>(marks[k]||[]).forEach((o,i)=>land(o,i*70)))}
/* swap: compare owners row by row; keepers ride with the column, travellers hop, the rest leave or drop in */
function swap(s){const O=owners(s);
  KEYS.forEach((k,ri)=>{const want=O[k],have=(marks[k]||[]).filter(o=>o.el.isConnected),d0=(k==='top'?60:180+(ri-1)*80);
    const keep=have.filter(o=>want.includes(o.m)),free=have.filter(o=>!want.includes(o.m)),need=want.filter(m=>!keep.some(o=>o.m===m));
    const list=[];
    keep.forEach(o=>{const a=o.p,b=at(k,o.m);put(o,b);o.el.classList.remove('xx-wait');
      if(Math.abs(a.x-b.x)>1||Math.abs(a.y-b.y)>1)o.el.animate([{transform:`translate(${a.x-b.x}px,${a.y-b.y}px)`},{transform:'none'}],{duration:640,easing:'cubic-bezier(.3,1.2,.4,1)'});list.push(o)});
    need.forEach((m,i)=>{const o=free.shift();const b=at(k,m);
      if(o&&!o.el.classList.contains('xx-wait')){const a=o.p;o.m=m;put(o,b);const dx=a.x-b.x,dy=a.y-b.y,lift=14+Math.min(36,Math.hypot(dx,dy)*.22);
        o.el.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:`translate(${dx*.5}px,${dy*.5-lift}px) rotate(${dx>0?-14:14}deg)`,offset:.48},{transform:'translate(0,2px) rotate(0)',offset:.86},{transform:'none'}],{duration:560,delay:d0+i*60,easing:'cubic-bezier(.33,0,.25,1)',fill:'backwards'});
        const em=o.el.querySelector('.xx1-em');em.animate([{opacity:0},{opacity:1,offset:.35},{opacity:0}],{duration:320,delay:d0+i*60+460,fill:'backwards'});list.push(o)}
      else{if(o)o.el.remove();const n=make(k,m);put(n,b);land(n,d0+i*60);list.push(n)}});
    free.forEach(o=>{const e=o.el;e.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateY(-14px) rotate(-20deg) scale(.6)'}],{duration:260,delay:Math.max(0,d0-80),easing:'ease-in',fill:'forwards'}).onfinish=()=>e.remove()});
    marks[k]=list})}
function relayout(s){KEYS.forEach(k=>(marks[k]||[]).forEach(o=>put(o,at(k,o.m))))}
window.XXT={id:'x1',still,arrive,swap,relayout};
/* the key keeps its place, with the crown as its sample */
D.querySelectorAll('.ss-host.ss-s3 .ss3-key').forEach(k=>{k.insertAdjacentHTML('afterbegin',`<i class="xx1-key">${SVG}</i>`);k.lastChild.textContent=' Leads the row'});
XXmount()})();
