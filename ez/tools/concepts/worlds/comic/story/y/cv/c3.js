/* C3 · The golden-age cover. A 1940s cover leads (masthead, corner box, a seal, the cover art, cover blurbs) with the explainer film AS
   the cover art; art deco adds the gilded stepped frame round it; risograph adds the two-ink tagline and the print grain; the loop is
   the issue's contents printed as a strip of film that curls back on itself (35mm sprockets, edge printing that names the real round). */
(function(){const X=CV,S=X.S,P=X.P,m=X.mount('c3');if(!m)return;const {root,film,h1}=m;const L=X.last;
  root.innerHTML=`<div class="c3-cv"><div class="c3-mh"></div><div class="c3-art"><div class="c3-fr"></div></div><div class="c3-strip" role="list" aria-label="How every round goes"></div><p class="c3-gd">${X.next()}</p></div>`;
  const mh=root.querySelector('.c3-mh'),strip=root.querySelector('.c3-strip');root.querySelector('.c3-fr').append(film);X.wire(root);
  const STEPS=['They call the move <b>before</b> earnings','The close grades every call','Top P&amp;L holds the golden ticket','Every call stays on the record'];
  function build(){const W=root.clientWidth,desk=W>=900,cw=desk?W*.42:W-16;
    const hs=desk?74:Math.min(52,cw*.155);
    mh.innerHTML=`<span class="c3-box"><small>Season</small><b>1</b><small>No. ${X.R.length}</small></span><span class="c3-t"></span><span class="c3-seal" aria-hidden="true"><svg viewBox="0 0 80 80"><defs><path id="c3sp" d="M40 40m-27 0a27 27 0 1 1 54 0a27 27 0 1 1 -54 0"/></defs><circle cx="40" cy="40" r="37" fill="#fff4cf" stroke="#0d0b10" stroke-width="3"/><circle cx="40" cy="40" r="31" fill="none" stroke="#0d0b10" stroke-width="1.4"/><text font-family="Bangers" font-size="9.2" letter-spacing="1.2" fill="#0d0b10"><textPath href="#c3sp">GRADED BY THE MARKET CLOSE ★ </textPath></text><text x="40" y="38" text-anchor="middle" font-family="Luckiest Guy" font-size="12" fill="#c3140c">EVERY</text><text x="40" y="51" text-anchor="middle" font-family="Luckiest Guy" font-size="12" fill="#c3140c">CALL</text></svg></span>`;
    mh.querySelector('.c3-t').append(h1);
    X.head(h1,`<span class="c3-l1">${X.aisWord({size:hs*.6,fill:'white'})}</span>${X.ext('TRADE',{size:hs,fill:'red'})}${X.ext('EARNINGS',{size:hs,fill:'gold',max:desk?cw-30:cw-104})}<span class="c3-tag"><span class="c3-r1">Who calls it best?</span><span class="c3-r2" aria-hidden="true">Who calls it best?</span></span>`);
    /* the strip: four frames, the round named in the edge print */
    const fw=Math.floor(desk?((strip.clientWidth||cw)-6-12-18)/4:((strip.clientWidth||cw)-6-12-18)/4);
    const f1=`<span class="c3-o1">${X.logo(L.ticker,'c3-lg')}${['GPT','KIMI','CLAUDE','GROK'].map((mm,i)=>{const c=X.calls.find(x=>x.m===mm);return `<span class="c3-c c3-c${i}">${X.coin(mm,Math.round(Math.min(fw*.26,34)),{dp:1,holo:false})}<i class="${c.up?'c3-up':'c3-dn'}">${c.up?'▲':'▼'}</i></span>`}).join('')}</span>`;
    const f2=`<span class="c3-o2">${X.bell(Math.round(Math.min(fw*.46,72)))}${X.ext((L.a<0?'▼':'▲')+Math.abs(L.a).toFixed(2)+'%',{size:Math.min(fw*.17,30),fill:L.a<0?'red':'green',max:fw-6})}<span class="c3-dots">${X.calls.map(c=>`<i class="${c.pass?'c3-ok':'c3-no'}"></i>`).join('')}</span></span>`;
    const f3=`<span class="c3-o3"><span class="c3-mt">${X.coin(X.lead,Math.round(Math.min(fw*.36,56)),{dp:2})}<b>Golden<br>ticket</b></span>${X.ext(P.pm(X.L.pnl),{size:Math.min(fw*.15,28),fill:'green',max:fw-4})}</span>`;
    const f4=`<span class="c3-o4">${X.slabs(Math.round(Math.min(fw*.62,104)))}${X.ext('No. '+X.R.length,{size:Math.min(fw*.14,24),fill:'white',font:'Bangers',max:fw-8})}</span>`;
    const F=[f1,f2,f3,f4];
    const edge=`Round ${L.n} · ${X.co(L)} · ${S.esc(S.md(L.resolves))} · Season 1 · ${X.R.length} graded`;
    strip.style.setProperty('--fw',fw+'px');
    strip.innerHTML=`<p class="c3-ep" aria-hidden="true"><span>${S.esc(edge)}</span><span>${S.esc(edge)}</span></p><div class="c3-fs">${F.map((h,i)=>`<div class="c3-f c3-f${i+1}" role="listitem"><div class="c3-ob">${h}</div><p class="c3-lb"><b>${i+1}</b>${STEPS[i]}</p></div>`).join('')}</div><p class="c3-ret" aria-hidden="true"><i></i><span>Then back to 1. Every round.</span></p>`;
  }
  build();let lw=root.clientWidth;new ResizeObserver(()=>{const w=root.clientWidth;if(Math.abs(w-lw)>2){lw=w;build()}}).observe(root);
  X.ready('c3')})();
