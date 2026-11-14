/* Take E, "In the green": the NVIDIA chip's circuit board. Every P&L is a trace etched in copper and routed the way a board is
   routed (straight runs and 45-degree bends only), raised under the board's light from the upper left (the painting's own light),
   ending in a pad with a via; break-even is a wide gold ground bus with vias along it; the leader's trace is plated in gold and lit
   (current runs along it). Names, figures, axis, window switch and rows are silkscreen, the board's own white print. */
PN2.copper={font:'"Share Tech Mono"',chalk:'#eef3ea',dim:'#a9c4ad',gold:'#ffd35a',up:'#9ff2b9',dn:'#ff9b8a',lw:3.4,rule:1,cwk:.21,
  ink:(m,ld)=>ld?'#f2c14e':({GPT:'#3fd29b',KIMI:'#4f9dff',CLAUDE:'#ff8a4c',GROK:'#e9e6dc'})[m],
  path:(p,X,Y)=>PG.octo(p,X,Y),
  ring:(cx,cy,rx,ry,c)=>`<rect x="${(cx-rx).toFixed(1)}" y="${(cy-ry).toFixed(1)}" width="${(rx*2).toFixed(1)}" height="${(ry*2).toFixed(1)}" rx="2" fill="none" stroke="${c}" stroke-width="1.4"/>`,
  rule2:(x0,y0,x1,y1,c,w)=>`<path d="M${x0} ${y0.toFixed(1)} L${x1} ${y1.toFixed(1)}" stroke="${c}" stroke-width="${Math.min(w,1)}" stroke-dasharray="1 3" opacity=".7"/>`,
  endMark:(x,y,c,ld,x0,yb)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5.2" fill="#d8a14a"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.1" fill="#0f2416"/>`+(ld?`<circle class="pq-led" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="#ffd35a" opacity=".25"/>`:''),
  /* copper under the light: the alpha is a height map, a distant light from the upper left gives each trace a lit and a shaded edge;
     a small cast shadow down-right sits it on the board */
  defs:id=>`<filter id="${id}Mat" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="b"/>
    <feSpecularLighting in="b" surfaceScale="3.2" specularConstant=".95" specularExponent="16" lighting-color="#fff1c8" result="sp"><feDistantLight azimuth="225" elevation="42"/></feSpecularLighting>
    <feComposite in="sp" in2="SourceAlpha" operator="in" result="sp2"/><feOffset in="SourceAlpha" dx="1.1" dy="1.6" result="o"/><feGaussianBlur in="o" stdDeviation=".9" result="ob"/>
    <feFlood flood-color="#03130a" flood-opacity=".7"/><feComposite in2="ob" operator="in" result="sh"/>
    <feMerge><feMergeNode in="sh"/><feMergeNode in="SourceGraphic"/></feMerge><feComposite in2="sp2" operator="arithmetic" k1="0" k2="1" k3=".55" k4="0"/></filter>`,
  base:(x0,x1,y)=>{let v='';for(let x=x0+10;x<x1-6;x+=26)v+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.6" fill="#0d2214"/>`;return `<rect x="${x0}" y="${(y-4.2).toFixed(1)}" width="${(x1-x0).toFixed(1)}" height="8.4" rx="1.5" fill="#e0b04c"/>${v}`}};
window.PNT=PSurf({id:'e',title:'In the green?',beat:'Meanwhile, deep inside the chip…',hd:['Who’s in the','green?'],seed:44,mat:PN2.copper,rfs2:14,
 phone:{src:'e-3x4.jpg',iw:768,ih:1024,Q:[[70,232],[640,232],[640,820],[70,820]],crop:W=>({w:W*1.32,ox:70*(W*1.32/768)-W*.03,top:.19,bot:.83}),
   fs:12.5,top:[.05,.17,.05,.95],chart:[.15,.26,.74,.95],rub:-1},
 wide:{src:'e-16x9.jpg',iw:1280,ih:720,Q:[[250,110],[1074,110],[1074,575],[250,575]],fs:12.5,ref:540,top:[.06,.08,.58,.99],chart:[.08,.22,.42,.92],rows:[.54,.2,.995,.86],rfs:1.25,rub:-1},
 strip(rw){rw.style.background=`linear-gradient(#b98a3a,#7a5520 3px,#0000 6px),url(${PN2.IMG}e-3x4.jpg) 40% 46%/280% auto,#163a24`}});
