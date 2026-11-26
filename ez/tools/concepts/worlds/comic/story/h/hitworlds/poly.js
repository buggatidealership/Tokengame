/* W1 "The lie detector": a 1950s polygraph in an interrogation room. Smart or lucky is a question of truth, so the machine that
   tests truth draws it: four pens write each AI's hit rate on the paper, the coin flip printed on the chart paper in red as the
   line that tells a lie from the truth. The knob turns between HIT RATE and P&L (silkscreened on the panel, as instruments
   label their knobs); the three toggles over their brass plates pick the P&L window. On a switch the paper feeds under the pens
   from the right, so the lines come out of the pen tips (the motion acts out "written as it happens"). Ink multiplies into the
   paper. */
const HWINK={GPT:'#0d7a4c',KIMI:'#1d57c4',CLAUDE:'#c4501a',GROK:'#16131a'};
const polyM={font:'"Special Elite",monospace',gold:'#9a6400',dim:'#6d6555',up:'#0d7a4c',dn:'#b3221b',baseC:'#b3221b',
  ink:(m,ld)=>ld?'#a86d00':HWINK[m],
  defs:id=>`<filter id="${id}Mat" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.1" result="d"/><feGaussianBlur in="d" stdDeviation=".35" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="d"/></feMerge></filter>`,
  rule:(x0,y,x1,y1,c,w)=>`<path d="M${x0} ${y.toFixed(1)}H${x1}" stroke="${c}" stroke-width="${w*.6}" stroke-dasharray="1 3" fill="none"/>`,
  base:(x0,x1,y)=>`<path d="M${x0} ${y.toFixed(1)}H${x1}" stroke="#b3221b" stroke-width="1.6" stroke-dasharray="6 4" fill="none" opacity=".9"/>`,
  line:(l,c,fs)=>`<path class="hw-ln" pathLength="1" d="${l.d}" stroke="${c}" stroke-width="${l.ld?2.6:1.6}"/>`,
  cfont:'"Special Elite",monospace',
  ctl:(w,h,lab,on,dim,k)=>k.silk?`<text x="${w/2}" y="${h*.72}" font-size="${h*.72}" text-anchor="middle" fill="${on?'#fdbc2a':'#d9d2bf'}" opacity="${on?1:.75}" letter-spacing=".08em">${HW.esc(lab.toUpperCase())}</text>`
    :`<text x="${w/2}" y="${h*.68}" font-size="${h*.6}" text-anchor="middle" font-weight="700" fill="${on?'#9e1a12':'#1d1206'}" opacity="${dim?.55:1}" letter-spacing=".02em" stroke="${on?'#9e1a12':'#1d1206'}" stroke-width=".35">${HW.esc(lab.toUpperCase())}</text>`};
const PQ=(x0,y0,x1,y1)=>[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
window.HWT=HWorld({id:'poly',beat:'Meanwhile, in the interrogation room…',img:HWIMG,mat:polyM,
 phone:{src:'poly2-3x4.jpg',iw:768,ih:1024,crop:W=>({w:W*1.03,ox:W*.015,top:.2,bot:.875}),Q:[[95,238],[668,238],[703,628],[78,630]],fs:11,ref:300,
   plot:[.09,.21,.6,.9],lead:[.03,.08],stack:1,
   ctl:[{id:'hit',silk:1,Q:PQ(22,680,128,708),lab:'Hit rate'},{id:'pnl',silk:1,Q:PQ(130,680,214,708),lab:'P&L'},
        {id:'season',Q:PQ(238,824,330,856)},{id:'d7',Q:PQ(358,824,452,856)},{id:'d1',Q:PQ(480,824,575,856)}],knob:[122,783,62]},
 wide:{src:'poly-16x9.jpg',iw:1280,ih:720,crop:W=>({w:W*1.32,ox:W*1.32*150/1280,top:.15,bot:1}),Q:[[400,136],[1109,188],[1032,450],[159,329]],fs:15,ref:600,
   plot:[.1,.25,.66,.92],lead:[.04,.1],stack:1,
   ctl:[{id:'hit',silk:1,Q:[[200,528],[278,532],[277,550],[199,546]],lab:'Hit rate'},{id:'pnl',silk:1,Q:[[285,532],[352,535],[351,553],[284,550]],lab:'P&L'},
        {id:'season',Q:[[399,515],[509,522],[507,543],[397,536]]},{id:'d7',Q:[[547,545],[665,550],[664,573],[545,567]]},{id:'d1',Q:[[707,576],[830,582],[829,604],[705,598]]}],knob:[278,466,58]},
 after(root,o){/* the knob's pointer turns: left for hit rate, right for P&L */let k=root.querySelector('.hw-knob');const st=root.querySelector('.hw-st');
   if(!k){k=document.createElement('i');k.className='hw-knob';st.appendChild(k)}const [cx,cy,r]=o.C.knob,p=o.S.P(cx,cy),R=r*o.S.s;
   k.style.cssText=`left:${p[0]-R}px;top:${p[1]-R}px;width:${2*R}px;height:${2*R}px;--a:${o.wid==='hit'?-48:48}deg`;
   /* the paper feeds under the pens: the lines come out of the tips */
   const g=root.querySelector('.hw-lines');if(g){const id='polyClip';g.insertAdjacentHTML('beforebegin',`<clipPath id="${id}"><rect x="${o.x0-2}" y="${o.y0-30}" width="${o.x1-o.x0+4}" height="${o.y1-o.y0+60}"/></clipPath>`);g.setAttribute('clip-path',`url(#${id})`);
     g.innerHTML=`<g class="hw-feed" style="--fx:${(o.x1-o.x0).toFixed(1)}px">${g.innerHTML}</g>`}}});
