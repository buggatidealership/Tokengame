/* X2 · Gold leaf. The leading figure of each row is laid on a leaf of the golden ticket's own foil (the #1 stub's
   gradient, ink edge, hard shadow), as if hot-stamped; the window leader's name gets the same leaf. Nothing else moves.
   Arrival: the leaf is laid left to right under the figure as its row comes into view, then one glint crosses it.
   Window switch: a figure that keeps the lead keeps its leaf and rides with its column; a lost lead peels off (right
   to left); a new lead is laid down once the columns have settled, row by row, top to bottom.
   Still state: the leaves. The one idle: a glint across the leader's name leaf every 8 s. */
(function(){const X=window.XX,D=document;
const KEYS=['top',...X.ROWS],FIGK=k=>k==='top'?'.ss3-nm':X.FIG[k];
let have={};/* key -> Map(model -> leaf element) */
const target=(k,m)=>{const c=X.cell(k==='top'?'hd':k,m);return {c,f:c&&c.querySelector(FIGK(k))}};
function place(lf,k,m){const {c,f}=target(k,m);if(!f)return;let b=X.pos(f,c);if(k==='top'){const v=c.querySelector('.ss3-ver');if(v){const q=X.pos(v,c),x0=Math.min(b.x,q.x),x1=Math.max(b.x+b.w,q.x+q.w);b={x:x0,y:b.y,w:x1-x0,h:q.y+q.h-b.y}}}const px=k==='top'?10:(c.offsetWidth<100?5:9),py=k==='top'?3:(c.offsetWidth<100?3:4);
  lf.style.left=(b.x-px)+'px';lf.style.top=(b.y-py)+'px';lf.style.width=(b.w+2*px)+'px';lf.style.height=(b.h+2*py)+'px'}
function leaf(k,m){const {c}=target(k,m);const lf=D.createElement('i');lf.className='xx2-lf'+(k==='top'?' xx2-lead':'');lf.setAttribute('aria-hidden','true');lf.innerHTML='<i class="xx2-gl"></i>';
  c.prepend(lf);c.classList.add('xx2-won');place(lf,k,m);return lf}
const owners=s=>({top:s.L.top,wl:s.L.wl,hr:s.L.hr,l5:s.L.l5,tp:s.L.tp,wr:s.L.wr});
function drop(lf){lf.parentElement&&lf.parentElement.classList.remove('xx2-won');lf.remove()}
function still(s,hide){const O=owners(s);KEYS.forEach(k=>{const mp=have[k]||new Map();
    [...mp.keys()].forEach(m=>{if(!O[k].includes(m)){drop(mp.get(m));mp.delete(m)}});
    O[k].forEach(m=>{let lf=mp.get(m);if(!lf){lf=leaf(k,m);mp.set(m,lf)}place(lf,k,m);lf.classList.toggle('xx-wait',!!hide)});have[k]=mp})}
function lay(lf,delay){lf.classList.remove('xx-wait');
  lf.animate([{clipPath:'inset(-4px 100% -4px -4px)'},{clipPath:'inset(-4px -6px -6px -4px)'}],{duration:320,delay,easing:'cubic-bezier(.3,0,.2,1)',fill:'backwards'});
  lf.querySelector('.xx2-gl').animate([{transform:'translateX(-130%) skewX(-18deg)',opacity:1},{transform:'translateX(260%) skewX(-18deg)',opacity:1}],{duration:460,delay:delay+240,easing:'cubic-bezier(.4,0,.2,1)'})}
function arrive(s,keys){keys.forEach(k=>{let i=0;(have[k]||new Map()).forEach(lf=>lay(lf,(i++)*70))})}
function swap(s){const O=owners(s);
  KEYS.forEach((k,ri)=>{const mp=have[k]||new Map(),d0=k==='top'?120:360+(ri-1)*80;
    [...mp.keys()].forEach(m=>{if(O[k].includes(m))return;const lf=mp.get(m);mp.delete(m);const c=lf.parentElement;c&&c.classList.remove('xx2-won');
      lf.animate([{clipPath:'inset(-4px -6px -6px -4px)'},{clipPath:'inset(-4px -6px -6px 100%)'}],{duration:220,easing:'cubic-bezier(.4,0,1,1)',fill:'forwards'}).onfinish=()=>lf.remove()});
    let i=0;O[k].forEach(m=>{let lf=mp.get(m);if(lf){place(lf,k,m);if(lf.classList.contains('xx-wait'))lay(lf,d0);return}
      lf=leaf(k,m);mp.set(m,lf);lay(lf,d0+(i++)*70)});have[k]=mp})}
function relayout(){KEYS.forEach(k=>(have[k]||new Map()).forEach((lf,m)=>place(lf,k,m)))}
window.XXT={id:'x2',still,arrive,swap,relayout};
D.querySelectorAll('.ss-host.ss-s3 .ss3-key').forEach(k=>{k.insertAdjacentHTML('afterbegin','<i class="xx2-key" aria-hidden="true"></i>');k.lastChild.textContent=' Leads the row'});
XXmount()})();
