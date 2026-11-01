/* ---------- beat 2: the four frames (round H23 quad4: zoom-ins at 2K, the readouts big, every figure lit in its glass) ----------
   Paintings: media/top-h23-{call,close,ledger,board}.jpg, each the crop cr of a 2048 px painting, exported square (1200 px; board 960).
   Quads and crops are in the 2048 painting's px minus the crop's origin (so the crop's own px), measured on the paintings (quad4/quads.json). */
const Q4=__Q4JSON__;
const IMQ='media/';
const em=(c)=>c==='up'?'url(#q4up)':c==='dn'?'url(#q4dn)':c==='gd'?'url(#q4gd)':'url(#q4em)';
const TX=(x,y,s,t,o={})=>`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}" ${o.a?`text-anchor="${o.a}"`:''} fill="${o.f||em()}" class="t4-an q4-tx ${o.cls||''}" ${o.ls?`letter-spacing="${o.ls}"`:''}>${esc(t)}</text>`;
const mn=s=>String(s).replace(/^-/,'−');
const tw=(t,f)=>String(t).length*f*.47;
/* the glass's own glare and reflections, cut from the painting itself and laid back over the lit text (screen) */
function glare(k){const v=Q4[k],[,,cw,ch]=v.crop;return `<img class="q4-gl" src="${IMQ+v.file}" alt="" draggable="false" style="width:100%;left:0;top:0;clip-path:polygon(${v.q.map(q=>q.map(([x,y])=>`${(x/cw*100).toFixed(2)}% ${(y/ch*100).toFixed(2)}%`).join(',')).join(',')})">`}
/* a polygon clip per quad needs one polygon; several quads: one img per quad */
function glares(k){const v=Q4[k],[,,cw,ch]=v.crop;return v.q.map(q=>`<img class="q4-gl" src="${IMQ+v.file}" alt="" draggable="false" style="width:100%;left:0;top:0;clip-path:polygon(${q.map(([x,y])=>`${(x/cw*100).toFixed(2)}% ${(y/ch*100).toFixed(2)}%`).join(',')})">`).join('')}
const scan=(w,h)=>`<i class="q4-scan"></i>`;
/* CALL: each die a lit display: the AI's mark and name, then its call, the face of the die */
const dieQ4=c=>(w,h)=>{const s=h*.165,f1=h*.17,nm=NM[c.m].toUpperCase(),tot=s+f1*.28+tw(nm,f1),x0=w/2-tot/2,t=(c.up?'+':'−')+c.v+'%',f2=Math.min(h*.36,w*.86/(t.length*.47));
  /* the die's content sits low (the call, then the AI under it): "How a round works" and the frame's caption cross the top of the first row */
  return `<g class="q4-g">`+TX(w/2,h*.74,f2,t,{a:'middle',f:em(c.up?'up':'dn'),cls:'q4-big'})+mark(c.m,x0,h*.93-s*.86,s)+TX(x0+s+f1*.28,h*.93,f1,nm)+`</g>`};
/* CLOSE: the readout fills the frame: company and ticker, the move, who wins */
const readQ4=(w,h)=>{const co=(EX.co+' ('+EX.ticker+')').toUpperCase(),W=wins(EX),wn=W[0],one=W.length===1,wt=one?NM[wn].toUpperCase()+' WINS':W.length?W.map(m=>NM[m].toUpperCase()).join(' & ')+' TIE':'NOBODY WINS',
  f1=Math.min(h*.17,w*.78/(co.length*.47)),mv=mn(EX.out),f2=Math.min(h*.42,w*.6/(mv.length*.47)),f3=Math.min(h*.16,w*.6/(wt.length*.47)),ms=f3*1.15,tt=(one?ms+f3*.3:0)+tw(wt,f3),x0=w/2-tt/2;
  return `<g class="q4-g">`+TX(w/2,h*.27,f1,co,{a:'middle'})+TX(w/2,h*.66,f2,mv,{a:'middle',f:em(EX.a>0?'up':'dn'),cls:'q4-big'})
   +(one?mark(wn,x0,h*.9-f3*.95,ms):'')+TX(x0+(one?ms+f3*.3:0),h*.9,f3,wt,{f:em('gd')})+`</g>`};
/* LEDGER: rows of the record. Row: line 1 round + ticker, the move on the right; line 2 the company, the winner on the right */
/* the winners of a round: none, one, or a tie (the sheet joins tied winners with " & ") */
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>NM[m]);
const rowQ4=(r,cls)=>(w,h)=>{const f=h*.3,mv=r.a>0?'up':'dn',W=wins(r),co=String(r.co).toUpperCase(),ws=f*.95,
   avail=w*.86,wl0=W.length===1?NM[W[0]].toUpperCase():W.length?'TIE':'NOBODY',fit2=wl=>{const ww=W.length*(ws+f*.2)+(wl?tw(wl,f*.9):0);return [ww,Math.min(f,(avail-ww-f*.4)/(co.length*.47))]};
   /* the winner's name goes when the company would have to shrink below .82 of the row's type: its mark stays (a word only for a tie or nobody) */
   let wl=wl0,[ww,f2]=fit2(wl);if(f2<f*.82&&W.length){wl='';[ww,f2]=fit2('')}
   return `<g class="q4-g ${cls}">`+TX(w*.05,h*.42,f,'R'+r.n,{f:em('gd')})+TX(w*.05+tw('R'+r.n+'  ',f),h*.42,f,r.ticker||'')+TX(w*.95,h*.42,f,mn(r.out),{a:'end',f:em(mv)})
    +TX(w*.05,h*.84,f2,co)+W.map((m,i)=>mark(m,w*.95-ww+i*(ws+f*.2),h*.84-ws*.82,ws)).join('')+(wl?TX(w*.95,h*.84,f*.9,wl,{a:'end',f:em('gd')}):'')+`</g>`};
const rowNext=(w,h)=>{const f=h*.3,n=EX.n+1;return `<g class="q4-g q4-nx">`+TX(w*.05,h*.42,f,'R'+n,{f:em('gd')})+`<rect class="q4-cur" x="${(w*.05+tw('R'+n+'  ',f)).toFixed(1)}" y="${(h*.42-f*.74).toFixed(1)}" width="${(f*.42).toFixed(1)}" height="${(f*.78).toFixed(1)}" fill="url(#q4em)"/></g>`};
function ledgerQ4(){const prev=G.slice(Math.max(0,iEx-2),iEx),q=Q4.ledger.q,S=[];
  prev.forEach((r,i)=>S.push(surf(q[i+(2-prev.length)],rowQ4(r,'q4-old'),'q4-glass q4-row')));
  S.push(surf(q[2],rowQ4(EX,'q4-new'),'q4-glass q4-row',scan));S.push(surf(q[3],rowNext,'q4-glass q4-row'));return S}
/* BOARD: the gold lid, the leader's mark and name stamped into the metal (multiplied, a pale lip under each stroke) */
const lidQ4=lip=>(w,h)=>{const nm=NM[lead].toUpperCase(),s=h*.24,f=Math.min(h*.3,(w*.62)/(nm.length*.47)),tot=s+f*.3+tw(nm,f),x0=w/2-tot/2,y=h*.55;
  const body=(fill,dy)=>`<g transform="translate(0 ${dy.toFixed(1)})">`+mark(lead,x0,y-s*.86,s,fill)+`<text x="${(x0+s+f*.3).toFixed(1)}" y="${y.toFixed(1)}" font-size="${f.toFixed(1)}" fill="${fill}" class="t4-an">${esc(nm)}</text></g>`;
  return lip?`<g filter="url(#q4etch)">${body('#fff6cf',h*.007)}</g>`:`<g filter="url(#q4etch)">${body('#4a2c06',0)}</g>`};
const crQ=k=>{const[,,cw,ch]=Q4[k].crop;return [0,0,cw,ch]};
const picQ=(k,S,cls,extra)=>{const[,,cw,ch]=Q4[k].crop;return pic(IMQ+Q4[k].file,cw,ch,S,cls,extra,[0,0,cw,ch])};
function frames(){const cap=t=>`<div class="t4-cap">${t}</div>`;
  const F={call:{w:'CALL',k:'call',l:LINES.call,cap:`R${EX.n} · ${esc(EX.co)} (${EX.ticker}) · ${md(EX.called)}`,
    p:picQ('call',calls.map((c,i)=>surf(Q4.call.q[i],dieQ4(c),'q4-glass q4-die q4-d'+i,scan)),'',glares('call'))},
   close:{w:'CLOSE',k:'close',l:LINES.close,cap:`At the close · ${md(EX.resolves)}`,
    p:picQ('close',[surf(Q4.close.q[0],readQ4,'q4-glass q4-rd',scan)],'',glares('close')+at(-40,-120,300,300,'q4-ring')+at(-40,-120,300,300,'q4-ring r2'))},
   ledger:{w:'LEDGER',k:'ledger',l:LINES.ledger,cap:`Round ${EX.n} · ${md(EX.resolves)}`,
    p:picQ('ledger',ledgerQ4(),'',glares('ledger'))},
   board:{w:'BOARD',k:'board',l:LINES.board,cap:'Top of the board',
    p:picQ('board',[surf(Q4.board.q[0],lidQ4(1),'q4-lid q4-lip'),surf(Q4.board.q[0],lidQ4(0),'q4-lid q4-eng'),surf(Q4.board.q[0],()=>'','q4-lid q4-sheen')],'','')}};
  return ['call','close','ledger','board'].map(k=>F[k]).map((f,i)=>`<li class="t4-fr q4-fr q4-${f.k} t4-on" tabindex="0" role="button" aria-label="${i+1} ${f.w}: ${esc(f.l)}"><div class="t4-ink"><div class="t4-art">${cap(f.cap)}${f.p}</div></div>${sub(i+1,f.w)}<p class="t4-ln">${lh(f.l)}</p></li>`).join('')}
/* the glow and bloom are drawn in the screen's px: each painting carries its scale k (CSS px per painting px) as --k */
function q4k(root){root.querySelectorAll('.q4-fr .t4-pic').forEach(p=>{const k=p.clientWidth/+p.dataset.iw;if(k)p.style.setProperty('--k',k.toFixed(5))})}
