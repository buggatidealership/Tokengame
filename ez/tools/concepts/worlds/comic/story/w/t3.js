/* T3 · Tug of war: each card is a rope. The 🐻 end pulls down, the 🐂 end pulls up, the red ribbon in the middle is where the stock
   stands now; tonight's close drags it one way. Each AI holds the rope at its own call, so how far out it stands is how big its call is
   (one scale for every card tonight, so cards compare). The ribbon sways: the pull is still on. */
(async function(){const X=WW,T=X.tonight();
  const M=Math.max(...T.flatMap(p=>X.pcalls(p).map(c=>Math.abs(+c.mag))),1);   /* the biggest call tonight sets the scale */
  const g=await X.tn((p,cs)=>`<div class="ww-tw"><i class="ww-end ww-ed">🐻</i><i class="ww-end ww-eu">🐂</i><i class="ww-rope"></i><i class="ww-rib"></i>
      ${cs.map(c=>`<p class="ww-hd ${c.up?'ww-hu':'ww-hdn'}" data-v="${(c.up?1:-1)*Math.abs(+c.mag)}">${X.face(c.m,'ww-tf')}<span><b>${c.up?'+':'−'}${c.mag}%</b><small>${X.NM[c.m]}</small></span></p>`).join('')}
      <i class="ww-lab ww-ld">Down</i><i class="ww-lab ww-lu">Up</i></div>`,'ww-t3');
  /* lanes, measured: alternate above and below the rope; a far lane only when two holders would touch */
  const lay=()=>g.querySelectorAll('.ww-tw').forEach(tw=>{const Wd=tw.clientWidth,mid=Wd/2,span=mid-50,F=tw.querySelector('.ww-tf').offsetWidth/2;
    const hs=[...tw.querySelectorAll('.ww-hd')].map(h=>{const v=+h.dataset.v,w=h.offsetWidth;let x=mid+v/M*span,a=v>0?x-F:x-w+F;a=Math.max(30,Math.min(Wd-w-30,a));return {h,v,x,a,b:a+w}}).sort((p,q)=>Math.abs(p.v)-Math.abs(q.v));
    const L=[[],[],[],[]];hs.forEach((o,i)=>{const pref=i%2?[1,0,3,2]:[0,1,2,3];o.l=pref.find(l=>L[l].every(q=>o.b+4<q.a||o.a>q.b+4)&&(l<2||L[l-2].every(q=>o.x<q.a-3||o.x>q.b+3)));if(o.l==null)o.l=3;L[o.l].push(o)});
    const ta=L[2].length?2:L[0].length?1:0,tb=L[3].length?2:L[1].length?1:0;tw.style.setProperty('--ta',ta);tw.style.setProperty('--tb',tb);
    hs.forEach(o=>{o.h.className=o.h.className.replace(/ ww-l\d/g,'')+' ww-l'+o.l;o.h.style.left=o.a+'px';o.h.style.setProperty('--arm',(o.x-o.a)+'px')})});
  lay();document.fonts.ready.then(lay);let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;lay()}});
  X.ready('t3')})();
