/* Take D · The printout. A 1970s computer room: the evaluation job runs overnight and the line printer types its verdict onto
   green-bar fan-fold paper, a classic printer plot: the scale across, one printed line per round, each AI marked by its letter
   (G Grok, C Claude, P GPT, K Kimi) at its hit rate, the coin flip a column of red bars down the middle (the two-colour ribbon's red).
   The job header was printed first, so it sits furthest out of the printer, nearest you; the newest round is at the printer's head,
   under the line that reads where each AI stands now. The header's bracketed options are the switch: a tap starts a new run and the
   printer types it line by line. Mapped onto the painted paper with one homography; set in a dot-matrix-like monospace. */
(function(){
const SY={GROK:'G',CLAUDE:'C',GPT:'P',KIMI:'K'};
window.HDT={id:'d',title:'The printout',
paint:{phone:{src:'d-3x4.jpg',iw:768,ih:1024,Q:[[[254,404],[614,434],[514,880],[26,880]]],crop:W=>{const s=W/620;return {w:768*s,ox:322*s-W/2,top:.35,bot:.885}},hot:[]},
  wide:{src:'d-16x9.jpg',iw:1280,ih:720,Q:[[[418,282],[962,274],[878,712],[152,712]]],crop:W=>{const s=W/1000;return {w:1280*s,ox:560*s-W/2,top:.28,bot:1}},hot:[]}},
draw(root,surf,st,d,o){
  const el=surf[0],w=el.w,h=el.h,pnl=st.mode==='pnl',fs=Math.max(7,Math.min(w/(o.wide?44:36),h/(o.wide?32:27))),cw=fs*.6,lh=fs*1.18,mx=fs*.8,C=Math.floor((w-2*mx)/cw);
  const lab=6,ax=C-lab-1,col=v=>lab+1+Math.max(0,Math.min(ax-1,Math.round((v-d.lo)/(d.hi-d.lo)*(ax-1))));
  const head=5,avail=Math.floor((h-lh*1.4)/lh)-head-2,n=d.n||0,rs=pnl?(d.w?d.w.rs:[]):PN.RS,step=Math.max(1,Math.ceil(n/avail));
  const ks=[];for(let k=n;k>=1;k-=step)ks.push(k);
  const rows=[];
  /* the newest line: where they stand now */
  rows.push({t:'NOW   '+d.rank.map(m=>SY[m]+' '+d.fmt(d.end(m)).replace('−','-')).join('  '),cls:'hdd-now'});
  const bc=col(d.base);
  ks.forEach(k=>{const a=Array(C).fill(' '),rn='R'+(pnl?rs[k-1].n:k);for(let i=0;i<rn.length;i++)a[i]=rn[i];a[lab]='+';
    const marks={};d.rank.forEach(m=>{const c=col(d.ser[m][k]);marks[c]=marks[c]?'#':SY[m]});
    for(let c=lab+1;c<C;c++)a[c]=marks[c]||(c===bc?'¦':((k%10===0&&!pnl)||(pnl&&k===ks[0])?'.':' '));
    rows.push({t:a.join(''),bc,marks})});
  /* the scale and the job header (printed first, so nearest you) */
  const sc=Array(C).fill(' ');sc[lab]='+';for(let c=lab+1;c<C;c++)sc[c]='-';const tl=Array(C).fill(' ');
  const tv=pnl?PN.ticks(d.lo,d.hi,3):[.3,.4,.5,.6,.7,.8];tv.forEach(v=>{const c=col(v),s=pnl?PN.$k(v).replace('−','-').replace('.0K','K'):String(Math.round(v*100));sc[c]='|';for(let i=0;i<s.length;i++)if(c-Math.floor(s.length/2)+i<C)tl[c-Math.floor(s.length/2)+i]=s[i]});
  rows.push({t:sc.join('')},{t:tl.join('')});
  rows.push({t:'LEGEND  G GROK  C CLAUDE  P GPT  K KIMI   ¦ '+(pnl?'$0':'COIN 50%')});
  rows.push({t:`JOB 00${HD.HIT.last.n}  SMART OR LUCKY?  ${pnl?'P&L $100K/CALL':'HIT RATE BY ROUND'}`,cls:'hdd-job'});
  rows.push({opts:true});
  const tx=(s,x,y,cls)=>`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${fs}" class="${cls||''}" xml:space="preserve">${HD.esc(s)}</text>`;
  let g='';rows.forEach((r,i)=>{const y=lh*(i+1);const dl=`style="--i:${i}"`;
    if(r.opts){const op=[['mode:hit','HIT RATE'],['mode:pnl','P&L'],['win:season','SEASON'],['win:d7','7 DAYS'],['win:d1','24H']];let x=mx;g+=`<g class="hdd-row" ${dl}>`+tx('RUN',x,y,'hdd-k');x+=cw*4;
      op.forEach(([set,l],j)=>{if(j===2){g+=tx('WINDOW',x,y,'hdd-k');x+=cw*7}const on=st[set.split(':')[0]]===set.split(':')[1]&&!(set.startsWith('win')&&!pnl),s='['+l+']';
        g+=`<g class="hdd-op${on?' hdd-on':''}" data-set="${set}" role="button" tabindex="0" aria-label="${l}">${tx(s,x,y,'')}<rect x="${x-2}" y="${y-fs*1.1}" width="${s.length*cw+4}" height="${fs*1.6}" class="hdd-hit"/></g>`;x+=(s.length+1)*cw});g+='</g>';return}
    if(r.marks){/* the line, then the red ribbon bar and the letters over it in black */
      const base=r.t.split('').map((ch,c)=>(c===r.bc||r.marks[c])?' ':ch).join('');g+=`<g class="hdd-row" ${dl}>`+tx(base,mx,y,'hdd-dim')+tx('¦',mx+r.bc*cw,y,'hdd-red');
      Object.entries(r.marks).forEach(([c,s])=>{g+=tx(s,mx+c*cw,y,'hdd-mk')});g+='</g>';return}
    g+=`<g class="hdd-row" ${dl}>`+tx(r.t,mx,y,r.cls)+'</g>'});
  HD.svgEl(el,w,h,`<defs><filter id="hddDot" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="2"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.7"/><feComposite in="SourceGraphic" operator="in"/></filter></defs><g class="hdd-p" filter="url(#hddDot)">${g}</g>`,o.anim?'hdd-go':'');
}};
})();
