/* Round H19 · chips3: Meet the models, version B (all four EPROMs in ONE beat) next pass, plus one revised A. Mockup laid over the
   built v46-live-x2plus.html; the section takes #standings' place (hidden), the rest of the page is untouched.
   window.__CH  S   the founder's loop in a SQUARE quartz window (where H18's round porthole was)
                N1  no frame: the loop printed into the bare ceramic between plate and label, the ceramic's grain and light laid over it
                N2  no frame: the loop seen in the exposed silicon die, the die's circuit lines and sheen laid over it
                A   one chip per model, one beat each (H18's new-school paintings), with the same printed-in label
   window.__PR  silk (cream silkscreen ink on the black epoxy, default) | laser (laser-etched: frosted grey, no ink)
   window.__TW  the fifth chip's wording: ininf (In inference) | run (Running inference…) | pend (Inference pending)
   Printed, not pasted: every word, number, cell and flag goes through an SVG ink filter (fine voids where the screen missed, a slight
   spread and bleed, a ragged edge), then the painting's own label surface is laid back over it in overlay, so its grain and light run
   through the letters. Each line is measured after the fonts load and shrunk until it fits its field (no clipped version).
   Data: __x2pPnl().A (P&L = balance - $100,000, W, L, per-round results), ROUNDS (the last five graded), MODELS (mark, version). */
(function(){
const D=document,TK=window.__CH||'S',PR=window.__PR||'silk',TW=window.__TW||'ininf',Q=window.__CHQ,MK=window.__CHM||{},
  IMG='tools/concepts/worlds/comic/story/h/chips3/img/';
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
/* inks: silkscreen = cream ink on black epoxy; laser = the epoxy frosted by the beam (grey, no colour but the spot inks' tint) */
const INK=PR==='laser'?{cr:'#c9c3b4',mut:'#9d978a',lbl:'#8d877b',up:'#7fd6a0',dn:'#e88a80',gd:'#e6c66a'}:{cr:'#f1e8cf',mut:'#cdc4aa',lbl:'#b3aa90',up:'#46e88a',dn:'#ff5a4e',gd:'#ffd21f'};
/* ---------- drawing ---------- */
const T=(x,y,s,t,o={})=>`<text x="${x}" y="${y}" font-size="${s}" ${o.a?`text-anchor="${o.a}"`:''} fill="${o.c||INK.cr}" class="${o.cls||'ch-an'}" ${o.ls?`letter-spacing="${o.ls}"`:''}>${esc(t)}</text>`;
const lab=(x,y,s,t,a)=>T(x,y,s,t,{a,c:INK.lbl,cls:'ch-lb',ls:s*.1});
/* a fitted group: shrunk around its anchor after measuring, until it is no wider than w (data-w, data-ax) */
const fit=(w,ax,inner,y)=>`<g class="ch-fit" data-w="${w}" data-ax="${ax}" data-y="${y}">${inner}</g>`;
const path=(d,fr,col)=>`<path d="${d}" fill="${col}" ${fr?'fill-rule="evenodd"':''}/>`;
const mark=(m,x,y,s,col)=>{const M=MD[m]||{};return `<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 24 24">${path(M.d||'',M.fr,col)}${M.dot?path(M.dot,0,col):''}</svg>`};
const star=(cx,cy,r,rot=0)=>{let p='';for(let i=0;i<10;i++){const a=rot+Math.PI*i/5-Math.PI/2,rr=i%2?r*.42:r;p+=(i?'L':'M')+(cx+rr*Math.cos(a)).toFixed(2)+' '+(cy+rr*Math.sin(a)).toFixed(2)}return p+'Z'};
function flag(c,x,y,w,h){let s=`<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 30 20" preserveAspectRatio="none">`;
  if(c==='us'){s+='<rect width="30" height="20" fill="#efe6d0"/>';for(let i=0;i<7;i++)s+=`<rect y="${i*40/13}" width="30" height="${20/13}" fill="#b8202a"/>`;s+='<rect width="13" height="10.77" fill="#1d2f6b"/>';
    for(let r=0;r<5;r++)for(let k=0;k<(r%2?4:5);k++)s+=`<circle cx="${1.4+k*2.55+(r%2)*1.27}" cy="${1.3+r*2.05}" r=".5" fill="#efe6d0"/>`}
  else if(c==='cn'){s+='<rect width="30" height="20" fill="#d42a1e"/>'+`<path d="${star(5,5,3)}" fill="#ffd21f"/>`;[[10,2,.9],[12,4,.5],[12,7,.1],[10,9,-.3]].forEach(([a,b,r])=>s+=`<path d="${star(a,b,1,r)}" fill="#ffd21f"/>`)}
  else{s+='<rect width="30" height="20" fill="#1d3a94"/>';for(let i=0;i<12;i++){const a=i*Math.PI/6;s+=`<path d="${star(15+6*Math.cos(a),10+6*Math.sin(a),1.05)}" fill="#ffd21f"/>`}}
  return s+'</svg>'}
/* last five, printed cells: a filled square with the mark knocked out of the ink (the epoxy shows through) */
function cells(seq,x,y,c,gap){return seq.map((k,i)=>{const X=x+i*(c+gap),col=k==='W'?INK.up:k==='L'?INK.dn:'#5d584c',sw=c*.17,
  g=k==='W'?`<path d="M${X+c*.2} ${y+c*.52}L${X+c*.42} ${y+c*.74}L${X+c*.8} ${y+c*.28}" stroke="#000" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
   :k==='L'?`<path d="M${X+c*.27} ${y+c*.27}L${X+c*.73} ${y+c*.73}M${X+c*.73} ${y+c*.27}L${X+c*.27} ${y+c*.73}" stroke="#000" stroke-width="${sw}" stroke-linecap="round"/>`
   :`<path d="M${X+c*.3} ${y+c*.5}H${X+c*.7}" stroke="#000" stroke-width="${sw}" stroke-linecap="round"/>`;
  return `<g><rect x="${X}" y="${y}" width="${c}" height="${c}" rx="${c*.1}" fill="${col}"/>${g}</g>`}).join('')}
/* ---------- homography rect (0,0,w,h) -> quad (TL,TR,BR,BL) ---------- */
function m3d(w,h,q){const s=[[0,0],[w,0],[w,h],[0,h]],M=[],B=[];
  for(let i=0;i<4;i++){const[x,y]=s[i],[u,v]=q[i];M.push([x,y,1,0,0,0,-u*x,-u*y]);B.push(u);M.push([0,0,0,x,y,1,-v*x,-v*y]);B.push(v)}
  for(let c=0;c<8;c++){let p=c;for(let r=c+1;r<8;r++)if(Math.abs(M[r][c])>Math.abs(M[p][c]))p=r;[M[c],M[p]]=[M[p],M[c]];[B[c],B[p]]=[B[p],B[c]];
    for(let r=0;r<8;r++)if(r!==c){const f=M[r][c]/M[c][c];for(let k=c;k<8;k++)M[r][k]-=f*M[c][k];B[r]-=f*B[c]}}
  const[a,b,c,d,e,f,g,hh]=B.map((v,i)=>v/M[i][i]);return `matrix3d(${a},${d},0,${g},${b},${e},0,${hh},0,0,1,0,${c},${f},0,1)`}
const L2=(p,r)=>Math.hypot(p[0]-r[0],p[1]-r[1]);
const box=q=>[(L2(q[0],q[1])+L2(q[3],q[2]))/2,(L2(q[0],q[3])+L2(q[1],q[2]))/2];
const ins=(q,l,t,r,b)=>{const lerp=(p,o,f)=>[p[0]+(o[0]-p[0])*f,p[1]+(o[1]-p[1])*f];
  const top=[lerp(q[0],q[1],l),lerp(q[0],q[1],1-r)],bot=[lerp(q[3],q[2],l),lerp(q[3],q[2],1-r)];
  return [lerp(top[0],bot[0],t),lerp(top[1],bot[1],t),lerp(top[1],bot[1],1-b),lerp(top[0],bot[0],1-b)]};
const circQ=([cx,cy,rx,ry],k)=>[[cx-rx*k,cy-ry*k],[cx+rx*k,cy-ry*k],[cx+rx*k,cy+ry*k],[cx-rx*k,cy+ry*k]];
/* a printed surface: the SVG goes through the ink filter (#chInk silkscreen, #chEtch laser) */
function surf(q,draw,cls,ink){const[bw,bh]=box(q);
  return `<div class="ch-sf ${cls||''}" data-q='${JSON.stringify(q)}' data-bw="${bw}" data-bh="${bh}"><svg viewBox="0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}" width="${bw}" height="${bh}" aria-hidden="true"><g filter="url(#${ink===false?'':PR==='laser'?'chEtch':'chInk'})">${draw(bw,bh)}</g></svg></div>`}
const vid=m=>{const b='media/founder-'+m.toLowerCase()+'-anim';return `<video muted loop playsinline preload="metadata" poster="${b}.jpg" aria-hidden="true" tabindex="-1"><source src="${b}.mp4" type="video/mp4"><source src="${b}.webm" type="video/webm"></video>`};
function die(q,inner,cls){const[bw,bh]=box(q);
  return `<div class="ch-sf ch-die ${cls||''}" data-q='${JSON.stringify(q)}' data-bw="${bw}" data-bh="${bh}" style="width:${bw}px;height:${bh}px">${inner}<i class="ch-tint"></i></div>`}
/* the painting, cropped; ov = regions of the painting laid back over the print / the loop: [quad, class] (overlay, soft-light, screen) */
function pic(n,layers,ov,cls){const P=Q[n],[iw,ih]=P.size,[cx,cy,cw,ch]=P.crop;
  const im=(c,st)=>`<img class="${c}" src="${IMG+n}.jpg" alt="" draggable="false" style="width:${(iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%;${st||''}">`;
  const pct=([x,y])=>`${(x/iw*100).toFixed(3)}% ${(y/ih*100).toFixed(3)}%`,poly=q=>`clip-path:polygon(${q.map(pct).join(',')})`;
  return `<div class="ch-pic ${cls||''}" data-iw="${cw}" data-cx="${cx}" data-cy="${cy}" style="aspect-ratio:${cw}/${ch}"><div class="ch-mv">${im('ch-base')}${layers}${(ov||[]).map(([q,c])=>im(c,poly(q))).join('')}</div></div>`}
function place(root){root.querySelectorAll('.ch-pic').forEach(p=>{const k=p.clientWidth/+p.dataset.iw,cx=+p.dataset.cx,cy=+p.dataset.cy;
  p.querySelectorAll('.ch-sf').forEach(s=>{const q=JSON.parse(s.dataset.q).map(([x,y])=>[(x-cx)*k,(y-cy)*k]);s.style.transform=m3d(+s.dataset.bw,+s.dataset.bh,q)})})}
/* measure every fitted line (fonts loaded) and shrink it around its anchor until it fits its field */
function fitAll(root){root.querySelectorAll('.ch-fit').forEach(g=>{g.removeAttribute('transform');const w=+g.dataset.w,bb=g.getBBox();
  if(bb.width>w){const k=w/bb.width,ax=g.dataset.ax==='end'?bb.x+bb.width:g.dataset.ax==='mid'?bb.x+bb.width/2:bb.x,y=+g.dataset.y;g.setAttribute('transform',`translate(${ax} ${y}) scale(${k}) translate(${-ax} ${-y})`);g.dataset.k=k.toFixed(3)}else g.dataset.k='1'})}
const pc=m=>pnl(m)>=0?INK.up:INK.dn;
/* ---------- the EPROM label: three lines, bigger and simpler ----------
   1  NAME version ............. NO. n       2  LAST 5 [five cells] ..... W-L 45-27       3  SEASON P&L ......... +$148,480 (largest) */
function labelB(m,i,w,h){const u=h/100,nm=NM[m].toUpperCase(),v=ver(m).toUpperCase(),ns=30*u,noS=14*u,ls=14.5*u,c=15*u,gap=3*u;
  const noW=noS*3.4;
  const l1=fit(w-noW-4*u,'start',T(0,27*u,ns,nm)+T(0,27*u,ns*.6,v,{c:INK.mut,cls:'ch-an ch-ver'}),27*u)
    +T(w,24*u,noS,'NO. '+(i+1),{a:'end',c:i?INK.lbl:INK.gd,cls:'ch-lb',ls:noS*.06});
  const l2=lab(0,58*u,ls,'LAST 5')+cells(last5(m),ls*3.6,58*u-c*.86,c,gap)
    +fit(w*.36,'end',lab(w-wl(m).length*21*u*.47-3*u,58*u,ls,'W-L','end')+T(w,58.5*u,21*u,wl(m),{a:'end'}),58*u);
  const l3=lab(0,95*u,ls,'SEASON P&L')+fit(w-ls*6.3,'end',T(w,96*u,33*u,$(pnl(m)),{a:'end',c:pc(m),cls:'ch-an ch-pl'}),96*u);
  return l1+l2+l3}
/* the version sits right after the name: placed after measuring (see verPos) */
function verPos(root){root.querySelectorAll('.ch-ver').forEach(t=>{const n=t.previousElementSibling;if(!n)return;const b=n.getBBox();t.setAttribute('x',b.x+b.width+(+n.getAttribute('font-size'))*.22)})}
/* ---------- B: the four EPROMs ---------- */
function chipOld(m,i){const k=m.toLowerCase(),lit=m===lead,pre={S:'s',N1:'c',N2:'d'}[TK],n=`${pre}-${k}-${lit?'lit':'dim'}`,q=Q[n];
  const pad=surf(ins(q.pad,.12,.12,.12,.12),(w,h)=>{const s=Math.min(w,h);return mark(m,(w-s)/2,(h-s)/2,s,'#3a2606')},'ch-gold',false);
  const lo=ins(q.low,.08,.16,.08,.12),[lw,lh]=box(lo),fh=Math.min(lh,lw/1.5),fq=ins(lo,(1-fh*1.5/lw)/2,(1-fh/lh)/2,(1-fh*1.5/lw)/2,(1-fh/lh)/2);
  const fl=surf(fq,(w,h)=>flag(FLAG[m],0,0,w,h),'ch-decal');
  const lq=ins(q.label,.055,.11,.05,.1),st=surf(lq,(w,h)=>labelB(m,i,w,h),'ch-print');
  let loop,ov=[[fq,'ch-tx'],[q.label,'ch-lx']];
  if(TK==='S'){const wq=ins(q.win,.03,.03,.03,.03);loop=die(wq,vid(m),'ch-sq');ov.push([wq,'ch-hl'])}
  else if(TK==='N1'){const wq=q.mid;loop=die(wq,vid(m),'ch-cer')}
  else{const wq=ins(q.win,.02,.02,.02,.02);loop=die(wq,vid(m),'ch-sil');ov.push([wq,'ch-sx'])}
  return pic(n,loop+pad+fl+st,ov,'ch-o'+(lit?' ch-lead':''))}
/* ---------- A: new school chip, the same printed label ---------- */
function chipNew(m,i){const k=m.toLowerCase(),lit=m===lead,n=`n-${k}-${lit?'lit':'dim'}`,q=Q[n];
  const dq=ins(q.die,.03,.03,.03,.03),top=ins(q.top,.02,.06,.03,.06),[tw,th]=box(top),fw=th*.62*1.5,fq=ins(top,1-fw/tw,.3,0,.08);
  const name=surf(ins(top,0,0,fw/tw+.06,0),(w,h)=>{const nm=NM[m].toUpperCase(),v=ver(m).toUpperCase(),fs=h*.62;
    return fit(w,'start',T(0,h*.84,fs,nm)+T(0,h*.84,fs*.6,v,{c:INK.mut,cls:'ch-an ch-ver'}),h*.84)},'ch-print');
  const fl=surf(fq,(w,h)=>flag(FLAG[m],0,0,w,h),'ch-decal');
  const pad=surf(ins(q.pad,.12,.12,.12,.12),(w,h)=>{const s=Math.min(w,h);return mark(m,(w-s)/2,(h-s)/2,s,'#3a2606')},'ch-gold',false);
  const lq=ins(q.label,.035,.1,.035,.1),st=surf(lq,(w,h)=>{const u=h/100,ls=20*u,c=30*u,gap=6*u,x2=5*c+4*gap+w*.08;
    return lab(0,28*u,ls,'LAST 5')+cells(last5(m),0,90*u-c*.98,c,gap)
      +lab(x2,28*u,ls,'W-L')+T(x2,90*u,40*u,wl(m))
      +lab(w,28*u,ls,'SEASON P&L','end')+fit(w-x2-40*u*2.7,'end',T(w,92*u,52*u,$(pnl(m)),{a:'end',c:pc(m),cls:'ch-an ch-pl'}),92*u)},'ch-print');
  return pic(n,die(dq,vid(m),'ch-sq')+name+fl+pad+st,[[dq,'ch-hl'],[fq,'ch-tx'],[q.label,'ch-lx']],'ch-n'+(lit?' ch-lead':''))}
/* ---------- the fifth chip ---------- */
const TRY=['Mistral','Qwen','Gemini','Nemotron'],WORD={ininf:'In inference',run:'Running inference…',pend:'Inference pending'};
function tryChip(){const n='t-old',q=Q[n],w1=WORD[TW]||WORD.ininf;
  const strip=surf(ins(q.strip,.03,.14,.03,.14),(w,h)=>fit(w,'mid',T(w/2,h*.76,h*.66,w1.toUpperCase(),{a:'middle',c:INK.gd}),h*.76),'ch-print');
  const holes=q.wins.map(c=>circQ(c,.8));
  const dies=TRY.map((t,i)=>die(holes[i],`<svg class="ch-tmk" viewBox="0 0 24 24" aria-hidden="true">${path((MK[t]||{}).d||'',(MK[t]||{}).fr,INK.cr)}</svg><i class="ch-scan"></i>`,'ch-rd ch-try ch-try'+i)).join('');
  const labs=TRY.map((t,i)=>surf(ins(q.labels[i],.06,.14,.05,.14),(w,h)=>{const cc=((MK[t]||{}).cc||'US').toLowerCase(),fh=h*.6,fw=fh*1.5;
    return fit(w-fw-h*.35,'start',T(0,h*.82,h*.74,t.toUpperCase()),h*.82)+flag(cc,w-fw,(h-fh)/2,fw,fh)},'ch-print')).join('');
  return pic(n,strip+dies+labs,[[q.strip,'ch-lx'],...q.labels.map(l=>[l,'ch-lx'])],'ch-t ch-to')}
/* ---------- the beats ---------- */
const capRank=(m,i)=>`<div class="ch-cap${m===lead?' ch-cap-g':''}"><b>No. ${i+1}</b>${m===lead?' <span>· top of the board</span>':''}</div>`;
const capTry=`<div class="ch-cap ch-cap-t"><b>No. 5?</b> <span>· not signed yet</span></div>`;
function beats(){
  if(TK==='A')return `<ol class="ch-beats ch-a">${rank.map((m,i)=>`<li class="ch-beat"><div class="ch-ink"><div class="ch-art">${capRank(m,i)}${chipNew(m,i)}</div></div></li>`).join('')}
    <li class="ch-beat ch-tb"><div class="ch-ink"><div class="ch-art">${capTry}${tryChip()}</div></div></li></ol>`;
  return `<ol class="ch-beats ch-b"><li class="ch-beat"><div class="ch-ink"><div class="ch-art"><div class="ch-cap ch-cap-g"><b>Season 1</b> <span>· the board, by P&amp;L</span></div><div class="ch-four">${rank.map((m,i)=>`<div class="ch-one">${chipOld(m,i)}</div>`).join('')}</div></div></div></li>
    <li class="ch-beat ch-tb"><div class="ch-ink"><div class="ch-art">${capTry}${tryChip()}</div></div></li></ol>`}
/* the ink filters: silkscreen (voids where the screen missed, spread, bleed, ragged edge) and laser (frosted, crisp, a faint burn halo) */
const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
 <filter id="chInk" x="-5%" y="-10%" width="110%" height="120%" color-interpolation-filters="sRGB">
  <feMorphology in="SourceGraphic" operator="dilate" radius=".35" result="sp"/>
  <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" result="n"/>
  <feDisplacementMap in="sp" in2="n" scale=".7" xChannelSelector="R" yChannelSelector="G" result="dp"/>
  <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="3" result="v"/>
  <feColorMatrix in="v" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.3 1.55" result="va"/>
  <feComposite in="dp" in2="va" operator="in" result="pr"/>
  <feGaussianBlur in="pr" stdDeviation=".28" result="bl"/>
  <feMerge><feMergeNode in="bl"/><feMergeNode in="pr"/></feMerge></filter>
 <filter id="chEtch" x="-5%" y="-10%" width="110%" height="120%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="1" seed="11" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.4 1.45" result="fr"/>
  <feComposite in="SourceGraphic" in2="fr" operator="in" result="f"/>
  <feGaussianBlur in="SourceAlpha" stdDeviation=".7" result="h"/>
  <feFlood flood-color="#3a2e22" flood-opacity=".55"/><feComposite in2="h" operator="in" result="burn"/>
  <feMerge><feMergeNode in="burn"/><feMergeNode in="f"/></feMerge></filter>
</defs></svg>`;
/* ---------- mount ---------- */
const st=D.getElementById('standings'),sec=D.createElement('section');sec.className='ch ch-'+TK+' ch-pr-'+PR;sec.setAttribute('aria-label','Meet the models');
function build(){
  sec.innerHTML=`${DEFS}<h2 class="ch-h"><span class="ch-w">Meet the</span> <span class="ch-w ch-w2">models</span></h2>
   <p class="ch-sub"><span>Ranked by season P&amp;L.</span> <span>$100K on every call.</span></p>${beats()}
   <ol class="ch-sr">${rank.map((m,i)=>`<li>No. ${i+1} ${esc(MD[m].ver)}, ${CC[FLAG[m]]}: last five ${last5(m).map(k=>k==='W'?'right':k==='L'?'wrong':'no call').join(', ')}; ${wl(m)} W-L; season P&L ${$(pnl(m))}</li>`).join('')}
    <li>${esc(WORD[TW]||WORD.ininf)}: ${TRY.map(t=>t+' ('+CC[((MK[t]||{}).cc||'US').toLowerCase()]+')').join(', ')}</li></ol>`;
  requestAnimationFrame(()=>{place(sec);verPos(sec);fitAll(sec)});wire()}
const RM=matchMedia('(prefers-reduced-motion: reduce)');let io=null;
function wire(){if(RM.matches||!('IntersectionObserver' in window)){sec.classList.add('ch-still');return}
  io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.muted=true;const p=v.play();p&&p.catch(()=>{})}else v.pause()}),{rootMargin:'80px 0px'});
  sec.querySelectorAll('video').forEach(v=>io.observe(v))}
if(st){st.before(sec);st.style.display='none'}else D.querySelector('main').append(sec);
build();addEventListener('resize',()=>place(sec));D.fonts&&D.fonts.ready.then(()=>{place(sec);verPos(sec);fitAll(sec)});
window.__ch={place:()=>{place(sec);verPos(sec);fitAll(sec)},rebuild:build,data:{rank,lead,rows:rank.map(m=>[m,pnl(m),wl(m),last5(m).join('')]),l5:L5.map(r=>r.n)}};
D.documentElement.classList.add('ch-ready');
})();
