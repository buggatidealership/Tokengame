/* Round H15 · top1: the top of X2+ in the NVIDIA chip's art style. Two worlds:
   A = the chip's own world (dies, traces, a buzzer, a gold-lidded chip, the NVIDIA chip itself);
   B = the trading floor at the bell, drawn as objects (the big board, spiked order slips, the bell, the golden ticket, the ticker).
   window.__T1 = 'A' | 'B' | 'B2' (B with the alternative headline). Laid over the built v46-live-x2plus.html: its hero and its
   film bill + live strip section are hidden; the film element itself (.x2p-vt) is moved into beat 3.
   Every live word sits on a surface the painting left blank for it: an SVG in the surface's own box, mapped onto the surface's four
   painted corners with one matrix3d (quads measured on the paintings, quads.py). Data: ROUNDS, MODELS, CO_LOGOS, __x2pPnl, SIM. */
(function(){
const D=document,TK=window.__T1||'A',W=TK[0],IMG='tools/concepts/worlds/comic/story/h/top1/img/';
if(!D.getElementById('t1-fonts')){const l=D.createElement('link');l.id='t1-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bangers&family=Shantell+Sans:wght@600;700&display=block';D.head.appendChild(l)}
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---------- live data ---------- */
const R=window.ROUNDS||[],G=R.filter(r=>r.a!=null&&r.out),last=G[G.length-1];
const A=window.__x2pPnl().A,rank=Object.keys(A).sort((a,b)=>A[b].bal-A[a].bal),lead=rank[0];
const pnl=m=>A[m].bal-100000,$=v=>(v<0?'-':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const $k=v=>(v<0?'-':'+')+'$'+(Math.abs(v)/1000).toFixed(Math.abs(v)<10000?1:0)+'K';
const MD=window.MODELS||{};
const calls=last.calls.map(([m,c])=>{const up=/^UP/i.test(c),v=(c.match(/[\d.]+/)||[''])[0];return {m,up,v,ok:up===(last.a>0)}});
const coName=last.co,tick=last.ticker,move=last.out;
const graded=G.length,pool=window.SIM&&SIM.poolShare!=null?Math.round(SIM.poolShare*100):null;
/* a model's mark as SVG, in light ink for a dark lit glass (Grok and GPT are black marks: printed in cream) */
const mark=(m,x,y,s,col)=>{const M=MD[m]||{},c=col||(/^#(0|1)/.test(M.c||'')||m==='GPT'?'#f8f0d9':M.c);return `<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 24 24"><path d="${M.d||''}" fill="${c}"/></svg>`};
const T=(x,y,s,t,o={})=>`<text x="${x}" y="${y}" font-size="${s}" ${o.a?`text-anchor="${o.a}"`:''} fill="${o.c||'#f8f0d9'}" class="${o.cls||''}" ${o.ls?`letter-spacing="${o.ls}"`:''}>${esc(t)}</text>`;
const UPC='#3ee07f',DNC='#ff5148';
/* Anton is about .46em a character on average: the size that fits a line in width w */
const fit=(t,w,max)=>Math.min(max,w/(String(t).length*.47));
/* ---------- homography: rect (0,0,w,h) -> quad (TL,TR,BR,BL) ---------- */
function m3d(w,h,q){const s=[[0,0],[w,0],[w,h],[0,h]],A=[],B=[];
  for(let i=0;i<4;i++){const[x,y]=s[i],[u,v]=q[i];A.push([x,y,1,0,0,0,-u*x,-u*y]);B.push(u);A.push([0,0,0,x,y,1,-v*x,-v*y]);B.push(v)}
  const n=8;for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(A[r][c])>Math.abs(A[p][c]))p=r;[A[c],A[p]]=[A[p],A[c]];[B[c],B[p]]=[B[p],B[c]];
    for(let r=0;r<n;r++)if(r!==c){const f=A[r][c]/A[c][c];for(let k=c;k<n;k++)A[r][k]-=f*A[c][k];B[r]-=f*B[c]}}
  const X=B.map((b,i)=>b/A[i][i]);const[a,b,c,d,e,f,g,hh]=X;
  return `matrix3d(${a},${d},0,${g},${b},${e},0,${hh},0,0,1,0,${c},${f},0,1)`}
/* a surface: an svg in its own box (bw x bh = the quad's mean edge lengths), mapped onto the quad given in painting px */
function surf(q,draw,cls){const L=(p,r)=>Math.hypot(p[0]-r[0],p[1]-r[1]),bw=(L(q[0],q[1])+L(q[3],q[2]))/2,bh=(L(q[0],q[3])+L(q[1],q[2]))/2;
  return {q,bw,bh,html:`<div class="t1-sf ${cls||''}" data-q='${JSON.stringify(q)}' data-bw="${bw}" data-bh="${bh}"><svg viewBox="0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}" width="${bw}" height="${bh}" aria-hidden="true">${draw(bw,bh)}</svg></div>`}}
/* a painting with surfaces, shown whole; iw/ih = the painting's own px */
/* cr = [x,y,w,h]: the part of the painting the frame shows (a zoom), in painting px */
function pic(src,iw,ih,surfs,cls,extra,cr){cr=cr||[0,0,iw,ih];const[cx,cy,cw,ch]=cr;
  return `<div class="t1-pic ${cls||''}" data-iw="${cw}" data-cx="${cx}" data-cy="${cy}" style="aspect-ratio:${cw}/${ch}"><div class="t1-mv"><img src="${src.startsWith('media/')?src:IMG+src}" alt="" draggable="false" style="width:${(iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%">${surfs.map(s=>s.html).join('')}${extra||''}</div></div>`}
function place(root){root.querySelectorAll('.t1-pic').forEach(p=>{const k=p.clientWidth/+p.dataset.iw;
  p.querySelectorAll('.t1-sf').forEach(s=>{const cx=+p.dataset.cx,cy=+p.dataset.cy,q=JSON.parse(s.dataset.q).map(([x,y])=>[(x-cx)*k,(y-cy)*k]);s.style.transform=m3d(+s.dataset.bw,+s.dataset.bh,q)})})}
/* ---------- surfaces' contents ---------- */
/* a die / a slate row with one AI: mark, name, its season P&L */
const dieAI=(m,big)=>(w,h)=>{const s=Math.min(w,h);return mark(m,w/2-s*.2,h*.1,s*.4)+T(w/2,h*.7,s*.2,NM[m].toUpperCase(),{a:'middle',cls:'t1-an'})+T(w/2,h*.9,s*.15,$k(pnl(m)),{a:'middle',c:pnl(m)>=0?UPC:DNC,cls:'t1-an'})};
const dieCall=c=>(w,h)=>{const s=Math.min(w,h);return mark(c.m,w/2-s*.17,h*.1,s*.34)+T(w/2,h*.66,s*.2,NM[c.m].toUpperCase(),{a:'middle',cls:'t1-an'})+T(w/2,h*.9,s*.24,(c.up?'▲':'▼')+c.v+'%',{a:'middle',c:c.up?UPC:DNC,cls:'t1-an t1-call'})};
const led=(t)=>(w,h)=>{const f=fit(t,w*.9,h*.5);return T(w/2,h/2+f*.36,f,t,{a:'middle',c:'#ffc23a',cls:'t1-an t1-led'})};
const rowAI=(m,i)=>(w,h)=>{const fs=Math.min(h*.5,w*.068);return T(w*.025,h*.72,fs*.7,String(i+1),{c:'#d8c9a0',cls:'t1-an'})+mark(m,w*.07,h*.18,h*.64)+T(w*.07+h*.8,h*.72,fs,NM[m].toUpperCase(),{cls:'t1-an t1-chalk'})
  +T(w*.62,h*.72,fs*.8,A[m].W+'-'+A[m].L,{a:'middle',c:'#efe4c6',cls:'t1-an t1-chalk'})+T(w*.975,h*.72,fs,$(pnl(m)),{a:'end',c:pnl(m)>=0?UPC:DNC,cls:'t1-an t1-chalk'})};
/* ---------- the paintings and their surfaces (quads in painting px) ---------- */
const QA_W=[[[282,286],[430,276],[452,388],[305,400]],[[470,268],[610,260],[630,368],[492,378]],[[655,252],[790,246],[815,350],[678,360]],[[828,235],[952,228],[992,330],[855,340]]],QA_WB=[[358,480],[1042,408],[1056,452],[365,530]];
const QA_T=[[[207,180],[348,188],[371,326],[224,317]],[[399,192],[533,202],[556,334],[422,328]],[[233,379],[375,383],[395,521],[249,519]],[[432,384],[567,388],[591,520],[453,521]]],QA_TB=[[212,690],[678,671],[694,775],[221,801]];
const QB_W=[[[185,214],[1115,269],[1122,342],[180,294]],[[179,300],[1122,347],[1131,423],[173,383]],[[173,389],[1132,428],[1141,505],[167,476]],[[166,483],[1141,510],[1150,587],[160,568]]],QB_WP=[[562,598],[818,598],[818,640],[562,640]];
const QB_T=[[[179,205],[631,290],[635,395],[175,343]],[[175,356],[635,410],[647,524],[168,472]],[[172,489],[640,535],[651,654],[167,618]],[[174,626],[643,662],[656,789],[168,771]]];
const QCALL=[[[303,373],[438,351],[478,459],[339,475]],[[483,348],[610,325],[659,427],[526,446]],[[358,519],[498,495],[545,610],[399,636]],[[545,487],[681,462],[735,577],[591,598]]];
const season=`SEASON 1 · ${graded} ROUNDS GRADED`;
function hero(wide){
  if(W==='A'){const Q=wide?QA_W:QA_T,QB=wide?QA_WB:QA_TB;
    return pic(wide?'a-hero-w-2k.jpg':'a-hero-t-2k.jpg',wide?1280:768,wide?720:1024,[...rank.map((m,i)=>surf(Q[i],dieAI(m),'t1-glass')),surf(QB,led(season),'t1-glass')],'t1-hero')}
  const Q=wide?QB_W:QB_T,ss=rank.map((m,i)=>surf(Q[i],rowAI(m,i),'t1-slate'));
  if(wide)ss.push(surf(QB_WP,(w,h)=>T(w/2,h*.7,h*.5,'SEASON 1 · '+graded+' ROUNDS',{a:'middle',c:'#2a1a06',cls:'t1-an t1-eng'})));
  return pic(wide?'b-hero-w-2k.jpg':'b-hero-t-2k.jpg',wide?1280:768,wide?720:1024,ss,'t1-hero')}
const leadSurf=(w,h)=>{const s=Math.min(h*.5,w*.3),x=w*.08+s*1.15,tw=w*.92-x,l2=$(pnl(lead)),l3=A[lead].W+'-'+A[lead].L+' · P&L';
  return mark(lead,w*.07,h/2-s/2,s,'#2a1a06')+T(x,h*.4,fit(NM[lead],tw,h*.3),NM[lead].toUpperCase(),{c:'#2a1a06',cls:'t1-an t1-eng'})+T(x,h*.66,fit(l2,tw,h*.2),l2,{c:'#2a1a06',cls:'t1-an t1-eng'})+T(x,h*.84,fit(l3,tw,h*.12),l3,{c:'#3a260b',cls:'t1-an t1-eng'})};
function frames(){
  const F=[];const cap=t=>`<div class="t1-cap" data-w>${t}</div>`;
  if(W==='A'){
    F.push({w:'CALL',k:'call',l:'Each AI calls the move before the report.',cap:`R${last.n} · ${esc(coName)} (${tick})`,
      p:pic('a-call.jpg',1024,1024,calls.map((c,i)=>surf(QCALL[i],dieCall(c),'t1-glass t1-d'+i)),'','',[250,196,550,550])});
    F.push({w:'BELL',k:'bell',l:'The closing bell says who was right.',cap:'At the close',
      p:pic('a-bell.jpg',1024,1024,[surf([[547,501],[736,447],[827,591],[627,647]],(w,h)=>T(w/2,h*.36,h*.17,(coName+' ('+tick+')').toUpperCase(),{a:'middle',c:'#ffc23a',cls:'t1-an'})+T(w/2,h*.82,h*.42,move,{a:'middle',c:last.a>0?UPC:DNC,cls:'t1-an t1-move'}),'t1-glass')],'',
        '<i class="t1-ring" style="left:27%;top:24%"></i><i class="t1-ring r2" style="left:27%;top:24%"></i>',[200,180,700,700])});
    F.push({w:'#1',k:'one',l:'The top of the board holds the golden ticket.',cap:'Top of the board',
      p:pic('a-one.jpg',1024,1024,[surf([[296,350],[640,292],[768,566],[404,634]],leadSurf,'t1-gold')],'','',[170,130,700,700])});
    F.push({w:'BET',k:'bet',l:'We follow its call. Bet #1: NVIDIA.',cap:'Bet #1',
      p:pic('media/bet-chip-h2.jpg',2048,1152,[[[643,493],[788,469],[861,615],[713,636]],[[840,463],[983,438],[1064,582],[917,605]],[[1045,428],[1177,411],[1264,549],[1121,572]],[[1234,399],[1361,382],[1454,516],[1315,538]]].map((q,i)=>surf(q,(w,h)=>T(w/2,h*.78,h*.78,'NVDA'[i],{a:'middle',c:'#ffd768',cls:'t1-an t1-nv'}),'t1-glass t1-d'+i)),'t1-wide','',[560,150,980,980])});
  }else{
    F.push({w:'CALL',k:'call',l:'Each AI calls the move before the report.',cap:`R${last.n} · ${esc(coName)} (${tick})`,
      p:pic('b-call.jpg',1024,1024,[surf([[478,150],[835,142],[846,500],[470,520]],(w,h)=>{const o='ORDER · '+tick+' · BEFORE THE REPORT';let s=T(w*.06,h*.12,fit(o,w*.86,h*.07),o,{c:'#5a3d17',cls:'t1-an'});
        calls.forEach((c,i)=>{const y=h*(.3+i*.18);s+=mark(c.m,w*.06,y-h*.09,h*.11,MD[c.m].c==='#111'||c.m==='GPT'?'#1b1206':MD[c.m].c)+T(w*.23,y,h*.09,NM[c.m].toUpperCase(),{c:'#1b1206',cls:'t1-an t1-pen'})+T(w*.95,y,h*.11,(c.up?'▲':'▼')+c.v+'%',{a:'end',c:c.up?'#0f7a3a':'#b3221b',cls:'t1-an t1-pen'})});return s},'t1-paper')],'t1-flut','',[330,30,620,620])});
    F.push({w:'BELL',k:'bell',l:'The closing bell says who was right.',cap:'At the close',
      p:pic('b-bell.jpg',1024,1024,[surf([[318,380],[728,380],[742,488],[304,488]],(w,h)=>T(w/2,h*.36,fit(coName+' ('+tick+')',w*.62,h*.26),(coName+' ('+tick+')').toUpperCase(),{a:'middle',c:'#2a1a06',cls:'t1-an t1-eng'})+T(w/2,h*.9,h*.56,move,{a:'middle',c:last.a>0?'#0b5e2c':'#8f1a14',cls:'t1-an t1-eng'}),'t1-brass')],'t1-swing','',[150,20,730,730])});
    F.push({w:'#1',k:'one',l:'The top of the board holds the golden ticket.',cap:'Top of the board',
      p:pic('b-one.jpg',1024,1024,[surf([[265,405],[790,262],[895,560],[350,705]],leadSurf,'t1-gold')],'','',[90,130,860,860])});
    F.push({w:'BET',k:'bet',l:'We follow its call. Bet #1: NVIDIA.',cap:'Bet #1',
      p:pic('b-bet.jpg',1024,1024,[surf([[336,430],[540,418],[548,560],[340,575]],(w,h)=>T(w/2,h*.36,h*.2,'BET #1',{a:'middle',c:'#5a3d17',cls:'t1-an t1-type'})+T(w/2,h*.82,h*.42,'NVDA',{a:'middle',c:'#1b1206',cls:'t1-an t1-type'}),'t1-paper')],'','',[170,120,720,720])});
  }
  return F.map((f,i)=>`<li class="t1-fr t1-${f.k}" tabindex="0" aria-label="${f.w}: ${esc(f.l)}"><div class="t1-ink"><div class="t1-art">${cap(f.cap)}${f.p}</div></div><b class="t1-word" aria-hidden="true"><span>${f.w}</span></b><p class="t1-ln">${esc(f.l)}</p></li>`).join('')}
/* ---------- mount ---------- */
const H1=TK==='B2'?['4 AIs.','Every earnings report.','One scoreboard.']:['Four AIs call earnings.','The market keeps score.'];
const lt=s=>esc(s).replace(/AIs/g,'AI<span class="t1-lc">s</span>');
const main=D.querySelector('main'),hero0=D.querySelector('section.hero'),bet0=D.querySelector('section.x2o-bet'),vt=D.querySelector('.x2p-vt');
const sec=D.createElement('section');sec.className='t1 t1-'+W+(TK==='B2'?' t1-alt':'');sec.setAttribute('aria-label','What EZ does');
function build(){const wide=innerWidth>=900;
  sec.innerHTML=`<div class="t1-b1"><div class="t1-ink t1-hink"><div class="t1-art">${hero(wide)}</div></div>
    <h1 class="t1-h1">${H1.map((l,i)=>`<span class="t1-hw t1-hw${i}">${lt(l)}</span>`).join('')}</h1></div>
   <div class="t1-gut" aria-hidden="true"></div>
   <div class="t1-b2"><div class="t1-panel"><div class="t1-pcap" data-w><b>How a round works</b></div><ol class="t1-frs">${frames()}</ol></div></div>
   <div class="t1-b3"><h2 class="t1-h2"><span class="t1-hw">Watch it all</span> <span class="t1-hw t1-hwt">1:20</span></h2><div class="t1-film"></div></div>`;
  if(vt)sec.querySelector('.t1-film').appendChild(vt);
  requestAnimationFrame(()=>place(sec))}
if(hero0)hero0.before(sec);else main.prepend(sec);
[hero0,bet0].forEach(s=>s&&(s.style.display='none'));
build();let lw=innerWidth;addEventListener('resize',()=>{if((innerWidth>=900)!==(lw>=900)){lw=innerWidth;build()}else place(sec)});
D.fonts&&D.fonts.ready.then(()=>place(sec));
/* micro-interactions: hover, focus or a tap plays the frame's own motion once (no tap is needed to read anything) */
sec.addEventListener('pointerdown',e=>{const f=e.target.closest('.t1-fr');if(!f)return;f.classList.remove('t1-go');void f.offsetWidth;f.classList.add('t1-go');setTimeout(()=>f.classList.remove('t1-go'),1600)});
/* one quiet cue per view: the first time the four frames are on screen, the bell (or the buzzer) goes once */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.disconnect();const b=sec.querySelector('.t1-bell');if(b&&!matchMedia('(prefers-reduced-motion: reduce)').matches){setTimeout(()=>{b.classList.add('t1-go');setTimeout(()=>b.classList.remove('t1-go'),1600)},700)}}}),{threshold:.6});
setTimeout(()=>{const p=sec.querySelector('.t1-frs');p&&io.observe(p)},50);
window.__t1={rebuild:build,place:()=>place(sec),data:{last:last.n,lead,graded,pool}};
D.documentElement.classList.add('t1-ready');
})();
