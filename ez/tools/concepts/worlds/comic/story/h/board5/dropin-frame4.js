/* Round H24 · board5 drop-in for tools/v22/story/x2p_top.js, frame 4 (take C, the trophy socket). Not applied to the live file.
   1. Copy out/top-h24-board.jpg to media/ (1200 px, 287 KB; the crop of img/c4k.jpg, a 2880 px gpt-image-2 master) and add it to the
      "Media:" comment at the top of x2p_top.js, with media/chip7-grok-1200.jpg media/chip7-claude-1200.jpg media/chip7-gpt-1200.jpg
      media/chip7-kimi-1200.jpg (already in media/, used by Meet the models: the same four chips, scaled down).
   2. Paste the block below inside x2p_top.js, just above `function frames(){`. It uses that file's own helpers: pic, surf, TX, em, tw, mark,
      NM, A, rank, esc, IMQ.
   3. Replace the `board:{...}` entry in frames() with:
        board:{w:'BOARD',k:'board',l:LINES.board,cap:'The board',p:boardB5()}},
   4. Append dropin-frame4.css to x2p_top.css.
   Live: the order (season P&L), the ranks 2 to 4, the names, the leader's P&L. Painted: the board and its sockets and glass; on each chip its
   mark, flag, name and version (Meet the models' own paintings). The aria-label of the li can name the ranking (see _b5.js apply()). */
const B5={file:'top-h24-board.jpg',iw:1630,
  /* the sockets' inner cavities and the glass windows, in the 1630 px crop's own px (measured on c4k at 2048, minus the crop's origin 215,200) */
  cav:[[255,62,1375,525],[40,790,600,1005],[40,1075,600,1290],[40,1380,600,1600]],
  win:[null,[930,885,1590,1050],[930,1150,1590,1310],[930,1410,1590,1575]]};
const b5R2Q=([x0,y0,x1,y1])=>[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
/* the chip painting (3760 x 1520) fitted in its cavity by height, centred */
const b5Chip=cv=>{const[x0,y0,x1,y1]=cv,h=y1-y0,w=Math.min(x1-x0,h*2.474),hh=w/2.474,x=(x0+x1)/2-w/2,y=(y0+y1)/2-hh/2;return b5R2Q([x,y,x+w,y+hh])};
const b5k$=v=>(v<0?'−':'+')+'$'+(Math.abs(v)>=1e6?(Math.abs(v)/1e6).toFixed(2)+'M':Math.round(Math.abs(v)/1000)+'K');
function boardB5(){const S=[],GQ=[],pl=m=>A[m].bal-100000;
  rank.forEach((m,i)=>{const cq=b5Chip(B5.cav[i]);
    S.push(surf(cq,()=>'','b5-chip'+(i===0?' b5-lead':''),()=>`<img class="b5-im" src="media/chip7-${m.toLowerCase()}-1200.jpg" alt="" draggable="false">`));
    if(i===0){/* the leader's own SEASON P&L window on its chip (chip px 1136,787 to 2585,1203 of 3760 x 1520), lit */
      const[x0,y0]=cq[0],sx=(cq[1][0]-x0)/3760,sy=(cq[3][1]-y0)/1520,r=[x0+1136*sx,y0+787*sy,x0+2585*sx,y0+1203*sy];
      S.push(surf(b5R2Q(r),(w,h)=>{const t=b5k$(pl(m)),f=Math.min(h*.86,w*.86/(t.length*.47));return `<g class="q4-g">`+TX(w/2,h/2+f*.37,f,t,{a:'middle',f:em(pl(m)<0?'dn':'up'),cls:'q4-big'})+`</g>`},'q4-glass b5-win',()=>`<i class="q4-scan"></i>`))}
    else{/* ranks 2 to 4: the rank numeral and the name, one line, centred in the board's glass */
      const q=b5R2Q(B5.win[i]);GQ.push(q);
      S.push(surf(q,(w,h)=>{const r=String(i+1),t=NM[m].toUpperCase(),f1=h*.7,g=h*.12,av=w*.9-tw(r,f1)-g,f2=Math.min(h*.6,av/(t.length*.47)),tot=tw(r,f1)+g+tw(t,f2),x0=w/2-tot/2,y=h/2+f1*.36;
        return `<g class="q4-g">`+TX(x0,y,f1,r,{cls:'q4-big'})+TX(x0+tw(r,f1)+g,y,f2,t)+`</g>`},'q4-glass b5-win',()=>`<i class="q4-scan"></i>`))}});
  const gl=GQ.map(q=>`<img class="q4-gl" src="${IMQ+B5.file}" alt="" draggable="false" style="width:100%;left:0;top:0;clip-path:polygon(${q.map(([x,y])=>`${(x/B5.iw*100).toFixed(2)}% ${(y/B5.iw*100).toFixed(2)}%`).join(',')})">`).join('');
  return pic(IMQ+B5.file,B5.iw,B5.iw,S,'b5-pic',gl,[0,0,B5.iw,B5.iw])}
