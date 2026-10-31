/* V4 Stencilled on the wall: a heist crew's marking sprayed through a stencil on the wet wall right of the vault, and an arrow
   sprayed in the logo's red pointing in at the door. Overspray and the stencil's bridges make it sprayed, the drips make it wet:
   rain runs the paint down from the foot of each word, each drip its own length. */
H7.ready(()=>{const L=H7.scene();if(!L)return;
 if(!document.querySelector('link[href*="Saira+Stencil"]'))document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira+Stencil+One&display=swap">');
 L.insertAdjacentHTML('beforeend',`<div class="v4-s"><b class="v4-a">The</b><b class="v4-a v4-a2">pool</b><span class="v4-b">Bet #1</span><span class="v4-b">opens it</span></div>
  <svg class="v4-x" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="v4f" x="-10%" y="-10%" width="120%" height="120%">
   <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="4" result="d"/>
   <feGaussianBlur in="d" stdDeviation="3" result="o"/><feComponentTransfer in="o" result="o2"><feFuncA type="linear" slope=".45"/></feComponentTransfer>
   <feMerge><feMergeNode in="o2"/><feMergeNode in="d"/></feMerge></filter></defs>
   <g filter="url(#v4f)"><g class="v4-dr"></g>
   <g class="v4-ar"><path d="M1505 560 C1470 612 1390 640 1268 628"/><path d="M1300 596 L1262 628 L1302 654"/></g></g></svg>`);
 const drips=()=>{const k=L.__k,lr=L.getBoundingClientRect(),r=H7.rng(23);let s='';
   L.querySelectorAll('.v4-a2,.v4-b:last-child').forEach((b,bi)=>{const q=b.getBoundingClientRect(),y=(q.bottom-lr.top)/k-.22*q.height/k,x0=(q.left-lr.left)/k,w=q.width/k;
     for(let i=0;i<3;i++){const x=x0+w*(.12+.3*i+r()*.1),l=bi?28+r()*r()*90:8+r()*14,t=5+r()*4;
       s+=`<path fill="${bi?'#ff3a31':'#efe5c6'}" d="M${(x-t*.5).toFixed(1)} ${y.toFixed(1)}c0 ${(l*.5).toFixed(1)} ${(t*.2).toFixed(1)} ${(l*.7).toFixed(1)} 0 ${l.toFixed(1)}a${(t*.6).toFixed(1)} ${(t*.6).toFixed(1)} 0 1 0 ${(t*1.2).toFixed(1)} 0c${(-t*.2).toFixed(1)} ${(-l*.3).toFixed(1)} 0 ${(-l*.5).toFixed(1)} 0 ${(-l).toFixed(1)}z"/>`}});
   L.querySelector('.v4-dr').innerHTML=s};
 L.addEventListener('h7fit',drips);(document.fonts?document.fonts.load("400 40px 'Saira Stencil One'"):Promise.resolve()).then(()=>setTimeout(drips,100));drips()});
