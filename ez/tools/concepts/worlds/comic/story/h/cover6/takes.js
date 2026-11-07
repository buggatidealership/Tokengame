// cover6 takes. Every item sits on a surface painted blank for it: x,y,w,h2 in % of the painting, fs = start size as a share of the painting's width.
// "on" names the object it lives on (listed in the report). "cut" items are pieces of the painting itself that move (the interactive object's own motion).
const I='img/';
const mast=(x,y,w,h,c,on)=>({x,y,w,h2:h,c:'mast '+(c||'gold'),fs:.075,on:on||'the masthead plate',h:'<b class="e">E</b>arnings <b class="z">Z</b>eason'});
const corner=(x,y,w,h,c)=>({x,y,w,h2:h,c:'corner '+(c||'gold'),fs:.03,on:'the corner box',h:D=>`<i>Season 1</i><b>No.&nbsp;${D.N}</b>`});
const callsLine=D=>D.calls.map(c=>`<span class="${c.up?'u':'d'}">${c.nm}&nbsp;${c.up?'▲':'▼'}${c.v}</span>`).join(' ');
const step=(n,t)=>`<em>${n}</em> ${t}`;
const S1='They predict the move before earnings',S2='The market close grades every prediction',S3='#1 on the leaderboard holds the golden ticket',S4='We follow its call on every bet';
const film=(x,y,w,h,on)=>({x,y,w,h2:h,c:'film',on,h:'<video muted playsinline preload="metadata" poster="/media/ez-landing-v4-poster-ez.jpg" src="/media/ez-landing-v4.mp4"></video><i class="play" aria-hidden="true"></i>'});
// a moving piece cut from the painting: clip in its own %
const cut=(x,y,w,h,anim,clip,on,o)=>Object.assign({x,y,w,h2:h,c:'cut hot '+anim,on,cut:1,clip},o||{});
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,cl=(v,a,b)=>Math.min(1,Math.max(0,(v-a)/(b-a)));

const TAKES={
// A · The closing bell: an empty exchange hall; the bell is the thing to touch; its strike opens the hall's doors (a gatefold cover)
a:{name:'The closing bell',run:170,
 cover:{img:{p:I+'a-p.jpg',l:I+'a-l.jpg'},ar:{p:'9:16',l:'16:9'},f:{p:[.5,.45],l:[.5,.5]},items:{
  p:[mast(17,1.6,80,7),corner(2,1.5,11,7),
   cut(33,38.5,34,18,'sway','polygon(30% 0,70% 0,72% 30%,100% 82%,96% 100%,4% 100%,0 82%,28% 30%)','the bell'),
   {x:41.5,y:35,w:16,h2:2.2,c:'engr',fs:.024,on:'the brass plaque on the bell bracket',h:'The closing bell'},
   {x:24,y:67.5,w:51,h2:7.5,c:'gold title',fs:.09,on:'the black lacquer board on the rostrum',h:'4 AIs trade earnings'},
   {x:24,y:74.6,w:51,h2:3,c:'gold sub',fs:.055,on:'the rostrum board, second line',h:'Who calls it best?'},
   {x:30,y:77.2,w:39,h2:1.4,c:'gold cue',fs:.025,on:'the rostrum board, foot',h:'Ring the bell to open ▾'}],
  l:[mast(12,3,85,13),corner(1.6,3,6.8,14),
   cut(44.5,46,11,20,'sway','polygon(30% 0,70% 0,72% 30%,100% 82%,96% 100%,4% 100%,0 82%,28% 30%)','the bell'),
   {x:47.3,y:41.5,w:5.4,h2:2.6,c:'engr',fs:.008,on:'the brass plaque on the bell bracket',h:'The closing bell'},
   {x:38.5,y:73.5,w:24,h2:5.6,c:'gold title',fs:.035,on:'the black lacquer board on the rostrum',h:'4 AIs trade earnings'},
   {x:38.5,y:79.2,w:24,h2:3.3,c:'gold sub',fs:.02,on:'the rostrum board, second line',h:'Who calls it best?'},
   {x:41,y:82.6,w:19,h2:2,c:'gold cue',fs:.01,on:'the rostrum board, foot',h:'Ring the bell to open ▾'}]}},
 inside:{img:{p:I+'ai-p.jpg',l:I+'ai-l.jpg'},ar:{p:'9:16',l:'16:9'},f:{p:[.5,.42],l:[.5,.5]},items:{
  p:[film(18.4,5.8,63,20.8,'the cinema screen on the hall\'s back wall'),
   {x:30,y:27,w:40,h2:1.6,c:'engr dim',fs:.022,on:'the screen\'s gold frame',h:'How it works · 1:20'},
   ...[[5.2,S1],[28.7,S2],[52.7,S3],[77.2,S4]].map(([x,t],i)=>({x,y:38.2,w:17.2,h2:5.6,c:'led',fs:.03,on:`trading post ${i+1}'s display`,h:step(i+1,t)})),
   {x:5,y:57,w:18,h2:9,c:'engr post',fs:.03,on:'trading post 1\'s front panel',h:D=>`${D.tk} locked ${D.locked}<br>`+callsLine(D)},
   {x:28.6,y:57,w:17.6,h2:9,c:'engr post',fs:.03,on:'trading post 2\'s front panel',h:D=>`${D.tk} closed<br><big class="${D.closeUp?'u':'d'}">${D.close}</big><br>${D.winNm} closest`},
   {x:52.6,y:58.5,w:17.8,h2:7.5,c:'engr post',fs:.03,on:'trading post 3\'s front panel, under the dome',h:D=>`Golden ticket<br><big>${D.leadNm}</big><br>${D.leadPnl}`},
   {x:77,y:57,w:18,h2:9,c:'engr post',fs:.03,on:'trading post 4\'s front panel, before the vault',h:'Bet #1<br><big>NVIDIA</big>'},
   {x:25,y:84.2,w:50,h2:2.2,c:'inlay',fs:.03,on:'the brass inlay in the floor',h:'Meet the four models ▾'}],
  l:[film(31.6,5.3,36.8,34,'the cinema screen on the hall\'s back wall'),
   ...[[12.2,S1],[32.6,S2],[53.2,S3],[73.6,S4]].map(([x,t],i)=>({x,y:43,w:13.2,h2:6.5,c:'led',fs:.013,on:`trading post ${i+1}'s display`,h:step(i+1,t)})),
   {x:12.2,y:49.6,w:13.2,h2:7.4,c:'led small',fs:.01,on:'trading post 1\'s display',h:D=>`${D.tk} · `+callsLine(D)},
   {x:32.6,y:49.6,w:13.2,h2:7.4,c:'led small',fs:.012,on:'trading post 2\'s display',h:D=>`${D.tk} closed <b class="${D.closeUp?'u':'d'}">${D.close}</b> · ${D.winNm} closest`},
   {x:53.2,y:49.6,w:13.2,h2:7.4,c:'led small',fs:.012,on:'trading post 3\'s display',h:D=>`Golden ticket: <b>${D.leadNm}</b> ${D.leadPnl}`},
   {x:73.6,y:49.6,w:13.2,h2:7.4,c:'led small',fs:.014,on:'trading post 4\'s display, before the vault',h:'Bet #1: <b>NVIDIA</b>'},
   {x:40,y:90,w:20,h2:3,c:'inlay',fs:.012,on:'the brass inlay in the floor',h:'Meet the four models ▾'}]}},
 after(cv){const pl=cv.querySelector('.plate');pl.style.visibility='hidden'},
 layout(cv){cv.querySelectorAll('.half').forEach(e=>e.remove());const pl=cv.querySelector('.plate');
  for(const s of ['l','r']){const h=document.createElement('div');h.className='half '+s;const c=pl.cloneNode(true);c.style.visibility='';h.appendChild(c);cv.appendChild(h)}},
 open(p,cv,ins){const a=ease(cl(p,.12,.78));cv.querySelectorAll('.half').forEach(h=>h.style.transform=`rotateY(${(h.classList.contains('l')?-1:1)*a*104}deg)`);
  cv.classList.toggle('ring',p>.01&&p<.2);ins.style.transform=`scale(${1.12-.12*a})`;ins.style.filter=`brightness(${.45+.55*a})`;cv.style.pointerEvents=a>.5?'none':''}},

// B · The tape: a ticker under a glass dome; the tape carries the cover lines and runs on down the page into the first spread
b:{name:'The tape',run:150,
 cover:{img:{p:I+'b-p2.jpg',l:I+'b-l2.jpg'},ar:{p:'9:16',l:'16:9'},f:{p:[.5,.5],l:[.5,.5]},items:{
  p:[mast(18.5,2,78,9),corner(2.2,1.6,12,9.4),
   cut(9,13.5,50,40,'glint','ellipse(48% 50% at 50% 50%)','the glass dome'),
   {x:21,y:58.4,w:19,h2:5.4,c:'engr',fs:.034,on:'the brass plate on the ticker\'s base',h:D=>`Season 1<br>Tape No. ${D.N}`},
   {x:0,y:0,w:100,h2:100,c:'tape',fs:.04,on:'the paper tape',svg:'p'}],
  l:[mast(11.6,3,86.5,12),corner(1.4,3,8,12),
   cut(22,16,33,38,'glint','ellipse(48% 50% at 50% 50%)','the glass dome'),
   {x:35.8,y:55.4,w:8.6,h2:5.8,c:'engr',fs:.011,on:'the brass plate on the ticker\'s base',h:D=>`Season 1<br>Tape No. ${D.N}`},
   {x:0,y:0,w:100,h2:100,c:'tape',fs:.018,on:'the paper tape',svg:'l'}]}},
 inside:{img:{p:I+'bi-p.jpg',l:I+'bi-l.jpg'},ar:{p:'9:16',l:'16:9'},f:{p:[.45,.5],l:[.5,.5]},items:{
  p:[{x:19,y:11,w:28,h2:76,c:'tapecol',fs:.05,on:'the hanging tape (one line per step, printed down it)',h:D=>
     `<p>${step(1,S1)}</p><p class="q">${D.tk} · ${callsLine(D)}</p><p>${step(2,S2)}</p><p class="q">${D.tk} <b class="${D.closeUp?'u':'d'}">${D.close}</b> · ${D.winNm} closest</p><p>${step(3,S3)}</p><p class="q">${D.leadNm} ${D.leadPnl}</p><p>${step(4,S4)}</p><p class="q big">Bet #1: NVIDIA</p>`},
   film(57,57.5,30,21.5,'the walnut television\'s screen'),
   {x:56,y:82.5,w:24,h2:2,c:'engr dim',fs:.026,on:'the television\'s dial panel',h:'How it works · 1:20'},
   {x:5,y:94,w:56,h2:3,c:'tapefoot',fs:.035,on:'the tape\'s torn end',h:'Meet the four models ▾'}],
  l:[{x:0,y:0,w:100,h2:100,c:'tape',fs:.0125,on:'the tape (one step per stretch)',svg:'li'},
   film(66.5,48,21,31,'the walnut television\'s screen'),
   {x:68,y:84.5,w:6,h2:2.5,c:'engr dim',fs:.008,on:'the television\'s dial panel',h:'How it works · 1:20'}]}},
 tape:{
  p:{d:'M255,560 C275,620 330,690 420,745 S600,840 590,920 S420,1040 330,1110 S220,1220 200,1290',lines:D=>[`4 AIs trade earnings · Who calls it best? · ${D.tk} ${D.close} · next bell ${D.next?D.next.date:''} · pull the tape ▾`]},
  l:{d:'M640,300 C690,360 720,400 760,470 S760,560 680,600 S570,660 600,720',lines:D=>[`4 AIs trade earnings · Who calls it best? · ${D.tk} ${D.close} · pull ▾`]},
  li:{d:'M480,-20 C470,150 480,300 560,450 S700,640 760,700',lines:D=>[`${S1} · ${D.tk}: ${D.calls.map(c=>c.nm+' '+(c.up?'▲':'▼')+c.v).join(' ')} · ${S2} · ${D.tk} ${D.close}, ${D.winNm} closest · ${S3} · ${D.leadNm} ${D.leadPnl} · ${S4} · Bet #1: NVIDIA`]}},
 after(cv,ins,m,D){for(const sc of [cv,ins])sc.querySelectorAll('.it.tape').forEach(e=>{const k=e.dataset.k||(sc===ins?'li':m);const t=TAKES.b.tape[sc===ins?'li':m];
   const [W,H]=m==='p'?[720,1280]:[1280,720];
   e.innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path id="tp-${sc.id}" d="${t.d}" fill="none"/><text><textPath href="#tp-${sc.id}" startOffset="2%">${t.lines(D)[0]}</textPath></text></svg>`})},
 layout(cv,ins,m){for(const sc of [cv,ins])sc.querySelectorAll('.it.tape text').forEach(t=>{const pl=sc.querySelector('.plate');const W=m==='p'?720:1280;t.setAttribute('font-size',(m==='p'?(sc===ins?17:30):(sc===ins?21:27)))})},
 open(p,cv,ins){const a=ease(cl(p,.08,.85));cv.style.transform=`translateY(${-a*100}%)`;ins.style.transform=`translateY(${(1-a)*100}%)`;cv.classList.toggle('lift',p>.02)}},

// C · The scoreboard: a hand-operated board in an empty ballpark shows the last game; the lit hatch is the way in
c:{name:'The scoreboard',run:160,
 cover:{img:{p:I+'c-p.jpg',l:I+'c-l.jpg'},ar:{p:'9:16',l:'16:9'},f:{p:[.5,.5],l:[.5,.5]},items:{
  p:[mast(19,2,78,8.5),corner(2.5,1.8,12.2,8.4),
   {x:12.2,y:31,w:76,h2:4.6,c:'paint title',fs:.07,on:'the header panel of the scoreboard',h:'4 AIs trade earnings'},
   {x:11.8,y:38.6,w:35.6,h2:4,c:'paint',fs:.04,on:'row 1 name slot',h:D=>`${D.co} (${D.tk})`},
   {x:52.4,y:38.6,w:7.3,h2:4,c:'paint',fs:.04,on:'row 1 first number slot',h:'R'},{x:61.4,y:38.6,w:7.6,h2:4,c:'paint',fs:.04,on:'row 1 second number slot',h:D=>D.N},
   {x:72.4,y:38.6,w:16.2,h2:4,c:'paint',fs:.04,on:'row 1 right slot (final)',h:D=>`<b class="${D.closeUp?'u':'d'}">${D.close}</b>`},
   {x:11.8,y:44.6,w:35.6,h2:4,c:'paint',fs:.04,on:'row 2 name slot',h:'Closest call'},
   {x:72.4,y:44.6,w:16.2,h2:4,c:'paint',fs:.04,on:'row 2 right slot',h:D=>D.winNm},
   {x:11.8,y:51,w:35.6,h2:4,c:'paint',fs:.04,on:'row 3 name slot',h:'Golden ticket'},
   {x:72.4,y:51,w:16.2,h2:4,c:'paint',fs:.04,on:'row 3 right slot',h:D=>D.leadNm},
   {x:52.4,y:44.6,w:16.6,h2:4,c:'paint dim',fs:.028,on:'row 2 number slots',h:D=>D.calls.find(c=>c.m===D.win)?((D.calls.find(c=>c.m===D.win).up?'▲':'▼')+D.calls.find(c=>c.m===D.win).v):''},
   {x:52.4,y:51,w:16.6,h2:4,c:'paint dim',fs:.026,on:'row 3 number slots',h:D=>D.leadPnl.replace(/,\d{3}$/,'K').replace('$','$')},
   {x:11,y:59,w:53,h2:8,c:'paint sub',fs:.06,on:'the tall panel under the rows',h:'Who calls it best?'},
   cut(66,59,24,11.5,'flicker','inset(0)','the lit operator hatch'),
   {x:66.4,y:70.5,w:23,h2:2,c:'stencil',fs:.026,on:'the hatch sill',h:'Step inside ▸'}],
  l:[mast(11.4,2.5,87,13),corner(1.4,2.5,7.2,13),
   {x:22.4,y:30.5,w:55,h2:10,c:'paint title',fs:.04,on:'the header panel of the scoreboard',h:'4 AIs trade earnings'},
   {x:23,y:44.3,w:24,h2:6.6,c:'paint',fs:.02,on:'row 1 name slot',h:D=>`${D.co} (${D.tk})`},
   {x:50.7,y:44.3,w:5.2,h2:6.6,c:'paint',fs:.02,on:'row 1 first number slot',h:'R'},{x:57.2,y:44.3,w:5.2,h2:6.6,c:'paint',fs:.02,on:'row 1 second number slot',h:D=>D.N},
   {x:64.8,y:44.3,w:12,h2:6.6,c:'paint',fs:.02,on:'row 1 right slot (final)',h:D=>`<b class="${D.closeUp?'u':'d'}">${D.close}</b>`},
   {x:23,y:53.8,w:24,h2:6.6,c:'paint',fs:.02,on:'row 2 name slot',h:'Closest call'},{x:64.8,y:53.8,w:12,h2:6.6,c:'paint',fs:.02,on:'row 2 right slot',h:D=>D.winNm},
   {x:23,y:63.3,w:24,h2:6.6,c:'paint',fs:.02,on:'row 3 name slot',h:'Golden ticket'},{x:64.8,y:63.3,w:12,h2:6.6,c:'paint',fs:.02,on:'row 3 right slot',h:D=>D.leadNm},
   {x:22,y:76,w:44,h2:12,c:'paint sub stencil',fs:.035,on:'the scoreboard\'s plank base',h:'Who calls it best?'},
   cut(70.4,75,9.4,17.5,'flicker','inset(0)','the lit operator hatch'),
   {x:69.8,y:92.6,w:11,h2:2.6,c:'stencil',fs:.009,on:'the hatch sill',h:'Step inside ▸'}]}},
 inside:{img:{p:I+'ci-p.jpg',l:I+'ci-l.jpg'},ar:{p:'9:16',l:'16:9'},f:{p:[.5,.5],l:[.5,.5]},items:{
  p:[film(73.2,14.8,17,11,'the little television on the shelf'),
   {x:72,y:27.6,w:20,h2:1.6,c:'paint dim',fs:.022,on:'the shelf\'s edge',h:'How it works · 1:20'},
   {x:38,y:16,w:14.4,h2:21,c:'ink plate',fs:.045,on:'the gold plate on the hook',h:'Bet #1<br><big>NVIDIA</big>'},
   ...[[10.2,-3.5],[33.6,-2],[52.6,-2],[71.4,-3]].map(([x,r],i)=>({x,y:51.5,w:19.8,h2:18,r,c:'paint plate',fs:.04,on:`number plate ${i+1} on the workbench`,
     h:D=>step(i+1,[S1,S2,S3,S4][i])+'<small>'+[`${D.tk}: `+callsLine(D),`${D.tk} <b class="${D.closeUp?'u':'d'}">${D.close}</b> · ${D.winNm} closest`,`${D.leadNm} ${D.leadPnl}`,'On the call of #1'][i]+'</small>'})),
   {x:20,y:76,w:60,h2:3,c:'stencil',fs:.04,on:'the workbench\'s front edge',h:'Meet the four models ▾'}],
  l:[film(78,33.4,11.8,16,'the little television on the shelf'),
   {x:77,y:51.5,w:14,h2:2.6,c:'paint dim',fs:.008,on:'the television stand',h:'How it works · 1:20'},
   {x:42.5,y:14,w:16.5,h2:20,c:'ink plate',fs:.03,on:'the gold plate on the hook',h:'Bet #1<br><big>NVIDIA</big>'},
   ...[[26.6,-1],[38.4,0],[50.6,0],[63,0]].map(([x,r],i)=>({x,y:48,w:10.6,h2:26,r,c:'paint plate',fs:.014,on:`number plate ${i+1} on the workbench`,
     h:D=>step(i+1,[S1,S2,S3,S4][i])+'<small>'+[`${D.tk}: `+callsLine(D),`${D.tk} <b class="${D.closeUp?'u':'d'}">${D.close}</b> · ${D.winNm} closest`,`${D.leadNm} ${D.leadPnl}`,'On the call of #1'][i]+'</small>'})),
   {x:30,y:81,w:40,h2:4,c:'stencil',fs:.014,on:'the workbench\'s front edge',h:'Meet the four models ▾'}]}},
 layout(cv){cv.style.transform='';const h=cv.querySelector('.cut'),r=h.getBoundingClientRect(),c=cv.getBoundingClientRect();cv.dataset.o=`${r.left-c.left+r.width/2}px ${r.top-c.top+r.height/2}px`},
 open(p,cv,ins,m){const a=ease(cl(p,.06,.82));const o=cv.dataset.o||'78% 66%';
  cv.style.transformOrigin=o;cv.style.transform=`scale(${1+a*a*9})`;cv.style.opacity=1-cl(a,.72,.95);ins.style.opacity=cl(a,.55,.9);ins.style.transform=`scale(${1.25-.25*cl(a,.55,1)})`}},

// D · The box office: a booth in the rain; the golden ticket in its slot is the thing to touch; it comes out to you and turns over
d:{name:'The box office',run:160,
 cover:{img:{p:I+'d-p2.jpg',l:I+'d-l2.jpg'},ar:{p:'9:16',l:'16:9'},f:{p:[.5,.45],l:[.5,.5]},items:{
  p:[mast(17,1.2,81,8.6),corner(2.2,1.3,11,7.6),
   {x:17,y:16.7,w:68,h2:4.6,c:'bulb',fs:.06,on:'marquee track 1',h:'Earnings Zeason presents'},
   {x:17,y:21.7,w:68,h2:4.7,c:'bulb title',fs:.07,on:'marquee track 2',h:'4 AIs trade earnings'},
   {x:17,y:26.9,w:68,h2:4.8,c:'bulb',fs:.07,on:'marquee track 3',h:'Who calls it best?'},
   {x:17,y:32.3,w:68,h2:4.4,c:'bulb small',fs:.05,on:'marquee track 4',h:D=>`Season 1 · ${D.N} rounds graded · next bell ${D.next?D.next.date:''}`},
   {x:39,y:58,w:24,h2:11,c:'ink win',fs:.045,on:'the gold-leaf window panel',h:'Box office<br><small>One golden ticket. Four AIs want it.</small>'},
   {x:71.2,y:67.4,w:9,h2:4.6,c:'wheels',fs:.04,on:'the ticket numbering machine\'s wheels',h:D=>String(D.N).padStart(3,'0')},
   cut(39.5,73.2,23,12.5,'nudge','polygon(4% 0,96% 0,100% 85%,96% 100%,0 100%)','the golden ticket in the slot'),
   {x:43,y:76,w:16,h2:6.5,c:'ink tk',fs:.04,on:'the golden ticket poking from the slot',h:'Take a ticket ▾'}],
  l:[mast(12.5,2,86,10),corner(1.2,2,8,14),
   {x:27.5,y:17.6,w:47,h2:6.6,c:'bulb',fs:.022,on:'marquee track 1',h:'Earnings Zeason presents'},
   {x:27.5,y:24.8,w:47,h2:6.6,c:'bulb title',fs:.028,on:'marquee track 2',h:'4 AIs trade earnings'},
   {x:27.5,y:32,w:47,h2:6.6,c:'bulb',fs:.028,on:'marquee track 3',h:'Who calls it best?'},
   {x:27.5,y:39.2,w:47,h2:5.5,c:'bulb small',fs:.018,on:'marquee track 4',h:D=>`Season 1 · ${D.N} rounds graded · next bell ${D.next?D.next.date:''}`},
   {x:43.6,y:65,w:13,h2:12,c:'ink win',fs:.016,on:'the gold-leaf window panel',h:'Box office<br><small>One golden ticket. Four AIs want it.</small>'},
   {x:62.6,y:76.3,w:4.8,h2:4,c:'wheels',fs:.012,on:'the ticket numbering machine\'s wheels',h:D=>String(D.N).padStart(3,'0')},
   cut(44.6,82.5,11,13.5,'nudge','polygon(8% 0,92% 0,100% 100%,0 100%)','the golden ticket in the slot'),
   {x:46.4,y:85,w:7.4,h2:7.5,c:'ink tk',fs:.011,on:'the golden ticket in the slot',h:'Take a ticket ▾'}]}},
 inside:{img:{p:I+'di-p.jpg',l:I+'di-l.jpg'},ar:{p:'9:16',l:'16:9'},f:{p:[.5,.45],l:[.5,.5]},items:{
  p:[...[14.4,20.8,27,33.3].map((y,i)=>({x:10,y,w:63,h2:5.6,c:'ink row',fs:.032,on:`the ticket's printed row ${i+1}`,h:D=>step(i+1,[S1,S2,S3,S4][i])+'<small>'+[`${D.tk}: `+callsLine(D),`${D.tk} <b class="${D.closeUp?'u':'d'}">${D.close}</b> · ${D.winNm} closest`,`Now: ${D.leadNm} ${D.leadPnl}`,'Admit one: the call of #1'][i]+'</small>'})),
   {x:77.5,y:15,w:13.5,h2:22.5,c:'ink stub',fs:.04,on:'the ticket\'s stub',h:D=>`Bet #1<b>NVIDIA</b><small>No. ${String(D.N).padStart(3,'0')}</small>`},
   film(31.8,64.2,36.6,11,'the cinema screen through the open doors'),
   {x:32,y:76,w:36,h2:2,c:'ink dim',fs:.025,on:'the auditorium\'s stage lip',h:'How it works · 1:20'},
   {x:20,y:42,w:60,h2:3,c:'gold cue',fs:.04,on:'the gold-veined marble under the ticket',h:'Meet the four models ▾'}],
  l:[...[31.8,41.3,50.8,59.8].map((y,i)=>({x:14,y,w:55.5,h2:9,c:'ink row',fs:.0135,on:`the ticket's printed row ${i+1}`,h:D=>step(i+1,[S1,S2,S3,S4][i])+'<small>'+[`${D.tk}: `+callsLine(D),`${D.tk} <b class="${D.closeUp?'u':'d'}">${D.close}</b> · ${D.winNm} closest`,`Now: ${D.leadNm} ${D.leadPnl}`,'Admit one: the call of #1'][i]+'</small>'})),
   {x:72,y:32,w:12.6,h2:36,c:'ink stub',fs:.016,on:'the ticket\'s stub',h:D=>`Bet #1<b>NVIDIA</b><small>No. ${String(D.N).padStart(3,'0')}</small>`},
   film(38,73,24,28,'the cinema screen below the ticket'),
   {x:6,y:90,w:20,h2:3,c:'gold cue',fs:.009,on:'the lobby\'s brass rail',h:'Meet the four models ▾'},
   {x:74,y:90,w:20,h2:3,c:'gold cue dim',fs:.009,on:'the lobby\'s brass rail',h:'How it works · 1:20'}]}},
 open(p,cv,ins,m){const a=ease(cl(p,.06,.86));const t=cv.querySelector('.cut');let tx=0,ty=0;
  if(t){const r=t.getBoundingClientRect(),c=cv.getBoundingClientRect();tx=r.left-c.left+r.width/2-c.width/2;ty=r.top-c.top+r.height/2-c.height/2}
  const k=1-a;ins.style.zIndex=a>.001?3:1;ins.style.transform=`translate(${tx*k}px,${ty*k}px) scale(${.12+.88*a}) rotateY(${-180*k}deg)`;ins.style.opacity=a>.02?1:0;
  cv.style.transform=`scale(${1+.35*a})`;cv.style.filter=`brightness(${1-.7*a}) blur(${a*3}px)`}},

// E · The issue: the comic itself, its cover art a still life (the golden ticket pinned to the season's chart, the bell); the cover swings open on its spine
e:{name:'The issue',run:150,
 cover:{img:{p:I+'e-p.jpg',l:I+'e-l.jpg'},ar:{p:'9:16',l:'16:9'},f:{p:[.5,.5],l:[.5,.5]},items:{
  p:[mast(21,2.4,76,8.6,'ink'),corner(2.6,2.3,13,9.4,'cream'),
   {x:33,y:30,w:30,h2:18,r:-9.5,c:'ink tkt',fs:.05,on:'the golden ticket pinned to the chart',h:D=>`Golden ticket<b>${D.leadNm}</b><small>holds it at ${D.leadPnl}</small>`},
   {x:12,y:75.8,w:76,h2:6,r:-7,c:'cream title',fs:.075,on:'banner ribbon 1',h:'4 AIs trade earnings!'},
   {x:6,y:89.5,w:52,h2:5,r:-8.5,c:'cream sub',fs:.065,on:'banner ribbon 2',h:'Who calls it best?'},
   {x:74,y:84,w:24,h2:12,c:'ink seal',fs:.04,on:'the round seal',h:D=>`<b>${D.N}</b>rounds graded at the close`},
   cut(55,48,40,23,'sway','polygon(35% 0,65% 0,100% 100%,0 100%)','the brass bell',{o:'50% 0'}),
   {x:80,y:0,w:20,h2:100,c:'curl',on:'the cover\'s fore-edge (lifts a little)',h:''}],
  l:[mast(27,3,55.5,11,'ink'),corner(19,3,6.2,12.5,'ink'),
   {x:31,y:41,w:23,h2:20,r:-4,c:'ink tkt',fs:.022,on:'the golden ticket pinned to the chart',h:D=>`Golden ticket<b>${D.leadNm}</b><small>holds it at ${D.leadPnl}</small>`},
   {x:22,y:79,w:45,h2:7,r:8,c:'ink title',fs:.024,on:'banner ribbon 1',h:'4 AIs trade earnings!'},
   {x:21,y:90,w:42,h2:6,r:8,c:'ink sub',fs:.022,on:'banner ribbon 2',h:'Who calls it best?'},
   {x:73,y:81,w:11,h2:15,c:'ink seal',fs:.014,on:'the round seal',h:D=>`<b>${D.N}</b>rounds graded at the close`},
   cut(57,36,20,34,'sway','polygon(35% 0,65% 0,100% 100%,0 100%)','the brass bell'),
   {x:76,y:2,w:9,h2:96,c:'curl',on:'the cover\'s fore-edge (lifts a little)',h:''}]}},
 inside:{img:{p:I+'ei-p2.jpg',l:I+'ei-l2.jpg'},ar:{p:'9:16',l:'16:9'},zoom:{p:1.5},f:{p:[0,.487],l:[.5,.5]},items:{
  p:[film(4,29.5,44,19.5,'the cinema screen on the left page'),
   {x:3.2,y:74.5,w:44,h2:9.6,c:'gold plate2',fs:.04,on:'the caption plate under the theatre',h:'How it works · 1:20<small>Meet the four models ▾</small>'},
   ...[13.4,29.9,48,66].map((y,i)=>({x:55,y,w:33.5,h2:3.4,c:'gold cap',fs:.03,on:`caption plate ${i+1} on the right page`,h:step(i+1,[S1,S2,S3,S4][i])})),
   {x:58,y:19.5,w:28,h2:4,r:-10,c:'hand',fs:.026,on:'the sealed envelope',h:D=>`${D.tk}, locked ${D.locked}:<br>`+callsLine(D)},
   {x:58,y:43.8,w:30,h2:2.4,c:'gold cue',fs:.026,on:'the marble under the bell',h:D=>`${D.tk} closed <b class="${D.closeUp?'u':'d'}">${D.close}</b> · ${D.winNm} closest`},
   {x:64.5,y:55.4,w:21,h2:4.4,r:4,c:'ink tkt small',fs:.03,on:'the golden ticket on the cushion',h:D=>`<b>${D.leadNm}</b>${D.leadPnl}`},
   {x:55,y:80,w:15,h2:5,c:'gold cue',fs:.03,on:'the vault\'s floor plate',h:'Bet #1<br><b>NVIDIA</b>'}],
  l:[film(15,19.5,24.3,29,'the cinema screen on the left page'),
   {x:6,y:77,w:38.5,h2:12,c:'gold plate2',fs:.016,on:'the caption plate under the theatre',h:'How it works · 1:20<small>Meet the four models ▾</small>'},
   ...[[5.6,26],[28.6,19.5],[49.6,17.5],[71.6,17.5]].map(([y,w],i)=>({x:52.6,y,w,h2:5.8,c:'gold cap',fs:.012,on:`caption plate ${i+1} on the right page`,h:step(i+1,[S1,S2,S3,S4][i])})),
   {x:58,y:15,w:20,h2:7,r:-9,c:'hand',fs:.009,on:'the sealed envelope',h:D=>`${D.tk}, locked ${D.locked}:<br>`+callsLine(D)},
   {x:53,y:38,w:16,h2:6,c:'gold cue',fs:.01,on:'the marble beside the bell',h:D=>`${D.tk} closed <b class="${D.closeUp?'u':'d'}">${D.close}</b><br>${D.winNm} closest`},
   {x:70,y:56,w:9.6,h2:5.4,r:6,c:'ink tkt small',fs:.012,on:'the golden ticket on the cushion',h:D=>`<b>${D.leadNm}</b>${D.leadPnl}`},
   {x:53,y:84,w:17,h2:8,c:'gold cue',fs:.014,on:'the panel\'s floor beside the vault',h:'Bet #1: <b>NVIDIA</b>'}]}},
 open(p,cv,ins,m){const a=ease(cl(p,.06,.8));cv.style.transformOrigin='0 50%';cv.style.transform=`perspective(1600px) rotateY(${-a*165}deg)`;cv.style.filter=`brightness(${1-.6*a})`;
  ins.style.transform=`scale(${.94+.06*a})`;ins.style.filter=`brightness(${.4+.6*a})`;cv.style.pointerEvents=a>.4?'none':'';
  const pl=ins.querySelector('.plate');if(m==='p'&&pl){const s=pl.offsetWidth-ins.clientWidth;pl.style.transform=`translateX(${-s*ease(cl(p,.62,.97))}px)`}else if(pl)pl.style.transform=''}}
};
