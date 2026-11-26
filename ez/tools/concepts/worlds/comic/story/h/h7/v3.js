/* V3 Written by the light: no sign, no paint. The vault's gold light falls on the rain to its left, and only the drops inside the
   words catch it, so "THE POOL" hangs in the rain made of lit streaks (brighter toward the opening, where the light comes from).
   The streaks fall, slowly; still with reduced motion. The small line is the light itself on the wet wall. */
H7.ready(()=>{const L=H7.scene();if(!L)return;
 const r=H7.rng(5);let st='';for(let x=60;x<520;x+=8){for(let k=0;k<4;k++){const y=r()*560-40,l=26+r()*50,a=.7+r()*.3;
   st+=`<path d="M${(x+r()*5).toFixed(1)} ${y.toFixed(1)}l${(-l*.07).toFixed(1)} ${l.toFixed(1)}" stroke-opacity="${a.toFixed(2)}"/>`}}
 L.insertAdjacentHTML('beforeend',`<svg class="v3-r" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true"><defs>
   <clipPath id="v3c"><text x="116" y="222" class="v3-t">THE</text><text x="108" y="356" class="v3-t v3-t2">POOL</text></clipPath>
   <linearGradient id="v3g" gradientUnits="userSpaceOnUse" x1="460" y1="300" x2="90" y2="120"><stop offset="0" stop-color="#fff2bf"/><stop offset=".55" stop-color="#ffd25c"/><stop offset="1" stop-color="#c8902c"/></linearGradient></defs>
   <g clip-path="url(#v3c)"><rect x="60" y="80" width="460" height="320" fill="url(#v3g)" fill-opacity=".4"/>
    <g class="v3-fall"><g stroke="url(#v3g)" stroke-width="6.5" stroke-linecap="round">${st}</g><g stroke="url(#v3g)" stroke-width="6.5" stroke-linecap="round" transform="translate(0 -560)">${st}</g></g></g></svg>
  <p class="v3-s"><span class="h7-sr">The pool. </span><span>Rides on bet #1</span></p>`);
 L.querySelector('.v3-fall').style.setProperty('--d','560px')});
