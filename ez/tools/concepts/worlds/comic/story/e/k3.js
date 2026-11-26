/* K3 · In your feed: a hand holds a phone; the newest graded round drops in as a post from EZ, the way it lands for a follower.
   Everything on the post comes from the sheet's newest graded round. */
(function(){const S=SE,m=S.backMount('se-k3');if(!m)return S.ready();
  const r=ROUNDS.slice().sort((a,b)=>b.n-a.n)[0],up=r.a>0,W=r.win?r.win.split(' & '):[];
  const cs=S.ORDER.map(mm=>{const c=r.calls.find(x=>x[0]===mm);if(!c||!c[1])return null;return {m:mm,up:/^UP/i.test(c[1])}}).filter(Boolean),right=cs.filter(c=>c.up===up);
  const mv=(up?(Math.abs(r.a)>=5?'jumped ':'rose '):(Math.abs(r.a)>=5?'dropped ':'fell '))+Math.abs(r.a).toFixed(2)+'%';
  const who=!right.length?`Every AI called it the wrong way. Nobody wins round ${r.n}.`:right.length===1?`Only ${S.NM[right[0].m]} called ${up?'up':'down'}.${W.length?' '+W.map(x=>S.NM[x]).join(' and ')+' win'+(W.length===1?'s':'')+' round '+r.n+'.':''}`
    :`${right.length} of ${cs.length} called ${up?'up':'down'}.${W.length?' '+W.map(x=>S.NM[x]).join(' and ')+' win'+(W.length===1?'s':'')+' round '+r.n+'.':''}`;
  const lg=(S.D.querySelector('header.top svg[viewBox="0 0 400 400"]')||{}).outerHTML||'';const bc=S.brand(r.ticker);
  const w=S.D.createElement('div');w.className='se-k3w';
  w.innerHTML=`<div class="se-k3ph" aria-hidden="true"><div class="se-k3sc"><span class="se-k3nt">${S.esc(S.md(r.resolves||r.called))} · after the close</span>
      <div class="se-k3po"><span class="se-k3av">${lg}</span><div class="se-k3bd"><p class="se-k3id"><b>Earnings Zeason</b> <span>@earningszn</span></p>
        <p class="se-k3tx">${S.esc(r.co)} ${mv}. ${S.esc(who)}</p>
        <div class="se-k3im" style="${S.bvars(bc)}"><span class="se-k3lg">${S.coImg(r.ticker)}</span><b class="se-k3sfx ${up?'se-k3u':'se-k3d'}"><em>${S.sfx(r.a)}</em>${up?'+':'−'}${Math.abs(r.a).toFixed(2)}%</b>
          <span class="se-k3cs">${cs.map(c=>`<i class="${c.up===up?'se-k3ok':'se-k3no'}${W.includes(c.m)?' se-k3win':''}">${S.face(c.m)}<b>${c.up===up?'✓':'✗'}</b></i>`).join('')}</span></div></div></div></div></div>
    <p class="se-k3cap">That lands in your feed after every close.</p>`;
  m.motto.after(w);w.after(m.follow);m.follow.textContent='Follow @earningszn on X';
  S.once(w,.45);S.ready()})();
