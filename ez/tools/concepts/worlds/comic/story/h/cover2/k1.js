/* K1 · Clockwork (builds on round H's C2): the loop runs round a real station clock (New York time, red 4 PM pip).
   Every element is brass: the AI marks struck into brass coins, the company's logo enamelled on a hanging shop sign, engraved plates for the words,
   cog wheels for the numbers, brass tubes for the loop's arrows, the painted bell for the close, the golden ticket with the leader struck in, a ledger for the record. */
(function(){const {obj,mark,logo,hands,esc,C,S}=K;const O='tools/concepts/worlds/comic/story/h/cover/img/';
  const tube=()=>{/* four brass tubes round the clock, hand-tuned: ink, a two-tone brass body, a light line, a cast head */
    const arc=(a0,a1,r)=>{const p=a=>[100+r*Math.sin(a*Math.PI/180),100-r*Math.cos(a*Math.PI/180)];const [x0,y0]=p(a0),[x1,y1]=p(a1);return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`};
    const head=a=>{const r=96,c=[100+r*Math.sin(a*Math.PI/180),100-r*Math.cos(a*Math.PI/180)];return `<g transform="translate(${c[0].toFixed(1)} ${c[1].toFixed(1)}) rotate(${a+90})"><path d="M-9 -9 L9 0 L-9 9 L-5 0Z" transform="translate(1.5 2)" fill="#15121a"/><path class="k1-hd" d="M-9 -9 L9 0 L-9 9 L-5 0Z"/><path d="M-7 -6 L4 -1" stroke="#fff3c4" stroke-width="1.4" stroke-linecap="round"/></g>`};
    const segs=[[14,76],[104,166],[194,256],[284,346]];
    return `<svg class="k1-tube" viewBox="0 0 200 200" aria-hidden="true">${segs.map(([a,b])=>`<path d="${arc(a,b,96)}" class="t0"/><path d="${arc(a,b,96)}" class="t1"/><path d="${arc(a,b,96)}" class="t2"/><path d="${arc(a+4,b-10,94.6)}" class="t3"/>`).join('')}${segs.map(([a,b])=>head(b+4)).join('')}</svg>`};
  const P={
    bg:{v:1,p:O+'v-clock-p-web.mp4',pp:O+'g-clock-p.jpg',d:O+'v-clock-d-web.mp4',dp:O+'g-clock-d.jpg'},
    issue:(l,n,b)=>`<span class="k1-pl">${l}</span><span class="k1-pl k1-pn">${n}</span>`,
    starH:()=>`<b class="k1-plq">Starring</b>`,
    token:(m,cls)=>obj('k1-coin',mark(m,'stamp'),cls),
    company:(t)=>obj('k1-sign',logo(t),'kp1-co'),
    grade:()=>`<span class="k1-g">${C.P.bell('k1-bell')}</span>`,
    ticket:(m)=>`<span class="k1-tk">${obj('ticket',`<span class="k1-tkm">${obj('k1-coin',mark(m,'stamp'),'k1-tkc')}</span><b class="k1-tkn">${esc(S.NM[m])}</b>`)}</span>`,
    record:(n)=>obj('k1-ledger',`<span class="k1-ld"><b>${n}</b><small>rounds<br>graded</small></span>`,'k1-ldg'),
    num:(i)=>obj('k1-gear',`<b>${i}</b>`,'ks-n'),
    cap:(t)=>`<span class="ks-c k1-pl">${t}</span>`,
    centre:()=>`<span class="k1-clk">${obj('clock2',hands('k1-h'))}${tube()}</span><span class="k1-bellp k1-pl"><small>Bell in</small>${C.cdown()}<small>${esc(C.closeDay())} · 4 PM New York</small></span>`,
    arrow:()=>'',
    q:(t)=>`<span class="k1-pl k1-q">${t}</span>`,
    button:()=>`<a class="kbtn k1-pl k1-btn" href="#">Meet the four models <i aria-hidden="true">↓</i></a>`,
  };
  K.build('1',P);K.done()})();
