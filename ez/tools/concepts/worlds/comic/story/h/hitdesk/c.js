/* Take C · The polygraph. A lie-detector test for four AIs: is the record a skill or a bluff? The strip-chart recorder's four pens
   have written each AI's hit rate onto the paper, round by round: the newest round at the pens, the first round nearest you, so the
   traces run up the paper to where the pens sit now. The paper is printed chart stock (rules every 10%, the coin flip as the heavy
   red centre rule, a pale rule every 10 rounds); the traces are pen ink that soaks a little into the paper. The examiner's form is
   typed at the near end of the strip, and its tick boxes are the switch (hit rate or P&L; season, 7 days, 24 hours): a tap ticks
   the box in red pencil and the pens draw the new record. Everything is mapped onto the painted paper with one homography. */
(function(){
window.HDT={id:'c',title:'The polygraph',
paint:{phone:{src:'c-3x4.jpg',iw:768,ih:1024,Q:[[[267,302],[596,302],[712,1024],[140,1024]]],crop:W=>{const s=W/700;return {w:768*s,ox:426*s-W/2,top:.1,bot:1}},hot:[]},
  wide:{src:'c-16x9.jpg',iw:1280,ih:720,Q:[[[408,232],[862,232],[995,690],[285,690]]],crop:W=>{const s=W/1100;return {w:1280*s,ox:640*s-W/2,top:.08,bot:1}},hot:[]}},
draw(root,surf,st,d,o){
  const el=surf[0],w=el.w,h=el.h,pnl=st.mode==='pnl',n=d.n||1,mx=w*.09,x0=mx,x1=w-mx*.6,top=h*.02,formH=h*(o.wide?.38:.3),bot=h-formH;
  const X=v=>x0+(v-d.lo)/(d.hi-d.lo)*(x1-x0),Y=k=>top+(n-k)/n*(bot-top),fs=Math.max(7,w*.034);
  let g='';
  /* printed chart stock: value rules, round rules, the coin flip / break-even as the heavy centre rule */
  const vt=pnl?PN.ticks(d.lo,d.hi,5):[.3,.4,.5,.6,.7,.8];
  vt.forEach(v=>{g+=`<line x1="${X(v)}" x2="${X(v)}" y1="${top}" y2="${bot}" class="hdc-r"/><text x="${X(v)}" y="${bot+fs*1.15}" font-size="${fs*.8}" text-anchor="middle" class="hdc-pr">${pnl?PN.$k(v).replace('.0K','K'):Math.round(v*100)}</text>`});
  const rs=pnl?(d.w?d.w.rs:[]):PN.RS;const step=pnl?Math.max(1,Math.ceil(n/6)):10;
  for(let k=step;k<=n;k+=step){const rn=pnl?(rs[k-1]||{}).n:k;g+=`<line x1="${x0}" x2="${x1}" y1="${Y(k)}" y2="${Y(k)}" class="hdc-rr"/><text x="${x0-3}" y="${Y(k)+fs*.3}" font-size="${fs*.72}" text-anchor="end" class="hdc-pg">R${rn}</text>`}
  g+=`<line x1="${X(d.base)}" x2="${X(d.base)}" y1="${top}" y2="${bot}" class="hdc-coin"/>`;
  g+=`<text transform="translate(${X(d.base)-3} ${bot-fs*.6}) rotate(-90)" font-size="${fs*.9}" class="hdc-cl">${pnl?'BREAK EVEN · $0':'COIN FLIP · 50%'}</text>`;
  /* pen traces, oldest round at the bottom, up to the pens */
  const tr=d.rank.slice().reverse().map(m=>{const s=d.ser[m];return `<path d="${s.map((v,k)=>(k?'L':'M')+X(v).toFixed(1)+' '+Y(k).toFixed(1)).join(' ')}" class="hdc-ln${m===d.rank[0]?' hdc-ld':''}" style="--c:${PN.col(m)}" pathLength="1"/>`}).join('');
  /* the examiner's typed notes at the top of each trace */
  const L=PN.spread(d.rank.map(m=>({m,y:X(d.end(m))})),fs*3.9,x0+fs*2.5,x1-fs*2.5).sort((a,b)=>a.y-b.y);
  const notes=L.map((l,i)=>{const m=l.m,ex=X(d.end(m)),ey=Y(n),ny=top+fs*(1.3+(i%2)*1.4);
    return `<text x="${l.y}" y="${ny}" font-size="${fs}" text-anchor="middle" class="hdc-note" fill="${PN.col(m)}">${PN.NM[m]} ${HD.esc(d.fmt(d.end(m)))}</text>`}).join('');
  /* the form: typed, with tick boxes as the switch */
  const fy=bot+fs*2.4,lh=fs*1.55,bx=(x,y,set,lab)=>{const on=st[set.split(':')[0]]===set.split(':')[1]&&!(set.startsWith('win')&&!pnl);
    return `<g class="hdc-bx" data-set="${set}" role="button" tabindex="0" aria-label="${lab}"><rect x="${x}" y="${y-fs*.82}" width="${fs*.9}" height="${fs*.9}" class="hdc-box"/>${on?`<path d="M${x-fs*.15} ${y-fs*.95} L${x+fs*1.05} ${y+fs*.15} M${x+fs*1.05} ${y-fs*.95} L${x-fs*.15} ${y+fs*.15}" class="hdc-tick"/>`:''}<text x="${x+fs*1.35}" y="${y}" font-size="${fs}" class="hdc-ty">${lab.toUpperCase()}</text><rect x="${x-fs*.4}" y="${y-fs*1.3}" width="${fs*(1.9+lab.length*.62)}" height="${fs*1.9}" class="hdc-hit"/></g>`};
  const tw=(x1-x0);
  let f=`<text x="${x0}" y="${fy}" font-size="${fs*1.05}" class="hdc-ty hdc-h">SUBJECT: 4 AIs · SMART OR LUCKY?</text>`;
  f+=`<text x="${x0}" y="${fy+lh}" font-size="${fs}" class="hdc-ty">${pnl?'P&L, $100K ON EVERY CALL':'HIT RATE, ROUND BY ROUND'} · ${pnl?(d.w.n?'R'+d.w.first.n+'–R'+d.w.last.n:'NO CLOSE YET'):'R1–R'+HD.HIT.last.n}</text>`;
  f+=bx(x0,fy+lh*2.2,'mode:hit','Hit rate')+bx(x0+tw*.5,fy+lh*2.2,'mode:pnl','P&L');
  f+=bx(x0,fy+lh*3.3,'win:season','Season')+bx(x0+tw*.34,fy+lh*3.3,'win:d7','7 days')+bx(x0+tw*.68,fy+lh*3.3,'win:d1','24h');
  HD.svgEl(el,w,h,`<defs><filter id="hdcInk" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="1.4"/></filter></defs>
    <g class="hdc-paper">${g}</g><g class="hdc-tr" filter="url(#hdcInk)">${tr}</g><g class="hdc-ink">${notes}${f}</g>`,o.anim?'hdc-go':'');
}};
})();
