/* W3 "Lucky's back wall": a wet brick alley at night. Each AI's hit rate is a neon tube bent along the wall, in its colour; the
   coin flip is one plain tube left almost dark at 50%, the line a lucky streak has to burn brighter than. The fuse box is the
   switch: its two levers are Hit rate and P&L, its three glass caps the P&L windows, each name stencilled beside it; the lit one
   glows. On a switch the tubes flicker on, one after another, as neon does when it strikes. */
const neonM={font:'"Tilt Neon",sans-serif',gold:'#ffd86a',dim:'#d8b9a8',up:'#7dffb0',dn:'#ff6a5e',baseC:'#cfc3b4',
  ink:(m,ld)=>ld?'#ffcf4a':({GPT:'#3dff9a',KIMI:'#4fb4ff',CLAUDE:'#ff8040',GROK:'#f4f0ff'})[m],
  defs:id=>`<filter id="${id}Mat" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur in="SourceGraphic" stdDeviation="3.4" result="g"/><feGaussianBlur in="SourceGraphic" stdDeviation="1" result="g2"/><feMerge><feMergeNode in="g"/><feMergeNode in="g"/><feMergeNode in="g2"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`,
  rule:(x0,y,x1,y1,c,w)=>'',
  base:(x0,x1,y)=>`<path d="M${x0} ${y.toFixed(1)}H${x1}" stroke="#5c5650" stroke-width="3.2" stroke-linecap="round" fill="none" opacity=".9"/><path d="M${x0} ${(y-.8).toFixed(1)}H${x1}" stroke="#d9cfc0" stroke-width=".7" fill="none" opacity=".55"/>`,
  /* a tube: a white-hot core over the colour */
  line:(l,c)=>`<g class="hw-tube"><path class="hw-ln" pathLength="1" d="${l.d}" stroke="${c}" stroke-width="${l.ld?4.2:3.2}"/><path class="hw-ln" pathLength="1" d="${l.d}" stroke="#fffbe8" stroke-width="${l.ld?1.4:1}" opacity=".85"/></g>`,
  cfont:'"Allerta Stencil",sans-serif',
  ctl:(w,h,lab,on,dim)=>`<text x="${w/2}" y="${h*.74}" font-size="${h*.68}" text-anchor="middle" fill="${on?'#ffe9a0':'#e6ddd0'}" opacity="${dim?.45:on?1:.78}">${HW.esc(lab.toUpperCase())}</text>`};
const NQ=(x0,y0,x1,y1)=>[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
window.HWT=HWorld({id:'neon',beat:'Meanwhile, round the back of Lucky’s…',img:HWIMG,mat:neonM,
 phone:{src:'neon-3x4.jpg',iw:768,ih:1024,crop:W=>({w:W*1.28,ox:W*1.28*92/768,top:.11,bot:.72}),Q:[[100,150],[560,178],[560,690],[100,705]],fs:13,ref:280,
   plot:[.1,.1,.62,.78],lead:[.04,.88],stack:1,blx:.1,
   /* stencilled on the bricks beside the fuse box (on the box itself they would be 5px tall) */
   ctl:[{id:'hit',Q:NQ(470,360,560,384),lab:'Hit rate',glow:[605,460,26]},{id:'pnl',Q:NQ(470,392,560,416),lab:'P&L',glow:[660,460,26]},
        {id:'season',Q:NQ(470,520,560,544),glow:[597,567,22,'#3dff7a']},{id:'d7',Q:NQ(470,552,560,576),glow:[637,567,22,'#ffb02e']},{id:'d1',Q:NQ(470,584,560,608),glow:[678,566,22,'#ff3a31']}]},
 wide:{src:'neon-16x9.jpg',iw:1280,ih:720,crop:W=>({w:W*1.08,ox:W*1.08*40/1280,top:0,bot:.85}),Q:[[200,40],[990,62],[990,520],[200,560]],fs:16,ref:620,
   plot:[.09,.2,.74,.9],lead:[.3,.08],stack:1,blx:.09,
   ctl:[{id:'hit',Q:NQ(1004,452,1072,470),lab:'Hit rate',glow:[1040,385,34]},{id:'pnl',Q:NQ(1076,452,1144,470),lab:'P&L',glow:[1105,385,34]},
        {id:'season',Q:NQ(1012,258,1058,274),lab:'Szn',glow:[1035,290,20,'#3dff7a']},{id:'d7',Q:NQ(1056,257,1098,273),lab:'7D',glow:[1077,288,20,'#ffb02e']},{id:'d1',Q:NQ(1096,256,1140,272),lab:'24H',glow:[1117,285,20,'#ff3a31']}]},
 after(root,o){/* the tubes reflect in the wet cobbles: a mirrored, blurred copy of the marks under the wall's foot */
   const st=root.querySelector('.hw-st');let r=st.querySelector('.hw-refl');if(!r){r=document.createElement('div');r.className='hw-refl';st.appendChild(r)}
   const sf=root.querySelector('.hw-sf'),foot=o.S.P(0,o.C.Q[3][1])[1];r.innerHTML=sf.innerHTML.replace(/id="neonMat"/,'id="neonMatR"').replace(/url\(#neonMat\)/,'url(#neonMatR)');
   r.style.cssText=sf.style.cssText+`;transform-origin:0 0;transform:translateY(${(2*foot).toFixed(1)}px) scaleY(-1) ${sf.style.transform}`}});
