/* X3 · Lift. No new object at all: the leading figure of each row lifts off the card in gold relief, like a
   comic title's extruded lettering (a step of gold, an ink edge), and stands a size bigger; the window leader's
   name lifts the same way. Everything else stays flat, so the raised figures are the only depth on the board.
   Arrival: the figure rises (grows, the gold relief builds under it) as its row comes into view.
   Window switch: a figure that loses the lead sinks flat at once; the new leaders rise once the columns have
   settled, row by row, top to bottom; a figure that keeps the lead stays raised and rides with its column.
   Still state: the raised figures. No idle loop. */
(function(){const X=window.XX,D=document;
const KEYS=['top',...X.ROWS],FIGK=k=>k==='top'?'.ss3-nm':X.FIG[k];
const SC={top:1.12,wl:1.16,hr:1.16,l5:1.07,tp:1.12,wr:1.12};
const F0='drop-shadow(0 0 0 #fff6d8) drop-shadow(0 0 0 #fff6d8) drop-shadow(0 0 0 #fdbc2a) drop-shadow(0 0 0 #15121a)';
const F1='drop-shadow(0 0 .6px #fff6d8) drop-shadow(0 0 .6px #fff6d8) drop-shadow(2px 2px 0 #fdbc2a) drop-shadow(1.5px 1.5px 0 #15121a)';
const up=new Map();/* element -> key */
const fig=(k,m)=>{const c=X.cell(k==='top'?'hd':k,m);return c&&c.querySelector(FIGK(k))};
const owners=s=>({top:s.L.top,wl:s.L.wl,hr:s.L.hr,l5:s.L.l5,tp:s.L.tp,wr:s.L.wr});
const T1=k=>`translate(-1.5px,-2px) scale(${SC[k]})`;
function want(s){const O=owners(s),w=new Map();KEYS.forEach(k=>O[k].forEach(m=>{const f=fig(k,m);if(f)w.set(f,k)}));return w}
function set(f,k,on,hide){f.classList.toggle('xx3-up',on);f.style.setProperty('--xs',SC[k]);f.classList.toggle('xx3-wt',!!hide&&on)}
function still(s,hide){const w=want(s);up.forEach((k,f)=>{if(!w.has(f)){set(f,k,false);up.delete(f)}});w.forEach((k,f)=>{set(f,k,true,hide);up.set(f,k)})}
function rise(f,k,delay){f.classList.remove('xx3-wt');
  f.animate([{transform:'none',filter:F0},{transform:`translate(-2px,-3px) scale(${SC[k]+.07})`,filter:F1,offset:.6},{transform:T1(k),filter:F1}],{duration:440,delay,easing:'cubic-bezier(.25,.8,.3,1)',fill:'backwards'})}
function arrive(s,keys){keys.forEach(k=>{let i=0;up.forEach((kk,f)=>{if(kk===k)rise(f,k,(i++)*70)})})}
function swap(s){const w=want(s);
  up.forEach((k,f)=>{if(w.has(f))return;set(f,k,false);up.delete(f);f.animate([{transform:T1(k),filter:F1},{transform:'none',filter:F0}],{duration:200,easing:'cubic-bezier(.4,0,1,1)'})});
  const n={};w.forEach((k,f)=>{if(up.has(f)&&!f.classList.contains('xx3-wt'))return;set(f,k,true);up.set(f,k);const ri=KEYS.indexOf(k),i=(n[k]=(n[k]||0)+1)-1;rise(f,k,(k==='top'?140:380+(ri-1)*80)+i*70)})}
window.XXT={id:'x3',still,arrive,swap,relayout(){}};
D.querySelectorAll('.ss-host.ss-s3 .ss3-key').forEach(k=>{k.querySelector('.ss3-ring').insertAdjacentHTML('afterend','<b class="xx3-key" aria-hidden="true">59%</b>');k.lastChild.textContent=' Leads the row'});
XXmount()})();
