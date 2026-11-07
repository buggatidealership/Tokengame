/* K5 · Cut paper (new): a layered paper diorama. The AI marks cut from coloured paper on paper rosettes; the company's logo printed on a scalloped paper sign;
   the close as a paper alarm clock whose hands keep New York time; the golden ticket cut from gold paper with the leader's rosette; the record as a stack of
   paper cards; words on paper ribbon banners; arrows cut from card, lifted by their own shadows; the headline cut from stacked paper. */
(function(){const {obj,mark,logo,hands,esc,C,S}=K;const I=K.IMG;
  const P={
    bg:{p:I+'bg5-p.jpg',d:I+'bg5-d.jpg'},
    issue:(l,n,b)=>`<span class="k5-lb">${l}</span><span class="k5-lb k5-nn">${n}</span>`,
    starH:()=>`<b class="k5-sh">Starring</b>`,
    token:(m,cls)=>obj('k5-rosette',mark(m,'paper'),cls),
    company:(t)=>obj('k5-sign',logo(t),'kp1-co'),
    grade:()=>`<span class="k5-g">${obj('k5-clock',hands('k5-h'),'k5-ck')}<span class="k5-lb k5-bell"><small>Bell in</small>${C.cdown()}</span></span>`,
    ticket:(m)=>obj('k5-ticket',`<span class="k5-tm">${obj('k5-rosette',mark(m,'paper'),'k5-tr')}</span><b class="k5-tkn">${esc(S.NM[m])}</b>`,'k5-tk'),
    record:(n)=>obj('k5-stack',`<b class="k5-cn">${n}</b><small>rounds graded</small>`,'k5-st'),
    num:(i)=>obj('k5-rosette',`<b>${i}</b>`,'ks-n k5-n'),
    cap:(t)=>`<span class="ks-c k5-lb">${t}</span>`,
    q:(t)=>`<span class="k5-bn k5-q">${t}</span>`,
    button:()=>`<a class="kbtn k5-bn k5-btn" href="#">Meet the four models ↓</a>`,
  };
  K.build('5',P);K.done()})();
