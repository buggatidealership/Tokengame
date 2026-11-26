/* K3 · Pinned (new): the first screen is a denim jacket and every element is sewn or pinned onto it. The AI marks enamelled into gold-rimmed pins,
   the company's logo on an embroidered patch, the close as an alarm-clock pin whose hands keep New York time, the golden ticket as a pin with the leader
   enamelled in, the record as a pin of graded cards; words on embroidered name tapes, the loop's arrows chain-stitched, the headline in chenille. */
(function(){const {obj,mark,logo,hands,esc,C,S,R}=K;const I=K.IMG;
  const stitch=i=>{const r=R(3+i*9),j=()=>(r()-.5)*3;const d=`M4 ${20+j()} Q30 ${8+j()} 54 ${18+j()}`;
    return `<svg class="kar kar${i} k3-st" viewBox="-2 -2 70 40" aria-hidden="true"><path d="${d}" class="s0"/><path d="${d}" class="s1"/><path d="${d}" class="s2"/><path d="M46 ${9+j()} L60 ${19} L47 ${29+j()}" class="s0"/><path d="M46 9 L60 19 L47 29" class="s1"/></svg>`};
  const P={
    bg:{p:I+'bg3-p.jpg',d:I+'bg3-d.jpg'},
    issue:(l,n,b)=>`<span class="k3-tp">${l}</span><span class="k3-tp k3-tn">${n}</span>`,
    starH:()=>`<b class="k3-tp k3-sh">Starring</b>`,
    token:(m,cls)=>obj('k3-pin',mark(m,'enamel'),cls),
    company:(t)=>obj('k3-patch',logo(t),'kp1-co'),
    grade:()=>`<span class="k3-g">${obj('k3-clock',hands('k3-h'),'k3-ck')}<span class="k3-tp k3-bell"><small>Bell in</small>${C.cdown()}</span></span>`,
    ticket:(m)=>obj('k3-ticket',`<span class="k3-tm">${mark(m,'enamel')}</span><b class="k3-tkn">${esc(S.NM[m])}</b>`,'k3-tk'),
    record:(n)=>obj('k3-cards',`<b class="k3-cn">${n}</b><small>graded</small>`,'k3-cd'),
    num:(i)=>obj('k3-pin',`<b>${i}</b>`,'ks-n k3-n'),
    cap:(t)=>`<span class="ks-c k3-tp">${t}</span>`,
    arrow:stitch,
    q:(t)=>`<span class="k3-tp k3-q">${t}</span>`,
    button:()=>`<a class="kbtn k3-tp k3-btn" href="#">Meet the four models ↓</a>`,
  };
  K.build('3',P);K.done()})();
