/* W4 "Painted over the city": a tri-vision billboard on a rooftop at golden hour, the kind that turns its slats to show the next
   ad. The hit rate is lettered across its face in sign-painter's enamel, from the four cans on the catwalk (gold, green, red and
   black: the brand's own inks); the coin flip is a painted rule at 50%. The switch is the billboard itself: tap a word painted on
   the catwalk's kick-board and the slats turn, one after another left to right, to show the other face (the motion acts out
   "another view of the same contest"). Marks multiply into the slats, so every pleat's light and shade runs across them. */
const billM={font:'Bungee,sans-serif',gold:'#9c5b00',dim:'#7a6a55',up:'#0b7a43',dn:'#b8221a',baseC:'#b8221a',
  ink:(m,ld)=>ld?'#c98a00':({GPT:'#0b7a43',KIMI:'#1d4fbf',CLAUDE:'#d0541a',GROK:'#15121a'})[m],
  defs:id=>`<filter id="${id}Mat" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".05 .6" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6"/></filter>`,
  rule:(x0,y,x1,y1,c,w)=>`<path d="M${x0} ${y.toFixed(1)}H${x1}" stroke="${c}" stroke-width=".8" opacity=".55" fill="none"/>`,
  base:(x0,x1,y)=>`<path d="M${x0} ${y.toFixed(1)}H${x1}" stroke="#b8221a" stroke-width="2.4" fill="none"/>`,
  line:(l,c)=>`<path class="hw-ln" pathLength="1" d="${l.d}" stroke="${c}" stroke-width="${l.ld?4.2:2.8}"/>`,
  cfont:'Bungee,sans-serif',
  ctl:(w,h,lab,on,dim)=>`<text x="${w/2}" y="${h*.76}" font-size="${h*.66}" text-anchor="middle" fill="${on?'#ffcf3a':'#efe2c6'}" opacity="${dim?.45:on?1:.8}">${HW.esc(lab.toUpperCase())}</text>${on?`<path d="M${w*.12} ${h*.95}H${w*.88}" stroke="#ffcf3a" stroke-width="2"/>`:''}`};
/* five kick-board words, laid along the catwalk's front edge (y0 at x0, y1 at x1) */
const kick=(x0,x1,ya,yb,h)=>['hit','pnl','season','d7','d1'].map((id,i)=>{const a=x0+(x1-x0)*i/5+4,b=x0+(x1-x0)*(i+1)/5-4,y=x=>ya+(yb-ya)*(x-x0)/(x1-x0);return {id,Q:[[a,y(a)],[b,y(b)],[b,y(b)+h],[a,y(a)+h]]}});
window.HWT=HWorld({id:'bill',beat:'Meanwhile, up on the roof…',img:HWIMG,mat:billM,
 phone:{src:'bill-3x4.jpg',iw:768,ih:1024,crop:W=>({w:W*1.2,ox:W*1.2*40/768,top:.07,bot:.9}),Q:[[145,290],[640,100],[640,650],[118,725]],fs:13,ref:300,
   plot:[.1,.22,.68,.9],lead:[.05,.12],lfs:.85,stack:1,ctl:kick(60,690,846,872,26)},
 wide:{src:'bill-16x9.jpg',iw:1280,ih:720,crop:W=>({w:W*1.12,ox:W*1.12*80/1280,top:0,bot:1}),Q:[[215,60],[1062,175],[1062,505],[240,550]],fs:15,ref:600,
   plot:[.08,.24,.76,.92],lead:[.04,.11],stack:1,ctl:kick(250,1040,662,636,26)},
 after(root,o){if(!o.anim||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   /* the slats turn: each strip of the face shows its blank back, then rotates away, left to right */
   const sv=root.querySelector('.hw-sv'),n=o.wide?16:12,w=o.bw/n;let s='<g class="hw-slats">';
   for(let i=0;i<n;i++)s+=`<rect x="${(i*w).toFixed(1)}" y="-2" width="${(w+.6).toFixed(1)}" height="${(o.bh+4).toFixed(1)}" fill="url(#slatG)" style="transform-box:fill-box;transform-origin:center;animation:hwSlat .5s ${(.06*i).toFixed(2)}s ease-in both"/>`;
   sv.insertAdjacentHTML('beforeend',`<defs><linearGradient id="slatG"><stop offset="0" stop-color="#c9b48a"/><stop offset=".5" stop-color="#fbf0d4"/><stop offset="1" stop-color="#a99266"/></linearGradient></defs>${s}</g>`)}});
