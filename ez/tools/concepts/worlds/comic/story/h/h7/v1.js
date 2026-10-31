/* V1 Engraved in the ring: the words are cut into the vault frame's steel ring and gilded, following its arc from the lower left
   up over the top until the open door hides the ring. The gilt catches the vault's gold light: brightest where the ring meets
   the opening and the floor, dimmer round the dark outer side. A dark wall above each cut, a pale lip below (engraved, not printed). */
H7.ready(()=>{const L=H7.scene();if(!L)return;
 const cx=797,cy=446,rx=298,ry=305,a1=141,a2=innerWidth>=1000?252:285,P=a=>[cx+rx*Math.cos(a*Math.PI/180),cy+ry*Math.sin(a*Math.PI/180)];
 const [x1,y1]=P(a1),[x2,y2]=P(a2),d=`M${x1.toFixed(1)} ${y1.toFixed(1)} A${rx} ${ry} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
 const t=`THE POOL • ${H7.share()}% OF $EZ CREATOR FEES`;
 L.insertAdjacentHTML('beforeend',`<svg class="v1-r" viewBox="0 0 1600 900" preserveAspectRatio="none" role="img" aria-label="The pool: ${H7.share()}% of $EZ creator fees">
  <defs><path id="v1p" d="${d}"/>
   <linearGradient id="v1g" gradientUnits="userSpaceOnUse" x1="560" y1="700" x2="700" y2="120"><stop offset="0" stop-color="#ffe69a"/><stop offset=".35" stop-color="#f2c55a"/><stop offset=".75" stop-color="#b98a33"/><stop offset="1" stop-color="#e9c46a"/></linearGradient></defs>
  <text class="v1-w" dy="-1.6"><textPath href="#v1p">${t}</textPath></text>
  <text class="v1-l" dy="2"><textPath href="#v1p">${t}</textPath></text>
  <text class="v1-f"><textPath href="#v1p">${t}</textPath></text></svg>`);
 /* fit the words to the visible arc: measure, then set the size so the line runs the ring's length */
 const fit=()=>{const s=L.querySelector('.v1-r'),f=s.querySelector('.v1-f'),pl=s.querySelector('#v1p').getTotalLength();
   s.querySelectorAll('text').forEach(n=>n.style.fontSize='50px');const n=f.getComputedTextLength();const fs=Math.min(54,50*(pl*.985)/n);
   s.querySelectorAll('text').forEach(e=>{e.style.fontSize=fs+'px';e.querySelector('textPath').setAttribute('textLength',(pl*.985).toFixed(0));e.querySelector('textPath').setAttribute('lengthAdjust','spacing')})};
 (document.fonts?document.fonts.ready:Promise.resolve()).then(fit);fit()});
