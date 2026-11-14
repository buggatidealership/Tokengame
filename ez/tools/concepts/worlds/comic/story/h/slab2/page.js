/* The page takes (A 3d, B pop, C cel, E ink by outcome): slabback D's comic page, rebuilt with the pose sets.
   Four panels in rank order (filed order while pending); each founder in the pose of what happened to him; his call lettered
   into the balloon painted in his own panel; the verdict as a caption; the close as the last tier, the page's one loud beat. */
(function(){
function page(g,fin,cls,o={}){const rows=S2.rows(g),[w1,w2]=S2.who(g);
  const end=g.pend?`<div class="s2-end s2-endq">${RH.burst(g.n,'#ffd23f','#fff0a6')}<span><small>The close</small><b>?</b></span><p>${w1}<br><strong>${w2}</strong></p></div>`
   :`<div class="s2-end ${g.up?'up':'dn'}">${RH.burst(g.n,g.up?'#14b85c':'#ff3a31',g.up?'#7df0aa':'#ff9a8a')}<span><small>The close</small><b>${SB.mv(g.a)}</b></span><p>${w1}<br><strong>${w2}</strong></p></div>`;
  return SB.mount(`<div class="s2-hd">${S2.wob(g.n*7,o.h1||'#ffd23f',o.h2||'#e9a91c',{w:3.4})}<b>${g.pend?'Locked in':'The verdict'}</b></div><span class="s2-sub">No. ${RH.pad(g.n)} · ${g.co} · filed ${g.called}${g.pend?'':' · graded '+g.res}</span>
    <ol class="s2-g">${rows.map((r,i)=>S2.panel(r,i,g,{fin,...o})).join('')}</ol>${end}<div class="sd-fl"><button type="button" class="sb-flip">See the film</button></div>`,'s2 '+cls+(g.pend?' sb-pd':''),g)}
window.SB_p3d=g=>page(g,'3d','s2-p3d');
window.SB_pop=g=>page(g,'pop','s2-pop',{w:4.4,w2:1.4,cap1:'#ffe95a',cap2:'#ffb81f',h1:'#ff3a31',h2:'#c41f1a'});
window.SB_cel=g=>page(g,'cel','s2-cel',{w:1.8,w2:.6,cap1:'#22263a',cap2:'#141726',h1:'#f8f0d9',h2:'#d9cfb4'});
window.SB_mix=g=>page(g,s=>s==='fail'?'noir':'3d','s2-mix');
})();
