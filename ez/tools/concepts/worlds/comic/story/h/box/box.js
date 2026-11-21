// box: the first screen as one continuous scene. box.html?s=ink|logo&o=a|b|c
// 1 the box office (marquee = cover lines, the golden ticket nudges in its slot; scroll scrubs the Hedra clip of taking it)
// 2 the loop, learned by doing: four objects, tap each and it opens onto one fact (real data, newest graded round)
// 3 the cinema: scroll scrubs the doors opening (Hedra clip), the explainer film plays on the painted screen
// Every word and number is page text from ez-data.js, set on a surface the painting left blank (positions in % of the painting).
(function(){
const Q=new URLSearchParams(location.search),ST=Q.get('s')||'ink',OPT=Q.get('o')||'a';
document.documentElement.classList.add('s-'+ST);
const I='img/',V='web/';
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const MO=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const md=s=>{const [m,d]=s.split('/');return MO[m-1]+' '+(+d)};
const $f=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
// ---- data: newest graded round, flat P&L ($100K per call), W-L, next bell
const R=ROUNDS,N=R.length,L=R[N-1],P={},W={},Lo={};
for(const r of R)for(const [m,c] of r.calls){if(!c)continue;const up=/UP/.test(c);P[m]=(P[m]||0)+100000*(up?1:-1)*r.a/100;if(up===(r.a>0))W[m]=(W[m]||0)+1;else Lo[m]=(Lo[m]||0)+1}
const lead=Object.keys(P).sort((a,b)=>P[b]-P[a])[0];
const calls=L.calls.filter(c=>c[1]).map(([m,c])=>({nm:NM[m]||m,up:/UP/.test(c),v:c.replace(/UP |DOWN /,'')}));
const right=calls.filter(c=>c.up===(L.a>0)).length;
const nx=(typeof UPCOMING!=='undefined'&&UPCOMING[0])||null;
const D={N,co:L.co,tk:L.ticker,locked:md(L.called),close:L.out.replace(/^[+-]/,''),up:L.a>0,win:NM[L.win]||L.win||'Nobody',right,n:calls.length,
  lead:NM[lead],pnl:$f(P[lead]),wl:`${W[lead]||0}-${Lo[lead]||0}`,next:nx?md(nx.resolves):'',share:Math.round(((typeof SIM!=='undefined'&&SIM.poolShare)||0)*100)};
const arw=up=>`<i class="${up?'u':'d'}">${up?'▲':'▼'}</i>`;
window.__box={D,ST,OPT};

// ---- scenes. it: x,y,w,hh (% of painting), r (deg), c (medium class), on (the painted surface), h (html), b:1 = shown only once opened
const S={
 cover:{
  ink:{p:{img:'cover-p-ink.jpg',ar:[9,16],items:[
    {x:15,y:10,w:71,hh:7.5,c:'bulb',on:'marquee track 1',h:`Season 1 · No. ${N}`},
    {x:15,y:18,w:71,hh:6.5,c:'bulb big',on:'marquee track 2',h:'4 AIs trade earnings'},
    {x:15,y:25,w:71,hh:6,c:'bulb big',on:'marquee track 3',h:'Who calls it best?'},
    {x:15,y:31.5,w:71,hh:6,c:'bulb sm',on:'marquee track 4',h:`${N} rounds graded · next bell ${D.next}`},
    {x:34,y:50,w:32,hh:9,c:'leaf',on:'the booth window glass',h:'Box office<small>take a ticket ▾</small>'}],
    cut:{x:43,y:70.6,w:14,h:5.2,clip:'polygon(6% 22%,94% 22%,100% 100%,0 100%)'}},
   l:{img:'cover-l-ink.jpg',ar:[16,9],items:[
    {x:26,y:6,w:48,hh:8,c:'bulb',on:'marquee track 1',h:`Season 1 · No. ${N}`},
    {x:26,y:14.5,w:48,hh:6.5,c:'bulb big',on:'marquee track 2',h:'4 AIs trade earnings'},
    {x:26,y:21.5,w:48,hh:6,c:'bulb big',on:'marquee track 3',h:'Who calls it best?'},
    {x:26,y:28,w:48,hh:5,c:'bulb sm',on:'marquee track 4',h:`${N} rounds graded · next bell ${D.next}`},
    {x:41,y:52,w:18,hh:9,c:'engr',on:'the booth window glass (lit gold)',h:'Box office<small>take a ticket ▾</small>'}],
    cut:{x:45.5,y:73.5,w:9,h:7,clip:'polygon(6% 10%,94% 10%,100% 100%,0 100%)'}}},
  logo:{p:{img:'cover-p-logo.jpg',ar:[9,16],items:[
    {x:15,y:10.5,w:70,hh:6,r:-3,c:'kan',on:'marquee track 1',h:`Season 1 · No. ${N}`},
    {x:15,y:18.6,w:70,hh:5.6,r:-2.5,c:'kan big',on:'marquee track 2',h:'4 AIs trade earnings'},
    {x:16,y:25.6,w:68,hh:5,r:-2,c:'kan big g',on:'marquee track 3',h:'Who calls it best?'},
    {x:17,y:31.8,w:66,hh:4.6,r:-1.5,c:'kan sm',on:'marquee track 4',h:`${N} rounds graded · next bell ${D.next}`},
    {x:31,y:73.8,w:39,hh:5.2,c:'kan sm',on:'the booth\'s lower plate',h:'Box office · take a ticket ▾'}],
    cut:{x:41,y:66.5,w:23,h:8,clip:'polygon(0 18%,100% 18%,100% 100%,0 100%)'}},
   l:{img:'cover-l-logo.jpg',ar:[16,9],items:[
    {x:26,y:15.5,w:47,hh:6.5,c:'kan',on:'marquee track 1',h:`Season 1 · No. ${N}`},
    {x:26.5,y:22.3,w:46,hh:6,c:'kan big',on:'marquee track 2',h:'4 AIs trade earnings'},
    {x:27,y:29,w:45,hh:5.6,c:'kan big g',on:'marquee track 3',h:'Who calls it best?'},
    {x:28,y:35,w:43,hh:5,c:'kan sm',on:'marquee track 4',h:`${N} rounds graded · next bell ${D.next}`},
    {x:40,y:56,w:21,hh:8,c:'kan sm',on:'the booth window',h:'Box office<br>take a ticket ▾'}],
    cut:{x:43.5,y:78.5,w:14,h:9,clip:'polygon(0 15%,100% 15%,100% 100%,0 100%)'}}}},
 // the loop: a (first state) -> b (second state); vid = the Hedra clip between them
 letter:{cap:'They predict the move before earnings',
  ink:{a:'letter-ink.jpg',b:'letter-ink-2.jpg',vid:'v-letter-ink-vidu.mp4',hot:{x:43,y:49,w:14,h:14,clip:'circle(48%)',k:'wig'},items:[
    {x:28,y:63.5,w:44,hh:5,c:'paint sm',on:'the envelope face',h:`${D.co} (${D.tk}) · sealed ${D.locked}`},
    ...calls.map((c,i)=>({x:31,y:24.2+i*5.4,w:46,hh:5,c:'paint',b:1,on:`the card's ruled row ${i+1}`,h:`${c.nm} ${arw(c.up)} ${c.v}`}))]},
  logo:{a:'letter-logo.jpg',b:'letter-logo-2.jpg',vid:'v-letter-logo-vidu.mp4',hot:{x:43,y:51,w:14,h:14,clip:'circle(48%)',k:'wig'},items:[
    {x:28,y:65.5,w:44,hh:5,c:'kan sm',on:'the envelope face',h:`${D.co} (${D.tk}) · sealed ${D.locked}`},
    ...calls.map((c,i)=>({x:28,y:21.5+i*5.6,w:46,hh:5,r:-3,c:'kan',b:1,on:`the card's ruled row ${i+1}`,h:`${c.nm} ${arw(c.up)} ${c.v}`}))]}},
 bell:{cap:'The market close grades every prediction',
  ink:{a:'bell-ink.jpg',b:'bell-ink-2.jpg',vid:'v-bell-ink-vidu.mp4',hot:{x:30,y:4,w:42,h:46,clip:'ellipse(48% 50%)',k:'sway'},items:[
    {x:13,y:66,w:74,hh:13,c:'chalk big',b:1,on:'the slate board under the bell',h:`${D.tk} closed ${arw(D.up)} ${D.close}`},
    {x:13,y:79,w:74,hh:9,c:'chalk',b:1,on:'the slate board under the bell',h:`${D.right} of ${D.n} right · ${D.win} closest`}]},
  logo:{a:'bell-logo.jpg',b:'bell-logo-2.jpg',vid:'v-bell-logo-vidu.mp4',hot:{x:28,y:8,w:44,h:48,clip:'ellipse(48% 50%)',k:'sway'},items:[
    {x:16,y:66.5,w:70,hh:11,c:'kan big',b:1,on:'the board under the bell',h:`${D.tk} closed ${arw(D.up)} ${D.close}`},
    {x:15,y:77.5,w:70,hh:8,c:'kan sm',b:1,on:'the board under the bell',h:`${D.right} of ${D.n} right · ${D.win} closest`}]}},
 ticket:{cap:'#1 on the leaderboard holds the golden ticket',
  ink:{a:'ticket-ink.jpg',b:'ticket-ink-2.jpg',vid:'v-ticket-ink-vidu.mp4',hot:{x:0,y:12,w:100,h:72,clip:'none',k:'tilt'},items:[
    {x:15,y:40.5,w:56,hh:15,r:-6,c:'foil big',b:1,on:'the gold name plate on the back',h:D.lead},
    {x:16,y:59,w:26,hh:11,r:-6,c:'paint',b:1,on:'the back\'s left panel',h:`P&L<b>${D.pnl}</b>`},
    {x:46,y:56.5,w:26,hh:11,r:-6,c:'paint',b:1,on:'the back\'s right panel',h:`W-L<b>${D.wl}</b>`},
    {x:80,y:26,w:14,hh:40,r:-6,c:'foil vert',b:1,on:'the stub',h:'#1'}]},
  logo:{a:'ticket-logo.jpg',b:'ticket-logo-2.jpg',vid:'v-ticket-logo-vidu.mp4',hot:{x:0,y:14,w:100,h:72,clip:'none',k:'tilt'},items:[
    {x:14,y:42,w:56,hh:16,r:-8,c:'kan big g',b:1,on:'the name plate on the back',h:D.lead},
    {x:15,y:63,w:27,hh:10,r:-8,c:'kan sm',b:1,on:'the back\'s left panel',h:`P&L<b>${D.pnl}</b>`},
    {x:47,y:59,w:23,hh:10,r:-8,c:'kan sm',b:1,on:'the back\'s right panel',h:`W-L<b>${D.wl}</b>`},
    {x:82,y:27,w:14,hh:34,r:-8,c:'kan big g vert',b:1,on:'the stub',h:'#1'}]}},
 // step 4, three objects (the owner asked for options): a the vault, b the betting slip, c coming attractions
 vault:{cap:'We follow its call on every bet',
  ink:{a:'vault-ink.jpg',b:'vault-ink-2.jpg',vid:'v-vault-ink-vidu.mp4',hot:{x:37,y:37,w:30,h:30,clip:'circle(48%)',k:'turn'},items:[
    {x:33.5,y:21.5,w:17,hh:9,c:'engr',b:1,on:'the brass plate on the vault door',h:'Bet #1<b>NVIDIA</b>'}]},
  logo:{a:'vault-logo.jpg',b:'vault-logo-2.jpg',hot:{x:35,y:38,w:34,h:34,clip:'circle(48%)',k:'turn'},items:[
    {x:37.5,y:20.5,w:20,hh:11,r:-2,c:'kan g',b:1,on:'the plate on the vault door',h:'Bet #1<b>NVIDIA</b>'}]}},
 slip:{cap:'We follow its call on every bet',
  ink:{a:'slip-ink.jpg',b:'slip-ink-2.jpg',hot:{x:66,y:60,w:15,h:16,clip:'none',k:'bob'},items:[
    {x:42,y:57.5,w:16,hh:4.5,c:'paint sm',b:1,on:'the slip, top line',h:'Bet #1 · NVIDIA'},
    {x:44,y:62.5,w:10,hh:9,c:'stamp',b:1,on:'the red stamp ring on the slip',h:`#1's<br>call`}]},
  logo:{a:'slip-logo.jpg',b:'slip-logo-2.jpg',hot:{x:62,y:58,w:14,h:18,clip:'none',k:'bob'},items:[
    {x:21,y:6.5,w:56,hh:11,r:-3,c:'kan big',b:1,on:'the blank sign over the grille',h:'Bet #1: NVIDIA'},
    {x:31,y:64,w:13,hh:8,r:-3,c:'stamp',b:1,on:'the red stamp ring on the slip',h:`#1's<br>call`}]}},
 board:{cap:'We follow its call on every bet',
  ink:{a:'billboard-ink.jpg',b:'billboard-ink-2.jpg',hot:{x:18,y:27,w:24,h:48,clip:'none',k:'flick'},items:[
    {x:20,y:38,w:20,hh:24,c:'bulb',b:1,on:'poster frame 1 (lit)',h:'Bet #1<b>NVIDIA</b><small>now showing</small>'},
    {x:47,y:42,w:12,hh:20,c:'dim',b:1,on:'poster frame 2 (dark)',h:'Bet #2<small>Season 2</small>'},
    {x:67.5,y:44,w:12,hh:18,c:'dim',b:1,on:'poster frame 3 (dark)',h:'Bet #3'}]},
  logo:{a:'billboard-logo.jpg',b:'billboard-logo-2.jpg',hot:{x:10,y:54,w:23,h:37,clip:'none',k:'flick'},items:[
    {x:21,y:27,w:60,hh:10,c:'kan',b:1,on:'the marquee over the frames',h:'Coming attractions'},
    {x:11.5,y:60,w:20,hh:24,c:'kan ink',b:1,on:'poster frame 1 (lit gold)',h:'Bet #1<b>NVIDIA</b>'},
    {x:40.5,y:60,w:18,hh:22,c:'kan dim',b:1,on:'poster frame 2 (dark)',h:'Bet #2<small>Season 2</small>'},
    {x:67.5,y:60,w:18,hh:22,c:'kan dim',b:1,on:'poster frame 3 (dark)',h:'Bet #3'}]}},
 cinema:{
  ink:{a:'cinema-ink.jpg',b:'cinema-ink-2.jpg',vid:'v-cinema-ink-vidu.mp4',screen:{x:41.2,y:29.5,w:22.6,h:20.5},items:[
    {x:36,y:9.5,w:28,hh:5.5,c:'bulb',b:1,on:'the blank sign over the doorway',h:'Now playing · How it works · 1:20'},
    {x:74.4,y:34,w:9.6,hh:24,c:'bulb vtx sm',b:1,on:'the right poster frame',h:'Next:<b>Meet the four models</b>▾'}]},
  logo:{a:'cinema-logo.jpg',b:'cinema-logo-2.jpg',vid:'v-cinema-logo-vidu.mp4',screen:{x:39.6,y:37.3,w:20.4,h:17.5},items:[
    {x:34,y:4.5,w:32,hh:6.5,c:'kan',b:1,on:'the blank sign over the doorway',h:'Now playing · How it works · 1:20'},
    {x:77.5,y:29,w:13,hh:24,c:'kan vtx sm',b:1,on:'the right poster frame',h:'Next:<b>Meet the four models</b>▾'}]}}
};
const STEP4={a:'vault',b:'slip',c:'board'};
const COVERV={ink:'v-cover-ink-kling.mp4',logo:'v-cover-logo-kling.mp4'};
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
function items(pl,list,img){for(const it of list){const e=el('div','it '+(it.c||'')+(it.b?' b':''),'<div class="in">'+it.h+'</div>');
  Object.assign(e.style,{left:it.x+'%',top:it.y+'%',width:it.w+'%',height:it.hh+'%'});if(it.r)e.style.transform=`rotate(${it.r}deg)`;e.dataset.on=it.on;pl.appendChild(e)}}
function cut(pl,c,img){const e=el('div','cut '+(c.k||'nudge'));Object.assign(e.style,{left:c.x+'%',top:c.y+'%',width:c.w+'%',height:c.h+'%',backgroundImage:`url(${img})`,
  backgroundSize:`${10000/c.w}% ${10000/c.h}%`,backgroundPosition:`${c.x/(100-c.w)*100}% ${c.y/(100-c.h)*100}%`,clipPath:c.clip||'none'});pl.appendChild(e);return e}
// fit every text to its surface: start large, shrink until it fits
function fitText(root){for(const e of root.querySelectorAll('.it')){const w=e.clientWidth,h=e.clientHeight;if(!w)continue;let fs=Math.min(h*.8,w*.25);e.style.fontSize=fs+'px';let n=0;
  while((e.scrollWidth>w+1||e.scrollHeight>h+1)&&fs>5&&n<80){fs*=.94;e.style.fontSize=fs+'px';n++}}}
const m=document.getElementById('m');const mode=()=>innerWidth<700?'p':'l';

// ---- 1 the box office
const cs=el('section','cover');cs.innerHTML='<div class="pin"><div class="sc"></div><video class="tv" muted playsinline preload="auto"></video></div>';m.appendChild(cs);
const tv=cs.querySelector('.tv');tv.src=V+COVERV[ST];
function buildCover(){const md_=mode(),sp=S.cover[ST][md_],sc=cs.querySelector('.sc');sc.innerHTML='';sc.style.setProperty('--bg',`url(${I+sp.img})`);
  const pl=el('div','plate');pl.dataset.ar=sp.ar.join(':');pl.appendChild(Object.assign(el('img','pi'),{src:I+sp.img,alt:''}));items(pl,sp.items);
  const c=cut(pl,sp.cut,I+sp.img);c.classList.add('hot');c.title='Take a ticket';c.onclick=()=>scrollTo({top:cs.offsetTop+(cs.offsetHeight-innerHeight)*.97,behavior:'smooth'});
  sc.appendChild(pl);const W=sc.clientWidth,H=sc.clientHeight,[aw,ah]=sp.ar;let k=md_==='p'?W/aw:Math.max(W/aw,H/ah);const pw=aw*k,ph=ah*k;
  Object.assign(pl.style,{width:pw+'px',height:ph+'px',left:(W-pw)/2+'px',top:Math.min(0,(H-ph)/2)+'px'});fitText(pl)}
function onCover(){const r=cs.getBoundingClientRect(),run=cs.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.top/run));
  const a=Math.min(1,Math.max(0,(p-.04)/.86));cs.style.setProperty('--a',a.toFixed(3));cs.classList.toggle('taken',p>.04);
  if(tv.duration&&!isNaN(tv.duration)){const t=a*(tv.duration-.05);if(Math.abs(tv.currentTime-t)>.02)tv.currentTime=t}}

// ---- 2 the loop
const ls=el('section','loop');ls.innerHTML='<div class="steps"></div>';m.appendChild(ls);
const steps=ls.querySelector('.steps');
['letter','bell','ticket',STEP4[OPT]].forEach((k,i)=>{const sp=S[k][ST];const f=el('figure','obj o-'+k);
  f.innerHTML=`<figcaption><b>${i+1}</b>${S[k].cap}</figcaption>`;const pl=el('div','plate sq');
  pl.appendChild(Object.assign(el('img','pi pa'),{src:I+sp.a,alt:''}));pl.appendChild(Object.assign(el('img','pi pb'),{src:I+sp.b,alt:''}));
  let v=null;if(sp.vid){v=el('video','pi pv');Object.assign(v,{muted:true,playsInline:true,preload:'auto',src:V+sp.vid});pl.appendChild(v)}
  const h=cut(pl,sp.hot,I+sp.a);h.classList.add('hot');items(pl,sp.items);f.appendChild(pl);steps.appendChild(f);
  const go=()=>{if(f.classList.contains('open')||f.classList.contains('going'))return;f.classList.add('going');
    const done=()=>{f.classList.remove('going');f.classList.add('open')};
    if(v&&!matchMedia('(prefers-reduced-motion: reduce)').matches){f.classList.add('play');v.currentTime=0;v.play().then(()=>{},()=>done());v.onended=done}else setTimeout(done,450)};
  pl.addEventListener('click',go);pl.tabIndex=0;pl.setAttribute('role','button');pl.setAttribute('aria-label',S[k].cap+': tap to open');
  pl.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});f.__go=go});
window.__boxOpen=i=>steps.children[i].__go();

// ---- 3 the cinema
const ci=el('section','cinema');ci.innerHTML='<div class="pin"><div class="sc"></div></div>';m.appendChild(ci);
function buildCinema(){const sp=S.cinema[ST],sc=ci.querySelector('.sc');sc.innerHTML='';sc.style.setProperty('--bg',`url(${I+sp.b})`);const pl=el('div','plate');
  pl.appendChild(Object.assign(el('img','pi pa'),{src:I+sp.a,alt:''}));pl.appendChild(Object.assign(el('img','pi pb'),{src:I+sp.b,alt:''}));
  const v=el('video','pi pv');Object.assign(v,{muted:true,playsInline:true,preload:'auto',src:V+sp.vid});pl.appendChild(v);
  const s=sp.screen,fm=el('video','film');Object.assign(fm,{controls:true,playsInline:true,preload:'none',poster:'/media/ez-landing-v4-poster-ez.jpg'});
  fm.innerHTML='<source src="/media/ez-landing-v4.mp4" type="video/mp4">';Object.assign(fm.style,{left:s.x+'%',top:s.y+'%',width:s.w+'%',height:s.h+'%'});pl.appendChild(fm);
  items(pl,sp.items);sc.appendChild(pl);
  const W=sc.clientWidth,H=sc.clientHeight,k=(mode()==='p'?W*1.7/16:Math.max(W/16,H/9));const pw=16*k,ph=9*k,fx=(s.x+s.w/2)/100;
  let x=W/2-pw*fx;x=Math.min(0,Math.max(W-pw,x));Object.assign(pl.style,{width:pw+'px',height:ph+'px',left:x+'px',top:(H-ph)/2+'px'});fitText(pl);ci.__v=v}
function onCinema(){const r=ci.getBoundingClientRect(),run=ci.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.top/run));const v=ci.__v;
  const a=Math.min(1,Math.max(0,(p-.08)/.7));ci.classList.toggle('opening',a>0&&a<1);ci.classList.toggle('open',a>=1);
  if(v&&v.duration){const t=a*(v.duration-.05);if(Math.abs(v.currentTime-t)>.02)v.currentTime=t}}
const nxt=el('section','next','<p class="cap">And now…</p><h2 class="hb-h">Meet the models</h2>');m.appendChild(nxt);

let lastW=0;function layout(){if(innerWidth===lastW&&arguments[0]!=='f')return;lastW=innerWidth;buildCover();buildCinema();fitText(steps);onCover();onCinema()}
addEventListener('resize',layout);addEventListener('scroll',()=>{onCover();onCinema()},{passive:true});
document.fonts.ready.then(()=>layout('f'));layout('f');
})();
