/* Round H18 · chips2: Meet the models as chips, A and B redone, laid over the built v46-live-x2plus.html (mockup only).
   window.__CH picks the version:
     A  one chip per model, one beat each (new school package); then the tryouts chip (four dies)
     B  the four old-school EPROMs in ONE beat; then the tryouts package (four quartz windows)
   window.__TW picks the tryouts wording: 'tryouts' (In tryouts), 'qual' (Qualifying), 'inf' (Running inference).
   On every chip:
     - the company's mark struck big into the gold plate, top left; the version silkscreened beside it ("4.7", "Fable 5.1", "6 Astra", "K3");
     - the flag a decal printed on the chip's own board or ceramic (the painting's grain and traces show through it), not a badge;
     - the stats printed on the black label, each with a small printed label: LAST 5, W-L, SEASON P&L;
     - the founder's loop in the die (A) or behind the quartz window (B); the leader's chip is the painting lit with the bet chip's rays.
   Every live word sits on a surface the painting left blank, mapped onto its four painted corners with one matrix3d (quads.json).
   Data: __x2pPnl().A (P&L = balance - $100,000, W, L, per-round results), ROUNDS (the last five graded rounds), MODELS (mark, version),
   marks.json (the tryout labs' marks, copied from x2plus.js and launch-r34-five). Nothing typed. */
(function(){
const D=document,TK=window.__CH||'A',TW=window.__TW||'tryouts',IMG='tools/concepts/worlds/comic/story/h/chips2/img/',Q=window.__CHQ,MK=window.__CHM||{};
if(!D.getElementById('t1-fonts')){const l=D.createElement('link');l.id='t1-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bangers&family=Shantell+Sans:wght@600;700&display=block';D.head.appendChild(l)}
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},FLAG={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'},CC={us:'United States',cn:'China',eu:'European Union'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---------- live data ---------- */
const A=window.__x2pPnl().A,MD=window.MODELS||{};
const rank=Object.keys(A).filter(m=>MD[m]).sort((a,b)=>A[b].bal-A[a].bal),lead=rank[0];
const pnl=m=>A[m].bal-100000,$=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const wl=m=>A[m].W+'-'+A[m].L,ver=m=>(MD[m].ver||'').replace(/^(GPT-|Grok |Kimi )/i,'');
const G=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)),L5=G.slice(-5);
const last5=m=>L5.map(r=>{const p=A[m].per[r.n];return p?(p.v>0?'W':'L'):'-'});
const UPC='#46e88a',DNC='#ff5a4e',CR='#f8f0d9',MUT='#cfc6ad',LBL='#a89f86';
/* ---------- drawing ---------- */
const T=(x,y,s,t,o={})=>`<text x="${x}" y="${y}" font-size="${s}" ${o.a?`text-anchor="${o.a}"`:''} fill="${o.c||CR}" class="${o.cls||'ch-an'}" ${o.ls?`letter-spacing="${o.ls}"`:''}>${esc(t)}</text>`;
const lab=(x,y,s,t,a)=>T(x,y,s,t,{a,c:LBL,cls:'ch-lb',ls:s*.12});
const path=(d,fr,col)=>`<path d="${d}" fill="${col}" ${fr?'fill-rule="evenodd"':''}/>`;
const mark=(m,x,y,s,col)=>{const M=MD[m]||{};return `<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 24 24">${path(M.d||'',M.fr,col)}${M.dot?path(M.dot,0,col):''}</svg>`};
const markT=(n,x,y,s,col)=>{const M=MK[n]||{};return `<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 24 24">${path(M.d||'',M.fr,col)}</svg>`};
const star=(cx,cy,r,rot=0)=>{let p='';for(let i=0;i<10;i++){const a=rot+Math.PI*i/5-Math.PI/2,rr=i%2?r*.42:r;p+=(i?'L':'M')+(cx+rr*Math.cos(a)).toFixed(2)+' '+(cy+rr*Math.sin(a)).toFixed(2)}return p+'Z'};
/* flags drawn (no emoji): US 13 stripes + canton; CN red with five gold stars; EU blue with a ring of twelve gold stars */
function flag(c,x,y,w,h){let s=`<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 30 20" preserveAspectRatio="none">`;
  if(c==='us'){s+='<rect width="30" height="20" fill="#f4eee0"/>';for(let i=0;i<7;i++)s+=`<rect y="${i*40/13}" width="30" height="${20/13}" fill="#b8202a"/>`;s+='<rect width="13" height="10.77" fill="#1d2f6b"/>';
    for(let r=0;r<5;r++)for(let k=0;k<(r%2?4:5);k++)s+=`<circle cx="${1.4+k*2.55+(r%2)*1.27}" cy="${1.3+r*2.05}" r=".5" fill="#f4eee0"/>`}
  else if(c==='cn'){s+='<rect width="30" height="20" fill="#d42a1e"/>'+`<path d="${star(5,5,3)}" fill="#ffd21f"/>`;[[10,2,.9],[12,4,.5],[12,7,.1],[10,9,-.3]].forEach(([a,b,r])=>s+=`<path d="${star(a,b,1,r)}" fill="#ffd21f"/>`)}
  else{s+='<rect width="30" height="20" fill="#1d3a94"/>';for(let i=0;i<12;i++){const a=i*Math.PI/6;s+=`<path d="${star(15+6*Math.cos(a),10+6*Math.sin(a),1.05)}" fill="#ffd21f"/>`}}
  return s+'</svg>'}
/* last five: printed cells, a tick (W, green), a cross (L, red), a dash (no call) */
function cells(seq,x,y,c,gap){return seq.map((k,i)=>{const X=x+i*(c+gap),col=k==='W'?UPC:k==='L'?DNC:'#6b6556',
  g=k==='W'?`<path d="M${X+c*.2} ${y+c*.52}L${X+c*.42} ${y+c*.74}L${X+c*.8} ${y+c*.28}" stroke="#0b0a0e" stroke-width="${c*.16}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
   :k==='L'?`<path d="M${X+c*.27} ${y+c*.27}L${X+c*.73} ${y+c*.73}M${X+c*.73} ${y+c*.27}L${X+c*.27} ${y+c*.73}" stroke="#0b0a0e" stroke-width="${c*.16}" stroke-linecap="round"/>`
   :`<path d="M${X+c*.3} ${y+c*.5}H${X+c*.7}" stroke="#0b0a0e" stroke-width="${c*.14}" stroke-linecap="round"/>`;
  return `<rect x="${X}" y="${y}" width="${c}" height="${c}" rx="${c*.12}" fill="${col}"/>${g}`}).join('')}
const fitW=(t,w,max,k=.46)=>Math.min(max,w/(String(t).length*k));
/* ---------- homography rect (0,0,w,h) -> quad (TL,TR,BR,BL) ---------- */
function m3d(w,h,q){const s=[[0,0],[w,0],[w,h],[0,h]],M=[],B=[];
  for(let i=0;i<4;i++){const[x,y]=s[i],[u,v]=q[i];M.push([x,y,1,0,0,0,-u*x,-u*y]);B.push(u);M.push([0,0,0,x,y,1,-v*x,-v*y]);B.push(v)}
  for(let c=0;c<8;c++){let p=c;for(let r=c+1;r<8;r++)if(Math.abs(M[r][c])>Math.abs(M[p][c]))p=r;[M[c],M[p]]=[M[p],M[c]];[B[c],B[p]]=[B[p],B[c]];
    for(let r=0;r<8;r++)if(r!==c){const f=M[r][c]/M[c][c];for(let k=c;k<8;k++)M[r][k]-=f*M[c][k];B[r]-=f*B[c]}}
  const[a,b,c,d,e,f,g,hh]=B.map((v,i)=>v/M[i][i]);return `matrix3d(${a},${d},0,${g},${b},${e},0,${hh},0,0,1,0,${c},${f},0,1)`}
const L2=(p,r)=>Math.hypot(p[0]-r[0],p[1]-r[1]);
const box=q=>[(L2(q[0],q[1])+L2(q[3],q[2]))/2,(L2(q[0],q[3])+L2(q[1],q[2]))/2];
/* surfaces are drawn in a fixed unit box (U px per painting px) so type sizes are set in painting px and scale with the chip */
function surf(q,draw,cls){const[bw,bh]=box(q);
  return `<div class="ch-sf ${cls||''}" data-q='${JSON.stringify(q)}' data-bw="${bw}" data-bh="${bh}"><svg viewBox="0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}" width="${bw}" height="${bh}" aria-hidden="true">${draw(bw,bh)}</svg></div>`}
const vid=m=>{const b='media/founder-'+m.toLowerCase()+'-anim';return `<video muted loop playsinline preload="metadata" poster="${b}.jpg" aria-hidden="true" tabindex="-1"><source src="${b}.mp4" type="video/mp4"><source src="${b}.webm" type="video/webm"></video>`};
function die(q,inner,round,cls){const[bw,bh]=box(q);
  return `<div class="ch-sf ch-die${round?' ch-rd':''} ${cls||''}" data-q='${JSON.stringify(q)}' data-bw="${bw}" data-bh="${bh}" style="width:${bw}px;height:${bh}px">${inner}<i class="ch-tint"></i></div>`}
const ins=(q,l,t,r,b)=>{const lerp=(p,o,f)=>[p[0]+(o[0]-p[0])*f,p[1]+(o[1]-p[1])*f];
  const top=[lerp(q[0],q[1],l),lerp(q[0],q[1],1-r)],bot=[lerp(q[3],q[2],l),lerp(q[3],q[2],1-r)];
  return [lerp(top[0],bot[0],t),lerp(top[1],bot[1],t),lerp(top[1],bot[1],1-b),lerp(top[0],bot[0],1-b)]};
const circQ=([cx,cy,rx,ry],k)=>[[cx-rx*k,cy-ry*k],[cx+rx*k,cy-ry*k],[cx+rx*k,cy+ry*k],[cx-rx*k,cy+ry*k]];
/* the painting, cropped; hl = glass regions whose painted reflection is screened back over the videos; tx = decal regions where the
   painting's own grain and traces are laid back over the printed flag (soft-light), so the flag reads printed on the board */
function pic(n,layers,hl,tx,cls){const P=Q[n],[iw,ih]=P.size,[cx,cy,cw,ch]=P.crop;
  const im=(c,st)=>`<img class="${c}" src="${IMG+n}.jpg" alt="" draggable="false" style="width:${(iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%;${st||''}">`;
  /* clip-path percentages refer to the img's own box, which is the whole painting (iw x ih), not the crop */
  const pct=([x,y])=>`${(x/iw*100).toFixed(3)}% ${(y/ih*100).toFixed(3)}%`;
  const poly=q=>`clip-path:polygon(${q.map(pct).join(',')})`;
  const hls=(hl||[]).map(h=>h.c?im('ch-hl',`clip-path:ellipse(${(h.c[2]/iw*100).toFixed(3)}% ${(h.c[3]/ih*100).toFixed(3)}% at ${pct(h.c)})`):im('ch-hl',poly(h))).join('');
  const txs=(tx||[]).map(q=>im('ch-tx',poly(q))).join('');
  return `<div class="ch-pic ${cls||''}" data-iw="${cw}" data-cx="${cx}" data-cy="${cy}" style="aspect-ratio:${cw}/${ch}"><div class="ch-mv">${im('ch-base')}${layers}${hls}${txs}</div></div>`}
function place(root){root.querySelectorAll('.ch-pic').forEach(p=>{const k=p.clientWidth/+p.dataset.iw,cx=+p.dataset.cx,cy=+p.dataset.cy;
  p.querySelectorAll('.ch-sf').forEach(s=>{const q=JSON.parse(s.dataset.q).map(([x,y])=>[(x-cx)*k,(y-cy)*k]);s.style.transform=m3d(+s.dataset.bw,+s.dataset.bh,q)})})}
const pc=m=>pnl(m)>=0?UPC:DNC;
/* the stats printed on a black label, in three labelled columns (A) */
function statsRow(m,w,h){const ly=h*.3,vy=h*.88,ls=h*.22,vs=h*.44,c=h*.36,gap=c*.22,c5=5*c+4*gap;
  const x1=0,x2=c5+w*.07,x3=w;
  return lab(x1,ly,ls,'LAST 5')+cells(last5(m),x1,vy-c*.98,c,gap)
    +lab(x2,ly,ls,'W-L')+T(x2,vy,vs*.9,wl(m))
    +lab(x3,ly,ls,'SEASON P&L','end')+T(x3,vy,fitW($(pnl(m)),x3-x2-vs*2.6,vs*1.12,.5),$(pnl(m)),{a:'end',c:pc(m),cls:'ch-an ch-pl'})}
/* ---------- A: new school chip ---------- */
function chipNew(m,i){const k=m.toLowerCase(),lit=m===lead,n=`n-${k}-${lit?'lit':'dim'}`,q=Q[n];
  const dq=ins(q.die,.03,.03,.03,.03),top=ins(q.top,.02,.06,.03,.06),[tw,th]=box(top),fw=th*.62*1.5,fq=ins(top,1-fw/tw,.3,0,.08);
  const name=surf(ins(top,0,0,fw/tw+.05,0),(w,h)=>{const nm=NM[m].toUpperCase(),v=ver(m).toUpperCase(),
      /* the name and the version share one baseline; both scale down together until they fit the bare board */
      fs=Math.min(h*.56,w/(nm.length*.46+.18+v.length*.6*.5)),vs=fs*.6;
    return lab(0,h*.24,h*.17,'MODEL').replace(LBL,MUT)+T(0,h*.86,fs,nm)+T(nm.length*fs*.46+fs*.18,h*.86,vs,v,{c:MUT})},'ch-silkf');
  const fl=surf(fq,(w,h)=>flag(FLAG[m],0,0,w,h),'ch-decal');
  const pad=surf(ins(q.pad,.12,.12,.12,.12),(w,h)=>{const s=Math.min(w,h);return mark(m,(w-s)/2,(h-s)/2,s,'#3a2606')},'ch-gold');
  const st=surf(ins(q.label,.035,.1,.035,.1),(w,h)=>statsRow(m,w,h),'ch-silkf');
  return pic(n,die(dq,vid(m))+name+fl+pad+st,[dq],[fq],'ch-n'+(lit?' ch-lead':''))}
/* ---------- B: old school EPROM ---------- */
function chipOld(m,i){const k=m.toLowerCase(),lit=m===lead,n=`o-${k}-${lit?'lit':'dim'}`,q=Q[n],r=.8,wq=circQ(q.win,r);
  const pad=surf(ins(q.pad,.12,.12,.12,.12),(w,h)=>{const s=Math.min(w,h);return mark(m,(w-s)/2,(h-s)/2,s,'#3a2606')},'ch-gold');
  const lo=ins(q.low,.06,.16,.06,.1),[lw,lh]=box(lo),fh=Math.min(lh,lw/1.5),fq=ins(lo,(1-fh*1.5/lw)/2,(1-fh/lh)/2,(1-fh*1.5/lw)/2,(1-fh/lh)/2);
  const fl=surf(fq,(w,h)=>flag(FLAG[m],0,0,w,h),'ch-decal');
  const st=surf(ins(q.label,.05,.08,.05,.08),(w,h)=>{const nm=NM[m].toUpperCase(),ns=h*.3,u=h/100,c=12.5*u,gap=2.6*u;
    const nmw=nm.length*ns*.46,vs=Math.min(ns*.62,fitW(ver(m),w-nmw-ns*2.2,ns*.62,.5));
    return T(0,h*.29,ns,nm)+T(nmw+ns*.25,h*.29,vs,ver(m).toUpperCase(),{c:MUT})+T(w,h*.29,h*.15,'NO. '+(i+1),{a:'end',c:i?LBL:'#ffd21f',cls:'ch-lb',ls:h*.02})
      +lab(0,h*.585,h*.145,'LAST 5')+cells(last5(m),w*.25,h*.585-c*.84,c,gap)
      +lab(w-wl(m).length*h*.19*.47-h*.06,h*.585,h*.145,'W-L','end')
      +T(w,h*.59,h*.19,wl(m),{a:'end'})
      +lab(0,h*.95,h*.145,'SEASON P&L')+T(w,h*.96,fitW($(pnl(m)),w*.6,h*.3,.5),$(pnl(m)),{a:'end',c:pc(m),cls:'ch-an ch-pl'})},'ch-silkf');
  return pic(n,die(wq,vid(m),1)+pad+fl+st,[{c:[q.win[0],q.win[1],q.win[2]*r,q.win[3]*r]}],[fq],'ch-o'+(lit?' ch-lead':''))}
/* ---------- the tryouts chip ---------- */
const TRY=['Mistral','Qwen','Gemini','Nemotron'],WORD={tryouts:['In tryouts','One of them makes No. 5'],qual:['Qualifying','Four in, one gets a seat'],inf:['Running inference…','Who qualifies?']};
function tryChip(old){const n=old?'t-old':'t-new',q=Q[n],[w1,w2]=WORD[TW]||WORD.tryouts;
  const strip=surf(ins(q.strip,.03,.12,.03,.12),(w,h)=>{const fs=fitW(w1.toUpperCase(),w*.66,h*.62,.48);
    const ss=Math.min(h*.3,fitW(w2,w*.32,h*.3,.42));return T(0,h*.7,fs,w1.toUpperCase(),{c:'#ffd21f'})+(!old?T(w,h*.7,ss,w2,{a:'end',c:MUT,cls:'ch-lb'}):'')},'ch-silkf');
  const holes=old?q.wins.map(c=>circQ(c,.8)):q.dies.map(d=>ins(d,.04,.04,.04,.04));
  const dies=TRY.map((t,i)=>die(holes[i],`<svg class="ch-tmk" viewBox="0 0 24 24" aria-hidden="true">${path((MK[t]||{}).d||'',(MK[t]||{}).fr,CR)}</svg><i class="ch-scan"></i>`,old,'ch-try ch-try'+i)).join('');
  const labs=TRY.map((t,i)=>surf(ins(q.labels[i],.06,.12,.05,.12),(w,h)=>{const cc=((MK[t]||{}).cc||'US').toLowerCase(),fh=h*.62,fw=fh*1.5,fs=fitW(t.toUpperCase(),w-fw-h*.5,h*.72,.47);
    return T(0,h*.5+fs*.36,fs,t.toUpperCase())+flag(cc,w-fw,(h-fh)/2,fw,fh)},'ch-silkf')).join('');
  return pic(n,strip+dies+labs,old?q.wins.map(c=>({c:[c[0],c[1],c[2]*.8,c[3]*.8]})):holes,[],'ch-t'+(old?' ch-to':''))}
/* ---------- the beats ---------- */
const capRank=(m,i)=>`<div class="ch-cap${m===lead?' ch-cap-g':''}"><b>No. ${i+1}</b>${m===lead?' <span>· top of the board</span>':''}</div>`;
const capTry=`<div class="ch-cap ch-cap-t"><b>No. 5?</b> <span>· not signed yet</span></div>`;
function beats(){
  if(TK==='A')return `<ol class="ch-beats ch-a">${rank.map((m,i)=>`<li class="ch-beat"><div class="ch-ink"><div class="ch-art">${capRank(m,i)}${chipNew(m,i)}</div></div></li>`).join('')}
    <li class="ch-beat ch-tb"><div class="ch-ink"><div class="ch-art">${capTry}${tryChip(false)}</div></div></li></ol>`;
  return `<ol class="ch-beats ch-b"><li class="ch-beat"><div class="ch-ink"><div class="ch-art"><div class="ch-cap ch-cap-g"><b>Season 1</b> <span>· the board, by P&amp;L</span></div><div class="ch-four">${rank.map((m,i)=>`<div class="ch-one">${chipOld(m,i)}</div>`).join('')}</div></div></div></li>
    <li class="ch-beat ch-tb"><div class="ch-ink"><div class="ch-art">${capTry}${tryChip(true)}</div></div></li></ol>`}
/* ---------- mount ---------- */
const st=D.getElementById('standings'),sec=D.createElement('section');sec.className='ch ch-'+TK;sec.setAttribute('aria-label','Meet the models');
function build(){
  sec.innerHTML=`<h2 class="ch-h"><span class="ch-w">Meet the</span> <span class="ch-w ch-w2">models</span></h2>
   <p class="ch-sub"><span>Ranked by season P&amp;L.</span> <span>$100K on every call.</span></p>${beats()}
   <ol class="ch-sr">${rank.map((m,i)=>`<li>No. ${i+1} ${esc(MD[m].ver)}, ${CC[FLAG[m]]}: last five ${last5(m).map(k=>k==='W'?'right':k==='L'?'wrong':'no call').join(', ')}; ${wl(m)} W-L; season P&L ${$(pnl(m))}</li>`).join('')}
    <li>${esc((WORD[TW]||WORD.tryouts)[0])}: ${TRY.map(t=>t+' ('+CC[((MK[t]||{}).cc||'US').toLowerCase()]+')').join(', ')}</li></ol>`;
  requestAnimationFrame(()=>place(sec));wire()}
const RM=matchMedia('(prefers-reduced-motion: reduce)');let io=null;
function wire(){if(RM.matches||!('IntersectionObserver' in window)){sec.classList.add('ch-still');return}
  io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.muted=true;const p=v.play();p&&p.catch(()=>{})}else v.pause()}),{rootMargin:'80px 0px'});
  sec.querySelectorAll('video').forEach(v=>io.observe(v))}
if(st){st.before(sec);st.style.display='none'}else D.querySelector('main').append(sec);
build();addEventListener('resize',()=>place(sec));D.fonts&&D.fonts.ready.then(()=>place(sec));
window.__ch={place:()=>place(sec),rebuild:build,data:{rank,lead,rows:rank.map(m=>[m,pnl(m),wl(m),last5(m).join('')]),l5:L5.map(r=>r.n)}};
D.documentElement.classList.add('ch-ready');
})();
