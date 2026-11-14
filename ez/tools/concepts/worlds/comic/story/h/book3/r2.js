/* R2 · One long picture: the webtoon bleed. No borders, no gutters: between two chapters a painted bridge, one picture whose top
   continues the world that ends (the exchange, the arena, the newsstand, the exchange floor, the vault) and whose foot opens the next.
   The narration is lettered on the blank sign the painting left for it (banner, enamel sign, brass plate, gold-rimmed plate, red sign).
   Rhythm: a long slow picture, then the dense chapter; scrolling is the camera moving down. */
B3T.r2={run({chs,api}){
  const D=document,N=api.NAR();D.documentElement.classList.add('b3-own');
  const L=innerWidth>=900?'l':'p';
  const S={ // slots.json, measured on the trimmed paintings (% of width/height); 'c' = ink colour of the sign
    'b1-p':{box:[17.23,60.55,86.81,69.59],c:'ink'},'b2-p':{box:[62.38,34.58,88.45,44.8],c:'ink'},'b3-p':{box:[29.1,34.18,64.95,39.57],c:'ink'},'b4-p':{box:[34.37,32.92,57.56,45.98],c:'gold',rot:-4},'b5-p':{box:[46.97,40.96,69.16,46.58],c:'cream'},
    'b1-l':{box:[35.88,16.13,58.7,38.66],c:'ink'},'b2-l':{box:[36.16,3.75,45.84,61.61],c:'ink'},'b3-l':{box:[43.97,8.15,62.56,21.76],c:'ink'},'b4-l':{box:[42.38,30.36,54.51,50.96],c:'gold',rot:-3},'b5-l':{box:[32.76,46.93,49.96,57.67],c:'cream'}};
  const LINES={ // what each sign carries: the narration, and where it fits, the chapter's lede (a short line only)
    1:[N[1][0],N[1][1]],2:[`${api.graded} rounds`,'Every one stays on the record. Newest first.'],3:[N[3][0],''],4:[N[4][0],N[4][1]],5:['Not over yet','']};
  chs.forEach(c=>{if(c.i<1||c.i>5)return;const k=`b${c.i}-${L}`,s=S[k];
    const br=D.createElement('div');br.className='b3-br b3-br'+c.i;br.setAttribute('aria-hidden','true');
    const [a,b]=LINES[c.i];const bx=s.box;
    br.innerHTML=`<div class="b3-pic"><img src="${api.IMG}${k}-c.jpg" alt=""><span class="b3-sign ${s.c}" style="left:${bx[0]}%;top:${bx[1]}%;width:${bx[2]-bx[0]}%;height:${bx[3]-bx[1]}%;${s.rot?`transform:rotate(${s.rot}deg);`:''}"><b>${a}</b>${b?`<small>${b}</small>`:''}</span></div>`;
    c.s.before(br)});
  /* say once, for screen readers, what the signs say */
  const sr=D.createElement('p');sr.className='pp-sr';sr.textContent=[1,2,3,4,5].map(i=>LINES[i].filter(Boolean).join(' ')).join(' ');D.querySelector('.b3-br1').before(sr);
}};
