/* Round H26 · film3: "the whole game" as a small sub-section of How a round works, and the gaps (mockup over the built v46-live-x2plus.html).
   window.__f3(take, opts): take 'A' bezel, 'B' transport, 'C' legs, 'D' scope, 'E' module. opts.open: 'phone' | 'land' | 'theatre' shows the open state.
   The monitor is the painting cut as a 9-slice (CSS border-image) at one uniform scale k = width / painting width, so the bezel keeps its painted
   thickness and only the gold side strips stretch: the glass is exactly 16:9 (2.39:1 on D) at any width. E keeps its painting whole (scaled uniformly).
   Every word and number is page text: the running time is read from the film's own metadata (1:20 today). */
(function(){
const W=window,D=document,M=W.__F3M||'tools/concepts/worlds/comic/story/h/film3/out/',MED='media/';
/* paintings, cropped to the object (out/f3-*.jpg, px of the crop): cw, ch, slices L T R B (the glass), led = lit window, ar = glass aspect */
const P={
 fb:{cw:3053,ch:1685,s:[59,55,58,302],led:[2623,1479,2959,1563],ar:16/9},
 fbt:{cw:3053,ch:1439,s:[59,55,58,56],ar:16/9},
 fp:{cw:3200,ch:1763,s:[43,113,53,126],ar:16/9},
 fs:{cw:3650,ch:923,s:[63,46,59,189],ar:2.39},
 fr:{cw:3311,ch:1444,glass:[167,172,2551,1256],led:[2727,156,3127,832],key:[2949,1088,150]}};
const TK={A:'fb',B:'fb',C:'fp',D:'fs',E:'fr',F:'fbt',T:'fbt'};
let DUR='1:20',SEC=80;
const css=`
.f3{position:relative;margin:0;padding:0}
.f3-mon{position:relative;box-sizing:border-box;margin:0 auto;border-style:solid;border-color:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent}
.f3-mon:focus-visible{outline:2px solid #ffd76a;outline-offset:4px}
.f3-gl{position:absolute;overflow:hidden;background:#000;border-radius:3px}
.f3-gl img.f3-po{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.f3-gl video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0}
.f3-gl video.f3-on{opacity:1}
.f3-gl::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(128deg,rgba(255,255,255,.10) 0,rgba(255,255,255,.03) 26%,transparent 27%);mix-blend-mode:screen}
.f3-sc{position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,.14) 0 1px,transparent 1px 3px)}
.f3-fade{position:absolute;left:0;right:0;bottom:0;height:34%;pointer-events:none;background:linear-gradient(transparent,rgba(0,0,0,.62))}
/* light on the glass: the NVIDIA timer's recipe (Anton, gold gradient, glow) */
.f3-osd{position:absolute;font:400 15px/1 Anton,sans-serif;letter-spacing:.04em;color:#ffd25e;background:linear-gradient(#fff3c4,#ffd25e 55%,#e59a14);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 4px rgba(255,190,60,.55));white-space:nowrap}
.f3-dur{right:9px;bottom:8px}
.f3-disc{position:absolute;left:50%;top:89%;width:44px;height:44px;margin:-22px 0 0 -22px;pointer-events:none}
.f3-disc i{position:absolute;left:50%;top:50%;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#ffe9a0,#f5b81f 55%,#b07a0c);box-shadow:0 0 0 2px #000,0 0 14px rgba(255,190,60,.75)}

.f3-D .f3-disc{left:8.5%;top:50%}
.f3-disc i::after{content:'';position:absolute;left:11.5px;top:8.5px;border-left:10px solid #000;border-top:6.5px solid transparent;border-bottom:6.5px solid transparent}
/* B: the transport as light on the glass (a paused player's own chrome): play, a track, the running time */
.f3-tr{position:absolute;left:8px;right:9px;bottom:7px;display:flex;align-items:center;gap:8px;pointer-events:none}
.f3-tr .pl{flex:none;width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#ffe9a0,#f5b81f 55%,#b07a0c);box-shadow:0 0 0 1.5px #000,0 0 10px rgba(255,190,60,.7);position:relative}
.f3-tr .pl::after{content:'';position:absolute;left:8.5px;top:6px;border-left:7.5px solid #000;border-top:5px solid transparent;border-bottom:5px solid transparent}
.f3-tr .pl.ps::after{left:7px;top:6px;width:2.6px;height:10px;border:0;background:#000;box-shadow:5px 0 0 #000}
.f3-tr .tk{flex:1;height:3px;border-radius:2px;background:rgba(255,210,94,.28);box-shadow:0 0 6px rgba(255,190,60,.35);position:relative}
.f3-tr .tk b{position:absolute;left:0;top:0;bottom:0;border-radius:2px;background:linear-gradient(90deg,#e59a14,#ffd25e);box-shadow:0 0 6px rgba(255,190,60,.8)}
.f3-tr .tk b::after{content:'';position:absolute;right:-5px;top:-3.5px;width:10px;height:10px;border-radius:50%;background:#ffe9a0;box-shadow:0 0 0 1.5px #000}
.f3-tr .f3-osd{position:static}
/* E: the running time lit in the module's tall window, the gold key is play */
.f3-led{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none}
.f3-led .f3-osd{position:static;font-size:var(--lf,20px);line-height:.92}
.f3-key{position:absolute;border-radius:50%;pointer-events:none;box-shadow:0 0 0 0 rgba(255,214,110,0)}
.f3-key::after{content:'';position:absolute;left:50%;top:50%;margin:-6px 0 0 -3.5px;border-left:10px solid rgba(20,16,10,.82);border-top:6px solid transparent;border-bottom:6px solid transparent;filter:drop-shadow(0 1px 0 rgba(255,240,190,.5))}
/* the sub-head: the frames' own S3 tab, with a play mark where the frames have their number */
.f3 .t5-sh{margin:0 0 -.62em 4px!important}
.f3 .f3-pm{display:block;width:.46em;height:.5em;position:relative;left:.04em;background:#f8f0d9;clip-path:polygon(0 0,100% 50%,0 100%)}
.f3-run{font:400 .62em/1 Bangers,Anton,sans-serif;letter-spacing:.04em;margin-left:.3em;-webkit-text-fill-color:#ffd25e;color:#ffd25e}
/* the joint between How a round works and its film: a gold trace from the frames into the monitor (the frame gutters' material, lighter than a beat gutter) */
.f3-j{position:relative;display:block;pointer-events:none}
.f3-j svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}
/* the chapter gap before Meet the models: an edge connector, fingers above into a socket below (theme7's connector painting) */
.f3-cx{position:relative;pointer-events:none;background:url(tools/concepts/worlds/comic/story/h/film3/out/f3-cx.jpg) center 47%/cover no-repeat;filter:brightness(.78) saturate(.9)}
.f3-cx{-webkit-mask:linear-gradient(transparent,#000 14%,#000 86%,transparent);mask:linear-gradient(transparent,#000 14%,#000 86%,transparent)}
/* open: the same monitor, grown */
.f3-lb{position:fixed;inset:0;z-index:2147483000;background:rgba(3,5,10,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}
.f3-lb .f3-x{position:absolute;right:10px;top:10px;width:44px;height:44px;border-radius:50%;border:2px solid #f8f0d9;background:#0d0b10;color:#f8f0d9;font:400 24px/40px Anton,sans-serif;text-align:center;box-shadow:2px 2px 0 #000}
.f3-lb .f3-hd{font:400 22px/1 Bangers,Anton,sans-serif;letter-spacing:.03em;text-transform:uppercase;color:#f8f0d9;-webkit-text-stroke:.08em #0d0b10;paint-order:stroke fill;text-shadow:.04em .045em 0 #0d0b10;display:flex;align-items:center;gap:.3em}
.f3-lb .f3-hd .f3-pm{width:.5em;height:.56em;background:#ffd25e;clip-path:polygon(0 0,100% 50%,0 100%)}
.f3-lb .f3-mon{cursor:default}
.f3-lb .f3-tr{bottom:10px;left:10px;right:12px}
.f3-snd{flex:none;width:20px;height:16px;position:relative}
.f3-snd svg{width:100%;height:100%;filter:drop-shadow(0 0 4px rgba(255,190,60,.6))}
.f3-lb .f3-hint{font:700 12px/1.2 'Barlow Condensed',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(248,240,217,.6);display:flex;align-items:center;gap:8px}
.f3-land{position:fixed;inset:0;z-index:2147483000;background:#000}
.f3-land img{position:absolute;left:50%;top:0;height:100%;transform:translateX(-50%)}
.f3-land .f3-tr{left:24px;right:24px;bottom:18px}
.f3-land .f3-x{position:absolute;left:14px;top:12px;width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,.5);color:#fff;font:400 22px/40px Anton,sans-serif;text-align:center}
`;
const pm=()=>`<span class="f3-pm"></span>`;
function head(){/* clone frame 1's sub-head so it is the same object, change the number to a play mark and the word */
 const h=D.querySelector('.t4-fr .t5-sh');if(!h)return '';const c=h.cloneNode(true);const b=c.querySelector('.t5-n b');if(b)b.innerHTML=pm();
 const w=c.querySelector('.t5-w');if(w)w.innerHTML='The whole game'+(W.__F3RUN?` <span class="f3-run f3-time">${DUR}</span>`:'');c.classList.add('f3-sh');c.setAttribute('aria-hidden','true');return c.outerHTML}
const glass=(inner)=>`<div class="f3-gl"><img class="f3-po" src="${MED}ez-landing-v4-poster-ez.jpg" alt="" draggable="false"><video playsinline preload="none" poster="${MED}ez-landing-v4-poster-ez.jpg"><source src="${MED}ez-landing-v4.mp4" type="video/mp4"></video><i class="f3-sc"></i>${inner}</div>`;
const dur=()=>`<span class="f3-osd f3-dur f3-time">${DUR}</span>`;
const disc=()=>`<span class="f3-disc"><i></i></span>`;
const tr=(t,playing)=>`<span class="f3-tr"><span class="pl${playing?' ps':''}"></span><span class="tk"><b style="width:${(t/SEC*100).toFixed(1)}%"></b></span>${playing?`<span class="f3-osd">${fmt(t)} / <span class="f3-time">${DUR}</span></span><span class="f3-snd"><svg viewBox="0 0 20 16"><path d="M1 5h4l5-4v14l-5-4H1z" fill="#ffd25e"/><path d="M13 4.5c1.6 1 1.6 6 0 7M15.5 2c3 2.2 3 9.8 0 12" fill="none" stroke="#ffd25e" stroke-width="1.6" stroke-linecap="round"/></svg></span>`:`<span class="f3-osd f3-time">${DUR}</span>`}</span>`;
const fmt=s=>Math.floor(s/60)+':'+String(Math.round(s%60)).padStart(2,'0');
function inner(take,state){/* what is lit on the glass */
 if(state)return `<i class="f3-fade"></i>`+tr(state.t,true);
 if(take==='B')return `<i class="f3-fade"></i>`+tr(0,false);
 if(take==='E')return '';
 return `<i class="f3-fade"></i>`+disc()+dur()}
/* lay out one monitor at width w (CSS px) */
function mon(take,w,state){const k=TK[take],p=P[k];const el=D.createElement('div');el.className='f3-mon f3-'+take;el.tabIndex=state?-1:0;el.setAttribute('role','button');
 el.setAttribute('aria-label',`Play the whole game, a film of ${SEC>=60?Math.floor(SEC/60)+' minute'+(SEC%60?' '+SEC%60+' seconds':''):SEC+' seconds'}, with sound`);
 if(take==='E'){const s=w/p.cw,h=p.ch*s;el.style.cssText=`width:${w}px;height:${h.toFixed(1)}px;border:0;background:url(${M}f3-fr.jpg) 0 0/100% 100%`;
  const g=p.glass;el.innerHTML=glass(inner(take,state));const gl=el.firstChild;gl.style.cssText=`left:${g[0]*s}px;top:${g[1]*s}px;width:${(g[2]-g[0])*s}px;height:${(g[3]-g[1])*s}px`;
  const L=p.led,lw=(L[2]-L[0])*s;el.insertAdjacentHTML('beforeend',`<span class="f3-led" style="left:${L[0]*s}px;top:${L[1]*s}px;width:${lw}px;height:${(L[3]-L[1])*s}px;--lf:${(lw*.36).toFixed(1)}px"><span class="f3-osd f3-time">${DUR}</span></span>`);
  const K=p.key;el.insertAdjacentHTML('beforeend',`<span class="f3-key" style="left:${(K[0]-K[2])*s}px;top:${(K[1]-K[2])*s}px;width:${2*K[2]*s}px;height:${2*K[2]*s}px"></span>`);
  return el}
 const s=w/p.cw,[L,T,R,B]=p.s,gw=w-(L+R)*s,gh=gw/p.ar,h=gh+(T+B)*s;
 el.style.cssText=`width:${w}px;height:${h.toFixed(2)}px;border-width:${(T*s).toFixed(2)}px ${(R*s).toFixed(2)}px ${(B*s).toFixed(2)}px ${(L*s).toFixed(2)}px;border-image:url(${M}f3-${k}.jpg) ${T} ${R} ${B} ${L} / ${(T*s).toFixed(2)}px ${(R*s).toFixed(2)}px ${(B*s).toFixed(2)}px ${(L*s).toFixed(2)}px stretch`;
 el.innerHTML=glass(inner(take,state));const gl=el.firstChild;gl.style.cssText='inset:0';
 if(state&&state.img)gl.querySelector('img.f3-po').src=state.img;
 if(p.led&&take==='A'&&!state){/* the lip's LED window: lit "ready" (a play mark), the time is on the glass */
  const e=p.led,sx=e[0]*s-L*s,sy=h-(p.ch-e[1])*s-T*s;el.insertAdjacentHTML('beforeend',`<span class="f3-led" style="left:${sx.toFixed(1)}px;top:${sy.toFixed(1)}px;width:${((e[2]-e[0])*s).toFixed(1)}px;height:${((e[3]-e[1])*s).toFixed(1)}px"><span class="f3-osd" style="font-size:${((e[3]-e[1])*s*.78).toFixed(1)}px">${'▶'}</span></span>`)}
 return el}
/* the monitor's width: phones fill the column (16px under the frames' bleed), desktop a fixed reading size */
const mw=take=>{const vw=D.documentElement.clientWidth;if(vw<760)return vw-16;return take==='E'?620:take==='D'?720:600};
/* ---------- the gap rule (H26): D = k_L · u + 0.45 · ΔE76(ground above, ground below); u = clamp(26px, 8vw, 32px)
   k: 1 for a sub-section joint (How a round works → its film), 3.5 for a beat inside a chapter (the top → How a round works, today's), 5 for a chapter (the film → Meet the models).
   D is measured box to box: the last content box above (the frames, the monitor's pins) to the first content box below (a head). ---------- */
const U=()=>Math.min(32,Math.max(26,innerWidth*.08));const KL={sub:1,beat:3.5,chap:5};
let st={};
function build(take,opts={}){opts=opts||{};
 const sec=D.querySelector('section.t4'),b2=sec&&sec.querySelector('.t4-b2'),b3=sec&&sec.querySelector('.t4-b3');if(!b2||!b3)throw 'no top';
 const g2=b3.previousElementSibling;if(g2&&g2.classList.contains('t5-bg'))g2.style.display='none';b3.style.display='none';
 sec.querySelectorAll('.f3,.f3-j').forEach(x=>x.remove());D.querySelectorAll('.f3-cx,.f3-lb,.f3-land').forEach(x=>x.remove());
 const j=D.createElement('div');j.className='f3-j';j.setAttribute('aria-hidden','true');
 const f=D.createElement('div');f.className='f3 f3-t'+take;f.setAttribute('role','group');f.setAttribute('aria-label','The whole game, the film');
 f.innerHTML=head();const m=mon(take,mw(take));f.appendChild(m);
 b2.after(j);j.after(f);
 /* the film's block hugs its monitor: phones take the frames' bleed (16px) and inset the monitor 8px, desktop centres it */
 if(innerWidth<1000){f.style.margin='0 -16px';f.style.padding='0 8px'}else{f.style.width=m.style.width;f.style.margin='0 auto'}m.style.margin='0';
 const cx=D.createElement('div');cx.className='f3-cx';cx.setAttribute('aria-hidden','true');sec.appendChild(cx);
 sec.style.paddingBottom='0';sec.style.marginBottom='0';
 const ch=D.querySelector('section.ch');if(ch){ch.style.paddingTop='0'}
 m.addEventListener('click',()=>openLB(take));m.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLB(take)}});
 st={take,sec,j,f,m,cx,ch};gaps();
 if(opts.open==='phone'||opts.open==='theatre')openLB(take,true);if(opts.open==='land')openLand();
 const v=D.createElement('video');v.preload='metadata';v.src=MED+'ez-landing-v4.mp4';v.onloadedmetadata=()=>{const s=Math.round(v.duration);if(s>0){SEC=s;DUR=fmt(s);D.querySelectorAll('.f3-time').forEach(t=>t.textContent=DUR)}}}
function rect(e){const r=e.getBoundingClientRect();return {t:r.top+scrollY,b:r.bottom+scrollY,h:r.height}}
function gaps(){const {sec,j,f,m,cx,ch}=st,u=U();
 /* beat: the top → How a round works, set to the rule too (today it is 104px at 390 and 92px at 1280) */
 const g1=sec.querySelector('.t5-bg');if(g1){for(let i=0;i<2;i++){const A=rect(sec.querySelector('.t4-b1 .t4-bleed')).b,Bt=rect(sec.querySelector('.t4-b2 .t4-h2')).t;g1.style.marginBottom=(parseFloat(getComputedStyle(g1).marginBottom)+KL.beat*u-(Bt-A))+'px'}}
 /* sub: the frames' last box to the film's sub-head */
 const fl=sec.querySelector('.t4-frs');j.style.height='0px';j.style.margin='0';
 let a=rect(fl).b,sh=f.querySelector('.f3-sh')||m,b=rect(sh).t;const want=KL.sub*u;j.style.height=Math.max(0,want-(b-a))+'px';
 /* the joint's trace: from the middle of the frames' last row down into the monitor's top bezel */
 const jh=parseFloat(j.style.height),jw=j.clientWidth;j.dataset.x=`<svg viewBox="0 0 ${jw} ${jh}" aria-hidden="true"><path d="M${jw*.5} ${-6} L${jw*.5} ${jh+8}" stroke="#0d0b10" stroke-width="3.6"/><path d="M${jw*.5} ${-6} L${jw*.5} ${jh+8}" stroke="#d9a32a" stroke-width="1.6"/><circle cx="${jw*.5}" cy="${-6}" r="3.2" fill="#0d0b10"/><circle cx="${jw*.5}" cy="${-6}" r="2.2" fill="none" stroke="#ffd768" stroke-width="1.2"/></svg>`;
 /* chapter: the monitor's bottom to Meet the models' head, the connector centred in it with clear space either side */
 const hd=ch&&ch.querySelector('.ch-h');cx.style.height='0px';cx.style.marginTop=cx.style.marginBottom='0px';const sr=sec.getBoundingClientRect(),cs=getComputedStyle(sec);cx.style.marginLeft=(-parseFloat(cs.paddingLeft)-sr.left)+'px';cx.style.marginRight=(-parseFloat(cs.paddingRight)-(D.documentElement.clientWidth-sr.right))+'px';
 const want2=KL.chap*u+.45*(W.__F3DE||0);let a2=rect(m).b,b2=hd?rect(hd).t:a2;const cur=b2-a2,clear=Math.max(14,u*.6),ch2=want2-2*clear;
 cx.style.height=ch2+'px';cx.style.marginTop=clear+'px';cx.style.marginBottom=(clear-cur)+'px';
 /* re-measure and correct to the pixel */
 for(let i=0;i<2;i++){a=rect(fl).b;b=rect(sh).t;const e1=KL.sub*u-(b-a);j.style.height=Math.max(0,parseFloat(j.style.height)+e1)+'px';
  a2=rect(m).b;b2=hd?rect(hd).t:a2;const e2=want2-(b2-a2);cx.style.marginBottom=(parseFloat(cx.style.marginBottom)+e2)+'px'}
 {const y0=rect(fl).b-6,y1=rect(m).t+2,ft=rect(f).t,x=f.clientWidth/2;let t=f.querySelector('svg.f3-tc');if(!t){t=D.createElementNS('http://www.w3.org/2000/svg','svg');t.setAttribute('class','f3-tc');t.setAttribute('aria-hidden','true');f.prepend(t)}
  const hh=y1-y0;t.setAttribute('viewBox',`0 0 20 ${hh}`);t.style.cssText=`position:absolute;left:${x-10}px;top:${y0-ft}px;width:20px;height:${hh}px;overflow:visible;pointer-events:none;z-index:0`;
  t.innerHTML=`<path d="M10 0 V${hh}" stroke="#0d0b10" stroke-width="3.6"/><path d="M10 0 V${hh}" stroke="#d9a32a" stroke-width="1.6"/><circle cx="10" cy="0" r="3.2" fill="#0d0b10"/><circle cx="10" cy="0" r="2.2" fill="none" stroke="#ffd768" stroke-width="1.2"/>`}
 const beatA=rect(sec.querySelector('.t4-b1 .t4-bleed')).b,beatB=rect(sec.querySelector('.t4-b2 .t4-h2')).t;
 W.__f3m={u:+u.toFixed(2),beat:{want:+(KL.beat*u).toFixed(1),got:+(beatB-beatA).toFixed(1)},sub:{want:+(KL.sub*u).toFixed(1),got:+(rect(sh).t-rect(fl).b).toFixed(1)},
  chap:{want:+want2.toFixed(1),got:+((hd?rect(hd).t:0)-rect(m).b).toFixed(1)},monitor:{w:m.offsetWidth,h:+m.getBoundingClientRect().height.toFixed(1),glass:[m.querySelector('.f3-gl').offsetWidth,m.querySelector('.f3-gl').offsetHeight]},
  section:+(rect(m).b-rect(sh).t).toFixed(1),
  y:{beat:[beatA,beatB],sub:[rect(fl).b,rect(sh).t],chap:[rect(m).b,hd?rect(hd).t:0],top:rect(sec).t}}}
/* the beat gap (the top → How a round works) is today's and is only measured; a production drop-in sets it to 3.5u as well */
function openLB(take,still){D.querySelectorAll('.f3-lb').forEach(x=>x.remove());const lb=D.createElement('div');lb.className='f3-lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-label','The whole game');
 const vw=D.documentElement.clientWidth,vh=innerHeight,ph=vw<760;const tk='T';
 const p=P[TK[tk]],[L,T,R,B]=p.s;let w=ph?vw:Math.min(1180,vw-160);
 if(!ph){/* theatre: as wide as the window allows with the head and the hint above and below */const maxH=vh-150;const s=w/p.cw,h=(w-(L+R)*s)/p.ar+(T+B)*s;if(h>maxH){w=w*maxH/h}}
 lb.innerHTML=`<div class="f3-hd">${pm()}The whole game</div><button class="f3-x" aria-label="Close">✕</button>`;
 const m=mon(tk,w,{t:24.9,img:M+'f3-play-0249.jpg'});if(ph){m.style.borderWidth='0';m.style.borderImage='none';m.style.height=(w*9/16)+'px'}lb.appendChild(m);
 if(ph)lb.insertAdjacentHTML('beforeend',`<div class="f3-hint"><svg width="22" height="16" viewBox="0 0 22 16"><rect x="1" y="4" width="14" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M17 2a5 5 0 0 1 3 5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M20 7l-1.6-1.4M20 7l1.4-1.6" stroke="currentColor" stroke-width="1.5"/></svg>Turn your phone for full screen</div>`);
 else lb.insertAdjacentHTML('beforeend',`<div class="f3-hint">Esc or click outside to close</div>`);
 D.body.appendChild(lb);lb.querySelector('.f3-x').addEventListener('click',()=>lb.remove());lb.addEventListener('click',e=>{if(e.target===lb)lb.remove()})}
function openLand(){const l=D.createElement('div');l.className='f3-land';l.innerHTML=`<img src="${M}f3-play-0249.jpg" alt=""><span class="f3-x">✕</span>${tr(24.9,true)}`;D.body.appendChild(l)}
const s=D.createElement('style');s.textContent=css;D.head.appendChild(s);
W.__f3=(take,opts)=>{try{build(take,opts)}catch(e){W.__f3Err=String(e&&e.stack||e);console.error(e)}};
W.__f3gaps=()=>gaps();
})();
