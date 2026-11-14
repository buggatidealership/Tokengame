(function(){const {D,b2,KEYS,FR}=F2;b2.classList.add('f2-D');const ol=b2.querySelector('.t4-frs');ol.classList.add('f2');
const frs=KEYS.map(k=>FR[k]);
const ov=D.createElement('div');ov.className='f2d-ov';
ov.innerHTML=`<button class="f2d-play" type="button" aria-label="Play the round: four steps"><span class="f2d-disc"></span><span class="f2d-pl">Play the round</span><span class="f2d-sub">4 steps · ${F2.EX.co}, round ${F2.EX.n}</span></button>
 <div class="f2d-cap" aria-live="polite"><i class="f2d-tail"></i><span class="f2d-tx"></span></div><button class="f2d-re" type="button">↻ Play again</button>`;
ol.appendChild(ov);
const play=ov.querySelector('.f2d-play'),cap=ov.querySelector('.f2d-cap'),tx=ov.querySelector('.f2d-tx'),tail=ov.querySelector('.f2d-tail'),re=ov.querySelector('.f2d-re');
/* the sentence split into words (spans keep their colour classes) */
const words=k=>{const t=D.createElement('div');t.innerHTML=F2.sayHTML(k);let h='';t.childNodes.forEach(n=>{if(n.nodeType===3)n.textContent.split(/(\s+)/).forEach(w=>{h+=/^\s+$/.test(w)?w:w?`<span class="w">${F2.esc(w)}</span>`:''});else h+=`<span class="w ${n.className}">${n.innerHTML}</span>`});return h};
/* the tail points from the caption at the step's frame */
function aim(i){const o=ol.getBoundingClientRect(),f=frs[i].querySelector('.t4-ink').getBoundingClientRect(),c=cap.getBoundingClientRect(),fx=f.left+f.width/2-o.left,fy=f.top+f.height/2-o.top,cy=c.top+c.height/2-o.top;
  const up=fy<cy,x=Math.max(c.left-o.left+18,Math.min(c.right-o.left-44,fx-13));
  Object.assign(tail.style,{left:(x-(c.left-o.left))+'px',top:up?'-13px':'',bottom:up?'':'-13px',transform:up?'rotate(-135deg)':'rotate(45deg)'})}
/* a static state, for the boards and for reduced motion: 0 = waiting, 1..4 = step i's caption with words in (lit: its frame lit too), 5 = the end */
function state(s,lit){frs.forEach((f,j)=>f.classList.toggle('f2lit',s>=5||j<s-1||(j===s-1&&lit)));play.style.display=s===0?'':'none';
  if(s>=1&&s<=4&&!lit){tx.innerHTML=`<span class="f2-tab">${s}</span>`+words(KEYS[s-1]);tx.querySelectorAll('.w').forEach(w=>w.classList.add('in'));cap.classList.add('on');requestAnimationFrame(()=>aim(s-1))}else cap.classList.remove('on');
  b2.classList.toggle('f2-D-end',s>=5)}
window.__f2seq=state;
let run=0;
async function go(){const my=++run,wait=ms=>new Promise(r=>setTimeout(r,ms));state(0);play.style.display='none';
  for(let i=0;i<4;i++){if(my!==run)return;tx.innerHTML=`<span class="f2-tab">${i+1}</span>`+words(KEYS[i]);cap.classList.add('on');aim(i);
    const ws=[...tx.querySelectorAll('.w')];for(const w of ws){await wait(90);w.classList.add('in')}
    await wait(1500);frs[i].classList.add('f2lit');await wait(450);cap.classList.remove('on');await wait(380)}
  state(5)}
play.addEventListener('click',go);re.addEventListener('click',go);
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(RM)state(5);else{state(0);if(window.__F2D==='scroll'){play.style.display='none';const io=new IntersectionObserver(e=>{if(e[0].isIntersecting){io.disconnect();go()}},{threshold:.55});io.observe(ol)}}
window.__f2go=go;window.__f2placeTake=()=>{if(cap.classList.contains('on')){const n=+tx.querySelector('.f2-tab').textContent;aim(n-1)}};
F2.done();})();
