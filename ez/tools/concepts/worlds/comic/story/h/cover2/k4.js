/* K4 · The midway (new): a carnival at dusk. The AI marks hand-painted on shooting-gallery targets; the company's logo on a bulb-lit sign; the close is a
   high striker whose puck flies up and rings the bell; the golden ticket is a prize roll with the leader's target on it; the record chalked on a scoreboard;
   words on painted planks, numbers on small targets, the loop's arrows as bulb-studded carnival arrows. */
(function(){const {obj,mark,logo,esc,C,S,R}=K;const I=K.IMG;
  const bulbArrow=i=>{const id='k4a'+i;const d='M2 12 L40 12 L40 3 L62 19 L40 35 L40 26 L2 26Z';
    return `<svg class="kar kar${i} k4-ar" viewBox="-2 -2 70 42" aria-hidden="true"><defs><pattern id="${id}" width="8" height="40" patternUnits="userSpaceOnUse" patternTransform="skewX(-25)"><rect width="8" height="40" fill="#e0352d"/><rect width="4" height="40" fill="#fff3d6"/></pattern></defs>
      <path d="${d}" transform="translate(2.2 2.8)" fill="#15121a"/><path d="${d}" fill="url(#${id})"/><path d="${d}" fill="none" stroke="#fdbc2a" stroke-width="2" transform="translate(0 0)" opacity=".0"/><path d="${d}" fill="none" stroke="#15121a" stroke-width="2.6" stroke-linejoin="round"/>
      ${[[8,19],[18,19],[28,19],[46,13],[46,25],[55,19]].map(([x,y],k)=>`<circle class="k4-b" style="--d:${k*.18}s" cx="${x}" cy="${y}" r="2.6"/>`).join('')}</svg>`};
  const P={
    bg:{p:I+'bg4-p.jpg',d:I+'bg4-d.jpg'},
    issue:(l,n,b)=>`<span class="k4-pk">${l}</span><span class="k4-pk k4-pn">${n}</span>`,
    starH:()=>`<b class="k4-sh">Starring</b>`,
    token:(m,cls)=>obj('k4-target',mark(m,'paint'),cls),
    company:(t)=>obj('k4-board',logo(t),'kp1-co'),
    grade:()=>`<span class="k4-g"><span class="k4-sk">${obj('k4-striker','','k4-stk')}<i class="k4-puck" aria-hidden="true"></i><svg class="k4-ring" viewBox="0 0 60 30" aria-hidden="true"><path d="M8 22c-3-6-2-12 2-17M16 24c-3-7-2-15 2-20M52 22c3-6 2-12-2-17M44 24c3-7 2-15-2-20"/></svg></span><span class="k4-pk k4-bell"><small>Bell rings in</small>${C.cdown()}</span></span>`,
    ticket:(m)=>`<span class="k4-tk">${obj('k4-prize','','k4-roll')}<span class="k4-tkm">${obj('k4-target',mark(m,'paint'),'k4-tt')}<b>${esc(S.NM[m])}</b></span></span>`,
    record:(n)=>obj('k4-record',`<span class="k4-ch"><b>${n}</b><small>rounds graded</small></span>`,'k4-rec'),
    num:(i)=>obj('k4-target',`<b>${i}</b>`,'ks-n k4-n'),
    cap:(t)=>`<span class="ks-c k4-pk">${t}</span>`,
    arrow:bulbArrow,
    q:(t)=>`<span class="k4-pk k4-q">${t}</span>`,
    button:()=>`<a class="kbtn k4-pk k4-btn" href="#">Meet the four models ↓</a>`,
  };
  K.build('4',P);K.done()})();
