/* rounds5 (round H11): Hot off the press. Laid over the live X3+ page by shot.js (it sets window.__R5BASE to this folder's URL).
   window.__R5 = {d:'A'|'B'|'C' (cover treatment), bl:'plain'|'pencil' (the blank sheets)}.
   The four newest graded rounds hang on the print shop's drying wire, newest first; blank sheets beside them for the prints to come.
   Every word and number: ROUNDS, UPCOMING, MODELS, CO_LOGOS (ez-data.js). Paintings: Hedra gpt-image-2 (img/). */
(function(){
const B=window.__R5BASE||'',O=Object.assign({d:'A',bl:'plain'},window.__R5||{}),INK='#0d0b10';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rng=s=>()=>((s=Math.imul(s^s>>>15,1|s)+0x6D2B79F5|0,(s^s>>>13)>>>0)/4294967296);
const MO=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const date=s=>{if(!s)return'';const[m,d]=s.split('/');return MO[m-1]+' '+(+d)};
const pct=a=>(a>0?'+':'−')+Math.abs(a).toFixed(2)+'%';
const nm=m=>(MODELS[m]&&MODELS[m].name)||m;
const winners=r=>r.win?r.win.split(' & ').filter(x=>MODELS[x]):[];
function line(r){const w=winners(r);if(!w.length)return['NOBODY WINS!',1];if(w.length>1)return[w.map(x=>nm(x).toUpperCase()).join(' & ')+' TIE!'];return[nm(w[0]).toUpperCase()+' WINS!']}
/* brand colour for the masthead; too dark to read on a bright cover -> the heading yellow */
function mastC(t){const c=(CO_LOGOS[t]||{}).c;if(!c)return'#ffd21f';const n=parseInt(c.slice(1),16),R=n>>16,G=n>>8&255,Bb=n&255;return(.2126*R+.7152*G+.0722*Bb)<80?'#ffd21f':c}
/* ---- hand-tuned shapes (stable per round) ---- */
function wob(seed,x0,y0,x1,y1,k=1.4,n=5){const r=rng(seed);const p=[];const side=(ax,ay,bx,by)=>{for(let i=0;i<n;i++){const t=i/n;p.push([(ax+(bx-ax)*t+(r()-.5)*k).toFixed(1),(ay+(by-ay)*t+(r()-.5)*k).toFixed(1)])}};
 side(x0,y0,x1,y0);side(x1,y0,x1,y1);side(x1,y1,x0,y1);side(x0,y1,x0,y0);return'M'+p.map(q=>q.join(' ')).join('L')+'Z'}
function star(seed,n,ry=40){const r=rng(seed*97+11);let d='';for(let i=0;i<n*2;i++){const a=i/(n*2)*Math.PI*2,k=i%2?(.6+r()*.12):(.94+r()*.1);d+=(i?'L':'M')+(50+Math.cos(a)*50*k).toFixed(1)+' '+(50+Math.sin(a)*ry*k).toFixed(1)}return d+'Z'}
function ribbon(seed){const r=rng(seed*5+3),j=()=>(r()-.5)*3;return`M${2+j()} ${8+j()}Q50 ${2+j()} ${98+j()} ${6+j()}L${97+j()} ${92+j()}Q50 ${98+j()} ${3+j()} ${94+j()}Z`}
function circ(seed,n=18){const r=rng(seed*13+1);let d='';for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=.96+r()*.06;d+=(i?'L':'M')+(50+Math.cos(a)*48*k).toFixed(1)+' '+(50+Math.sin(a)*48*k).toFixed(1)}return d+'Z'}
const S=(vb,inner,cls='')=>`<svg class="${cls}" viewBox="${vb}" preserveAspectRatio="none">${inner}</svg>`;
const inkP=(d,fill,w=2.6)=>`<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
/* two-tone fill: the shape, then its shadow side (a second, darker copy clipped low-right), then the ink */
const two=(id,d,fill,shade)=>`<clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" fill="${fill}"/><path d="M0 62L100 38L100 100L0 100Z" fill="${shade}" clip-path="url(#${id})" opacity=".9"/><path d="${d}" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
function mark(m,sz){const M=MODELS[m];return`<svg viewBox="0 0 24 24"><path d="${M.d}" fill="${M.fg||'#fff'}"/></svg>`}
/* ---- the three cover treatments ---- */
function dressA(r){const[t,no]=line(r),up=r.a>0;
 return`<img class="art" src="${B}img/cv-r${r.n}.jpg" alt="">`+
 `<div class="cb">${S('0 0 100 100',two('ca'+r.n,wob(r.n,2,2,98,98,3),'#fff','#dfeef6'))}<i>No.</i><b>${r.n}</b><em>${esc(date(r.resolves||r.called))}</em></div>`+
 `<div class="mt"><span class="pub">EZ <b>·</b> Season 1</span><span class="co" style="--bc:${mastC(r.ticker)}">${esc(r.co)}</span><span class="tk">(${esc(r.ticker)})</span></div>`+
 `<div class="bu">${S('0 0 100 100',two('cs'+r.n,star(r.n,13),up?'#03c870':'#ff3a31',up?'#029a56':'#c9241d'))}<span>${pct(r.a)}</span></div>`+
 `<div class="cl">${S('0 0 100 100',two('cr'+r.n,ribbon(r.n),'#ffd21f','#f0a90d'))}<span class="${no?'no':''}">${esc(t)}</span></div>`}
let DRESS=null;
function dressB(r){const d=DRESS[r.n],[t]=line(r),up=r.a>0;if(!d)return dressA(r);
 const bx=d.box,bn=d.banner,bs=d.burst,rb=d.ribbon,x0=Math.max(bn[0],bx[0]+bx[2]+1);
 const at=(b,c,h)=>`<div class="sf ${c}" style="left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%">${h}</div>`;
 return`<img class="art" src="${B}img/${d.img}.jpg" alt="">`+
  at([x0,bn[1],bn[0]+bn[2]-x0,bn[3]],'bn',`<span class="co">${esc(r.co)}<small>(${esc(r.ticker)})</small></span>`)+
  at(bx,'bx cb',`<i>No.</i><b>${r.n}</b>`)+
  at(bs,'bs',`<span style="--mv:${up?'#03a85e':'#e22b22'}">${pct(r.a)}</span>`)+
  at(rb,'rb',`<span>${esc(t)}</span>`)}
function checks(){let d='';for(let y=0;y<2;y++)for(let x=0;x<16;x++)if((x+y)%2===0)d+=`M${x*6.25} ${y*50}h6.25v50h-6.25Z`;
 return S('0 0 100 100',`<rect width="100" height="100" fill="#ffd21f"/><path d="${d}" fill="${INK}"/><path d="M0 100H100" stroke="${INK}" stroke-width="3" vector-effect="non-scaling-stroke"/>`)}
function dressC(r){const[t,no]=line(r),up=r.a>0,W=winners(r);
 const box=W.length?`<div class="mm">${W.map(m=>mark(m)).join('')}</div>`:`<div class="mm" style="justify-content:center;align-items:center;font:400 18cqw/1 'Luckiest Guy';color:#fff">?</div>`;
 const bg=W.length===1?(MODELS[W[0]].bg&&MODELS[W[0]].bg!=='#fff'?MODELS[W[0]].bg:MODELS[W[0]].c):W.length?'#2b2733':'#c42a20';
 return`<img class="art" src="${B}img/cv-r${r.n}.jpg" alt=""><div class="gg">${checks()}</div>`+
  `<div class="cx"><div class="box" style="background:${bg}">${S('0 0 100 100',`<path d="${wob(r.n+5,1,1,99,99,2.4)}" fill="none" stroke="${INK}" stroke-width="3" vector-effect="non-scaling-stroke"/>`,'f')}${box}</div><em>No. ${r.n}</em></div>`+
  `<div class="mt"><span class="pub">EZ <b>·</b> Season 1 <b>·</b> ${esc(date(r.resolves||r.called))}</span><span class="co" style="--bc:${mastC(r.ticker)}">${esc(r.co)}</span><span class="tk">(${esc(r.ticker)})</span></div>`+
  `<div class="pc">${S('0 0 100 100',two('cp'+r.n,circ(r.n),up?'#03c870':'#ff3a31',up?'#029a56':'#c9241d'))}<span><small>Moved</small>${pct(r.a)}</span></div>`+
  `<div class="sash">${S('0 0 100 100',two('ch'+r.n,`M0 14L100 4L100 86L0 96Z`,no?'#ff3a31':'#c42a20','#8f1a14'))}<span>${esc(t)}</span></div>`}
/* the print sheet's furniture in the margin, hand-placed: crop marks at the cover's corners, a colour bar, a registration target */
function marks(r){const R=rng(r.n*3+9),j=()=>((R()-.5)*.6).toFixed(2);const L=(x,y,dx,dy)=>`<path d="M${x+dx*1.5} ${y}h${dx*5}M${x} ${y+dy*1.2}v${dy*4}" stroke="${INK}" stroke-width="1" vector-effect="non-scaling-stroke"/>`;
 const bar=['#fdbc2a','#03c870','#ff3a31',INK].map((c,i)=>`<rect x="${-1+i*5.4}" y="${137+ +j()}" width="5" height="4" fill="${c}" stroke="${INK}" stroke-width=".6" vector-effect="non-scaling-stroke"/>`).join('');
 return`<svg class="r5-mk" viewBox="0 0 100 133.3" preserveAspectRatio="none">${L(0,0,-1,-1)}${L(100,0,1,-1)}${L(0,133.3,-1,1)}${L(100,133.3,1,1)}</svg>`+
  `<svg class="r5-mk" viewBox="0 0 100 133.3" preserveAspectRatio="none" style="overflow:visible">${bar}<g transform="translate(96 139)"><circle r="2.4" fill="none" stroke="${INK}" stroke-width=".8" vector-effect="non-scaling-stroke"/><path d="M-3.6 0H3.6M0 -3.6V3.6" stroke="${INK}" stroke-width=".8" vector-effect="non-scaling-stroke"/></g></svg>`}
/* wet ink running off the bottom of the print: tapered drops, each its own length and timing */
function drips(r,k){const R=rng(r.n*11+k);let p='';const col=[INK,mastC(r.ticker)==='#ffd21f'?'#c42a20':mastC(r.ticker)];
 for(let i=0;i<3;i++){const x=12+R()*76,len=45+R()*55,w=2.2+R()*1.8,c=col[i%2];
  p+=`<path style="--dd:${(6.5+R()*3).toFixed(1)}s;--dk:${(2.4+i*1.7+R()).toFixed(1)}s" d="M${x-w} 0C${x-w*.6} ${len*.5} ${x-w*.9} ${len*.82} ${x} ${len}C${x+w*.9} ${len*.82} ${x+w*.6} ${len*.5} ${x+w} 0Z" fill="${c}" stroke="${INK}" stroke-width=".7" vector-effect="non-scaling-stroke"/>`}
 return`<svg class="r5-dr" viewBox="0 0 100 100" preserveAspectRatio="none">${p}</svg>`}
const ROLLER=`<svg class="r5-rl" viewBox="0 0 100 10" preserveAspectRatio="none"><rect x="1" y="1" width="98" height="8" rx="4" fill="${INK}"/><rect x="3" y="2.2" width="94" height="1.6" rx=".8" fill="#9aa3b5"/><rect x="1" y="6.6" width="98" height="2.4" rx="1.2" fill="#ff3a31"/><rect x="0" y="0" width="3" height="10" rx="1" fill="#fdbc2a" stroke="${INK}" stroke-width=".8" vector-effect="non-scaling-stroke"/><rect x="97" y="0" width="3" height="10" rx="1" fill="#fdbc2a" stroke="${INK}" stroke-width=".8" vector-effect="non-scaling-stroke"/></svg>`;
function sheet(r,i,far){const D={A:dressA,B:dressB,C:dressC}[O.d];
 const lab=`Round ${r.n}: ${r.co} (${r.ticker}), ${r.a>0?'up':'down'} ${Math.abs(r.a).toFixed(2)}%, ${line(r)[0].toLowerCase()}`;
 return`<button class="r5-sh${far?' far':''}${i===0?' roll':''}" data-n="${r.n}" aria-label="${esc(lab)}" style="--p:${(3.6+i*.55).toFixed(2)}s;--dl:${(-i*1.3).toFixed(1)}s;--a:${(1.3-i*.12).toFixed(2)}deg">`+
  `<div class="r5-pp"><div class="r5-cv d${O.d}">${D(r)}<i class="r5-wet"></i></div><div style="position:absolute;left:12%;top:17.6%;width:76%;aspect-ratio:3/4">${marks(r)}</div>${i<2?drips(r,i):''}</div>`+
  `${i===0?ROLLER:''}<img class="r5-ov" src="${B}img/spr-sheet.png" alt=""></button>`}
function blank(u,i,far){const pencil=O.bl==='pencil'&&u;
 const pn=pencil?`<div class="r5-pn"><svg viewBox="0 0 100 133.3" preserveAspectRatio="none"><path d="${wob(u.n,3,3,24,26,1.6,3)}" fill="none" stroke="currentColor" stroke-width="1.1" vector-effect="non-scaling-stroke"/><path d="${wob(u.n+2,26,3,97,30,1.8,4)}" fill="none" stroke="currentColor" stroke-width=".9" stroke-dasharray="4 2" vector-effect="non-scaling-stroke"/><g transform="translate(56 60) scale(.42)"><path d="${star(u.n,11)}" fill="none" stroke="currentColor" stroke-width="1.1" vector-effect="non-scaling-stroke"/></g><path d="${ribbon(u.n)}" transform="translate(4 108) scale(.8 .2)" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/><path d="M14 60L44 86M44 60L14 86" stroke="currentColor" stroke-width=".7" opacity=".7" vector-effect="non-scaling-stroke"/></svg>`+
  `<span class="p1">No. ${u.n}</span><span class="p2">${esc(u.co)}</span><span class="p3">(${esc(u.ticker)}) · ${esc(date(u.resolves))}</span><span class="p5">?</span><span class="p4">??? WINS!</span></div>`:'';
 const lab=u?`Next print: round ${u.n}, ${u.co}, graded at the close on ${date(u.resolves)}`:'A blank sheet for the next print';
 return`<button class="r5-sh blank b2${far?' far':''}" tabindex="-1" aria-label="${esc(lab)}" style="--p:${(4.1+i*.4).toFixed(2)}s;--dl:${(-i*.9-2).toFixed(1)}s;--a:${(1.6+i*.1).toFixed(2)}deg"><div class="r5-pp">${pn}</div><img class="r5-ov" src="${B}img/spr-sheet2.png" alt=""></button>`}
function frame(){const r=rng(41),p=[];const n=7,k=.5;const side=(ax,ay,bx,by)=>{for(let i=0;i<n;i++){const t=i/n;p.push([(ax+(bx-ax)*t+(r()-.5)*k).toFixed(2),(ay+(by-ay)*t+(r()-.5)*k).toFixed(2)])}};
 side(.4,.4,99.6,.4);side(99.6,.4,99.6,99.6);side(99.6,99.6,.4,99.6);side(.4,99.6,.4,.4);
 return`<svg class="r5-fr" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M${p.map(q=>q.join(' ')).join('L')}Z" fill="none" stroke="${INK}" stroke-width="5" vector-effect="non-scaling-stroke"/></svg>`}
function wire(y,seed){const r=rng(seed);let d='M-2 '+(6+(r()-.5)).toFixed(1);for(let x=10;x<=102;x+=10)d+=`L${x} ${(6+(r()-.5)*1.2).toFixed(1)}`;
 return`<svg class="r5-wire" style="top:${y}%" viewBox="0 0 100 12" preserveAspectRatio="none"><path d="${d}" fill="none" stroke="${INK}" stroke-width="2.2" vector-effect="non-scaling-stroke"/><path d="${d}" transform="translate(0 -.6)" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width=".7" vector-effect="non-scaling-stroke"/></svg>`}
/* ---- layout: phone = two wires at two depths (the newest two hang on the near wire, big; the next two and the blanks on the far
   wire, smaller); desktop = one wire, newest first, blanks after. Positions in % of the panel. ---- */
function build(){const sec=document.querySelector('#wc-book .wc-season');if(!sec)return;sec.querySelector('.r5')?.remove();
 const desk=innerWidth>=1000,G=ROUNDS.filter(r=>r.a!=null).sort((a,b)=>b.n-a.n),four=G.slice(0,4),U=(window.UPCOMING||[]).slice(0,3);
 const pl=desk?'shopa-16x9-hd':'shopa2-9x16-hd',ar=desk?16/9:9/16;
 let html='',wires='';const put=(h,x,y,w,far)=>{html+=h.replace('style="','style="left:'+x+'%;top:'+y+'%;--w:'+w+'%;')};
 const hOf=w=>w*(900/576)*ar;                 /* a sheet's height in % of the panel's height */
 if(!desk){const yN=46.5,yF=18.8,wN=40,wF=20.5;wires=wire(yF,3)+wire(31.8,5)+wire(yN,7);
  [[four[2],7],[four[3],27.5]].forEach(([r,x],i)=>r&&put(sheet(r,i+2,1),x,yF-hOf(wF)*.03,wF));
  put(blank(U[0],0,1),49,yF-hOf(wF)*.03,wF);put(blank(U[1],1,1),70,yF-hOf(wF)*.03+.2,wF);
  [[four[0],7],[four[1],50.5]].forEach(([r,x],i)=>r&&put(sheet(r,i,0),x,yN-hOf(wN)*.03,wN))}
 else{const y=22.1,w=14.2;wires=wire(y,3);four.forEach((r,i)=>put(sheet(r,i,0),3+i*15.6,y-hOf(w)*.03,w));[0,1].forEach(i=>put(blank(U[i],i,0),3+(4+i)*15.6,y-hOf(w)*.03+i*.15,w))}
 const box=document.createElement('div');box.className='r5';box.setAttribute('role','group');box.setAttribute('aria-label','Hot off the press: the four newest graded rounds');
 box.innerHTML=`<div class="r5-st" style="--h:100%"><img class="r5-pl" src="${B}img/${pl}.jpg" alt="">${wires}`+
  `<div class="r5-ttl"><h2 class="r5-h"><span>Hot off the press</span></h2><br><span class="r5-k">Printed at every close <b>·</b> ${G.length} so far</span></div>${html}${frame()}</div>`;
 sec.insertBefore(box,sec.firstChild);
 box.querySelectorAll('.r5-sh').forEach(b=>b.style.setProperty('--h',b.offsetHeight+'px'));
 fit(box);wire_up(box)}
function fit(root){root.querySelectorAll('.mt .co,.sf.bn .co,.cl span,.sf.rb span,.dC .sash span').forEach(e=>{const p=e.parentElement,cs=getComputedStyle(p);
 const room=(p.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight))*(e.closest('.sash')?.62:e.closest('.sf.rb')?.9:1);
 e.style.display='inline-block';let f=parseFloat(getComputedStyle(e).fontSize),g=0;while(Math.max(e.offsetWidth,e.scrollWidth)>room+.5&&f>4&&g++<80){f-=.3;e.style.fontSize=f+'px'}e.style.display=''})}
/* ---- life and the tap ---- */
function wire_up(box){const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const go=()=>box.querySelectorAll('.r5-sh:not(.blank)').forEach(b=>b.classList.add('go'));
 if(rm||!window.IntersectionObserver)go();else new IntersectionObserver((es,o)=>{if(es.some(e=>e.isIntersecting)){go();o.disconnect()}},{threshold:.45}).observe(box);
 box.querySelectorAll('.r5-sh:not(.blank)').forEach(b=>b.onclick=()=>take(b))}
let cur=null;
function take(b){if(cur)return;const R=b.getBoundingClientRect(),vw=innerWidth,vh=innerHeight,ar=R.height/R.width;
 const w=Math.min(vw*.78,vh*.72/ar,460),h=w*ar,x=(vw-w)/2,y=(vh-h)/2;
 const sc=document.createElement('div');sc.className='r5-scr';document.body.append(sc);
 const f=b.cloneNode(true);f.className='r5-fly';f.style.cssText=`width:${w}px;height:${h}px;filter:drop-shadow(0 24px 30px rgba(0,0,0,.5))`;document.body.append(f);
 b.classList.add('gone');requestAnimationFrame(()=>sc.classList.add('on'));const s0=R.width/w,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const from=`translate(${R.left+(R.width-w)/2}px,${R.top+(R.height-h)/2}px) scale(${s0})`;
 /* the clip lets go: the sheet drops a little and tips, then comes to you */
 const K=[{transform:from},{transform:from+' translateY(10px) rotate(-4deg)',offset:.22,easing:'cubic-bezier(.3,0,.3,1)'},{transform:`translate(${x}px,${y}px) rotate(1.5deg) scale(1.03)`,offset:.8,easing:'cubic-bezier(.2,.8,.3,1)'},{transform:`translate(${x}px,${y}px)`}];
 const a=f.animate(rm?[{opacity:0,transform:`translate(${x}px,${y}px)`},{opacity:1,transform:`translate(${x}px,${y}px)`}]:K,{duration:rm?150:900,fill:'both'});
 cur={b,f,sc,from,n:b.dataset.n};
 a.onfinish=()=>{location.hash='#/round/'+cur.n;setTimeout(()=>{if(!cur)return;f.animate([{opacity:1},{opacity:0}],{duration:260,fill:'both'});sc.classList.remove('on')},650)}}
addEventListener('hashchange',()=>{if(!cur||/#\/round\//.test(location.hash))return;const{b,f,sc}=cur;cur=null;f.remove();sc.remove();b.classList.remove('gone');
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches)b.animate([{transform:'translateY(-30px) rotate(6deg)',opacity:0},{transform:'translateY(4px) rotate(-2deg)',opacity:1,offset:.6},{transform:'none'}],{duration:700,easing:'cubic-bezier(.3,0,.2,1)'})});
window.__R5fit=()=>fit(document.querySelector(".r5"));window.__R5take=i=>take([...document.querySelectorAll('.r5 .r5-sh:not(.blank)')].sort((a,b)=>b.dataset.n-a.dataset.n)[i||0]);
function start(){(window.__R5DRESS?Promise.resolve(window.__R5DRESS):fetch(B+'dress.json').then(r=>r.json())).then(d=>{DRESS=d;build();document.fonts.ready.then(()=>fit(document.querySelector('.r5')||document))})}
let w0=innerWidth;addEventListener('resize',()=>{if((innerWidth>=1000)!==(w0>=1000)){w0=innerWidth;build()}});
start();
})();
