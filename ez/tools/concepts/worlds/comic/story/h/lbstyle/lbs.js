/* lbstyle: the Leaderboard tab as a chapter in another ink. A mockup laid over the real built page.
   window.LBS_T = 'a' (noir ink), 'b' (anime cel), 'c' (noir x pop). Restyles the page's own DOM, so the
   live data and the Season / 24h / 7 days switches keep working; re-dresses whatever the page re-renders. */
(function(){
const T=window.LBS_T||'a',H=document.documentElement;
const IMG='tools/concepts/worlds/comic/story/h/lbstyle/img/',CAST='tools/concepts/worlds/comic/story/h/cast2/img/';
H.classList.add('lbs','lbs-'+T);
const LB=document.getElementById('wc-lb');if(!LB)return;
/* which model a face is: read from the scoreboard's own data-m + --mc, never typed */
const MC={};const mcs=()=>LB.querySelectorAll('[data-m] .wc-face').forEach(f=>{const m=f.closest('[data-m]').dataset.m.toLowerCase();MC[f.style.getPropertyValue('--mc').trim().toLowerCase()]=m});mcs();
const who=f=>MC[f.style.getPropertyValue('--mc').trim().toLowerCase()]||(f.closest('[data-m]')?f.closest('[data-m]').dataset.m.toLowerCase():null);
const still=m=>T==='b'?CAST+'b-'+m+'-cel2.jpg':CAST+'b-'+m+'-noir.jpg';
const pose=(m,p)=>IMG+(T==='b'?'c-':'n-')+m+'-'+p+'.jpg';
/* seeded jitter, so a frame keeps its shape across redraws */
const rnd=s=>()=>{s=(s*16807)%2147483647;return s/2147483647};
const NS='http://www.w3.org/2000/svg';
function path(w,h,r,j,step){const p=[];const E=(x0,y0,x1,y1)=>{const L=Math.hypot(x1-x0,y1-y0),n=Math.max(2,Math.round(L/step));for(let i=0;i<n;i++){const t=i/n;p.push([x0+(x1-x0)*t+(r()-.5)*j,y0+(y1-y0)*t+(r()-.5)*j])}};
 E(0,0,w,0);E(w,0,w,h);E(w,h,0,h);E(0,h,0,0);return 'M'+p.map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join('L')+'Z'}
/* ink frame: a hand-wobbled thick outer line and a thin inner line, drawn on the element, redrawn on resize */
function frame(el,seed,o){o=o||{};if(!el)return;let s=el.querySelector(':scope>svg.lbs-fr');
 if(!s){s=document.createElementNS(NS,'svg');s.setAttribute('class','lbs-fr'+(o.cls?' '+o.cls:''));s.setAttribute('aria-hidden','true');el.prepend(s);
  if(getComputedStyle(el).position==='static')el.style.position='relative';new ResizeObserver(()=>draw()).observe(el)}
 const draw=()=>{const w=el.offsetWidth,h=el.offsetHeight;if(!w||!h||s.dataset.wh===w+'x'+h)return;s.dataset.wh=w+'x'+h;s.setAttribute('viewBox',`-4 -4 ${w+8} ${h+8}`);
  const r=rnd(seed||7),i=o.inner===0?0:(o.inner||5);
  s.innerHTML=`<path class="lbs-o" d="${path(w,h,r,o.j||2.2,o.step||36)}"/>`+(i?`<path class="lbs-i" transform="translate(${i} ${i})" d="${path(w-2*i,h-2*i,r,(o.j||2.2)*.6,o.step||36)}"/>`:'')};
 draw()}
/* faces: the cast in this chapter's finish, by state */
function faces(){mcs();LB.querySelectorAll('.wc-face').forEach(f=>{const m=who(f);if(!m)return;
  const cn=f.closest('.wc11c-cn');let src=still(m);
  if(cn&&T!=='x'){src=pose(m,cn.querySelector('.wc11n-gt')?'ticket':'chase')}
  let im=f.querySelector('img.lbs-pic');if(!im){im=document.createElement('img');im.className='lbs-pic';im.alt='';im.decoding='async';f.appendChild(im)}
  if(im.getAttribute('src')!==src)im.setAttribute('src',src);f.dataset.lbs=m;
  /* the golden ticket holder lives: rain keeps falling, the foil glints (a 4 s seamless loop; the still with reduced motion) */
  let lv=f.querySelector('video.lbs-pic');const want=T!=='b'&&/-ticket\.jpg$/.test(src)&&!matchMedia('(prefers-reduced-motion: reduce)').matches?src.replace('.jpg','-loop.mp4'):'';
  if(lv&&lv.dataset.src!==want){lv.remove();lv=null}
  if(want&&!lv){lv=document.createElement('video');lv.className='lbs-pic';lv.muted=true;lv.loop=true;lv.playsInline=true;lv.autoplay=true;lv.setAttribute('muted','');lv.setAttribute('aria-hidden','true');lv.dataset.src=want;lv.poster=src;lv.src=want;f.appendChild(lv)}
  const box=f.closest('.wc11c-cn,.ss3-c,.wc-pf-r,.wc11c-under>span,li');if(box)box.dataset.lbsM=m})}
function frames(){
 const k=(sel,seed,o)=>LB.querySelectorAll(sel).forEach((e,i)=>frame(e,seed+i*13,o));
 k('.wc11n-bill',3,{inner:6,j:2.6});k('.wc11c-cn',21,{inner:0,j:2});k('.wc11n-stub',41,{inner:0,j:1.6,step:20});
 k('.wc11n-std,.wc11n-bell,.wc11c-line',61,{inner:0,j:1.6,step:22,cls:'lbs-cap'});
 k('.ss3-tk',81,{inner:6,j:2.6});k('.ss-swb',91,{inner:0,j:1.6,step:20});k('.wc-sb-cap',101,{inner:0,j:1.6,step:24,cls:'lbs-cap'});
 k('.wc-pf',111,{inner:6,j:2.6});k('.wc-pf-tabs>button',121,{inner:0,j:1.4,step:18});k('.wc-rc',131,{inner:6,j:2.6});
 k('.wc-h2',141,{inner:0,j:1.8,step:26,cls:'lbs-hfr'})}
function chapter(){if(LB.querySelector('.lbs-ch'))return;const d=document.createElement('div');d.className='lbs-ch';
 const W={a:['Chapter two','The standings'],b:['Episode 2','The standings'],c:['Chapter two','The standings']}[T];
 d.innerHTML=`<span class="lbs-ch-k">${W[0]}</span><span class="lbs-ch-t">${W[1]}</span>`;LB.prepend(d);frame(d,5,{inner:0,j:1.6,step:22,cls:'lbs-cap'})}
function all(){faces();frames();chapter()}
let q=0;new MutationObserver(ms=>{if(!ms.some(m=>!(m.target.closest&&m.target.closest('svg.lbs-fr,.wc-face'))&&![...m.addedNodes].every(n=>n.nodeType===1&&(n.matches('svg.lbs-fr,.lbs-pic,.lbs-ch')))))return;if(q)return;q=requestAnimationFrame(()=>{q=0;faces();frames()})}).observe(LB,{childList:true,subtree:true});
H.style.setProperty('--lbs-img',`'${IMG}'`);
['n-street-2k','n-office-2k','n-window','n-chapter','m-sign','m-board','c-arena','c-board','c-sky'].forEach(n=>H.style.setProperty('--lbs-'+n.replace('-2k',''),`url(${IMG}${n}.jpg)`));
all();
/* the tab change as a chapter turn: an overlay that plays when the Leaderboard opens */
function turn(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 let o=document.getElementById('lbs-turn');if(o)o.remove();o=document.createElement('div');o.id='lbs-turn';o.setAttribute('aria-hidden','true');
 const ch=LB.querySelector('.lbs-ch');o.innerHTML=`<div class="lbs-tp"><span class="lbs-ch-k">${ch.querySelector('.lbs-ch-k').textContent}</span><span class="lbs-ch-t">${ch.querySelector('.lbs-ch-t').textContent}</span></div>`+
  (T==='b'?['grok','claude','gpt','kimi'].map((m,i)=>`<img class="lbs-ec lbs-ec${i}" src="${still(m)}" alt="">`).join(''):'');
 document.body.appendChild(o);requestAnimationFrame(()=>o.classList.add('go'));setTimeout(()=>o.remove(),2300)}
window.LBS={all,turn,frame};
addEventListener('hashchange',()=>{if(/leaderboard/.test(location.hash))turn()});
})();
