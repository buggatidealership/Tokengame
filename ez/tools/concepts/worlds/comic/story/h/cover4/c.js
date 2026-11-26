/* C · The splash: one picture, read by its narration. The leader holds the golden ticket (cast2, per leader); the narrator's
   yellow boxes run down the free purple side in reading order, each step carrying its fact: 1 the four real calls,
   2 the close and who passed, 3 lettered onto the golden ticket itself, 4 we follow it, then Bet #1: NVIDIA under the picture. */
(function(){const C=C4,e=C.esc,ex=C.ex,K=C.CAST;
 const calls=['GPT','KIMI','CLAUDE','GROK'].map(m=>{const c=C.call(m);return c?`<span class="c-k ${c.up?'up':'dn'}${C.pass(c)?' ok':''}"><b>${e(C.NM[m])}</b> <i>${C.arrow(c)}${c.sz}%</i>${ex.pending?'':`<u>${C.pass(c)?'pass':'fail'}</u>`}</span>`:''}).join('');
 const src=K+'a-'+C.ld+'-ticket'+'.jpg';
 const html=`<div class="c-sp">
  <div class="c-top">${C.issue('c-iss')}${C.head('c-h1')}</div>
  <div class="c-pn">
   <div class="c-art">${C.img(src,'',C.ldName+' holds up the golden ticket')}</div>
   <div class="c-col">
    <div class="c-n c-n1">${C.step(0)}<p class="c-ks"><span class="c-co">Round ${ex.n} · ${e(ex.co)}</span>${calls}</p></div>
   </div>
    <div class="c-n c-n2">${C.step(1)}${ex.pending?'':`<p class="c-mv">The close: <b class="${ex.a>=0?'up':'dn'}">${C.mv(ex.a)}</b></p>`}</div>
   <div class="c-tk" aria-hidden="true"><small>Golden ticket</small><b>#1</b><span>on the leaderboard</span></div>
   <p class="c4-sr">${e(C.STEPS[2])}: ${C.ldName}</p>
   <div class="c-n c-n4">${C.step(3)}</div>
  </div>
  ${C.bet('c-bet')}
 </div>`;
 const box=C.build('c',html);const art=box.querySelector('.c-art'),pn=box.querySelector('.c-pn'),tk=box.querySelector('.c-tk');
 const place=()=>{const a=art.getBoundingClientRect(),p=pn.getBoundingClientRect();tk.style.left=(a.left-p.left+a.width*.361)+'px';tk.style.top=(a.top-p.top+a.height*.586)+'px';tk.style.width=a.width*.235+'px';tk.style.height=a.height*.29+'px';tk.style.fontSize=(a.width*.034)+'px'};
 place();new ResizeObserver(place).observe(pn);C.ready()})();
