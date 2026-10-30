/* q8: one round as a shonen tournament match, lettered like an American comic.
   Two corners (said up / said down) face off over the company, the close lands as an impact frame,
   each fighter gets a reaction close-up (pass, fail, the winner in gold leaf), and the match goes on the record. */
(function(){
const D=document,H=D.documentElement,Q=window.__qfData(+(window.__qfRound||66));
const ESC=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const arrow=d=>`<svg class="q8-ar8" viewBox="0 0 20 20" aria-hidden="true"><path d="${d==='UP'?'M10 1 19 12H13V19H7V12H1Z':'M10 19 1 8H7V1H13V8H19Z'}"/></svg>`;
const crown=`<svg class="q8-cr" viewBox="0 0 40 26" aria-hidden="true"><path d="M3 23 1 6l10 8 9-13 9 13 10-8-2 17Z"/><circle cx="1" cy="6" r="2.4"/><circle cx="20" cy="1.8" r="2.4"/><circle cx="39" cy="6" r="2.4"/></svg>`;
const crack=`<svg class="q8-crk" viewBox="0 0 60 60" aria-hidden="true"><path d="M30 0 26 16 34 22 22 34 30 40 18 60M26 16 8 12M34 22 52 18M22 34 6 40M30 40 46 50"/></svg>`;
const tri=`<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1 11 6 2 11Z"/></svg>`;
/* the jagged shout balloon, drawn as one path */
const shout=(w,h)=>{let p=[],n=14;for(let i=0;i<n;i++){const a=i/n*Math.PI*2,r=i%2?.84:1;p.push((50+48*r*Math.cos(a)).toFixed(1)+' '+(50+46*r*Math.sin(a)).toFixed(1))}return `<svg class="q8-sh" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M${p.join('L')}Z"/></svg>`};
const ups=Q.calls.filter(c=>c.dir==='UP'),dns=Q.calls.filter(c=>c.dir==='DOWN');
const order=[...ups,...dns];
const fighter=(c,i)=>`<div class="q8-f q8-f${i}" data-m="${c.m}" data-side="${c.dir}" data-ok="${c.ok?1:0}" data-win="${c.win?1:0}" style="--mc:${c.col};grid-area:f${i}" data-panel>
   <i class="q8-sl" aria-hidden="true"></i>
   <div class="q8-fc">${c.win?crown:''}${Q.face(c,'q8-face')}</div>
   <b class="q8-nm">${c.nm}</b>
   <span class="q8-bl">${shout()}<span>${arrow(c.dir)}${c.dir==='UP'?'Up':'Down'} ${ESC(c.mag)}!</span></span>
   <span class="q8-slot"><span class="q8-lk">Locked ${Q.called}</span>
     <span class="q8-rs"><i class="q8-st">${c.win?'Winner':c.ok?'Pass':'Fail'}</i><em class="${c.v>=0?'q8-pos':'q8-neg'}">${Q.usd(c.v)}</em>${c.win?`<small>${c.off}% off</small>`:''}</span></span>
   ${c.ok?'':`<b class="q8-smack" aria-hidden="true">Smack!</b>${crack}`}
 </div>`;
const wnr=m=>{const w=(m.win||'').split(/\s*&\s*/)[0];return w&&MODELS[w]?{m:w,col:w==='GROK'?'#15121a':MODELS[w].c,d:MODELS[w].d,dot:MODELS[w].dot,dotc:MODELS[w].dotc,fr:MODELS[w].fr,nm:Q.NM[w]}:null};
const mv=a=>(a>0?'+':'−')+Math.abs(a).toFixed(2)+'%';
const match=(r,isNew)=>{const w=wnr(r);return `<li class="q8-m${isNew?' q8-mnew':''}" style="--wc:${w?w.col:'#3a3540'}">
   <span class="q8-mn">${r.n}</span>${Q.logoOf(r.ticker)?`<img class="q8-ml" src="${Q.logoOf(r.ticker)}" alt="">`:''}
   <span class="q8-mt"><b>${ESC(r.co)}</b><small>${ESC(r.ticker)}</small></span>
   <span class="q8-mw">${w?Q.face(w,'q8-mf'):''}<b>${w?w.nm:'Nobody'}</b></span><em class="${r.a>0?'q8-pos':'q8-neg'}">${mv(r.a)}</em></li>`};
const S=D.createElement('section');S.id='q8';S.className='q8';S.dataset.b='1';
S.setAttribute('aria-label',`One round, start to finish: round ${Q.N}, ${Q.name}`);
S.innerHTML=`
 <div class="q8-bn" data-panel>
   <div class="q8-bn-t"><small>Earnings Zeason tournament</small><b>Round ${Q.N}</b><span>${ESC(Q.name)}</span></div>
   ${Q.logo?`<img class="q8-bn-lg" src="${Q.logo}" alt="${ESC(Q.co)}">`:''}
   <ol class="q8-ch">${['Locked','The close','Graded','The record'].map((t,i)=>`<li data-a="${i+1}"><b>${i+1}</b>${t}</li>`).join('')}</ol>
 </div>
 <div class="q8-arena">
   ${order.map((c,i)=>fighter(c,i)).join('')}
   <div class="q8-mid" data-panel>
     <div class="q8-vs"><b class="q8-up">${arrow('UP')}Up</b><span class="q8-vsc">${Q.logo?`<img src="${Q.logo}" alt="">`:''}<i>VS</i></span><b class="q8-dn">Down${arrow('DOWN')}</b>
       <p>${ups.length} said up. ${dns.length} said down. Locked before earnings, ${Q.called}.</p></div>
     <div class="q8-imp"><img class="q8-imp-a" src="/q78/market.jpg" alt="The market window: ${Q.move}">
       <div class="q8-imp-t"><svg class="q8-fl" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 4 34 18M0 20 30 21M0 36 34 24M100 4 66 18M100 20 70 21M100 36 66 24"/></svg>
         <b class="q8-boom">Ka-boom!</b><i class="q8-jp" aria-hidden="true">ドン</i>
         <span>London close. <em class="${Q.up?'q8-pos':'q8-neg'}">${ESC(Q.co)} ${Q.up?'up':'down'} ${Q.move.replace(/^[+−]/,'')}</em></span></div></div>
   </div>
   <div class="q8-rec" data-panel>
     <p class="q8-rec-h"><b>Round ${Q.N} joins the record.</b> Every round stays here.</p>
     <ol class="q8-ml-l">${match(Q.r,true)}${Q.prev.slice(0,6).map(r=>match(r)).join('')}</ol>
   </div>
 </div>
 <button type="button" class="q8-nx"><span class="q8-nx-l"></span>${tri}</button>`;
D.querySelector('main#top').before(S);H.classList.add('q8-on');
const fit=()=>{const h=D.querySelector('header.top');const top=h?h.getBoundingClientRect().bottom:0;S.style.setProperty('--q8h',Math.max(560,innerHeight-Math.max(0,top))+'px')};
fit();addEventListener('resize',fit);
const NX=['Next: the close','Next: graded','Next: the record','Every round so far'],btn=S.querySelector('.q8-nx');
window.__q8Go=b=>{S.dataset.b=String(b);btn.querySelector('.q8-nx-l').textContent=NX[b-1]};
btn.addEventListener('click',()=>{const b=+S.dataset.b;__q8Go(b<4?b+1:1)});__q8Go(1);
H.classList.add('q8-ready');
})();
