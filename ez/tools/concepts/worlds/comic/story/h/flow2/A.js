(function(){const {D,b2,KEYS,FR}=F2;b2.classList.add('f2-A');
const box=D.createElement('div');box.className='f2a f2';
box.innerHTML=`<div class="f2a-st"><ol class="f2a-dots" aria-hidden="true">${KEYS.map((k,i)=>`<li>${i+1} ${F2.VERB[k]}</li>`).join('')}</ol>
 <div class="f2a-says">${KEYS.map((k,i)=>`<p class="f2-say" data-k="${k}"><span class="f2-tab">${i+1}</span>${F2.sayHTML(k)}</p>`).join('')}</div>
 <div class="f2a-pics f2-pp"></div></div>`;
b2.appendChild(box);const pics=box.querySelector('.f2a-pics');KEYS.forEach(k=>pics.appendChild(FR[k]));
const st=box.querySelector('.f2a-st'),says=[...box.querySelectorAll('.f2-say')],dots=[...box.querySelectorAll('.f2a-dots li')],frs=KEYS.map(k=>FR[k]);
let cur=-1;
function set(i){if(i===cur)return;cur=i;says.forEach((s,j)=>s.classList.toggle('on',j===i));dots.forEach((d,j)=>{d.classList.toggle('on',j===i);d.classList.toggle('done',j<i)});frs.forEach((f,j)=>f.classList.toggle('f2on',j===i))}
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
function lay(){const hd=D.querySelector('header'),top=hd?Math.max(0,hd.getBoundingClientRect().bottom):0;box.style.setProperty('--f2top',top+'px');
  const wide=innerWidth>=1000,sayH=Math.max(...says.map(s=>s.offsetHeight)),avail=innerHeight-top-(wide?60:sayH+60);
  box.style.setProperty('--f2pw',Math.max(240,Math.min(wide?600:innerWidth-32,avail))+'px');
  /* the track: one step per 75% of a screen, plus the stage itself */
  box.style.height=RM?'auto':(st.offsetHeight+innerHeight*.75*3)+'px';tick()}
function tick(){if(RM){set(0);return}const r=box.getBoundingClientRect(),top=parseFloat(box.style.getPropertyValue('--f2top'))||0,run=r.height-st.offsetHeight,p=run>0?(top-r.top)/run:0;
  set(Math.max(0,Math.min(3,Math.floor(p*4+.0001))))}
addEventListener('scroll',tick,{passive:true});window.__f2placeTake=lay;
/* the scroll positions at which each step shows (for the boards) */
window.__f2stops=()=>{const r=box.getBoundingClientRect(),top=parseFloat(box.style.getPropertyValue('--f2top'))||0,run=r.height-st.offsetHeight,y0=r.top+scrollY-top;return [0,1,2,3].map(i=>Math.round(y0+run*(i+.5)/4))};
set(0);F2.done();})();
