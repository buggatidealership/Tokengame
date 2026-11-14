/* K2 · The golden ticket (builds on round H's C3): a velvet box office. The leader's painted foil ticket is the hero, its mark pressed into a gold wax seal;
   the AI marks pressed into red wax seals; the company on a gold-framed playbill; the close as a date stamper that stamps the bell's day; the record as the
   ticket spike; every word printed on cream admission stubs. */
(function(){const {obj,mark,logo,esc,C,S}=K;const O='tools/concepts/worlds/comic/story/h/cover/img/';
  const P={
    bg:{p:O+'g-vault-p.jpg',d:O+'g-vault-d.jpg'},
    issue:(l,n,b)=>`<span class="k2-st">${l}</span><span class="k2-st k2-sn">${n}</span>`,
    starH:()=>`<b class="k2-sh">Starring</b>`,
    token:(m,cls)=>obj('k2-seal',mark(m,'wax'),cls),
    company:(t)=>obj('k2-bill',logo(t),'kp1-co'),
    grade:()=>`<span class="k2-g">${obj('k2-stamp','','k2-stp')}<span class="k2-imp"><small>Graded at the close</small><b>${esc(C.closeDay())}</b><small>4 PM New York</small></span></span>`,
    ticket:(m)=>`<span class="k2-sm">${obj('k2-seal',mark(m,'wax'),'k2-gs')}<span class="k2-st k2-hold">Holds it now:<b>${esc(S.NM[m])}</b></span></span>`,
    record:(n)=>`<span class="k2-rec">${obj('k2-spike','','k2-spk')}<span class="k2-st k2-cnt"><b>${n}</b><small>rounds graded, on file</small></span></span>`,
    num:(i)=>`<span class="ks-n k2-n"><b>${i}</b></span>`,
    cap:(t)=>`<span class="ks-c k2-st">${t}</span>`,
    hero:(m)=>`<span class="k2-hero">${obj('ticket',`<span class="k2-hm">${obj('k2-seal',mark(m,'wax'),'k2-hs')}</span><b class="k2-hn">${esc(S.NM[m])}</b>`)}<span class="k2-st k2-bell"><small>Next bell</small>${C.cdown()}</span></span>`,
    q:(t)=>`<span class="k2-st k2-q">${t}</span>`,
    button:()=>`<a class="kbtn k2-btn" href="#">${obj('ticket','<b>Meet the four models ↓</b>')}</a>`,
  };
  K.build('2',P);K.done()})();
