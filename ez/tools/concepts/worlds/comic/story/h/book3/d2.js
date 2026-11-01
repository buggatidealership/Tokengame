/* D2 · The spread (desktop): the book opened flat. Each chapter is a two-page spread: the left page is the painted hand-over page
   (the same three-panel bridge as R2, lettered on its blank sign) and stays put while you read; the right page is the chapter,
   scrolling. When the chapter ends, its spread slides away and the next spread arrives with its own left page. Phones keep R2. */
B3T.d2={run({chs,api}){
  const D=document,N=api.NAR();
  if(innerWidth<1100){B3T.r2.run({chs,api});D.documentElement.classList.add('b3-r2');return}
  D.documentElement.classList.add('b3-own');
  const S={'b1-p':{box:[17.23,60.55,86.81,69.59],c:'ink'},'b2-p':{box:[62.38,34.58,88.45,44.8],c:'ink'},'b3-p':{box:[29.1,34.18,64.95,39.57],c:'ink'},'b4-p':{box:[34.37,32.92,57.56,45.98],c:'gold',rot:-4},'b5-p':{box:[46.97,40.96,69.16,46.58],c:'cream'}};
  const LINES={1:[N[1][0],N[1][1]],2:[`${api.graded} rounds`,'Every one stays on the record. Newest first.'],3:[N[3][0],''],4:[N[4][0],N[4][1]],5:['Not over yet','']};
  chs.forEach(c=>{if(c.i<1||c.i>5)return;const k=`b${c.i}-p`,s=S[k],bx=s.box,[a,b]=LINES[c.i];
    const sp=D.createElement('div');sp.className='b3-sp b3-sp'+c.i;c.s.before(sp);
    const lp=D.createElement('aside');lp.className='b3-lp';lp.setAttribute('aria-hidden','true');
    lp.innerHTML=`<div class="b3-pic"><img src="${api.IMG}${k}-c.jpg" alt=""><span class="b3-sign ${s.c}" style="left:${bx[0]}%;top:${bx[1]}%;width:${bx[2]-bx[0]}%;height:${bx[3]-bx[1]}%;${s.rot?`transform:rotate(${s.rot}deg);`:''}"><b>${a}</b>${b?`<small>${b}</small>`:''}</span></div><span class="b3-fol">p. ${c.i*2} · ${c.k}</span>`;
    sp.append(lp,c.s)});
}};
