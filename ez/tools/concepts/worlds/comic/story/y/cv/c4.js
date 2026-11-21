/* C4 · The board game. Toy blocks lead (an isometric board, four raised corner blocks, a track of squares, block lettering);
   clay soft 3D adds the puffy pieces (the playing piece, the question pill); pop adds the rays and halftone of the table; holo trading
   card adds the golden-ticket block. The loop is the board's own track: one piece goes round it, corner by corner, every round. */
(function(){const X=CV,S=X.S,P=X.P,m=X.mount('c4');if(!m)return;const {root,film,h1}=m;const L=X.last,INK=X.INK;
  root.innerHTML=`<div class="c4-tb"><div class="c4-mh"></div><div class="c4-bd" role="list" aria-label="How every round goes"></div><div class="c4-fm"></div><p class="c4-gd">${X.next()}</p></div>`;
  const mh=root.querySelector('.c4-mh'),bd=root.querySelector('.c4-bd');root.querySelector('.c4-fm').append(film);X.wire(root);
  let timer=0;
  function build(){const W=root.clientWidth,desk=W>=900,cw=desk?Math.min(640,(W-72)*.52):W-20;
    const hs=desk?66:Math.min(50,cw*.15);
    mh.innerHTML=`<span class="c4-t"></span>`;mh.querySelector('.c4-t').append(h1);
    X.head(h1,`<span class="c4-l1">${X.aisWord({size:hs*.62,fill:'gold'})}<span class="c4-q">Who calls it best?</span></span>${X.ext('TRADE',{size:hs,fill:'white',shade:'#1446c8',depth:Math.round(hs*.16)})}${X.ext('EARNINGS',{size:hs,fill:'white',shade:'#1446c8',depth:Math.round(hs*.16),max:desk?(W-72)*.46:cw-8})}`);
    /* the board, drawn in true isometric (30 degrees) */
    const s=Math.min(desk?360:230,cw*.6),c30=.866,k=s/1;const Bw=cw,ox=Bw/2,oy=desk?150:(W<360?140:118); /* oy: room above the top corner for its pieces */
    const pr=(x,y,z=0)=>[ox+(x-y)*c30,oy+(x+y)*.5-z];
    const poly=(pts,f,cls)=>`<polygon class="${cls||''}" points="${pts.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="${f}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
    const box=(x0,y0,w,h,z0,z1,top,left,right,cls)=>{const a=pr(x0,y0,z1),b=pr(x0+w,y0,z1),c=pr(x0+w,y0+h,z1),d=pr(x0,y0+h,z1),c0=pr(x0+w,y0+h,z0),d0=pr(x0,y0+h,z0),b0=pr(x0+w,y0,z0);
      return `<g class="${cls||''}">${poly([d,c,c0,d0],left)}${poly([b,c,c0,b0],right)}${poly([a,b,c,d],top)}</g>`};
    const T=Math.round(s*.27),th=desk?16:12,bt=desk?18:14;
    /* corner blocks: 1 top, 2 right, 3 bottom, 4 left (clockwise on screen) */
    const C=[[0,0],[s-T,0],[s-T,s-T],[0,s-T]];
    const COL=[['#7fc4ff','#3a8bff','#1f5fd0'],['#fff27a','#ffd21f','#e0a400'],['url(#c4holo)','#c9a2ff','#9a6cf0'],['#8af5bd','#22e087','#0b9d55']];
    /* the track: squares along the edges between the blocks */
    const n=desk?4:3,gap=(s-2*T)/n,sq=[];
    for(let i=0;i<n;i++){const u=T+gap*i+gap*.12,w=gap*.76;sq.push([u,T*.18,w,T*.64,0]);}
    for(let i=0;i<n;i++){const u=T+gap*i+gap*.12,w=gap*.76;sq.push([s-T*.82,u,T*.64,w,1]);}
    for(let i=n-1;i>=0;i--){const u=T+gap*i+gap*.12,w=gap*.76;sq.push([u,s-T*.82,w,T*.64,2]);}
    for(let i=n-1;i>=0;i--){const u=T+gap*i+gap*.12,w=gap*.76;sq.push([T*.18,u,T*.64,w,3]);}
    const SQC=['#3a8bff','#ffd21f','#c9a2ff','#22e087'];
    const track=sq.map(([x,y,w,h,e])=>box(x,y,w,h,0,4,SQC[e],'#2b2733','#15121a')).join('');
    /* the slab itself */
    const slab=box(0,0,s,s,-bt,0,'url(#c4top)','#1386a8','#0b5f7a');
    /* the centre, printed on the board: a ring of arrows and the words, set in the board's plane */
    const M=`matrix(${c30},.5,${-c30},.5,${ox},${oy})`;
    const cen=`<g transform="${M}"><circle cx="${s*.4}" cy="${s*.4}" r="${s*.2}" fill="none" stroke="#0d0b10" stroke-width="${s*.035}" stroke-dasharray="${s*.22} ${s*.094}" opacity=".85"/>
      ${[0,90,180,270].map(a=>`<path d="M${s*.6} ${s*.35}l${s*.05} ${s*.07}l${s*.05} ${-s*.07}z" fill="#0d0b10" transform="rotate(${a+20} ${s*.4} ${s*.4})"/>`).join('')}
      <text x="${s*.4}" y="${s*.39}" text-anchor="middle" font-family="Luckiest Guy" font-size="${s*.07}" fill="#fff" stroke="#0d0b10" stroke-width="${s*.012}" paint-order="stroke">EVERY</text><text x="${s*.4}" y="${s*.47}" text-anchor="middle" font-family="Luckiest Guy" font-size="${s*.07}" fill="#fff" stroke="#0d0b10" stroke-width="${s*.012}" paint-order="stroke">ROUND</text></g>`;
    const blocks=C.map(([x,y],i)=>box(x,y,T,T,0,th,COL[i][0],COL[i][1],COL[i][2],'c4-blk')).join('');
    const H=Math.round(oy+s+bt+(desk?12:6));
    const svg=`<svg class="c4-svg" width="${Bw}" height="${H}" viewBox="0 0 ${Bw} ${H}" aria-hidden="true"><defs>
      <linearGradient id="c4holo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff9ad5"/><stop offset=".3" stop-color="#ffd36a"/><stop offset=".55" stop-color="#9dffd8"/><stop offset=".8" stop-color="#8cc9ff"/><stop offset="1" stop-color="#d9a3ff"/></linearGradient>
      <pattern id="c4dot" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.3" fill="rgba(0,60,80,.28)"/></pattern>
      <linearGradient id="c4tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5ff0e6"/><stop offset="1" stop-color="#19b7c9"/></linearGradient>
      <pattern id="c4top" width="${Bw}" height="${H}" patternUnits="userSpaceOnUse"><rect width="${Bw}" height="${H}" fill="url(#c4tg)"/><rect width="${Bw}" height="${H}" fill="url(#c4dot)"/></pattern></defs>
      <ellipse cx="${ox+10}" cy="${oy+s*.5+bt+10}" rx="${s*c30*1.02}" ry="${s*.52}" fill="rgba(13,11,16,.45)"/>
      ${slab}${track}${cen}${blocks}</svg>`;
    /* pieces stand on the blocks' centres (billboards), labels sit in the four free corners of the board's box */
    const top=(i)=>{const [x,y]=C[i];return pr(x+T/2,y+T/2,th)};
    const cs=desk?30:22;
    const pieces=[
      `<span class="c4-pc c4-p1">${['GPT','KIMI','CLAUDE','GROK'].map(mm=>{const c=X.calls.find(x=>x.m===mm);return `<span class="c4-tok">${X.callExt(c,desk?17:13)}${X.coin(mm,cs,{dp:2,holo:false})}</span>`}).join('')}</span>`,
      `<span class="c4-pc c4-p2">${X.ext((L.a<0?'▼':'▲')+Math.abs(L.a).toFixed(2)+'%',{size:desk?22:17,fill:L.a<0?'red':'green'})}${X.bell(desk?62:46)}</span>`,
      `<span class="c4-pc c4-p3">${X.ticket(desk?170:Math.round(s*.5))}</span>`,
      `<span class="c4-pc c4-p4">${X.slabs(desk?96:Math.round(s*.34))}</span>`];
    const lab=(i,extra)=>`<div class="c4-lb c4-l${i+1}" role="listitem"><b class="c4-n">${i+1}</b><span>${X.STEP[i]}${extra||''}</span></div>`;
    bd.style.height=H+'px';
    bd.innerHTML=svg+pieces.map((h,i)=>{const [x,y]=top(i);return h.replace('class="c4-pc ',`style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px" class="c4-pc `)}).join('')
      +lab(0,`<small>Round ${L.n}: ${S.esc(X.co(L))}</small>`)+lab(1,`<small>${X.calls.filter(c=>c.pass).length} pass · ${X.calls.filter(c=>!c.pass).length} fail</small>`)+lab(2)+lab(3,`<small>${X.R.length} rounds so far</small>`)
      +`<span class="c4-pawn" aria-hidden="true"><i></i></span>`;
    /* the one moving thing: a clay piece hops round the track, corner block to corner block */
    const pawn=bd.querySelector('.c4-pawn');const stops=sq.map(q=>pr(q[0]+q[2]/2,q[1]+q[3]/2,4));
    let k2=0;const place=()=>{const [x,y]=stops[k2%stops.length];pawn.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`};
    pawn.style.display='none';
    clearInterval(timer);
    if(!S.rm()){pawn.style.display='';k2=1;place();timer=setInterval(()=>{if(!pawn.isConnected){clearInterval(timer);return}k2++;place();pawn.firstChild.animate([{translate:'0 0'},{translate:'0 -9px'},{translate:'0 0'}],{duration:420,easing:'ease-out'})},1100)}
  }
  build();let lw=root.clientWidth;new ResizeObserver(()=>{const w=root.clientWidth;if(Math.abs(w-lw)>2){lw=w;build()}}).observe(root);
  X.ready('c4')})();
