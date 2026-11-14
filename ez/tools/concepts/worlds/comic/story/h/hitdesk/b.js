/* Take B · Agent Tower. The evaluation floor at the top of a tower: four sealed pods, one AI in each, and a bank of four monitors
   above them, one per pod, in the order of the board. Each monitor is a vector display in its AI's phosphor: its name and place,
   its figure, its own line against the coin flip (all four on one scale, so the monitors compare side by side). The console's two
   painted knobs are the switch: MODE (hit rate / P&L) and WINDOW (season / 7 days / 24h), each with a painted index mark that
   turns to the engraved stop; the stops are tappable too. */
(function(){
const Qp=[[[122,122],[320,120],[320,328],[121,330]],[[358,74],[631,70],[631,298],[357,312]],[[122,374],[320,366],[320,555],[121,549]],[[358,364],[630,352],[629,570],[357,560]]];
const Qw=[[[174,158],[354,154],[356,323],[174,323]],[[390,150],[594,145],[595,323],[389,323]],[[632,140],[864,134],[863,323],[630,323]],[[903,130],[1158,122],[1157,323],[902,324]]];
/* knobs: cap centre, cap radii (painting px); stops: label, angle (deg, 0 = up), set */
const KP=[{x:435,y:866,rx:58,ry:36,k:'mode',st:[['HIT RATE',-62,'mode:hit'],['P&L',-8,'mode:pnl']]},{x:577,y:903,rx:60,ry:37,k:'win',st:[['SEASON',-12,'win:season'],['7 DAYS',40,'win:d7'],['24H',92,'win:d1']]}];
const KW=[{x:360,y:560,rx:56,ry:26,k:'mode',st:[['HIT RATE',-62,'mode:hit'],['P&L',-8,'mode:pnl']]},{x:800,y:578,rx:58,ry:26,k:'win',st:[['SEASON',-12,'win:season'],['7 DAYS',40,'win:d7'],['24H',92,'win:d1']]}];
const hot=K=>[].concat(...K.map(k=>[{x:k.x,y:k.y+k.ry*.6,w:k.rx*2,h:k.ry*3,set:k.k+':*',label:(k.k==='mode'?'Mode knob: ':'Window knob: ')+'turn to the next stop',cls:'hdb-knob'}]));
window.HDT={id:'b',title:'Agent Tower',
paint:{phone:{src:'b-3x4.jpg',iw:768,ih:1024,Q:Qp,crop:W=>{const s=W/600;return {w:768*s,ox:396*s-W/2,top:.06,bot:.985}},hot:hot(KP)},
  wide:{src:'b-16x9.jpg',iw:1280,ih:720,Q:Qw,crop:W=>{const s=W/1080;return {w:1280*s,ox:640*s-W/2,top:.12,bot:1}},hot:hot(KW)}},
draw(root,surf,st,d,o){
  const pnl=st.mode==='pnl',H=HD.HIT;
  d.rank.forEach((m,i)=>{const el=surf[i],w=el.w,h=el.h,c=HD.scr[m],p=w*.07,fs=Math.max(9,h*.1),big=Math.max(15,h*.2);
    const x0=p,x1=w-p,y0=p+fs+big*1.2,y1=h-p-fs*1.5,Y=v=>y1-(v-d.lo)/(d.hi-d.lo)*(y1-y0),n=d.n||1,X=k=>x0+k/n*(x1-x0),s=d.ser[m];
    const fx=x0+(x1-x0)*.42;const pts=s.map((v,k)=>(k?'L':'M')+X(k).toFixed(1)+' '+Y(v).toFixed(1)).join(' ');
    const val=d.fmt(d.end(m)),lead=i===0;
    const foot=pnl?(d.w.n?`R${d.w.first.n}–R${d.w.last.n}`:'NO CLOSE YET'):`${H.cnt[m].r} OF ${H.cnt[m].c} RIGHT`;
    HD.svgEl(el,w,h,`<g class="hdb-v" style="--c:${c}" fill="${c}">
      <text x="${p}" y="${p+fs}" font-size="${fs}" class="hdb-t">POD ${i+1} · ${PN.NM[m].toUpperCase()}</text>
      <text x="${p}" y="${p+fs+big*.95}" font-size="${big}" class="hdb-big${lead?' hdb-lead':''}">${HD.esc(val)}</text>
      <line x1="${x0}" x2="${x1}" y1="${Y(d.base)}" y2="${Y(d.base)}" class="hdb-coin"/>
      <text x="${x1}" y="${Y(d.base)+fs*.95}" text-anchor="end" font-size="${fs*.78}" class="hdb-cl">${pnl?'$0':'COIN 50%'}</text>
      <path d="${pts}" class="hdb-ln" pathLength="1"/>
      <circle cx="${X(s.length-1)}" cy="${Y(s[s.length-1])}" r="${Math.max(1.6,h*.016)}" class="hdb-dot"/>
      <text x="${p}" y="${h-p}" font-size="${fs*.86}" class="hdb-f">${foot}</text></g>`,o.anim?'hdb-go':'');
  });
  /* the knobs: an index mark painted on each cap, turned to the open stop; the stops engraved round it */
  const S=o.S,K=o.wide?KW:KP,hotEl=root.querySelector('.hd-hot');
  K.forEach(k=>{const [cx,cy]=S.P(k.x,k.y),rx=k.rx*S.s,ry=k.ry*S.s,cur=k.k==='mode'?st.mode:st.win,a=(k.st.find(z=>z[2].split(':')[1]===cur)||k.st[0])[1];
    const kn=document.createElement('div');kn.className='hdb-kn';kn.style.cssText=`left:${cx}px;top:${cy}px;--rx:${rx}px;--ry:${ry}px;--k:${(ry/rx).toFixed(3)}`;
    kn.innerHTML=`<i class="hdb-ix" style="--a:${a}deg"></i>`+k.st.map(([l,an,set])=>{const t=an*Math.PI/180,lx=Math.sin(t)*rx*1.5,ly=-Math.cos(t)*ry*1.9-ry*.25;
      return `<button type="button" class="hdb-stop" data-set="${set}" style="left:${lx.toFixed(1)}px;top:${ly.toFixed(1)}px">${l}</button>`}).join('');
    hotEl.appendChild(kn);if(o.anim&&root['_a'+k.k]!=null&&root['_a'+k.k]!==a){const ix=kn.querySelector('.hdb-ix');ix.style.setProperty('--a',root['_a'+k.k]+'deg');requestAnimationFrame(()=>requestAnimationFrame(()=>ix.style.setProperty('--a',a+'deg')))}
    root['_a'+k.k]=a});
}};
})();
