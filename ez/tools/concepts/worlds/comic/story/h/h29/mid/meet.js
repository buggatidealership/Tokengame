/* H29 · the middle · Meet the models (mockup over the built v46; load after meet12's m12.js with window.__M12T='d', patched as shot.js says).
   - the strip and its pulses off (CSS), its render loop stopped (__M10T = -1: still);
   - the narrator: one yellow caption box, "Ranked by season P&L. $100K on every trade.";
   - column titles once over the board, the windows' values as page text: P&L and W-L in Anton (16px phones), the line in Shantell Sans (12px floor);
   - nothing typed: every value is read from the chip the page built (meet10's own numbers from __x2pPnl and the sheet). */
(function(){const W=window,D=document;let tries=0;
(function go(){const sec=D.querySelector('section.c8'),four=sec&&sec.querySelector('.c8-four');
 if(!four||!D.documentElement.classList.contains('m12-ready')){if(++tries<600)setTimeout(go,50);return}
 try{run(sec,four)}catch(e){W.__h29mErr=e;console.error(e)}})();
function run(sec,four){
W.__M10T=-1;sec.classList.add('h29m');
const h=sec.querySelector('.ch-h');if(h&&!sec.querySelector('.h29m-cap')){const c=D.createElement('p');c.className='h29m-cap';c.innerHTML='<span class="h29m-tab" aria-hidden="true">2</span>Ranked by season P&amp;L. $100K on every trade.';h.after(c)}
const ones=[...four.querySelectorAll('.c8-one')];
const tx=el=>el?[...el.querySelectorAll('text')].map(t=>t.textContent).join(' ').replace(/\s+/g,' ').trim():'';
const data=ones.map(o=>{const d7=o.querySelector('.c8-d7'),wl=o.querySelector('.m10-wl'),ln=o.querySelector('.m10-ln'),bal=o.querySelector('.c8-bal span');
 const pl=(tx(d7).match(/[+−-]\s?\$[\d,.]+[KM]?/)||[''])[0].replace(/\s/g,'').replace('-','−');
 const w=wl&&wl.querySelector('text.m10-w:not(.m10-hot)'),l=wl&&wl.querySelector('text.m10-l:not(.m10-hot)');
 return {o,d7,wl,ln,pl,w:w?w.textContent:'',l:l?l.textContent:'',line:(bal&&bal.textContent.trim())||tx(ln)}});
data.forEach(x=>{const put=(win,cls,html)=>{if(!win)return null;let v=win.querySelector('.h29m-v');if(!v){v=D.createElement('div');v.className='h29m-v '+cls;win.append(v)}v.innerHTML=html;return v};
 x.vP=put(x.d7,'h29m-pl',`<b class="${x.pl.startsWith("−")?"h29m-d":"h29m-u"}">${x.pl}</b>`);
 x.vW=put(x.wl,'h29m-wl',`<b><span class="h29m-u">${x.w}</span><span class="h29m-k">-</span><span class="h29m-d">${x.l}</span></b>`);
 x.vL=put(x.ln,'h29m-ln',`<p>${x.line.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</p>`)});
const th=[['Season P&L','d7'],['W-L','wl']].map(([t,k])=>{let e=four.querySelector('.h29m-th-'+k);if(!e){e=D.createElement('span');e.className='h29m-th h29m-th-'+k;e.setAttribute('aria-hidden','true');e.textContent=t;four.append(e)}return [e,k]});
const fitLog={};
function fit(){const desk=innerWidth>=1000,f0=desk?22:16,l0=desk?15:12;
 data.forEach(x=>{const m=x.o.dataset.m,L={};
  for(const [v,k] of [[x.vP,'pl'],[x.vW,'wl']]){if(!v)continue;const b=v.querySelector('b'),max=v.clientWidth*.92;let s=f0;b.style.fontSize=s+'px';while(b.scrollWidth>max&&s>12){s-=.5;b.style.fontSize=s+'px'}L[k]=s+(b.scrollWidth>max?' OVER':'')}
  if(x.vL){const p=x.vL.querySelector('p');let s=l0,lh=1.12;p.style.fontSize=s+'px';p.style.lineHeight=lh;
   while(p.scrollHeight>x.vL.clientHeight+.5&&lh>.98){lh-=.02;p.style.lineHeight=lh.toFixed(2)}
   L.line=s+'/'+lh.toFixed(2)+(p.scrollHeight>x.vL.clientHeight+.5?' OVER '+(p.scrollHeight-x.vL.clientHeight).toFixed(1):'')}
  fitLog[m]=L});
 const fr=four.getBoundingClientRect(),o0=data[0];
 th.forEach(([e,k])=>{const win=k==='d7'?o0.d7:o0.wl;if(!win)return;const r=win.getBoundingClientRect();e.style.left=(r.left-fr.left+r.width/2).toFixed(1)+'px'})}
let lw=0;new ResizeObserver(()=>{const w=four.clientWidth;if(w!==lw){lw=w;requestAnimationFrame(()=>requestAnimationFrame(fit))}}).observe(four);
W.__m12&&W.__m12.apply();D.fonts&&D.fonts.ready.then(()=>requestAnimationFrame(fit));fit();
W.__h29m={fit,log:fitLog,data:()=>data.map(x=>({m:x.o.dataset.m,pl:x.pl,wl:x.w+'-'+x.l,line:x.line}))};
D.documentElement.classList.add('h29m-ready')}})();
