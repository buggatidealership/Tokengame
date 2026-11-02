/* H29 · THE DIRECTOR'S CUT (mockup layer, loaded after the top, middle and end parts; see dir.css for the blocks).
   window.__h29dLaunch = true before loading shows the after-launch state (the CA filled in with a SAMPLE address, Buy $EZ, the sticky bar).
   window.__h29dBet = 'rule' prints the rule-9 wording in the bet's caption ("based on the trade of #1 on the board"); default: the owner's words.
   window.__h29d = {fit, colours, state} once applied; a failure is kept in window.__h29dErr. Nothing typed: numbers and names come from the page. */
(function(){const W=window,D=document,H=D.documentElement;
const IMG='tools/concepts/worlds/comic/story/h/h29/director/img/';
const XURL=(W.CONFIG&&CONFIG.x)||'https://x.com/earningszn';
const XG='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.5h2L6.5 3.2H4.3l13.3 17.5Z"/></svg>';
const CP='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2.2" d="M8 8h11v13H8zM5 16V3h11"/></svg>';
/* a SAMPLE contract address for the after-launch mockup only: 44 characters, shown whole, never shortened in the middle */
const SAMPLE='SAMPLEaddressFor1Mockup2Only3Not4Real5xxpump';
function main(){H.classList.add('h29d');D.querySelectorAll('header a,header button').forEach(a=>{const r=a.getBoundingClientRect();if(r.height&&r.height<44)a.classList.add('h29d-hit')});const ft=D.querySelector('footer');if(ft){ft.style.setProperty('border-top','0','important');ft.style.setProperty('box-shadow','none','important')}if(W.__h29dLaunch)H.classList.add('h29d-launch');
 D.querySelectorAll('#record .r6-old').forEach(e=>e.style.setProperty('display','none','important'));gptChip();colours();tryouts();front();bet();proof();end();bar();
 try{W.__t4&&W.__t4.place&&W.__t4.place()}catch(e){}
 fit();setTimeout(fit,600);setTimeout(fit,1800);
 let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;n5place();try{W.__t4&&W.__t4.place&&W.__t4.place()}catch(e){}setTimeout(fit,300)}});
 D.fonts&&D.fonts.ready.then(()=>setTimeout(fit,50));
 W.__h29d={fit,colours,state:()=>({launch:!!W.__h29dLaunch,bet:W.__h29dBet||'owner'})}}

/* MODELS: GPT's chip board is painted green (green means right/profit): the director's repaint, violet, everywhere its chip shows */
function gptChip(){D.querySelectorAll('img').forEach(i=>{const s=i.getAttribute('src')||'';if(!/chip13q-gpt-/.test(s))return;
 const sz=/1800/.test(s)?1800:1200,ext=/webp/.test(s)?'webp':'jpg';i.src=IMG+`chip-gpt-violet-${sz}.${ext}`;
 if(i.srcset)i.srcset=`${IMG}chip-gpt-violet-1200.webp 1200w, ${IMG}chip-gpt-violet-1800.webp 1800w`});
 D.querySelectorAll('source').forEach(s=>{if(/chip13q-gpt-/.test(s.srcset||''))s.srcset=s.srcset.replace(/[^ ,]*chip13q-gpt-(\d+)\.(\w+)/g,(m,n,e)=>IMG+`chip-gpt-violet-${n}.${e}`)})}
/* MODELS: the chart lines take the chips' colours (end drew Claude pink, GPT violet: Claude's chip is clay) */
const SWAP={'#f08bd9':'#ef8a55','#F08BD9':'#ef8a55','#a08fff':'#b18cff','#A08FFF':'#b18cff','#f8f0d9-line':'#e4e0d6'};
function colours(){const L=D.getElementById('learn');if(!L)return;
 L.querySelectorAll('[stroke],[fill],[style]').forEach(e=>{for(const a of ['stroke','fill']){const v=e.getAttribute(a);if(v&&SWAP[v])e.setAttribute(a,SWAP[v])}
  const st=e.getAttribute('style');if(st&&/#f08bd9|#a08fff/i.test(st))e.setAttribute('style',st.replace(/#f08bd9/ig,'#ef8a55').replace(/#a08fff/ig,'#b18cff'))})}
(function watch(){const L=D.getElementById('learn');if(!L)return;let q=0;new MutationObserver(()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;colours()})}).observe(L,{subtree:true,childList:true,attributes:true,attributeFilter:['stroke','style']})})();

/* TRYOUTS: the painted names sink into the glass; one line of page text says who is in tryouts (lead's decision 2) */
function tryouts(){const li=D.querySelector('section.c8 li.ch-tb');if(!li||li.querySelector('.h29d-try'))return;
 const pic=li.querySelector('.c7-pic');if(pic){const m=D.createElement('i');m.className='h29d-tm';m.setAttribute('aria-hidden','true');pic.append(m)}
 const p=D.createElement('p');p.className='h29d-try';p.innerHTML='<b>In tryouts:</b>Mistral · Qwen · Gemini · Nemotron';(li.querySelector('.ch-ink')||li).append(p);n5place()}
/* desktop: the No. 5 chip moves to the empty left column under Meet the models' caption (lead's decision 4) */
function n5place(){const sec=D.querySelector('section.c8'),li=sec&&sec.querySelector('li.ch-tb');if(!li)return;const desk=innerWidth>=1000;
 let box=sec.querySelector('.h29d-n5');
 let col=sec.querySelector('.h29d-c8l');const cap=sec.querySelector('.h29m-cap'),hh=sec.querySelector('h2.ch-h');
 if(desk&&!col&&cap){col=D.createElement('div');col.className='h29d-c8l';(hh||cap).before(col);if(hh)col.append(hh);col.append(cap)}
 if(desk&&!box){box=D.createElement('ul');box.className='h29d-n5';box.setAttribute('aria-label','Next in line');col.append(box)}
 if(desk){if(li.parentElement!==box){li.__home=li.parentElement;box.append(li)}}
 else if(box&&li.__home){li.__home.append(li);box.remove();if(col&&cap){if(hh)col.before(hh);col.before(cap);col.remove()}}}

/* FRONT PAGE: the photo rests on the film's first frame (no numbers), so the move is said once, in the headline (lead's decision 3) */
function front(){const v=D.querySelector('.h29m-fp video');if(!v||v.__h29d)return;v.__h29d=1;const n=(v.querySelector('source')?.getAttribute('src')||'').match(/round-(\d+)-/);
 if(!n)return;const still=IMG+`r${n[1]}-f0.jpg`;const im=new Image();im.onload=()=>{v.poster=still};im.src=still;
 v.addEventListener('pause',()=>{if(!v.ended&&v.currentTime>0)try{v.currentTime=0}catch(e){}});
 v.addEventListener('ended',()=>{try{v.currentTime=0}catch(e){}})}

/* THE BET's one explaining line: the owner's approved words (default), or the rule-9 wording */
function bet(){const s=D.querySelector('.h29e-nar-bet span');if(!s)return;
 s.textContent=W.__h29dBet==='rule'?'We bet the whole pool on NVIDIA, based on the trade of #1 on the board.':'We bet the whole pool on NVIDIA, based on the #1 AI’s prediction.'}

/* TRUST on the first screen: every trade is posted on X before the report; the line is the follow link */
function proof(){const f=D.querySelector('.h29t-film');if(!f||D.querySelector('.h29d-proof'))return;
 const a=D.createElement('a');a.className='h29d-proof';a.href=XURL;a.target='_blank';a.rel='noopener';
 a.innerHTML=XG+'<span>Every trade is posted on <u>X</u> before the report.</span>';const g1=D.querySelector('.h29t-g1');if(g1)g1.before(a);else f.after(a)}

/* END: the primary follow, the proof, the CA slot, pump.fun as the quiet second */
function end(){const fo=D.getElementById('h29eFollow');if(!fo||fo.querySelector('.h29d-ca'))return;
 const x=fo.querySelector('.h29e-x');if(x){x.querySelector('span').innerHTML='Follow <b>@earningszn</b>'}
 const xs=fo.querySelector('.h29e-xs');if(xs)xs.textContent='Every trade hits X before the report.';
 const ca=D.createElement('div');ca.className='h29d-ca';
 if(W.__h29dLaunch){ca.innerHTML=`<b>CA</b><span>$EZ on Solana · sample address</span><code>${SAMPLE}</code><button type="button" class="h29d-cc">${''}Copy the address</button>`}
 else ca.innerHTML='<b>CA</b><span>Drops here at launch.</span>';
 (xs||x||fo.lastElementChild).after(ca);
 const pf=D.createElement('p');pf.className='h29d-pf';
 pf.innerHTML=W.__h29dLaunch?'<a href="#" data-todo="pump.fun link at launch">Buy $EZ on pump.fun</a>':'Launching on pump.fun soon.';ca.after(pf)}

/* BAR: after launch, phones only */
function bar(){if(!W.__h29dLaunch||D.querySelector('.h29d-bar'))return;const b=D.createElement('nav');b.className='h29d-bar';b.setAttribute('aria-label','Follow and buy');
 b.innerHTML=`<a class="h29d-bf" href="${XURL}" target="_blank" rel="noopener">${XG}<span>Follow</span></a><a class="h29d-bb" href="#" data-todo="pump.fun link at launch">Buy $EZ</a><button type="button" class="h29d-bc" aria-label="Copy the contract address">${CP}</button>`;
 D.body.append(b);let ly=scrollY,t=0;const end=D.getElementById('h29eFollow');
 const upd=()=>{const y=scrollY,first=y>innerHeight*.8,er=end&&end.getBoundingClientRect(),inEnd=er&&er.top<innerHeight&&er.bottom>0;
  const down=y>ly+2,up=y<ly-2;if(down)b.classList.remove('on');else if(up&&first&&!inEnd)b.classList.add('on');if(!first||inEnd)b.classList.remove('on');ly=y};
 addEventListener('scroll',()=>{if(!t)t=requestAnimationFrame(()=>{t=0;upd()})},{passive:true});W.__h29dBar=b}

/* GUTTER rhythm: one gutter per joint (duplicates hidden), then the same gap above and below every gutter: content -> gap -> gutter -> gap -> content */
function fit(){front();const gs=[...D.querySelectorAll('.h29-gutter')].filter(g=>getComputedStyle(g).display!=='none'||g.classList.contains('h29d-dup'));
 gs.forEach(g=>g.classList.remove('h29d-dup'));
 let prev=null;gs.forEach(g=>{const r=g.getBoundingClientRect();if(!r.height){return}if(prev){const p=prev.getBoundingClientRect();if(r.top-p.bottom<220){
   /* two gutters with nothing worth reading between: keep the first one */
   if(!between(p.bottom,r.top))g.classList.add('h29d-dup')}}if(!g.classList.contains('h29d-dup'))prev=g});
 const live=gs.filter(g=>!g.classList.contains('h29d-dup')&&g.getBoundingClientRect().height);
 const gap=parseFloat(getComputedStyle(H).getPropertyValue('--d-gap'))||28;
 for(let k=0;k<3;k++)live.forEach(g=>{const r=g.getBoundingClientRect(),cs=getComputedStyle(g);
  const above=lastAbove(r);
  if(above!=null){const d=r.top-above;g.style.setProperty('margin-top',(parseFloat(cs.marginTop)+(gap-d))+'px','important');INK=null}
  const r2=g.getBoundingClientRect(),below=firstBelow(r2);if(below!=null){const d=below-r2.bottom;g.style.setProperty('margin-bottom',(parseFloat(getComputedStyle(g).marginBottom)+(gap-d))+'px','important');INK=null}});
 const lastG=live[live.length-1];live.forEach(g=>g.classList.toggle('h29d-last',g===lastG&&!!g.closest('footer')))}
function ink(){const out=[];const tw=D.createTreeWalker(D.body,NodeFilter.SHOW_TEXT);let n;
 while(n=tw.nextNode()){if(!n.nodeValue.trim())continue;const e=n.parentElement;if(!e||skip(e))continue;const rg=D.createRange();rg.selectNodeContents(n);const R=rg.getBoundingClientRect();if(R.width>1&&R.height>1)out.push(R)}
 D.querySelectorAll('main img,main video,main svg,main canvas,footer img,footer svg').forEach(e=>{if(skip(e)||e.closest('svg')!==e&&e.tagName.toLowerCase()==='svg')return;const R=clipR(e);if(R&&R.width>8&&R.height>8)out.push(R)});return out}
/* an element's box cut by every ancestor that clips (overflow other than visible) */
function clipR(e){const r=e.getBoundingClientRect();let t=r.top,b=r.bottom,l=r.left,rt=r.right;for(let a=e.parentElement;a&&a!==D.body;a=a.parentElement){const c=getComputedStyle(a);if(c.overflow!=='visible'||c.overflowY!=='visible'||c.clipPath!=='none'){const q=a.getBoundingClientRect();t=Math.max(t,q.top);b=Math.min(b,q.bottom);l=Math.max(l,q.left);rt=Math.min(rt,q.right)}}return b>t&&rt>l?{top:t,bottom:b,left:l,right:rt,width:rt-l,height:b-t}:null}
function skip(e){if(e.closest('.h29-gutter,header,script,style,.sr,.p5-sr,.hb-sr,.ch-sr,.h29d-bar,[aria-hidden="true"].hb-gr'))return true;for(let a=e;a&&a!==D.body;a=a.parentElement){const c=getComputedStyle(a);if(c.display==='none'||c.visibility==='hidden'||+c.opacity<.05||c.position==='fixed')return true;if(/inset\(50%/.test(c.clipPath)||(c.clip&&/rect\(0/.test(c.clip)))return true}return false}
let INK=null,INKT=0;function inkC(){const t=performance.now();if(!INK||t-INKT>50){INK=ink();INKT=t}return INK}
function lastAbove(g){let m=null;inkC().forEach(R=>{if(R.top<g.top-2&&R.top>g.top-900&&R.bottom<g.bottom&&(m==null||R.bottom>m))m=R.bottom});return m}
function firstBelow(g){let m=null;inkC().forEach(R=>{if(R.top>g.top+2&&R.bottom>g.bottom+1&&R.top<g.bottom+900&&(m==null||R.top<m))m=R.top});return m}
function between(a,b){return inkC().some(R=>R.top>=a&&R.bottom<=b&&R.height>10)}
try{main()}catch(e){W.__h29dErr=e;console.error(e)}
})();
