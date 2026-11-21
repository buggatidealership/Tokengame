/* Take A · The analyst's terminal. A 1983 analyst's desk; the evaluation runs on the early computer's CRT. The chart is drawn in
   real pixels (a low-resolution canvas shown with nearest-neighbour scaling, every glyph thresholded to hard pixels, so it is crisp
   pixel art at any zoom), mapped onto the painted glass with one homography, the CRT's own glow and scanlines on it and the lamp's
   reflection in the glass screened over the marks. The switch is the keyboard: F1 hit rate, F2 P&L, F5 to F7 the window, as painted
   keys you press (each also mirrored in the screen's menu bar, which is tappable too). */
(function(){
const PX=8;/* font cell */
const KEYS_P=[[202,'F1','mode:hit','Hit rate'],[252,'F2','mode:pnl','P&L'],[350,'F5','win:season','Season'],[397,'F6','win:d7','Last 7 days'],[443,'F7','win:d1','Last 24 hours']];
const KEYS_W=[[401,'F1','mode:hit','Hit rate'],[440,'F2','mode:pnl','P&L'],[540,'F5','win:season','Season'],[576,'F6','win:d7','Last 7 days'],[609,'F7','win:d1','Last 24 hours']];
window.HDT={id:'a',title:'The analyst’s terminal',
paint:{phone:{src:'a-3x4.jpg',hl:'a-3x4-hl.jpg',iw:768,ih:1024,Q:[[[229,150],[620,148],[617,462],[226,458]]],
    crop:W=>{const s=W*.82/391,dw=768*s;return {w:dw,ox:423*s-W/2,top:.085,bot:.70}},
    hot:KEYS_P.map(k=>({x:k[0],y:622,w:40,h:21,set:k[2],label:k[1]+' '+k[3],key:k[1]}))},
  wide:{src:'a-16x9.jpg',hl:'a-16x9-hl.jpg',iw:1280,ih:720,Q:[[[380,80],[948,78],[942,438],[384,438]]],
    crop:W=>{const s=.6*W/566;return {w:1280*s,ox:664*s-W/2,top:.075,bot:.79}},
    hot:KEYS_W.map(k=>({x:k[0],y:532,w:34,h:20,set:k[2],label:k[1]+' '+k[3],key:k[1]}))}},
draw(root,surf,st,d,o){
  /* keycap legends: printed on the painted caps */
  root.querySelectorAll('.hd-k').forEach((b,i)=>{const k=(o.wide?KEYS_W:KEYS_P)[i];b.innerHTML=`<i>${k[1]}</i>`});
  const el=surf[0],px=o.wide?2.1:1.6,cw=Math.round(el.w/px),ch=Math.round(el.h/px);
  const c=document.createElement('canvas');c.width=cw;c.height=ch;c.className='hda-cv';el.innerHTML='';el.appendChild(c);
  const g=c.getContext('2d');g.imageSmoothingEnabled=false;
  const C={bg:'#06140d',dim:'#1f5c3a',fg:'#9ef0b8',gold:'#fdbc2a',red:'#ff5a4a',inv:'#04070e'};
  /* text into a scratch canvas, then hard-thresholded onto the screen */
  const T=document.createElement('canvas');T.width=cw;T.height=ch;const tg=T.getContext('2d');
  const txt=(s,x,y,col,inv)=>{tg.clearRect(0,0,cw,ch);tg.font=PX+'px "Press Start 2P"';tg.textBaseline='top';tg.fillStyle='#fff';tg.fillText(s,x,y);
    const a=tg.getImageData(0,0,cw,ch),b=g.getImageData(0,0,cw,ch),[r,gg,bb]=hex(col);
    for(let i=3;i<a.data.length;i+=4)if(a.data[i]>=110){b.data[i-3]=r;b.data[i-2]=gg;b.data[i-1]=bb;b.data[i]=255}else if(inv&&a.data[i]<110&&false){}
    g.putImageData(b,0,0);return s.length*PX};
  const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
  const box=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h)};
  const plot=(x,y,col)=>{g.fillStyle=col;g.fillRect(x|0,y|0,1,1)};
  const line=(x0,y0,x1,y1,col,th)=>{x0|=0;y0|=0;x1|=0;y1|=0;const dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1;let e=dx+dy;
    for(;;){plot(x0,y0,col);if(th)plot(x0,y0+1,col);if(x0===x1&&y0===y1)break;const e2=2*e;if(e2>=dy){e+=dy;x0+=sx}if(e2<=dx){e+=dx;y0+=sy}}};
  const pnl=st.mode==='pnl',chars=Math.floor(cw/PX);
  /* title bar, reverse video */
  box(0,0,cw,PX+3,C.gold);
  const ttl=chars>=30?'SMART OR LUCKY? EVAL.EXE':'SMART OR LUCKY?';const rn='R'+(pnl&&d.w&&d.w.last?d.w.last.n:HD.HIT.last.n);
  txt(ttl,2,2,C.inv);txt(rn,cw-rn.length*PX-2,2,C.inv);
  const sub=pnl?(d.w.full+(chars>=26?' · $100K/CALL':'')).toUpperCase():(chars>=26?'HIT RATE · ROUND BY ROUND':'HIT RATE BY ROUND');
  txt(sub.replace('·','-').slice(0,chars),0,PX+6,C.fg);
  /* plot box */
  const yl=pnl?[d.hi,d.base,d.lo].map((v,i)=>i===1?'$0':PN.$k(v).replace('−','-')):['80%','50%','30%'];const lw=Math.max(...yl.map(s=>s.length))*PX+3;
  const legRows=o.wide?0:2,menuH=(pnl?2:1)*(PX+4)+2,x0=lw,x1=cw-(o.wide?14*PX:3),y0=PX*2+12,y1=ch-menuH-(legRows*(PX+3))-PX-8;
  const Y=v=>y1-(v-d.lo)/(d.hi-d.lo)*(y1-y0),n=d.n||1,X=i=>x0+i/n*(x1-x0);
  /* dotted grid rows every 10% (hit) or at the tick values */
  const gr=pnl?PN.ticks(d.lo,d.hi,4):[.3,.4,.5,.6,.7,.8];gr.forEach(v=>{for(let x=x0;x<=x1;x+=3)plot(x,Y(v),C.dim)});
  for(let y=y0;y<=y1;y+=3)plot(x0-1,y,C.dim);
  /* the coin flip / break even: a dashed gold row */
  for(let x=x0;x<=x1;x++)if((x>>1)%2===0)plot(x,Y(d.base),C.gold);
  txt(yl[0],0,Y(pnl?d.hi:.8)-3,C.fg);txt(yl[1],0,Y(d.base)-3,C.gold);txt(yl[2],0,Y(pnl?d.lo:.3)-3,C.fg);
  const bl=pnl?'BREAK EVEN':'COIN FLIP';box(x0+2,Y(d.base)+2,bl.length*PX+3,PX+2,C.bg);txt(bl,x0+3,Y(d.base)+3,C.gold);
  /* the lines, leader last and doubled */
  d.rank.slice().reverse().forEach(m=>{const s=d.ser[m],lead=m===d.rank[0],col=HD.scr[m];for(let i=1;i<s.length;i++)line(X(i-1),Y(s[i-1]),X(i),Y(s[i]),col,lead);
    const ex=X(s.length-1),ey=Y(s[s.length-1]);box(ex-1,ey-1,3,3,col)});
  /* x axis: rounds */
  const r0=pnl?(d.w.first?'R'+d.w.first.n:''):'START',r1=pnl?(d.w.last?'R'+d.w.last.n:''):'R'+HD.HIT.last.n;
  txt(r0,x0,y1+4,C.dim);txt(r1,x1-r1.length*PX,y1+4,C.dim);
  if(pnl&&!d.n)txt('NO CLOSE YET',x0+4,y0+8,C.fg);
  /* labels: at the line ends (wide) or as a ranked legend (phone) */
  if(o.wide){const L=PN.spread(d.rank.map(m=>({m,y:Y(d.end(m))-3})),PX+2,y0,y1-PX);
    L.forEach(l=>{const v=d.fmt(d.end(l.m)).replace('−','-');txt(PN.NM[l.m].toUpperCase().slice(0,6),x1+5,l.y,HD.scr[l.m]);txt(v,x1+5+7*PX,l.y,HD.scr[l.m])});}
  else{const ly=y1+PX+6,E=d.rank.map(m=>PN.NM[m].toUpperCase().slice(0,6)+' '+d.fmt(d.end(m)).replace('\u2212','-')),c2=Math.max(E[0].length,E[2].length)+1;
    d.rank.forEach((m,i)=>txt(E[i],(i%2)*c2*PX,ly+(i>>1)*(PX+3),HD.scr[m]))}
  /* the menu bar: function keys, the open one in reverse video */
  const items=[['F1','HIT RATE','mode:hit'],['F2','P&L','mode:pnl']],wins=[['F5','SEASON','win:season'],['F6','7D','win:d7'],['F7','24H','win:d1']];
  const hot=[];const bar=(arr,y)=>{let x=0;arr.forEach(([k,l,set])=>{const s=k+' '+l,w=s.length*PX+4,on=st[set.split(':')[0]]===set.split(':')[1];
      if(on){box(x,y-1,w,PX+3,C.fg);txt(s,x+2,y+1,C.inv)}else txt(s,x+2,y+1,C.fg);hot.push({x,y:y-1,w,h:PX+3,set,lab:l});x+=w+PX})};
  const my=ch-menuH+2;if(pnl)bar(wins,my);bar(items,ch-PX-4);
  /* the cursor waits for a key */
  const cur=document.createElement('i');cur.className='hda-cur';const lastX=Math.min(cw-PX,hot.filter(h=>h.set.startsWith('mode'))[1].x+hot.filter(h=>h.set.startsWith('mode'))[1].w+4);
  cur.style.cssText=`left:${lastX*el.w/cw}px;top:${(ch-PX-4)*el.h/ch}px;width:${PX*el.w/cw}px;height:${PX*el.h/ch}px`;el.appendChild(cur);
  c.style.cssText=`width:${el.w}px;height:${el.h}px`;
  /* the menu items are tappable on the glass too */
  hot.forEach(h=>{const b=document.createElement('button');b.type='button';b.className='hda-mi';b.dataset.set=h.set;b.setAttribute('aria-label',h.lab);
    b.style.cssText=`left:${h.x*el.w/cw}px;top:${(h.y-2)*el.h/ch}px;width:${h.w*el.w/cw}px;height:${(h.h+4)*el.h/ch}px`;el.appendChild(b)});
  if(o.anim){c.classList.remove('hda-scan');void c.offsetWidth;c.classList.add('hda-scan')}},
press(root,b){if(!b.classList.contains('hd-k'))return;b.classList.remove('hda-dn');void b.offsetWidth;b.classList.add('hda-dn')}};
})();
