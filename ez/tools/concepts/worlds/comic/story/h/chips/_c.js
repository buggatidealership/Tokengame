/* Round H17 · chips: Meet the models as chips, in the exchange world, laid over the built v46-live-x2plus.html.
   The models are what trades, so each is drawn as a chip; the founder caricature's living loop plays inside its die, behind the
   glass (the painting's own reflection is laid back over the video with a screen blend), never the focal point.
   window.__CH picks the layout:
     A  one chip per model, one beat each (new school package; the leader's chip painted lit, gold rays like the bet's chip)
     B  two chips per beat (old school 1970s EPROMs: the founder seen through the quartz window)
     B2 two chips per beat, new school packages side by side
     C  one big chip, four dies (one per model), the leader's die lit gold
   Every live word sits on a surface the painting left blank: an SVG (or the video) in the surface's own box, mapped onto its four
   painted corners with one matrix3d (quads.json, measure.py). Data: __x2pPnl (P&L = balance - $100,000, W-L), MODELS (mark, version).
   X2+'s own standings section (#standings) is hidden; everything else on the page is untouched. */
(function(){
const D=document,TK=window.__CH||'A',IMG='tools/concepts/worlds/comic/story/h/chips/img/',Q=window.__CHQ;
if(!D.getElementById('t1-fonts')){const l=D.createElement('link');l.id='t1-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bangers&family=Shantell+Sans:wght@600;700&display=block';D.head.appendChild(l)}
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},FLAG={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---------- live data ---------- */
const A=window.__x2pPnl().A,MD=window.MODELS||{};
const rank=Object.keys(A).filter(m=>MD[m]).sort((a,b)=>A[b].bal-A[a].bal),lead=rank[0];
const pnl=m=>A[m].bal-100000,$=v=>(v<0?'-':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const $k=v=>(v<0?'-':'+')+'$'+(Math.abs(v)/1000).toFixed(Math.abs(v)<10000?1:0)+'K';
const wl=m=>A[m].W+'-'+A[m].L,ver=m=>(MD[m].ver||'').replace(/^GPT-/,'');
const UPC='#46e88a',DNC='#ff5a4e',CR='#f8f0d9';
/* ---------- drawing helpers (svg in the surface's own px) ---------- */
const T=(x,y,s,t,o={})=>`<text x="${x}" y="${y}" font-size="${s}" ${o.a?`text-anchor="${o.a}"`:''} fill="${o.c||CR}" class="${o.cls||''}" ${o.ls?`letter-spacing="${o.ls}"`:''}>${esc(t)}</text>`;
const mark=(m,x,y,s,col)=>{const M=MD[m]||{};return `<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 24 24"><path d="${M.d||''}" fill="${col}" ${M.fr?`fill-rule="${M.fr}"`:''}/>${M.dot?`<path d="${M.dot}" fill="${col}"/>`:''}</svg>`};
/* a flag, drawn (no emoji): US = 13 stripes and a canton; CN = red with one large and four small gold stars */
const star=(cx,cy,r,rot=0)=>{let p='';for(let i=0;i<10;i++){const a=rot+Math.PI*i/5-Math.PI/2,rr=i%2?r*.42:r;p+=(i?'L':'M')+(cx+rr*Math.cos(a)).toFixed(2)+' '+(cy+rr*Math.sin(a)).toFixed(2)}return p+'Z'};
const flag=(c,x,y,w,h)=>{let s=`<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 30 20" preserveAspectRatio="none">`;
  if(c==='us'){s+='<rect width="30" height="20" fill="#f4eee0"/>';for(let i=0;i<7;i++)s+=`<rect y="${i*20/6.5}" width="30" height="${20/13}" fill="#b8202a"/>`;s+='<rect width="13" height="10.8" fill="#1d2f6b"/>';
    for(let r=0;r<4;r++)for(let k=0;k<5;k++)s+=`<circle cx="${1.5+k*2.5+(r%2)*1.2}" cy="${1.6+r*2.5}" r=".55" fill="#f4eee0"/>`}
  else{s+='<rect width="30" height="20" fill="#d42a1e"/>'+`<path d="${star(5,5,3)}" fill="#ffd21f"/>`;[[10,2],[12,4],[12,7],[10,9]].forEach(([a,b])=>s+=`<path d="${star(a,b,1,.6)}" fill="#ffd21f"/>`)}
  return s+'<rect width="30" height="20" fill="none" stroke="#0d0b10" stroke-width=".8"/></svg>'};
const fit=(t,w,max,k=.47)=>Math.min(max,w/(String(t).length*k));
/* ---------- homography: rect (0,0,w,h) -> quad (TL,TR,BR,BL) ---------- */
function m3d(w,h,q){const s=[[0,0],[w,0],[w,h],[0,h]],M=[],B=[];
  for(let i=0;i<4;i++){const[x,y]=s[i],[u,v]=q[i];M.push([x,y,1,0,0,0,-u*x,-u*y]);B.push(u);M.push([0,0,0,x,y,1,-v*x,-v*y]);B.push(v)}
  for(let c=0;c<8;c++){let p=c;for(let r=c+1;r<8;r++)if(Math.abs(M[r][c])>Math.abs(M[p][c]))p=r;[M[c],M[p]]=[M[p],M[c]];[B[c],B[p]]=[B[p],B[c]];
    for(let r=0;r<8;r++)if(r!==c){const f=M[r][c]/M[c][c];for(let k=c;k<8;k++)M[r][k]-=f*M[c][k];B[r]-=f*B[c]}}
  const[a,b,c,d,e,f,g,hh]=B.map((v,i)=>v/M[i][i]);return `matrix3d(${a},${d},0,${g},${b},${e},0,${hh},0,0,1,0,${c},${f},0,1)`}
const L2=(p,r)=>Math.hypot(p[0]-r[0],p[1]-r[1]);
const box=q=>[(L2(q[0],q[1])+L2(q[3],q[2]))/2,(L2(q[0],q[3])+L2(q[1],q[2]))/2];
/* a text surface */
function surf(q,draw,cls){const[bw,bh]=box(q);
  return `<div class="ch-sf ${cls||''}" data-q='${JSON.stringify(q)}' data-bw="${bw}" data-bh="${bh}"><svg viewBox="0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}" width="${bw}" height="${bh}" aria-hidden="true">${draw(bw,bh)}</svg></div>`}
/* a die: the founder's loop in the glass box, the painting's own reflection laid back over it (screen) */
const vid=m=>{const b='media/founder-'+m.toLowerCase()+'-anim';return `<video muted loop playsinline preload="metadata" poster="${b}.jpg" aria-hidden="true" tabindex="-1"><source src="${b}.mp4" type="video/mp4"><source src="${b}.webm" type="video/webm"></video>`};
function die(q,m,round){const[bw,bh]=box(q);
  return `<div class="ch-sf ch-die${round?' ch-rd':''}" data-q='${JSON.stringify(q)}' data-bw="${bw}" data-bh="${bh}" style="width:${bw}px;height:${bh}px">${vid(m)}<i class="ch-tint"></i></div>`}
/* the painting, cropped to cr=[x,y,w,h] (painting px); hl = the glass regions whose painted reflection goes back over the videos */
function pic(src,iw,ih,cr,layers,hl,cls){const[cx,cy,cw,ch]=cr;
  const im=(c,st)=>`<img class="${c}" src="${IMG+src}" alt="" draggable="false" style="width:${(iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%;${st||''}">`;
  const pct=([x,y])=>`${((x-cx)/cw*100).toFixed(3)}% ${((y-cy)/ch*100).toFixed(3)}%`;
  const hls=(hl||[]).map(h=>h.c?im('ch-hl',`clip-path:ellipse(${(h.c[2]/cw*100).toFixed(3)}% ${(h.c[3]/ch*100).toFixed(3)}% at ${pct(h.c)})`):im('ch-hl',`clip-path:polygon(${h.map(pct).join(',')})`)).join('');
  return `<div class="ch-pic ${cls||''}" data-iw="${cw}" data-cx="${cx}" data-cy="${cy}" style="aspect-ratio:${cw}/${ch}"><div class="ch-mv">${im('ch-base')}${layers}${hls}</div></div>`}
function place(root){root.querySelectorAll('.ch-pic').forEach(p=>{const k=p.clientWidth/+p.dataset.iw,cx=+p.dataset.cx,cy=+p.dataset.cy;
  p.querySelectorAll('.ch-sf').forEach(s=>{const q=JSON.parse(s.dataset.q).map(([x,y])=>[(x-cx)*k,(y-cy)*k]);s.style.transform=m3d(+s.dataset.bw,+s.dataset.bh,q)})})}
/* inset a quad by fractions (l,t,r,b) of its own box: the glass inside a bezel, the printable part of a label */
const ins=(q,l,t,r,b)=>{const lerp=(p,o,f)=>[p[0]+(o[0]-p[0])*f,p[1]+(o[1]-p[1])*f];
  const top=[lerp(q[0],q[1],l),lerp(q[0],q[1],1-r)],bot=[lerp(q[3],q[2],l),lerp(q[3],q[2],1-r)];
  return [lerp(top[0],bot[0],t),lerp(top[1],bot[1],t),lerp(top[1],bot[1],1-b),lerp(top[0],bot[0],1-b)]};
/* ---------- the chips ---------- */
const pc=m=>pnl(m)>=0?UPC:DNC;
/* new school: die = the loop; gold pad = the mark struck into the gold; white label = the flag printed on it; black label = silkscreen */
function chipNew(m,i){const k=m.toLowerCase(),lit=m===lead,n=`n-${k}-${lit?'lit':'dim'}`,q=Q[n];
  const dq=ins(q.die,.035,.035,.035,.035);
  const label=surf(ins(q.label,.03,.08,.03,.08),(w,h)=>{const fs=h*.62,y=h*.74,
      nm=NM[m].toUpperCase(),v=ver(m).replace(new RegExp('^'+NM[m]+' ?','i'),'').toUpperCase();
    return T(w*.02,y,fs,nm,{cls:'ch-an ch-silk'})+T(w*.02+nm.length*fs*.47+fs*.3,y,fs*.55,v,{c:'#cfc6ad',cls:'ch-an ch-silk'})
      +T(w*.62,y,fs*.72,wl(m),{a:'middle',cls:'ch-an ch-silk'})+T(w*.98,y,fs,$(pnl(m)),{a:'end',c:pc(m),cls:'ch-an ch-silk ch-pl'})},'ch-silkf');
  const pad=surf(ins(q.pad,.12,.08,.12,.08),(w,h)=>{const s=Math.min(w,h)*.92;return mark(m,(w-s)/2,(h-s)/2,s,'#3a2606')},'ch-gold');
  const tag=surf(ins(q.tag,.05,.1,.05,.1),(w,h)=>{const fh=h*.86,fw=Math.min(w*.5,fh*1.5);return flag(FLAG[m],(w-fw)/2,(h-fh)/2,fw,fh)},'ch-print');
  return pic(n+'.jpg',1024,1024,[44,lit?14:36,936,936],die(dq,m)+label+pad+tag,[dq],'ch-n'+(lit?' ch-lead':''))}
/* old school: the founder through the round quartz window; left label = mark, name, version, flag; right label = W-L and P&L */
function chipOld(m){const k=m.toLowerCase(),lit=m===lead,n=`o-${k}-${lit?'lit':'dim'}`,q=Q[n],[wx,wy,rx,ry]=q.win,r=.83;
  const wq=[[wx-rx*r,wy-ry*r],[wx+rx*r,wy-ry*r],[wx+rx*r,wy+ry*r],[wx-rx*r,wy+ry*r]];
  const left=surf(ins(q.left,.07,.1,.06,.1),(w,h)=>{const s=h*.5,nm=NM[m].toUpperCase(),fs=fit(nm,w-s*1.25,h*.42);
    return mark(m,0,h*.06,s,CR)+T(s*1.2,h*.46,fs,nm,{cls:'ch-an ch-silk'})+T(0,h*.86,h*.24,ver(m).toUpperCase(),{c:'#cfc6ad',cls:'ch-an ch-silk'})+flag(FLAG[m],w-h*.42,h*.66,h*.39,h*.26)},'ch-silkf');
  const right=surf(ins(q.right,.06,.1,.07,.1),(w,h)=>T(w,h*.32,h*.26,wl(m)+' W-L',{a:'end',c:'#cfc6ad',cls:'ch-an ch-silk'})+T(w,h*.9,fit($(pnl(m)),w,h*.5),$(pnl(m)),{a:'end',c:pc(m),cls:'ch-an ch-silk ch-pl'}),'ch-silkf');
  return pic(n+'.jpg',1280,720,[112,lit?92:150,1056,lit?440:380],die(wq,m,1)+left+right,[{c:[wx,wy,rx*r,ry*r]}],'ch-o'+(lit?' ch-lead':''))}
/* the big chip: four dies in P&L order (row by row), each with its label under it; the leader's die lit gold */
function bigChip(wide){const n=wide?'b-wide':'b-tall',q=Q[n];
  const dq=q.dies.map(d=>ins(d,.02,.02,.02,.02));
  const lay=rank.map((m,i)=>die(dq[i],m)+surf(ins(q.labels[i],.05,.1,.05,.1),(w,h)=>{const s=h*.46,nm=NM[m].toUpperCase();
     return mark(m,0,h*.02,s,CR)+T(s*1.25,h*.42,h*.4,nm,{cls:'ch-an ch-silk'})+flag(FLAG[m],w-h*.6,h*.06,h*.54,h*.36)
       +T(0,h*.96,h*.4,wl(m),{cls:'ch-an ch-silk'})+T(w,h*.96,h*.44,$(pnl(m)),{a:'end',c:pc(m),cls:'ch-an ch-silk ch-pl'})},'ch-silkf')).join('');
  /* the leader's die: a gold light round its bezel (a code light, the one thing not painted; see REPORT) */
  const ring=(()=>{const g=ins(q.dies[0],-.09,-.09,-.09,-.09),[bw,bh]=box(g);return `<div class="ch-sf ch-ring" data-q='${JSON.stringify(g)}' data-bw="${bw}" data-bh="${bh}" style="width:${bw}px;height:${bh}px"></div>`})();
  return pic(n+'.jpg',wide?1280:768,wide?720:1024,wide?[226,150,830,370]:[176,262,420,505],ring+lay,dq,'ch-big')}
/* ---------- the beats ---------- */
const capRank=(m,i)=>`<div class="ch-cap${m===lead?' ch-cap-g':''}"><b>No. ${i+1}</b>${m===lead?' <span>· top of the board</span>':''}</div>`;
function beats(){
  if(TK==='A')return `<ol class="ch-beats ch-a">${rank.map((m,i)=>`<li class="ch-beat"><div class="ch-ink"><div class="ch-art">${capRank(m,i)}${chipNew(m,i)}</div></div></li>`).join('')}</ol>`;
  if(TK==='B'||TK==='B2'){const pairs=[[rank[0],rank[1]],[rank[2],rank[3]]],caps=['The race for No. 1','Chasing'];
    return `<ol class="ch-beats ch-b${TK==='B2'?' ch-b2':''}">${pairs.map((p,j)=>`<li class="ch-beat"><div class="ch-ink"><div class="ch-art"><div class="ch-cap${j?'':' ch-cap-g'}"><b>${caps[j]}</b></div><div class="ch-pair">${p.map((m,i)=>`<div class="ch-one"><span class="ch-no">${j*2+i+1}</span>${TK==='B'?chipOld(m):chipNew(m)}</div>`).join('')}</div></div></div></li>`).join('')}</ol>`}
  const wide=innerWidth>=900;
  return `<div class="ch-beats ch-c"><div class="ch-ink"><div class="ch-art"><div class="ch-cap ch-cap-g"><b>One chip, four dies</b> <span>· ranked by season P&L</span></div>${bigChip(wide)}</div></div></div>`}
/* ---------- mount ---------- */
const st=D.getElementById('standings'),sec=D.createElement('section');sec.className='ch ch-'+TK;sec.setAttribute('aria-label','Meet the models');
function build(){
  sec.innerHTML=`<h2 class="ch-h"><span class="ch-w">Meet the</span> <span class="ch-w ch-w2">models</span></h2>
   <p class="ch-sub"><span>Ranked by season P&amp;L.</span> <span>$100K on every call.</span></p>${beats()}
   <ol class="ch-sr">${rank.map((m,i)=>`<li>No. ${i+1} ${esc(MD[m].ver)}, ${FLAG[m]==='us'?'United States':'China'}: ${wl(m)} W-L, season P&L ${$(pnl(m))}</li>`).join('')}</ol>`;
  requestAnimationFrame(()=>place(sec));wire()}
/* the loops: play only while on screen, never with reduced motion (the poster is the still frame) */
const RM=matchMedia('(prefers-reduced-motion: reduce)');let io=null;
function wire(){const vs=[...sec.querySelectorAll('video')];if(RM.matches||!('IntersectionObserver' in window))return;
  io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.muted=true;const p=v.play();p&&p.catch(()=>{})}else v.pause()}),{rootMargin:'80px 0px'});vs.forEach(v=>io.observe(v))}
if(st){st.before(sec);st.style.display='none'}else D.querySelector('main').append(sec);
build();let lw=innerWidth;addEventListener('resize',()=>{if(TK==='C'&&(innerWidth>=900)!==(lw>=900)){lw=innerWidth;build()}else place(sec)});
D.fonts&&D.fonts.ready.then(()=>place(sec));
window.__ch={place:()=>place(sec),rebuild:build,data:{rank,lead,pnl:rank.map(m=>[m,pnl(m),wl(m)])}};
D.documentElement.classList.add('ch-ready');
})();
