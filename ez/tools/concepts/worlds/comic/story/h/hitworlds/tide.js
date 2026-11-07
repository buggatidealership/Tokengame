/* W5 "Head above water": an old granite harbour wall. The sea is the coin flip: the waterline on the wall sits exactly at 50%
   (and at $0 on the P&L), so an AI above it is beating a coin and one below it is under water, seen through the sea. The lines are
   painted on the wet stone in boat paint; the lead line is painted on the coping. The switch is the quay's own: the three tide
   boards are the P&L windows (lettered SZN, 7D, 24H as the crypto crowd says them), Hit rate and P&L are stencilled on the coping
   stones. On a switch the lines are painted in, and the sea keeps moving over the part under water. */
const tideM={font:'"Stardos Stencil",sans-serif',gold:'#ffd35a',dim:'#d8d2c2',up:'#7dffb0',dn:'#ff7a6a',baseC:'#e8f4ee',
  ink:(m,ld)=>ld?'#ffcc33':({GPT:'#38e08e',KIMI:'#5aa8ff',CLAUDE:'#ff8a4a',GROK:'#f6f2ea'})[m],
  defs:id=>`<filter id="${id}Mat" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="9" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 2" result="drop"/><feComposite in="SourceGraphic" in2="drop" operator="in"/></filter>`,
  rule:(x0,y,x1,y1,c,w)=>'',
  base:()=>'',
  line:(l,c)=>`<path class="hw-ln" pathLength="1" d="${l.d}" stroke="${c}" stroke-width="${l.ld?4:2.8}"/>`,
  cfont:'"Stardos Stencil",sans-serif',
  ctl:(w,h,lab,on,dim,k)=>k.board?`<text x="${w/2}" y="${h*.6}" font-size="${Math.min(h*.36,w*.42)}" font-weight="700" text-anchor="middle" fill="${on?'#b8221a':'#1b1a1e'}" opacity="${dim?.45:1}">${HW.esc(lab)}</text>${on?`<path d="M${w*.15} ${h*.72}H${w*.85}" stroke="#b8221a" stroke-width="3"/>`:''}`
    :`<text x="${w/2}" y="${h*.76}" font-size="${h*.7}" font-weight="700" text-anchor="middle" fill="${on?'#ffd35a':'#efe9da'}" opacity="${on?1:.75}">${HW.esc(lab.toUpperCase())}</text>`};
const TQ=(x0,y0,x1,y1)=>[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
window.HWT=HWorld({id:'tide',beat:'Meanwhile, down at the harbour…',img:HWIMG,mat:tideM,
 phone:{src:'tide-3x4.jpg',iw:768,ih:1024,hi:.72,crop:W=>({w:W,ox:0,top:.07,bot:.77}),Q:[[0,290],[768,290],[768,1004],[0,1004]],base:(572-290)/714,wl:572,fs:13,ref:300,
   plot:[.12,.19,.62,.6],lead:[.04,.11],gap:1.2,vx:3.3,blx:.12,bly:-.55,
   ctl:[{id:'hit',Q:TQ(330,300,450,330),lab:'Hit rate'},{id:'pnl',Q:TQ(460,300,560,330),lab:'P&L'},
        {id:'season',board:1,Q:TQ(400,102,462,246),lab:'SZN'},{id:'d7',board:1,Q:TQ(482,102,546,246),lab:'7D'},{id:'d1',board:1,Q:TQ(568,102,633,246),lab:'24H'}]},
 wide:{src:'tide-16x9.jpg',iw:1280,ih:720,crop:W=>({w:W*1.05,ox:W*1.05*30/1280,top:.04,bot:1}),Q:[[20,250],[1205,268],[1222,704],[20,704]],base:(470-252)/454,wl:470,fs:19,ref:620,hi:.74,
   plot:[.07,.2,.8,.97],lead:[.03,.08],gap:1.2,vx:3.4,blx:.07,bly:-.55,
   ctl:[{id:'hit',Q:[[905,282],[1012,284],[1012,306],[905,304]],lab:'Hit rate'},{id:'pnl',Q:[[1025,284],[1110,286],[1110,308],[1025,306]],lab:'P&L'},
        {id:'season',board:1,Q:TQ(716,68,798,168),lab:'SZN'},{id:'d7',board:1,Q:TQ(821,73,901,178),lab:'7D'},{id:'d1',board:1,Q:TQ(920,78,998,186),lab:'24H'}]},
 after(root,o){/* the sea over the marks: the painting's own water laid back on top, below the waterline, moving */
   const st=root.querySelector('.hw-st');let w=st.querySelector('.hw-sea');if(!w){w=PG.over(st,HWIMG+o.C.src,o.S,o.C.iw,o.C.ih,'hw-sea')}else PG.over(st,HWIMG+o.C.src,o.S,o.C.iw,o.C.ih,'hw-sea');
   w=st.querySelector('.hw-sea');const y=o.S.P(0,o.C.wl)[1];const q0=o.S.P(o.C.Q[0][0],o.C.Q[0][1]),q1=o.S.P(o.C.Q[1][0],o.C.Q[1][1]),xr=q0[0]+(q1[0]-q0[0])*(o.x1/o.bw);w.style.clipPath=`inset(${(y+o.S.oy).toFixed(1)}px ${(o.C.iw*o.S.s-o.S.ox-xr+o.S.ox*0).toFixed(1)}px 0 0)`;w.style.zIndex=2;
   /* "Coin flip" / "$0" written at the waterline as a tide mark */
   let m=st.querySelector('.hw-wl');if(!m){m=document.createElement('i');m.className='hw-wl';st.appendChild(m)}m.style.top=(y-1)+'px'}});
